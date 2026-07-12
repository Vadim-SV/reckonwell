import type { Metadata } from 'next';
import FractionalFinanceDepartmentPage from './FractionalFinanceDepartmentClient';

export const metadata: Metadata = {
  title: 'Fractional Finance Department | Reckonwell',
  description:
    'A dedicated finance team for founder-led businesses — bookkeeping, compliance, and founder support, without the cost of hiring in-house.',
  openGraph: {
    title: 'Fractional Finance Department | Reckonwell',
    description:
      'A dedicated finance team for founder-led businesses — bookkeeping, compliance, and founder support, without the cost of hiring in-house.',
    url: 'https://reckonwell.com/fractional-finance-department/',
    siteName: 'Reckonwell',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fractional Finance Department | Reckonwell',
    description:
      'A dedicated finance team for founder-led businesses — bookkeeping, compliance, and founder support, without the cost of hiring in-house.',
  },
  alternates: {
    canonical: 'https://reckonwell.com/fractional-finance-department/',
  },
};

export default function Page() {
  return <FractionalFinanceDepartmentPage />;
}
