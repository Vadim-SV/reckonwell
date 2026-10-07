import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { TOOLS } from '@/lib/toolkit-data';
import { TAX_YEAR } from '@/lib/tax-config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToolkitHubClient from './ToolkitHubClient';

export const metadata: Metadata = {
  title: `Free Finance Tools for Small Business UK | Reckonwell`,
  description: `Free founder finance toolkit — salary vs dividend, corporation tax, VAT, expenses and more. No sign-up. Built for UK founder-led businesses. ${TAX_YEAR}.`,
  alternates: { canonical: 'https://reckonwell.com/toolkit' },
  openGraph: {
    title: 'Free Founder Finance Toolkit | Reckonwell',
    description: `8 free finance calculators for UK founders. No sign-up. ${TAX_YEAR}.`,
    url: 'https://reckonwell.com/toolkit',
    images: [{ url: '/api/og/toolkit', width: 1200, height: 630, alt: 'Free Founder Finance Toolkit — Reckonwell' }],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Free Founder Finance Toolkit',
  description: `8 free finance calculators for UK founder-led businesses. ${TAX_YEAR}.`,
  url: 'https://reckonwell.com/toolkit',
  publisher: {
    '@type': 'Organization',
    name: 'Reckonwell',
    url: 'https://reckonwell.com',
    logo: { '@type': 'ImageObject', url: 'https://reckonwell.com/assets/images/Reckonwell-1779490857835.png' },
  },
};

export default function ToolkitHubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-28 pb-16 px-5 md:px-10" style={{ background: 'var(--background)' }}>
          <div className="max-w-7xl mx-auto">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-1 text-xs font-ui" style={{ color: 'var(--muted)' }}>
                <li><Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Home</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" style={{ color: 'var(--foreground)' }}>Toolkit</li>
              </ol>
            </nav>

            <p className="font-ui text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--primary)', letterSpacing: '2px' }}>
              Free Founder Finance Toolkit
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight" style={{ color: 'var(--foreground)' }}>
              Free finance tools<br />for founder-led businesses
            </h1>
            <p className="text-lg max-w-2xl leading-relaxed mb-8" style={{ color: 'var(--muted)' }}>
              Eight free calculators built for UK founders running businesses between £500k and £3M turnover. No sign-up, no email gate. Every tool answers one specific question about your finances.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-ui" style={{ background: 'rgba(0,0,0,0.05)', color: 'var(--muted)' }}>
                Tax year {TAX_YEAR}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-ui" style={{ background: 'rgba(0,0,0,0.05)', color: 'var(--muted)' }}>
                No sign-up required
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-ui" style={{ background: 'rgba(0,0,0,0.05)', color: 'var(--muted)' }}>
                Free forever
              </span>
            </div>
          </div>
        </section>

        {/* Tool Cards Grid */}
        <section className="px-5 md:px-10 pb-20" style={{ background: 'var(--background)' }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {TOOLS.map((tool) => (
                <article
                  key={tool.slug}
                  className="flex flex-col rounded-lg border p-5 transition-all"
                  style={{ borderColor: 'var(--border)', background: 'var(--background)' }}
                >
                  <div className="text-3xl mb-3" aria-hidden="true">{tool.icon}</div>
                  <h2 className="font-display text-lg mb-2 leading-snug" style={{ color: 'var(--foreground)' }}>
                    {tool.title}
                  </h2>
                  <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: 'var(--muted)' }}>
                    {tool.question}
                  </p>
                  <Link
                    href={`/toolkit/${tool.slug}`}
                    className="inline-block text-center py-2.5 px-4 rounded font-ui text-xs font-semibold uppercase tracking-widest transition-all"
                    style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', textDecoration: 'none', letterSpacing: '1.5px' }}
                  >
                    Use free tool →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Share section — client component */}
        <ToolkitHubClient tools={TOOLS} />

        {/* CTA */}
        <section className="px-5 md:px-10 py-16 text-center" style={{ background: 'var(--background)' }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-3xl mb-4" style={{ color: 'var(--foreground)' }}>
              Want a personalised analysis?
            </h2>
            <p className="text-base mb-6 leading-relaxed" style={{ color: 'var(--muted)' }}>
              These tools give you a solid estimate. For advice tailored to your exact situation — and a finance function that stays close to your numbers — book a free call with Vadim.
            </p>
            <Link
              href="/book"
              className="inline-block px-8 py-4 rounded font-ui font-semibold text-sm uppercase tracking-widest transition-all"
              style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', textDecoration: 'none', letterSpacing: '2px' }}
            >
              Book a free call →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
