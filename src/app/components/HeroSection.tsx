'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { trackEvent } from '@/lib/analytics';
import CertifiedPartneredSection from '@/app/components/CertifiedPartneredSection';
import Link from 'next/link';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }
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

  const handleScrollToService = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('personalised-proactive');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    trackEvent('homepage_cta_click', { cta: 'see_how_we_work', location: 'hero', page: 'home' });
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ backgroundColor: 'var(--background)' }}
        aria-label="Hero"
        suppressHydrationWarning
      >
        {/* Decorative vertical lines */}
        <div className="gold-vertical-line-left" aria-hidden="true" />
        <div className="gold-vertical-line-right" aria-hidden="true" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-10 text-center pt-24 md:pt-28 pb-14 md:pb-20">

          {/* H1 */}
          <motion.h1 {...fadeUp(0.2)} className="hero-h1 mb-5 md:mb-7" suppressHydrationWarning>
            Run your business.
            <br />
            <span className="gold-italic" suppressHydrationWarning>We take care of your finances.</span>
          </motion.h1>

          {/* Supporting copy */}
          <motion.p
            {...fadeUp(0.3)}
            className="body-text-rw mb-6 md:mb-8 mx-auto"
            style={{ maxWidth: '580px', color: 'var(--body-text)', fontSize: 'clamp(15px, 1.8vw, 18px)' }}
            suppressHydrationWarning
          >
            A finance team that knows your business: personalised day-to-day attention, the capability of an in-house department, and practical support when you need to raise capital.
          </motion.p>

          {/* Price line */}
          <motion.p
            {...fadeUp(0.35)}
            className="font-ui mb-8 md:mb-10"
            style={{
              fontSize: '10px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'var(--primary)',
              fontWeight: 400
            }}
            suppressHydrationWarning
          >
            Tailored support from £200 per month
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.45)}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 md:mb-12 w-full"
            suppressHydrationWarning
          >
            <a
              href="#personalised-proactive"
              className="btn-gold w-full sm:w-auto"
              style={{ minWidth: '220px', maxWidth: '100%', textAlign: 'center' }}
              onClick={handleScrollToService}
            >
              See how we work →
            </a>
            <Link
              href="/book"
              className="w-full sm:w-auto"
              style={{
                fontSize: '13px',
                color: 'var(--muted)',
                textDecoration: 'none',
                letterSpacing: '0.3px',
                fontFamily: 'var(--font-sans)',
                padding: '14px 24px',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--border)',
              }}
              onClick={() => trackEvent('homepage_cta_click', { cta: 'book_discovery_call', location: 'hero', page: 'home' })}
            >
              Book a discovery call
            </Link>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--background))' }}
        />
      </section>

      {/* Certified & Partnered — immediately after hero */}
      <CertifiedPartneredSection variant="compact" />
    </>
  );
}