'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const services = [
  'Daily bookkeeping & transaction processing',
  'MRR / ARR tracking and reconciliation',
  'Deferred revenue scheduling',
  'Accounts payable & receivable (AP/AR)',
  'Payroll processing',
  'Monthly management accounts',
  'Cash flow monitoring & alerts',
  'Dedicated finance team member',
];

const faqs = [
  {
    question: 'Do you file taxes for my SaaS business?',
    answer: 'No — Reckonwell handles bookkeeping and finance operations only. We do not prepare or file federal or state tax returns. If you need a CPA, we can refer you to a trusted partner. Your books will be clean and organised, which makes your CPA\'s job significantly easier.',
  },
  {
    question: 'How do you handle deferred revenue for subscription businesses?',
    answer: 'We set up a proper deferred revenue schedule in your accounting software (Xero or QuickBooks) so that revenue is recognised in the correct period — not when cash hits your account. This is critical for accurate P&L reporting and for any investor or acquirer due diligence.',
  },
  {
    question: 'Can you track MRR and ARR alongside standard bookkeeping?',
    answer: 'Yes. We maintain a live MRR/ARR reconciliation that ties directly to your accounting records. You get a single source of truth — not a spreadsheet that drifts from your books over time.',
  },
  {
    question: 'What accounting software do you use?',
    answer: 'We work with Xero and QuickBooks. If you\'re already on one of these, we slot straight in. If you\'re on spreadsheets or a legacy system, we\'ll migrate you as part of onboarding at no extra cost.',
  },
  {
    question: 'Can you work with my existing CPA?',
    answer: 'Yes — that\'s the preferred arrangement. We handle the day-to-day bookkeeping; your CPA handles tax strategy and filing. We provide clean, well-organised books so your CPA can focus on high-value work.',
  },
  {
    question: 'How quickly can you get started?',
    answer: 'Most clients are fully set up within 48 hours of the discovery call. We connect to your bank feeds, migrate existing data, and get everything clean and current. You don\'t lift a finger.',
  },
];

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
                width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                padding: '18px 16px', background: isOpen ? 'rgba(201,168,76,0.04)' : 'transparent',
                border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'background 0.2s ease',
                minHeight: '60px', gap: '12px',
              }}
            >
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(14px,2vw,16px)', fontWeight: 500, color: '#D4CFC4', lineHeight: 1.5, flex: 1 }}>
                {faq.question}
              </span>
              <span aria-hidden="true" style={{ color: '#C9A84C', fontSize: '22px', fontWeight: 300, lineHeight: 1, flexShrink: 0, transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease', display: 'inline-block', width: '22px', textAlign: 'center', marginTop: '2px' }}>
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

export default function BookkeepingForSaaSPage() {
  return (
    <main className="relative overflow-x-hidden" style={{ backgroundColor: 'var(--background)' }} role="main">
      <Header />

      {/* Hero */}
      <section
        className="relative min-h-[60vh] flex flex-col items-center justify-center overflow-hidden"
        style={{ backgroundColor: 'var(--background)' }}
        aria-label="Hero"
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 55%, rgba(201,168,76,0.07) 0%, rgba(201,168,76,0.02) 55%, transparent 100%)' }} />
        <div className="gold-vertical-line-left" aria-hidden="true" />
        <div className="gold-vertical-line-right" aria-hidden="true" />

        <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-10 text-center pt-32 md:pt-36 pb-14 md:pb-20">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 font-ui" style={{ fontSize: '9px', letterSpacing: '3px', color: 'var(--primary)', textTransform: 'uppercase', fontWeight: 400 }}>
              <span className="hidden sm:inline-block" style={{ width: '16px', height: '1px', backgroundColor: 'var(--primary)', opacity: 0.6 }} />
              US Bookkeeping · SaaS &amp; Subscription Businesses
              <span className="hidden sm:inline-block" style={{ width: '16px', height: '1px', backgroundColor: 'var(--primary)', opacity: 0.6 }} />
            </span>
          </div>

          <h1 className="hero-h1 mb-4 md:mb-6">
            Bookkeeping built for
            <br />
            <span className="gold-italic">SaaS companies.</span>
          </h1>

          <p className="pull-quote mb-8 mx-auto" style={{ maxWidth: '600px', color: '#ffffff', fontSize: 'clamp(16px,2.2vw,22px)' }}>
            MRR tracking, deferred revenue, and daily finance ops — handled properly, every day, by a team that understands subscription businesses.
          </p>

          <p className="font-ui mb-7" style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)', fontWeight: 400 }}>
            From $300/month
          </p>

          <Link href="/book" className="btn-gold" style={{ display: 'inline-block', minWidth: '220px', textAlign: 'center' }}>
            Book a Discovery Call →
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, var(--background))' }} />
      </section>

      {/* Why SaaS finance ops are different */}
      <section
        className="py-20 md:py-32 px-6 md:px-10"
        style={{ backgroundColor: '#080808' }}
        aria-label="Why SaaS bookkeeping is different"
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--primary)', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}>
            The SaaS Finance Problem
          </p>
          <h2 className="section-h2-medium mb-8 md:mb-10">
            Cash in the bank is not the same as revenue earned.
          </h2>
          <div className="flex flex-col gap-5 mb-8">
            <p className="body-text-rw" style={{ fontSize: '15px', lineHeight: 1.8 }}>
              SaaS businesses collect cash upfront — annual subscriptions, quarterly plans, multi-year contracts. But that cash is not all revenue yet. Until the service is delivered, it sits on your balance sheet as a liability. Most generic bookkeepers miss this entirely, leaving founders with P&amp;L statements that look better (or worse) than reality.
            </p>
            <p className="body-text-rw" style={{ fontSize: '15px', lineHeight: 1.8 }}>
              Deferred revenue scheduling, MRR reconciliation, and churn-adjusted ARR tracking are not optional extras for a SaaS business — they are the foundation of accurate financial reporting. Investors, acquirers, and your own board expect these numbers to be right. Generic bookkeeping does not get them right.
            </p>
            <p className="body-text-rw" style={{ fontSize: '15px', lineHeight: 1.8 }}>
              Reckonwell handles the full finance operations layer for SaaS founders: daily transaction processing, proper revenue recognition, and management accounts that reflect what your business is actually doing — not just what hit your bank account this month.
            </p>
          </div>
          <div className="p-5 md:p-6 rounded-sm" style={{ borderLeft: '2px solid var(--primary)', backgroundColor: 'var(--gold-dim)' }}>
            <p className="body-text-rw" style={{ fontSize: '14px', fontStyle: 'italic' }}>
              "Your MRR dashboard and your accounting software should tell the same story. If they don't, your books are wrong."
            </p>
          </div>
        </div>
      </section>

      {/* Key SaaS finance challenges */}
      <section
        className="py-20 md:py-32 px-6 md:px-10"
        style={{ backgroundColor: 'var(--background)', borderTop: '0.5px solid var(--border)' }}
        aria-label="SaaS finance challenges"
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--primary)', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}>
            What We Handle
          </p>
          <h2 className="section-h2-medium mb-10 md:mb-14">
            The finance ops layer
            <br />
            <span className="gold-italic">SaaS founders actually need.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                num: '01',
                title: 'Revenue Recognition',
                body: 'Deferred revenue schedules built into your accounting software. Revenue recognised in the correct period — not when cash arrives. Accurate P&L every month.',
              },
              {
                num: '02',
                title: 'MRR / ARR Tracking',
                body: 'Live MRR and ARR reconciliation tied directly to your accounting records. New MRR, expansion, contraction, and churn tracked and reported monthly.',
              },
              {
                num: '03',
                title: 'Daily Finance Ops',
                body: 'Transactions processed daily, not monthly. Bank feeds reconciled, AP/AR managed, payroll handled. Your numbers are always current — not scrambled together at month-end.',
              },
            ].map((pillar) => (
              <div key={pillar.num} className="p-6 md:p-8 rounded-sm" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--gold-border)' }}>
                <p className="font-ui mb-3" style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--primary)' }}>
                  {pillar.num}
                </p>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(18px,2.5vw,22px)', fontWeight: 600, color: '#D4CFC4', marginBottom: '12px', lineHeight: 1.3 }}>
                  {pillar.title}
                </h3>
                <p className="body-text-rw" style={{ fontSize: '14px', lineHeight: 1.8 }}>{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section
        className="py-20 md:py-32 px-6 md:px-10"
        style={{ backgroundColor: '#080808' }}
        aria-label="Services included"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--primary)', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}>
              What's Included
            </p>
            <h2 className="section-h2-medium mb-5">
              Everything in one
              <br />
              <span className="gold-italic">flat monthly fee.</span>
            </h2>
            <p className="body-text-rw mb-8" style={{ fontSize: '15px' }}>
              No à la carte pricing. No scope creep. One fee covers your full finance operations — including the SaaS-specific work that generic bookkeepers charge extra for (or miss entirely).
            </p>
            <ul className="flex flex-col gap-3">
              {services.map((service) => (
                <li key={service} className="flex items-center gap-3">
                  <span style={{ color: 'var(--primary)', fontSize: '18px', fontWeight: 400, flexShrink: 0 }}>—</span>
                  <span className="body-text-rw" style={{ fontSize: '14px' }}>{service}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="p-6 md:p-8 rounded-sm" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--gold-border)' }}>
              <p className="font-ui mb-4" style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--primary)' }}>
                Tax Filing Note
              </p>
              <p className="body-text-rw mb-4" style={{ fontSize: '14px' }}>
                Reckonwell handles bookkeeping and finance operations — not tax preparation or filing. We do not prepare or file federal or state returns.
              </p>
              <p className="body-text-rw mb-4" style={{ fontSize: '14px' }}>
                If you already have a CPA, we work alongside them. If you don't, we can refer you to a trusted partner. Either way, your books will be clean and organised — which is exactly what your CPA needs.
              </p>
              <p className="body-text-rw" style={{ fontSize: '13px', fontStyle: 'italic', color: 'var(--primary)' }}>
                "Do you file my taxes? No — but your CPA will thank you for how clean your books are."
              </p>
            </div>
            <div className="mt-6 p-6 rounded-sm" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--gold-border)' }}>
              <p className="font-ui mb-3" style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--primary)' }}>
                Pricing
              </p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,40px)', fontWeight: 700, color: '#C9A84C', marginBottom: '8px' }}>
                From $300<span style={{ fontSize: '16px', color: '#D4CFC4' }}>/month</span>
              </p>
              <p className="body-text-rw" style={{ fontSize: '13px' }}>No setup fees · No long-term contracts · Cancel anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        style={{ backgroundColor: '#1C1A15' }}
        className="py-16 md:py-32 px-5 md:px-16"
        aria-label="Frequently asked questions"
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '11px', color: '#C9A84C', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '20px' }}>
            Questions &amp; Answers
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px,4vw,42px)', fontWeight: 700, color: '#D4CFC4', marginBottom: '32px', lineHeight: 1.2 }}>
            Frequently asked{' '}
            <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>questions</em>
          </h2>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 md:py-32 px-6 md:px-10 text-center"
        style={{ backgroundColor: '#080808' }}
        aria-label="Book a call"
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--primary)', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}>
            Get Started
          </p>
          <h2 className="section-h2-medium mb-5 md:mb-8">
            Ready for books that match
            <br />
            <span className="gold-italic">your MRR dashboard?</span>
          </h2>
          <p className="body-text-rw mb-8 mx-auto" style={{ maxWidth: '500px', fontSize: '15px' }}>
            Book a 30-minute discovery call. We'll review your current setup and show you exactly what clean SaaS bookkeeping looks like.
          </p>
          <Link href="/book" className="btn-gold" style={{ display: 'inline-block', minWidth: '220px', textAlign: 'center' }}>
            Book a Discovery Call →
          </Link>
          <p className="mt-6 body-text-rw" style={{ fontSize: '13px' }}>
            Or{' '}
            <Link href="/us/" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
              see the full US service overview →
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
