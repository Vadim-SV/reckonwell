'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const serviceFitOptions = [
  {
    id: 'daily',
    label: 'Stay ahead of daily finances',
    suggestedTitle: 'Finance support on your terms',
    recommendation:
      'Shape a package around your preferred contact and proactive daily oversight of cash, transactions and invoices.',
    cta: 'Enquire about this support',
    ctaHref: '/book',
    prefillId: 'daily',
  },
  {
    id: 'function',
    label: 'Build my finance function',
    suggestedTitle: 'Your outsourced finance department',
    recommendation:
      'Bring bookkeeping, management reporting and FD-level support together under one roof — start with what you need now.',
    cta: 'Enquire about this support',
    ctaHref: '/book',
    prefillId: 'function',
  },
  {
    id: 'capital',
    label: 'Raise growth capital',
    suggestedTitle: 'A model, materials and introductions',
    recommendation:
      'We build the financial model and investor materials, then connect suitable founders with relevant investors through our network.',
    cta: 'Enquire about this support',
    ctaHref: '/book',
    prefillId: 'capital',
  },
];

const complianceServices = [
  {
    index: '01',
    label: 'Making Tax Digital',
    description: 'MTD-ready bookkeeping and support with quarterly submissions.',
    ctaLabel: 'Get MTD Quote',
    href: '/mtd-calculator',
  },
  {
    index: '02',
    label: 'Self Assessment',
    description: 'Personal tax return support for sole traders and individuals.',
    ctaLabel: 'Get Tax Return Quote',
    href: '/self-assessment-calculator',
  },
  {
    index: '03',
    label: 'R&D tax relief',
    description: 'Review potential qualifying activity and prepare a supported claim.',
    ctaLabel: 'Get R&D Quote',
    href: '/rd-tax-relief-calculator',
  },
  {
    index: '04',
    label: 'Final accounts & CT600',
    description: 'Annual company accounts and corporation tax filing.',
    ctaLabel: 'Get Company Quote',
    href: '/final-accounts-ct600-calculator',
  },
];

export default function FindYourFitSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [selected, setSelected] = useState<string>('daily');

  useEffect(() => {
    setSelected('daily');
  }, []);

  const selectedOption = serviceFitOptions.find((o) => o.id === selected) ?? serviceFitOptions[0];

  const handleEnquire = (e: React.MouseEvent, option: typeof serviceFitOptions[0]) => {
    e.preventDefault();
    window.location.href = '/book';
  };

  return (
    <section
      id="find-your-fit"
      ref={ref}
      className="relative py-16 md:py-20 px-5 md:px-10 overflow-hidden"
      style={{ backgroundColor: 'var(--surface)' }}
      aria-label="Find your fit"
    >
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: '1px', background: 'var(--border-subtle)' }}
      />
        <motion.div
          className="mt-10 md:mt-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {/* Divider */}
          <div style={{ height: '1px', background: 'var(--border-subtle)', marginBottom: '40px' }} />

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
            <div>
              <p
                className="font-ui mb-2"
                style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--muted)' }}
              >
                Need one specific service?
              </p>
              <h3 className="section-h2" style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}>
                Compliance, sorted.
              </h3>
            </div>
            <p
              className="body-text-rw"
              style={{ maxWidth: '360px', fontSize: '14px', paddingTop: '4px' }}
            >
              If your need is a filing or a tax service, go straight to the relevant Reckonwell quote calculator.
            </p>
          </div>

          {/* Compliance cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {complianceServices.map((service) => (
              <Link
                key={service.label}
                href={service.href}
                className="group flex flex-col p-5 transition-all duration-200"
                style={{
                  border: '1px solid var(--border)',
                  backgroundColor: 'transparent',
                  textDecoration: 'none',
                  minHeight: '180px',
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
                <p
                  className="font-ui mb-3"
                  style={{
                    fontSize: '10px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: 'var(--advisory-blue, #275E86)',
                    fontWeight: 500,
                  }}
                >
                  Compliance / {service.index}
                </p>
                <p
                  className="section-h2-medium mb-2 flex-1"
                  style={{ fontSize: '18px', lineHeight: 1.3 }}
                >
                  {service.label}
                </p>
                <p className="font-ui mb-4" style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.5 }}>
                  {service.description}
                </p>
                <div style={{ height: '1px', background: 'var(--border)', marginBottom: '12px' }} />
                <div className="flex items-center justify-between">
                  <p
                    className="font-ui"
                    style={{
                      fontSize: '10px',
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                      color: 'var(--primary)',
                      fontWeight: 500,
                    }}
                  >
                    {service.ctaLabel}
                  </p>
                  <span style={{ color: 'var(--primary)', fontSize: '12px' }}>↗</span>
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/quotation-calculator"
            className="font-ui"
            style={{
              fontSize: '12px',
              letterSpacing: '0.5px',
              color: 'var(--foreground)',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            }}
          >
            Not sure? Explore all services in the quote calculator ↗
          </Link>
        </motion.div>

      {/* ── Repeated "Ready to think like a director again?" after compliance ── */}
      <div className="max-w-5xl mx-auto relative z-10 mt-20 md:mt-28">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-10 md:mb-14">
          <div>
            <motion.p
              className="section-label mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              Get Started
            </motion.p>
            <motion.h2
              className="section-h2"
              style={{ maxWidth: '480px' }}
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              Ready to think like a{' '}
              <span className="gold-italic">director again?</span>
            </motion.h2>
          </div>
          <motion.p
            className="body-text-rw"
            style={{ maxWidth: '380px', fontSize: '15px', paddingTop: '4px' }}
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
          >
            Tell us what is taking up your time. Choose your closest priority below, and we will start a conversation about the right support.
          </motion.p>
        </div>

        {/* Find Your Fit card — repeated */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ border: '1px solid var(--border)', backgroundColor: 'var(--cloud-blue, #E3E7ED)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Left panel */}
          <div
            className="p-7 md:p-10 flex flex-col justify-between"
            style={{ borderRight: '1px solid var(--border)' }}
          >
            <div>
              <p
                className="font-ui mb-4"
                style={{
                  fontSize: '10px',
                  letterSpacing: '2.5px',
                  textTransform: 'uppercase',
                  color: 'var(--advisory-blue, #275E86)',
                  fontWeight: 600,
                }}
              >
                Find Your Fit
              </p>
              <h3
                className="section-h2-medium mb-4"
                style={{ fontSize: 'clamp(22px, 3vw, 30px)', lineHeight: 1.2 }}
              >
                What would help you most right now?
              </h3>
              <p className="body-text-rw" style={{ fontSize: '14px', maxWidth: '300px' }}>
                Choose a priority. We will suggest a starting point, then tailor the actual scope with you.
              </p>
            </div>
          </div>

          {/* Right panel */}
          <div className="p-7 md:p-10 flex flex-col gap-6">
            {/* Priority buttons */}
            <div>
              <p
                className="font-ui mb-3"
                style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)' }}
              >
                Choose your main priority
              </p>
              <div className="flex flex-wrap gap-2">
                {serviceFitOptions.map((option) => {
                  const isActive = selected === option.id;
                  return (
                    <button
                      key={`repeat-${option.id}`}
                      type="button"
                      onClick={() => setSelected(option.id)}
                      className="font-ui transition-all duration-200"
                      style={{
                        padding: '10px 16px',
                        fontSize: '12px',
                        letterSpacing: '0.3px',
                        border: `1px solid ${isActive ? 'var(--primary)' : 'var(--border)'}`,
                        backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                        color: isActive ? '#fff' : 'var(--foreground)',
                        cursor: 'pointer',
                        minHeight: '40px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'var(--border)' }} />

            {/* Suggested starting point */}
            {selectedOption && (
              <motion.div
                key={`repeat-${selectedOption.id}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col gap-3"
              >
                <p
                  className="font-ui"
                  style={{
                    fontSize: '10px',
                    letterSpacing: '2.5px',
                    textTransform: 'uppercase',
                    color: 'var(--advisory-blue, #275E86)',
                    fontWeight: 600,
                  }}
                >
                  Suggested Starting Point
                </p>
                <p
                  className="section-h2-medium"
                  style={{ fontSize: '18px', lineHeight: 1.3, color: 'var(--primary)' }}
                >
                  {selectedOption.suggestedTitle}
                </p>
                <p className="body-text-rw" style={{ fontSize: '14px' }}>
                  {selectedOption.recommendation}
                </p>
                <button
                  type="button"
                  onClick={(e) => handleEnquire(e, selectedOption)}
                  className="btn-gold self-start mt-1"
                  style={{ padding: '14px 28px', fontSize: '11px', letterSpacing: '2px' }}
                >
                  {selectedOption.cta} ↗
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section heading */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-10 md:mb-14">
          <div>
            <motion.p
              className="section-label mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              Get Started
            </motion.p>
            <motion.h2
              className="section-h2"
              style={{ maxWidth: '480px' }}
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              Ready to think like a{' '}
              <span className="gold-italic">director again?</span>
            </motion.h2>
          </div>
          <motion.p
            className="body-text-rw"
            style={{ maxWidth: '380px', fontSize: '15px', paddingTop: '4px' }}
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
          >
            Tell us what is taking up your time. Choose your closest priority below, and we will start a conversation about the right support.
          </motion.p>
        </div>

        {/* Find Your Fit card */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ border: '1px solid var(--border)', backgroundColor: 'var(--cloud-blue, #E3E7ED)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Left panel */}
          <div
            className="p-7 md:p-10 flex flex-col justify-between"
            style={{ borderRight: '1px solid var(--border)' }}
          >
            <div>
              <p
                className="font-ui mb-4"
                style={{
                  fontSize: '10px',
                  letterSpacing: '2.5px',
                  textTransform: 'uppercase',
                  color: 'var(--advisory-blue, #275E86)',
                  fontWeight: 600,
                }}
              >
                Find Your Fit
              </p>
              <h3
                className="section-h2-medium mb-4"
                style={{ fontSize: 'clamp(22px, 3vw, 30px)', lineHeight: 1.2 }}
              >
                What would help you most right now?
              </h3>
              <p className="body-text-rw" style={{ fontSize: '14px', maxWidth: '300px' }}>
                Choose a priority. We will suggest a starting point, then tailor the actual scope with you.
              </p>
            </div>
          </div>

          {/* Right panel */}
          <div className="p-7 md:p-10 flex flex-col gap-6">
            {/* Priority buttons */}
            <div>
              <p
                className="font-ui mb-3"
                style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)' }}
              >
                Choose your main priority
              </p>
              <div className="flex flex-wrap gap-2">
                {serviceFitOptions.map((option) => {
                  const isActive = selected === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSelected(option.id)}
                      className="font-ui transition-all duration-200"
                      style={{
                        padding: '10px 16px',
                        fontSize: '12px',
                        letterSpacing: '0.3px',
                        border: `1px solid ${isActive ? 'var(--primary)' : 'var(--border)'}`,
                        backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                        color: isActive ? '#fff' : 'var(--foreground)',
                        cursor: 'pointer',
                        minHeight: '40px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'var(--border)' }} />

            {/* Suggested starting point */}
            {selectedOption && (
              <motion.div
                key={selectedOption.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col gap-3"
              >
                <p
                  className="font-ui"
                  style={{
                    fontSize: '10px',
                    letterSpacing: '2.5px',
                    textTransform: 'uppercase',
                    color: 'var(--advisory-blue, #275E86)',
                    fontWeight: 600,
                  }}
                >
                  Suggested Starting Point
                </p>
                <p
                  className="section-h2-medium"
                  style={{ fontSize: '18px', lineHeight: 1.3, color: 'var(--primary)' }}
                >
                  {selectedOption.suggestedTitle}
                </p>
                <p className="body-text-rw" style={{ fontSize: '14px' }}>
                  {selectedOption.recommendation}
                </p>
                <button
                  type="button"
                  onClick={(e) => handleEnquire(e, selectedOption)}
                  className="btn-gold self-start mt-1"
                  style={{ padding: '14px 28px', fontSize: '11px', letterSpacing: '2px' }}
                >
                  {selectedOption.cta} ↗
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Compliance section */}
      </div>
    </section>
  );
}
