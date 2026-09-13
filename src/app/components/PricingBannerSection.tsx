'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function PricingBannerSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      ref={ref}
      className="py-10 md:py-14 px-6 md:px-16"
      style={{ backgroundColor: '#E8EAF0' }}
      aria-label="Pricing banner"
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Left: heading + sub */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p
            className="font-ui mb-2"
            style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--muted)' }}
          >
            The right scope for your business
          </p>
          <h2
            className="font-display mb-1"
            style={{ fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 400, color: 'var(--primary)', lineHeight: 1.15 }}
          >
            Start with what you need.<br />Scale when you are ready.
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '6px' }}>
            A tailored finance service, with the day-to-day work and strategic layer you choose.
          </p>
        </motion.div>

        {/* Right: price + CTA */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 flex-shrink-0"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div>
            <p
              className="font-ui mb-1"
              style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)' }}
            >
              Fractional finance from
            </p>
            <p
              className="font-display"
              style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 400, color: 'var(--primary)', whiteSpace: 'nowrap' }}
            >
              £200 <span style={{ fontSize: '16px', fontWeight: 400, color: 'var(--muted)' }}>/ month</span>
            </p>
          </div>

          <a
            href="/quotation-calculator"
            className="font-ui inline-flex items-center gap-2"
            style={{
              backgroundColor: 'var(--primary)',
              color: '#FFFFFF',
              fontSize: '11px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              padding: '14px 22px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
            }}
          >
            Get an instant quote →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
