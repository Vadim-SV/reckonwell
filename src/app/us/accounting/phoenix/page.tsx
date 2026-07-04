import type { Metadata } from 'next';
import USCityPageClient from '../_components/USCityPageClient';

export const metadata: Metadata = {
  title: 'Bookkeeping & Finance Operations in Phoenix | Reckonwell',
  description: 'Daily bookkeeping and finance operations for Phoenix-based founders. Arizona has a flat state income tax rate — straightforward to plan for with clean books. From $300/month.',
  alternates: {
    canonical: 'https://reckonwell.com/us/accounting/phoenix',
    languages: { 'en-US': 'https://reckonwell.com/us/accounting/phoenix' },
  },
};

const cityData = {
  city: 'Phoenix',
  state: 'Arizona',
  slug: 'phoenix',
  stateContext: {
    headline: 'Arizona\'s Flat Income Tax — Simple in Structure, Important in Practice',
    body: [
      'Arizona moved to a flat state income tax rate of 2.5% for all individuals and pass-through business income, effective from the 2023 tax year. This replaced a tiered bracket system and makes Arizona one of the more straightforward states for tax planning — but straightforward does not mean zero work.',
      'For Phoenix-based founders operating as sole proprietors, S-corps, or partnerships, business income flows through to personal returns and is subject to Arizona\'s flat rate. C-corporations pay Arizona\'s corporate income tax rate of 4.9%. Arizona also has a transaction privilege tax (TPT) — the state\'s version of a sales tax — which applies to businesses selling goods or certain services in the state. If your business has nexus in Arizona, TPT registration and filing obligations apply.',
      'The flat rate makes income tax projections predictable, but accurate projections still depend on clean, current books. Reckonwell keeps your financials up to date every day, so your CPA can calculate estimated payments and year-end liability without working from incomplete data.',
    ],
    callout: 'Arizona\'s flat 2.5% income tax rate is one of the lowest in the country — but only your CPA can advise on your specific liability. We make sure your books are ready when they need them.',
  },
  description: 'Phoenix is one of the fastest-growing cities in the US, with a thriving ecosystem of founder-led businesses across real estate, technology, healthcare, and professional services. Clean daily books give you the financial clarity to scale without surprises.',
};

export default function PhoenixPage() {
  return <USCityPageClient {...cityData} />;
}
