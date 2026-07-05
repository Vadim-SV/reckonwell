'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TheDifferenceSection from '@/app/components/TheDifferenceSection';
import ReferralTeaserSection from '@/app/components/ReferralTeaserSection';

const faqs = [
  { q: 'Do I actually need MTD?', a: 'If you earn over £50k as self-employed or a landlord, yes. It\'s not optional. HMRC enforces it. Some exceptions exist (recent startup, minimal income), but if you filed a tax return showing £50k+, you\'re in.' },
  { q: 'What if I miss the deadline?', a: 'HMRC charges penalties automatically. You can appeal, but the burden is on you to prove exceptional circumstances. Most people don\'t appeal — they just pay. That\'s why we file on time, always before the deadline.' },
  { q: 'Can I do this myself?', a: 'You can. But you\'ll need MTD software (£15–50/month), time to categorise every transaction (4–5 hours/month), knowledge of tax rules, and the discipline to file 4 times per year. At our rates, we handle all of this.' },
  { q: 'What if HMRC questions my filing?', a: 'We respond on your behalf. We review your categorisation, prepare evidence, and defend your position. You don\'t deal with HMRC directly.' },
  { q: 'When do I need to start filing MTD?', a: 'MTD for Income Tax is mandatory from April 2026 for those earning over £50,000. If you\'re approaching that threshold, now is the time to set up the right systems.' },
];

export default function MakingTaxDigitalPage() {
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
              Making Tax<br /><em style={{ color: 'var(--primary)' }}>Digital</em>
            </h1>
            <p className="font-ui mb-6 max-w-2xl" style={{ color: 'var(--muted)', fontSize: '18px', lineHeight: 1.7 }}>
              Mandatory quarterly filing for sole traders and landlords earning £50k+. We handle every submission, on time, every time. Miss a deadline? HMRC penalties are steep.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8" style={{ backgroundColor: 'rgba(192,57,43,0.1)', border: '1px solid rgba(192,57,43,0.3)' }}>
              <span style={{ color: '#e74c3c', fontSize: '14px' }}>⚠</span>
              <span className="font-ui text-sm" style={{ color: '#e74c3c' }}>MTD is mandatory from April 2026 for income over £50,000</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/quotation-calculator" className="btn-gold" style={{ minHeight: '48px', padding: '0 32px', lineHeight: '48px' }}>
                Get Your Quote →
              </Link>
              <Link href="/mtd-calculator" className="btn-ghost" style={{ minHeight: '48px', padding: '0 24px', lineHeight: '48px' }}>
                Calculate MTD Price
              </Link>
            </div>
          </div>
        </section>

        <TheDifferenceSection />

        {/* Who needs it */}
        <section className="px-6 md:px-10 py-16 md:py-20" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-5xl mx-auto">
            <p className="section-label mb-4">Eligibility</p>
            <h2 className="font-display mb-10" style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 400, color: 'var(--foreground)' }}>
              Who needs to file MTD?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 border" style={{ borderColor: 'var(--primary)', backgroundColor: 'rgba(201,168,76,0.04)' }}>
                <p className="font-ui font-medium mb-4" style={{ color: 'var(--foreground)', fontSize: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>You need MTD if you&apos;re...</p>
                <div className="space-y-3">
                  {['Self-employed or freelancer', 'Earning more than £50,000/year', 'A landlord with rental income', 'Running a trading business', 'A partner in a partnership']?.map(item => (
                    <div key={item} className="flex items-center gap-3">
                      <span style={{ color: 'var(--primary)', fontSize: '14px' }}>✓</span>
                      <span className="font-ui text-sm" style={{ color: 'var(--body-text)' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 border" style={{ borderColor: 'var(--gold-border)' }}>
                <p className="font-ui font-medium mb-4" style={{ color: 'var(--foreground)', fontSize: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>You might not need it if...</p>
                <div className="space-y-3">
                  {['Salaried employee (employer handles it)', 'Earning under £50k', 'Recently started (under 1 year)', 'Only have savings interest']?.map(item => (
                    <div key={item} className="flex items-center gap-3">
                      <span style={{ color: 'var(--muted)', fontSize: '14px' }}>✗</span>
                      <span className="font-ui text-sm" style={{ color: 'var(--muted)' }}>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="font-ui text-xs mt-4" style={{ color: 'var(--muted)', lineHeight: 1.6 }}>Not sure? Check your last tax return. If net profit/income is over £50,000, you&apos;re in.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Deadlines */}
        <section className="px-6 md:px-10 py-16 md:py-20" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-5xl mx-auto">
            <p className="section-label mb-4">Deadlines</p>
            <h2 className="font-display mb-10" style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 400, color: 'var(--foreground)' }}>
              Four deadlines per year
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { q: 'Q1', period: 'Jan–Mar', due: 'April 5' },
                { q: 'Q2', period: 'Apr–Jun', due: 'July 5' },
                { q: 'Q3', period: 'Jul–Sep', due: 'October 5' },
                { q: 'Q4', period: 'Oct–Dec', due: 'January 31' },
              ]?.map(item => (
                <div key={item?.q} className="p-5 border text-center" style={{ borderColor: 'var(--gold-border)' }}>
                  <p className="font-display mb-1" style={{ fontSize: '28px', color: 'var(--primary)', fontWeight: 400 }}>{item?.q}</p>
                  <p className="font-ui text-sm mb-2" style={{ color: 'var(--muted)' }}>{item?.period}</p>
                  <p className="font-ui text-xs uppercase tracking-widest" style={{ color: 'var(--foreground)' }}>Due {item?.due}</p>
                </div>
              ))}
            </div>
            <div className="p-5 border" style={{ borderColor: 'rgba(192,57,43,0.3)', backgroundColor: 'rgba(192,57,43,0.05)' }}>
              <p className="font-ui text-sm" style={{ color: '#e74c3c', lineHeight: 1.7 }}>
                <strong>HMRC Penalties:</strong> Late filing penalty £100–£1,000 per quarter. Late payment penalty 5% of tax owed. Missing multiple quarters can escalate to £3,000+.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="px-6 md:px-10 py-16 md:py-20" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-5xl mx-auto">
            <p className="section-label mb-4">Process</p>
            <h2 className="font-display mb-12" style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 400, color: 'var(--foreground)' }}>
              How we handle it
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Setup in 48 hours', desc: 'We connect your bank and accounting software. Transaction categorisation is configured. You get access to your dashboard.' },
                { step: '02', title: 'Monthly monitoring', desc: 'Every month we review all transactions, update your tax position, and send you a report showing exactly where you stand.' },
                { step: '03', title: 'Quarterly filing', desc: 'We file your MTD return before each deadline. We show you tax owed and due date. If HMRC questions anything, we respond.' },
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

        {/* Pricing */}
        <section className="px-6 md:px-10 py-16 md:py-20" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="section-label mb-4">Pricing</p>
            <h2 className="font-display mb-6" style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, color: 'var(--foreground)' }}>
              See your exact MTD price
            </h2>
            <p className="font-ui mb-8" style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.7 }}>
              MTD pricing depends on your income level, property count, and monitoring needs. Use our quotation calculator to get your exact monthly price in under 2 minutes — no sales calls required.
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
            <h2 className="font-display mb-10" style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 400, color: 'var(--foreground)' }}>Common questions</h2>
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
        <section className="px-6 md:px-10 py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <p className="section-label mb-4">Don&apos;t Risk Penalties</p>
            <h2 className="font-display mb-6" style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, color: 'var(--foreground)' }}>
              Check your MTD status today
            </h2>
            <p className="font-ui mb-8" style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.7 }}>
              We&apos;ll tell you your deadline, what you need to file, and how we can help. Takes 15 minutes. Could save you thousands.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/quotation-calculator" className="btn-gold" style={{ minHeight: '48px', padding: '0 32px', lineHeight: '48px' }}>
                Get Your Quote →
              </Link>
              <Link href="/book" className="btn-ghost" style={{ minHeight: '48px', padding: '0 24px', lineHeight: '48px' }}>
                Book a Free 15-min Call
              </Link>
            </div>
          </div>
        </section>

        {/* Fractional Finance Callout */}
        <section className="px-6 md:px-10 py-8" style={{ borderTop: '1px solid var(--gold-border)', backgroundColor: 'rgba(201,168,76,0.04)' }}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-ui text-sm mb-2" style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
              Need a full finance team? Our Fractional Finance Department handles all of this and more — daily.
            </p>
            <Link href="/" className="font-ui text-sm" style={{ color: 'var(--primary)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
              See Fractional Finance Department →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Making Tax Digital (MTD) Filing',
        provider: { '@type': 'LocalBusiness', name: 'Reckonwell', url: 'https://reckonwell.com' },
        description: 'Mandatory quarterly MTD filing for sole traders and landlords earning over £50,000. We handle every submission on time.',
        url: 'https://reckonwell.com/making-tax-digital',
        areaServed: 'GB',
        offers: { '@type': 'Offer', price: '100', priceCurrency: 'GBP', priceSpecification: { '@type': 'UnitPriceSpecification', price: '100', priceCurrency: 'GBP', unitText: 'MONTH' } },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs?.map(f => ({ '@type': 'Question', name: f?.q, acceptedAnswer: { '@type': 'Answer', text: f?.a } })),
      }) }} />
    </>
  );
}
