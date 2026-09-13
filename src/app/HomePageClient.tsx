'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import PersonalisedProactiveSection from '@/app/components/PersonalisedProactiveSection';
import FinanceFunctionSection from '@/app/components/FinanceFunctionSection';
import FundraisingCapitalSection from '@/app/components/FundraisingCapitalSection';
import NationwideCoverageSection from '@/app/components/NationwideCoverageSection';
import FounderSection from '@/app/components/FounderSection';
import PricingBannerSection from '@/app/components/PricingBannerSection';
import ComplianceCalculatorsSection from '@/app/components/ComplianceCalculatorsSection';
import ReadyToThinkSection from '@/app/components/ReadyToThinkSection';
import USBanner from '@/components/USBanner';

export default function HomePageClient() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://reckonwell.com#bookkeeping-service',
    name: 'Daily Bookkeeping & Cash Flow Management',
    description: 'Real-time bookkeeping, cash flow monitoring, and financial alerts for UK founder-led businesses. From £200 per month.',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Reckonwell',
      url: 'https://reckonwell.com',
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
          {/* 1. Hero + partner logos (CertifiedPartneredSection is inside HeroSection) */}
          <section role="region" aria-label="Hero section">
            <HeroSection />
          </section>

          {/* 2. Personalised finance support */}
          <section role="region" aria-label="Personalised finance support">
            <PersonalisedProactiveSection />
          </section>

          {/* 3. Outsourced finance department */}
          <section role="region" aria-label="Outsourced finance department">
            <FinanceFunctionSection />
          </section>

          {/* 4. Fundraising support */}
          <section role="region" aria-label="Fundraising and capital">
            <FundraisingCapitalSection />
          </section>

          {/* 4b. Pricing banner strip — right scope for your business */}
          <section role="region" aria-label="Pricing banner">
            <PricingBannerSection />
          </section>

          {/* 4c. Compliance, sorted — specific service cards */}
          <section role="region" aria-label="Compliance services">
            <ComplianceCalculatorsSection />
          </section>

          {/* 4d. Ready to think like a director again */}
          <section role="region" aria-label="Ready to think like a director again">
            <ReadyToThinkSection />
          </section>

          {/* 5. Nationwide coverage */}
          <section role="region" aria-label="Nationwide coverage">
            <NationwideCoverageSection />
          </section>

          {/* 6. Message from the Founder — untouched */}
          <section role="region" aria-label="Message from the founder">
            <FounderSection />
          </section>
        </article>
        <Footer />
      </main>
    </>
  );
}
