'use client';

import React from 'react';
import Link from 'next/link';

const TOOLS = [
  { slug: 'salary-vs-dividend-calculator', icon: '💷', title: 'Salary vs Dividend', question: "What\'s the most tax-efficient way to pay myself?" },
  { slug: 'sole-trader-vs-limited-company', icon: '⚖️', title: 'Sole Trader vs Ltd', question: 'Should I set up a limited company?' },
  { slug: 'corporation-tax-calculator', icon: '🏢', title: 'Corporation Tax', question: 'How much corporation tax will I pay?' },
  { slug: 'working-capital-calculator', icon: '💰', title: 'Working Capital', question: 'How much cash is tied up in my business?' },
  { slug: 'uk-tax-residence-checker', icon: '🌍', title: 'Tax Residence Checker', question: "What\'s my UK tax position when moving?" },
  { slug: 'tax-relief-finder', icon: '🔍', title: 'Tax Relief Finder', question: 'Which tax reliefs can my business claim?' },
  { slug: 'allowable-expenses-finder', icon: '📋', title: 'Expenses Finder', question: 'What can I claim as a business expense?' },
  { slug: 'vat-scheme-calculator', icon: '📊', title: 'VAT Scheme Calculator', question: 'Which VAT scheme saves me most?' },
];

export default function FreeToolkitSection() {
  return (
    <section
      className="w-full"
      style={{ backgroundColor: 'var(--background)', borderTop: '1px solid var(--border)' }}
      aria-label="Free Founder Finance Toolkit"
    >
      <div
        className="max-w-7xl mx-auto"
        style={{ padding: 'clamp(56px, 7vw, 96px) clamp(24px, 6vw, 80px)' }}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p
              className="uppercase tracking-widest mb-3"
              style={{
                fontSize: '11px',
                letterSpacing: '0.18em',
                color: 'var(--muted)',
                fontFamily: 'var(--font-work-sans), sans-serif',
                fontWeight: 500,
              }}
            >
              Free tools
            </p>
            <h2
              className="font-display"
              style={{
                fontFamily: 'var(--font-newsreader), serif',
                fontSize: 'clamp(32px, 4vw, 52px)',
                fontWeight: 400,
                color: 'var(--foreground)',
                lineHeight: 1.15,
                maxWidth: '560px',
              }}
            >
              Free Founder Finance Toolkit
            </h2>
            <p
              className="mt-3 max-w-xl"
              style={{
                fontFamily: 'var(--font-work-sans), sans-serif',
                fontSize: 'clamp(15px, 1.1vw, 17px)',
                color: 'var(--muted)',
                lineHeight: 1.65,
              }}
            >
              Eight free calculators and finders for UK founder-led businesses. No sign-up, no email gate — just answers.
            </p>
          </div>
          <Link
            href="/toolkit"
            className="inline-flex items-center gap-2 shrink-0"
            style={{
              fontFamily: 'var(--font-work-sans), sans-serif',
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--foreground)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--foreground)',
              paddingBottom: '2px',
              whiteSpace: 'nowrap',
            }}
          >
            View all tools
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Tool grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TOOLS.map((tool) => (
            <Link
              key={tool.slug}
              href={`/toolkit/${tool.slug}`}
              className="group block p-5 transition-all duration-200"
              style={{
                border: '1px solid var(--border)',
                borderRadius: '4px',
                background: 'var(--background)',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--foreground)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)';
              }}
            >
              <span className="text-2xl mb-3 block" aria-hidden="true">{tool.icon}</span>
              <p
                className="font-display mb-1"
                style={{
                  fontFamily: 'var(--font-newsreader), serif',
                  fontSize: '17px',
                  fontWeight: 400,
                  color: 'var(--foreground)',
                  lineHeight: 1.3,
                }}
              >
                {tool.title}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-work-sans), sans-serif',
                  fontSize: '13px',
                  color: 'var(--muted)',
                  lineHeight: 1.5,
                }}
              >
                {tool.question}
              </p>
              <p
                className="mt-3 text-xs font-semibold"
                style={{
                  fontFamily: 'var(--font-work-sans), sans-serif',
                  color: 'var(--foreground)',
                  letterSpacing: '0.5px',
                }}
              >
                Use free tool →
              </p>
            </Link>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div
          className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-4 rounded"
          style={{ background: 'var(--surface, rgba(0,0,0,0.03))', border: '1px solid var(--border)' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-work-sans), sans-serif',
              fontSize: '14px',
              color: 'var(--muted)',
            }}
          >
            All tools are free, no sign-up required. Built for UK founder-led businesses.
          </p>
          <Link
            href="/toolkit"
            className="inline-flex items-center gap-2 shrink-0"
            style={{
              fontFamily: 'var(--font-work-sans), sans-serif',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--foreground)',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            Explore the full toolkit →
          </Link>
        </div>
      </div>
    </section>
  );
}
