import type { Metadata } from 'next';
import CityPageClient from './CityPageClient';

export const metadata: Metadata = {
  title: 'Accounting & Fractional Finance in Leicester | Reckonwell',
  description: 'Reckonwell provides daily bookkeeping, cash flow monitoring, and real-time financial visibility for founder-led businesses in Leicester. Transparent pricing, no hidden fees.',
  robots: { index: false, follow: true },
  alternates: {
    canonical: 'https://reckonwell.com/accounting/leicester',
  },
  openGraph: {
    title: 'Accounting & Fractional Finance in Leicester | Reckonwell',
    description: 'Daily bookkeeping, cash flow monitoring & real-time alerts for Leicester businesses.',
    url: 'https://reckonwell.com/accounting/leicester',
    type: 'website',
    images: [{ url: '/assets/images/app_logo.png', width: 1200, height: 630, alt: 'Reckonwell - Accounting Services in Leicester' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accounting & Fractional Finance in Leicester | Reckonwell',
    description: 'Daily bookkeeping, cash flow monitoring & real-time alerts for Leicester businesses.',
    images: ['/assets/images/app_logo.png'],
  },
};

export default function Page() {
  return <CityPageClient />;
}
