'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import WhyReckonwellSection from '@/app/components/WhyReckonwellSection';
import HowItWorksSection from '@/app/components/HowItWorksSection';
import RealResultsSection from '@/app/components/RealResultsSection';
import ServicesAndPricingSection from '@/app/components/ServicesAndPricingSection';
import NationwideCoverageSection from '@/app/components/NationwideCoverageSection';
import ClosingSection from '@/app/components/ClosingSection';
import ReferralTeaserSection from '@/app/components/ReferralTeaserSection';
import TrustHonestySection from '@/app/components/TrustHonestySection';
import CustomCursor from '@/app/components/CustomCursor';
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
        <CustomCursor />
        <Header />
        <article role="article">
          <section role="region" aria-label="Hero section">
            <HeroSection />
          </section>
          <section role="region" aria-label="Why Reckonwell">
            <WhyReckonwellSection />
          </section>
          <section role="region" aria-label="How it works">
            <HowItWorksSection />
          </section>
          <section role="region" aria-label="Real results and testimonials">
            <RealResultsSection />
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
            <TrustHonestySection />
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