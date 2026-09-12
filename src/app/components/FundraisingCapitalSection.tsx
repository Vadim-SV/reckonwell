'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const cards = [
  {
    title: 'FINANCIAL MODELS & FORECASTS',
    body: 'Build a credible financial story around the raise.',
  },
  {
    title: 'INVESTOR PREPARATION',
    body: 'Financial reporting, business planning, funding requirements and use of funds.',
  },
  {
    title: 'CAPITAL INTRODUCTIONS',
    body: 'Introductions to relevant angel investors, VCs and debt providers where there is a suitable fit.',
  },
];

const progressionSteps = ['Prepare', 'Model', 'Present', 'Introductions', 'Raise'];

export default function FundraisingCapitalSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="fundraising-capital"
      ref={ref}
      className="py-16 md:py-28 px-6 md:px-10"
      style={{ backgroundColor: 'var(--background)' }}
      aria-label="Fundraising and Capital"
    >
      <div className="max-w-7xl mx-auto">
        {/* Kicker */}
        <motion.p
          className="section-label mb-4 md:mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Growing or Raising Investment?
        </motion.p>

        {/* Headline + body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-start mb-14 md:mb-20">
          <div>
            <motion.h2
              className="section-h2-medium mb-5 md:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              We don&apos;t just get you ready to raise.
              <br />
              <span className="gold-italic">We help you raise.</span>
            </motion.h2>

            <motion.p
              className="body-text-rw mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Good numbers are only part of a successful raise.
            </motion.p>
            <motion.p
              className="body-text-rw mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              We help businesses build the financial model, forecasts, reporting and investor materials behind the raise — and, where appropriate, connect founders with relevant investors and funding providers through our network.
            </motion.p>
            <motion.p
              className="body-text-rw"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              From equity investment to debt finance, we can support the process from preparation through to conversations with potential funders.
            </motion.p>
          </div>

          {/* Progression graphic */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="rounded-sm overflow-hidden"
            style={{ border: '1px solid var(--border-subtle)', backgroundColor: 'var(--card)' }}
          >
            <div className="p-6 md:p-8">
              <p
                className="font-ui mb-8"
                style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--muted)' }}
              >
                The Raise Process
              </p>
              <div className="flex flex-col gap-0">
                {progressionSteps?.map((step, i) => (
                  <div key={step} className="flex items-center gap-4">
                    <div className="flex flex-col items-center" style={{ width: '20px', flexShrink: 0 }}>
                      <div
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: i === progressionSteps?.length - 1 ? 'var(--primary)' : 'var(--border)',
                          border: `1px solid ${i === progressionSteps?.length - 1 ? 'var(--primary)' : 'var(--border)'}`,
                          flexShrink: 0,
                        }}
                      />
                      {i < progressionSteps?.length - 1 && (
                        <div
                          style={{
                            width: '1px',
                            height: '28px',
                            backgroundColor: 'var(--border-subtle)',
                          }}
                        />
                      )}
                    </div>
                    <p
                      className="font-display"
                      style={{
                        fontSize: i === progressionSteps?.length - 1 ? 'clamp(18px, 2.5vw, 26px)' : 'clamp(14px, 1.8vw, 18px)',
                        color: i === progressionSteps?.length - 1 ? 'var(--foreground)' : 'var(--muted)',
                        fontWeight: i === progressionSteps?.length - 1 ? 500 : 400,
                        paddingBottom: i < progressionSteps?.length - 1 ? '0' : '0',
                        lineHeight: 1.2,
                      }}
                    >
                      {step}
                    </p>
                  </div>
                ))}
              </div>
              <p
                className="font-ui mt-6"
                style={{ fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.3px', fontStyle: 'italic' }}
              >
                Introductions where appropriate and where there is a suitable fit.
              </p>
            </div>
          </motion.div>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {cards?.map((card, i) => (
            <motion.div
              key={card?.title}
              className="solution-card"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative z-10">
                <p
                  className="font-ui mb-3"
                  style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 400 }}
                >
                  {card?.title}
                </p>
                <p className="body-text-rw" style={{ fontSize: '14px' }}>
                  {card?.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
