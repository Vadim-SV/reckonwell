import type { Metadata } from 'next';
import ManchesterVatReturnsClient from './ManchesterVatReturnsClient';

export const metadata: Metadata = {
  title: 'VAT Returns in Manchester | Reckonwell',
  description: 'Professional VAT return services for businesses in Manchester. MTD-compliant, flat rate scheme analysis, and VAT registration.',
  robots: { index: false, follow: true },
  alternates: {
    canonical: 'https://reckonwell.com/manchester-vat-returns',
  },
  openGraph: {
    title: 'VAT Returns in Manchester | Reckonwell',
    description: 'Professional VAT return services for businesses in Manchester. MTD-compliant, flat rate scheme analysis, and VAT registration.',
    url: 'https://reckonwell.com/manchester-vat-returns',
    type: 'website',
  },
};

export default function Page() {
  return <ManchesterVatReturnsClient />;
}
