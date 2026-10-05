import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      className="border-t py-12 md:py-16 px-6 md:px-10"
      style={{
        backgroundColor: '#000000',
        borderColor: '#333333',
      }}
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10 md:gap-8">
        {/* Left: Logo + tagline */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="flex items-center gap-3">
            <img
              src="/assets/images/Reckonwell-1779490857835.png"
              alt="Reckonwell - Premium accounting firm"
              style={{ height: '28px', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
            />
          </div>
          <address
            className="font-ui text-xs text-center md:text-left not-italic"
            style={{ color: '#B8B8B8', letterSpacing: '0.5px', maxWidth: '260px', lineHeight: 1.6 }}
          >
            124 City Road, London EC1V 2NX
          </address>
          <p
            className="font-ui text-xs text-center md:text-left"
            style={{ color: '#B8B8B8', letterSpacing: '0.5px', maxWidth: '260px', lineHeight: 1.6 }}
          >
            Fractional finance department for founder-led businesses. Daily bookkeeping, real-time insights, zero surprises.
          </p>
          <p
            className="font-ui text-xs text-center md:text-left"
            style={{ color: '#B8B8B8', letterSpacing: '0.5px', maxWidth: '280px', lineHeight: 1.6 }}
          >
            ICO Registered · Data Protection Reg. CSN3799691
          </p>
        </div>

        {/* Centre: Areas we serve */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <p
            className="font-ui text-xs uppercase tracking-widest"
            style={{ color: '#B8B8B8', letterSpacing: '2px', fontSize: '10px' }}
          >
            Areas we serve
          </p>
          <nav className="flex flex-col gap-2" aria-label="Areas we serve">
            {[
              { label: 'Old Street & Shoreditch', href: '/accounting/old-street' },
              { label: 'Moorgate', href: '/accounting/moorgate' },
              { label: 'City of London', href: '/accounting/city-of-london' },
              { label: 'Soho', href: '/accounting/soho' },
              { label: "King's Cross", href: '/accounting/kings-cross' },
              { label: 'Farringdon & Clerkenwell', href: '/accounting/farringdon' },
            ]?.map((area) => (
              <Link
                key={area?.href}
                href={area?.href}
                className="font-ui text-xs transition-colors duration-200"
                style={{ color: '#B8B8B8', letterSpacing: '0.5px' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#D69AAB')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#B8B8B8')}
              >
                {area?.label}
              </Link>
            ))}
            <Link
              href="/accounting/london"
              className="font-ui text-xs transition-colors duration-200"
              style={{ color: '#D69AAB', letterSpacing: '0.5px', textDecoration: 'underline', textUnderlineOffset: '3px' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#D69AAB')}
            >
              All London accounting services →
            </Link>
          </nav>
        </div>

        {/* Industries */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <p
            className="font-ui text-xs uppercase tracking-widest"
            style={{ color: '#B8B8B8', letterSpacing: '2px', fontSize: '10px' }}
          >
            Industries
          </p>
          <nav className="flex flex-col gap-2" aria-label="Industries">
            {[
              { label: 'Technology & SaaS', href: '/industries/technology' },
              { label: 'E-Commerce', href: '/industries/ecommerce' },
              { label: 'Property', href: '/industries/property' },
              { label: 'Manufacturing', href: '/industries/manufacturing' },
              { label: 'Hospitality', href: '/industries/hospitality' },
            ]?.map((item) => (
              <Link
                key={item?.href}
                href={item?.href}
                className="font-ui text-xs transition-colors duration-200"
                style={{ color: '#B8B8B8', letterSpacing: '0.5px' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#D69AAB')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#B8B8B8')}
              >
                {item?.label}
              </Link>
            ))}
            <Link
              href="/industries"
              className="font-ui text-xs transition-colors duration-200"
              style={{ color: '#D69AAB', letterSpacing: '0.5px', textDecoration: 'underline', textUnderlineOffset: '3px' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#D69AAB')}
            >
              All industries →
            </Link>
          </nav>
        </div>

        {/* Right: Contact + Legal */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <p
            className="font-ui text-xs"
            style={{ color: '#B8B8B8', letterSpacing: '0.5px' }}
          >
            02038186205
          </p>
          <nav className="flex items-center gap-6" aria-label="Footer links">
            <Link
              href="/privacy-policy"
              className="font-ui text-xs uppercase tracking-widest transition-colors duration-200 py-2"
              style={{ color: '#B8B8B8', letterSpacing: '2px', fontSize: '10px', minHeight: '44px', display: 'flex', alignItems: 'center' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#D69AAB')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#B8B8B8')}
            >
              Privacy
            </Link>
            <Link
              href="/terms-of-service"
              className="font-ui text-xs uppercase tracking-widest transition-colors duration-200 py-2"
              style={{ color: '#B8B8B8', letterSpacing: '2px', fontSize: '10px', minHeight: '44px', display: 'flex', alignItems: 'center' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#D69AAB')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#B8B8B8')}
            >
              Terms
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}