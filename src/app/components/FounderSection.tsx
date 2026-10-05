'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

export default function FounderSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-6 md:px-16"
      style={{ backgroundColor: 'var(--primary)' }}
      aria-label="From the founder">

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
        {/* Left: eyebrow + heading */}
        <div>
          <motion.h2
            className="font-display"
            style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 400, color: '#FFFFFF', lineHeight: 1.15 }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>

            Message from the Founder
          </motion.h2>
        </div>

        {/* Right: large pull quote + attribution + CTA */}
        <div>
          <motion.blockquote
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}>

            <p
              className="font-display"
              style={{
                fontSize: 'clamp(20px, 2.5vw, 30px)',
                fontWeight: 400,
                color: '#FFFFFF',
                lineHeight: 1.45
              }}>

              &ldquo;You should make decisions with a clear picture of your finances, not wait for the year-end accounts to find out what happened.&rdquo;
            </p>
          </motion.blockquote>

          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}>

            <p style={{ fontSize: '14px', fontWeight: 600, color: '#FFFFFF' }}>Vadim Siubaeff, Founder</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.38 }}>

            <Link
              href="/book"
              className="font-ui inline-flex items-center justify-center"
              style={{
                backgroundColor: '#FFFFFF',
                color: 'var(--primary)',
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                padding: '14px 24px',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              Book a call with Vadim
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );

}