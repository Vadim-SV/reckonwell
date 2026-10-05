import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Industries We Support | Fractional Finance & Accounting | Reckonwell',
  description:
    'Specialist accounting and fractional finance for technology, e-commerce, property, manufacturing and hospitality businesses across London and the UK.',
  alternates: {
    canonical: 'https://reckonwell.com/industries',
  },
  openGraph: {
    title: 'Industries We Support | Fractional Finance & Accounting | Reckonwell',
    description:
      'Specialist accounting and fractional finance for technology, e-commerce, property, manufacturing and hospitality businesses across London and the UK.',
    url: 'https://reckonwell.com/industries',
    type: 'website',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'Reckonwell – Industry-specialist accounting and fractional finance',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Industries We Support | Fractional Finance & Accounting | Reckonwell',
    description:
      'Specialist accounting and fractional finance for technology, e-commerce, property, manufacturing and hospitality businesses across London and the UK.',
    images: ['/assets/images/app_logo.png'],
  },
};

const industries = [
  {
    name: 'Technology & SaaS',
    slug: 'technology',
    summary:
      'Fractional finance for UK tech and SaaS businesses: deferred revenue, burn rate, SaaS metrics, R&D tax relief and investor-ready reporting from a qualified team.',
  },
  {
    name: 'E-Commerce',
    slug: 'ecommerce',
    summary:
      'Accounting for UK e-commerce brands: Shopify, Amazon and marketplace payout reconciliation, stock valuation, VAT and daily cash visibility across every channel.',
  },
  {
    name: 'Property',
    slug: 'property',
    summary:
      'Accounting for property businesses and SPV limited companies: rental income, mortgage interest, portfolio cash flow and Making Tax Digital compliance.',
  },
  {
    name: 'Manufacturing',
    slug: 'manufacturing',
    summary:
      'Finance support for UK manufacturers: stock control, product costing, margins, working capital, capital allowances and R&D relief for process improvements.',
  },
  {
    name: 'Hospitality',
    slug: 'hospitality',
    summary:
      'Accounting for London restaurants, bars and cafés: daily takings, supplier costs, payroll, tips, VAT and cash flow, checked every day.',
  },
];

const collectionPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Industries We Support | Fractional Finance & Accounting | Reckonwell',
  description:
    'Specialist accounting and fractional finance for technology, e-commerce, property, manufacturing and hospitality businesses across London and the UK.',
  url: 'https://reckonwell.com/industries',
  provider: {
    '@type': 'AccountingService',
    name: 'Reckonwell',
    url: 'https://reckonwell.com',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reckonwell.com' },
    { '@type': 'ListItem', position: 2, name: 'Industries', item: 'https://reckonwell.com/industries' },
  ],
};

export default function IndustriesHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main style={{ backgroundColor: 'var(--background)' }}>
        {/* Hero */}
        <section className="pt-32 pb-16 px-6 md:px-16" style={{ backgroundColor: 'var(--background)' }}>
          <div className="max-w-5xl mx-auto">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 font-ui text-xs tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
                <li><Link href="/" style={{ color: 'var(--muted)' }}>Home</Link></li>
                <li aria-hidden="true" style={{ color: 'var(--muted)' }}>›</li>
                <li style={{ color: 'var(--foreground)' }}>Industries</li>
              </ol>
            </nav>

            <h1
              className="font-serif leading-tight mb-6"
              style={{ color: '#0d1b2e', fontSize: 'clamp(36px, 5vw, 64px)' }}
            >
              Finance support shaped around how your business operates
            </h1>

            <p
              className="font-body text-lg leading-relaxed mb-10"
              style={{ color: 'var(--muted)', maxWidth: '720px' }}
            >
              Every industry has its own financial pressures, reporting requirements and seasonal rhythms. A restaurant needs daily reconciliation of takings and tight control of food costs. A SaaS business needs deferred revenue handled correctly and burn rate tracked in real time. A property SPV needs its director&apos;s loan accounts kept clean and its annual accounts filed on time. Generic accounting misses these details. Reckonwell&apos;s fractional finance department is built around your sector, not a one-size-fits-all template. We bring daily oversight, qualified sign-off and sector-specific expertise to founder-led businesses across London and the UK. Below you will find the industries we work with most closely, along with the specific finance problems we help solve in each one.
            </p>

            <Link
              href="/book"
              className="font-ui text-xs tracking-widest uppercase inline-block"
              style={{
                padding: '14px 32px',
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)',
                border: '1px solid var(--primary)',
                borderRadius: '2px',
                letterSpacing: '2px',
                fontWeight: 600,
              }}
            >
              Book a discovery call
            </Link>
          </div>
        </section>

        {/* Industry Cards */}
        <section className="py-16 px-6 md:px-16" style={{ backgroundColor: 'var(--background)' }}>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industries.map((industry) => (
                <div
                  key={industry.slug}
                  className="bg-white border border-gray-200 p-8 flex flex-col gap-4"
                >
                  <h2
                    className="font-serif text-2xl"
                    style={{ color: '#0d1b2e' }}
                  >
                    {industry.name}
                  </h2>
                  <p
                    className="font-body text-sm leading-relaxed flex-1"
                    style={{ color: '#2a7c8a' }}
                  >
                    {industry.summary}
                  </p>
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="font-ui text-xs tracking-widest uppercase inline-block mt-2"
                    style={{
                      color: 'var(--primary)',
                      letterSpacing: '2px',
                      fontWeight: 600,
                      textDecoration: 'underline',
                      textUnderlineOffset: '4px',
                    }}
                  >
                    Learn more →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section
          className="py-20 px-6 md:px-16 text-center"
          style={{ backgroundColor: '#0d1b2e' }}
        >
          <div className="max-w-2xl mx-auto">
            <h2
              className="font-serif text-3xl md:text-4xl mb-6"
              style={{ color: '#f5f0e8' }}
            >
              Tell us about your business
            </h2>
            <p
              className="font-body text-base leading-relaxed mb-8"
              style={{ color: '#B8B8B8' }}
            >
              Book a free discovery call and we&apos;ll explain exactly how Reckonwell&apos;s fractional finance department works for your sector.
            </p>
            <Link
              href="/book"
              className="font-ui text-xs tracking-widest uppercase inline-block"
              style={{
                padding: '14px 32px',
                backgroundColor: '#D69AAB',
                color: '#0d1b2e',
                border: '1px solid #D69AAB',
                borderRadius: '2px',
                letterSpacing: '2px',
                fontWeight: 600,
              }}
            >
              Book a discovery call
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
