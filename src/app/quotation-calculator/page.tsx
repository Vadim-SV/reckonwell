'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type BusinessType = 'self-employed' | 'limited-company' | 'landlord' | 'rd-only';
type Step = 1 | 2 | 3 | 4;

interface QuoteResult {
  monthly: number;
  annual: number;
  breakdown: { label: string; amount: number }[];
  features: string[];
}

function calcSelfEmployed(income: number, hasRental: boolean, monitoring: string, transactions: string): QuoteResult {
  const breakdown: { label: string; amount: number }[] = [];
  let base = 80;
  if (income >= 250000) base = 400;
  else if (income >= 100000 && monitoring === 'monthly') base = 250;
  else if (income >= 50000 || hasRental || monitoring === 'monthly') base = 150;
  breakdown.push({ label: 'Base fee', amount: base });

  const multMap: Record<string, number> = { low: 1.0, medium: 1.2, high: 1.5 };
  const mult = multMap[transactions] || 1.0;
  const afterMult = Math.round(base * mult);
  if (mult > 1) breakdown.push({ label: `Transaction volume (${transactions})`, amount: afterMult - base });
  let total = afterMult;

  if (monitoring === 'monthly') { breakdown.push({ label: 'Monthly tax planning', amount: 75 }); total += 75; }
  else if (income >= 50000) { breakdown.push({ label: 'Quarterly tax estimates', amount: 50 }); total += 50; }
  if (income >= 50000) { breakdown.push({ label: 'MTD compliance', amount: 75 }); total += 75; }

  const features = ['Self Assessment filing', 'HMRC correspondence', 'Tax position tracking', 'Deadline reminders'];
  if (monitoring === 'monthly') features.push('Monthly tax planning', 'Real-time tax estimates');
  if (income >= 50000) features.push('MTD quarterly filings', 'Quarterly tax estimates');

  return { monthly: total, annual: Math.round(total * 11), breakdown, features };
}

function calcLimitedCompany(profit: number, employees: number, monitoring: string, transactions: string, hasRD: boolean, raising: boolean, mgmtAccounts: boolean): QuoteResult {
  const breakdown: { label: string; amount: number }[] = [];
  let base = 150;
  if (profit >= 1000000) base = 750;
  else if (profit >= 500000 || employees >= 20) base = 500;
  else if (profit >= 250000 || employees >= 6) base = 300;
  breakdown.push({ label: 'Base fee', amount: base });

  const monMult: Record<string, number> = { annual: 1.0, quarterly: 1.3, monthly: 1.6 };
  const txMult: Record<string, number> = { low: 1.0, medium: 1.2, high: 1.5 };
  const m = monMult[monitoring] || 1.0;
  const t = txMult[transactions] || 1.0;
  const afterMult = Math.round(base * m * t);
  if (m > 1 || t > 1) breakdown.push({ label: `Monitoring & transaction multiplier`, amount: afterMult - base });
  let total = afterMult;

  const payroll = employees > 0 ? 40 * employees : 0;
  if (payroll > 0) { breakdown.push({ label: `Payroll (${employees} employees)`, amount: payroll }); total += payroll; }
  breakdown.push({ label: 'VAT quarterly returns', amount: 60 }); total += 60;
  breakdown.push({ label: 'Director salary planning', amount: 50 }); total += 50;
  if (mgmtAccounts) { breakdown.push({ label: 'Management accounts', amount: 100 }); total += 100; }
  if (hasRD) { breakdown.push({ label: 'R&D relief ongoing', amount: 200 }); total += 200; }
  if (raising) { breakdown.push({ label: 'Investor reporting', amount: 100 }); total += 100; }

  const features = ['Annual accounts & CT600', 'Companies House filing', 'Corporation tax planning', 'VAT returns', 'Director salary planning'];
  if (monitoring === 'monthly') features.push('Monthly management accounts', 'Real-time cash flow monitoring');
  if (monitoring === 'quarterly') features.push('Quarterly business reviews');
  if (employees > 0) features.push(`Payroll for ${employees} employees`);
  if (hasRD) features.push('R&D tax relief claims');
  if (raising) features.push('Investor-ready reporting');

  return { monthly: total, annual: Math.round(total * 11), breakdown, features };
}

function calcLandlord(properties: number, income: number, mtdPackage: string, complexity: string): QuoteResult {
  const breakdown: { label: string; amount: number }[] = [];
  let base = 80;
  if (properties >= 5) base = 250;
  else if (properties >= 3) base = 150;
  breakdown.push({ label: 'Base fee', amount: base });

  let incAdj = 0;
  if (income >= 300000) incAdj = 200;
  else if (income >= 150000) incAdj = 100;
  else if (income >= 50000) incAdj = 50;
  if (incAdj > 0) { breakdown.push({ label: 'Income adjustment', amount: incAdj }); }

  let mtdFee = 0;
  if (income >= 50000) {
    if (mtdPackage === 'full') mtdFee = 250;
    else if (mtdPackage === 'monitoring') mtdFee = 175;
    else mtdFee = 100;
    breakdown.push({ label: `MTD (${mtdPackage})`, amount: mtdFee });
  }

  const extraProps = Math.max(0, properties - 2);
  const extraFee = extraProps * 40;
  if (extraFee > 0) { breakdown.push({ label: `Extra properties (${extraProps})`, amount: extraFee }); }

  const complexMult = complexity === 'complex' ? 1.3 : 1.0;
  let total = Math.round((base + incAdj + mtdFee + extraFee) * complexMult);
  if (complexMult > 1) breakdown.push({ label: 'Complex portfolio adjustment', amount: total - (base + incAdj + mtdFee + extraFee) });

  const features = ['Self Assessment filing', 'Rental income tracking', 'Allowable expenses review', 'HMRC correspondence'];
  if (income >= 50000) features.push('MTD quarterly filings');
  if (properties >= 3) features.push('Multi-property portfolio management');
  if (mtdPackage === 'full') features.push('Full accounting package', 'Monthly monitoring');

  return { monthly: total, annual: Math.round(total * 11), breakdown, features };
}

function calcRD(spend: number, firstTime: boolean): QuoteResult {
  let fee = 950;
  if (spend >= 500000) fee = 2000;
  else if (spend >= 200000) fee = 1500;
  if (firstTime) fee = Math.round(fee * 0.9);

  const features = ['Technical narrative preparation', 'Qualifying spend analysis', 'HMRC claim submission', 'Query support & defence'];
  if (spend >= 200000) features.push('Patent valuation (if applicable)', 'Multi-product claim management');

  return {
    monthly: 0,
    annual: fee,
    breakdown: [{ label: 'One-off claim fee', amount: fee }],
    features,
  };
}

export default function QuotationCalculatorPage() {
  const [step, setStep] = useState<Step>(1);
  const [businessType, setBusinessType] = useState<BusinessType>('self-employed');

  // Self-employed inputs
  const [seIncome, setSeIncome] = useState(75000);
  const [seRental, setSeRental] = useState(false);
  const [seMonitoring, setSeMonitoring] = useState<'annual' | 'monthly'>('annual');
  const [seTransactions, setSeTransactions] = useState<'low' | 'medium' | 'high'>('low');

  // Limited company inputs
  const [lcProfit, setLcProfit] = useState(300000);
  const [lcEmployees, setLcEmployees] = useState(5);
  const [lcMonitoring, setLcMonitoring] = useState<'annual' | 'quarterly' | 'monthly'>('quarterly');
  const [lcTransactions, setLcTransactions] = useState<'low' | 'medium' | 'high'>('low');
  const [lcRD, setLcRD] = useState(false);
  const [lcRaising, setLcRaising] = useState(false);
  const [lcMgmt, setLcMgmt] = useState(false);

  // Landlord inputs
  const [llProperties, setLlProperties] = useState(2);
  const [llIncome, setLlIncome] = useState(60000);
  const [llMTD, setLlMTD] = useState<'filing' | 'monitoring' | 'full'>('monitoring');
  const [llComplexity, setLlComplexity] = useState<'simple' | 'complex'>('simple');

  // R&D inputs
  const [rdSpend, setRdSpend] = useState(150000);
  const [rdFirstTime, setRdFirstTime] = useState(true);

  // Contact
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const getQuote = (): QuoteResult => {
    if (businessType === 'self-employed') return calcSelfEmployed(seIncome, seRental, seMonitoring, seTransactions);
    if (businessType === 'limited-company') return calcLimitedCompany(lcProfit, lcEmployees, lcMonitoring, lcTransactions, lcRD, lcRaising, lcMgmt);
    if (businessType === 'landlord') return calcLandlord(llProperties, llIncome, llMTD, llComplexity);
    return calcRD(rdSpend, rdFirstTime);
  };

  const quote = getQuote();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/calculator-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          calculator_type: 'quotation-calculator',
          name, email, company, phone,
          recommended_tier: businessType,
          recommended_price: quote.monthly || undefined,
          company_details: {
            business_type: businessType,
            monthly_price: quote.monthly,
            annual_price: quote.annual,
            price_breakdown: quote.breakdown.map(b => `${b.label}: £${b.amount}`).join(', '),
          },
        }),
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again or email us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatCurrency = (n: number) => `£${n.toLocaleString('en-GB')}`;

  const inputClass = "w-full bg-transparent border px-4 py-3 font-ui text-sm focus:outline-none transition-colors duration-200";
  const inputStyle = { borderColor: 'var(--gold-border)', color: 'var(--foreground)', fontSize: '14px' };
  const inputFocus = { borderColor: 'var(--primary)' };

  const radioClass = (selected: boolean) =>
    `flex items-center gap-3 px-4 py-3 border cursor-pointer transition-all duration-200 ${selected ? 'border-gold' : ''}`;
  const radioStyle = (selected: boolean) => ({
    borderColor: selected ? 'var(--primary)' : 'var(--gold-border)',
    backgroundColor: selected ? 'rgba(201,168,76,0.08)' : 'transparent',
  });

  const steps = ['Business Type', 'Your Details', 'Complexity', 'Your Quote'];

  return (
    <>
      <Header />
      <main style={{ backgroundColor: 'var(--background)', minHeight: '100vh', paddingTop: '80px' }}>

        {/* Standalone Compliance Frame */}
        <div className="px-6 md:px-10 py-3" style={{ backgroundColor: 'rgba(201,168,76,0.06)', borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <p className="font-ui text-xs" style={{ color: 'var(--muted)' }}>
              <span style={{ color: 'var(--primary)' }}>Compliance services pricing</span> — for standalone compliance work only.
            </p>
            <Link href="/" className="font-ui text-xs" style={{ color: 'var(--primary)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
              Need a full finance team? See Fractional Finance →
            </Link>
          </div>
        </div>

        {/* Hero */}
        <section className="px-6 md:px-10 py-16 md:py-20" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="section-label mb-4">Transparent Pricing</p>
            <h1 className="font-display mb-6" style={{ fontSize: 'clamp(32px,5vw,56px)', fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.1 }}>
              Get Your Instant Quote
            </h1>
            <p className="font-ui" style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.7 }}>
              Answer four quick questions. See exactly what your accounting costs — no hidden fees, no surprises.
            </p>
          </div>
        </section>

        {/* Progress */}
        <section className="px-6 md:px-10 py-8" style={{ borderBottom: '1px solid var(--gold-border)' }}>
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-0">
              {steps.map((s, i) => (
                <React.Fragment key={s}>
                  <div className="flex flex-col items-center gap-1 flex-1">
                    <div
                      className="w-8 h-8 flex items-center justify-center font-ui text-xs font-medium transition-all duration-300"
                      style={{
                        borderRadius: '50%',
                        border: `1px solid ${step > i + 1 ? 'var(--primary)' : step === i + 1 ? 'var(--primary)' : 'var(--gold-border)'}`,
                        backgroundColor: step > i + 1 ? 'var(--primary)' : step === i + 1 ? 'rgba(201,168,76,0.15)' : 'transparent',
                        color: step > i + 1 ? 'var(--background)' : step === i + 1 ? 'var(--primary)' : 'var(--muted)',
                      }}
                    >
                      {step > i + 1 ? '✓' : i + 1}
                    </div>
                    <span className="font-ui text-xs hidden sm:block" style={{ color: step === i + 1 ? 'var(--primary)' : 'var(--muted)', letterSpacing: '1px' }}>{s}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="flex-1 h-px mb-5" style={{ backgroundColor: step > i + 1 ? 'var(--primary)' : 'var(--gold-border)', maxWidth: '60px' }} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="px-6 md:px-10 py-12 md:py-16">
          <div className="max-w-3xl mx-auto">

            {/* Step 1: Business Type */}
            {step === 1 && (
              <div>
                <h2 className="font-display mb-2" style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 400, color: 'var(--foreground)' }}>What type of business are you?</h2>
                <p className="font-ui mb-8" style={{ color: 'var(--muted)', fontSize: '14px' }}>This determines which pricing formula applies to you.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                  {([
                    { value: 'self-employed', label: 'Self-Employed / Sole Trader', desc: 'Freelancer, contractor, or sole trader' },
                    { value: 'limited-company', label: 'Limited Company', desc: 'Director of a UK limited company' },
                    { value: 'landlord', label: 'Landlord', desc: 'Rental income from UK properties' },
                    { value: 'rd-only', label: 'R&D Tax Relief Only', desc: 'One-off R&D claim for your company' },
                  ] as { value: BusinessType; label: string; desc: string }[]).map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setBusinessType(opt.value)}
                      className={radioClass(businessType === opt.value) + ' flex-col items-start text-left'}
                      style={radioStyle(businessType === opt.value)}
                    >
                      <span className="font-ui font-medium" style={{ color: businessType === opt.value ? 'var(--primary)' : 'var(--foreground)', fontSize: '14px' }}>{opt.label}</span>
                      <span className="font-ui" style={{ color: 'var(--muted)', fontSize: '12px', marginTop: '2px' }}>{opt.desc}</span>
                    </button>
                  ))}
                </div>
                <button onClick={() => setStep(2)} className="btn-gold" style={{ minHeight: '48px', padding: '0 32px' }}>
                  Continue →
                </button>
              </div>
            )}

            {/* Step 2: Income/Profit */}
            {step === 2 && (
              <div>
                <h2 className="font-display mb-2" style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 400, color: 'var(--foreground)' }}>
                  {businessType === 'self-employed' ? 'What is your annual income?' :
                   businessType === 'limited-company' ? 'What is your annual company profit?' :
                   businessType === 'landlord'? 'What is your annual rental income?' : 'What is your annual R&D spend?'}
                </h2>
                <p className="font-ui mb-8" style={{ color: 'var(--muted)', fontSize: '14px' }}>Use the slider to select your approximate figure.</p>

                {businessType === 'self-employed' && (
                  <div className="mb-8">
                    <div className="flex justify-between mb-3">
                      <span className="font-ui text-sm" style={{ color: 'var(--muted)' }}>Annual Income</span>
                      <span className="font-display text-xl" style={{ color: 'var(--primary)' }}>{formatCurrency(seIncome)}</span>
                    </div>
                    <input type="range" min={0} max={500000} step={5000} value={seIncome} onChange={e => setSeIncome(Number(e.target.value))} className="w-full accent-gold" style={{ accentColor: 'var(--primary)' }} />
                    <div className="flex justify-between mt-1"><span className="font-ui text-xs" style={{ color: 'var(--muted)' }}>£0</span><span className="font-ui text-xs" style={{ color: 'var(--muted)' }}>£500k+</span></div>
                  </div>
                )}

                {businessType === 'limited-company' && (
                  <div className="mb-8">
                    <div className="flex justify-between mb-3">
                      <span className="font-ui text-sm" style={{ color: 'var(--muted)' }}>Annual Profit</span>
                      <span className="font-display text-xl" style={{ color: 'var(--primary)' }}>{formatCurrency(lcProfit)}</span>
                    </div>
                    <input type="range" min={0} max={2000000} step={25000} value={lcProfit} onChange={e => setLcProfit(Number(e.target.value))} className="w-full" style={{ accentColor: 'var(--primary)' }} />
                    <div className="flex justify-between mt-1"><span className="font-ui text-xs" style={{ color: 'var(--muted)' }}>£0</span><span className="font-ui text-xs" style={{ color: 'var(--muted)' }}>£2m+</span></div>
                    <div className="mt-6">
                      <p className="font-ui text-sm mb-3" style={{ color: 'var(--muted)' }}>Number of employees</p>
                      <div className="flex flex-wrap gap-2">
                        {[0, 3, 10, 25].map((n, i) => {
                          const labels = ['0', '1–5', '6–20', '20+'];
                          const vals = [0, 3, 10, 25];
                          return (
                            <button key={n} onClick={() => setLcEmployees(vals[i])} className="px-4 py-2 font-ui text-sm border transition-all duration-200" style={{ borderColor: lcEmployees === vals[i] ? 'var(--primary)' : 'var(--gold-border)', backgroundColor: lcEmployees === vals[i] ? 'rgba(201,168,76,0.1)' : 'transparent', color: lcEmployees === vals[i] ? 'var(--primary)' : 'var(--muted)' }}>
                              {labels[i]}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {businessType === 'landlord' && (
                  <div className="mb-8">
                    <div className="flex justify-between mb-3">
                      <span className="font-ui text-sm" style={{ color: 'var(--muted)' }}>Annual Rental Income</span>
                      <span className="font-display text-xl" style={{ color: 'var(--primary)' }}>{formatCurrency(llIncome)}</span>
                    </div>
                    <input type="range" min={0} max={500000} step={5000} value={llIncome} onChange={e => setLlIncome(Number(e.target.value))} className="w-full" style={{ accentColor: 'var(--primary)' }} />
                    <div className="flex justify-between mt-1"><span className="font-ui text-xs" style={{ color: 'var(--muted)' }}>£0</span><span className="font-ui text-xs" style={{ color: 'var(--muted)' }}>£500k+</span></div>
                    <div className="mt-6">
                      <p className="font-ui text-sm mb-3" style={{ color: 'var(--muted)' }}>Number of properties</p>
                      <div className="flex flex-wrap gap-2">
                        {[1, 2, 4, 6].map((n, i) => {
                          const labels = ['1', '2', '3–5', '5+'];
                          return (
                            <button key={n} onClick={() => setLlProperties(n)} className="px-4 py-2 font-ui text-sm border transition-all duration-200" style={{ borderColor: llProperties === n ? 'var(--primary)' : 'var(--gold-border)', backgroundColor: llProperties === n ? 'rgba(201,168,76,0.1)' : 'transparent', color: llProperties === n ? 'var(--primary)' : 'var(--muted)' }}>
                              {labels[i]}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {businessType === 'rd-only' && (
                  <div className="mb-8">
                    <div className="flex justify-between mb-3">
                      <span className="font-ui text-sm" style={{ color: 'var(--muted)' }}>Annual R&D Spend</span>
                      <span className="font-display text-xl" style={{ color: 'var(--primary)' }}>{formatCurrency(rdSpend)}</span>
                    </div>
                    <input type="range" min={0} max={1000000} step={10000} value={rdSpend} onChange={e => setRdSpend(Number(e.target.value))} className="w-full" style={{ accentColor: 'var(--primary)' }} />
                    <div className="flex justify-between mt-1"><span className="font-ui text-xs" style={{ color: 'var(--muted)' }}>£0</span><span className="font-ui text-xs" style={{ color: 'var(--muted)' }}>£1m+</span></div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="btn-ghost" style={{ minHeight: '48px', padding: '0 24px' }}>← Back</button>
                  <button onClick={() => setStep(3)} className="btn-gold" style={{ minHeight: '48px', padding: '0 32px' }}>Continue →</button>
                </div>
              </div>
            )}

            {/* Step 3: Complexity */}
            {step === 3 && (
              <div>
                <h2 className="font-display mb-2" style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 400, color: 'var(--foreground)' }}>A few more details</h2>
                <p className="font-ui mb-8" style={{ color: 'var(--muted)', fontSize: '14px' }}>These help us calculate your exact price.</p>

                {businessType === 'self-employed' && (
                  <div className="space-y-6">
                    <div>
                      <p className="font-ui text-sm mb-3" style={{ color: 'var(--foreground)' }}>Do you have rental income?</p>
                      <div className="flex gap-3">
                        {['Yes', 'No'].map(v => (
                          <button key={v} onClick={() => setSeRental(v === 'Yes')} className="px-6 py-3 font-ui text-sm border transition-all duration-200" style={{ borderColor: seRental === (v === 'Yes') ? 'var(--primary)' : 'var(--gold-border)', backgroundColor: seRental === (v === 'Yes') ? 'rgba(201,168,76,0.1)' : 'transparent', color: seRental === (v === 'Yes') ? 'var(--primary)' : 'var(--muted)' }}>
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="font-ui text-sm mb-3" style={{ color: 'var(--foreground)' }}>Monitoring preference</p>
                      <div className="flex gap-3 flex-wrap">
                        {[{ v: 'annual', l: 'Annual filing only' }, { v: 'monthly', l: 'Monthly monitoring' }].map(opt => (
                          <button key={opt.v} onClick={() => setSeMonitoring(opt.v as 'annual' | 'monthly')} className="px-4 py-3 font-ui text-sm border transition-all duration-200" style={{ borderColor: seMonitoring === opt.v ? 'var(--primary)' : 'var(--gold-border)', backgroundColor: seMonitoring === opt.v ? 'rgba(201,168,76,0.1)' : 'transparent', color: seMonitoring === opt.v ? 'var(--primary)' : 'var(--muted)' }}>
                            {opt.l}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="font-ui text-sm mb-3" style={{ color: 'var(--foreground)' }}>Monthly transactions</p>
                      <div className="flex gap-3 flex-wrap">
                        {[{ v: 'low', l: 'Low (<50)' }, { v: 'medium', l: 'Medium (50–200)' }, { v: 'high', l: 'High (200+)' }].map(opt => (
                          <button key={opt.v} onClick={() => setSeTransactions(opt.v as 'low' | 'medium' | 'high')} className="px-4 py-3 font-ui text-sm border transition-all duration-200" style={{ borderColor: seTransactions === opt.v ? 'var(--primary)' : 'var(--gold-border)', backgroundColor: seTransactions === opt.v ? 'rgba(201,168,76,0.1)' : 'transparent', color: seTransactions === opt.v ? 'var(--primary)' : 'var(--muted)' }}>
                            {opt.l}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {businessType === 'limited-company' && (
                  <div className="space-y-6">
                    <div>
                      <p className="font-ui text-sm mb-3" style={{ color: 'var(--foreground)' }}>Monitoring preference</p>
                      <div className="flex gap-3 flex-wrap">
                        {[{ v: 'annual', l: 'Annual' }, { v: 'quarterly', l: 'Quarterly' }, { v: 'monthly', l: 'Monthly' }].map(opt => (
                          <button key={opt.v} onClick={() => setLcMonitoring(opt.v as 'annual' | 'quarterly' | 'monthly')} className="px-4 py-3 font-ui text-sm border transition-all duration-200" style={{ borderColor: lcMonitoring === opt.v ? 'var(--primary)' : 'var(--gold-border)', backgroundColor: lcMonitoring === opt.v ? 'rgba(201,168,76,0.1)' : 'transparent', color: lcMonitoring === opt.v ? 'var(--primary)' : 'var(--muted)' }}>
                            {opt.l}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="font-ui text-sm mb-3" style={{ color: 'var(--foreground)' }}>Monthly transaction volume</p>
                      <div className="flex gap-3 flex-wrap">
                        {[{ v: 'low', l: 'Low (<100)' }, { v: 'medium', l: 'Medium (100–500)' }, { v: 'high', l: 'High (500+)' }].map(opt => (
                          <button key={opt.v} onClick={() => setLcTransactions(opt.v as 'low' | 'medium' | 'high')} className="px-4 py-3 font-ui text-sm border transition-all duration-200" style={{ borderColor: lcTransactions === opt.v ? 'var(--primary)' : 'var(--gold-border)', backgroundColor: lcTransactions === opt.v ? 'rgba(201,168,76,0.1)' : 'transparent', color: lcTransactions === opt.v ? 'var(--primary)' : 'var(--muted)' }}>
                            {opt.l}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {[{ val: lcRD, set: setLcRD, label: 'R&D spend?' }, { val: lcRaising, set: setLcRaising, label: 'Raising investment?' }, { val: lcMgmt, set: setLcMgmt, label: 'Management accounts?' }].map(item => (
                        <div key={item.label}>
                          <p className="font-ui text-sm mb-2" style={{ color: 'var(--foreground)' }}>{item.label}</p>
                          <div className="flex gap-2">
                            {['Yes', 'No'].map(v => (
                              <button key={v} onClick={() => item.set(v === 'Yes')} className="px-4 py-2 font-ui text-sm border transition-all duration-200" style={{ borderColor: item.val === (v === 'Yes') ? 'var(--primary)' : 'var(--gold-border)', backgroundColor: item.val === (v === 'Yes') ? 'rgba(201,168,76,0.1)' : 'transparent', color: item.val === (v === 'Yes') ? 'var(--primary)' : 'var(--muted)' }}>
                                {v}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {businessType === 'landlord' && (
                  <div className="space-y-6">
                    <div>
                      <p className="font-ui text-sm mb-3" style={{ color: 'var(--foreground)' }}>MTD package (if income &gt;£50k)</p>
                      <div className="flex gap-3 flex-wrap">
                        {[{ v: 'filing', l: 'MTD filing only' }, { v: 'monitoring', l: 'MTD + monitoring' }, { v: 'full', l: 'MTD + full accounting' }].map(opt => (
                          <button key={opt.v} onClick={() => setLlMTD(opt.v as 'filing' | 'monitoring' | 'full')} className="px-4 py-3 font-ui text-sm border transition-all duration-200" style={{ borderColor: llMTD === opt.v ? 'var(--primary)' : 'var(--gold-border)', backgroundColor: llMTD === opt.v ? 'rgba(201,168,76,0.1)' : 'transparent', color: llMTD === opt.v ? 'var(--primary)' : 'var(--muted)' }}>
                            {opt.l}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="font-ui text-sm mb-3" style={{ color: 'var(--foreground)' }}>Portfolio complexity</p>
                      <div className="flex gap-3">
                        {[{ v: 'simple', l: 'Simple (standard lets)' }, { v: 'complex', l: 'Complex (HMO, mixed use)' }].map(opt => (
                          <button key={opt.v} onClick={() => setLlComplexity(opt.v as 'simple' | 'complex')} className="px-4 py-3 font-ui text-sm border transition-all duration-200" style={{ borderColor: llComplexity === opt.v ? 'var(--primary)' : 'var(--gold-border)', backgroundColor: llComplexity === opt.v ? 'rgba(201,168,76,0.1)' : 'transparent', color: llComplexity === opt.v ? 'var(--primary)' : 'var(--muted)' }}>
                            {opt.l}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {businessType === 'rd-only' && (
                  <div className="space-y-6">
                    <div>
                      <p className="font-ui text-sm mb-3" style={{ color: 'var(--foreground)' }}>Have you claimed R&D relief before?</p>
                      <div className="flex gap-3">
                        {['First time', 'Claimed before'].map(v => (
                          <button key={v} onClick={() => setRdFirstTime(v === 'First time')} className="px-4 py-3 font-ui text-sm border transition-all duration-200" style={{ borderColor: rdFirstTime === (v === 'First time') ? 'var(--primary)' : 'var(--gold-border)', backgroundColor: rdFirstTime === (v === 'First time') ? 'rgba(201,168,76,0.1)' : 'transparent', color: rdFirstTime === (v === 'First time') ? 'var(--primary)' : 'var(--muted)' }}>
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 mt-8">
                  <button onClick={() => setStep(2)} className="btn-ghost" style={{ minHeight: '48px', padding: '0 24px' }}>← Back</button>
                  <button onClick={() => setStep(4)} className="btn-gold" style={{ minHeight: '48px', padding: '0 32px' }}>See My Quote →</button>
                </div>
              </div>
            )}

            {/* Step 4: Quote + Contact */}
            {step === 4 && (
              <div>
                <h2 className="font-display mb-2" style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 400, color: 'var(--foreground)' }}>Your Quote</h2>
                <p className="font-ui mb-8" style={{ color: 'var(--muted)', fontSize: '14px' }}>Based on your answers, here is your personalised price.</p>

                {/* Quote Card */}
                <div className="mb-8 p-6 md:p-8 border" style={{ borderColor: 'var(--primary)', backgroundColor: 'rgba(201,168,76,0.04)' }}>
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 pb-6" style={{ borderBottom: '1px solid var(--gold-border)' }}>
                    <div>
                      <p className="section-label mb-2">Your Price</p>
                      {businessType === 'rd-only' ? (
                        <p className="font-display" style={{ fontSize: 'clamp(32px,5vw,48px)', color: 'var(--primary)', fontWeight: 400 }}>{formatCurrency(quote.annual)}</p>
                      ) : (
                        <>
                          <p className="font-display" style={{ fontSize: 'clamp(32px,5vw,48px)', color: 'var(--primary)', fontWeight: 400 }}>{formatCurrency(quote.monthly)}<span className="font-ui text-base" style={{ color: 'var(--muted)' }}>/month</span></p>
                          <p className="font-ui text-sm mt-1" style={{ color: 'var(--muted)' }}>or {formatCurrency(quote.annual)}/year (1 month free)</p>
                        </>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-ui text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--muted)' }}>Business type</p>
                      <p className="font-ui text-sm capitalize" style={{ color: 'var(--foreground)' }}>{businessType.replace(/-/g, ' ')}</p>
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div className="mb-6">
                    <p className="font-ui text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--muted)' }}>Price breakdown</p>
                    <div className="space-y-2">
                      {quote.breakdown.map((item, i) => (
                        <div key={i} className="flex justify-between">
                          <span className="font-ui text-sm" style={{ color: 'var(--body-text)' }}>{item.label}</span>
                          <span className="font-ui text-sm" style={{ color: 'var(--primary)' }}>+{formatCurrency(item.amount)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <p className="font-ui text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--muted)' }}>What&apos;s included</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {quote.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span style={{ color: 'var(--primary)', fontSize: '12px' }}>✓</span>
                          <span className="font-ui text-sm" style={{ color: 'var(--body-text)' }}>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Lead Capture */}
                {!submitted ? (
                  <div>
                    <p className="font-display mb-2" style={{ fontSize: '20px', fontWeight: 400, color: 'var(--foreground)' }}>Get your engagement letter</p>
                    <p className="font-ui text-sm mb-6" style={{ color: 'var(--muted)' }}>Enter your details and we&apos;ll email your quote and engagement letter immediately.</p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="font-ui text-xs uppercase tracking-widest mb-2 block" style={{ color: 'var(--muted)' }}>Full Name *</label>
                          <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Your name" className={inputClass} style={inputStyle} onFocus={e => Object.assign(e.target.style, inputFocus)} onBlur={e => Object.assign(e.target.style, inputStyle)} />
                        </div>
                        <div>
                          <label className="font-ui text-xs uppercase tracking-widest mb-2 block" style={{ color: 'var(--muted)' }}>Email *</label>
                          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="your@email.com" className={inputClass} style={inputStyle} onFocus={e => Object.assign(e.target.style, inputFocus)} onBlur={e => Object.assign(e.target.style, inputStyle)} />
                        </div>
                        <div>
                          <label className="font-ui text-xs uppercase tracking-widest mb-2 block" style={{ color: 'var(--muted)' }}>Company / Trading Name *</label>
                          <input type="text" value={company} onChange={e => setCompany(e.target.value)} required placeholder="Your company" className={inputClass} style={inputStyle} onFocus={e => Object.assign(e.target.style, inputFocus)} onBlur={e => Object.assign(e.target.style, inputStyle)} />
                        </div>
                        <div>
                          <label className="font-ui text-xs uppercase tracking-widest mb-2 block" style={{ color: 'var(--muted)' }}>Phone (optional)</label>
                          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+44..." className={inputClass} style={inputStyle} onFocus={e => Object.assign(e.target.style, inputFocus)} onBlur={e => Object.assign(e.target.style, inputStyle)} />
                        </div>
                      </div>
                      {error && <p className="font-ui text-sm" style={{ color: 'var(--red-accent)' }}>{error}</p>}
                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button type="submit" disabled={submitting} className="btn-gold" style={{ minHeight: '48px', padding: '0 32px', opacity: submitting ? 0.7 : 1 }}>
                          {submitting ? 'Sending...' : 'Send Me My Quote & Engagement Letter'}
                        </button>
                        <Link href="/book" className="btn-ghost flex items-center justify-center" style={{ minHeight: '48px', padding: '0 24px' }}>
                          Book a 15-min Call
                        </Link>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="p-6 border text-center" style={{ borderColor: 'var(--primary)', backgroundColor: 'rgba(201,168,76,0.06)' }}>
                    <p className="font-display mb-2" style={{ fontSize: '22px', color: 'var(--primary)', fontWeight: 400 }}>Quote sent.</p>
                    <p className="font-ui text-sm mb-4" style={{ color: 'var(--muted)' }}>Check your inbox — your quote and engagement letter are on their way.</p>
                    <Link href="/book" className="btn-gold inline-block" style={{ minHeight: '48px', padding: '0 32px', lineHeight: '48px' }}>
                      Book a Discovery Call →
                    </Link>
                  </div>
                )}

                <button onClick={() => setStep(3)} className="mt-6 font-ui text-sm" style={{ color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
                  ← Edit answers
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Trust signals */}
        <section className="px-6 md:px-10 py-12" style={{ borderTop: '1px solid var(--gold-border)' }}>
          <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-8">
            {['FIAB Certified', 'IAB Member', 'No hidden fees', 'Cancel anytime'].map(t => (
              <div key={t} className="flex items-center gap-2">
                <span style={{ color: 'var(--primary)', fontSize: '14px' }}>✓</span>
                <span className="font-ui text-sm" style={{ color: 'var(--muted)' }}>{t}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Quotation Calculator — Reckonwell',
            description: 'Get an instant accounting quote tailored to your business type and complexity.',
            url: 'https://reckonwell.com/quotation-calculator',
            provider: { '@type': 'LocalBusiness', name: 'Reckonwell' },
          }),
        }}
      />
    </>
  );
}
