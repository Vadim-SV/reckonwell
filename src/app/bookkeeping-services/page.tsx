'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import ReferralTeaserSection from '@/app/components/ReferralTeaserSection';

const faqs = [
  {
    q: 'What does bookkeeping include?',
    a: 'Monthly bank reconciliation, expense categorisation, sales and purchase ledger maintenance, supplier payment tracking, and management accounts. We keep your books accurate and up to date so your accountant has clean data at year-end — reducing your annual accounts bill.',
  },
  {
    q: 'Do you use Xero or QuickBooks?',
    a: 'Both. We are certified advisors on Xero and QuickBooks Online. If you already use one, we work within it. If you are starting fresh, we recommend Xero for most small businesses and QuickBooks for those with complex inventory or US parent companies. Setup and migration are included.',
  },
  {
    q: 'How often will my books be updated?',
    a: 'Weekly for Growth and Scale clients, monthly for Foundation clients. All transactions are coded within 5 working days of your bank feed updating. You always have a current view of your cash position and profit.',
  },
  {
    q: 'What are management accounts?',
    a: 'Monthly or quarterly reports showing your profit and loss, balance sheet, and cash flow — formatted for decision-making, not just compliance. We include commentary on variances, key ratios, and forward-looking cash flow projections. Useful for directors, investors, and lenders.',
  },
  {
    q: 'Can you clean up a backlog of bookkeeping?',
    a: 'Yes. Catch-up bookkeeping is priced separately based on the number of months and transaction volume. We typically clear backlogs of up to 12 months within 2–3 weeks. Once current, we move you onto a monthly retainer.',
  },
  {
    q: 'Do I need bookkeeping if I already have an accountant?',
    a: 'If your accountant only does year-end accounts, yes. Year-end accountants work from whatever records you provide — if those records are incomplete or inaccurate, your accounts will be too. Clean monthly bookkeeping reduces your year-end bill and gives you real-time financial visibility.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Bookkeeping Services',
  provider: {
    '@type': 'AccountingService',
    name: 'Reckonwell',
    url: 'https://reckonwell.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GB',
    },
  },
  description: 'Professional cloud bookkeeping for UK businesses. Bank reconciliation, expense categorisation, management accounts, and Xero/QuickBooks setup.',
  url: 'https://reckonwell.com/bookkeeping-services',
  areaServed: 'GB',
  offers: {
    '@type': 'Offer',
    price: '150',
    priceCurrency: 'GBP',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '150',
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

export default function BookkeepingServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Header />
      <main style={{ backgroundColor: 'var(--background)', minHeight: '100vh', paddingTop: '80px' }}>

        <Breadcrumb items={[{ label: 'Services', href: '/services' }, { label: 'Bookkeeping Services', href: '/bookkeeping-services' }]} />

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
              Bookkeeping<br /><em style={{ color: 'var(--primary)' }}>Services</em>
            </h1>
            <p className="font-ui mb-8 max-w-2xl" style={{ color: 'var(--muted)', fontSize: '18px', lineHeight: 1.7 }}>
              Cloud bookkeeping on Xero or QuickBooks. Bank reconciliation, expense coding, management accounts, and clean records for year-end. Updated weekly.
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
              See your exact bookkeeping price
            </h2>
            <p className="font-ui mb-8" style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.7 }}>
              Bookkeeping is priced by transaction volume and update frequency. Use our quotation calculator to get your exact monthly price in under 2 minutes — no sales calls required.
            </p>
            <Link href="/quotation-calculator" className="btn-gold" style={{ minHeight: '48px', padding: '0 40px', lineHeight: '48px', display: 'inline-block' }}>
              Get Your Exact Quote →
            </Link>
          </div>
        </section>

        <ReferralTeaserSection />

        {/* What's Included */}
        <section className="px-6 md:px-10 py-16 md:py-20" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-5xl mx-auto">
            <p className="section-label mb-4">What&apos;s Included</p>
            <h2 className="font-display mb-10" style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 400, color: 'var(--foreground)' }}>
              Everything bookkeeping
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Bank Reconciliation', desc: 'All bank, credit card, and payment processor accounts reconciled. Every transaction matched and coded.' },
                { title: 'Expense Categorisation', desc: 'All business expenses coded to the correct nominal codes. HMRC-compliant categorisation throughout.' },
                { title: 'Sales & Purchase Ledger', desc: 'Customer invoices and supplier bills tracked. Aged debtors and creditors reports available on request.' },
                { title: 'Management Accounts', desc: 'Monthly or quarterly P&L, balance sheet, and cash flow. Formatted for decision-making, not just compliance.' },
                { title: 'Xero / QuickBooks Setup', desc: 'Full chart of accounts setup, bank feed connection, and migration from spreadsheets or legacy software.' },
                { title: 'Year-End Preparation', desc: 'Clean trial balance and supporting schedules handed to your accountant. Reduces year-end accounting fees.' },
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
                { label: 'VAT Returns', href: '/vat-returns' },
                { label: 'Payroll Services', href: '/payroll-services' },
                { label: 'Self-Employed Accounting', href: '/self-employed-accounting' },
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
              Get your books in order
            </h2>
            <p className="font-ui mb-8" style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.7 }}>
              From £150/month. Clean books, real-time visibility, and a stress-free year-end. Use the calculator to get your exact price.
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
