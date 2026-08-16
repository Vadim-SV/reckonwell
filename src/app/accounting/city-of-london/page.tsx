'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import CertifiedPartneredSection from '@/app/components/CertifiedPartneredSection';
import TheDifferenceSection from '@/app/components/TheDifferenceSection';
import ReferralTeaserSection from '@/app/components/ReferralTeaserSection';

const cityName = 'City of London';
const citySlug = 'city-of-london';
const cityDesc = "the Square Mile — London's historic financial district and one of the world's leading financial centres";

const nearbyCities = [
  { name: 'Moorgate', href: '/accounting/moorgate' },
  { name: 'Southwark', href: '/accounting/southwark' },
  { name: 'Tower Hamlets', href: '/accounting/tower-hamlets' },
  { name: 'Islington', href: '/accounting/islington' },
];

const faqs = [
  { q: `Do you work with businesses based in the ${cityName}?`, a: `Yes. We work with financial services firms, fintechs, and professional services businesses across the ${cityName} remotely. All onboarding, filing, and communication is handled online — no need to visit an office.` },
  { q: 'How quickly can you take over my accounting?', a: 'We typically onboard new clients within 48 hours. You share access to your bank and invoicing tools, and we start from there.' },
  { q: 'Do I need to switch accounting software?', a: "We work with Xero, QuickBooks, and FreeAgent. If you're already using one of these, we connect directly. If not, we'll recommend the best fit for your business." },
  { q: 'What does Making Tax Digital mean for my business?', a: 'If your income exceeds £50,000 from self-employment or property, MTD quarterly filing is mandatory from April 2026. We handle all submissions automatically.' },
  { q: `Are your prices higher for ${cityName} businesses?`, a: 'No. Our pricing is the same nationwide. You get the same service quality regardless of location.' },
  { q: 'We are a fintech startup in the Square Mile — what accounting do we need?', a: 'Fintech companies in the City of London typically need limited company accounting, VAT returns, and payroll. If you have a tech development team, R&D tax relief is often applicable. We handle all of this under one monthly fee.' },
  { q: 'How is accounting for City of London different from general London accounting?', a: 'The City of London has a distinct business character — financial services, insurance, legal, and professional advisory firms dominate. The compliance considerations around VAT, IR35, and corporate tax are often more complex than for general London businesses, and we have experience with that specific mix.' },
];

const services = [
  { title: 'Limited Company Accounting', desc: 'CT600, statutory accounts, Companies House filings, and payroll for financial services and professional firms.', href: '/limited-company-accounting', price: 'From £150/mo' },
  { title: 'R&D Tax Relief', desc: 'Professional R&D claims for fintech and innovation-led businesses in the Square Mile.', href: '/r-and-d-tax-relief', price: 'From £850 one-off' },
  { title: 'VAT Returns', desc: 'Quarterly VAT returns and MTD for VAT compliance for City of London businesses.', href: '/vat-returns', price: 'From £80/mo' },
  { title: 'Making Tax Digital', desc: 'Quarterly MTD submissions for sole traders and landlords earning £50k+.', href: '/making-tax-digital', price: 'From £100/mo' },
];

export default function CityPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Header />
      <main style={{ backgroundColor: 'var(--background)', minHeight: '100vh', paddingTop: '80px' }}>

        <Breadcrumb items={[{ label: 'Accounting', href: '/services' }, { label: 'London', href: '/accounting/london' }, { label: cityName, href: `/accounting/${citySlug}` }]} />

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
            <p className="section-label mb-4">Remote Accounting &amp; Bookkeeping in {cityName}</p>
            <h1 className="font-display mb-4" style={{ fontSize: 'clamp(36px,6vw,72px)', fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              Accounting &amp; Bookkeeping<br />in the <em style={{ color: 'var(--primary)' }}>City of London</em>
            </h1>
            <p className="font-ui font-semibold mb-6" style={{ color: 'var(--primary)', fontSize: '16px' }}>
              100% remote — no trip to Threadneedle Street for a meeting.
            </p>
            <p className="font-ui mb-8 max-w-2xl" style={{ color: 'var(--muted)', fontSize: '18px', lineHeight: 1.7 }}>
              Reckonwell works with financial services firms, fintechs, and professional services businesses in {cityDesc}. Transparent pricing, no hidden fees, and a named accountant who knows your business.
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

        <CertifiedPartneredSection variant="full" />

        <TheDifferenceSection />

        {/* Services Grid */}
        <section className="px-6 md:px-10 py-16 md:py-20" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-5xl mx-auto">
            <p className="section-label mb-4">Our Services</p>
            <h2 className="font-display mb-12" style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, color: 'var(--foreground)' }}>
              Accounting support in the City of London
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services?.map((svc, i) => (
                <div key={i} className="p-6 border flex flex-col" style={{ borderColor: 'var(--gold-border)' }}>
                  <p className="font-ui font-medium mb-2" style={{ color: 'var(--foreground)', fontSize: '15px' }}>{svc?.title}</p>
                  <p className="font-ui text-sm mb-4 flex-1" style={{ color: 'var(--muted)', lineHeight: 1.6 }}>{svc?.desc}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-display" style={{ color: 'var(--primary)', fontSize: '18px', fontWeight: 400 }}>{svc?.price}</span>
                    <Link href={svc?.href} className="font-ui text-xs uppercase tracking-widest" style={{ color: 'var(--primary)' }}>Learn more →</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Working With City of London Businesses */}
        <section className="px-6 md:px-10 py-16 md:py-20" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-3xl mx-auto">
            <p className="section-label mb-4">Local Context</p>
            <h2 className="font-display mb-8" style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 400, color: 'var(--foreground)' }}>
              Working With City of London Businesses
            </h2>
            <div className="space-y-6">
              <p className="font-ui" style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.8 }}>
                The City of London — the Square Mile — is London's historic financial district and one of the world's most recognised financial centres. Banks, insurance firms, legal practices, and professional services businesses are the dominant occupiers, but a growing base of fintech companies has established itself here alongside the traditional institutions. Searches for "accountant City of London" carry meaningfully different intent from generic "accountant London" queries — businesses here are typically looking for a firm with experience in financial-services-adjacent compliance, including corporate tax, VAT for professional services, and the specific considerations that arise when your clients are regulated institutions.
              </p>
              <p className="font-ui" style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.8 }}>
                Reckonwell is a fully remote practice — there's no office near Threadneedle Street or the Guildhall. That means no scheduling around the Square Mile's peak-hour congestion, no waiting rooms. Onboarding takes 48 hours, everything runs through Xero, QuickBooks, or FreeAgent, and your accountant is reachable directly. For City businesses that value efficiency and directness, that tends to be a better fit than a traditional local firm.
              </p>
            </div>
          </div>
        </section>

        {/* Compliance Deadlines */}
        <section className="px-6 md:px-10 py-16 md:py-20" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-3xl mx-auto">
            <p className="section-label mb-4">Compliance Deadlines</p>
            <h2 className="font-display mb-8" style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 400, color: 'var(--foreground)' }}>
              MTD &amp; Companies House — what applies to you
            </h2>
            <div className="space-y-6">
              <p className="font-ui" style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.8 }}>
                Making Tax Digital for Income Tax became mandatory from 6 April 2026 for sole traders and landlords with gross qualifying income over £50,000, based on your 2024/25 Self Assessment return. If that's you, you're already required to keep digital records and file quarterly updates rather than a single annual return — the first quarterly deadline for the 2026/27 tax year fell on 7 August 2026. The threshold drops to £30,000 from April 2027 and £20,000 from April 2028, so many more City of London sole traders and landlords currently below the £50k line will be brought into MTD over the next two years. We handle the quarterly submissions directly, so you're not tracking deadlines across four separate filings a year.
              </p>
              <p className="font-ui" style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.8 }}>
                For limited companies, Companies House filings and Corporation Tax remain unaffected by the MTD ITSA rollout — annual accounts and CT600 deadlines still apply as before. If you're running a limited company from the City of London and also have personal rental income or self-employment earnings above the threshold, both sets of obligations run in parallel, which is where most of the confusion — and most of the missed deadlines — tends to happen. We track both for clients who fall into that overlap.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="px-6 md:px-10 py-16 md:py-20" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="section-label mb-4">Transparent Pricing</p>
            <h2 className="font-display mb-6" style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, color: 'var(--foreground)' }}>
              See your exact City of London accounting price
            </h2>
            <p className="font-ui mb-8" style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.7 }}>
              Pricing is based on your business type, income level, and the services you need. Use our quotation calculator to get your exact monthly price in under 2 minutes — no sales calls required.
            </p>
            <Link href="/quotation-calculator" className="btn-gold" style={{ minHeight: '48px', padding: '0 40px', lineHeight: '48px', display: 'inline-block' }}>
              Get Your Exact Quote →
            </Link>
          </div>
        </section>

        <ReferralTeaserSection />

        {/* FAQ */}
        <section className="px-6 md:px-10 py-16 md:py-20" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-3xl mx-auto">
            <p className="section-label mb-4">FAQ</p>
            <h2 className="font-display mb-10" style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 400, color: 'var(--foreground)' }}>
              Questions from City of London businesses
            </h2>
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

        {/* CTA */}
        <section className="px-6 md:px-10 py-16 md:py-20" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="section-label mb-4">Get Started</p>
            <h2 className="font-display mb-6" style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, color: 'var(--foreground)' }}>
              Get your City of London accounting quote
            </h2>
            <p className="font-ui mb-8" style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.7 }}>
              Transparent pricing. No sales calls. See your exact monthly price in under 2 minutes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/quotation-calculator" className="btn-gold" style={{ minHeight: '48px', padding: '0 32px', lineHeight: '48px' }}>Get Your Quote →</Link>
              <Link href="/contact" className="btn-ghost" style={{ minHeight: '48px', padding: '0 24px', lineHeight: '48px' }}>Speak to an Accountant</Link>
            </div>
          </div>
        </section>

        {/* Also Serving Nearby */}
        <section className="px-6 md:px-10 py-8" style={{ borderBottom: '1px solid var(--gold-border)', backgroundColor: 'rgba(201,168,76,0.03)' }}>
          <div className="max-w-5xl mx-auto">
            <p className="font-ui text-xs mb-3" style={{ color: 'var(--muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>Also Serving Nearby</p>
            <div className="flex flex-wrap gap-4">
              {nearbyCities?.map((city) => (
                <Link key={city?.href} href={city?.href} className="font-ui text-sm" style={{ color: 'var(--primary)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                  {city?.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 py-6" style={{ borderBottom: '1px solid var(--gold-border)', backgroundColor: 'rgba(201,168,76,0.02)' }}>
          <div className="max-w-5xl mx-auto">
            <Link href="/accounting/london" className="font-ui text-sm" style={{ color: 'var(--primary)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
              Part of Greater London — see our full London accounting services →
            </Link>
          </div>
        </section>

        <section className="px-6 md:px-10 py-8" style={{ borderTop: '1px solid var(--gold-border)', backgroundColor: 'rgba(201,168,76,0.04)' }}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-ui text-sm mb-2" style={{ color: 'var(--muted)', lineHeight: 1.6 }}>Need a full finance team for your City of London business?</p>
            <Link href="/" className="font-ui text-sm" style={{ color: 'var(--primary)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
              Our Fractional Finance Department handles all of this and more — daily →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: 'Reckonwell',
        description: `Accounting and bookkeeping services for businesses in the City of London. Financial services, fintech, professional services, limited company, and VAT.`,
        url: `https://reckonwell.com/accounting/${citySlug}`,
        areaServed: { '@type': 'Place', name: 'City of London' },
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
