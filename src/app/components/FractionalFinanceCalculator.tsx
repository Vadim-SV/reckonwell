'use client';

import React, { useState, useCallback } from 'react';

interface CalcInputs {
  isGroup: boolean;
  groupCount: number;
  bookkeepingRequired: boolean;
  transactionsPerMonth: number;
  payrollRequired: boolean;
  employeeCount: number;
  vatRequired: boolean;
  vatReturnsPerYear: number;
  finalAccountsRequired: boolean;
  monthlyRevenue: number;
  assumedSalary: number;
}

interface CalcResults {
  bookkeepingFee: number;
  payrollFee: number;
  vatMonthly: number;
  monthlyTotal: number;
  finalAccountsFee: number;
  oneOffTotal: number;
  employerNI: number;
  pension: number;
  trueAnnualCost: number;
  trueMonthlyHiringCost: number;
  monthlySaving: number;
  annualSaving: number;
}

function computeResults(inputs: CalcInputs): CalcResults {
  const bookkeepingFee = inputs.bookkeepingRequired ? inputs.transactionsPerMonth * 2 : 0;
  const payrollFee = inputs.payrollRequired ? inputs.employeeCount * 3 : 0;
  const vatMonthly = inputs.vatRequired ? (inputs.vatReturnsPerYear * 150) / 12 : 0;
  const monthlyTotal = bookkeepingFee + payrollFee + vatMonthly;

  let finalAccountsBase = 500;
  if (inputs.monthlyRevenue > 10000) finalAccountsBase = 1000;
  else if (inputs.monthlyRevenue >= 1000) finalAccountsBase = 750;

  const finalAccountsFee = inputs.finalAccountsRequired
    ? finalAccountsBase * (inputs.isGroup ? inputs.groupCount : 1)
    : 0;
  const oneOffTotal = finalAccountsFee;

  const employerNI = 0.15 * Math.max(0, inputs.assumedSalary - 5000);
  const pension = 0.03 * inputs.assumedSalary;
  const trueAnnualCost = inputs.assumedSalary + employerNI + pension;
  const trueMonthlyHiringCost = trueAnnualCost / 12;

  const monthlySaving = trueMonthlyHiringCost - monthlyTotal;
  const annualSaving = monthlySaving * 12;

  return {
    bookkeepingFee,
    payrollFee,
    vatMonthly,
    monthlyTotal,
    finalAccountsFee,
    oneOffTotal,
    employerNI,
    pension,
    trueAnnualCost,
    trueMonthlyHiringCost,
    monthlySaving,
    annualSaving,
  };
}

function fmt(n: number, decimals = 0): string {
  return '£' + n.toLocaleString('en-GB', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

interface ToggleRowProps {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

function ToggleRow({ label, checked, onChange }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid rgba(201,168,76,0.12)' }}>
      <span className="font-ui" style={{ fontSize: '14px', color: '#ffffff', fontWeight: 400 }}>
        {label}
      </span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        style={{
          width: '48px',
          height: '26px',
          borderRadius: '13px',
          backgroundColor: checked ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
          border: 'none',
          position: 'relative',
          transition: 'background-color 0.2s ease',
          flexShrink: 0,
          cursor: 'pointer',
        }}
        aria-checked={checked}
        role="switch"
      >
        <span
          style={{
            position: 'absolute',
            top: '3px',
            left: checked ? '25px' : '3px',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            transition: 'left 0.2s ease',
          }}
        />
      </button>
    </div>
  );
}

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  prefix?: string;
  helperText?: string;
}

function NumberInput({ label, value, onChange, min = 0, prefix, helperText }: NumberInputProps) {
  return (
    <div className="mt-3 mb-1">
      <label className="font-ui block mb-1" style={{ fontSize: '12px', color: '#ffffff', letterSpacing: '0.3px' }}>
        {label}
      </label>
      <div className="flex items-center" style={{ border: '1px solid rgba(201,168,76,0.3)', backgroundColor: 'rgba(201,168,76,0.04)' }}>
        {prefix && (
          <span className="font-ui px-3 py-2" style={{ fontSize: '14px', color: 'var(--primary)', borderRight: '1px solid rgba(201,168,76,0.2)' }}>
            {prefix}
          </span>
        )}
        <input
          type="number"
          min={min}
          value={value}
          onChange={(e) => onChange(Math.max(min, Number(e.target.value) || 0))}
          className="w-full bg-transparent px-3 py-2 outline-none font-ui"
          style={{ fontSize: '14px', color: '#ffffff' }}
        />
      </div>
      {helperText && (
        <p className="font-ui mt-1" style={{ fontSize: '11px', color: '#ffffff', lineHeight: 1.5 }}>
          {helperText}
        </p>
      )}
    </div>
  );
}

export default function FractionalFinanceCalculator() {
  const [inputs, setInputs] = useState<CalcInputs>({
    isGroup: false,
    groupCount: 1,
    bookkeepingRequired: false,
    transactionsPerMonth: 100,
    payrollRequired: false,
    employeeCount: 1,
    vatRequired: false,
    vatReturnsPerYear: 4,
    finalAccountsRequired: false,
    monthlyRevenue: 5000,
    assumedSalary: 30000,
  });

  const [showResults, setShowResults] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalName, setModalName] = useState('');
  const [modalEmail, setModalEmail] = useState('');
  const [modalStatus, setModalStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [modalError, setModalError] = useState('');

  const set = useCallback(<K extends keyof CalcInputs>(key: K, value: CalcInputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }, []);

  const results = computeResults(inputs);

  const handleCalculate = () => {
    setShowResults(true);
    setTimeout(() => {
      document.getElementById('ffd-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleSendComparison = async () => {
    if (!modalName.trim() || !modalEmail.trim()) return;
    setModalStatus('submitting');
    setModalError('');
    try {
      const monthlyBreakdown = [];
      if (inputs.bookkeepingRequired && results.bookkeepingFee > 0) monthlyBreakdown.push({ label: 'Bookkeeping', amount: results.bookkeepingFee });
      if (inputs.payrollRequired && results.payrollFee > 0) monthlyBreakdown.push({ label: 'Payroll', amount: results.payrollFee });
      if (inputs.vatRequired && results.vatMonthly > 0) monthlyBreakdown.push({ label: 'VAT Returns (monthly equivalent)', amount: Math.round(results.vatMonthly * 100) / 100 });

      const oneoffBreakdown = [];
      if (inputs.finalAccountsRequired && results.finalAccountsFee > 0) oneoffBreakdown.push({ label: 'Final Accounts & Corporation Tax Return', amount: results.finalAccountsFee });

      const res = await fetch('/api/calculator-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_type: 'limited-company',
          industry: 'Fractional Finance Department',
          is_group: inputs.isGroup,
          group_company_count: inputs.groupCount,
          monthly_total: results.monthlyTotal,
          monthly_breakdown: monthlyBreakdown,
          oneoff_total: results.oneOffTotal,
          oneoff_breakdown: oneoffBreakdown,
          quote_valid_until: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          quote_reference: `FFD-${Date.now().toString(36).toUpperCase()}`,
          name: modalName,
          email: modalEmail,
        }),
      });
      if (!res.ok) throw new Error('Submission failed');
      setModalStatus('success');
    } catch {
      setModalStatus('error');
      setModalError('Something went wrong. Please try again.');
    }
  };

  return (
    <div id="ffd-calculator">
      {/* ── Question Flow ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Q1: Group */}
        <div style={{ border: '1px solid rgba(201,168,76,0.18)', backgroundColor: 'rgba(201,168,76,0.03)', padding: '20px' }}>
          <p className="font-ui mb-2" style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--primary)' }}>
            01 — Company Structure
          </p>
          <ToggleRow label="Is this a group of companies?" checked={inputs.isGroup} onChange={(v) => set('isGroup', v)} />
          {inputs.isGroup && (
            <NumberInput label="How many companies?" value={inputs.groupCount} onChange={(v) => set('groupCount', v)} min={1} />
          )}
        </div>

        {/* Q2: Bookkeeping */}
        <div style={{ border: '1px solid rgba(201,168,76,0.18)', backgroundColor: 'rgba(201,168,76,0.03)', padding: '20px' }}>
          <p className="font-ui mb-2" style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--primary)' }}>
            02 — Bookkeeping
          </p>
          <ToggleRow label="Is bookkeeping required?" checked={inputs.bookkeepingRequired} onChange={(v) => set('bookkeepingRequired', v)} />
          {inputs.bookkeepingRequired && (
            <NumberInput
              label="Transactions per month (average)"
              value={inputs.transactionsPerMonth}
              onChange={(v) => set('transactionsPerMonth', v)}
              min={1}
              helperText="Includes accounts payable and accounts receivable management — no separate charge."
            />
          )}
        </div>

        {/* Q3: Payroll */}
        <div style={{ border: '1px solid rgba(201,168,76,0.18)', backgroundColor: 'rgba(201,168,76,0.03)', padding: '20px' }}>
          <p className="font-ui mb-2" style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--primary)' }}>
            03 — Payroll
          </p>
          <ToggleRow label="Is payroll required?" checked={inputs.payrollRequired} onChange={(v) => set('payrollRequired', v)} />
          {inputs.payrollRequired && (
            <NumberInput label="How many employees?" value={inputs.employeeCount} onChange={(v) => set('employeeCount', v)} min={1} />
          )}
        </div>

        {/* Q4: VAT */}
        <div style={{ border: '1px solid rgba(201,168,76,0.18)', backgroundColor: 'rgba(201,168,76,0.03)', padding: '20px' }}>
          <p className="font-ui mb-2" style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--primary)' }}>
            04 — VAT Returns
          </p>
          <ToggleRow label="Do you need VAT returns filed?" checked={inputs.vatRequired} onChange={(v) => set('vatRequired', v)} />
          {inputs.vatRequired && (
            <NumberInput
              label="How many VAT returns per year?"
              value={inputs.vatReturnsPerYear}
              onChange={(v) => set('vatReturnsPerYear', v)}
              min={1}
              helperText="£150 per return. Most businesses file quarterly (4 per year)."
            />
          )}
        </div>

        {/* Q5: Corporation Tax */}
        <div style={{ border: '1px solid rgba(201,168,76,0.18)', backgroundColor: 'rgba(201,168,76,0.03)', padding: '20px' }}>
          <p className="font-ui mb-2" style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--primary)' }}>
            05 — Final Accounts & Corporation Tax
          </p>
          <ToggleRow label="Final Accounts and Corporation Tax Return required?" checked={inputs.finalAccountsRequired} onChange={(v) => set('finalAccountsRequired', v)} />
          {inputs.finalAccountsRequired && (
            <NumberInput label="Average monthly revenue" value={inputs.monthlyRevenue} onChange={(v) => set('monthlyRevenue', v)} min={0} prefix="£" />
          )}
        </div>

        {/* Q6: Hiring cost */}
        <div style={{ border: '1px solid rgba(201,168,76,0.18)', backgroundColor: 'rgba(201,168,76,0.03)', padding: '20px' }}>
          <p className="font-ui mb-2" style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--primary)' }}>
            06 — What Would Hiring Cost?
          </p>
          <NumberInput
            label="Estimated annual salary for this role"
            value={inputs.assumedSalary}
            onChange={(v) => set('assumedSalary', v)}
            min={0}
            prefix="£"
            helperText="UK bookkeeper salaries typically range £28,000–£38,000/year (source: Indeed, Glassdoor, Morgan McKinley, 2026 data)."
          />
        </div>
      </div>

      {/* Calculate button */}
      <div className="text-center mb-10">
        <button
          onClick={handleCalculate}
          className="font-ui"
          style={{
            backgroundColor: 'var(--primary)',
            color: '#080808',
            padding: '16px 40px',
            fontSize: '13px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Calculate My Comparison →
        </button>
      </div>

      {/* ── Results ── */}
      {showResults && (
        <div id="ffd-results">
          {/* Three-column results */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Cost to Hire In-House */}
            <div style={{ border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.03)', padding: '24px' }}>
              <p className="font-ui mb-4" style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#ffffff' }}>
                Cost to Hire In-House
              </p>
              <div className="mb-1">
                <span className="font-display" style={{ fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 400, color: '#ffffff', lineHeight: 1 }}>
                  {fmt(results.trueMonthlyHiringCost, 2)}
                </span>
                <span className="font-ui ml-1" style={{ fontSize: '13px', color: '#ffffff' }}>/mo</span>
              </div>
              <p className="font-ui mb-5" style={{ fontSize: '12px', color: '#ffffff' }}>
                {fmt(results.trueAnnualCost)} / year
              </p>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
                <p className="font-ui mb-3" style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#ffffff' }}>Breakdown</p>
                {[
                  { label: 'Gross Salary', amount: inputs.assumedSalary },
                  { label: "Employer's NI (15%)", amount: Math.round(results.employerNI * 100) / 100 },
                  { label: 'Pension (3%)', amount: Math.round(results.pension * 100) / 100 },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between py-1" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <span className="font-ui" style={{ fontSize: '13px', color: '#ffffff' }}>{item.label}</span>
                    <span className="font-ui" style={{ fontSize: '13px', color: '#ffffff' }}>{fmt(item.amount)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cost With Reckonwell */}
            <div style={{ border: '2px solid var(--primary)', backgroundColor: 'rgba(201,168,76,0.05)', padding: '24px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-1px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--primary)', padding: '3px 12px' }}>
                <span className="font-ui" style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#080808', fontWeight: 600 }}>Reckonwell</span>
              </div>
              <p className="font-ui mb-4 mt-2" style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--primary)' }}>
                Cost With Reckonwell
              </p>
              <div className="mb-1">
                <span className="font-display" style={{ fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 400, color: 'var(--primary)', lineHeight: 1 }}>
                  {fmt(results.monthlyTotal)}
                </span>
                <span className="font-ui ml-1" style={{ fontSize: '13px', color: 'var(--primary)' }}>/mo</span>
              </div>
              <p className="font-ui mb-5" style={{ fontSize: '12px', color: '#ffffff' }}>
                {fmt(results.monthlyTotal * 12)} / year
                {results.oneOffTotal > 0 && (
                  <span style={{ display: 'block', marginTop: '2px' }}>+ {fmt(results.oneOffTotal)} one-off</span>
                )}
              </p>
              <div style={{ borderTop: '1px solid rgba(201,168,76,0.2)', paddingTop: '16px' }}>
                <p className="font-ui mb-3" style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--primary)' }}>Monthly Breakdown</p>
                {inputs.bookkeepingRequired && results.bookkeepingFee > 0 && (
                  <div className="flex justify-between py-1" style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
                    <span className="font-ui" style={{ fontSize: '13px', color: '#ffffff' }}>Bookkeeping</span>
                    <span className="font-ui" style={{ fontSize: '13px', color: 'var(--primary)' }}>{fmt(results.bookkeepingFee)}</span>
                  </div>
                )}
                {inputs.payrollRequired && results.payrollFee > 0 && (
                  <div className="flex justify-between py-1" style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
                    <span className="font-ui" style={{ fontSize: '13px', color: '#ffffff' }}>Payroll</span>
                    <span className="font-ui" style={{ fontSize: '13px', color: 'var(--primary)' }}>{fmt(results.payrollFee)}</span>
                  </div>
                )}
                {inputs.vatRequired && results.vatMonthly > 0 && (
                  <div className="flex justify-between py-1" style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
                    <span className="font-ui" style={{ fontSize: '13px', color: '#ffffff' }}>VAT Returns (monthly)</span>
                    <span className="font-ui" style={{ fontSize: '13px', color: 'var(--primary)' }}>{fmt(results.vatMonthly, 2)}</span>
                  </div>
                )}
                {results.monthlyTotal === 0 && (
                  <p className="font-ui" style={{ fontSize: '12px', color: '#ffffff' }}>Enable services above to see breakdown</p>
                )}
                {results.oneOffTotal > 0 && (
                  <>
                    <p className="font-ui mt-3 mb-2" style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--primary)' }}>One-Off</p>
                    <div className="flex justify-between py-1" style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
                      <span className="font-ui" style={{ fontSize: '13px', color: '#ffffff' }}>Final Accounts & CT Return</span>
                      <span className="font-ui" style={{ fontSize: '13px', color: 'var(--primary)' }}>{fmt(results.finalAccountsFee)}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* You Could Save */}
            <div style={{ border: '1px solid rgba(45,106,79,0.3)', backgroundColor: 'rgba(45,106,79,0.06)', padding: '24px' }}>
              <p className="font-ui mb-4" style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#52B788' }}>
                You Could Save
              </p>
              <div className="mb-1">
                <span className="font-display" style={{ fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 400, color: '#52B788', lineHeight: 1 }}>
                  {fmt(Math.max(0, results.monthlySaving), 2)}
                </span>
                <span className="font-ui ml-1" style={{ fontSize: '13px', color: '#52B788' }}>/mo</span>
              </div>
              <p className="font-ui mb-5" style={{ fontSize: '12px', color: '#ffffff' }}>
                {fmt(Math.max(0, results.annualSaving))} / year
              </p>
              <div style={{ borderTop: '1px solid rgba(45,106,79,0.2)', paddingTop: '16px' }}>
                <p className="font-ui mb-2" style={{ fontSize: '12px', color: '#ffffff', lineHeight: 1.6 }}>
                  Compared to hiring a full-time bookkeeper at {fmt(inputs.assumedSalary)}/year, the true employer cost is{' '}
                  <strong style={{ color: '#ffffff' }}>{fmt(results.trueAnnualCost)}/year</strong> — versus{' '}
                  <strong style={{ color: 'var(--primary)' }}>{fmt(results.monthlyTotal * 12)}/year</strong> with Reckonwell.
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mb-8 p-5" style={{ border: '1px solid rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <p className="font-ui" style={{ fontSize: '11px', color: '#ffffff', lineHeight: 1.7 }}>
              This shows the gross cost of employment before Employment Allowance. Most eligible small employers can claim up to £10,500/year in Employment Allowance, which may reduce or eliminate employer NI on a single hire — this doesn&apos;t apply to sole-director-only companies. Pension is calculated as a simplified 3% of salary; actual auto-enrolment contributions are based on qualifying earnings bands, which may differ slightly. This comparison doesn&apos;t include recruitment costs, onboarding time, sick pay, or management overhead, which add further real cost to hiring but vary too much to estimate reliably here.
            </p>
          </div>

          {/* Bottom actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => setShowModal(true)}
              className="font-ui"
              style={{
                backgroundColor: 'var(--primary)',
                color: '#080808',
                padding: '14px 32px',
                fontSize: '13px',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Send Me This Comparison →
            </button>
            <a
              href="/contact/"
              className="font-ui"
              style={{ fontSize: '13px', color: '#ffffff', textDecoration: 'underline', textUnderlineOffset: '3px' }}
            >
              Looking for something else? Contact us →
            </a>
          </div>
        </div>
      )}

      {/* ── Lead Capture Modal ── */}
      {showModal && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 9000,
            backgroundColor: 'rgba(0,0,0,0.85)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px',
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div style={{ backgroundColor: '#0f0f0f', border: '1px solid rgba(201,168,76,0.3)', padding: '40px', maxWidth: '480px', width: '100%', position: 'relative' }}>
            <button
              onClick={() => setShowModal(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#ffffff', fontSize: '20px', cursor: 'pointer', lineHeight: 1 }}
              aria-label="Close"
            >
              ×
            </button>
            {modalStatus === 'success' ? (
              <div className="text-center">
                <p style={{ color: 'var(--primary)', fontSize: '32px', marginBottom: '12px' }}>✓</p>
                <h3 className="font-display mb-3" style={{ fontSize: '22px', fontWeight: 400, color: '#ffffff' }}>Comparison sent</h3>
                <p className="font-ui" style={{ fontSize: '14px', color: '#ffffff', lineHeight: 1.6 }}>
                  Check your inbox — we&apos;ve sent your personalised comparison to {modalEmail}.
                </p>
              </div>
            ) : (
              <>
                <p className="section-label mb-3">Send My Comparison</p>
                <h3 className="font-display mb-2" style={{ fontSize: '22px', fontWeight: 400, color: '#ffffff' }}>
                  Get this comparison by email
                </h3>
                <p className="font-ui mb-6" style={{ fontSize: '13px', color: '#ffffff', lineHeight: 1.6 }}>
                  We&apos;ll send you a summary of your personalised cost comparison — no spam, no obligation.
                </p>
                <div className="flex flex-col gap-3 mb-5">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={modalName}
                    onChange={(e) => setModalName(e.target.value)}
                    className="font-ui w-full bg-transparent px-4 py-3 outline-none"
                    style={{ border: '1px solid rgba(201,168,76,0.3)', color: '#ffffff', fontSize: '14px' }}
                  />
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={modalEmail}
                    onChange={(e) => setModalEmail(e.target.value)}
                    className="font-ui w-full bg-transparent px-4 py-3 outline-none"
                    style={{ border: '1px solid rgba(201,168,76,0.3)', color: '#ffffff', fontSize: '14px' }}
                  />
                </div>
                {modalError && (
                  <p className="font-ui mb-3" style={{ fontSize: '12px', color: '#E74C3C' }}>{modalError}</p>
                )}
                <button
                  onClick={handleSendComparison}
                  disabled={modalStatus === 'submitting' || !modalName.trim() || !modalEmail.trim()}
                  className="font-ui w-full"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: '#080808',
                    padding: '14px',
                    fontSize: '13px',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    border: 'none',
                    cursor: modalStatus === 'submitting' ? 'not-allowed' : 'pointer',
                    opacity: (!modalName.trim() || !modalEmail.trim()) ? 0.6 : 1,
                  }}
                >
                  {modalStatus === 'submitting' ? 'Sending…' : 'Send My Comparison →'}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
