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
    q: 'Is MTD really mandatory for me?',
    a: 'If your gross income from self-employment or property exceeds £50,000, yes — MTD is mandatory. HMRC requires quarterly digital submissions, not just an annual return. Missing a quarter means automatic penalties.',
  },
  {
    q: 'What happens if I miss a quarterly deadline?',
    a: 'HMRC issues penalty points automatically. Accumulate enough points and you receive a financial penalty. We file before every deadline so this never happens to our clients.',
  },
  {
    q: 'Do I need special software?',
    a: 'Yes — HMRC requires MTD-compatible software. We handle this as part of onboarding. You don\'t need to buy or set up anything yourself.',
  },
  {
    q: 'I have multiple properties — does that change the price?',
    a: 'Yes, slightly. More properties means more transactions to reconcile each quarter. The calculator above accounts for this with a transparent add-on per property tier.',
  },
];

type FilerType = 'self-employed' | 'landlord' | null;
type Package = 'filing-only' | 'monitoring' | 'full-accounting' | null;
type PropertyCount = '1' | '2' | '3-5' | '5+' | null;

function calcMTDPrice(
  filerType: FilerType,
  pkg: Package,
  properties: PropertyCount | null
): { monthly: number; breakdown: PriceBreakdown[] } {
  const breakdown: PriceBreakdown[] = [];
  if (!filerType || !pkg) return { monthly: 0, breakdown };

  const baseMap: Record<NonNullable<Package>, number> = {
    'filing-only': 100,
    'monitoring': 175,
    'full-accounting': 250,
  };
  const pkgLabels: Record<NonNullable<Package>, string> = {
    'filing-only': 'MTD filing only',
    'monitoring': 'MTD + monthly monitoring',
    'full-accounting': 'MTD + full accounting',
  };

  const base = baseMap[pkg];
  breakdown.push({ label: pkgLabels[pkg], amount: base });
  let total = base;

  if (filerType === 'landlord' && properties) {
    const addOnMap: Record<NonNullable<Package>, Record<string, number>> = {
      'filing-only': { '1': 0, '2': 25, '3-5': 25, '5+': 50 },
      'monitoring': { '1': 0, '2': 40, '3-5': 40, '5+': 75 },
      'full-accounting': { '1': 0, '2': 50, '3-5': 50, '5+': 100 },
    };
    const addOn = addOnMap[pkg][properties] ?? 0;
    if (addOn > 0) {
      breakdown.push({ label: `Additional properties (${properties})`, amount: addOn });
      total += addOn;
    }
  }

  return { monthly: total, breakdown };
}

export default function MTDCalculatorPage() {
  const [step, setStep] = useState(0);
  const [filerType, setFilerType] = useState<FilerType>(null);
  const [income, setIncome] = useState(75000);
  const [properties, setProperties] = useState<PropertyCount>(null);
  const [pkg, setPkg] = useState<Package>(null);
  const [result, setResult] = useState<{ monthly: number; breakdown: PriceBreakdown[] } | null>(null);
  const [form, setForm] = useState<FormData>({ name: '', email: '', company: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const formatIncome = (v: number) => {
    if (v >= 1000000) return `£${(v / 1000000).toFixed(1)}m`;
    if (v >= 1000) return `£${(v / 1000).toFixed(0)}k`;
    return `£${v}`;
  };

  const totalSteps = filerType === 'landlord' ? 4 : 3;

  const handleCalculate = () => {
    const res = calcMTDPrice(filerType, pkg, filerType === 'landlord' ? properties : '1');
    setResult(res);
    setStep(99);
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
          calculator_type: 'mtd',
          page: 'mtd',
          name: form.name,
          email: form.email,
          company: form.company,
          phone: form.phone,
          recommended_tier: pkg,
          recommended_monthly_price: result.monthly,
          recommended_annual_price: result.monthly * 12,
          recommended_price: result.monthly,
          price_breakdown: result.breakdown.map(b => `${b.label}: £${b.amount}`),
          inputs: {
            filer_type: filerType,
            annual_income: income,
            properties: properties,
            package: pkg,
          },
          company_details: {
            filer_type: filerType,
            annual_income: income,
            properties: properties,
            package: pkg,
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

  const btnStyle = (active: boolean) => ({
    padding: '16px 24px',
    textAlign: 'left' as const,
    border: `1px solid ${active ? 'var(--primary)' : 'var(--gold-border)'}`,
    backgroundColor: active ? 'var(--gold-dim)' : 'var(--card)',
    color: active ? 'var(--primary)' : 'var(--foreground)',
    borderRadius: '2px',
    fontSize: '15px',
    fontFamily: 'var(--font-sans)',
    cursor: 'pointer',
    minHeight: '52px',
    transition: 'all 0.2s',
    width: '100%',
  });

  const continueBtn = (enabled: boolean, onClick: () => void, label = 'Continue →') => (
    <button
      onClick={onClick}
      disabled={!enabled}
      style={{
        padding: '14px 32px',
        backgroundColor: enabled ? 'var(--primary)' : 'rgba(201,168,76,0.3)',
        color: 'var(--primary-foreground)',
        border: 'none',
        borderRadius: '2px',
        fontSize: '13px',
        letterSpacing: '1.5px',
        textTransform: 'uppercase' as const,
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        cursor: enabled ? 'pointer' : 'not-allowed',
        minHeight: '48px',
      }}
    >
      {label}
    </button>
  );

  const backBtn = (onClick: () => void) => (
    <button onClick={onClick} style={{ padding: '14px 24px', background: 'transparent', border: '1px solid var(--gold-border)', color: 'var(--muted)', borderRadius: '2px', fontSize: '13px', cursor: 'pointer', minHeight: '48px' }}>← Back</button>
  );

  const currentStepNum = step === 99 ? totalSteps : step;

  return (
    <main style={{ backgroundColor: 'var(--background)', minHeight: '100vh' }}>
      <Header />

      {/* Intro */}
      <section className="pt-32 pb-16 px-6 md:px-10" style={{ borderBottom: '1px solid var(--gold-border)' }}>
        <div className="max-w-3xl mx-auto">
          <p className="section-label mb-4">Making Tax Digital Calculator</p>
          <h1 className="section-h2-medium mb-6">
            MTD is mandatory.{' '}
            <span className="gold-italic">Know your price.</span>
          </h1>
          <p className="body-text-rw mb-4" style={{ color: 'var(--body-text)' }}>
            Making Tax Digital is now a legal requirement for sole traders and landlords earning over £50,000. Four quarterly submissions per year, every year — with HMRC penalties for anything missed.
          </p>
          <p className="body-text-rw mb-4" style={{ color: 'var(--body-text)' }}>
            We handle every submission before the deadline. You get a monthly report showing exactly where you stand, and we respond to any HMRC queries on your behalf.
          </p>
          <div style={{ padding: '16px 20px', backgroundColor: 'rgba(192,57,43,0.08)', border: '1px solid rgba(192,57,43,0.25)', borderRadius: '2px', marginTop: '8px' }}>
            <p style={{ fontSize: '13px', color: '#e8a09a', lineHeight: 1.6 }}>
              <strong>MTD is mandatory</strong> once your gross income passes £50,000 — quarterly filings are non-negotiable with HMRC.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">

          {step < 99 && (
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-2">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <div key={i} style={{ height: '3px', flex: 1, borderRadius: '2px', backgroundColor: i < currentStepNum ? 'var(--primary)' : 'rgba(201,168,76,0.2)', transition: 'background 0.3s' }} />
                ))}
              </div>
              <p style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '2px', textTransform: 'uppercase' }}>Step {currentStepNum + 1} of {totalSteps}</p>
            </div>
          )}

          {/* Step 0: Filer type */}
          {step === 0 && (
            <div>
              <h2 className="section-h2-medium mb-3" style={{ fontSize: 'clamp(22px,3vw,36px)' }}>Who are you filing for?</h2>
              <p className="body-text-rw mb-8" style={{ color: 'var(--muted)', fontSize: '14px' }}>This determines which MTD rules apply to you.</p>
              <div className="flex flex-col gap-3 mb-8">
                {[
                  { label: 'Self-employed / Sole trader', sub: 'Trading income from a business or freelance work', value: 'self-employed' as FilerType },
                  { label: 'Landlord', sub: 'Income from residential or commercial property', value: 'landlord' as FilerType },
                ].map(opt => (
                  <button key={opt.value} onClick={() => setFilerType(opt.value)} style={btnStyle(filerType === opt.value)}>
                    <div>{opt.label}</div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>{opt.sub}</div>
                  </button>
                ))}
              </div>
              {continueBtn(filerType !== null, () => setStep(1))}
            </div>
          )}

          {/* Step 1: Income */}
          {step === 1 && (
            <div>
              <h2 className="section-h2-medium mb-3" style={{ fontSize: 'clamp(22px,3vw,36px)' }}>What is your annual income?</h2>
              <p className="body-text-rw mb-8" style={{ color: 'var(--muted)', fontSize: '14px' }}>
                {filerType === 'landlord' ? 'Total gross rental income across all properties.' : 'Total gross trading income from self-employment.'}
              </p>
              <div className="mb-6">
                <div style={{ fontSize: 'clamp(28px,4vw,48px)', fontFamily: 'var(--font-display)', color: 'var(--primary)', marginBottom: '16px' }}>{formatIncome(income)}</div>
                <input type="range" min={50000} max={1000000} step={5000} value={income} onChange={e => setIncome(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary)', height: '6px', cursor: 'pointer' }} />
                <div className="flex justify-between mt-2" style={{ fontSize: '11px', color: 'var(--muted)' }}><span>£50k</span><span>£500k</span><span>£1m+</span></div>
              </div>
              <div className="flex gap-3">
                {backBtn(() => setStep(0))}
                {continueBtn(true, () => filerType === 'landlord' ? setStep(2) : setStep(3))}
              </div>
            </div>
          )}

          {/* Step 2: Properties (landlord only) */}
          {step === 2 && filerType === 'landlord' && (
            <div>
              <h2 className="section-h2-medium mb-3" style={{ fontSize: 'clamp(22px,3vw,36px)' }}>How many properties do you let?</h2>
              <p className="body-text-rw mb-8" style={{ color: 'var(--muted)', fontSize: '14px' }}>Include all residential and commercial properties.</p>
              <div className="flex flex-col gap-3 mb-8">
                {[
                  { label: '1 property', value: '1' as PropertyCount },
                  { label: '2 properties', value: '2' as PropertyCount },
                  { label: '3–5 properties', value: '3-5' as PropertyCount },
                  { label: '5+ properties', value: '5+' as PropertyCount },
                ].map(opt => (
                  <button key={opt.value} onClick={() => setProperties(opt.value)} style={btnStyle(properties === opt.value)}>{opt.label}</button>
                ))}
              </div>
              <div className="flex gap-3">
                {backBtn(() => setStep(1))}
                {continueBtn(properties !== null, () => setStep(3))}
              </div>
            </div>
          )}

          {/* Step 3: Package */}
          {step === 3 && (
            <div>
              <h2 className="section-h2-medium mb-3" style={{ fontSize: 'clamp(22px,3vw,36px)' }}>Which package suits you?</h2>
              <p className="body-text-rw mb-8" style={{ color: 'var(--muted)', fontSize: '14px' }}>All packages include quarterly MTD submissions filed before every HMRC deadline.</p>
              <div className="flex flex-col gap-3 mb-8">
                {[
                  { label: 'MTD filing only', sub: 'Quarterly submissions to HMRC. Nothing more, nothing less.', value: 'filing-only' as Package },
                  { label: 'MTD + monthly monitoring', sub: 'Quarterly filings plus a monthly review of your income and tax position.', value: 'monitoring' as Package },
                  { label: 'MTD + full accounting', sub: 'Everything above, plus year-end accounts and full tax planning.', value: 'full-accounting' as Package },
                ].map(opt => (
                  <button key={opt.value!} onClick={() => setPkg(opt.value)} style={btnStyle(pkg === opt.value)}>
                    <div>{opt.label}</div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>{opt.sub}</div>
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                {backBtn(() => filerType === 'landlord' ? setStep(2) : setStep(1))}
                {continueBtn(pkg !== null, handleCalculate, 'Calculate My Price →')}
              </div>
            </div>
          )}

          {/* Result */}
          {step === 99 && result && (
            <div>
              <div style={{ border: '1px solid var(--gold-border)', backgroundColor: 'var(--card)', borderRadius: '4px', padding: '32px', marginBottom: '32px' }}>
                <p className="section-label mb-4">Your Estimated Monthly Price</p>
                <div style={{ fontSize: 'clamp(40px,6vw,72px)', fontFamily: 'var(--font-display)', color: 'var(--primary)', lineHeight: 1, marginBottom: '8px' }}>
                  £{result.monthly}<span style={{ fontSize: '20px', color: 'var(--muted)' }}>/mo</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '28px' }}>£{result.monthly * 12}/year · Fixed monthly fee</p>
                <div style={{ borderTop: '1px solid var(--gold-border)', paddingTop: '20px' }}>
                  <p style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>Price breakdown</p>
                  {result.breakdown.map((item, i) => (
                    <div key={i} className="flex justify-between" style={{ padding: '8px 0', borderBottom: '1px solid rgba(201,168,76,0.08)', fontSize: '14px' }}>
                      <span style={{ color: 'var(--body-text)' }}>{item.label}</span>
                      <span style={{ color: 'var(--primary)' }}>+£{item.amount}</span>
                    </div>
                  ))}
                  <div className="flex justify-between" style={{ padding: '12px 0', fontSize: '16px', fontWeight: 600 }}>
                    <span style={{ color: 'var(--foreground)' }}>Total</span>
                    <span style={{ color: 'var(--primary)' }}>£{result.monthly}/mo</span>
                  </div>
                </div>
                <div style={{ marginTop: '20px', padding: '16px', backgroundColor: 'var(--gold-dim)', borderRadius: '2px', border: '1px solid var(--gold-border)' }}>
                  <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.6 }}>Indicative price based on your inputs. Confirmed in your engagement letter after onboarding.</p>
                </div>
              </div>

              {!submitted ? (
                <div style={{ border: '1px solid var(--gold-border)', backgroundColor: 'var(--surface)', borderRadius: '4px', padding: '32px' }}>
                  <h3 className="font-display mb-2" style={{ fontSize: '22px', color: 'var(--foreground)' }}>Send me my quote & engagement letter</h3>
                  <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '24px', lineHeight: 1.6 }}>We&apos;ll email your personalised quote and a draft engagement letter within 2 hours.</p>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {[
                      { key: 'name', label: 'Full name *', type: 'text', required: true },
                      { key: 'email', label: 'Email address *', type: 'email', required: true },
                      { key: 'company', label: 'Trading name / Company *', type: 'text', required: true },
                      { key: 'phone', label: 'Phone (optional)', type: 'tel', required: false },
                    ].map(field => (
                      <div key={field.key}>
                        <label style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>{field.label}</label>
                        <input type={field.type} required={field.required} value={form[field.key as keyof FormData]} onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))} style={{ width: '100%', padding: '12px 16px', backgroundColor: 'var(--card)', border: '1px solid var(--gold-border)', borderRadius: '2px', color: 'var(--foreground)', fontSize: '14px', fontFamily: 'var(--font-sans)', outline: 'none', minHeight: '48px' }} />
                      </div>
                    ))}
                    <button type="submit" disabled={submitting} style={{ padding: '16px 32px', backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)', border: 'none', borderRadius: '2px', fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: 'var(--font-sans)', fontWeight: 600, cursor: submitting ? 'not-allowed' : 'pointer', minHeight: '52px', opacity: submitting ? 0.7 : 1 }}>
                      {submitting ? 'Sending…' : 'Send Me My Quote & Engagement Letter'}
                    </button>
                  </form>
                </div>
              ) : (
                <div style={{ border: '1px solid var(--gold-border)', backgroundColor: 'var(--gold-dim)', borderRadius: '4px', padding: '32px', textAlign: 'center' }}>
                  <p style={{ fontSize: '24px', color: 'var(--primary)', fontFamily: 'var(--font-display)', marginBottom: '12px' }}>Quote sent.</p>
                  <p style={{ fontSize: '14px', color: 'var(--body-text)', marginBottom: '24px', lineHeight: 1.7 }}>Check your inbox — your quote and engagement letter are on their way.</p>
                  <a href="https://reckonwell.com/book" style={{ display: 'inline-block', padding: '14px 28px', backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)', borderRadius: '2px', fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600 }}>Book a 20-min call →</a>
                </div>
              )}

              <button onClick={() => { setStep(0); setResult(null); setSubmitted(false); setFilerType(null); setPkg(null); setProperties(null); }} style={{ marginTop: '16px', background: 'transparent', border: 'none', color: 'var(--muted)', fontSize: '13px', cursor: 'pointer', textDecoration: 'underline' }}>← Recalculate</button>
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
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', textAlign: 'left', padding: '20px 0', background: 'transparent', border: 'none', color: 'var(--foreground)', fontSize: '16px', fontFamily: 'var(--font-sans)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', minHeight: '44px' }}>
                  <span>{faq.q}</span>
                  <span style={{ color: 'var(--primary)', fontSize: '20px', flexShrink: 0, transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
                </button>
                {openFaq === i && <p style={{ fontSize: '14px', color: 'var(--body-text)', lineHeight: 1.75, paddingBottom: '20px' }}>{faq.a}</p>}
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
