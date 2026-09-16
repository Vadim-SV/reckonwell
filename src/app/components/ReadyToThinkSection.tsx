'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const serviceFitOptions = [
{
  id: 'daily',
  label: 'Stay ahead of daily finances',
  suggestedTitle: 'Finance support on your terms',
  recommendation:
  'Shape a package around your preferred contact and proactive daily oversight of cash, transactions and invoices.',
  cta: 'Enquire about this support',
  prefillId: 'daily'
},
{
  id: 'function',
  label: 'Build my finance function',
  suggestedTitle: 'Your outsourced finance department',
  recommendation:
  'Bring bookkeeping, management reporting and FD-level support together under one roof — start with what you need now.',
  cta: 'Enquire about this support',
  prefillId: 'function'
},
{
  id: 'capital',
  label: 'Raise growth capital',
  suggestedTitle: 'Fundraising and capital introductions',
  recommendation:
  'Discuss the model, investor materials and relevant funding conversations for your stage.',
  cta: 'Enquire about this support',
  prefillId: 'capital'
}];


export default function ReadyToThinkSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [selected, setSelected] = useState<string>('capital');

  const selectedOption = serviceFitOptions.find((o) => o.id === selected) ?? serviceFitOptions[2];

  const handleEnquire = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('get-started');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('prefill-service', { detail: selectedOption.prefillId }));
      }, 400);
    }
  };

  return (
    <div
      ref={ref}
      className="py-16 md:py-20 px-6 md:px-16"
      style={{ backgroundColor: 'var(--background)' }}
      aria-label="Ready to think like a director again">

      <div className="max-w-5xl mx-auto">
        {/* Section heading row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-10 md:mb-14">
          <div>
            <motion.h2
              className="font-display"
              style={{
                fontSize: 'clamp(36px, 5vw, 58px)',
                fontWeight: 400,
                color: 'var(--primary)',
                lineHeight: 1.1,
                maxWidth: '480px'
              }}
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}>Not sure where to start?


            </motion.h2>
          </div>
          <motion.p
            style={{
              maxWidth: '380px',
              fontSize: '15px',
              color: '#C17A3A',
              lineHeight: 1.6,
              paddingTop: '4px'
            }}
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}>

            Tell us what is taking up your time. Choose your closest priority below, and we will start a conversation about the right support.
          </motion.p>
        </div>

        {/* Find Your Fit card */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{
            border: '1px solid #D6D8E0',
            backgroundColor: '#E8EBF0'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}>

          {/* Left panel */}
          <div
            className="p-7 md:p-10 flex flex-col justify-between"
            style={{ borderBottom: '1px solid #D6D8E0', borderRight: 'none' }}
            data-panel="left"
          >
            <style>{`@media (min-width: 768px) { [data-panel="left"] { border-bottom: none !important; border-right: 1px solid #D6D8E0 !important; } }`}</style>

            <div>
              <p
                className="font-ui mb-4"
                style={{
                  fontSize: '10px',
                  letterSpacing: '2.5px',
                  textTransform: 'uppercase',
                  color: '#4A7C8E',
                  fontWeight: 600
                }}>

                Find Your Fit
              </p>
              <h3
                className="font-display mb-4"
                style={{
                  fontSize: 'clamp(22px, 3vw, 30px)',
                  fontWeight: 400,
                  color: 'var(--primary)',
                  lineHeight: 1.2
                }}>

                What would help you most right now?
              </h3>
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--muted)',
                  lineHeight: 1.6,
                  maxWidth: '300px'
                }}>

                Choose a priority. We will suggest a starting point, then tailor the actual scope with you.
              </p>
            </div>
          </div>

          {/* Right panel */}
          <div className="p-7 md:p-10 flex flex-col gap-6">
            {/* Priority buttons */}
            <div>
              <p
                className="font-ui mb-3"
                style={{
                  fontSize: '10px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'var(--muted)'
                }}>

                Choose your main priority
              </p>
              <div className="flex flex-wrap gap-2">
                {serviceFitOptions.map((option) => {
                  const isActive = selected === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSelected(option.id)}
                      className="font-ui transition-all duration-200"
                      style={{
                        padding: '10px 16px',
                        fontSize: '12px',
                        letterSpacing: '0.3px',
                        border: `1px solid ${isActive ? 'var(--primary)' : '#D6D8E0'}`,
                        backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                        color: isActive ? '#fff' : 'var(--foreground)',
                        cursor: 'pointer',
                        minHeight: '40px',
                        whiteSpace: 'normal'
                      }}>

                      {option.label}
                    </button>);

                })}
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: '#D6D8E0' }} />

            {/* Suggested starting point */}
            {selectedOption &&
            <motion.div
              key={selectedOption.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col gap-3">

                <p
                className="font-ui"
                style={{
                  fontSize: '10px',
                  letterSpacing: '2.5px',
                  textTransform: 'uppercase',
                  color: '#4A7C8E',
                  fontWeight: 600
                }}>

                  Suggested Starting Point
                </p>
                <p
                className="font-display"
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  lineHeight: 1.3,
                  color: 'var(--primary)'
                }}>

                  {selectedOption.suggestedTitle}
                </p>
                <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6 }}>
                  {selectedOption.recommendation}
                </p>
                <button
                type="button"
                onClick={handleEnquire}
                className="font-ui self-start mt-1 transition-opacity duration-200 hover:opacity-80"
                style={{
                  padding: '14px 28px',
                  fontSize: '11px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  backgroundColor: 'var(--primary)',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>

                  Enquire about this support <span>↗</span>
                </button>
              </motion.div>
            }
          </div>
        </motion.div>
      </div>
    </div>);

}