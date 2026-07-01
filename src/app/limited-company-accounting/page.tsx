'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const faqs = [
  { q: 'What does corporation tax accounting include?', a: 'Annual statutory accounts, CT600 corporation tax return, Companies House filing, and ongoing tax planning. We handle every filing deadline so nothing reaches your desk.' },
  { q: 'Do you handle payroll?', a: 'Yes. Payroll is included for all employees at £40 per employee per month. We run payroll, submit RTI to HMRC, and handle auto-enrolment.' },
  { q: 'What is management accounts monitoring?', a: 'Monthly or quarterly management accounts give you a real-time view of your company\'s financial position — profit, cash flow, and tax liability — so you can make decisions with current data.' },
  { q: 'Do you handle VAT returns?', a: 'Yes. Quarterly VAT returns are included in all limited company packages at £60/month. We prepare, review, and submit to HMRC on time.' },
  { q: 'Can you help with R&D tax relief?', a: 'Yes. If your company has qualifying R&D spend, we identify it, prepare the technical narrative, and submit the claim. Ongoing R&D monitoring is available as an add-on.' },
];

export default function LimitedCompanyAccountingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Header />
      <main style={{ backgroundColor: 'var(--background)', minHeight: '100vh', paddingTop: '80px' }}>

        {/* Hero */}
        <section className="px-6 md:px-10 py-16 md:py-24" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-5xl mx-auto">
            <p className="section-label mb-4">Service</p>
            <h1 className="font-display mb-6" style={{ fontSize: 'clamp(36px,6vw,72px)', fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              Limited Company<br /><em style={{ color: 'var(--primary)' }}>Accounting</em>
            </h1>
            <p className="font-ui mb-8 max-w-2xl" style={{ color: 'var(--muted)', fontSize: '18px', lineHeight: 1.7 }}>
              For UK limited company directors. Annual accounts, CT600, payroll, VAT, and real-time financial monitoring — all handled. Nothing reaches your desk.
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

        {/* Pricing */}
        <section className="px-6 md:px-10 py-16 md:py-20" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-5xl mx-auto">
            <p className="section-label mb-4">Transparent Pricing</p>
            <h2 className="font-display mb-4" style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, color: 'var(--foreground)' }}>
              What you&apos;ll pay
            </h2>
            <p className="font-ui mb-10" style={{ color: 'var(--muted)', fontSize: '14px' }}>Base prices below. Monitoring frequency and transaction volume multipliers apply — use the calculator for your exact figure.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { tier: 'Foundation', price: '£150', period: '/month', desc: 'Profit under £250k, 0–5 employees', features: ['Annual accounts & CT600', 'Companies House filing', 'VAT returns', 'Director salary planning'] },
                { tier: 'Growth', price: '£300', period: '/month', desc: 'Profit £250k–£500k or 6–20 employees', features: ['Everything in Foundation', 'Quarterly business reviews', 'Payroll management', 'Cash flow monitoring'] },
                { tier: 'Scale', price: '£500', period: '/month', desc: 'Profit £500k–£1m or 20+ employees', features: ['Everything in Growth', 'Monthly management accounts', 'R&D relief support', 'Investor-ready reporting'] },
                { tier: 'Enterprise', price: '£750', period: '/month', desc: 'Profit £1m+, complex group structures', features: ['Everything in Scale', 'Dedicated senior accountant', 'Group structure planning', 'Board-level reporting'] },
              ].map((tier, i) => (
                <div key={i} className="p-6 border flex flex-col" style={{ borderColor: i === 1 ? 'var(--primary)' : 'var(--gold-border)', backgroundColor: i === 1 ? 'rgba(201,168,76,0.04)' : 'transparent' }}>
                  {i === 1 && <p className="section-label mb-3">Most Popular</p>}
                  <p className="font-ui font-medium mb-1" style={{ color: 'var(--foreground)', fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>{tier.tier}</p>
                  <p className="font-display mb-1" style={{ fontSize: '32px', color: 'var(--primary)', fontWeight: 400 }}>{tier.price}<span className="font-ui text-sm" style={{ color: 'var(--muted)' }}>{tier.period}</span></p>
                  <p className="font-ui text-xs mb-4" style={{ color: 'var(--muted)', lineHeight: 1.5 }}>{tier.desc}</p>
                  <div className="space-y-2 flex-1">
                    {tier.features.map((f, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <span style={{ color: 'var(--primary)', fontSize: '12px', marginTop: '2px' }}>✓</span>
                        <span className="font-ui text-sm" style={{ color: 'var(--body-text)' }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/quotation-calculator" className="mt-6 font-ui text-xs uppercase tracking-widest" style={{ color: 'var(--primary)' }}>
                    Calculate exact price →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="px-6 md:px-10 py-16 md:py-20" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="section-label mb-4">What&apos;s Included</p>
              <h2 className="font-display mb-6" style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 400, color: 'var(--foreground)' }}>
                Every obligation.<br />Handled.
              </h2>
              <p className="font-ui" style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.7 }}>
                Compliance is not something a director should carry in their head. From VAT to R&D claims, our team handles every filing, every deadline, every submission.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { title: 'Annual Accounts & CT600', desc: 'Statutory year-end accounts prepared, reviewed with you, and filed with Companies House and HMRC.' },
                { title: 'VAT Returns', desc: 'Quarterly VAT returns prepared and submitted. We handle all VAT schemes and reconciliations.' },
                { title: 'Payroll & RTI', desc: 'Monthly payroll run, RTI submissions to HMRC, and auto-enrolment management for all employees.' },
                { title: 'Director Salary Planning', desc: 'Optimal salary/dividend split calculated each year to minimise your personal tax liability.' },
                { title: 'Management Accounts', desc: 'Monthly or quarterly P&L, balance sheet, and cash flow — so you always know where you stand.' },
                { title: 'Daily Bookkeeping', desc: 'Every transaction categorised daily. Your books are always current, never a month behind.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 border" style={{ borderColor: 'var(--gold-border)' }}>
                  <span style={{ color: 'var(--primary)', fontSize: '18px', marginTop: '2px' }}>✓</span>
                  <div>
                    <p className="font-ui font-medium mb-1" style={{ color: 'var(--foreground)', fontSize: '14px' }}>{item.title}</p>
                    <p className="font-ui text-sm" style={{ color: 'var(--muted)', lineHeight: 1.6 }}>{item.desc}</p>
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
                { step: '01', title: 'Onboard in 48 hours', desc: 'We connect to your accounting software (Xero, QuickBooks, or we set one up). Payroll and VAT are configured immediately.' },
                { step: '02', title: 'We monitor continuously', desc: 'Every transaction is categorised daily. Monthly reports land in your inbox. Tax position is always current.' },
                { step: '03', title: 'We file everything', desc: 'CT600, VAT returns, payroll RTI, Companies House — all filed on time, every time. You approve, we submit.' },
              ].map((item, i) => (
                <div key={i} className="p-6 border" style={{ borderColor: 'var(--gold-border)' }}>
                  <p className="font-display mb-4" style={{ fontSize: '48px', color: 'rgba(201,168,76,0.2)', fontWeight: 400, lineHeight: 1 }}>{item.step}</p>
                  <p className="font-ui font-medium mb-2" style={{ color: 'var(--foreground)', fontSize: '15px' }}>{item.title}</p>
                  <p className="font-ui text-sm" style={{ color: 'var(--muted)', lineHeight: 1.7 }}>{item.desc}</p>
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

        {/* Internal links */}
        <section className="px-6 md:px-10 py-12" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-5xl mx-auto">
            <p className="section-label mb-6">Related Services</p>
            <div className="flex flex-wrap gap-4">
              {[
                { label: 'Self-Employed Accounting', href: '/self-employed-accounting' },
                { label: 'Making Tax Digital', href: '/making-tax-digital' },
                { label: 'R&D Tax Relief', href: '/r-and-d-tax-relief' },
                { label: 'Payroll Services', href: '/payroll-services' },
                { label: 'VAT Returns', href: '/vat-returns' },
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
            <p className="section-label mb-4">Get Started</p>
            <h2 className="font-display mb-6" style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, color: 'var(--foreground)' }}>
              Get your exact price in 60 seconds
            </h2>
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
      </main>
      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Limited Company Accounting',
        provider: { '@type': 'LocalBusiness', name: 'Reckonwell', url: 'https://reckonwell.com' },
        description: 'Annual accounts, CT600, payroll, VAT, and real-time financial monitoring for UK limited companies.',
        url: 'https://reckonwell.com/limited-company-accounting',
        areaServed: 'GB',
        offers: { '@type': 'Offer', price: '150', priceCurrency: 'GBP', priceSpecification: { '@type': 'UnitPriceSpecification', price: '150', priceCurrency: 'GBP', unitText: 'MONTH' } },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      }) }} />
    </>
  );
}
