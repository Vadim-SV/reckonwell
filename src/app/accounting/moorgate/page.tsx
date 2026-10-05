import type { Metadata } from 'next';
import MoorgateClient from './MoorgateClient';

export const metadata: Metadata = {
  title: 'Accounting & Fractional Finance in Moorgate | Reckonwell',
  description: 'Daily bookkeeping, cash flow monitoring, and real-time financial visibility for founder-led businesses in Moorgate. Transparent pricing, no hidden fees.',
  alternates: {
    canonical: 'https://reckonwell.com/accounting/moorgate',
  },
  openGraph: {
    title: 'Accounting & Fractional Finance in Moorgate | Reckonwell',
    description: 'Daily bookkeeping, cash flow monitoring & real-time alerts for Moorgate businesses.',
    url: 'https://reckonwell.com/accounting/moorgate',
    type: 'website',
    images: [{ url: '/assets/images/app_logo.png', width: 1200, height: 630, alt: 'Reckonwell - Accounting Services in Moorgate' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accounting & Fractional Finance in Moorgate | Reckonwell',
    description: 'Daily bookkeeping, cash flow monitoring & real-time alerts for Moorgate businesses.',
    images: ['/assets/images/app_logo.png'],
  },
};

export default function Page() {
  return <MoorgateClient />;
}
