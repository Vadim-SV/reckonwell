'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const cards = [
  {
    num: '01',
    title: 'Daily Monitoring',
    body:
      'We review your accounts every working day. Cash flow, incoming, outgoing — nothing slips through. You get a real-time picture of your business finances at all times.',
  },
  {
    num: '02',
    title: '48-Hour Processing',
    body:
      'Every transaction, receipt, and invoice processed within 48 hours. No backlogs. No scrambling at month end. Your books are always current, always clean.',
  },
  {
    num: '03',
    title: 'Your Finance Team',
    body:
      'Not a bot. Not a portal. A dedicated team who knows your business, picks up the phone, and sends you a message when something needs your attention.',
  },
];

export default function SolutionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="py-20 md:py-36 px-6 md:px-10"
      style={{ backgroundColor: '#080808' }}
      aria-label="The solution"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 md:mb-16 max-w-2xl">
          <motion.p
            className="section-label mb-5 md:mb-6"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            The Solution
          </motion.p>
          <motion.h2
            className="section-h2-medium mb-5 md:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            This is what{' '}
            <span className="gold-italic">stress-free</span> looks like.
          </motion.h2>
          <motion.p
            className="pull-quote"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Proactive, not reactive. Your finances handled before problems arise.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {cards?.map((card, i) => (
            <motion.div
              key={card?.num}
              className="solution-card"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="card-number-bg absolute top-4 right-6 select-none pointer-events-none"
                aria-hidden="true"
              >
                {card?.num}
              </div>
              <div className="relative z-10">
                <p
                  className="font-ui mb-3 md:mb-4"
                  style={{
                    fontSize: '10px',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    color: 'var(--primary)',
                    fontWeight: 400,
                  }}
                >
                  {card?.num}
                </p>
                <h3
                  className="font-display mb-3 md:mb-4"
                  style={{
                    fontSize: 'clamp(18px, 2.2vw, 26px)',
                    fontWeight: 400,
                    color: 'var(--foreground)',
                    lineHeight: 1.2,
                  }}
                >
                  {card?.title}
                </h3>
                <p className="body-text-rw" style={{ fontSize: '15px' }}>
                  {card?.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}