'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function FounderSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="py-20 md:py-36 px-6 md:px-10"
      style={{ backgroundColor: '#080808' }}
      aria-label="From the founder">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left: portrait with decorative shapes */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto md:mx-0 md:ml-auto"
          style={{ maxWidth: '240px', width: '100%', position: 'relative' }}>

          {/* Decorative offset background rectangle — hidden on mobile to prevent overflow */}
          <div
            className="hidden md:block"
            style={{
              position: 'absolute',
              top: '18px',
              left: '-18px',
              right: '18px',
              bottom: '-18px',
              border: '1px solid var(--primary)',
              opacity: 0.25,
              zIndex: 0,
              pointerEvents: 'none'
            }} />

          {/* Decorative filled accent rectangle (top-right) — hidden on mobile */}
          <div
            className="hidden md:block"
            style={{
              position: 'absolute',
              top: '-10px',
              right: '-10px',
              width: '48px',
              height: '48px',
              background: 'var(--primary)',
              opacity: 0.12,
              zIndex: 0,
              pointerEvents: 'none'
            }} />

          {/* Decorative diagonal line (bottom-left) — hidden on mobile */}
          <svg
            className="hidden md:block"
            style={{
              position: 'absolute',
              bottom: '-22px',
              left: '-22px',
              zIndex: 0,
              pointerEvents: 'none'
            }}
            width="48" height="48" viewBox="0 0 48 48" fill="none">
            <line x1="0" y1="48" x2="48" y2="0" stroke="var(--primary)" strokeWidth="1" strokeOpacity="0.35" />
          </svg>

          {/* Dot accent (top-left) — hidden on mobile */}
          <div
            className="hidden md:block"
            style={{
              position: 'absolute',
              top: '-14px',
              left: '-14px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--primary)',
              opacity: 0.55,
              zIndex: 2,
              pointerEvents: 'none'
            }} />

          {/* Photo frame */}
          <div
            className="relative overflow-hidden"
            style={{ aspectRatio: '3/4', zIndex: 1 }}>

            <img
              src="/assets/images/Vadim-1779496555261.jpg"
              alt="Vadim, Founder of Reckonwell"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                display: 'block'
              }} />

            {/* Subtle dark gradient at bottom */}
            <div
              className="absolute bottom-0 left-0 right-0"
              style={{
                height: '30%',
                background: 'linear-gradient(to top, rgba(8,8,8,0.55) 0%, transparent 100%)'
              }} />

            {/* Corner bracket — top-left */}
            <span
              className="absolute top-0 left-0"
              style={{
                width: '22px',
                height: '22px',
                borderTop: '2px solid var(--primary)',
                borderLeft: '2px solid var(--primary)',
                opacity: 0.85
              }} />

            {/* Corner bracket — top-right */}
            <span
              className="absolute top-0 right-0"
              style={{
                width: '22px',
                height: '22px',
                borderTop: '2px solid var(--primary)',
                borderRight: '2px solid var(--primary)',
                opacity: 0.85
              }} />

            {/* Corner bracket — bottom-left */}
            <span
              className="absolute bottom-0 left-0"
              style={{
                width: '22px',
                height: '22px',
                borderBottom: '2px solid var(--primary)',
                borderLeft: '2px solid var(--primary)',
                opacity: 0.85
              }} />

            {/* Corner bracket — bottom-right */}
            <span
              className="absolute bottom-0 right-0"
              style={{
                width: '22px',
                height: '22px',
                borderBottom: '2px solid var(--primary)',
                borderRight: '2px solid var(--primary)',
                opacity: 0.85
              }} />

          </div>
        </motion.div>

        {/* Right: content */}
        <div className="flex flex-col justify-center">
          <motion.p
            className="section-label mb-5 md:mb-6"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}>MESSAGE FROM THE FOUNDER
          </motion.p>

          <motion.h3
            className="font-display mb-1"
            style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 400, color: 'var(--foreground)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}>Hello, I am Vadim

          </motion.h3>

          <motion.blockquote
            className="mb-6 md:mb-8"
            style={{
              borderLeft: '2px solid var(--primary)',
              paddingLeft: '20px'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}>
            <p
              className="font-serif"
              style={{
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(18px, 2.2vw, 26px)',
                color: '#ffffff',
                lineHeight: 1.7,
                fontFamily: 'var(--font-serif)'
              }}>
              &ldquo;I built Reckonwell because the directors I admired most were
              spending their sharpest hours on things that had nothing to do
              with why they built their business. That always struck me as wrong
              — and entirely fixable.&rdquo;
            </p>
          </motion.blockquote>

          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}>
            <p className="body-text-rw" style={{ fontSize: '15px' }}>
              Every client gets a dedicated team who knows their accounts,
              understands the context behind the numbers, and is genuinely
              available when it matters. Not a ticketing system. Not a monthly
              catch-up. Daily work, done properly.
            </p>
            <p className="body-text-rw" style={{ fontSize: '15px' }}>
              The goal is simple: your finances should give you freedom, not
              take it away. A director with clear numbers moves differently.
              That is what we build for every client, from day one.
            </p>
            <p
              className="font-display"
              style={{
                fontSize: '16px',
                fontWeight: 400,
                color: 'var(--primary)',
                fontStyle: 'italic',
                marginTop: '8px'
              }}>
              Not your accountant. Your finance team.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );

}