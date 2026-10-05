'use client';

import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What do you handle?',
    answer:
      'Bookkeeping, management accounts, payroll, VAT, year-end accounts and tax, kept up to date all year.',
  },
  {
    question: 'Do we have to replace our current team?',
    answer:
      'No. We work alongside whoever you already have, or act as your whole finance function.',
  },
  {
    question: 'How long does onboarding take?',
    answer:
      'Two to three weeks. We handle the switch from your previous accountant.',
  },
  {
    question: 'Is there a contract?',
    answer:
      'No. Rolling monthly, cancel any time.',
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
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:gap-16 lg:gap-24">
          {/* Left column — heading */}
          <div className="md:w-2/5 lg:w-1/3 mb-10 md:mb-0 flex-shrink-0">
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
              Quick answers.
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
