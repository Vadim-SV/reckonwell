'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
}

interface PriceBreakdown {
  label: string;
  amount: number;
  note?: string;
}

const FAQS = [
  {
    q: 'Who needs to file a Self Assessment?',
    a: 'Anyone who is self-employed, a sole trader, or has income outside of PAYE — including rental income, dividends, or foreign income. If HMRC has asked you to file, you must file.',
  },
  {
    q: 'What does "monthly monitoring" include?',
    a: 'Monthly monitoring means we review your income and expenses every month, provide a running tax estimate, and flag anything that needs attention — rather than waiting until January to look at the whole year.',
  },
  {
    q: 'Do I need to do anything myself?',
    a: 'Very little. You share access to your bank and any invoicing tools. We handle the categorisation, calculations, and filing. You approve the return before it goes to HMRC.',
  },
  {
    q: 'What if my income changes during the year?',
    a: 'That\'s exactly why monthly monitoring exists. We adjust your tax estimate in real time so there are no surprises at year-end.',
  },
];

function calcPrice(
  income: number,
  hasRental: boolean,
  monitoring: 'annual' | 'monthly',
  transactions: 'low' | 'medium' | 'high'
): { monthly: number; breakdown: PriceBreakdown[] } {
  const breakdown: PriceBreakdown[] = [];

  // Base
  let base = 80;
  if (income >= 250000) {
    base = 400;
  } else if (income >= 100000 && monitoring === 'monthly') {
    base = 250;
  } else if (income >= 50000 || hasRental || monitoring === 'monthly') {
    base = 150;
  }
  breakdown.push({ label: 'Base fee', amount: base });

  // Multiplier
  const multiplierMap = { low: 1.0, medium: 1.2, high: 1.5 };
  const mult = multiplierMap[transactions];
  const afterMult = Math.round(base * mult);
  if (mult > 1) {
    breakdown.push({ label: `Transaction volume (${transactions})`, amount: afterMult - base, note: `×${mult}` });
  }

  let total = afterMult;

  // Add-ons
  if (monitoring === 'monthly') {
    breakdown.push({ label: 'Monthly tax planning', amount: 75 });
    total += 75;
  } else if (income >= 50000) {
    breakdown.push({ label: 'Quarterly tax estimates', amount: 50 });
    total += 50;
  }

  if (income >= 50000) {
    breakdown.push({ label: 'MTD compliance (income >£50k)', amount: 75 });
    total += 75;
  }

  return { monthly: total, breakdown };
}

export default function SelfAssessmentCalculatorPage() {
  const [step, setStep] = useState(0);
  const [income, setIncome] = useState(50000);
  const [hasRental, setHasRental] = useState<boolean | null>(null);
  const [monitoring, setMonitoring] = useState<'annual' | 'monthly' | null>(null);
  const [transactions, setTransactions] = useState<'low' | 'medium' | 'high' | null>(null);
  const [result, setResult] = useState<{ monthly: number; breakdown: PriceBreakdown[] } | null>(null);
  const [form, setForm] = useState<FormData>({ name: '', email: '', company: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const totalSteps = 4;

  const formatIncome = (v: number) => {
    if (v >= 1000000) return `£${(v / 1000000).toFixed(1)}m`;
    if (v >= 1000) return `£${(v / 1000).toFixed(0)}k`;
    return `£${v}`;
  };

  const handleCalculate = () => {
    if (hasRental === null || monitoring === null || transactions === null) return;
    const res = calcPrice(income, hasRental, monitoring, transactions);
    setResult(res);
    setStep(4);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!result) return;
    setSubmitting(true);
    try {
      await fetch('/api/calculator-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          calculator_type: 'self-assessment',
          page: 'self-assessment',
          name: form.name,
          email: form.email,
          company: form.company,
          phone: form.phone,
          recommended_tier: 'Self Assessment',
          recommended_monthly_price: result.monthly,
          recommended_annual_price: result.monthly * 12,
          recommended_price: result.monthly,
          price_breakdown: result.breakdown.map(b => `${b.label}: £${b.amount}${b.note ? ` (${b.note})` : ''}`),
          inputs: {
            annual_income: income,
            has_rental_income: hasRental,
            monitoring_preference: monitoring,
            transaction_volume: transactions,
          },
          company_details: {
            annual_income: income,
            has_rental_income: hasRental,
            monitoring_preference: monitoring,
            transaction_volume: transactions,
          },
          timestamp: new Date().toISOString(),
        }),
      });
      setSubmitted(true);
    } catch {
      // silent
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main style={{ backgroundColor: 'var(--background)', minHeight: '100vh' }}>
      <Header />

      {/* Hero / Intro */}
      <section className="pt-32 pb-16 px-6 md:px-10" style={{ borderBottom: '1px solid var(--gold-border)' }}>
        <div className="max-w-3xl mx-auto">
          <p className="section-label mb-4">Self Assessment Calculator</p>
          <h1 className="section-h2-medium mb-6">
            Know exactly what your{' '}
            <span className="gold-italic">Self Assessment costs.</span>
          </h1>
          <p className="body-text-rw mb-4" style={{ color: 'var(--body-text)' }}>
            Self Assessment doesn&apos;t have to be a January panic. Whether you&apos;re a sole trader, freelancer, or have income outside PAYE, we handle your return and keep your tax position clear throughout the year.
          </p>
          <p className="body-text-rw mb-4" style={{ color: 'var(--body-text)' }}>
            The price depends on your income level, whether you have rental income, and how closely you want us monitoring your position. Use the calculator below to get your exact monthly figure.
          </p>
          <p className="body-text-rw" style={{ color: 'var(--body-text)' }}>
            No hidden fees. No surprises. Just a fixed monthly price that covers everything.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">

          {/* Progress */}
          {step < 4 && (
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-2">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      height: '3px',
                      flex: 1,
                      borderRadius: '2px',
                      backgroundColor: i < step ? 'var(--primary)' : 'rgba(201,168,76,0.2)',
                      transition: 'background 0.3s',
                    }}
                  />
                ))}
              </div>
              <p style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '2px', textTransform: 'uppercase' }}>
                Step {step + 1} of {totalSteps}
              </p>
            </div>
          )}

          {/* Step 0: Income */}
          {step === 0 && (
            <div>
              <h2 className="section-h2-medium mb-3" style={{ fontSize: 'clamp(22px,3vw,36px)' }}>What is your annual income?</h2>
              <p className="body-text-rw mb-8" style={{ color: 'var(--muted)', fontSize: '14px' }}>Include all self-employment and trading income.</p>
              <div className="mb-6">
                <div style={{ fontSize: 'clamp(28px,4vw,48px)', fontFamily: 'var(--font-display)', color: 'var(--primary)', marginBottom: '16px' }}>
                  {formatIncome(income)}
                </div>
                <input
                  type="range"
                  min={0}
                  max={1000000}
                  step={5000}
                  value={income}
                  onChange={e => setIncome(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--primary)', height: '6px', cursor: 'pointer' }}
                />
                <div className="flex justify-between mt-2" style={{ fontSize: '11px', color: 'var(--muted)' }}>
                  <span>£0</span><span>£500k</span><span>£1m+</span>
                </div>
              </div>
              <button
                onClick={() => setStep(1)}
                style={{
                  padding: '14px 32px',
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  border: 'none',
                  borderRadius: '2px',
                  fontSize: '13px',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  minHeight: '48px',
                }}
              >
                Continue →
              </button>
            </div>
          )}

          {/* Step 1: Rental income */}
          {step === 1 && (
            <div>
              <h2 className="section-h2-medium mb-3" style={{ fontSize: 'clamp(22px,3vw,36px)' }}>Do you have rental income?</h2>
              <p className="body-text-rw mb-8" style={{ color: 'var(--muted)', fontSize: '14px' }}>Income from residential or commercial property you let out.</p>
              <div className="flex flex-col gap-3 mb-8">
                {[{ label: 'Yes', value: true }, { label: 'No', value: false }].map(opt => (
                  <button
                    key={String(opt.value)}
                    onClick={() => setHasRental(opt.value)}
                    style={{
                      padding: '16px 24px',
                      textAlign: 'left',
                      border: `1px solid ${hasRental === opt.value ? 'var(--primary)' : 'var(--gold-border)'}`,
                      backgroundColor: hasRental === opt.value ? 'var(--gold-dim)' : 'var(--card)',
                      color: hasRental === opt.value ? 'var(--primary)' : 'var(--foreground)',
                      borderRadius: '2px',
                      fontSize: '15px',
                      fontFamily: 'var(--font-sans)',
                      cursor: 'pointer',
                      minHeight: '52px',
                      transition: 'all 0.2s',
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(0)} style={{ padding: '14px 24px', background: 'transparent', border: '1px solid var(--gold-border)', color: 'var(--muted)', borderRadius: '2px', fontSize: '13px', cursor: 'pointer', minHeight: '48px' }}>← Back</button>
                <button
                  onClick={() => hasRental !== null && setStep(2)}
                  disabled={hasRental === null}
                  style={{
                    padding: '14px 32px',
                    backgroundColor: hasRental !== null ? 'var(--primary)' : 'rgba(201,168,76,0.3)',
                    color: 'var(--primary-foreground)',
                    border: 'none',
                    borderRadius: '2px',
                    fontSize: '13px',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    cursor: hasRental !== null ? 'pointer' : 'not-allowed',
                    minHeight: '48px',
                  }}
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Monitoring */}
          {step === 2 && (
            <div>
              <h2 className="section-h2-medium mb-3" style={{ fontSize: 'clamp(22px,3vw,36px)' }}>How do you want us to monitor your tax?</h2>
              <p className="body-text-rw mb-8" style={{ color: 'var(--muted)', fontSize: '14px' }}>Monthly monitoring means we review your position every month and flag anything that needs attention.</p>
              <div className="flex flex-col gap-3 mb-8">
                {[
                  { label: 'Annual filing only', sub: 'We file your return once a year', value: 'annual' as const },
                  { label: 'Monthly monitoring', sub: 'Monthly review + running tax estimate throughout the year', value: 'monthly' as const },
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setMonitoring(opt.value)}
                    style={{
                      padding: '16px 24px',
                      textAlign: 'left',
                      border: `1px solid ${monitoring === opt.value ? 'var(--primary)' : 'var(--gold-border)'}`,
                      backgroundColor: monitoring === opt.value ? 'var(--gold-dim)' : 'var(--card)',
                      color: monitoring === opt.value ? 'var(--primary)' : 'var(--foreground)',
                      borderRadius: '2px',
                      fontSize: '15px',
                      fontFamily: 'var(--font-sans)',
                      cursor: 'pointer',
                      minHeight: '52px',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div>{opt.label}</div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>{opt.sub}</div>
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} style={{ padding: '14px 24px', background: 'transparent', border: '1px solid var(--gold-border)', color: 'var(--muted)', borderRadius: '2px', fontSize: '13px', cursor: 'pointer', minHeight: '48px' }}>← Back</button>
                <button
                  onClick={() => monitoring !== null && setStep(3)}
                  disabled={monitoring === null}
                  style={{
                    padding: '14px 32px',
                    backgroundColor: monitoring !== null ? 'var(--primary)' : 'rgba(201,168,76,0.3)',
                    color: 'var(--primary-foreground)',
                    border: 'none',
                    borderRadius: '2px',
                    fontSize: '13px',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    cursor: monitoring !== null ? 'pointer' : 'not-allowed',
                    minHeight: '48px',
                  }}
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Transactions */}
          {step === 3 && (
            <div>
              <h2 className="section-h2-medium mb-3" style={{ fontSize: 'clamp(22px,3vw,36px)' }}>How many transactions per month?</h2>
              <p className="body-text-rw mb-8" style={{ color: 'var(--muted)', fontSize: '14px' }}>Approximate number of income and expense transactions across all accounts.</p>
              <div className="flex flex-col gap-3 mb-8">
                {[
                  { label: 'Low', sub: 'Fewer than 50 transactions/month', value: 'low' as const },
                  { label: 'Medium', sub: '50–200 transactions/month', value: 'medium' as const },
                  { label: 'High', sub: 'More than 200 transactions/month', value: 'high' as const },
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setTransactions(opt.value)}
                    style={{
                      padding: '16px 24px',
                      textAlign: 'left',
                      border: `1px solid ${transactions === opt.value ? 'var(--primary)' : 'var(--gold-border)'}`,
                      backgroundColor: transactions === opt.value ? 'var(--gold-dim)' : 'var(--card)',
                      color: transactions === opt.value ? 'var(--primary)' : 'var(--foreground)',
                      borderRadius: '2px',
                      fontSize: '15px',
                      fontFamily: 'var(--font-sans)',
                      cursor: 'pointer',
                      minHeight: '52px',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div>{opt.label}</div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>{opt.sub}</div>
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} style={{ padding: '14px 24px', background: 'transparent', border: '1px solid var(--gold-border)', color: 'var(--muted)', borderRadius: '2px', fontSize: '13px', cursor: 'pointer', minHeight: '48px' }}>← Back</button>
                <button
                  onClick={handleCalculate}
                  disabled={transactions === null}
                  style={{
                    padding: '14px 32px',
                    backgroundColor: transactions !== null ? 'var(--primary)' : 'rgba(201,168,76,0.3)',
                    color: 'var(--primary-foreground)',
                    border: 'none',
                    borderRadius: '2px',
                    fontSize: '13px',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    cursor: transactions !== null ? 'pointer' : 'not-allowed',
                    minHeight: '48px',
                  }}
                >
                  Calculate My Price →
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Result */}
          {step === 4 && result && (
            <div>
              {/* Result card */}
              <div style={{ border: '1px solid var(--gold-border)', backgroundColor: 'var(--card)', borderRadius: '4px', padding: '32px', marginBottom: '32px' }}>
                <p className="section-label mb-4">Your Estimated Monthly Price</p>
                <div style={{ fontSize: 'clamp(40px,6vw,72px)', fontFamily: 'var(--font-display)', color: 'var(--primary)', lineHeight: 1, marginBottom: '8px' }}>
                  £{result.monthly}<span style={{ fontSize: '20px', color: 'var(--muted)' }}>/mo</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '28px' }}>
                  £{result.monthly * 12}/year · Fixed monthly fee, no surprises
                </p>

                <div style={{ borderTop: '1px solid var(--gold-border)', paddingTop: '20px' }}>
                  <p style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>Price breakdown</p>
                  {result.breakdown.map((item, i) => (
                    <div key={i} className="flex justify-between" style={{ padding: '8px 0', borderBottom: '1px solid rgba(201,168,76,0.08)', fontSize: '14px' }}>
                      <span style={{ color: 'var(--body-text)' }}>{item.label}{item.note ? <span style={{ color: 'var(--muted)', fontSize: '11px', marginLeft: '6px' }}>({item.note})</span> : null}</span>
                      <span style={{ color: 'var(--primary)' }}>+£{item.amount}</span>
                    </div>
                  ))}
                  <div className="flex justify-between" style={{ padding: '12px 0', fontSize: '16px', fontWeight: 600 }}>
                    <span style={{ color: 'var(--foreground)' }}>Total</span>
                    <span style={{ color: 'var(--primary)' }}>£{result.monthly}/mo</span>
                  </div>
                </div>

                <div style={{ marginTop: '20px', padding: '16px', backgroundColor: 'var(--gold-dim)', borderRadius: '2px', border: '1px solid var(--gold-border)' }}>
                  <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.6 }}>
                    This is an indicative price based on your inputs. Your engagement letter will confirm the exact fee after a brief onboarding call.
                  </p>
                </div>
              </div>

              {/* Lead capture */}
              {!submitted ? (
                <div style={{ border: '1px solid var(--gold-border)', backgroundColor: 'var(--surface)', borderRadius: '4px', padding: '32px' }}>
                  <h3 className="font-display mb-2" style={{ fontSize: '22px', color: 'var(--foreground)' }}>Send me my quote & engagement letter</h3>
                  <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '24px', lineHeight: 1.6 }}>
                    We&apos;ll email your personalised quote and a draft engagement letter within 2 hours.
                  </p>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {[
                      { key: 'name', label: 'Full name *', type: 'text', required: true },
                      { key: 'email', label: 'Email address *', type: 'email', required: true },
                      { key: 'company', label: 'Trading name / Company *', type: 'text', required: true },
                      { key: 'phone', label: 'Phone (optional)', type: 'tel', required: false },
                    ].map(field => (
                      <div key={field.key}>
                        <label style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>{field.label}</label>
                        <input
                          type={field.type}
                          required={field.required}
                          value={form[field.key as keyof FormData]}
                          onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            backgroundColor: 'var(--card)',
                            border: '1px solid var(--gold-border)',
                            borderRadius: '2px',
                            color: 'var(--foreground)',
                            fontSize: '14px',
                            fontFamily: 'var(--font-sans)',
                            outline: 'none',
                            minHeight: '48px',
                          }}
                        />
                      </div>
                    ))}
                    <button
                      type="submit"
                      disabled={submitting}
                      style={{
                        padding: '16px 32px',
                        backgroundColor: 'var(--primary)',
                        color: 'var(--primary-foreground)',
                        border: 'none',
                        borderRadius: '2px',
                        fontSize: '13px',
                        letterSpacing: '1.5px',
                        textTransform: 'uppercase',
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 600,
                        cursor: submitting ? 'not-allowed' : 'pointer',
                        minHeight: '52px',
                        opacity: submitting ? 0.7 : 1,
                      }}
                    >
                      {submitting ? 'Sending…' : 'Send Me My Quote & Engagement Letter'}
                    </button>
                  </form>
                </div>
              ) : (
                <div style={{ border: '1px solid var(--gold-border)', backgroundColor: 'var(--gold-dim)', borderRadius: '4px', padding: '32px', textAlign: 'center' }}>
                  <p style={{ fontSize: '24px', color: 'var(--primary)', fontFamily: 'var(--font-display)', marginBottom: '12px' }}>Quote sent.</p>
                  <p style={{ fontSize: '14px', color: 'var(--body-text)', marginBottom: '24px', lineHeight: 1.7 }}>
                    Check your inbox — your quote and engagement letter are on their way. We&apos;ll follow up within 2 hours.
                  </p>
                  <a
                    href="https://reckonwell.com/book"
                    style={{
                      display: 'inline-block',
                      padding: '14px 28px',
                      backgroundColor: 'var(--primary)',
                      color: 'var(--primary-foreground)',
                      borderRadius: '2px',
                      fontSize: '13px',
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                    }}
                  >
                    Book a 20-min call →
                  </a>
                </div>
              )}

              <button
                onClick={() => { setStep(0); setResult(null); setSubmitted(false); }}
                style={{ marginTop: '16px', background: 'transparent', border: 'none', color: 'var(--muted)', fontSize: '13px', cursor: 'pointer', textDecoration: 'underline' }}
              >
                ← Recalculate
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 md:px-10" style={{ borderTop: '1px solid var(--gold-border)' }}>
        <div className="max-w-3xl mx-auto">
          <p className="section-label mb-6">Common Questions</p>
          <div className="flex flex-col gap-0">
            {FAQS.map((faq, i) => (
              <div key={i} style={{ borderBottom: '1px solid var(--gold-border)' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '20px 0',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--foreground)',
                    fontSize: '16px',
                    fontFamily: 'var(--font-sans)',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '16px',
                    minHeight: '44px',
                  }}
                >
                  <span>{faq.q}</span>
                  <span style={{ color: 'var(--primary)', fontSize: '20px', flexShrink: 0, transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
                </button>
                {openFaq === i && (
                  <p style={{ fontSize: '14px', color: 'var(--body-text)', lineHeight: 1.75, paddingBottom: '20px' }}>{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="px-6 md:px-10 py-8" style={{ borderTop: '1px solid var(--gold-border)' }}>
        <div className="max-w-3xl mx-auto">
          <Link href="/" style={{ fontSize: '13px', color: 'var(--muted)', textDecoration: 'none' }}>← Back to Reckonwell</Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
