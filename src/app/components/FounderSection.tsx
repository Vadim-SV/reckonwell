'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function FounderSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

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

        {/* Right: large pull quote + body + attribution */}
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

              &ldquo;You should be able to make business decisions with a clear picture of your finances, not wait for the year-end accounts to find out what happened.&rdquo;
            </p>
          </motion.blockquote>

          <motion.p
            className="mb-6"
            style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}>

            At Reckonwell, I want founders to have someone who knows their business and stays close to the numbers. We shape the support around what you need now, from everyday accounting to a wider finance function and help with the next stage of growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.38 }}>

            <p style={{ fontSize: '14px', fontWeight: 600, color: '#FFFFFF' }}>Vadim Siubaeff</p>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Founder, Reckonwell</p>
          </motion.div>
        </div>
      </div>
    </section>
  );

}