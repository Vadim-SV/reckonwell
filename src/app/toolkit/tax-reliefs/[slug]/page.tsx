import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { TAX_RELIEFS } from '@/lib/toolkit-data';
import { TAX_YEAR, TAX_YEAR_REVIEWED } from '@/lib/tax-config';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TAX_RELIEFS.map(r => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const relief = TAX_RELIEFS.find(r => r.slug === slug);
  if (!relief) return {};
  return {
    title: `${relief.shortName}: Am I Eligible? (${TAX_YEAR}) | Reckonwell`,
    description: `${relief.description} Free eligibility guide for ${TAX_YEAR}. No sign-up.`,
    alternates: { canonical: `https://reckonwell.com/toolkit/tax-reliefs/${slug}` },
  };
}

export default async function TaxReliefChildPage({ params }: Props) {
  const { slug } = await params;
  const relief = TAX_RELIEFS.find(r => r.slug === slug);
  if (!relief) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${relief.name}: Am I Eligible? (${TAX_YEAR})`,
    description: relief.description,
    url: `https://reckonwell.com/toolkit/tax-reliefs/${slug}`,
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
            <li><Link href="/toolkit/tax-relief-finder" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Tax Relief Finder</Link></li>
            <li>/</li>
            <li aria-current="page" style={{ color: 'var(--foreground)' }}>{relief.shortName}</li>
          </ol>
        </nav>

        <h1 className="font-display text-3xl md:text-4xl mb-4 leading-tight" style={{ color: 'var(--foreground)' }}>
          {relief.name}: Am I Eligible? ({TAX_YEAR})
        </h1>

        {/* Quick answer box */}
        <div className="p-5 rounded-lg border mb-8" style={{ borderColor: 'var(--primary)', background: 'rgba(var(--primary-rgb, 24,33,62),0.04)' }}>
          <p className="font-ui text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--primary)', letterSpacing: '1.5px' }}>Quick answer</p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>{relief.description}</p>
          <p className="text-sm mt-2 font-semibold" style={{ color: 'var(--foreground)' }}>Rate: {relief.rateDescription}</p>
        </div>

        {/* What it is */}
        <section className="mb-8">
          <h2 className="font-display text-2xl mb-3" style={{ color: 'var(--foreground)' }}>What is {relief.shortName}?</h2>
          <p className="text-base leading-relaxed" style={{ color: 'var(--muted)' }}>{relief.description}</p>
        </section>

        {/* Who qualifies */}
        <section className="mb-8">
          <h2 className="font-display text-2xl mb-3" style={{ color: 'var(--foreground)' }}>Who qualifies?</h2>
          <ul className="space-y-2">
            {relief.eligibilityRules.map((rule, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                <span style={{ color: 'var(--primary)', flexShrink: 0 }}>✓</span>
                {rule}
              </li>
            ))}
          </ul>
          <p className="text-sm mt-3" style={{ color: 'var(--muted)' }}>
            <strong>Applicable structures:</strong> {relief.structures.map(s => s.replace(/-/g, ' ')).join(', ')}
          </p>
        </section>

        {/* How to claim */}
        <section className="mb-8">
          <h2 className="font-display text-2xl mb-3" style={{ color: 'var(--foreground)' }}>How to claim</h2>
          <p className="text-base leading-relaxed mb-2" style={{ color: 'var(--muted)' }}>{relief.howToClaim}</p>
          <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Deadline: <span className="font-normal" style={{ color: 'var(--muted)' }}>{relief.claimDeadline}</span></p>
        </section>

        {/* Common mistakes */}
        <section className="mb-8">
          <h2 className="font-display text-2xl mb-3" style={{ color: 'var(--foreground)' }}>Common mistakes</h2>
          <ul className="space-y-2">
            {relief.commonMistakes.map((mistake, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                <span style={{ color: '#b43232', flexShrink: 0 }}>✗</span>
                {mistake}
              </li>
            ))}
          </ul>
        </section>

        {/* FAQs */}
        {relief.faqs.length > 0 && (
          <section className="mb-8">
            <h2 className="font-display text-2xl mb-4" style={{ color: 'var(--foreground)' }}>FAQs</h2>
            <div className="space-y-3">
              {relief.faqs.map((faq, i) => (
                <details key={i} className="border rounded-lg p-4" style={{ borderColor: 'var(--border)' }}>
                  <summary className="font-semibold cursor-pointer text-sm" style={{ color: 'var(--foreground)' }}>{faq.q}</summary>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{faq.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Source */}
        <section className="mb-8">
          <h2 className="font-display text-xl mb-3" style={{ color: 'var(--foreground)' }}>Source</h2>
          <a href={relief.govUkLink} target="_blank" rel="noopener noreferrer" className="text-sm" style={{ color: 'var(--primary)' }}>
            GOV.UK — {relief.name} guidance
          </a>
        </section>

        <p className="text-xs mb-4 font-ui" style={{ color: 'var(--muted)' }}>
          Rules for tax year {TAX_YEAR} — last reviewed {TAX_YEAR_REVIEWED}
        </p>

        <div className="p-4 rounded-lg border text-sm mb-8" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
          <strong>Disclaimer:</strong> Estimates for guidance only — not tax advice. Eligibility depends on your specific circumstances. Consult a qualified tax adviser before making claims.
        </div>

        <div className="flex gap-3 flex-wrap">
          <Link
            href="/toolkit/tax-relief-finder"
            className="px-4 py-2 rounded font-ui text-xs uppercase tracking-widest"
            style={{ border: '1px solid var(--border)', color: 'var(--muted)', textDecoration: 'none', letterSpacing: '1.5px' }}
          >
            ← Back to Tax Relief Finder
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
