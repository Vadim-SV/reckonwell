import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://reckonwell.com'),
  title: 'R&D Tax Relief Claims UK | From £850 | Reckonwell',
  description: 'Professional R&D tax relief claims for tech and innovation businesses. Get up to 20% of qualifying spend back. From £850. See fee calculator. Instant quote.',
  alternates: {
    canonical: 'https://reckonwell.com/r-and-d-tax-relief',
  },
  openGraph: {
    title: 'R&D Tax Relief Claims UK | Reckonwell',
    description: 'Professional R&D tax relief claims. Get up to 20% of qualifying spend back. From £850. See fee calculator.',
    url: 'https://reckonwell.com/r-and-d-tax-relief',
    type: 'website',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'R&D Tax Relief Claims UK - Reckonwell',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'R&D Tax Relief Claims UK | Reckonwell',
    description: 'Professional R&D tax relief claims. Get up to 20% of qualifying spend back. From £850.',
    images: ['/assets/images/app_logo.png'],
  },
};
