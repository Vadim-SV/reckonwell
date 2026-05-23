'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { trackEvent } from '@/lib/analytics';

export default function FinalCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const sectionTracked = useRef(false);

  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

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

      if (!res.ok) {
        throw new Error(`Submission failed (${res.status})`);
      }

      // Send email notification via Brevo
      await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'callback',
          fields: {
            name: form.name,
            phone: form.phone,
            email: form.email,
            message: form.message,
          },
        }),
      });

      trackEvent('homepage_contact_form_submitted', { page: 'home' });
      setStatus('success');
      setForm({ name: '', phone: '', email: '', message: '' });
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
    borderColor: 'rgba(201,168,76,0.25)',
    color: 'var(--foreground)',
    fontSize: '13px',
    letterSpacing: '0.3px',
  };
  const inputFocusClass = 'focus:border-[var(--primary)]';

  return (
    <section
      id="final-cta"
      ref={ref}
      className="relative py-20 md:py-36 px-6 md:px-10 overflow-hidden"
      style={{ backgroundColor: '#080808' }}
      aria-label="Request a Callback"
    >
      {/* Radial gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.14) 0%, rgba(201,168,76,0.06) 50%, transparent 100%)',
        }}
      />
      {/* Top border */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2"
        style={{
          width: '40%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--primary), transparent)',
          opacity: 0.4,
        }}
      />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <motion.p
          className="section-label mb-6 md:mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          onAnimationComplete={() => {
            if (isInView && !sectionTracked.current) {
              sectionTracked.current = true;
              trackEvent('homepage_section_viewed', { section: 'final_cta', page: 'home' });
            }
          }}
        >
          Request a Callback
        </motion.p>

        <motion.h2
          className="section-h2 mb-5 md:mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Ready to stop
          <br />
          worrying about
          <br />
          <span className="gold-italic">finances?</span>
        </motion.h2>

        <motion.p
          className="pull-quote mb-10 md:mb-12 mx-auto"
          style={{ maxWidth: '360px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Fill in your details and we&apos;ll be in touch shortly.
        </motion.p>

        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="py-12 px-8 text-center"
            style={{
              border: '1px solid rgba(201,168,76,0.3)',
              background: 'rgba(201,168,76,0.05)',
            }}
          >
            <p
              className="font-ui mb-2"
              style={{ color: 'var(--primary)', fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase' }}
            >
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
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col gap-4 text-left"
          >
            {/* Name */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="name"
                className="font-ui"
                style={{ fontSize: '10px', letterSpacing: '2px', color: 'var(--muted)', textTransform: 'uppercase' }}
              >
                Full Name <span style={{ color: 'var(--primary)' }}>*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                className={`${inputBase} ${inputFocusClass}`}
                style={inputStyle}
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="phone"
                className="font-ui"
                style={{ fontSize: '10px', letterSpacing: '2px', color: 'var(--muted)', textTransform: 'uppercase' }}
              >
                Phone Number <span style={{ color: 'var(--primary)' }}>*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="Enter your phone number"
                value={form.phone}
                onChange={handleChange}
                className={`${inputBase} ${inputFocusClass}`}
                style={inputStyle}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="font-ui"
                style={{ fontSize: '10px', letterSpacing: '2px', color: 'var(--muted)', textTransform: 'uppercase' }}
              >
                Email Address <span style={{ color: 'var(--primary)' }}>*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your email address"
                value={form.email}
                onChange={handleChange}
                className={`${inputBase} ${inputFocusClass}`}
                style={inputStyle}
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="message"
                className="font-ui"
                style={{ fontSize: '10px', letterSpacing: '2px', color: 'var(--muted)', textTransform: 'uppercase' }}
              >
                Your Enquiry
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Tell us a little about your situation and what you need help with..."
                value={form.message}
                onChange={handleChange}
                className={`${inputBase} ${inputFocusClass} resize-none`}
                style={inputStyle}
              />
            </div>

            {status === 'error' && (
              <p className="font-ui text-center" style={{ fontSize: '12px', color: '#e57373' }}>
                {errorMsg}
              </p>
            )}

            <div className="flex justify-center mt-2">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-gold w-full sm:w-auto"
                style={{ padding: '18px 48px', fontSize: '12px', letterSpacing: '2.5px', maxWidth: '360px', opacity: status === 'submitting' ? 0.7 : 1 }}
              >
                {status === 'submitting' ? 'Sending...' : 'Request a Callback'}
              </button>
            </div>

            <p
              className="font-ui text-center mt-2"
              style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.5px' }}
            >
              Free consultation · No obligation
            </p>
          </motion.form>
        )}
      </div>
    </section>
  );
}