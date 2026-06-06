'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'The Problem', href: '#problem' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'nav-frosted' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-3 group"
            aria-label="Reckonwell home"
          >
            {/* Full logo — visible on md+ */}
            <img
              src="/assets/images/Reckonwell-1779490857835.png"
              alt="Reckonwell"
              className="hidden md:block"
              style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
            />
            {/* R monogram — visible on small screens */}
            <span
              className="flex md:hidden items-center justify-center font-display"
              style={{
                height: '36px',
                width: '36px',
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--primary)',
                letterSpacing: '-0.5px',
                lineHeight: 1,
              }}
            >
              R
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.href.startsWith('#') ? (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="font-ui text-xs tracking-widest uppercase transition-colors duration-200"
                  style={{ color: 'var(--muted)', fontWeight: 400, letterSpacing: '2px' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-ui text-xs tracking-widest uppercase transition-colors duration-200"
                  style={{ color: 'var(--muted)', fontWeight: 400, letterSpacing: '2px' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
                >
                  {link.label}
                </Link>
              )
            )}
            <Link
              href="/referrals"
              className="font-ui text-xs tracking-widest uppercase transition-colors duration-200"
              style={{
                color: 'var(--primary)',
                fontWeight: 400,
                letterSpacing: '2px',
                border: '1px solid var(--primary)',
                padding: '8px 18px',
                borderRadius: '2px',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--primary)';
                (e.currentTarget as HTMLAnchorElement).style.color = '#080808';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--primary)';
              }}
            >
              Partner with Us
            </Link>
            <Link
              href="/book"
              className="btn-ghost text-xs"
              style={{ padding: '10px 24px', fontSize: '10px', letterSpacing: '2px' }}
            >
              Book a Call
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            style={{ cursor: 'pointer' }}
          >
            <span
              className="block h-px w-6 transition-all duration-300"
              style={{
                backgroundColor: 'var(--foreground)',
                transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
              }}
            />
            <span
              className="block h-px w-4 transition-all duration-300"
              style={{
                backgroundColor: 'var(--foreground)',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block h-px w-6 transition-all duration-300"
              style={{
                backgroundColor: 'var(--foreground)',
                transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Full-Screen Overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center transition-all duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ backgroundColor: 'rgba(8,8,8,0.98)', backdropFilter: 'blur(20px)' }}
      >
        <div className="flex flex-col items-center gap-10">
          {navLinks.map((link, i) =>
            link.href.startsWith('#') ? (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="font-display text-4xl transition-colors duration-200"
                style={{
                  color: 'var(--foreground)',
                  fontWeight: 400,
                  transitionDelay: menuOpen ? `${i * 80}ms` : '0ms',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-display text-4xl transition-colors duration-200"
                style={{
                  color: 'var(--foreground)',
                  fontWeight: 400,
                  transitionDelay: menuOpen ? `${i * 80}ms` : '0ms',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
              >
                {link.label}
              </Link>
            )
          )}
          <Link
            href="/referrals"
            onClick={() => setMenuOpen(false)}
            className="font-display text-4xl transition-colors duration-200"
            style={{
              color: 'var(--primary)',
              fontWeight: 400,
              transitionDelay: menuOpen ? `${navLinks.length * 80}ms` : '0ms',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--primary)')}
          >
            Partner with Us
          </Link>
          <Link
            href="/book"
            onClick={() => setMenuOpen(false)}
            className="btn-gold mt-4"
            style={{ cursor: 'pointer' }}
          >
            Book a Call
          </Link>
        </div>
      </div>
    </>
  );
}