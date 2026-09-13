'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

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
      className="py-14 md:py-28 px-5 md:px-10"
      style={{ backgroundColor: 'var(--surface)' }}
      aria-label="Outsourced finance department"
    >
      <div className="max-w-7xl mx-auto">
        {/* Eyebrow */}
        <motion.p
          className="section-label mb-4 md:mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          02 / Your finance function
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
              className="body-text-rw mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Reckonwell brings the work of a finance function together under one roof. We can handle the routine accounting, keep cash and performance visible, and give you finance-level input on the decisions ahead.
            </motion.p>
            <motion.p
              className="body-text-rw mb-7 md:mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              Start with what you need now. Add more management and strategic support as the business grows, without recruiting and managing a team first.
            </motion.p>

            <motion.a
              href="#get-started"
              onClick={handleCTA}
              className="inline-flex items-center gap-2 font-ui"
              style={{
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'var(--primary)',
                borderBottom: '1px solid var(--primary)',
                paddingBottom: '2px',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              Explore your finance team →
            </motion.a>
          </div>

          {/* Right: illustration + levels */}
          <div className="flex flex-col gap-4 mt-2 md:mt-0">
            {/* SVG illustration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="flex items-center justify-center"
              style={{
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--card)',
                padding: '24px',
                marginBottom: '8px',
              }}
            >
              <Image
                src="/assets/outsourced-finance-function.svg"
                alt="Diagram of a connected outsourced finance function showing three tiers: day-to-day bookkeeping, management reporting, and strategic FD-level support, all under one roof"
                width={400}
                height={200}
                style={{ width: '100%', height: 'auto', maxWidth: '400px' }}
              />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
