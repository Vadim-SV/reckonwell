'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const rows = [
  {
    label: 'Day to day',
    desc: 'Bookkeeping, payments and collections, VAT, payroll and accounts.',
  },
  {
    label: 'Management',
    desc: 'Cash flow, budgets, management reporting and forecasts.',
  },
  {
    label: 'Strategic',
    desc: 'Financial planning, business modelling and FD-level support.',
  },
];

export default function FinanceFunctionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const handleCTA = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('get-started');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      const event = new CustomEvent('prefill-service', { detail: 'function' });
      window.dispatchEvent(event);
    }
  };

  return (
    <section
      id="finance-function"
      ref={ref}
      className="py-16 md:py-28 px-6 md:px-16"
      style={{ backgroundColor: 'var(--primary)' }}
      aria-label="Outsourced finance department"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
          {/* Left: illustration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col mt-2 md:mt-0"
            style={{
              border: '1px solid rgba(255,255,255,0.15)',
              backgroundColor: 'var(--surface)',
              padding: '28px',
            }}
          >
            <div className="flex items-center justify-center" style={{ minHeight: '260px' }}>
              <Image
                src="/assets/outsourced-finance-function.svg"
                alt="Diagram of a connected outsourced finance function showing three tiers: day-to-day bookkeeping, management reporting, and strategic FD-level support"
                width={400}
                height={260}
                style={{ width: '100%', height: 'auto', maxWidth: '400px' }}
              />
            </div>
            <p
              className="font-ui mt-4"
              style={{ fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--muted)' }}
            >
              One connected finance function
            </p>
          </motion.div>

          {/* Right: text */}
          <div>
            {/* Eyebrow */}
            <motion.p
              className="font-ui mb-4 md:mb-5"
              style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              02 / Your finance function
            </motion.p>

            <motion.h2
              className="font-display mb-6 md:mb-8"
              style={{ fontSize: 'clamp(36px, 4.5vw, 58px)', fontWeight: 400, color: '#FFFFFF', lineHeight: 1.1 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              The finance department experience —{' '}
              <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.65)' }}>without hiring in-house.</em>
            </motion.h2>

            <motion.p
              className="mb-4"
              style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Reckonwell brings the work of a finance function together under one roof. We can handle the routine accounting, keep cash and performance visible, and give you finance-level input on the decisions ahead.
            </motion.p>
            <motion.p
              className="mb-8 md:mb-10"
              style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              Start with what you need now. Add more management and strategic support as the business grows, without recruiting and managing a team first.
            </motion.p>

            {/* Three-row table */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {rows.map((row, i) => (
                <div
                  key={row.label}
                  className="grid grid-cols-3 gap-4 py-4"
                  style={{
                    borderTop: '1px solid rgba(255,255,255,0.15)',
                    borderBottom: i === rows.length - 1 ? '1px solid rgba(255,255,255,0.15)' : 'none',
                  }}
                >
                  <p className="font-ui col-span-1" style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', fontWeight: 600, paddingTop: '2px' }}>
                    {row.label}
                  </p>
                  <p className="col-span-2" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>
                    {row.desc}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* CTA link */}
            <motion.a
              href="#get-started"
              onClick={handleCTA}
              className="inline-flex items-center gap-2 font-ui"
              style={{
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                borderBottom: '1px solid rgba(255,255,255,0.6)',
                paddingBottom: '3px',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.38 }}
            >
              Explore your finance team →
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
