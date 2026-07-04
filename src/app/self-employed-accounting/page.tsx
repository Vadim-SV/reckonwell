'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TheDifferenceSection from '@/app/components/TheDifferenceSection';

const faqs = [
  { q: 'Who needs to file a Self Assessment?', a: 'Anyone self-employed, a sole trader, or with income outside PAYE — including rental income, dividends, or foreign income. If HMRC has asked you to file, you must file.' },
  { q: 'What does monthly monitoring include?', a: 'We review your income and expenses every month, provide a running tax estimate, and flag anything that needs attention — rather than waiting until January to look at the whole year.' },
  { q: 'Do I need to do anything myself?', a: 'Very little. You share access to your bank and invoicing tools. We handle categorisation, calculations, and filing. You approve the return before it goes to HMRC.' },
  { q: 'What if my income changes during the year?', a: "That\'s exactly why monthly monitoring exists. We adjust your tax estimate in real time so there are no surprises at year-end." },
  { q: 'Do you handle Making Tax Digital (MTD)?', a: 'Yes. If your income exceeds £50,000, MTD quarterly filing is mandatory. We include MTD compliance in all relevant packages at no extra charge.' },
];

export default function SelfEmployedAccountingPage() {
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
            <p className="section-label mb-4">Service</p>
            <h1 className="font-display mb-6" style={{ fontSize: 'clamp(36px,6vw,72px)', fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              Self-Employed<br /><em style={{ color: 'var(--primary)' }}>Accounting</em>
            </h1>
            <p className="font-ui mb-8 max-w-2xl" style={{ color: 'var(--muted)', fontSize: '18px', lineHeight: 1.7 }}>
              For freelancers, contractors, and sole traders. We handle your Self Assessment, keep your tax position clear all year, and make sure you never miss a deadline.
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

        <TheDifferenceSection />

        {/* Pricing */}
        <section className="px-6 md:px-10 py-16 md:py-20" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="section-label mb-4">Transparent Pricing</p>
            <h2 className="font-display mb-6" style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, color: 'var(--foreground)' }}>
              See your exact self-employed accounting price
            </h2>
            <p className="font-ui mb-8" style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.7 }}>
              Pricing is based on your income level, transaction volume, and monitoring frequency. Use our quotation calculator to get your exact monthly price in under 2 minutes — no sales calls required.
            </p>
            <Link href="/quotation-calculator" className="btn-gold" style={{ minHeight: '48px', padding: '0 40px', lineHeight: '48px', display: 'inline-block' }}>
              Get Your Exact Quote →
            </Link>
          </div>
        </section>

        {/* What's Included */}
        <section className="px-6 md:px-10 py-16 md:py-20" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="section-label mb-4">What&apos;s Included</p>
              <h2 className="font-display mb-6" style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 400, color: 'var(--foreground)' }}>
                Everything handled.<br />Nothing missed.
              </h2>
              <p className="font-ui" style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.7 }}>
                From the moment you sign up, we take over your tax affairs completely. You focus on earning. We handle the compliance.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { title: 'Self Assessment Filing', desc: 'Annual SA100 return prepared and submitted to HMRC before the January 31 deadline.' },
                { title: 'Year-Round Tax Monitoring', desc: 'We track your income and expenses throughout the year — no surprises at year-end.' },
                { title: 'MTD Quarterly Filings', desc: 'If your income exceeds £50k, we handle all four quarterly MTD submissions automatically.' },
                { title: 'HMRC Correspondence', desc: 'Any letters, queries, or investigations — we respond on your behalf.' },
                { title: 'Expense Optimisation', desc: 'We identify every allowable deduction to minimise your tax bill legally.' },
                { title: 'Daily Bookkeeping', desc: 'Transactions categorised daily, not monthly. Your books are always current.' },
              ]?.map((item, i) => (
                <div key={i} className="flex gap-4 p-4 border" style={{ borderColor: 'var(--gold-border)' }}>
                  <span style={{ color: 'var(--primary)', fontSize: '18px', marginTop: '2px' }}>✓</span>
                  <div>
                    <p className="font-ui font-medium mb-1" style={{ color: 'var(--foreground)', fontSize: '14px' }}>{item?.title}</p>
                    <p className="font-ui text-sm" style={{ color: 'var(--muted)', lineHeight: 1.6 }}>{item?.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="px-6 md:px-10 py-16 md:py-20" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-5xl mx-auto">
            <p className="section-label mb-4">Process</p>
            <h2 className="font-display mb-12" style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 400, color: 'var(--foreground)' }}>
              How it works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Onboard in 48 hours', desc: 'Share access to your bank and invoicing tools. We set up your accounts and start categorising transactions immediately.' },
                { step: '02', title: 'We monitor year-round', desc: 'Every month, we review your books, update your tax estimate, and flag anything that needs your attention.' },
                { step: '03', title: 'We file on time', desc: 'Your Self Assessment is prepared, reviewed with you, and submitted before the deadline. No chasing, no stress.' },
              ]?.map((item, i) => (
                <div key={i} className="p-6 border" style={{ borderColor: 'var(--gold-border)' }}>
                  <p className="font-display mb-4" style={{ fontSize: '48px', color: 'rgba(201,168,76,0.2)', fontWeight: 400, lineHeight: 1 }}>{item?.step}</p>
                  <p className="font-ui font-medium mb-2" style={{ color: 'var(--foreground)', fontSize: '15px' }}>{item?.title}</p>
                  <p className="font-ui text-sm" style={{ color: 'var(--muted)', lineHeight: 1.7 }}>{item?.desc}</p>
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
              Know your price in 60 seconds
            </h2>
            <p className="font-ui mb-8" style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.7 }}>
              Use our calculator to get an exact monthly price based on your income and complexity.
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
              {['FIAB Certified', 'IAB Member', 'No hidden fees', 'Cancel anytime']?.map(t => (
                <div key={t} className="flex items-center gap-2">
                  <span style={{ color: 'var(--primary)', fontSize: '12px' }}>✓</span>
                  <span className="font-ui text-xs" style={{ color: 'var(--muted)' }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fractional Finance Callout */}
        <section className="px-6 md:px-10 py-8" style={{ borderTop: '1px solid var(--gold-border)', backgroundColor: 'rgba(201,168,76,0.04)' }}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-ui text-sm mb-2" style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
              Want daily bookkeeping and real-time management accounts?
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
        '@type': 'Service',
        name: 'Self-Employed Accounting',
        provider: { '@type': 'LocalBusiness', name: 'Reckonwell', url: 'https://reckonwell.com' },
        description: 'Self Assessment filing, tax monitoring, and MTD compliance for freelancers and sole traders.',
        url: 'https://reckonwell.com/self-employed-accounting',
        areaServed: 'GB',
        offers: { '@type': 'Offer', price: '80', priceCurrency: 'GBP', priceSpecification: { '@type': 'UnitPriceSpecification', price: '80', priceCurrency: 'GBP', unitText: 'MONTH' } },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs?.map(f => ({ '@type': 'Question', name: f?.q, acceptedAnswer: { '@type': 'Answer', text: f?.a } })),
      }) }} />
    </>
  );
}
