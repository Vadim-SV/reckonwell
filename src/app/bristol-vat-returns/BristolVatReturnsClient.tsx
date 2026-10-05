'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReferralTeaserSection from '@/app/components/ReferralTeaserSection';
import Breadcrumb from '@/components/Breadcrumb';

const city = 'Bristol';
const coords = { lat: 51.4545, lng: -2.5879 };

const faqs = [
  { q: 'When does my Bristol business need to register for VAT?', a: 'You must register for VAT when your taxable turnover exceeds £90,000 in any rolling 12-month period. Many Bristol tech and creative businesses register voluntarily to reclaim input VAT on costs.' },
  { q: 'What is Making Tax Digital for VAT?', a: 'MTD for VAT requires all VAT-registered businesses to keep digital records and submit returns using HMRC-compatible software. We handle all MTD compliance using Xero or QuickBooks — no technical knowledge required.' },
  { q: 'Is the Flat Rate Scheme right for my Bristol business?', a: 'The Flat Rate Scheme can save money if your actual VAT costs are lower than the flat rate for your sector. Bristol\'s tech and aerospace industries often benefit. We analyse your situation and advise on the most tax-efficient scheme.' },
  { q: 'Can you handle VAT for Bristol businesses selling to EU customers post-Brexit?', a: 'Yes. We advise on post-Brexit VAT rules for EU sales including place of supply, distance selling thresholds, and EU OSS registration for digital service sellers based in Bristol.' },
  { q: 'What happens if I miss a VAT deadline?', a: 'HMRC operates a points-based penalty system — 4 points triggers a £200 fine, with further fines for each subsequent late return. We submit all returns on time so you never receive a late filing penalty.' },
  { q: 'Do you handle VAT for Bristol hospitality and events businesses?', a: 'Yes. Bristol\'s vibrant hospitality and events sector has specific VAT considerations including the reduced rate for hospitality, VAT on event tickets, and partial exemption for mixed-use venues. We handle all of these.' },
];

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Reckonwell — Bristol VAT Returns',
  description: 'VAT return preparation and filing for Bristol businesses. MTD-compliant, flat rate scheme analysis, and VAT registration.',
  url: 'https://reckonwell.com/bristol-vat-returns',
  areaServed: { '@type': 'City', name: city },
  geo: { '@type': 'GeoCoordinates', latitude: coords?.lat, longitude: coords?.lng },
  priceRange: '££',
  currenciesAccepted: 'GBP',
  openingHours: 'Mo-Fr 09:00-17:30',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs?.map((f) => ({ '@type': 'Question', name: f?.q, acceptedAnswer: { '@type': 'Answer', text: f?.a } })),
};

export default function BristolVatReturnsClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Header />
      <main style={{ backgroundColor: 'var(--background)', minHeight: '100vh', paddingTop: '80px' }}>
        <Breadcrumb items={[{ label: 'Services', href: '/services' }, { label: 'Bristol', href: '/accounting/bristol' }, { label: 'VAT Returns', href: '/bristol-vat-returns' }]} />
        <div className="px-6 md:px-10 py-3" style={{ backgroundColor: 'rgba(201,168,76,0.06)', borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <p className="font-ui text-xs" style={{ color: 'var(--muted)' }}><span style={{ color: 'var(--primary)' }}>Standalone VAT service</span> — no full-accounting engagement required.</p>
            <Link href="/vat-returns" className="font-ui text-xs" style={{ color: 'var(--primary)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>See full VAT service details →</Link>
          </div>
        </div>
        <section className="px-6 md:px-10 py-16 md:py-24" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-5xl mx-auto">
            <p className="section-label mb-4">VAT Returns · Bristol</p>
            <h1 className="font-display mb-6" style={{ fontSize: 'clamp(36px,6vw,72px)', fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              VAT Returns<br />in <em style={{ color: 'var(--primary)' }}>Bristol</em>
            </h1>
            <p className="font-ui mb-8 max-w-2xl" style={{ color: 'var(--muted)', fontSize: '18px', lineHeight: 1.7 }}>Quarterly VAT returns prepared, reviewed, and filed on time for Bristol businesses. MTD-compliant. Flat rate scheme analysis included.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/quotation-calculator" className="btn-gold" style={{ minHeight: '48px', padding: '0 32px', lineHeight: '48px' }}>Get Your Bristol VAT Quote →</Link>
              <Link href="/contact" className="btn-ghost" style={{ minHeight: '48px', padding: '0 24px', lineHeight: '48px' }}>Ask a Question</Link>
            </div>
          </div>
        </section>
        <ReferralTeaserSection />
        <section className="px-6 md:px-10 py-16 md:py-20" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-3xl mx-auto">
            <p className="section-label mb-4">FAQ</p>
            <h2 className="font-display mb-10" style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 400, color: 'var(--foreground)' }}>Bristol VAT questions</h2>
            <div className="space-y-0">
              {faqs?.map((faq, i) => (
                <div key={i} style={{ borderBottom: '1px solid var(--gold-border)' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex justify-between items-center py-5 text-left" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <span className="font-ui font-medium pr-4" style={{ color: 'var(--foreground)', fontSize: '15px' }}>{faq?.q}</span>
                    <span style={{ color: 'var(--primary)', fontSize: '20px', flexShrink: 0, transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
                  </button>
                  {openFaq === i && <p className="font-ui text-sm pb-5" style={{ color: 'var(--muted)', lineHeight: 1.7 }}>{faq?.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="px-6 md:px-10 py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display mb-6" style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, color: 'var(--foreground)' }}>Get your Bristol VAT quote</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/quotation-calculator" className="btn-gold" style={{ minHeight: '48px', padding: '0 32px', lineHeight: '48px' }}>Get Your Quote →</Link>
              <Link href="/contact" className="btn-ghost" style={{ minHeight: '48px', padding: '0 24px', lineHeight: '48px' }}>Speak to an Accountant</Link>
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
