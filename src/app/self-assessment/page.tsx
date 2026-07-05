'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

const faqs = [
  {
    q: 'Who needs to file a Self Assessment?',
    a: 'Anyone self-employed, a sole trader, or with income outside PAYE — including rental income, dividends, or foreign income. If HMRC has asked you to file, you must file.',
  },
  {
    q: 'What does monthly monitoring include?',
    a: 'We review your income and expenses every month, provide a running tax estimate, and flag anything that needs attention — rather than waiting until January to look at the whole year.',
  },
  {
    q: 'Do I need to do anything myself?',
    a: 'Very little. You share access to your bank and invoicing tools. We handle categorisation, calculations, and filing. You approve the return before it goes to HMRC.',
  },
  {
    q: 'What if my income changes during the year?',
    a: "That\'s exactly why monthly monitoring exists. We adjust your tax estimate in real time so there are no surprises at year-end.",
  },
  {
    q: 'Do you handle Making Tax Digital (MTD)?',
    a: 'Yes. If your income exceeds £50,000, MTD quarterly filing is mandatory. We include MTD compliance in all relevant packages at no extra charge.',
  },
  {
    q: 'What is the difference between annual filing and monthly monitoring?',
    a: 'Annual filing is a once-a-year service — we prepare and submit your Self Assessment return. Monthly monitoring means we track your finances all year, so your tax position is always clear and there are no January surprises.',
  },
];

const included = [
  'Self Assessment tax return preparation',
  'HMRC submission and confirmation',
  'Tax calculation and review',
  'Deadline reminders and management',
  'HMRC correspondence handled',
  'MTD quarterly filings (if income over £50k)',
  'Year-round tax position tracking',
  'Allowable expenses review',
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Self Assessment Accounting',
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
  description: 'Standalone self-assessment filing for sole traders and freelancers. From £80/month. MTD-ready.',
  url: 'https://reckonwell.com/self-assessment',
  areaServed: 'GB',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'GBP',
    price: '80',
    description: 'From £80/month for self-assessment accounting',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs?.map(f => ({
    '@type': 'Question',
    name: f?.q,
    acceptedAnswer: { '@type': 'Answer', text: f?.a },
  })),
};

export default function SelfAssessmentPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <main style={{ backgroundColor: 'var(--background)', minHeight: '100vh', paddingTop: '80px' }}>

        <Breadcrumb items={[{ label: 'Services', href: '/services' }, { label: 'Self Assessment', href: '/self-assessment' }]} />

        {/* Standalone frame */}
        <div className="px-6 md:px-10 py-3" style={{ backgroundColor: 'rgba(201,168,76,0.06)', borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <p className="font-ui text-xs" style={{ color: 'var(--muted)' }}>
              <span style={{ color: 'var(--primary)' }}>Standalone compliance service</span> — no ongoing engagement required.
            </p>
            <Link href="/#pricing" className="font-ui text-xs" style={{ color: 'var(--primary)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
              Need a full finance team? See Fractional Finance →
            </Link>
          </div>
        </div>

        {/* Hero */}
        <section className="px-6 md:px-10 py-16 md:py-24" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-5xl mx-auto">
            <p className="section-label mb-4">Compliance Service</p>
            <h1 className="font-display mb-6" style={{ fontSize: 'clamp(36px,6vw,72px)', fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              Self Assessment<br /><em style={{ color: 'var(--primary)' }}>Accounting</em>
            </h1>
            <p className="font-ui mb-8 max-w-2xl" style={{ color: 'var(--muted)', fontSize: '18px', lineHeight: 1.7 }}>
              For freelancers, contractors, and sole traders. We handle your Self Assessment, keep your tax position clear all year, and make sure you never miss a deadline. From £80/month.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/quotation-calculator/?service=self-assessment" className="btn-gold" style={{ minHeight: '48px', padding: '0 32px', lineHeight: '48px' }}>
                Get Your Quote →
              </Link>
              <Link href="/contact" className="btn-ghost" style={{ minHeight: '48px', padding: '0 24px', lineHeight: '48px' }}>
                Ask a Question
              </Link>
            </div>
          </div>
        </section>

        {/* Pricing tiers */}
        <section className="px-6 md:px-10 py-16 md:py-20" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="section-label mb-4">Pricing</p>
            <h2 className="font-display mb-6" style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, color: 'var(--foreground)' }}>
              See your exact Self Assessment price
            </h2>
            <p className="font-ui mb-8" style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.7 }}>
              Pricing depends on your income level, complexity, and monitoring frequency. Use our quotation calculator to get your exact monthly price in under 2 minutes — no surprises.
            </p>
            <Link href="/quotation-calculator" className="btn-gold" style={{ minHeight: '48px', padding: '0 40px', lineHeight: '48px', display: 'inline-block' }}>
              Get Your Exact Quote →
            </Link>
          </div>
        </section>

        {/* What's included */}
        <section className="px-6 md:px-10 py-16 md:py-20" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-5xl mx-auto">
            <p className="section-label mb-4">Included</p>
            <h2 className="font-display mb-10" style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 400, color: 'var(--foreground)' }}>
              What&apos;s included in every plan
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {included?.map(item => (
                <div key={item} className="flex items-center gap-3 p-4" style={{ border: '1px solid var(--border-subtle)', backgroundColor: 'var(--card)' }}>
                  <span style={{ color: 'var(--primary)', fontSize: '16px', flexShrink: 0 }}>—</span>
                  <span className="font-ui text-sm" style={{ color: 'var(--body-text)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="px-6 md:px-10 py-16 md:py-20" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-5xl mx-auto">
            <p className="section-label mb-4">Process</p>
            <h2 className="font-display mb-10" style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 400, color: 'var(--foreground)' }}>
              How it works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Get a quote', desc: 'Use our calculator to see your exact price in 2 minutes.' },
                { step: '02', title: 'Onboard in 48h', desc: 'We connect to your bank and accounting software. No paperwork.' },
                { step: '03', title: 'We handle it', desc: 'We categorise, calculate, and prepare your return throughout the year.' },
                { step: '04', title: 'You approve & file', desc: 'Review your return, approve it, and we submit to HMRC.' },
              ]?.map(s => (
                <div key={s?.step}>
                  <p className="font-ui mb-3" style={{ fontSize: '10px', letterSpacing: '3px', color: 'var(--primary)', textTransform: 'uppercase' }}>{s?.step}</p>
                  <h3 className="font-display mb-2" style={{ fontSize: '18px', fontWeight: 400, color: 'var(--foreground)' }}>{s?.title}</h3>
                  <p className="font-serif" style={{ fontStyle: 'italic', fontSize: '14px', color: 'var(--body-text)', lineHeight: 1.5 }}>{s?.desc}</p>
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
            <div className="space-y-3">
              {faqs?.map((faq, i) => (
                <div key={i} style={{ border: '1px solid var(--border-subtle)', backgroundColor: 'var(--card)' }}>
                  <button
                    className="w-full flex items-center justify-between p-5 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-ui text-sm font-medium" style={{ color: 'var(--foreground)', letterSpacing: '0.3px' }}>{faq?.q}</span>
                    <span style={{ color: 'var(--primary)', fontSize: '18px', flexShrink: 0, marginLeft: '12px' }}>{openFaq === i ? '−' : '+'}</span>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5">
                      <p className="font-serif" style={{ fontStyle: 'italic', fontSize: '14px', color: 'var(--body-text)', lineHeight: 1.7 }}>{faq?.a}</p>
                    </div>
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
            <h2 className="font-display mb-6" style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 400, color: 'var(--foreground)' }}>
              Ready to take Self Assessment<br /><em style={{ color: 'var(--primary)' }}>off your plate?</em>
            </h2>
            <p className="font-ui mb-8" style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.7 }}>
              Get your instant quote in 2 minutes. No sales call required.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/quotation-calculator/?service=self-assessment" className="btn-gold" style={{ minHeight: '48px', padding: '0 40px', lineHeight: '48px' }}>
                Get Your Quote →
              </Link>
              <Link href="/book" className="btn-ghost" style={{ minHeight: '48px', padding: '0 24px', lineHeight: '48px' }}>
                Book a Call
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
