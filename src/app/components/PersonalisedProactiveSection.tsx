'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const points = [
  {
    title: 'Your cadence',
    body: 'Weekly call, monthly review or timely alerts — whichever fits how you run your business.',
  },
  {
    title: 'Early visibility',
    body: 'Know what has changed and what needs a decision before it becomes a problem.',
  },
  {
    title: 'Named contact',
    body: 'Speak to someone who knows the context, not a support queue.',
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
      // Attempt to pre-select the first service option
      const event = new CustomEvent('prefill-service', { detail: 'daily' });
      window.dispatchEvent(event);
    }
  };

  return (
    <section
      id="personalised-proactive"
      ref={ref}
      className="py-14 md:py-28 px-5 md:px-10"
      style={{ backgroundColor: 'var(--background)' }}
      aria-label="Personalised finance support"
    >
      <div className="max-w-7xl mx-auto">
        {/* Eyebrow */}
        <motion.p
          className="section-label mb-4 md:mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          01 / The way we work
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-start mb-10 md:mb-16">
          {/* Left: text */}
          <div>
            <motion.h2
              className="section-h2-medium mb-5 md:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Your finance support,{' '}
              <span className="gold-italic">built around you.</span>
            </motion.h2>

            <motion.p
              className="body-text-rw mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Tell us what you want taken off your plate and how you prefer to work. We tailor the package, contact and reporting to your business instead of asking you to fit a fixed accounting schedule.
            </motion.p>
            <motion.p
              className="body-text-rw mb-7 md:mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              Behind the scenes, we stay close to the numbers every working day. Cash, transactions and overdue invoices are reviewed as the business moves, so a question can be raised while you still have time to act.
            </motion.p>

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
                paddingBottom: '2px',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              Discuss tailored oversight →
            </motion.a>
          </div>

          {/* Right: illustration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex items-center justify-center mt-2 md:mt-0"
            style={{
              border: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--card)',
              padding: '32px',
              minHeight: '280px',
            }}
          >
            <Image
              src="/assets/proactive-finance-oversight.svg"
              alt="Diagram showing proactive daily financial oversight: a timeline with alert nodes flagging cash and transaction issues in real time, before they become problems"
              width={400}
              height={280}
              style={{ width: '100%', height: 'auto', maxWidth: '400px' }}
            />
          </motion.div>
        </div>

        {/* 3 Points */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {points.map((point, i) => (
            <motion.div
              key={point.title}
              className="solution-card"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative z-10">
                <p
                  className="font-ui mb-3"
                  style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 400 }}
                >
                  {point.title}
                </p>
                <p className="body-text-rw" style={{ fontSize: '14px' }}>
                  {point.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
