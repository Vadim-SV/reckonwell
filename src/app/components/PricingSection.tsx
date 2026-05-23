'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const features = [
  'Daily bookkeeping & transaction processing',
  'Real-time cash flow monitoring',
  'Monthly management accounts',
  'Quarterly business review call',
  'VAT returns included',
  'Dedicated account manager',
  'Unlimited email & phone support',
];

export default function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="pricing"
      ref={ref}
      className="py-20 md:py-36 px-6 md:px-10"
      style={{ backgroundColor: '#080808' }}
      aria-label="Pricing"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <motion.p
            className="section-label mb-5 md:mb-6"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Pricing
          </motion.p>
          <motion.h2
            className="section-h2-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            One flat fee.
            <br />
            <span className="gold-italic">Total clarity.</span>
          </motion.h2>
        </div>

        <motion.div
          className="mx-auto relative w-full"
          style={{ maxWidth: '560px' }}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Gold top accent */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2"
            style={{
              width: '60%',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, var(--primary), transparent)',
            }}
          />

          <div
            className="p-7 md:p-12 rounded-sm"
            style={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--gold-border)',
            }}
          >
            {/* Dual pricing */}
            <div className="flex items-end justify-center gap-0 mb-2">
              <div className="flex items-start">
                <span
                  className="font-display mt-3 md:mt-4"
                  style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--primary)', fontWeight: 400 }}
                >
                  £
                </span>
                <span
                  className="pricing-number"
                >
                  200
                </span>
              </div>

              <div
                className="mx-4 md:mx-6 self-stretch"
                style={{
                  width: '1px',
                  backgroundColor: 'var(--border-subtle)',
                  margin: '8px 16px',
                }}
              />

              <div className="flex items-start">
                <span
                  className="font-display mt-3 md:mt-4"
                  style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--primary)', fontWeight: 400 }}
                >
                  $
                </span>
                <span
                  className="pricing-number"
                >
                  300
                </span>
              </div>
            </div>

            <p
              className="font-ui text-center mb-8 md:mb-10"
              style={{
                fontSize: '10px',
                letterSpacing: '4px',
                textTransform: 'uppercase',
                color: 'var(--muted)',
              }}
            >
              Per Month
            </p>

            <div
              className="mb-6 md:mb-8"
              style={{ height: '1px', backgroundColor: 'var(--border-subtle)' }}
            />

            <ul className="flex flex-col gap-3 md:gap-4 mb-8 md:mb-10">
              {features?.map((feat) => (
                <li key={feat} className="flex items-center gap-3 md:gap-4">
                  <span
                    className="font-display flex-shrink-0"
                    style={{ color: 'var(--primary)', fontSize: '18px', fontWeight: 400 }}
                  >
                    —
                  </span>
                  <span
                    className="body-text-rw"
                    style={{ fontSize: '14px' }}
                  >
                    {feat}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/book"
              className="btn-gold w-full block text-center"
              style={{ width: '100%', padding: '16px 36px', fontSize: '11px' }}
            >
              Book Discovery Call
            </Link>

            <p
              className="font-ui text-center mt-4"
              style={{
                fontSize: '11px',
                color: 'var(--muted)',
                letterSpacing: '0.5px',
              }}
            >
              No setup fees · No long-term contracts · Cancel anytime
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}