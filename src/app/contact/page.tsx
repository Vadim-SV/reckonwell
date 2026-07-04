'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CertifiedPartneredSection from '@/app/components/CertifiedPartneredSection';

const faqs = [
  { q: 'How quickly do you respond?', a: 'We respond to all enquiries within 4 business hours. For urgent matters, call us directly on 02038186205.' },
  { q: 'Do you work with businesses outside London?', a: 'Yes. We work with businesses across the UK. All our services are delivered remotely — you never need to visit an office.' },
  { q: 'How do I switch from my current accountant?', a: 'We handle the switch completely. We contact your previous accountant, request all records, and ensure there\'s no gap in your compliance. Most switches complete within 5 working days.' },
  { q: 'What accounting software do you use?', a: 'We work with Xero, QuickBooks, and FreeAgent. If you don\'t have software, we set it up for you as part of onboarding.' },
  { q: 'Is there a minimum contract length?', a: 'No. All our services are monthly rolling. You can cancel with 30 days\' notice at any time.' },
  { q: 'Do you offer a free initial consultation?', a: 'Yes. Book a free 15-minute discovery call via our booking page. We\'ll discuss your situation and confirm whether we\'re the right fit.' },
  { q: 'Are you FIAB and IAB certified?', a: 'Yes. Reckonwell is certified by both the Federation of International Accountants and Bookkeepers (FIAB) and the Institute of Accountants and Bookkeepers (IAB).' },
  { q: 'What is your pricing model?', a: 'All pricing is transparent and fixed monthly. Use our quotation calculator to get your exact price based on your business type and complexity. No hourly rates, no surprise invoices.' },
];

const subjects = ['General Enquiry', 'Self-Employed Accounting', 'Limited Company Accounting', 'Making Tax Digital', 'R&D Tax Relief', 'Payroll Services', 'VAT Returns', 'Bookkeeping', 'Company Formation', 'Landlord Accounting', 'Pricing Question', 'Switch Accountant'];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/calculator-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          calculator_type: 'contact-form',
          name, email, company: '', phone,
          recommended_tier: subject || 'General Enquiry',
          company_details: { subject, message },
        }),
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again or email us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full bg-transparent border px-4 py-3 font-ui text-sm focus:outline-none transition-colors duration-200";
  const inputStyle = { borderColor: 'var(--gold-border)', color: 'var(--foreground)', fontSize: '14px' };

  return (
    <>
      <Header />
      <main style={{ backgroundColor: 'var(--background)', minHeight: '100vh', paddingTop: '80px' }}>

        {/* Hero */}
        <section className="px-5 md:px-10 py-12 md:py-20" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-5xl mx-auto">
            <p className="section-label mb-4">Contact</p>
            <h1 className="font-display mb-5 md:mb-6" style={{ fontSize: 'clamp(32px,6vw,72px)', fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              Get in touch
            </h1>
            <p className="font-ui max-w-xl" style={{ color: 'var(--muted)', fontSize: 'clamp(15px,2vw,18px)', lineHeight: 1.7 }}>
              We respond within 4 business hours. For a faster answer, book a free 15-minute call.
            </p>
          </div>
        </section>

        {/* Contact methods + form */}
        <section className="px-6 md:px-10 py-16 md:py-20" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Left: contact info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <p className="section-label mb-4">Contact Methods</p>
                <div className="space-y-6">
                  <div>
                    <p className="font-ui text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--muted)' }}>Phone</p>
                    <a href="tel:02038186205" className="font-display" style={{ fontSize: '20px', color: 'var(--foreground)', fontWeight: 400 }}>02038186205</a>
                    <p className="font-ui text-xs mt-1" style={{ color: 'var(--muted)' }}>Mon–Fri, 9am–6pm GMT</p>
                  </div>
                  <div>
                    <p className="font-ui text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--muted)' }}>Email</p>
                    <a href="mailto:vadim.s@reckonwell.com" className="font-ui text-sm" style={{ color: 'var(--primary)' }}>vadim.s@reckonwell.com</a>
                    <p className="font-ui text-xs mt-1" style={{ color: 'var(--muted)' }}>Response within 4 business hours</p>
                  </div>
                  <div>
                    <p className="font-ui text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--muted)' }}>Address</p>
                    <p className="font-ui text-sm" style={{ color: 'var(--body-text)', lineHeight: 1.6 }}>124 City Road<br />London EC1V 2NX</p>
                  </div>
                </div>
              </div>

              <div className="p-5 border" style={{ borderColor: 'var(--primary)', backgroundColor: 'rgba(201,168,76,0.04)' }}>
                <p className="font-ui font-medium mb-2" style={{ color: 'var(--foreground)', fontSize: '14px' }}>Book a free 15-min call</p>
                <p className="font-ui text-xs mb-4" style={{ color: 'var(--muted)', lineHeight: 1.6 }}>Speak directly with an accountant. We&apos;ll review your situation and confirm whether we&apos;re the right fit.</p>
                <Link href="/book" className="btn-gold inline-block" style={{ minHeight: '40px', padding: '0 20px', lineHeight: '40px', fontSize: '11px' }}>
                  Book Now →
                </Link>
              </div>

              <div>
                <p className="section-label mb-3">Quick Links</p>
                <div className="space-y-2">
                  {[
                    { label: 'Get an instant quote', href: '/quotation-calculator' },
                    { label: 'Self-employed accounting', href: '/self-employed-accounting' },
                    { label: 'Limited company accounting', href: '/limited-company-accounting' },
                    { label: 'Making Tax Digital', href: '/making-tax-digital' },
                    { label: 'R&D Tax Relief', href: '/r-and-d-tax-relief' },
                  ].map(l => (
                    <Link key={l.href} href={l.href} className="block font-ui text-sm transition-colors duration-200" style={{ color: 'var(--muted)' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
                      → {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="lg:col-span-3">
              <p className="section-label mb-6">Send a Message</p>
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-ui text-xs uppercase tracking-widest mb-2 block" style={{ color: 'var(--muted)' }}>Full Name *</label>
                      <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Your name" className={inputClass} style={inputStyle} />
                    </div>
                    <div>
                      <label className="font-ui text-xs uppercase tracking-widest mb-2 block" style={{ color: 'var(--muted)' }}>Email *</label>
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="your@email.com" className={inputClass} style={inputStyle} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-ui text-xs uppercase tracking-widest mb-2 block" style={{ color: 'var(--muted)' }}>Phone (optional)</label>
                      <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+44..." className={inputClass} style={inputStyle} />
                    </div>
                    <div>
                      <label className="font-ui text-xs uppercase tracking-widest mb-2 block" style={{ color: 'var(--muted)' }}>Subject</label>
                      <select value={subject} onChange={e => setSubject(e.target.value)} className={inputClass} style={{ ...inputStyle, backgroundColor: 'var(--background)' }}>
                        <option value="">Select a topic</option>
                        {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="font-ui text-xs uppercase tracking-widest mb-2 block" style={{ color: 'var(--muted)' }}>Message *</label>
                    <textarea value={message} onChange={e => setMessage(e.target.value)} required placeholder="Tell us about your situation..." rows={6} className={inputClass} style={{ ...inputStyle, resize: 'vertical' }} />
                  </div>
                  {error && <p className="font-ui text-sm" style={{ color: 'var(--red-accent)' }}>{error}</p>}
                  <button type="submit" disabled={submitting} className="btn-gold" style={{ minHeight: '48px', padding: '0 32px', opacity: submitting ? 0.7 : 1 }}>
                    {submitting ? 'Sending...' : 'Send Message →'}
                  </button>
                </form>
              ) : (
                <div className="p-8 border text-center" style={{ borderColor: 'var(--primary)', backgroundColor: 'rgba(201,168,76,0.06)' }}>
                  <p className="font-display mb-2" style={{ fontSize: '24px', color: 'var(--primary)', fontWeight: 400 }}>Message received.</p>
                  <p className="font-ui text-sm mb-6" style={{ color: 'var(--muted)', lineHeight: 1.7 }}>We&apos;ll respond within 4 business hours. In the meantime, you can book a call for a faster answer.</p>
                  <Link href="/book" className="btn-gold inline-block" style={{ minHeight: '48px', padding: '0 32px', lineHeight: '48px' }}>
                    Book a Discovery Call →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        <CertifiedPartneredSection variant="full" />

        {/* FAQ */}
        <section className="px-6 md:px-10 py-16 md:py-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display mb-10" style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 400, color: 'var(--foreground)' }}>
              Frequently asked questions
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
      </main>
      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact Reckonwell',
        url: 'https://reckonwell.com/contact',
        description: 'Contact Reckonwell accounting firm. We respond within 4 business hours.',
        mainEntity: {
          '@type': 'LocalBusiness',
          name: 'Reckonwell',
          telephone: '+442038186205',
          email: 'vadim.s@reckonwell.com',
          address: { '@type': 'PostalAddress', streetAddress: '124 City Road', addressLocality: 'London', postalCode: 'EC1V 2NX', addressCountry: 'GB' },
        },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      }) }} />
    </>
  );
}
