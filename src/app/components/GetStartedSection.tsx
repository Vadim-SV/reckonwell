'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { trackEvent } from '@/lib/analytics';
import Link from 'next/link';

const serviceFitOptions = [
  {
    id: 'daily',
    label: 'Stay ahead of daily finances',
    recommendation: 'Personalised daily oversight keeps your cash, transactions and overdue invoices visible every working day.',
    cta: 'Discuss tailored oversight',
    ctaHref: '#personalised-proactive',
  },
  {
    id: 'function',
    label: 'Build my finance function',
    recommendation: 'We bring bookkeeping, management reporting and FD-level support together under one roof — start with what you need now.',
    cta: 'Explore your finance team',
    ctaHref: '#finance-function',
  },
  {
    id: 'capital',
    label: 'Raise growth capital',
    recommendation: 'We build the model, forecasts and materials behind the raise, and can make relevant introductions through our network.',
    cta: 'Discuss funding support',
    ctaHref: '#fundraising-capital',
  },
];

const complianceServices = [
  {
    label: 'Making Tax Digital',
    description: 'MTD-compliant bookkeeping and VAT filing.',
    href: '/mtd-calculator',
  },
  {
    label: 'Self Assessment',
    description: 'Personal tax returns for directors and sole traders.',
    href: '/self-assessment-calculator',
  },
  {
    label: 'R&D Tax Relief',
    description: 'Identify and claim eligible R&D expenditure.',
    href: '/rd-tax-relief-calculator',
  },
  {
    label: 'Final Accounts & CT600',
    description: 'Year-end accounts and corporation tax filing.',
    href: '/final-accounts-ct600-calculator',
  },
];

export default function GetStartedSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const formRef = useRef<HTMLDivElement>(null);

  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Listen for prefill events from section CTAs
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as string;
      setSelectedService(detail);
      // Scroll to form
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    };
    window.addEventListener('prefill-service', handler);
    return () => window.removeEventListener('prefill-service', handler);
  }, []);

  const handleServiceSelect = (id: string) => {
    setSelectedService(id === selectedService ? null : id);
    const option = serviceFitOptions.find((o) => o.id === id);
    if (option) {
      setForm((prev) => ({
        ...prev,
        message: prev.message || `I am interested in: ${option.label}`,
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    trackEvent('homepage_contact_form_submit_attempt', { page: 'home' });

    try {
      const fields: Record<string, string> = {
        'a1b2c3d4-0002-4000-8000-000000000002': form.name,
        'a1b2c3d4-0003-4000-8000-000000000003': form.phone,
        'a1b2c3d4-0004-4000-8000-000000000004': form.email,
        'a1b2c3d4-0005-4000-8000-000000000005': form.message,
      };

      const payload = {
        formId: 'eqYAj0',
        fields: Object.entries(fields).map(([key, value]) => ({ uuid: key, value })),
      };

      const res = await fetch('https://api.tally.so/forms/eqYAj0/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TALLY_API_KEY}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Submission failed (${res.status})`);

      await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'callback',
          fields: { name: form.name, phone: form.phone, email: form.email, message: form.message },
        }),
      });

      trackEvent('homepage_contact_form_submitted', { page: 'home' });
      setStatus('success');
      setForm({ name: '', phone: '', email: '', message: '' });
      setSelectedService(null);
    } catch (err: unknown) {
      setStatus('error');
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      trackEvent('homepage_contact_form_error', { error: msg, page: 'home' });
      setErrorMsg(msg);
    }
  };

  const inputBase =
    'w-full bg-transparent border rounded-none px-4 py-3 text-sm font-ui outline-none transition-colors duration-200 placeholder-[var(--muted)]';
  const inputStyle = {
    borderColor: 'var(--border)',
    color: 'var(--foreground)',
    fontSize: '13px',
    letterSpacing: '0.3px',
  };
  const inputFocusClass = 'focus:border-[var(--primary)]';

  const selectedOption = serviceFitOptions.find((o) => o.id === selectedService);

  return (
    <section
      id="get-started"
      ref={ref}
      className="relative py-14 md:py-28 px-5 md:px-10 overflow-hidden"
      style={{ backgroundColor: 'var(--surface)' }}
      aria-label="Get started"
    >
      {/* Top border accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2"
        style={{ width: '40%', height: '1px', background: 'var(--primary)', opacity: 0.4 }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Heading */}
        <motion.p
          className="section-label mb-4 md:mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Get Started
        </motion.p>

        <motion.h2
          className="section-h2 mb-4 md:mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Ready to think like a{' '}
          <span className="gold-italic">director again?</span>
        </motion.h2>

        <motion.p
          className="body-text-rw mb-10 md:mb-12"
          style={{ maxWidth: '520px', fontSize: '15px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Tell us what you need and we will be in touch to arrange a conversation.
        </motion.p>

        {/* Service-fit selector */}
        <motion.div
          className="mb-8 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          <p
            className="font-ui mb-4"
            style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--muted)' }}
          >
            What best describes your situation?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
            {serviceFitOptions.map((option) => {
              const isSelected = selectedService === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleServiceSelect(option.id)}
                  className="font-ui text-left transition-all duration-200"
                  style={{
                    padding: '12px 18px',
                    fontSize: '12px',
                    letterSpacing: '0.5px',
                    border: `1px solid ${isSelected ? 'var(--primary)' : 'var(--border)'}`,
                    backgroundColor: isSelected ? 'rgba(18,35,63,0.06)' : 'transparent',
                    color: isSelected ? 'var(--primary)' : 'var(--muted)',
                    cursor: 'pointer',
                    minHeight: '44px',
                    flex: '1 1 auto',
                    maxWidth: '100%',
                  }}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          {/* Recommendation */}
          {selectedOption && (
            <motion.div
              key={selectedOption.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-4 p-4"
              style={{ border: '1px solid var(--border-subtle)', backgroundColor: 'rgba(18,35,63,0.03)' }}
            >
              <p className="body-text-rw mb-3" style={{ fontSize: '14px' }}>
                {selectedOption.recommendation}
              </p>
              <Link
                href={selectedOption.ctaHref}
                className="font-ui"
                style={{
                  fontSize: '11px',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  color: 'var(--primary)',
                  borderBottom: '1px solid var(--primary)',
                  paddingBottom: '1px',
                  textDecoration: 'none',
                }}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.querySelector(selectedOption.ctaHref);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {selectedOption.cta} →
              </Link>
            </motion.div>
          )}
        </motion.div>

        {/* Callback form */}
        <div ref={formRef}>
          <motion.p
            className="font-ui mb-5"
            style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--muted)' }}
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Or leave your details and we will call you back
          </motion.p>

          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="py-12 px-8 text-center"
              style={{ border: '1px solid rgba(18,35,63,0.2)', background: 'rgba(18,35,63,0.04)' }}
            >
              <p className="font-ui mb-2" style={{ color: 'var(--primary)', fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase' }}>
                Thank You
              </p>
              <p className="section-h2-medium mb-3" style={{ fontSize: '22px' }}>
                We&apos;ll be in touch shortly.
              </p>
              <p className="font-ui" style={{ color: 'var(--muted)', fontSize: '13px' }}>
                We&apos;ll review your details and reach out soon.
              </p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="flex flex-col gap-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="gs-name" className="font-ui" style={{ fontSize: '10px', letterSpacing: '2px', color: 'var(--muted)', textTransform: 'uppercase' }}>
                    Full Name <span style={{ color: 'var(--primary)' }}>*</span>
                  </label>
                  <input
                    id="gs-name" name="name" type="text" required
                    placeholder="Enter your full name" value={form.name} onChange={handleChange}
                    className={`${inputBase} ${inputFocusClass}`} style={inputStyle}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="gs-phone" className="font-ui" style={{ fontSize: '10px', letterSpacing: '2px', color: 'var(--muted)', textTransform: 'uppercase' }}>
                    Phone Number <span style={{ color: 'var(--primary)' }}>*</span>
                  </label>
                  <input
                    id="gs-phone" name="phone" type="tel" required
                    placeholder="Enter your phone number" value={form.phone} onChange={handleChange}
                    className={`${inputBase} ${inputFocusClass}`} style={inputStyle}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="gs-email" className="font-ui" style={{ fontSize: '10px', letterSpacing: '2px', color: 'var(--muted)', textTransform: 'uppercase' }}>
                  Email Address <span style={{ color: 'var(--primary)' }}>*</span>
                </label>
                <input
                  id="gs-email" name="email" type="email" required
                  placeholder="Enter your email address" value={form.email} onChange={handleChange}
                  className={`${inputBase} ${inputFocusClass}`} style={inputStyle}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="gs-message" className="font-ui" style={{ fontSize: '10px', letterSpacing: '2px', color: 'var(--muted)', textTransform: 'uppercase' }}>
                  Your Enquiry
                </label>
                <textarea
                  id="gs-message" name="message" rows={4}
                  placeholder="Tell us a little about your situation and what you need help with..."
                  value={form.message} onChange={handleChange}
                  className={`${inputBase} ${inputFocusClass} resize-none`} style={inputStyle}
                />
              </div>

              {status === 'error' && (
                <p className="font-ui text-center" style={{ fontSize: '12px', color: '#e57373' }}>{errorMsg}</p>
              )}

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn-gold w-full sm:w-auto"
                  style={{ padding: '16px 48px', fontSize: '12px', letterSpacing: '2.5px', opacity: status === 'submitting' ? 0.7 : 1 }}
                >
                  {status === 'submitting' ? 'Sending...' : 'Request a Callback'}
                </button>
                <p className="font-ui" style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.5px' }}>
                  Free consultation · No obligation
                </p>
              </div>
            </motion.form>
          )}
        </div>

        {/* Compliance subsection */}
        <motion.div
          className="mt-16 md:mt-20 pt-10 md:pt-12"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <p className="section-label mb-3">Compliance, sorted.</p>
          <p className="body-text-rw mb-7" style={{ fontSize: '14px', maxWidth: '480px' }}>
            Need a specific filing or tax service? Get an instant quote for any of the following.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {complianceServices.map((service) => (
              <Link
                key={service.label}
                href={service.href}
                className="group flex flex-col gap-1 p-4 transition-all duration-200"
                style={{
                  border: '1px solid var(--border)',
                  backgroundColor: 'transparent',
                  textDecoration: 'none',
                  minHeight: '80px',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--primary)';
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(18,35,63,0.03)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                }}
              >
                <p className="font-ui" style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 500 }}>
                  {service.label}
                </p>
                <p className="font-ui" style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.5 }}>
                  {service.description}
                </p>
                <p className="font-ui mt-auto" style={{ fontSize: '10px', letterSpacing: '1px', color: 'var(--primary)', textTransform: 'uppercase' }}>
                  Get instant quote →
                </p>
              </Link>
            ))}
          </div>

          <Link
            href="/quotation-calculator"
            className="font-ui"
            style={{
              fontSize: '11px',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              borderBottom: '1px solid var(--border)',
              paddingBottom: '1px',
              textDecoration: 'none',
            }}
          >
            Explore all services in the quote calculator →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
