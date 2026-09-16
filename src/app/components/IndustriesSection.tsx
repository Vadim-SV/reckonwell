'use client';

import React from 'react';

interface Industry {
  name: string;
  description: string;
  icon: React.ReactNode;
}

const industries: Industry[] = [
{
  name: 'Technology',
  description:
  'Support for software and technology businesses, including recurring revenue, cash visibility, development costs and growth-stage financial control.',
  icon:
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="24" height="24" rx="2" stroke="#4a6fa5" strokeWidth="1.5" fill="none" />
        <rect x="9" y="9" width="6" height="6" rx="1" stroke="#4a6fa5" strokeWidth="1.5" fill="none" />
        <rect x="17" y="9" width="6" height="6" rx="1" stroke="#4a6fa5" strokeWidth="1.5" fill="none" />
        <rect x="9" y="17" width="6" height="6" rx="1" stroke="#4a6fa5" strokeWidth="1.5" fill="none" />
        <rect x="17" y="17" width="6" height="6" rx="1" stroke="#4a6fa5" strokeWidth="1.5" fill="none" />
      </svg>

},
{
  name: 'E-Commerce',
  description:
  'Clear oversight across sales channels, payment providers, platform fees, stock, VAT and the cash tied up in daily operations.',
  icon:
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 8h3l2 10h12l2-8H10" stroke="#4a6fa5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="14" cy="24" r="1.5" stroke="#4a6fa5" strokeWidth="1.5" />
        <circle cx="22" cy="24" r="1.5" stroke="#4a6fa5" strokeWidth="1.5" />
      </svg>

},
{
  name: 'Property',
  description:
  'Accounting and financial oversight for property businesses and SPVs, with visibility over rental income, finance costs, expenditure and portfolio cash flow.',
  icon:
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 28V14l11-9 11 9v14" stroke="#4a6fa5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="12" y="19" width="8" height="9" stroke="#4a6fa5" strokeWidth="1.5" fill="none" />
        <path d="M9 28V17" stroke="#4a6fa5" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M23 28V17" stroke="#4a6fa5" strokeWidth="1.5" strokeLinecap="round" />
      </svg>

},
{
  name: 'Manufacturing',
  description:
  'Support with stock, purchasing, production costs, margins, working capital and the financial controls needed as operations grow.',
  icon:
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="16" width="24" height="12" rx="1" stroke="#4a6fa5" strokeWidth="1.5" fill="none" />
        <path d="M4 16l6-8h12l6 8" stroke="#4a6fa5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="10" y1="16" x2="10" y2="28" stroke="#4a6fa5" strokeWidth="1.5" />
        <line x1="16" y1="16" x2="16" y2="28" stroke="#4a6fa5" strokeWidth="1.5" />
        <line x1="22" y1="16" x2="22" y2="28" stroke="#4a6fa5" strokeWidth="1.5" />
      </svg>

},
{
  name: 'Hospitality',
  description:
  'Accounting and finance support for restaurants and bars, covering daily sales, supplier costs, payroll, VAT, margins and cash flow.',
  icon:
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="10" y1="6" x2="10" y2="26" stroke="#4a6fa5" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="22" y1="6" x2="22" y2="26" stroke="#4a6fa5" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7 6h6M19 6h6" stroke="#4a6fa5" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7 10c0 3 6 3 6 0" stroke="#4a6fa5" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="16" y1="10" x2="16" y2="26" stroke="#4a6fa5" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="13" y1="26" x2="19" y2="26" stroke="#4a6fa5" strokeWidth="1.5" strokeLinecap="round" />
      </svg>

}];


export default function IndustriesSection() {
  return (
    <section
      style={{ backgroundColor: 'var(--background)' }}
      className="py-20 px-6 md:px-16">

      <div className="max-w-5xl mx-auto">
        {/* Top: eyebrow + headline left, paragraph right */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-8 mb-14">
          <div className="lg:w-1/2">
            <p
              className="text-xs tracking-widest uppercase mb-4 font-medium text-[rgba(102,96,92,1)]"
              style={{ color: '#2a7c8a' }}>

              INDUSTRIES WE WORK WITH
            </p>
            <h2
              className="leading-tight font-serif"
              style={{ color: '#0d1b2e', fontSize: 'clamp(32px, 5vw, 60px)' }}>

              Finance support shaped around how your business operates.
            </h2>
          </div>
          <div className="lg:w-1/2 lg:pl-16 lg:pb-2">
            <p
              className="text-base leading-relaxed"
              style={{ color: '#2a7c8a' }}>

              Different industries create different financial pressures. We combine day-to-day accounting with an understanding of the numbers, systems and controls that matter to your business.
            </p>
          </div>
        </div>

        {/* Industry cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {industries.map((industry) =>
          <div
            key={industry.name}
            className="bg-white border border-gray-200 p-6 flex flex-col gap-4">

              {/* Icon box */}
              <div
              className="w-12 h-12 flex items-center justify-center rounded"
              style={{ backgroundColor: '#e8edf4' }}>

                {industry.icon}
              </div>

              {/* Name */}
              <h3
              className="text-xl font-serif"
              style={{ color: '#0d1b2e' }}>

                {industry.name}
              </h3>

              {/* Description */}
              <p
              className="text-sm leading-relaxed"
              style={{ color: '#2a7c8a' }}>

                {industry.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>);

}