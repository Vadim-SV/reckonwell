'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const features = [
  'Daily bookkeeping & transaction processing',
  'Real-time cash flow monitoring',
  'Monthly management accounts',
  'Quarterly business review call',
  'VAT returns included',
  'Dedicated account manager',
  'Unlimited email & phone support',
];

interface StandaloneCard {
  id: string;
  tag: string;
  title: string;
  body: string;
  price: string;
  btnLabel: string;
  href: string;
  cta?: boolean;
}

const standaloneCards: StandaloneCard[] = [
  {
    id: 'mtd',
    tag: 'Compliance',
    title: 'Making Tax Digital',
    body: 'Quarterly MTD submissions for sole traders and landlords over £50k income.',
    price: 'From £34/mo',
    btnLabel: 'Get quote →',
    href: '/quotation-calculator/?service=mtd',
  },
  {
    id: 'self-assessment',
    tag: 'Compliance',
    title: 'Self Assessment',
    body: 'Self-employed and sole trader tax returns. MTD-ready bookkeeping and HMRC filing.',
    price: 'From £80/mo',
    btnLabel: 'Get quote →',
    href: '/quotation-calculator/?service=self-assessment',
  },
  {
    id: 'rd',
    tag: 'Compliance',
    title: 'R&D Tax Return',
    body: 'Recover up to 20% of qualifying R&D spend. Fixed fee, HMRC queries handled.',
    price: 'From £850 one-off',
    btnLabel: 'Get quote →',
    href: '/quotation-calculator/?service=rd',
  },
  {
    id: 'final-accounts',
    tag: 'Compliance',
    title: 'Final Accounts & CT600',
    body: 'Statutory annual accounts, corporation tax return, and Companies House filings.',
    price: 'From £150/mo',
    btnLabel: 'Get quote →',
    href: '/quotation-calculator/?service=limited-company',
  },
  {
    id: 'get-quote',
    tag: 'Not sure?',
    title: 'Get a Quote',
    body: 'Answer a few questions and see your exact price in under two minutes.',
    price: 'All services · instant',
    btnLabel: 'Start now →',
    href: '/quotation-calculator/',
    cta: true,
  },
];

export default function ServicesAndPricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="quote"
      ref={ref}
      className="py-16 md:py-28 px-6 md:px-10"
      style={{ backgroundColor: '#080808' }}
      aria-label="Services and Pricing"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 md:mb-14">
          <motion.p
            className="section-label mb-4 md:mb-5"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Services &amp; Pricing
          </motion.p>
          <motion.h2
            className="section-h2-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Two ways to work{' '}
            <span className="gold-italic">with us.</span>
          </motion.h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">

          {/* ── Left: Fractional Finance (pricing anchor) ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Gold top accent */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2"
              style={{
                width: '60%',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, var(--primary), transparent)',
              }}
            />

            <div
              className="p-7 md:p-10 rounded-sm h-full"
              style={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--primary)',
                background: 'linear-gradient(180deg, var(--card), rgba(201,168,76,0.05))',
              }}
            >
              <p
                className="font-ui mb-3"
                style={{ fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 500 }}
              >
                Recommended
              </p>

              <h3
                className="font-display mb-4"
                style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.2 }}
              >
                Fractional Finance
              </h3>

              <p
                className="font-serif mb-6"
                style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 300, fontSize: '15px', color: 'var(--body-text)', lineHeight: 1.6 }}
              >
                Simple. Transparent. No surprises.
              </p>

              {/* Pricing */}
              <p
                className="font-serif mb-1"
                style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 300, fontSize: '16px', color: 'var(--primary)', letterSpacing: '0.5px' }}
              >
                From
              </p>
              <div className="flex items-end gap-0 mb-1">
                <div className="flex items-start">
                  <span className="font-display mt-2" style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', color: 'var(--primary)', fontWeight: 400 }}>£</span>
                  <span className="pricing-number">200</span>
                </div>
              </div>
              <p
                className="font-ui mb-6"
                style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--muted)' }}
              >
                Per Month
              </p>

              <div className="mb-6" style={{ height: '1px', backgroundColor: 'var(--border-subtle)' }} />

              <ul className="flex flex-col gap-3 mb-7">
                {features.map((feat) => (
                  <li key={feat} className="flex items-center gap-3">
                    <span className="font-display flex-shrink-0" style={{ color: 'var(--primary)', fontSize: '18px', fontWeight: 400 }}>—</span>
                    <span className="body-text-rw" style={{ fontSize: '14px' }}>{feat}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/book"
                className="btn-gold block text-center"
                style={{ width: '100%', padding: '16px 36px', fontSize: '11px' }}
              >
                Book a Discovery Call →
              </Link>

              <p
                className="font-ui text-center mt-4"
                style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.5px' }}
              >
                No setup fees · No long-term contracts · Cancel anytime
              </p>
            </div>
          </motion.div>

          {/* ── Right: Standalone Services ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3"
          >
            {standaloneCards.map((card, i) => (
              <motion.div
                key={card.id}
                className="flex flex-col rounded-sm"
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.35 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  padding: '18px 20px',
                  backgroundColor: card.cta ? 'transparent' : 'var(--card)',
                  border: card.cta ? '1px dashed var(--gold-border)' : '1px solid var(--border-subtle)',
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-ui mb-1"
                      style={{ fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 500 }}
                    >
                      {card.tag}
                    </p>
                    <h3
                      className="font-display mb-1"
                      style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 400, color: card.cta ? 'var(--primary)' : 'var(--foreground)', lineHeight: 1.2, letterSpacing: '-0.2px' }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="font-serif"
                      style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '13px', color: 'var(--body-text)', lineHeight: 1.5 }}
                    >
                      {card.body}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <p
                      className="font-ui"
                      style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)', whiteSpace: 'nowrap' }}
                    >
                      {card.price}
                    </p>
                    <Link
                      href={card.href}
                      className="font-ui"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '9px 14px',
                        fontSize: '9px',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        fontWeight: 500,
                        fontFamily: 'var(--font-sans)',
                        textDecoration: 'none',
                        borderRadius: '2px',
                        transition: 'all 0.3s',
                        backgroundColor: 'transparent',
                        color: 'var(--primary)',
                        border: '1px solid var(--gold-border)',
                        whiteSpace: 'nowrap',
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLAnchorElement;
                        el.style.backgroundColor = 'var(--primary)';
                        el.style.color = '#080808';
                        el.style.borderColor = 'var(--primary)';
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLAnchorElement;
                        el.style.backgroundColor = 'transparent';
                        el.style.color = 'var(--primary)';
                        el.style.borderColor = 'var(--gold-border)';
                      }}
                    >
                      {card.btnLabel}
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
