'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import ReferralTeaserSection from '@/app/components/ReferralTeaserSection';

const city = 'Birmingham';
const citySlug = 'birmingham';
const coords = { lat: 52.4862, lng: -1.8904 };

const faqs = [
  { q: 'What does bookkeeping include for a Birmingham business?', a: 'We categorise all income and expenses, reconcile your bank accounts, manage accounts payable and receivable, and produce monthly management accounts. Everything is done in Xero or QuickBooks.' },
  { q: 'How often will I receive management accounts?', a: 'Monthly management accounts are included in all bookkeeping packages. You receive a P&L, balance sheet, and cash flow summary by the 15th of the following month.' },
  { q: 'Do you work with Birmingham manufacturing and engineering businesses?', a: 'Yes. Birmingham\'s manufacturing and engineering sector has specific bookkeeping needs including stock management, job costing, and CIS (Construction Industry Scheme) compliance. We handle all of these.' },
  { q: 'Can you take over from my existing bookkeeper?', a: 'Yes. We handle the transition, including reviewing historical records, correcting any errors, and bringing your books up to date. Most Birmingham clients are fully onboarded within one week.' },
  { q: 'What accounting software do you use?', a: 'We work with Xero, QuickBooks, and FreeAgent. If you\'re already using one of these, we connect directly. If not, we recommend the best fit for your Birmingham business type and size.' },
  { q: 'Is bookkeeping included in your accounting packages?', a: 'Yes. Bookkeeping is included in all limited company and self-employed accounting packages. If you only need standalone bookkeeping without full accounts preparation, we offer that too.' },
];

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Reckonwell — Birmingham Bookkeeping Services',
  description: 'Professional bookkeeping services for Birmingham businesses. Monthly management accounts, bank reconciliation, and cloud accounting software.',
  url: 'https://reckonwell.com/birmingham-bookkeeping-services',
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

export default function BirminghamBookkeepingServicesClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Header />
      <main style={{ backgroundColor: 'var(--background)', minHeight: '100vh', paddingTop: '80px' }}>
        <Breadcrumb items={[{ label: 'Services', href: '/services' }, { label: 'Birmingham', href: '/accounting/birmingham' }, { label: 'Bookkeeping', href: '/birmingham-bookkeeping-services' }]} />
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
        <section className="px-6 md:px-10 py-16 md:py-24" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-5xl mx-auto">
            <p className="section-label mb-4">Bookkeeping Services · Birmingham</p>
            <h1 className="font-display mb-6" style={{ fontSize: 'clamp(36px,6vw,72px)', fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              Bookkeeping Services<br />in <em style={{ color: 'var(--primary)' }}>Birmingham</em>
            </h1>
            <p className="font-ui mb-8 max-w-2xl" style={{ color: 'var(--muted)', fontSize: '18px', lineHeight: 1.7 }}>
              Monthly bookkeeping, management accounts, and bank reconciliation for Birmingham businesses. Clean books every month. No surprises at year-end.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/quotation-calculator" className="btn-gold" style={{ minHeight: '48px', padding: '0 32px', lineHeight: '48px' }}>Get Your Birmingham Bookkeeping Quote →</Link>
              <Link href="/contact" className="btn-ghost" style={{ minHeight: '48px', padding: '0 24px', lineHeight: '48px' }}>Ask a Question</Link>
            </div>
          </div>
        </section>
        <section className="px-6 md:px-10 py-16 md:py-20" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="section-label mb-4">Pricing</p>
            <h2 className="font-display mb-6" style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, color: 'var(--foreground)' }}>See your exact Birmingham bookkeeping price</h2>
            <p className="font-ui mb-8" style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.7 }}>Bookkeeping is priced by transaction volume and update frequency. Use our quotation calculator to get your exact monthly price in under 2 minutes — no sales calls required.</p>
            <Link href="/quotation-calculator" className="btn-gold" style={{ minHeight: '48px', padding: '0 40px', lineHeight: '48px', display: 'inline-block' }}>Get Your Exact Quote →</Link>
          </div>
        </section>
        <ReferralTeaserSection />
        <section className="px-6 md:px-10 py-16 md:py-20" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-3xl mx-auto">
            <p className="section-label mb-4">FAQ</p>
            <h2 className="font-display mb-10" style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 400, color: 'var(--foreground)' }}>Birmingham bookkeeping questions</h2>
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
            <h2 className="font-display mb-6" style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, color: 'var(--foreground)' }}>Get your Birmingham bookkeeping quote</h2>
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
