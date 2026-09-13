'use client';

import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What does Reckonwell handle?',
    answer:
      'Reckonwell is your dedicated finance team — not just a filing service. We handle bookkeeping, management accounts, payroll, VAT returns, year-end accounts, and tax planning. We work with you on an ongoing basis so your numbers are always current and decision-ready.',
  },
  {
    question: 'Will we need to change our existing team?',
    answer:
      'No. We work alongside your existing team, not instead of them. Whether you have an in-house bookkeeper, a part-time finance manager, or nothing at all, we slot in where we are needed and complement what you already have in place.',
  },
  {
    question: 'Does fundraising support guarantee an introduction or investment?',
    answer:
      'No — and we will always be honest about that. What we do is make sure your financials, forecasts, and data room are investor-ready so that when you do get in front of the right people, nothing falls apart under scrutiny.',
  },
  {
    question: 'How long does onboarding take?',
    answer:
      'Most clients are fully onboarded within two to three weeks. We handle the transfer from your previous accountant, migrate your data, and set up your reporting structure. You don\'t need to do anything except give us access — we coordinate everything else.',
  },
  {
    question: 'Is there a long-term contract?',
    answer:
      'No lock-ins. We work on a rolling monthly basis. We\'re confident enough in what we deliver that we don\'t need to trap you with minimum terms.',
  },
];

export default function ClarityFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      style={{ backgroundColor: 'var(--surface)' }}
      className="py-16 md:py-24 px-5 md:px-16"
      aria-label="Questions and answers"
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="flex flex-col md:flex-row md:gap-16 lg:gap-24">
          {/* Left column — heading */}
          <div className="md:w-2/5 lg:w-1/3 mb-10 md:mb-0 flex-shrink-0">
            <p
              className="section-label"
              style={{ marginBottom: '16px', letterSpacing: '0.12em' }}
            >
              Questions &amp; Answers
            </p>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(32px, 5vw, 52px)',
                fontWeight: 400,
                color: 'var(--foreground)',
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              A little more clarity.
            </h2>
          </div>

          {/* Right column — accordion */}
          <div className="flex-1">
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
                  <button
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      padding: '18px 0',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    {/* Triangle icon */}
                    <span
                      aria-hidden="true"
                      style={{
                        color: 'var(--foreground)',
                        fontSize: '10px',
                        flexShrink: 0,
                        marginTop: '5px',
                        display: 'inline-block',
                        transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.25s ease',
                      }}
                    >
                      ▶
                    </span>
                    <span
                      className="font-display"
                      style={{
                        fontSize: 'clamp(14px, 1.8vw, 16px)',
                        fontWeight: 700,
                        color: 'var(--foreground)',
                        lineHeight: 1.5,
                      }}
                    >
                      {faq.question}
                    </span>
                  </button>

                  {/* Answer panel */}
                  <div
                    style={{
                      maxHeight: isOpen ? '400px' : '0',
                      overflow: 'hidden',
                      transition: 'max-height 0.35s ease',
                    }}
                  >
                    <p
                      className="body-text-rw"
                      style={{
                        fontSize: '14px',
                        lineHeight: 1.9,
                        padding: '0 0 18px 22px',
                        margin: 0,
                        color: 'var(--foreground)',
                        opacity: 0.8,
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
      </div>
    </section>
  );
}
