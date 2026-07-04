import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accounting Services | Reckonwell UK',
  description: 'Fractional finance department or standalone compliance services. Choose what fits your business. From £34/month.',
  alternates: {
    canonical: 'https://reckonwell.com/services',
  },
  openGraph: {
    title: 'Accounting Services | Reckonwell UK',
    description: 'Fractional finance department or standalone compliance services. Choose what fits your business.',
    url: 'https://reckonwell.com/services',
    type: 'website',
    images: [{ url: '/assets/images/app_logo.png', width: 1200, height: 630, alt: 'Reckonwell Accounting Services' }],
  },
};
