'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const points = [
  {
    number: '1.',
    title: "We\'re there when you need us",
    body: 'Message us on email or WhatsApp and talk to someone who knows your business. We check cash, spending and overdue invoices every working day and flag problems before they grow.',
  },
  {
    number: '2.',
    title: 'We make sure your numbers are right',
    body: "AI and software do the processing. We check the coding, reconcile the accounts and sign off the numbers, so mistakes don\u2019t reach your reports or tax returns.",
  },
  {
    number: '3.',title: 'We help you raise capital',body: 'When you need funding, we get your numbers investor-ready and introduce you to lenders and investors who fit.',smallPrint: 'We don\'t lend or invest, and we can\'t guarantee funding.',
  },
];

export default function WhatYouGetSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="what-you-get"
      ref={ref}
      className="py-20 md:py-28 px-6 md:px-16"
      style={{ backgroundColor: 'var(--background)' }}
      aria-label="What you get"
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.h2
          className="font-display mb-14 md:mb-16"
          style={{
            fontSize: 'clamp(32px, 4.5vw, 56px)',
            fontWeight: 400,
            color: 'var(--primary)',
            lineHeight: 1.1,
            maxWidth: '700px',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          An in-house finance team, without hiring one.
        </motion.h2>

        {/* Three points */}
        <div className="flex flex-col gap-0">
          {points.map((point, i) => (
            <motion.div
              key={point.number}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 py-10 md:py-12"
              style={{
                borderTop: '1px solid var(--border)',
                borderBottom: i === points.length - 1 ? '1px solid var(--border)' : 'none',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
            >
              {/* Number */}
              <div className="md:col-span-1">
                <span
                  className="font-display"
                  style={{
                    fontSize: 'clamp(28px, 3vw, 40px)',
                    fontWeight: 400,
                    color: 'var(--secondary)',
                    lineHeight: 1,
                  }}
                >
                  {point.number}
                </span>
              </div>

              {/* Title + body */}
              <div className="md:col-span-11">
                <h3
                  className="font-display mb-3"
                  style={{
                    fontSize: 'clamp(20px, 2.2vw, 28px)',
                    fontWeight: 400,
                    color: 'var(--primary)',
                    lineHeight: 1.2,
                  }}
                >
                  {point.title}
                </h3>
                <p
                  style={{
                    fontSize: '15px',
                    color: 'var(--body-text)',
                    lineHeight: 1.75,
                    maxWidth: '640px',
                  }}
                >
                  {point.body}
                </p>
                {point.smallPrint && (
                  <p
                    className="font-ui mt-3"
                    style={{
                      fontSize: '11px',
                      color: 'var(--muted)',
                      lineHeight: 1.6,
                      letterSpacing: '0.2px',
                    }}
                  >
                    {point.smallPrint}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link
            href="/book"
            className="btn-gold inline-flex items-center gap-2"
          >
            Book a discovery call →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
