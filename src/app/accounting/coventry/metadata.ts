import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://reckonwell.com'),
  title: 'Accounting Services in Coventry | Daily Bookkeeping from £200/mo | Reckonwell',
  description: 'Reckonwell provides daily bookkeeping, cash flow monitoring, and real-time financial visibility for founder-led businesses in Coventry. Transparent pricing, no hidden fees. Get your instant quote.',
  alternates: {
    canonical: 'https://reckonwell.com/accounting/coventry',
  },
  openGraph: {
    title: 'Accounting Services in Coventry | Reckonwell',
    description: 'Daily bookkeeping, cash flow monitoring & real-time alerts for Coventry businesses from £200/mo.',
    url: 'https://reckonwell.com/accounting/coventry',
    type: 'website',
    images: [{ url: '/assets/images/app_logo.png', width: 1200, height: 630, alt: 'Reckonwell - Accounting Services in Coventry' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accounting Services in Coventry | Reckonwell',
    description: 'Daily bookkeeping, cash flow monitoring & real-time alerts for Coventry businesses from £200/mo.',
    images: ['/assets/images/app_logo.png'],
  },
};
