import type { Metadata } from 'next';
import CityPageClient from './CityPageClient';

export const metadata: Metadata = {
  title: 'Accounting & Fractional Finance in Belfast | Reckonwell',
  description: 'Reckonwell provides daily bookkeeping, cash flow monitoring, and real-time financial visibility for founder-led businesses in Belfast. Transparent pricing, no hidden fees.',
  robots: { index: false, follow: true },
  alternates: {
    canonical: 'https://reckonwell.com/accounting/belfast',
  },
  openGraph: {
    title: 'Accounting & Fractional Finance in Belfast | Reckonwell',
    description: 'Daily bookkeeping, cash flow monitoring & real-time alerts for Belfast businesses.',
    url: 'https://reckonwell.com/accounting/belfast',
    type: 'website',
    images: [{ url: '/assets/images/app_logo.png', width: 1200, height: 630, alt: 'Reckonwell - Accounting Services in Belfast' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accounting & Fractional Finance in Belfast | Reckonwell',
    description: 'Daily bookkeeping, cash flow monitoring & real-time alerts for Belfast businesses.',
    images: ['/assets/images/app_logo.png'],
  },
};

export default function Page() {
  return <CityPageClient />;
}
