'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const services = [
  'Daily bookkeeping & transaction processing',
  'Monthly management accounts & board pack',
  'Cash flow forecasting (13-week rolling)',
  'Budget vs actuals reporting',
  'KPI dashboard & financial metrics',
  'Accounts payable & receivable (AP/AR)',
  'Payroll processing',
  'Fundraising & investor data room support',
  'Dedicated senior finance team member',
];

const faqs = [
  {
    question: 'What is a virtual CFO and do I need one?',
    answer: 'A virtual CFO provides CFO-level financial oversight without the cost of a full-time hire. If you\'re past the early startup stage, generating meaningful revenue, and making decisions that require financial clarity — pricing, hiring, fundraising, expansion — a virtual CFO gives you the strategic finance layer you need. Most founder-led businesses at $500k–$5M revenue benefit significantly from this level of support.',
  },
  {
    question: 'How is this different from standard bookkeeping?',
    answer: 'Standard bookkeeping records what happened. Virtual CFO services interpret what it means and help you decide what to do next. You get management accounts, cash flow forecasts, budget vs actuals, and a finance partner who can sit in on board calls, help you prepare for fundraising, or model out a pricing change. The bookkeeping is the foundation — the CFO layer is what makes it actionable.',
  },
  {
    question: 'Do you file taxes?',
    answer: 'No — Reckonwell handles bookkeeping and finance operations only. We do not prepare or file federal or state tax returns. If you need a CPA, we can refer you to a trusted partner. Your books will be clean and organised, which makes your CPA\'s job significantly easier.',
  },
  {
    question: 'Can you help with fundraising preparation?',
    answer: 'Yes. We can prepare the financial components of a data room — historical P&L, balance sheet, cash flow statements, and financial model — and ensure your numbers are clean and investor-ready. We don\'t provide legal or investment advice, but we make sure the financial story is accurate and well-presented.',
  },
  {
    question: 'What accounting software do you use?',
    answer: 'We work with Xero and QuickBooks. If you\'re already on one of these, we slot straight in. If you\'re on spreadsheets or a legacy system, we\'ll migrate you as part of onboarding at no extra cost.',
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

export default function VirtualCFOServicesPage() {
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
              US Finance Services · Virtual CFO
              <span className="hidden sm:inline-block" style={{ width: '16px', height: '1px', backgroundColor: 'var(--primary)', opacity: 0.6 }} />
            </span>
          </div>

          <h1 className="hero-h1 mb-4 md:mb-6">
            Virtual CFO services for
            <br />
            <span className="gold-italic">scaling businesses.</span>
          </h1>

          <p className="pull-quote mb-8 mx-auto" style={{ maxWidth: '620px', color: '#ffffff', fontSize: 'clamp(16px,2.2vw,22px)' }}>
            CFO-level financial oversight without the full-time hire. Daily bookkeeping, management accounts, cash flow forecasting, and a finance partner who helps you make better decisions.
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

      {/* Why virtual CFO */}
      <section
        className="py-20 md:py-32 px-6 md:px-10"
        style={{ backgroundColor: '#080808' }}
        aria-label="Why virtual CFO"
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--primary)', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}>
            The Scaling Finance Problem
          </p>
          <h2 className="section-h2-medium mb-8 md:mb-10">
            You've outgrown basic bookkeeping. You're not ready for a full-time CFO.
          </h2>
          <div className="flex flex-col gap-5 mb-8">
            <p className="body-text-rw" style={{ fontSize: '15px', lineHeight: 1.8 }}>
              There's a gap between "I need someone to reconcile my bank account" and "I need a $200k/year CFO." Most founder-led businesses at $500k–$5M revenue sit squarely in that gap. They need financial clarity to make good decisions — on pricing, hiring, fundraising, expansion — but they don't need (and can't justify) a full-time finance executive.
            </p>
            <p className="body-text-rw" style={{ fontSize: '15px', lineHeight: 1.8 }}>
              A virtual CFO fills that gap. You get the bookkeeping foundation — daily transaction processing, reconciliation, AP/AR — plus the strategic layer: monthly management accounts, cash flow forecasting, budget vs actuals, and a finance partner who can help you interpret the numbers and make better decisions.
            </p>
            <p className="body-text-rw" style={{ fontSize: '15px', lineHeight: 1.8 }}>
              Reckonwell's virtual CFO service is built for founder-led businesses that are past the startup stage and need financial infrastructure that scales with them — without the overhead of a full-time hire.
            </p>
          </div>
          <div className="p-5 md:p-6 rounded-sm" style={{ borderLeft: '2px solid var(--primary)', backgroundColor: 'var(--gold-dim)' }}>
            <p className="body-text-rw" style={{ fontSize: '14px', fontStyle: 'italic' }}>
              "Most founders make their biggest financial decisions with the least financial information. That's the problem we solve."
            </p>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section
        className="py-20 md:py-32 px-6 md:px-10"
        style={{ backgroundColor: 'var(--background)', borderTop: '0.5px solid var(--border)' }}
        aria-label="Services included"
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--primary)', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}>
            What We Handle
          </p>
          <h2 className="section-h2-medium mb-10 md:mb-14">
            The full finance stack,
            <br />
            <span className="gold-italic">from bookkeeping to board pack.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
            {[
              {
                num: '01',
                title: 'Finance Foundation',
                body: 'Daily bookkeeping, bank reconciliation, AP/AR management, and payroll. The operational layer that everything else is built on — done properly, every day.',
              },
              {
                num: '02',
                title: 'Management Reporting',
                body: 'Monthly management accounts, board pack, and KPI dashboard. Numbers that tell you what\'s actually happening in your business — not just what hit your bank account.',
              },
              {
                num: '03',
                title: 'Strategic Finance',
                body: 'Cash flow forecasting, budget vs actuals, and a finance partner who helps you interpret the numbers. Pricing decisions, hiring plans, fundraising prep — we\'re in the room.',
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--primary)', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}>
                Full Service List
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
                  If you already have a CPA, we work alongside them. If you don't, we can refer you to a trusted partner.
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
            Ready for a finance partner,
            <br />
            <span className="gold-italic">not just a bookkeeper?</span>
          </h2>
          <p className="body-text-rw mb-8 mx-auto" style={{ maxWidth: '500px', fontSize: '15px' }}>
            Book a 30-minute discovery call. We'll review your current setup and show you what CFO-level financial oversight looks like for a business at your stage.
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
