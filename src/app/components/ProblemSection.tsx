'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const cyclingWords = [
  'Cash surprises',
  'Overdue invoices',
  'Overspending',
  'Decisions made blind',
  'Always reactive',
  'Sunday spreadsheets',
];

export default function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeWord, setActiveWord] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setActiveWord((prev) => (prev + 1) % cyclingWords?.length);
        setVisible(true);
      }, 300);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="problem"
      ref={ref}
      className="py-20 md:py-36 px-6 md:px-10"
      style={{ backgroundColor: 'var(--background)' }}
      aria-label="The problem"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-start">
        {/* Left */}
        <div>
          <motion.p
            className="section-label mb-4 md:mb-6"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            The Problem
          </motion.p>

          <motion.h2
            className="section-h2-medium mb-5 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Your accountant is working
            <br />
            <span className="gold-italic">in the past.</span>
          </motion.h2>

          <motion.p
            className="body-text-rw mb-7 md:mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Traditional accounting gives you a 30-day lag on your own business.
            By the time the numbers arrive, the decision is already made — on
            instinct, not information. That is not an accounting problem. That
            is a leadership disadvantage.
          </motion.p>

          {/* Cycling words */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <p
              className="font-ui mb-4"
              style={{
                fontSize: '10px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: 'var(--muted)',
              }}
            >
              Sound familiar?
            </p>
            <div
              className="flex items-center gap-4"
              style={{ minHeight: '48px' }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '3px',
                  height: '36px',
                  backgroundColor: 'var(--primary)',
                  flexShrink: 0,
                }}
              />
              <span
                className="font-display"
                style={{
                  fontSize: 'clamp(18px, 3vw, 32px)',
                  color: 'var(--foreground)',
                  fontWeight: 400,
                  opacity: visible ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                  display: 'block',
                  minWidth: '180px',
                }}
              >
                {cyclingWords?.[activeWord]}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right: image placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="relative w-full"
          style={{ aspectRatio: '4/3', maxHeight: '400px' }}
        >
          <div
            className="w-full h-full rounded-sm relative overflow-hidden"
            style={{
              border: 'none',
            }}
          >
            <img
              src="/assets/images/Stressed_businessman_in_cluttered_office-1779495675852.png"
              alt="Stressed businessman overwhelmed at a cluttered office desk, representing the chaos of unmanaged finances"
              className="w-full h-full object-cover"
            />
            {/* Gold corner accents */}
            <span
              className="absolute top-0 left-0"
              style={{
                width: '20px',
                height: '20px',
                borderTop: '1px solid var(--primary)',
                borderLeft: '1px solid var(--primary)',
                opacity: 0.5,
              }}
            />
            <span
              className="absolute bottom-0 right-0"
              style={{
                width: '20px',
                height: '20px',
                borderBottom: '1px solid var(--primary)',
                borderRight: '1px solid var(--primary)',
                opacity: 0.5,
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}