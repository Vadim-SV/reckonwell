import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bookkeeping for SaaS Companies | Reckonwell',
  description: 'Fractional bookkeeping and finance operations for SaaS businesses. MRR tracking, deferred revenue scheduling, and daily finance ops — handled properly. From $300/month.',
  alternates: {
    canonical: 'https://reckonwell.com/us/bookkeeping-for-saas/',
    languages: {
      'en-US': 'https://reckonwell.com/us/bookkeeping-for-saas/',
    },
  },
  openGraph: {
    title: 'Bookkeeping for SaaS Companies | Reckonwell',
    description: 'MRR tracking, deferred revenue scheduling, and daily finance ops for SaaS businesses. From $300/month.',
    type: 'website',
    locale: 'en_US',
    url: 'https://reckonwell.com/us/bookkeeping-for-saas/',
  },
};

export default function BookkeepingForSaaSLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
