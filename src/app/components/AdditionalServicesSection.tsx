'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const serviceCards = [
  {
    id: 'vat',
    title: 'VAT Returns',
    body: 'Quarterly or monthly VAT submissions handled in full. MTD-compliant, accurate, and filed on time — every time.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="20" height="20" rx="2" />
        <path d="M9 14h10M9 10h6M9 18h8" />
      </svg>
    ),
    span: false,
  },
  {
    id: 'accounts',
    title: 'Final Accounts',
    body: 'Year-end statutory accounts prepared and filed at Companies House. Clean, compliant, and on schedule.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 4h12l6 6v14H6z" />
        <path d="M18 4v6h6" />
        <path d="M10 14h8M10 18h5" />
      </svg>
    ),
    span: false,
  },
  {
    id: 'corp-tax',
    title: 'Corporation Tax',
    body: 'CT600 prepared and submitted. We identify every allowable deduction and make sure you pay only what you owe.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="14" cy="14" r="10" />
        <path d="M14 8v6l4 4" />
        <path d="M10 14h4" />
      </svg>
    ),
    span: false,
  },
  {
    id: 'rd',
    title: 'R&D Tax Credits',
    body: "If you're innovating, you're likely eligible. We identify qualifying activities, prepare the technical narrative, and maximise your claim.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 4 L24 10 L24 20 L14 24 L4 20 L4 10 Z" />
        <circle cx="14" cy="14" r="4" />
        <path d="M14 4v6M24 10l-6 4M24 20l-6-4M14 24v-6M4 20l6-4M4 10l6 4" />
      </svg>
    ),
    span: false,
  },
  {
    id: 'patent',
    title: 'Patent Box',
    body: "A 10% corporation tax rate on profits from patented inventions. Most eligible companies never claim it. We make sure you don't miss out.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3 L14 10 M14 10 C14 10 8 12 8 18 C8 22 11 25 14 25 C17 25 20 22 20 18 C20 12 14 10 14 10Z" />
        <path d="M11 18 L14 21 L17 16" />
        <path d="M10 8 L4 6M18 8 L24 6" />
      </svg>
    ),
    span: true,
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

        {/* Right: service cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {/* VAT Returns */}
          <motion.div
            className="service-card"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="mb-4"
              style={{ color: 'var(--primary)', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {serviceCards?.[0]?.icon}
            </div>
            <h3
              className="font-display mb-2"
              style={{ fontSize: '17px', fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.2 }}
            >
              {serviceCards?.[0]?.title}
            </h3>
            <p className="body-text-rw" style={{ fontSize: '13px', color: '#ffffff' }}>
              {serviceCards?.[0]?.body}
            </p>
          </motion.div>

          {/* Final Accounts */}
          <motion.div
            className="service-card"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="mb-4"
              style={{ color: 'var(--primary)', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {serviceCards?.[1]?.icon}
            </div>
            <h3
              className="font-display mb-2"
              style={{ fontSize: '17px', fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.2 }}
            >
              {serviceCards?.[1]?.title}
            </h3>
            <p className="body-text-rw" style={{ fontSize: '13px', color: '#ffffff' }}>
              {serviceCards?.[1]?.body}
            </p>
          </motion.div>

          {/* Corporation Tax */}
          <motion.div
            className="service-card"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="mb-4"
              style={{ color: 'var(--primary)', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {serviceCards?.[2]?.icon}
            </div>
            <h3
              className="font-display mb-2"
              style={{ fontSize: '17px', fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.2 }}
            >
              {serviceCards?.[2]?.title}
            </h3>
            <p className="body-text-rw" style={{ fontSize: '13px', color: '#ffffff' }}>
              {serviceCards?.[2]?.body}
            </p>
          </motion.div>

          {/* R&D Tax Credits */}
          <motion.div
            className="service-card"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="mb-4"
              style={{ color: 'var(--primary)', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {serviceCards?.[3]?.icon}
            </div>
            <h3
              className="font-display mb-2"
              style={{ fontSize: '17px', fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.2 }}
            >
              {serviceCards?.[3]?.title}
            </h3>
            <p className="body-text-rw" style={{ fontSize: '13px', color: '#ffffff' }}>
              {serviceCards?.[3]?.body}
            </p>
          </motion.div>

          {/* Patent Box — full width */}
          <motion.div
            className="service-card sm:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-start gap-5">
              <div
                className="flex-shrink-0"
                style={{ color: 'var(--primary)', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {serviceCards?.[4]?.icon}
              </div>
              <div>
                <h3
                  className="font-display mb-2"
                  style={{ fontSize: '17px', fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.2 }}
                >
                  {serviceCards?.[4]?.title}
                </h3>
                <p className="body-text-rw" style={{ fontSize: '13px', color: '#ffffff' }}>
                  {serviceCards?.[4]?.body}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}