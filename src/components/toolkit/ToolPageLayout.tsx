'use client';

import React from 'react';
import Link from 'next/link';
import { TAX_YEAR, TAX_YEAR_REVIEWED } from '@/lib/tax-config';

interface ToolPageLayoutProps {
  children: React.ReactNode;
  toolSlug: string;
  toolTitle: string;
  breadcrumbs?: { label: string; href: string }[];
  relatedTools?: { slug: string; title: string; question: string; icon: string }[];
  faqs?: { q: string; a: string }[];
  sources?: { label: string; href: string }[];
  disclaimer?: string;
  jsonLd?: object;
}

export default function ToolPageLayout({
  children,
  toolSlug,
  toolTitle,
  breadcrumbs = [],
  relatedTools = [],
  faqs = [],
  sources = [],
  disclaimer,
  jsonLd,
}: ToolPageLayoutProps) {
  const allBreadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Toolkit', href: '/toolkit' },
    ...breadcrumbs,
    { label: toolTitle, href: `/toolkit/${toolSlug}` },
  ];

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="px-5 md:px-10 pt-24 pb-2 max-w-7xl mx-auto">
        <ol className="flex flex-wrap items-center gap-1 text-xs font-ui" style={{ color: 'var(--muted)' }}>
          {allBreadcrumbs.map((crumb, i) => (
            <li key={crumb.href} className="flex items-center gap-1">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i < allBreadcrumbs.length - 1 ? (
                <Link href={crumb.href} style={{ color: 'var(--muted)', textDecoration: 'none' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
                >
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current="page" style={{ color: 'var(--foreground)' }}>{crumb.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-5 md:px-10 pb-20">
        {children}

        {/* Tax year notice */}
        <p className="text-xs mt-8 mb-2 font-ui" style={{ color: 'var(--muted)' }}>
          Rules for tax year {TAX_YEAR} — last reviewed {TAX_YEAR_REVIEWED}
        </p>

        {/* Disclaimer */}
        {disclaimer && (
          <div className="mt-4 p-4 rounded-lg border text-sm" style={{ borderColor: 'var(--border)', color: 'var(--muted)', background: 'var(--muted-background, rgba(0,0,0,0.02))' }}>
            <strong>Disclaimer:</strong> {disclaimer}
          </div>
        )}

        {/* FAQs */}
        {faqs.length > 0 && (
          <section className="mt-16" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="font-display text-2xl mb-6" style={{ color: 'var(--foreground)' }}>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="border rounded-lg p-4" style={{ borderColor: 'var(--border)' }}>
                  <summary className="font-semibold cursor-pointer text-sm" style={{ color: 'var(--foreground)' }}>
                    {faq.q}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{faq.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Sources */}
        {sources.length > 0 && (
          <section className="mt-12" aria-labelledby="sources-heading">
            <h2 id="sources-heading" className="font-display text-xl mb-4" style={{ color: 'var(--foreground)' }}>
              Sources
            </h2>
            <ul className="space-y-1">
              {sources.map((src, i) => (
                <li key={i}>
                  <a
                    href={src.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm"
                    style={{ color: 'var(--primary)' }}
                  >
                    {src.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Author box */}
        <div className="mt-12 p-5 rounded-lg border flex items-start gap-4" style={{ borderColor: 'var(--border)' }}>
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <img src="/assets/images/Vadim-1779496555261.jpg" alt="Vadim Siubaev, Founder of Reckonwell" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
              Built and reviewed by{' '}
              <Link href="/about" style={{ color: 'var(--primary)' }}>Vadim Siubaev, FIAB, MSc</Link>
            </p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Founder, Reckonwell — Fractional CFO &amp; Bookkeeping for Founder-Led Businesses</p>
          </div>
        </div>

        {/* Related tools */}
        {relatedTools.length > 0 && (
          <section className="mt-12" aria-labelledby="related-heading">
            <h2 id="related-heading" className="font-display text-xl mb-4" style={{ color: 'var(--foreground)' }}>
              Related Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {relatedTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/toolkit/${tool.slug}`}
                  className="p-4 rounded-lg border transition-all block"
                  style={{ borderColor: 'var(--border)', textDecoration: 'none' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--primary)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)'; }}
                >
                  <span className="text-2xl">{tool.icon}</span>
                  <p className="font-semibold text-sm mt-2" style={{ color: 'var(--foreground)' }}>{tool.title}</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{tool.question}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="mt-12 p-8 rounded-lg text-center" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}>
          <h3 className="font-display text-xl mb-2">Want a personalised analysis?</h3>
          <p className="text-sm mb-4 opacity-90">These tools give you a solid estimate. For advice tailored to your exact situation, book a free call with Vadim.</p>
          <Link
            href="/book"
            className="inline-block px-6 py-3 rounded font-semibold text-sm transition-all"
            style={{ background: 'var(--primary-foreground)', color: 'var(--primary)' }}
          >
            Book a free call →
          </Link>
        </div>
      </main>
    </>
  );
}
