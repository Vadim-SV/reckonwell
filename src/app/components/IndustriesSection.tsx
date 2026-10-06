'use client';

import React from 'react';
import Link from 'next/link';

interface IndustryCard {
  name: string;
  slug: string;
  icon: React.ReactNode;
  promise: string;
  bullets: string[];
  colSpan: string;
}

// Gold colour constants
const GOLD = '#C9A84C';
const GOLD_LIGHT = '#E3C77A';
const CREAM = '#FBF1E3';
const NAVY = '#0d1b2e';
const BULLET_GREY = '#C9D1DC';

// Thin gold line icons (24×24 SVG, stroke only)
const CodeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <polyline points="16 18 22 12 16 6" stroke={GOLD_LIGHT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="8 6 2 12 8 18" stroke={GOLD_LIGHT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ShoppingBagIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke={GOLD_LIGHT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="3" y1="6" x2="21" y2="6" stroke={GOLD_LIGHT} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 10a4 4 0 01-8 0" stroke={GOLD_LIGHT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BuildingIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="3" y="9" width="18" height="13" rx="1" stroke={GOLD_LIGHT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 22V9" stroke={GOLD_LIGHT} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 22V9" stroke={GOLD_LIGHT} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 3L3 9h18L12 3z" stroke={GOLD_LIGHT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CogIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="12" cy="12" r="3" stroke={GOLD_LIGHT} strokeWidth="1.5" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke={GOLD_LIGHT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UtensilsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2" stroke={GOLD_LIGHT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="7" y1="2" x2="7" y2="22" stroke={GOLD_LIGHT} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M21 15V2s-4 2-4 9" stroke={GOLD_LIGHT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="17" y1="15" x2="17" y2="22" stroke={GOLD_LIGHT} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ flexShrink: 0, marginTop: '2px' }}>
    <polyline points="2 7 5.5 10.5 12 4" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const industries: IndustryCard[] = [
  {
    name: 'Technology',
    slug: 'technology',
    icon: <CodeIcon />,
    promise: 'Investor-ready numbers, every month.',
    bullets: [
      'Burn rate, runway, MRR and churn tracked',
      'R&D tax relief claims prepared',
      'Board and fundraising reporting',
    ],
    colSpan: 'lg:col-span-2',
  },
  {
    name: 'E-commerce',
    slug: 'ecommerce',
    icon: <ShoppingBagIcon />,
    promise: 'Shopify, Amazon and Stripe in one reconciliation.',
    bullets: [
      'Payouts split into sales, fees and refunds',
      'Stock, COGS and VAT under control',
      'True margin per product and channel',
    ],
    colSpan: 'lg:col-span-2',
  },
  {
    name: 'Property',
    slug: 'property',
    icon: <BuildingIcon />,
    promise: 'Every property and SPV in one clear picture.',
    bullets: [
      'Rental income and costs per property',
      'SPV accounts and director\'s loans',
      'Making Tax Digital for landlords',
    ],
    colSpan: 'lg:col-span-2',
  },
  {
    name: 'Manufacturing',
    slug: 'manufacturing',
    icon: <CogIcon />,
    promise: 'Know what each product really costs you.',
    bullets: [
      'Stock and work in progress valued correctly',
      'Product costing and margins',
      'Working capital planned around orders',
    ],
    colSpan: 'lg:col-span-3',
  },
  {
    name: 'Hospitality',
    slug: 'hospitality',
    icon: <UtensilsIcon />,
    promise: 'Till, card and delivery sales matched to the bank.',
    bullets: [
      'Food, drink and labour cost percentages',
      'Payroll, tips and tronc handled correctly',
      'VAT and seasonal cash flow planned',
    ],
    colSpan: 'lg:col-span-3',
  },
];

export default function IndustriesSection() {
  return (
    <section
      id="industries"
      style={{ backgroundColor: NAVY }}
      className="py-16 md:py-20 px-4 sm:px-6 md:px-16"
    >
      <div className="max-w-6xl mx-auto">
        {/* Kicker */}
        <p
          className="mb-4 tracking-widest uppercase font-sans"
          style={{
            color: GOLD,
            fontSize: '11px',
            letterSpacing: '1.5px',
          }}
        >
          Industries
        </p>

        {/* Heading */}
        <h2
          className="font-serif leading-tight mb-10 md:mb-14"
          style={{
            color: CREAM,
            fontSize: 'clamp(26px, 4vw, 52px)',
          }}
        >
          Built around how your business works.
        </h2>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-[10px] lg:gap-3">
          {industries.map((industry, index) => (
            <a
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              aria-label={`Explore ${industry.name} accounting services`}
              className={[
                'group flex flex-col rounded-[4px] p-5 transition-colors duration-200',
                // Last card on tablet spans full width
                index === 4 ? 'sm:col-span-2 lg:col-span-3' : '',
                industry.colSpan,
              ].join(' ')}
              style={{
                background: 'transparent',
                border: `1px solid rgba(201,168,76,0.45)`,
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.border = `1px solid ${GOLD}`;
                el.style.background = 'rgba(201,168,76,0.06)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.border = `1px solid rgba(201,168,76,0.45)`;
                el.style.background = 'transparent';
              }}
            >
              {/* Top row: icon + industry name */}
              <div className="flex items-center gap-2 mb-3">
                {industry.icon}
                <span
                  className="uppercase tracking-widest font-sans"
                  style={{
                    color: GOLD,
                    fontSize: '11px',
                    letterSpacing: '1.5px',
                  }}
                >
                  {industry.name}
                </span>
              </div>

              {/* Promise */}
              <p
                className="font-serif mb-4 leading-snug"
                style={{
                  color: CREAM,
                  fontSize: 'clamp(19px, 2vw, 20px)',
                }}
              >
                {industry.promise}
              </p>

              {/* Thin gold divider */}
              <hr
                style={{
                  border: 'none',
                  borderTop: `1px solid rgba(201,168,76,0.35)`,
                  marginBottom: '14px',
                }}
              />

              {/* Bullets */}
              <ul className="flex flex-col gap-2 flex-1 mb-5">
                {industry.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <CheckIcon />
                    <span
                      className="font-sans leading-snug"
                      style={{
                        color: BULLET_GREY,
                        fontSize: '14px',
                      }}
                    >
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Explore link */}
              <span
                className="uppercase tracking-widest font-sans mt-auto"
                style={{
                  color: GOLD,
                  fontSize: '11px',
                  letterSpacing: '1.5px',
                }}
              >
                Explore {industry.name} →
              </span>
            </a>
          ))}
        </div>

        {/* Full-width CTA button */}
        <div className="mt-6">
          <Link
            href="/industries"
            className="flex items-center justify-center w-full font-sans font-semibold tracking-widest uppercase transition-opacity duration-150 hover:opacity-90"
            style={{
              backgroundColor: GOLD,
              color: NAVY,
              minHeight: '48px',
              fontSize: '13px',
              letterSpacing: '1.5px',
              borderRadius: '2px',
              textDecoration: 'none',
            }}
          >
            View all industries →
          </Link>
        </div>
      </div>
    </section>
  );
}
