import type { Metadata } from 'next';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  title: 'Reckonwell | Fractional Finance Department for Founder-Led Businesses',
  description: 'Part-time finance department for owner-managed businesses. Daily oversight of cash, real-time bookkeeping, and a qualified accountant who signs off the numbers.',
  alternates: {
    canonical: 'https://reckonwell.com/',
  },
  openGraph: {
    title: 'Reckonwell | Fractional Finance Department for Founder-Led Businesses',
    description: 'Part-time finance department for owner-managed businesses. Daily oversight of cash, real-time bookkeeping, and a qualified accountant who signs off the numbers.',
    url: 'https://reckonwell.com/',
    type: 'website',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'Reckonwell - Fractional Finance Department for Founder-Led Businesses',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reckonwell | Fractional Finance Department for Founder-Led Businesses',
    description: 'Part-time finance department for owner-managed businesses. Daily oversight of cash, real-time bookkeeping, and a qualified accountant who signs off the numbers.',
    images: ['/assets/images/app_logo.png'],
  },
};

export default function Page() {
  return <HomePageClient />;
}