import type { Metadata } from 'next';
import USCityPageClient from '../_components/USCityPageClient';

export const metadata: Metadata = {
  title: 'Bookkeeping & Finance Operations in Dallas | Reckonwell',
  description: 'Daily bookkeeping and finance operations for Dallas-based founders. Texas has no state income tax — but franchise tax obligations still apply. From $300/month.',
  alternates: {
    canonical: 'https://reckonwell.com/us/accounting/dallas',
    languages: { 'en-US': 'https://reckonwell.com/us/accounting/dallas' },
  },
};

const cityData = {
  city: 'Dallas',
  state: 'Texas',
  slug: 'dallas',
  stateContext: {
    headline: 'Texas Has No State Income Tax — But Franchise Tax Still Applies',
    body: [
      'Texas is one of nine states with no personal state income tax, making Dallas a popular destination for founders and businesses relocating from high-tax states like California or New York. But no income tax does not mean no state tax obligations.',
      'Texas imposes a franchise tax — also called the margin tax — on most entities doing business in the state. The standard rate is 0.75% of taxable margin (0.375% for qualifying wholesalers and retailers). Businesses with annual revenue below the No Tax Due threshold (currently $2.47 million for 2024) are exempt from payment but must still file a No Tax Due report with the Texas Comptroller each year.',
      'For Dallas-based founders, the practical implication is straightforward: your CPA needs accurate, up-to-date revenue and expense records to calculate your taxable margin correctly. Reckonwell keeps your books current every day — so when franchise tax season arrives, your CPA has everything they need without a last-minute scramble.',
    ],
    callout: 'Texas franchise tax is calculated on your business\'s taxable margin, not net income. Clean books make the calculation straightforward — and that\'s exactly what we provide.',
  },
  description: 'Dallas is one of the largest business hubs in the US, home to a dense concentration of founder-led companies across finance, tech, logistics, and professional services. Clean daily books give you the clarity to grow without financial surprises.',
};

export default function DallasPage() {
  return <USCityPageClient {...cityData} />;
}
