'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const withoutItems = [
  'Sales invoices go unchased for weeks — customers who owe you money, and nobody\'s following up.',
  'You don\'t actually know your working capital position — is there real cash to spend, or is it all owed out?',
  'Your accountant closes the books once a month, so a cash flow problem is often three or four weeks old before anyone notices.',
  'Your in-house bookkeeper can enter the numbers, but can\'t tell you what they mean for your next six months.',
  'You\'re making decisions — hiring, spending, holding back — on gut feel, because nobody\'s shown you a real forecast.',
  'Every quiet moment gets swallowed by "just checking the numbers" instead of running the business.',
];

const withItems = [
  'Every invoice is tracked and chased as a matter of course — unpaid customers don\'t slip through.',
  'You know your real working capital position, whenever you need it — not a guess based on the bank balance.',
  'Daily monitoring means a cash flow issue is caught within days, not discovered a month later at close.',
  'A qualified finance professional runs the actual analysis — working capital, cash flow forecasting, runway — not just data entry.',
  'Every major decision is backed by real numbers and a real forecast, not gut feel.',
  'The numbers are someone else\'s job now. You get your time and headspace back.',
];

export default function BeforeAfterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="py-20 md:py-36 px-6 md:px-10"
      style={{ backgroundColor: 'var(--background)' }}
      aria-label="Before and after comparison"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="section-h2-medium text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          The difference is{' '}
          <span className="gold-italic">everything.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Without */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-sm p-6 md:p-12"
            style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border-subtle)' }}
          >
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <span
                className="inline-flex items-center gap-2 font-ui px-3 py-1 rounded-sm"
                style={{
                  fontSize: '10px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  backgroundColor: 'rgba(192, 57, 43, 0.12)',
                  color: '#E74C3C',
                  border: '1px solid rgba(192,57,43,0.2)',
                  fontWeight: 500,
                }}
              >
                ✕ Before Reckonwell
              </span>
            </div>
            <ul className="flex flex-col gap-4 md:gap-5">
              {withoutItems?.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 md:gap-4"
                >
                  <span
                    style={{
                      color: '#E74C3C',
                      fontSize: '16px',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    ✕
                  </span>
                  <span
                    className="body-text-rw"
                    style={{ color: 'var(--muted)', fontSize: '15px' }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* With */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-sm p-6 md:p-12 relative"
            style={{
              backgroundColor: 'rgba(10, 15, 8, 0.8)',
              border: '1px solid var(--gold-border)',
              borderLeft: '3px solid var(--primary)',
            }}
          >
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <span
                className="inline-flex items-center gap-2 font-ui px-3 py-1 rounded-sm"
                style={{
                  fontSize: '10px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  backgroundColor: 'rgba(45, 106, 79, 0.15)',
                  color: '#52B788',
                  border: '1px solid rgba(45,106,79,0.25)',
                  fontWeight: 500,
                }}
              >
                ✓ After Reckonwell
              </span>
            </div>
            <ul className="flex flex-col gap-4 md:gap-5">
              {withItems?.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 md:gap-4"
                >
                  <span
                    style={{
                      color: 'var(--primary)',
                      fontSize: '16px',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    —
                  </span>
                  <span
                    className="body-text-rw"
                    style={{ fontSize: '15px' }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}