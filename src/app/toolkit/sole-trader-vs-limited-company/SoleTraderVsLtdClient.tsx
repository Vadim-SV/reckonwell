'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { INCOME_TAX, COMPANY_RUNNING_COSTS, calcEmployeeNIC, calcEmployerNIC, calcCorporationTax, calcDividendTax, calcSoleTraderTax,  } from '@/lib/tax-config';
import { formatCurrency, formatPercent, trackToolStarted, trackToolCompleted, trackCtaClicked } from '@/lib/toolkit-share';
import ShareBar from '../components/ShareBar';

// ─── Decision Tree ────────────────────────────────────────────────────────────

interface TreeNode {
  id: string;
  question: string;
  hint?: string;
  options: Array<{ label: string; next: string | 'ltd' | 'sole-trader' | 'borderline' }>;
}

const DECISION_TREE: TreeNode[] = [
  {
    id: 'profit',
    question: 'What is your expected annual profit?',
    hint: 'Revenue minus business expenses, before tax',
    options: [
      { label: 'Under £20,000', next: 'drawn' },
      { label: '£20,000–£50,000', next: 'drawn' },
      { label: '£50,000–£100,000', next: 'drawn' },
      { label: 'Over £100,000', next: 'drawn' },
    ],
  },
  {
    id: 'drawn',
    question: 'How much of the profit do you plan to draw out personally?',
    options: [
      { label: 'All of it — I need it to live on', next: 'liability' },
      { label: 'Most of it (70%+)', next: 'liability' },
      { label: 'About half — I want to retain some', next: 'liability' },
      { label: 'I want to retain most of it in the business', next: 'liability' },
    ],
  },
  {
    id: 'liability',
    question: 'How important is personal liability protection to you?',
    hint: 'Limited companies protect personal assets if the business is sued or fails',
    options: [
      { label: 'Very important — I have significant personal assets', next: 'investment' },
      { label: 'Somewhat important', next: 'investment' },
      { label: 'Not a concern for my type of work', next: 'investment' },
    ],
  },
  {
    id: 'investment',
    question: 'Do you plan to raise investment or take on outside shareholders?',
    options: [
      { label: 'Yes — I plan to raise investment (SEIS/EIS)', next: 'ltd' },
      { label: 'Possibly in the future', next: 'clients' },
      { label: 'No', next: 'clients' },
    ],
  },
  {
    id: 'clients',
    question: 'Do your clients or contracts require you to be a limited company?',
    options: [
      { label: 'Yes — clients or contracts require it', next: 'ltd' },
      { label: 'Some do', next: 'admin' },
      { label: 'No', next: 'admin' },
    ],
  },
  {
    id: 'admin',
    question: 'How do you feel about additional admin (annual accounts, confirmation statements, payroll)?',
    hint: 'Limited companies have more filing requirements than sole traders',
    options: [
      { label: "I'm happy to handle it or pay an accountant", next: 'ir35' },
      { label: "I'd prefer to keep things simple", next: 'sole-trader' },
    ],
  },
  {
    id: 'ir35',
    question: 'Do you work through contracts that might be caught by IR35 (off-payroll working rules)?',
    hint: 'IR35 applies mainly to contractors working like employees',
    options: [
      { label: 'Yes — I work inside IR35 or might do', next: 'borderline' },
      { label: 'No — I work outside IR35 or it does not apply', next: 'mortgage' },
    ],
  },
  {
    id: 'mortgage',
    question: 'Are you planning to apply for a mortgage in the next 2 years?',
    hint: 'Lenders assess limited company directors differently — often on salary + dividends',
    options: [
      { label: 'Yes', next: 'borderline' },
      { label: 'No', next: 'ltd' },
    ],
  },
];

type Recommendation = 'ltd' | 'sole-trader' | 'borderline';

interface Answer { nodeId: string; optionLabel: string; next: string; }

function getRecommendation(answers: Answer[]): { rec: Recommendation; reasons: string[] } {
  const last = answers[answers.length - 1];
  if (!last) return { rec: 'borderline', reasons: [] };

  const rec = last.next as Recommendation;
  const reasons: string[] = [];

  if (rec === 'ltd') {
    reasons.push('Your profit level makes the tax saving from a limited company structure worthwhile');
    if (answers.find(a => a.next === 'ltd' && a.nodeId === 'investment')) reasons.push('You plan to raise investment — limited companies can issue shares under SEIS/EIS');
    if (answers.find(a => a.next === 'ltd' && a.nodeId === 'clients')) reasons.push('Your clients or contracts require a limited company');
    if (!reasons.length) reasons.push('Based on your answers, a limited company is likely the better structure');
  } else if (rec === 'sole-trader') {
    reasons.push('You prefer simplicity and lower admin overhead');
    reasons.push('At your profit level, the tax saving from a limited company may not outweigh the extra costs and admin');
  } else {
    reasons.push('Your situation has factors pointing both ways — professional advice is recommended');
    if (answers.find(a => a.nodeId === 'ir35')) reasons.push('IR35 exposure can significantly reduce the tax benefit of a limited company');
    if (answers.find(a => a.nodeId === 'mortgage')) reasons.push('A mortgage application in the next 2 years may be easier as a sole trader');
  }

  return { rec, reasons };
}

// ─── Calculator ───────────────────────────────────────────────────────────────

function calcLtdTakeHome(profit: number): { takeHome: number; totalTax: number; effectiveRate: number } {
  const salary = INCOME_TAX.personalAllowance;
  const employerNIC = calcEmployerNIC(salary, false);
  const employeeNIC = calcEmployeeNIC(salary);
  const taxableProfit = Math.max(0, profit - salary - employerNIC);
  const { tax: ct } = calcCorporationTax(taxableProfit);
  const dividends = Math.max(0, taxableProfit - ct);
  const incomeTax = 0; // salary at PA = no income tax
  const divTax = calcDividendTax(dividends, salary);
  const takeHome = salary - employeeNIC - incomeTax + dividends - divTax;
  const totalTax = employerNIC + employeeNIC + ct + divTax;
  return { takeHome, totalTax, effectiveRate: profit > 0 ? totalTax / profit : 0 };
}

export default function SoleTraderVsLtdClient() {
  // Decision tree state
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentNodeId, setCurrentNodeId] = useState('profit');
  const [treeComplete, setTreeComplete] = useState(false);
  const [recommendation, setRecommendation] = useState<{ rec: Recommendation; reasons: string[] } | null>(null);

  // Calculator state
  const [profit, setProfit] = useState(60000);
  const [calcStarted, setCalcStarted] = useState(false);

  const currentNode = DECISION_TREE.find(n => n.id === currentNodeId);

  const handleAnswer = (option: TreeNode['options'][0]) => {
    const newAnswers = [...answers, { nodeId: currentNodeId, optionLabel: option.label, next: option.next }];
    setAnswers(newAnswers);

    if (option.next === 'ltd' || option.next === 'sole-trader' || option.next === 'borderline') {
      setTreeComplete(true);
      setRecommendation(getRecommendation(newAnswers));
      trackToolCompleted('sole-trader-vs-limited-company');
    } else {
      setCurrentNodeId(option.next);
    }
    if (!answers.length) trackToolStarted('sole-trader-vs-limited-company');
  };

  const resetTree = () => {
    setAnswers([]);
    setCurrentNodeId('profit');
    setTreeComplete(false);
    setRecommendation(null);
  };

  const stResult = calcSoleTraderTax(profit);
  const ltdResult = calcLtdTakeHome(profit);
  const runningCosts = COMPANY_RUNNING_COSTS.totalEstimateMax;
  const ltdNetTakeHome = ltdResult.takeHome - runningCosts;
  const difference = ltdNetTakeHome - stResult.takeHome;

  const recLabels: Record<Recommendation, { label: string; color: string; bg: string }> = {
    ltd: { label: 'Limited company recommended', color: 'var(--primary-foreground)', bg: 'var(--primary)' },
    'sole-trader': { label: 'Sole trader recommended', color: 'var(--primary-foreground)', bg: 'var(--secondary)' },
    borderline: { label: 'Borderline — talk to us', color: 'var(--primary-foreground)', bg: '#8C3D2B' },
  };

  return (
    <div>
      {/* Part A: Decision Tree */}
      <div className="mb-10">
        <h2 className="font-display text-xl mb-2" style={{ fontWeight: 400, color: 'var(--foreground)' }}>
          Part A: Decision tree
        </h2>
        <p className="font-ui text-sm mb-6" style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
          Answer a few questions to get a personalised recommendation.
        </p>

        {!treeComplete && currentNode && (
          <div className="p-6 md:p-8" style={{ border: '1px solid var(--border)', borderRadius: '2px', background: 'var(--surface)' }}>
            {/* Progress */}
            <div className="flex items-center gap-2 mb-6">
              {DECISION_TREE.map((node, i) => (
                <div
                  key={node.id}
                  className="h-1 flex-1 rounded-full"
                  style={{ background: answers.find(a => a.nodeId === node.id) ? 'var(--primary)' : node.id === currentNodeId ? 'var(--secondary)' : 'var(--border)' }}
                />
              ))}
            </div>

            <p className="font-ui text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--muted)', fontSize: '10px', letterSpacing: '2px' }}>
              Question {answers.length + 1} of {DECISION_TREE.length}
            </p>
            <h3 className="font-display text-xl mb-2" style={{ fontWeight: 400, color: 'var(--foreground)' }}>
              {currentNode.question}
            </h3>
            {currentNode.hint && (
              <p className="font-ui text-xs mb-5" style={{ color: 'var(--muted)', lineHeight: 1.5 }}>{currentNode.hint}</p>
            )}
            <div className="flex flex-col gap-3">
              {currentNode.options.map((option) => (
                <button
                  key={option.label}
                  onClick={() => handleAnswer(option)}
                  className="text-left px-5 py-4 font-ui text-sm transition-all duration-200"
                  style={{ border: '1px solid var(--border)', borderRadius: '2px', background: 'var(--card)', color: 'var(--body-text)', cursor: 'pointer' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--primary)'; (e.currentTarget as HTMLButtonElement).style.background = 'var(--primary-dim)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLButtonElement).style.background = 'var(--card)'; }}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {answers.length > 0 && (
              <button
                onClick={() => {
                  const prev = answers[answers.length - 1];
                  setAnswers(answers.slice(0, -1));
                  setCurrentNodeId(prev.nodeId);
                }}
                className="mt-4 font-ui text-xs"
                style={{ color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px' }}
              >
                ← Back
              </button>
            )}
          </div>
        )}

        {treeComplete && recommendation && (
          <div>
            <div className="p-6 md:p-8 mb-6" style={{ background: recLabels[recommendation.rec].bg, borderRadius: '2px' }}>
              <p className="font-ui text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '10px', letterSpacing: '3px' }}>
                Our recommendation
              </p>
              <p className="font-display text-2xl md:text-3xl mb-4" style={{ color: recLabels[recommendation.rec].color, fontWeight: 400 }}>
                {recLabels[recommendation.rec].label}
              </p>
              <ul className="space-y-2">
                {recommendation.reasons.map((r) => (
                  <li key={r} className="font-ui text-sm flex items-start gap-2" style={{ color: 'rgba(255,255,255,0.85)' }}>
                    <span>→</span><span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Next steps checklist */}
            <div className="p-6 mb-6" style={{ border: '1px solid var(--border)', borderRadius: '2px', background: 'var(--surface)' }}>
              <h3 className="font-display text-lg mb-4" style={{ fontWeight: 400, color: 'var(--foreground)' }}>
                Next steps — {recommendation.rec === 'ltd' ? 'setting up a limited company' : recommendation.rec === 'sole-trader' ? 'registering as a sole trader' : 'getting professional advice'}
              </h3>
              <ul className="space-y-2">
                {recommendation.rec === 'ltd' ? [
                  'Incorporate at Companies House (£50 online)',
                  'Open a business bank account',
                  'Register for PAYE and set up payroll',
                  'Register for Corporation Tax within 3 months of trading',
                  'Set up the optimal salary/dividend structure (use our calculator)',
                  'Consider VAT registration if turnover approaching £90,000',
                ] : recommendation.rec === 'sole-trader' ? [
                  'Register as self-employed with HMRC',
                  'Set up a business bank account (recommended)',
                  'Keep records of income and expenses',
                  'Register for Self Assessment',
                  'Consider VAT registration if turnover approaching £90,000',
                  'Review annually — you can incorporate later if circumstances change',
                ] : [
                  'Book a free call with Reckonwell to discuss your specific situation',
                  'Gather your last 2 years of income/profit figures',
                  'Consider the IR35 implications if contracting',
                  'Check mortgage lender requirements if buying property soon',
                ].map((step) => (
                  <li key={step} className="font-ui text-sm flex items-start gap-3" style={{ color: 'var(--body-text)' }}>
                    <span style={{ color: 'var(--primary)', flexShrink: 0 }}>☐</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3 mb-6">
              <button
                onClick={resetTree}
                className="font-ui text-xs uppercase tracking-widest px-4 py-2 transition-all duration-200"
                style={{ border: '1px solid var(--border)', color: 'var(--muted)', borderRadius: '2px', fontSize: '10px', letterSpacing: '2px', background: 'transparent', cursor: 'pointer', minHeight: '40px' }}
              >
                Start again
              </button>
              <Link
                href="/book"
                className="font-ui text-xs uppercase tracking-widest px-6 py-2 inline-flex items-center transition-all duration-200"
                style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', borderRadius: '2px', fontSize: '10px', letterSpacing: '2px', fontWeight: 600, minHeight: '40px' }}
                onClick={() => trackCtaClicked('sole-trader-vs-limited-company', 'Book a free call')}
              >
                Book a free call →
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Part B: Calculator */}
      <div className="pt-8" style={{ borderTop: '1px solid var(--border)' }}>
        <h2 className="font-display text-xl mb-2" style={{ fontWeight: 400, color: 'var(--foreground)' }}>
          Part B: Tax comparison calculator
        </h2>
        <p className="font-ui text-sm mb-6" style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
          Compare take-home pay and total tax as a sole trader vs limited company at your profit level.
        </p>

        <div className="p-6 md:p-8 mb-6" style={{ border: '1px solid var(--border)', borderRadius: '2px', background: 'var(--surface)' }}>
          <label className="font-ui text-xs uppercase tracking-widest block mb-2" style={{ color: 'var(--muted)', fontSize: '10px', letterSpacing: '2px' }}>
            Annual profit (£)
          </label>
          <div className="flex gap-4 items-center">
            <input
              type="number"
              value={profit}
              onChange={(e) => { setProfit(Math.max(0, Number(e.target.value))); setCalcStarted(true); }}
              className="w-full max-w-xs font-ui text-base px-4 py-3"
              style={{ border: '1px solid var(--border)', borderRadius: '2px', background: 'var(--card)', color: 'var(--foreground)', outline: 'none' }}
              min={0}
              step={5000}
              aria-label="Annual profit"
            />
            <button
              onClick={() => setCalcStarted(true)}
              className="font-ui text-xs uppercase tracking-widest px-6 py-3 transition-all duration-200"
              style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', borderRadius: '2px', fontSize: '11px', letterSpacing: '2px', fontWeight: 600, minHeight: '48px', border: 'none', cursor: 'pointer' }}
            >
              Compare →
            </button>
          </div>
        </div>

        {calcStarted && (
          <div>
            {/* Summary cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-6" style={{ border: '1px solid var(--border)', borderRadius: '2px', background: 'var(--surface)' }}>
                <p className="font-ui text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--muted)', fontSize: '10px', letterSpacing: '2px' }}>Sole trader</p>
                <p className="font-display text-3xl mb-1" style={{ color: 'var(--foreground)', fontWeight: 400 }}>{formatCurrency(stResult.takeHome)}</p>
                <p className="font-ui text-sm" style={{ color: 'var(--muted)' }}>take-home · {formatPercent(stResult.effectiveRate)} effective rate</p>
                <div className="mt-4 space-y-1">
                  <div className="flex justify-between font-ui text-xs" style={{ color: 'var(--body-text)' }}>
                    <span>Income tax</span><span>{formatCurrency(stResult.incomeTax)}</span>
                  </div>
                  <div className="flex justify-between font-ui text-xs" style={{ color: 'var(--body-text)' }}>
                    <span>Class 4 NIC</span><span>{formatCurrency(stResult.class4NIC)}</span>
                  </div>
                  <div className="flex justify-between font-ui text-xs font-semibold" style={{ color: 'var(--foreground)', borderTop: '1px solid var(--border)', paddingTop: '4px', marginTop: '4px' }}>
                    <span>Total tax</span><span>{formatCurrency(stResult.totalTax)}</span>
                  </div>
                </div>
              </div>

              <div className="p-6" style={{ border: '2px solid var(--primary)', borderRadius: '2px', background: 'var(--primary-dim)' }}>
                <p className="font-ui text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--primary)', fontSize: '10px', letterSpacing: '2px' }}>Limited company (optimal)</p>
                <p className="font-display text-3xl mb-1" style={{ color: 'var(--foreground)', fontWeight: 400 }}>{formatCurrency(ltdResult.takeHome)}</p>
                <p className="font-ui text-sm" style={{ color: 'var(--muted)' }}>take-home · {formatPercent(ltdResult.effectiveRate)} effective rate</p>
                <div className="mt-4 space-y-1">
                  <div className="flex justify-between font-ui text-xs" style={{ color: 'var(--body-text)' }}>
                    <span>Corporation tax</span><span>{formatCurrency(ltdResult.totalTax - calcEmployerNIC(INCOME_TAX.personalAllowance, false) - calcEmployeeNIC(INCOME_TAX.personalAllowance) - calcDividendTax(Math.max(0, Math.max(0, profit - INCOME_TAX.personalAllowance - calcEmployerNIC(INCOME_TAX.personalAllowance, false)) - calcCorporationTax(Math.max(0, profit - INCOME_TAX.personalAllowance - calcEmployerNIC(INCOME_TAX.personalAllowance, false))).tax), INCOME_TAX.personalAllowance))}</span>
                  </div>
                  <div className="flex justify-between font-ui text-xs" style={{ color: 'var(--body-text)' }}>
                    <span>Running costs (est.)</span><span>{formatCurrency(runningCosts)}</span>
                  </div>
                  <div className="flex justify-between font-ui text-xs font-semibold" style={{ color: 'var(--foreground)', borderTop: '1px solid var(--border)', paddingTop: '4px', marginTop: '4px' }}>
                    <span>Net take-home</span><span>{formatCurrency(ltdNetTakeHome)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Difference */}
            <div className="p-5 mb-6" style={{ background: difference > 0 ? 'var(--primary-dim)' : 'rgba(140,61,43,0.08)', border: `1px solid ${difference > 0 ? 'var(--primary)' : '#8C3D2B'}`, borderRadius: '2px' }}>
              <p className="font-ui text-sm" style={{ color: 'var(--body-text)', lineHeight: 1.6 }}>
                {difference > 0
                  ? `At £${profit.toLocaleString()} profit, a limited company structure could leave you ${formatCurrency(difference)} better off per year after estimated running costs of ${formatCurrency(runningCosts)}.`
                  : `At £${profit.toLocaleString()} profit, a sole trader structure may leave you ${formatCurrency(Math.abs(difference))} better off per year once limited company running costs of ${formatCurrency(runningCosts)} are accounted for.`}
              </p>
            </div>

            {/* CTA */}
            <div className="p-6 mb-6" style={{ border: '1px solid var(--border)', borderRadius: '2px', background: 'var(--surface)' }}>
              <p className="font-display text-lg mb-2" style={{ fontWeight: 400, color: 'var(--foreground)' }}>
                Want a definitive answer for your situation?
              </p>
              <p className="font-ui text-sm mb-4" style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
                These figures are illustrative. Your actual position depends on other income, expenses, and personal circumstances. Book a free call to get a tailored recommendation.
              </p>
              <Link
                href="/book"
                className="font-ui text-xs uppercase tracking-widest px-6 py-3 inline-flex items-center transition-all duration-200"
                style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', borderRadius: '2px', fontSize: '11px', letterSpacing: '2px', fontWeight: 600, minHeight: '44px' }}
                onClick={() => trackCtaClicked('sole-trader-vs-limited-company', 'Book a free call')}
              >
                Book a free call →
              </Link>
            </div>

            <ShareBar
              toolSlug="sole-trader-vs-limited-company"
              shareText="Free tool that helps you decide: sole trader or limited company? Includes a decision tree and tax comparison:"
            />
          </div>
        )}
      </div>
    </div>
  );
}
