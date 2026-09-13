'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

export default function DiscoveryCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="get-started"
      ref={ref}
      className="py-14 md:py-24 px-5 md:px-10"
      style={{ backgroundColor: 'var(--surface)' }}
      aria-label="Get started"
    >
      <div className="max-w-3xl mx-auto text-center">
        {/* Kicker */}
        <motion.p
          className="section-label mb-4 md:mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Get Started
        </motion.p>

        {/* Headline */}
        <motion.h2
          className="section-h2-medium mb-5 md:mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Tell us about your business.
        </motion.h2>

        {/* Body */}
        <motion.p
          className="body-text-rw mb-3 mx-auto"
          style={{ maxWidth: '520px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          We&apos;ll understand how you operate, what support you actually need, and put together a package built around you.
        </motion.p>

        <motion.p
          className="font-ui mb-8 md:mb-10"
          style={{ fontSize: '11px', letterSpacing: '1px', color: 'var(--muted)', textTransform: 'uppercase' }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          No obligation. No pressure.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Link
            href="/book"
            className="btn-gold w-full sm:w-auto"
            style={{ minWidth: '220px', maxWidth: '100%', textAlign: 'center' }}
            onClick={() => trackEvent('homepage_cta_click', { cta: 'book_discovery_call', location: 'discovery_cta', page: 'home' })}
          >
            Book a Discovery Call
          </Link>
          <Link
            href="/quotation-calculator/"
            className="w-full sm:w-auto"
            style={{
              fontSize: '13px',
              color: 'var(--muted)',
              textDecoration: 'none',
              letterSpacing: '0.3px',
              fontFamily: 'var(--font-sans)',
              padding: '12px 20px',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
            }}
            onClick={() => trackEvent('homepage_cta_click', { cta: 'get_instant_quote', location: 'discovery_cta', page: 'home' })}
          >
            Get an Instant Quote →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
