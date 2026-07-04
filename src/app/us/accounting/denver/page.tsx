import type { Metadata } from 'next';
import USCityPageClient from '../_components/USCityPageClient';

export const metadata: Metadata = {
  title: 'Bookkeeping & Finance Operations in Denver | Reckonwell',
  description: 'Daily bookkeeping and finance operations for Denver-based founders. Colorado has a flat 4.4% state income tax rate. From $300/month.',
  alternates: {
    canonical: 'https://reckonwell.com/us/accounting/denver',
    languages: { 'en-US': 'https://reckonwell.com/us/accounting/denver' },
  },
};

const cityData = {
  city: 'Denver',
  state: 'Colorado',
  slug: 'denver',
  stateContext: {
    headline: "Colorado's Flat 4.4% State Income Tax Rate",
    body: [
      'Colorado uses a flat state income tax rate of 4.4% (as of 2024) on taxable income for both individuals and C-corporations. Unlike states with progressive brackets, Colorado\'s flat rate means your marginal rate is the same whether you\'re earning $50,000 or $5 million — which simplifies planning but does not eliminate the need for accurate records.',
      'Denver businesses also need to be aware of the Denver Occupational Privilege Tax (OPT), a local tax that applies to employees and self-employed individuals working in Denver. The employee rate is $5.75/month; the employer rate is $4/month per employee. Small but worth tracking accurately in payroll.',
      'Colorado also has a state sales tax of 2.9%, with Denver adding a combined local rate that brings the total to around 8.81%. For product-based businesses, accurate sales tracking by jurisdiction is essential for correct sales tax remittance.',
    ],
    callout: 'Colorado\'s flat tax rate makes planning more predictable — but accurate books are still essential for your CPA to file correctly.',
  },
  description: 'Denver\'s startup and outdoor-industry ecosystem is growing fast. Whether you\'re in tech, outdoor retail, or professional services, daily bookkeeping keeps your finances as clear as the Colorado sky.',
};

export default function DenverPage() {
  return <USCityPageClient {...cityData} />;
}
