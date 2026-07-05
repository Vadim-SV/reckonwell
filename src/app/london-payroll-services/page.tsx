'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReferralTeaserSection from '@/app/components/ReferralTeaserSection';

const city = 'London';
const citySlug = 'london';
const coords = { lat: 51.5074, lng: -0.1278 };

const faqs = [
  { q: 'How much does payroll cost for a London business?', a: 'Payroll is priced at £20–50 per employee per month depending on team size and complexity. There are no London surcharges — our pricing is the same nationwide.' },
  { q: 'Do you handle London Living Wage compliance?', a: 'Yes. We track London Living Wage rates and ensure your payroll reflects the correct minimum for London-based employees, keeping you compliant with any voluntary or contractual commitments.' },
  { q: 'Can you manage payroll for a London-based startup with rapid headcount growth?', a: 'Absolutely. We handle starters and leavers at no extra charge, so fast-growing London teams can onboard new employees without payroll delays or additional fees.' },
  { q: 'Do you handle auto-enrolment for London businesses?', a: 'Yes. We manage all auto-enrolment obligations including employee communications, pension contributions, and ongoing compliance with The Pensions Regulator — regardless of your London location.' },
  { q: 'What if my London business has employees working remotely outside the UK?', a: 'We advise on PAYE obligations for internationally mobile employees, including shadow payroll, short-term business visitor agreements, and HMRC reporting requirements.' },
  { q: 'How quickly can you take over our London payroll?', a: 'We typically onboard new payroll clients within 48 hours. We collect your existing payroll data, connect to your pension provider, and take over from the next pay run.' },
];

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Reckonwell — London Payroll Services',
  description: 'Managed payroll services for London businesses. Monthly payroll runs, RTI submissions, auto-enrolment, and director salary planning.',
  url: `https://reckonwell.com/london-payroll-services`,
  areaServed: { '@type': 'City', name: city },
  geo: { '@type': 'GeoCoordinates', latitude: coords.lat, longitude: coords.lng },
  priceRange: '££',
  currenciesAccepted: 'GBP',
  openingHours: 'Mo-Fr 09:00-17:30',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Payroll Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Monthly Payroll Run' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'RTI Submissions' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Auto-Enrolment Management' } },
    ],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

export default function LondonPayrollServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Header />
      <main style={{ backgroundColor: 'var(--background)', minHeight: '100vh', paddingTop: '80px' }}>

        {/* Banner */}
        <div className="px-6 md:px-10 py-3" style={{ backgroundColor: 'rgba(201,168,76,0.06)', borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <p className="font-ui text-xs" style={{ color: 'var(--muted)' }}>
              <span style={{ color: 'var(--primary)' }}>Standalone payroll service</span> — no full-accounting engagement required.
            </p>
            <Link href="/payroll-services" className="font-ui text-xs" style={{ color: 'var(--primary)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
              See full payroll service details →
            </Link>
          </div>
        </div>

        {/* Hero */}
        <section className="px-6 md:px-10 py-16 md:py-24" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-5xl mx-auto">
            <p className="section-label mb-4">Payroll Services · London</p>
            <h1 className="font-display mb-6" style={{ fontSize: 'clamp(36px,6vw,72px)', fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              Payroll Services<br />in <em style={{ color: 'var(--primary)' }}>London</em>
            </h1>
            <p className="font-ui mb-8 max-w-2xl" style={{ color: 'var(--muted)', fontSize: '18px', lineHeight: 1.7 }}>
              Monthly payroll, RTI submissions, auto-enrolment, and director salary planning for London businesses. Every deadline met. Every employee paid correctly.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/quotation-calculator" className="btn-gold" style={{ minHeight: '48px', padding: '0 32px', lineHeight: '48px' }}>
                Get Your London Payroll Quote →
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
              See your exact London payroll price
            </h2>
            <p className="font-ui mb-8" style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.7 }}>
              Payroll is priced per employee based on team size and complexity. No London surcharges — same pricing nationwide. Use our quotation calculator to get your exact monthly price in under 2 minutes.
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
              Everything your London payroll needs
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Monthly Payroll Run', desc: 'All London employees paid correctly, on time, every month. Payslips generated and distributed.' },
                { title: 'RTI Submissions', desc: 'Real Time Information submitted to HMRC on or before each pay date. No late submissions.' },
                { title: 'Auto-Enrolment', desc: 'Pension contributions calculated, employee communications handled, TPR compliance maintained.' },
                { title: 'London Living Wage', desc: 'We track London Living Wage rates and ensure your payroll reflects the correct minimums.' },
                { title: 'Starters & Leavers', desc: 'P45 preparation, final pay calculations, and HMRC notifications for all employee changes.' },
                { title: 'Director Salary Planning', desc: 'Optimal salary/dividend split calculated annually to minimise your personal tax liability.' },
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
              London payroll questions
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
                { label: 'Payroll Services UK', href: '/payroll-services' },
                { label: 'London Accounting', href: '/accounting/london' },
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
              Get your London payroll quote
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
