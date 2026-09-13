import type { Metadata } from 'next';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  title: 'Reckonwell | Accounting Firm Working on Your Finances Every Day',
  description: 'Finally, an accounting firm that doesn\'t wait until month end. Daily bookkeeping, cash flow monitoring, and real-time alerts — from £200 per month. British accounting firm for UK founder-led businesses.',
  alternates: {
    canonical: 'https://reckonwell.com/',
  },
  openGraph: {
    title: 'Reckonwell | Daily Accounting for UK Businesses',
    description: 'Daily bookkeeping, cash flow monitoring & real-time alerts from £200 per month.',
    url: 'https://reckonwell.com/',
    type: 'website',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'Reckonwell - Premium accounting firm for daily bookkeeping and financial management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reckonwell | Daily Accounting for UK Businesses',
    description: 'Daily bookkeeping, cash flow monitoring & real-time alerts from £200 per month.',
    images: ['/assets/images/app_logo.png'],
  },
};

export default function Page() {
  return <HomePageClient />;
}