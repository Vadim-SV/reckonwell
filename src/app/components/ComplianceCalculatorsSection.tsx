'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const cards = [
  {
    number: '01',
    title: 'Making Tax Digital',
    description: 'MTD-ready bookkeeping and support with quarterly submissions.',
    cta: 'GET MTD QUOTE',
    href: '/mtd-calculator',
  },
  {
    number: '02',
    title: 'Self Assessment',
    description: 'Personal tax return support for sole traders and individuals.',
    cta: 'GET TAX RETURN QUOTE',
    href: '/self-assessment-calculator',
  },
  {
    number: '03',
    title: 'R&D tax relief',
    description: 'Review potential qualifying activity and prepare a supported claim.',
    cta: 'GET R&D QUOTE',
    href: '/rd-tax-relief-calculator',
  },
  {
    number: '04',
    title: 'Final accounts & CT600',
    description: 'Annual company accounts and corporation tax filing.',
    cta: 'GET COMPANY QUOTE',
    href: '/final-accounts-ct600-calculator',
  },
];

export default function ComplianceCalculatorsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      ref={ref}
      className="py-12 md:py-16 px-6 md:px-16"
      style={{ backgroundColor: 'var(--background)' }}
      aria-label="Compliance services"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p
              className="font-ui mb-2"
              style={{
                fontSize: '10px',
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                color: 'var(--muted)',
              }}
            >
              Need one specific service?
            </p>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(28px, 4vw, 48px)',
                fontWeight: 400,
                color: 'var(--primary)',
                lineHeight: 1.1,
              }}
            >
              Compliance, sorted.
            </h2>
          </motion.div>

          <motion.p
            className="md:text-right md:max-w-xs"
            style={{ fontSize: '13px', color: '#C17A3A', lineHeight: 1.5 }}
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            If your need is a filing or a tax service, go straight to the relevant Reckonwell quote calculator.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards?.map((card, i) => (
            <motion.div
              key={card?.number}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              className="flex flex-col"
              style={{
                border: '1px solid #D6D8E0',
                backgroundColor: '#FFFFFF',
                padding: '20px 20px 0 20px',
              }}
            >
              {/* Label */}
              <p
                className="font-ui mb-3"
                style={{
                  fontSize: '9px',
                  letterSpacing: '2.5px',
                  textTransform: 'uppercase',
                  color: '#4A7C8E',
                }}
              >
                COMPLIANCE / {card?.number}
              </p>

              {/* Title */}
              <h3
                className="font-display mb-3"
                style={{
                  fontSize: 'clamp(18px, 2vw, 22px)',
                  fontWeight: 400,
                  color: 'var(--primary)',
                  lineHeight: 1.2,
                }}
              >
                {card?.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--muted)',
                  lineHeight: 1.55,
                  flexGrow: 1,
                }}
              >
                {card?.description}
              </p>

              {/* Divider + CTA */}
              <div style={{ marginTop: '20px' }}>
                <div style={{ borderTop: '1px solid #D6D8E0', marginBottom: '14px' }} />
                <Link
                  href={card?.href}
                  className="font-ui flex items-center justify-between pb-5"
                  style={{
                    fontSize: '10px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: 'var(--primary)',
                    textDecoration: 'none',
                  }}
                >
                  {card?.cta}
                  <span style={{ fontSize: '14px' }}>↗</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom link */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <Link
            href="/quotation-calculator"
            className="font-ui"
            style={{
              fontSize: '12px',
              letterSpacing: '0.5px',
              color: 'var(--primary)',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            }}
          >
            Not sure? Explore all services in the quote calculator ↗
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
