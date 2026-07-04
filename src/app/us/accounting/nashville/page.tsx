import type { Metadata } from 'next';
import USCityPageClient from '../_components/USCityPageClient';

export const metadata: Metadata = {
  title: 'Bookkeeping & Finance Operations in Nashville | Reckonwell',
  description: 'Daily bookkeeping and finance operations for Nashville-based founders. Tennessee has no state income tax on wages — and the Hall Tax is now fully repealed. From $300/month.',
  alternates: {
    canonical: 'https://reckonwell.com/us/accounting/nashville',
    languages: { 'en-US': 'https://reckonwell.com/us/accounting/nashville' },
  },
};

const cityData = {
  city: 'Nashville',
  state: 'Tennessee',
  slug: 'nashville',
  stateContext: {
    headline: 'Tennessee Has No State Income Tax on Wages — Hall Tax Fully Repealed',
    body: [
      'Tennessee is one of nine states with no state income tax on wages or salaries. For founders paying themselves a salary from their business, this is a meaningful advantage — particularly for those relocating from higher-tax states.',
      'Tennessee previously imposed the Hall Income Tax on investment income (dividends and interest), but this was fully repealed effective January 1, 2021. Tennessee residents now pay zero state income tax on wages, salaries, and investment income.',
      'Tennessee does impose a 7% state sales tax — one of the highest base rates in the country — plus local taxes that can bring the combined rate to 9.75% or higher in Nashville. For businesses selling taxable goods or services, accurate sales tracking is essential. Tennessee also has a franchise and excise tax on businesses operating in the state, calculated on the greater of net earnings or net worth.',
    ],
    callout: 'Tennessee\'s zero income tax on wages is a genuine advantage — but the franchise and excise tax still applies to most businesses. Your CPA handles filing; we keep your books clean.',
  },
  description: 'Nashville\'s business community has expanded well beyond music and entertainment into healthcare, tech, and professional services. Daily bookkeeping gives Nashville founders the financial clarity to grow in one of the South\'s most dynamic cities.',
};

export default function NashvillePage() {
  return <USCityPageClient {...cityData} />;
}
