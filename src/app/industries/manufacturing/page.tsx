import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Manufacturing Accountants & Fractional FD | Reckonwell',
  description:
    'Finance support for UK manufacturers: stock control, product costing, margins, working capital, capital allowances and R&D relief.',
  alternates: {
    canonical: 'https://reckonwell.com/industries/manufacturing',
  },
  openGraph: {
    title: 'Manufacturing Accountants & Fractional FD | Reckonwell',
    description:
      'Finance support for UK manufacturers: stock control, product costing, margins, working capital, capital allowances and R&D relief.',
    url: 'https://reckonwell.com/industries/manufacturing',
    type: 'website',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'Reckonwell – Manufacturing accountants and fractional finance director',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manufacturing Accountants & Fractional FD | Reckonwell',
    description:
      'Finance support for UK manufacturers: stock control, product costing, margins, working capital, capital allowances and R&D relief.',
    images: ['/assets/images/app_logo.png'],
  },
};

const faqs = [
  {
    question: 'How should a manufacturer value stock and work in progress?',
    answer:
      'Under UK GAAP, stock and work in progress (WIP) are valued at the lower of cost and net realisable value. For a manufacturer, cost includes raw materials, direct labour and an appropriate share of production overheads — not just the purchase price of materials. WIP is valued at the cost incurred to date, including materials consumed and labour applied. Finished goods include the full cost of production. Getting this right matters because stock valuation directly affects your cost of goods sold, your gross margin and your balance sheet. Overstating stock overstates profit; understating it understates profit.',
  },
  {
    question: 'Can manufacturers claim R&D tax relief for process improvements?',
    answer:
      'Yes, provided the work meets the definition of R&D for tax purposes. HMRC requires that the project seeks to achieve an advance in science or technology by resolving a scientific or technological uncertainty — not just an uncertainty about whether something is commercially viable. Process improvements that involve genuine technical challenges, such as developing a new manufacturing method, improving yield through novel techniques, or solving a materials science problem, can qualify. The merged R&D scheme applies from 1 April 2024. We help manufacturers identify qualifying projects, prepare the technical narrative and submit the claim correctly.',
  },
  {
    question: 'What is full expensing and does it apply to my machinery?',
    answer:
      'Full expensing is a 100% first-year capital allowance for companies on qualifying new plant and machinery. It was made permanent in the Autumn Statement 2023. It allows a company to deduct the full cost of qualifying capital expenditure in the year of purchase, rather than writing it down over several years. Qualifying assets include most new plant and machinery — CNC machines, production equipment, vehicles (excluding cars) and fixtures. Second-hand assets and assets for leasing do not qualify. The Annual Investment Allowance (AIA) provides a similar 100% deduction up to £1 million per year and applies to both new and second-hand assets.',
  },
  {
    question: 'How do I work out the true cost and margin of each product?',
    answer:
      'True product costing requires you to allocate not just direct materials and direct labour but also an appropriate share of manufacturing overheads — machine time, factory rent, utilities, quality control and supervision. This is known as absorption costing. Without it, your product margins are understated and you may be pricing products below their true cost without realising it. We help manufacturers set up a costing model that allocates overheads systematically, so you can see the true margin on each product line and make informed decisions about pricing, product mix and capacity.',
  },
  {
    question: 'How can we improve working capital?',
    answer:
      'Working capital is the difference between your current assets (stock, debtors, cash) and your current liabilities (creditors, short-term borrowings). Improving it means either reducing the cash tied up in stock and debtors or extending the time you take to pay suppliers. Practically, this means reviewing your stock holding levels and reorder points, tightening your credit control process to reduce debtor days, and negotiating better payment terms with suppliers. We model your working capital cycle and identify where the biggest improvements can be made, then track progress monthly so you can see the impact.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Accounting and Financial Control for Manufacturers',
  description:
    'Finance support for UK manufacturers: stock control, product costing, margins, working capital, capital allowances and R&D relief.',
  provider: {
    '@type': 'AccountingService',
    name: 'Reckonwell',
    url: 'https://reckonwell.com',
  },
  areaServed: { '@type': 'Country', name: 'GB' },
  url: 'https://reckonwell.com/industries/manufacturing',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reckonwell.com' },
    { '@type': 'ListItem', position: 2, name: 'Industries', item: 'https://reckonwell.com/industries' },
    { '@type': 'ListItem', position: 3, name: 'Manufacturing', item: 'https://reckonwell.com/industries/manufacturing' },
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

export default function ManufacturingIndustryPage() {
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
                <li style={{ color: 'var(--foreground)' }}>Manufacturing</li>
              </ol>
            </nav>

            <h1
              className="font-serif leading-tight mb-4"
              style={{ color: '#0d1b2e', fontSize: 'clamp(26px, 5vw, 58px)' }}
            >
              Accounting and financial control for manufacturers
            </h1>
            <p className="font-body text-base md:text-lg mb-7 md:mb-8" style={{ color: 'var(--muted)' }}>
              Stock control, product costing, working capital and capital allowances — from a team with hands-on manufacturing finance experience.
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

        {/* Why Us */}
        <section className="py-8 md:py-12 px-4 sm:px-6 md:px-16" style={{ backgroundColor: '#e8edf4' }}>
          <div className="max-w-4xl mx-auto">
            <p className="font-body text-base leading-relaxed" style={{ color: '#0d1b2e' }}>
              <strong>Why Reckonwell for manufacturing:</strong> Our founder works as a financial controller in a precision engineering manufacturer supplying the automotive sector. That means the advice and financial controls we bring to manufacturing clients are grounded in real operational experience — not just textbook knowledge. We understand the pressures of managing stock across a production cycle, the importance of accurate job costing, and the financial discipline required to maintain margins in a competitive, cost-sensitive industry.
            </p>
          </div>
        </section>

        {/* Pain Points */}
        <section className="py-10 md:py-16 px-4 sm:px-6 md:px-16" style={{ backgroundColor: '#f5f0e8' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl mb-6 md:mb-8" style={{ color: '#0d1b2e' }}>
              The finance problems manufacturing businesses face
            </h2>
            <p className="font-body text-base leading-relaxed mb-6 md:mb-8" style={{ color: 'var(--muted)' }}>
              Manufacturing businesses face financial challenges that are distinct from service businesses or retailers. The complexity of production, stock and purchasing creates specific accounting problems that generic accounting software and generalist accountants often handle poorly.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {[
                {
                  title: 'Stock and work-in-progress valuation',
                  body: 'Valuing raw materials, WIP and finished goods correctly at each period end is one of the most technically demanding aspects of manufacturing accounting. Errors in stock valuation flow directly into your cost of goods sold and distort your gross margin.',
                },
                {
                  title: 'Standard costing and true product margins',
                  body: 'Without a proper costing model that allocates direct materials, direct labour and manufacturing overheads to each product, you cannot know whether you are pricing correctly. Many manufacturers discover they have been selling certain products below cost only when the annual accounts are prepared.',
                },
                {
                  title: 'Purchasing and supplier terms',
                  body: 'Managing supplier payment terms, early payment discounts and the timing of large purchase orders has a significant impact on cash flow. Without visibility of upcoming commitments, it is easy to create a cash squeeze by paying suppliers before customers have paid you.',
                },
                {
                  title: 'Working capital and customer credit terms',
                  body: 'Manufacturing businesses often have long cash conversion cycles — raw materials are purchased, production takes time, finished goods sit in stock, and customers take 30 to 60 days to pay. Managing this cycle requires careful planning and accurate forecasting.',
                },
                {
                  title: 'Capital expenditure planning',
                  body: 'Investment in new machinery, tooling and equipment is essential for maintaining competitiveness, but capex decisions require careful financial analysis. Understanding the tax treatment — full expensing, AIA, or writing down allowances — affects the timing of tax relief and the true cost of the investment.',
                },
                {
                  title: 'Quality and compliance cost control',
                  body: 'For manufacturers supplying regulated industries, the cost of quality — inspection, testing, certification, non-conformance and rework — can be significant. Tracking these costs accurately helps identify where processes need improvement and supports the business case for investment.',
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
              How Reckonwell helps manufacturing businesses
            </h2>
            <p className="font-body text-base leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
              Reckonwell&apos;s fractional finance department provides the financial controls and reporting that a growing manufacturer needs, without the cost of a full-time finance director. We handle the daily bookkeeping, maintain your stock records, prepare monthly management accounts and provide the financial analysis that supports better operational decisions.
            </p>
            <p className="font-body text-base leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
              Product costing is central to our work with manufacturers. We help you build and maintain a costing model that allocates direct costs and manufacturing overheads to each product line, so your management accounts show true gross margin by product. This gives you the information you need to make pricing decisions, identify underperforming products and plan your production mix.
            </p>
            <p className="font-body text-base leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
              Working capital management is built into our monthly reporting. We track your debtor days, creditor days and stock turn, and flag when any of these are moving in the wrong direction. We model the cash impact of large purchase orders and help you plan the timing of supplier payments to avoid unnecessary cash pressure.
            </p>
            <p className="font-body text-base leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
              For capital expenditure, we advise on the available tax reliefs — full expensing for new qualifying plant and machinery, the Annual Investment Allowance for both new and second-hand assets, and R&D tax relief where process development qualifies. We prepare and submit R&D claims where the technical criteria are met, and we work with you to document qualifying projects throughout the year rather than scrambling at year end.
            </p>
            <p className="font-body text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
              A qualified accountant signs off your numbers every month. Your management accounts, your statutory accounts and your tax returns are all reviewed by someone who understands manufacturing finance and can stand behind the figures.
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
                'Daily bookkeeping and bank reconciliation',
                'Stock and WIP valuation support',
                'Product costing model and margin analysis',
                'Monthly management accounts',
                'Working capital tracking (debtor days, creditor days, stock turn)',
                'Cash flow forecasting',
                'Capital expenditure planning and tax relief advice',
                'R&D tax relief claim preparation',
                'Corporation tax and VAT returns',
                'Payroll processing',
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
        <section className="py-10 md:py-16 px-4 sm:px-6 md:px-16" style={{ backgroundColor: 'var(--background)' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl mb-5 md:mb-6" style={{ color: '#0d1b2e' }}>
              Software we work with
            </h2>
            <p className="font-body text-base leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
              We work with accounting and inventory management systems used by UK manufacturers, and can integrate these with your production planning tools.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Sage', 'Xero', 'MRP/ERP Systems', 'Unleashed', 'Katana'].map((tool) => (
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
                { label: 'R&D Tax Relief', href: '/r-and-d-tax-relief' },
                { label: 'R&D Tax Relief Calculator', href: '/rd-tax-relief-calculator' },
                { label: 'Fractional Finance Department', href: '/fractional-finance-department' },
                { label: 'Payroll Services', href: '/payroll-services' },
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
              Book a free discovery call and we&apos;ll explain exactly how Reckonwell&apos;s fractional finance department works for your manufacturing business.
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
