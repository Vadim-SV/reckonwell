'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import PersonalisedProactiveSection from '@/app/components/PersonalisedProactiveSection';
import FinanceFunctionSection from '@/app/components/FinanceFunctionSection';
import FundraisingCapitalSection from '@/app/components/FundraisingCapitalSection';
import DiscoveryCTASection from '@/app/components/DiscoveryCTASection';
import ServicesAndPricingSection from '@/app/components/ServicesAndPricingSection';
import NationwideCoverageSection from '@/app/components/NationwideCoverageSection';
import ClosingSection from '@/app/components/ClosingSection';
import ReferralTeaserSection from '@/app/components/ReferralTeaserSection';

import USBanner from '@/components/USBanner';

export default function HomePage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}#bookkeeping-service`,
    name: 'Daily Bookkeeping & Cash Flow Management',
    description: 'Real-time bookkeeping, cash flow monitoring, and financial alerts for UK founder-led businesses. From £200 per month.',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Reckonwell',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    },
    areaServed: ['GB', 'US'],
    serviceType: 'Bookkeeping',
    priceRange: '£200-£1000',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'GBP',
      price: '200',
      description: 'Starting from £200 per month for daily bookkeeping services',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <USBanner />
      <main
        className="relative overflow-x-hidden"
        style={{ backgroundColor: 'var(--background)' }}
        role="main"
      >
        <Header />
        <article role="article">
          <section role="region" aria-label="Hero section">
            <HeroSection />
          </section>
          <section role="region" aria-label="Personalised and proactive">
            <PersonalisedProactiveSection />
          </section>
          <section role="region" aria-label="Finance function">
            <FinanceFunctionSection />
          </section>
          <section role="region" aria-label="Fundraising and capital">
            <FundraisingCapitalSection />
          </section>
          <section role="region" aria-label="Get started">
            <DiscoveryCTASection />
          </section>
          <section role="region" aria-label="Services and pricing">
            <ServicesAndPricingSection />
          </section>
          <section role="region" aria-label="Nationwide coverage">
            <NationwideCoverageSection />
          </section>
          <section role="region" aria-label="Get in touch">
            <ClosingSection />
          </section>
          <section role="region" aria-label="Trust and transparency">
          </section>
          <section role="region" aria-label="Referral partner programme">
            <ReferralTeaserSection />
          </section>
        </article>
        <Footer />
      </main>
    </>
  );
}