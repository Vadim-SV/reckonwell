import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Partner Program | Reckonwell',
  description: 'Earn recurring 10% commission for every referral. Refer once, earn forever with Reckonwell\'s partner program.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/referrals`,
  },
  openGraph: {
    title: 'Partner Program | Reckonwell',
    description: 'Earn recurring 10% commission for every referral. Refer once, earn forever with Reckonwell\'s partner program.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/referrals`,
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'Reckonwell Partner Program - Earn recurring commissions',
      },
    ],
  },
};

export default function ReferralsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}