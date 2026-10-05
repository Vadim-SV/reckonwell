import type { Metadata } from 'next';
import BristolVatReturnsClient from './BristolVatReturnsClient';

export const metadata: Metadata = {
  title: 'VAT Returns in Bristol | Reckonwell',
  description: 'Professional VAT return services for businesses in Bristol. MTD-compliant, flat rate scheme analysis, and VAT registration.',
  robots: { index: false, follow: true },
  alternates: {
    canonical: 'https://reckonwell.com/bristol-vat-returns',
  },
  openGraph: {
    title: 'VAT Returns in Bristol | Reckonwell',
    description: 'Professional VAT return services for businesses in Bristol. MTD-compliant, flat rate scheme analysis, and VAT registration.',
    url: 'https://reckonwell.com/bristol-vat-returns',
    type: 'website',
  },
};

export default function Page() {
  return <BristolVatReturnsClient />;
}
