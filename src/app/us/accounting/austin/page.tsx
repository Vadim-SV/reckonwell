import type { Metadata } from 'next';
import USCityPageClient from '../_components/USCityPageClient';

export const metadata: Metadata = {
  title: 'Bookkeeping & Finance Operations in Austin | Reckonwell',
  description: 'Daily bookkeeping and finance operations for Austin-based founders. Texas has no state income tax — but franchise tax obligations still apply. From $300/month.',
  alternates: {
    canonical: 'https://reckonwell.com/us/accounting/austin',
    languages: { 'en-US': 'https://reckonwell.com/us/accounting/austin' },
  },
};

const cityData = {
  city: 'Austin',
  state: 'Texas',
  slug: 'austin',
  stateContext: {
    headline: 'Texas Has No State Income Tax — But Franchise Tax Still Applies',
    body: [
      'Texas is one of nine states with no personal state income tax, which makes it attractive for founders relocating from high-tax states like California. However, this does not mean zero state tax obligations.',
      'Texas imposes a franchise tax (also called the margin tax) on most businesses operating in the state. The rate is generally 0.75% of taxable margin for most businesses, or 0.375% for qualifying wholesalers and retailers. Businesses with annual revenue under $2.47 million (2024 threshold) typically owe no franchise tax, but must still file a No Tax Due report.',
      'For Austin-based founders: clean, well-organised books make franchise tax calculations straightforward and give your CPA the data they need to file accurately. That is exactly what Reckonwell provides — daily bookkeeping so your numbers are always current, not scrambled together at year-end.',
    ],
    callout: 'Texas franchise tax is separate from federal income tax. Your CPA handles filing — we make sure your books are ready.',
  },
  description: 'Austin is one of the fastest-growing startup ecosystems in the US. Whether you\'re in tech, e-commerce, or professional services, clean daily books give you the clarity to grow without financial surprises.',
};

export default function AustinPage() {
  return <USCityPageClient {...cityData} />;
}
