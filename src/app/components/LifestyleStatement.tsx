'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function LifestyleStatement() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-40 px-6 md:px-10 overflow-hidden"
      style={{ backgroundColor: '#FFF1E5' }}
      aria-label="Lifestyle statement"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.12) 0%, transparent 70%)',
        }}
      />
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.h2
          className="section-h2 mb-6 md:mb-8"
          style={{ color: '#1A1208' }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          You didn&apos;t start a business
          <br />
          to do{' '}
          <span className="gold-italic">accounting.</span>
        </motion.h2>

        <motion.p
          className="pull-quote mx-auto"
          style={{ maxWidth: '520px', color: '#5C4A2A' }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          Yet the best hours of your day are going to numbers — not to the
          decisions that actually move your business forward.
        </motion.p>
      </div>
    </section>
  );
}