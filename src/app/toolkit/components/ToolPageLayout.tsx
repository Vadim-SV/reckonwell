import React from 'react';
import Link from 'next/link';
import { TOOLKIT_META } from '@/lib/tax-config';

interface ToolPageLayoutProps {
  children: React.ReactNode;
  breadcrumbs: Array<{ label: string; href?: string }>;
  relatedTools?: Array<{ slug: string; title: string; question: string }>;
}

export default function ToolPageLayout({ children, breadcrumbs, relatedTools }: ToolPageLayoutProps) {
  return (
    <div style={{ background: 'var(--background)', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-5 md:px-10 pt-24 md:pt-28 pb-2">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 font-ui text-xs" style={{ color: 'var(--muted)', fontSize: '11px', letterSpacing: '0.5px' }}>
            <li><Link href="/" style={{ color: 'var(--muted)' }}>Home</Link></li>
            <li style={{ color: 'var(--border)' }}>›</li>
            <li><Link href="/toolkit" style={{ color: 'var(--muted)' }}>Toolkit</Link></li>
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={i}>
                <li style={{ color: 'var(--border)' }}>›</li>
                <li>
                  {crumb.href ? (
                    <Link href={crumb.href} style={{ color: 'var(--muted)' }}>{crumb.label}</Link>
                  ) : (
                    <span style={{ color: 'var(--body-text)' }}>{crumb.label}</span>
                  )}
                </li>
              </React.Fragment>
            ))}
          </ol>
        </nav>
      </div>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-5 md:px-10 pb-16">
        {children}
      </main>

      {/* Tax year notice */}
      <div className="max-w-4xl mx-auto px-5 md:px-10 pb-4">
        <p className="font-ui text-xs" style={{ color: 'var(--muted)', fontSize: '11px' }}>
          Rules for tax year {TOOLKIT_META.taxYear} — last reviewed {TOOLKIT_META.lastReviewed}
        </p>
      </div>

      {/* Related tools */}
      {relatedTools && relatedTools.length > 0 && (
        <div className="max-w-4xl mx-auto px-5 md:px-10 pb-16">
          <h2 className="font-display text-xl mb-6" style={{ color: 'var(--foreground)', fontWeight: 400 }}>Related tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/toolkit/${tool.slug}`}
                className="block p-4 transition-all duration-200"
                style={{ border: '1px solid var(--border)', borderRadius: '2px', background: 'var(--surface)' }}
              >
                <p className="font-display text-base mb-1" style={{ color: 'var(--foreground)', fontWeight: 400 }}>{tool.title}</p>
                <p className="font-ui text-xs" style={{ color: 'var(--muted)', lineHeight: 1.5 }}>{tool.question}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Author box */}
      <div className="max-w-4xl mx-auto px-5 md:px-10 pb-8">
        <div className="p-5" style={{ border: '1px solid var(--border)', borderRadius: '2px', background: 'var(--surface)' }}>
          <p className="font-ui text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--muted)', fontSize: '10px', letterSpacing: '2px' }}>Built and reviewed by</p>
          <Link href={TOOLKIT_META.authorUrl} className="font-display text-base" style={{ color: 'var(--foreground)', fontWeight: 500 }}>
            {TOOLKIT_META.author}
          </Link>
          <p className="font-ui text-xs mt-1" style={{ color: 'var(--muted)' }}>{TOOLKIT_META.authorTitle}</p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="max-w-4xl mx-auto px-5 md:px-10 pb-16">
        <p className="font-ui text-xs" style={{ color: 'var(--muted)', lineHeight: 1.6, fontSize: '11px' }}>
          <strong>Disclaimer:</strong> {TOOLKIT_META.disclaimer}
        </p>
      </div>
    </div>
  );
}
