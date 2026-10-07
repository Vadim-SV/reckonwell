import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CLAIM_ITEMS } from '@/lib/toolkit-data';
import { TAX_YEAR, TAX_YEAR_REVIEWED } from '@/lib/tax-config';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CLAIM_ITEMS.map(item => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = CLAIM_ITEMS.find(i => i.slug === slug);
  if (!item) return {};
  return {
    title: `Can I Claim ${item.name} as a Business Expense? (UK ${TAX_YEAR}) | Reckonwell`,
    description: `${item.shortAnswer === 'yes' ? 'Yes' : item.shortAnswer === 'no' ? 'No' : 'Partly'} — ${item.soleTraderAnswer.slice(0, 120)}. Free guide for ${TAX_YEAR}.`,
    alternates: { canonical: `https://reckonwell.com/toolkit/can-i-claim/${slug}` },
  };
}

const answerBadge = (answer: 'yes' | 'no' | 'partly') => {
  const config = {
    yes: { label: 'Yes', bg: '#2D6A4F', color: '#fff' },
    no: { label: 'No', bg: '#b43232', color: '#fff' },
    partly: { label: 'Partly', bg: '#C9A84C', color: '#fff' },
  };
  return config[answer];
};

export default async function CanIClaimPage({ params }: Props) {
  const { slug } = await params;
  const item = CLAIM_ITEMS.find(i => i.slug === slug);
  if (!item) notFound();

  const badge = answerBadge(item.shortAnswer);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Can I Claim ${item.name} as a Business Expense? (UK ${TAX_YEAR})`,
    description: item.soleTraderAnswer,
    url: `https://reckonwell.com/toolkit/can-i-claim/${slug}`,
    author: { '@type': 'Person', name: 'Vadim Siubaev' },
    publisher: { '@type': 'Organization', name: 'Reckonwell', url: 'https://reckonwell.com' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="max-w-3xl mx-auto px-5 md:px-10 pb-20">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="pt-24 pb-4">
          <ol className="flex flex-wrap items-center gap-1 text-xs font-ui" style={{ color: 'var(--muted)' }}>
            <li><Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Home</Link></li>
            <li>/</li>
            <li><Link href="/toolkit" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Toolkit</Link></li>
            <li>/</li>
            <li><Link href="/toolkit/allowable-expenses-finder" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Expenses Finder</Link></li>
            <li>/</li>
            <li aria-current="page" style={{ color: 'var(--foreground)' }}>{item.name}</li>
          </ol>
        </nav>

        <h1 className="font-display text-3xl md:text-4xl mb-4 leading-tight" style={{ color: 'var(--foreground)' }}>
          Can I Claim {item.name} as a Business Expense? (UK {TAX_YEAR})
        </h1>

        {/* Direct answer */}
        <div className="flex items-center gap-3 mb-6">
          <span className="px-4 py-2 rounded-full font-semibold text-sm" style={{ background: badge.bg, color: badge.color }}>
            {badge.label}
          </span>
          <p className="text-base font-medium" style={{ color: 'var(--foreground)' }}>
            {item.shortAnswer === 'yes' ? `${item.name} is generally allowable as a business expense.` :
             item.shortAnswer === 'no' ? `${item.name} is generally not allowable as a business expense.` :
             `${item.name} is partly allowable — it depends on your circumstances.`}
          </p>
        </div>

        {/* Sole trader answer */}
        <section className="mb-6">
          <h2 className="font-display text-xl mb-2" style={{ color: 'var(--foreground)' }}>Sole traders</h2>
          <p className="text-base leading-relaxed" style={{ color: 'var(--muted)' }}>{item.soleTraderAnswer}</p>
        </section>

        {/* Limited company answer */}
        <section className="mb-6">
          <h2 className="font-display text-xl mb-2" style={{ color: 'var(--foreground)' }}>Limited company directors</h2>
          <p className="text-base leading-relaxed mb-2" style={{ color: 'var(--muted)' }}>{item.limitedCompanyAnswer}</p>
          {item.bikNote && (
            <div className="p-3 rounded border text-sm" style={{ borderColor: '#C9A84C', background: 'rgba(201,168,76,0.06)', color: 'var(--foreground)' }}>
              <strong>Benefit-in-kind note:</strong> {item.bikNote}
            </div>
          )}
        </section>

        {/* Examples */}
        {item.examples.length > 0 && (
          <section className="mb-6">
            <h2 className="font-display text-xl mb-2" style={{ color: 'var(--foreground)' }}>Examples</h2>
            <ul className="space-y-1">
              {item.examples.map((ex, i) => (
                <li key={i} className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                  <span style={{ color: 'var(--primary)', flexShrink: 0 }}>→</span>
                  {ex}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Common mistakes */}
        {item.commonMistakes.length > 0 && (
          <section className="mb-6">
            <h2 className="font-display text-xl mb-2" style={{ color: 'var(--foreground)' }}>Common mistakes</h2>
            <ul className="space-y-1">
              {item.commonMistakes.map((m, i) => (
                <li key={i} className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                  <span style={{ color: '#b43232', flexShrink: 0 }}>✗</span>
                  {m}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* FAQs */}
        {item.faqs.length > 0 && (
          <section className="mb-8">
            <h2 className="font-display text-xl mb-4" style={{ color: 'var(--foreground)' }}>FAQs</h2>
            <div className="space-y-3">
              {item.faqs.map((faq, i) => (
                <details key={i} className="border rounded-lg p-4" style={{ borderColor: 'var(--border)' }}>
                  <summary className="font-semibold cursor-pointer text-sm" style={{ color: 'var(--foreground)' }}>{faq.q}</summary>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{faq.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        <p className="text-xs mb-4 font-ui" style={{ color: 'var(--muted)' }}>
          Rules for tax year {TAX_YEAR} — last reviewed {TAX_YEAR_REVIEWED}
        </p>

        <div className="p-4 rounded-lg border text-sm mb-8" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
          <strong>Disclaimer:</strong> Estimates for guidance only — not tax advice. Allowability depends on your specific circumstances. Consult a qualified tax adviser before making claims.
        </div>

        <div className="flex gap-3 flex-wrap">
          <Link
            href="/toolkit/allowable-expenses-finder"
            className="px-4 py-2 rounded font-ui text-xs uppercase tracking-widest"
            style={{ border: '1px solid var(--border)', color: 'var(--muted)', textDecoration: 'none', letterSpacing: '1.5px' }}
          >
            ← Back to Expenses Finder
          </Link>
          <Link
            href="/book"
            className="px-4 py-2 rounded font-ui text-xs uppercase tracking-widest"
            style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', textDecoration: 'none', letterSpacing: '1.5px' }}
          >
            Book a free call →
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
