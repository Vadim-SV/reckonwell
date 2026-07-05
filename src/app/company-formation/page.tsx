'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const faqs = [
  {
    q: 'How long does it take to register a limited company?',
    a: 'Companies House typically approves new company registrations within 24 hours when filed electronically. Same-day registration is available for an additional fee. We handle the entire process — you receive your certificate of incorporation, memorandum and articles of association, and share certificates within 1–2 working days.',
  },
  {
    q: 'What is a registered office address?',
    a: 'Every UK limited company must have a registered office address in the UK. This is the official address where Companies House and HMRC correspondence is sent. We provide a registered office address at our London address, keeping your home address off the public register.',
  },
  {
    q: 'How should I structure my share capital?',
    a: 'For most owner-managed companies, we recommend 100 ordinary shares at £1 each. If you have co-founders, we advise on share splits, different share classes (A/B shares for dividend flexibility), and shareholder agreements. Getting the structure right at formation avoids expensive restructuring later.',
  },
  {
    q: 'What are the ongoing obligations after formation?',
    a: 'After incorporation, your company must: file annual accounts with Companies House, submit a corporation tax return (CT600) to HMRC, file a confirmation statement annually, and register for VAT if turnover exceeds £90,000. We handle all of these as part of our limited company accounting service.',
  },
  {
    q: 'Should I form a company or remain a sole trader?',
    a: 'Generally, incorporation becomes tax-efficient when your profit exceeds £30,000–£40,000 per year. Benefits include: lower corporation tax rate (19–25%) vs income tax (up to 45%), limited liability protection, ability to retain profits in the company, and more credibility with clients and lenders. We model both scenarios for your specific numbers.',
  },
  {
    q: 'Can you help with a holding company structure?',
    a: 'Yes. If you have multiple trading companies or want to protect assets, a holding company structure can be beneficial. We advise on group structures, inter-company loans, and the tax implications of different arrangements. This is typically relevant when profit exceeds £100,000/year.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Company Formation',
  provider: {
    '@type': 'AccountingService',
    name: 'Reckonwell',
    url: 'https://reckonwell.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GB',
    },
  },
  description: 'UK limited company registration with Companies House filing, registered office address, share structure advice, and first-year accounting setup.',
  url: 'https://reckonwell.com/company-formation',
  areaServed: 'GB',
  offers: {
    '@type': 'Offer',
    price: '299',
    priceCurrency: 'GBP',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '299',
      priceCurrency: 'GBP',
      unitText: 'ONE_TIME',
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

export default function CompanyFormationPage() {
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
              Company<br /><em style={{ color: 'var(--primary)' }}>Formation</em>
            </h1>
            <p className="font-ui mb-8 max-w-2xl" style={{ color: 'var(--muted)', fontSize: '18px', lineHeight: 1.7 }}>
              Register your UK limited company correctly from day one. Companies House filing, registered office address, share structure advice, and first-year accounting setup — all included.
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
          <div className="max-w-3xl mx-auto text-center">
            <p className="section-label mb-4">Pricing</p>
            <h2 className="font-display mb-6" style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, color: 'var(--foreground)' }}>
              See your exact company formation price
            </h2>
            <p className="font-ui mb-8" style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.7 }}>
              Formation pricing depends on the services and registrations you need. Use our quotation calculator to get your exact price in under 2 minutes — no sales calls required.
            </p>
            <Link href="/quotation-calculator" className="btn-gold" style={{ minHeight: '48px', padding: '0 40px', lineHeight: '48px', display: 'inline-block' }}>
              Get Your Exact Quote →
            </Link>
          </div>
        </section>

        {/* What's Included */}
        <section className="px-6 md:px-10 py-16 md:py-20" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-5xl mx-auto">
            <p className="section-label mb-4">What&apos;s Included</p>
            <h2 className="font-display mb-10" style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 400, color: 'var(--foreground)' }}>
              Everything formation
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Companies House Filing', desc: 'Electronic registration with Companies House. Certificate of incorporation typically issued within 24 hours.' },
                { title: 'Registered Office Address', desc: 'London registered office address included for the first year. Keeps your home address off the public register.' },
                { title: 'Share Structure Advice', desc: 'Advice on share capital, share classes, and co-founder splits. Getting this right at formation avoids costly restructuring.' },
                { title: 'Statutory Documents', desc: 'Memorandum and articles of association, share certificates, and register of members — all prepared and filed.' },
                { title: 'Tax Registrations', desc: 'Corporation tax, PAYE, and VAT registrations with HMRC handled as part of the Professional and Complete packages.' },
                { title: 'First-Year Setup', desc: 'Chart of accounts, accounting software setup, and director salary planning included in Professional and Complete packages.' },
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
                { label: 'Bookkeeping Services', href: '/bookkeeping-services' },
                { label: 'Payroll Services', href: '/payroll-services' },
                { label: 'VAT Returns', href: '/vat-returns' },
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
              Start your company the right way
            </h2>
            <p className="font-ui mb-8" style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.7 }}>
              From £299. Registered within 24 hours. Use the calculator to see your full first-year cost.
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
