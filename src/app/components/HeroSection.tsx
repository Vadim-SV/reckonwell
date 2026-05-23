'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const tracked = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked.current) {
          tracked.current = true;
          trackEvent('homepage_section_viewed', { section: 'hero', page: 'home' });
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--background)' }}
      aria-label="Hero"
      suppressHydrationWarning
    >
      {/* Radial gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 55%, rgba(201,168,76,0.09) 0%, rgba(201,168,76,0.03) 55%, transparent 100%)',
        }}
      />

      {/* Decorative vertical gold lines */}
      <div className="gold-vertical-line-left" aria-hidden="true" />
      <div className="gold-vertical-line-right" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 text-center pt-28 pb-16 md:pb-20">
        {/* Tag */}
        <motion.div {...fadeUp(0.1)} className="mb-8 md:mb-10" suppressHydrationWarning>
          <span
            className="inline-flex items-center gap-2 md:gap-3 font-ui"
            style={{
              fontSize: '9px',
              letterSpacing: '3px',
              color: 'var(--primary)',
              textTransform: 'uppercase',
              fontWeight: 400,
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: '16px',
                height: '1px',
                backgroundColor: 'var(--primary)',
                opacity: 0.6,
                flexShrink: 0,
              }}
            />
            British Accounting Firm · Serving the UK &amp; USA
            <span
              style={{
                display: 'inline-block',
                width: '16px',
                height: '1px',
                backgroundColor: 'var(--primary)',
                opacity: 0.6,
                flexShrink: 0,
              }}
            />
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1 {...fadeUp(0.2)} className="hero-h1 mb-5 md:mb-6" suppressHydrationWarning>
          Run your business.
          <br />
          <span className="gold-italic">We&apos;ll handle the rest.</span>
        </motion.h1>

        {/* Differentiator */}
        <motion.p
          {...fadeUp(0.3)}
          className="pull-quote mb-4 mx-auto"
          style={{ maxWidth: '620px', color: '#ffffff', fontSize: 'clamp(18px,2.2vw,26px)' }}
          suppressHydrationWarning
        >
          The only accounting firm that works on your finances every single day
          — not just at month end.
        </motion.p>

        {/* Subline */}
        <motion.p
          {...fadeUp(0.35)}
          className="mb-6 md:mb-8 font-serif"
          style={{
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(18px,2.2vw,26px)',
            color: '#ffffff',
            fontFamily: 'var(--font-serif)',
          }}
          suppressHydrationWarning
        >
          No stress. No surprises. Just focus.
        </motion.p>

        {/* Price line */}
        <motion.p
          {...fadeUp(0.4)}
          className="font-ui mb-8 md:mb-10"
          style={{
            fontSize: '10px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.7)',
            fontWeight: 400,
          }}
          suppressHydrationWarning
        >
          From £200 / $300 per month
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.45)}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 md:mb-12 w-full"
          suppressHydrationWarning
        >
          <Link
            href="/book"
            className="btn-gold w-full sm:w-auto"
            style={{ minWidth: '200px', textAlign: 'center' }}
            onClick={() => trackEvent('homepage_cta_click', { cta: 'book_discovery_call', location: 'hero', page: 'home' })}
          >
            Book Discovery Call
          </Link>
          <button
            className="btn-ghost w-full sm:w-auto"
            style={{ minWidth: '200px' }}
            onClick={() => {
              trackEvent('homepage_cta_click', { cta: 'see_how_it_works', location: 'hero', page: 'home' });
              handleScroll('#how-it-works');
            }}
          >
            See How It Works
          </button>
          <Link
            href="/referrals"
            className="btn-ghost w-full sm:w-auto"
            style={{ minWidth: '200px', textAlign: 'center' }}
            onClick={() => trackEvent('homepage_cta_click', { cta: 'partner_with_us', location: 'hero', page: 'home' })}
          >
            Partner with Us
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          {...fadeUp(0.55)}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-8"
          suppressHydrationWarning
        >
          {[
            'Licensed UK Practice',
            'Xero Certified Advisor',
            'QuickBooks ProAdvisor',
          ].map((badge) => (
            <span
              key={badge}
              className="flex items-center gap-2 font-ui"
              style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.5px' }}
            >
              <span style={{ color: 'var(--primary)', fontSize: '14px' }}>✓</span>
              {badge}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, transparent, var(--background))',
        }}
      />
    </section>
  );
}