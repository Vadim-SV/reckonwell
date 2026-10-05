import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Accountants for Tech Startups & SaaS Companies | Reckonwell',
  description:
    'Fractional finance for UK tech and SaaS businesses: daily oversight, SaaS metrics, R&D tax relief and investor-ready reporting from a qualified team.',
  alternates: {
    canonical: 'https://reckonwell.com/industries/technology',
  },
  openGraph: {
    title: 'Accountants for Tech Startups & SaaS Companies | Reckonwell',
    description:
      'Fractional finance for UK tech and SaaS businesses: daily oversight, SaaS metrics, R&D tax relief and investor-ready reporting from a qualified team.',
    url: 'https://reckonwell.com/industries/technology',
    type: 'website',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'Reckonwell – Accountants for tech startups and SaaS companies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accountants for Tech Startups & SaaS Companies | Reckonwell',
    description:
      'Fractional finance for UK tech and SaaS businesses: daily oversight, SaaS metrics, R&D tax relief and investor-ready reporting from a qualified team.',
    images: ['/assets/images/app_logo.png'],
  },
};

const faqs = [
  {
    question: 'Can my software company claim R&D tax relief?',
    answer:
      'Yes. From 1 April 2024 the UK merged its R&D schemes into a single scheme for most companies, replacing the old SME and RDEC schemes. Loss-making companies that are R&D-intensive (qualifying R&D expenditure is at least 30% of total expenditure) may qualify for the Enhanced R&D Intensive Support (ERIS) rate, which provides a higher payable credit. Software development that resolves genuine scientific or technological uncertainty can qualify, including work on algorithms, data processing and novel system architectures. We help you identify qualifying projects, prepare the technical narrative and submit the claim correctly.',
  },
  {
    question: 'How should a SaaS business recognise subscription revenue?',
    answer:
      'Subscription revenue must be recognised over the period to which it relates, not when cash is received. If a customer pays £1,200 for an annual licence upfront, only £100 per month is recognised as revenue; the remaining balance sits as deferred income on the balance sheet. This matters for your management accounts, your statutory accounts and for any investor who wants to understand your true recurring revenue position. Getting this wrong distorts your MRR, ARR and gross margin figures.',
  },
  {
    question: 'What financial reports do investors expect from a startup?',
    answer:
      'Investors typically expect a monthly management pack covering: a profit and loss account against budget, a balance sheet, a cash flow statement, a runway calculation, and key SaaS metrics such as MRR, ARR, churn rate, CAC and LTV. Board-level reporting often adds a commentary on headcount, burn rate and any material variances. We prepare these packs monthly so you are always ready for investor conversations and board meetings without scrambling for numbers at the last minute.',
  },
  {
    question: 'When does a startup need a fractional CFO instead of a bookkeeper?',
    answer:
      'A bookkeeper records transactions. A fractional CFO or fractional finance director interprets them, builds forecasts, challenges assumptions and helps you make better decisions. You need fractional CFO-level support when you are raising investment, managing a board, planning significant hiring, or when your burn rate means you have less than 12 months of runway. Reckonwell\'s fractional finance department provides both: daily bookkeeping and qualified oversight in one service, so you do not need to hire separately.',
  },
  {
    question: 'How do you calculate runway and burn rate?',
    answer:
      'Gross burn rate is your total monthly cash outflow. Net burn rate is the difference between cash out and cash in each month. Runway is your current cash balance divided by your net burn rate. For example, if you have £500,000 in the bank and your net burn is £50,000 per month, you have ten months of runway. We track these figures weekly so you always know where you stand and can model the impact of hiring decisions, new contracts or delayed revenue before committing.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Accounting & Fractional Finance for Tech Startups and SaaS Companies',
  description:
    'Fractional finance for UK tech and SaaS businesses: daily oversight, SaaS metrics, R&D tax relief and investor-ready reporting from a qualified team.',
  provider: {
    '@type': 'AccountingService',
    name: 'Reckonwell',
    url: 'https://reckonwell.com',
  },
  areaServed: { '@type': 'Country', name: 'GB' },
  url: 'https://reckonwell.com/industries/technology',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reckonwell.com' },
    { '@type': 'ListItem', position: 2, name: 'Industries', item: 'https://reckonwell.com/industries' },
    { '@type': 'ListItem', position: 3, name: 'Technology', item: 'https://reckonwell.com/industries/technology' },
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

export default function TechnologyIndustryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main style={{ backgroundColor: 'var(--background)' }}>
        {/* Hero */}
        <section className="pt-32 pb-16 px-6 md:px-16" style={{ backgroundColor: 'var(--background)' }}>
          <div className="max-w-4xl mx-auto">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 font-ui text-xs tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
                <li><Link href="/" style={{ color: 'var(--muted)' }}>Home</Link></li>
                <li aria-hidden="true">›</li>
                <li><Link href="/industries" style={{ color: 'var(--muted)' }}>Industries</Link></li>
                <li aria-hidden="true">›</li>
                <li style={{ color: 'var(--foreground)' }}>Technology</li>
              </ol>
            </nav>

            <h1
              className="font-serif leading-tight mb-4"
              style={{ color: '#0d1b2e', fontSize: 'clamp(32px, 5vw, 58px)' }}
            >
              Accounting &amp; fractional finance for tech and SaaS companies
            </h1>
            <p className="font-body text-lg mb-8" style={{ color: 'var(--muted)' }}>
              Daily financial oversight, SaaS metrics, R&amp;D tax relief and investor-ready reporting — from a qualified team that understands how software businesses grow.
            </p>
            <Link
              href="/book"
              className="font-ui text-xs tracking-widest uppercase inline-block"
              style={{ padding: '14px 32px', backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)', border: '1px solid var(--primary)', borderRadius: '2px', letterSpacing: '2px', fontWeight: 600 }}
            >
              Book a discovery call
            </Link>
          </div>
        </section>

        {/* Pain Points */}
        <section className="py-16 px-6 md:px-16" style={{ backgroundColor: '#f5f0e8' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl mb-8" style={{ color: '#0d1b2e' }}>
              The finance problems technology businesses face
            </h2>
            <p className="font-body text-base leading-relaxed mb-8" style={{ color: 'var(--muted)' }}>
              Tech and SaaS businesses grow fast and the finance function often struggles to keep pace. The problems that cause the most damage are rarely about the product — they are about the numbers behind it.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Deferred and recurring revenue recognition',
                  body: 'Subscription income must be recognised over the period it covers, not when cash arrives. Booking annual contracts as immediate revenue overstates income, distorts your gross margin and creates problems at audit or due diligence.',
                },
                {
                  title: 'Burn rate and runway visibility',
                  body: 'Without weekly tracking of cash in and cash out, founders often discover they have less runway than they thought. By the time the problem is visible in the bank balance, the options are limited.',
                },
                {
                  title: 'SaaS metrics: MRR, churn, CAC and LTV',
                  body: 'Investors and boards expect accurate SaaS metrics. If your bookkeeping does not separate recurring from one-off revenue, or does not track customer acquisition costs by channel, these figures cannot be produced reliably.',
                },
                {
                  title: 'R&D tax relief claims',
                  body: 'Many software companies are entitled to R&D tax relief but either do not claim, claim too little, or submit poorly documented claims that attract HMRC scrutiny. The merged scheme from April 2024 changed the rates and rules — getting this right requires current knowledge.',
                },
                {
                  title: 'Investor and board reporting',
                  body: 'Monthly management packs, board decks and investor updates require clean, timely numbers. If the books are a month behind, you cannot produce these on time and your credibility with investors suffers.',
                },
                {
                  title: 'EMI share options',
                  body: 'Enterprise Management Incentive schemes are a powerful tool for attracting and retaining talent, but they require HMRC valuation, correct accounting treatment and timely notifications. Errors can invalidate the tax advantages for employees.',
                },
              ].map((item) => (
                <div key={item.title} className="bg-white border border-gray-200 p-6">
                  <h3 className="font-serif text-xl mb-3" style={{ color: '#0d1b2e' }}>{item.title}</h3>
                  <p className="font-body text-sm leading-relaxed" style={{ color: '#2a7c8a' }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How Reckonwell Helps */}
        <section className="py-16 px-6 md:px-16" style={{ backgroundColor: 'var(--background)' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl mb-8" style={{ color: '#0d1b2e' }}>
              How Reckonwell helps technology businesses
            </h2>
            <p className="font-body text-base leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
              Reckonwell operates as your fractional finance department — not a once-a-year accountant, but a qualified team working in your business every day. For tech and SaaS companies, that means your books are reconciled daily, your SaaS metrics are calculated from clean data, and your management accounts are ready within days of each month end.
            </p>
            <p className="font-body text-base leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
              We handle the daily bookkeeping so that every transaction is categorised correctly from the start — subscription revenue deferred properly, development costs separated from operational costs, and payroll processed accurately. This foundation means your management accounts reflect reality, not an approximation.
            </p>
            <p className="font-body text-base leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
              Cash flow forecasting is built into our service. We model your runway based on current burn, contracted revenue and planned headcount so you always know how many months of cash you have and what decisions would extend or shorten it. When you are approaching a fundraise, we prepare the financial model and investor-ready pack so you walk into those conversations with confidence.
            </p>
            <p className="font-body text-base leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
              A qualified accountant signs off your numbers every month. That means your management accounts, your R&D claim, your statutory accounts and your VAT returns are all reviewed by someone with the credentials and the sector knowledge to stand behind them. You are not relying on a junior bookkeeper working unsupervised.
            </p>
            <p className="font-body text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
              We also handle compliance — corporation tax, VAT, payroll, confirmation statements — so nothing is missed and no deadlines are approached in a panic. For companies with EMI schemes, we work with your legal advisers to ensure the accounting treatment is correct and HMRC notifications are filed on time.
            </p>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-16 px-6 md:px-16" style={{ backgroundColor: '#f5f0e8' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl mb-8" style={{ color: '#0d1b2e' }}>
              What&apos;s included
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                'Daily bookkeeping and bank reconciliation',
                'Deferred and recurring revenue recognition',
                'Monthly management accounts with SaaS metrics (MRR, ARR, churn, CAC, LTV)',
                'Burn rate and runway tracking',
                'Cash flow forecasting and scenario modelling',
                'R&D tax relief claim preparation and submission',
                'Investor-ready monthly reporting packs',
                'Board pack preparation',
                'Corporation tax and VAT returns',
                'Payroll processing',
                'EMI scheme accounting support',
                'Annual statutory accounts and Companies House filing',
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
        <section className="py-16 px-6 md:px-16" style={{ backgroundColor: 'var(--background)' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl mb-6" style={{ color: '#0d1b2e' }}>
              Software we work with
            </h2>
            <p className="font-body text-base leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
              We work with the tools your tech business already uses. Our team is experienced with the following platforms and can connect them to your accounting system to reduce manual data entry and improve accuracy.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Xero', 'Stripe', 'Chargebee', 'HubSpot', 'Pleo'].map((tool) => (
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
        <section className="py-16 px-6 md:px-16" style={{ backgroundColor: '#f5f0e8' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-2xl mb-6" style={{ color: '#0d1b2e' }}>
              Related services and resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { label: 'R&D Tax Relief', href: '/r-and-d-tax-relief' },
                { label: 'R&D Tax Relief Calculator', href: '/rd-tax-relief-calculator' },
                { label: 'Fractional Finance Department', href: '/fractional-finance-department' },
                { label: 'Bookkeeping for SaaS (US)', href: '/us/bookkeeping-for-saas' },
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
        <section className="py-16 px-6 md:px-16" style={{ backgroundColor: 'var(--background)' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl mb-10" style={{ color: '#0d1b2e' }}>
              Frequently asked questions
            </h2>
            <div className="flex flex-col gap-8">
              {faqs.map((faq) => (
                <div key={faq.question} className="border-b pb-8" style={{ borderColor: '#e5e7eb' }}>
                  <h3 className="font-serif text-xl mb-4" style={{ color: '#0d1b2e' }}>{faq.question}</h3>
                  <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="py-20 px-6 md:px-16 text-center" style={{ backgroundColor: '#0d1b2e' }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl mb-6" style={{ color: '#f5f0e8' }}>
              Tell us about your business
            </h2>
            <p className="font-body text-base leading-relaxed mb-8" style={{ color: '#B8B8B8' }}>
              Book a free discovery call and we&apos;ll explain exactly how Reckonwell&apos;s fractional finance department works for your tech or SaaS business.
            </p>
            <Link
              href="/book"
              className="font-ui text-xs tracking-widest uppercase inline-block"
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
