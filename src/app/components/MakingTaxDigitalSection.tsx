'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-20 md:py-36 px-6 md:px-10" style={{ backgroundColor: '#080808' }} aria-label="Making Tax Digital">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div className="mb-12 md:mb-16" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full" style={{ background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.4)' }}>
            <span style={{ color: '#dc2626', fontSize: '10px' }}>⚠</span>
            <span className="font-ui text-xs uppercase tracking-widest" style={{ color: '#dc2626', letterSpacing: '2px' }}>Legal Requirement</span>
          </div>
          <h2 className="section-h2-medium mb-5" style={{ maxWidth: '700px' }}>
            If You Earn £50k+, You Need This.{' '}
            <span style={{ color: '#dc2626', fontStyle: 'italic' }}>Quarterly Tax Returns Required.</span>
          </h2>
          <p className="body-text-rw" style={{ maxWidth: '620px' }}>
            Making Tax Digital (MTD) is now mandatory for landlords and sole traders earning over £50,000/year. Submitting quarterly is a legal requirement. Miss a deadline? HMRC penalties are steep. We handle the filings. You focus on the business.
          </p>
        </motion.div>

        {/* Who This Applies To */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 md:mb-16" initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}>
          <div className="p-6 md:p-8 rounded-sm" style={{ background: 'var(--card)', border: '1px solid rgba(220,38,38,0.3)' }}>
            <p className="font-ui text-xs uppercase tracking-widest mb-5" style={{ color: '#dc2626', letterSpacing: '3px' }}>You Need MTD If You're...</p>
            {['Self-employed or freelancer', 'Earn more than £50,000/year', 'Have rental income (landlord)', 'Run a trading business', 'Partner in a partnership'].map((item) => (
              <div key={item} className="flex items-center gap-3 mb-3">
                <span style={{ color: '#dc2626', flexShrink: 0, fontWeight: 700 }}>✓</span>
                <span className="font-ui text-sm" style={{ color: 'var(--body-text)' }}>{item}</span>
              </div>
            ))}
          </div>
          <div className="p-6 md:p-8 rounded-sm" style={{ background: 'var(--card)', border: '1px solid var(--border-subtle)' }}>
            <p className="font-ui text-xs uppercase tracking-widest mb-5" style={{ color: 'var(--muted)', letterSpacing: '3px' }}>You Might Not Need If...</p>
            {['Salaried employee (employer does it)', 'Earn under £50k', 'Recently started (<1 year in)', 'Only have savings interest'].map((item) => (
              <div key={item} className="flex items-center gap-3 mb-3">
                <span style={{ color: 'var(--muted)', flexShrink: 0 }}>✗</span>
                <span className="font-ui text-sm" style={{ color: 'var(--muted)' }}>{item}</span>
              </div>
            ))}
            <p className="font-ui text-xs mt-5 pt-5" style={{ color: 'var(--muted)', borderTop: '1px solid var(--border-subtle)', lineHeight: 1.6 }}>
              Not sure? Check your tax return from last year. If your net profit/income is over £50,000, you're in.
            </p>
          </div>
        </motion.div>

        {/* Why It Matters — 3 Cards */}
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12 md:mb-16" initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.15 }}>
          {[
            {
              icon: '📅',
              title: 'Quarterly Deadlines',
              content: (
                <div>
                  <p className="font-ui text-sm mb-3" style={{ color: 'var(--body-text)', lineHeight: 1.7 }}>You have 4 quarterly filing deadlines per year:</p>
                  {[['Q1: April 5', 'for Jan–Mar'], ['Q2: July 5', 'for Apr–Jun'], ['Q3: October 5', 'for Jul–Sep'], ['Q4: January 31', 'for Oct–Dec']].map(([q, p]) => (
                    <div key={q} className="flex justify-between mb-2">
                      <span className="font-ui text-xs" style={{ color: '#dc2626', fontWeight: 600 }}>{q}</span>
                      <span className="font-ui text-xs" style={{ color: 'var(--muted)' }}>{p}</span>
                    </div>
                  ))}
                  <p className="font-ui text-xs mt-3" style={{ color: 'rgba(220,38,38,0.8)', lineHeight: 1.6 }}>Miss a deadline? HMRC charges penalties immediately.</p>
                </div>
              ),
            },
            {
              icon: '⚠️',
              title: 'Penalty Amounts',
              content: (
                <div>
                  <p className="font-ui text-xs uppercase tracking-widest mb-3" style={{ color: '#dc2626', letterSpacing: '2px' }}>HMRC Penalties Are Real</p>
                  {['Late filing: £100–£1,000 per quarter', 'Late payment: 5% of tax owed', 'Multiple quarters: Can reach £3,000+'].map((item) => (
                    <div key={item} className="flex items-start gap-2 mb-2">
                      <span style={{ color: '#dc2626', flexShrink: 0 }}>—</span>
                      <span className="font-ui text-xs" style={{ color: 'var(--body-text)', lineHeight: 1.6 }}>{item}</span>
                    </div>
                  ))}
                  <p className="font-ui text-xs mt-3 p-3 rounded-sm" style={{ color: 'rgba(220,38,38,0.9)', background: 'rgba(220,38,38,0.08)', lineHeight: 1.6 }}>
                    Example: £50k profit = ~£10k tax owed. Miss one quarter = £500+ penalty.
                  </p>
                </div>
              ),
            },
            {
              icon: '🔄',
              title: 'What Changed',
              content: (
                <div>
                  <p className="font-ui text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--primary)', letterSpacing: '2px' }}>MTD Now Requires Real-Time Data</p>
                  {['Every business transaction recorded as it happens', 'Linked to correct tax category', 'Reported to HMRC via MTD software', 'This isn\'t optional. It\'s law.'].map((item) => (
                    <div key={item} className="flex items-start gap-2 mb-2">
                      <span style={{ color: 'var(--primary)', flexShrink: 0 }}>•</span>
                      <span className="font-ui text-xs" style={{ color: 'var(--body-text)', lineHeight: 1.6 }}>{item}</span>
                    </div>
                  ))}
                </div>
              ),
            },
          ].map((card, i) => (
            <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="p-6 rounded-sm" style={{ background: 'var(--card)', border: '1px solid var(--border-subtle)' }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{card.icon}</span>
                <h3 className="font-display text-lg" style={{ color: 'var(--foreground)', fontWeight: 400 }}>{card.title}</h3>
              </div>
              {card.content}
            </motion.div>
          ))}
        </motion.div>

        {/* How We Handle It */}
        <motion.div className="mb-12 md:mb-16" initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
          <p className="section-label mb-6">How We Handle It</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Setup',
                time: '48 hours',
                items: ['Connect your bank + accounting software (Xero, QuickBooks, etc)', 'Set up transaction categorization', 'Show you the dashboard'],
              },
              {
                step: '02',
                title: 'Monthly Monitoring',
                time: 'Every month',
                items: ['All transactions reviewed', 'Tax categorization checked', 'Running profit tracked', 'Tax position forecast updated', 'Monthly report delivered'],
              },
              {
                step: '03',
                title: 'Quarterly Filing',
                time: 'Before every deadline',
                items: ['MTD return filed with HMRC', 'Tax owed + due date shown', 'Payment reminder set', 'HMRC queries handled on your behalf'],
              },
            ].map((step, i) => (
              <div key={step.step} className="p-6 rounded-sm" style={{ background: 'var(--card)', border: '1px solid var(--border-subtle)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-ui text-xs" style={{ color: 'var(--primary)', letterSpacing: '2px' }}>{step.step}</span>
                  <div>
                    <h3 className="font-display text-lg" style={{ color: 'var(--foreground)', fontWeight: 400 }}>{step.title}</h3>
                    <p className="font-ui text-xs" style={{ color: '#dc2626', letterSpacing: '1px' }}>{step.time}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {step.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }}>•</span>
                      <span className="font-ui text-xs" style={{ color: 'var(--body-text)', lineHeight: 1.6 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pricing Box */}
        <motion.div className="mb-12 md:mb-16" initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.25 }}>
          <div className="max-w-2xl mx-auto p-8 md:p-10 rounded-sm" style={{ background: 'var(--card)', border: '2px solid rgba(220,38,38,0.4)' }}>
            <p className="font-ui text-xs uppercase tracking-widest mb-2" style={{ color: '#dc2626', letterSpacing: '3px' }}>MTD Filing + Monthly Monitoring</p>
            <p className="font-display mb-6" style={{ fontSize: '48px', color: 'var(--foreground)', fontWeight: 400 }}>
              £300<span className="font-ui text-lg" style={{ color: 'var(--muted)' }}>/month</span>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
              {['Unlimited quarterly filings', 'Monthly transaction review', 'Monthly financial dashboard', 'Tax position forecasting', 'Payment due date alerts', 'HMRC query support', 'Up to 2 properties (landlords)', '48-hour onboarding'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span style={{ color: '#dc2626' }}>✓</span>
                  <span className="font-ui text-sm" style={{ color: 'var(--body-text)' }}>{item}</span>
                </div>
              ))}
            </div>
            <p className="font-ui text-xs mb-6" style={{ color: 'var(--muted)' }}>Additional property: +£50/month</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/book" className="flex-1 text-center font-ui text-xs uppercase tracking-widest px-6 py-4 transition-all duration-200"
                style={{ background: '#dc2626', color: '#ffffff', borderRadius: '2px', letterSpacing: '2px' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = '#b91c1c')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = '#dc2626')}>
                Start Now →
              </Link>
              <Link href="/book" className="flex-1 text-center font-ui text-xs uppercase tracking-widest px-6 py-4 transition-all duration-200"
                style={{ border: '1px solid rgba(220,38,38,0.5)', color: '#dc2626', borderRadius: '2px', letterSpacing: '2px' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(220,38,38,0.1)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}>
                Book a Call
              </Link>
            </div>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div className="mb-12 md:mb-16" initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}>
          <p className="section-label mb-8">Common Questions</p>
          <div className="max-w-3xl">
            {faqs.map((faq) => (
              <AccordionItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </motion.div>

        {/* CTA Box */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.35 }}>
          <div className="p-8 md:p-12 rounded-sm text-center" style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.15) 0%, rgba(220,38,38,0.05) 100%)', border: '1px solid rgba(220,38,38,0.4)' }}>
            <h3 className="font-display text-2xl md:text-3xl mb-3" style={{ color: 'var(--foreground)', fontWeight: 400 }}>Don't Risk Penalties.</h3>
            <p className="font-display text-xl mb-6" style={{ color: '#dc2626', fontStyle: 'italic' }}>Check Your MTD Status + Deadline</p>
            <Link href="/book" className="inline-block font-ui text-xs uppercase tracking-widest px-10 py-5 mb-6 transition-all duration-200"
              style={{ background: '#dc2626', color: '#ffffff', borderRadius: '2px', letterSpacing: '2px', fontSize: '11px' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = '#b91c1c')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = '#dc2626')}>
              Book a 15-Min Review Call — FREE
            </Link>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              {['Your deadline', 'What you need to file', 'How we can help'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span style={{ color: '#dc2626' }}>✓</span>
                  <span className="font-ui text-sm" style={{ color: 'var(--body-text)' }}>{item}</span>
                </div>
              ))}
            </div>
            <p className="font-ui text-xs mt-4" style={{ color: 'var(--muted)' }}>Takes 15 min. Might save you £1000s.</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
