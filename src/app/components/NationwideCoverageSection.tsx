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
  { name: 'Coventry', slug: 'coventry' },
  { name: 'Edinburgh', slug: 'edinburgh' },
  { name: 'Glasgow', slug: 'glasgow' },
  { name: 'Leeds', slug: 'leeds' },
  { name: 'Leicester', slug: 'leicester' },
  { name: 'Liverpool', slug: 'liverpool' },
  { name: 'London', slug: 'london' },
  { name: 'Manchester', slug: 'manchester' },
  { name: 'Newcastle', slug: 'newcastle' },
  { name: 'Nottingham', slug: 'nottingham' },
  { name: 'Oxford', slug: 'oxford' },
  { name: 'Sheffield', slug: 'sheffield' },
  { name: 'York', slug: 'york' },
];

export default function NationwideCoverageSection() {
  return (
    <section
      style={{ backgroundColor: 'var(--background)', borderTop: '0.5px solid var(--border)', borderBottom: '0.5px solid var(--border)' }}
      className="py-10 md:py-14"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Label */}
        <p
          className="text-xs tracking-[0.2em] uppercase mb-3"
          style={{ color: 'var(--gold)', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}
        >
          Nationwide Coverage
        </p>

        {/* Heading */}
        <h2
          className="text-xl md:text-2xl mb-2"
          style={{
            color: 'var(--foreground)',
            fontFamily: 'var(--font-playfair, "Playfair Display", serif)',
            fontWeight: 400,
          }}
        >
          Serving founder-led businesses across the UK.
        </h2>

        {/* Sub-copy */}
        <p
          className="text-sm mb-7 max-w-xl"
          style={{
            color: 'var(--muted)',
            fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
            fontStyle: 'italic',
            fontSize: '0.95rem',
          }}
        >
          Remote-first accounting for businesses in every major UK city. Same service, same pricing, wherever you are.
        </p>

        {/* City grid */}
        <ul
          className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-x-4 gap-y-2"
          role="list"
        >
          {cities.map((city) => (
            <li key={city.slug}>
              <Link
                href={`/accounting/${city.slug}`}
                className="group inline-flex items-center gap-1.5 text-sm transition-colors duration-200"
                style={{
                  color: 'var(--muted)',
                  fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)',
                  letterSpacing: '0.02em',
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
                    (e.currentTarget.parentElement as HTMLElement).style.color = 'var(--gold)';
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
