import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToolPageLayout from '@/components/toolkit/ToolPageLayout';
import UKTaxResidenceClient from './UKTaxResidenceClient';
import { getToolBySlug, TOOLS } from '@/lib/toolkit-data';
import { TAX_YEAR } from '@/lib/tax-config';

const tool = getToolBySlug('uk-tax-residence-checker')!;
const relatedTools = TOOLS.filter(t => tool.relatedTools.includes(t.slug));

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: 'https://reckonwell.com/toolkit/uk-tax-residence-checker' },
  openGraph: {
    title: tool.metaTitle,
    description: tool.metaDescription,
    url: 'https://reckonwell.com/toolkit/uk-tax-residence-checker',
    images: [{ url: '/api/og/uk-tax-residence-checker', width: 1200, height: 630, alt: tool.h1 }],
  },
};

const faqs = [
  {
    q: 'What is the Statutory Residence Test (SRT)?',
    a: 'The SRT is the legal framework used to determine whether an individual is UK tax resident in a given tax year. It was introduced in 2013 and consists of automatic overseas tests, automatic UK tests, and a sufficient ties test. You work through the tests in order — if an automatic test applies, you stop there.',
  },
  {
    q: 'What happened to the non-dom rules?',
    a: 'The domicile-based tax regime was abolished from 6 April 2025. It was replaced by a residence-based system. The term "non-dom" is no longer a legal tax status in the UK, though many people still search for it. What matters now is whether you are a new UK resident eligible for the FIG regime, or a long-term UK resident for IHT purposes.',
  },
  {
    q: 'What is the FIG regime?',
    a: 'The Foreign Income and Gains (FIG) regime replaced the remittance basis from 6 April 2025. New UK residents who have been non-UK resident for at least 10 consecutive years can elect to pay 0% UK tax on foreign income and gains for their first 4 tax years of UK residence. After 4 years, foreign income and gains are taxed in full.',
  },
  {
    q: 'What is the Temporary Repatriation Facility (TRF)?',
    a: 'The TRF allows former non-doms to bring pre-April 2025 foreign income and gains into the UK at a reduced tax rate: 12% in 2025/26 and 2026/27, rising to 15% in 2027/28. The facility closes on 5 April 2028. It is a one-off opportunity to clean up pre-2025 offshore funds.',
  },
  {
    q: 'How many days can I spend in the UK without becoming tax resident?',
    a: 'It depends on your circumstances. If you have never been UK resident, you can spend up to 45 days without becoming resident. If you were UK resident in any of the previous 3 years, the threshold drops to 15 days. The sufficient ties test may make you resident at even lower day counts if you have multiple UK ties.',
  },
  {
    q: 'What is split-year treatment?',
    a: 'If you arrive in or leave the UK part-way through a tax year, split-year treatment may apply. This means you are treated as UK resident for only part of the year, and non-resident for the other part. You must claim split-year treatment on your Self Assessment return.',
  },
  {
    q: 'What is long-term UK resident status for IHT?',
    a: 'From 6 April 2025, a person is a long-term UK resident for IHT purposes if they have been UK resident in at least 10 of the previous 20 tax years. Long-term residents are subject to UK IHT on their worldwide assets. Leavers remain subject to IHT for a period after departure.',
  },
  {
    q: 'Do I need to file a UK tax return if I am non-resident?',
    a: 'You may still need to file a UK Self Assessment return if you have UK-source income (rental income, employment income from UK work, etc.) even if you are non-resident. Non-residents are generally taxed only on UK-source income.',
  },
];

const sources = [
  { label: 'GOV.UK — Statutory Residence Test (SRT)', href: 'https://www.gov.uk/guidance/statutory-residence-test-srt' },
  { label: 'GOV.UK — Foreign Income and Gains (FIG) regime', href: 'https://www.gov.uk/guidance/foreign-income-and-gains-fig-regime' },
  { label: 'GOV.UK — Temporary Repatriation Facility', href: 'https://www.gov.uk/guidance/temporary-repatriation-facility' },
  { label: 'GOV.UK — Changes to non-UK domiciled individuals taxation', href: 'https://www.gov.uk/guidance/changes-to-the-taxation-of-non-uk-domiciled-individuals' },
  { label: 'GOV.UK — Inheritance Tax and domicile', href: 'https://www.gov.uk/guidance/inheritance-tax-and-domicile' },
  { label: 'HMRC — RDR3 Statutory Residence Test guidance', href: 'https://www.gov.uk/government/publications/rdr3-statutory-residence-test-srt' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: tool.h1,
  description: tool.metaDescription,
  url: 'https://reckonwell.com/toolkit/uk-tax-residence-checker',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
};

export default function UKTaxResidencePage() {
  return (
    <>
      <Header />
      <ToolPageLayout
        toolSlug="uk-tax-residence-checker"
        toolTitle={tool.title}
        relatedTools={relatedTools}
        faqs={faqs}
        sources={sources}
        disclaimer="Indicative only — residence and international tax are highly fact-specific. This tool provides a simplified indication based on the Statutory Residence Test. Get professional advice before acting on these results."
        jsonLd={jsonLd}
      >
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl mt-6 mb-3 leading-tight" style={{ color: 'var(--foreground)' }}>
          {tool.h1}
        </h1>
        <p className="text-base mb-8 max-w-2xl" style={{ color: 'var(--muted)' }}>
          Answer a few questions about your UK day count and circumstances to get an indicative residence status, FIG regime eligibility, and IHT position. Covers the Statutory Residence Test for {TAX_YEAR}.
        </p>

        <div className="p-5 rounded-lg border mb-8 max-w-2xl" style={{ borderColor: 'var(--primary)', background: 'rgba(var(--primary-rgb, 24,33,62),0.04)' }}>
          <p className="font-ui text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--primary)', letterSpacing: '1.5px' }}>Quick answer</p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>
            You are automatically UK resident if you spend 183+ days in the UK in a tax year, or if your only home is in the UK. You are automatically non-resident if you spend 0 days in the UK, or fewer than 46 days with no UK residence in the previous 3 years. In all other cases, the Sufficient Ties Test applies.
          </p>
        </div>

        <UKTaxResidenceClient />

        <article className="max-w-3xl mt-16">
          <h2 className="font-display text-2xl mb-4" style={{ color: 'var(--foreground)' }}>The Statutory Residence Test: how it works</h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            The SRT determines your UK tax residence status for each tax year (6 April to 5 April). It consists of three parts, applied in order. If an automatic test gives a definitive answer, you stop there.
          </p>

          <h2 className="font-display text-2xl mb-4 mt-8" style={{ color: 'var(--foreground)' }}>What replaced the non-dom rules?</h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            From 6 April 2025, the domicile-based tax regime was abolished. The concept of "non-domicile" no longer determines your UK tax position. Instead, what matters is whether you are a new UK resident eligible for the FIG regime, or a long-term UK resident for IHT purposes.
          </p>
          <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            Many people still search for "non-dom rules" — if you are looking for information about the old remittance basis, note that it was replaced by the FIG regime for new arrivals, and the Temporary Repatriation Facility for those with pre-2025 offshore funds.
          </p>

          <h2 className="font-display text-2xl mb-4 mt-8" style={{ color: 'var(--foreground)' }}>The SRT: automatic tests summary</h2>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th className="text-left py-2 pr-4 font-semibold" style={{ color: 'var(--foreground)' }}>Test</th>
                  <th className="text-left py-2 pr-4 font-semibold" style={{ color: 'var(--foreground)' }}>Condition</th>
                  <th className="text-left py-2 font-semibold" style={{ color: 'var(--foreground)' }}>Result</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['AOT 1', '0 days in UK (or ≤15 days if previously resident)', 'Non-resident'],
                  ['AOT 2', '<46 days in UK AND not resident in previous 3 years', 'Non-resident'],
                  ['AOT 3', 'Works full-time overseas AND <91 days in UK', 'Non-resident'],
                  ['AUT 1', '≥183 days in UK', 'UK resident'],
                  ['AUT 2', 'Only home is in UK', 'UK resident'],
                  ['AUT 3', 'Works full-time in UK for ≥365 days', 'UK resident'],
                  ['Sufficient Ties', 'Day count + number of UK ties', 'Depends on ties'],
                ].map(([test, condition, result]) => (
                  <tr key={test} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td className="py-2 pr-4 font-medium" style={{ color: 'var(--foreground)' }}>{test}</td>
                    <td className="py-2 pr-4" style={{ color: 'var(--muted)' }}>{condition}</td>
                    <td className="py-2 font-medium" style={{ color: result === 'Non-resident' ? '#2D6A4F' : result === 'UK resident' ? '#b43232' : 'var(--muted)' }}>{result}</td>
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
