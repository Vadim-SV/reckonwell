'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const services = [
  'Daily bookkeeping & transaction processing',
  'COGS tracking & inventory reconciliation',
  'Multi-channel revenue reconciliation (Shopify, Amazon, etc.)',
  'Sales tax nexus monitoring',
  'Accounts payable & receivable (AP/AR)',
  'Payroll processing',
  'Monthly management accounts',
  'Cash flow monitoring & alerts',
  'Dedicated finance team member',
];

const faqs = [
  {
    question: 'Do you file taxes or handle sales tax remittance?',
    answer: 'No — Reckonwell handles bookkeeping and finance operations only. We do not prepare or file federal, state, or sales tax returns. We track your sales tax nexus obligations and flag them clearly, but filing is handled by your CPA or a dedicated sales tax service. If you need a referral, we can help.',
  },
  {
    question: 'How do you handle multi-channel revenue from Shopify, Amazon, and other platforms?',
    answer: 'We reconcile each channel separately — Shopify payouts, Amazon settlements, Etsy, and any other platform — and map them correctly into your accounting software. Platform fees, refunds, and chargebacks are all accounted for. You get a single, accurate P&L rather than a pile of unreconciled deposits.',
  },
  {
    question: 'Can you track COGS and inventory?',
    answer: 'Yes. We maintain a COGS schedule that ties to your inventory movements. Whether you\'re using a 3PL, managing your own warehouse, or drop-shipping, we set up the right accounting treatment so your gross margin is accurate — not guesswork.',
  },
  {
    question: 'What is sales tax nexus and why does it matter for my books?',
    answer: 'Economic nexus rules mean that selling into a state above a certain revenue threshold (typically $100,000 or 200 transactions) creates a sales tax obligation in that state — even if you have no physical presence there. We track your exposure across states and flag when you\'re approaching or crossing thresholds. Your CPA or a sales tax specialist handles the actual filing.',
  },
  {
    question: 'What accounting software do you use?',
    answer: 'We work with Xero and QuickBooks. Both integrate well with major e-commerce platforms. If you\'re on spreadsheets or a legacy system, we\'ll migrate you as part of onboarding at no extra cost.',
  },
  {
    question: 'Can you work with my existing CPA?',
    answer: 'Yes — that\'s the preferred arrangement. We handle the day-to-day bookkeeping; your CPA handles tax strategy and filing. We provide clean, well-organised books so your CPA can focus on high-value work.',
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

export default function BookkeepingForEcommercePage() {
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
              US Bookkeeping · E-Commerce &amp; DTC Brands
              <span className="hidden sm:inline-block" style={{ width: '16px', height: '1px', backgroundColor: 'var(--primary)', opacity: 0.6 }} />
            </span>
          </div>

          <h1 className="hero-h1 mb-4 md:mb-6">
            Bookkeeping built for
            <br />
            <span className="gold-italic">e-commerce brands.</span>
          </h1>

          <p className="pull-quote mb-8 mx-auto" style={{ maxWidth: '600px', color: '#ffffff', fontSize: 'clamp(16px,2.2vw,22px)' }}>
            COGS tracking, multi-channel reconciliation, and sales tax nexus monitoring — handled daily, by a team that understands how e-commerce money actually moves.
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

      {/* Why e-commerce finance ops are different */}
      <section
        className="py-20 md:py-32 px-6 md:px-10"
        style={{ backgroundColor: '#080808' }}
        aria-label="Why e-commerce bookkeeping is different"
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--primary)', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}>
            The E-Commerce Finance Problem
          </p>
          <h2 className="section-h2-medium mb-8 md:mb-10">
            Revenue across five platforms, inventory in three warehouses, sales tax in twelve states.
          </h2>
          <div className="flex flex-col gap-5 mb-8">
            <p className="body-text-rw" style={{ fontSize: '15px', lineHeight: 1.8 }}>
              E-commerce bookkeeping is not just more transactions — it is fundamentally more complex. Shopify payouts bundle fees, refunds, and chargebacks into a single deposit. Amazon settlements arrive weeks after the sale. Inventory moves between locations and changes in value. Most generic bookkeepers treat all of this as a single bank deposit and call it revenue. That is wrong.
            </p>
            <p className="body-text-rw" style={{ fontSize: '15px', lineHeight: 1.8 }}>
              The 2018 South Dakota v. Wayfair Supreme Court ruling created economic nexus rules that mean selling into a state above a threshold — typically $100,000 or 200 transactions — creates a sales tax obligation there, even without a physical presence. For a brand selling across the US, this can mean obligations in 20+ states. Your books need to track this exposure clearly.
            </p>
            <p className="body-text-rw" style={{ fontSize: '15px', lineHeight: 1.8 }}>
              Reckonwell handles the full finance operations layer for e-commerce founders: daily transaction processing, proper COGS accounting, multi-channel reconciliation, and nexus monitoring. Your gross margin is accurate. Your CPA has what they need. You know where you stand.
            </p>
          </div>
          <div className="p-5 md:p-6 rounded-sm" style={{ borderLeft: '2px solid var(--primary)', backgroundColor: 'var(--gold-dim)' }}>
            <p className="body-text-rw" style={{ fontSize: '14px', fontStyle: 'italic' }}>
              "If your gross margin looks different every month and you can't explain why, your COGS accounting is broken. That's fixable."
            </p>
          </div>
        </div>
      </section>

      {/* Key e-commerce finance challenges */}
      <section
        className="py-20 md:py-32 px-6 md:px-10"
        style={{ backgroundColor: 'var(--background)', borderTop: '0.5px solid var(--border)' }}
        aria-label="E-commerce finance challenges"
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--primary)', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}>
            What We Handle
          </p>
          <h2 className="section-h2-medium mb-10 md:mb-14">
            The finance ops layer
            <br />
            <span className="gold-italic">e-commerce founders actually need.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                num: '01',
                title: 'COGS & Inventory',
                body: 'Proper cost of goods sold accounting tied to your inventory movements. Gross margin you can trust — not a number that changes every time your bookkeeper guesses at landed costs.',
              },
              {
                num: '02',
                title: 'Multi-Channel Reconciliation',
                body: 'Shopify, Amazon, Etsy, wholesale — each channel reconciled separately. Platform fees, refunds, and chargebacks mapped correctly. One clean P&L, not a pile of unreconciled deposits.',
              },
              {
                num: '03',
                title: 'Sales Tax Nexus Monitoring',
                body: 'We track your revenue and transaction counts by state and flag when you\'re approaching or crossing economic nexus thresholds. Your CPA or sales tax specialist handles the filing — we make sure they have the data.',
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
              No à la carte pricing. No scope creep. One fee covers your full finance operations — including the e-commerce-specific work that generic bookkeepers miss or charge extra for.
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
                Reckonwell handles bookkeeping and finance operations — not tax preparation or filing. We do not prepare or file federal, state, or sales tax returns.
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
            <span className="gold-italic">your actual gross margin?</span>
          </h2>
          <p className="body-text-rw mb-8 mx-auto" style={{ maxWidth: '500px', fontSize: '15px' }}>
            Book a 30-minute discovery call. We'll review your current setup and show you exactly what clean e-commerce bookkeeping looks like.
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
