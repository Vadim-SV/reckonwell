import type { Metadata } from 'next';
import CityOfLondonClient from './CityOfLondonClient';

export const metadata: Metadata = {
  title: 'Accounting Services in City of London | Daily Bookkeeping from £200/mo | Reckonwell',
  description: 'Reckonwell provides daily bookkeeping, cash flow monitoring, and real-time financial visibility for founder-led businesses in City of London. Transparent pricing, no hidden fees. Get your instant quote.',
  alternates: {
    canonical: 'https://reckonwell.com/accounting/city-of-london',
  },
  openGraph: {
    title: 'Accounting Services in City of London | Reckonwell',
    description: 'Daily bookkeeping, cash flow monitoring & real-time alerts for City of London businesses from £200/mo.',
    url: 'https://reckonwell.com/accounting/city-of-london',
    type: 'website',
    images: [{ url: '/assets/images/app_logo.png', width: 1200, height: 630, alt: 'Reckonwell - Accounting Services in City of London' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accounting Services in City of London | Reckonwell',
    description: 'Daily bookkeeping, cash flow monitoring & real-time alerts for City of London businesses from £200/mo.',
    images: ['/assets/images/app_logo.png'],
  },
};

export default function Page() {
  return <CityOfLondonClient />;
}
