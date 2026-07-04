import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import Header from '@/components/Header';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Terms of Service | Reckonwell',
  description: 'Reckonwell Finance Terms and Conditions — governing the provision of accounting services.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/terms-of-service`,
  },
  openGraph: {
    title: 'Terms of Service | Reckonwell',
    description: 'Reckonwell Finance Terms and Conditions — governing the provision of accounting services.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/terms-of-service`,
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'Reckonwell - Premium accounting firm',
      },
    ],
  },
};

function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-baseline gap-4 mb-5">
        <span
          className="font-ui text-xs"
          style={{ color: 'var(--primary)', letterSpacing: '2px', fontSize: '10px', minWidth: '24px' }}
        >
          {number.padStart(2, '0')}
        </span>
        <h2
          className="font-display text-xl md:text-2xl"
          style={{ color: 'var(--foreground)', fontWeight: 300, lineHeight: 1.3 }}
        >
          {title}
        </h2>
      </div>
      <div
        className="pl-10 font-ui space-y-3"
        style={{ color: 'var(--muted)', lineHeight: 1.9, fontSize: '15px' }}
      >
        {children}
      </div>
    </section>
  );
}

export default function TermsOfServicePage() {
  return (
    <>
      <Header />
      <main
        className="min-h-screen pt-32 pb-24 px-6 md:px-10"
        style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
      >
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-ui text-xs uppercase tracking-widest mb-12 transition-colors duration-200"
            style={{ color: 'var(--muted)', letterSpacing: '2px', fontSize: '10px' }}
          >
            <span style={{ color: 'var(--primary)' }}>←</span> Back to Home
          </Link>

          {/* Header */}
          <div className="mb-16">
            <p
              className="font-ui text-xs uppercase tracking-widest mb-4"
              style={{ color: 'var(--primary)', letterSpacing: '3px', fontSize: '10px' }}
            >
              Legal
            </p>
            <h1
              className="font-display text-4xl md:text-5xl mb-6"
              style={{ color: 'var(--foreground)', fontWeight: 300, lineHeight: 1.15 }}
            >
              Terms of Service
            </h1>
            <p
              className="font-ui text-sm"
              style={{ color: 'var(--muted)', letterSpacing: '0.5px', lineHeight: 1.8, fontSize: '15px' }}
            >
              These terms and conditions govern the provision of services by Reckonwell Finance (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) to our clients (&ldquo;you&rdquo; or &ldquo;your&rdquo;). By engaging our services, you agree to these terms and conditions.
            </p>
          </div>

          {/* Divider */}
          <div className="mb-12" style={{ height: '1px', backgroundColor: 'var(--primary)', opacity: 0.3 }} />

          {/* Sections */}
          <div className="space-y-12">

            <Section number="1" title="Services">
              <p>We will provide you with the accounting services specified in our engagement letter. We will perform these services with due care and skill in accordance with the relevant professional standards. We will maintain the confidentiality of all information that you provide to us.</p>
            </Section>

            <Section number="2" title="Fees">
              <p>We will charge you fees for our services at our standard rates, as set out in our engagement letter. We will notify you in advance of any expenses that we incur in connection with the provision of our services, such as travel expenses or out-of-pocket expenses. We will invoice you for our fees and expenses on a regular basis, as set out in our engagement letter.</p>
            </Section>

            <Section number="3" title="Subscription Fees">
              <p>You will be charged a subscription fee for our services on a monthly or annual basis, as specified in our engagement letter. The subscription fee will be payable in advance for the relevant subscription period.</p>
            </Section>

            <Section number="4" title="Automatic Renewal">
              <p>Your subscription will automatically renew at the end of each subscription period, unless you give us written notice that you wish to terminate your subscription. If your subscription is renewed, we will automatically charge your nominated payment method for the relevant subscription fee.</p>
            </Section>

            <Section number="5" title="Payment Method">
              <p>You must nominate a payment method for the payment of your subscription fee, such as a credit card or direct debit. You must ensure that your nominated payment method is valid and up to date at all times. If we are unable to process your payment due to an invalid or expired payment method, we may suspend or terminate your subscription.</p>
            </Section>

            <Section number="6" title="Late Payment">
              <p>If you fail to pay your subscription fee on time, we reserve the right to suspend or terminate your subscription. We may also charge interest on any unpaid amounts at a rate of 5% per month or part thereof.</p>
            </Section>

            <Section number="7" title="Refunds">
              <p>We do not provide refunds for any subscription fees that have been paid, unless required by law.</p>
            </Section>

            <Section number="8" title="Termination">
              <p>You may terminate our engagement at any time by giving us written notice. If you terminate our engagement, you will be liable for our fees and expenses up to the date of termination.</p>
              <p>We may terminate our engagement at any time by giving you written notice. If we terminate our engagement, we will refund any fees that you have paid in advance for services that we have not yet provided.</p>
            </Section>

            <Section number="9" title="Liability">
              <p>We will not be liable for any loss or damage that you may suffer as a result of any act or omission by us, unless that loss or damage is caused by our negligence or wilful misconduct. Our liability for any loss or damage that you may suffer as a result of our negligence or wilful misconduct will be limited to the fees that you have paid to us for the relevant services.</p>
            </Section>

            <Section number="10" title="Confidentiality">
              <p>We will keep all information that you provide to us confidential, except where we are required by law to disclose it or where you have given us permission to disclose it. We may use your information for the purposes of providing our services to you and for other purposes that you have authorised.</p>
            </Section>

            <Section number="11" title="Intellectual Property">
              <p>All intellectual property rights in any reports, documents, or other materials that we produce in connection with the provision of our services will remain our property. You may use these materials for your own internal purposes, but you may not use them for any other purpose without our prior written consent.</p>
            </Section>

            <Section number="12" title="Governing Law and Jurisdiction">
              <p>These terms and conditions will be governed by and construed in accordance with the laws of England and Wales. Any disputes arising under these terms and conditions will be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
            </Section>

            <Section number="13" title="Amendments">
              <p>We may amend these terms and conditions at any time by giving you written notice. Your continued engagement of our services following receipt of such notice will constitute your acceptance of the amended terms and conditions.</p>
            </Section>

            <Section number="14" title="Entire Agreement">
              <p>These terms and conditions constitute the entire agreement between us and supersede all previous agreements or arrangements relating to the provision of our services. No variation of these terms and conditions will be effective unless it is in writing and signed by both parties.</p>
            </Section>

          </div>

          {/* Divider */}
          <div className="mt-16 mb-10" style={{ height: '1px', backgroundColor: 'var(--primary)', opacity: 0.3 }} />

          {/* Closing statement */}
          <div
            className="rounded-lg p-6"
            style={{ backgroundColor: 'var(--surface)', border: '1px solid rgba(var(--primary-rgb, 180,140,60), 0.2)' }}
          >
            <p style={{ color: 'var(--muted)', lineHeight: 1.9, fontSize: '15px' }}>
              By engaging our services, you acknowledge that you have read, understood, and agreed to these terms and conditions.
            </p>
            <p className="mt-4" style={{ color: 'var(--foreground)', fontWeight: 500 }}>Reckonwell Finance</p>
            <p style={{ color: 'var(--muted)', fontSize: '13px' }}>124 City Road, London EC1V 2NX</p>
          </div>

        </div>
      </main>
    </>
  );
}
