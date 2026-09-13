import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://reckonwell.com'),
  title: 'Making Tax Digital Compliance | From £34/mo | Reckonwell',
  description: 'MTD-ready quarterly filing from £34/month. Compliant with April 2026 rules. Sole traders and landlords over £50k. Automated submissions. Get instant quote.',
  alternates: {
    canonical: 'https://reckonwell.com/making-tax-digital',
  },
  openGraph: {
    title: 'Making Tax Digital Compliance | Reckonwell',
    description: 'MTD-ready quarterly filing from £34/month. Compliant with April 2026 rules. Sole traders and landlords over £50k.',
    url: 'https://reckonwell.com/making-tax-digital',
    type: 'website',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'Making Tax Digital for Sole Traders and Landlords - Reckonwell',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Making Tax Digital Compliance | Reckonwell',
    description: 'MTD-ready quarterly filing from £34/month. Compliant with April 2026 rules.',
    images: ['/assets/images/app_logo.png'],
  },
};
