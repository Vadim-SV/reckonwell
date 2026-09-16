'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function FundraisingCapitalSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="fundraising-capital"
      ref={ref}
      className="py-20 md:py-28 px-6 md:px-16"
      style={{ backgroundColor: 'var(--background)' }}
      aria-label="Debt and equity finance">

      <div className="max-w-5xl mx-auto">
        {/* Eyebrow */}
        <motion.p
          className="font-ui mb-5 text-[rgba(102,96,92,1)]"
          style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#1a6b6b' }}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>DEBT & EQUITY FINANCE


        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left: text */}
          <div>
            {/* Headline */}
            <motion.h2
              className="font-display mb-8"
              style={{ fontSize: 'clamp(38px, 4.8vw, 62px)', fontWeight: 400, color: '#0d1b2e', lineHeight: 1.08 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>

              The bridge between growing companies{' '}
              <em style={{ fontStyle: 'italic', color: '#b5813a' }}>and capital.</em>
            </motion.h2>

            {/* Body paragraph 1 */}
            <motion.p
              className="mb-5"
              style={{ fontSize: '14px', color: '#0d1b2e', lineHeight: 1.75, opacity: 0.85 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}>

              Reckonwell helps businesses access debt and equity finance through our network of lenders, investors and funding partners. We start by understanding how much capital you need, what it will be used for and which route is appropriate for the business.
            </motion.p>

            {/* Body paragraph 2 */}
            <motion.p
              className="mb-8"
              style={{ fontSize: '14px', color: '#0d1b2e', lineHeight: 1.75, opacity: 0.85 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.28 }}>

              Where there is a suitable fit, we connect you with relevant capital providers and help keep the conversation moving — whether you are seeking business finance without giving up equity or bringing investors into the next stage of growth.
            </motion.p>

            {/* Inline labels */}
            <motion.div
              className="flex flex-wrap gap-6 mb-5 pb-5"
              style={{ borderBottom: '1px solid rgba(13,27,46,0.2)' }}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}>

              {['Debt Finance', 'Equity Investment', 'Relevant Introductions']?.map((label) =>
              <span
                key={label}
                className="font-ui"
                style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#0d1b2e', fontWeight: 700 }}>

                  {label}
                </span>
              )}
            </motion.div>

            {/* Disclaimer */}
            <motion.p
              className="font-ui mb-8"
              style={{ fontSize: '10px', color: '#0d1b2e', lineHeight: 1.65, opacity: 0.55 }}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}>

              Reckonwell does not lend or invest directly and cannot guarantee an introduction or funding. Decisions remain with lenders and investors; regulated activity is handled by appropriately authorised parties where required.
            </motion.p>

            {/* CTA link */}
            <motion.a
              href="/contact"
              className="inline-flex items-center gap-2 font-ui"
              style={{
                fontSize: '10px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#0d1b2e',
                borderBottom: '1px solid #0d1b2e',
                paddingBottom: '3px',
                textDecoration: 'none'
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}>

              Discuss Access to Capital →
            </motion.a>
          </div>

          {/* Right: illustration in bordered frame */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col"
            style={{
              border: '1px solid rgba(13,27,46,0.18)',
              backgroundColor: '#f5ede0',
              padding: '32px'
            }}>

            <div
              className="flex items-center justify-center"
              style={{
                minHeight: '200px',
                border: '1px solid rgba(13,27,46,0.12)',
                backgroundColor: '#f9f3ea',
                padding: '24px'
              }}>

              <svg
                viewBox="0 0 340 240"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: '100%', maxWidth: '360px', height: 'auto' }}
                aria-label="Connecting companies and capital: document with chart connecting to investor network">

                {/* Main document */}
                <rect x="50" y="25" width="140" height="175" rx="3" fill="#f5ede0" stroke="#0d1b2e" strokeWidth="1.2" strokeOpacity="0.4" />
                <rect x="68" y="48" width="104" height="8" rx="1" fill="#0d1b2e" fillOpacity="0.15" />
                <rect x="68" y="62" width="80" height="5" rx="1" fill="#0d1b2e" fillOpacity="0.1" />
                {/* Bar chart inside doc */}
                <rect x="72" y="108" width="16" height="52" rx="1" fill="#0d1b2e" fillOpacity="0.2" />
                <rect x="94" y="92" width="16" height="68" rx="1" fill="#0d1b2e" fillOpacity="0.3" />
                <rect x="116" y="80" width="16" height="80" rx="1" fill="#0d1b2e" fillOpacity="0.45" />
                <rect x="138" y="96" width="16" height="64" rx="1" fill="#0d1b2e" fillOpacity="0.35" />
                {/* Baseline */}
                <line x1="68" y1="162" x2="168" y2="162" stroke="#0d1b2e" strokeWidth="0.8" strokeOpacity="0.25" />
                {/* Checkmark circle top-right of doc */}
                <circle cx="178" cy="42" r="18" fill="#f5ede0" stroke="#0d1b2e" strokeWidth="1.2" strokeOpacity="0.4" />
                <path d="M170 42 L176 48 L186 36" stroke="#0d1b2e" strokeWidth="1.6" strokeOpacity="0.6" strokeLinecap="round" strokeLinejoin="round" />
                {/* Dashed connector lines */}
                <line x1="205" y1="105" x2="252" y2="75" stroke="#0d1b2e" strokeWidth="1" strokeDasharray="5 4" strokeOpacity="0.35" />
                <line x1="205" y1="125" x2="252" y2="162" stroke="#0d1b2e" strokeWidth="1" strokeDasharray="5 4" strokeOpacity="0.35" />
                <line x1="205" y1="125" x2="295" y2="148" stroke="#0d1b2e" strokeWidth="1" strokeDasharray="5 4" strokeOpacity="0.35" />
                {/* Top investor circle */}
                <circle cx="264" cy="65" r="24" fill="#e3e7ed" stroke="#0d1b2e" strokeWidth="1.2" strokeOpacity="0.4" />
                <circle cx="264" cy="57" r="8" fill="none" stroke="#0d1b2e" strokeWidth="1" strokeOpacity="0.5" />
                <path d="M250 79 Q264 72 278 79" stroke="#0d1b2e" strokeWidth="1" strokeOpacity="0.5" fill="none" />
                {/* Bottom-left investor circle */}
                <circle cx="258" cy="168" r="22" fill="#f5ede0" stroke="#0d1b2e" strokeWidth="1.2" strokeOpacity="0.4" />
                <circle cx="258" cy="160" r="7" fill="none" stroke="#0d1b2e" strokeWidth="1" strokeOpacity="0.5" />
                <path d="M246 178 Q258 172 270 178" stroke="#0d1b2e" strokeWidth="1" strokeOpacity="0.5" fill="none" />
                {/* Bottom-right investor circle */}
                <circle cx="300" cy="148" r="20" fill="#f5ede0" stroke="#0d1b2e" strokeWidth="1.2" strokeOpacity="0.4" />
                <circle cx="300" cy="141" r="7" fill="none" stroke="#0d1b2e" strokeWidth="1" strokeOpacity="0.5" />
                <path d="M289 158 Q300 152 311 158" stroke="#0d1b2e" strokeWidth="1" strokeOpacity="0.5" fill="none" />
                {/* Currency symbol top right */}
                <circle cx="308" cy="38" r="20" fill="#e3e7ed" stroke="#0d1b2e" strokeWidth="1" strokeOpacity="0.3" />
                <text x="308" y="45" textAnchor="middle" fontSize="15" fill="#0d1b2e" fillOpacity="0.45" fontFamily="serif">₮</text>
              </svg>
            </div>
            <p
              className="font-ui mt-4"
              style={{ fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#1a6b6b' }}>

              Connecting Companies and Capital
            </p>
          </motion.div>
        </div>
      </div>
    </section>);


}