'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CertifiedPartneredSection from '@/app/components/CertifiedPartneredSection';

const cityName = 'York';
const citySlug = 'york';
const cityDesc = 'a historic city with a diverse economy spanning retail, hospitality, professional services, and a growing tech sector';
const businessCount = '14,000+';
const coords = { lat: 53.9590, lng: -1.0815 };

const faqs = [
  { q: `Do you work with businesses based in ${cityName}?`, a: `Yes. We work with businesses across ${cityName} and the wider UK remotely. All onboarding, filing, and communication is handled online — no need to visit an office.` },
  { q: 'How quickly can you take over my accounting?', a: 'We typically onboard new clients within 48 hours. You share access to your bank and invoicing tools, and we start from there.' },
  { q: 'Do I need to switch accounting software?', a: 'We work with Xero, QuickBooks, and FreeAgent. If you\'re already using one of these, we connect directly. If not, we\'ll recommend the best fit for your business.' },
  { q: 'What does Making Tax Digital mean for my business?', a: 'If your income exceeds £50,000 from self-employment or property, MTD quarterly filing is mandatory from April 2026. We handle all submissions automatically.' },
  { q: `Are your prices higher for ${cityName} businesses?`, a: 'No. Our pricing is the same nationwide. You get the same service quality regardless of location.' },
  { q: `I run a retail or hospitality business in ${cityName} — what do I need?`, a: `York's retail and hospitality businesses often have seasonal cash flow and multiple income streams. Our self-employed package (from £80/month) covers Self Assessment and MTD compliance, while our limited company package (from £150/month) handles CT600, payroll, and Companies House filings for incorporated businesses.` },
];

const services = [
  { title: 'Self-Employed Accounting', desc: 'Self Assessment, MTD compliance, and year-round tax monitoring for freelancers and sole traders.', href: '/self-employed-accounting', price: 'From £80/mo' },
  { title: 'Limited Company Accounting', desc: 'CT600, statutory accounts, Companies House filings, and payroll for limited companies.', href: '/limited-company-accounting', price: 'From £150/mo' },
  { title: 'Making Tax Digital', desc: 'Quarterly MTD submissions for sole traders and landlords earning £50k+.', href: '/making-tax-digital', price: 'From £100/mo' },
  { title: 'R&D Tax Relief', desc: 'Professional R&D claims for tech, engineering, and innovation-led businesses.', href: '/r-and-d-tax-relief', price: 'From £850 one-off' },
];

export default function CityPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Header />
      <main style={{ backgroundColor: 'var(--background)', minHeight: '100vh', paddingTop: '80px' }}>

        {/* Standalone Compliance Frame */}
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
            <p className="section-label mb-4">Local Accounting Services</p>
            <h1 className="font-display mb-6" style={{ fontSize: 'clamp(36px,6vw,72px)', fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              Accounting Services<br />in <em style={{ color: 'var(--primary)' }}>{cityName}</em>
            </h1>
            <p className="font-ui mb-8 max-w-2xl" style={{ color: 'var(--muted)', fontSize: '18px', lineHeight: 1.7 }}>
              Reckonwell serves {businessCount} businesses in {cityDesc}. Transparent pricing, no hidden fees, and a named accountant who knows your business.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/quotation-calculator" className="btn-gold" style={{ minHeight: '48px', padding: '0 32px', lineHeight: '48px' }}>
                Get Your {cityName} Quote →
              </Link>
              <Link href="/contact" className="btn-ghost" style={{ minHeight: '48px', padding: '0 24px', lineHeight: '48px' }}>
                Ask a Question
              </Link>
            </div>
          </div>
        </section>

        <CertifiedPartneredSection variant="full" />

        {/* Services Grid */}
        <section className="px-6 md:px-10 py-16 md:py-20" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-5xl mx-auto">
            <p className="section-label mb-4">Our Services</p>
            <h2 className="font-display mb-12" style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, color: 'var(--foreground)' }}>
              Compliance services for {cityName} businesses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services?.map((svc, i) => (
                <div key={i} className="p-6 border flex flex-col" style={{ borderColor: 'var(--gold-border)' }}>
                  <p className="font-ui font-medium mb-2" style={{ color: 'var(--foreground)', fontSize: '15px' }}>{svc?.title}</p>
                  <p className="font-ui text-sm mb-4 flex-1" style={{ color: 'var(--muted)', lineHeight: 1.6 }}>{svc?.desc}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-display" style={{ color: 'var(--primary)', fontSize: '18px', fontWeight: 400 }}>{svc?.price}</span>
                    <Link href={svc?.href} className="font-ui text-xs uppercase tracking-widest" style={{ color: 'var(--primary)' }}>
                      Learn more →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Table */}
        <section className="px-6 md:px-10 py-16 md:py-20" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="section-label mb-4">Transparent Pricing</p>
            <h2 className="font-display mb-6" style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, color: 'var(--foreground)' }}>
              See your exact {cityName} accounting price
            </h2>
            <p className="font-ui mb-8" style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.7 }}>
              Pricing is based on your business type, income level, and the services you need. Use our quotation calculator to get your exact monthly price in under 2 minutes — no sales calls required.
            </p>
            <Link href="/quotation-calculator" className="btn-gold" style={{ minHeight: '48px', padding: '0 40px', lineHeight: '48px', display: 'inline-block' }}>
              Get Your Exact Quote →
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-6 md:px-10 py-16 md:py-20" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-3xl mx-auto">
            <p className="section-label mb-4">FAQ</p>
            <h2 className="font-display mb-10" style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 400, color: 'var(--foreground)' }}>
              Questions from {cityName} businesses
            </h2>
            <div className="space-y-0">
              {faqs?.map((faq, i) => (
                <div key={i} style={{ borderBottom: '1px solid var(--gold-border)' }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex justify-between items-center py-5 text-left"
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <span className="font-ui font-medium pr-4" style={{ color: 'var(--foreground)', fontSize: '15px' }}>{faq?.q}</span>
                    <span style={{ color: 'var(--primary)', fontSize: '20px', flexShrink: 0, transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
                  </button>
                  {openFaq === i && (
                    <p className="font-ui text-sm pb-5" style={{ color: 'var(--muted)', lineHeight: 1.7 }}>{faq?.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-10 py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <p className="section-label mb-4">Get Started</p>
            <h2 className="font-display mb-6" style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, color: 'var(--foreground)' }}>
              Get your {cityName} accounting quote
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
          </div>
        </section>

        {/* Fractional Finance Callout */}
        <section className="px-6 md:px-10 py-8" style={{ borderTop: '1px solid var(--gold-border)', backgroundColor: 'rgba(201,168,76,0.04)' }}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-ui text-sm mb-2" style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
              Need a full finance team for your {cityName} business?
            </p>
            <Link href="/" className="font-ui text-sm" style={{ color: 'var(--primary)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
              Our Fractional Finance Department handles all of this and more — daily →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'Reckonwell',
        description: `Accounting services for businesses in ${cityName}. Self-employed, limited company, MTD, and R&D tax relief.`,
        url: `https://reckonwell.com/accounting/${citySlug}`,
        telephone: '',
        areaServed: { '@type': 'City', name: cityName },
        geo: { '@type': 'GeoCoordinates', latitude: coords?.lat, longitude: coords?.lng },
        priceRange: '££',
        currenciesAccepted: 'GBP',
        openingHours: 'Mo-Fr 09:00-17:30',
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs?.map(f => ({ '@type': 'Question', name: f?.q, acceptedAnswer: { '@type': 'Answer', text: f?.a } })),
      }) }} />
    </>
  );
}
