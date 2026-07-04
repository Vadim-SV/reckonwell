'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const businessTypes = [
  {
    id: 'self-employed',
    label: "I\'m self-employed",
    href: '/quotation-calculator/?type=self-employed',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    id: 'limited-company',
    label: 'I run a limited company',
    href: '/quotation-calculator/?type=limited-company',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="9" width="18" height="13" rx="1" />
        <path d="M8 9V6a4 4 0 0 1 8 0v3" />
        <line x1="12" y1="13" x2="12" y2="17" />
      </svg>
    ),
  },
  {
    id: 'landlord',
    label: 'I own rental property',
    href: '/quotation-calculator/?type=landlord',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 12L12 3l9 9" />
        <path d="M9 21V12h6v9" />
        <rect x="9" y="12" width="6" height="9" />
      </svg>
    ),
  },
  {
    id: 'rd',
    label: 'I need R&D tax relief',
    href: '/quotation-calculator/?type=rd',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
];

export default function EmbeddedCalculatorSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="quote"
      ref={ref}
      className="py-20 md:py-36 px-6 md:px-10 relative overflow-hidden"
      style={{ backgroundColor: '#080808' }}
      aria-label="Instant quote calculator"
    >
      {/* Radial gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201,168,76,0.08) 0%, rgba(201,168,76,0.02) 60%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.p
            className="section-label mb-5 md:mb-6"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Instant Quote
          </motion.p>
          <motion.h2
            className="section-h2-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Two minutes. Real pricing.{' '}
            <span className="gold-italic">No sales call.</span>
          </motion.h2>
          <motion.p
            className="font-serif mx-auto"
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: '17px',
              color: 'var(--body-text)',
              maxWidth: '520px',
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Tell us about your business. See exactly what compliance services cost, instantly.
          </motion.p>
        </div>

        {/* Business type tiles */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {businessTypes.map((type, i) => (
            <Link
              key={type.id}
              href={type.href}
              className="group flex items-center gap-5 rounded-sm transition-all duration-300"
              style={{
                padding: '24px 28px',
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border-subtle)',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = 'var(--primary)';
                el.style.backgroundColor = 'rgba(201,168,76,0.06)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = 'var(--border-subtle)';
                el.style.backgroundColor = 'var(--card)';
              }}
            >
              <span
                className="flex-shrink-0 transition-colors duration-300"
                style={{ color: 'var(--primary)' }}
              >
                {type.icon}
              </span>
              <span
                className="font-display"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '18px',
                  fontWeight: 400,
                  color: 'var(--foreground)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.2px',
                }}
              >
                {type.label}
              </span>
              <span
                className="ml-auto flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: 'var(--primary)', fontSize: '18px' }}
              >
                →
              </span>
            </Link>
          ))}
        </motion.div>

        {/* Not sure link */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link
            href="/quotation-calculator/"
            className="font-ui"
            style={{
              fontSize: '12px',
              color: 'var(--muted)',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              letterSpacing: '0.3px',
            }}
          >
            Not sure which fits? Answer a few questions →
          </Link>
        </motion.div>

        {/* Trust line */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {[
            'No email required to see your price',
            'Cancel anytime',
            'Xero and QuickBooks compatible',
          ].map((item) => (
            <span
              key={item}
              className="flex items-center gap-2 font-ui"
              style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.5px' }}
            >
              <span style={{ color: 'var(--primary)', fontSize: '12px' }}>✓</span>
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
