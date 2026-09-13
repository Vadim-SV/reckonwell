import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://reckonwell.com'),
  title: 'Accounting Services in Cardiff | Daily Bookkeeping from £200/mo | Reckonwell',
  description: 'Reckonwell provides daily bookkeeping, cash flow monitoring, and real-time financial visibility for founder-led businesses in Cardiff. Transparent pricing, no hidden fees. Get your instant quote.',
  alternates: {
    canonical: 'https://reckonwell.com/accounting/cardiff',
  },
  openGraph: {
    title: 'Accounting Services in Cardiff | Reckonwell',
    description: 'Daily bookkeeping, cash flow monitoring & real-time alerts for Cardiff businesses from £200/mo.',
    url: 'https://reckonwell.com/accounting/cardiff',
    type: 'website',
    images: [{ url: '/assets/images/app_logo.png', width: 1200, height: 630, alt: 'Reckonwell - Accounting Services in Cardiff' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accounting Services in Cardiff | Reckonwell',
    description: 'Daily bookkeeping, cash flow monitoring & real-time alerts for Cardiff businesses from £200/mo.',
    images: ['/assets/images/app_logo.png'],
  },
};
