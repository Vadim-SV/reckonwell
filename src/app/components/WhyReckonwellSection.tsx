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

const pillars = [
  {
    num: '01',
    title: 'Daily Monitoring',
    body: 'Every working day, your team reviews your accounts. Cash position, incoming, outgoing — nothing moves without us knowing. You always have a live picture of where you stand.',
  },
  {
    num: '02',
    title: '48-Hour Processing',
    body: 'Every transaction, receipt, and invoice processed within 48 hours. Your books are never behind, never cluttered. Month end is just another day — because every day is month end.',
  },
  {
    num: '03',
    title: 'Your Finance Team',
    body: 'Not a bot. Not a portal. A named person who knows your business, reads the patterns, and reaches out when something deserves your attention — before you think to ask.',
  },
];

const withoutItems = [
  'Sales invoices go unchased for weeks — customers who owe you money, and nobody's following up',
  'You dont actually know your working capital position — is there real cash to spend, or is it all owed out?',
  'Your accountant closes the books once a month, so a cash flow problem is often three or four weeks old before anyone notices',
  'Your in-house bookkeeper can enter the numbers, but cant tell you what they mean for your next six months',
  'Youre making decisions — hiring, spending, holding back — on gut feel, because nobody's shown you a real forecast',
  'Every quiet moment gets swallowed by "just checking the numbers" instead of running the business',
];

const withItems = [
  'Every invoice is tracked and chased as a matter of course — unpaid customers dont slip through',
  'You know your real working capital position, whenever you need it — not a guess based on the bank balance',
  'Daily monitoring means a cash flow issue is caught within days, not discovered a month later at close',
  'A qualified finance professional runs the actual analysis — working capital, cash flow forecasting, runway — not just data entry',
  'Every major decision is backed by real numbers and a real forecast, not gut feel',
  'The numbers are someone elses job now. You get your time and headspace back'
];

export default function WhyReckonwellSection() {
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
      id="why-reckonwell"
      ref={ref}
      className="py-16 md:py-28 px-6 md:px-10"
      style={{ backgroundColor: 'var(--background)' }}
      aria-label="Why Reckonwell"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <motion.p
          className="section-label mb-4 md:mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Why Reckonwell
        </motion.p>

        {/* ── Block 1: Problem ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-start mb-14 md:mb-20">
          {/* Left */}
          <div>
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
              <div className="flex items-center gap-4" style={{ minHeight: '48px' }}>
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

          {/* Right: image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="relative w-full"
            style={{ aspectRatio: '4/3', maxHeight: '400px' }}
          >
            <div className="w-full h-full rounded-sm relative overflow-hidden">
              <img
                src="/assets/images/Stressed_businessman_in_cluttered_office-1779495675852.png"
                alt="Stressed businessman overwhelmed at a cluttered office desk, representing the chaos of unmanaged finances"
                className="w-full h-full object-cover"
              />
              <span
                className="absolute top-0 left-0"
                style={{ width: '20px', height: '20px', borderTop: '1px solid var(--primary)', borderLeft: '1px solid var(--primary)', opacity: 0.5 }}
              />
              <span
                className="absolute bottom-0 right-0"
                style={{ width: '20px', height: '20px', borderBottom: '1px solid var(--primary)', borderRight: '1px solid var(--primary)', opacity: 0.5 }}
              />
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div
          className="mb-14 md:mb-20"
          style={{ height: '1px', background: 'linear-gradient(90deg, transparent, var(--border-subtle), transparent)' }}
        />

        {/* ── Block 2: Three Pillars ── */}
        <div className="mb-14 md:mb-20">
          <motion.h2
            className="section-h2-medium mb-3 md:mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            This is what{' '}
            <span className="gold-italic">clarity</span> looks like.
          </motion.h2>
          <motion.p
            className="pull-quote mb-8 md:mb-12"
            style={{ maxWidth: '480px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Someone on your finances every morning. Not a dashboard. Not
            automation. A team that knows your business.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {pillars?.map((card, i) => (
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
                    style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 400 }}
                  >
                    {card?.num}
                  </p>
                  <h3
                    className="font-display mb-3"
                    style={{ fontSize: 'clamp(17px, 2.2vw, 26px)', fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.2 }}
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

        {/* Divider */}
        <div
          className="mb-14 md:mb-20"
          style={{ height: '1px', background: 'linear-gradient(90deg, transparent, var(--border-subtle), transparent)' }}
        />

        {/* ── Block 3: Before / After ── */}
        <div>
          <motion.h2
            className="section-h2-medium text-center mb-8 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            The difference is{' '}
            <span className="gold-italic">everything.</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Before */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-sm p-6 md:p-10"
              style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border-subtle)' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="inline-flex items-center gap-2 font-ui px-3 py-1 rounded-sm"
                  style={{
                    fontSize: '10px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    backgroundColor: 'rgba(192, 57, 43, 0.12)',
                    color: '#E74C3C',
                    border: '1px solid rgba(192,57,43,0.2)',
                    fontWeight: 500,
                  }}
                >
                  ✕ Before Reckonwell
                </span>
              </div>
              <ul className="flex flex-col gap-3 md:gap-4">
                {withoutItems?.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span style={{ color: '#E74C3C', fontSize: '16px', flexShrink: 0, marginTop: '2px' }}>✕</span>
                    <span className="body-text-rw" style={{ color: 'var(--muted)', fontSize: '15px' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* After */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-sm p-6 md:p-10 relative"
              style={{
                backgroundColor: 'rgba(10, 15, 8, 0.8)',
                border: '1px solid var(--gold-border)',
                borderLeft: '3px solid var(--primary)',
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="inline-flex items-center gap-2 font-ui px-3 py-1 rounded-sm"
                  style={{
                    fontSize: '10px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    backgroundColor: 'rgba(45, 106, 79, 0.15)',
                    color: '#52B788',
                    border: '1px solid rgba(45,106,79,0.25)',
                    fontWeight: 500,
                  }}
                >
                  ✓ After Reckonwell
                </span>
              </div>
              <ul className="flex flex-col gap-3 md:gap-4">
                {withItems?.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span style={{ color: 'var(--primary)', fontSize: '16px', flexShrink: 0, marginTop: '2px' }}>—</span>
                    <span className="body-text-rw" style={{ fontSize: '15px' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
