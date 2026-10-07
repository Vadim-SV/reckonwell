'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { DECISION_TREE } from '@/lib/toolkit-data';
import { getSoleTraderTax, findOptimalSalary, formatCurrency, trackToolStarted, trackToolCompleted, triggerPdfDownload } from '@/lib/toolkit-utils';
import { COMPANY_RUNNING_COSTS } from '@/lib/tax-config';
import ShareBar from '@/components/toolkit/ShareBar';

type Answers = Record<string, string>;

function getRecommendation(answers: Answers, scores: { ltd: number; soleTrader: number }) {
  const diff = scores.ltd - scores.soleTrader;
  if (diff >= 4) return { verdict: 'limited-company', label: 'Limited Company', color: '#18213E' };
  if (diff <= -3) return { verdict: 'sole-trader', label: 'Sole Trader', color: '#2D6A4F' };
  return { verdict: 'borderline', label: 'Borderline — talk to us', color: '#C9A84C' };
}

function getTopReasons(answers: Answers, verdict: string): string[] {
  const reasons: string[] = [];
  if (answers.profit === 'over-60k') reasons.push('Your profit level (over £60k) makes a limited company significantly more tax-efficient.');
  if (answers.profit === 'under-20k') reasons.push('At under £20k profit, the extra running costs of a limited company often outweigh the tax saving.');
  if (answers.drawn === 'retain') reasons.push('Retaining profit in a company is taxed at 19–25% vs up to 47% as a sole trader.');
  if (answers.liability === 'high') reasons.push('A limited company protects your personal assets from business liabilities.');
  if (answers.investment === 'yes') reasons.push('SEIS/EIS investment is only available to limited companies.');
  if (answers.clients === 'required') reasons.push('Your contracts require you to operate as a limited company.');
  if (answers.ir35 === 'yes') reasons.push('If your contracts are inside IR35, a limited company offers little tax advantage.');
  if (answers.mortgage === 'yes') reasons.push('Incorporating now may complicate your mortgage application in the next 2 years.');
  if (answers.admin === 'simple') reasons.push('You prefer simplicity — sole trader administration is much lighter.');
  return reasons.slice(0, 4);
}

export default function SoleTraderLtdClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [mode, setMode] = useState<'tree' | 'calculator' | 'results'>('tree');
  const [currentNodeId, setCurrentNodeId] = useState('profit');
  const [answers, setAnswers] = useState<Answers>({});
  const [scores, setScores] = useState({ ltd: 0, soleTrader: 0 });
  const [profit, setProfit] = useState(60000);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) {
      trackToolStarted('sole-trader-vs-limited-company');
      setStarted(true);
    }
  }, [started]);

  const currentNode = DECISION_TREE.find(n => n.id === currentNodeId);

  const handleAnswer = (optionValue: string, nextId: string | undefined, score: { ltd: number; soleTrader: number } | undefined) => {
    const newAnswers = { ...answers, [currentNodeId]: optionValue };
    const newScores = {
      ltd: scores.ltd + (score?.ltd || 0),
      soleTrader: scores.soleTrader + (score?.soleTrader || 0),
    };
    setAnswers(newAnswers);
    setScores(newScores);
    if (nextId) {
      setCurrentNodeId(nextId);
    } else {
      setMode('calculator');
    }
  };

  const handleReset = () => {
    setCurrentNodeId('profit');
    setAnswers({});
    setScores({ ltd: 0, soleTrader: 0 });
    setMode('tree');
  };

  const recommendation = getRecommendation(answers, scores);
  const topReasons = getTopReasons(answers, recommendation.verdict);

  // Calculator
  const stResult = getSoleTraderTax(profit);
  const ltdInputs = { companyProfit: profit, otherIncome: 0, numDirectors: 1, employmentAllowance: false };
  const ltdResult = findOptimalSalary(ltdInputs);
  const runningCosts = COMPANY_RUNNING_COSTS.totalEstimateMin;
  const ltdTakeHomeAfterCosts = ltdResult.optimal.takeHome - runningCosts;
  const takeHomeDiff = ltdTakeHomeAfterCosts - stResult.takeHome;

  const progress = Object.keys(answers).length / DECISION_TREE.length * 100;

  return (
    <div className="max-w-2xl">
      {/* Mode tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setMode('tree')}
          className="px-4 py-2 rounded font-ui text-xs uppercase tracking-widest transition-all"
          style={{
            background: mode === 'tree' ? 'var(--primary)' : 'transparent',
            color: mode === 'tree' ? 'var(--primary-foreground)' : 'var(--muted)',
            border: '1px solid var(--border)',
            letterSpacing: '1.5px',
          }}
        >
          Decision tree
        </button>
        <button
          onClick={() => setMode('calculator')}
          className="px-4 py-2 rounded font-ui text-xs uppercase tracking-widest transition-all"
          style={{
            background: mode === 'calculator' ? 'var(--primary)' : 'transparent',
            color: mode === 'calculator' ? 'var(--primary-foreground)' : 'var(--muted)',
            border: '1px solid var(--border)',
            letterSpacing: '1.5px',
          }}
        >
          Tax calculator
        </button>
      </div>

      {/* Decision Tree */}
      {mode === 'tree' && (
        <div className="rounded-lg border p-6" style={{ borderColor: 'var(--border)' }}>
          {/* Progress bar */}
          <div className="w-full h-1 rounded-full mb-6" style={{ background: 'var(--border)' }}>
            <div className="h-1 rounded-full transition-all" style={{ width: `${progress}%`, background: 'var(--primary)' }} />
          </div>

          {Object.keys(answers).length < DECISION_TREE.length && currentNode ? (
            <>
              <p className="font-ui text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--muted)', letterSpacing: '1.5px' }}>
                Question {Object.keys(answers).length + 1} of {DECISION_TREE.length}
              </p>
              <h3 className="font-display text-xl mb-2" style={{ color: 'var(--foreground)' }}>{currentNode.question}</h3>
              {currentNode.hint && (
                <p className="text-sm mb-5" style={{ color: 'var(--muted)' }}>{currentNode.hint}</p>
              )}
              <div className="space-y-3">
                {currentNode.options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleAnswer(opt.value, opt.nextId, opt.score)}
                    className="w-full text-left px-4 py-3 rounded border text-sm transition-all"
                    style={{ borderColor: 'var(--border)', color: 'var(--foreground)', background: 'transparent' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--primary)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'; }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Recommendation */}
              <div className="text-center py-4">
                <p className="font-ui text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--muted)', letterSpacing: '1.5px' }}>Our recommendation</p>
                <div className="inline-block px-6 py-3 rounded-lg mb-4" style={{ background: recommendation.color, color: '#fff' }}>
                  <p className="font-display text-2xl font-semibold">{recommendation.label}</p>
                </div>
                {topReasons.length > 0 && (
                  <ul className="text-left space-y-2 mt-4">
                    {topReasons.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                        <span style={{ color: 'var(--primary)', flexShrink: 0 }}>→</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex gap-3 mt-6 justify-center">
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 rounded font-ui text-xs uppercase tracking-widest"
                    style={{ border: '1px solid var(--border)', color: 'var(--muted)', background: 'transparent', letterSpacing: '1.5px' }}
                  >
                    Start again
                  </button>
                  <button
                    onClick={() => setMode('calculator')}
                    className="px-4 py-2 rounded font-ui text-xs uppercase tracking-widest"
                    style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', border: 'none', letterSpacing: '1.5px' }}
                  >
                    See tax comparison →
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Calculator */}
      {mode === 'calculator' && (
        <div>
          <div className="rounded-lg border p-6 mb-6" style={{ borderColor: 'var(--border)' }}>
            <h3 className="font-display text-lg mb-4" style={{ color: 'var(--foreground)' }}>Enter your expected annual profit</h3>
            <div>
              <label className="block text-xs font-ui uppercase tracking-widest mb-1.5" style={{ color: 'var(--muted)', letterSpacing: '1.5px' }}>
                Annual profit (£)
              </label>
              <input
                type="number"
                value={profit}
                onChange={(e) => setProfit(Number(e.target.value))}
                min={0}
                step={5000}
                className="w-full px-3 py-2 rounded border text-sm"
                style={{ borderColor: 'var(--border)', background: 'var(--background)', color: 'var(--foreground)' }}
                aria-label="Annual profit"
              />
            </div>
          </div>

          {profit > 0 && (
            <>
              {/* Comparison table */}
              <div className="rounded-lg border overflow-hidden mb-6" style={{ borderColor: 'var(--border)' }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)', background: 'rgba(0,0,0,0.02)' }}>
                      <th className="text-left px-4 py-3 font-ui text-xs uppercase tracking-widest" style={{ color: 'var(--muted)', letterSpacing: '1.5px' }}></th>
                      <th className="text-right px-4 py-3 font-ui text-xs uppercase tracking-widest" style={{ color: 'var(--muted)', letterSpacing: '1.5px' }}>Sole Trader</th>
                      <th className="text-right px-4 py-3 font-ui text-xs uppercase tracking-widest" style={{ color: 'var(--muted)', letterSpacing: '1.5px' }}>Ltd Company</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: 'Total tax & NIC', st: stResult.totalTax, ltd: ltdResult.optimal.totalTax },
                      { label: 'Take-home (before running costs)', st: stResult.takeHome, ltd: ltdResult.optimal.takeHome },
                      { label: 'Est. running costs', st: 0, ltd: runningCosts },
                      { label: 'Take-home (after running costs)', st: stResult.takeHome, ltd: ltdTakeHomeAfterCosts, bold: true },
                    ].map(({ label, st, ltd, bold }) => (
                      <tr key={label} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td className="px-4 py-3" style={{ color: 'var(--muted)', fontWeight: bold ? 600 : 400 }}>{label}</td>
                        <td className="px-4 py-3 text-right" style={{ color: 'var(--foreground)', fontWeight: bold ? 600 : 400 }}>{formatCurrency(st)}</td>
                        <td className="px-4 py-3 text-right" style={{ color: 'var(--foreground)', fontWeight: bold ? 600 : 400 }}>{formatCurrency(ltd)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Difference */}
              <div className="rounded-lg p-4 mb-6 text-center" style={{ background: takeHomeDiff > 0 ? 'rgba(45,106,79,0.08)' : 'rgba(180,50,50,0.06)', border: `1px solid ${takeHomeDiff > 0 ? '#2D6A4F' : '#b43232'}` }}>
                <p className="text-sm font-semibold" style={{ color: takeHomeDiff > 0 ? '#2D6A4F' : '#b43232' }}>
                  {takeHomeDiff > 0
                    ? `A limited company could save you approximately ${formatCurrency(Math.abs(takeHomeDiff))} per year after running costs.`
                    : `A sole trader structure would leave you approximately ${formatCurrency(Math.abs(takeHomeDiff))} better off per year.`}
                </p>
              </div>

              <ShareBar
                toolSlug="sole-trader-vs-limited-company"
                toolUrl="/toolkit/sole-trader-vs-limited-company"
                shareText="Free tool that compares sole trader vs limited company take-home pay for 2026/27:"
                onPdfDownload={() => { trackToolCompleted('sole-trader-vs-limited-company'); triggerPdfDownload('sole-trader-vs-limited-company'); }}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
