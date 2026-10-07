import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { TOOLKIT_TOOLS } from '@/lib/toolkit-share';
import { TOOLKIT_META, TAX_YEAR } from '@/lib/tax-config';

export const metadata: Metadata = {
  title: 'Free Finance Tools for Small Business UK | Reckonwell',
  description: 'Free founder finance toolkit — 8 calculators covering salary vs dividend, corporation tax, VAT, working capital, and more. No sign-up, no email gate.',
  alternates: { canonical: 'https://reckonwell.com/toolkit' },
  openGraph: {
    title: 'Free Founder Finance Toolkit | Reckonwell',
    description: 'Free finance calculators for UK founders and owner-managed businesses. No sign-up required.',
    url: 'https://reckonwell.com/toolkit',
    type: 'website',
  },
};

const toolkitSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Free Founder Finance Toolkit',
  description: 'Free finance calculators and tools for UK founders and owner-managed businesses',
  url: 'https://reckonwell.com/toolkit',
  numberOfItems: TOOLKIT_TOOLS.length,
  itemListElement: TOOLKIT_TOOLS.map((tool, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: tool.title,
    url: `https://reckonwell.com/toolkit/${tool.slug}`,
    description: tool.description,
  })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reckonwell.com' },
    { '@type': 'ListItem', position: 2, name: 'Free Finance Toolkit', item: 'https://reckonwell.com/toolkit' },
  ],
};

export default function ToolkitHubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolkitSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <div style={{ background: 'var(--background)', minHeight: '100vh' }}>
        {/* Hero */}
        <section className="pt-28 md:pt-36 pb-16 md:pb-20 px-5 md:px-10">
          <div className="max-w-5xl mx-auto">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-1 font-ui text-xs" style={{ color: 'var(--muted)', fontSize: '11px' }}>
                <li><Link href="/" style={{ color: 'var(--muted)' }}>Home</Link></li>
                <li style={{ color: 'var(--border)' }}>›</li>
                <li><span style={{ color: 'var(--body-text)' }}>Free Finance Toolkit</span></li>
              </ol>
            </nav>

            <p className="font-ui text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--primary)', fontSize: '10px', letterSpacing: '4px' }}>
              Free tools · No sign-up
            </p>
            <h1 className="font-display mb-6" style={{ fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 1.05, fontWeight: 400, color: 'var(--foreground)', letterSpacing: '-0.02em' }}>
              Free Founder Finance Toolkit
            </h1>
            <p className="font-ui mb-8" style={{ fontSize: '18px', lineHeight: 1.7, color: 'var(--muted)', maxWidth: '600px' }}>
              Eight free calculators and checkers for UK founders and owner-managed businesses. Built for {TAX_YEAR}. No sign-up, no email gate — just answers.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/book"
                className="font-ui text-xs uppercase tracking-widest px-6 py-3 transition-all duration-200"
                style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', borderRadius: '2px', fontSize: '11px', letterSpacing: '2px', fontWeight: 600, minHeight: '48px', display: 'inline-flex', alignItems: 'center' }}
              >
                Book a free call
              </Link>
              <a
                href="#tools"
                className="font-ui text-xs uppercase tracking-widest px-6 py-3 transition-all duration-200"
                style={{ border: '1px solid var(--border)', color: 'var(--muted)', borderRadius: '2px', fontSize: '11px', letterSpacing: '2px', minHeight: '48px', display: 'inline-flex', alignItems: 'center' }}
              >
                Browse tools ↓
              </a>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section id="tools" className="px-5 md:px-10 pb-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl mb-10" style={{ fontWeight: 400, color: 'var(--foreground)' }}>
              All 8 tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TOOLKIT_TOOLS.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/toolkit/${tool.slug}`}
                  className="group block p-6 transition-all duration-300"
                  style={{ border: '1px solid var(--border)', borderRadius: '2px', background: 'var(--surface)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--primary)'; (e.currentTarget as HTMLAnchorElement).style.background = 'var(--card)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLAnchorElement).style.background = 'var(--surface)'; }}
                >
                  <div className="flex items-start gap-4">
                    <span style={{ fontSize: '28px', lineHeight: 1, flexShrink: 0 }} aria-hidden="true">{tool.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-ui text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--muted)', fontSize: '10px', letterSpacing: '2px' }}>
                        {tool.question}
                      </p>
                      <h3 className="font-display text-xl mb-2" style={{ fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.2 }}>
                        {tool.title}
                      </h3>
                      <p className="font-ui text-sm mb-4" style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
                        {tool.description}
                      </p>
                      <span
                        className="font-ui text-xs uppercase tracking-widest"
                        style={{ color: 'var(--primary)', fontSize: '10px', letterSpacing: '2px', fontWeight: 600 }}
                      >
                        Use free tool →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Share the Toolkit */}
        <section className="px-5 md:px-10 pb-20">
          <div className="max-w-5xl mx-auto">
            <div className="p-8 md:p-12" style={{ background: 'var(--primary)', borderRadius: '2px' }}>
              <p className="font-ui text-xs uppercase tracking-widest mb-4" style={{ color: 'rgba(251,241,227,0.6)', fontSize: '10px', letterSpacing: '4px' }}>
                Share the toolkit
              </p>
              <h2 className="font-display text-2xl md:text-3xl mb-4" style={{ fontWeight: 400, color: 'var(--primary-foreground)', lineHeight: 1.2 }}>
                Know a founder who'd find this useful?
              </h2>
              <p className="font-ui mb-8" style={{ color: 'rgba(251,241,227,0.75)', lineHeight: 1.7, maxWidth: '520px' }}>
                Share the whole toolkit — no sign-up required for anyone you send it to. Every tool is free, forever.
              </p>

              <div className="mb-6 p-4" style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '2px', border: '1px solid rgba(255,255,255,0.15)' }}>
                <p className="font-ui text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(251,241,227,0.5)', fontSize: '10px', letterSpacing: '2px' }}>
                  Copy this for emails, newsletters, community posts
                </p>
                <p className="font-ui text-sm" style={{ color: 'var(--primary-foreground)', lineHeight: 1.7 }}>
                  Reckonwell has a free finance toolkit for UK founders — 8 calculators covering salary vs dividend, corporation tax, VAT, working capital, and more. No sign-up needed: reckonwell.com/toolkit
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://reckonwell.com/toolkit?utm_source=linkedin&utm_medium=share&utm_campaign=toolkit')}` },
                  { label: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent('Free finance toolkit for UK founders — 8 calculators, no sign-up: https://reckonwell.com/toolkit?utm_source=whatsapp&utm_medium=share&utm_campaign=toolkit')}` },
                  { label: 'X', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent('Free finance toolkit for UK founders — 8 calculators, no sign-up needed')}&url=${encodeURIComponent('https://reckonwell.com/toolkit?utm_source=x-twitter&utm_medium=share&utm_campaign=toolkit')}` },
                  { label: 'Email', href: `mailto:?subject=${encodeURIComponent('Free finance toolkit for UK founders')}&body=${encodeURIComponent('Reckonwell has a free finance toolkit for UK founders — 8 calculators covering salary vs dividend, corporation tax, VAT, working capital, and more. No sign-up needed:\n\nhttps://reckonwell.com/toolkit?utm_source=email&utm_medium=share&utm_campaign=toolkit')}` },
                ].map((btn) => (
                  <a
                    key={btn.label}
                    href={btn.href}
                    target={btn.label !== 'Email' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="font-ui text-xs uppercase tracking-widest px-4 py-2 transition-all duration-200"
                    style={{ border: '1px solid rgba(255,255,255,0.3)', color: 'var(--primary-foreground)', borderRadius: '2px', fontSize: '10px', letterSpacing: '2px', minHeight: '40px', display: 'inline-flex', alignItems: 'center' }}
                  >
                    {btn.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About section */}
        <section className="px-5 md:px-10 pb-20">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                <p className="font-ui text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--primary)', fontSize: '10px', letterSpacing: '4px' }}>
                  Why free?
                </p>
                <h2 className="font-display text-2xl md:text-3xl mb-6" style={{ fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.2 }}>
                  Founders deserve clear answers, not paywalls
                </h2>
                <p className="font-ui mb-4" style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
                  At Reckonwell, we work with founder-led businesses turning £500k–£3m. The questions these tools answer come up in every discovery call. We built them so you can get an answer now, not after a sales process.
                </p>
                <p className="font-ui mb-6" style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
                  All calculations use {TAX_YEAR} rates. Nothing is hard-coded — every figure comes from GOV.UK guidance.
                </p>
                <Link
                  href="/book"
                  className="font-ui text-xs uppercase tracking-widest px-6 py-3 inline-flex items-center transition-all duration-200"
                  style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', borderRadius: '2px', fontSize: '11px', letterSpacing: '2px', fontWeight: 600, minHeight: '48px' }}
                >
                  Book a free discovery call →
                </Link>
              </div>
              <div>
                <p className="font-ui text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--muted)', fontSize: '10px', letterSpacing: '2px' }}>
                  Built and reviewed by
                </p>
                <p className="font-display text-xl mb-1" style={{ fontWeight: 500, color: 'var(--foreground)' }}>
                  {TOOLKIT_META.author}
                </p>
                <p className="font-ui text-sm mb-4" style={{ color: 'var(--muted)' }}>{TOOLKIT_META.authorTitle}</p>
                <p className="font-ui text-sm" style={{ color: 'var(--muted)', lineHeight: 1.7, fontSize: '12px' }}>
                  {TOOLKIT_META.disclaimer}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10 pb-8">
          <p className="font-ui text-xs" style={{ color: 'var(--muted)', fontSize: '11px' }}>
            Rules for tax year {TAX_YEAR} — last reviewed {TOOLKIT_META.lastReviewed}
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
