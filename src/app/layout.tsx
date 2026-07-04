import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Cormorant_Garamond, Montserrat } from 'next/font/google';
import { Suspense } from 'react';
import '../styles/tailwind.css';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { RegionProvider } from '@/context/RegionContext';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Reckonwell | Accounting Firm Working on Your Finances Every Day',
  description: 'Finally, an accounting firm that doesn\'t wait until month end. Daily bookkeeping, cash flow monitoring, and real-time alerts — from £200/$300 per month. British firm serving UK & USA.',
  icons: {
    icon: [
      { url: '/assets/images/99C61B88-2C2A-4A13-BD74-35EE79D48106-1783188578397.PNG', type: 'image/png' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    shortcut: '/assets/images/99C61B88-2C2A-4A13-BD74-35EE79D48106-1783188578397.PNG',
    apple: '/assets/images/99C61B88-2C2A-4A13-BD74-35EE79D48106-1783188578397.PNG',
  },
  alternates: {
    canonical: 'https://reckonwell.com/',
    languages: {
      'en-GB': 'https://reckonwell.com/',
      'en-US': 'https://reckonwell.com/us/',
    },
  },
  openGraph: {
    title: 'Reckonwell | Daily Accounting for UK & USA',
    description: 'Daily bookkeeping, cash flow monitoring & real-time alerts from £200/$300/month.',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'Reckonwell - Premium accounting firm for daily bookkeeping and financial management',
      },
    ],
    type: 'website',
    locale: 'en_GB',
  },
  keywords: 'accounting firm, bookkeeping services, cash flow management, accounting for startups, UK accounting, USA accounting, financial management, tax accounting',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    name: 'Reckonwell',
    description: 'Premium accounting firm providing daily bookkeeping, cash flow monitoring, and real-time financial alerts for UK and USA businesses.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    telephone: '+442038186205',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '124 City Road',
      addressLocality: 'London',
      postalCode: 'EC1V 2NX',
      addressCountry: 'GB',
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'United Kingdom',
      },
      {
        '@type': 'Country',
        name: 'United States',
      },
    ],
    priceRange: '£200-£1000',
    image: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/assets/images/app_logo.png`,
    sameAs: [],
  };

  const accountingServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}#accounting-services`,
    name: 'Accounting & Bookkeeping Services',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Reckonwell',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    },
    areaServed: ['GB', 'US'],
    serviceType: ['Bookkeeping', 'Cash Flow Management', 'Financial Monitoring', 'Tax Accounting'],
    description: 'Daily bookkeeping, real-time cash flow monitoring, and financial alerts for growing businesses.',
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    name: 'Reckonwell | Accounting Firm Working on Your Finances Every Day',
    description: 'Finally, an accounting firm that doesn\'t wait until month end. Daily bookkeeping, cash flow monitoring, and real-time alerts — from £200/$300 per month.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    isPartOf: {
      '@id': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    },
    inLanguage: 'en-GB',
    image: {
      '@type': 'ImageObject',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/assets/images/app_logo.png`,
      width: 1200,
      height: 630,
    },
  };

  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${cormorantGaramond.variable} ${montserrat.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(accountingServiceSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webPageSchema),
          }}
        />

        <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Freckonwell9518back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.19" />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" /></head>
      <body className={montserrat.className}>
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <RegionProvider>
          {children}
        </RegionProvider>
      </body>
    </html>
  );
}