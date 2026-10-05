import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Newsreader, Work_Sans } from 'next/font/google';
import { Suspense } from 'react';
import '../styles/tailwind.css';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { RegionProvider } from '@/context/RegionContext';
import CustomCursor from '@/app/components/CustomCursor';

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap'
});

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-work-sans',
  display: 'swap'
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
};

export const metadata: Metadata = {
  metadataBase: new URL('https://reckonwell.com'),
  title: 'Reckonwell | Fractional Finance Department for Founder-Led Businesses',
  description: 'Part-time finance department for owner-managed businesses. Daily oversight of cash, real-time bookkeeping, and a qualified accountant who signs off the numbers.',
  icons: {
    icon: [
    { url: '/assets/images/99C61B88-2C2A-4A13-BD74-35EE79D48106-1783188578397.PNG', type: 'image/png' },
    { url: '/favicon.ico', type: 'image/x-icon' }],

    shortcut: '/assets/images/99C61B88-2C2A-4A13-BD74-35EE79D48106-1783188578397.PNG',
    apple: '/assets/images/99C61B88-2C2A-4A13-BD74-35EE79D48106-1783188578397.PNG'
  },
  alternates: {
    languages: {
      'en-GB': 'https://reckonwell.com/',
      'en-US': 'https://reckonwell.com/us/'
    }
  },
  openGraph: {
    title: 'Reckonwell | Fractional Finance Department for Founder-Led Businesses',
    description: 'Part-time finance department for owner-managed businesses. Daily oversight of cash, real-time bookkeeping, and a qualified accountant who signs off the numbers.',
    images: [
    {
      url: '/assets/images/app_logo.png',
      width: 1200,
      height: 630,
      alt: 'Reckonwell - Fractional Finance Department for Founder-Led Businesses'
    }],

    type: 'website',
    locale: 'en_GB'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reckonwell | Fractional Finance Department for Founder-Led Businesses',
    description: 'Part-time finance department for owner-managed businesses. Daily oversight of cash, real-time bookkeeping, and a qualified accountant who signs off the numbers.',
    images: ['/assets/images/app_logo.png']
  },
  keywords: 'fractional finance department, accounting firm, bookkeeping services, cash flow management, accounting for startups, UK accounting, USA accounting, financial management, tax accounting'
};

export default function RootLayout({
  children
}: Readonly<{children: React.ReactNode;}>) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://reckonwell.com',
    name: 'Reckonwell',
    description: 'Fractional finance department for founder-led businesses. Daily bookkeeping, cash flow monitoring, and real-time financial oversight.',
    url: 'https://reckonwell.com',
    telephone: '+442038186205',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '124 City Road',
      addressLocality: 'London',
      postalCode: 'EC1V 2NX',
      addressCountry: 'GB'
    },
    areaServed: [
    {
      '@type': 'Country',
      name: 'United Kingdom'
    },
    {
      '@type': 'Country',
      name: 'United States'
    }],

    priceRange: '£200-£1000',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_469967d97-1791160519080.png",
    sameAs: [
    'https://www.linkedin.com/company/reckonwell/']

  };

  const accountingServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': 'https://reckonwell.com#accounting-services',
    name: 'Accounting & Bookkeeping Services',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Reckonwell',
      url: 'https://reckonwell.com'
    },
    areaServed: ['GB', 'US'],
    serviceType: ['Bookkeeping', 'Cash Flow Management', 'Financial Monitoring', 'Tax Accounting'],
    description: 'Daily bookkeeping, real-time cash flow monitoring, and financial alerts for growing businesses.'
  };

  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${workSans.variable}`}>
      
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }} />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(accountingServiceSchema)
          }} />

        <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Freckonwell9518back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.20" />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.3" /></head>
      <body className={workSans.className}>
        <CustomCursor />
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <RegionProvider>
          {children}
        </RegionProvider>
      </body>
    </html>);

}