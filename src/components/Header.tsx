'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRegion, Region } from '@/context/RegionContext';

const complianceLinks = [
  { label: 'Self-Employed Accounting', href: '/self-employed-accounting' },
  { label: 'Limited Company Accounting', href: '/limited-company-accounting' },
  { label: 'Making Tax Digital', href: '/making-tax-digital' },
  { label: 'R&D Tax Relief', href: '/r-and-d-tax-relief' },
  { label: 'Get a Quote', href: '/quotation-calculator' },
];

const fractionalLinks = [
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Additional Services', href: '/#additional-services' },
];

function RegionToggle({ compact = false }: { compact?: boolean }) {
  const { region, setRegion } = useRegion();

  const isUK = region === 'UK';

  return (
    <div
      className="flex items-center"
      style={{
        border: '1px solid var(--border)',
        borderRadius: '2px',
        overflow: 'hidden',
        fontSize: compact ? '11px' : '10px',
        letterSpacing: '2px',
      }}
      role="group"
      aria-label="Select region"
    >
      <button
        onClick={() => setRegion('UK')}
        className="font-ui uppercase transition-all duration-200"
        style={{
          padding: compact ? '7px 12px' : '8px 18px',
          background: isUK ? 'var(--primary)' : 'transparent',
          color: isUK ? 'var(--primary-foreground)' : 'var(--muted)',
          border: 'none',
          cursor: 'pointer',
          fontWeight: isUK ? 600 : 400,
        }}
        aria-pressed={isUK}
      >
        GB
      </button>
      <button
        onClick={() => setRegion('USA')}
        className="font-ui uppercase transition-all duration-200"
        style={{
          padding: compact ? '7px 12px' : '8px 18px',
          background: !isUK ? 'var(--primary)' : 'transparent',
          color: !isUK ? 'var(--primary-foreground)' : 'var(--muted)',
          border: 'none',
          borderLeft: '1px solid var(--border)',
          cursor: 'pointer',
          fontWeight: !isUK ? 600 : 400,
        }}
        aria-pressed={!isUK}
      >
        US
      </button>
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [fractionalOpen, setFractionalOpen] = useState(false);
  const [complianceOpen, setComplianceOpen] = useState(false);
  const fractionalRef = useRef<HTMLDivElement>(null);
  const complianceRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const isUSSite = pathname?.startsWith('/us');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (fractionalRef.current && !fractionalRef.current.contains(e.target as Node)) {
        setFractionalOpen(false);
      }
      if (complianceRef.current && !complianceRef.current.contains(e.target as Node)) {
        setComplianceOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinkStyle = {
    color: 'var(--muted)',
    fontWeight: 400 as const,
    letterSpacing: '2px',
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'nav-frosted' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group" aria-label="Reckonwell home">
            <img
              src="/assets/images/reckonwell-high-resolution-logo-grayscale-transparent-1786798505479.png"
              alt="Reckonwell"
              className="block"
              style={{ height: '20px', width: 'auto', objectFit: 'contain' }}
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {/* Home */}
            <Link
              href="/"
              className="font-ui text-xs tracking-widest uppercase transition-colors duration-200"
              style={navLinkStyle}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
            >
              Home
            </Link>

            {/* Accounting */}
            <Link
              href="/#personalised-proactive"
              className="font-ui text-xs tracking-widest uppercase transition-colors duration-200"
              style={navLinkStyle}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
            >
              Accounting
            </Link>

            {/* Industries */}
            <Link
              href="/#industries"
              className="font-ui text-xs tracking-widest uppercase transition-colors duration-200"
              style={navLinkStyle}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
            >
              Industries
            </Link>

            {/* Pricing */}
            <Link
              href="/#pricing"
              className="font-ui text-xs tracking-widest uppercase transition-colors duration-200"
              style={navLinkStyle}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
            >
              Pricing
            </Link>

            {/* Compliance Services Dropdown */}
            {!isUSSite && (
            <div className="relative" ref={complianceRef}>
              <button
                onClick={() => { setComplianceOpen(!complianceOpen); setFractionalOpen(false); }}
                className="font-ui text-xs tracking-widest uppercase transition-colors duration-200 flex items-center gap-1"
                style={{ ...navLinkStyle, background: 'none', border: 'none', color: complianceOpen ? 'var(--foreground)' : 'var(--muted)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
                onMouseLeave={(e) => { if (!complianceOpen) e.currentTarget.style.color = 'var(--muted)'; }}
                aria-expanded={complianceOpen}
                aria-haspopup="true"
              >
                Compliance
                <span style={{ fontSize: '10px', transition: 'transform 0.2s', transform: complianceOpen ? 'rotate(180deg)' : 'none', display: 'inline-block' }}>▾</span>
              </button>

              {complianceOpen && (
                <div
                  className="absolute top-full left-1/2 mt-3 py-4 px-0"
                  style={{
                    transform: 'translateX(-50%)',
                    backgroundColor: 'var(--background)',
                    border: '1px solid var(--border)',
                    minWidth: '240px',
                    zIndex: 100,
                    borderRadius: '2px',
                  }}
                >
                  <div className="px-6 py-2">
                    <p className="font-ui mb-3" style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 500 }}>
                      UK Compliance Services
                    </p>
                    <div className="space-y-1">
                      {complianceLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setComplianceOpen(false)}
                          className="block font-ui text-xs py-2 transition-colors duration-150"
                          style={{ color: link.href === '/quotation-calculator' ? 'var(--primary)' : 'var(--muted)', letterSpacing: '0.5px' }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = link.href === '/quotation-calculator' ? 'var(--primary)' : 'var(--muted)')}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            )}

            {/* Partner with Us */}
            <Link
              href="/referrals"
              className="font-ui tracking-widest uppercase transition-colors duration-200"
              style={{
                color: 'var(--primary)',
                fontWeight: 500,
                fontSize: '10px',
                letterSpacing: '2px',
                border: '1px solid var(--primary)',
                padding: '8px 18px',
                borderRadius: '2px',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--primary)';
                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--primary-foreground)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--primary)';
              }}
            >
              Partner with Us
            </Link>
            <Link
              href="/quotation-calculator"
              className="font-ui tracking-widest uppercase transition-colors duration-200"
              style={{ padding: '8px 18px', fontSize: '10px', letterSpacing: '2px', borderRadius: '2px', border: '1px solid var(--primary)', color: 'var(--primary-foreground)', backgroundColor: 'var(--primary)', fontWeight: 600 }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--primary-hover)';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--primary-hover)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--primary)';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--primary)';
              }}
            >
              Instant Quote
            </Link>

            {/* Region Toggle */}
            <RegionToggle />
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-3 -mr-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            style={{ cursor: 'pointer', minWidth: '44px', minHeight: '44px', alignItems: 'center', justifyContent: 'center' }}
          >
            <span className="block h-px w-6 transition-all duration-300" style={{ backgroundColor: 'var(--foreground)', transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
            <span className="block h-px w-4 transition-all duration-300" style={{ backgroundColor: 'var(--foreground)', opacity: menuOpen ? 0 : 1 }} />
            <span className="block h-px w-6 transition-all duration-300" style={{ backgroundColor: 'var(--foreground)', transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* Mobile Full-Screen Overlay */}
      <div
        className={`fixed inset-0 z-40 overflow-y-auto transition-all duration-500 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ backgroundColor: 'var(--background)', WebkitOverflowScrolling: 'touch' }}
      >
        <div className="flex flex-col items-center gap-0 pt-20 pb-12 w-full px-6 min-h-full">
          {/* Close button area at top */}
          <div className="w-full flex justify-end mb-6">
            <button
              onClick={() => setMenuOpen(false)}
              className="p-3"
              aria-label="Close menu"
              style={{ color: 'var(--muted)', fontSize: '24px', lineHeight: 1, minWidth: '44px', minHeight: '44px' }}
            >
              ✕
            </button>
          </div>

          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="w-full text-center font-display py-4 transition-colors duration-200"
            style={{ color: 'var(--foreground)', fontWeight: 400, fontSize: '28px', borderBottom: '1px solid var(--border)' }}
          >
            Home
          </Link>

          {/* Mobile Accounting Link */}
          <Link
            href="/#personalised-proactive"
            onClick={() => setMenuOpen(false)}
            className="w-full text-center font-display py-4 transition-colors duration-200"
            style={{ color: 'var(--foreground)', fontWeight: 400, fontSize: '28px', borderBottom: '1px solid var(--border)' }}
          >
            Accounting
          </Link>

          {/* Mobile Industries Link */}
          <Link
            href="/#industries"
            onClick={() => setMenuOpen(false)}
            className="w-full text-center font-display py-4 transition-colors duration-200"
            style={{ color: 'var(--foreground)', fontWeight: 400, fontSize: '28px', borderBottom: '1px solid var(--border)' }}
          >
            Industries
          </Link>

          {/* Mobile Pricing Link */}
          <Link
            href="/#pricing"
            onClick={() => setMenuOpen(false)}
            className="w-full text-center font-display py-4 transition-colors duration-200"
            style={{ color: 'var(--foreground)', fontWeight: 400, fontSize: '28px', borderBottom: '1px solid var(--border)' }}
          >
            Pricing
          </Link>

          {/* Mobile Compliance Services Section */}
          {!isUSSite && (
          <div className="w-full text-center py-4" style={{ borderBottom: '1px solid var(--border)' }}>
            <p className="font-display mb-4" style={{ color: 'var(--foreground)', fontWeight: 400, fontSize: '28px' }}>Compliance Services</p>
            <div>
              <p className="font-ui mb-3" style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 500 }}>UK Compliance Services</p>
              {complianceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block font-ui py-3 text-sm"
                  style={{ color: 'var(--muted)', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          )}

          {/* Mobile Region Toggle */}
          <div className="w-full flex justify-center py-5" style={{ borderBottom: '1px solid var(--border)' }}>
            <RegionToggle compact />
          </div>

          <Link
            href="/referrals"
            onClick={() => setMenuOpen(false)}
            className="w-full text-center font-display py-4 transition-colors duration-200"
            style={{ color: 'var(--primary)', fontWeight: 400, fontSize: '28px', borderBottom: '1px solid var(--border)' }}
          >
            Partner with Us
          </Link>

          <div className="w-full flex flex-col items-center gap-3 mt-8 px-4">
            <Link
              href="/book"
              onClick={() => setMenuOpen(false)}
              className="btn-gold w-full text-center"
              style={{ maxWidth: '320px' }}
            >
              Book Discovery Call
            </Link>
            <Link
              href="/quotation-calculator"
              onClick={() => setMenuOpen(false)}
              className="btn-ghost w-full text-center"
              style={{ maxWidth: '320px' }}
            >
              Instant Quote
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}