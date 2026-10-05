import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Restaurant & Hospitality Accountants in London | Reckonwell',
  description:
    'Accounting for London restaurants, bars and cafés: daily takings, supplier costs, payroll, tips, VAT and cash flow, checked every day.',
  alternates: {
    canonical: 'https://reckonwell.com/industries/hospitality',
  },
  openGraph: {
    title: 'Restaurant & Hospitality Accountants in London | Reckonwell',
    description:
      'Accounting for London restaurants, bars and cafés: daily takings, supplier costs, payroll, tips, VAT and cash flow, checked every day.',
    url: 'https://reckonwell.com/industries/hospitality',
    type: 'website',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'Reckonwell – Restaurant and hospitality accountants in London',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Restaurant & Hospitality Accountants in London | Reckonwell',
    description:
      'Accounting for London restaurants, bars and cafés: daily takings, supplier costs, payroll, tips, VAT and cash flow, checked every day.',
    images: ['/assets/images/app_logo.png'],
  },
};

const faqs = [
  {
    question: 'What does the tips law mean for my restaurant?',
    answer:
      'The Employment (Allocation of Tips) Act 2023 came into force on 1 October 2024. It requires all employers to pass 100% of tips, gratuities and service charges to workers fairly, without any deductions. Employers must have a written tips policy and keep records of how tips are allocated. Workers can request information about how tips are distributed and can bring a claim to an employment tribunal if they believe the rules have not been followed. If you have not yet put a written policy in place, this is now a legal requirement.',
  },
  {
    question: 'How should tips and service charges be handled for payroll and NIC?',
    answer:
      'The tax treatment of tips depends on how they are collected and distributed. Tips paid directly by customers to staff (cash tips not controlled by the employer) are subject to income tax but not National Insurance contributions. Tips collected by the employer and distributed through a tronc scheme — managed by a troncmaster who is independent of the employer — are subject to income tax but not employer or employee NIC. Tips paid directly by the employer (not through a tronc) are subject to both income tax and NIC. A properly structured tronc scheme can therefore reduce the NIC cost for both employer and employee.',
  },
  {
    question: 'What VAT applies to hot food and takeaways?',
    answer:
      'The VAT rules for food in the hospitality sector are notoriously complex. Cold food sold for consumption off the premises is generally zero-rated. Hot food — food that has been heated for the purpose of enabling it to be consumed hot — is standard-rated at 20%, whether eaten in or taken away. Food sold for consumption on the premises (eat-in) is also standard-rated. Catering services, including delivery, are standard-rated. The distinction between hot and cold, and between on-premises and takeaway, requires careful application to your specific menu and service model.',
  },
  {
    question: 'What food and labour cost percentages should a restaurant aim for?',
    answer:
      'As a general guide, food cost as a percentage of food revenue typically ranges from 25% to 35%, and labour cost (including kitchen and front of house) typically ranges from 25% to 35%. Combined, these two costs often represent 55% to 70% of revenue, leaving a gross profit before other overheads of 30% to 45%. These are ranges, not targets — the right figures depend on your concept, price point, location and service model. A fine dining restaurant will have different benchmarks to a quick-service café. What matters is tracking your actual percentages consistently so you can identify when they are moving in the wrong direction.',
  },
  {
    question: 'How often should a restaurant reconcile its takings?',
    answer:
      'Daily. The reconciliation process should compare your EPOS system\'s reported sales for the day against the actual cash in the till and the card terminal receipts, and then against the bank deposits. Any discrepancy needs to be investigated immediately — a pattern of small discrepancies can indicate a process problem or, in the worst case, theft. Waiting until the end of the week or month to reconcile means discrepancies are harder to investigate and errors accumulate. Reckonwell reconciles your daily takings as part of our standard service for hospitality clients.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Accounting for Restaurants, Bars and Hospitality Businesses',
  description:
    'Accounting for London restaurants, bars and cafés: daily takings, supplier costs, payroll, tips, VAT and cash flow, checked every day.',
  provider: {
    '@type': 'AccountingService',
    name: 'Reckonwell',
    url: 'https://reckonwell.com',
  },
  areaServed: { '@type': 'Country', name: 'GB' },
  url: 'https://reckonwell.com/industries/hospitality',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reckonwell.com' },
    { '@type': 'ListItem', position: 2, name: 'Industries', item: 'https://reckonwell.com/industries' },
    { '@type': 'ListItem', position: 3, name: 'Hospitality', item: 'https://reckonwell.com/industries/hospitality' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

export default function HospitalityIndustryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main style={{ backgroundColor: 'var(--background)' }}>
        {/* Hero */}
        <section className="pt-24 md:pt-32 pb-10 md:pb-16 px-4 sm:px-6 md:px-16" style={{ backgroundColor: 'var(--background)' }}>
          <div className="max-w-4xl mx-auto">
            <nav aria-label="Breadcrumb" className="mb-6 md:mb-8">
              <ol className="flex flex-wrap items-center gap-2 font-ui text-xs tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
                <li><Link href="/" style={{ color: 'var(--muted)' }}>Home</Link></li>
                <li aria-hidden="true">›</li>
                <li><Link href="/industries" style={{ color: 'var(--muted)' }}>Industries</Link></li>
                <li aria-hidden="true">›</li>
                <li style={{ color: 'var(--foreground)' }}>Hospitality</li>
              </ol>
            </nav>

            <h1
              className="font-serif leading-tight mb-4"
              style={{ color: '#0d1b2e', fontSize: 'clamp(26px, 5vw, 58px)' }}
            >
              Accounting for restaurants, bars and hospitality businesses
            </h1>
            <p className="font-body text-base md:text-lg mb-7 md:mb-8" style={{ color: 'var(--muted)' }}>
              Daily takings reconciliation, food cost tracking, payroll, tips compliance and VAT — so you always know where your cash is going.
            </p>
            <Link
              href="/book"
              className="font-ui text-xs tracking-widest uppercase inline-block w-full sm:w-auto text-center"
              style={{ padding: '14px 32px', backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)', border: '1px solid var(--primary)', borderRadius: '2px', letterSpacing: '2px', fontWeight: 600 }}
            >
              Book a discovery call
            </Link>
          </div>
        </section>

        {/* Pain Points */}
        <section className="py-10 md:py-16 px-4 sm:px-6 md:px-16" style={{ backgroundColor: '#f5f0e8' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl mb-6 md:mb-8" style={{ color: '#0d1b2e' }}>
              The finance problems hospitality businesses face
            </h2>
            <p className="font-body text-base leading-relaxed mb-6 md:mb-8" style={{ color: 'var(--muted)' }}>
              Restaurants and bars operate on thin margins with high transaction volumes, variable staffing costs and complex VAT rules. The financial problems that cause businesses to fail are often not visible until it is too late — because the numbers are not being tracked closely enough.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {[
                {
                  title: 'Daily takings vs EPOS vs bank reconciliation',
                  body: 'Your EPOS system records sales. Your card terminal records card payments. Your bank records deposits. These three figures should agree every day. When they do not, the discrepancy needs to be investigated immediately. Many hospitality businesses only discover problems at month end, by which point the trail has gone cold.',
                },
                {
                  title: 'Food and drink cost percentages',
                  body: 'Food cost as a percentage of food revenue is one of the most important metrics in hospitality. If it creeps above your target — through waste, theft, portion drift or supplier price increases — your margins erode quickly. Without weekly tracking, you will not notice until the damage is done.',
                },
                {
                  title: 'Payroll with variable hours',
                  body: 'Hospitality payroll is complex: zero-hours contracts, variable shifts, overtime, holiday pay calculated on variable earnings, and the interaction with tips and service charges. Errors in payroll are costly and damage staff trust. Getting it right requires careful administration every pay period.',
                },
                {
                  title: 'Tips and service charges',
                  body: 'Since the Employment (Allocation of Tips) Act 2023 came into force in October 2024, employers must pass all tips to workers fairly and have a written policy in place. The tax treatment of tips — particularly the NIC implications of tronc schemes versus direct employer payments — requires careful handling.',
                },
                {
                  title: 'VAT on hot food and takeaway',
                  body: 'The VAT rules for food are complex and the distinction between zero-rated cold food and standard-rated hot food or eat-in meals catches many operators out. Getting the VAT treatment wrong on a high volume of transactions creates significant exposure.',
                },
                {
                  title: 'Seasonal cash flow',
                  body: 'Many hospitality businesses have pronounced seasonal patterns — busy periods generate cash, quiet periods consume it. Without a cash flow forecast that models these patterns, operators can find themselves short of cash in January or August despite being profitable over the year as a whole.',
                },
              ].map((item) => (
                <div key={item.title} className="bg-white border border-gray-200 p-5 md:p-6">
                  <h3 className="font-serif text-lg md:text-xl mb-3" style={{ color: '#0d1b2e' }}>{item.title}</h3>
                  <p className="font-body text-sm leading-relaxed" style={{ color: '#2a7c8a' }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How Reckonwell Helps */}
        <section className="py-10 md:py-16 px-4 sm:px-6 md:px-16" style={{ backgroundColor: 'var(--background)' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl mb-6 md:mb-8" style={{ color: '#0d1b2e' }}>
              How Reckonwell helps hospitality businesses
            </h2>
            <p className="font-body text-base leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
              Reckonwell&apos;s fractional finance department provides daily financial oversight for restaurants and bars. We reconcile your daily takings against your EPOS system and bank every day, so discrepancies are identified and investigated immediately rather than discovered weeks later.
            </p>
            <p className="font-body text-base leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
              Food and drink cost tracking is built into our monthly reporting. We calculate your food cost percentage and labour cost percentage each month and compare them against your targets, flagging when either is moving in the wrong direction. This gives you the information you need to act before a margin problem becomes a cash flow problem.
            </p>
            <p className="font-body text-base leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
              Payroll for hospitality businesses is handled as part of our service. We process variable-hours payroll, calculate holiday pay correctly on variable earnings, and ensure the interaction with tips and service charges is handled in accordance with the Employment (Allocation of Tips) Act 2023. If you use a tronc scheme, we ensure it is structured correctly to achieve the intended NIC treatment.
            </p>
            <p className="font-body text-base leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
              VAT returns are prepared and filed quarterly. We apply the correct VAT treatment to each category of your sales — eat-in, takeaway, hot food, cold food, alcohol — and ensure your returns are accurate. We also advise on the VAT treatment of delivery platform sales, which have their own specific rules.
            </p>
            <p className="font-body text-base leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
              Cash flow forecasting for hospitality businesses models your seasonal patterns, upcoming supplier payments, VAT liabilities and payroll dates so you can see your cash position week by week. This allows you to plan staffing levels, negotiate supplier terms and make investment decisions with confidence.
            </p>
            <p className="font-body text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
              A qualified accountant signs off your numbers every month. Your management accounts, your VAT returns and your annual accounts are all reviewed by someone who understands hospitality finance and can stand behind the figures.
            </p>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-10 md:py-16 px-4 sm:px-6 md:px-16" style={{ backgroundColor: '#f5f0e8' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl mb-6 md:mb-8" style={{ color: '#0d1b2e' }}>
              What&apos;s included
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                'Daily takings reconciliation (EPOS vs card terminal vs bank)',
                'Food and drink cost percentage tracking',
                'Supplier invoice processing and payment scheduling',
                'Variable-hours payroll processing',
                'Tips and service charge compliance (Employment (Allocation of Tips) Act 2023)',
                'Tronc scheme accounting support',
                'Monthly management accounts with margin analysis',
                'Seasonal cash flow forecasting',
                'VAT returns (correct treatment for hot food, eat-in, takeaway)',
                'Delivery platform reconciliation (Deliveroo, Uber Eats)',
                'Corporation tax and annual accounts',
                'Qualified accountant sign-off every month',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 font-body text-sm" style={{ color: '#0d1b2e' }}>
                  <span style={{ color: '#2a7c8a', fontWeight: 700, flexShrink: 0 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Software */}
        <section className="py-10 md:py-16 px-4 sm:px-6 md:px-16" style={{ backgroundColor: 'var(--background)' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl mb-5 md:mb-6" style={{ color: '#0d1b2e' }}>
              Software we work with
            </h2>
            <p className="font-body text-base leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
              We integrate with the EPOS and payment systems used by London restaurants and bars, pulling data directly into your accounting system to reduce manual entry and improve accuracy.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Xero', 'Square', 'Lightspeed', 'Toast', 'SumUp', 'Deliveroo', 'Uber Eats'].map((tool) => (
                <span
                  key={tool}
                  className="font-ui text-xs tracking-widest uppercase px-4 py-2 border"
                  style={{ borderColor: '#0d1b2e', color: '#0d1b2e', letterSpacing: '1.5px' }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Related Links */}
        <section className="py-10 md:py-16 px-4 sm:px-6 md:px-16" style={{ backgroundColor: '#f5f0e8' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-xl md:text-2xl mb-5 md:mb-6" style={{ color: '#0d1b2e' }}>
              Related services and resources
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'Payroll Services', href: '/payroll-services' },
                { label: 'VAT Returns', href: '/vat-returns' },
                { label: 'Bookkeeping Services', href: '/bookkeeping-services' },
                { label: 'Accounting in Soho', href: '/accounting/soho' },
                { label: 'Accounting in London', href: '/accounting/london' },
                { label: 'Accounting in Old Street', href: '/accounting/old-street' },
                { label: 'Accounting in City of London', href: '/accounting/city-of-london' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-ui text-xs tracking-widest uppercase"
                  style={{ color: 'var(--primary)', letterSpacing: '1.5px', textDecoration: 'underline', textUnderlineOffset: '4px' }}
                >
                  {link.label} →
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-10 md:py-16 px-4 sm:px-6 md:px-16" style={{ backgroundColor: 'var(--background)' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl mb-8 md:mb-10" style={{ color: '#0d1b2e' }}>
              Frequently asked questions
            </h2>
            <div className="flex flex-col gap-6 md:gap-8">
              {faqs.map((faq) => (
                <div key={faq.question} className="border-b pb-6 md:pb-8" style={{ borderColor: '#e5e7eb' }}>
                  <h3 className="font-serif text-lg md:text-xl mb-3 md:mb-4" style={{ color: '#0d1b2e' }}>{faq.question}</h3>
                  <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="py-12 md:py-20 px-4 sm:px-6 md:px-16 text-center" style={{ backgroundColor: '#0d1b2e' }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl mb-5 md:mb-6" style={{ color: '#f5f0e8' }}>
              Tell us about your business
            </h2>
            <p className="font-body text-base leading-relaxed mb-7 md:mb-8" style={{ color: '#B8B8B8' }}>
              Book a free discovery call and we&apos;ll explain exactly how Reckonwell&apos;s fractional finance department works for your restaurant or hospitality business.
            </p>
            <Link
              href="/book"
              className="font-ui text-xs tracking-widest uppercase inline-block w-full sm:w-auto text-center"
              style={{ padding: '14px 32px', backgroundColor: '#D69AAB', color: '#0d1b2e', border: '1px solid #D69AAB', borderRadius: '2px', letterSpacing: '2px', fontWeight: 600 }}
            >
              Book a discovery call
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
