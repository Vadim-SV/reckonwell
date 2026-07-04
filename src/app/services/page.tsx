'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CertifiedPartneredSection from '@/app/components/CertifiedPartneredSection';

const complianceServices = [
  {
    title: 'Self-Employed Accounting',
    desc: 'Self Assessment filing, MTD compliance, and year-round tax monitoring for freelancers and sole traders.',
    price: 'From £80/month',
    href: '/self-employed-accounting',
  },
  {
    title: 'Limited Company Accounting',
    desc: 'CT600, statutory accounts, Companies House filings, payroll, and VAT returns for UK limited companies.',
    price: 'From £150/month',
    href: '/limited-company-accounting',
  },
  {
    title: 'Making Tax Digital',
    desc: 'Mandatory quarterly filing for sole traders and landlords earning £50k+. Compliant with April 2026 rules.',
    price: 'From £34/month',
    href: '/making-tax-digital',
  },
  {
    title: 'R&D Tax Relief',
    desc: 'Professional R&D tax relief claims. Get up to 20% of qualifying spend back from HMRC.',
    price: 'From £850 one-off',
    href: '/r-and-d-tax-relief',
  },
  {
    title: 'Payroll Services',
    desc: 'RTI submissions, auto-enrolment, and payroll management for UK businesses.',
    price: 'From £40/employee',
    href: '/payroll-services',
  },
  {
    title: 'Get a Quote',
    desc: 'Use our instant pricing calculator to see your exact monthly price in under 2 minutes.',
    price: 'Transparent pricing',
    href: '/quotation-calculator',
    highlight: true,
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'UK Accounting & Compliance Services',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Reckonwell',
    url: 'https://reckonwell.com',
    telephone: '+442038186205',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '124 City Road',
      addressLocality: 'London',
      postalCode: 'EC1V 2NX',
      addressCountry: 'GB',
    },
  },
  description: 'Fractional finance department and standalone compliance services for UK businesses.',
  url: 'https://reckonwell.com/services',
  areaServed: 'GB',
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main style={{ backgroundColor: 'var(--background)', minHeight: '100vh', paddingTop: '80px' }}>

        {/* Hero */}
        <section className="px-6 md:px-10 py-16 md:py-24" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-5xl mx-auto text-center">
            <p className="section-label mb-4">Our Services</p>
            <h1 className="font-display mb-6" style={{ fontSize: 'clamp(36px,6vw,72px)', fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              Two Ways to<br /><em style={{ color: 'var(--primary)' }}>Work With Us</em>
            </h1>
            <p className="font-ui max-w-2xl mx-auto" style={{ color: 'var(--muted)', fontSize: '18px', lineHeight: 1.7 }}>
              A full fractional finance department for growing businesses, or standalone compliance services for specific needs. Both transparent. Both fixed-price.
            </p>
          </div>
        </section>

        {/* Two-Tier Explainer */}
        <section className="px-6 md:px-10 py-16 md:py-20" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Tier 1: Fractional Finance */}
            <div className="p-8 border flex flex-col" style={{ borderColor: 'var(--primary)', backgroundColor: 'rgba(201,168,76,0.04)' }}>
              <p className="section-label mb-3">Tier 1</p>
              <h2 className="font-display mb-3" style={{ fontSize: 'clamp(24px,3vw,36px)', fontWeight: 400, color: 'var(--foreground)' }}>
                Fractional Finance Department
              </h2>
              <p className="font-ui mb-2" style={{ color: 'var(--primary)', fontSize: '14px', fontWeight: 500 }}>From £200/month</p>
              <p className="font-ui mb-6 flex-1" style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.7 }}>
                Your dedicated finance team — working on your books every day. Daily bookkeeping, real-time cash flow monitoring, management accounts, and proactive financial alerts. For founder-led businesses turning £250k–£10m.
              </p>
              <div className="space-y-2 mb-6">
                {['Daily bookkeeping & categorisation', 'Real-time cash flow monitoring', 'Monthly management accounts', 'Proactive tax planning', 'Dedicated named accountant', 'All compliance included'].map((f) => (
                  <div key={f} className="flex items-start gap-2">
                    <span style={{ color: 'var(--primary)', fontSize: '12px', marginTop: '2px' }}>✓</span>
                    <span className="font-ui text-sm" style={{ color: 'var(--body-text)' }}>{f}</span>
                  </div>
                ))}
              </div>
              <Link href="/" className="btn-gold inline-block text-center" style={{ minHeight: '48px', lineHeight: '48px', padding: '0 24px' }}>
                Learn More →
              </Link>
            </div>

            {/* Tier 2: Compliance Services */}
            <div className="p-8 border flex flex-col" style={{ borderColor: 'var(--gold-border)', backgroundColor: 'transparent' }}>
              <p className="section-label mb-3">Tier 2</p>
              <h2 className="font-display mb-3" style={{ fontSize: 'clamp(24px,3vw,36px)', fontWeight: 400, color: 'var(--foreground)' }}>
                Standalone Compliance Services
              </h2>
              <p className="font-ui mb-2" style={{ color: 'var(--primary)', fontSize: '14px', fontWeight: 500 }}>From £34/month</p>
              <p className="font-ui mb-6 flex-1" style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.7 }}>
                Specific compliance work, handled properly. No ongoing engagement required. Self Assessment, corporation tax, MTD, R&D claims — transactional services for businesses that need specific compliance work done right.
              </p>
              <div className="space-y-2 mb-6">
                {['Self-employed & sole trader accounting', 'Limited company CT600 & accounts', 'Making Tax Digital quarterly filing', 'R&D tax relief claims', 'No minimum contract', 'Instant online quote'].map((f) => (
                  <div key={f} className="flex items-start gap-2">
                    <span style={{ color: 'var(--primary)', fontSize: '12px', marginTop: '2px' }}>✓</span>
                    <span className="font-ui text-sm" style={{ color: 'var(--body-text)' }}>{f}</span>
                  </div>
                ))}
              </div>
              <a href="#compliance-services" className="btn-ghost inline-block text-center" style={{ minHeight: '48px', lineHeight: '48px', padding: '0 24px' }}>
                See Compliance Services ↓
              </a>
            </div>
          </div>
        </section>

        {/* Compliance Services Grid */}
        <section id="compliance-services" className="px-6 md:px-10 py-16 md:py-20" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-5xl mx-auto">
            <p className="section-label mb-4">Compliance Services</p>
            <h2 className="font-display mb-4" style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, color: 'var(--foreground)' }}>
              Standalone compliance.<br />No ongoing engagement required.
            </h2>
            <p className="font-ui mb-12 max-w-2xl" style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.7 }}>
              Each service is available independently. Pay only for what you need. Transparent fixed pricing — see your exact cost before you commit.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {complianceServices.map((service, i) => (
                <Link
                  key={i}
                  href={service.href}
                  className="p-6 border flex flex-col group transition-all duration-200"
                  style={{
                    borderColor: service.highlight ? 'var(--primary)' : 'var(--gold-border)',
                    backgroundColor: service.highlight ? 'rgba(201,168,76,0.04)' : 'transparent',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--primary)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = service.highlight ? 'var(--primary)' : 'var(--gold-border)'; }}
                >
                  <p className="font-ui font-medium mb-2" style={{ color: 'var(--foreground)', fontSize: '15px' }}>{service.title}</p>
                  <p className="font-ui text-sm mb-4 flex-1" style={{ color: 'var(--muted)', lineHeight: 1.6 }}>{service.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-ui text-xs" style={{ color: 'var(--primary)' }}>{service.price}</span>
                    <span style={{ color: 'var(--primary)', fontSize: '14px' }}>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison: Which is right for me? */}
        <section className="px-6 md:px-10 py-16 md:py-20" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-5xl mx-auto">
            <p className="section-label mb-4">Which Is Right For You?</p>
            <h2 className="font-display mb-10" style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 400, color: 'var(--foreground)' }}>
              Choose based on your situation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 border" style={{ borderColor: 'var(--gold-border)' }}>
                <p className="font-ui font-medium mb-4" style={{ color: 'var(--foreground)', fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>Choose Fractional Finance if…</p>
                <div className="space-y-3">
                  {[
                    'You turn over £250k–£10m',
                    'You want daily bookkeeping, not annual',
                    'You need real-time cash flow visibility',
                    'You want a proactive finance team',
                    'You\'re a founder-led business scaling fast',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <span style={{ color: 'var(--primary)', fontSize: '12px', marginTop: '2px' }}>✓</span>
                      <span className="font-ui text-sm" style={{ color: 'var(--body-text)' }}>{item}</span>
                    </div>
                  ))}
                </div>
                <Link href="/" className="mt-6 inline-block font-ui text-xs uppercase tracking-widest" style={{ color: 'var(--primary)' }}>
                  See Fractional Finance →
                </Link>
              </div>
              <div className="p-6 border" style={{ borderColor: 'var(--gold-border)' }}>
                <p className="font-ui font-medium mb-4" style={{ color: 'var(--foreground)', fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>Choose Compliance Services if…</p>
                <div className="space-y-3">
                  {[
                    'You need specific filings handled (Self Assessment, CT600)',
                    'You\'re a sole trader or small limited company',
                    'You want transparent one-off or monthly pricing',
                    'You don\'t need daily bookkeeping',
                    'You want to start with one service and expand later',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <span style={{ color: 'var(--primary)', fontSize: '12px', marginTop: '2px' }}>✓</span>
                      <span className="font-ui text-sm" style={{ color: 'var(--body-text)' }}>{item}</span>
                    </div>
                  ))}
                </div>
                <Link href="/quotation-calculator" className="mt-6 inline-block font-ui text-xs uppercase tracking-widest" style={{ color: 'var(--primary)' }}>
                  Get Instant Quote →
                </Link>
              </div>
            </div>
          </div>
        </section>

        <CertifiedPartneredSection variant="full" />

        {/* Bottom CTA */}
        <section className="px-6 md:px-10 py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <p className="section-label mb-4">Not Sure?</p>
            <h2 className="font-display mb-6" style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, color: 'var(--foreground)' }}>
              We&apos;ll tell you which fits
            </h2>
            <p className="font-ui mb-8" style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.7 }}>
              Book a free 15-minute call. We&apos;ll ask a few questions and tell you exactly which service fits your situation — and what it costs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/book" className="btn-gold" style={{ minHeight: '48px', padding: '0 32px', lineHeight: '48px' }}>
                Book a Free Call →
              </Link>
              <Link href="/quotation-calculator" className="btn-ghost" style={{ minHeight: '48px', padding: '0 24px', lineHeight: '48px' }}>
                Get Instant Quote
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
