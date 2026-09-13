'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  {
    label: 'Model the raise',
    body: 'Build the financial model, forecasts and supporting materials behind the raise.',
  },
  {
    label: 'Present the case',
    body: 'Structure the financial narrative and investor materials around your stage and funding need.',
  },
  {
    label: 'Make relevant introductions',
    body: 'Connect suitable founders with relevant investors or funding providers through our network.',
  },
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
      className="py-14 md:py-28 px-5 md:px-10"
      style={{ backgroundColor: 'var(--background)' }}
      aria-label="Fundraising and capital"
    >
      <div className="max-w-7xl mx-auto">
        {/* Eyebrow */}
        <motion.p
          className="section-label mb-4 md:mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          03 / Growth &amp; capital
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-start">
          {/* Left: text */}
          <div>
            <motion.h2
              className="section-h2-medium mb-5 md:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              We help you reach capital,{' '}
              <span className="gold-italic">not just get ready for it.</span>
            </motion.h2>

            <motion.p
              className="body-text-rw mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Credible numbers matter, but a spreadsheet alone does not start an investor conversation. We can build the model, forecasts and materials behind the raise, then connect suitable founders with relevant investors or funding providers through our network.
            </motion.p>
            <motion.p
              className="body-text-rw mb-7 md:mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              The work is shaped around your stage, funding need and the evidence you have.
            </motion.p>

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
                paddingBottom: '2px',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              Discuss funding support →
            </motion.a>

            {/* Qualification disclaimer */}
            <motion.p
              className="font-ui mt-5"
              style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.3px', fontStyle: 'italic', lineHeight: 1.6 }}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Introductions depend on fit and availability. Funding is not guaranteed.
            </motion.p>
          </div>

          {/* Right: raise journey illustration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col gap-0 mt-2 md:mt-0"
            style={{
              border: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--card)',
              padding: '32px 28px',
            }}
          >
            <p
              className="font-ui mb-8"
              style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--muted)' }}
            >
              The raise journey
            </p>

            {/* Inline SVG: stepped path */}
            <div className="mb-8 flex items-center justify-center">
              <svg
                viewBox="0 0 320 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: '100%', maxWidth: '320px', height: 'auto' }}
                aria-label="A stepped path from financial model to investor introduction to capital raised"
              >
                {/* Dashed path */}
                <path
                  d="M20 100 L80 100 L80 70 L150 70 L150 40 L220 40 L220 20 L300 20"
                  stroke="#12233F"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                  strokeOpacity="0.4"
                >
                  <animate attributeName="stroke-dashoffset" from="0" to="-40" dur="2s" repeatCount="indefinite" />
                </path>
                {/* Nodes */}
                {[
                  { cx: 20, cy: 100, label: 'Model' },
                  { cx: 80, cy: 70, label: 'Forecast' },
                  { cx: 150, cy: 40, label: 'Present' },
                  { cx: 220, cy: 20, label: 'Introduce' },
                  { cx: 300, cy: 20, label: 'Raise' },
                ].map((node, i) => (
                  <g key={node.label}>
                    <circle
                      cx={node.cx}
                      cy={node.cy}
                      r={i === 4 ? 7 : 5}
                      fill={i === 4 ? '#12233F' : '#F6E9D8'}
                      stroke="#12233F"
                      strokeWidth="1.5"
                      strokeOpacity={i === 4 ? 1 : 0.5}
                    />
                    {i === 4 && (
                      <circle cx={node.cx} cy={node.cy} r={12} fill="none" stroke="#12233F" strokeWidth="1" strokeOpacity="0.2">
                        <animate attributeName="r" values="7;14;7" dur="2.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.3;0;0.3" dur="2.5s" repeatCount="indefinite" />
                      </circle>
                    )}
                  </g>
                ))}
              </svg>
            </div>

            {/* Steps */}
            <div className="flex flex-col gap-4">
              {steps.map((step, i) => (
                <div key={step.label} className="flex gap-4 items-start">
                  <div
                    className="flex-shrink-0 font-ui"
                    style={{
                      width: '20px',
                      height: '20px',
                      border: '1px solid var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '9px',
                      color: 'var(--primary)',
                      marginTop: '2px',
                    }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-ui mb-1" style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 500 }}>
                      {step.label}
                    </p>
                    <p className="body-text-rw" style={{ fontSize: '13px', color: 'var(--muted)' }}>
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
