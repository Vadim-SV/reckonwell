import type { Metadata } from 'next';
import CityPageClient from './CityPageClient';

export const metadata: Metadata = {
  title: 'Accounting Services in Hounslow | Daily Bookkeeping from £200/mo | Reckonwell',
  description: 'Reckonwell provides daily bookkeeping, cash flow monitoring, and real-time financial visibility for founder-led businesses in Hounslow. Transparent pricing, no hidden fees. Get your instant quote.',
  alternates: {
    canonical: 'https://reckonwell.com/accounting/hounslow',
  },
  openGraph: {
    title: 'Accounting Services in Hounslow | Reckonwell',
    description: 'Daily bookkeeping, cash flow monitoring & real-time alerts for Hounslow businesses from £200/mo.',
    url: 'https://reckonwell.com/accounting/hounslow',
    type: 'website',
    images: [{ url: '/assets/images/app_logo.png', width: 1200, height: 630, alt: 'Reckonwell - Accounting Services in Hounslow' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accounting Services in Hounslow | Reckonwell',
    description: 'Daily bookkeeping, cash flow monitoring & real-time alerts for Hounslow businesses from £200/mo.',
    images: ['/assets/images/app_logo.png'],
  },
};

export default function Page() {
  return <CityPageClient />;
}
