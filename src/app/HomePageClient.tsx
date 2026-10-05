'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import WhatYouGetSection from '@/app/components/WhatYouGetSection';
import IndustriesSection from '@/app/components/IndustriesSection';
import PricingComplianceSection from '@/app/components/PricingComplianceSection';
import FounderSection from '@/app/components/FounderSection';
import ClarityFAQSection from '@/app/components/ClarityFAQSection';
import USBanner from '@/components/USBanner';

export default function HomePageClient() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://reckonwell.com#bookkeeping-service',
    name: 'Fractional Finance Department for Founder-Led Businesses',
    description: 'A part-time finance department for founder-led businesses: daily oversight of cash, bookkeeping, management accounts, and help raising capital.',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Reckonwell',
      url: 'https://reckonwell.com',
    },
    areaServed: ['GB'],
    serviceType: 'Fractional Finance Department',
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
          {/* 1. Hero + partner logos */}
          <section role="region" aria-label="Hero section">
            <HeroSection />
          </section>

          {/* 2. What You Get */}
          <section role="region" aria-label="What you get">
            <WhatYouGetSection />
          </section>

          {/* 3. Industries */}
          <section role="region" aria-label="Industries we work with">
            <IndustriesSection />
          </section>

          {/* 4. Pricing & Compliance */}
          <section role="region" aria-label="Pricing and compliance">
            <PricingComplianceSection />
          </section>

          {/* 5. Founder */}
          <section role="region" aria-label="Message from the founder">
            <FounderSection />
          </section>

          {/* 6. FAQ */}
          <section role="region" aria-label="Questions and answers">
            <ClarityFAQSection />
          </section>
        </article>
        <Footer />
      </main>
    </>
  );
}
