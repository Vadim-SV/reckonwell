import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bookkeeping for E-Commerce Businesses | Reckonwell',
  description: 'Fractional bookkeeping and finance operations for e-commerce businesses. COGS tracking, inventory reconciliation, and multi-state sales tax nexus monitoring. From $300/month.',
  alternates: {
    canonical: 'https://reckonwell.com/us/bookkeeping-for-ecommerce/',
    languages: {
      'en-US': 'https://reckonwell.com/us/bookkeeping-for-ecommerce/',
    },
  },
  openGraph: {
    title: 'Bookkeeping for E-Commerce Businesses | Reckonwell',
    description: 'COGS tracking, inventory reconciliation, and multi-state sales tax nexus monitoring for e-commerce businesses. From $300/month.',
    type: 'website',
    locale: 'en_US',
    url: 'https://reckonwell.com/us/bookkeeping-for-ecommerce/',
  },
};

export default function BookkeepingForEcommerceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
