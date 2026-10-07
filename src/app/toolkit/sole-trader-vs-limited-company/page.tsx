import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToolPageLayout from '../components/ToolPageLayout';
import SoleTraderVsLtdClient from './SoleTraderVsLtdClient';
import { TAX_YEAR, TOOLKIT_META, COMPANY_RUNNING_COSTS } from '@/lib/tax-config';

export const metadata: Metadata = {
  title: `Sole Trader vs Limited Company ${TAX_YEAR} | Reckonwell`,
  description: `Should you be a sole trader or set up a limited company? Free decision tree and tax comparison calculator for ${TAX_YEAR}. No sign-up required.`,
  alternates: { canonical: 'https://reckonwell.com/toolkit/sole-trader-vs-limited-company' },
  openGraph: {
    title: `Sole Trader vs Limited Company ${TAX_YEAR} | Reckonwell`,
    description: `Decision tree and tax comparison calculator. Find out whether a limited company is right for you in ${TAX_YEAR}.`,
    url: 'https://reckonwell.com/toolkit/sole-trader-vs-limited-company',
    type: 'website',
  },
};

const toolSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: `Sole Trader vs Limited Company Calculator ${TAX_YEAR}`,
  description: `Decision tree and tax comparison for sole trader vs limited company in ${TAX_YEAR}`,
  url: 'https://reckonwell.com/toolkit/sole-trader-vs-limited-company',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
  author: { '@type': 'Person', name: TOOLKIT_META.author },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Should I be a sole trader or limited company?', acceptedAnswer: { '@type': 'Answer', text: 'It depends on your profit level, how much you draw out, liability concerns, and plans for investment. At profits above £30,000–£40,000, a limited company often saves tax. Below that, the extra admin costs may outweigh the saving. Use the decision tree above for a personalised recommendation.' } },
    { '@type': 'Question', name: 'When does it become worth setting up a limited company?', acceptedAnswer: { '@type': 'Answer', text: `The tax saving typically outweighs running costs (around £${COMPANY_RUNNING_COSTS.totalEstimateMax.toLocaleString()}/year) at profits of around £30,000–£40,000.` } },
    { '@type': 'Question', name: 'What are the extra costs of running a limited company?', acceptedAnswer: { '@type': 'Answer', text: `Typical additional costs: accountancy (£1,200–£2,500/year), Companies House confirmation statement (£34/year), payroll software, and a business bank account. Total: £${COMPANY_RUNNING_COSTS.totalEstimateMin.toLocaleString()}–£${COMPANY_RUNNING_COSTS.totalEstimateMax.toLocaleString()}/year.` } },
    { '@type': 'Question', name: 'Can I switch from sole trader to limited company later?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. You can incorporate at any time. There are tax implications to consider, including potential capital gains on goodwill. Get advice before incorporating an established business.' } },
    { '@type': 'Question', name: 'Does IR35 affect the sole trader vs limited company decision?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. If your contracts are caught by IR35 (off-payroll working rules), the tax benefit of a limited company is largely eliminated. If you work inside IR35, a limited company may not be beneficial.' } },
    { '@type': 'Question', name: 'How does a limited company affect a mortgage application?', acceptedAnswer: { '@type': 'Answer', text: 'Lenders assess limited company directors on salary plus dividends, or sometimes on net profit. Discuss with a mortgage broker before incorporating if you plan to apply for a mortgage in the next 2 years.' } },
  ],
};

export default function SoleTraderVsLtdPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <ToolPageLayout
        breadcrumbs={[{ label: 'Sole Trader vs Limited Company' }]}
        relatedTools={[
          { slug: 'salary-vs-dividend-calculator', title: 'Salary vs Dividend Calculator', question: "What's the most tax-efficient way to pay myself?" },
          { slug: 'corporation-tax-calculator', title: 'Corporation Tax Calculator', question: 'How much corporation tax will my company pay?' },
          { slug: 'allowable-expenses-finder', title: 'Allowable Expenses Finder', question: 'What can I claim as a business expense?' },
        ]}
      >
        <div className="py-8">
          <h1 className="font-display mb-4" style={{ fontSize: 'clamp(28px, 5vw, 52px)', lineHeight: 1.1, fontWeight: 400, color: 'var(--foreground)', letterSpacing: '-0.02em' }}>
            Sole Trader vs Limited Company {TAX_YEAR}
          </h1>
          <p className="font-ui mb-2" style={{ fontSize: '17px', lineHeight: 1.7, color: 'var(--muted)', maxWidth: '600px' }}>
            Should you be a sole trader or set up a limited company? Answer a few questions to get a personalised recommendation, then compare take-home pay at your profit level.
          </p>
          <p className="font-ui text-xs" style={{ color: 'var(--muted)', fontSize: '11px' }}>
            Rules for tax year {TAX_YEAR} — last reviewed {TOOLKIT_META.lastReviewed}
          </p>
        </div>

        <div className="p-5 mb-8" style={{ background: 'var(--primary-dim)', border: '1px solid var(--border)', borderRadius: '2px', borderLeft: '3px solid var(--primary)' }}>
          <p className="font-ui text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--primary)', fontSize: '10px', letterSpacing: '2px' }}>Quick answer</p>
          <p className="font-ui text-sm" style={{ color: 'var(--body-text)', lineHeight: 1.7 }}>
            A limited company typically saves tax at profits above <strong>£30,000–£40,000</strong>, but only if you can retain some profit in the company. Running costs of <strong>£{COMPANY_RUNNING_COSTS.totalEstimateMin.toLocaleString()}–£{COMPANY_RUNNING_COSTS.totalEstimateMax.toLocaleString()}/year</strong> must be weighed against the tax saving. IR35, mortgage plans, and liability concerns also affect the decision.
          </p>
        </div>

        <SoleTraderVsLtdClient />

        <article className="mt-12">
          <h2 className="font-display text-2xl mb-4" style={{ fontWeight: 400, color: 'var(--foreground)' }}>
            Sole trader vs limited company: the key differences
          </h2>
          <p className="font-ui mb-4" style={{ color: 'var(--body-text)', lineHeight: 1.75 }}>
            As a sole trader, you pay income tax and Class 4 NIC on your profits. As a limited company director, the company pays corporation tax on profits, and you extract money as salary and dividends — typically at a lower combined tax rate.
          </p>
          <p className="font-ui mb-6" style={{ color: 'var(--body-text)', lineHeight: 1.75 }}>
            The limited company structure also provides limited liability — your personal assets are protected if the business fails or is sued.
          </p>

          <h2 className="font-display text-2xl mb-4" style={{ fontWeight: 400, color: 'var(--foreground)' }}>
            When does a limited company make sense?
          </h2>
          <ul className="font-ui mb-6" style={{ color: 'var(--body-text)', lineHeight: 1.75, paddingLeft: '1.25rem' }}>
            <li>Profits above £30,000–£40,000 and you can retain some in the company</li>
            <li>You want limited liability protection</li>
            <li>Clients or contracts require a limited company</li>
            <li>You plan to raise investment (SEIS/EIS only available to limited companies)</li>
            <li>You want to offer staff share options (EMI)</li>
          </ul>

          <h2 className="font-display text-2xl mb-4" style={{ fontWeight: 400, color: 'var(--foreground)' }}>
            When might a sole trader be better?
          </h2>
          <ul className="font-ui mb-6" style={{ color: 'var(--body-text)', lineHeight: 1.75, paddingLeft: '1.25rem' }}>
            <li>Profits below £20,000–£25,000 (admin costs outweigh tax saving)</li>
            <li>You draw out all profit (no retained profit benefit)</li>
            <li>You work inside IR35</li>
            <li>You prefer simplicity and lower admin</li>
            <li>You are planning a mortgage application in the next 2 years</li>
          </ul>
        </article>

        <section className="mt-12">
          <h2 className="font-display text-2xl mb-8" style={{ fontWeight: 400, color: 'var(--foreground)' }}>Frequently asked questions</h2>
          <div className="space-y-6">
            {[
              { q: 'Should I be a sole trader or limited company?', a: 'It depends on your profit level, how much you draw out, liability concerns, and plans for investment. At profits above £30,000–£40,000, a limited company often saves tax. Use the decision tree above for a personalised recommendation.' },
              { q: 'When does it become worth setting up a limited company?', a: `The tax saving typically outweighs running costs (around £${COMPANY_RUNNING_COSTS.totalEstimateMax.toLocaleString()}/year) at profits of around £30,000–£40,000.` },
              { q: 'What are the extra costs of running a limited company?', a: `Typical additional costs: accountancy (£1,200–£2,500/year), Companies House confirmation statement (£34/year), payroll software, and a business bank account. Total: £${COMPANY_RUNNING_COSTS.totalEstimateMin.toLocaleString()}–£${COMPANY_RUNNING_COSTS.totalEstimateMax.toLocaleString()}/year.` },
              { q: 'Can I switch from sole trader to limited company later?', a: 'Yes. You can incorporate at any time. There are tax implications to consider, including potential capital gains on goodwill. Get advice before incorporating an established business.' },
              { q: 'Does IR35 affect the decision?', a: 'Yes. If your contracts are caught by IR35, the tax benefit of a limited company is largely eliminated. If you work inside IR35, a limited company may not be beneficial.' },
              { q: 'How does a limited company affect a mortgage application?', a: 'Lenders assess limited company directors on salary plus dividends, or sometimes on net profit. Discuss with a mortgage broker before incorporating if you plan to apply for a mortgage in the next 2 years.' },
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
            <li><a href="https://www.gov.uk/set-up-sole-trader" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--secondary)', textDecoration: 'underline' }}>GOV.UK — Set up as a sole trader</a></li>
            <li><a href="https://www.gov.uk/limited-company-formation" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--secondary)', textDecoration: 'underline' }}>GOV.UK — Set up a limited company</a></li>
            <li><a href="https://www.gov.uk/corporation-tax-rates" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--secondary)', textDecoration: 'underline' }}>GOV.UK — Corporation Tax rates</a></li>
            <li><a href="https://www.gov.uk/guidance/ir35-find-out-if-it-applies" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--secondary)', textDecoration: 'underline' }}>GOV.UK — IR35: find out if it applies</a></li>
          </ul>
        </section>
      </ToolPageLayout>
      <Footer />
    </>
  );
}
