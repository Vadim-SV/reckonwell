'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const stats = [
  { value: '£40,000/year', label: 'Average saving' },
  { value: '20%', label: 'Direct credit (SME)' },
  { value: '10% tax', label: 'Patent Box rate' },
  { value: '4–8 weeks', label: 'HMRC approval' },
];

export default function RDTaxReliefPreviewSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="py-20 md:py-36 px-6 md:px-10"
      style={{ backgroundColor: '#f3f4f6' }}
      aria-label="R&D Tax Relief preview"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-ui text-xs uppercase tracking-widest mb-5" style={{ color: '#2563eb', letterSpacing: '3px' }}>
              R&D Tax Relief
            </p>
            <h2 className="font-display mb-5" style={{ fontSize: 'clamp(26px, 4vw, 48px)', fontWeight: 400, color: '#111827', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              Your R&D is Worth Money.{' '}
              <span style={{ fontStyle: 'italic', color: '#2563eb' }}>Let's Claim It.</span>
            </h2>
            <p className="mb-6" style={{ fontSize: '16px', fontWeight: 300, lineHeight: 1.75, color: '#374151' }}>
              Most tech founders leave <strong style={{ color: '#111827' }}>£10k–£100k</strong> on the table in unclaimed R&D Tax Credits and Patent Box relief.
            </p>
            <p className="mb-5" style={{ fontSize: '15px', fontWeight: 300, lineHeight: 1.75, color: '#4b5563' }}>
              If your team spent time developing new technology, building novel products, or solving technical problems, you qualify for R&D Tax Relief. This isn't optional. It's cash back or tax deduction.
            </p>
            <p className="mb-5" style={{ fontSize: '15px', fontWeight: 300, lineHeight: 1.75, color: '#4b5563' }}>
              HMRC created this scheme to encourage innovation. But claiming it requires evidence — technical narratives, spend breakdown, proof of activities. Most founders either don't know about it, or file it wrong.
            </p>
            <p className="mb-8" style={{ fontSize: '15px', fontWeight: 300, lineHeight: 1.75, color: '#4b5563' }}>
              We handle the full process: identify qualifying spend, prepare your claim, file with HMRC, respond to queries. You get the money. We handle the complexity.
            </p>

            <Link
              href="/r-and-d-tax-relief"
              className="inline-block font-ui text-xs uppercase tracking-widest px-8 py-4 mb-10 transition-all duration-200"
              style={{ background: '#2563eb', color: '#ffffff', borderRadius: '2px', letterSpacing: '2px' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = '#1d4ed8')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = '#2563eb')}
            >
              See What You Could Claim →
            </Link>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
                  className="p-4 rounded-sm"
                  style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}
                >
                  <p className="font-display text-xl mb-1" style={{ color: '#2563eb', fontWeight: 600 }}>{stat.value}</p>
                  <p className="font-ui text-xs" style={{ color: '#6b7280', letterSpacing: '1px' }}>{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column — Calculator Preview */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="rounded-sm overflow-hidden" style={{ background: '#ffffff', border: '1px solid #e5e7eb', boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}>
              <div className="px-6 py-4" style={{ background: '#1e3a5f', borderBottom: '1px solid #e5e7eb' }}>
                <p className="font-ui text-xs uppercase tracking-widest" style={{ color: '#93c5fd', letterSpacing: '3px' }}>Example calculation</p>
              </div>
              <div className="p-6 md:p-8">
                <div className="mb-6">
                  <p className="font-ui text-xs uppercase tracking-widest mb-1" style={{ color: '#6b7280', letterSpacing: '2px' }}>Company type</p>
                  <p className="font-display text-xl" style={{ color: '#111827', fontWeight: 500 }}>SaaS Company</p>
                </div>
                <div className="p-4 mb-6 rounded-sm" style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}>
                  <p className="font-ui text-xs uppercase tracking-widest mb-1" style={{ color: '#6b7280', letterSpacing: '2px' }}>Annual R&D Spend</p>
                  <p className="font-display text-2xl" style={{ color: '#111827', fontWeight: 600 }}>£150,000</p>
                </div>
                <div className="h-px mb-6" style={{ background: '#e5e7eb' }} />
                <div className="mb-8">
                  <p className="font-ui text-xs uppercase tracking-widest mb-2" style={{ color: '#6b7280', letterSpacing: '2px' }}>Estimated Annual Relief</p>
                  <p className="font-display" style={{ fontSize: '48px', fontWeight: 700, color: '#2563eb', lineHeight: 1 }}>£45,000</p>
                  <p className="font-ui text-xs mt-2" style={{ color: '#9ca3af' }}>Based on SME R&D Credit (20% of qualifying spend)</p>
                </div>
                <Link
                  href="/r-and-d-tax-relief"
                  className="block w-full text-center font-ui text-xs uppercase tracking-widest px-6 py-4 transition-all duration-200"
                  style={{ background: '#2563eb', color: '#ffffff', borderRadius: '2px', letterSpacing: '2px' }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = '#1d4ed8')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = '#2563eb')}
                >
                  Calculate yours →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
