'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// ─── Data ────────────────────────────────────────────────────────────────────

const usCities = [
  { name: 'Austin', slug: 'austin' },
  { name: 'Miami', slug: 'miami' },
  { name: 'Denver', slug: 'denver' },
  { name: 'Chicago', slug: 'chicago' },
  { name: 'Atlanta', slug: 'atlanta' },
  { name: 'Nashville', slug: 'nashville' },
  { name: 'Dallas', slug: 'dallas' },
  { name: 'Phoenix', slug: 'phoenix' },
];

const solutionPillars = [
  {
    num: '01',
    title: 'Daily Monitoring',
    body: 'Your books are updated every morning — not once a month. Transactions reconciled, positions current, anomalies flagged before they become problems.',
  },
  {
    num: '02',
    title: '48-Hour Processing',
    body: 'New client? Fully set up within two working days. Bank feeds connected, data migrated, everything clean and current. You do not lift a finger.',
  },
  {
    num: '03',
    title: 'Your Finance Team',
    body: 'A dedicated team member who knows your business, not a ticketing system. Available when it matters, proactive when it counts.',
  },
];

const comparisonRows = [
  {
    label: 'How often books are updated',
    diy: 'Whenever you find time',
    traditional: 'Once a month, after the fact',
    reckonwell: 'Daily',
  },
  {
    label: 'When you find out about a problem',
    diy: 'Usually too late',
    traditional: '30+ days after it happened',
    reckonwell: 'Within days',
  },
  {
    label: 'Who does the work',
    diy: 'You',
    traditional: 'An outsourced bookkeeper you rarely talk to',
    reckonwell: 'A dedicated finance team member who knows your business',
  },
  {
    label: 'Software',
    diy: 'Whatever you can figure out',
    traditional: 'Varies by bookkeeper',
    reckonwell: 'Xero / QuickBooks, set up properly from day one',
  },
  {
    label: 'Tax filing',
    diy: 'You handle it, or scramble each year',
    traditional: 'Sometimes bundled, often not',
    reckonwell: 'Not included — but your CPA gets clean books, not a shoebox of receipts',
  },
  {
    label: 'What it costs you',
    diy: 'Your time (the real cost)',
    traditional: 'Often unpredictable, scope creep',
    reckonwell: 'Flat monthly fee, no surprises',
  },
];

const howItWorksSteps = [
  {
    num: '01',
    title: 'Book a Free Discovery Call',
    body: 'A 20-minute conversation. We learn your business, your current setup, and exactly what you need. You leave with a clear picture of what working together looks like. No obligation, no pressure.',
  },
  {
    num: '02',
    title: 'We Set Up Your Books in 48 Hours',
    body: 'We connect to your bank feeds, migrate your existing data, and get everything clean and current within two working days. You do not lift a finger — we coordinate everything.',
    detail: ['Bank & card reconciliation', 'Expense categorisation', 'AP/AR setup', 'Cash flow baseline'],
  },
  {
    num: '03',
    title: 'Daily Work Begins Immediately',
    body: 'From day one, your dedicated team is in your accounts every morning. Transactions processed, positions updated, anything unusual flagged before it becomes a problem.',
  },
  {
    num: '04',
    title: 'You Focus on Your Business',
    body: 'We handle the numbers. You get monthly reports, quarterly reviews, and a team you can call whenever you want clarity. Your only job is to lead.',
  },
];

const usFaqs = [
  {
    question: 'Do you file US taxes?',
    answer: 'No — Reckonwell handles bookkeeping and finance operations only. We do not prepare or file federal or state tax returns. If you need a CPA, we can refer you to a trusted partner. Your books will be clean and organised, which makes your CPA\'s job significantly easier and less expensive.',
  },
  {
    question: 'What accounting software do you use?',
    answer: 'We work with Xero and QuickBooks. If you\'re already on one of these, we slot straight in. If you\'re on spreadsheets or a legacy system, we\'ll migrate you as part of onboarding at no extra cost.',
  },
  {
    question: 'Can you work with my existing CPA?',
    answer: 'Yes — that\'s the preferred arrangement. We handle the day-to-day bookkeeping and finance operations; your CPA handles tax strategy and filing. We provide clean, well-organised books so your CPA can focus on high-value work rather than cleaning up data.',
  },
  {
    question: 'How is this different from hiring a part-time bookkeeper?',
    answer: 'A part-time bookkeeper typically works a few hours a week and catches up on transactions periodically. Reckonwell operates daily — your books are updated every morning, anomalies are flagged in real time, and you have a dedicated team member who understands your business context, not just your transaction history.',
  },
  {
    question: 'Do you work with businesses outside your listed cities?',
    answer: 'Yes. Our service is fully remote and virtual — we work with founder-led businesses across all 50 states. The city pages reflect areas where we have particular experience, but geography is not a barrier.',
  },
  {
    question: 'What size of business do you work with?',
    answer: 'We work best with founder-led businesses billing between $500k and $10m annually — companies that have outgrown DIY bookkeeping but aren\'t large enough to justify a full in-house finance team.',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-xs tracking-[0.2em] uppercase mb-4"
      style={{ color: 'var(--gold, #C9A84C)', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}
    >
      {children}
    </p>
  );
}

function FAQAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div style={{ border: '1px solid rgba(201,168,76,0.18)', borderRadius: '2px' }}>
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        const isLast = index === faqs.length - 1;
        return (
          <div key={index} style={{ borderBottom: isLast ? 'none' : '1px solid rgba(201,168,76,0.18)' }}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                padding: '18px 16px',
                background: isOpen ? 'rgba(201,168,76,0.04)' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'background 0.2s ease',
                minHeight: '60px',
                gap: '12px',
              }}
            >
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(14px,2vw,16px)', fontWeight: 500, color: '#D4CFC4', lineHeight: 1.5, flex: 1 }}>
                {faq.question}
              </span>
              <span
                aria-hidden="true"
                style={{
                  color: '#C9A84C', fontSize: '22px', fontWeight: 300, lineHeight: 1, flexShrink: 0,
                  transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease',
                  display: 'inline-block', width: '22px', textAlign: 'center', marginTop: '2px',
                }}
              >
                +
              </span>
            </button>
            <div style={{ maxHeight: isOpen ? '600px' : '0', overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '14px', lineHeight: 1.9, color: '#D4CFC4', padding: '0 16px 18px', margin: 0 }}>
                {faq.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function USHomePage() {
  return (
    <>
      <main className="relative overflow-x-hidden" style={{ backgroundColor: 'var(--background)' }} role="main">
        <Header />

        {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
        <section
          className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: 'var(--background)' }}
          aria-label="Hero"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 55%, rgba(201,168,76,0.09) 0%, rgba(201,168,76,0.03) 55%, transparent 100%)' }}
          />
          <div className="gold-vertical-line-left" aria-hidden="true" />
          <div className="gold-vertical-line-right" aria-hidden="true" />

          <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-10 text-center pt-24 md:pt-28 pb-14 md:pb-20">
            <div className="mb-6 md:mb-10">
              <span
                className="inline-flex items-center gap-2 md:gap-3 font-ui"
                style={{ fontSize: '9px', letterSpacing: '3px', color: 'var(--primary)', textTransform: 'uppercase', fontWeight: 400 }}
              >
                <span className="hidden sm:inline-block" style={{ width: '16px', height: '1px', backgroundColor: 'var(--primary)', opacity: 0.6, flexShrink: 0 }} />
                Bookkeeping &amp; Finance Operations · US Businesses
                <span className="hidden sm:inline-block" style={{ width: '16px', height: '1px', backgroundColor: 'var(--primary)', opacity: 0.6, flexShrink: 0 }} />
              </span>
            </div>

            <h1 className="hero-h1 mb-4 md:mb-6">
              Run your business.
              <br />
              <span className="gold-italic">We'll handle the books.</span>
            </h1>

            <p
              className="pull-quote mb-4 mx-auto"
              style={{ maxWidth: '620px', color: '#ffffff', fontSize: 'clamp(16px,2.2vw,26px)' }}
            >
              Daily bookkeeping and finance operations for founder-led businesses — done properly, every day, not once a month.
            </p>

            <p
              className="mb-5 md:mb-8 font-serif"
              style={{ fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(16px,2.2vw,26px)', color: '#ffffff', fontFamily: 'var(--font-serif)' }}
            >
              No stress. No surprises. Just clean books.
            </p>

            <p
              className="font-ui mb-7 md:mb-10"
              style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)', fontWeight: 400 }}
            >
              From $300/month
            </p>

            <div className="flex flex-col items-center justify-center gap-3 mb-8 md:mb-12 w-full">
              <Link
                href="/book"
                className="btn-gold w-full sm:w-auto"
                style={{ minWidth: '220px', maxWidth: '320px', textAlign: 'center' }}
              >
                Book a Discovery Call →
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-8">
              {['Xero Certified', 'QuickBooks ProAdvisor', 'Remote-First, Nationwide'].map((badge) => (
                <span key={badge} className="flex items-center gap-2 font-ui" style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.5px' }}>
                  <span style={{ color: 'var(--primary)', fontSize: '14px' }}>✓</span>
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, var(--background))' }} />
        </section>

        {/* ── 2. PROBLEM ──────────────────────────────────────────────────── */}
        <section
          id="problem"
          className="py-20 md:py-36 px-6 md:px-10"
          style={{ backgroundColor: 'var(--background)' }}
          aria-label="The problem"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-start">
            <div>
              <SectionLabel>The Problem</SectionLabel>
              <h2 className="section-h2-medium mb-5 md:mb-8">
                You didn't start a business
                <br />
                <span className="gold-italic">to do bookkeeping.</span>
              </h2>
              <p className="body-text-rw mb-7 md:mb-10">
                Traditional bookkeeping gives you a 30-day lag on your own business. By the time the numbers arrive, the decision is already made — on instinct, not information. That is not a bookkeeping problem. That is a leadership disadvantage.
              </p>
              <p className="font-ui mb-4" style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--muted)' }}>
                Sound familiar?
              </p>
              <div className="flex items-center gap-4" style={{ minHeight: '48px' }}>
                <span style={{ display: 'inline-block', width: '3px', height: '36px', backgroundColor: 'var(--primary)', flexShrink: 0 }} />
                <span className="font-display" style={{ fontSize: 'clamp(18px,3vw,32px)', color: 'var(--foreground)', fontWeight: 400 }}>
                  Cash surprises. Overdue invoices. Decisions made blind.
                </span>
              </div>
            </div>
            <div className="relative w-full" style={{ aspectRatio: '4/3', maxHeight: '400px' }}>
              <div className="w-full h-full rounded-sm relative overflow-hidden">
                <img
                  src="/assets/images/Stressed_businessman_in_cluttered_office-1779495675852.png"
                  alt="Stressed founder overwhelmed at a cluttered desk, representing the chaos of unmanaged finances"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-0 left-0" style={{ width: '20px', height: '20px', borderTop: '1px solid var(--primary)', borderLeft: '1px solid var(--primary)', opacity: 0.5 }} />
                <span className="absolute bottom-0 right-0" style={{ width: '20px', height: '20px', borderBottom: '1px solid var(--primary)', borderRight: '1px solid var(--primary)', opacity: 0.5 }} />
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. SOLUTION ─────────────────────────────────────────────────── */}
        <section
          className="py-20 md:py-36 px-6 md:px-10"
          style={{ backgroundColor: '#080808' }}
          aria-label="Solution"
        >
          <div className="max-w-5xl mx-auto">
            <SectionLabel>The Solution</SectionLabel>
            <h2 className="section-h2-medium mb-5 md:mb-6">
              Finance operations,
              <br />
              <span className="gold-italic">done daily.</span>
            </h2>
            <p className="pull-quote mb-10 md:mb-16" style={{ maxWidth: '480px' }}>
              Three pillars that replace the chaos of monthly catch-ups with a finance function that actually works.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {solutionPillars.map((pillar) => (
                <div
                  key={pillar.num}
                  className="p-6 md:p-8 rounded-sm"
                  style={{ backgroundColor: 'var(--card)', border: '1px solid var(--gold-border)' }}
                >
                  <p className="font-display mb-3" style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 400, letterSpacing: '2px' }}>
                    {pillar.num}
                  </p>
                  <h3 className="font-display mb-3" style={{ fontSize: 'clamp(16px,2vw,22px)', fontWeight: 400, color: 'var(--foreground)' }}>
                    {pillar.title}
                  </h3>
                  <p className="body-text-rw" style={{ fontSize: '14px' }}>
                    {pillar.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. THE DIFFERENCE ───────────────────────────────────────────── */}
        <section
          className="py-20 md:py-36 px-6 md:px-10"
          style={{ backgroundColor: 'var(--background)', borderTop: '0.5px solid var(--border)', borderBottom: '0.5px solid var(--border)' }}
          aria-label="The Difference"
        >
          <div className="max-w-6xl mx-auto">
            <SectionLabel>The Difference</SectionLabel>
            <h2 className="section-h2-medium mb-4">
              Most bookkeeping falls into two camps.
              <br />
              <span className="gold-italic">We built a third.</span>
            </h2>
            <p className="body-text-rw mb-10 md:mb-14" style={{ maxWidth: '560px' }}>
              Neither DIY spreadsheets nor a once-a-month bookkeeper give founders what they actually need — timely numbers they can act on.
            </p>

            {/* Comparison table — desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full" style={{ borderCollapse: 'collapse', border: '1px solid var(--gold-border)' }}>
                <thead>
                  <tr>
                    <th style={{ padding: '16px 20px', textAlign: 'left', backgroundColor: 'var(--card)', borderBottom: '1px solid var(--gold-border)', borderRight: '1px solid var(--gold-border)', color: 'var(--muted)', fontFamily: 'var(--font-montserrat)', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 400 }}>
                      &nbsp;
                    </th>
                    <th style={{ padding: '16px 20px', textAlign: 'center', backgroundColor: 'var(--card)', borderBottom: '1px solid var(--gold-border)', borderRight: '1px solid var(--gold-border)', color: 'var(--muted)', fontFamily: 'var(--font-montserrat)', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 400 }}>
                      DIY / Spreadsheets
                    </th>
                    <th style={{ padding: '16px 20px', textAlign: 'center', backgroundColor: 'var(--card)', borderBottom: '1px solid var(--gold-border)', borderRight: '1px solid var(--gold-border)', color: 'var(--muted)', fontFamily: 'var(--font-montserrat)', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 400 }}>
                      Traditional Monthly Bookkeeper
                    </th>
                    <th style={{ padding: '16px 20px', textAlign: 'center', backgroundColor: 'rgba(201,168,76,0.06)', borderBottom: '1px solid var(--gold-border)', color: 'var(--primary)', fontFamily: 'var(--font-montserrat)', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>
                      Reckonwell
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i} style={{ borderBottom: i < comparisonRows.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                      <td style={{ padding: '14px 20px', borderRight: '1px solid var(--gold-border)', color: 'var(--muted)', fontFamily: 'var(--font-montserrat)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.3px' }}>
                        {row.label}
                      </td>
                      <td style={{ padding: '14px 20px', textAlign: 'center', borderRight: '1px solid var(--gold-border)', color: 'var(--muted)', fontFamily: 'var(--font-montserrat)', fontSize: '13px', lineHeight: 1.5 }}>
                        {row.diy}
                      </td>
                      <td style={{ padding: '14px 20px', textAlign: 'center', borderRight: '1px solid var(--gold-border)', color: 'var(--muted)', fontFamily: 'var(--font-montserrat)', fontSize: '13px', lineHeight: 1.5 }}>
                        {row.traditional}
                      </td>
                      <td style={{ padding: '14px 20px', textAlign: 'center', backgroundColor: 'rgba(201,168,76,0.04)', color: 'var(--foreground)', fontFamily: 'var(--font-montserrat)', fontSize: '13px', lineHeight: 1.5, fontWeight: 500 }}>
                        {row.reckonwell}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Comparison — mobile cards */}
            <div className="md:hidden flex flex-col gap-4">
              {comparisonRows.map((row, i) => (
                <div key={i} className="rounded-sm p-4" style={{ border: '1px solid var(--gold-border)', backgroundColor: 'var(--card)' }}>
                  <p className="font-ui mb-3" style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--primary)' }}>{row.label}</p>
                  <div className="flex flex-col gap-2">
                    <div><span className="font-ui" style={{ fontSize: '10px', color: 'var(--muted)', letterSpacing: '1px' }}>DIY: </span><span className="body-text-rw" style={{ fontSize: '13px' }}>{row.diy}</span></div>
                    <div><span className="font-ui" style={{ fontSize: '10px', color: 'var(--muted)', letterSpacing: '1px' }}>Traditional: </span><span className="body-text-rw" style={{ fontSize: '13px' }}>{row.traditional}</span></div>
                    <div style={{ borderTop: '1px solid var(--gold-border)', paddingTop: '8px', marginTop: '4px' }}><span className="font-ui" style={{ fontSize: '10px', color: 'var(--primary)', letterSpacing: '1px' }}>Reckonwell: </span><span style={{ fontSize: '13px', color: 'var(--foreground)', fontWeight: 500 }}>{row.reckonwell}</span></div>
                  </div>
                </div>
              ))}
            </div>

            <p
              className="body-text-rw mt-8 md:mt-10"
              style={{ fontStyle: 'italic', maxWidth: '640px', borderLeft: '2px solid var(--primary)', paddingLeft: '20px', fontSize: '15px' }}
            >
              We're not trying to replace your CPA. We're trying to make their job easier — and your finances something you check, not something you dread.
            </p>
          </div>
        </section>

        {/* ── 5. CPA PARTNER MODEL ────────────────────────────────────────── */}
        <section
          className="py-20 md:py-36 px-6 md:px-10"
          style={{ backgroundColor: '#080808' }}
          aria-label="How tax filing works"
        >
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
            <div>
              <SectionLabel>How Tax Filing Works</SectionLabel>
              <h2 className="section-h2-medium mb-5 md:mb-8">
                We run your books.
                <br />
                <span className="gold-italic">Your CPA files your taxes.</span>
              </h2>
              <p className="body-text-rw mb-4">
                Reckonwell handles your bookkeeping and finance operations every day. We are not a tax preparation service — we do not file federal or state returns.
              </p>
              <p className="body-text-rw mb-4">
                If you already have a CPA, we work alongside them. We provide clean, well-organised books so they can focus on strategy and filing, not data cleanup. If you don't have a CPA yet, we can refer you to a trusted partner.
              </p>
              <p className="body-text-rw">
                The result: your CPA gets exactly what they need, your tax bill is as accurate as possible, and you're never scrambling at year-end.
              </p>
            </div>
            <div>
              <div
                className="p-6 md:p-8 rounded-sm"
                style={{ backgroundColor: 'var(--card)', border: '1px solid var(--gold-border)' }}
              >
                <p className="font-ui mb-4" style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--primary)' }}>
                  Quick Clarifier
                </p>
                <div className="flex flex-col gap-4">
                  {[
                    { q: 'Do you file my taxes?', a: 'No — but your CPA will thank you for how clean your books are.' },
                    { q: 'Can you refer me to a CPA?', a: 'Yes — if you don\'t have one, we can connect you with a trusted partner.' },
                    { q: 'What do you actually handle?', a: 'Daily bookkeeping, AP/AR, payroll, management accounts, and cash flow monitoring.' },
                  ].map((item, i) => (
                    <div key={i} style={{ borderBottom: i < 2 ? '1px solid var(--border-subtle)' : 'none', paddingBottom: i < 2 ? '16px' : '0' }}>
                      <p className="font-display mb-1" style={{ fontSize: '14px', color: 'var(--foreground)', fontWeight: 400 }}>{item.q}</p>
                      <p className="body-text-rw" style={{ fontSize: '13px', fontStyle: 'italic' }}>{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. HOW IT WORKS ─────────────────────────────────────────────── */}
        <section
          id="how-it-works"
          className="py-20 md:py-36 px-6 md:px-10"
          style={{ backgroundColor: 'var(--background)' }}
          aria-label="How it works"
        >
          <div className="max-w-5xl mx-auto">
            <SectionLabel>How It Works</SectionLabel>
            <h2 className="section-h2-medium mb-5 md:mb-6">
              One call. 48 hours.
              <br />
              <span className="gold-italic">Done.</span>
            </h2>
            <p className="pull-quote mb-10 md:mb-16" style={{ maxWidth: '480px' }}>
              From first conversation to fully operational — with less friction than you expect.
            </p>
            <div className="flex flex-col">
              {howItWorksSteps.map((step, i) => (
                <div
                  key={step.num}
                  className="step-item"
                >
                  <div className="flex items-start gap-5 md:gap-8">
                    <div className="font-display flex-shrink-0" style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 400, letterSpacing: '2px', paddingTop: '3px', minWidth: '28px' }}>
                      {step.num}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display mb-3" style={{ fontSize: 'clamp(16px,2vw,24px)', fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.2 }}>
                        {step.title}
                      </h3>
                      <p className="body-text-rw mb-4" style={{ fontSize: '15px' }}>{step.body}</p>
                      {step.detail && (
                        <div className="mt-4 p-4 md:p-5 rounded-sm" style={{ borderLeft: '2px solid var(--primary)', backgroundColor: 'var(--gold-dim)' }}>
                          <p className="font-ui mb-3" style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--primary)' }}>Includes</p>
                          <ul className="flex flex-col gap-2">
                            {step.detail.map((item) => (
                              <li key={item} className="flex items-center gap-3">
                                <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--primary)', flexShrink: 0 }} />
                                <span className="body-text-rw" style={{ fontSize: '14px', color: 'var(--body-text)' }}>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. US COVERAGE ──────────────────────────────────────────────── */}
        <section
          style={{ backgroundColor: 'var(--background)', borderTop: '0.5px solid var(--border)', borderBottom: '0.5px solid var(--border)' }}
          className="py-16 md:py-20"
          aria-label="Where we work"
        >
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <SectionLabel>Where We Work</SectionLabel>
            <h2 className="text-2xl md:text-3xl mb-3" style={{ color: 'var(--foreground)', fontFamily: 'var(--font-playfair, "Playfair Display", serif)', fontWeight: 400 }}>
              Serving founder-led businesses across the US.
            </h2>
            <p className="text-sm mb-10 max-w-xl" style={{ color: 'var(--muted)', fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)', fontStyle: 'italic', fontSize: '1rem' }}>
              Remote-first bookkeeping for businesses in every major US city. Same service, same pricing, wherever you are.
            </p>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-3" role="list">
              {usCities.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/us/accounting/${city.slug}`}
                    className="group inline-flex items-center gap-1.5 text-sm transition-colors duration-200"
                    style={{ color: 'var(--muted)', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', letterSpacing: '0.02em' }}
                  >
                    <span className="inline-block w-1 h-1 rounded-full flex-shrink-0 transition-colors duration-200" style={{ backgroundColor: 'var(--border)' }} aria-hidden="true" />
                    <span
                      className="group-hover:underline"
                      onMouseEnter={(e) => { (e.currentTarget.parentElement as HTMLElement).style.color = 'var(--gold, #C9A84C)'; }}
                      onMouseLeave={(e) => { (e.currentTarget.parentElement as HTMLElement).style.color = 'var(--muted)'; }}
                    >
                      {city.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── 8. PRICING ──────────────────────────────────────────────────── */}
        <section
          id="pricing"
          className="py-20 md:py-36 px-6 md:px-10"
          style={{ backgroundColor: '#080808' }}
          aria-label="Pricing"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 md:mb-14">
              <SectionLabel>Pricing</SectionLabel>
              <h2 className="section-h2-medium">
                Simple. Transparent.
                <br />
                <span className="gold-italic">No surprises.</span>
              </h2>
            </div>
            <div className="mx-auto relative w-full" style={{ maxWidth: '480px' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2" style={{ width: '60%', height: '2px', background: 'linear-gradient(90deg, transparent, var(--primary), transparent)' }} />
              <div className="p-7 md:p-12 rounded-sm" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--gold-border)' }}>
                <p className="font-serif text-center mb-2" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 300, fontSize: '18px', color: 'var(--primary)', letterSpacing: '0.5px' }}>From</p>
                <div className="flex items-end justify-center gap-0 mb-2">
                  <div className="flex items-start">
                    <span className="font-display mt-3 md:mt-4" style={{ fontSize: 'clamp(22px,3vw,32px)', color: 'var(--primary)', fontWeight: 400 }}>$</span>
                    <span className="pricing-number">300</span>
                  </div>
                </div>
                <p className="font-ui text-center mb-8 md:mb-10" style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--muted)' }}>Per Month</p>
                <div className="mb-6 md:mb-8" style={{ height: '1px', backgroundColor: 'var(--border-subtle)' }} />
                <ul className="flex flex-col gap-3 md:gap-4 mb-8 md:mb-10">
                  {['Daily bookkeeping & transaction processing', 'Real-time cash flow monitoring', 'Accounts payable & receivable', 'Payroll processing', 'Monthly management accounts', 'Dedicated finance team member', 'Unlimited email & phone support'].map((feat) => (
                    <li key={feat} className="flex items-center gap-3 md:gap-4">
                      <span className="font-display flex-shrink-0" style={{ color: 'var(--primary)', fontSize: '18px', fontWeight: 400 }}>—</span>
                      <span className="body-text-rw" style={{ fontSize: '14px' }}>{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/book" className="btn-gold w-full block text-center" style={{ width: '100%', padding: '16px 36px', fontSize: '11px' }}>
                  Book Discovery Call
                </Link>
                <p className="font-ui text-center mt-4" style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.5px' }}>
                  No setup fees · No long-term contracts · Cancel anytime
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 9. FOUNDER ──────────────────────────────────────────────────── */}
        <section
          className="py-20 md:py-36 px-6 md:px-10"
          style={{ backgroundColor: 'var(--background)' }}
          aria-label="From the founder"
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="mx-auto md:mx-0 md:ml-auto" style={{ maxWidth: '220px', width: '100%', position: 'relative' }}>
              <div className="hidden md:block" style={{ position: 'absolute', top: '18px', left: '-18px', right: '18px', bottom: '-18px', border: '1px solid var(--primary)', opacity: 0.25, zIndex: 0, pointerEvents: 'none' }} />
              <div className="relative overflow-hidden" style={{ aspectRatio: '3/4', zIndex: 1 }}>
                <img src="/assets/images/Vadim-1779496555261.jpg" alt="Vadim, Founder of Reckonwell" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
                <div className="absolute bottom-0 left-0 right-0" style={{ height: '30%', background: 'linear-gradient(to top, rgba(8,8,8,0.55) 0%, transparent 100%)' }} />
                <span className="absolute top-0 left-0" style={{ width: '22px', height: '22px', borderTop: '2px solid var(--primary)', borderLeft: '2px solid var(--primary)', opacity: 0.85 }} />
                <span className="absolute top-0 right-0" style={{ width: '22px', height: '22px', borderTop: '2px solid var(--primary)', borderRight: '2px solid var(--primary)', opacity: 0.85 }} />
                <span className="absolute bottom-0 left-0" style={{ width: '22px', height: '22px', borderBottom: '2px solid var(--primary)', borderLeft: '2px solid var(--primary)', opacity: 0.85 }} />
                <span className="absolute bottom-0 right-0" style={{ width: '22px', height: '22px', borderBottom: '2px solid var(--primary)', borderRight: '2px solid var(--primary)', opacity: 0.85 }} />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <SectionLabel>Message from the Founder</SectionLabel>
              <h3 className="font-display mb-1" style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 400, color: 'var(--foreground)' }}>Hello, I am Vadim</h3>
              <blockquote className="mb-6 md:mb-8" style={{ borderLeft: '2px solid var(--primary)', paddingLeft: '20px' }}>
                <p className="font-serif" style={{ fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(18px,2.2vw,26px)', color: '#ffffff', lineHeight: 1.7, fontFamily: 'var(--font-serif)' }}>
                  &ldquo;I built Reckonwell because the founders I admired most were spending their sharpest hours on things that had nothing to do with why they built their business. That always struck me as wrong — and entirely fixable.&rdquo;
                </p>
              </blockquote>
              <div className="flex flex-col gap-4">
                <p className="body-text-rw" style={{ fontSize: '15px' }}>Every client gets a dedicated team who knows their accounts, understands the context behind the numbers, and is genuinely available when it matters. Not a ticketing system. Not a monthly catch-up. Daily work, done properly.</p>
                <p className="body-text-rw" style={{ fontSize: '15px' }}>The goal is simple: your finances should give you freedom, not take it away. A founder with clean books moves differently. That is what we build for every client, from day one.</p>
                <p className="font-display" style={{ fontSize: '16px', fontWeight: 400, color: 'var(--primary)', fontStyle: 'italic', marginTop: '8px' }}>Not your bookkeeper. Your finance team.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 10. CONTACT / CTA ───────────────────────────────────────────── */}
        <section
          className="py-20 md:py-36 px-6 md:px-10 text-center"
          style={{ backgroundColor: '#080808' }}
          aria-label="Book a call"
        >
          <div className="max-w-3xl mx-auto">
            <SectionLabel>Get Started</SectionLabel>
            <h2 className="section-h2-medium mb-5 md:mb-8">
              Ready to hand off
              <br />
              <span className="gold-italic">the books?</span>
            </h2>
            <p className="pull-quote mb-8 md:mb-12" style={{ maxWidth: '480px', margin: '0 auto 48px' }}>
              Book a free 20-minute discovery call. No obligation, no pressure — just a clear picture of what working together looks like.
            </p>
            <Link href="/book" className="btn-gold" style={{ display: 'inline-block', padding: '16px 48px', fontSize: '11px' }}>
              Book a Discovery Call →
            </Link>
            <p className="font-ui mt-4" style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.5px' }}>From $300/month · No setup fees · Cancel anytime</p>
          </div>
        </section>

        {/* ── 11. FAQ ─────────────────────────────────────────────────────── */}
        <section
          style={{ backgroundColor: '#1C1A15' }}
          className="py-16 md:py-32 px-5 md:px-16"
          aria-label="Frequently asked questions"
        >
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '11px', fontVariant: 'small-caps', color: '#C9A84C', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '20px' }}>
              Questions &amp; Answers
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px,4vw,42px)', fontWeight: 700, color: '#D4CFC4', marginBottom: '32px', lineHeight: 1.2 }}>
              Frequently asked{' '}
              <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>questions</em>
            </h2>
            <FAQAccordion faqs={usFaqs} />
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
