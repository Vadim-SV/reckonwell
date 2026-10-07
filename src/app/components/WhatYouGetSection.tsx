'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

/* ─── Scroll-fade hook ─────────────────────────────────────────────────── */
function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    if (mq.matches) { setVisible(true); return; }

    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible, reduced };
}

/* ─── Illustration 1: Chat card ────────────────────────────────────────── */
function ChatCard() {
  const { ref, visible } = useScrollReveal(0.2);

  const bubbles = [
    { from: 'in',  text: 'Heads up: cash dips to £18k on the 28th after payroll. Two invoices (£6.4k) are 14 days overdue. Want us to chase them today?' },
    { from: 'out', text: 'Yes please, thanks!' },
    { from: 'in',  text: 'Done. Reminders sent, we\'ll update you Friday.' },
  ];

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        background: '#EFE7D6',
        border: '1px solid rgba(201,168,76,0.35)',
        borderRadius: '10px',
        overflow: 'hidden',
        fontFamily: 'var(--font-ui, "Work Sans", sans-serif)',
        maxWidth: '380px',
        width: '100%',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(18px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      {/* Header */}
      <div style={{
        background: '#fff',
        borderBottom: '1px solid rgba(201,168,76,0.25)',
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '50%',
          background: '#0d1b2e', display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{ color: '#C9A84C', fontSize: '13px', fontWeight: 600 }}>R</span>
        </div>
        <div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#0d1b2e', lineHeight: 1.2 }}>Reckonwell</div>
          <div style={{ fontSize: '10px', color: '#7a8399', lineHeight: 1.2 }}>your finance team</div>
        </div>
      </div>

      {/* Bubbles */}
      <div style={{ padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {bubbles.map((b, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: b.from === 'out' ? 'flex-end' : 'flex-start',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(8px)',
              transition: `opacity 0.4s ease ${0.15 + i * 0.18}s, transform 0.4s ease ${0.15 + i * 0.18}s`,
            }}
          >
            <div style={{
              background: b.from === 'out' ? '#0d1b2e' : '#fff',
              color: b.from === 'out' ? '#FBF1E3' : '#1a2540',
              borderRadius: b.from === 'out' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
              padding: '8px 11px',
              fontSize: '11.5px',
              lineHeight: 1.55,
              maxWidth: '82%',
              boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
            }}>
              {b.text}
            </div>
          </div>
        ))}
        {/* Timestamp */}
        <div style={{ textAlign: 'right', fontSize: '10px', color: '#9aa0b0', marginTop: '2px' }}>09:14</div>
      </div>
    </div>
  );
}

/* ─── Illustration 2: Transaction review card ──────────────────────────── */
function TransactionCard() {
  const { ref, visible } = useScrollReveal(0.2);

  const rows = [
    { desc: 'Stripe payout',    amount: '£4,820.00', status: 'ok',  tag: null },
    { desc: 'AWS · software',   amount: '£312.40',   status: 'ok',  tag: null },
    { desc: 'Office supplies',  amount: '£89.99',    status: 'warn',tag: 'duplicate' },
    { desc: 'HMRC VAT',         amount: '£2,140.00', status: 'ok',  tag: null },
  ];

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        background: '#fff',
        border: '1px solid rgba(201,168,76,0.35)',
        borderRadius: '10px',
        overflow: 'hidden',
        fontFamily: 'var(--font-ui, "Work Sans", sans-serif)',
        maxWidth: '380px',
        width: '100%',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(18px)',
        transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
      }}
    >
      {/* Header */}
      <div style={{
        padding: '10px 14px',
        borderBottom: '1px solid rgba(201,168,76,0.2)',
        fontSize: '11px',
        fontWeight: 600,
        color: '#0d1b2e',
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
      }}>
        Transaction Review
      </div>

      {/* Rows */}
      <div style={{ padding: '0 14px' }}>
        {rows.map((row, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '9px 0',
              borderBottom: i < rows.length - 1 ? '1px dashed rgba(201,168,76,0.3)' : 'none',
              gap: '8px',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(6px)',
              transition: `opacity 0.4s ease ${0.1 + i * 0.1}s, transform 0.4s ease ${0.1 + i * 0.1}s`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1, minWidth: 0 }}>
              <span style={{ fontSize: '12px', color: '#1a2540', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {row.desc}
              </span>
              {row.tag && (
                <span style={{
                  background: '#FFF3E0', color: '#E65100',
                  fontSize: '9px', fontWeight: 600, padding: '1px 5px',
                  borderRadius: '4px', letterSpacing: '0.3px', textTransform: 'uppercase',
                  flexShrink: 0,
                }}>
                  {row.tag}
                </span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
              <span style={{
                fontSize: '12px', fontWeight: 500, color: '#1a2540',
                fontVariantNumeric: 'tabular-nums',
              }}>
                {row.amount}
              </span>
              {row.status === 'ok' ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6.5" fill="#E8F5E9" stroke="#4CAF50" strokeWidth="0.8"/>
                  <path d="M4.5 7l2 2 3-3" stroke="#4CAF50" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6.5" fill="#FFF3E0" stroke="#FF9800" strokeWidth="0.8"/>
                  <path d="M7 4.5v3M7 9.2v.3" stroke="#FF9800" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        padding: '9px 14px',
        borderTop: '1px solid rgba(201,168,76,0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '7px',
        background: 'rgba(201,168,76,0.04)',
      }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
          <path d="M2 10.5c2-1.5 4-2 5.5-1.5s3 2 4.5 1" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M3 8.5c1.5-1 3-1.5 4.5-1s3 1.5 4.5 1" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        <span style={{ fontSize: '10.5px', color: '#5a6070', lineHeight: 1.4 }}>
          Reviewed and signed off by your accountant
        </span>
      </div>
    </div>
  );
}

/* ─── Illustration 3: Investor-readiness checklist ─────────────────────── */
function InvestorCard() {
  const { ref, visible } = useScrollReveal(0.2);

  const steps = [
    { label: 'Management accounts up to date', done: true },
    { label: '3-year forecast and cash model',  done: true },
    { label: 'Data room ready',                 done: true },
    { label: 'Introductions to lenders and investors', done: false },
  ];

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        background: '#fff',
        border: '1px solid rgba(201,168,76,0.35)',
        borderRadius: '10px',
        overflow: 'hidden',
        fontFamily: 'var(--font-ui, "Work Sans", sans-serif)',
        maxWidth: '380px',
        width: '100%',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(18px)',
        transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
      }}
    >
      {/* Header */}
      <div style={{
        padding: '10px 14px',
        borderBottom: '1px solid rgba(201,168,76,0.2)',
        fontSize: '11px',
        fontWeight: 600,
        color: '#0d1b2e',
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
      }}>
        Investor Readiness
      </div>

      {/* Steps */}
      <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {steps.map((step, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(6px)',
              transition: `opacity 0.4s ease ${0.1 + i * 0.1}s, transform 0.4s ease ${0.1 + i * 0.1}s`,
            }}
          >
            {step.done ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
                <circle cx="9" cy="9" r="9" fill="#0d1b2e"/>
                <path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
                <circle cx="9" cy="9" r="8" stroke="#C9A84C" strokeWidth="1.5" fill="none"/>
                <path d="M9 6v3.5M11.5 11l-2.5-1.5" stroke="#C9A84C" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            )}
            <span style={{
              fontSize: '12px',
              color: step.done ? '#1a2540' : '#7a8399',
              lineHeight: 1.4,
              textDecoration: step.done ? 'none' : 'none',
            }}>
              {step.label}
            </span>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ padding: '10px 14px 12px', borderTop: '1px solid rgba(201,168,76,0.15)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <span style={{ fontSize: '10px', color: '#5a6070', fontWeight: 500 }}>Investor-ready</span>
          <span style={{ fontSize: '10px', color: '#5a6070', fontWeight: 500 }}>3 of 4</span>
        </div>
        <div style={{
          height: '5px', background: '#EFE7D6', borderRadius: '3px', overflow: 'hidden',
        }}>
          <div style={{
            height: '100%', width: visible ? '75%' : '0%',
            background: '#C9A84C', borderRadius: '3px',
            transition: 'width 0.8s ease 0.4s',
          }} />
        </div>
      </div>
    </div>
  );
}

/* ─── Row wrapper with scroll reveal ───────────────────────────────────── */
function RevealRow({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Data ──────────────────────────────────────────────────────────────── */
const points = [
  {
    num: '01',
    title: "We\'re there when you need us",
    body: 'Message us on email or WhatsApp and talk to someone who knows your business. We check cash, spending and overdue invoices every working day and flag problems before they grow.',
    smallPrint: undefined,
    illustration: <ChatCard />,
  },
  {
    num: '02',
    title: 'We make sure your numbers are right',
    body: "AI and software do the processing. We check the coding, reconcile the accounts and sign off the numbers, so mistakes don't reach your reports or tax returns.",
    smallPrint: undefined,
    illustration: <TransactionCard />,
  },
  {
    num: '03',
    title: 'We help you raise capital',
    body: 'When you need funding, we get your numbers investor-ready and introduce you to lenders and investors who fit.',
    smallPrint: "We don't lend or invest, and we can't guarantee funding.",
    illustration: <InvestorCard />,
  },
];

/* ─── Main section ──────────────────────────────────────────────────────── */
export default function WhatYouGetSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const [headingVisible, setHeadingVisible] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) { setHeadingVisible(true); return; }
    const el = headingRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHeadingVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="what-you-get"
      className="py-20 md:py-28 px-6 md:px-16"
      style={{ backgroundColor: 'var(--background)' }}
      aria-label="What you get"
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div
          ref={headingRef}
          style={{
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
            marginBottom: '56px',
          }}
        >
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              fontWeight: 400,
              color: 'var(--primary)',
              lineHeight: 1.1,
              maxWidth: '700px',
            }}
          >
            An in-house finance team, without hiring one.
          </h2>
        </div>

        {/* Three alternating rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {points.map((point, i) => {
            const textLeft = i % 2 === 0; // 0=left, 1=right, 2=left
            return (
              <RevealRow key={point.num} delay={0.05 * i}>
                <div
                  style={{
                    borderTop: '1px solid rgba(201,168,76,0.3)',
                    borderBottom: i === points.length - 1 ? '1px solid rgba(201,168,76,0.3)' : 'none',
                    padding: '48px 0',
                  }}
                >
                  {/* Two-column grid on md+, single column on mobile */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '40px',
                      alignItems: 'center',
                    }}
                    className="what-you-get-row"
                  >
                    {/* Text block */}
                    <div style={{ order: textLeft ? 1 : 2 }} className="what-you-get-text">
                      {/* Gold number label */}
                      <div
                        className="font-display"
                        style={{
                          fontSize: '15px',
                          fontWeight: 400,
                          color: '#C9A84C',
                          letterSpacing: '0.12em',
                          marginBottom: '14px',
                        }}
                      >
                        {point.num}
                      </div>

                      <h3
                        className="font-display"
                        style={{
                          fontSize: 'clamp(20px, 2.2vw, 28px)',
                          fontWeight: 400,
                          color: 'var(--primary)',
                          lineHeight: 1.2,
                          marginBottom: '14px',
                        }}
                      >
                        {point.title}
                      </h3>

                      <p
                        style={{
                          fontSize: '15px',
                          color: 'var(--body-text)',
                          lineHeight: 1.75,
                          maxWidth: '480px',
                        }}
                      >
                        {point.body}
                      </p>

                      {point.smallPrint && (
                        <p
                          className="font-ui"
                          style={{
                            fontSize: '11px',
                            color: 'var(--muted)',
                            lineHeight: 1.6,
                            letterSpacing: '0.2px',
                            marginTop: '10px',
                          }}
                        >
                          {point.smallPrint}
                        </p>
                      )}
                    </div>

                    {/* Illustration block */}
                    <div
                      style={{
                        order: textLeft ? 2 : 1,
                        display: 'flex',
                        justifyContent: textLeft ? 'flex-end' : 'flex-start',
                      }}
                      className="what-you-get-visual"
                    >
                      {point.illustration}
                    </div>
                  </div>
                </div>
              </RevealRow>
            );
          })}
        </div>

        {/* CTA */}
        <RevealRow delay={0.3}>
          <div style={{ marginTop: '48px' }}>
            <Link
              href="/book"
              className="btn-gold inline-flex items-center gap-2"
              style={{ minHeight: '48px' }}
            >
              Book a discovery call →
            </Link>
          </div>
        </RevealRow>
      </div>

      {/* Responsive styles */}
      <style jsx>{`
        @media (max-width: 767px) {
          .what-you-get-row {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .what-you-get-text {
            order: 1 !important;
          }
          .what-you-get-visual {
            order: 2 !important;
            justify-content: center !important;
          }
          .what-you-get-visual > div {
            max-width: 100% !important;
          }
          .btn-gold {
            width: 100%;
            justify-content: center;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
