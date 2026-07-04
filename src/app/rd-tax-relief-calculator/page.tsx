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
  amount: number | string;
  note?: string;
}

const FAQS = [
  {
    q: 'What qualifies as R&D spend?',
    a: 'Salaries for engineers and developers working on novel technology, software licences used exclusively for R&D, hardware development and prototyping, testing and validation of new products. Routine maintenance, admin, and training do not qualify. We review your situation and identify exactly what counts.',
  },
  {
    q: 'Is this a one-off fee or ongoing?',
    a: 'By default, R&D claims are prepared annually — a one-off fee per claim. If you want us monitoring your qualifying spend throughout the year and preparing the claim on a rolling basis, the retainer option is available. Most clients with significant R&D spend prefer the retainer.',
  },
  {
    q: 'What if HMRC challenges the claim?',
    a: 'We prepare every claim to be defensible from day one — technical narrative, spend breakdown, supporting evidence. If HMRC raises a query, we respond on your behalf. Most claims are approved on first submission.',
  },
  {
    q: 'How long does the process take?',
    a: 'We typically complete the claim within 4–6 weeks of receiving your records. HMRC then takes 4–8 weeks to process. Cash or tax credit usually arrives 2–3 weeks after HMRC approval.',
  },
];

function calcRDPrice(
  rdSpend: number,
  hasPatents: boolean,
  firstTime: boolean,
  ongoing: boolean
): { fee: number | string; feeMin?: number; feeMax?: number; isRange: boolean; breakdown: PriceBreakdown[]; isMonthly: boolean } {
  const breakdown: PriceBreakdown[] = [];

  if (ongoing) {
    // Retainer model
    const retainerMin = 400;
    const retainerMax = 600;
    breakdown.push({ label: 'Monthly retainer (R&D monitoring + claim)', amount: `£${retainerMin}–£${retainerMax}` });
    let totalMin = retainerMin;
    let totalMax = retainerMax;

    if (hasPatents) {
      breakdown.push({ label: 'Patent Box planning (one-time setup)', amount: 300, note: 'then +£100/mo' });
      totalMin += 100;
      totalMax += 100;
    }

    return { fee: `£${totalMin}–£${totalMax}`, feeMin: totalMin, feeMax: totalMax, isRange: true, breakdown, isMonthly: true };
  }

  // One-off claim
  let base = 950;
  let discount = 0;
  let patentAdd = 0;

  if (rdSpend >= 500000) {
    base = 2000;
    patentAdd = hasPatents ? 500 : 0;
    discount = firstTime ? 300 : 0;
  } else if (rdSpend >= 200000) {
    base = 1500;
    patentAdd = hasPatents ? 300 : 0;
    discount = firstTime ? 200 : 0;
  } else {
    base = 950;
    patentAdd = 0;
    discount = firstTime ? 100 : 0;
  }

  breakdown.push({ label: 'Claim preparation fee', amount: base });
  if (patentAdd > 0) breakdown.push({ label: 'Patent valuation', amount: patentAdd });
  if (discount > 0) breakdown.push({ label: 'First-time client discount', amount: -discount });

  const total = base + patentAdd - discount;
  return { fee: total, isRange: false, breakdown, isMonthly: false };
}

export default function RDTaxReliefCalculatorPage() {
  const [step, setStep] = useState(0);
  const [rdSpend, setRdSpend] = useState(150000);
  const [hasPatents, setHasPatents] = useState<boolean | null>(null);
  const [firstTime, setFirstTime] = useState<boolean | null>(null);
  const [ongoing, setOngoing] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof calcRDPrice> | null>(null);
  const [form, setForm] = useState<FormData>({ name: '', email: '', company: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const totalSteps = 3;

  const formatMoney = (v: number) => {
    if (v >= 1000000) return `£${(v / 1000000).toFixed(1)}m`;
    if (v >= 1000) return `£${(v / 1000).toFixed(0)}k`;
    return `£${v}`;
  };

  const handleCalculate = () => {
    if (hasPatents === null || firstTime === null) return;
    const res = calcRDPrice(rdSpend, hasPatents, firstTime, ongoing);
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
          calculator_type: 'rd-tax-relief',
          page: 'rd-tax-relief',
          name: form.name,
          email: form.email,
          company: form.company,
          phone: form.phone,
          recommended_tier: ongoing ? 'Ongoing Retainer' : rdSpend >= 500000 ? 'Complex' : rdSpend >= 200000 ? 'Moderate' : 'Simple',
          recommended_monthly_price: result.isMonthly ? (result.feeMin ?? 0) : null,
          recommended_annual_price: result.isMonthly ? (result.feeMin ?? 0) * 12 : null,
          recommended_price: result.isMonthly ? (result.feeMin ?? 0) : result.fee,
          price_breakdown: result.breakdown.map(b => `${b.label}: ${typeof b.amount === 'number' ? `£${b.amount}` : b.amount}${b.note ? ` (${b.note})` : ''}`),
          inputs: { annual_rd_spend: rdSpend, has_patents: hasPatents, first_time_claim: firstTime, ongoing_retainer: ongoing },
          company_details: { annual_rd_spend: rdSpend, has_patents: hasPatents, first_time_claim: firstTime, ongoing_retainer: ongoing },
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

  const optBtn = (active: boolean, onClick: () => void, label: string, sub?: string) => (
    <button onClick={onClick} style={{ padding: '16px 24px', textAlign: 'left' as const, border: `1px solid ${active ? 'var(--primary)' : 'var(--gold-border)'}`, backgroundColor: active ? 'var(--gold-dim)' : 'var(--card)', color: active ? 'var(--primary)' : 'var(--foreground)', borderRadius: '2px', fontSize: '15px', fontFamily: 'var(--font-sans)', cursor: 'pointer', minHeight: '52px', transition: 'all 0.2s', width: '100%' }}>
      <div>{label}</div>
      {sub && <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>{sub}</div>}
    </button>
  );

  const nextBtn = (enabled: boolean, onClick: () => void, label = 'Continue →') => (
    <button onClick={onClick} disabled={!enabled} style={{ padding: '14px 32px', backgroundColor: enabled ? 'var(--primary)' : 'rgba(201,168,76,0.3)', color: 'var(--primary-foreground)', border: 'none', borderRadius: '2px', fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase' as const, fontFamily: 'var(--font-sans)', fontWeight: 600, cursor: enabled ? 'pointer' : 'not-allowed', minHeight: '48px' }}>{label}</button>
  );

  const backBtn = (s: number) => (
    <button onClick={() => setStep(s)} style={{ padding: '14px 24px', background: 'transparent', border: '1px solid var(--gold-border)', color: 'var(--muted)', borderRadius: '2px', fontSize: '13px', cursor: 'pointer', minHeight: '48px' }}>← Back</button>
  );

  const currentStepNum = step === 99 ? totalSteps : step;

  return (
    <main style={{ backgroundColor: 'var(--background)', minHeight: '100vh' }}>
      <Header />

      <section className="pt-32 pb-16 px-6 md:px-10" style={{ borderBottom: '1px solid var(--gold-border)' }}>
        <div className="max-w-3xl mx-auto">
          <p className="section-label mb-4">R&D Tax Relief Calculator</p>
          <h1 className="section-h2-medium mb-6">
            If you&apos;re innovating,{' '}
            <span className="gold-italic">you&apos;re likely eligible.</span>
          </h1>
          <p className="body-text-rw mb-4" style={{ color: 'var(--body-text)' }}>
            R&D Tax Credits are one of the most valuable reliefs available to UK companies — and one of the most underused. If your team has spent time developing new technology, solving technical problems, or building novel products, you almost certainly qualify.
          </p>
          <p className="body-text-rw mb-4" style={{ color: 'var(--body-text)' }}>
            Claiming it requires a technical narrative, a spend breakdown, and evidence of qualifying activities. Most founders either don&apos;t know about it or file it incorrectly. We handle the full process.
          </p>
          <p className="body-text-rw" style={{ color: 'var(--body-text)' }}>
            The calculator below shows what we charge — not what HMRC owes you. Our fee is based on the complexity of your claim, not a percentage of your relief.
          </p>
        </div>
      </section>

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

          {/* Step 0: R&D Spend */}
          {step === 0 && (
            <div>
              <h2 className="section-h2-medium mb-3" style={{ fontSize: 'clamp(22px,3vw,36px)' }}>What is your annual R&D spend?</h2>
              <p className="body-text-rw mb-8" style={{ color: 'var(--muted)', fontSize: '14px' }}>Include salaries for engineers/developers, software tools used for R&D, hardware, and prototyping costs.</p>
              <div className="mb-6">
                <div style={{ fontSize: 'clamp(28px,4vw,48px)', fontFamily: 'var(--font-display)', color: 'var(--primary)', marginBottom: '16px' }}>{formatMoney(rdSpend)}</div>
                <input type="range" min={0} max={1000000} step={10000} value={rdSpend} onChange={e => setRdSpend(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary)', height: '6px', cursor: 'pointer' }} />
                <div className="flex justify-between mt-2" style={{ fontSize: '11px', color: 'var(--muted)' }}><span>£0</span><span>£500k</span><span>£1m+</span></div>
              </div>
              {nextBtn(true, () => setStep(1))}
            </div>
          )}

          {/* Step 1: Patents */}
          {step === 1 && (
            <div>
              <h2 className="section-h2-medium mb-3" style={{ fontSize: 'clamp(22px,3vw,36px)' }}>Do you have patents or IP revenue?</h2>
              <p className="body-text-rw mb-8" style={{ color: 'var(--muted)', fontSize: '14px' }}>Patent Box reduces corporation tax to 10% on profits from patented inventions. If you have patents or licence revenue, you may qualify.</p>
              <div className="flex flex-col gap-3 mb-8">
                {[{ label: 'Yes — we have patents or IP revenue', value: true }, { label: 'No', value: false }].map(opt => (
                  <React.Fragment key={String(opt.value)}>{optBtn(hasPatents === opt.value, () => setHasPatents(opt.value), opt.label)}</React.Fragment>
                ))}
              </div>
              <div className="flex gap-3">{backBtn(0)}{nextBtn(hasPatents !== null, () => setStep(2))}</div>
            </div>
          )}

          {/* Step 2: First time + ongoing toggle */}
          {step === 2 && (
            <div>
              <h2 className="section-h2-medium mb-3" style={{ fontSize: 'clamp(22px,3vw,36px)' }}>Have you claimed R&D relief before?</h2>
              <p className="body-text-rw mb-8" style={{ color: 'var(--muted)', fontSize: '14px' }}>First-time clients receive a discount on their first claim.</p>
              <div className="flex flex-col gap-3 mb-8">
                {[{ label: 'Yes — we have claimed before', value: false }, { label: 'No — this is our first claim', value: true }].map(opt => (
                  <React.Fragment key={String(opt.value)}>{optBtn(firstTime === opt.value, () => setFirstTime(opt.value), opt.label)}</React.Fragment>
                ))}
              </div>

              {/* Ongoing toggle */}
              <div style={{ padding: '20px', border: '1px solid var(--gold-border)', borderRadius: '2px', backgroundColor: 'var(--card)', marginBottom: '24px' }}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p style={{ fontSize: '15px', color: 'var(--foreground)', marginBottom: '4px' }}>Switch to ongoing retainer instead?</p>
                    <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.5 }}>Monthly monitoring + rolling claim preparation. Better for companies with significant or growing R&D spend.</p>
                  </div>
                  <button
                    onClick={() => setOngoing(!ongoing)}
                    style={{
                      width: '52px',
                      height: '28px',
                      borderRadius: '14px',
                      border: 'none',
                      backgroundColor: ongoing ? 'var(--primary)' : 'rgba(201,168,76,0.2)',
                      cursor: 'pointer',
                      position: 'relative',
                      flexShrink: 0,
                      transition: 'background 0.2s',
                    }}
                  >
                    <span style={{ position: 'absolute', top: '4px', left: ongoing ? '28px' : '4px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: ongoing ? 'var(--primary-foreground)' : 'var(--muted)', transition: 'left 0.2s' }} />
                  </button>
                </div>
              </div>

              <div className="flex gap-3">{backBtn(1)}{nextBtn(firstTime !== null, handleCalculate, 'Calculate My Price →')}</div>
            </div>
          )}

          {/* Result */}
          {step === 99 && result && (
            <div>
              <div style={{ border: '1px solid var(--gold-border)', backgroundColor: 'var(--card)', borderRadius: '4px', padding: '32px', marginBottom: '32px' }}>
                <p className="section-label mb-4">
                  {result.isMonthly ? 'Your Estimated Monthly Retainer' : 'Your One-Off Claim Fee'}
                </p>
                <div style={{ fontSize: 'clamp(36px,5vw,64px)', fontFamily: 'var(--font-display)', color: 'var(--primary)', lineHeight: 1, marginBottom: '8px' }}>
                  {typeof result.fee === 'number' ? `£${result.fee}` : result.fee}
                  {result.isMonthly && <span style={{ fontSize: '20px', color: 'var(--muted)' }}>/mo</span>}
                </div>
                {!result.isMonthly && (
                  <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '8px' }}>One-off fee per annual claim</p>
                )}
                {result.isMonthly && (
                  <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '8px' }}>
                    Or success fee: 20% of relief obtained (min £1,500/quarter)
                  </p>
                )}

                <div style={{ borderTop: '1px solid var(--gold-border)', paddingTop: '20px', marginTop: '20px' }}>
                  <p style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>Fee breakdown</p>
                  {result.breakdown.map((item, i) => {
                    const amt = typeof item.amount === 'number' ? (item.amount < 0 ? `-£${Math.abs(item.amount)}` : `+£${item.amount}`) : item.amount;
                    const amtColor = typeof item.amount === 'number' && item.amount < 0 ? '#4ade80' : 'var(--primary)';
                    return (
                      <div key={i} className="flex justify-between" style={{ padding: '8px 0', borderBottom: '1px solid rgba(201,168,76,0.08)', fontSize: '14px' }}>
                        <span style={{ color: 'var(--body-text)' }}>{item.label}{item.note ? <span style={{ color: 'var(--muted)', fontSize: '11px', marginLeft: '6px' }}>({item.note})</span> : null}</span>
                        <span style={{ color: amtColor }}>{amt}</span>
                      </div>
                    );
                  })}
                  <div className="flex justify-between" style={{ padding: '12px 0', fontSize: '16px', fontWeight: 600 }}>
                    <span style={{ color: 'var(--foreground)' }}>Total</span>
                    <span style={{ color: 'var(--primary)' }}>{typeof result.fee === 'number' ? `£${result.fee}` : result.fee}{result.isMonthly ? '/mo' : ''}</span>
                  </div>
                </div>

                <div style={{ marginTop: '20px', padding: '16px', backgroundColor: 'var(--gold-dim)', borderRadius: '2px', border: '1px solid var(--gold-border)' }}>
                  <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.6 }}>
                    This is what Reckonwell charges — not what HMRC owes you. Your actual R&D relief depends on qualifying spend and HMRC approval. We handle the full process.
                  </p>
                </div>
              </div>

              {!submitted ? (
                <div style={{ border: '1px solid var(--gold-border)', backgroundColor: 'var(--surface)', borderRadius: '4px', padding: '32px' }}>
                  <h3 className="font-display mb-2" style={{ fontSize: '22px', color: 'var(--foreground)' }}>Send me my quote & engagement letter</h3>
                  <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '24px', lineHeight: 1.6 }}>We&apos;ll email your personalised quote and a draft engagement letter within 2 hours.</p>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {[{ key: 'name', label: 'Full name *', type: 'text', required: true }, { key: 'email', label: 'Email address *', type: 'email', required: true }, { key: 'company', label: 'Company name *', type: 'text', required: true }, { key: 'phone', label: 'Phone (optional)', type: 'tel', required: false }].map(field => (
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

              <button onClick={() => { setStep(0); setResult(null); setSubmitted(false); setHasPatents(null); setFirstTime(null); setOngoing(false); }} style={{ marginTop: '16px', background: 'transparent', border: 'none', color: 'var(--muted)', fontSize: '13px', cursor: 'pointer', textDecoration: 'underline' }}>← Recalculate</button>
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
