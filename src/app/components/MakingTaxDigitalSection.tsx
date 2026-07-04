'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const faqs = [
  {
    q: 'Do I actually need MTD?',
    a: 'If you earn over £50k as self-employed or landlord, yes. It\'s not optional. HMRC enforces it. Some exceptions exist (recent startup, minimal income), but if you filed a tax return showing £50k+, you\'re in.',
  },
  {
    q: 'What if I miss the deadline?',
    a: 'HMRC charges penalties automatically. You can appeal, but the burden is on you to prove exceptional circumstances. Most people don\'t appeal. They just pay. That\'s why we file on time (always before deadline).',
  },
  {
    q: 'How do I know if I\'ve missed a filing?',
    a: 'Check HMRC\'s \'Tax account\' online, or ask us. We track all four deadlines per year and alert you. If you\'re ever late, HMRC will tell you (when they bill you for penalty).',
  },
  {
    q: 'Can I do this myself?',
    a: 'You can. But you\'ll need: MTD software (£15-50/month), time to categorize every transaction (4-5 hours/month), knowledge of tax rules, discipline to file 4 times per year (not 1), stress about getting it wrong. At £300/month, we handle all of this.',
  },
  {
    q: 'What if HMRC questions my filing?',
    a: 'We respond on your behalf. We review your categorization, prepare evidence, and defend your position. You don\'t deal with HMRC directly.',
  },
];

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left transition-colors duration-200"
      >
        <span className="font-display text-base md:text-lg pr-4" style={{ color: '#f5f2ec', fontWeight: 400 }}>{q}</span>
        <span className="flex-shrink-0 transition-transform duration-300" style={{ color: '#dc2626', transform: open ? 'rotate(45deg)' : 'none', fontSize: '20px', lineHeight: 1 }}>+</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <p className="pb-5 font-ui text-sm leading-relaxed" style={{ color: 'rgba(245,242,236,0.7)', lineHeight: 1.75 }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function MakingTaxDigitalSection() {
  return null;
}
