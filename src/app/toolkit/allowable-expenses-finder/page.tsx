import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToolPageLayout from '@/components/toolkit/ToolPageLayout';
import ExpensesClient from './ExpensesClient';
import { getToolBySlug, TOOLS, PROFESSIONS, CLAIM_ITEMS } from '@/lib/toolkit-data';
import { TAX_YEAR } from '@/lib/tax-config';

const tool = getToolBySlug('allowable-expenses-finder')!;
const relatedTools = TOOLS.filter(t => tool.relatedTools.includes(t.slug));

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: 'https://reckonwell.com/toolkit/allowable-expenses-finder' },
  openGraph: {
    title: tool.metaTitle,
    description: tool.metaDescription,
    url: 'https://reckonwell.com/toolkit/allowable-expenses-finder',
    images: [{ url: '/api/og/allowable-expenses-finder', width: 1200, height: 630, alt: tool.h1 }],
  },
};

const faqs = [
  { q: 'What expenses can I claim as a sole trader?', a: 'You can claim any expense that is wholly and exclusively for business purposes. Common examples include office costs, travel, equipment, professional fees, marketing, and training. Personal expenses are not allowable.' },
  { q: 'What is the difference between allowable expenses for sole traders and limited companies?', a: 'The rules are broadly similar, but limited companies can provide certain benefits to directors (like one mobile phone) without a benefit-in-kind charge. Sole traders cannot claim expenses that are partly personal without apportioning them.' },
  { q: 'Can I claim my home office as a sole trader?', a: 'Yes. You can use simplified expenses (£10–£26/month depending on hours worked) or calculate actual costs (proportion of rent, utilities, council tax). The simplified method is easier and avoids CGT complications.' },
  { q: 'What is the mileage rate for 2026/27?', a: '45p per mile for the first 10,000 business miles, 25p per mile thereafter. Motorcycles: 24p. Bicycles: 20p.' },
  { q: 'Can I claim clothing for work?', a: 'Only protective clothing, uniforms with a logo, and specialist workwear (e.g. chef whites, hi-vis). Ordinary clothing is not allowable even if worn only for work.' },
  { q: 'Can I claim client entertainment?', a: 'No. Client entertaining (meals, events, gifts over £50) is not deductible for income tax or corporation tax purposes.' },
  { q: 'What are simplified expenses?', a: 'Simplified expenses are flat-rate deductions for working from home, using your own vehicle, and living at your business premises. They are available to sole traders and partnerships (not limited companies).' },
  { q: 'Can I claim pre-trading expenses?', a: 'Yes. Expenses incurred up to 7 years before you started trading can be claimed as if they were incurred on the first day of trading.' },
];

const sources = [
  { label: 'GOV.UK — Expenses if you\'re self-employed', href: 'https://www.gov.uk/expenses-if-youre-self-employed' },
  { label: 'GOV.UK — Simplified expenses if you\'re self-employed', href: 'https://www.gov.uk/simpler-income-tax-simplified-expenses' },
  { label: 'GOV.UK — Expenses and benefits: a to z', href: 'https://www.gov.uk/expenses-and-benefits-a-to-z' },
  { label: 'GOV.UK — Mileage allowance payments', href: 'https://www.gov.uk/expenses-and-benefits-business-travel-mileage' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: tool.h1,
  description: tool.metaDescription,
  url: 'https://reckonwell.com/toolkit/allowable-expenses-finder',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
};

export default function ExpensesPage() {
  return (
    <>
      <Header />
      <ToolPageLayout
        toolSlug="allowable-expenses-finder"
        toolTitle={tool.title}
        relatedTools={relatedTools}
        faqs={faqs}
        sources={sources}
        disclaimer="Estimates for guidance only — not tax advice. Allowability depends on your specific circumstances. Consult a qualified tax adviser before making claims."
        jsonLd={jsonLd}
      >
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl mt-6 mb-3 leading-tight" style={{ color: 'var(--foreground)' }}>
          {tool.h1}
        </h1>
        <p className="text-base mb-8 max-w-2xl" style={{ color: 'var(--muted)' }}>
          Select your business structure and profession to get a tailored checklist of claimable expenses, items commonly missed, and items that are not allowed.
        </p>

        <div className="p-5 rounded-lg border mb-8 max-w-2xl" style={{ borderColor: 'var(--primary)', background: 'rgba(var(--primary-rgb, 24,33,62),0.04)' }}>
          <p className="font-ui text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--primary)', letterSpacing: '1.5px' }}>Quick answer</p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>
            You can claim any expense that is wholly and exclusively for business purposes. Common expenses include office costs, equipment, travel, professional fees, and training. Personal expenses are not allowable. Use the finder below for a tailored list for your profession.
          </p>
        </div>

        <ExpensesClient professions={PROFESSIONS} claimItems={CLAIM_ITEMS} />

        <article className="max-w-3xl mt-16">
          <h2 className="font-display text-2xl mb-4" style={{ color: 'var(--foreground)' }}>The golden rule: wholly and exclusively</h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            For sole traders, an expense must be incurred "wholly and exclusively" for business purposes to be deductible. If an expense has both business and personal elements, you can only claim the business proportion — unless the two elements are genuinely inseparable.
          </p>
          <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            For limited companies, the test is slightly different: expenses must be incurred "wholly and exclusively" for the purposes of the trade. Expenses with a personal element may create a benefit-in-kind for the director.
          </p>

          <h2 className="font-display text-2xl mb-4 mt-8" style={{ color: 'var(--foreground)' }}>Simplified expenses vs actual costs</h2>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th className="text-left py-2 pr-4 font-semibold" style={{ color: 'var(--foreground)' }}>Expense</th>
                  <th className="text-left py-2 pr-4 font-semibold" style={{ color: 'var(--foreground)' }}>Simplified rate</th>
                  <th className="text-left py-2 pr-4 font-semibold" style={{ color: 'var(--foreground)' }}>When to use actual costs</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Working from home (25–50 hrs/month)', '£18/month', 'If actual costs are higher'],
                  ['Working from home (50+ hrs/month)', '£26/month', 'If actual costs are higher'],
                  ['Car (first 10,000 miles)', '45p/mile', 'If you have a high-cost vehicle'],
                  ['Car (over 10,000 miles)', '25p/mile', 'Rarely — mileage rate usually better'],
                  ['Motorcycle', '24p/mile', 'If actual costs are higher'],
                ].map(([expense, rate, when]) => (
                  <tr key={expense} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td className="py-2 pr-4" style={{ color: 'var(--muted)' }}>{expense}</td>
                    <td className="py-2 pr-4 font-medium" style={{ color: 'var(--foreground)' }}>{rate}</td>
                    <td className="py-2 pr-4" style={{ color: 'var(--muted)' }}>{when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </ToolPageLayout>
      <Footer />
    </>
  );
}
