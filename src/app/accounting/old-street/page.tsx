import type { Metadata } from 'next';
import OldStreetClient from './OldStreetClient';

export const metadata: Metadata = {
  title: 'Accounting Services in Old Street | Daily Bookkeeping from £200/mo | Reckonwell',
  description: 'Reckonwell provides daily bookkeeping, cash flow monitoring, and real-time financial visibility for founder-led businesses in Old Street. Transparent pricing, no hidden fees. Get your instant quote.',
  alternates: {
    canonical: 'https://reckonwell.com/accounting/old-street',
  },
  openGraph: {
    title: 'Accounting Services in Old Street | Reckonwell',
    description: 'Daily bookkeeping, cash flow monitoring & real-time alerts for Old Street businesses from £200/mo.',
    url: 'https://reckonwell.com/accounting/old-street',
    type: 'website',
    images: [{ url: '/assets/images/app_logo.png', width: 1200, height: 630, alt: 'Reckonwell - Accounting Services in Old Street' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accounting Services in Old Street | Reckonwell',
    description: 'Daily bookkeeping, cash flow monitoring & real-time alerts for Old Street businesses from £200/mo.',
    images: ['/assets/images/app_logo.png'],
  },
};

export default function Page() {
  return <OldStreetClient />;
}
