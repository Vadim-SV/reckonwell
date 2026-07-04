'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import LifestyleStatement from '@/app/components/LifestyleStatement';
import PartnershipsSection from '@/app/components/PartnershipsSection';
import ProblemSection from '@/app/components/ProblemSection';
import SolutionSection from '@/app/components/SolutionSection';
import BeforeAfterSection from '@/app/components/BeforeAfterSection';
import HowItWorksSection from '@/app/components/HowItWorksSection';
import ComplianceCalculatorsSection from '@/app/components/ComplianceCalculatorsSection';
import RDTaxReliefPreviewSection from '@/app/components/RDTaxReliefPreviewSection';
import MakingTaxDigitalSection from '@/app/components/MakingTaxDigitalSection';
import RealResultsSection from '@/app/components/RealResultsSection';
import NationwideCoverageSection from '@/app/components/NationwideCoverageSection';
import EmbeddedCalculatorSection from '@/app/components/EmbeddedCalculatorSection';
import PricingSection from '@/app/components/PricingSection';
import AdditionalServicesSection from '@/app/components/AdditionalServicesSection';
import FounderSection from '@/app/components/FounderSection';
import FinalCTASection from '@/app/components/FinalCTASection';
import CustomCursor from '@/app/components/CustomCursor';
import FAQSection from '@/app/components/FAQSection';
import ReferralTeaserSection from '@/app/components/ReferralTeaserSection';
import USBanner from '@/components/USBanner';

export default function HomePage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}#bookkeeping-service`,
    name: 'Daily Bookkeeping & Cash Flow Management',
    description: 'Real-time bookkeeping, cash flow monitoring, and financial alerts for UK and USA businesses. From £200/$300 per month.',
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
          <section role="region" aria-label="Partnerships">
            <PartnershipsSection />
          </section>
          <section role="region" aria-label="Lifestyle statement">
            <LifestyleStatement />
          </section>
          <section role="region" aria-label="Problem statement">
            <ProblemSection />
          </section>
          <section role="region" aria-label="Solution overview">
            <SolutionSection />
          </section>
          <section role="region" aria-label="Before and after comparison">
            <BeforeAfterSection />
          </section>
          <section role="region" aria-label="How it works">
            <HowItWorksSection />
          </section>
          <section role="region" aria-label="Compliance pricing calculators">
            <ComplianceCalculatorsSection />
          </section>
          <section role="region" aria-label="R&D Tax Relief preview">
            <RDTaxReliefPreviewSection />
          </section>
          <section role="region" aria-label="Making Tax Digital">
            <MakingTaxDigitalSection />
          </section>
          <section role="region" aria-label="Real results and testimonials">
            <RealResultsSection />
          </section>
          <section role="region" aria-label="Nationwide coverage">
            <NationwideCoverageSection />
          </section>
          <section role="region" aria-label="Instant quote calculator">
            <EmbeddedCalculatorSection />
          </section>
          <section role="region" aria-label="Pricing options">
            <PricingSection />
          </section>
          <section role="region" aria-label="Additional services">
            <AdditionalServicesSection />
          </section>
          <section role="region" aria-label="Founder information">
            <FounderSection />
          </section>
          <section role="region" aria-label="Final call to action">
            <FinalCTASection />
          </section>
          <section role="region" aria-label="Referral partner programme">
            <ReferralTeaserSection />
          </section>
          <section role="region" aria-label="Frequently asked questions">
            <FAQSection />
          </section>
        </article>
        <Footer />
      </main>
    </>
  );
}