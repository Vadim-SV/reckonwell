import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Fractional Finance & Bookkeeping for US Businesses | Reckonwell',
    template: '%s | Reckonwell',
  },
  description: 'Daily bookkeeping and finance operations for founder-led US businesses. From $300/month. CPA partner network for tax filing.',
  openGraph: {
    title: 'Fractional Finance & Bookkeeping for US Businesses | Reckonwell',
    description: 'Daily bookkeeping and finance operations for founder-led US businesses. From $300/month.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function USLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
