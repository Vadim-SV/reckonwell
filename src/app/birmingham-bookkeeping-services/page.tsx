import type { Metadata } from 'next';
import BirminghamBookkeepingClient from './BirminghamBookkeepingClient';

export const metadata: Metadata = {
  title: 'Bookkeeping Services in Birmingham | Reckonwell',
  description: 'Professional bookkeeping services for businesses in Birmingham. Monthly management accounts, bank reconciliation, and cloud accounting.',
  robots: { index: false, follow: true },
  alternates: {
    canonical: 'https://reckonwell.com/birmingham-bookkeeping-services',
  },
  openGraph: {
    title: 'Bookkeeping Services in Birmingham | Reckonwell',
    description: 'Professional bookkeeping services for businesses in Birmingham. Monthly management accounts, bank reconciliation, and cloud accounting.',
    url: 'https://reckonwell.com/birmingham-bookkeeping-services',
    type: 'website',
  },
};

export default function Page() {
  return <BirminghamBookkeepingClient />;
}
