'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const alsoAvailable = [
  { label: 'Making Tax Digital', href: '/making-tax-digital' },
  { label: 'Self Assessment', href: '/self-assessment' },
  { label: 'R&D tax relief', href: '/r-and-d-tax-relief' },
  { label: 'Annual accounts & CT600', href: '/final-accounts-ct600-calculator' },
];

export default function PricingComplianceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="pricing"
      ref={ref}
      className="py-16 md:py-24 px-6 md:px-16"
      style={{ backgroundColor: '#E8EAF0' }}
      aria-label="Pricing and compliance"
    >
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="font-display mb-4"
          style={{
            fontSize: 'clamp(28px, 4vw, 52px)',
            fontWeight: 400,
            color: 'var(--primary)',
            lineHeight: 1.1,
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Start with what you need. Add more as you grow.
        </motion.h2>

        <motion.p
          style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '28px' }}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Every package is tailored. Get a price in two minutes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-10"
        >
          <Link
            href="/quotation-calculator"
            className="btn-gold inline-flex items-center gap-2"
          >
            Get an instant quote →
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p
            className="font-ui mb-4"
            style={{
              fontSize: '10px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}
          >
            Also available on its own
          </p>
          <div className="flex flex-wrap gap-3">
            {alsoAvailable?.map((item) => (
              <Link
                key={item?.label}
                href={item?.href}
                className="font-ui"
                style={{
                  fontSize: '12px',
                  color: 'var(--primary)',
                  padding: '8px 16px',
                  border: '1px solid var(--primary)',
                  textDecoration: 'none',
                  letterSpacing: '0.3px',
                  display: 'inline-block',
                }}
              >
                {item?.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
