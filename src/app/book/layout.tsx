import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Book a Discovery Call | Reckonwell',
  description: 'Schedule a 30-minute discovery call with our team. Let\'s discuss your accounting needs and show you how Reckonwell works.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/book`,
  },
  openGraph: {
    title: 'Book a Discovery Call | Reckonwell',
    description: 'Schedule a 30-minute discovery call with our team. Let\'s discuss your accounting needs and show you how Reckonwell works.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/book`,
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'Reckonwell - Book a discovery call',
      },
    ],
  },
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}