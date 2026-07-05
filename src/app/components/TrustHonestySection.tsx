'use client';

import React from 'react';

export default function TrustHonestySection() {
  return (
    <section
      className="px-6 md:px-10 py-10 md:py-14"
      style={{ borderBottom: '1px solid var(--gold-border)', backgroundColor: 'rgba(201,168,76,0.03)' }}
      aria-label="Why you can trust us"
    >
      <div className="max-w-3xl mx-auto">
        <p
          className="font-ui mb-4"
          style={{ fontSize: '11px', color: 'var(--primary)', letterSpacing: '2px', textTransform: 'uppercase' }}
        >
          Why You Can Trust Us
        </p>
        <p
          className="font-ui mb-6"
          style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.8, fontStyle: 'italic' }}
        >
          &ldquo;We won&rsquo;t publish testimonials we can&rsquo;t stand behind. Until we&rsquo;ve built a track record we can show you honestly, here&rsquo;s what you can check for yourself: our ICO data protection registration (CSN3799691), our Professional Indemnity Insurance, and our FIAB and IAB certifications. We&rsquo;d rather earn your trust with facts you can verify than words we made up.&rdquo;
        </p>
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-6">
          {[
            'ICO Registered · CSN3799691',
            'Professional Indemnity Insurance',
            'FIAB Certified',
            'IAB Member',
          ]?.map((badge) => (
            <span
              key={badge}
              className="flex items-center gap-2 font-ui"
              style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.4px' }}
            >
              <span style={{ color: 'var(--primary)', fontSize: '13px' }}>✓</span>
              {badge}
            </span>
          ))}
        </div>
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
    </section>
  );
}
