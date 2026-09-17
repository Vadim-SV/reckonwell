'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const points = [
{
  title: 'Easy to reach',
  body: 'Approachable support over email and WhatsApp.'
},
{
  title: 'Proactive oversight',
  body: 'Cash flow and spending monitored as the business moves.'
},
{
  title: 'Finance-team thinking',
  body: 'Practical input from people who know the context.'
}];


export default function PersonalisedProactiveSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="personalised-proactive"
      ref={ref}
      className="py-20 md:py-24 px-6 md:px-16"
      style={{ backgroundColor: 'var(--background)' }}
      aria-label="The way we work">

      <div className="max-w-5xl mx-auto">
        {/* Eyebrow */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
          {/* Left: text */}
          <div>
            <motion.h2
              className="font-display mb-6 md:mb-8"
              style={{ fontSize: 'clamp(36px, 4.5vw, 58px)', fontWeight: 400, color: 'var(--primary)', lineHeight: 1.1 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>

              An accountant who answers{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--secondary)' }}>
                – and acts before you ask.
              </em>
            </motion.h2>

            <motion.p
              className="mb-4"
              style={{ fontSize: '14px', color: 'var(--body-text)', lineHeight: 1.7 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}>

              Founders should not have to chase their accountant for a reply or discover a cash problem weeks after it happened. With Reckonwell, you can reach your finance team by email or WhatsApp and speak to someone who already understands your business.
            </motion.p>
            <motion.p
              className="mb-8 md:mb-10"
              style={{ fontSize: '14px', color: 'var(--body-text)', lineHeight: 1.7 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}>

              We keep an eye on the numbers every working day — tracking cash flow, watching for overspending and flagging overdue invoices or unusual movements early. It is the access, attention and commercial awareness you would expect from an in-house finance department, without having to build one.
            </motion.p>

            {/* Three mini points */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
              style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}>

              {points?.map((pt) =>
              <div key={pt?.title}>
                  <p className="font-ui mb-1" style={{ fontSize: '11px', fontWeight: 600, color: 'var(--primary)', letterSpacing: '0.3px' }}>
                    {pt?.title}
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.5 }}>
                    {pt?.body}
                  </p>
                </div>
              )}
            </motion.div>

            {/* CTA link */}
            <motion.a
              href="/book"
              className="inline-flex items-center gap-2 font-ui"
              style={{
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'var(--primary)',
                borderBottom: '1px solid var(--primary)',
                paddingBottom: '3px',
                cursor: 'pointer',
                textDecoration: 'none'
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.38 }}>

              Talk to your finance team →
            </motion.a>
          </div>

          {/* Right: illustration in bordered frame */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col mt-2 md:mt-0"
            style={{
              padding: '28px'
            }}>

            <div className="flex items-center justify-center" style={{ minHeight: '260px' }}>
              <Image
                src="/assets/images/Image_Sep_17__2026__12_52_40_AM-1789603119353.png"
                alt="Dashboard illustration showing proactive finance monitoring with alerts and cash flow tracking"
                width={400}
                height={280}
                style={{ width: '100%', height: 'auto', maxWidth: '400px' }} />

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );

}