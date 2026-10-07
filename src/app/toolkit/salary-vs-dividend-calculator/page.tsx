import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToolPageLayout from '../components/ToolPageLayout';
import SalaryDividendClient from './SalaryDividendClient';
import { TAX_YEAR, TOOLKIT_META, INCOME_TAX, DIVIDEND_TAX, CORPORATION_TAX } from '@/lib/tax-config';
import { NATIONAL_INSURANCE } from '@/lib/tax-config';

export const metadata: Metadata = {
  title: `Salary vs Dividend Calculator ${TAX_YEAR} | Reckonwell`,
  description: `Free salary vs dividend calculator for UK limited company directors. Find the optimal pay structure for ${TAX_YEAR}. No sign-up required.`,
  alternates: { canonical: 'https://reckonwell.com/toolkit/salary-vs-dividend-calculator' },
  robots: { index: true, follow: true },
  openGraph: {
    title: `Salary vs Dividend Calculator ${TAX_YEAR} | Reckonwell`,
    description: `Find the most tax-efficient way to pay yourself from your limited company in ${TAX_YEAR}. Free, no sign-up.`,
    url: 'https://reckonwell.com/toolkit/salary-vs-dividend-calculator',
    type: 'website',
  },
};

const toolSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: `Salary vs Dividend Calculator ${TAX_YEAR}`,
  description: `Calculate the optimal salary and dividend split for UK limited company directors in ${TAX_YEAR}`,
  url: 'https://reckonwell.com/toolkit/salary-vs-dividend-calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
  author: { '@type': 'Person', name: TOOLKIT_META.author, url: `https://reckonwell.com${TOOLKIT_META.authorUrl}` },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is the optimal director salary for 2026/27?', acceptedAnswer: { '@type': 'Answer', text: `The most common optimal salary for a sole director with no other employees is £${INCOME_TAX.personalAllowance.toLocaleString()} (the personal allowance), as this avoids income tax and employee NIC. If Employment Allowance applies, a salary up to £${INCOME_TAX.personalAllowance.toLocaleString()} is usually optimal.` } },
    { '@type': 'Question', name: 'How much is the dividend allowance in 2026/27?', acceptedAnswer: { '@type': 'Answer', text: `The dividend allowance is £${DIVIDEND_TAX.allowance.toLocaleString()} for 2026/27. Dividends above this are taxed at ${(DIVIDEND_TAX.basicRate * 100).toFixed(2)}% (basic rate), ${(DIVIDEND_TAX.higherRate * 100).toFixed(2)}% (higher rate), or ${(DIVIDEND_TAX.additionalRate * 100).toFixed(2)}% (additional rate).` } },
    { '@type': 'Question', name: 'Is it better to take salary or dividends from a limited company?', acceptedAnswer: { '@type': 'Answer', text: 'For most directors, a combination of a low salary (up to the personal allowance or NIC threshold) plus dividends is the most tax-efficient. This minimises NIC while using the dividend allowance and lower dividend tax rates. The exact optimal split depends on your profit level, other income, and whether Employment Allowance applies.' } },
    { '@type': 'Question', name: 'What is the corporation tax rate for 2026/27?', acceptedAnswer: { '@type': 'Answer', text: `Corporation tax is ${CORPORATION_TAX.smallProfitsRate * 100}% on profits up to £${CORPORATION_TAX.lowerLimit.toLocaleString()}, ${CORPORATION_TAX.mainRate * 100}% on profits over £${CORPORATION_TAX.upperLimit.toLocaleString()}, with marginal relief between these thresholds.` } },
    { '@type': 'Question', name: 'Can I take all profit as dividends?', acceptedAnswer: { '@type': 'Answer', text: 'You can take all post-tax profit as dividends, but this is rarely optimal. A small salary (at least at the NIC secondary threshold of £5,000) is usually beneficial to maintain NIC contribution records for state pension purposes.' } },
    { '@type': 'Question', name: 'How does Employment Allowance affect the optimal salary?', acceptedAnswer: { '@type': 'Answer', text: `Employment Allowance of £${(10500).toLocaleString()} offsets employer NIC. If it applies (not available to sole directors with no other employees), a higher salary may be optimal as employer NIC is reduced. This calculator accounts for Employment Allowance eligibility.` } },
    { '@type': 'Question', name: 'Does this calculator account for student loan repayments?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Select your student loan plan and the calculator will include repayments in the take-home calculation. Student loan repayments are triggered on salary and dividends above the plan threshold.' } },
    { '@type': 'Question', name: 'What if I have multiple director-shareholders?', acceptedAnswer: { '@type': 'Answer', text: 'Enter the number of director-shareholders and the calculator will split the employer NIC across all directors. Each director should run their own calculation if their other income or circumstances differ.' } },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reckonwell.com' },
    { '@type': 'ListItem', position: 2, name: 'Free Finance Toolkit', item: 'https://reckonwell.com/toolkit' },
    { '@type': 'ListItem', position: 3, name: 'Salary vs Dividend Calculator', item: 'https://reckonwell.com/toolkit/salary-vs-dividend-calculator' },
  ],
};

export default function SalaryVsDividendPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <ToolPageLayout
        breadcrumbs={[{ label: 'Salary vs Dividend Calculator' }]}
        relatedTools={[
          { slug: 'sole-trader-vs-limited-company', title: 'Sole Trader vs Limited Company', question: 'Should I be a sole trader or set up a limited company?' },
          { slug: 'corporation-tax-calculator', title: 'Corporation Tax Calculator', question: 'How much corporation tax will my company pay?' },
          { slug: 'tax-relief-finder', title: 'Tax Relief Finder', question: 'Which tax reliefs can my business claim?' },
        ]}
      >
        {/* H1 + intro */}
        <div className="py-8">
          <h1 className="font-display mb-4" style={{ fontSize: 'clamp(28px, 5vw, 52px)', lineHeight: 1.1, fontWeight: 400, color: 'var(--foreground)', letterSpacing: '-0.02em' }}>
            Salary vs Dividend Calculator {TAX_YEAR}
          </h1>
          <p className="font-ui mb-2" style={{ fontSize: '17px', lineHeight: 1.7, color: 'var(--muted)', maxWidth: '600px' }}>
            Find the most tax-efficient way to pay yourself from your limited company.
          </p>
          <p className="font-ui text-xs" style={{ color: 'var(--muted)', fontSize: '11px' }}>
            Rules for tax year {TAX_YEAR} — last reviewed {TOOLKIT_META.lastReviewed}
          </p>
        </div>

        {/* Quick-answer box */}
        <div className="p-5 mb-8" style={{ background: 'var(--primary-dim)', border: '1px solid var(--border)', borderRadius: '2px', borderLeft: '3px solid var(--primary)' }}>
          <p className="font-ui text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--primary)', fontSize: '10px', letterSpacing: '2px' }}>Quick answer</p>
          <p className="font-ui text-sm" style={{ color: 'var(--body-text)', lineHeight: 1.7 }}>
            For most sole directors in {TAX_YEAR}, the optimal structure is a salary of <strong>£{INCOME_TAX.personalAllowance.toLocaleString()}</strong> (the personal allowance) plus dividends from remaining profit. This avoids income tax and employee NIC on the salary, and uses the <strong>£{DIVIDEND_TAX.allowance.toLocaleString()} dividend allowance</strong> tax-free. Dividend tax rates are {(DIVIDEND_TAX.basicRate * 100).toFixed(2)}% / {(DIVIDEND_TAX.higherRate * 100).toFixed(2)}% / {(DIVIDEND_TAX.additionalRate * 100).toFixed(2)}% vs income tax at 20% / 40% / 45%.
          </p>
        </div>

        {/* Calculator */}
        <SalaryDividendClient />

        {/* Explanatory content */}
        <article className="mt-12 prose-rw">
          <h2 className="font-display text-2xl mb-4" style={{ fontWeight: 400, color: 'var(--foreground)' }}>
            How does the salary vs dividend decision work?
          </h2>
          <p className="font-ui mb-4" style={{ color: 'var(--body-text)', lineHeight: 1.75 }}>
            As a limited company director, you have two main ways to extract profit: salary (PAYE) and dividends. Each is taxed differently, and the optimal split depends on your profit level, other income, and whether Employment Allowance applies.
          </p>
          <p className="font-ui mb-6" style={{ color: 'var(--body-text)', lineHeight: 1.75 }}>
            Salary is subject to income tax and National Insurance (both employee and employer). Dividends are paid from post-corporation-tax profit and taxed at lower rates — but only after corporation tax has already been paid on the profit.
          </p>

          <h2 className="font-display text-2xl mb-4" style={{ fontWeight: 400, color: 'var(--foreground)' }}>
            Why is a low salary usually optimal?
          </h2>
          <p className="font-ui mb-4" style={{ color: 'var(--body-text)', lineHeight: 1.75 }}>
            The key insight is that employer NIC ({(NATIONAL_INSURANCE.employerRate * 100)}% from April 2025) is a cost to the company — it reduces the profit available for dividends. By keeping salary low, you minimise NIC while still building a NIC record for state pension purposes.
          </p>

          <h2 className="font-display text-2xl mb-4" style={{ fontWeight: 400, color: 'var(--foreground)' }}>
            Worked example: £80,000 company profit
          </h2>
          <div className="overflow-x-auto mb-6">
            <table className="w-full font-ui text-sm" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th className="text-left py-2 pr-4" style={{ color: 'var(--muted)', fontSize: '11px', fontWeight: 600 }}>Item</th>
                  <th className="text-right py-2 px-2" style={{ color: 'var(--muted)', fontSize: '11px', fontWeight: 600 }}>Salary only</th>
                  <th className="text-right py-2 pl-2" style={{ color: 'var(--muted)', fontSize: '11px', fontWeight: 600 }}>Optimal split</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Salary', '£80,000', '£12,570'],
                  ['Dividends', '—', '~£50,000'],
                  ['Employer NIC', '~£11,250', '£0'],
                  ['Employee NIC', '~£3,060', '£0'],
                  ['Income tax', '~£13,486', '£0'],
                  ['Corporation tax', '£0', '~£3,486'],
                  ['Dividend tax', '—', '~£4,300'],
                  ['Take-home', '~£53,204', '~£58,784'],
                ].map(([item, salary, optimal]) => (
                  <tr key={item} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td className="py-2 pr-4" style={{ color: 'var(--body-text)' }}>{item}</td>
                    <td className="text-right py-2 px-2" style={{ color: 'var(--body-text)' }}>{salary}</td>
                    <td className="text-right py-2 pl-2" style={{ color: 'var(--foreground)', fontWeight: 600 }}>{optimal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-ui text-xs mb-8" style={{ color: 'var(--muted)', fontSize: '11px' }}>
            Illustrative figures for a sole director with no other income, no Employment Allowance, no student loan. {TAX_YEAR} rates.
          </p>

          <h2 className="font-display text-2xl mb-4" style={{ fontWeight: 400, color: 'var(--foreground)' }}>
            Key rates for {TAX_YEAR}
          </h2>
          <ul className="font-ui mb-6" style={{ color: 'var(--body-text)', lineHeight: 1.75, paddingLeft: '1.25rem' }}>
            <li>Personal allowance: £{INCOME_TAX.personalAllowance.toLocaleString()}</li>
            <li>Dividend allowance: £{DIVIDEND_TAX.allowance.toLocaleString()}</li>
            <li>Employer NIC rate: {(NATIONAL_INSURANCE.employerRate * 100)}% (secondary threshold: £{NATIONAL_INSURANCE.employerSecondaryThreshold.toLocaleString()})</li>
            <li>Employer NIC secondary threshold: £{NATIONAL_INSURANCE.employerSecondaryThreshold.toLocaleString()} (reduced from £9,100 from April 2025)</li>
                        <li>Corporation tax: {CORPORATION_TAX.smallProfitsRate * 100}% (≤£{CORPORATION_TAX.lowerLimit.toLocaleString()}) / {CORPORATION_TAX.mainRate * 100}% (≥£{CORPORATION_TAX.upperLimit.toLocaleString()})</li>
            <li>Dividend tax: {(DIVIDEND_TAX.basicRate * 100).toFixed(2)}% / {(DIVIDEND_TAX.higherRate * 100).toFixed(2)}% / {(DIVIDEND_TAX.additionalRate * 100).toFixed(2)}%</li>
          </ul>
        </article>

        {/* FAQ */}
        <section className="mt-12">
          <h2 className="font-display text-2xl mb-8" style={{ fontWeight: 400, color: 'var(--foreground)' }}>Frequently asked questions</h2>
          <div className="space-y-6">
            {[
              { q: 'What is the optimal director salary for 2026/27?', a: `The most common optimal salary is £${INCOME_TAX.personalAllowance.toLocaleString()} (the personal allowance), avoiding income tax and employee NIC. If Employment Allowance applies, the same salary is usually optimal. Without Employment Allowance, some directors prefer £${NATIONAL_INSURANCE.employerSecondaryThreshold.toLocaleString()} to avoid employer NIC entirely.` },
              { q: 'How much is the dividend allowance in 2026/27?', a: `The dividend allowance is £${DIVIDEND_TAX.allowance.toLocaleString()} for 2026/27. Dividends above this are taxed at ${(DIVIDEND_TAX.basicRate * 100).toFixed(2)}% (basic rate), ${(DIVIDEND_TAX.higherRate * 100).toFixed(2)}% (higher rate), or ${(DIVIDEND_TAX.additionalRate * 100).toFixed(2)}% (additional rate).` },
              { q: 'Is it better to take salary or dividends from a limited company?', a: 'For most directors, a combination of a low salary plus dividends is most tax-efficient. The exact optimal split depends on your profit level, other income, and whether Employment Allowance applies. Use the calculator above to find your specific optimal.' },
              { q: 'Can I take all profit as dividends?', a: 'You can take all post-tax profit as dividends, but a small salary is usually beneficial to maintain NIC contribution records for state pension purposes. You also need sufficient retained profit to legally declare a dividend.' },
              { q: 'How does Employment Allowance affect the optimal salary?', a: `Employment Allowance of £${(10500).toLocaleString()} offsets employer NIC. It is not available to sole directors with no other employees. If it applies, a higher salary may be optimal as employer NIC is reduced.` },
              { q: 'What if I have multiple director-shareholders?', a: 'Enter the number of director-shareholders and the calculator splits employer NIC across all directors. Each director should run their own calculation if their other income or circumstances differ.' },
            ].map(({ q, a }) => (
              <div key={q} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
                <h3 className="font-display text-lg mb-2" style={{ fontWeight: 400, color: 'var(--foreground)' }}>{q}</h3>
                <p className="font-ui text-sm" style={{ color: 'var(--body-text)', lineHeight: 1.7 }}>{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sources */}
        <section className="mt-12 mb-8">
          <h2 className="font-display text-lg mb-4" style={{ fontWeight: 400, color: 'var(--foreground)' }}>Sources</h2>
          <ul className="font-ui text-xs space-y-1" style={{ color: 'var(--muted)', fontSize: '11px' }}>
            <li><a href="https://www.gov.uk/income-tax-rates" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--secondary)', textDecoration: 'underline' }}>GOV.UK — Income Tax rates and Personal Allowances</a></li>
            <li><a href="https://www.gov.uk/national-insurance" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--secondary)', textDecoration: 'underline' }}>GOV.UK — National Insurance rates and categories</a></li>
            <li><a href="https://www.gov.uk/tax-on-dividends" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--secondary)', textDecoration: 'underline' }}>GOV.UK — Tax on dividends</a></li>
            <li><a href="https://www.gov.uk/corporation-tax-rates" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--secondary)', textDecoration: 'underline' }}>GOV.UK — Corporation Tax rates</a></li>
            <li><a href="https://www.gov.uk/claim-employment-allowance" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--secondary)', textDecoration: 'underline' }}>GOV.UK — Claim Employment Allowance</a></li>
          </ul>
        </section>
      </ToolPageLayout>
      <Footer />
    </>
  );
}
