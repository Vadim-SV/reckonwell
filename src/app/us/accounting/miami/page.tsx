import type { Metadata } from 'next';
import USCityPageClient from '../_components/USCityPageClient';

export const metadata: Metadata = {
  title: 'Bookkeeping & Finance Operations in Miami | Reckonwell',
  description: 'Daily bookkeeping and finance operations for Miami-based founders. Florida has no state income tax — but sales tax nexus matters for e-commerce and remote sellers. From $300/month.',
  alternates: {
    canonical: 'https://reckonwell.com/us/accounting/miami',
    languages: { 'en-US': 'https://reckonwell.com/us/accounting/miami' },
  },
};

const cityData = {
  city: 'Miami',
  state: 'Florida',
  slug: 'miami',
  stateContext: {
    headline: 'Florida Has No State Income Tax — But Sales Tax Nexus Matters',
    body: [
      'Florida is one of nine states with no personal state income tax, making Miami an increasingly popular destination for founders and remote workers from higher-tax states. For business owners, this is a genuine financial advantage — but it does not eliminate all state tax obligations.',
      'Florida imposes a 6% state sales tax, with many counties adding a discretionary surtax of 0.5%–2.5%. For e-commerce businesses and remote sellers, economic nexus rules mean you may owe Florida sales tax even if you\'re not physically located there — and vice versa, if you\'re based in Miami and selling to customers in other states, you may have nexus obligations in those states too.',
      'Miami-based founders in e-commerce, SaaS, or professional services particularly benefit from clean, daily bookkeeping: accurate revenue tracking by state makes sales tax nexus analysis straightforward and prevents costly surprises at audit time.',
    ],
    callout: 'Sales tax nexus across states is a CPA conversation — we make sure your revenue data is clean and organised so that conversation is productive.',
  },
  description: 'Miami\'s business community spans finance, tech, real estate, and international trade. Daily bookkeeping gives Miami founders the financial clarity to operate across markets without losing track of what\'s happening in their own accounts.',
};

export default function MiamiPage() {
  return <USCityPageClient {...cityData} />;
}
