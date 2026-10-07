import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToolPageLayout from '@/components/toolkit/ToolPageLayout';
import WorkingCapitalClient from './WorkingCapitalClient';
import { getToolBySlug, TOOLS } from '@/lib/toolkit-data';


const tool = getToolBySlug('working-capital-calculator')!;
const relatedTools = TOOLS.filter(t => tool.relatedTools.includes(t.slug));

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: 'https://reckonwell.com/toolkit/working-capital-calculator' },
  openGraph: {
    title: tool.metaTitle,
    description: tool.metaDescription,
    url: 'https://reckonwell.com/toolkit/working-capital-calculator',
    images: [{ url: '/api/og/working-capital-calculator', width: 1200, height: 630, alt: tool.h1 }],
  },
};

const faqs = [
  {
    q: 'What is working capital?',
    a: 'Working capital is the difference between your current assets (debtors, stock, cash) and current liabilities (creditors, short-term debt). Positive working capital means you have enough short-term assets to cover short-term obligations.',
  },
  {
    q: 'What is a good current ratio for a UK SME?',
    a: 'A current ratio between 1.5 and 3.0 is generally considered healthy. Below 1.0 means current liabilities exceed current assets, which can indicate liquidity risk. Above 3.0 may suggest excess idle cash or slow-moving stock.',
  },
  {
    q: 'What is the cash conversion cycle?',
    a: 'The cash conversion cycle (CCC) measures how long it takes to convert your investment in stock and debtors into cash. CCC = Debtor days + Stock days − Creditor days. A shorter CCC means cash flows back to you faster.',
  },
  {
    q: 'How can I reduce my debtor days?',
    a: 'Common approaches include: issuing invoices immediately on delivery, offering early payment discounts, using direct debit or automated payment collection, chasing overdue invoices promptly, and considering invoice financing for large debtors.',
  },
  {
    q: 'What is a good debtor days figure?',
    a: 'For most UK SMEs, 30 days or fewer is the target. If your payment terms are 30 days and customers are paying in 45–60 days, that is a credit control problem worth addressing.',
  },
  {
    q: 'How do I improve my creditor days without damaging supplier relationships?',
    a: 'Negotiate longer payment terms upfront — many suppliers will agree to 45 or 60 days for reliable customers. Use the full terms you have agreed. Avoid paying early unless you receive a meaningful early payment discount.',
  },
  {
    q: 'What is the difference between working capital and cash flow?',
    a: 'Working capital is a balance sheet measure (assets minus liabilities at a point in time). Cash flow is a movement measure (cash in minus cash out over a period). A business can be profitable but cash-flow negative if working capital is poorly managed.',
  },
];

const sources = [
  { label: 'GOV.UK — Business finance and support', href: 'https://www.gov.uk/business-finance-support' },
  { label: 'GOV.UK — Late payment of commercial debts', href: 'https://www.gov.uk/late-commercial-payments-interest-debt-recovery' },
  { label: 'British Business Bank — Working capital guide', href: 'https://www.british-business-bank.co.uk/finance-hub/business-guidance/managing-your-business/working-capital/' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: tool.h1,
  description: tool.metaDescription,
  url: 'https://reckonwell.com/toolkit/working-capital-calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
};

export default function WorkingCapitalPage() {
  return (
    <>
      <Header />
      <ToolPageLayout
        toolSlug="working-capital-calculator"
        toolTitle={tool.title}
        relatedTools={relatedTools}
        faqs={faqs}
        sources={sources}
        disclaimer="Estimates for guidance only — not financial advice. Working capital ratios and benchmarks are indicative. Consult a qualified accountant or CFO for advice tailored to your business."
        jsonLd={jsonLd}
      >
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl mt-6 mb-3 leading-tight" style={{ color: 'var(--foreground)' }}>
          {tool.h1}
        </h1>
        <p className="text-base mb-8 max-w-2xl" style={{ color: 'var(--muted)' }}>
          Enter your balance sheet figures to calculate working capital, key ratios, and your cash conversion cycle. Use the what-if sliders to see how much cash you could free up.
        </p>

        <div className="p-5 rounded-lg border mb-8 max-w-2xl" style={{ borderColor: 'var(--primary)', background: 'rgba(var(--primary-rgb, 24,33,62),0.04)' }}>
          <p className="font-ui text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--primary)', letterSpacing: '1.5px' }}>Quick answer</p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>
            Most UK SMEs have 30–90 days of cash tied up in their working capital cycle. Reducing debtor days from 60 to 30 on £1.2m revenue frees up approximately £98,000 in cash — without borrowing a penny.
          </p>
        </div>

        <WorkingCapitalClient />

        <article className="max-w-3xl mt-16">
          <h2 className="font-display text-2xl mb-4" style={{ color: 'var(--foreground)' }}>What is working capital and why does it matter?</h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            Working capital is the lifeblood of a trading business. It represents the cash tied up in your day-to-day operations — money owed by customers, stock sitting in your warehouse, and money you owe to suppliers. Managing it well is often the difference between a business that grows confidently and one that is constantly scrambling for cash.
          </p>
          <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            Many profitable businesses run into cash flow problems not because they are losing money, but because their working capital cycle is too long. A business with 60-day debtor days and 20-day creditor days is effectively lending money to its customers while paying its suppliers quickly — a recipe for cash pressure even at healthy margins.
          </p>

          <h2 className="font-display text-2xl mb-4 mt-8" style={{ color: 'var(--foreground)' }}>The cash conversion cycle explained</h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            The cash conversion cycle (CCC) measures how long it takes from spending cash (buying stock or paying staff) to receiving cash (collecting from customers). The formula is:
          </p>
          <div className="p-4 rounded-lg border mb-4 text-sm font-mono" style={{ borderColor: 'var(--border)', background: 'var(--surface, var(--background))', color: 'var(--foreground)' }}>
            CCC = Debtor days + Stock days − Creditor days
          </div>
          <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            A CCC of 45 days means you need to fund 45 days of operations from your own cash. Reducing it to 20 days on £1.2m revenue would free up approximately £82,000 in cash.
          </p>

          <h2 className="font-display text-2xl mb-4 mt-8" style={{ color: 'var(--foreground)' }}>Working capital benchmarks for UK SMEs</h2>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th className="text-left py-2 pr-4 font-semibold" style={{ color: 'var(--foreground)' }}>Metric</th>
                  <th className="text-left py-2 pr-4 font-semibold" style={{ color: 'var(--foreground)' }}>Healthy range</th>
                  <th className="text-left py-2 pr-4 font-semibold" style={{ color: 'var(--foreground)' }}>Warning sign</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Current ratio', '1.5 – 3.0', 'Below 1.0'],
                  ['Quick ratio', '≥ 1.0', 'Below 0.8'],
                  ['Debtor days', '≤ 30 days', 'Over 45 days'],
                  ['Stock days', '≤ 30 days', 'Over 60 days'],
                  ['Creditor days', '≥ 45 days', 'Under 20 days'],
                  ['Cash conversion cycle', '≤ 30 days', 'Over 60 days'],
                ].map(([metric, healthy, warning]) => (
                  <tr key={metric} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td className="py-2 pr-4 font-medium" style={{ color: 'var(--foreground)' }}>{metric}</td>
                    <td className="py-2 pr-4" style={{ color: '#2D6A4F' }}>{healthy}</td>
                    <td className="py-2 pr-4" style={{ color: '#b43232' }}>{warning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="font-display text-2xl mb-4 mt-8" style={{ color: 'var(--foreground)' }}>Three levers to free up cash</h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            <strong>1. Reduce debtor days.</strong> Invoice immediately, offer direct debit, follow up overdue invoices within 24 hours of the due date. Consider invoice financing if you have large, slow-paying customers.
          </p>
          <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            <strong>2. Reduce stock days.</strong> Review slow-moving lines, improve demand forecasting, and negotiate just-in-time delivery with suppliers. Every day of stock reduction frees up cash equal to your daily cost of sales.
          </p>
          <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            <strong>3. Extend creditor days.</strong> Negotiate 45- or 60-day payment terms with suppliers. Use the full terms you have agreed — paying early is effectively lending money to your suppliers at 0% interest.
          </p>
        </article>
      </ToolPageLayout>
      <Footer />
    </>
  );
}
