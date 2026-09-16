'use client';

import React from 'react';
import Link from 'next/link';

const cities = [
  { name: 'Bath', slug: 'bath' },
  { name: 'Belfast', slug: 'belfast' },
  { name: 'Birmingham', slug: 'birmingham' },
  { name: 'Brighton', slug: 'brighton' },
  { name: 'Bristol', slug: 'bristol' },
  { name: 'Cambridge', slug: 'cambridge' },
  { name: 'Cardiff', slug: 'cardiff' },
  { name: 'City of London', slug: 'city-of-london' },
  { name: 'Coventry', slug: 'coventry' },
  { name: 'Edinburgh', slug: 'edinburgh' },
  { name: 'Glasgow', slug: 'glasgow' },
  { name: 'Hackney', slug: 'hackney' },
  { name: 'Hounslow', slug: 'hounslow' },
  { name: 'Islington', slug: 'islington' },
  { name: 'Leeds', slug: 'leeds' },
  { name: 'Leicester', slug: 'leicester' },
  { name: 'Liverpool', slug: 'liverpool' },
  { name: 'London', slug: 'london' },
  { name: 'Manchester', slug: 'manchester' },
  { name: 'Moorgate', slug: 'moorgate' },
  { name: 'Newcastle', slug: 'newcastle' },
  { name: 'Nottingham', slug: 'nottingham' },
  { name: 'Oxford', slug: 'oxford' },
  { name: 'Sheffield', slug: 'sheffield' },
  { name: 'Soho', slug: 'soho' },
  { name: 'Southwark', slug: 'southwark' },
  { name: 'Westminster', slug: 'westminster' },
  { name: 'York', slug: 'york' },
];

export default function NationwideCoverageSection() {
  return (
    <section
      style={{ backgroundColor: 'var(--background)', borderTop: '0.5px solid var(--border)', borderBottom: '0.5px solid var(--border)' }}
      className="py-12 md:py-18"
      aria-label="Nationwide coverage"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-16">
        {/* Label */}
        <p
          className="section-label mb-3"
        >
          Nationwide Coverage
        </p>

        {/* Headline */}
        <h2
          className="section-h2-medium mb-3"
          style={{ fontSize: 'clamp(22px, 3.5vw, 40px)' }}
        >
          Serving founder-led businesses across the UK.
        </h2>

        {/* Sub-copy */}
        <p
          className="body-text-rw mb-2"
          style={{ maxWidth: '520px', fontSize: '15px' }}
        >
          Remote-first accounting for businesses in every major UK city. Same service, same pricing, wherever you are.
        </p>

        {/* Location badge */}
        <p
          className="font-ui mb-7 md:mb-8"
          style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)' }}
        >
          London based · UK wide
        </p>

        {/* City grid */}
        <ul
          className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-x-4 gap-y-2"
          role="list"
        >
          {cities.map((city) => (
            <li key={city.slug}>
              <Link
                href={`/accounting/${city.slug}`}
                className="group inline-flex items-center gap-1.5 text-sm transition-colors duration-200"
                style={{
                  color: 'var(--muted)',
                  fontFamily: 'var(--font-sans)',
                  letterSpacing: '0.02em',
                  minHeight: '36px',
                }}
              >
                <span
                  className="inline-block w-1 h-1 rounded-full flex-shrink-0 transition-colors duration-200"
                  style={{ backgroundColor: 'var(--border)' }}
                  aria-hidden="true"
                />
                <span
                  className="group-hover:underline"
                  style={{ color: 'inherit' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget.parentElement as HTMLElement).style.color = 'var(--primary)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget.parentElement as HTMLElement).style.color = 'var(--muted)';
                  }}
                >
                  {city.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
