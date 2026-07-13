import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Virtual CFO Services for US Businesses | Reckonwell',
  description: 'CFO-level financial oversight for founder-led US businesses. Cash flow forecasting, management accounts, fundraising support, and a dedicated finance partner. From $300/month.',
  alternates: {
    canonical: 'https://reckonwell.com/us/virtual-cfo-services/',
    languages: {
      'en-US': 'https://reckonwell.com/us/virtual-cfo-services/',
    },
  },
  openGraph: {
    title: 'Virtual CFO Services for US Businesses | Reckonwell',
    description: 'Cash flow forecasting, management accounts, fundraising support, and a dedicated finance partner — without the full-time hire. From $300/month.',
    type: 'website',
    locale: 'en_US',
    url: 'https://reckonwell.com/us/virtual-cfo-services/',
  },
};

export default function VirtualCFOServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
