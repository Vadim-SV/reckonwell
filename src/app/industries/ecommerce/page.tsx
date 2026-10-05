import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'E-commerce Accountants for Shopify & Amazon Sellers | Reckonwell',
  description:
    'Accounting for UK e-commerce brands: Shopify, Amazon and marketplace payout reconciliation, stock, VAT and daily cash visibility.',
  alternates: {
    canonical: 'https://reckonwell.com/industries/ecommerce',
  },
  openGraph: {
    title: 'E-commerce Accountants for Shopify & Amazon Sellers | Reckonwell',
    description:
      'Accounting for UK e-commerce brands: Shopify, Amazon and marketplace payout reconciliation, stock, VAT and daily cash visibility.',
    url: 'https://reckonwell.com/industries/ecommerce',
    type: 'website',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'Reckonwell – E-commerce accountants for Shopify and Amazon sellers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-commerce Accountants for Shopify & Amazon Sellers | Reckonwell',
    description:
      'Accounting for UK e-commerce brands: Shopify, Amazon and marketplace payout reconciliation, stock, VAT and daily cash visibility.',
    images: ['/assets/images/app_logo.png'],
  },
};

const faqs = [
  {
    question: 'How do you reconcile Shopify and Amazon payouts?',
    answer:
      'The correct approach is to record gross sales, platform fees and refunds as separate line items in your accounts — not just the net payout that lands in your bank. If you only book the net figure, your revenue is understated, your cost of sales is missing the platform fees, and your gross margin is meaningless. We use tools such as A2X or Link My Books to pull the detailed settlement data from each platform and post it correctly into Xero, so your accounts reflect what actually happened in your business.',
  },
  {
    question: 'Who accounts for VAT when I sell on a marketplace?',
    answer:
      'For overseas sellers and for goods imported into the UK with a value of £135 or less, the marketplace (Shopify, Amazon, eBay etc.) is responsible for collecting and remitting UK VAT — this is the deemed supplier rule. However, if you are a UK-established seller selling goods already in the UK, you are responsible for accounting for VAT on your own sales in the normal way. The rules are different again for B2B sales. We help you understand which rule applies to each of your sales channels and ensure your VAT returns are filed correctly.',
  },
  {
    question: 'How do I sell to EU customers and handle VAT?',
    answer:
      'If you are selling goods to consumers in EU member states, you may need to register for VAT in those countries or use the EU One Stop Shop (OSS) scheme. OSS allows you to report and pay VAT on all your EU B2C sales through a single registration in one EU member state, rather than registering separately in each country. The threshold for mandatory OSS registration is €10,000 of cross-border EU sales per year. We can help you understand your obligations and work with EU VAT specialists where registration is required.',
  },
  {
    question: 'How should I value stock at year end?',
    answer:
      'Under UK GAAP, stock is valued at the lower of cost and net realisable value. Cost includes the purchase price plus any directly attributable costs of bringing the stock to its present location and condition — typically freight and import duties. Net realisable value is the estimated selling price less any costs to complete and sell. If you have slow-moving or obsolete stock, you should write it down to its net realisable value. Getting this right matters because stock valuation directly affects your cost of goods sold and therefore your gross profit.',
  },
  {
    question: 'How can I see my real profit per channel?',
    answer:
      'To calculate true profit per channel you need to allocate not just the cost of goods sold but also the platform fees, advertising spend, fulfilment costs and returns for each channel separately. This requires your bookkeeping to track these costs by channel from the start, rather than lumping everything together. We set up your chart of accounts and reporting structure so that your monthly management accounts show gross margin and contribution by channel — Shopify, Amazon, wholesale, direct — so you can see where you are actually making money.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Accounting for E-commerce and Online Retail Businesses',
  description:
    'Accounting for UK e-commerce brands: Shopify, Amazon and marketplace payout reconciliation, stock, VAT and daily cash visibility.',
  provider: {
    '@type': 'AccountingService',
    name: 'Reckonwell',
    url: 'https://reckonwell.com',
  },
  areaServed: { '@type': 'Country', name: 'GB' },
  url: 'https://reckonwell.com/industries/ecommerce',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reckonwell.com' },
    { '@type': 'ListItem', position: 2, name: 'Industries', item: 'https://reckonwell.com/industries' },
    { '@type': 'ListItem', position: 3, name: 'E-Commerce', item: 'https://reckonwell.com/industries/ecommerce' },
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

export default function EcommerceIndustryPage() {
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
                <li style={{ color: 'var(--foreground)' }}>E-Commerce</li>
              </ol>
            </nav>

            <h1
              className="font-serif leading-tight mb-4"
              style={{ color: '#0d1b2e', fontSize: 'clamp(26px, 5vw, 58px)' }}
            >
              Accounting for e-commerce and online retail businesses
            </h1>
            <p className="font-body text-base md:text-lg mb-7 md:mb-8" style={{ color: 'var(--muted)' }}>
              Multi-channel payout reconciliation, stock valuation, VAT and daily cash visibility — so you always know your true margin on every platform.
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
              The finance problems e-commerce businesses face
            </h2>
            <p className="font-body text-base leading-relaxed mb-6 md:mb-8" style={{ color: 'var(--muted)' }}>
              E-commerce businesses generate a lot of transactions across multiple platforms, and the accounting complexity grows with every channel you add. The problems that erode profitability are often invisible until the year-end accounts arrive.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {[
                {
                  title: 'Payouts net of fees and refunds',
                  body: 'Shopify and Amazon pay out a net figure after deducting their fees, advertising costs and refunds. If you book only the net payout, your revenue is understated, your cost of sales is incomplete and your gross margin is wrong. You cannot make good decisions from these numbers.',
                },
                {
                  title: 'Multi-channel reconciliation',
                  body: 'Selling across Shopify, Amazon, eBay and a wholesale channel means four different settlement reports, four different fee structures and four different payout schedules. Without a systematic reconciliation process, errors accumulate and your accounts drift further from reality each month.',
                },
                {
                  title: 'Stock valuation and COGS',
                  body: 'Stock must be valued correctly at each month end and year end. If you are buying in bulk, importing from overseas or holding slow-moving lines, the cost of goods sold figure in your accounts can be significantly wrong — which means your gross profit is wrong too.',
                },
                {
                  title: 'VAT on UK and EU sales',
                  body: 'The VAT rules for e-commerce are complex and have changed significantly in recent years. The deemed supplier rules for marketplaces, the EU OSS scheme for cross-border sales, and the treatment of imported goods all require careful handling to avoid underpaying or overpaying VAT.',
                },
                {
                  title: 'Cash tied up in inventory',
                  body: 'Fast-growing e-commerce businesses often run into cash flow problems not because they are unprofitable but because cash is tied up in stock. Understanding your cash conversion cycle and planning your purchasing accordingly requires accurate, timely financial data.',
                },
                {
                  title: 'True margin per product and channel',
                  body: 'Knowing your overall gross margin is useful. Knowing your margin per product, per channel and after all platform costs is what allows you to make good decisions about where to invest your marketing budget and which products to scale.',
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
              How Reckonwell helps e-commerce businesses
            </h2>
            <p className="font-body text-base leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
              Reckonwell&apos;s fractional finance department handles the daily bookkeeping for your e-commerce business, which means every settlement from every platform is reconciled correctly and on time. We use integration tools to pull data directly from Shopify, Amazon and other platforms into Xero, so the gross sales, fees and refunds are recorded as separate line items — not just the net payout.
            </p>
            <p className="font-body text-base leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
              Stock valuation is built into our monthly process. We work with you to ensure your cost of goods sold is calculated correctly each month, taking into account landed costs, import duties and any write-downs for slow-moving stock. This means your gross margin figures are reliable and your year-end accounts do not require significant adjustments.
            </p>
            <p className="font-body text-base leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
              VAT is handled as part of our compliance service. We prepare and file your quarterly VAT returns, advise on the correct treatment for each sales channel, and flag any changes in the rules that affect your business. If you are selling into the EU and need to consider the OSS scheme, we will guide you through the options.
            </p>
            <p className="font-body text-base leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
              Cash flow forecasting is particularly important for e-commerce businesses with seasonal peaks and significant stock purchasing cycles. We build a rolling cash flow forecast that shows you when you need to place purchase orders, when VAT payments fall due and how much cash you will have available at any point in the next three to six months.
            </p>
            <p className="font-body text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
              A qualified accountant reviews and signs off your numbers every month. You are not relying on automated software alone — there is a qualified professional checking that the figures make sense and that nothing has been miscategorised.
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
                'Multi-channel payout reconciliation (Shopify, Amazon, eBay, etc.)',
                'Gross sales, fees and refunds recorded separately',
                'Stock valuation and COGS calculation',
                'Monthly management accounts with margin by channel',
                'Cash flow forecasting and inventory planning support',
                'VAT returns (UK and EU OSS guidance)',
                'Making Tax Digital compliance',
                'Payroll processing',
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
              We integrate with the platforms and tools your e-commerce business already uses, reducing manual data entry and improving the accuracy of your accounts.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Xero', 'Shopify', 'Amazon Seller Central', 'A2X', 'Link My Books', 'Stripe', 'PayPal'].map((tool) => (
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
                { label: 'VAT Returns', href: '/vat-returns' },
                { label: 'Bookkeeping Services', href: '/bookkeeping-services' },
                { label: 'Making Tax Digital', href: '/making-tax-digital' },
                { label: 'Bookkeeping for E-commerce (US)', href: '/us/bookkeeping-for-ecommerce' },
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
              Book a free discovery call and we&apos;ll explain exactly how Reckonwell&apos;s fractional finance department works for your e-commerce business.
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
