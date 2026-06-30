'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const serviceCards = [
  {
    id: 'self-assessment',
    title: 'Self Assessment',
    body: 'Sole trader or self-employed? We file your Self Assessment and keep your tax position clear all year round.',
    href: '/self-assessment-calculator',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="14" cy="9" r="4" />
        <path d="M6 24c0-4.4 3.6-8 8-8s8 3.6 8 8" />
        <path d="M18 14l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 'mtd',
    title: 'Making Tax Digital (MTD)',
    body: 'Mandatory quarterly filing for sole traders and landlords earning £50k+. We handle every submission, on time, every time.',
    href: '/mtd-calculator',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="5" width="20" height="18" rx="2" />
        <path d="M4 10h20" />
        <path d="M9 5V3M19 5V3" />
        <path d="M9 15h2M13 15h2M17 15h2M9 19h2M13 19h2" />
      </svg>
    ),
  },
  {
    id: 'final-accounts',
    title: 'Final Accounts & Corporation Tax (CT600)',
    body: 'Statutory year-end accounts, Companies House filing, and CT600 corporation tax returns — prepared and submitted in full. VAT returns included where applicable.',
    href: '/final-accounts-ct600-calculator',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 4h12l6 6v14H6z" />
        <path d="M18 4v6h6" />
        <path d="M10 14h8M10 18h5" />
      </svg>
    ),
  },
  {
    id: 'rd',
    title: 'R&D Tax Credits & Patent Box',
    body: "If you're innovating, you're likely eligible. We identify qualifying spend, prepare the claim, and maximise what comes back.",
    href: '/rd-tax-relief-calculator',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 4 L24 10 L24 20 L14 24 L4 20 L4 10 Z" />
        <circle cx="14" cy="14" r="4" />
        <path d="M14 4v6M24 10l-6 4M24 20l-6-4M14 24v-6M4 20l6-4M4 10l6 4" />
      </svg>
    ),
  },
];

export default function AdditionalServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="py-20 md:py-36 px-6 md:px-10"
      style={{ backgroundColor: 'var(--background)' }}
      aria-label="Additional services"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
        {/* Left */}
        <div className="flex flex-col justify-between h-full">
          <div>
            <motion.p
              className="section-label mb-5 md:mb-6"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Additional Services
            </motion.p>
            <motion.h2
              className="section-h2-medium mb-5 md:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Every obligation handled.{' '}
              <span className="gold-italic">Nothing missed.</span>
            </motion.h2>
            <motion.p
              className="body-text-rw"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ color: '#ffffff' }}
            >
              Compliance is not something a director should carry in their head.
              From VAT to R&D claims, our team handles every filing, every
              deadline, every submission — so it simply never reaches your desk.
            </motion.p>
          </div>

          <motion.div
            className="mt-8 md:mt-10 hidden md:block"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div
              className="p-6 rounded-sm"
              style={{
                border: '1px solid var(--gold-border)',
                backgroundColor: 'var(--gold-dim)',
              }}
            >
              <p
                className="font-serif mb-2"
                style={{
                  fontStyle: 'italic',
                  fontWeight: 300,
                  fontSize: '17px',
                  color: 'var(--primary)',
                  lineHeight: 1.6,
                  fontFamily: 'var(--font-serif)',
                }}
              >
                &ldquo;We claimed £23k in R&D credits we didn&apos;t know we were owed.
                One conversation changed everything.&rdquo;
              </p>
              <p
                className="font-ui"
                style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '1px' }}
              >
                — Nathan Clarke, SaaS Founder
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right: 2x2 service cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {serviceCards.map((card, i) => (
            <motion.div
              key={card.id}
              className="service-card flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              style={{ minHeight: '200px' }}
            >
              <div
                className="mb-4"
                style={{ color: 'var(--primary)', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {card.icon}
              </div>
              <h3
                className="font-display mb-2"
                style={{ fontSize: '16px', fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.2 }}
              >
                {card.title}
              </h3>
              <p className="body-text-rw flex-1" style={{ fontSize: '13px', color: '#ffffff', lineHeight: 1.65 }}>
                {card.body}
              </p>
              <div className="mt-4">
                <Link
                  href={card.href}
                  style={{
                    display: 'inline-block',
                    padding: '10px 18px',
                    fontSize: '11px',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 500,
                    color: 'var(--primary)',
                    border: '1px solid var(--gold-border)',
                    borderRadius: '2px',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--gold-dim)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
                  }}
                >
                  Calculate Your Price →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}