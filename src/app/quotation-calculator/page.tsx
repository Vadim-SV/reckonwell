'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// ─── Types ────────────────────────────────────────────────────────────────────

type BusinessType = 'sole-trader' | 'limited-company';

interface BreakdownItem {
  label: string;
  amount: number;
}

interface QuoteResult {
  monthlyTotal: number;
  oneoffTotal: number;
  monthlyBreakdown: BreakdownItem[];
  oneoffBreakdown: BreakdownItem[];
}

// ─── Formula ──────────────────────────────────────────────────────────────────

function calculateQuote(inputs: {
  businessType: BusinessType;
  isGroup: boolean;
  groupCompanyCount: number;
  // Bookkeeping
  bookkeepingRequired: boolean;
  transactionsPerMonth: number;
  // Payroll
  payrollRequired: boolean;
  employees: number;
  // Cleanup
  cleanupRequired: boolean;
  cleanupMonths: number;
  cleanupTransactions: number; // used when bookkeeping not ticked
  // Sole trader one-offs
  selfAssessmentRequired: boolean;
  // Limited company one-offs
  finalAccountsRequired: boolean;
  monthlyRevenue: number;
  directorSaRequired: boolean;
  directorSaCount: number;
  rdRequired: boolean;
  patentBoxRequired: boolean;
  // Both
  vatRegRequired: boolean;
  softwareSetupRequired: boolean;
}): QuoteResult {
  const monthlyBreakdown: BreakdownItem[] = [];
  const oneoffBreakdown: BreakdownItem[] = [];

  // Monthly recurring
  const bookkeepingFee = inputs.bookkeepingRequired ? inputs.transactionsPerMonth * 2 : 0;
  if (bookkeepingFee > 0) monthlyBreakdown.push({ label: 'Bookkeeping', amount: bookkeepingFee });

  const payrollFee = inputs.payrollRequired ? inputs.employees * 3 : 0;
  if (payrollFee > 0) monthlyBreakdown.push({ label: 'Payroll', amount: payrollFee });

  const monthlyTotal = bookkeepingFee + payrollFee;

  // One-off fees
  if (inputs.businessType === 'sole-trader') {
    if (inputs.selfAssessmentRequired) {
      oneoffBreakdown.push({ label: 'Self Assessment', amount: 200 });
    }
  }

  if (inputs.businessType === 'limited-company') {
    if (inputs.finalAccountsRequired) {
      let base: number;
      if (inputs.monthlyRevenue > 10000) base = 1000;
      else if (inputs.monthlyRevenue >= 1000) base = 750;
      else base = 500;
      const multiplier = inputs.isGroup ? Math.max(1, inputs.groupCompanyCount) : 1;
      const finalAccountsFee = base * multiplier;
      oneoffBreakdown.push({ label: 'Final Accounts & CT600', amount: finalAccountsFee });
    }

    if (inputs.directorSaRequired) {
      const dirSaFee = inputs.directorSaCount * 200;
      if (dirSaFee > 0) oneoffBreakdown.push({ label: 'Director Self Assessment', amount: dirSaFee });
    }

    if (inputs.rdRequired) {
      oneoffBreakdown.push({ label: 'R&D Tax Credits Application', amount: 300 });
    }

    if (inputs.patentBoxRequired) {
      oneoffBreakdown.push({ label: 'Patent Box Application', amount: 300 });
    }
  }

  // Both types
  if (inputs.vatRegRequired) {
    oneoffBreakdown.push({ label: 'VAT Registration Assistance', amount: 50 });
  }

  if (inputs.softwareSetupRequired) {
    oneoffBreakdown.push({ label: 'Accounting Software Setup & Training', amount: 100 });
  }

  if (inputs.cleanupRequired) {
    const txForCleanup = inputs.bookkeepingRequired ? inputs.transactionsPerMonth : inputs.cleanupTransactions;
    const cleanupFee = txForCleanup * inputs.cleanupMonths * 2;
    if (cleanupFee > 0) oneoffBreakdown.push({ label: 'Bookkeeping Cleanup', amount: cleanupFee });
  }

  const oneoffTotal = oneoffBreakdown.reduce((s, i) => s + i.amount, 0);

  return { monthlyTotal, oneoffTotal, monthlyBreakdown, oneoffBreakdown };
}

// ─── Toggle component ─────────────────────────────────────────────────────────

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3 text-left w-full"
      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
    >
      <div
        style={{
          width: '44px',
          height: '24px',
          borderRadius: '12px',
          backgroundColor: checked ? 'var(--primary)' : 'rgba(201,168,76,0.2)',
          border: `1px solid ${checked ? 'var(--primary)' : 'var(--gold-border)'}`,
          position: 'relative',
          flexShrink: 0,
          transition: 'background-color 0.2s, border-color 0.2s',
        }}
      >
        <div
          style={{
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            backgroundColor: checked ? '#080808' : 'rgba(201,168,76,0.5)',
            position: 'absolute',
            top: '2px',
            left: checked ? '22px' : '2px',
            transition: 'left 0.2s',
          }}
        />
      </div>
      <span className="font-ui text-sm" style={{ color: 'var(--foreground)' }}>{label}</span>
    </button>
  );
}

// ─── Number input ─────────────────────────────────────────────────────────────

function NumberInput({
  label,
  value,
  onChange,
  min = 0,
  placeholder = '0',
}: {
  label: string;
  value: number | '';
  onChange: (v: number) => void;
  min?: number;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="font-ui text-xs uppercase tracking-widest mb-2 block" style={{ color: 'var(--muted)' }}>
        {label}
      </label>
      <input
        type="number"
        inputMode="numeric"
        min={min}
        value={value === 0 ? '' : value}
        placeholder={placeholder}
        onChange={e => {
          const v = parseInt(e.target.value, 10);
          onChange(isNaN(v) ? 0 : Math.max(min, v));
        }}
        className="w-full bg-transparent font-ui text-sm focus:outline-none transition-colors duration-200"
        style={{
          border: '1px solid var(--gold-border)',
          color: 'var(--foreground)',
          padding: '10px 14px',
          fontSize: '14px',
        }}
        onFocus={e => (e.target.style.borderColor = 'var(--primary)')}
        onBlur={e => (e.target.style.borderColor = 'var(--gold-border)')}
      />
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

function QuestionBlock({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="p-5 md:p-6"
      style={{ border: '1px solid var(--gold-border)', backgroundColor: 'rgba(201,168,76,0.03)', marginBottom: '16px' }}
    >
      {children}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

function QuotationCalculatorContent() {
  // Business type
  const [businessType, setBusinessType] = useState<BusinessType>('sole-trader');
  const [isGroup, setIsGroup] = useState(false);
  const [groupCompanyCount, setGroupCompanyCount] = useState(2);

  // Industry
  const [industry, setIndustry] = useState('');
  const [industryOther, setIndustryOther] = useState('');

  // Bookkeeping
  const [bookkeepingRequired, setBookkeepingRequired] = useState(false);
  const [transactionsPerMonth, setTransactionsPerMonth] = useState(0);

  // Payroll
  const [payrollRequired, setPayrollRequired] = useState(false);
  const [employees, setEmployees] = useState(0);
  const [directorsInPayroll, setDirectorsInPayroll] = useState(0);

  // Cleanup
  const [cleanupRequired, setCleanupRequired] = useState(false);
  const [cleanupMonths, setCleanupMonths] = useState(0);
  const [cleanupTransactions, setCleanupTransactions] = useState(0);

  // Sole trader one-offs
  const [selfAssessmentRequired, setSelfAssessmentRequired] = useState(false);

  // Limited company one-offs
  const [finalAccountsRequired, setFinalAccountsRequired] = useState(false);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [directorSaRequired, setDirectorSaRequired] = useState(false);
  const [directorSaCount, setDirectorSaCount] = useState(0);
  const [rdRequired, setRdRequired] = useState(false);
  const [patentBoxRequired, setPatentBoxRequired] = useState(false);

  // Both
  const [vatRegRequired, setVatRegRequired] = useState(false);
  const [softwareSetupRequired, setSoftwareSetupRequired] = useState(false);

  // Lead capture modal
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const quote = calculateQuote({
    businessType,
    isGroup,
    groupCompanyCount,
    bookkeepingRequired,
    transactionsPerMonth,
    payrollRequired,
    employees,
    cleanupRequired,
    cleanupMonths,
    cleanupTransactions,
    selfAssessmentRequired,
    finalAccountsRequired,
    monthlyRevenue,
    directorSaRequired,
    directorSaCount,
    rdRequired,
    patentBoxRequired,
    vatRegRequired,
    softwareSetupRequired,
  });

  const fmt = (n: number) => `£${n.toLocaleString('en-GB')}`;

  const generateQuoteRef = useCallback(() => {
    const now = new Date();
    return `RW-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitting(true);
    setSubmitError('');

    const quoteRef = generateQuoteRef();
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + 7);

    try {
      const res = await fetch('/api/calculator-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_type: businessType,
          industry: industry === 'Other' ? industryOther || 'Other' : industry,
          is_group: isGroup,
          group_company_count: isGroup ? groupCompanyCount : 1,
          monthly_total: quote.monthlyTotal,
          monthly_breakdown: quote.monthlyBreakdown,
          oneoff_total: quote.oneoffTotal,
          oneoff_breakdown: quote.oneoffBreakdown,
          quote_valid_until: validUntil.toISOString(),
          quote_reference: quoteRef,
          name,
          email,
        }),
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch {
      setSubmitError('Something went wrong. Please try again or email us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const industryOptions = [
    'Landlord / Property',
    'Restaurant / Hospitality',
    'Retail / E-commerce',
    'Construction / Trades',
    'Professional Services',
    'SaaS / Technology',
    'Manufacturing',
    'Healthcare / Wellness',
    'Creative / Media',
    'Charity / Non-Profit / Religious Organisation',
    'Food & Beverage (production)',
    'Transport / Logistics',
    'Beauty / Personal Care',
    'Education / Training',
    'Other',
  ];

  const selectStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: 'transparent',
    border: '1px solid var(--gold-border)',
    color: 'var(--foreground)',
    padding: '10px 14px',
    fontSize: '14px',
    fontFamily: 'inherit',
    appearance: 'none',
    WebkitAppearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23c9a84c' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 14px center',
    paddingRight: '36px',
    cursor: 'pointer',
  };

  return (
    <>
      <Header />
      <main
        style={{
          backgroundColor: 'var(--background)',
          minHeight: '100vh',
          paddingTop: '80px',
          paddingBottom: '60px',
        }}
      >
        {/* Hero */}
        <section
          className="px-6 md:px-10 py-14 md:py-18"
          style={{ borderBottom: '1px solid var(--gold-border)' }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <p className="section-label mb-4">Transparent Pricing</p>
            <h1
              className="font-display mb-5"
              style={{ fontSize: 'clamp(28px,4.5vw,52px)', fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.1 }}
            >
              Get Your Instant Quote
            </h1>
            <p className="font-ui" style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.7 }}>
              Answer a few questions below. Your price updates live as you go — no button press needed.
            </p>
          </div>
        </section>

        {/* Form */}
        <section className="px-6 md:px-10 py-10">
          <div className="max-w-2xl mx-auto space-y-4">

            {/* Q1 — Business type */}
            <QuestionBlock>
              <p className="font-ui text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--muted)' }}>
                Question 1 — Business Type
              </p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {(['sole-trader', 'limited-company'] as BusinessType[]).map(bt => (
                  <button
                    key={bt}
                    type="button"
                    onClick={() => setBusinessType(bt)}
                    className="py-3 px-4 font-ui text-sm transition-all duration-200"
                    style={{
                      border: `1px solid ${businessType === bt ? 'var(--primary)' : 'var(--gold-border)'}`,
                      backgroundColor: businessType === bt ? 'rgba(201,168,76,0.1)' : 'transparent',
                      color: businessType === bt ? 'var(--primary)' : 'var(--muted)',
                      cursor: 'pointer',
                    }}
                  >
                    {bt === 'sole-trader' ? 'Sole Trader' : 'Limited Company'}
                  </button>
                ))}
              </div>

              {businessType === 'limited-company' && (
                <div className="mt-4 space-y-4">
                  <Toggle
                    checked={isGroup}
                    onChange={setIsGroup}
                    label="Is this a group of companies?"
                  />
                  {isGroup && (
                    <div className="pl-14">
                      <NumberInput
                        label="How many companies are in the group?"
                        value={groupCompanyCount}
                        onChange={setGroupCompanyCount}
                        min={1}
                        placeholder="e.g. 3"
                      />
                    </div>
                  )}
                </div>
              )}
            </QuestionBlock>

            {/* Q1a — Industry */}
            <QuestionBlock>
              <p className="font-ui text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--muted)' }}>
                Question 1a — Industry
              </p>
              <div style={{ position: 'relative' }}>
                <select
                  value={industry}
                  onChange={e => setIndustry(e.target.value)}
                  style={selectStyle}
                >
                  <option value="" disabled style={{ backgroundColor: '#0d0d0d' }}>Select your industry…</option>
                  {industryOptions.map(opt => (
                    <option key={opt} value={opt} style={{ backgroundColor: '#0d0d0d', color: '#f5f2ec' }}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              {industry === 'Other' && (
                <div className="mt-3">
                  <input
                    type="text"
                    value={industryOther}
                    onChange={e => setIndustryOther(e.target.value)}
                    placeholder="Please specify your industry"
                    className="w-full bg-transparent font-ui text-sm focus:outline-none"
                    style={{
                      border: '1px solid var(--gold-border)',
                      color: 'var(--foreground)',
                      padding: '10px 14px',
                      fontSize: '14px',
                    }}
                    onFocus={e => (e.target.style.borderColor = 'var(--primary)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--gold-border)')}
                  />
                </div>
              )}
            </QuestionBlock>

            {/* Q2 — Bookkeeping */}
            <QuestionBlock>
              <p className="font-ui text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--muted)' }}>
                Question 2 — Bookkeeping
              </p>
              <Toggle
                checked={bookkeepingRequired}
                onChange={setBookkeepingRequired}
                label="Is bookkeeping required?"
              />
              {bookkeepingRequired && (
                <div className="mt-4 pl-14">
                  <NumberInput
                    label="Number of transactions per month (average)"
                    value={transactionsPerMonth}
                    onChange={setTransactionsPerMonth}
                    min={1}
                    placeholder="e.g. 100"
                  />
                </div>
              )}
            </QuestionBlock>

            {/* Q3 — Payroll */}
            <QuestionBlock>
              <p className="font-ui text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--muted)' }}>
                Question 3 — Payroll
              </p>
              <Toggle
                checked={payrollRequired}
                onChange={setPayrollRequired}
                label="Is payroll required?"
              />
              {payrollRequired && (
                <div className="mt-4 pl-14 space-y-4">
                  <NumberInput
                    label="How many employees?"
                    value={employees}
                    onChange={setEmployees}
                    min={1}
                    placeholder="e.g. 5"
                  />
                  <NumberInput
                    label="How many of them are directors? (informational)"
                    value={directorsInPayroll}
                    onChange={setDirectorsInPayroll}
                    min={0}
                    placeholder="e.g. 1"
                  />
                </div>
              )}
            </QuestionBlock>

            {/* Q4 — Cleanup */}
            <QuestionBlock>
              <p className="font-ui text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--muted)' }}>
                Question 4 — Cleanup
              </p>
              <Toggle
                checked={cleanupRequired}
                onChange={setCleanupRequired}
                label="Is cleanup of backlogged books required?"
              />
              {cleanupRequired && (
                <div className="mt-4 pl-14 space-y-4">
                  <NumberInput
                    label="How many months of cleanup?"
                    value={cleanupMonths}
                    onChange={setCleanupMonths}
                    min={1}
                    placeholder="e.g. 6"
                  />
                  {!bookkeepingRequired && (
                    <NumberInput
                      label="Average transactions per month (needed for cleanup calculation)"
                      value={cleanupTransactions}
                      onChange={setCleanupTransactions}
                      min={1}
                      placeholder="e.g. 80"
                    />
                  )}
                </div>
              )}
            </QuestionBlock>

            {/* One-off services */}
            <QuestionBlock>
              <p className="font-ui text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--muted)' }}>
                One-Off Services
              </p>
              <div className="space-y-4">

                {businessType === 'sole-trader' && (
                  <Toggle
                    checked={selfAssessmentRequired}
                    onChange={setSelfAssessmentRequired}
                    label="Is Self Assessment to be done? — £200"
                  />
                )}

                {businessType === 'limited-company' && (
                  <>
                    <div className="space-y-3">
                      <Toggle
                        checked={finalAccountsRequired}
                        onChange={setFinalAccountsRequired}
                        label="Final Accounts and Corporation Tax Submission required?"
                      />
                      {finalAccountsRequired && (
                        <div className="pl-14">
                          <NumberInput
                            label="Average monthly revenue (£)"
                            value={monthlyRevenue}
                            onChange={setMonthlyRevenue}
                            min={0}
                            placeholder="e.g. 15000"
                          />
                          <p className="font-ui text-xs mt-2" style={{ color: 'var(--muted)' }}>
                            Fee: &lt;£1k/mo → £500 · £1k–£10k/mo → £750 · &gt;£10k/mo → £1,000
                            {isGroup && groupCompanyCount > 1 ? ` × ${groupCompanyCount} companies` : ''}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Toggle
                        checked={directorSaRequired}
                        onChange={setDirectorSaRequired}
                        label="Self Assessment required for directors? — £200 per director"
                      />
                      {directorSaRequired && (
                        <div className="pl-14">
                          <NumberInput
                            label="How many directors?"
                            value={directorSaCount}
                            onChange={setDirectorSaCount}
                            min={1}
                            placeholder="e.g. 2"
                          />
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <Toggle
                        checked={rdRequired}
                        onChange={setRdRequired}
                        label="R&D Tax Credits application required? — £300"
                      />
                      {rdRequired && (
                        <p className="font-ui text-xs pl-14" style={{ color: 'var(--muted)' }}>
                          + 5% success fee on any relief secured — invoiced separately once HMRC approves the claim.
                        </p>
                      )}
                    </div>

                    <Toggle
                      checked={patentBoxRequired}
                      onChange={setPatentBoxRequired}
                      label="Patent Box application required? — £300"
                    />
                  </>
                )}

                <Toggle
                  checked={vatRegRequired}
                  onChange={setVatRegRequired}
                  label="VAT Registration Assistance? — £50"
                />

                <Toggle
                  checked={softwareSetupRequired}
                  onChange={setSoftwareSetupRequired}
                  label="Accounting Software Setup & Training? — £100"
                />
              </div>
            </QuestionBlock>

            {/* ── Totals & Breakdown ──────────────────────────────────────── */}
            <div
              className="p-5 md:p-6"
              style={{ border: '1px solid var(--primary)', backgroundColor: 'rgba(201,168,76,0.04)' }}
            >
              {/* Totals row */}
              <div className="flex gap-10 mb-6">
                <div>
                  <p className="font-ui text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--muted)' }}>Monthly Recurring</p>
                  <p className="font-display" style={{ fontSize: '28px', color: 'var(--primary)', fontWeight: 400 }}>
                    {fmt(quote.monthlyTotal)}<span className="font-ui text-xs" style={{ color: 'var(--muted)' }}>/mo</span>
                  </p>
                </div>
                <div>
                  <p className="font-ui text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--muted)' }}>One-Off Fees</p>
                  <p className="font-display" style={{ fontSize: '28px', color: 'var(--foreground)', fontWeight: 400 }}>
                    {fmt(quote.oneoffTotal)}
                  </p>
                </div>
              </div>

              {/* Breakdown */}
              {quote.monthlyBreakdown.length === 0 && quote.oneoffBreakdown.length === 0 ? (
                <p className="font-ui text-sm" style={{ color: 'var(--muted)' }}>
                  Select services above to see your breakdown.
                </p>
              ) : (
                <div className="space-y-5" style={{ borderTop: '1px solid var(--gold-border)', paddingTop: '20px' }}>
                  {quote.monthlyBreakdown.length > 0 && (
                    <div>
                      <p className="font-ui text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--muted)' }}>Monthly Recurring</p>
                      <div className="space-y-2">
                        {quote.monthlyBreakdown.map((item, i) => (
                          <div key={i} className="flex justify-between">
                            <span className="font-ui text-sm" style={{ color: 'var(--foreground)' }}>{item.label}</span>
                            <span className="font-ui text-sm" style={{ color: 'var(--primary)' }}>{fmt(item.amount)}</span>
                          </div>
                        ))}
                        <div className="flex justify-between pt-2" style={{ borderTop: '1px solid var(--gold-border)' }}>
                          <span className="font-ui text-sm font-medium" style={{ color: 'var(--foreground)' }}>Monthly Total</span>
                          <span className="font-ui text-sm font-medium" style={{ color: 'var(--primary)' }}>{fmt(quote.monthlyTotal)}/mo</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {quote.oneoffBreakdown.length > 0 && (
                    <div>
                      <p className="font-ui text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--muted)' }}>One-Off Fees</p>
                      <div className="space-y-2">
                        {quote.oneoffBreakdown.map((item, i) => (
                          <div key={i} className="flex justify-between">
                            <span className="font-ui text-sm" style={{ color: 'var(--foreground)' }}>{item.label}</span>
                            <span className="font-ui text-sm" style={{ color: 'var(--foreground)' }}>{fmt(item.amount)}</span>
                          </div>
                        ))}
                        <div className="flex justify-between pt-2" style={{ borderTop: '1px solid var(--gold-border)' }}>
                          <span className="font-ui text-sm font-medium" style={{ color: 'var(--foreground)' }}>One-Off Total</span>
                          <span className="font-ui text-sm font-medium" style={{ color: 'var(--foreground)' }}>{fmt(quote.oneoffTotal)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="btn-gold flex-1 text-center"
                style={{ minHeight: '52px', padding: '0 28px', fontSize: '14px' }}
              >
                Send Me This Quotation →
              </button>
              <Link
                href="/contact/"
                className="btn-ghost flex-1 text-center flex items-center justify-center"
                style={{ minHeight: '52px', padding: '0 24px', fontSize: '14px' }}
              >
                Looking for something else? Contact us →
              </Link>
            </div>

          </div>
        </section>
      </main>

      {/* ── Lead capture modal ────────────────────────────────────────────── */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
          onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div
            style={{
              backgroundColor: '#0d0d0d',
              border: '1px solid var(--primary)',
              padding: '32px',
              maxWidth: '480px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            {!submitted ? (
              <>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="font-display mb-1" style={{ fontSize: '22px', fontWeight: 400, color: 'var(--foreground)' }}>
                      Send Me This Quotation
                    </h2>
                    <p className="font-ui text-sm" style={{ color: 'var(--muted)' }}>
                      We&apos;ll email your quote — valid for 7 days.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: '20px', lineHeight: 1, padding: '0 0 0 16px' }}
                  >
                    ×
                  </button>
                </div>

                {/* Quote summary in modal */}
                <div
                  className="mb-6 p-4"
                  style={{ backgroundColor: 'rgba(201,168,76,0.06)', border: '1px solid var(--gold-border)' }}
                >
                  <div className="flex gap-8">
                    <div>
                      <p className="font-ui text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--muted)' }}>Monthly</p>
                      <p className="font-display" style={{ fontSize: '20px', color: 'var(--primary)', fontWeight: 400 }}>{fmt(quote.monthlyTotal)}/mo</p>
                    </div>
                    <div>
                      <p className="font-ui text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--muted)' }}>One-Off</p>
                      <p className="font-display" style={{ fontSize: '20px', color: 'var(--foreground)', fontWeight: 400 }}>{fmt(quote.oneoffTotal)}</p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="font-ui text-xs uppercase tracking-widest mb-2 block" style={{ color: 'var(--muted)' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                      placeholder="Your name"
                      className="w-full bg-transparent font-ui text-sm focus:outline-none"
                      style={{ border: '1px solid var(--gold-border)', color: 'var(--foreground)', padding: '10px 14px', fontSize: '14px' }}
                      onFocus={e => (e.target.style.borderColor = 'var(--primary)')}
                      onBlur={e => (e.target.style.borderColor = 'var(--gold-border)')}
                    />
                  </div>
                  <div>
                    <label className="font-ui text-xs uppercase tracking-widest mb-2 block" style={{ color: 'var(--muted)' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      placeholder="your@email.com"
                      className="w-full bg-transparent font-ui text-sm focus:outline-none"
                      style={{ border: '1px solid var(--gold-border)', color: 'var(--foreground)', padding: '10px 14px', fontSize: '14px' }}
                      onFocus={e => (e.target.style.borderColor = 'var(--primary)')}
                      onBlur={e => (e.target.style.borderColor = 'var(--gold-border)')}
                    />
                  </div>
                  {submitError && (
                    <p className="font-ui text-sm" style={{ color: '#ef4444' }}>{submitError}</p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-gold w-full"
                    style={{ minHeight: '48px', opacity: submitting ? 0.7 : 1, fontSize: '14px' }}
                  >
                    {submitting ? 'Sending…' : 'Send My Quotation →'}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <p className="font-display mb-3" style={{ fontSize: '22px', color: 'var(--primary)', fontWeight: 400 }}>
                  Quotation sent.
                </p>
                <p className="font-ui text-sm mb-6" style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
                  Check your inbox — your quotation is on its way. It&apos;s valid for 7 days from today.
                </p>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-ghost"
                  style={{ minHeight: '44px', padding: '0 24px' }}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default function QuotationCalculatorPage() {
  return <QuotationCalculatorContent />;
}
