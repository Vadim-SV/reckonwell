'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const city = 'Edinburgh';
const citySlug = 'edinburgh';
const coords = { lat: 55.9533, lng: -3.1883 };

const faqs = [
  { q: 'What does bookkeeping include for an Edinburgh business?', a: 'We categorise all income and expenses, reconcile your bank accounts, manage accounts payable and receivable, and produce monthly management accounts. Everything is done in Xero or QuickBooks.' },
  { q: 'Do you understand Scottish tax rules and LBTT?', a: 'Yes. We are familiar with Scotland-specific tax considerations including Land and Buildings Transaction Tax (LBTT) for property businesses, Scottish income tax rates, and Scottish Government grant schemes.' },
  { q: 'Can you handle bookkeeping for Edinburgh\'s financial services sector?', a: 'Yes. Edinburgh is one of Europe\'s leading financial centres and we work with many firms in the sector. We handle complex transaction volumes, regulatory reporting requirements, and multi-currency bookkeeping.' },
  { q: 'How often will I receive management accounts?', a: 'Monthly management accounts are included in all bookkeeping packages. You receive a P&L, balance sheet, and cash flow summary by the 15th of the following month.' },
  { q: 'Can you take over from my existing Edinburgh bookkeeper?', a: 'Yes. We handle the transition, including reviewing historical records, correcting any errors, and bringing your books up to date. Most Edinburgh clients are fully onboarded within one week.' },
  { q: 'What accounting software do you use?', a: 'We work with Xero, QuickBooks, and FreeAgent. If you\'re already using one of these, we connect directly. If not, we recommend the best fit for your Edinburgh business type and size.' },
];

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Reckonwell — Edinburgh Bookkeeping Services',
  description: 'Professional bookkeeping services for Edinburgh businesses. Monthly management accounts, bank reconciliation, and cloud accounting software.',
  url: `https://reckonwell.com/edinburgh-bookkeeping-services`,
  areaServed: { '@type': 'City', name: city },
  geo: { '@type': 'GeoCoordinates', latitude: coords.lat, longitude: coords.lng },
  priceRange: '££',
  currenciesAccepted: 'GBP',
  openingHours: 'Mo-Fr 09:00-17:30',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Bookkeeping Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Monthly Bookkeeping' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Management Accounts' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bank Reconciliation' } },
    ],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

export default function EdinburghBookkeepingServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Header />
      <main style={{ backgroundColor: 'var(--background)', minHeight: '100vh', paddingTop: '80px' }}>

        {/* Banner */}
        <div className="px-6 md:px-10 py-3" style={{ backgroundColor: 'rgba(201,168,76,0.06)', borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <p className="font-ui text-xs" style={{ color: 'var(--muted)' }}>
              <span style={{ color: 'var(--primary)' }}>Standalone bookkeeping service</span> — no full-accounting engagement required.
            </p>
            <Link href="/bookkeeping-services" className="font-ui text-xs" style={{ color: 'var(--primary)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
              See full bookkeeping service details →
            </Link>
          </div>
        </div>

        {/* Hero */}
        <section className="px-6 md:px-10 py-16 md:py-24" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-5xl mx-auto">
            <p className="section-label mb-4">Bookkeeping Services · Edinburgh</p>
            <h1 className="font-display mb-6" style={{ fontSize: 'clamp(36px,6vw,72px)', fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              Bookkeeping Services<br />in <em style={{ color: 'var(--primary)' }}>Edinburgh</em>
            </h1>
            <p className="font-ui mb-8 max-w-2xl" style={{ color: 'var(--muted)', fontSize: '18px', lineHeight: 1.7 }}>
              Monthly bookkeeping, management accounts, and bank reconciliation for Edinburgh businesses. Clean books every month. No surprises at year-end.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/quotation-calculator" className="btn-gold" style={{ minHeight: '48px', padding: '0 32px', lineHeight: '48px' }}>
                Get Your Edinburgh Bookkeeping Quote →
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
              See your exact Edinburgh bookkeeping price
            </h2>
            <p className="font-ui mb-8" style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.7 }}>
              Bookkeeping is priced by transaction volume and update frequency. Use our quotation calculator to get your exact monthly price in under 2 minutes — no sales calls required.
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
              Everything your Edinburgh books need
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Monthly Bookkeeping', desc: 'All transactions categorised, reconciled, and reviewed every month. No backlogs, no surprises.' },
                { title: 'Management Accounts', desc: 'Monthly P&L, balance sheet, and cash flow summary delivered by the 15th of the following month.' },
                { title: 'Bank Reconciliation', desc: 'All bank accounts and credit cards reconciled monthly. Discrepancies identified and resolved immediately.' },
                { title: 'Scottish Tax Awareness', desc: 'We understand Scottish income tax rates, LBTT, and Scotland-specific grant schemes relevant to your business.' },
                { title: 'Cloud Accounting', desc: 'Xero or QuickBooks set up and maintained. Real-time financial visibility from any device.' },
                { title: 'Year-End Preparation', desc: 'Books prepared and handed to your accountant in perfect condition. No year-end scramble.' },
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
              Edinburgh bookkeeping questions
            </h2>
            <div className="space-y-0">
              {faqs.map((faq, i) => (
                <div key={i} style={{ borderBottom: '1px solid var(--gold-border)' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex justify-between items-center py-5 text-left" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <span className="font-ui font-medium pr-4" style={{ color: 'var(--foreground)', fontSize: '15px' }}>{faq.q}</span>
                    <span style={{ color: 'var(--primary)', fontSize: '20px', flexShrink: 0, transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
                  </button>
                  {openFaq === i && <p className="font-ui text-sm pb-5" style={{ color: 'var(--muted)', lineHeight: 1.7 }}>{faq.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="px-6 md:px-10 py-12" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-5xl mx-auto">
            <p className="section-label mb-6">Related Services</p>
            <div className="flex flex-wrap gap-4">
              {[
                { label: 'Bookkeeping Services UK', href: '/bookkeeping-services' },
                { label: 'Edinburgh Accounting', href: '/accounting/edinburgh' },
                { label: 'VAT Returns', href: '/vat-returns' },
                { label: 'Limited Company Accounting', href: '/limited-company-accounting' },
                { label: 'Get a Quote', href: '/quotation-calculator' },
              ].map(l => (
                <Link key={l.href} href={l.href} className="font-ui text-sm px-4 py-2 border transition-colors duration-200" style={{ borderColor: 'var(--gold-border)', color: 'var(--muted)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--primary)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--primary)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--gold-border)'; }}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-10 py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display mb-6" style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, color: 'var(--foreground)' }}>
              Get your Edinburgh bookkeeping quote
            </h2>
            <p className="font-ui mb-8" style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.7 }}>
              Transparent pricing. No sales calls. See your exact monthly price in under 2 minutes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/quotation-calculator" className="btn-gold" style={{ minHeight: '48px', padding: '0 32px', lineHeight: '48px' }}>
                Get Your Quote →
              </Link>
              <Link href="/contact" className="btn-ghost" style={{ minHeight: '48px', padding: '0 24px', lineHeight: '48px' }}>
                Speak to an Accountant
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              {['FIAB Certified', 'IAB Member', 'No hidden fees', 'Cancel anytime'].map(t => (
                <div key={t} className="flex items-center gap-2">
                  <span style={{ color: 'var(--primary)', fontSize: '12px' }}>✓</span>
                  <span className="font-ui text-xs" style={{ color: 'var(--muted)' }}>{t}</span>
                </div>
              ))}
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
