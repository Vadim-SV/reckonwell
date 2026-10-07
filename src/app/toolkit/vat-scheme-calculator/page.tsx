import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToolPageLayout from '@/components/toolkit/ToolPageLayout';
import VATSchemeClient from './VATSchemeClient';
import { getToolBySlug, TOOLS } from '@/lib/toolkit-data';
import { TAX_YEAR, VAT } from '@/lib/tax-config';

const tool = getToolBySlug('vat-scheme-calculator')!;
const relatedTools = TOOLS.filter(t => tool.relatedTools.includes(t.slug));

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: 'https://reckonwell.com/toolkit/vat-scheme-calculator' },
  openGraph: {
    title: tool.metaTitle,
    description: tool.metaDescription,
    url: 'https://reckonwell.com/toolkit/vat-scheme-calculator',
    images: [{ url: '/api/og/vat-scheme-calculator', width: 1200, height: 630, alt: tool.h1 }],
  },
};

const faqs = [
  {
    q: 'What is the VAT registration threshold for 2026/27?',
    a: `The VAT registration threshold is £${VAT.registrationThreshold.toLocaleString('en-GB')} rolling 12-month taxable turnover. You must register within 30 days of exceeding this threshold. You must also register if you expect your turnover to exceed the threshold in the next 30 days alone.`,
  },
  {
    q: 'What is the Flat Rate Scheme?',
    a: 'The Flat Rate Scheme (FRS) lets you pay a fixed percentage of your VAT-inclusive turnover to HMRC, instead of calculating the difference between output and input VAT. The percentage varies by sector (4%–16.5%). It is available to businesses with taxable turnover up to £150,000.',
  },
  {
    q: 'What is a limited cost trader?',
    a: 'A limited cost trader is a business whose VAT-able goods cost less than 2% of VAT-inclusive turnover, or less than £1,000 per year. Limited cost traders must use a flat rate of 16.5% — which usually makes the standard scheme more favourable.',
  },
  {
    q: 'What is the Cash Accounting Scheme?',
    a: 'The Cash Accounting Scheme lets you account for VAT based on when you receive and make payments, rather than when invoices are issued. This improves cash flow if your customers pay slowly, as you do not pay VAT until you have received the money.',
  },
  {
    q: 'Should I register for VAT voluntarily?',
    a: 'Voluntary registration makes sense if your customers are VAT-registered (they can reclaim the VAT you charge) and you have significant VAT-able costs to reclaim. It is usually not beneficial if your customers are consumers, as adding VAT increases your prices.',
  },
  {
    q: 'What is the Annual Accounting Scheme?',
    a: 'The Annual Accounting Scheme lets you make advance payments towards your VAT bill throughout the year, then submit one annual return. It reduces paperwork but does not change the amount of VAT you pay.',
  },
  {
    q: 'Can I switch VAT schemes?',
    a: 'Yes. You can join or leave the Flat Rate Scheme or Cash Accounting Scheme at the start of any VAT period. You must leave the Flat Rate Scheme if your turnover exceeds £230,000 (VAT-inclusive).',
  },
];

const sources = [
  { label: 'GOV.UK — VAT registration', href: 'https://www.gov.uk/vat-registration' },
  { label: 'GOV.UK — VAT Flat Rate Scheme', href: 'https://www.gov.uk/vat-flat-rate-scheme' },
  { label: 'GOV.UK — VAT Cash Accounting Scheme', href: 'https://www.gov.uk/vat-cash-accounting-scheme' },
  { label: 'GOV.UK — VAT Annual Accounting Scheme', href: 'https://www.gov.uk/vat-annual-accounting-scheme' },
  { label: 'GOV.UK — VAT flat rates by sector', href: 'https://www.gov.uk/vat-flat-rate-scheme/how-much-you-pay' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: tool.h1,
  description: tool.metaDescription,
  url: 'https://reckonwell.com/toolkit/vat-scheme-calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
};

export default function VATSchemePage() {
  return (
    <>
      <Header />
      <ToolPageLayout
        toolSlug="vat-scheme-calculator"
        toolTitle={tool.title}
        relatedTools={relatedTools}
        faqs={faqs}
        sources={sources}
        disclaimer="Estimates for guidance only — not tax advice. VAT scheme suitability depends on your specific circumstances. Consult a qualified accountant before making VAT scheme decisions."
        jsonLd={jsonLd}
      >
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl mt-6 mb-3 leading-tight" style={{ color: 'var(--foreground)' }}>
          {tool.h1}
        </h1>
        <p className="text-base mb-8 max-w-2xl" style={{ color: 'var(--muted)' }}>
          Enter your turnover and costs to check whether you need to register for VAT and compare the standard, Flat Rate, and Cash Accounting schemes for {TAX_YEAR}.
        </p>

        <div className="p-5 rounded-lg border mb-8 max-w-2xl" style={{ borderColor: 'var(--primary)', background: 'rgba(var(--primary-rgb, 24,33,62),0.04)' }}>
          <p className="font-ui text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--primary)', letterSpacing: '1.5px' }}>Quick answer</p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>
            You must register for VAT if your rolling 12-month taxable turnover exceeds £{VAT.registrationThreshold.toLocaleString('en-GB')}. The Flat Rate Scheme can save service businesses money — but not if you are a limited cost trader (goods cost &lt;2% of turnover), in which case the 16.5% rate usually makes standard accounting better.
          </p>
        </div>

        <VATSchemeClient />

        <article className="max-w-3xl mt-16">
          <h2 className="font-display text-2xl mb-4" style={{ color: 'var(--foreground)' }}>VAT registration: when and how</h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            You must register for VAT within 30 days of the end of the month in which your rolling 12-month taxable turnover first exceeds £{VAT.registrationThreshold.toLocaleString('en-GB')}. You must also register immediately if you expect your turnover in the next 30 days alone to exceed the threshold.
          </p>
          <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            Failure to register on time results in a penalty based on the VAT you should have charged. HMRC can backdate registration to the date you should have registered.
          </p>

          <h2 className="font-display text-2xl mb-4 mt-8" style={{ color: 'var(--foreground)' }}>Comparing the three main VAT schemes</h2>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th className="text-left py-2 pr-4 font-semibold" style={{ color: 'var(--foreground)' }}>Scheme</th>
                  <th className="text-left py-2 pr-4 font-semibold" style={{ color: 'var(--foreground)' }}>How it works</th>
                  <th className="text-left py-2 font-semibold" style={{ color: 'var(--foreground)' }}>Best for</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Standard accounting', 'Output VAT minus input VAT, quarterly returns', 'Businesses with significant VAT-able costs'],
                  ['Flat Rate Scheme', 'Fixed % of VAT-inclusive turnover, no input VAT recovery', 'Service businesses with low costs'],
                  ['Cash Accounting', 'VAT based on payments received/made, not invoices', 'Businesses with slow-paying customers'],
                  ['Annual Accounting', 'Advance payments, one annual return', 'Businesses wanting less admin'],
                ].map(([scheme, how, best]) => (
                  <tr key={scheme} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td className="py-2 pr-4 font-medium" style={{ color: 'var(--foreground)' }}>{scheme}</td>
                    <td className="py-2 pr-4" style={{ color: 'var(--muted)' }}>{how}</td>
                    <td className="py-2" style={{ color: 'var(--muted)' }}>{best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="font-display text-2xl mb-4 mt-8" style={{ color: 'var(--foreground)' }}>The limited cost trader trap</h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            When the Flat Rate Scheme was introduced, some businesses (particularly IT contractors and consultants) were using it to generate a profit — paying a low flat rate while charging 20% VAT. HMRC introduced the limited cost trader rate of 16.5% to close this loophole.
          </p>
          <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            If your goods cost less than 2% of your VAT-inclusive turnover (or less than £1,000 per year), you are a limited cost trader and must use the 16.5% rate. At this rate, the Flat Rate Scheme is almost never beneficial — standard accounting will usually be cheaper.
          </p>
        </article>
      </ToolPageLayout>
      <Footer />
    </>
  );
}
