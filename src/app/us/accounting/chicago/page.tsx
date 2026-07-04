import type { Metadata } from 'next';
import USCityPageClient from '../_components/USCityPageClient';

export const metadata: Metadata = {
  title: 'Bookkeeping & Finance Operations in Chicago | Reckonwell',
  description: 'Daily bookkeeping and finance operations for Chicago-based founders. Illinois flat income tax plus Chicago-specific business taxes. From $300/month.',
  alternates: {
    canonical: 'https://reckonwell.com/us/accounting/chicago',
    languages: { 'en-US': 'https://reckonwell.com/us/accounting/chicago' },
  },
};

const cityData = {
  city: 'Chicago',
  state: 'Illinois',
  slug: 'chicago',
  stateContext: {
    headline: 'Illinois Flat Tax Plus Chicago-Specific Business Taxes',
    body: [
      'Illinois imposes a flat state income tax rate of 4.95% on individuals and 9.5% on corporations (including a 7% corporate income tax plus a 2.5% personal property replacement tax). The corporate rate is among the higher flat rates in the US, which makes accurate profit tracking and tax planning particularly important for Chicago-based businesses.',
      'Chicago adds its own layer of business taxes. The Chicago Personal Property Lease Transaction Tax (PPLT) applies to businesses that lease personal property — including cloud software subscriptions and SaaS tools used in Chicago. If your business uses cloud-based software, you may owe this tax. The rate is 9% on qualifying leases. This is a frequently overlooked obligation for tech-enabled businesses.',
      'Chicago also has a higher combined sales tax rate (approximately 10.25% in the city) compared to the rest of Illinois. For businesses selling taxable goods or services in Chicago, accurate revenue tracking by location is essential.',
    ],
    callout: 'Chicago\'s PPLT on cloud software is a common blind spot for tech-enabled businesses. Your CPA can advise — we make sure your books give them the data they need.',
  },
  description: 'Chicago is one of the US\'s largest business hubs, spanning finance, logistics, manufacturing, and tech. Daily bookkeeping gives Chicago founders the financial clarity to operate in a complex tax environment without surprises.',
};

export default function ChicagoPage() {
  return <USCityPageClient {...cityData} />;
}
