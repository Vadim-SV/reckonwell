import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToolPageLayout from '@/components/toolkit/ToolPageLayout';
import TaxReliefClient from './TaxReliefClient';
import { getToolBySlug, TOOLS, TAX_RELIEFS } from '@/lib/toolkit-data';
import { TAX_YEAR } from '@/lib/tax-config';

const tool = getToolBySlug('tax-relief-finder')!;
const relatedTools = TOOLS.filter(t => tool.relatedTools.includes(t.slug));

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: 'https://reckonwell.com/toolkit/tax-relief-finder' },
  openGraph: {
    title: tool.metaTitle,
    description: tool.metaDescription,
    url: 'https://reckonwell.com/toolkit/tax-relief-finder',
    images: [{ url: '/api/og/tax-relief-finder', width: 1200, height: 630, alt: tool.h1 }],
  },
};

const faqs = [
  { q: 'What tax reliefs are available for limited companies?', a: `Limited companies can claim Annual Investment Allowance, Full Expensing, R&D tax relief (merged scheme), Employment Allowance, Patent Box, SEIS/EIS, EMI options, Business Asset Disposal Relief, trading loss relief, and corporation tax marginal relief, among others.` },
  { q: 'What is the R&D merged scheme?', a: 'From 1 April 2024, the old SME R&D relief and RDEC schemes merged into a single scheme. Most companies get a 20% above-the-line credit. R&D-intensive loss-making SMEs (R&D spend ≥ 30% of total expenditure) can claim a 27% credit under the Enhanced R&D Intensive Support (ERIS) scheme.' },
  { q: 'Can a sole trader claim R&D tax relief?', a: 'No. R&D tax relief is only available to companies subject to corporation tax.' },
  { q: 'What is the Annual Investment Allowance?', a: `The AIA allows businesses to deduct the full cost of qualifying plant and machinery (up to £1,000,000) in the year of purchase. It applies to sole traders, partnerships, and limited companies.` },
  { q: 'What is Employment Allowance?', a: `Employment Allowance reduces your employer NIC bill by up to £10,500 per year. It is available to most businesses with employees, but not to sole directors with no other employees.` },
  { q: 'What is SEIS and who can use it?', a: 'SEIS (Seed Enterprise Investment Scheme) allows early-stage limited companies to raise up to £250,000 from investors who get 50% income tax relief. The company must be less than 3 years old with fewer than 25 employees and gross assets under £350,000.' },
  { q: 'What changed with non-dom rules?', a: 'From 6 April 2025, the domicile-based tax regime was abolished. It was replaced by a residence-based Foreign Income and Gains (FIG) regime. New UK residents who have been non-resident for 10 years can claim 0% UK tax on foreign income and gains for their first 4 tax years of UK residence.' },
];

const sources = [
  { label: 'GOV.UK — Capital allowances: overview', href: 'https://www.gov.uk/capital-allowances' },
  { label: 'GOV.UK — R&D tax relief', href: 'https://www.gov.uk/guidance/corporation-tax-research-and-development-rd-relief' },
  { label: 'GOV.UK — Employment Allowance', href: 'https://www.gov.uk/claim-employment-allowance' },
  { label: 'GOV.UK — SEIS', href: 'https://www.gov.uk/guidance/venture-capital-schemes-apply-to-use-the-seed-enterprise-investment-scheme' },
  { label: 'GOV.UK — EIS', href: 'https://www.gov.uk/guidance/venture-capital-schemes-apply-for-the-enterprise-investment-scheme' },
  { label: 'GOV.UK — Business rates relief', href: 'https://www.gov.uk/apply-for-business-rate-relief' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: tool.h1,
  description: tool.metaDescription,
  url: 'https://reckonwell.com/toolkit/tax-relief-finder',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
};

export default function TaxReliefPage() {
  return (
    <>
      <Header />
      <ToolPageLayout
        toolSlug="tax-relief-finder"
        toolTitle={tool.title}
        relatedTools={relatedTools}
        faqs={faqs}
        sources={sources}
        disclaimer="Estimates for guidance only — not tax advice. Eligibility depends on your specific circumstances. Consult a qualified tax adviser before making claims."
        jsonLd={jsonLd}
      >
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl mt-6 mb-3 leading-tight" style={{ color: 'var(--foreground)' }}>
          {tool.h1}
        </h1>
        <p className="text-base mb-8 max-w-2xl" style={{ color: 'var(--muted)' }}>
          Answer a few questions about your business and discover every tax relief you could be eligible for. Each result includes how to claim, the deadline, and a link to GOV.UK guidance.
        </p>

        <div className="p-5 rounded-lg border mb-8 max-w-2xl" style={{ borderColor: 'var(--primary)', background: 'rgba(var(--primary-rgb, 24,33,62),0.04)' }}>
          <p className="font-ui text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--primary)', letterSpacing: '1.5px' }}>Quick answer</p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>
            Most UK businesses can claim at least 3–5 tax reliefs. Common ones include Annual Investment Allowance, Employment Allowance, and trading loss relief. Limited companies may also qualify for R&D relief, Full Expensing, SEIS/EIS, and Patent Box.
          </p>
        </div>

        <TaxReliefClient reliefs={TAX_RELIEFS} />

        <article className="max-w-3xl mt-16">
          <h2 className="font-display text-2xl mb-4" style={{ color: 'var(--foreground)' }}>The most valuable tax reliefs for UK businesses in {TAX_YEAR}</h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            The UK tax system offers a wide range of reliefs designed to encourage investment, innovation, and employment. Many businesses miss out simply because they do not know what is available or how to claim it.
          </p>

          <h2 className="font-display text-2xl mb-4 mt-8" style={{ color: 'var(--foreground)' }}>R&D tax relief: the merged scheme from April 2024</h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            The old SME and RDEC schemes merged from 1 April 2024. Most companies now get a 20% above-the-line credit — worth approximately 15.9p for every £1 spent on qualifying R&D. R&D-intensive loss-making SMEs can claim 27% under the Enhanced R&D Intensive Support (ERIS) scheme.
          </p>
          <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            Important: from August 2023, you must submit an Additional Information Form (AIF) to HMRC before or with your CT600. Failure to do so means your claim will be rejected.
          </p>

          <h2 className="font-display text-2xl mb-4 mt-8" style={{ color: 'var(--foreground)' }}>Capital allowances: AIA and Full Expensing</h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            The Annual Investment Allowance (AIA) allows all businesses to deduct up to £1,000,000 of plant and machinery costs in the year of purchase. Companies can also use Full Expensing (100% first-year allowance on new main pool assets, no limit) — a permanent measure from April 2023.
          </p>
        </article>
      </ToolPageLayout>
      <Footer />
    </>
  );
}
