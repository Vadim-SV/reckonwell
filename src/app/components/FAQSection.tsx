'use client';

import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
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
      'We work best with founder-led and owner-managed businesses billing between £250k and £10m annually — typically companies that have outgrown a sole-trader accountant but aren\'t large enough to justify an in-house finance director.',
  },
  {
    question: 'How long does onboarding take?',
    answer:
      'Most clients are fully onboarded within two to three weeks. We handle the transfer from your previous accountant, migrate your data, and set up your reporting structure. You don\'t need to do anything except give us access — we coordinate everything else.',
  },
  {
    question: 'What software do you use?',
    answer:
      'We work with Xero, QuickBooks, and Sage. If you already use one of these, we slot straight in. If you\'re on spreadsheets or a legacy system, we\'ll migrate you to the right platform as part of onboarding — at no extra cost.',
  },
  {
    question: 'Is there a long-term contract?',
    answer:
      'No lock-ins. We work on a rolling monthly basis. We\'re confident enough in what we deliver that we don\'t need to trap you with minimum terms.',
  },
  {
    question: 'How is pricing structured?',
    answer:
      'Pricing is based on the complexity and volume of your finance function — turnover, number of transactions, payroll headcount, and the scope of work. We quote a fixed monthly fee so there are no surprises.',
  },
  {
    question: 'What happens if I have an urgent question outside office hours?',
    answer:
      'Your named account manager is reachable via a dedicated Slack channel or WhatsApp during business hours with same-day response guaranteed. For urgent matters — investor deadlines, HMRC notices, banking queries — we operate an escalation line monitored until 8 pm on weekdays.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      style={{
        backgroundColor: 'var(--surface)',
      }}
      className="faq-section py-16 md:py-32 px-5 md:px-16"
      aria-label="Frequently asked questions"
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Section label */}
        <p className="section-label" style={{ marginBottom: '20px' }}>
          Questions &amp; Answers
        </p>

        {/* Heading */}
        <h2
          className="section-h2-medium"
          style={{ marginBottom: '32px' }}
        >
          Frequently asked{' '}
          <em className="gold-italic">questions</em>
        </h2>

        {/* Accordion list */}
        <div
          style={{
            border: '1px solid var(--border)',
            borderRadius: '2px',
          }}
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const isLast = index === faqs.length - 1;

            return (
              <div
                key={index}
                style={{
                  borderBottom: isLast ? 'none' : '1px solid var(--border)',
                }}
              >
                {/* Question row */}
                <button
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    padding: '18px 16px',
                    background: isOpen ? 'var(--primary-dim)' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background 0.2s ease',
                    minHeight: '60px',
                    gap: '12px',
                  }}
                  onMouseEnter={(e) => {
                    if (!isOpen) {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        'var(--border-subtle)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isOpen) {
                      (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                    }
                  }}
                >
                  <span
                    className="font-display"
                    style={{
                      fontSize: 'clamp(14px, 2vw, 16px)',
                      fontWeight: 500,
                      color: 'var(--foreground)',
                      lineHeight: 1.5,
                      flex: 1,
                    }}
                  >
                    {faq.question}
                  </span>

                  {/* +/× icon */}
                  <span
                    aria-hidden="true"
                    style={{
                      color: 'var(--primary)',
                      fontSize: '22px',
                      fontWeight: 300,
                      lineHeight: 1,
                      flexShrink: 0,
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      display: 'inline-block',
                      width: '22px',
                      textAlign: 'center',
                      marginTop: '2px',
                    }}
                  >
                    +
                  </span>
                </button>

                {/* Answer panel */}
                <div
                  style={{
                    maxHeight: isOpen ? '600px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.4s ease',
                  }}
                >
                  <p
                    className="body-text-rw"
                    style={{
                      fontSize: '14px',
                      lineHeight: 1.9,
                      padding: '0 16px 18px',
                      margin: 0,
                    }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
