import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Property Accountants for Landlords & SPV Companies | Reckonwell',
  description:
    'Accounting for UK property businesses and SPV limited companies: rental income, mortgage interest, portfolio cash flow and Making Tax Digital.',
  alternates: {
    canonical: 'https://reckonwell.com/industries/property',
  },
  openGraph: {
    title: 'Property Accountants for Landlords & SPV Companies | Reckonwell',
    description:
      'Accounting for UK property businesses and SPV limited companies: rental income, mortgage interest, portfolio cash flow and Making Tax Digital.',
    url: 'https://reckonwell.com/industries/property',
    type: 'website',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'Reckonwell – Property accountants for landlords and SPV companies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Property Accountants for Landlords & SPV Companies | Reckonwell',
    description:
      'Accounting for UK property businesses and SPV limited companies: rental income, mortgage interest, portfolio cash flow and Making Tax Digital.',
    images: ['/assets/images/app_logo.png'],
  },
};

const faqs = [
  {
    question: 'Should I buy property through a limited company (SPV)?',
    answer:
      'There are genuine advantages and disadvantages to holding property through a special purpose vehicle (SPV) limited company. Companies pay corporation tax on profits rather than income tax, and the Section 24 mortgage interest restriction — which limits individual landlords to a basic-rate tax credit on finance costs — does not apply to companies. However, extracting profits from a company incurs additional tax, and there are higher mortgage rates and arrangement fees for limited company buy-to-let products. The right answer depends on your personal tax position, the size of your portfolio and your long-term plans. We strongly recommend taking personal tax advice before making this decision.',
  },
  {
    question: 'Does Making Tax Digital for Income Tax apply to landlords?',
    answer:
      'Yes. Making Tax Digital for Income Tax Self Assessment (MTD for ITSA) will apply to landlords with qualifying income above the relevant threshold. From 6 April 2026, it is mandatory for those with qualifying income (including rental income) over £50,000. The threshold drops to £30,000 from April 2027 and to £20,000 from April 2028. Under MTD for ITSA, you will need to keep digital records and submit quarterly updates to HMRC using compatible software, rather than filing a single annual self-assessment return. We help landlords prepare for and comply with these requirements.',
  },
  {
    question: 'What expenses can a property SPV claim?',
    answer:
      'A property SPV can claim expenses that are wholly and exclusively for the purposes of the business. These typically include mortgage interest (in full, unlike individual landlords), letting agent fees, repairs and maintenance (not improvements), buildings and contents insurance, ground rent and service charges, accountancy fees, and any other costs directly related to managing the properties. Capital expenditure on improvements is not immediately deductible but may qualify for capital allowances in certain circumstances. We ensure all allowable expenses are claimed and that capital and revenue items are correctly distinguished.',
  },
  {
    question: 'How do director\'s loans work in a property company?',
    answer:
      'A director\'s loan account records money that a director has lent to or borrowed from their company. In property SPVs, directors often lend money to the company to fund deposits or refurbishments. This creates a creditor on the company\'s balance sheet that can be repaid tax-free. If a director borrows from the company, different rules apply: loans over £10,000 may be treated as a benefit in kind, and loans not repaid within nine months of the company\'s year end trigger a Section 455 tax charge. Keeping the director\'s loan account accurate and up to date is essential for both tax compliance and clean accounts.',
  },
  {
    question: 'What accounts does an SPV file with Companies House and HMRC?',
    answer:
      'A property SPV that is a private limited company must file annual accounts with Companies House and a corporation tax return (CT600) with HMRC each year. The accounts must be prepared in accordance with UK GAAP (typically FRS 102 or FRS 105 for micro-entities) and filed within nine months of the company\'s year end. The CT600 must be filed within 12 months of the accounting period end, and any corporation tax due must be paid within nine months and one day of the year end. We prepare and file both, ensuring the accounts are accurate and all deadlines are met.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Accounting for Property Businesses, Landlords and SPVs',
  description:
    'Accounting for UK property businesses and SPV limited companies: rental income, mortgage interest, portfolio cash flow and Making Tax Digital.',
  provider: {
    '@type': 'AccountingService',
    name: 'Reckonwell',
    url: 'https://reckonwell.com',
  },
  areaServed: { '@type': 'Country', name: 'GB' },
  url: 'https://reckonwell.com/industries/property',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reckonwell.com' },
    { '@type': 'ListItem', position: 2, name: 'Industries', item: 'https://reckonwell.com/industries' },
    { '@type': 'ListItem', position: 3, name: 'Property', item: 'https://reckonwell.com/industries/property' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

export default function PropertyIndustryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main style={{ backgroundColor: 'var(--background)' }}>
        {/* Hero */}
        <section className="pt-32 pb-16 px-6 md:px-16" style={{ backgroundColor: 'var(--background)' }}>
          <div className="max-w-4xl mx-auto">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 font-ui text-xs tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
                <li><Link href="/" style={{ color: 'var(--muted)' }}>Home</Link></li>
                <li aria-hidden="true">›</li>
                <li><Link href="/industries" style={{ color: 'var(--muted)' }}>Industries</Link></li>
                <li aria-hidden="true">›</li>
                <li style={{ color: 'var(--foreground)' }}>Property</li>
              </ol>
            </nav>

            <h1
              className="font-serif leading-tight mb-4"
              style={{ color: '#0d1b2e', fontSize: 'clamp(32px, 5vw, 58px)' }}
            >
              Accounting for property businesses, landlords and SPVs
            </h1>
            <p className="font-body text-lg mb-8" style={{ color: 'var(--muted)' }}>
              Rental income, mortgage interest, portfolio cash flow and Making Tax Digital — handled by a qualified team that understands property finance.
            </p>
            <Link
              href="/book"
              className="font-ui text-xs tracking-widest uppercase inline-block"
              style={{ padding: '14px 32px', backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)', border: '1px solid var(--primary)', borderRadius: '2px', letterSpacing: '2px', fontWeight: 600 }}
            >
              Book a discovery call
            </Link>
          </div>
        </section>

        {/* Pain Points */}
        <section className="py-16 px-6 md:px-16" style={{ backgroundColor: '#f5f0e8' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl mb-8" style={{ color: '#0d1b2e' }}>
              The finance problems property businesses face
            </h2>
            <p className="font-body text-base leading-relaxed mb-8" style={{ color: 'var(--muted)' }}>
              Property investment looks straightforward on paper — buy an asset, collect rent, pay the mortgage. In practice, the accounting and tax obligations are more complex than most landlords expect, and the cost of getting them wrong can be significant.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'SPV set-up and annual accounts',
                  body: 'Setting up a property SPV correctly from the start — with the right share structure, director\'s loan arrangements and accounting policies — saves significant time and cost later. Annual accounts must be prepared and filed correctly, and the accounting treatment for property assets, depreciation and finance costs must be consistent.',
                },
                {
                  title: 'Director\'s loan accounts',
                  body: 'In property SPVs, directors frequently lend money to the company and need to track what is owed to them. If the director\'s loan account is not maintained accurately, it creates problems at year end, potential tax charges and difficulties when refinancing or selling.',
                },
                {
                  title: 'Mortgage interest treatment',
                  body: 'Individual landlords can no longer deduct mortgage interest as an expense — they receive only a basic-rate tax credit under Section 24. This does not apply to limited companies, which can still deduct finance costs in full. Understanding the correct treatment for your structure is essential for accurate tax planning.',
                },
                {
                  title: 'Multi-property cash flow',
                  body: 'As a portfolio grows, tracking cash flow across multiple properties — each with its own mortgage, insurance, maintenance schedule and tenancy — becomes increasingly complex. Without a consolidated view, it is easy to miss a shortfall until it becomes a problem.',
                },
                {
                  title: 'MTD for Income Tax for individual landlords',
                  body: 'Making Tax Digital for Income Tax is being phased in for landlords from April 2026. Those affected will need to keep digital records and submit quarterly updates to HMRC. Many landlords are not yet prepared for this change.',
                },
                {
                  title: 'CGT on disposals',
                  body: 'Capital gains tax on property disposals must be reported and paid within 60 days of completion. The calculation requires accurate records of the original purchase price, improvement costs and any reliefs available. Late reporting attracts penalties.',
                },
              ].map((item) => (
                <div key={item.title} className="bg-white border border-gray-200 p-6">
                  <h3 className="font-serif text-xl mb-3" style={{ color: '#0d1b2e' }}>{item.title}</h3>
                  <p className="font-body text-sm leading-relaxed" style={{ color: '#2a7c8a' }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How Reckonwell Helps */}
        <section className="py-16 px-6 md:px-16" style={{ backgroundColor: 'var(--background)' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl mb-8" style={{ color: '#0d1b2e' }}>
              How Reckonwell helps property businesses
            </h2>
            <p className="font-body text-base leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
              Reckonwell&apos;s fractional finance department provides ongoing accounting support for property businesses and SPVs, not just year-end accounts. We maintain your books throughout the year so that your management accounts are accurate, your director&apos;s loan account is reconciled and your cash flow position is always visible.
            </p>
            <p className="font-body text-base leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
              For SPV limited companies, we prepare the annual statutory accounts and corporation tax return, ensuring the correct accounting treatment for rental income, finance costs, repairs and capital expenditure. We file with Companies House and HMRC on time, so you are never at risk of late filing penalties.
            </p>
            <p className="font-body text-base leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
              For individual landlords, we prepare self-assessment tax returns and help you prepare for Making Tax Digital for Income Tax. We will set you up with compatible software, establish a digital record-keeping process and ensure your quarterly submissions are filed correctly when the obligation begins.
            </p>
            <p className="font-body text-base leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
              Cash flow forecasting across a property portfolio gives you visibility of upcoming mortgage payments, insurance renewals, maintenance costs and tax liabilities. We build a rolling forecast so you can plan purchases, refurbishments and refinancing with confidence rather than reacting to surprises.
            </p>
            <p className="font-body text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
              A qualified accountant signs off your numbers every month. Whether you have one property or a growing portfolio, you have the assurance that your accounts are accurate and your tax obligations are being managed correctly.
            </p>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-16 px-6 md:px-16" style={{ backgroundColor: '#f5f0e8' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl mb-8" style={{ color: '#0d1b2e' }}>
              What&apos;s included
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                'Daily bookkeeping and bank reconciliation',
                'Director\'s loan account maintenance',
                'Rental income and expense tracking',
                'Monthly management accounts',
                'Portfolio cash flow forecasting',
                'Annual statutory accounts (SPV limited companies)',
                'Corporation tax return (CT600)',
                'Self-assessment tax return (individual landlords)',
                'Making Tax Digital for Income Tax preparation and compliance',
                'Companies House confirmation statement',
                'CGT reporting support on disposals',
                'Qualified accountant sign-off every month',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 font-body text-sm" style={{ color: '#0d1b2e' }}>
                  <span style={{ color: '#2a7c8a', fontWeight: 700, flexShrink: 0 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Software */}
        <section className="py-16 px-6 md:px-16" style={{ backgroundColor: 'var(--background)' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl mb-6" style={{ color: '#0d1b2e' }}>
              Software we work with
            </h2>
            <p className="font-body text-base leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
              We work with accounting and property management software that integrates with your bank feeds and rental management processes.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Xero', 'Hammock', 'Landlord Vision', 'Open Banking Feeds'].map((tool) => (
                <span
                  key={tool}
                  className="font-ui text-xs tracking-widest uppercase px-4 py-2 border"
                  style={{ borderColor: '#0d1b2e', color: '#0d1b2e', letterSpacing: '1.5px' }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Related Links */}
        <section className="py-16 px-6 md:px-16" style={{ backgroundColor: '#f5f0e8' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-2xl mb-6" style={{ color: '#0d1b2e' }}>
              Related services and resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { label: 'Company Formation', href: '/company-formation' },
                { label: 'Limited Company Accounting', href: '/limited-company-accounting' },
                { label: 'Making Tax Digital', href: '/making-tax-digital' },
                { label: 'MTD Calculator', href: '/mtd-calculator' },
                { label: 'Self Assessment', href: '/self-assessment' },
                { label: 'Accounting in London', href: '/accounting/london' },
                { label: 'Accounting in Old Street', href: '/accounting/old-street' },
                { label: 'Accounting in City of London', href: '/accounting/city-of-london' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-ui text-xs tracking-widest uppercase"
                  style={{ color: 'var(--primary)', letterSpacing: '1.5px', textDecoration: 'underline', textUnderlineOffset: '4px' }}
                >
                  {link.label} →
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-6 md:px-16" style={{ backgroundColor: 'var(--background)' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl mb-10" style={{ color: '#0d1b2e' }}>
              Frequently asked questions
            </h2>
            <div className="flex flex-col gap-8">
              {faqs.map((faq) => (
                <div key={faq.question} className="border-b pb-8" style={{ borderColor: '#e5e7eb' }}>
                  <h3 className="font-serif text-xl mb-4" style={{ color: '#0d1b2e' }}>{faq.question}</h3>
                  <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="py-20 px-6 md:px-16 text-center" style={{ backgroundColor: '#0d1b2e' }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl mb-6" style={{ color: '#f5f0e8' }}>
              Tell us about your business
            </h2>
            <p className="font-body text-base leading-relaxed mb-8" style={{ color: '#B8B8B8' }}>
              Book a free discovery call and we&apos;ll explain exactly how Reckonwell&apos;s fractional finance department works for your property business.
            </p>
            <Link
              href="/book"
              className="font-ui text-xs tracking-widest uppercase inline-block"
              style={{ padding: '14px 32px', backgroundColor: '#D69AAB', color: '#0d1b2e', border: '1px solid #D69AAB', borderRadius: '2px', letterSpacing: '2px', fontWeight: 600 }}
            >
              Book a discovery call
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
