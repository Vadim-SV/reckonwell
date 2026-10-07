'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { INCOME_TAX, NATIONAL_INSURANCE, EMPLOYMENT_ALLOWANCE, calcIncomeTax, calcEmployeeNIC, calcEmployerNIC, calcCorporationTax, calcDividendTax,  } from '@/lib/tax-config';
import { formatCurrency, formatPercent, trackToolStarted, trackToolCompleted, buildShareUrl, trackCtaClicked } from '@/lib/toolkit-share';
import ShareBar from '../components/ShareBar';

interface Inputs {
  companyProfit: number;
  otherIncome: number;
  numDirectors: number;
  studentLoan: 'none' | 'plan1' | 'plan2' | 'plan4' | 'plan5';
  employmentAllowance: boolean;
}

interface ScenarioResult {
  label: string;
  salary: number;
  dividends: number;
  employerNIC: number;
  employeeNIC: number;
  incomeTax: number;
  dividendTax: number;
  corporationTax: number;
  takeHome: number;
  totalTax: number;
  effectiveRate: number;
}

const STUDENT_LOAN_RATES: Record<string, { threshold: number; rate: number; label: string }> = {
  none: { threshold: 0, rate: 0, label: 'None' },
  plan1: { threshold: 24990, rate: 0.09, label: 'Plan 1' },
  plan2: { threshold: 27295, rate: 0.09, label: 'Plan 2' },
  plan4: { threshold: 31395, rate: 0.09, label: 'Plan 4 (Scotland)' },
  plan5: { threshold: 25000, rate: 0.09, label: 'Plan 5' },
};

function calcStudentLoan(income: number, plan: string): number {
  const sl = STUDENT_LOAN_RATES[plan];
  if (!sl || plan === 'none' || income <= sl.threshold) return 0;
  return (income - sl.threshold) * sl.rate;
}

function calcScenario(
  companyProfit: number,
  salary: number,
  otherIncome: number,
  employmentAllowance: boolean,
  studentLoan: string,
  numDirectors: number
): ScenarioResult {
  // Employer NIC on salary
  const employerNIC = calcEmployerNIC(salary, employmentAllowance) / numDirectors;
  // Employee NIC
  const employeeNIC = calcEmployeeNIC(salary);
  // Taxable profit after salary and employer NIC
  const taxableProfit = Math.max(0, companyProfit - salary - employerNIC);
  // Corporation tax
  const { tax: corporationTax } = calcCorporationTax(taxableProfit);
  // Available for dividends
  const availableForDividends = Math.max(0, taxableProfit - corporationTax);
  const dividends = availableForDividends;
  // Personal income tax on salary
  const totalPersonalIncome = salary + otherIncome;
  const incomeTaxOnSalary = Math.max(0, calcIncomeTax(totalPersonalIncome) - calcIncomeTax(otherIncome));
  // Dividend tax
  const dividendTax = calcDividendTax(dividends, salary + otherIncome);
  // Student loan
  const slRepayment = calcStudentLoan(salary + dividends, studentLoan);
  // Take home
  const takeHome = salary - employeeNIC - incomeTaxOnSalary - dividendTax - slRepayment + dividends;
  const totalTax = employerNIC + employeeNIC + incomeTaxOnSalary + dividendTax + corporationTax + slRepayment;
  const effectiveRate = companyProfit > 0 ? totalTax / companyProfit : 0;

  return {
    label: '',
    salary,
    dividends,
    employerNIC,
    employeeNIC,
    incomeTax: incomeTaxOnSalary,
    dividendTax,
    corporationTax,
    takeHome,
    totalTax,
    effectiveRate,
  };
}

function findOptimalSalary(companyProfit: number, otherIncome: number, employmentAllowance: boolean, studentLoan: string, numDirectors: number): number {
  // Test key salary points
  const candidates = [
    0,
    NATIONAL_INSURANCE.employerSecondaryThreshold, // £5,000 — no employer NIC
    INCOME_TAX.personalAllowance, // £12,570 — no income tax
    NATIONAL_INSURANCE.employeePrimaryThreshold, // £12,570 — no employee NIC (same as PA)
    NATIONAL_INSURANCE.employeeUpperEarningsLimit, // £50,270
  ].filter(s => s <= companyProfit);

  let best = candidates[0];
  let bestTakeHome = -Infinity;

  for (const s of candidates) {
    const result = calcScenario(companyProfit, s, otherIncome, employmentAllowance, studentLoan, numDirectors);
    if (result.takeHome > bestTakeHome) {
      bestTakeHome = result.takeHome;
      best = s;
    }
  }
  return best;
}

export default function SalaryDividendCalculator() {
  const [inputs, setInputs] = useState<Inputs>({
    companyProfit: 80000,
    otherIncome: 0,
    numDirectors: 1,
    studentLoan: 'none',
    employmentAllowance: false,
  });
  const [started, setStarted] = useState(false);
  const [results, setResults] = useState<ScenarioResult[] | null>(null);
  const [shareUrl, setShareUrl] = useState('');

  const calculate = useCallback(() => {
    const { companyProfit, otherIncome, numDirectors, studentLoan, employmentAllowance } = inputs;
    const optimalSalary = findOptimalSalary(companyProfit, otherIncome, employmentAllowance, studentLoan, numDirectors);
    const minSalary = NATIONAL_INSURANCE.employerSecondaryThreshold; // £5,000

    const allSalary = calcScenario(companyProfit, Math.min(companyProfit, INCOME_TAX.personalAllowance), otherIncome, employmentAllowance, studentLoan, numDirectors);
    allSalary.label = 'Salary only (to PA)';

    const optimal = calcScenario(companyProfit, optimalSalary, otherIncome, employmentAllowance, studentLoan, numDirectors);
    optimal.label = `Optimal (£${optimalSalary.toLocaleString()} salary + dividends)`;

    const minimal = calcScenario(companyProfit, minSalary, otherIncome, employmentAllowance, studentLoan, numDirectors);
    minimal.label = `Minimal salary (£${minSalary.toLocaleString()}) + dividends`;

    setResults([optimal, minimal, allSalary]);
    trackToolCompleted('salary-vs-dividend-calculator');

    const url = buildShareUrl('salary-vs-dividend-calculator', {
      p: companyProfit,
      oi: otherIncome,
      nd: numDirectors,
      sl: studentLoan,
      ea: employmentAllowance ? '1' : '0',
    });
    setShareUrl(url);
  }, [inputs]);

  useEffect(() => {
    if (!started) return;
    calculate();
  }, [inputs, started, calculate]);

  const handleStart = () => {
    setStarted(true);
    trackToolStarted('salary-vs-dividend-calculator');
    calculate();
  };

  let best = results?.[0];

  return (
    <div>
      {/* Inputs */}
      <div className="p-6 md:p-8 mb-6" style={{ border: '1px solid var(--border)', borderRadius: '2px', background: 'var(--surface)' }}>
        <h2 className="font-display text-xl mb-6" style={{ fontWeight: 400, color: 'var(--foreground)' }}>Enter your figures</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Company profit */}
          <div>
            <label className="font-ui text-xs uppercase tracking-widest block mb-2" style={{ color: 'var(--muted)', fontSize: '10px', letterSpacing: '2px' }}>
              Company profit before director pay (£)
            </label>
            <input
              type="number"
              value={inputs.companyProfit}
              onChange={(e) => setInputs(p => ({ ...p, companyProfit: Math.max(0, Number(e.target.value)) }))}
              className="w-full font-ui text-base px-4 py-3"
              style={{ border: '1px solid var(--border)', borderRadius: '2px', background: 'var(--card)', color: 'var(--foreground)', outline: 'none' }}
              min={0}
              step={1000}
              aria-label="Company profit before director pay"
            />
          </div>

          {/* Other income */}
          <div>
            <label className="font-ui text-xs uppercase tracking-widest block mb-2" style={{ color: 'var(--muted)', fontSize: '10px', letterSpacing: '2px' }}>
              Director's other income (£/year)
            </label>
            <input
              type="number"
              value={inputs.otherIncome}
              onChange={(e) => setInputs(p => ({ ...p, otherIncome: Math.max(0, Number(e.target.value)) }))}
              className="w-full font-ui text-base px-4 py-3"
              style={{ border: '1px solid var(--border)', borderRadius: '2px', background: 'var(--card)', color: 'var(--foreground)', outline: 'none' }}
              min={0}
              step={1000}
              aria-label="Director's other income"
            />
          </div>

          {/* Number of directors */}
          <div>
            <label className="font-ui text-xs uppercase tracking-widest block mb-2" style={{ color: 'var(--muted)', fontSize: '10px', letterSpacing: '2px' }}>
              Number of director-shareholders
            </label>
            <select
              value={inputs.numDirectors}
              onChange={(e) => setInputs(p => ({ ...p, numDirectors: Number(e.target.value) }))}
              className="w-full font-ui text-base px-4 py-3"
              style={{ border: '1px solid var(--border)', borderRadius: '2px', background: 'var(--card)', color: 'var(--foreground)', outline: 'none' }}
              aria-label="Number of director-shareholders"
            >
              {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          {/* Student loan */}
          <div>
            <label className="font-ui text-xs uppercase tracking-widest block mb-2" style={{ color: 'var(--muted)', fontSize: '10px', letterSpacing: '2px' }}>
              Student loan plan (optional)
            </label>
            <select
              value={inputs.studentLoan}
              onChange={(e) => setInputs(p => ({ ...p, studentLoan: e.target.value as Inputs['studentLoan'] }))}
              className="w-full font-ui text-base px-4 py-3"
              style={{ border: '1px solid var(--border)', borderRadius: '2px', background: 'var(--card)', color: 'var(--foreground)', outline: 'none' }}
              aria-label="Student loan plan"
            >
              {Object.entries(STUDENT_LOAN_RATES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>

          {/* Employment Allowance */}
          <div className="md:col-span-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={inputs.employmentAllowance}
                onChange={(e) => setInputs(p => ({ ...p, employmentAllowance: e.target.checked }))}
                className="w-4 h-4"
                aria-label="Employment Allowance eligible"
              />
              <span className="font-ui text-sm" style={{ color: 'var(--body-text)' }}>
                Employment Allowance eligible (saves up to £{EMPLOYMENT_ALLOWANCE.amount.toLocaleString()} employer NIC)
              </span>
            </label>
            <p className="font-ui text-xs mt-1 ml-7" style={{ color: 'var(--muted)', fontSize: '11px' }}>
              Not available to sole directors with no other employees
            </p>
          </div>
        </div>

        <button
          onClick={handleStart}
          className="mt-6 font-ui text-xs uppercase tracking-widest px-8 py-3 transition-all duration-200"
          style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', borderRadius: '2px', fontSize: '11px', letterSpacing: '2px', fontWeight: 600, minHeight: '48px', border: 'none', cursor: 'pointer' }}
        >
          Calculate →
        </button>
      </div>

      {/* Results */}
      {results && (
        <div>
          {/* Best result highlight */}
          {best && (
            <div className="p-6 md:p-8 mb-6" style={{ background: 'var(--primary)', borderRadius: '2px' }}>
              <p className="font-ui text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(251,241,227,0.6)', fontSize: '10px', letterSpacing: '3px' }}>
                Optimal structure
              </p>
              <p className="font-display text-3xl md:text-4xl mb-1" style={{ color: 'var(--primary-foreground)', fontWeight: 400 }}>
                {formatCurrency(best.takeHome)} take-home
              </p>
              <p className="font-ui text-sm" style={{ color: 'rgba(251,241,227,0.75)' }}>
                {best.label} · Effective rate: {formatPercent(best.effectiveRate)}
              </p>
            </div>
          )}

          {/* Comparison table */}
          <div className="mb-6 overflow-x-auto">
            <table className="w-full font-ui text-sm" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <th className="text-left py-3 pr-4" style={{ color: 'var(--muted)', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 500 }}>Scenario</th>
                  <th className="text-right py-3 px-2" style={{ color: 'var(--muted)', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 500 }}>Take-home</th>
                  <th className="text-right py-3 px-2" style={{ color: 'var(--muted)', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 500 }}>Total tax</th>
                  <th className="text-right py-3 pl-2" style={{ color: 'var(--muted)', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 500 }}>Eff. rate</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i === 0 ? 'var(--primary-dim)' : 'transparent' }}>
                    <td className="py-3 pr-4" style={{ color: 'var(--foreground)', fontWeight: i === 0 ? 600 : 400 }}>
                      {i === 0 && <span className="inline-block mr-2 text-xs" style={{ color: 'var(--primary)' }}>★</span>}
                      {r.label}
                    </td>
                    <td className="text-right py-3 px-2" style={{ color: 'var(--foreground)', fontWeight: i === 0 ? 600 : 400 }}>{formatCurrency(r.takeHome)}</td>
                    <td className="text-right py-3 px-2" style={{ color: 'var(--body-text)' }}>{formatCurrency(r.totalTax)}</td>
                    <td className="text-right py-3 pl-2" style={{ color: 'var(--body-text)' }}>{formatPercent(r.effectiveRate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Breakdown of optimal */}
          {best && (
            <div className="p-6 mb-6" style={{ border: '1px solid var(--border)', borderRadius: '2px', background: 'var(--surface)' }}>
              <h3 className="font-display text-lg mb-4" style={{ fontWeight: 400, color: 'var(--foreground)' }}>Tax breakdown — optimal structure</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: 'Salary', value: formatCurrency(best.salary) },
                  { label: 'Dividends', value: formatCurrency(best.dividends) },
                  { label: 'Employer NIC', value: formatCurrency(best.employerNIC) },
                  { label: 'Employee NIC', value: formatCurrency(best.employeeNIC) },
                  { label: 'Income tax', value: formatCurrency(best.incomeTax) },
                  { label: 'Dividend tax', value: formatCurrency(best.dividendTax) },
                  { label: 'Corporation tax', value: formatCurrency(best.corporationTax) },
                  { label: 'Total tax', value: formatCurrency(best.totalTax) },
                  { label: 'Take-home', value: formatCurrency(best.takeHome), highlight: true },
                ].map((item) => (
                  <div key={item.label} className="p-3" style={{ background: item.highlight ? 'var(--primary-dim)' : 'var(--card)', borderRadius: '2px' }}>
                    <p className="font-ui text-xs mb-1" style={{ color: 'var(--muted)', fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase' }}>{item.label}</p>
                    <p className="font-display text-lg" style={{ color: 'var(--foreground)', fontWeight: item.highlight ? 600 : 400 }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="p-6 mb-6" style={{ border: '1px solid var(--border)', borderRadius: '2px', background: 'var(--surface)' }}>
            <p className="font-display text-lg mb-2" style={{ fontWeight: 400, color: 'var(--foreground)' }}>
              Want us to implement this structure for you?
            </p>
            <p className="font-ui text-sm mb-4" style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
              We set up the optimal salary/dividend split for every director client. Book a free call to discuss your situation.
            </p>
            <Link
              href={`/book?utm_source=tool&utm_medium=cta&utm_campaign=salary-dividend`}
              className="font-ui text-xs uppercase tracking-widest px-6 py-3 inline-flex items-center transition-all duration-200"
              style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', borderRadius: '2px', fontSize: '11px', letterSpacing: '2px', fontWeight: 600, minHeight: '44px' }}
              onClick={() => trackCtaClicked('salary-vs-dividend-calculator', 'Book a free call')}
            >
              Book a free call →
            </Link>
          </div>

          <ShareBar
            toolSlug="salary-vs-dividend-calculator"
            shareText="Found a free calculator that shows the best salary/dividend split for 2026/27 — worth checking:"
            currentUrl={shareUrl}
          />
        </div>
      )}
    </div>
  );
}
