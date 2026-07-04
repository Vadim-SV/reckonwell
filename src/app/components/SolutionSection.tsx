'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const cards = [
  {
    num: '01',
    title: 'Daily Monitoring',
    body:
      'Every working day, your team reviews your accounts. Cash position, incoming, outgoing — nothing moves without us knowing. You always have a live picture of where you stand.',
  },
  {
    num: '02',
    title: '48-Hour Processing',
    body:
      'Every transaction, receipt, and invoice processed within 48 hours. Your books are never behind, never cluttered. Month end is just another day — because every day is month end.',
  },
  {
    num: '03',
    title: 'Your Finance Team',
    body:
      'Not a bot. Not a portal. A named person who knows your business, reads the patterns, and reaches out when something deserves your attention — before you think to ask.',
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
            <span className="gold-italic">clarity</span> looks like.
          </motion.h2>
          <motion.p
            className="pull-quote"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Someone on your finances every morning. Not a dashboard. Not
            automation. A team that knows your business.
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
                className="card-number-bg absolute top-4 right-4 select-none pointer-events-none"
                aria-hidden="true"
              >
                {card?.num}
              </div>
              <div className="relative z-10">
                <p
                  className="font-ui mb-3"
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
                  className="font-display mb-3"
                  style={{
                    fontSize: 'clamp(17px, 2.2vw, 26px)',
                    fontWeight: 400,
                    color: 'var(--foreground)',
                    lineHeight: 1.2,
                  }}
                >
                  {card?.title}
                </h3>
                <p className="body-text-rw" style={{ fontSize: '14px' }}>
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