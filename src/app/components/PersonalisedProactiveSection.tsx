'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const points = [
  {
    title: 'Your cadence',
    body: 'Weekly call, monthly review or timely alerts.',
  },
  {
    title: 'Early visibility',
    body: 'Know what has changed and what needs a decision.',
  },
  {
    title: 'Named contact',
    body: 'Speak to someone who knows the context.',
  },
];

export default function PersonalisedProactiveSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const handleCTA = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('get-started');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      const event = new CustomEvent('prefill-service', { detail: 'daily' });
      window.dispatchEvent(event);
    }
  };

  return (
    <section
      id="personalised-proactive"
      ref={ref}
      className="py-20 md:py-24 px-6 md:px-16"
      style={{ backgroundColor: 'var(--background)' }}
      aria-label="Personalised finance support"
    >
      <div className="max-w-5xl mx-auto">
        {/* Eyebrow */}
        <motion.p
          className="font-ui mb-4 md:mb-5"
          style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--muted)' }}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          01 / The way we work
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
          {/* Left: text */}
          <div>
            <motion.h2
              className="font-display mb-6 md:mb-8"
              style={{ fontSize: 'clamp(36px, 4.5vw, 58px)', fontWeight: 400, color: 'var(--primary)', lineHeight: 1.1 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Your finance support,{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--secondary)' }}>built around you.</em>
            </motion.h2>

            <motion.p
              className="mb-4"
              style={{ fontSize: '14px', color: 'var(--body-text)', lineHeight: 1.7 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Tell us what you want taken off your plate and how you prefer to work. We tailor the package, contact and reporting to your business instead of asking you to fit a fixed accounting schedule.
            </motion.p>
            <motion.p
              className="mb-8 md:mb-10"
              style={{ fontSize: '14px', color: 'var(--body-text)', lineHeight: 1.7 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              Behind the scenes, we stay close to the numbers every working day. Cash, transactions and overdue invoices are reviewed as the business moves, so a question can be raised while you still have time to act.
            </motion.p>

            {/* Three mini points */}
            <motion.div
              className="grid grid-cols-3 gap-4 mb-8"
              style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {points.map((pt) => (
                <div key={pt.title}>
                  <p className="font-ui mb-1" style={{ fontSize: '11px', fontWeight: 600, color: 'var(--primary)', letterSpacing: '0.3px' }}>
                    {pt.title}
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.5 }}>
                    {pt.body}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* CTA link */}
            <motion.a
              href="#get-started"
              onClick={handleCTA}
              className="inline-flex items-center gap-2 font-ui"
              style={{
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'var(--primary)',
                borderBottom: '1px solid var(--primary)',
                paddingBottom: '3px',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.38 }}
            >
              Discuss tailored oversight →
            </motion.a>
          </div>

          {/* Right: illustration in bordered frame */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col mt-2 md:mt-0"
            style={{
              border: '1px solid var(--border)',
              backgroundColor: 'var(--card)',
              padding: '28px',
            }}
          >
            <div className="flex items-center justify-center" style={{ minHeight: '260px' }}>
              <Image
                src="/assets/proactive-finance-oversight.svg"
                alt="Diagram showing proactive daily financial oversight with real-time alerts"
                width={400}
                height={280}
                style={{ width: '100%', height: 'auto', maxWidth: '400px' }}
              />
            </div>
            <p
              className="font-ui mt-4"
              style={{ fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--muted)' }}
            >
              Attention before the surprise
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
