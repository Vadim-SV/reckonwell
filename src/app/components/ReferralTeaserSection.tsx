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
      className="py-14 md:py-32 px-5 md:px-16"
      style={{
        backgroundColor: 'var(--surface)',
        position: 'relative',
        overflow: 'hidden'
      }}
      aria-label="Referral partner programme">

      {/* Decorative lines */}
      <div className="hidden md:block" style={{ position: 'absolute', left: '40px', top: '15%', bottom: '15%', width: '1px', background: 'var(--border)', pointerEvents: 'none' }} />
      <div className="hidden md:block" style={{ position: 'absolute', right: '40px', top: '15%', bottom: '15%', width: '1px', background: 'var(--border)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {/* Label */}
        <Reveal delay={0.05}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '32px' }}>
            <span style={{ display: 'inline-block', width: '28px', height: '1px', backgroundColor: 'var(--primary)', opacity: 0.5 }} />
            <span className="section-label">Referral Partner Programme</span>
            <span style={{ display: 'inline-block', width: '28px', height: '1px', backgroundColor: 'var(--primary)', opacity: 0.5 }} />
          </div>
        </Reveal>

        {/* Heading */}
        <Reveal delay={0.15}>
          <h2
            className="section-h2"
            style={{ marginBottom: '24px' }}>
            Know a business that needs better{' '}
            <em className="gold-italic">accounting?</em>
          </h2>
        </Reveal>

        {/* Body */}
        <Reveal delay={0.25}>
          <p
            className="pull-quote"
            style={{
              color: 'var(--body-text)',
              lineHeight: 1.7,
              marginBottom: '20px',
              maxWidth: '680px',
              margin: '0 auto 20px',
              fontSize: 'clamp(15px, 2vw, 22px)',
            }}>
            Refer them to Reckonwell and earn 10% of their monthly bill — every single month, for as long as they stay with us.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <p
            className="body-text-rw"
            style={{
              lineHeight: 1.75,
              marginBottom: '40px',
              maxWidth: '560px',
              margin: '0 auto 40px'
            }}>
            No cold calling. No contracts to manage. One introduction is all it takes — we handle everything else and pay you automatically every month.
          </p>
        </Reveal>

        {/* Badges */}
        <Reveal delay={0.35}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginBottom: '36px' }}>
            {['10% lifetime commission', 'No cap on earnings', 'Paid monthly, automatically'].map((b) =>
            <span key={b} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--muted)', letterSpacing: '0.5px' }}>
                <span style={{ color: 'var(--primary)', fontSize: '14px' }}>✓</span>{b}
              </span>
            )}
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={0.4}>
          <Link
            href="/referrals"
            className="btn-gold"
            style={{ display: 'inline-block' }}
            onClick={() => trackEvent('homepage_cta_click', { cta: 'learn_about_partner_programme', location: 'referral_teaser', page: 'home' })}>
            Learn About the Partner Programme
          </Link>
        </Reveal>
      </div>
    </section>);
}
