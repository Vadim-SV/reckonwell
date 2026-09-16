'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const rows = [
  {
    label: 'Verify',
    desc: 'Check transaction coding, supporting records, duplicates and VAT treatment.',
  },
  {
    label: 'Reconcile',
    desc: 'Review balances, exceptions, integrations and the audit trail.',
  },
  {
    label: 'Control',
    desc: 'Monitor approvals, unusual activity and the integrity of the overall system.',
  },
];

export default function FinanceFunctionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="finance-function"
      ref={ref}
      className="py-20 md:py-28 px-6 md:px-16"
      style={{ backgroundColor: '#0d1b2e' }}
      aria-label="AI finance control"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
          {/* Left: illustration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col"
          >
            <div
              className="flex items-center justify-center"
              style={{
                backgroundColor: '#f5ede0',
                padding: '32px',
                minHeight: '320px',
              }}
            >
              <Image
                src="/assets/outsourced-finance-function.svg"
                alt="Diagram showing automation with accountable checks — finance workflows connected through a central dashboard with verification nodes"
                width={400}
                height={280}
                style={{ width: '100%', height: 'auto', maxWidth: '400px' }}
              />
            </div>
            <p
              className="font-ui mt-4"
              style={{
                fontSize: '9px',
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.45)',
              }}
            >
              Automation with accountable checks
            </p>
          </motion.div>

          {/* Right: text */}
          <div>
            {/* Eyebrow */}
            <motion.p
              className="font-ui mb-4 md:mb-5"
              style={{
                fontSize: '10px',
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)',
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              02 / Finance control for AI
            </motion.p>

            <motion.h2
              className="font-display mb-6 md:mb-8"
              style={{
                fontSize: 'clamp(36px, 4.5vw, 58px)',
                fontWeight: 400,
                color: '#FFFFFF',
                lineHeight: 1.1,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              AI can process the transactions.{' '}
              <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.7)' }}>
                We make sure you can trust them.
              </em>
            </motion.h2>

            <motion.p
              className="mb-4"
              style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              AI can automate bookkeeping and finance workflows at speed, but automation still needs oversight. Reckonwell verifies transactions, reviews exceptions and reconciles the accounts so errors do not quietly flow into reports, tax filings or business decisions.
            </motion.p>
            <motion.p
              className="mb-8 md:mb-10"
              style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              We act as the human control layer around your finance technology — checking that data is complete, integrations are working, approvals remain appropriate and the system continues to produce reliable information.
            </motion.p>

            {/* Three-row table */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {rows?.map((row, i) => (
                <div
                  key={row?.label}
                  className="grid gap-4 py-4"
                  style={{
                    gridTemplateColumns: '120px 1fr',
                    borderTop: '1px solid rgba(255,255,255,0.15)',
                    borderBottom: i === rows?.length - 1 ? '1px solid rgba(255,255,255,0.15)' : 'none',
                  }}
                >
                  <p
                    className="font-ui"
                    style={{
                      fontSize: '10px',
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.55)',
                      fontWeight: 600,
                      paddingTop: '2px',
                    }}
                  >
                    {row?.label}
                  </p>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>
                    {row?.desc}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* CTA link */}
            <motion.a
              href="/contact"
              className="inline-flex items-center gap-2 font-ui"
              style={{
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                borderBottom: '1px solid rgba(255,255,255,0.6)',
                paddingBottom: '3px',
                textDecoration: 'none',
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.38 }}
            >
              Discuss AI Finance Controls →
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
