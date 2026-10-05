import type { Metadata } from 'next';
import CityPageClient from './CityPageClient';

export const metadata: Metadata = {
  title: 'Accounting & Fractional Finance in Nottingham | Reckonwell',
  description: 'Reckonwell provides daily bookkeeping, cash flow monitoring, and real-time financial visibility for founder-led businesses in Nottingham. Transparent pricing, no hidden fees.',
  robots: { index: false, follow: true },
  alternates: {
    canonical: 'https://reckonwell.com/accounting/nottingham',
  },
  openGraph: {
    title: 'Accounting & Fractional Finance in Nottingham | Reckonwell',
    description: 'Daily bookkeeping, cash flow monitoring & real-time alerts for Nottingham businesses.',
    url: 'https://reckonwell.com/accounting/nottingham',
    type: 'website',
    images: [{ url: '/assets/images/app_logo.png', width: 1200, height: 630, alt: 'Reckonwell - Accounting Services in Nottingham' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accounting & Fractional Finance in Nottingham | Reckonwell',
    description: 'Daily bookkeeping, cash flow monitoring & real-time alerts for Nottingham businesses.',
    images: ['/assets/images/app_logo.png'],
  },
};

export default function Page() {
  return <CityPageClient />;
}
