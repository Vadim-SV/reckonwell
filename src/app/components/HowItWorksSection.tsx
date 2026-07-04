'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'Book a Free Discovery Call',
    body: 'A 20-minute conversation. We learn your business, your current setup, and exactly what you need. You leave with a clear picture of what working together looks like. No obligation, no pressure.',
    detail: null,
  },
  {
    num: '02',
    title: 'We Set Up Your Books in 48 Hours',
    body: 'We connect to your bank feeds, migrate your existing data, and get everything clean and current within two working days. You do not lift a finger — we coordinate everything.',
    detail: {
      items: [
        'Bank & card reconciliation',
        'Expense categorisation',
        'Sales & invoice tracking',
        'Director loan account monitoring',
      ],
    },
  },
  {
    num: '03',
    title: 'Daily Work Begins Immediately',
    body: 'From day one, your dedicated team is in your accounts every morning. Transactions processed, positions updated, anything unusual flagged before it becomes a problem.',
    detail: null,
  },
  {
    num: '04',
    title: 'You Focus on Your Business',
    body: 'We handle the numbers. You get monthly reports, quarterly reviews, and a team you can call whenever you want clarity. Your only job is to lead. That is the entire arrangement.',
    detail: null,
  },
];

export default function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="py-12 md:py-20 px-6 md:px-10"
      style={{ backgroundColor: '#080808' }}
      aria-label="How it works"
    >
      <div className="max-w-5xl mx-auto">
        <motion.p
          className="section-label mb-4 md:mb-5"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          How It Works
        </motion.p>

        <motion.h2
          className="section-h2-medium mb-4 md:mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          One call. 48 hours.
          <br />
          <span className="gold-italic">Done.</span>
        </motion.h2>

        <motion.p
          className="pull-quote mb-8 md:mb-12"
          style={{ maxWidth: '480px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          From first conversation to fully operational — with less friction than
          you expect.
        </motion.p>

        <div className="flex flex-col">
          {steps?.map((step, i) => (
            <motion.div
              key={step?.num}
              className="step-item"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-start gap-5 md:gap-8">
                <div
                  className="font-display flex-shrink-0"
                  style={{
                    fontSize: '13px',
                    color: 'var(--primary)',
                    fontWeight: 400,
                    letterSpacing: '2px',
                    paddingTop: '3px',
                    minWidth: '28px',
                  }}
                >
                  {step?.num}
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className="font-display mb-3"
                    style={{
                      fontSize: 'clamp(16px, 2vw, 24px)',
                      fontWeight: 400,
                      color: 'var(--foreground)',
                      lineHeight: 1.2,
                    }}
                  >
                    {step?.title}
                  </h3>
                  <p className="body-text-rw mb-4" style={{ fontSize: '15px' }}>
                    {step?.body}
                  </p>

                  {step?.detail && (
                    <div
                      className="mt-3 p-4 rounded-sm"
                      style={{
                        borderLeft: '2px solid var(--primary)',
                        backgroundColor: 'var(--gold-dim)',
                      }}
                    >
                      <p
                        className="font-ui mb-3"
                        style={{
                          fontSize: '10px',
                          letterSpacing: '3px',
                          textTransform: 'uppercase',
                          color: 'var(--primary)',
                        }}
                      >
                        Includes
                      </p>
                      <ul className="flex flex-col gap-2">
                        {step?.detail?.items?.map((item) => (
                          <li key={item} className="flex items-center gap-3">
                            <span
                              style={{
                                width: '4px',
                                height: '4px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--primary)',
                                flexShrink: 0,
                              }}
                            />
                            <span className="body-text-rw" style={{ fontSize: '14px', color: 'var(--body-text)' }}>
                              {item}
                            </span>
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