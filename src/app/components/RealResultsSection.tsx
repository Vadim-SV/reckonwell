'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const results = [
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

export default function RealResultsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="py-20 md:py-36 px-6 md:px-10"
      style={{ backgroundColor: '#080808' }}
      aria-label="Real results"
    >
      <div className="max-w-7xl mx-auto">
        <motion.p
          className="section-label mb-5 md:mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Real Results
        </motion.p>

        <motion.h2
          className="section-h2-medium mb-10 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: '600px' }}
        >
          When the finances are handled,{' '}
          <span className="gold-italic">everything else gets easier.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {results?.map((result, i) => (
            <motion.div
              key={result?.tag}
              className="result-card flex flex-col"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <p
                className="font-ui mb-5 md:mb-6"
                style={{
                  fontSize: '10px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                }}
              >
                {result?.tag}
              </p>

              <div className="mb-2">
                <span
                  className="font-display"
                  style={{
                    fontSize: 'clamp(36px, 4vw, 56px)',
                    fontWeight: 400,
                    color: 'var(--primary)',
                    lineHeight: 1,
                  }}
                >
                  {result?.number}
                </span>
              </div>

              <p
                className="font-display mb-4"
                style={{
                  fontSize: '16px',
                  fontWeight: 400,
                  color: 'var(--foreground)',
                  lineHeight: 1.3,
                }}
              >
                {result?.headline}
              </p>

              <p
                className="body-text-rw mb-5 md:mb-6 flex-1"
                style={{ fontSize: '14px', color: '#ffffff' }}
              >
                {result?.body}
              </p>

              <div
                className="pt-4 md:pt-5 mt-auto"
                style={{ borderTop: '1px solid var(--border-subtle)' }}
              >
                <p
                  className="font-serif mb-2"
                  style={{
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontSize: '17px',
                    color: 'var(--primary)',
                    lineHeight: 1.6,
                    fontFamily: 'var(--font-serif)',
                  }}
                >
                  &ldquo;{result?.quote}&rdquo;
                </p>
                <p
                  className="font-ui"
                  style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '1px' }}
                >
                  — {result?.author}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}