'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRegion } from '@/context/RegionContext';

export default function USBanner() {
  const { region, isDetecting } = useRegion();
  const [dismissed, setDismissed] = useState(true); // default hidden to avoid flash

  useEffect(() => {
    const wasDismissed = localStorage.getItem('reckonwell_us_banner_dismissed') === 'true';
    setDismissed(wasDismissed);
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('reckonwell_us_banner_dismissed', 'true');
    setDismissed(true);
  };

  // Only show when: detection complete, region is USA, not dismissed
  if (isDetecting || region !== 'USA' || dismissed) return null;

  return (
    <div
      role="banner"
      aria-label="US site notification"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        backgroundColor: 'rgba(8,8,8,0.97)',
        borderBottom: '1px solid rgba(201,168,76,0.3)',
        backdropFilter: 'blur(12px)',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)',
          fontSize: '12px',
          color: 'var(--muted, #9A9490)',
          letterSpacing: '0.3px',
          margin: 0,
        }}
      >
        Looks like you&apos;re visiting from the US —{' '}
        <Link
          href="/us/"
          style={{
            color: 'var(--primary, #C9A84C)',
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
          }}
        >
          see our US site →
        </Link>
      </p>
      <button
        onClick={handleDismiss}
        aria-label="Dismiss US site banner"
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--muted, #9A9490)',
          fontSize: '16px',
          lineHeight: 1,
          cursor: 'pointer',
          padding: '4px 8px',
          flexShrink: 0,
          minWidth: '32px',
          minHeight: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        ✕
      </button>
    </div>
  );
}
