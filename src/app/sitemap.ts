import type { MetadataRoute } from 'next';

// Non-London city pages are noindexed and excluded from sitemap.
// To re-enable a page: add it back here and remove robots noindex from its page.tsx.

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://reckonwell.com';

  return [
    // ── Homepage ─────────────────────────────────────────────────────────────
    {
      url: base,
      lastModified: new Date('2026-10-05'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // ── Core Service Pages ────────────────────────────────────────────────────
    {
      url: `${base}/services`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    // ── Industry Pages ────────────────────────────────────────────────────────
    {
      url: `${base}/industries`,
      lastModified: new Date('2026-10-05'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/industries/technology`,
      lastModified: new Date('2026-10-05'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${base}/industries/ecommerce`,
      lastModified: new Date('2026-10-05'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${base}/industries/property`,
      lastModified: new Date('2026-10-05'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${base}/industries/manufacturing`,
      lastModified: new Date('2026-10-05'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${base}/industries/hospitality`,
      lastModified: new Date('2026-10-05'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${base}/fractional-finance-department`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/contact`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${base}/r-and-d-tax-relief`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${base}/limited-company-accounting`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${base}/making-tax-digital`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${base}/self-employed-accounting`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${base}/bookkeeping-services`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/payroll-services`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/vat-returns`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/company-formation`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/self-assessment`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // ── London-specific service pages (indexed) ───────────────────────────────
    {
      url: `${base}/london-payroll-services`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    // ── London city / area pages (indexed) ───────────────────────────────────
    {
      url: `${base}/accounting/london`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/accounting/old-street`,
      lastModified: new Date('2026-10-05'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${base}/accounting/moorgate`,
      lastModified: new Date('2026-10-05'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${base}/accounting/city-of-london`,
      lastModified: new Date('2026-10-05'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${base}/accounting/soho`,
      lastModified: new Date('2026-10-05'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${base}/accounting/kings-cross`,
      lastModified: new Date('2026-10-05'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${base}/accounting/farringdon`,
      lastModified: new Date('2026-10-05'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    // ── London Borough pages (indexed) ───────────────────────────────────────
    {
      url: `${base}/accounting/westminster`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/accounting/camden`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/accounting/islington`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/accounting/hackney`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/accounting/tower-hamlets`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/accounting/southwark`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/accounting/lambeth`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/accounting/wandsworth`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/accounting/kensington-and-chelsea`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/accounting/ealing`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/accounting/croydon`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/accounting/brent`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/accounting/hounslow`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/accounting/newham`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // ── US Pages (indexed) ────────────────────────────────────────────────────
    {
      url: `${base}/us`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${base}/us/accounting/austin`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${base}/us/accounting/miami`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${base}/us/accounting/denver`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${base}/us/accounting/chicago`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${base}/us/accounting/atlanta`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${base}/us/accounting/nashville`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${base}/us/accounting/dallas`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${base}/us/accounting/phoenix`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${base}/us/bookkeeping-for-saas`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/us/bookkeeping-for-ecommerce`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/us/bookkeeping-for-agencies`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/us/virtual-cfo-services`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/us/outsourced-bookkeeping-vs-in-house`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // ── Legal ─────────────────────────────────────────────────────────────────
    {
      url: `${base}/privacy-policy`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${base}/terms-of-service`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    // ── Referrals ─────────────────────────────────────────────────────────────
    {
      url: `${base}/referrals`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // ── Calculators ───────────────────────────────────────────────────────────
    {
      url: `${base}/quotation-calculator`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
  ];
}