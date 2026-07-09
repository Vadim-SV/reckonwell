'use client';

import React, { useState, useCallback, useEffect } from 'react';

// ── Fixed market rates (not user-inputted) ──────────────────────────────────
const BK_SALARY = 30000;   // Bookkeeper / Accounts Assistant
const CFO_MONTHLY = 3000;  // Fractional CFO retainer per month

// ── Types ───────────────────────────────────────────────────────────────────
interface CalcState {
  businessType: 'sole-trader' | 'limited-company';
  industry: string;
  bookkeeping: boolean;
  transactions: number;
  ar: boolean;
  ap: boolean;
  chasing: boolean;
  budgets: boolean;
  workingcap: boolean;
  forecasting: boolean;
  mgmtaccounts: boolean;
  kpi: boolean;
  scenario: boolean;
  fundraising: boolean;
  creditcontrol: boolean;
  payroll: boolean;
  employees: number;
  vat: boolean;
  vatReturns: number;
  oneoff: boolean;
  monthlyRevenue: number;
}

interface QuoteResult {
  monthly: number;
  oneoff: number;
  baseMonthly: number;
  advisoryFee: number;
  seniorTicked: boolean;
}

interface HiringCost {
  salary: number;
  ni: number;
  pension: number;
  trueAnnual: number;
}

// ── Helpers ─────────────────────────────────────────────────────────────────
function fmt(n: number): string {
  return '£' + Math.round(n).toLocaleString('en-GB');
}

function calculateQuote(s: CalcState): QuoteResult {
  let baseMonthly = 0;
  if (s.bookkeeping && s.transactions > 0) baseMonthly += s.transactions * 2;
  if (s.payroll && s.employees > 0) baseMonthly += s.employees * 3;
  const vatMonthly = s.vat && s.vatReturns > 0 ? (s.vatReturns * 150) / 12 : 0;

  const seniorTicked =
    s.budgets || s.workingcap || s.forecasting || s.mgmtaccounts || s.kpi || s.scenario || s.fundraising;
  const advisoryFee = seniorTicked ? Math.max(250, baseMonthly) : 0;

  const monthly = baseMonthly + vatMonthly + advisoryFee;

  let oneoff = 0;
  if (s.oneoff) {
    if (s.businessType === 'sole-trader') {
      oneoff = 200;
    } else {
      oneoff = s.monthlyRevenue > 10000 ? 1000 : s.monthlyRevenue >= 1000 ? 750 : 500;
    }
  }

  return { monthly, oneoff, baseMonthly: baseMonthly + vatMonthly, advisoryFee, seniorTicked };
}

function hiringCost(salary: number): HiringCost {
  const ni = 0.15 * Math.max(0, salary - 5000);
  const pension = 0.03 * salary;
  return { salary, ni, pension, trueAnnual: salary + ni + pension };
}

// ── Sub-components ───────────────────────────────────────────────────────────

interface CheckRowProps {
  checked: boolean;
  label: string;
  tag?: string;
  dim?: boolean;
  onToggle: () => void;
}

function CheckRow({ checked, label, tag, dim, onToggle }: CheckRowProps) {
  return (
    <div
      onClick={onToggle}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '9px 0',
        cursor: 'pointer',
        opacity: dim ? 0.55 : 1,
      }}
    >
      <div
        style={{
          width: '20px',
          height: '20px',
          border: `1px solid ${checked ? 'var(--primary)' : 'rgba(201,168,76,0.25)'}`,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          color: 'var(--primary)',
          backgroundColor: checked ? 'rgba(201,168,76,0.10)' : 'transparent',
        }}
      >
        {checked ? '✓' : ''}
      </div>
      <span className="font-ui" style={{ fontSize: '13px', color: '#F0EDE4' }}>
        {label}
      </span>
      {tag && (
        <span
          className="font-ui"
          style={{
            fontSize: '8px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: 'var(--primary)',
            marginLeft: 'auto',
            padding: '2px 6px',
            border: '1px solid rgba(201,168,76,0.25)',
            flexShrink: 0,
          }}
        >
          {tag}
        </span>
      )}
    </div>
  );
}

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
    bookkeeping: true,
    transactions: 150,
    ar: true,
    ap: true,
    chasing: true,
    budgets: false,
    workingcap: false,
    forecasting: false,
    mgmtaccounts: false,
    kpi: false,
    scenario: false,
    fundraising: false,
    creditcontrol: false,
    payroll: false,
    employees: 0,
    vat: false,
    vatReturns: 4,
    oneoff: false,
    monthlyRevenue: 8000,
  });

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

  const quote = calculateQuote(s);
  const bk = hiringCost(BK_SALARY);
  const cfoAnnual = CFO_MONTHLY * 12;

  let trueAnnual: number;
  let trueMonthly: number;
  if (quote.seniorTicked) {
    trueAnnual = bk.trueAnnual + cfoAnnual;
    trueMonthly = trueAnnual / 12;
  } else {
    trueAnnual = bk.trueAnnual;
    trueMonthly = trueAnnual / 12;
  }

  const monthlySavings = Math.max(0, trueMonthly - quote.monthly);
  const annualSavings = Math.max(0, trueAnnual - quote.monthly * 12);

  const handleSendComparison = async () => {
    if (!modalName.trim() || !modalEmail.trim()) return;
    setModalStatus('submitting');
    setModalError('');
    try {
      const res = await fetch('/api/calculator-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_type: s.businessType,
          industry: s.industry,
          monthly_total: quote.monthly,
          oneoff_total: quote.oneoff,
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

  const dividerStyle: React.CSSProperties = {
    borderTop: '1px dashed rgba(201,168,76,0.18)',
    margin: '10px 0',
    paddingTop: '10px',
    fontSize: '9px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    color: 'var(--primary)',
    opacity: 0.7,
  };

  const numberFieldStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid rgba(201,168,76,0.25)',
    padding: '9px 12px',
    backgroundColor: '#1C1A15',
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

  const oneoffLabel = s.businessType === 'sole-trader' ? 'Self Assessment' : 'Corporation Tax';
  const oneoffToggleLabel =
    s.businessType === 'sole-trader' ?'Is Self Assessment to be done?' :'Final Accounts and Corporation Tax Return required?';

  return (
    <div id="ffd-calculator">
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
        <style>{`@keyframes ffd-pulse{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
        Live — updates instantly
      </div>

      {/* Q1: Business Type */}
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

      {/* Q2: Industry */}
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
          {[
            'SaaS / Technology',
            'Retail / E-commerce',
            'Professional Services',
            'Creative / Media',
            'Construction / Trades',
            'Landlord / Property',
            'Other',
          ].map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Q3: Bookkeeping */}
      <div style={qBlockStyle}>
        <div className="font-ui" style={qLabelStyle}>
          <span style={qNumStyle}>3</span>Bookkeeping
        </div>
        <ToggleSwitch checked={s.bookkeeping} label="Is bookkeeping required?" onToggle={() => toggle('bookkeeping')} />
        {s.bookkeeping && (
          <div style={followupStyle}>
            <span className="font-ui" style={fieldLabelStyle}>
              Roughly how many transactions per month?
            </span>
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
          </div>
        )}
      </div>

      {/* Q4: What's Included */}
      <div style={qBlockStyle}>
        <div className="font-ui" style={qLabelStyle}>
          <span style={qNumStyle}>4</span>What&apos;s Included
        </div>
        <CheckRow checked={s.ar} label="Accounts Receivable" onToggle={() => toggle('ar')} />
        <CheckRow checked={s.ap} label="Accounts Payable" onToggle={() => toggle('ap')} />
        <CheckRow checked={s.chasing} label="Invoice chasing" onToggle={() => toggle('chasing')} />

        <div className="font-ui" style={dividerStyle}>
          Senior-level analysis — triggers Fractional CFO comparison
        </div>

        <CheckRow checked={s.budgets} label="Dynamic budgets" onToggle={() => toggle('budgets')} />
        <CheckRow checked={s.workingcap} label="Working capital monitoring &amp; calculations" onToggle={() => toggle('workingcap')} />
        <CheckRow checked={s.forecasting} label="Forecasting" onToggle={() => toggle('forecasting')} />
        <CheckRow checked={s.mgmtaccounts} label="Management accounts / reporting pack" onToggle={() => toggle('mgmtaccounts')} />
        <CheckRow checked={s.kpi} label="KPI dashboards" onToggle={() => toggle('kpi')} />
        <CheckRow checked={s.scenario} label="Scenario planning" onToggle={() => toggle('scenario')} />
        <CheckRow checked={s.fundraising} label="Fundraising &amp; investor support" onToggle={() => toggle('fundraising')} />

        <div className="font-ui" style={dividerStyle}>
          Suggested addition — confirm before including
        </div>

        <CheckRow
          checked={s.creditcontrol}
          label="Credit control"
          tag="Suggested"
          dim={!s.creditcontrol}
          onToggle={() => toggle('creditcontrol')}
        />
      </div>

      {/* Q5: Payroll */}
      <div style={qBlockStyle}>
        <div className="font-ui" style={qLabelStyle}>
          <span style={qNumStyle}>5</span>Payroll
        </div>
        <ToggleSwitch checked={s.payroll} label="Is payroll required?" onToggle={() => toggle('payroll')} />
        {s.payroll && (
          <div style={followupStyle}>
            <span className="font-ui" style={fieldLabelStyle}>
              How many employees?
            </span>
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
          </div>
        )}
      </div>

      {/* Q6: VAT Returns */}
      <div style={qBlockStyle}>
        <div className="font-ui" style={qLabelStyle}>
          <span style={qNumStyle}>6</span>VAT Returns
        </div>
        <ToggleSwitch checked={s.vat} label="Do you need VAT returns filed?" onToggle={() => toggle('vat')} />
        {s.vat && (
          <div style={followupStyle}>
            <span className="font-ui" style={fieldLabelStyle}>
              How many VAT returns per year?
            </span>
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

      {/* Q7: Self Assessment / Corporation Tax */}
      <div style={qBlockStyle}>
        <div className="font-ui" style={qLabelStyle}>
          <span style={qNumStyle}>7</span>{oneoffLabel}
        </div>
        <ToggleSwitch checked={s.oneoff} label={oneoffToggleLabel} onToggle={() => toggle('oneoff')} />
        {s.oneoff && s.businessType === 'limited-company' && (
          <div style={followupStyle}>
            <span className="font-ui" style={fieldLabelStyle}>
              Average monthly revenue
            </span>
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
          </div>
        )}
      </div>

      {/* Q8: How We Calculate */}
      <div style={{ ...qBlockStyle, opacity: 0.85 }}>
        <div className="font-ui" style={qLabelStyle}>
          <span style={qNumStyle}>8</span>How We Calculate &ldquo;Cost to Hire&rdquo;
        </div>
        <p className="font-ui" style={{ fontSize: '12px', color: '#F0EDE4', lineHeight: 1.7 }}>
          We use real UK market averages, not a number you type in — so the comparison stays honest and consistent.
        </p>
        <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid rgba(201,168,76,0.18)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#F0EDE4', padding: '6px 0', borderBottom: '1px solid rgba(201,168,76,0.18)' }}>
            <span className="font-ui">Bookkeeper / Accounts Assistant</span>
            <span className="font-ui">£30,000/year</span>
          </div>
          <p className="font-ui" style={{ fontSize: '11px', color: '#F0EDE4', marginTop: '4px', lineHeight: 1.6, opacity: 0.75 }}>
            Source: Indeed, Glassdoor, Morgan McKinley, 2026 data (range £28,000–£38,000/year)
          </p>
        </div>
        <div style={{ marginTop: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#F0EDE4', padding: '6px 0', borderBottom: '1px solid rgba(201,168,76,0.18)' }}>
            <span className="font-ui">Fractional CFO retainer</span>
            <span className="font-ui">£3,000/month</span>
          </div>
          <p className="font-ui" style={{ fontSize: '11px', color: '#F0EDE4', marginTop: '4px', lineHeight: 1.6, opacity: 0.75 }}>
            Source: LJS Accounting, Leadership Services, FD Capital, Consult EFC, 2026 data (range £1,500–£7,000/month). No employer NI or pension — this is a contractor fee, only used when a senior-level item is ticked above.
          </p>
        </div>
      </div>

      {/* ── Results Panel ── */}
      <div
        style={{
          border: '2px solid var(--primary)',
          backgroundColor: 'rgba(201,168,76,0.05)',
          padding: '24px 22px',
          marginTop: '20px',
        }}
      >
        <p
          className="font-ui"
          style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '16px', fontWeight: 600 }}
        >
          Your Comparison
        </p>

        {/* Scope header — only when senior items ticked */}
        {quote.seniorTicked && (
          <>
            <p className="font-display" style={{ fontSize: '15px', color: '#F0EDE4', marginBottom: '16px', lineHeight: 1.4 }}>
              To replicate this scope, you&apos;d need a bookkeeper plus senior support:
            </p>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#F0EDE4', padding: '6px 0', borderBottom: '1px solid rgba(201,168,76,0.18)' }}>
                <span className="font-ui">Bookkeeper / Accounts Assistant</span>
                <span className="font-ui">{fmt(bk.trueAnnual)}/year</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#F0EDE4', padding: '6px 0', borderBottom: '1px solid rgba(201,168,76,0.18)' }}>
                <span className="font-ui">Fractional CFO ({fmt(CFO_MONTHLY)}/mo retainer)</span>
                <span className="font-ui">{fmt(cfoAnnual)}/year</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--primary)', padding: '10px 0 6px', fontWeight: 600 }}>
                <span className="font-ui">Combined true cost</span>
                <span className="font-ui">{fmt(trueAnnual)}/year</span>
              </div>
            </div>
          </>
        )}

        {/* RW breakdown when senior ticked */}
        {quote.seniorTicked && (
          <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid rgba(201,168,76,0.18)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#F0EDE4', padding: '6px 0', borderBottom: '1px solid rgba(201,168,76,0.18)' }}>
              <span className="font-ui">Base operations (bookkeeping + payroll)</span>
              <span className="font-ui">{fmt(quote.baseMonthly)}/mo</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--primary)', padding: '6px 0' }}>
              <span className="font-ui">+ Advisory &amp; Analysis</span>
              <span className="font-ui">{fmt(quote.advisoryFee)}/mo</span>
            </div>
          </div>
        )}

        {/* Three-column results grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', margin: '18px 0' }}>
          {/* Cost to Hire */}
          <div>
            <p className="font-ui" style={{ fontSize: '9px', letterSpacing: '1px', textTransform: 'uppercase', color: '#F0EDE4', marginBottom: '6px', opacity: 0.7 }}>
              Cost to Hire
            </p>
            <p className="font-display" style={{ fontSize: '22px', color: '#F0EDE4' }}>
              {fmt(trueMonthly)}
            </p>
            <p className="font-ui" style={{ fontSize: '10px', color: '#F0EDE4', marginTop: '2px', opacity: 0.6 }}>
              {fmt(trueAnnual)}/year
            </p>
          </div>

          {/* With Reckonwell */}
          <div>
            <p className="font-ui" style={{ fontSize: '9px', letterSpacing: '1px', textTransform: 'uppercase', color: '#F0EDE4', marginBottom: '6px', opacity: 0.7 }}>
              With Reckonwell
            </p>
            <p className="font-display" style={{ fontSize: '22px', color: '#F0EDE4' }}>
              {fmt(quote.monthly)}
            </p>
            <p className="font-ui" style={{ fontSize: '10px', color: '#F0EDE4', marginTop: '2px', opacity: 0.6 }}>
              {fmt(quote.monthly * 12)}
              {quote.oneoff > 0 ? ` + ${fmt(quote.oneoff)} one-off` : '/year'}
            </p>
          </div>

          {/* You Save */}
          <div>
            <p className="font-ui" style={{ fontSize: '9px', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '6px' }}>
              You Save
            </p>
            <p className="font-display" style={{ fontSize: '22px', color: 'var(--primary)' }}>
              {fmt(monthlySavings)}
            </p>
            <p className="font-ui" style={{ fontSize: '10px', color: '#F0EDE4', marginTop: '2px', opacity: 0.6 }}>
              {fmt(annualSavings)}/year
            </p>
          </div>
        </div>

        {/* Explain line — only when senior items ticked */}
        {quote.seniorTicked && (
          <p
            className="font-ui"
            style={{ fontSize: '11.5px', color: '#F0EDE4', lineHeight: 1.6, marginTop: '14px', paddingTop: '14px', borderTop: '1px solid rgba(201,168,76,0.25)' }}
          >
            A bookkeeper handles day-to-day data entry. Forecasting, board reporting, and fundraising support are genuinely CFO-level work — the same scope UK businesses typically hire a Fractional CFO for. Reckonwell provides both, in one service.
          </p>
        )}

        {/* Disclaimer */}
        <p
          className="font-ui"
          style={{ fontSize: '10px', color: '#F0EDE4', lineHeight: 1.6, marginTop: '14px', paddingTop: '14px', borderTop: '1px solid rgba(201,168,76,0.18)', opacity: 0.65 }}
        >
          This shows the gross cost of employment before Employment Allowance. Pension is a simplified 3% estimate. Doesn&apos;t include recruitment, onboarding, sick pay, or management overhead.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
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
            style={{ fontSize: '13px', color: '#F0EDE4', textDecoration: 'underline', textUnderlineOffset: '3px' }}
          >
            Looking for something else? Contact us →
          </a>
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
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div style={{ backgroundColor: '#0f0f0f', border: '1px solid rgba(201,168,76,0.3)', padding: '40px', maxWidth: '480px', width: '100%', position: 'relative' }}>
            <button
              onClick={() => setShowModal(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#F0EDE4', fontSize: '20px', cursor: 'pointer', lineHeight: 1 }}
              aria-label="Close"
            >
              ×
            </button>
            {modalStatus === 'success' ? (
              <div className="text-center">
                <p style={{ color: 'var(--primary)', fontSize: '32px', marginBottom: '12px' }}>✓</p>
                <h3 className="font-display mb-3" style={{ fontSize: '22px', fontWeight: 400, color: '#F0EDE4' }}>Comparison sent</h3>
                <p className="font-ui" style={{ fontSize: '14px', color: '#F0EDE4', lineHeight: 1.6 }}>
                  Check your inbox — we&apos;ve sent your personalised comparison to {modalEmail}.
                </p>
              </div>
            ) : (
              <>
                <p className="section-label mb-3">Send My Comparison</p>
                <h3 className="font-display mb-2" style={{ fontSize: '22px', fontWeight: 400, color: '#F0EDE4' }}>
                  Get this comparison by email
                </h3>
                <p className="font-ui mb-6" style={{ fontSize: '13px', color: '#F0EDE4', lineHeight: 1.6 }}>
                  We&apos;ll send you a summary of your personalised cost comparison — no spam, no obligation.
                </p>
                <div className="flex flex-col gap-3 mb-5">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={modalName}
                    onChange={(e) => setModalName(e.target.value)}
                    className="font-ui w-full bg-transparent px-4 py-3 outline-none"
                    style={{ border: '1px solid rgba(201,168,76,0.3)', color: '#F0EDE4', fontSize: '14px' }}
                  />
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={modalEmail}
                    onChange={(e) => setModalEmail(e.target.value)}
                    className="font-ui w-full bg-transparent px-4 py-3 outline-none"
                    style={{ border: '1px solid rgba(201,168,76,0.3)', color: '#F0EDE4', fontSize: '14px' }}
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
                    opacity: !modalName.trim() || !modalEmail.trim() ? 0.6 : 1,
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
