import type { Metadata } from 'next';
import KingsCrossClient from './KingsCrossClient';

export const metadata: Metadata = {
  title: "Accounting & Fractional Finance in King's Cross | Reckonwell",
  description: "Daily bookkeeping, cash flow monitoring, and real-time financial visibility for founder-led businesses in King's Cross. Transparent pricing, no hidden fees.",
  alternates: {
    canonical: 'https://reckonwell.com/accounting/kings-cross',
  },
  openGraph: {
    title: "Accounting & Fractional Finance in King's Cross | Reckonwell",
    description: "Daily bookkeeping, cash flow monitoring & real-time alerts for King's Cross businesses.",
    url: 'https://reckonwell.com/accounting/kings-cross',
    type: 'website',
    images: [{ url: '/assets/images/app_logo.png', width: 1200, height: 630, alt: "Reckonwell - Accounting Services in King's Cross" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Accounting & Fractional Finance in King's Cross | Reckonwell",
    description: "Daily bookkeeping, cash flow monitoring & real-time alerts for King's Cross businesses.",
    images: ['/assets/images/app_logo.png'],
  },
};

export default function Page() {
  return <KingsCrossClient />;
}
