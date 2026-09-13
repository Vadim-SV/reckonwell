import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://reckonwell.com'),
  title: 'Self-Employed Accounting Services UK | From £80/mo | Reckonwell',
  description: 'Compliance accounting for freelancers and sole traders. Self Assessment, MTD-ready, real-time tax monitoring. From £80/month. Get your instant quote.',
  alternates: {
    canonical: 'https://reckonwell.com/self-employed-accounting',
  },
  openGraph: {
    title: 'Self-Employed Accounting Services UK | Reckonwell',
    description: 'Compliance accounting for freelancers and sole traders. From £80/month. MTD-ready. Instant online quote.',
    url: 'https://reckonwell.com/self-employed-accounting',
    type: 'website',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'Self-Employed Accounting Services UK - Reckonwell',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Self-Employed Accounting Services UK | Reckonwell',
    description: 'Compliance accounting for freelancers and sole traders. From £80/month. MTD-ready.',
    images: ['/assets/images/app_logo.png'],
  },
};
