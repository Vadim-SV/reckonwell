import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      className="border-t py-12 md:py-16 px-6 md:px-10"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--primary)',
      }}
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left: Logo + tagline */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="flex items-center gap-3">
            <img
              src="/assets/images/Reckonwell-1779490857835.png"
              alt="Reckonwell - Premium accounting firm"
              style={{ height: '30px', width: 'auto', objectFit: 'contain' }}
            />
          </div>
          <address
            className="font-ui text-xs text-center md:text-left not-italic"
            style={{ color: 'var(--muted)', letterSpacing: '0.5px', maxWidth: '260px', lineHeight: 1.6 }}
          >
            124 City Road, London EC1V 2NX
          </address>
          <p
            className="font-ui text-xs text-center md:text-left"
            style={{ color: 'var(--muted)', letterSpacing: '0.5px', maxWidth: '260px', lineHeight: 1.6 }}
          >
            Premium accounting for ambitious businesses. Daily bookkeeping, real-time insights, zero surprises.
          </p>
        </div>

        {/* Right: Contact + Legal */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <p
            className="font-ui text-xs"
            style={{ color: 'var(--muted)', letterSpacing: '0.5px' }}
          >
            02038186205
          </p>
          <nav className="flex items-center gap-6" aria-label="Footer links">
            <Link
              href="/privacy-policy"
              className="font-ui text-xs uppercase tracking-widest transition-colors duration-200"
              style={{ color: 'var(--muted)', letterSpacing: '2px', fontSize: '10px' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
            >
              Privacy
            </Link>
            <Link
              href="/terms-of-service"
              className="font-ui text-xs uppercase tracking-widest transition-colors duration-200"
              style={{ color: 'var(--muted)', letterSpacing: '2px', fontSize: '10px' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
            >
              Terms
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}