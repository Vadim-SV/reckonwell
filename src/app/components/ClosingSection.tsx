'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { trackEvent } from '@/lib/analytics';

// 3 most decision-relevant FAQ questions from the full set of 8
const homepageFaqs = [
  {
    question: 'What exactly does Reckonwell do?',
    answer:
      'Reckonwell is your dedicated finance team — not just a filing service. We handle bookkeeping, management accounts, payroll, VAT returns, year-end accounts, and tax planning. More importantly, we work with you on an ongoing basis so your numbers are always current and decision-ready.',
  },
  {
    question: 'How is this different from a traditional accounting firm?',
    answer:
      'Traditional accountants compile history — you get reports months after the fact. Reckonwell operates on your business in real time. You have a named point of contact, a monthly management pack, and direct access to your team whenever you need it. We are proactive, not reactive.',
  },
  {
    question: 'What size of business do you work with?',
    answer:
      "We work best with founder-led and owner-managed businesses billing between £250k and £10m annually — typically companies that have outgrown a sole-trader accountant but aren't large enough to justify an in-house finance director.",
  },
];

export default function ClosingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const sectionTracked = useRef(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
      id="get-in-touch"
      ref={ref}
      className="relative py-16 md:py-28 px-5 md:px-10 overflow-hidden"
      style={{ backgroundColor: '#080808' }}
      aria-label="Get in Touch"
    >
      {/* Radial gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.10) 0%, rgba(201,168,76,0.04) 55%, transparent 100%)',
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

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.p
          className="section-label mb-4 md:mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          onAnimationComplete={() => {
            if (isInView && !sectionTracked.current) {
              sectionTracked.current = true;
              trackEvent('homepage_section_viewed', { section: 'closing', page: 'home' });
            }
          }}
        >
          Get in Touch
        </motion.p>

        {/* ── Block 1: Founder message ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-14 md:mb-20">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto md:mx-0 md:ml-auto"
            style={{ maxWidth: '180px', width: '100%', position: 'relative' }}
          >
            <div
              className="hidden md:block"
              style={{
                position: 'absolute', top: '14px', left: '-14px', right: '14px', bottom: '-14px',
                border: '1px solid var(--primary)', opacity: 0.25, zIndex: 0, pointerEvents: 'none',
              }}
            />
            <div className="relative overflow-hidden" style={{ aspectRatio: '3/4', zIndex: 1 }}>
              <img
                src="/assets/images/Vadim-1779496555261.jpg"
                alt="Vadim, Founder of Reckonwell"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
              />
              <div
                className="absolute bottom-0 left-0 right-0"
                style={{ height: '30%', background: 'linear-gradient(to top, rgba(8,8,8,0.55) 0%, transparent 100%)' }}
              />
              {[
                { top: 0, left: 0, borderTop: '2px solid var(--primary)', borderLeft: '2px solid var(--primary)' },
                { top: 0, right: 0, borderTop: '2px solid var(--primary)', borderRight: '2px solid var(--primary)' },
                { bottom: 0, left: 0, borderBottom: '2px solid var(--primary)', borderLeft: '2px solid var(--primary)' },
                { bottom: 0, right: 0, borderBottom: '2px solid var(--primary)', borderRight: '2px solid var(--primary)' },
              ].map((s, i) => (
                <span key={i} className="absolute" style={{ width: '18px', height: '18px', opacity: 0.85, ...s }} />
              ))}
            </div>
          </motion.div>

          {/* Founder copy */}
          <div className="flex flex-col justify-center">
            <motion.p
              className="section-label mb-4"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Message from the Founder
            </motion.p>
            <motion.h3
              className="font-display mb-1"
              style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 400, color: 'var(--foreground)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Hello, I am Vadim
            </motion.h3>
            <motion.blockquote
              className="mb-5"
              style={{ borderLeft: '2px solid var(--primary)', paddingLeft: '20px' }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p
                className="font-serif"
                style={{ fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(16px, 2vw, 22px)', color: '#ffffff', lineHeight: 1.7, fontFamily: 'var(--font-serif)' }}
              >
                &ldquo;I built Reckonwell because the directors I admired most were
                spending their sharpest hours on things that had nothing to do
                with why they built their business. That always struck me as wrong
                — and entirely fixable.&rdquo;
              </p>
            </motion.blockquote>
            <motion.div
              className="flex flex-col gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <p className="body-text-rw" style={{ fontSize: '14px' }}>
                Every client gets a dedicated team who knows their accounts,
                understands the context behind the numbers, and is genuinely
                available when it matters.
              </p>
              <p
                className="font-display"
                style={{ fontSize: '15px', fontWeight: 400, color: 'var(--primary)', fontStyle: 'italic' }}
              >
                Not your accountant. Your finance team.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="mb-12 md:mb-16"
          style={{ height: '1px', background: 'linear-gradient(90deg, transparent, var(--border-subtle), transparent)' }}
        />

        {/* ── Block 2: 3-question FAQ ── */}
        <div className="max-w-3xl mx-auto mb-14 md:mb-20">
          <motion.p
            className="section-label mb-4"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Questions &amp; Answers
          </motion.p>
          <motion.h2
            className="section-h2-medium mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Frequently asked{' '}
            <span className="gold-italic">questions</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ border: '1px solid rgba(201, 168, 76, 0.18)', borderRadius: '2px' }}
          >
            {homepageFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const isLast = index === homepageFaqs.length - 1;
              return (
                <div
                  key={index}
                  style={{ borderBottom: isLast ? 'none' : '1px solid rgba(201, 168, 76, 0.18)' }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      padding: '18px 16px',
                      background: isOpen ? 'rgba(201, 168, 76, 0.04)' : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.2s ease',
                      minHeight: '60px',
                      gap: '12px',
                    }}
                    onMouseEnter={(e) => {
                      if (!isOpen) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.03)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isOpen) (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                    }}
                  >
                    <span
                      style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(14px, 2vw, 16px)', fontWeight: 500, color: '#D4CFC4', lineHeight: 1.5, flex: 1 }}
                    >
                      {faq.question}
                    </span>
                    <span
                      aria-hidden="true"
                      style={{
                        color: '#C9A84C', fontSize: '22px', fontWeight: 300, lineHeight: 1, flexShrink: 0,
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease',
                        display: 'inline-block', width: '22px', textAlign: 'center', marginTop: '2px',
                      }}
                    >
                      +
                    </span>
                  </button>
                  <div style={{ maxHeight: isOpen ? '400px' : '0', overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                    <p
                      style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '14px', lineHeight: 1.9, color: '#D4CFC4', padding: '0 16px 18px', margin: 0 }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Divider */}
        <div
          className="mb-12 md:mb-16"
          style={{ height: '1px', background: 'linear-gradient(90deg, transparent, var(--border-subtle), transparent)' }}
        />

        {/* ── Block 3: Contact form ── */}
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            className="section-h2 mb-4 md:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Ready to think like a
            <br />
            <span className="gold-italic">director again?</span>
          </motion.h2>

          <motion.p
            className="pull-quote mb-8 md:mb-10 mx-auto"
            style={{ maxWidth: '360px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Leave your details and we will be in touch to arrange a conversation.
          </motion.p>

          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="py-12 px-8 text-center"
              style={{ border: '1px solid rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.05)' }}
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
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col gap-4 text-left"
            >
              <div className="flex flex-col gap-1">
                <label htmlFor="closing-name" className="font-ui" style={{ fontSize: '10px', letterSpacing: '2px', color: 'var(--muted)', textTransform: 'uppercase' }}>
                  Full Name <span style={{ color: 'var(--primary)' }}>*</span>
                </label>
                <input
                  id="closing-name" name="name" type="text" required
                  placeholder="Enter your full name" value={form.name} onChange={handleChange}
                  className={`${inputBase} ${inputFocusClass}`} style={inputStyle}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="closing-phone" className="font-ui" style={{ fontSize: '10px', letterSpacing: '2px', color: 'var(--muted)', textTransform: 'uppercase' }}>
                  Phone Number <span style={{ color: 'var(--primary)' }}>*</span>
                </label>
                <input
                  id="closing-phone" name="phone" type="tel" required
                  placeholder="Enter your phone number" value={form.phone} onChange={handleChange}
                  className={`${inputBase} ${inputFocusClass}`} style={inputStyle}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="closing-email" className="font-ui" style={{ fontSize: '10px', letterSpacing: '2px', color: 'var(--muted)', textTransform: 'uppercase' }}>
                  Email Address <span style={{ color: 'var(--primary)' }}>*</span>
                </label>
                <input
                  id="closing-email" name="email" type="email" required
                  placeholder="Enter your email address" value={form.email} onChange={handleChange}
                  className={`${inputBase} ${inputFocusClass}`} style={inputStyle}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="closing-message" className="font-ui" style={{ fontSize: '10px', letterSpacing: '2px', color: 'var(--muted)', textTransform: 'uppercase' }}>
                  Your Enquiry
                </label>
                <textarea
                  id="closing-message" name="message" rows={4}
                  placeholder="Tell us a little about your situation and what you need help with..."
                  value={form.message} onChange={handleChange}
                  className={`${inputBase} ${inputFocusClass} resize-none`} style={inputStyle}
                />
              </div>

              {status === 'error' && (
                <p className="font-ui text-center" style={{ fontSize: '12px', color: '#e57373' }}>{errorMsg}</p>
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

              <p className="font-ui text-center mt-2" style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.5px' }}>
                Free consultation · No obligation
              </p>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}
