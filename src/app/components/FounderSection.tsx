'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

export default function FounderSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [strikeDrawn, setStrikeDrawn] = useState(false);
  const [vadimVisible, setVadimVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setStrikeDrawn(true);
      setVadimVisible(true);
      return;
    }

    // Strike draws first after 0.3s, then Vadim fades in
    const t1 = setTimeout(() => setStrikeDrawn(true), 300);
    const t2 = setTimeout(() => setVadimVisible(true), 900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isInView]);

  // SVG path lengths for stroke-dashoffset animation
  // Two wavy lines crossing "Saul"
  const strokePath1 = 'M 4 18 C 30 14, 60 22, 90 16 C 120 10, 150 20, 178 15';
  const strokePath2 = 'M 6 26 C 35 22, 65 30, 95 24 C 125 18, 155 28, 180 22';

  return (
    <section
      ref={sectionRef}
      className="w-full"
      style={{ backgroundColor: '#18213E' }}
      aria-label="Message from the founder"
    >
      <div
        className="max-w-7xl mx-auto"
        style={{
          padding: 'clamp(48px, 8vw, 110px) clamp(28px, 8vw, 120px)',
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── LEFT COLUMN: eyebrow + heading ── */}
          <div>
            {/* Eyebrow */}
            <p
              className="uppercase tracking-widest mb-6 lg:mb-8"
              style={{
                fontSize: '11px',
                letterSpacing: '0.18em',
                color: '#A9B0C6',
                fontFamily: 'var(--font-work-sans), sans-serif',
                fontWeight: 500,
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
              }}
            >
              A word from the founder
            </p>

            {/* Heading: "Better call" line 1 */}
            <div
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
              }}
            >
              <span
                className="block"
                style={{
                  fontFamily: 'var(--font-newsreader), serif',
                  fontSize: 'clamp(54px, 7vw, 96px)',
                  fontWeight: 400,
                  color: '#FBF1E3',
                  lineHeight: 1.1,
                  display: 'block',
                }}
              >
                Better call
              </span>

              {/* Line 2: "Saul" with strikethrough + "Vadim" above */}
              <span
                className="block relative"
                style={{
                  fontFamily: 'var(--font-newsreader), serif',
                  fontSize: 'clamp(54px, 7vw, 96px)',
                  fontWeight: 400,
                  color: '#FBF1E3',
                  lineHeight: 1.1,
                  marginTop: '0.55em', // space for "Vadim" above
                  display: 'inline-block',
                }}
              >
                {/* "Vadim" handwritten correction above "Saul" */}
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: 'clamp(-38px, -3.5vw, -52px)',
                    left: '8%',
                    fontFamily: 'var(--font-caveat), cursive',
                    fontSize: 'clamp(28px, 3.5vw, 52px)',
                    fontWeight: 700,
                    color: '#E8A35C',
                    transform: 'rotate(-7deg)',
                    transformOrigin: 'left center',
                    opacity: vadimVisible ? 1 : 0,
                    transition: 'opacity 0.5s ease',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                >
                  Vadim
                </span>

                {/* "Saul" text */}
                <span style={{ position: 'relative', display: 'inline-block' }}>
                  Saul

                  {/* Hand-drawn SVG strikethrough */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 184 40"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      position: 'absolute',
                      left: '-2%',
                      top: '38%',
                      width: '104%',
                      height: 'auto',
                      overflow: 'visible',
                      pointerEvents: 'none',
                    }}
                  >
                    <path
                      d={strokePath1}
                      fill="none"
                      stroke="#E8A35C"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        strokeDasharray: 200,
                        strokeDashoffset: strikeDrawn ? 0 : 200,
                        transition: strikeDrawn
                          ? 'stroke-dashoffset 0.45s cubic-bezier(0.4, 0, 0.2, 1)'
                          : 'none',
                      }}
                    />
                    <path
                      d={strokePath2}
                      fill="none"
                      stroke="#E8A35C"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        strokeDasharray: 200,
                        strokeDashoffset: strikeDrawn ? 0 : 200,
                        transition: strikeDrawn
                          ? 'stroke-dashoffset 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.08s'
                          : 'none',
                      }}
                    />
                  </svg>
                </span>
              </span>
            </div>
          </div>

          {/* ── RIGHT COLUMN: quote, body, signature, CTA ── */}
          <div
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s',
            }}
          >
            {/* Pull quote */}
            <blockquote className="mb-7">
              <p
                style={{
                  fontFamily: 'var(--font-newsreader), serif',
                  fontSize: 'clamp(20px, 2vw, 26px)',
                  fontWeight: 400,
                  color: '#FBF1E3',
                  lineHeight: 1.5,
                }}
              >
                &ldquo;You should be able to make business decisions with a clear picture of your finances, not wait for the year-end accounts to find out what happened.&rdquo;
              </p>
            </blockquote>

            {/* Body copy */}
            <p
              className="mb-10"
              style={{
                fontFamily: 'var(--font-work-sans), sans-serif',
                fontSize: 'clamp(15px, 1.1vw, 17px)',
                fontWeight: 400,
                color: '#C4C9D8',
                lineHeight: 1.7,
              }}
            >
              At Reckonwell, I want founders to have someone who knows their business and stays close to the numbers. We shape the support around what you need now, from everyday accounting to a wider finance function and help with the next stage of growth.
            </p>

            {/* Signature + CTA row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              {/* Signature */}
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-work-sans), sans-serif',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#FBF1E3',
                    lineHeight: 1.4,
                  }}
                >
                  Vadim Siubaeff
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-work-sans), sans-serif',
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#A9B0C6',
                    lineHeight: 1.4,
                  }}
                >
                  Founder, Reckonwell
                </p>
              </div>

              {/* CTA button */}
              <Link
                href="/book"
                className="inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400"
                style={{
                  backgroundColor: '#FBF1E3',
                  color: '#18213E',
                  fontFamily: 'var(--font-work-sans), sans-serif',
                  fontSize: '15px',
                  fontWeight: 600,
                  padding: '14px 28px',
                  borderRadius: '9999px',
                  minHeight: '52px',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'background-color 0.2s ease, color 0.2s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#f0e4d0';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#FBF1E3';
                }}
              >
                Book a call with Vadim
                <svg
                  aria-hidden="true"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Screen-reader text for the heading pun */}
      <span className="sr-only">Better call Vadim (a play on Better Call Saul)</span>
    </section>
  );
}
