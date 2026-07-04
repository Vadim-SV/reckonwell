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
    q: 'What is included in "Final Accounts & CT600"?',
    a: 'Statutory year-end accounts prepared to FRS 102/105 standard, filed at Companies House, plus your CT600 corporation tax return submitted to HMRC. VAT returns are included where applicable.',
  },
  {
    q: 'Do I need management accounts as well?',
    a: 'Management accounts are optional but recommended for any company with investors, a board, or significant growth. They give you a monthly view of profit, cash, and key metrics — not just a year-end snapshot.',
  },
  {
    q: 'What if I have R&D spend?',
    a: 'R&D Tax Credits require a separate claim alongside your CT600. We handle this as an add-on — identifying qualifying spend, preparing the technical narrative, and filing with HMRC.',
  },
  {
    q: 'How long does year-end take?',
    a: 'Typically 4–6 weeks from when we receive your records. We aim to file well before the Companies House and HMRC deadlines so you\'re never at risk of a penalty.',
  },
];

type Employees = '0' | '1-5' | '6-20' | '20+';
type Monitoring = 'annual' | 'quarterly' | 'monthly';
type Transactions = 'low' | 'medium' | 'high';

function calcCT600Price(
  profit: number,
  employees: Employees,
  monitoring: Monitoring,
  transactions: Transactions,
  hasRD: boolean,
  raisingInvestment: boolean,
  managementAccounts: boolean
): { monthly: number; breakdown: PriceBreakdown[] } {
  const breakdown: PriceBreakdown[] = [];

  // Base
  let base = 150;
  const empNum = employees === '0' ? 0 : employees === '1-5' ? 3 : employees === '6-20' ? 13 : 25;
  if (profit >= 1000000) {
    base = 750;
  } else if (profit >= 500000 || empNum >= 20) {
    base = 500;
  } else if (profit >= 250000 || empNum >= 6) {
    base = 300;
  }
  breakdown.push({ label: 'Base fee', amount: base });

  // Monitoring multiplier
  const monMult = { annual: 1.0, quarterly: 1.3, monthly: 1.6 }[monitoring];
  const afterMon = Math.round(base * monMult);
  if (monMult > 1) {
    breakdown.push({ label: `${monitoring.charAt(0).toUpperCase() + monitoring.slice(1)} monitoring`, amount: afterMon - base, note: `×${monMult}` });
  }

  // Transaction multiplier
  const txMult = { low: 1.0, medium: 1.2, high: 1.5 }[transactions];
  const afterTx = Math.round(afterMon * txMult);
  if (txMult > 1) {
    breakdown.push({ label: `Transaction volume (${transactions})`, amount: afterTx - afterMon, note: `×${txMult}` });
  }

  let total = afterTx;

  // Payroll
  if (empNum > 0) {
    const payroll = 40 * empNum;
    breakdown.push({ label: `Payroll (${empNum} employees)`, amount: payroll });
    total += payroll;
  }

  // Add-ons
  if (monitoring === 'quarterly' || monitoring === 'monthly') {
    breakdown.push({ label: 'Quarterly VAT returns', amount: 60 });
    total += 60;
  }
  if (managementAccounts) {
    breakdown.push({ label: 'Monthly management accounts', amount: 100 });
    total += 100;
  }
  breakdown.push({ label: 'Director salary planning', amount: 50 });
  total += 50;
  if (hasRD) {
    breakdown.push({ label: 'R&D relief ongoing', amount: 200 });
    total += 200;
  }
  if (raisingInvestment) {
    breakdown.push({ label: 'Investor reporting', amount: 100 });
    total += 100;
  }

  return { monthly: total, breakdown };
}

export default function FinalAccountsCT600CalculatorPage() {
  const [step, setStep] = useState(0);
  const [profit, setProfit] = useState(200000);
  const [employees, setEmployees] = useState<Employees | null>(null);
  const [monitoring, setMonitoring] = useState<Monitoring | null>(null);
  const [transactions, setTransactions] = useState<Transactions | null>(null);
  const [hasRD, setHasRD] = useState<boolean | null>(null);
  const [raisingInvestment, setRaisingInvestment] = useState<boolean | null>(null);
  const [managementAccounts, setManagementAccounts] = useState<boolean | null>(null);
  const [result, setResult] = useState<{ monthly: number; breakdown: PriceBreakdown[] } | null>(null);
  const [form, setForm] = useState<FormData>({ name: '', email: '', company: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const totalSteps = 7;

  const formatMoney = (v: number) => {
    if (v >= 1000000) return `£${(v / 1000000).toFixed(1)}m`;
    if (v >= 1000) return `£${(v / 1000).toFixed(0)}k`;
    return `£${v}`;
  };

  const handleCalculate = () => {
    if (!employees || !monitoring || !transactions || hasRD === null || raisingInvestment === null || managementAccounts === null) return;
    const res = calcCT600Price(profit, employees, monitoring, transactions, hasRD, raisingInvestment, managementAccounts);
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
          calculator_type: 'final-accounts-ct600',
          page: 'final-accounts-ct600',
          name: form.name,
          email: form.email,
          company: form.company,
          phone: form.phone,
          recommended_tier: 'Final Accounts & CT600',
          recommended_monthly_price: result.monthly,
          recommended_annual_price: result.monthly * 12,
          recommended_price: result.monthly,
          price_breakdown: result.breakdown.map(b => `${b.label}: £${b.amount}${b.note ? ` (${b.note})` : ''}`),
          inputs: { annual_profit: profit, employees, monitoring, transactions, has_rd_spend: hasRD, raising_investment: raisingInvestment, management_accounts: managementAccounts },
          company_details: { annual_profit: profit, employees, monitoring, transactions, has_rd_spend: hasRD, raising_investment: raisingInvestment, management_accounts: managementAccounts },
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
          <p className="section-label mb-4">Final Accounts & CT600 Calculator</p>
          <h1 className="section-h2-medium mb-6">
            Year-end accounts and corporation tax.{' '}
            <span className="gold-italic">Done properly.</span>
          </h1>
          <p className="body-text-rw mb-4" style={{ color: 'var(--body-text)' }}>
            Every limited company needs statutory accounts filed at Companies House and a CT600 corporation tax return submitted to HMRC. Miss a deadline and the penalties start immediately.
          </p>
          <p className="body-text-rw mb-4" style={{ color: 'var(--body-text)' }}>
            We prepare your accounts to the correct standard, identify every allowable deduction, and file everything on time. VAT returns are included where applicable.
          </p>
          <p className="body-text-rw" style={{ color: 'var(--body-text)' }}>
            The price depends on your profit level, headcount, and how closely you want us monitoring your position throughout the year. Use the calculator to get your exact monthly figure.
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

          {/* Step 0: Profit */}
          {step === 0 && (
            <div>
              <h2 className="section-h2-medium mb-3" style={{ fontSize: 'clamp(22px,3vw,36px)' }}>What is your annual profit?</h2>
              <p className="body-text-rw mb-8" style={{ color: 'var(--muted)', fontSize: '14px' }}>Net profit before tax. Use your last filed accounts or a current estimate.</p>
              <div className="mb-6">
                <div style={{ fontSize: 'clamp(28px,4vw,48px)', fontFamily: 'var(--font-display)', color: 'var(--primary)', marginBottom: '16px' }}>{formatMoney(profit)}</div>
                <input type="range" min={0} max={5000000} step={10000} value={profit} onChange={e => setProfit(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary)', height: '6px', cursor: 'pointer' }} />
                <div className="flex justify-between mt-2" style={{ fontSize: '11px', color: 'var(--muted)' }}><span>£0</span><span>£2.5m</span><span>£5m+</span></div>
              </div>
              {nextBtn(true, () => setStep(1))}
            </div>
          )}

          {/* Step 1: Employees */}
          {step === 1 && (
            <div>
              <h2 className="section-h2-medium mb-3" style={{ fontSize: 'clamp(22px,3vw,36px)' }}>How many employees do you have?</h2>
              <p className="body-text-rw mb-8" style={{ color: 'var(--muted)', fontSize: '14px' }}>Include directors on payroll. Affects payroll processing costs.</p>
              <div className="flex flex-col gap-3 mb-8">
                {[{ label: 'None (director only, no payroll)', value: '0' as Employees }, { label: '1–5 employees', value: '1-5' as Employees }, { label: '6–20 employees', value: '6-20' as Employees }, { label: '20+ employees', value: '20+' as Employees }].map(opt => (
                  <React.Fragment key={opt.value}>{optBtn(employees === opt.value, () => setEmployees(opt.value), opt.label)}</React.Fragment>
                ))}
              </div>
              <div className="flex gap-3">{backBtn(0)}{nextBtn(employees !== null, () => setStep(2))}</div>
            </div>
          )}

          {/* Step 2: Monitoring */}
          {step === 2 && (
            <div>
              <h2 className="section-h2-medium mb-3" style={{ fontSize: 'clamp(22px,3vw,36px)' }}>How often do you want monitoring?</h2>
              <p className="body-text-rw mb-8" style={{ color: 'var(--muted)', fontSize: '14px' }}>More frequent monitoring means you always know where you stand — not just at year-end.</p>
              <div className="flex flex-col gap-3 mb-8">
                {[{ label: 'Annual', sub: 'Year-end accounts and CT600 only', value: 'annual' as Monitoring }, { label: 'Quarterly', sub: 'Quarterly reviews plus year-end', value: 'quarterly' as Monitoring }, { label: 'Monthly', sub: 'Monthly management pack plus year-end', value: 'monthly' as Monitoring }].map(opt => (
                  <React.Fragment key={opt.value}>{optBtn(monitoring === opt.value, () => setMonitoring(opt.value), opt.label, opt.sub)}</React.Fragment>
                ))}
              </div>
              <div className="flex gap-3">{backBtn(1)}{nextBtn(monitoring !== null, () => setStep(3))}</div>
            </div>
          )}

          {/* Step 3: Transactions */}
          {step === 3 && (
            <div>
              <h2 className="section-h2-medium mb-3" style={{ fontSize: 'clamp(22px,3vw,36px)' }}>What is your monthly transaction volume?</h2>
              <p className="body-text-rw mb-8" style={{ color: 'var(--muted)', fontSize: '14px' }}>Total income and expense transactions across all accounts.</p>
              <div className="flex flex-col gap-3 mb-8">
                {[{ label: 'Low', sub: 'Fewer than 100 transactions/month', value: 'low' as Transactions }, { label: 'Medium', sub: '100–500 transactions/month', value: 'medium' as Transactions }, { label: 'High', sub: 'More than 500 transactions/month', value: 'high' as Transactions }].map(opt => (
                  <React.Fragment key={opt.value}>{optBtn(transactions === opt.value, () => setTransactions(opt.value), opt.label, opt.sub)}</React.Fragment>
                ))}
              </div>
              <div className="flex gap-3">{backBtn(2)}{nextBtn(transactions !== null, () => setStep(4))}</div>
            </div>
          )}

          {/* Step 4: R&D */}
          {step === 4 && (
            <div>
              <h2 className="section-h2-medium mb-3" style={{ fontSize: 'clamp(22px,3vw,36px)' }}>Do you have R&D spend?</h2>
              <p className="body-text-rw mb-8" style={{ color: 'var(--muted)', fontSize: '14px' }}>R&D Tax Credits require an ongoing claim alongside your CT600. We handle this as an add-on.</p>
              <div className="flex flex-col gap-3 mb-8">
                {[{ label: 'Yes — we invest in R&D', value: true }, { label: 'No', value: false }].map(opt => (
                  <React.Fragment key={String(opt.value)}>{optBtn(hasRD === opt.value, () => setHasRD(opt.value), opt.label)}</React.Fragment>
                ))}
              </div>
              <div className="flex gap-3">{backBtn(3)}{nextBtn(hasRD !== null, () => setStep(5))}</div>
            </div>
          )}

          {/* Step 5: Investment */}
          {step === 5 && (
            <div>
              <h2 className="section-h2-medium mb-3" style={{ fontSize: 'clamp(22px,3vw,36px)' }}>Are you raising investment?</h2>
              <p className="body-text-rw mb-8" style={{ color: 'var(--muted)', fontSize: '14px' }}>Investor reporting requires additional management information prepared to investor-grade standards.</p>
              <div className="flex flex-col gap-3 mb-8">
                {[{ label: 'Yes — we have or are seeking investors', value: true }, { label: 'No', value: false }].map(opt => (
                  <React.Fragment key={String(opt.value)}>{optBtn(raisingInvestment === opt.value, () => setRaisingInvestment(opt.value), opt.label)}</React.Fragment>
                ))}
              </div>
              <div className="flex gap-3">{backBtn(4)}{nextBtn(raisingInvestment !== null, () => setStep(6))}</div>
            </div>
          )}

          {/* Step 6: Management accounts */}
          {step === 6 && (
            <div>
              <h2 className="section-h2-medium mb-3" style={{ fontSize: 'clamp(22px,3vw,36px)' }}>Do you need monthly management accounts?</h2>
              <p className="body-text-rw mb-8" style={{ color: 'var(--muted)', fontSize: '14px' }}>A monthly pack showing P&L, balance sheet, and cash flow — essential for growing businesses and investor reporting.</p>
              <div className="flex flex-col gap-3 mb-8">
                {[{ label: 'Yes — monthly management accounts', value: true }, { label: 'No — year-end accounts are sufficient', value: false }].map(opt => (
                  <React.Fragment key={String(opt.value)}>{optBtn(managementAccounts === opt.value, () => setManagementAccounts(opt.value), opt.label)}</React.Fragment>
                ))}
              </div>
              <div className="flex gap-3">{backBtn(5)}{nextBtn(managementAccounts !== null, handleCalculate, 'Calculate My Price →')}</div>
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
                  <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.6 }}>Indicative price based on your inputs. Confirmed in your engagement letter after onboarding.</p>
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

              <button onClick={() => { setStep(0); setResult(null); setSubmitted(false); setEmployees(null); setMonitoring(null); setTransactions(null); setHasRD(null); setRaisingInvestment(null); setManagementAccounts(null); }} style={{ marginTop: '16px', background: 'transparent', border: 'none', color: 'var(--muted)', fontSize: '13px', cursor: 'pointer', textDecoration: 'underline' }}>← Recalculate</button>
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
