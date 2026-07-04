'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

interface ServiceCard {
  id: string;
  tag: string;
  title: string;
  body: string;
  price: string;
  btnLabel: string;
  href: string;
  featured?: boolean;
  cta?: boolean;
}

const serviceCards: ServiceCard[] = [
  {
    id: 'fractional-finance',
    tag: 'Recommended',
    title: 'Fractional Finance',
    body: 'Daily bookkeeping, management accounts, VAT, and a dedicated finance team — one flat fee.',
    price: 'From £200/mo',
    btnLabel: 'Book a call',
    href: '/book',
    featured: true,
  },
  {
    id: 'mtd',
    tag: 'Compliance',
    title: 'Making Tax Digital',
    body: 'Quarterly MTD submissions for sole traders and landlords over £50k income.',
    price: 'From £34/mo',
    btnLabel: 'Get quote',
    href: '/quotation-calculator/?service=mtd',
  },
  {
    id: 'self-assessment',
    tag: 'Compliance',
    title: 'Self Assessment',
    body: 'Self-employed and sole trader tax returns. MTD-ready bookkeeping and HMRC filing.',
    price: 'From £80/mo',
    btnLabel: 'Get quote',
    href: '/quotation-calculator/?service=self-assessment',
  },
  {
    id: 'rd',
    tag: 'Compliance',
    title: 'R&D Tax Return',
    body: 'Recover up to 20% of qualifying R&D spend. Fixed fee, HMRC queries handled.',
    price: 'From £850 one-off',
    btnLabel: 'Get quote',
    href: '/quotation-calculator/?service=rd',
  },
  {
    id: 'final-accounts',
    tag: 'Compliance',
    title: 'Final Accounts & CT600',
    body: 'Statutory annual accounts, corporation tax return, and Companies House filings.',
    price: 'From £150/mo',
    btnLabel: 'Get quote',
    href: '/quotation-calculator/?service=limited-company',
  },
  {
    id: 'get-quote',
    tag: 'Not sure?',
    title: 'Get a Quote',
    body: 'Answer a few questions and see your exact price in under two minutes.',
    price: 'All services · instant',
    btnLabel: 'Start now',
    href: '/quotation-calculator/',
    cta: true,
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <motion.p
            className="section-label mb-5 md:mb-6"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Services
          </motion.p>
          <motion.h2
            className="section-h2-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Everything your business needs to stay{' '}
            <span className="gold-italic">compliant.</span>
          </motion.h2>
          <motion.p
            className="font-serif"
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: '17px',
              color: 'var(--body-text)',
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Get an instant quote for any service. No sales call required.
          </motion.p>
        </div>

        {/* 3×2 Card Grid */}
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
        >
          {serviceCards.map((card, i) => (
            <motion.div
              key={card.id}
              className="flex flex-col rounded-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              style={{
                padding: '24px 20px',
                minHeight: '220px',
                backgroundColor: card.cta ? 'transparent' : card.featured ? 'var(--card)' : 'var(--card)',
                border: card.cta
                  ? '1px dashed var(--gold-border)'
                  : card.featured
                  ? '1px solid var(--primary)'
                  : '1px solid var(--border-subtle)',
                background: card.featured
                  ? 'linear-gradient(180deg, var(--card), rgba(201,168,76,0.05))'
                  : card.cta
                  ? 'transparent' :'var(--card)',
                transition: 'border-color 0.3s',
              }}
            >
              {/* Tag */}
              <p
                className="font-ui mb-3"
                style={{
                  fontSize: '8px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: 'var(--primary)',
                  fontWeight: 500,
                }}
              >
                {card.tag}
              </p>

              {/* Title */}
              <h3
                className="font-display mb-2"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '18px',
                  fontWeight: 400,
                  color: card.cta ? 'var(--primary)' : 'var(--foreground)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.3px',
                }}
              >
                {card.title}
              </h3>

              {/* Body */}
              <p
                className="font-serif flex-1"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: '14px',
                  color: 'var(--body-text)',
                  lineHeight: 1.5,
                  marginBottom: '14px',
                }}
              >
                {card.body}
              </p>

              {/* Price */}
              <p
                className="font-ui mb-4"
                style={{
                  fontSize: '10px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                }}
              >
                {card.price}
              </p>

              {/* Button */}
              <Link
                href={card.href}
                className="font-ui"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px 16px',
                  fontSize: '9px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  fontFamily: 'var(--font-sans)',
                  textDecoration: 'none',
                  borderRadius: '2px',
                  transition: 'all 0.3s',
                  backgroundColor: card.featured ? 'var(--primary)' : 'transparent',
                  color: card.featured ? '#080808' : 'var(--primary)',
                  border: card.featured ? '1px solid var(--primary)' : '1px solid var(--gold-border)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.backgroundColor = 'var(--primary)';
                  el.style.color = '#080808';
                  el.style.borderColor = 'var(--primary)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  if (card.featured) {
                    el.style.backgroundColor = 'var(--primary)';
                    el.style.color = '#080808';
                    el.style.borderColor = 'var(--primary)';
                  } else {
                    el.style.backgroundColor = 'transparent';
                    el.style.color = 'var(--primary)';
                    el.style.borderColor = 'var(--gold-border)';
                  }
                }}
              >
                {card.btnLabel} <span>→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}