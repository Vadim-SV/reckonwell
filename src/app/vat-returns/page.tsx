'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const faqs = [
  {
    q: 'When do I need to register for VAT?',
    a: 'You must register for VAT when your taxable turnover exceeds £90,000 in any rolling 12-month period. You can also register voluntarily below this threshold — useful if your customers are VAT-registered businesses and you want to reclaim input VAT on your costs.',
  },
  {
    q: 'What is Making Tax Digital (MTD) for VAT?',
    a: 'MTD for VAT requires all VAT-registered businesses to keep digital records and submit VAT returns using HMRC-compatible software. We handle all MTD compliance using Xero or QuickBooks, so you never need to worry about the technical requirements.',
  },
  {
    q: 'Should I use the Flat Rate Scheme?',
    a: 'The Flat Rate Scheme can save money if your actual VAT costs are lower than the flat rate percentage for your sector. We analyse your specific situation and advise whether the standard scheme, flat rate, or cash accounting scheme is most tax-efficient for your business.',
  },
  {
    q: 'What happens if I submit a VAT return late?',
    a: 'HMRC operates a points-based penalty system. Each late submission earns a penalty point; at 4 points you receive a £200 fine, plus further £200 fines for each subsequent late return. We submit all returns on time — you will never receive a late filing penalty while we manage your VAT.',
  },
  {
    q: 'Can you handle VAT for multiple business entities?',
    a: 'Yes. We manage VAT for sole traders, partnerships, limited companies, and VAT groups. If you have multiple entities that could benefit from VAT grouping, we assess eligibility and handle the application to HMRC.',
  },
  {
    q: 'Do you handle VAT on international transactions?',
    a: 'Yes. We advise on place of supply rules, reverse charge VAT, import VAT, and post-Brexit EU trade. If you sell digital services to EU consumers, we can also assist with the One Stop Shop (OSS) registration.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'VAT Returns',
  provider: {
    '@type': 'AccountingService',
    name: 'Reckonwell',
    url: 'https://reckonwell.com',
    telephone: '+44-20-0000-0000',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GB',
    },
  },
  description: 'Quarterly VAT returns prepared and filed on time. MTD-compliant VAT filing, flat rate scheme advice, and VAT registration for UK businesses.',
  url: 'https://reckonwell.com/vat-returns',
  areaServed: 'GB',
  offers: {
    '@type': 'Offer',
    price: '60',
    priceCurrency: 'GBP',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '60',
      priceCurrency: 'GBP',
      unitText: 'MONTH',
    },
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function VatReturnsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Header />
      <main style={{ backgroundColor: 'var(--background)', minHeight: '100vh', paddingTop: '80px' }}>

        {/* Compliance Banner */}
        <div className="px-6 md:px-10 py-3" style={{ backgroundColor: 'rgba(201,168,76,0.06)', borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <p className="font-ui text-xs" style={{ color: 'var(--muted)' }}>
              <span style={{ color: 'var(--primary)' }}>Standalone compliance service</span> — no ongoing engagement required.
            </p>
            <Link href="/" className="font-ui text-xs" style={{ color: 'var(--primary)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
              Need a full finance team? See Fractional Finance →
            </Link>
          </div>
        </div>

        {/* Hero */}
        <section className="px-6 md:px-10 py-16 md:py-24" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-5xl mx-auto">
            <p className="section-label mb-4">Service</p>
            <h1 className="font-display mb-6" style={{ fontSize: 'clamp(36px,6vw,72px)', fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              VAT<br /><em style={{ color: 'var(--primary)' }}>Returns</em>
            </h1>
            <p className="font-ui mb-8 max-w-2xl" style={{ color: 'var(--muted)', fontSize: '18px', lineHeight: 1.7 }}>
              Quarterly VAT returns prepared, reviewed, and filed on time. MTD-compliant. Flat rate scheme analysis included. You never touch HMRC.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/quotation-calculator" className="btn-gold" style={{ minHeight: '48px', padding: '0 32px', lineHeight: '48px' }}>
                Get Your Quote →
              </Link>
              <Link href="/contact" className="btn-ghost" style={{ minHeight: '48px', padding: '0 24px', lineHeight: '48px' }}>
                Ask a Question
              </Link>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="px-6 md:px-10 py-16 md:py-20" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-5xl mx-auto">
            <p className="section-label mb-4">Pricing</p>
            <h2 className="font-display mb-10" style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 400, color: 'var(--foreground)' }}>
              Transparent VAT pricing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                {
                  tier: 'Standard',
                  price: '£60',
                  unit: '/month',
                  desc: 'Quarterly VAT returns for businesses with straightforward transactions',
                  features: ['Quarterly VAT return preparation', 'MTD-compliant submission', 'Flat rate scheme review', 'HMRC correspondence handled'],
                },
                {
                  tier: 'Complex',
                  price: '£90',
                  unit: '/month',
                  desc: 'Multiple income streams, international sales, or partial exemption',
                  features: ['Everything in Standard', 'International VAT advice', 'Partial exemption calculations', 'VAT group management'],
                },
                {
                  tier: 'Registration',
                  price: '£299',
                  unit: 'one-off',
                  desc: 'New VAT registration with HMRC and scheme selection advice',
                  features: ['VAT registration application', 'Scheme selection advice', 'First return preparation', 'MTD software setup'],
                },
              ].map((tier, i) => (
                <div key={i} className="p-6 border flex flex-col" style={{ borderColor: i === 0 ? 'var(--primary)' : 'var(--gold-border)', backgroundColor: i === 0 ? 'rgba(201,168,76,0.04)' : 'transparent' }}>
                  {i === 0 && <p className="section-label mb-3">Most Popular</p>}
                  <p className="font-ui font-medium mb-1" style={{ color: 'var(--foreground)', fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>{tier.tier}</p>
                  <p className="font-display mb-1" style={{ fontSize: '32px', color: 'var(--primary)', fontWeight: 400 }}>
                    {tier.price}<span className="font-ui text-sm" style={{ color: 'var(--muted)' }}>{tier.unit}</span>
                  </p>
                  <p className="font-ui text-xs mb-4" style={{ color: 'var(--muted)', lineHeight: 1.5 }}>{tier.desc}</p>
                  <div className="space-y-2 flex-1">
                    {tier.features.map((f, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <span style={{ color: 'var(--primary)', fontSize: '12px', marginTop: '2px' }}>✓</span>
                        <span className="font-ui text-sm" style={{ color: 'var(--body-text)' }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/quotation-calculator" className="mt-6 font-ui text-xs uppercase tracking-widest" style={{ color: 'var(--primary)' }}>
                    Calculate exact price →
                  </Link>
                </div>
              ))}
            </div>
            <p className="font-ui text-xs" style={{ color: 'var(--muted)' }}>VAT returns are included in all limited company packages. Use the quotation calculator for your exact combined total.</p>
          </div>
        </section>

        {/* What's Included */}
        <section className="px-6 md:px-10 py-16 md:py-20" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-5xl mx-auto">
            <p className="section-label mb-4">What&apos;s Included</p>
            <h2 className="font-display mb-10" style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 400, color: 'var(--foreground)' }}>
              Everything VAT
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Quarterly VAT Returns', desc: 'Prepared from your records, reviewed for accuracy, and submitted to HMRC before every deadline.' },
                { title: 'MTD Compliance', desc: 'Full Making Tax Digital compliance using Xero or QuickBooks. Digital records maintained throughout.' },
                { title: 'Flat Rate Scheme Analysis', desc: 'Annual review of whether the flat rate, standard, or cash accounting scheme saves you the most tax.' },
                { title: 'VAT Registration', desc: 'Compulsory and voluntary VAT registration handled. Scheme selection advice included at no extra charge.' },
                { title: 'International VAT', desc: 'Place of supply rules, reverse charge, import VAT, and EU OSS registration for digital service sellers.' },
                { title: 'HMRC Enquiries', desc: 'All HMRC correspondence and VAT enquiries handled on your behalf. You are never contacted directly.' },
              ].map((item, i) => (
                <div key={i} className="p-5 border" style={{ borderColor: 'var(--gold-border)' }}>
                  <p className="font-ui font-medium mb-2" style={{ color: 'var(--foreground)', fontSize: '14px' }}>{item.title}</p>
                  <p className="font-ui text-sm" style={{ color: 'var(--muted)', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-6 md:px-10 py-16 md:py-20" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-3xl mx-auto">
            <p className="section-label mb-4">FAQ</p>
            <h2 className="font-display mb-10" style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 400, color: 'var(--foreground)' }}>
              Common questions
            </h2>
            <div className="space-y-0">
              {faqs.map((faq, i) => (
                <div key={i} style={{ borderBottom: '1px solid var(--gold-border)' }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex justify-between items-center py-5 text-left"
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <span className="font-ui font-medium pr-4" style={{ color: 'var(--foreground)', fontSize: '15px' }}>{faq.q}</span>
                    <span style={{ color: 'var(--primary)', fontSize: '20px', flexShrink: 0, transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
                  </button>
                  {openFaq === i && (
                    <p className="font-ui text-sm pb-5" style={{ color: 'var(--muted)', lineHeight: 1.7 }}>{faq.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="px-6 md:px-10 py-12" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-5xl mx-auto">
            <p className="section-label mb-6">Related Services</p>
            <div className="flex flex-wrap gap-4">
              {[
                { label: 'Limited Company Accounting', href: '/limited-company-accounting' },
                { label: 'Payroll Services', href: '/payroll-services' },
                { label: 'Bookkeeping Services', href: '/bookkeeping-services' },
                { label: 'Making Tax Digital', href: '/making-tax-digital' },
                { label: 'Get a Quote', href: '/quotation-calculator' },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="font-ui text-sm px-4 py-2 border transition-colors duration-200"
                  style={{ borderColor: 'var(--gold-border)', color: 'var(--muted)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--primary)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--primary)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--gold-border)'; }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-10 py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display mb-4" style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, color: 'var(--foreground)' }}>
              Get your VAT returns handled
            </h2>
            <p className="font-ui mb-8" style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.7 }}>
              From £60/month. No late penalties. No HMRC stress. Use the calculator to get your exact price.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/quotation-calculator" className="btn-gold" style={{ minHeight: '48px', padding: '0 32px', lineHeight: '48px' }}>
                Get Your Quote →
              </Link>
              <Link href="/contact" className="btn-ghost" style={{ minHeight: '48px', padding: '0 24px', lineHeight: '48px' }}>
                Speak to an Accountant
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
