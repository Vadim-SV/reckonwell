import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToolPageLayout from '../components/ToolPageLayout';
import CorpTaxClient from './CorpTaxClient';
import { TAX_YEAR, TOOLKIT_META, CORPORATION_TAX } from '@/lib/tax-config';

export const metadata: Metadata = {
  title: `Corporation Tax Calculator ${TAX_YEAR} | Reckonwell`,
  description: `Free UK corporation tax calculator with marginal relief for ${TAX_YEAR}. Includes associated company rules, short period adjustment, and payment deadlines.`,
  alternates: { canonical: 'https://reckonwell.com/toolkit/corporation-tax-calculator' },
  openGraph: {
    title: `Corporation Tax Calculator ${TAX_YEAR} | Reckonwell`,
    description: `Calculate your corporation tax with marginal relief, associated company rules, and payment deadlines for ${TAX_YEAR}.`,
    url: 'https://reckonwell.com/toolkit/corporation-tax-calculator',
    type: 'website',
  },
};

const toolSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: `Corporation Tax Calculator ${TAX_YEAR}`,
  description: `Calculate UK corporation tax with marginal relief for ${TAX_YEAR}`,
  url: 'https://reckonwell.com/toolkit/corporation-tax-calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
  author: { '@type': 'Person', name: TOOLKIT_META.author },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: `What is the corporation tax rate for ${TAX_YEAR}?`, acceptedAnswer: { '@type': 'Answer', text: `Corporation tax is ${CORPORATION_TAX.smallProfitsRate * 100}% on profits up to £${CORPORATION_TAX.lowerLimit.toLocaleString()} and ${CORPORATION_TAX.mainRate * 100}% on profits over £${CORPORATION_TAX.upperLimit.toLocaleString()}. Marginal relief applies between these thresholds.` } },
    { '@type': 'Question', name: 'What is marginal relief for corporation tax?', acceptedAnswer: { '@type': 'Answer', text: `Marginal relief reduces the CT bill for companies with profits between £${CORPORATION_TAX.lowerLimit.toLocaleString()} and £${CORPORATION_TAX.upperLimit.toLocaleString()}. It tapers the effective rate from ${CORPORATION_TAX.smallProfitsRate * 100}% to ${CORPORATION_TAX.mainRate * 100}%.` } },
    { '@type': 'Question', name: 'When is corporation tax due?', acceptedAnswer: { '@type': 'Answer', text: '9 months and 1 day after the end of your accounting period. The CT600 return must be filed within 12 months of the period end.' } },
    { '@type': 'Question', name: 'How do associated companies affect corporation tax?', acceptedAnswer: { '@type': 'Answer', text: `The £${CORPORATION_TAX.lowerLimit.toLocaleString()} and £${CORPORATION_TAX.upperLimit.toLocaleString()} thresholds are divided by the total number of associated companies plus one.` } },
    { '@type': 'Question', name: 'What counts as an associated company?', acceptedAnswer: { '@type': 'Answer', text: 'A company is associated if one controls the other, or both are under common control (usually more than 50% of shares or voting rights). Dormant companies are excluded.' } },
    { '@type': 'Question', name: 'How is CT calculated for a short accounting period?', acceptedAnswer: { '@type': 'Answer', text: 'The £50,000 and £250,000 thresholds are reduced proportionally for short periods. This calculator automatically adjusts for short periods.' } },
  ],
};

export default function CorpTaxPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <ToolPageLayout
        breadcrumbs={[{ label: 'Corporation Tax Calculator' }]}
        relatedTools={[
          { slug: 'salary-vs-dividend-calculator', title: 'Salary vs Dividend Calculator', question: "What's the most tax-efficient way to pay myself?" },
          { slug: 'tax-relief-finder', title: 'Tax Relief Finder', question: 'Which tax reliefs can my business claim?' },
          { slug: 'working-capital-calculator', title: 'Working Capital Calculator', question: 'How much cash is tied up in my business?' },
        ]}
      >
        <div className="py-8">
          <h1 className="font-display mb-4" style={{ fontSize: 'clamp(28px, 5vw, 52px)', lineHeight: 1.1, fontWeight: 400, color: 'var(--foreground)', letterSpacing: '-0.02em' }}>
            Corporation Tax Calculator {TAX_YEAR}
          </h1>
          <p className="font-ui mb-2" style={{ fontSize: '17px', lineHeight: 1.7, color: 'var(--muted)', maxWidth: '600px' }}>
            Calculate how much corporation tax your company will pay, including marginal relief, associated company rules, and payment deadlines.
          </p>
          <p className="font-ui text-xs" style={{ color: 'var(--muted)', fontSize: '11px' }}>
            Rules for tax year {TAX_YEAR} — last reviewed {TOOLKIT_META.lastReviewed}
          </p>
        </div>

        <div className="p-5 mb-8" style={{ background: 'var(--primary-dim)', border: '1px solid var(--border)', borderRadius: '2px', borderLeft: '3px solid var(--primary)' }}>
          <p className="font-ui text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--primary)', fontSize: '10px', letterSpacing: '2px' }}>Quick answer</p>
          <p className="font-ui text-sm" style={{ color: 'var(--body-text)', lineHeight: 1.7 }}>
            Corporation tax for {TAX_YEAR} is <strong>{CORPORATION_TAX.smallProfitsRate * 100}%</strong> on profits up to <strong>£{CORPORATION_TAX.lowerLimit.toLocaleString()}</strong> and <strong>{CORPORATION_TAX.mainRate * 100}%</strong> on profits over <strong>£{CORPORATION_TAX.upperLimit.toLocaleString()}</strong>. Marginal relief tapers the rate between these thresholds. Thresholds are divided by the number of associated companies plus one.
          </p>
        </div>

        <CorpTaxClient />

        <article className="mt-12">
          <h2 className="font-display text-2xl mb-4" style={{ fontWeight: 400, color: 'var(--foreground)' }}>
            How corporation tax works in {TAX_YEAR}
          </h2>
          <p className="font-ui mb-4" style={{ color: 'var(--body-text)', lineHeight: 1.75 }}>
            Corporation tax is charged on a company's taxable profits — broadly, trading income plus investment income minus allowable expenses and capital allowances. The rate depends on the level of profits and the number of associated companies.
          </p>

          <h2 className="font-display text-2xl mb-4" style={{ fontWeight: 400, color: 'var(--foreground)' }}>
            Marginal relief explained
          </h2>
          <p className="font-ui mb-4" style={{ color: 'var(--body-text)', lineHeight: 1.75 }}>
            Marginal relief was reintroduced from April 2023 when the main rate increased to 25%. It prevents a cliff-edge at £50,000 by tapering the effective rate from 19% to 25% as profits rise from £50,000 to £250,000.
          </p>

          <h2 className="font-display text-2xl mb-4" style={{ fontWeight: 400, color: 'var(--foreground)' }}>
            Worked example: £75,000 profit
          </h2>
          <div className="overflow-x-auto mb-6">
            <table className="w-full font-ui text-sm" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th className="text-left py-2 pr-4" style={{ color: 'var(--muted)', fontSize: '11px', fontWeight: 600 }}>Item</th>
                  <th className="text-right py-2" style={{ color: 'var(--muted)', fontSize: '11px', fontWeight: 600 }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Taxable profit', '£75,000'],
                  ['Gross CT at 25%', '£18,750'],
                  ['Marginal relief', '−£3,375'],
                  ['Corporation tax due', '£15,375'],
                  ['Effective rate', '20.5%'],
                ].map(([item, value]) => (
                  <tr key={item} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td className="py-2 pr-4" style={{ color: 'var(--body-text)' }}>{item}</td>
                    <td className="text-right py-2" style={{ color: 'var(--foreground)', fontWeight: item === 'Corporation tax due' ? 600 : 400 }}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <section className="mt-12">
          <h2 className="font-display text-2xl mb-8" style={{ fontWeight: 400, color: 'var(--foreground)' }}>Frequently asked questions</h2>
          <div className="space-y-6">
            {[
              { q: `What is the corporation tax rate for ${TAX_YEAR}?`, a: `${CORPORATION_TAX.smallProfitsRate * 100}% on profits up to £${CORPORATION_TAX.lowerLimit.toLocaleString()}, ${CORPORATION_TAX.mainRate * 100}% on profits over £${CORPORATION_TAX.upperLimit.toLocaleString()}. Marginal relief applies between these thresholds.` },
              { q: 'What is marginal relief for corporation tax?', a: `Marginal relief reduces the CT bill for companies with profits between £${CORPORATION_TAX.lowerLimit.toLocaleString()} and £${CORPORATION_TAX.upperLimit.toLocaleString()}. It tapers the effective rate from ${CORPORATION_TAX.smallProfitsRate * 100}% to ${CORPORATION_TAX.mainRate * 100}%.` },
              { q: 'When is corporation tax due?', a: '9 months and 1 day after the end of your accounting period. The CT600 return must be filed within 12 months of the period end.' },
              { q: 'How do associated companies affect corporation tax?', a: `The £${CORPORATION_TAX.lowerLimit.toLocaleString()} and £${CORPORATION_TAX.upperLimit.toLocaleString()} thresholds are divided by the total number of associated companies plus one.` },
              { q: 'What counts as an associated company?', a: 'A company is associated if one controls the other, or both are under common control (usually more than 50% of shares or voting rights). Dormant companies are excluded.' },
              { q: 'How is CT calculated for a short accounting period?', a: 'The £50,000 and £250,000 thresholds are reduced proportionally for short periods. This calculator automatically adjusts for short periods.' },
            ].map(({ q, a }) => (
              <div key={q} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
                <h3 className="font-display text-lg mb-2" style={{ fontWeight: 400, color: 'var(--foreground)' }}>{q}</h3>
                <p className="font-ui text-sm" style={{ color: 'var(--body-text)', lineHeight: 1.7 }}>{a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 mb-8">
          <h2 className="font-display text-lg mb-4" style={{ fontWeight: 400, color: 'var(--foreground)' }}>Sources</h2>
          <ul className="font-ui text-xs space-y-1" style={{ color: 'var(--muted)', fontSize: '11px' }}>
            <li><a href="https://www.gov.uk/corporation-tax-rates" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--secondary)', textDecoration: 'underline' }}>GOV.UK — Corporation Tax rates</a></li>
            <li><a href="https://www.gov.uk/guidance/corporation-tax-marginal-relief" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--secondary)', textDecoration: 'underline' }}>GOV.UK — Corporation Tax marginal relief</a></li>
            <li><a href="https://www.gov.uk/guidance/corporation-tax-associated-companies" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--secondary)', textDecoration: 'underline' }}>GOV.UK — Corporation Tax associated companies</a></li>
            <li><a href="https://www.gov.uk/pay-corporation-tax" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--secondary)', textDecoration: 'underline' }}>GOV.UK — Pay your Corporation Tax bill</a></li>
          </ul>
        </section>
      </ToolPageLayout>
      <Footer />
    </>
  );
}
