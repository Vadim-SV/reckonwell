import type { Metadata } from 'next';
import EdinburghBookkeepingClient from './EdinburghBookkeepingClient';

export const metadata: Metadata = {
  title: 'Bookkeeping Services in Edinburgh | Reckonwell',
  description: 'Professional bookkeeping services for businesses in Edinburgh. Monthly management accounts, bank reconciliation, and cloud accounting.',
  robots: { index: false, follow: true },
  alternates: {
    canonical: 'https://reckonwell.com/edinburgh-bookkeeping-services',
  },
  openGraph: {
    title: 'Bookkeeping Services in Edinburgh | Reckonwell',
    description: 'Professional bookkeeping services for businesses in Edinburgh. Monthly management accounts, bank reconciliation, and cloud accounting.',
    url: 'https://reckonwell.com/edinburgh-bookkeeping-services',
    type: 'website',
  },
};

export default function Page() {
  return <EdinburghBookkeepingClient />;
}
