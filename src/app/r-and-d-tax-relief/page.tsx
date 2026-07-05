'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '@/lib/analytics';
import ReferralTeaserSection from '@/app/components/ReferralTeaserSection';
import Breadcrumb from '@/components/Breadcrumb';

// ─── Types ────────────────────────────────────────────────────────────────────

interface CalcInputs {
  turnover: number;
  rdSpend: number;
  patentRevenue: number;
  companySize: 'sme' | 'large';
}

interface CalcResults {
  rdCredit: number;
  patentSavings: number;
  total: number;
  scheme: string;
}

interface LeadForm {
  name: string;
  email: string;
  company: string;
  phone: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number): string {
  if (n >= 1_000_000) return `£${(n / 1_000_000).toFixed(1)}m`;
  if (n >= 1_000) return `£${(n / 1_000).toFixed(0)}k`;
  return `£${n}`;
}

function fmtFull(n: number): string {
  return `£${n.toLocaleString()}`;
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: 'How much R&D spend qualifies?',
    a: 'Depends on the activity, not the amount. Generally qualifying: salaries for developers/engineers working on new tech, software licenses & tools used only for R&D, hardware development & prototyping, testing & validation of new products, R&D subcontracted to external parties. NOT qualifying: routine maintenance or support, admin, HR, finance work, training (unless directly tied to R&D project). We review your situation and identify what counts.',
  },
  {
    q: 'What if I\'m a sole trader or freelancer?',
    a: 'Different rules. If you\'re self-employed/sole trader: R&D Relief allows you to deduct 130% of qualifying spend — this reduces your taxable profit — at 45% tax band, that\'s significant relief. If you\'re a limited company: SME scheme gives 20% direct credit (better), large company scheme gives tax deduction (less generous). We advise which structure makes sense for your situation.',
  },
  {
    q: 'How long does the HMRC process take?',
    a: '4–8 weeks typically. We file everything at once: technical narrative, spend breakdown, supporting evidence (timesheets, project records, code commits). HMRC either approves or asks questions. If they query, we respond. Cash usually lands 2–3 weeks after HMRC approves.',
  },
  {
    q: 'What if HMRC disagrees with my claim?',
    a: 'We defend it. We prepare claims to be defensible from day one. If HMRC challenges: 1) We respond with evidence, 2) If needed, we escalate to formal review, 3) We work with HMRC\'s technical team until resolved. Most claims are approved first submission. If there\'s a dispute, we\'ve got you covered.',
  },
  {
    q: 'How much does it cost?',
    a: 'Depends on complexity. Simple (£50k-£200k R&D spend, 1-2 products): from £950 + filing fee. Complex (£200k+ R&D, multiple products, patent valuation): from £1,500 + filing fee. OR: No benefit, no fee model (20% success fee on relief obtained, minimum £950). We discuss options upfront.',
  },
  {
    q: 'Do I need to keep timesheets?',
    a: 'Helps, but not mandatory. HMRC wants evidence that your team actually spent time on R&D. Best evidence: timesheets/project tracking, git commits with timestamps, project management records (Jira, Asana, Linear), email/Slack showing discussion of technical problems. If you don\'t have this, we can work with what you do have. We advise on what to collect going forward.',
  },
];

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left">
        <span className="font-display text-base md:text-lg pr-4" style={{ color: '#f5f2ec', fontWeight: 400 }}>{q}</span>
        <span className="flex-shrink-0 transition-transform duration-300" style={{ color: '#2563eb', transform: open ? 'rotate(45deg)' : 'none', fontSize: '20px', lineHeight: 1 }}>+</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: 'hidden' }}>
            <p className="pb-5 font-ui text-sm leading-relaxed" style={{ color: 'rgba(245,242,236,0.7)', lineHeight: 1.75 }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Slider ───────────────────────────────────────────────────────────────────

function Slider({ label, value, min, max, step, onChange, helpText }: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; helpText?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="font-ui text-sm font-medium" style={{ color: '#1f2937' }}>{label}</label>
        <span className="font-display text-xl font-bold" style={{ color: '#2563eb' }}>{fmt(value)}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 appearance-none rounded-full outline-none"
        style={{ background: `linear-gradient(to right, #2563eb ${pct}%, #e5e7eb ${pct}%)`, cursor: 'pointer' }} />
      {helpText && <p className="font-ui text-xs mt-2" style={{ color: '#6b7280' }}>{helpText}</p>}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function RDTaxReliefPage() {
  const calcRef = useRef<HTMLDivElement>(null);

  const [inputs, setInputs] = useState<CalcInputs>({ turnover: 1000000, rdSpend: 150000, patentRevenue: 0, companySize: 'sme' });
  const [results, setResults] = useState<CalcResults | null>(null);
  const [lead, setLead] = useState<LeadForm>({ name: '', email: '', company: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const calculate = () => {
    trackEvent('calculator_completed', { calculator_type: 'rd-tax-relief-page' });
    let rdCredit: number;
    let scheme: string;

    if (inputs.companySize === 'sme') {
      rdCredit = Math.round(inputs.rdSpend * 0.20);
      scheme = 'SME R&D Credit Scheme';
    } else {
      const uplift = inputs.rdSpend * 1.30;
      const totalDeductible = inputs.rdSpend + uplift;
      rdCredit = Math.round(totalDeductible * 0.25);
      scheme = 'Large Company R&D Relief';
    }

    const patentSavings = Math.round(inputs.patentRevenue * 0.15);
    setResults({ rdCredit, patentSavings, total: rdCredit + patentSavings, scheme });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    trackEvent('form_submitted', { calculator_type: 'rd-tax-relief-page' });
    try {
      await fetch('/api/calculator-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          calculator_type: 'R&D Tax Relief Page',
          ...lead,
          calculated_savings: results?.total,
          company_details: {
            annual_turnover: inputs.turnover,
            rd_spend: inputs.rdSpend,
            patent_revenue: inputs.patentRevenue,
            company_size: inputs.companySize,
            is_sme: inputs.companySize === 'sme',
          },
          timestamp: new Date().toISOString(),
        }),
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToCalc = () => {
    calcRef.current?.scrollIntoView({ behavior: 'smooth' });
    trackEvent('calculator_opened', { calculator_type: 'rd-tax-relief-page' });
  };

  const examples = [
    {
      type: 'SaaS Company',
      turnover: '£1.5m',
      rdSpend: '£200k/year',
      rdCredit: '£40,000/year',
      patentBox: '£22,500/year',
      total: '£62,500/year',
      quote: 'We were just filing taxes. Reckonwell found £62k we didn\'t know existed.',
      author: 'Sarah T., Founder',
    },
    {
      type: 'Hardware / Robotics',
      turnover: '£3m',
      rdSpend: '£350k/year',
      rdCredit: '£70,000/year',
      patentBox: '£45,000/year',
      total: '£115,000/year',
      quote: 'That\'s salary, hiring, growth.',
      author: 'James W., CEO',
    },
    {
      type: 'Biotech Startup',
      turnover: '£500k',
      rdSpend: '£180k/year',
      rdCredit: '£36,000/year',
      patentBox: null,
      total: '£36,000/year',
      quote: 'Early stage, every penny matters. This extends our runway.',
      author: 'Priya M., Co-founder',
    },
  ];

  return (
    <div style={{ backgroundColor: '#080808', minHeight: '100vh' }}>
      {/* Simple Header */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 h-16" style={{ background: 'rgba(8,8,8,0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(201,168,76,0.18)' }}>
        <Link href="/" className="flex items-center">
          <img src="/assets/images/Reckonwell-1779490857835.png" alt="Reckonwell" style={{ height: '28px', width: 'auto', objectFit: 'contain' }} />
        </Link>
        <Link href="/" className="font-ui text-xs uppercase tracking-widest transition-colors duration-200" style={{ color: 'var(--muted)', letterSpacing: '2px' }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--primary)')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted)')}>
          ← Back to Home
        </Link>
      </nav>

      {/* Standalone Compliance Frame */}
      <Breadcrumb items={[{ label: 'Services', href: '/services' }, { label: 'R&D Tax Relief', href: '/r-and-d-tax-relief' }]} />
      <div className="px-6 md:px-10 py-3" style={{ backgroundColor: 'rgba(201,168,76,0.06)', borderBottom: '1px solid rgba(201,168,76,0.18)' }}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <p className="font-ui text-xs" style={{ color: 'rgba(154,148,144,0.9)' }}>
            <span style={{ color: 'var(--primary)' }}>Standalone compliance service</span> — no ongoing engagement required.
          </p>
          <Link href="/" className="font-ui text-xs" style={{ color: 'var(--primary)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            Need a full finance team? See Fractional Finance →
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="py-20 md:py-32 px-6 md:px-10 text-center" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="font-ui text-xs uppercase tracking-widest mb-6" style={{ color: '#93c5fd', letterSpacing: '4px' }}>R&D Tax Relief & Patent Box</p>
          <h1 className="font-display mb-6" style={{ fontSize: 'clamp(32px, 6vw, 72px)', fontWeight: 400, color: '#f8fafc', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            See Your R&D Tax Savings
          </h1>
          <p className="font-ui mb-10 mx-auto" style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: '#94a3b8', lineHeight: 1.7, maxWidth: '600px', fontWeight: 300 }}>
            Most tech founders leave <strong style={{ color: '#f8fafc' }}>£10k–£100k</strong> on the table in unclaimed R&D Tax Credits and Patent Box relief. In 60 seconds, discover how much your company could be saving.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
            {['Free, no credit card', 'UK-regulated firm', '3-min calculation'].map((badge) => (
              <div key={badge} className="flex items-center gap-2">
                <span style={{ color: '#4ade80' }}>✓</span>
                <span className="font-ui text-sm" style={{ color: '#94a3b8' }}>{badge}</span>
              </div>
            ))}
          </div>
          <button onClick={scrollToCalc} className="font-ui text-sm uppercase tracking-widest px-10 py-5 transition-all duration-200"
            style={{ background: '#2563eb', color: '#ffffff', borderRadius: '2px', letterSpacing: '2px' }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = '#1d4ed8')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = '#2563eb')}>
            Calculate My Savings →
          </button>
        </motion.div>
      </section>

      {/* Examples */}
      <section className="py-20 md:py-28 px-6 md:px-10" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto">
          <p className="section-label mb-5">Real Examples</p>
          <h2 className="section-h2-medium mb-12" style={{ maxWidth: '500px' }}>What's This Actually Worth?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {examples.map((ex, i) => (
              <motion.div key={ex.type} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-6 md:p-8 rounded-sm" style={{ background: 'var(--card)', border: '1px solid var(--border-subtle)' }}>
                <p className="font-ui text-xs uppercase tracking-widest mb-4" style={{ color: '#2563eb', letterSpacing: '2px' }}>{ex.type}</p>
                <div className="space-y-2 mb-5 pb-5" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <div className="flex justify-between"><span className="font-ui text-xs" style={{ color: 'var(--muted)' }}>Annual turnover</span><span className="font-ui text-xs" style={{ color: 'var(--foreground)' }}>{ex.turnover}</span></div>
                  <div className="flex justify-between"><span className="font-ui text-xs" style={{ color: 'var(--muted)' }}>R&D spend</span><span className="font-ui text-xs" style={{ color: 'var(--foreground)' }}>{ex.rdSpend}</span></div>
                  <div className="flex justify-between"><span className="font-ui text-xs" style={{ color: 'var(--muted)' }}>R&D Credit</span><span className="font-ui text-xs font-medium" style={{ color: '#60a5fa' }}>{ex.rdCredit}</span></div>
                  {ex.patentBox && <div className="flex justify-between"><span className="font-ui text-xs" style={{ color: 'var(--muted)' }}>Patent Box</span><span className="font-ui text-xs font-medium" style={{ color: '#60a5fa' }}>{ex.patentBox}</span></div>}
                </div>
                <div className="mb-5">
                  <p className="font-ui text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--muted)', letterSpacing: '2px' }}>Total annual saving</p>
                  <p className="font-display text-3xl" style={{ color: 'var(--primary)', fontWeight: 400 }}>{ex.total}</p>
                </div>
                <p className="font-serif italic text-sm mb-2" style={{ color: 'var(--primary)', lineHeight: 1.6, fontFamily: 'var(--font-serif)' }}>&ldquo;{ex.quote}&rdquo;</p>
                <p className="font-ui text-xs" style={{ color: 'var(--muted)' }}>— {ex.author}</p>
              </motion.div>
            ))}
          </div>
          <p className="font-ui text-sm text-center mx-auto" style={{ color: 'var(--muted)', maxWidth: '700px', lineHeight: 1.7 }}>
            These are real. These are current. The numbers depend on HMRC qualifying your activities — that's where we come in. We handle the technical narrative, valuations, and filing so you get the relief.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section ref={calcRef} id="calculator" className="py-20 md:py-28 px-6 md:px-10" style={{ backgroundColor: '#080808' }}>
        <div className="max-w-4xl mx-auto">
          <p className="section-label mb-5">Interactive Calculator</p>
          <h2 className="section-h2-medium mb-12">Calculate Your Savings</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Inputs */}
            <div className="p-6 md:p-8 rounded-sm" style={{ background: 'var(--card)', border: '1px solid var(--border-subtle)' }}>
              <Slider label="Annual Turnover" value={inputs.turnover} min={100000} max={10000000} step={100000} onChange={(v) => setInputs({ ...inputs, turnover: v })} helpText="Your company's annual revenue or turnover" />
              <Slider label="Annual R&D Spend" value={inputs.rdSpend} min={0} max={1000000} step={10000} onChange={(v) => setInputs({ ...inputs, rdSpend: v })} helpText="Salaries for engineers + software, hardware development, testing, IP development" />
              <Slider label="Annual Patent/IP Revenue" value={inputs.patentRevenue} min={0} max={1000000} step={50000} onChange={(v) => setInputs({ ...inputs, patentRevenue: v })} helpText="Revenue from products/services using patented IP (leave blank if none)" />

              <div className="mb-6">
                <p className="font-ui text-sm font-medium mb-3" style={{ color: '#1f2937' }}>Company Size</p>
                <div className="grid grid-cols-2 gap-3">
                  {[{ value: 'sme', label: 'Small/Medium (SME)', sub: 'Better rates' }, { value: 'large', label: 'Large Company', sub: '130% uplift' }].map((opt) => (
                    <button key={opt.value} onClick={() => setInputs({ ...inputs, companySize: opt.value as 'sme' | 'large' })}
                      className="p-3 text-left rounded-sm transition-all duration-200"
                      style={{ border: `1px solid ${inputs.companySize === opt.value ? '#2563eb' : '#e5e7eb'}`, background: inputs.companySize === opt.value ? 'rgba(37,99,235,0.1)' : '#ffffff' }}>
                      <p className="font-ui text-xs font-medium" style={{ color: inputs.companySize === opt.value ? '#2563eb' : '#374151' }}>{opt.label}</p>
                      <p className="font-ui text-xs" style={{ color: '#9ca3af' }}>{opt.sub}</p>
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={calculate} className="w-full py-4 font-ui text-sm uppercase tracking-widest font-medium transition-all duration-200"
                style={{ background: '#2563eb', color: '#ffffff', borderRadius: '2px', letterSpacing: '2px' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = '#1d4ed8')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = '#2563eb')}>
                Calculate Savings
              </button>
            </div>

            {/* Results */}
            <div>
              {!results ? (
                <div className="h-full flex items-center justify-center p-8 rounded-sm" style={{ background: 'var(--card)', border: '1px solid var(--border-subtle)', minHeight: '300px' }}>
                  <div className="text-center">
                    <p className="font-display text-4xl mb-3" style={{ color: 'var(--border-subtle)' }}>£—</p>
                    <p className="font-ui text-sm" style={{ color: 'var(--muted)' }}>Enter your details and click Calculate</p>
                  </div>
                </div>
              ) : (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-4">
                  <div className="p-5 rounded-sm" style={{ background: 'var(--card)', border: '1px solid var(--border-subtle)' }}>
                    <p className="font-ui text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--muted)', letterSpacing: '2px' }}>R&D Tax Credit</p>
                    <p className="font-display text-3xl" style={{ color: '#60a5fa' }}>{fmtFull(results.rdCredit)}</p>
                    <p className="font-ui text-xs mt-1" style={{ color: 'var(--muted)' }}>{results.scheme}</p>
                  </div>
                  {results.patentSavings > 0 && (
                    <div className="p-5 rounded-sm" style={{ background: 'var(--card)', border: '1px solid var(--border-subtle)' }}>
                      <p className="font-ui text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--muted)', letterSpacing: '2px' }}>Patent Box Savings</p>
                      <p className="font-display text-3xl" style={{ color: '#60a5fa' }}>{fmtFull(results.patentSavings)}</p>
                      <p className="font-ui text-xs mt-1" style={{ color: 'var(--muted)' }}>Patent revenue × 15% (25% → 10% tax rate)</p>
                    </div>
                  )}
                  <div className="p-6 rounded-sm" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.2) 0%, rgba(37,99,235,0.08) 100%)', border: '1px solid rgba(37,99,235,0.4)' }}>
                    <p className="font-ui text-xs uppercase tracking-widest mb-2" style={{ color: '#93c5fd', letterSpacing: '2px' }}>Total Annual Tax Saving</p>
                    <p className="font-display" style={{ fontSize: '48px', color: '#f8fafc', fontWeight: 700, lineHeight: 1 }}>{fmtFull(results.total)}</p>
                    <p className="font-ui text-xs mt-2" style={{ color: '#93c5fd' }}>Real cash back or tax relief, per FY 2024/25 rules</p>
                  </div>
                  <div className="p-5 rounded-sm" style={{ background: 'var(--card)', border: '1px solid var(--border-subtle)' }}>
                    <p className="font-ui text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--muted)', letterSpacing: '2px' }}>How this works</p>
                    <ul className="space-y-2">
                      <li className="font-ui text-xs" style={{ color: 'var(--body-text)', lineHeight: 1.6 }}>• You invested {fmt(inputs.rdSpend)} in R&D. Under {results.scheme}, that gives you {fmtFull(results.rdCredit)} relief.</li>
                      {results.patentSavings > 0 && <li className="font-ui text-xs" style={{ color: 'var(--body-text)', lineHeight: 1.6 }}>• Your patented IP generates {fmt(inputs.patentRevenue)}/year. Patent Box reduces tax from 25% to 10% = {fmtFull(results.patentSavings)}/year saved, ongoing.</li>}
                      <li className="font-ui text-xs font-medium" style={{ color: 'var(--foreground)', lineHeight: 1.6 }}>• These are real numbers, but depend on HMRC qualifying your activities and recognizing your IP. We handle that.</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Lead Capture */}
          {results && (
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-10 p-8 md:p-10 rounded-sm" style={{ background: 'var(--card)', border: '1px solid var(--gold-border)' }}>
              <h3 className="font-display text-2xl mb-3" style={{ color: 'var(--foreground)', fontWeight: 400 }}>Get Help Claiming This</h3>
              <p className="body-text-rw mb-6" style={{ fontSize: '15px' }}>
                R&D Tax Credits and Patent Box are complex. We'll handle the technical narrative, valuations, and HMRC filing — you get the money.
              </p>
              {!submitted ? (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input required type="text" placeholder="Your name" value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })}
                    className="px-4 py-3 font-ui text-sm outline-none" style={{ background: 'var(--surface)', border: '1px solid var(--border-subtle)', color: 'var(--foreground)', borderRadius: '2px' }} />
                  <input required type="email" placeholder="your@email.com" value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })}
                    className="px-4 py-3 font-ui text-sm outline-none" style={{ background: 'var(--surface)', border: '1px solid var(--border-subtle)', color: 'var(--foreground)', borderRadius: '2px' }} />
                  <input required type="text" placeholder="Your company name" value={lead.company} onChange={(e) => setLead({ ...lead, company: e.target.value })}
                    className="px-4 py-3 font-ui text-sm outline-none" style={{ background: 'var(--surface)', border: '1px solid var(--border-subtle)', color: 'var(--foreground)', borderRadius: '2px' }} />
                  <input type="tel" placeholder="Phone (optional)" value={lead.phone} onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                    className="px-4 py-3 font-ui text-sm outline-none" style={{ background: 'var(--surface)', border: '1px solid var(--border-subtle)', color: 'var(--foreground)', borderRadius: '2px' }} />
                  <div className="md:col-span-2">
                    <button type="submit" disabled={submitting} className="w-full py-4 font-ui text-sm uppercase tracking-widest font-medium transition-all duration-200"
                      style={{ background: '#2563eb', color: '#ffffff', borderRadius: '2px', letterSpacing: '2px', opacity: submitting ? 0.7 : 1 }}>
                      {submitting ? 'Sending...' : 'Send Me My Savings Report →'}
                    </button>
                    <p className="font-ui text-xs mt-3 text-center" style={{ color: 'var(--muted)' }}>No obligation. We'll email your full breakdown + next steps. Takes 2 hours from submission to receive your report.</p>
                  </div>
                </form>
              ) : (
                <div className="p-6 text-center rounded-sm" style={{ background: 'rgba(45,106,79,0.15)', border: '1px solid rgba(45,106,79,0.4)' }}>
                  <p className="font-display text-2xl mb-2" style={{ color: '#4ade80' }}>✓ Report Sent!</p>
                  <p className="font-ui text-sm" style={{ color: 'var(--body-text)' }}>Check your inbox. We'll send your full breakdown within 2 hours.</p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      <ReferralTeaserSection />

      {/* How We Help */}
      <section className="py-20 md:py-28 px-6 md:px-10" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-5xl mx-auto">
          <p className="section-label mb-5">Our Process</p>
          <h2 className="section-h2-medium mb-12">How We Help You Claim It</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: '1', title: 'Review & Identify', copy: 'We review 12 months of your R&D spend to identify which activities and developers qualify. We categorize what counts vs. what doesn\'t.', time: '1–2 weeks' },
              { num: '2', title: 'Calculate & Plan', copy: 'We calculate your potential relief, show you the number, and discuss timing. No surprises.', time: '1 week' },
              { num: '3', title: 'File & Monitor', copy: 'We submit everything to HMRC with full documentation. We monitor for queries and respond on your behalf.', time: 'Filed within 30 days. HMRC response typically 4–8 weeks.' },
            ].map((step) => (
              <motion.div key={step.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                className="p-6 md:p-8 rounded-sm" style={{ background: 'var(--card)', border: '1px solid var(--border-subtle)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full font-display text-sm font-bold" style={{ background: 'rgba(37,99,235,0.2)', color: '#60a5fa' }}>{step.num}</span>
                  <h3 className="font-display text-lg" style={{ color: 'var(--foreground)', fontWeight: 400 }}>{step.title}</h3>
                </div>
                <p className="body-text-rw mb-4" style={{ fontSize: '14px' }}>{step.copy}</p>
                <p className="font-ui text-xs" style={{ color: '#2563eb', letterSpacing: '1px' }}>⏱ {step.time}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 px-6 md:px-10" style={{ backgroundColor: '#080808' }}>
        <div className="max-w-3xl mx-auto">
          <p className="section-label mb-5">FAQ</p>
          <h2 className="section-h2-medium mb-10">Common Questions</h2>
          {faqs.map((faq) => <AccordionItem key={faq.q} q={faq.q} a={faq.a} />)}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 md:py-28 px-6 md:px-10 text-center" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="section-h2-medium mb-5">Ready to Claim?</h2>
          <p className="body-text-rw mb-8">
            The calculator gives you a number. We'll turn that into real money. Step 1: Use the calculator above. Step 2: Enter your details. Step 3: We send you a full breakdown + next steps. No obligation. No credit card. Just clarity.
          </p>
          <button onClick={scrollToCalc} className="font-ui text-sm uppercase tracking-widest px-10 py-5 transition-all duration-200"
            style={{ background: '#2563eb', color: '#ffffff', borderRadius: '2px', letterSpacing: '2px' }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = '#1d4ed8')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = '#2563eb')}>
            Calculate Your Savings →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10 px-6 md:px-10 text-center" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--primary)' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src="/assets/images/Reckonwell-1779490857835.png" alt="Reckonwell" style={{ height: '28px', width: 'auto', objectFit: 'contain' }} />
          </div>
          <p className="font-ui text-xs" style={{ color: 'var(--muted)' }}>124 City Road, London EC1V 2NX · 02038186205</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="font-ui text-xs uppercase tracking-widest transition-colors duration-200" style={{ color: 'var(--muted)', letterSpacing: '2px', fontSize: '10px' }}>Privacy</Link>
            <Link href="/terms-of-service" className="font-ui text-xs uppercase tracking-widest transition-colors duration-200" style={{ color: 'var(--muted)', letterSpacing: '2px', fontSize: '10px' }}>Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
