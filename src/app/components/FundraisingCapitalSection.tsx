'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  { label: 'Model the raise' },
  { label: 'Present the case' },
  { label: 'Make relevant introductions' },
];

export default function FundraisingCapitalSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const handleCTA = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('get-started');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      const event = new CustomEvent('prefill-service', { detail: 'capital' });
      window.dispatchEvent(event);
    }
  };

  return (
    <section
      id="fundraising-capital"
      ref={ref}
      className="py-16 md:py-28 px-6 md:px-16"
      style={{ backgroundColor: 'var(--background)' }}
      aria-label="Fundraising and capital"
    >
      <div className="max-w-7xl mx-auto">
        {/* Eyebrow */}
        <motion.p
          className="font-ui mb-4 md:mb-5"
          style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--muted)' }}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          03 / Growth &amp; capital
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
          {/* Left: text */}
          <div>
            <motion.h2
              className="font-display mb-6 md:mb-8"
              style={{ fontSize: 'clamp(36px, 4.5vw, 58px)', fontWeight: 400, color: 'var(--primary)', lineHeight: 1.1 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              We help you reach capital,{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--secondary)' }}>not just get ready for it.</em>
            </motion.h2>

            <motion.p
              className="mb-4"
              style={{ fontSize: '14px', color: 'var(--body-text)', lineHeight: 1.7 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Credible numbers matter, but a spreadsheet alone does not start an investor conversation. We can build the model, forecasts and materials behind the raise, then connect suitable founders with relevant investors or funding providers through our network.
            </motion.p>
            <motion.p
              className="mb-8"
              style={{ fontSize: '14px', color: 'var(--body-text)', lineHeight: 1.7 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              That can include equity or debt routes and support through the questions that follow an introduction. The work is shaped around your stage, funding need and the evidence you have.
            </motion.p>

            {/* Three inline step labels */}
            <motion.div
              className="flex flex-wrap gap-0 mb-6"
              style={{ borderTop: '1px solid var(--border)' }}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {steps.map((step, i) => (
                <div
                  key={step.label}
                  className="font-ui py-3 pr-6"
                  style={{
                    fontSize: '10px',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: 'var(--primary)',
                    fontWeight: 600,
                    borderRight: i < steps.length - 1 ? '1px solid var(--border)' : 'none',
                    paddingLeft: i > 0 ? '24px' : '0',
                  }}
                >
                  {step.label}
                </div>
              ))}
            </motion.div>

            {/* Disclaimer */}
            <motion.p
              className="font-ui mb-6"
              style={{ fontSize: '11px', color: 'var(--muted)', lineHeight: 1.6, fontStyle: 'italic' }}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              Introductions depend on fit and availability. Funding is never guaranteed; regulated advice or arranging is handled by appropriately authorised parties where required.
            </motion.p>

            {/* CTA link */}
            <motion.a
              href="#get-started"
              onClick={handleCTA}
              className="inline-flex items-center gap-2 font-ui"
              style={{
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'var(--primary)',
                borderBottom: '1px solid var(--primary)',
                paddingBottom: '3px',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Discuss funding support →
            </motion.a>
          </div>

          {/* Right: illustration in bordered frame */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col mt-2 md:mt-0"
            style={{
              border: '1px solid var(--border)',
              backgroundColor: 'var(--card)',
              padding: '28px',
            }}
          >
            {/* Inline SVG illustration */}
            <div className="flex items-center justify-center" style={{ minHeight: '260px' }}>
              <svg
                viewBox="0 0 320 220"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: '100%', maxWidth: '340px', height: 'auto' }}
                aria-label="Financial story to investor conversation: document with chart connecting to investor network"
              >
                {/* Main document */}
                <rect x="60" y="30" width="130" height="160" rx="3" fill="#F6E9D8" stroke="#12233F" strokeWidth="1.2" strokeOpacity="0.5" />
                <rect x="75" y="50" width="100" height="8" rx="1" fill="#12233F" fillOpacity="0.15" />
                <rect x="75" y="65" width="80" height="6" rx="1" fill="#12233F" fillOpacity="0.1" />
                {/* Bar chart inside doc */}
                <rect x="80" y="100" width="14" height="50" rx="1" fill="#12233F" fillOpacity="0.25" />
                <rect x="100" y="85" width="14" height="65" rx="1" fill="#12233F" fillOpacity="0.35" />
                <rect x="120" y="75" width="14" height="75" rx="1" fill="#12233F" fillOpacity="0.5" />
                <rect x="140" y="90" width="14" height="60" rx="1" fill="#12233F" fillOpacity="0.4" />
                {/* Checkmark circle top-right of doc */}
                <circle cx="175" cy="45" r="16" fill="#F6E9D8" stroke="#12233F" strokeWidth="1.2" strokeOpacity="0.5" />
                <path d="M168 45 L173 50 L182 40" stroke="#12233F" strokeWidth="1.5" strokeOpacity="0.7" strokeLinecap="round" strokeLinejoin="round" />
                {/* Dashed lines to investor circles */}
                <line x1="200" y1="110" x2="245" y2="80" stroke="#12233F" strokeWidth="1" strokeDasharray="5 4" strokeOpacity="0.4" />
                <line x1="200" y1="130" x2="245" y2="155" stroke="#12233F" strokeWidth="1" strokeDasharray="5 4" strokeOpacity="0.4" />
                <line x1="200" y1="130" x2="285" y2="140" stroke="#12233F" strokeWidth="1" strokeDasharray="5 4" strokeOpacity="0.4" />
                {/* Investor circles */}
                <circle cx="255" cy="70" r="22" fill="#F6E9D8" stroke="#12233F" strokeWidth="1.2" strokeOpacity="0.5" />
                <circle cx="255" cy="62" r="7" fill="none" stroke="#12233F" strokeWidth="1" strokeOpacity="0.5" />
                <path d="M242 82 Q255 75 268 82" stroke="#12233F" strokeWidth="1" strokeOpacity="0.5" fill="none" />
                <circle cx="255" cy="158" r="20" fill="#F6E9D8" stroke="#12233F" strokeWidth="1.2" strokeOpacity="0.5" />
                <circle cx="255" cy="150" r="7" fill="none" stroke="#12233F" strokeWidth="1" strokeOpacity="0.5" />
                <path d="M243 170 Q255 163 267 170" stroke="#12233F" strokeWidth="1" strokeOpacity="0.5" fill="none" />
                <circle cx="292" cy="138" r="18" fill="#F6E9D8" stroke="#12233F" strokeWidth="1.2" strokeOpacity="0.5" />
                <circle cx="292" cy="131" r="6" fill="none" stroke="#12233F" strokeWidth="1" strokeOpacity="0.5" />
                <path d="M281 148 Q292 142 303 148" stroke="#12233F" strokeWidth="1" strokeOpacity="0.5" fill="none" />
                {/* Currency symbol top right */}
                <circle cx="295" cy="45" r="18" fill="#E3E7ED" stroke="#12233F" strokeWidth="1" strokeOpacity="0.3" />
                <text x="295" y="51" textAnchor="middle" fontSize="14" fill="#12233F" fillOpacity="0.5" fontFamily="serif">₮</text>
              </svg>
            </div>
            <p
              className="font-ui mt-4"
              style={{ fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--muted)' }}
            >
              From financial story to conversation
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
