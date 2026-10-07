'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { Profession, ClaimItem } from '@/lib/toolkit-data';
import ShareBar from '@/components/toolkit/ShareBar';
import { trackToolStarted, trackToolCompleted } from '@/lib/toolkit-utils';

interface Props {
  professions: Profession[];
  claimItems: ClaimItem[];
}

const EXPENSE_LABELS: Record<string, string> = {
  'home-office': 'Home office / working from home',
  'phone': 'Mobile phone',
  'broadband': 'Broadband',
  'laptop': 'Laptop / computer',
  'software-subscriptions': 'Software subscriptions',
  'professional-development': 'Training and professional development',
  'accountant-fees': 'Accountant / professional fees',
  'travel': 'Business travel (train, flights, hotels)',
  'client-entertainment': 'Client entertainment',
  'professional-memberships': 'Professional memberships',
  'pension': 'Pension contributions',
  'professional-indemnity-insurance': 'Professional indemnity insurance',
  'co-working-space': 'Co-working space',
  'research-subscriptions': 'Research / industry subscriptions',
  'linkedin-premium': 'LinkedIn Premium',
  'monitors': 'Monitors and peripherals',
  'cloud-hosting': 'Cloud hosting / server costs',
  'domain-names': 'Domain names and website hosting',
  'github-subscription': 'GitHub / developer tools',
  'technical-books': 'Technical books and publications',
  'ergonomic-equipment': 'Ergonomic equipment',
  'design-software': 'Design software (Adobe, Figma, etc.)',
  'stock-images': 'Stock images and assets',
  'drawing-tablet': 'Drawing tablet',
  'portfolio-hosting': 'Portfolio website hosting',
  'font-licences': 'Font licences',
  'camera-equipment': 'Camera and video equipment',
  'editing-software': 'Editing software',
  'insurance': 'Business insurance',
  'memory-cards-batteries': 'Memory cards, batteries, accessories',
  'studio-hire': 'Studio hire',
  'props': 'Props and set dressing',
  'website-hosting': 'Website hosting',
  'tools-equipment': 'Tools and equipment',
  'van-vehicle': 'Van or vehicle',
  'fuel': 'Fuel',
  'materials': 'Materials and supplies',
  'workwear': 'Protective clothing / uniform',
  'tool-insurance': 'Tool insurance',
  'vehicle-insurance': 'Vehicle insurance',
  'trade-memberships': 'Trade memberships',
  'health-and-safety-training': 'Health and safety training',
  'cleaning-supplies': 'Cleaning supplies',
  'vehicle': 'Vehicle',
  'equipment': 'Equipment',
  'professional-supplies': 'Professional supplies',
  'cpd-courses': 'CPD courses',
  'product-samples': 'Product samples',
  'gym-membership-professional': 'Gym membership (professional use)',
  'fitness-software': 'Fitness / booking software',
  'instruments-equipment': 'Instruments and equipment',
  'sheet-music': 'Sheet music and scores',
  'music-software': 'Music software',
  'instrument-insurance': 'Instrument insurance',
  'dbs-check': 'DBS check',
  'vehicle-maintenance': 'Vehicle maintenance',
  'licensing-fees': 'Licensing fees',
  'dashcam': 'Dashcam',
  'vehicle-cleaning': 'Vehicle cleaning',
  'parking-fees': 'Parking fees',
  'road-tolls': 'Road tolls',
  'mortgage-interest': 'Mortgage interest (finance cost restriction applies)',
  'letting-agent-fees': 'Letting agent fees',
  'repairs-maintenance': 'Repairs and maintenance',
  'travel-to-property': 'Travel to property',
  'ground-rent': 'Ground rent',
  'service-charges': 'Service charges',
  'legal-fees': 'Legal fees',
  'advertising-costs': 'Advertising and marketing costs',
  'accounting-software': 'Accounting software',
  'legal-software': 'Legal software',
  'cad-software': 'CAD / design software',
  'medical-equipment': 'Medical equipment',
  'research-materials': 'Research materials',
  'writing-software': 'Writing software',
  'market-research-tools': 'Market research tools',
  'social-media-tools': 'Social media management tools',
  'press-release-distribution': 'Press release distribution',
  'industry-events': 'Industry events and conferences',
  'fca-fees': 'FCA fees and levies',
  'research-tools': 'Research and data tools',
  'event-software': 'Event management software',
  'sample-products': 'Sample products',
  'venue-inspection-costs': 'Venue inspection costs',
  'test-equipment': 'Test equipment',
  'technical-certifications': 'Technical certifications',
  'cloud-tools': 'Cloud and monitoring tools',
  'supervision-costs': 'Supervision costs',
  'ingredients-for-testing': 'Ingredients for recipe testing',
  'food-hygiene-training': 'Food hygiene training',
  'knife-insurance': 'Knife insurance',
  'recipe-development-costs': 'Recipe development costs',
  'marketing': 'Marketing and advertising',
  'linkedin-recruiter': 'LinkedIn Recruiter',
  'job-board-subscriptions': 'Job board subscriptions',
  'background-check-services': 'Background check services',
  'props-and-costumes-for-content': 'Props and costumes (for content)',
  'platform-subscriptions': 'Platform subscriptions',
  'music-licences': 'Music licences',
};

export default function ExpensesClient({ professions, claimItems }: Props) {
  const [structure, setStructure] = useState<'sole-trader' | 'limited-company'>('sole-trader');
  const [professionValue, setProfessionValue] = useState('consultant');
  const [wfh, setWfh] = useState(false);
  const [vehicle, setVehicle] = useState(false);
  const [businessMiles, setBusinessMiles] = useState(5000);
  const [wfhHours, setWfhHours] = useState(40);
  const [started, setStarted] = useState(false);

  const profession = professions.find(p => p.value === professionValue);

  const handleChange = () => {
    if (!started) {
      trackToolStarted('allowable-expenses-finder');
      setStarted(true);
    }
  };

  const mileageDeduction = vehicle
    ? businessMiles <= 10000
      ? businessMiles * 0.45
      : 10000 * 0.45 + (businessMiles - 10000) * 0.25
    : 0;

  const wfhDeduction = wfh
    ? wfhHours >= 50 ? 26 * 12 : wfhHours >= 25 ? 18 * 12 : 10 * 12
    : 0;

  const getLabel = (key: string) => EXPENSE_LABELS[key] || key.replace(/-/g, ' ');

  return (
    <div className="max-w-2xl">
      {/* Inputs */}
      <div className="rounded-lg border p-6 mb-6" style={{ borderColor: 'var(--border)' }}>
        <h3 className="font-display text-lg mb-5" style={{ color: 'var(--foreground)' }}>Your details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-ui uppercase tracking-widest mb-1.5" style={{ color: 'var(--muted)', letterSpacing: '1.5px' }}>
              Business structure
            </label>
            <div className="flex gap-3">
              {(['sole-trader', 'limited-company'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => { setStructure(s); handleChange(); }}
                  className="px-4 py-2 rounded text-sm font-ui transition-all"
                  style={{
                    background: structure === s ? 'var(--primary)' : 'transparent',
                    color: structure === s ? 'var(--primary-foreground)' : 'var(--muted)',
                    border: '1px solid var(--border)',
                  }}
                >
                  {s === 'sole-trader' ? 'Sole Trader' : 'Ltd Director'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-ui uppercase tracking-widest mb-1.5" style={{ color: 'var(--muted)', letterSpacing: '1.5px' }}>
              Profession
            </label>
            <select
              value={professionValue}
              onChange={(e) => { setProfessionValue(e.target.value); handleChange(); }}
              className="w-full px-3 py-2 rounded border text-sm"
              style={{ borderColor: 'var(--border)', background: 'var(--background)', color: 'var(--foreground)' }}
              aria-label="Profession"
            >
              {professions.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={wfh} onChange={(e) => { setWfh(e.target.checked); handleChange(); }} className="w-4 h-4" />
              <span className="text-sm" style={{ color: 'var(--foreground)' }}>I work from home</span>
            </label>
            {wfh && (
              <div className="ml-7">
                <label className="block text-xs font-ui uppercase tracking-widest mb-1" style={{ color: 'var(--muted)', letterSpacing: '1.5px' }}>
                  Hours worked from home per month
                </label>
                <input
                  type="number"
                  value={wfhHours}
                  onChange={(e) => setWfhHours(Number(e.target.value))}
                  min={0}
                  max={200}
                  className="w-32 px-3 py-1.5 rounded border text-sm"
                  style={{ borderColor: 'var(--border)', background: 'var(--background)', color: 'var(--foreground)' }}
                />
              </div>
            )}
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={vehicle} onChange={(e) => { setVehicle(e.target.checked); handleChange(); }} className="w-4 h-4" />
              <span className="text-sm" style={{ color: 'var(--foreground)' }}>I use my own vehicle for business</span>
            </label>
            {vehicle && (
              <div className="ml-7">
                <label className="block text-xs font-ui uppercase tracking-widest mb-1" style={{ color: 'var(--muted)', letterSpacing: '1.5px' }}>
                  Business miles per year
                </label>
                <input
                  type="number"
                  value={businessMiles}
                  onChange={(e) => setBusinessMiles(Number(e.target.value))}
                  min={0}
                  step={500}
                  className="w-32 px-3 py-1.5 rounded border text-sm"
                  style={{ borderColor: 'var(--border)', background: 'var(--background)', color: 'var(--foreground)' }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {profession && (
        <>
          {/* Claimable expenses */}
          <div className="rounded-lg border p-5 mb-4" style={{ borderColor: 'var(--border)' }}>
            <h3 className="font-display text-base mb-3" style={{ color: 'var(--foreground)' }}>
              ✓ Commonly claimable for {profession.label}
            </h3>
            <ul className="space-y-1.5">
              {profession.commonExpenses.map(key => (
                <li key={key} className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                  <span style={{ color: '#2D6A4F', flexShrink: 0 }}>✓</span>
                  {getLabel(key)}
                  {key === 'home-office' && wfh && (
                    <span className="text-xs ml-1" style={{ color: 'var(--primary)' }}>
                      (simplified: £{wfhDeduction}/year)
                    </span>
                  )}
                  {(key === 'van-vehicle' || key === 'vehicle') && vehicle && (
                    <span className="text-xs ml-1" style={{ color: 'var(--primary)' }}>
                      (mileage: £{mileageDeduction.toFixed(0)}/year)
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Commonly missed */}
          <div className="rounded-lg border p-5 mb-4" style={{ borderColor: 'var(--border)' }}>
            <h3 className="font-display text-base mb-3" style={{ color: 'var(--foreground)' }}>
              ⚠ Commonly missed by {profession.label}s
            </h3>
            <ul className="space-y-1.5">
              {profession.missedExpenses.map(key => (
                <li key={key} className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                  <span style={{ color: '#C9A84C', flexShrink: 0 }}>!</span>
                  {getLabel(key)}
                </li>
              ))}
            </ul>
          </div>

          {/* Not allowed */}
          <div className="rounded-lg border p-5 mb-6" style={{ borderColor: 'var(--border)' }}>
            <h3 className="font-display text-base mb-3" style={{ color: 'var(--foreground)' }}>
              ✗ Not allowable
            </h3>
            <ul className="space-y-1.5">
              {profession.notAllowed.map(key => (
                <li key={key} className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                  <span style={{ color: '#b43232', flexShrink: 0 }}>✗</span>
                  {getLabel(key)}
                </li>
              ))}
            </ul>
          </div>

          {/* Can I claim links */}
          <div className="mb-6">
            <h3 className="font-display text-base mb-3" style={{ color: 'var(--foreground)' }}>
              "Can I claim it?" guides
            </h3>
            <div className="flex flex-wrap gap-2">
              {claimItems.slice(0, 10).map(item => (
                <Link
                  key={item.slug}
                  href={`/toolkit/can-i-claim/${item.slug}`}
                  className="px-3 py-1.5 rounded text-xs font-ui transition-all"
                  style={{ border: '1px solid var(--border)', color: 'var(--muted)', textDecoration: 'none' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--primary)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--foreground)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted)'; }}
                >
                  Can I claim {item.name}?
                </Link>
              ))}
            </div>
          </div>

          <ShareBar
            toolSlug="allowable-expenses-finder"
            toolUrl="/toolkit/allowable-expenses-finder"
            shareText="Free tool that shows exactly what expenses you can claim for your profession in 2026/27:"
            onPdfDownload={() => { trackToolCompleted('allowable-expenses-finder'); window.print(); }}
          />
        </>
      )}
    </div>
  );
}
