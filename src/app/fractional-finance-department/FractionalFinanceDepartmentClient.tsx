'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import {
  BookOpen,
  ShieldCheck,
  Users,
} from 'lucide-react';
import TheDifferenceSection from '@/app/components/TheDifferenceSection';
import CertifiedPartneredSection from '@/app/components/CertifiedPartneredSection';
import FractionalFinanceCalculator from '@/app/components/FractionalFinanceCalculator';
import Icon from '@/components/ui/AppIcon';


// ── Shared white text style (no italic, no grey) ──────────────────────────
const wt: React.CSSProperties = { color: '#ffffff', fontStyle: 'normal' };

// ── Data ──────────────────────────────────────────────────────────────────

const pillars = [
  {
    icon: BookOpen,
    title: 'Finance Operations',
    body: 'Daily bookkeeping, management accounts, and real-time visibility into your cash position. Your books are never behind — month end is just another day.',
  },
  {
    icon: ShieldCheck,
    title: 'Compliance',
    body: 'VAT returns, payroll, year-end accounts, and Corporation Tax filed on time, every time. No surprises, no scrambling at deadline.',
  },
  {
    icon: Users,
    title: 'Founder Support',
    body: 'A named finance team member who knows your business, reads the patterns, and reaches out before you think to ask. Not a portal — a person.',
  },
];

const howItWorksSteps = [
  {
    num: '01',
    title: 'Get Your Instant Quote',
    body: 'Answer a few quick questions about your business and see your exact price in under two minutes. No call required.',
    detail: null as string[] | null,
  },
  {
    num: '02',
    title: 'Book a Call (Optional)',
    body: 'Prefer to talk it through first? A 20-minute conversation. We learn your business and you leave with a clear picture of what working together looks like. No obligation, no pressure.',
    detail: null as string[] | null,
  },
  {
    num: '03',
    title: 'We Set Up Your Books in 48 Hours',
    body: 'We connect to your bank feeds, migrate your existing data, and get everything clean and current within two working days. You do not lift a finger — we coordinate everything.',
    detail: ['Bank & card reconciliation', 'Expense categorisation', 'Sales & invoice tracking', 'Director loan account monitoring'],
  },
  {
    num: '04',
    title: 'Daily Work Begins Immediately',
    body: 'From day one, your dedicated team is in your accounts every morning. Transactions processed, positions updated, anything unusual flagged before it becomes a problem.',
    detail: null as string[] | null,
  },
  {
    num: '05',
    title: 'You Focus on Your Business',
    body: 'We handle the numbers. You get monthly reports, quarterly reviews, and a team you can call whenever you want clarity. Your only job is to lead. That is the entire arrangement.',
    detail: null as string[] | null,
  },
];

const testimonials = [
  {
    tag: 'Tech / Manufacturing',
    number: '£20k',
    headline: 'recovered in missed R&D credits',
    body: 'A manufacturing tech founder had never claimed R&D Tax Credits. We identified three years of eligible claims, filed them, and had the money back within 12 weeks.',
    quote: 'I had no idea that was even possible. Reckonwell paid for themselves ten times over.',
    author: 'Oliver Hartley, Founder',
  },
  {
    tag: 'Digital Marketing Agency',
    number: '£10k+',
    headline: 'saved in unnecessary VAT payments',
    body: 'An agency was over-declaring VAT due to incorrect categorisation. We corrected two years of filings, reclaimed the overpayment, and restructured their process.',
    quote: 'Finally, an accountant who actually looks at the numbers rather than just filing them.',
    author: 'Priya Mehta, Director',
  },
  {
    tag: 'E-Commerce Brand',
    number: '£15k+',
    headline: 'in cash flow freed up within 90 days',
    body: 'A DTC brand was paying suppliers 30 days early with no benefit. We restructured their payment terms, aligned cash flow cycles, and freed up significant working capital.',
    quote: 'We went from constantly watching the bank balance to actually planning the next six months.',
    author: 'James Whitfield, CEO',
  },
];

const faqs = [
  {
    question: 'What exactly does Reckonwell do?',
    answer:
      'Reckonwell is your dedicated finance team — not just a filing service. We handle bookkeeping, management accounts, payroll, VAT returns, year-end accounts, and tax planning. More importantly, we work with you on an ongoing basis so your numbers are always current and decision-ready.',
  },
  {
    question: 'How is this different from a traditional accounting firm?',
    answer:
      'Traditional accountants compile history — you get reports months after the fact. Reckonwell operates on your business in real time. You have a named point of contact, a monthly management pack, and direct access to your team whenever you need it. We are proactive, not reactive.',
  },
  {
    question: 'What size of business do you work with?',
    answer:
      "We work best with founder-led and owner-managed businesses billing between £250k and £10m annually — typically companies that have outgrown a sole-trader accountant but aren't large enough to justify an in-house finance director.",
  },
];

// ── Dual CTA ──────────────────────────────────────────────────────────────
function DualCTA() {
  const handleScrollToCalc = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('ffd-calculator')?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <a
        href="#ffd-calculator"
        onClick={handleScrollToCalc}
        className="font-ui"
        style={{
          backgroundColor: 'var(--primary)',
          color: '#080808',
          padding: '14px 32px',
          fontSize: '13px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          fontWeight: 600,
          display: 'inline-block',
        }}
      >
        See What You Could Save →
      </a>
      <Link
        href="/book"
        className="font-ui"
        style={{
          border: '1px solid rgba(201,168,76,0.4)',
          color: '#ffffff',
          padding: '14px 32px',
          fontSize: '13px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          fontWeight: 400,
          display: 'inline-block',
        }}
      >
        Book a Discovery Call
      </Link>
    </div>
  );
}

// ── 1. Hero ───────────────────────────────────────────────────────────────
function HeroFFD() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 md:px-10"
      style={{ backgroundColor: 'var(--background)' }}
      aria-label="Hero"
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 55%, rgba(201,168,76,0.09) 0%, rgba(201,168,76,0.03) 55%, transparent 100%)' }} />
      <div className="gold-vertical-line-left" aria-hidden="true" />
      <div className="gold-vertical-line-right" aria-hidden="true" />
      <div className="relative z-10 max-w-5xl mx-auto text-center pt-28 pb-16">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="mb-8">
          <span className="font-ui" style={{ fontSize: '9px', letterSpacing: '3px', color: 'var(--primary)', textTransform: 'uppercase' }}>
            Fractional Finance Department · Founder-Led Businesses
          </span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="hero-h1 mb-6">
          Why the best-run businesses{' '}
          <em style={{ color: 'var(--primary)' }}>don&apos;t hire</em> a finance team —
          <br className="hidden md:block" /> they get one.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }} className="font-ui mb-10 mx-auto" style={{ fontSize: 'clamp(15px,1.8vw,19px)', ...wt, lineHeight: 1.75, maxWidth: '600px', fontWeight: 300 }}>
          A dedicated finance team for founder-led businesses — bookkeeping, compliance, and founder support, without the cost or risk of hiring in-house.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}>
          <DualCTA />
        </motion.div>
      </div>
    </section>
  );
}

// ── 2. The Problem ────────────────────────────────────────────────────────
function ProblemFFD() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section ref={ref} className="py-20 md:py-32 px-6 md:px-10" style={{ backgroundColor: 'var(--background)', borderBottom: '1px solid var(--gold-border)' }} aria-label="The Problem">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-start">
        <div>
          <motion.p className="section-label mb-4" initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            The Problem
          </motion.p>
          <motion.h2 className="section-h2-medium mb-6" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
            Your accountant is working <span className="gold-italic">in the past.</span>
          </motion.h2>
          <motion.p className="body-text-rw" style={{ ...wt }} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
            Traditional accounting gives you a 30-day lag on your own business. By the time the numbers arrive, the decision is already made — on instinct, not information. That is not an accounting problem. That is a leadership disadvantage.
          </motion.p>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.25 }} className="relative w-full" style={{ aspectRatio: '4/3', maxHeight: '400px' }}>
          <div className="w-full h-full rounded-sm relative overflow-hidden">
            <img src="/assets/images/Stressed_businessman_in_cluttered_office-1779495675852.png" alt="Stressed businessman overwhelmed at a cluttered office desk, representing the chaos of unmanaged finances" className="w-full h-full object-cover" />
            <span className="absolute top-0 left-0" style={{ width: '20px', height: '20px', borderTop: '1px solid var(--primary)', borderLeft: '1px solid var(--primary)', opacity: 0.5 }} />
            <span className="absolute bottom-0 right-0" style={{ width: '20px', height: '20px', borderBottom: '1px solid var(--primary)', borderRight: '1px solid var(--primary)', opacity: 0.5 }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── 3. Before / After ─────────────────────────────────────────────────────
function BeforeAfterFFD() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const withoutItems = ['tabs everywhere', 'Slack messages', 'invoices missing', 'accountant replies late', 'cashflow unclear', 'admin ruins evenings'];
  const withItems = ['finance function runs', 'reports arrive', 'invoices handled', 'systems organised', 'founder has mental space again'];
  return (
    <section ref={ref} className="py-20 md:py-32 px-6 md:px-10" style={{ backgroundColor: 'var(--background)', borderBottom: '1px solid var(--gold-border)' }} aria-label="Before and after">
      <div className="max-w-7xl mx-auto">
        <motion.h2 className="section-h2-medium text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          The difference is <span className="gold-italic">everything.</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }} className="rounded-sm p-6 md:p-10" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border-subtle)' }}>
            <span className="inline-flex items-center gap-2 font-ui px-3 py-1 mb-6" style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', backgroundColor: 'rgba(192,57,43,0.12)', color: '#E74C3C', border: '1px solid rgba(192,57,43,0.2)', fontWeight: 500 }}>
              ✕ Before Reckonwell
            </span>
            <ul className="flex flex-col gap-4">
              {withoutItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span style={{ color: '#E74C3C', fontSize: '16px', flexShrink: 0, marginTop: '2px' }}>✕</span>
                  <span className="font-ui" style={{ fontSize: '15px', ...wt, fontWeight: 300 }}>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }} className="rounded-sm p-6 md:p-10" style={{ backgroundColor: 'rgba(10,15,8,0.8)', border: '1px solid var(--gold-border)', borderLeft: '3px solid var(--primary)' }}>
            <span className="inline-flex items-center gap-2 font-ui px-3 py-1 mb-6" style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', backgroundColor: 'rgba(45,106,79,0.15)', color: '#52B788', border: '1px solid rgba(45,106,79,0.25)', fontWeight: 500 }}>
              ✓ After Reckonwell
            </span>
            <ul className="flex flex-col gap-4">
              {withItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span style={{ color: 'var(--primary)', fontSize: '16px', flexShrink: 0, marginTop: '2px' }}>—</span>
                  <span className="font-ui" style={{ fontSize: '15px', ...wt, fontWeight: 300 }}>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── 4. What Is It ─────────────────────────────────────────────────────────
function WhatIsItFFD() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section ref={ref} className="py-20 md:py-28 px-6 md:px-10" style={{ backgroundColor: '#080808', borderBottom: '1px solid var(--gold-border)' }} aria-label="What is a Fractional Finance Department">
      <div className="max-w-5xl mx-auto">
        <motion.p className="section-label mb-4" initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          What Is It?
        </motion.p>
        <motion.h2 className="section-h2-medium mb-6" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
          What is a <em style={{ color: 'var(--primary)' }}>Fractional Finance Department?</em>
        </motion.h2>
        <motion.p className="body-text-rw max-w-3xl" style={{ ...wt, fontSize: 'clamp(15px,1.8vw,18px)' }} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
          A Fractional Finance Department is a dedicated finance team — covering bookkeeping, management accounts, compliance, and founder support — delivered as a flat monthly service instead of hiring in-house. You get the capability of a full finance function at a fraction of the cost, with none of the employment risk, recruitment overhead, or management burden.
        </motion.p>
      </div>
    </section>
  );
}

// ── 6. Three Pillars ──────────────────────────────────────────────────────
function ThreePillarsFFD() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section ref={ref} className="py-20 md:py-28 px-6 md:px-10" style={{ backgroundColor: 'var(--background)', borderBottom: '1px solid var(--gold-border)' }} aria-label="Three pillars">
      <div className="max-w-5xl mx-auto">
        <motion.p className="section-label mb-4" initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          What We Cover
        </motion.p>
        <motion.h2 className="section-h2-medium mb-4" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
          Three pillars. <em style={{ color: 'var(--primary)' }}>One team.</em>
        </motion.h2>
        <motion.p className="body-text-rw mb-12 max-w-xl" style={{ ...wt }} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
          Every Fractional Finance Department engagement covers all three areas — not as add-ons, but as a single integrated service.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div key={pillar.title} className="solution-card" initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}>
                <div className="relative z-10">
                  <div className="mb-4">
                    <Icon size={24} strokeWidth={1.5} style={{ color: 'var(--primary)' }} />
                  </div>
                  <h3 className="font-display mb-3" style={{ fontSize: 'clamp(17px,2.2vw,24px)', fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.2 }}>
                    {pillar.title}
                  </h3>
                  <p className="font-ui" style={{ fontSize: '14px', ...wt, lineHeight: 1.75, fontWeight: 300 }}>
                    {pillar.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── 7. How It Works ───────────────────────────────────────────────────────
function HowItWorksFFD() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section ref={ref} className="py-16 md:py-24 px-6 md:px-10" style={{ backgroundColor: '#080808', borderBottom: '1px solid var(--gold-border)' }} aria-label="How it works">
      <div className="max-w-5xl mx-auto">
        <motion.p className="section-label mb-4" initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          How It Works
        </motion.p>
        <motion.h2 className="section-h2-medium mb-4" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
          One call. 48 hours. <em style={{ color: 'var(--primary)' }}>Done.</em>
        </motion.h2>
        <motion.p className="body-text-rw mb-10 max-w-lg" style={{ ...wt }} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
          From first conversation to fully operational — with less friction than you expect.
        </motion.p>
        <div className="flex flex-col">
          {howItWorksSteps.map((step, i) => (
            <motion.div key={step.num} className="step-item" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}>
              <div className="flex items-start gap-5 md:gap-8">
                <div className="font-display flex-shrink-0" style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 400, letterSpacing: '2px', paddingTop: '3px', minWidth: '28px' }}>
                  {step.num}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display mb-3" style={{ fontSize: 'clamp(16px,2vw,24px)', fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.2 }}>
                    {step.title}
                  </h3>
                  <p className="font-ui mb-4" style={{ fontSize: '15px', ...wt, lineHeight: 1.75, fontWeight: 300 }}>
                    {step.body}
                  </p>
                  {step.detail && (
                    <div className="mt-3 p-4" style={{ borderLeft: '2px solid var(--primary)', backgroundColor: 'var(--gold-dim)' }}>
                      <p className="font-ui mb-3" style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--primary)' }}>Includes</p>
                      <ul className="flex flex-col gap-2">
                        {step.detail.map((item) => (
                          <li key={item} className="flex items-center gap-3">
                            <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--primary)', flexShrink: 0 }} />
                            <span className="font-ui" style={{ fontSize: '14px', ...wt, fontWeight: 300 }}>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 9. Calculator Section ─────────────────────────────────────────────────
function CalculatorFFD() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section ref={ref} className="py-20 md:py-28 px-6 md:px-10" style={{ backgroundColor: 'var(--background)', borderBottom: '1px solid var(--gold-border)' }} aria-label="Cost comparison calculator">
      <div className="max-w-5xl mx-auto">
        <motion.p className="section-label mb-4" initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          Cost Comparison
        </motion.p>
        <motion.h2 className="section-h2-medium mb-4" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
          What does it actually <em style={{ color: 'var(--primary)' }}>cost to hire?</em>
        </motion.h2>
        <motion.p className="body-text-rw mb-10 max-w-2xl" style={{ ...wt }} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
          Configure your requirements below and see a side-by-side comparison of the true cost of hiring in-house versus working with Reckonwell. Limited Company only.
        </motion.p>
        <FractionalFinanceCalculator />
      </div>
    </section>
  );
}

// ── 10. Ideal Customer Profile ────────────────────────────────────────────
function IdealCustomerFFD() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const bullets = [
    'Spending founder time on bookkeeping instead of growth',
    'Books a month or more behind',
    "Outgrown current accountant but don't need a CFO yet",
    'Want daily visibility, not a monthly surprise',
  ];
  return (
    <section ref={ref} className="py-20 md:py-28 px-6 md:px-10" style={{ backgroundColor: '#080808', borderBottom: '1px solid var(--gold-border)' }} aria-label="Who this is for">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        <div>
          <motion.p className="section-label mb-4" initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            Who This Is For
          </motion.p>
          <motion.h2 className="section-h2-medium mb-6" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
            Built for <em style={{ color: 'var(--primary)' }}>founder-led</em> businesses.
          </motion.h2>
          <ul className="flex flex-col gap-4">
            {bullets.map((item, i) => (
              <motion.li key={i} className="flex items-start gap-3" initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}>
                <span style={{ color: 'var(--primary)', fontSize: '16px', flexShrink: 0, marginTop: '2px' }}>—</span>
                <span className="font-ui" style={{ fontSize: '15px', ...wt, lineHeight: 1.7, fontWeight: 300 }}>{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }} style={{ borderLeft: '2px solid var(--primary)', paddingLeft: '24px', paddingTop: '8px', paddingBottom: '8px' }}>
          <p className="font-ui mb-3" style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--primary)' }}>
            Our Sweet Spot
          </p>
          <p className="font-ui" style={{ fontSize: 'clamp(15px,1.8vw,18px)', ...wt, lineHeight: 1.8, fontWeight: 300 }}>
            &ldquo;We work best with founder-led and owner-managed businesses billing between £250k and £10m annually — typically companies that have outgrown a sole-trader accountant but aren&apos;t large enough to justify an in-house finance director.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ── 11. Real Results ──────────────────────────────────────────────────────
function RealResultsFFD() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section ref={ref} className="py-20 md:py-32 px-6 md:px-10" style={{ backgroundColor: 'var(--background)', borderBottom: '1px solid var(--gold-border)' }} aria-label="Real results">
      <div className="max-w-7xl mx-auto">
        <motion.p className="section-label mb-5" initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          Real Results
        </motion.p>
        <motion.h2 className="section-h2-medium mb-12 max-w-xl" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
          When the finances are handled,{' '}
          <em style={{ color: 'var(--primary)' }}>everything else gets easier.</em>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((result, i) => (
            <motion.div key={result.tag} className="result-card flex flex-col" initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}>
              <p className="font-ui mb-4" style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#ffffff' }}>
                {result.tag}
              </p>
              <div className="mb-2">
                <span className="font-display" style={{ fontSize: 'clamp(32px,4vw,56px)', fontWeight: 400, color: 'var(--primary)', lineHeight: 1 }}>
                  {result.number}
                </span>
              </div>
              <p className="font-display mb-4" style={{ fontSize: '16px', fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.3 }}>
                {result.headline}
              </p>
              <p className="font-ui mb-5 flex-1" style={{ fontSize: '14px', ...wt, lineHeight: 1.75, fontWeight: 300 }}>
                {result.body}
              </p>
              <div className="pt-4 mt-auto" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                <p className="font-ui mb-2" style={{ fontSize: '15px', ...wt, lineHeight: 1.6, fontWeight: 300 }}>
                  &ldquo;{result.quote}&rdquo;
                </p>
                <p className="font-ui" style={{ fontSize: '11px', color: '#ffffff', letterSpacing: '1px' }}>
                  — {result.author}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 12. Founder Message ───────────────────────────────────────────────────
function FounderFFD() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section ref={ref} className="py-20 md:py-32 px-6 md:px-10" style={{ backgroundColor: '#080808', borderBottom: '1px solid var(--gold-border)' }} aria-label="Message from the founder">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="mx-auto md:mx-0 md:ml-auto" style={{ maxWidth: '200px', width: '100%', position: 'relative' }}>
          <div className="hidden md:block" style={{ position: 'absolute', top: '14px', left: '-14px', right: '14px', bottom: '-14px', border: '1px solid var(--primary)', opacity: 0.25, zIndex: 0, pointerEvents: 'none' }} />
          <div className="relative overflow-hidden" style={{ aspectRatio: '3/4', zIndex: 1 }}>
            <img src="/assets/images/Vadim-1779496555261.jpg" alt="Vadim, Founder of Reckonwell" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
            <div className="absolute bottom-0 left-0 right-0" style={{ height: '30%', background: 'linear-gradient(to top, rgba(8,8,8,0.55) 0%, transparent 100%)' }} />
            {[
              { top: 0, left: 0, borderTop: '2px solid var(--primary)', borderLeft: '2px solid var(--primary)' } as React.CSSProperties,
              { top: 0, right: 0, borderTop: '2px solid var(--primary)', borderRight: '2px solid var(--primary)' } as React.CSSProperties,
              { bottom: 0, left: 0, borderBottom: '2px solid var(--primary)', borderLeft: '2px solid var(--primary)' } as React.CSSProperties,
              { bottom: 0, right: 0, borderBottom: '2px solid var(--primary)', borderRight: '2px solid var(--primary)' } as React.CSSProperties,
            ].map((s, i) => (
              <span key={i} className="absolute" style={{ width: '18px', height: '18px', opacity: 0.85, ...s }} />
            ))}
          </div>
        </motion.div>
        <div className="flex flex-col justify-center">
          <motion.p className="section-label mb-4" initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            Message from the Founder
          </motion.p>
          <motion.h3 className="font-display mb-1" style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 400, color: 'var(--foreground)' }} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}>
            Hello, I am Vadim
          </motion.h3>
          <motion.blockquote className="mb-5" style={{ borderLeft: '2px solid var(--primary)', paddingLeft: '20px' }} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
            <p className="font-serif" style={{ fontWeight: 300, fontSize: 'clamp(16px,2vw,22px)', color: '#ffffff', lineHeight: 1.7, fontFamily: 'var(--font-serif)', fontStyle: 'normal' }}>
              &ldquo;I built Reckonwell because the directors I admired most were spending their sharpest hours on things that had nothing to do with why they built their business. That always struck me as wrong — and entirely fixable.&rdquo;
            </p>
          </motion.blockquote>
        </div>
      </div>
    </section>
  );
}

// ── 13. FAQ ───────────────────────────────────────────────────────────────
function FAQFFD() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section ref={ref} className="py-20 md:py-28 px-6 md:px-10" style={{ backgroundColor: 'var(--background)', borderBottom: '1px solid var(--gold-border)' }} aria-label="Frequently asked questions">
      <div className="max-w-3xl mx-auto">
        <motion.p className="section-label mb-4" initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          FAQ
        </motion.p>
        <motion.h2 className="section-h2-medium mb-10" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
          Common <em style={{ color: 'var(--primary)' }}>questions.</em>
        </motion.h2>
        <div className="flex flex-col">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }} style={{ borderBottom: '1px solid var(--gold-border)' }}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left font-ui"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ffffff', fontSize: '15px', fontWeight: 400 }}
              >
                <span>{faq.question}</span>
                <span style={{ color: 'var(--primary)', fontSize: '20px', flexShrink: 0, marginLeft: '16px', lineHeight: 1 }}>
                  {openIndex === i ? '−' : '+'}
                </span>
              </button>
              {openIndex === i && (
                <div className="pb-5">
                  <p className="font-ui" style={{ fontSize: '14px', ...wt, lineHeight: 1.75, fontWeight: 300 }}>
                    {faq.answer}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 14. Final CTA ─────────────────────────────────────────────────────────
function FinalCTAFFD() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section ref={ref} className="relative py-20 md:py-32 px-6 md:px-10 overflow-hidden" style={{ backgroundColor: '#080808' }} aria-label="Final call to action">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.10) 0%, rgba(201,168,76,0.04) 55%, transparent 100%)' }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2" style={{ width: '40%', height: '1px', background: 'linear-gradient(90deg, transparent, var(--primary), transparent)', opacity: 0.4 }} />
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.p className="section-label mb-4" initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          Get Started
        </motion.p>
        <motion.h2 className="section-h2-medium mb-6" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
          Your finance team is <em style={{ color: 'var(--primary)' }}>ready.</em>
        </motion.h2>
        <motion.p className="body-text-rw mb-10 mx-auto" style={{ ...wt, maxWidth: '480px' }} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
          See what you could save with the calculator above, or book a discovery call to talk through your specific situation.
        </motion.p>
        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}>
          <DualCTA />
        </motion.div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function FractionalFinanceDepartmentPage() {
  return (
    <main>
      {/* 1. Hero */}
      <HeroFFD />
      {/* 2. The Problem */}
      <ProblemFFD />
      {/* 3. Before / After */}
      <BeforeAfterFFD />
      {/* 4. What Is It */}
      <WhatIsItFFD />
      {/* 5. The Difference — imported component */}
      <TheDifferenceSection />
      {/* 6. Three Pillars */}
      <ThreePillarsFFD />
      {/* 7. How It Works */}
      <HowItWorksFFD />
      {/* 8. Technology Ecosystem — imported component */}
      <CertifiedPartneredSection variant="full" />
      {/* 9. Calculator */}
      <CalculatorFFD />
      {/* 10. Ideal Customer Profile */}
      <IdealCustomerFFD />
      {/* 11. Real Results */}
      <RealResultsFFD />
      {/* 12. Founder Message */}
      <FounderFFD />
      {/* 13. FAQ */}
      <FAQFFD />
      {/* 14. Final CTA */}
      <FinalCTAFFD />
    </main>
  );
}
