'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const comparisonRows = [
  {
    label: 'Monthly cost',
    inHouse: '$4,000–$6,000/month (salary + benefits + payroll taxes)',
    outsourced: 'From $300/month — flat fee, no hidden costs',
  },
  {
    label: 'Time to hire',
    inHouse: '4–8 weeks average, plus onboarding time',
    outsourced: 'Set up within 48 hours of discovery call',
  },
  {
    label: 'Coverage when sick or on leave',
    inHouse: 'Work stops or falls to you',
    outsourced: 'Team-based — no single point of failure',
  },
  {
    label: 'Software expertise',
    inHouse: 'Depends on the individual hire',
    outsourced: 'Xero / QuickBooks certified, set up properly from day one',
  },
  {
    label: 'Scalability',
    inHouse: 'Hire again when you outgrow them',
    outsourced: 'Scales with your business, no rehiring',
  },
  {
    label: 'Management overhead',
    inHouse: 'You manage them — performance reviews, HR, etc.',
    outsourced: 'We manage ourselves — you review the output',
  },
  {
    label: 'Tax filing',
    inHouse: 'Bookkeeper may or may not handle tax prep',
    outsourced: 'Not included — but your CPA gets clean books, not a mess',
  },
  {
    label: 'Institutional knowledge',
    inHouse: 'Leaves when they leave',
    outsourced: 'Documented processes, continuity guaranteed',
  },
];

const faqs = [
  {
    question: 'When does it make sense to hire in-house instead?',
    answer: 'In-house bookkeeping makes sense when your transaction volume is extremely high (hundreds of transactions per day), when you need someone physically present in your office for compliance or operational reasons, or when you\'ve grown to a scale where a full finance team is justified. For most founder-led businesses under $10M revenue, outsourced bookkeeping is more cost-effective and more reliable.',
  },
  {
    question: 'What happens if my outsourced bookkeeper makes a mistake?',
    answer: 'With Reckonwell, you have a team — not a single person. Errors are caught through internal review processes before they reach you. If something does slip through, we fix it at no additional cost. With an in-house hire, you\'re relying on one person with no internal review layer.',
  },
  {
    question: 'Can I switch from in-house to outsourced without disruption?',
    answer: 'Yes. We handle the transition — migrating your data, connecting bank feeds, and getting everything clean and current. Most transitions are completed within a week. We\'ve done this many times and have a clear process for it.',
  },
  {
    question: 'Do you file taxes?',
    answer: 'No — Reckonwell handles bookkeeping and finance operations only. We do not prepare or file federal or state tax returns. If you need a CPA, we can refer you to a trusted partner. Your books will be clean and organised, which makes your CPA\'s job significantly easier.',
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

export default function OutsourcedVsInHousePage() {
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
              US Bookkeeping · Decision Guide
              <span className="hidden sm:inline-block" style={{ width: '16px', height: '1px', backgroundColor: 'var(--primary)', opacity: 0.6 }} />
            </span>
          </div>

          <h1 className="hero-h1 mb-4 md:mb-6">
            Outsourced bookkeeping
            <br />
            <span className="gold-italic">vs. in-house: which is right for you?</span>
          </h1>

          <p className="pull-quote mb-8 mx-auto" style={{ maxWidth: '620px', color: '#ffffff', fontSize: 'clamp(16px,2.2vw,22px)' }}>
            An honest comparison of cost, control, expertise, and risk — so you can make the right decision for your business.
          </p>

          <Link href="/book" className="btn-gold" style={{ display: 'inline-block', minWidth: '220px', textAlign: 'center' }}>
            Book a Discovery Call →
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, var(--background))' }} />
      </section>

      {/* The real cost of in-house */}
      <section
        className="py-20 md:py-32 px-6 md:px-10"
        style={{ backgroundColor: '#080808' }}
        aria-label="The real cost of in-house bookkeeping"
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--primary)', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}>
            The Real Cost
          </p>
          <h2 className="section-h2-medium mb-8 md:mb-10">
            In-house bookkeeping costs more than the salary.
          </h2>
          <div className="flex flex-col gap-5 mb-8">
            <p className="body-text-rw" style={{ fontSize: '15px', lineHeight: 1.8 }}>
              A full-time bookkeeper in the US earns $45,000–$65,000 per year in salary. Add employer payroll taxes (7.65%), health insurance ($6,000–$12,000/year), paid leave, and any software or equipment costs, and the true annual cost is typically $55,000–$80,000. That's $4,600–$6,700 per month for a single person doing one job.
            </p>
            <p className="body-text-rw" style={{ fontSize: '15px', lineHeight: 1.8 }}>
              Then there's the management overhead: hiring (4–8 weeks, often with a recruiter fee), onboarding, performance management, and the risk of turnover. When your bookkeeper leaves — and they will eventually — you start again. Any institutional knowledge they had walks out the door with them.
            </p>
            <p className="body-text-rw" style={{ fontSize: '15px', lineHeight: 1.8 }}>
              Outsourced bookkeeping eliminates most of these costs and risks. You pay a flat monthly fee for a team — not a single person — with no hiring overhead, no benefits, no turnover risk, and no single point of failure. The question is not whether outsourcing is cheaper. It almost always is. The question is whether the trade-offs in control and proximity are acceptable for your business.
            </p>
          </div>
          <div className="p-5 md:p-6 rounded-sm" style={{ borderLeft: '2px solid var(--primary)', backgroundColor: 'var(--gold-dim)' }}>
            <p className="body-text-rw" style={{ fontSize: '14px', fontStyle: 'italic' }}>
              "The hidden cost of in-house bookkeeping isn't the salary — it's the management time, the turnover risk, and the months of disruption when they leave."
            </p>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section
        className="py-20 md:py-32 px-6 md:px-10"
        style={{ backgroundColor: 'var(--background)', borderTop: '0.5px solid var(--border)' }}
        aria-label="Comparison table"
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--primary)', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}>
            Side by Side
          </p>
          <h2 className="section-h2-medium mb-10 md:mb-14">
            In-house vs. outsourced:
            <br />
            <span className="gold-italic">an honest comparison.</span>
          </h2>

          {/* Mobile: stacked cards */}
          <div className="md:hidden flex flex-col gap-4">
            {comparisonRows.map((row, i) => (
              <div key={i} className="rounded-sm overflow-hidden" style={{ border: '1px solid var(--gold-border)' }}>
                <div className="px-4 py-3" style={{ backgroundColor: 'rgba(201,168,76,0.08)' }}>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--primary)', margin: 0 }}>{row.label}</p>
                </div>
                <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--gold-border)', backgroundColor: 'var(--card)' }}>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#888', marginBottom: '6px' }}>In-House</p>
                  <p className="body-text-rw" style={{ fontSize: '13px', margin: 0 }}>{row.inHouse}</p>
                </div>
                <div className="px-4 py-3" style={{ backgroundColor: 'rgba(201,168,76,0.04)' }}>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '6px' }}>Reckonwell</p>
                  <p className="body-text-rw" style={{ fontSize: '13px', margin: 0, color: '#D4CFC4' }}>{row.outsourced}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: table */}
          <div className="hidden md:block overflow-x-auto">
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--gold-border)' }}>
              <thead>
                <tr>
                  <th style={{ padding: '14px 16px', textAlign: 'left', fontFamily: "'Montserrat', sans-serif", fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--primary)', backgroundColor: 'rgba(201,168,76,0.06)', borderBottom: '1px solid var(--gold-border)', width: '25%' }}>
                    Factor
                  </th>
                  <th style={{ padding: '14px 16px', textAlign: 'left', fontFamily: "'Montserrat', sans-serif", fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#888', backgroundColor: 'rgba(201,168,76,0.06)', borderBottom: '1px solid var(--gold-border)', width: '37.5%' }}>
                    In-House Bookkeeper
                  </th>
                  <th style={{ padding: '14px 16px', textAlign: 'left', fontFamily: "'Montserrat', sans-serif", fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--primary)', backgroundColor: 'rgba(201,168,76,0.06)', borderBottom: '1px solid var(--gold-border)', width: '37.5%' }}>
                    Reckonwell
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={i} style={{ borderBottom: i < comparisonRows.length - 1 ? '1px solid rgba(201,168,76,0.12)' : 'none' }}>
                    <td style={{ padding: '14px 16px', fontFamily: "'Montserrat', sans-serif", fontSize: '12px', color: '#D4CFC4', verticalAlign: 'top', backgroundColor: 'var(--card)' }}>
                      {row.label}
                    </td>
                    <td style={{ padding: '14px 16px', fontFamily: "'Montserrat', sans-serif", fontSize: '13px', color: '#888', lineHeight: 1.7, verticalAlign: 'top', backgroundColor: 'var(--card)' }}>
                      {row.inHouse}
                    </td>
                    <td style={{ padding: '14px 16px', fontFamily: "'Montserrat', sans-serif", fontSize: '13px', color: '#D4CFC4', lineHeight: 1.7, verticalAlign: 'top', backgroundColor: 'rgba(201,168,76,0.03)' }}>
                      {row.outsourced}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 p-5 md:p-6 rounded-sm" style={{ borderLeft: '2px solid var(--primary)', backgroundColor: 'var(--gold-dim)' }}>
            <p className="body-text-rw" style={{ fontSize: '14px' }}>
              <strong style={{ color: '#D4CFC4' }}>When in-house makes sense:</strong> Very high transaction volumes, physical presence requirements, or businesses at a scale where a full finance team is justified. For most founder-led businesses under $10M revenue, outsourced bookkeeping is more cost-effective and more reliable.
            </p>
          </div>
        </div>
      </section>

      {/* CPA note */}
      <section
        className="py-16 md:py-24 px-6 md:px-10"
        style={{ backgroundColor: '#080808' }}
        aria-label="Tax filing note"
      >
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--primary)', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}>
            Tax Filing Note
          </p>
          <p className="body-text-rw mb-4" style={{ fontSize: '15px', lineHeight: 1.8 }}>
            Reckonwell handles bookkeeping and finance operations — not tax preparation or filing. Whether you choose in-house or outsourced bookkeeping, you'll still need a CPA for federal and state tax returns. If you don't have one, we can refer you to a trusted partner.
          </p>
          <p className="body-text-rw" style={{ fontSize: '14px', fontStyle: 'italic', color: 'var(--primary)' }}>
            "Do you file my taxes? No — but your CPA will thank you for how clean your books are."
          </p>
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
            Ready to see what outsourced
            <br />
            <span className="gold-italic">bookkeeping actually looks like?</span>
          </h2>
          <p className="body-text-rw mb-8 mx-auto" style={{ maxWidth: '500px', fontSize: '15px' }}>
            Book a 30-minute discovery call. We'll review your current setup, answer your questions honestly, and let you decide if it's the right fit.
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
