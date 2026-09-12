'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const levels = [
  {
    label: 'DAY-TO-DAY',
    items: ['Bookkeeping', 'VAT', 'Payroll', 'Accounts'],
    color: 'var(--primary)',
    opacity: 0.15,
    textColor: 'var(--primary)',
  },
  {
    label: 'MANAGEMENT',
    items: ['Cash flow', 'Budgets', 'Management reporting', 'Forecasting'],
    color: 'var(--primary)',
    opacity: 0.35,
    textColor: 'var(--primary)',
  },
  {
    label: 'STRATEGIC',
    items: ['Financial planning', 'Business modelling', 'FD-level support'],
    color: 'var(--primary)',
    opacity: 1,
    textColor: 'var(--primary)',
  },
];

export default function FinanceFunctionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="finance-function"
      ref={ref}
      className="py-16 md:py-28 px-6 md:px-10"
      style={{ backgroundColor: 'var(--surface)' }}
      aria-label="Finance Function"
    >
      <div className="max-w-7xl mx-auto">
        {/* Kicker */}
        <motion.p
          className="section-label mb-4 md:mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Your Finance Function
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-start">
          {/* Left: text */}
          <div>
            <motion.h2
              className="section-h2-medium mb-5 md:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              The finance department experience —{' '}
              <span className="gold-italic">without hiring in-house.</span>
            </motion.h2>

            <motion.p
              className="body-text-rw mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              As your business grows, the finance work grows with it.
            </motion.p>
            <motion.p
              className="body-text-rw mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              Bookkeeping becomes cash-flow management, reporting, budgeting, forecasting and financial decision-making.
            </motion.p>
            <motion.p
              className="body-text-rw mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Reckonwell brings these functions together under one roof, with a package built around what your business actually needs.
            </motion.p>

            <motion.p
              className="body-text-rw"
              style={{ fontStyle: 'italic', color: 'var(--muted)', fontSize: '15px' }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              Get the level of finance support your business needs today, with the ability to scale it as the business grows.
            </motion.p>
          </div>

          {/* Right: 3-level visual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col gap-3"
          >
            {levels?.map((level, i) => (
              <motion.div
                key={level?.label}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
                className="rounded-sm p-5 md:p-6"
                style={{
                  backgroundColor: `rgba(18, 35, 63, ${level?.opacity * 0.08})`,
                  border: `1px solid rgba(18, 35, 63, ${level?.opacity * 0.15})`,
                }}
              >
                <p
                  className="font-ui mb-3"
                  style={{
                    fontSize: '9px',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    color: 'var(--primary)',
                    opacity: 0.5 + i * 0.25,
                    fontWeight: 400,
                  }}
                >
                  {level?.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {level?.items?.map((item) => (
                    <span
                      key={item}
                      className="font-ui"
                      style={{
                        fontSize: '11px',
                        letterSpacing: '0.5px',
                        color: 'var(--foreground)',
                        backgroundColor: `rgba(18, 35, 63, ${0.04 + i * 0.03})`,
                        border: '1px solid var(--border-subtle)',
                        padding: '4px 10px',
                        borderRadius: '2px',
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
