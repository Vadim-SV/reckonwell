'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const partners = [
  {
    name: 'Revolut Business',
    logo: '/assets/images/Revolut-1779495022321.png',
  },
  {
    name: 'Tide Bank',
    logo: '/assets/images/Tide-1779494967883.png',
  },
  {
    name: 'Xero',
    logo: '/assets/images/Xero-1779495015718.png',
  },
  {
    name: 'QuickBooks',
    logo: '/assets/images/Quickbooks-1779494986853.png',
  },
];

export default function PartnershipsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      ref={ref}
      className="py-14 md:py-20 px-6 md:px-10 border-t"
      style={{
        borderColor: 'var(--border-subtle)',
        backgroundColor: '#080808',
      }}
      aria-label="Certified partners"
    >
      <div className="max-w-5xl mx-auto">
        <motion.p
          className="section-label text-center mb-8 md:mb-10"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Certified &amp; Partnering With
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              className="flex flex-col items-center gap-3 group"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ opacity: 0.45 }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.45')}
            >
              <div
                className="flex items-center justify-center rounded-lg"
                style={{
                  width: '120px',
                  height: '120px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'var(--primary)',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  padding: '14px',
                }}
              >
                <img
                  src={partner.logo}
                  alt={partner.name + ' logo'}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}