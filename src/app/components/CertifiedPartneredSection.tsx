'use client';

import React from 'react';

interface CertifiedPartneredSectionProps {
  variant?: 'compact' | 'full';
}

const partners = [
  { name: 'Revolut Business', logo: '/assets/images/Revolut-1779495022321.png' },
  { name: 'Tide Bank', logo: '/assets/images/Tide-1779494967883.png' },
  { name: 'Xero', logo: '/assets/images/Xero-1779495015718.png' },
  { name: 'QuickBooks', logo: '/assets/images/Quickbooks-1779494986853.png' },
];

const textBadges = [
  'Xero Certified Advisor',
  'QuickBooks ProAdvisor',
  'FIAB Certified',
  'IAB Member',
];

export default function CertifiedPartneredSection({ variant = 'full' }: CertifiedPartneredSectionProps) {
  return (
    <section
      className="px-6 md:px-10 py-8 md:py-10"
      style={{ borderBottom: '1px solid var(--gold-border)', backgroundColor: 'rgba(201,168,76,0.03)' }}
      aria-label="Certifications and partnerships"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-6">

        {/* Partner logos strip */}
        <div className="flex flex-col items-center gap-4 w-full">
          <p
            className="font-ui text-center"
            style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '1px', textTransform: 'uppercase' }}
          >
            Certified &amp; Partnering With
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {partners.map((partner) => (
              <div
                key={partner.name}
                style={{ opacity: 0.4, transition: 'opacity 0.3s ease' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.4')}
              >
                <img
                  src={partner.logo}
                  alt={partner.name + ' logo'}
                  style={{ width: '110px', height: '60px', objectFit: 'contain' }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Text badges — shown in both variants */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
          {textBadges.map((badge) => (
            <span
              key={badge}
              className="flex items-center gap-2 font-ui"
              style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.5px' }}
            >
              <span style={{ color: 'var(--primary)', fontSize: '14px' }}>✓</span>
              {badge}
            </span>
          ))}
        </div>

        {/* Full variant: additional trust details */}
        {variant === 'full' && (
          <>
            {/* Regulatory & insurance badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
              {[
                'ICO Registered · Data Protection Reg. CSN3799691',
                'Professional Indemnity Insurance Held',
              ].map((badge) => (
                <span
                  key={badge}
                  className="flex items-center gap-2 font-ui"
                  style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.4px' }}
                >
                  <span style={{ color: 'var(--primary)', fontSize: '14px' }}>✓</span>
                  {badge}
                </span>
              ))}
            </div>

            {/* Onboarding badge + Google reviews */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
              {/* 48-hour onboarding badge */}
              <div
                className="flex items-center gap-3 px-4 py-2 border"
                style={{ borderColor: 'var(--primary)', backgroundColor: 'rgba(201,168,76,0.06)' }}
              >
                <span style={{ color: 'var(--primary)', fontSize: '18px' }}>⚡</span>
                <div>
                  <p className="font-ui font-medium" style={{ fontSize: '12px', color: 'var(--foreground)', letterSpacing: '0.3px' }}>
                    Onboarded in 48 hours
                  </p>
                  <p className="font-ui" style={{ fontSize: '10px', color: 'var(--muted)', lineHeight: 1.4 }}>
                    Share access to your bank and invoicing tools — we handle the rest.
                  </p>
                </div>
              </div>

              {/* Google reviews link — no rating or count */}
              <a
                href="https://www.google.com/maps/search/Reckonwell+124+City+Road+London"
                target="_blank"
                rel="noopener noreferrer"
                className="font-ui"
                style={{
                  fontSize: '12px',
                  color: 'var(--primary)',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                  letterSpacing: '0.3px',
                }}
              >
                Read our reviews on Google →
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
