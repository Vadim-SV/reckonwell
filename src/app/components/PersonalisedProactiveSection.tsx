'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const cards = [
  {
    title: 'YOUR SCHEDULE, NOT OURS',
    body: 'Weekly calls, monthly reviews or simply an alert when something needs your attention.',
  },
  {
    title: 'SOMEONE WHO KNOWS YOUR NUMBERS',
    body: 'Direct access to someone who understands your business rather than starting from scratch every time you need help.',
  },
  {
    title: 'PROBLEMS SPOTTED EARLY',
    body: 'We keep an eye on the numbers throughout the year, not just when accounts or tax returns are due.',
  },
];

export default function PersonalisedProactiveSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="personalised-proactive"
      ref={ref}
      className="py-14 md:py-28 px-5 md:px-10"
      style={{ backgroundColor: 'var(--background)' }}
      aria-label="Personalised and Proactive"
    >
      <div className="max-w-7xl mx-auto">
        {/* Kicker */}
        <motion.p
          className="section-label mb-4 md:mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          The Way We Work
        </motion.p>

        {/* Headline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-start mb-10 md:mb-20">
          <div>
            <motion.h2
              className="section-h2-medium mb-5 md:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Most accountants tell you{' '}
              <span className="gold-italic">what happened.</span>
              <br />
              We help you see{' '}
              <span className="gold-italic">what&apos;s happening.</span>
            </motion.h2>

            <motion.p
              className="body-text-rw mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Once we understand how your business operates, we build the service around you.
            </motion.p>
            <motion.p
              className="body-text-rw"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              We keep an eye on cash flow, spending, budgets and forecasts, and stay as involved as you need us to be — weekly, monthly or whenever something needs attention.
            </motion.p>
          </div>

          {/* Cash flow visibility visual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="rounded-sm overflow-hidden mt-2 md:mt-0"
            style={{ border: '1px solid var(--border-subtle)', backgroundColor: 'var(--card)' }}
          >
            <div className="p-5 md:p-8">
              <p
                className="font-ui mb-5 md:mb-6"
                style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--muted)' }}
              >
                Cash Position Visibility
              </p>

              {/* Traditional accountant row */}
              <div className="mb-5 md:mb-6">
                <p
                  className="font-ui mb-3"
                  style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)' }}
                >
                  Traditional Accountant
                </p>
                <div className="flex items-center gap-1.5 mb-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8]?.map((i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: '6px',
                        borderRadius: '2px',
                        backgroundColor: i <= 6 ? 'var(--border)' : '#8C3D2B',
                        opacity: i <= 6 ? 0.3 : 1,
                      }}
                    />
                  ))}
                </div>
                <p
                  className="font-ui"
                  style={{ fontSize: '10px', color: '#8C3D2B', letterSpacing: '0.5px' }}
                >
                  Cash problem discovered weeks later
                </p>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)', marginBottom: '20px' }} />

              {/* Reckonwell row */}
              <div>
                <p
                  className="font-ui mb-3"
                  style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--primary)' }}
                >
                  Reckonwell
                </p>
                <div className="flex items-center gap-1.5 mb-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8]?.map((i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: '6px',
                        borderRadius: '2px',
                        backgroundColor: i === 3 ? '#2D6A4F' : 'var(--primary)',
                        opacity: i === 3 ? 1 : i < 3 ? 0.8 : 0.2,
                      }}
                    />
                  ))}
                </div>
                <p
                  className="font-ui"
                  style={{ fontSize: '10px', color: '#2D6A4F', letterSpacing: '0.5px' }}
                >
                  Cash issue identified early and flagged
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {cards?.map((card, i) => (
            <motion.div
              key={card?.title}
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
                  {card?.title}
                </p>
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
