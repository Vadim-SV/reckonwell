import type { Metadata } from 'next';
import SohoClient from './SohoClient';

export const metadata: Metadata = {
  title: 'Accounting & Fractional Finance in Soho | Reckonwell',
  description: 'Daily bookkeeping, cash flow monitoring, and real-time financial visibility for founder-led businesses in Soho. Transparent pricing, no hidden fees.',
  alternates: {
    canonical: 'https://reckonwell.com/accounting/soho',
  },
  openGraph: {
    title: 'Accounting & Fractional Finance in Soho | Reckonwell',
    description: 'Daily bookkeeping, cash flow monitoring & real-time alerts for Soho businesses.',
    url: 'https://reckonwell.com/accounting/soho',
    type: 'website',
    images: [{ url: '/assets/images/app_logo.png', width: 1200, height: 630, alt: 'Reckonwell - Accounting Services in Soho' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accounting & Fractional Finance in Soho | Reckonwell',
    description: 'Daily bookkeeping, cash flow monitoring & real-time alerts for Soho businesses.',
    images: ['/assets/images/app_logo.png'],
  },
};

export default function Page() {
  return <SohoClient />;
}
