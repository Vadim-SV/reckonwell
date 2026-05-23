'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {if (entry.isIntersecting) {setVisible(true);obs.disconnect();}},
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0, className = '' }: {children: React.ReactNode;delay?: number;className?: string;}) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`
      }}>

      {children}
    </div>);

}

export default function ReferralTeaserSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const tracked = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked.current) {
          tracked.current = true;
          trackEvent('homepage_section_viewed', { section: 'referral_teaser', page: 'home' });
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 px-6 md:px-16"
      style={{
        backgroundColor: '#1C1A15',
        position: 'relative',
        overflow: 'hidden'
      }}
      aria-label="Referral partner programme">

      {/* Subtle radial glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

      {/* Decorative gold lines — hidden on mobile */}
      <div className="hidden md:block" style={{ position: 'absolute', left: '40px', top: '15%', bottom: '15%', width: '1px', background: 'linear-gradient(180deg, transparent, rgba(201,168,76,0.2) 30%, rgba(201,168,76,0.2) 70%, transparent)', pointerEvents: 'none' }} />
      <div className="hidden md:block" style={{ position: 'absolute', right: '40px', top: '15%', bottom: '15%', width: '1px', background: 'linear-gradient(180deg, transparent, rgba(201,168,76,0.2) 30%, rgba(201,168,76,0.2) 70%, transparent)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {/* Label */}
        <Reveal delay={0.05}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '32px' }}>
            <span style={{ display: 'inline-block', width: '28px', height: '1px', backgroundColor: '#C9A84C', opacity: 0.5 }} />
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A84C', fontWeight: 400 }}>Referral Partner Programme</span>
            <span style={{ display: 'inline-block', width: '28px', height: '1px', backgroundColor: '#C9A84C', opacity: 0.5 }} />
          </div>
        </Reveal>

        {/* Heading */}
        <Reveal delay={0.15}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(28px, 5vw, 58px)',
              fontWeight: 400,
              color: '#F0EDE4',
              lineHeight: 1.1,
              marginBottom: '24px',
              letterSpacing: '-0.02em'
            }}>

            Know a business that needs better{' '}
            <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>accounting?</em>
          </h2>
        </Reveal>

        {/* Body */}
        <Reveal delay={0.25}>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(16px, 2.2vw, 24px)',
              color: '#D4CFC4',
              lineHeight: 1.7,
              marginBottom: '20px',
              maxWidth: '680px',
              margin: '0 auto 20px'
            }} className="text-[25px]">

            Refer them to Reckonwell and earn 10% of their monthly bill — every single month, for as long as they stay with us.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '14px',
              fontWeight: 300,
              color: '#ffffff',
              lineHeight: 1.75,
              marginBottom: '40px',
              maxWidth: '560px',
              margin: '0 auto 40px'
            }} className="text-[13px]">

            No cold calling. No contracts to manage. One introduction is all it takes — we handle everything else and pay you automatically every month.
          </p>
        </Reveal>

        {/* Badges */}
        <Reveal delay={0.35}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', marginBottom: '40px' }}>
            {['10% lifetime commission', 'No cap on earnings', 'Paid monthly, automatically'].map((b) =>
            <span key={b} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: "'Montserrat', sans-serif", fontSize: '12px', color: '#7A7468', letterSpacing: '0.5px' }}>
                <span style={{ color: '#C9A84C', fontSize: '14px' }}>✓</span>{b}
              </span>
            )}
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={0.4}>
          <Link
            href="/referrals"
            style={{
              display: 'inline-block',
              backgroundColor: '#C9A84C',
              color: '#080808',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '11px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              fontWeight: 600,
              padding: '16px 32px',
              textDecoration: 'none',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#DDB96A'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#C9A84C'}
            onClick={() => trackEvent('homepage_cta_click', { cta: 'learn_about_partner_programme', location: 'referral_teaser', page: 'home' })}>

            Learn About the Partner Programme
          </Link>
        </Reveal>
      </div>
    </section>);

}