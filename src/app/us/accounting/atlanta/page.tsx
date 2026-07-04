import type { Metadata } from 'next';
import USCityPageClient from '../_components/USCityPageClient';

export const metadata: Metadata = {
  title: 'Bookkeeping & Finance Operations in Atlanta | Reckonwell',
  description: 'Daily bookkeeping and finance operations for Atlanta-based founders. Georgia\'s tax structure and logistics hub relevance for e-commerce businesses. From $300/month.',
  alternates: {
    canonical: 'https://reckonwell.com/us/accounting/atlanta',
    languages: { 'en-US': 'https://reckonwell.com/us/accounting/atlanta' },
  },
};

const cityData = {
  city: 'Atlanta',
  state: 'Georgia',
  slug: 'atlanta',
  stateContext: {
    headline: "Georgia\'s Tax Structure and Atlanta\'s E-Commerce Advantage",
    body: [
      'Georgia imposes a flat state income tax rate of 5.49% (as of 2024, on a path to reduce to 4.99% by 2029 under current legislation). For business owners, this predictable flat rate makes income tax planning more straightforward than in states with progressive brackets.',
      'Atlanta is a major logistics and distribution hub — home to Hartsfield-Jackson, one of the world\'s busiest airports, and a central node in the Southeast\'s supply chain network. For e-commerce businesses, this geographic advantage comes with important financial considerations: Georgia\'s economic nexus threshold for sales tax is $100,000 in annual sales or 200 transactions. If you\'re shipping product through or from Atlanta, accurate revenue and transaction tracking is essential.',
      'Georgia also has a 4% state sales tax, with Atlanta adding local taxes that bring the combined rate to approximately 8.9%. For product-based businesses, clean books that track sales by jurisdiction make sales tax compliance significantly less painful.',
    ],
    callout: 'Atlanta\'s logistics advantages make it a natural home for e-commerce businesses — which makes accurate revenue and inventory tracking especially important.',
  },
  description: 'Atlanta is one of the Southeast\'s fastest-growing business cities, with a strong presence in tech, media, logistics, and professional services. Daily bookkeeping gives Atlanta founders the financial clarity to scale without losing track of their numbers.',
};

export default function AtlantaPage() {
  return <USCityPageClient {...cityData} />;
}
