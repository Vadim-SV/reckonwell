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

              <img
                src="/assets/images/Image_Sep_16__2026__11_09_14_PM-1789599360628.png"
                alt="Debt and equity finance illustration"
                style={{ width: '100%', maxWidth: '360px', height: 'auto', display: 'block' }}
              />
            </div>
            <p
              className="font-ui mt-4"
              style={{ fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#1a6b6b' }}>

              Connecting Companies and Capital
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );


}