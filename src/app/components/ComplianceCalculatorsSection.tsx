'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { trackEvent } from '@/lib/analytics';

// ─── Types ───────────────────────────────────────────────────────────────────

interface CalcResult {
  tier: string;
  monthlyPrice: number;
  annualPrice: number;
  includes: string[];
  summary: Record<string, string>;
}

interface LeadFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `£${(n / 1_000_000).toFixed(1)}m`;
  if (n >= 1_000) return `£${(n / 1_000).toFixed(0)}k`;
  return `£${n}`;
}

// ─── Self Assessment Calculator ──────────────────────────────────────────────

function SelfAssessmentCalc({ onClose }: { onClose: () => void }) {
  const [income, setIncome] = useState(50000);
  const [rental, setRental] = useState<'yes' | 'no'>('no');
  const [complexity, setComplexity] = useState<'simple' | 'moderate' | 'complex'>('simple');
  const [monitoring, setMonitoring] = useState<'quarterly' | 'annual'>('annual');
  const [result, setResult] = useState<CalcResult | null>(null);
  const [showLead, setShowLead] = useState(false);
  const [lead, setLead] = useState<LeadFormData>({ name: '', email: '', company: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const calculate = () => {
    trackEvent('calculator_completed', { calculator_type: 'self-assessment' });
    let tier: string;
    let monthlyPrice: number;
    let annualPrice: number;
    let includes: string[];

    if (income < 100000 && complexity === 'simple' && rental === 'no') {
      tier = 'Foundation';
      monthlyPrice = monitoring === 'quarterly' ? 50 : 0;
      annualPrice = 175;
      includes = ['Annual self assessment filing', 'Tax calculation & review', 'HMRC submission', 'Basic tax planning advice'];
    } else if (income >= 100000 || rental === 'yes' || complexity === 'moderate') {
      tier = 'Growth';
      monthlyPrice = 250;
      annualPrice = 2500;
      includes = ['Annual self assessment filing', 'Rental income accounting', 'Tax optimisation review', 'Quarterly check-ins', 'HMRC query support', 'Capital gains guidance'];
    } else {
      tier = 'Director';
      monthlyPrice = 400;
      annualPrice = 4200;
      includes = ['Full self assessment + company accounts', 'Complex tax planning', 'Investment income review', 'Quarterly strategy sessions', 'Dedicated account manager', 'HMRC investigation support'];
    }

    setResult({
      tier,
      monthlyPrice,
      annualPrice,
      includes,
      summary: {
        'Annual income': formatCurrency(income),
        'Rental income': rental === 'yes' ? 'Yes' : 'No',
        'Tax complexity': complexity.charAt(0).toUpperCase() + complexity.slice(1),
        'Monitoring': monitoring.charAt(0).toUpperCase() + monitoring.slice(1),
      },
    });
    setShowLead(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    trackEvent('form_submitted', { calculator_type: 'self-assessment' });
    try {
      await fetch('/api/calculator-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          calculator_type: 'Self Assessment',
          ...lead,
          recommended_tier: result?.tier,
          recommended_price: result?.monthlyPrice,
          company_details: { annual_income: income, rental_income: rental, tax_complexity: complexity, monitoring },
          timestamp: new Date().toISOString(),
        }),
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ModalShell title="Self Assessment Tax Accounting" onClose={onClose}>
      {!result ? (
        <div className="space-y-6">
          <SliderField label="Annual trading income" value={income} min={0} max={250000} step={5000} onChange={setIncome} format={formatCurrency} />
          <RadioField label="Do you have rental income?" value={rental} options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} onChange={(v) => setRental(v as 'yes' | 'no')} />
          <RadioField label="How complex is your tax?" value={complexity} options={[{ value: 'simple', label: 'Simple' }, { value: 'moderate', label: 'Moderate' }, { value: 'complex', label: 'Complex' }]} onChange={(v) => setComplexity(v as 'simple' | 'moderate' | 'complex')} />
          <RadioField label="Monitoring preference" value={monitoring} options={[{ value: 'quarterly', label: 'Quarterly' }, { value: 'annual', label: 'Annual' }]} onChange={(v) => setMonitoring(v as 'quarterly' | 'annual')} />
          <button onClick={calculate} className="w-full py-4 font-ui text-sm tracking-widest uppercase font-medium transition-all duration-200" style={{ background: 'var(--primary)', color: '#080808', borderRadius: '2px' }}>
            Calculate Your Price →
          </button>
        </div>
      ) : (
        <ResultCard result={result} showLead={showLead} lead={lead} setLead={setLead} submitted={submitted} submitting={submitting} onSubmit={handleSubmit} onReset={() => { setResult(null); setShowLead(false); setSubmitted(false); }} />
      )}
    </ModalShell>
  );
}

// ─── Corporation Tax Calculator ───────────────────────────────────────────────

function CorpTaxCalc({ onClose }: { onClose: () => void }) {
  const [profit, setProfit] = useState(100000);
  const [employees, setEmployees] = useState<'0' | '1-5' | '6-20' | '20+'>('0');
  const [rdSpend, setRdSpend] = useState<'yes' | 'no'>('no');
  const [raising, setRaising] = useState<'yes' | 'no'>('no');
  const [payroll, setPayroll] = useState<'simple' | 'moderate' | 'complex'>('simple');
  const [monitoring, setMonitoring] = useState<'monthly' | 'quarterly' | 'annual'>('quarterly');
  const [result, setResult] = useState<CalcResult | null>(null);
  const [showLead, setShowLead] = useState(false);
  const [lead, setLead] = useState<LeadFormData>({ name: '', email: '', company: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const calculate = () => {
    trackEvent('calculator_completed', { calculator_type: 'corp-tax' });
    let tier: string;
    let monthlyPrice: number;
    let annualPrice: number;
    let includes: string[];

    if (profit >= 2000000 || rdSpend === 'yes' || raising === 'yes') {
      tier = 'Director';
      monthlyPrice = 1000;
      annualPrice = 11000;
      includes = ['Monthly management accounts', 'Real-time cash flow monitoring', 'Quarterly business reviews', 'Annual CT600 filing', 'R&D tax credit support', 'Investment readiness reporting', 'Dedicated CFO-level support'];
    } else if (profit >= 250000 || employees === '6-20' || employees === '20+') {
      tier = 'Growth';
      monthlyPrice = 500;
      annualPrice = 5500;
      includes = ['Monthly management accounts', 'Real-time cash flow monitoring', 'Quarterly business reviews', 'Annual CT600 filing', 'Payroll management', 'VAT returns'];
    } else {
      tier = 'Foundation';
      monthlyPrice = 250;
      annualPrice = 2750;
      includes = ['Quarterly management accounts', 'Annual CT600 filing', 'Basic cash flow monitoring', 'Annual accounts preparation', 'Companies House filing'];
    }

    setResult({
      tier,
      monthlyPrice,
      annualPrice,
      includes,
      summary: {
        'Company profit': formatCurrency(profit),
        'Employees': employees,
        'R&D spend': rdSpend === 'yes' ? 'Yes' : 'No',
        'Raising investment': raising === 'yes' ? 'Yes' : 'No',
        'Monitoring': monitoring.charAt(0).toUpperCase() + monitoring.slice(1),
      },
    });
    setShowLead(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    trackEvent('form_submitted', { calculator_type: 'corp-tax' });
    try {
      await fetch('/api/calculator-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          calculator_type: 'Corporation Tax',
          ...lead,
          recommended_tier: result?.tier,
          recommended_price: result?.monthlyPrice,
          company_details: { annual_profit: profit, employees, rd_spend: rdSpend, raising_investment: raising, payroll_complexity: payroll, monitoring },
          timestamp: new Date().toISOString(),
        }),
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ModalShell title="Corporation Tax Accounting" onClose={onClose}>
      {!result ? (
        <div className="space-y-6">
          <SliderField label="Annual company profit" value={profit} min={0} max={10000000} step={50000} onChange={setProfit} format={formatCurrency} />
          <RadioField label="Number of employees" value={employees} options={[{ value: '0', label: 'Just me' }, { value: '1-5', label: '1–5' }, { value: '6-20', label: '6–20' }, { value: '20+', label: '20+' }]} onChange={(v) => setEmployees(v as '0' | '1-5' | '6-20' | '20+')} />
          <RadioField label="Do you have R&D spend?" value={rdSpend} options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} onChange={(v) => setRdSpend(v as 'yes' | 'no')} />
          <RadioField label="Are you raising investment?" value={raising} options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} onChange={(v) => setRaising(v as 'yes' | 'no')} />
          <RadioField label="Payroll complexity" value={payroll} options={[{ value: 'simple', label: 'Simple' }, { value: 'moderate', label: 'Moderate' }, { value: 'complex', label: 'Complex' }]} onChange={(v) => setPayroll(v as 'simple' | 'moderate' | 'complex')} />
          <RadioField label="Monitoring preference" value={monitoring} options={[{ value: 'monthly', label: 'Monthly' }, { value: 'quarterly', label: 'Quarterly' }, { value: 'annual', label: 'Annual' }]} onChange={(v) => setMonitoring(v as 'monthly' | 'quarterly' | 'annual')} />
          <button onClick={calculate} className="w-full py-4 font-ui text-sm tracking-widest uppercase font-medium transition-all duration-200" style={{ background: 'var(--primary)', color: '#080808', borderRadius: '2px' }}>
            Calculate Your Price →
          </button>
        </div>
      ) : (
        <ResultCard result={result} showLead={showLead} lead={lead} setLead={setLead} submitted={submitted} submitting={submitting} onSubmit={handleSubmit} onReset={() => { setResult(null); setShowLead(false); setSubmitted(false); }} />
      )}
    </ModalShell>
  );
}

// ─── R&D Tax Relief Calculator ────────────────────────────────────────────────

function RDCalc({ onClose }: { onClose: () => void }) {
  const [profit, setProfit] = useState(500000);
  const [rdSpend, setRdSpend] = useState(100000);
  const [patentRevenue, setPatentRevenue] = useState(0);
  const [claimedBefore, setClaimedBefore] = useState<'yes' | 'no' | 'first-time'>('no');
  const [result, setResult] = useState<CalcResult | null>(null);
  const [showLead, setShowLead] = useState(false);
  const [lead, setLead] = useState<LeadFormData>({ name: '', email: '', company: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const rdRelief = Math.round(rdSpend * 0.20);
  const patentSavings = Math.round(patentRevenue * 0.15);
  const totalSavings = rdRelief + patentSavings;

  const calculate = () => {
    trackEvent('calculator_completed', { calculator_type: 'rd-relief' });
    let tier: string;
    let monthlyPrice: number;
    let annualPrice: number;
    let includes: string[];

    if (rdSpend >= 500000 || claimedBefore === 'yes') {
      tier = 'Ongoing';
      monthlyPrice = 400;
      annualPrice = 4200;
      includes = ['Annual R&D claim preparation', 'Technical narrative preparation', 'Qualifying spend analysis', 'Patent Box optimisation', 'HMRC query support', 'Ongoing R&D monitoring'];
    } else if (rdSpend >= 200000) {
      tier = 'Complex';
      monthlyPrice = 0;
      annualPrice = 1500;
      includes = ['Technical narrative preparation', 'Qualifying spend analysis', 'Multi-product R&D review', 'HMRC filing', 'Query support'];
    } else {
      tier = 'Simple';
      monthlyPrice = 0;
      annualPrice = 950;
      includes = ['Technical narrative preparation', 'Qualifying spend analysis', 'HMRC filing', 'Basic query support'];
    }

    setResult({
      tier,
      monthlyPrice,
      annualPrice,
      includes,
      summary: {
        'Company profit': formatCurrency(profit),
        'Annual R&D spend': formatCurrency(rdSpend),
        'Patent/IP revenue': patentRevenue > 0 ? formatCurrency(patentRevenue) : 'None',
        'Potential R&D relief': `£${rdRelief.toLocaleString()}`,
        'Patent box potential': patentSavings > 0 ? `£${patentSavings.toLocaleString()}` : 'N/A',
        'Total potential': `£${totalSavings.toLocaleString()}`,
      },
    });
    setShowLead(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    trackEvent('form_submitted', { calculator_type: 'rd-relief' });
    try {
      await fetch('/api/calculator-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          calculator_type: 'R&D Tax Relief',
          ...lead,
          recommended_tier: result?.tier,
          recommended_price: result?.monthlyPrice || result?.annualPrice,
          calculated_savings: totalSavings,
          company_details: { annual_profit: profit, rd_spend: rdSpend, patent_revenue: patentRevenue, claimed_before: claimedBefore },
          timestamp: new Date().toISOString(),
        }),
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ModalShell title="R&D Tax Relief & Patent Box" onClose={onClose}>
      {!result ? (
        <div className="space-y-6">
          <SliderField label="Annual company profit" value={profit} min={0} max={5000000} step={50000} onChange={setProfit} format={formatCurrency} />
          <SliderField label="Annual R&D spend estimate" value={rdSpend} min={0} max={1000000} step={10000} onChange={setRdSpend} format={formatCurrency} />
          <SliderField label="Annual patent/IP revenue" value={patentRevenue} min={0} max={1000000} step={50000} onChange={setPatentRevenue} format={formatCurrency} />
          <RadioField label="Have you claimed R&D relief before?" value={claimedBefore} options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }, { value: 'first-time', label: 'First time' }]} onChange={(v) => setClaimedBefore(v as 'yes' | 'no' | 'first-time')} />
          {rdSpend > 0 && (
            <div className="p-4 rounded-sm" style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.3)' }}>
              <p className="font-ui text-xs mb-2" style={{ color: '#93c5fd', letterSpacing: '2px', textTransform: 'uppercase' }}>Estimated potential</p>
              <p className="font-display text-2xl" style={{ color: '#60a5fa' }}>£{totalSavings.toLocaleString()}</p>
              <p className="font-ui text-xs mt-1" style={{ color: 'var(--muted)' }}>R&D relief + Patent Box</p>
            </div>
          )}
          <button onClick={calculate} className="w-full py-4 font-ui text-sm tracking-widest uppercase font-medium transition-all duration-200" style={{ background: 'var(--primary)', color: '#080808', borderRadius: '2px' }}>
            Calculate Your Price →
          </button>
        </div>
      ) : (
        <ResultCard result={result} showLead={showLead} lead={lead} setLead={setLead} submitted={submitted} submitting={submitting} onSubmit={handleSubmit} onReset={() => { setResult(null); setShowLead(false); setSubmitted(false); }} />
      )}
    </ModalShell>
  );
}

// ─── MTD Calculator ───────────────────────────────────────────────────────────

function MTDCalc({ onClose }: { onClose: () => void }) {
  const [income, setIncome] = useState(75000);
  const [properties, setProperties] = useState<'0' | '1-2' | '3-5' | '5+'>('0');
  const [filingMTD, setFilingMTD] = useState<'yes' | 'no' | 'not-sure'>('no');
  const [serviceType, setServiceType] = useState<'mtd-only' | 'mtd-sa'>('mtd-only');
  const [otherIncome, setOtherIncome] = useState<'none' | 'simple' | 'complex'>('none');
  const [result, setResult] = useState<CalcResult | null>(null);
  const [showLead, setShowLead] = useState(false);
  const [lead, setLead] = useState<LeadFormData>({ name: '', email: '', company: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const calculate = () => {
    trackEvent('calculator_completed', { calculator_type: 'mtd' });
    let tier: string;
    let monthlyPrice: number;
    let annualPrice: number;
    let includes: string[];

    if (income >= 250000 || otherIncome === 'complex') {
      tier = 'Director';
      monthlyPrice = 350;
      annualPrice = 3850;
      includes = ['Monthly accounts & monitoring', 'Quarterly MTD filing with HMRC', 'Tax due date reminders & alerts', 'Full self assessment preparation', 'Complex income management', 'HMRC query support'];
    } else if (income >= 100000 || properties === '3-5' || properties === '5+' || serviceType === 'mtd-sa') {
      tier = 'Growth';
      monthlyPrice = 275;
      annualPrice = 3025;
      includes = ['Monthly accounts & monitoring', 'Quarterly MTD filing with HMRC', 'Tax due date reminders & alerts', 'Annual self assessment', 'Up to 5 properties (landlords)', 'HMRC query support'];
    } else {
      tier = 'Foundation';
      monthlyPrice = 175;
      annualPrice = 1925;
      includes = ['Monthly accounts & monitoring', 'Quarterly MTD filing with HMRC', 'Tax due date reminders & alerts', 'Up to 2 properties (landlords)', 'HMRC query support'];
    }

    setResult({
      tier,
      monthlyPrice,
      annualPrice,
      includes,
      summary: {
        'Annual income': formatCurrency(income),
        'Rental properties': properties,
        'Currently filing MTD': filingMTD === 'not-sure' ? 'Not sure' : filingMTD === 'yes' ? 'Yes' : 'No',
        'Service type': serviceType === 'mtd-only' ? 'MTD only' : 'MTD + Self Assessment',
      },
    });
    setShowLead(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    trackEvent('form_submitted', { calculator_type: 'mtd' });
    try {
      await fetch('/api/calculator-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          calculator_type: 'Making Tax Digital',
          ...lead,
          recommended_tier: result?.tier,
          recommended_price: result?.monthlyPrice,
          company_details: { annual_income: income, rental_properties: properties, currently_filing_mtd: filingMTD, service_type: serviceType, other_income: otherIncome },
          timestamp: new Date().toISOString(),
        }),
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ModalShell title="Making Tax Digital Filing" onClose={onClose}>
      {!result ? (
        <div className="space-y-6">
          <SliderField label="Annual income" value={income} min={50000} max={5000000} step={10000} onChange={setIncome} format={formatCurrency} />
          <RadioField label="Rental properties" value={properties} options={[{ value: '0', label: 'None' }, { value: '1-2', label: '1–2' }, { value: '3-5', label: '3–5' }, { value: '5+', label: '5+' }]} onChange={(v) => setProperties(v as '0' | '1-2' | '3-5' | '5+')} />
          <RadioField label="Currently filing MTD?" value={filingMTD} options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }, { value: 'not-sure', label: 'Not sure' }]} onChange={(v) => setFilingMTD(v as 'yes' | 'no' | 'not-sure')} />
          <RadioField label="Service preference" value={serviceType} options={[{ value: 'mtd-only', label: 'MTD only' }, { value: 'mtd-sa', label: 'MTD + Self Assessment' }]} onChange={(v) => setServiceType(v as 'mtd-only' | 'mtd-sa')} />
          <RadioField label="Other income" value={otherIncome} options={[{ value: 'none', label: 'None' }, { value: 'simple', label: 'Simple' }, { value: 'complex', label: 'Complex' }]} onChange={(v) => setOtherIncome(v as 'none' | 'simple' | 'complex')} />
          <button onClick={calculate} className="w-full py-4 font-ui text-sm tracking-widest uppercase font-medium transition-all duration-200" style={{ background: 'var(--primary)', color: '#080808', borderRadius: '2px' }}>
            Calculate Your Price →
          </button>
        </div>
      ) : (
        <ResultCard result={result} showLead={showLead} lead={lead} setLead={setLead} submitted={submitted} submitting={submitting} onSubmit={handleSubmit} onReset={() => { setResult(null); setShowLead(false); setSubmitted(false); }} />
      )}
    </ModalShell>
  );
}

// ─── Shared UI Components ─────────────────────────────────────────────────────

function SliderField({ label, value, min, max, step, onChange, format }: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; format: (v: number) => string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="font-ui text-xs uppercase tracking-widest" style={{ color: 'var(--muted)', letterSpacing: '2px' }}>{label}</label>
        <span className="font-display text-lg" style={{ color: 'var(--primary)' }}>{format(value)}</span>
      </div>
      <div className="relative">
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-1 appearance-none rounded-full outline-none"
          style={{
            background: `linear-gradient(to right, var(--primary) ${pct}%, rgba(201,168,76,0.2) ${pct}%)`,
            cursor: 'pointer',
          }}
        />
      </div>
    </div>
  );
}

function RadioField({ label, value, options, onChange }: {
  label: string; value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <p className="font-ui text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--muted)', letterSpacing: '2px' }}>{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className="px-4 py-2 font-ui text-xs transition-all duration-200"
            style={{
              border: `1px solid ${value === opt.value ? 'var(--primary)' : 'var(--border-subtle)'}`,
              background: value === opt.value ? 'var(--gold-dim)' : 'transparent',
              color: value === opt.value ? 'var(--primary)' : 'var(--muted)',
              borderRadius: '2px',
              letterSpacing: '1px',
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ResultCard({ result, showLead, lead, setLead, submitted, submitting, onSubmit, onReset }: {
  result: CalcResult; showLead: boolean;
  lead: LeadFormData; setLead: (d: LeadFormData) => void;
  submitted: boolean; submitting: boolean;
  onSubmit: (e: React.FormEvent) => void; onReset: () => void;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="p-5 mb-6 rounded-sm" style={{ background: 'var(--gold-dim)', border: '1px solid var(--gold-border)' }}>
        <p className="font-ui text-xs mb-1" style={{ color: 'var(--primary)', letterSpacing: '3px', textTransform: 'uppercase' }}>Recommended</p>
        <p className="font-display text-3xl mb-4" style={{ color: 'var(--foreground)' }}>{result.tier}</p>
        <div className="space-y-1 mb-4">
          {Object.entries(result.summary).map(([k, v]) => (
            <div key={k} className="flex justify-between">
              <span className="font-ui text-xs" style={{ color: 'var(--muted)' }}>{k}</span>
              <span className="font-ui text-xs" style={{ color: 'var(--foreground)' }}>{v}</span>
            </div>
          ))}
        </div>
        <div className="pt-4 mb-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <p className="font-ui text-xs mb-2" style={{ color: 'var(--muted)', letterSpacing: '2px', textTransform: 'uppercase' }}>Your service includes</p>
          <ul className="space-y-1">
            {result.includes.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span style={{ color: 'var(--primary)', flexShrink: 0 }}>✓</span>
                <span className="font-ui text-xs" style={{ color: 'var(--body-text)' }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="pt-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          {result.monthlyPrice > 0 && (
            <p className="font-display text-2xl" style={{ color: 'var(--primary)' }}>£{result.monthlyPrice}<span className="text-base font-ui" style={{ color: 'var(--muted)' }}>/month</span></p>
          )}
          <p className="font-ui text-sm" style={{ color: 'var(--muted)' }}>or £{result.annualPrice.toLocaleString()}/year</p>
        </div>
      </div>

      {!submitted ? (
        <form onSubmit={onSubmit} className="space-y-4">
          <p className="font-ui text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--muted)', letterSpacing: '2px' }}>Get your engagement letter</p>
          <input required type="text" placeholder="Your name" value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })}
            className="w-full px-4 py-3 font-ui text-sm outline-none transition-all duration-200"
            style={{ background: 'var(--card)', border: '1px solid var(--border-subtle)', color: 'var(--foreground)', borderRadius: '2px' }} />
          <input required type="email" placeholder="your@email.com" value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })}
            className="w-full px-4 py-3 font-ui text-sm outline-none transition-all duration-200"
            style={{ background: 'var(--card)', border: '1px solid var(--border-subtle)', color: 'var(--foreground)', borderRadius: '2px' }} />
          <input type="text" placeholder="Company name" value={lead.company} onChange={(e) => setLead({ ...lead, company: e.target.value })}
            className="w-full px-4 py-3 font-ui text-sm outline-none transition-all duration-200"
            style={{ background: 'var(--card)', border: '1px solid var(--border-subtle)', color: 'var(--foreground)', borderRadius: '2px' }} />
          <input type="tel" placeholder="Phone (optional)" value={lead.phone} onChange={(e) => setLead({ ...lead, phone: e.target.value })}
            className="w-full px-4 py-3 font-ui text-sm outline-none transition-all duration-200"
            style={{ background: 'var(--card)', border: '1px solid var(--border-subtle)', color: 'var(--foreground)', borderRadius: '2px' }} />
          <button type="submit" disabled={submitting} className="w-full py-4 font-ui text-sm tracking-widest uppercase font-medium transition-all duration-200"
            style={{ background: 'var(--primary)', color: '#080808', borderRadius: '2px', opacity: submitting ? 0.7 : 1 }}>
            {submitting ? 'Sending...' : 'Get Your Engagement Letter →'}
          </button>
        </form>
      ) : (
        <div className="p-5 text-center rounded-sm" style={{ background: 'rgba(45,106,79,0.15)', border: '1px solid rgba(45,106,79,0.4)' }}>
          <p className="font-display text-xl mb-2" style={{ color: '#4ade80' }}>✓ Sent!</p>
          <p className="font-ui text-sm" style={{ color: 'var(--body-text)' }}>Check your inbox. We'll be in touch within 2 hours.</p>
        </div>
      )}

      <button onClick={onReset} className="mt-4 font-ui text-xs uppercase tracking-widest transition-colors duration-200" style={{ color: 'var(--muted)', letterSpacing: '2px' }}>
        ← Recalculate
      </button>
    </motion.div>
  );
}

function ModalShell({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(8,8,8,0.92)', backdropFilter: 'blur(20px)' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-sm"
        style={{ background: 'var(--surface)', border: '1px solid var(--gold-border)' }}
      >
        <div className="flex items-center justify-between p-6" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
          <h3 className="font-display text-xl" style={{ color: 'var(--foreground)' }}>{title}</h3>
          <button onClick={onClose} className="font-ui text-xl transition-colors duration-200" style={{ color: 'var(--muted)', lineHeight: 1 }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}>
            ✕
          </button>
        </div>
        <div className="p-6">{children}</div>
      </motion.div>
    </div>
  );
}

// ─── Calculator Cards ─────────────────────────────────────────────────────────

const cards = [
  {
    icon: '👤',
    iconColor: '#3b82f6',
    title: 'Self Assessment Tax Accounting',
    subtitle: 'For freelancers & sole traders',
    description: 'Tell us about your income and complexity',
    calc: 'self-assessment',
  },
  {
    icon: '🏢',
    iconColor: '#14b8a6',
    title: 'Corporation Tax Accounting',
    subtitle: 'For limited company directors',
    description: 'Tell us about your business',
    calc: 'corp-tax',
  },
  {
    icon: '🔬',
    iconColor: '#f97316',
    title: 'R&D Tax Relief & Patent Box',
    subtitle: 'For tech founders with R&D spend',
    description: 'Tell us about your R&D activity',
    calc: 'rd-relief',
  },
  {
    icon: '📅',
    iconColor: '#22c55e',
    title: 'Making Tax Digital Filing',
    subtitle: 'For landlords & sole traders £50k+',
    description: 'Tell us about your tax situation',
    calc: 'mtd',
  },
];

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function ComplianceCalculatorsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeCalc, setActiveCalc] = useState<string | null>(null);

  const openCalc = (calc: string) => {
    trackEvent('calculator_opened', { calculator_type: calc });
    setActiveCalc(calc);
  };

  return (
    <section ref={ref} className="py-20 md:py-36 px-6 md:px-10" style={{ backgroundColor: '#0a0a0a' }} aria-label="Compliance pricing calculators">
      <div className="max-w-7xl mx-auto">
        <motion.p className="section-label mb-5 md:mb-6" initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          Transparent Pricing
        </motion.p>
        <motion.h2 className="section-h2-medium mb-4" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}>
          Know Your Price.{' '}
          <span className="gold-italic">Transparent Pricing for Every Situation.</span>
        </motion.h2>
        <motion.p className="body-text-rw mb-12 md:mb-16" style={{ maxWidth: '560px' }} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
          Tell us about your company. We'll show exactly what your tax accounting and compliance services cost. No hidden fees. No surprises.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.calc}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group p-6 md:p-8 rounded-sm transition-all duration-300"
              style={{ background: 'var(--card)', border: '1px solid var(--border-subtle)', cursor: 'pointer' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 60px rgba(0,0,0,0.4)';
                (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--gold-border)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-subtle)';
              }}
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="text-3xl" style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.1))' }}>{card.icon}</span>
                <div>
                  <h3 className="font-display text-xl mb-1" style={{ color: 'var(--foreground)', fontWeight: 400 }}>{card.title}</h3>
                  <p className="font-ui text-xs uppercase tracking-widest" style={{ color: card.iconColor, letterSpacing: '2px' }}>{card.subtitle}</p>
                </div>
              </div>
              <p className="body-text-rw mb-6" style={{ fontSize: '14px' }}>{card.description}</p>
              <button
                onClick={() => openCalc(card.calc)}
                className="font-ui text-xs uppercase tracking-widest px-6 py-3 transition-all duration-200"
                style={{ border: `1px solid ${card.iconColor}`, color: card.iconColor, borderRadius: '2px', letterSpacing: '2px' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = card.iconColor;
                  (e.currentTarget as HTMLButtonElement).style.color = '#080808';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                  (e.currentTarget as HTMLButtonElement).style.color = card.iconColor;
                }}
              >
                Calculate Your Price →
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeCalc === 'self-assessment' && <SelfAssessmentCalc onClose={() => setActiveCalc(null)} />}
        {activeCalc === 'corp-tax' && <CorpTaxCalc onClose={() => setActiveCalc(null)} />}
        {activeCalc === 'rd-relief' && <RDCalc onClose={() => setActiveCalc(null)} />}
        {activeCalc === 'mtd' && <MTDCalc onClose={() => setActiveCalc(null)} />}
      </AnimatePresence>
    </section>
  );
}
