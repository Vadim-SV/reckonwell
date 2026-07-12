'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';

// ── Fixed market rates (not user-inputted) ──────────────────────────────────
const BK_SALARY = 30000;          // Bookkeeper gross salary
const BK_TRUE_ANNUAL = 34650;     // £30k + 15% NI on (30k-5k) + 3% pension = 34,650
const FM_SALARY = 58000;          // Finance Manager gross salary
const FM_TRUE_ANNUAL = 67690;     // £58k + 15% NI on (58k-5k) + 3% pension = 67,690
const CFO_TRUE_ANNUAL = 36000;    // Fractional CFO £3,000/mo × 12 (contractor, no NI/pension)
const HR_RETAINER_ANNUAL = 3600;  // HR Retainer £300/mo × 12 (no NI/pension)

const INDUSTRIES = [
  'SaaS / Technology',
  'Retail / E-commerce',
  'Professional Services',
  'Creative / Media',
  'Construction / Trades',
  'Landlord / Property',
  'Healthcare / Medical',
  'Financial Services',
  'Education / Training',
  'Hospitality / Food & Beverage',
  'Manufacturing',
  'Logistics / Transport',
  'Charity / Non-Profit',
  'Legal Services',
  'Other',
];

// ── Types ───────────────────────────────────────────────────────────────────
interface CalcState {
  businessType: 'sole-trader' | 'limited-company';
  industry: string;
  bookkeeping: boolean;
  transactions: number;
  seniorAnalysis: boolean;
  fundraising: boolean;
  payroll: boolean;
  employees: number;
  hrAssistance: boolean;
  vat: boolean;
  vatReturns: number;
  selfAssessment: boolean;
  selfAssessmentPeople: number;
  corpTax: boolean;
  monthlyRevenue: number;
}

// ── Helpers ─────────────────────────────────────────────────────────────────
function fmt(n: number): string {
  return '£' + Math.round(n).toLocaleString('en-GB');
}

function fmtDec(n: number): string {
  return '£' + n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function calculateResults(s: CalcState) {
  // Monthly
  const bookkeeping = s.bookkeeping && s.transactions > 0 ? s.transactions * 2 : 0;
  const payroll = s.payroll && s.employees > 0 ? s.employees * 6 : 0;
  const hrAssistance = s.payroll && s.hrAssistance && s.employees > 0 ? s.employees * 5 : 0;
  const vat = s.vat && s.vatReturns > 0 ? (s.vatReturns * 150) / 12 : 0;
  const baseMonthly = bookkeeping + payroll + hrAssistance + vat;

  const analysisFee = s.seniorAnalysis ? 1000 : 0;
  const fundraisingFee = s.fundraising ? 1000 : 0;
  const advisoryFee = analysisFee + fundraisingFee;

  const totalMonthly = baseMonthly + advisoryFee;

  // One-off
  const selfAssessmentFee = s.selfAssessment && s.selfAssessmentPeople > 0 ? s.selfAssessmentPeople * 200 : 0;
  let corpTaxFee = 0;
  if (s.businessType === 'limited-company' && s.corpTax) {
    if (s.monthlyRevenue > 10000) corpTaxFee = 1000;
    else if (s.monthlyRevenue >= 1000) corpTaxFee = 750;
    else corpTaxFee = 500;
  }
  const totalOneoff = selfAssessmentFee + corpTaxFee;

  // Hiring cost comparison
  let hiringAnnual = BK_TRUE_ANNUAL;
  const roles: { name: string; annual: number }[] = [
    { name: 'Bookkeeper / Accounts Assistant', annual: BK_TRUE_ANNUAL },
  ];
  if (s.seniorAnalysis) {
    hiringAnnual += FM_TRUE_ANNUAL;
    roles.push({ name: 'Finance Manager', annual: FM_TRUE_ANNUAL });
  }
  if (s.fundraising) {
    hiringAnnual += CFO_TRUE_ANNUAL;
    roles.push({ name: 'Fractional CFO (£3,000/mo retainer)', annual: CFO_TRUE_ANNUAL });
  }
  if (s.payroll && s.hrAssistance) {
    hiringAnnual += HR_RETAINER_ANNUAL;
    roles.push({ name: 'HR Retainer Service (£300/mo)', annual: HR_RETAINER_ANNUAL });
  }

  const hiringMonthly = hiringAnnual / 12;
  const monthlySavings = Math.max(0, hiringMonthly - totalMonthly);
  const annualSavings = Math.max(0, hiringAnnual - totalMonthly * 12);

  return {
    bookkeeping,
    payroll,
    hrAssistance,
    vat,
    baseMonthly,
    analysisFee,
    fundraisingFee,
    advisoryFee,
    totalMonthly,
    selfAssessmentFee,
    corpTaxFee,
    totalOneoff,
    hiringAnnual,
    hiringMonthly,
    roles,
    monthlySavings,
    annualSavings,
  };
}

// ── Sub-components ───────────────────────────────────────────────────────────
interface ToggleSwitchProps {
  checked: boolean;
  label: string;
  onToggle: () => void;
}

function ToggleSwitch({ checked, label, onToggle }: ToggleSwitchProps) {
  return (
    <div
      onClick={onToggle}
      style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '5px 0' }}
    >
      <div
        style={{
          width: '44px',
          height: '24px',
          borderRadius: '12px',
          backgroundColor: checked ? 'var(--primary)' : 'rgba(201,168,76,0.2)',
          border: `1px solid ${checked ? 'var(--primary)' : 'rgba(201,168,76,0.25)'}`,
          position: 'relative',
          flexShrink: 0,
          transition: 'all 0.15s',
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
            transition: 'left 0.15s',
          }}
        />
      </div>
      <span className="font-ui" style={{ fontSize: '13px', color: '#F0EDE4', fontWeight: 500 }}>
        {label}
      </span>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function FractionalFinanceCalculator() {
  const [s, setS] = useState<CalcState>({
    businessType: 'sole-trader',
    industry: 'SaaS / Technology',
    bookkeeping: false,
    transactions: 100,
    seniorAnalysis: false,
    fundraising: false,
    payroll: false,
    employees: 5,
    hrAssistance: false,
    vat: false,
    vatReturns: 4,
    selfAssessment: false,
    selfAssessmentPeople: 1,
    corpTax: false,
    monthlyRevenue: 5000,
  });

  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalName, setModalName] = useState('');
  const [modalEmail, setModalEmail] = useState('');
  const [modalStatus, setModalStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [modalError, setModalError] = useState('');

  const toggle = useCallback(<K extends keyof CalcState>(key: K) => {
    setS((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const set = useCallback(<K extends keyof CalcState>(key: K, value: CalcState[K]) => {
    setS((prev) => ({ ...prev, [key]: value }));
  }, []);

  const r = calculateResults(s);

  // Explanatory line logic
  let explanatoryLine = '';
  if (s.seniorAnalysis && s.fundraising) {
    explanatoryLine =
      'Dynamic budgets, forecasting, and management reporting are Finance Manager-level work. Fundraising and investor support are genuinely CFO-level work. Reckonwell provides this scope in one service.';
  } else if (s.seniorAnalysis) {
    explanatoryLine =
      'Dynamic budgets, forecasting, and management reporting are Finance Manager-level work. Reckonwell provides this scope in one service.';
  } else if (s.fundraising) {
    explanatoryLine =
      'Fundraising and investor support are genuinely CFO-level work. Reckonwell provides this scope in one service.';
  }

  const handleSendQuotation = async () => {
    if (!modalName.trim() || !modalEmail.trim()) return;
    setModalStatus('submitting');
    setModalError('');
    try {
      const monthlyBreakdown = [];
      if (r.bookkeeping > 0) monthlyBreakdown.push({ label: `Bookkeeping (${s.transactions} transactions × £2)`, amount: r.bookkeeping });
      if (r.payroll > 0) monthlyBreakdown.push({ label: `Payroll (${s.employees} employees × £6)`, amount: r.payroll });
      if (r.hrAssistance > 0) monthlyBreakdown.push({ label: `HR Assistance (${s.employees} employees × £5)`, amount: r.hrAssistance });
      if (r.vat > 0) monthlyBreakdown.push({ label: `VAT Returns (${s.vatReturns}/year ÷ 12 × £150)`, amount: r.vat });
      if (r.analysisFee > 0) monthlyBreakdown.push({ label: 'Senior-level financial analysis & advisory', amount: r.analysisFee });
      if (r.fundraisingFee > 0) monthlyBreakdown.push({ label: 'Fundraising & investor support', amount: r.fundraisingFee });

      const oneoffBreakdown = [];
      if (r.selfAssessmentFee > 0) oneoffBreakdown.push({ label: `Self Assessment (${s.selfAssessmentPeople} × £200)`, amount: r.selfAssessmentFee });
      if (r.corpTaxFee > 0) oneoffBreakdown.push({ label: 'Final Accounts & Corporation Tax Return', amount: r.corpTaxFee });

      const res = await fetch('/api/calculator-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_type: s.businessType,
          industry: s.industry,
          is_group: false,
          group_company_count: 1,
          monthly_total: r.totalMonthly,
          monthly_breakdown: monthlyBreakdown,
          oneoff_total: r.totalOneoff,
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

  // Styles
  const qBlockStyle: React.CSSProperties = {
    border: '1px solid rgba(201,168,76,0.25)',
    backgroundColor: 'rgba(201,168,76,0.03)',
    padding: '22px',
    marginBottom: '14px',
  };

  const qLabelStyle: React.CSSProperties = {
    fontSize: '10px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: '#F0EDE4',
    marginBottom: '16px',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
  };

  const qNumStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    border: '1px solid var(--primary)',
    color: 'var(--primary)',
    fontSize: '10px',
    marginRight: '8px',
    flexShrink: 0,
  };

  const followupStyle: React.CSSProperties = {
    marginTop: '14px',
    paddingTop: '14px',
    borderTop: '1px solid rgba(201,168,76,0.18)',
  };

  const fieldLabelStyle: React.CSSProperties = {
    fontSize: '10px',
    color: '#F0EDE4',
    letterSpacing: '1px',
    marginBottom: '8px',
    display: 'block',
  };

  const numberFieldStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid rgba(201,168,76,0.25)',
    padding: '9px 12px',
    backgroundColor: '#1C1A15',
  };

  const helperTextStyle: React.CSSProperties = {
    fontSize: '11px',
    color: '#F0EDE4',
    marginTop: '8px',
    lineHeight: 1.6,
    opacity: 0.75,
  };

  const nestedBlockStyle: React.CSSProperties = {
    marginTop: '14px',
    paddingTop: '14px',
    borderTop: '1px solid rgba(201,168,76,0.18)',
    paddingLeft: '16px',
    borderLeft: '2px solid rgba(201,168,76,0.2)',
  };

  const tagGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '6px',
    marginTop: '12px',
    marginBottom: '10px',
  };

  const tagStyle: React.CSSProperties = {
    fontSize: '10px',
    letterSpacing: '0.5px',
    color: 'rgba(201,168,76,0.8)',
    border: '1px solid rgba(201,168,76,0.2)',
    padding: '4px 8px',
    backgroundColor: 'rgba(201,168,76,0.05)',
    textAlign: 'center',
  };

  return (
    <div id="ffd-calculator">
      <style>{`
        @keyframes ffd-pulse{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes ffd-spin{to{transform:rotate(360deg)}}
      `}</style>

      {/* Live badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '9px',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          color: 'var(--primary)',
          backgroundColor: 'rgba(201,168,76,0.10)',
          border: '1px solid rgba(201,168,76,0.25)',
          padding: '5px 10px',
          marginBottom: '20px',
        }}
      >
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary)',
            animation: 'ffd-pulse 1.5s infinite',
            display: 'inline-block',
          }}
        />
        Live — updates instantly
      </div>

      {/* ── Warming Section ── */}
      <div
        style={{
          ...qBlockStyle,
          border: '1px solid rgba(201,168,76,0.35)',
          backgroundColor: 'rgba(201,168,76,0.04)',
          marginBottom: '20px',
        }}
      >
        <p className="font-ui" style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '12px' }}>
          Before You Calculate
        </p>
        <h3 className="font-display" style={{ fontSize: 'clamp(18px,2.5vw,24px)', fontWeight: 400, color: '#F0EDE4', marginBottom: '12px', lineHeight: 1.4 }}>
          You know what you pay. Do you know what it&apos;s really worth?
        </h3>
        <p className="font-ui" style={{ fontSize: '13px', color: '#F0EDE4', lineHeight: 1.7, marginBottom: '14px', opacity: 0.85 }}>
          Most founders can tell you what they pay their bookkeeper. Few can tell you what it would cost to also cover the things that quietly go wrong — unchased invoices, unclear cash position, problems discovered a month too late because the books close once a month.
        </p>
        <p className="font-ui" style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 600, lineHeight: 1.6 }}>
          Answer a few questions below and see your real number in two minutes.
        </p>
      </div>

      {/* ── Q1: Business Type ── */}
      <div style={qBlockStyle}>
        <div className="font-ui" style={qLabelStyle}>
          <span style={qNumStyle}>1</span>Business Type
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {(['sole-trader', 'limited-company'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => set('businessType', type)}
              className="font-ui"
              style={{
                padding: '13px',
                border: `1px solid ${s.businessType === type ? 'var(--primary)' : 'rgba(201,168,76,0.25)'}`,
                backgroundColor: s.businessType === type ? 'rgba(201,168,76,0.10)' : 'transparent',
                color: s.businessType === type ? 'var(--primary)' : '#F0EDE4',
                opacity: s.businessType === type ? 1 : 0.6,
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {type === 'sole-trader' ? 'Sole Trader' : 'Limited Company'}
            </button>
          ))}
        </div>
      </div>

      {/* ── Q2: Industry ── */}
      <div style={qBlockStyle}>
        <div className="font-ui" style={qLabelStyle}>
          <span style={qNumStyle}>2</span>Industry
        </div>
        <select
          value={s.industry}
          onChange={(e) => set('industry', e.target.value)}
          className="font-ui"
          style={{
            width: '100%',
            backgroundColor: '#1C1A15',
            border: '1px solid rgba(201,168,76,0.25)',
            color: '#F0EDE4',
            padding: '11px 14px',
            fontSize: '13px',
            outline: 'none',
          }}
        >
          {INDUSTRIES.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* ── Q3: Bookkeeping ── */}
      <div style={qBlockStyle}>
        <div className="font-ui" style={qLabelStyle}>
          <span style={qNumStyle}>3</span>Bookkeeping
        </div>
        <ToggleSwitch checked={s.bookkeeping} label="Is bookkeeping required?" onToggle={() => toggle('bookkeeping')} />
        {s.bookkeeping && (
          <div style={followupStyle}>
            <span className="font-ui" style={fieldLabelStyle}>Roughly how many transactions per month?</span>
            <div style={numberFieldStyle}>
              <input
                type="number"
                min={0}
                value={s.transactions}
                onChange={(e) => set('transactions', Math.max(0, Number(e.target.value) || 0))}
                className="font-ui"
                style={{ background: 'transparent', border: 'none', outline: 'none', color: '#F0EDE4', fontSize: '14px', width: '100%' }}
              />
            </div>
            <p className="font-ui" style={helperTextStyle}>
              £2/transaction (source: Acenteus CCA 2026, range £0.50–£2.00/transaction).
            </p>
          </div>
        )}
      </div>

      {/* ── Q4: What's Included ── */}
      <div style={qBlockStyle}>
        <div className="font-ui" style={qLabelStyle}>
          <span style={qNumStyle}>4</span>What&apos;s Included
        </div>

        {/* AR & AP — bundled into bookkeeping, descriptive only */}
        <div style={{ marginBottom: '16px' }}>
          <p className="font-ui" style={{ fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: '10px' }}>
            Bundled into bookkeeping — no separate charge
          </p>
          <div style={{ padding: '8px 0', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
            <p className="font-ui" style={{ fontSize: '13px', color: '#F0EDE4', marginBottom: '2px' }}>Accounts Receivable</p>
            <p className="font-ui" style={{ fontSize: '11px', color: 'rgba(240,237,228,0.55)', lineHeight: 1.5 }}>
              Making sure invoices are issued, chased, and paid.
            </p>
          </div>
          <div style={{ padding: '8px 0' }}>
            <p className="font-ui" style={{ fontSize: '13px', color: '#F0EDE4', marginBottom: '2px' }}>Accounts Payable</p>
            <p className="font-ui" style={{ fontSize: '11px', color: 'rgba(240,237,228,0.55)', lineHeight: 1.5 }}>
              Clarity on what you owe and when it&apos;s due.
            </p>
          </div>
        </div>

        {/* Senior-level analysis toggle */}
        <div style={{ paddingTop: '14px', borderTop: '1px solid rgba(201,168,76,0.18)', marginBottom: '14px' }}>
          <ToggleSwitch
            checked={s.seniorAnalysis}
            label="Do you need senior-level financial analysis & advisory?"
            onToggle={() => toggle('seniorAnalysis')}
          />
          <div style={tagGridStyle}>
            {['Dynamic budgets', 'Working capital monitoring', 'Forecasting', 'Management accounts & reporting', 'KPI dashboards', 'Scenario planning', 'Credit control'].map((tag) => (
              <span key={tag} className="font-ui" style={tagStyle}>{tag}</span>
            ))}
          </div>
          <p className="font-ui" style={{ fontSize: '11px', color: 'var(--primary)', marginTop: '4px' }}>
            All included — £1,000/month flat
          </p>
        </div>

        {/* Fundraising toggle */}
        <div style={{ paddingTop: '14px', borderTop: '1px solid rgba(201,168,76,0.18)' }}>
          <ToggleSwitch
            checked={s.fundraising}
            label="Do you need fundraising & investor support?"
            onToggle={() => toggle('fundraising')}
          />
          <p className="font-ui" style={{ ...helperTextStyle, marginTop: '8px' }}>
            Cap table support, investor reporting, and fundraise readiness — genuinely CFO-level work, priced separately from the analysis package above.
          </p>
          <p className="font-ui" style={{ fontSize: '11px', color: 'var(--primary)', marginTop: '6px' }}>
            £1,000/month flat
          </p>
        </div>
      </div>

      {/* ── Q5: Payroll ── */}
      <div style={qBlockStyle}>
        <div className="font-ui" style={qLabelStyle}>
          <span style={qNumStyle}>5</span>Payroll
        </div>
        <ToggleSwitch checked={s.payroll} label="Is payroll required?" onToggle={() => toggle('payroll')} />
        {s.payroll && (
          <div style={followupStyle}>
            <span className="font-ui" style={fieldLabelStyle}>How many employees?</span>
            <div style={numberFieldStyle}>
              <input
                type="number"
                min={0}
                value={s.employees}
                onChange={(e) => set('employees', Math.max(0, Number(e.target.value) || 0))}
                className="font-ui"
                style={{ background: 'transparent', border: 'none', outline: 'none', color: '#F0EDE4', fontSize: '14px', width: '100%' }}
              />
            </div>
            <p className="font-ui" style={helperTextStyle}>
              £6/employee/month (source: Acenteus CCA, OptiBPO, TAJ Accountants, 2026 UK payroll bureau data). Includes holiday and absence management (via Breathe HR) — no separate charge.
            </p>

            {/* HR Assistance — nested */}
            <div style={nestedBlockStyle}>
              <ToggleSwitch
                checked={s.hrAssistance}
                label="Do you need HR assistance?"
                onToggle={() => toggle('hrAssistance')}
              />
              <p className="font-ui" style={helperTextStyle}>
                £5/employee/month. In SMEs, HR is often handled informally by whoever runs payroll — this makes it a proper, advised service instead. Compared against a UK HR retainer (Citation, WorkNest, Peninsula-style) — typically £150–£500/month.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ── Q6: VAT Returns ── */}
      <div style={qBlockStyle}>
        <div className="font-ui" style={qLabelStyle}>
          <span style={qNumStyle}>6</span>VAT Returns
        </div>
        <ToggleSwitch checked={s.vat} label="Do you need VAT returns filed?" onToggle={() => toggle('vat')} />
        {s.vat && (
          <div style={followupStyle}>
            <span className="font-ui" style={fieldLabelStyle}>How many VAT returns per year?</span>
            <div style={numberFieldStyle}>
              <input
                type="number"
                min={1}
                value={s.vatReturns}
                onChange={(e) => set('vatReturns', Math.max(1, Number(e.target.value) || 1))}
                className="font-ui"
                style={{ background: 'transparent', border: 'none', outline: 'none', color: '#F0EDE4', fontSize: '14px', width: '100%' }}
              />
            </div>
          </div>
        )}
      </div>

      {/* ── Q7: Self Assessment ── */}
      <div style={qBlockStyle}>
        <div className="font-ui" style={qLabelStyle}>
          <span style={qNumStyle}>7</span>Self Assessment
        </div>
        <ToggleSwitch checked={s.selfAssessment} label="Is Self Assessment to be done?" onToggle={() => toggle('selfAssessment')} />
        {s.selfAssessment && (
          <div style={followupStyle}>
            <span className="font-ui" style={fieldLabelStyle}>How many people need Self Assessment done?</span>
            <div style={numberFieldStyle}>
              <input
                type="number"
                min={1}
                value={s.selfAssessmentPeople}
                onChange={(e) => set('selfAssessmentPeople', Math.max(1, Number(e.target.value) || 1))}
                className="font-ui"
                style={{ background: 'transparent', border: 'none', outline: 'none', color: '#F0EDE4', fontSize: '14px', width: '100%' }}
              />
            </div>
            <p className="font-ui" style={helperTextStyle}>£200 per person (one-off fee).</p>
          </div>
        )}
      </div>

      {/* ── Q8: Corporation Tax — Limited Company only ── */}
      {s.businessType === 'limited-company' && (
        <div style={qBlockStyle}>
          <div className="font-ui" style={qLabelStyle}>
            <span style={qNumStyle}>8</span>Corporation Tax
          </div>
          <ToggleSwitch
            checked={s.corpTax}
            label="Final Accounts and Corporation Tax Return required?"
            onToggle={() => toggle('corpTax')}
          />
          {s.corpTax && (
            <div style={followupStyle}>
              <span className="font-ui" style={fieldLabelStyle}>Average monthly revenue</span>
              <div style={{ ...numberFieldStyle }}>
                <span className="font-ui" style={{ color: '#F0EDE4', marginRight: '6px', opacity: 0.6 }}>£</span>
                <input
                  type="number"
                  min={0}
                  value={s.monthlyRevenue}
                  onChange={(e) => set('monthlyRevenue', Math.max(0, Number(e.target.value) || 0))}
                  className="font-ui"
                  style={{ background: 'transparent', border: 'none', outline: 'none', color: '#F0EDE4', fontSize: '14px', width: '100%' }}
                />
              </div>
              <p className="font-ui" style={helperTextStyle}>
                Fee: £500 (&lt;£1k/mo) · £750 (£1k–£10k/mo) · £1,000 (&gt;£10k/mo) — one-off.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ── Results Panel ── */}
      <div
        style={{
          border: '2px solid var(--primary)',
          backgroundColor: 'rgba(201,168,76,0.05)',
          padding: '32px 28px',
          marginTop: '24px',
        }}
      >
        <p
          className="font-ui"
          style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '20px', fontWeight: 600 }}
        >
          Your Reckonwell Price
        </p>

        {/* Hero price — large, gold, Playfair Display */}
        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          <p
            className="font-display"
            style={{
              fontSize: 'clamp(44px,8vw,64px)',
              color: 'var(--primary)',
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: '-1px',
            }}
          >
            {fmt(r.totalMonthly)}
            <span className="font-ui" style={{ fontSize: '18px', color: 'var(--primary)', fontWeight: 400, marginLeft: '6px', opacity: 0.8 }}>/mo</span>
          </p>
        </div>

        {/* Muted strikethrough comparison line */}
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <p className="font-ui" style={{ fontSize: '12px', color: 'rgba(240,237,228,0.45)', lineHeight: 1.5 }}>
            vs.{' '}
            <span style={{ textDecoration: 'line-through', color: 'rgba(240,237,228,0.35)' }}>
              {fmtDec(r.hiringMonthly)}/mo
            </span>
            {' '}to hire this in-house
          </p>
        </div>

        {/* One-off fees line */}
        {r.totalOneoff > 0 && (
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <p className="font-ui" style={{ fontSize: '12px', color: 'rgba(240,237,228,0.6)' }}>
              + {fmt(r.totalOneoff)} one-off
            </p>
          </div>
        )}

        {/* You Could Save banner */}
        {r.monthlySavings > 0 && (
          <div
            style={{
              backgroundColor: 'rgba(201,168,76,0.08)',
              border: '1px solid rgba(201,168,76,0.3)',
              padding: '14px 18px',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            <p className="font-ui" style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '6px' }}>
              You Could Save
            </p>
            <p className="font-display" style={{ fontSize: '28px', color: 'var(--primary)', fontWeight: 700 }}>
              {fmt(r.monthlySavings)}/mo
            </p>
            <p className="font-ui" style={{ fontSize: '11px', color: 'rgba(240,237,228,0.6)', marginTop: '4px' }}>
              {fmt(r.annualSavings)}/year vs. hiring in-house
            </p>
          </div>
        )}

        {/* Collapsible breakdown toggle */}
        <div style={{ marginBottom: '20px' }}>
          <button
            type="button"
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="font-ui"
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(240,237,228,0.6)',
              fontSize: '12px',
              cursor: 'pointer',
              padding: '0',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              letterSpacing: '0.5px',
            }}
          >
            <span style={{ transition: 'transform 0.2s', display: 'inline-block', transform: showBreakdown ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
            {showBreakdown ? 'Hide' : 'See'} the full comparison breakdown
          </button>

          {showBreakdown && (
            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(201,168,76,0.18)' }}>
              {/* Full comparison table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
                <thead>
                  <tr>
                    <th className="font-ui" style={{ fontSize: '9px', letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(240,237,228,0.5)', textAlign: 'left', paddingBottom: '8px', borderBottom: '1px solid rgba(201,168,76,0.2)', fontWeight: 400 }}>Role</th>
                    <th className="font-ui" style={{ fontSize: '9px', letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(240,237,228,0.5)', textAlign: 'right', paddingBottom: '8px', borderBottom: '1px solid rgba(201,168,76,0.2)', fontWeight: 400 }}>Cost to Hire / Year</th>
                    <th className="font-ui" style={{ fontSize: '9px', letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(240,237,228,0.5)', textAlign: 'right', paddingBottom: '8px', borderBottom: '1px solid rgba(201,168,76,0.2)', fontWeight: 400 }}>Reckonwell / Month</th>
                  </tr>
                </thead>
                <tbody>
                  {r.roles.map((role, i) => (
                    <tr key={i}>
                      <td className="font-ui" style={{ fontSize: '12px', color: '#F0EDE4', padding: '8px 0', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>{role.name}</td>
                      <td className="font-ui" style={{ fontSize: '12px', color: '#F0EDE4', padding: '8px 0', textAlign: 'right', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>{fmt(role.annual)}/yr</td>
                      <td className="font-ui" style={{ fontSize: '12px', color: 'var(--primary)', padding: '8px 0', textAlign: 'right', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>—</td>
                    </tr>
                  ))}
                  <tr>
                    <td className="font-ui" style={{ fontSize: '12px', color: 'var(--primary)', padding: '10px 0 4px', fontWeight: 600 }}>Total</td>
                    <td className="font-ui" style={{ fontSize: '12px', color: 'var(--primary)', padding: '10px 0 4px', textAlign: 'right', fontWeight: 600 }}>{fmt(r.hiringAnnual)}/yr</td>
                    <td className="font-ui" style={{ fontSize: '13px', color: 'var(--primary)', padding: '10px 0 4px', textAlign: 'right', fontWeight: 700 }}>{fmt(r.totalMonthly)}/mo</td>
                  </tr>
                </tbody>
              </table>

              {/* Explanatory line */}
              {explanatoryLine && (
                <p className="font-ui" style={{ fontSize: '11.5px', color: '#F0EDE4', lineHeight: 1.6, marginBottom: '14px', paddingBottom: '14px', borderBottom: '1px solid rgba(201,168,76,0.18)', opacity: 0.85 }}>
                  {explanatoryLine}
                </p>
              )}

              {/* Disclaimer */}
              <p className="font-ui" style={{ fontSize: '10px', color: '#F0EDE4', lineHeight: 1.6, opacity: 0.55 }}>
                This shows the gross cost of employment before Employment Allowance. Pension is a simplified 3% estimate. Doesn&apos;t include recruitment, onboarding, sick pay, or management overhead.
              </p>
            </div>
          )}
        </div>

        {/* CTA buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="font-ui"
              style={{
                backgroundColor: 'var(--primary)',
                color: '#080808',
                padding: '14px 28px',
                fontSize: '13px',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                flex: '1 1 auto',
                minWidth: '200px',
              }}
            >
              Email Me Quotation →
            </button>
            <Link
              href="/book"
              className="font-ui"
              style={{
                border: '1px solid rgba(201,168,76,0.5)',
                color: 'var(--primary)',
                padding: '14px 28px',
                fontSize: '13px',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                fontWeight: 400,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: '1 1 auto',
                minWidth: '200px',
                textDecoration: 'none',
              }}
            >
              Book a Call
            </Link>
          </div>
        </div>
      </div>

      {/* ── Lead Capture Modal ── */}
      {showModal && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 9000,
            backgroundColor: 'rgba(0,0,0,0.85)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px',
          }}
          onClick={(e) => { if (e.target === e.currentTarget) { setShowModal(false); setModalStatus('idle'); } }}
        >
          <div style={{ backgroundColor: '#0f0f0f', border: '1px solid rgba(201,168,76,0.3)', padding: '40px', maxWidth: '480px', width: '100%', position: 'relative' }}>
            <button
              type="button"
              onClick={() => { setShowModal(false); setModalStatus('idle'); }}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#F0EDE4', fontSize: '20px', cursor: 'pointer', lineHeight: 1 }}
              aria-label="Close"
            >
              ×
            </button>
            {modalStatus === 'success' ? (
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: 'var(--primary)', fontSize: '32px', marginBottom: '12px' }}>✓</p>
                <h3 className="font-display" style={{ fontSize: '22px', fontWeight: 400, color: '#F0EDE4', marginBottom: '12px' }}>Quotation sent</h3>
                <p className="font-ui" style={{ fontSize: '14px', color: '#F0EDE4', lineHeight: 1.6 }}>
                  Check your inbox — we&apos;ve sent your personalised quotation to {modalEmail}.
                </p>
              </div>
            ) : (
              <>
                <p className="section-label" style={{ marginBottom: '12px' }}>Email Me Quotation</p>
                <h3 className="font-display" style={{ fontSize: '22px', fontWeight: 400, color: '#F0EDE4', marginBottom: '8px' }}>
                  Get your quotation by email
                </h3>
                <p className="font-ui" style={{ fontSize: '13px', color: '#F0EDE4', lineHeight: 1.6, marginBottom: '24px', opacity: 0.8 }}>
                  We&apos;ll send you a full breakdown of your personalised quote — no spam, no obligation.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={modalName}
                    onChange={(e) => setModalName(e.target.value)}
                    className="font-ui"
                    style={{ border: '1px solid rgba(201,168,76,0.3)', color: '#F0EDE4', fontSize: '14px', background: 'transparent', padding: '12px 16px', outline: 'none', width: '100%' }}
                  />
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={modalEmail}
                    onChange={(e) => setModalEmail(e.target.value)}
                    className="font-ui"
                    style={{ border: '1px solid rgba(201,168,76,0.3)', color: '#F0EDE4', fontSize: '14px', background: 'transparent', padding: '12px 16px', outline: 'none', width: '100%' }}
                  />
                </div>
                {modalError && (
                  <p className="font-ui" style={{ fontSize: '12px', color: '#E74C3C', marginBottom: '12px' }}>{modalError}</p>
                )}
                <button
                  type="button"
                  onClick={handleSendQuotation}
                  disabled={modalStatus === 'submitting' || !modalName.trim() || !modalEmail.trim()}
                  className="font-ui"
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
                    opacity: !modalName.trim() || !modalEmail.trim() ? 0.6 : 1,
                    width: '100%',
                  }}
                >
                  {modalStatus === 'submitting' ? 'Sending…' : 'Send My Quotation →'}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
