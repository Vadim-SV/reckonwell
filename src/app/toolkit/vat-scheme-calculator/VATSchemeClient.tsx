'use client';

import React, { useState, useCallback } from 'react';
import ShareBar from '@/components/toolkit/ShareBar';
import { trackToolStarted, trackToolCompleted } from '@/lib/toolkit-utils';
import { VAT, VAT_FLAT_RATES } from '@/lib/tax-config';

interface Inputs {
  rollingTurnover: string;
  next30DaysTurnover: string;
  sector: string;
  vatableCosts: string;
  goodsSharePct: string;
  customersVatRegistered: string;
  paymentTiming: string;
}

interface VATResults {
  mustRegister: boolean;
  registrationReason: string;
  standardVAT: number;
  flatRateVAT: number;
  flatRatePercent: number;
  isLimitedCostTrader: boolean;
  cashAccountingBenefit: number;
  recommendation: string;
  recommendationReason: string;
  standardNetCost: number;
  flatRateNetCost: number;
  annualDifference: number;
}

function calcVAT(inputs: Inputs): VATResults | null {
  const turnover = parseFloat(inputs.rollingTurnover) || 0;
  const next30 = parseFloat(inputs.next30DaysTurnover) || 0;
  const vatableCosts = parseFloat(inputs.vatableCosts) || 0;
  const goodsShare = (parseFloat(inputs.goodsSharePct) || 0) / 100;
  const flatRatePct = VAT_FLAT_RATES[inputs.sector] ?? 0.12;

  if (turnover <= 0) return null;

  const mustRegister = turnover > VAT.registrationThreshold || next30 > VAT.registrationThreshold;
  const registrationReason = turnover > VAT.registrationThreshold
    ? `Your rolling 12-month taxable turnover of £${turnover.toLocaleString('en-GB')} exceeds the £${VAT.registrationThreshold.toLocaleString('en-GB')} registration threshold.`
    : next30 > VAT.registrationThreshold
    ? `Your expected turnover in the next 30 days alone (£${next30.toLocaleString('en-GB')}) exceeds the £${VAT.registrationThreshold.toLocaleString('en-GB')} threshold.`
    : `Your turnover is below the £${VAT.registrationThreshold.toLocaleString('en-GB')} threshold. Registration is optional but may be beneficial if your customers are VAT-registered.`;

  // Standard VAT: output tax minus input tax
  const outputVAT = turnover * VAT.standardRate;
  const inputVAT = vatableCosts * VAT.standardRate;
  const standardVAT = Math.max(0, outputVAT - inputVAT);
  const standardNetCost = standardVAT; // net VAT payable

  // Flat Rate Scheme
  const grossTurnover = turnover * 1.20; // VAT-inclusive turnover
  const goodsCost = vatableCosts * goodsShare;
  const isLimitedCostTrader = goodsCost < 0.02 * grossTurnover || goodsCost < 1000;
  const effectiveFlatRate = isLimitedCostTrader ? VAT.limitedCostTraderRate : flatRatePct;
  const flatRateVAT = grossTurnover * effectiveFlatRate;
  const flatRateNetCost = flatRateVAT; // no input tax recovery

  // Cash accounting benefit (rough estimate: if customers pay late, cash accounting defers VAT)
  const cashAccountingBenefit = inputs.paymentTiming === 'slow' ? standardVAT * 0.08 : 0; // ~8% cash flow benefit

  const annualDifference = standardVAT - flatRateVAT;

  let recommendation = '';
  let recommendationReason = '';

  if (!mustRegister) {
    recommendation = 'Voluntary registration may be beneficial';
    recommendationReason = inputs.customersVatRegistered === 'yes' ?'Since your customers are VAT-registered, they can reclaim the VAT you charge. Voluntary registration lets you reclaim input VAT on your costs.' :'Since your customers are mainly consumers, adding VAT would increase your prices. Voluntary registration is unlikely to be beneficial unless your input VAT is significant.';
  } else if (annualDifference > 500 && !isLimitedCostTrader) {
    recommendation = 'Flat Rate Scheme may save you money';
    recommendationReason = `The Flat Rate Scheme could save you approximately £${Math.round(annualDifference).toLocaleString('en-GB')} per year compared to standard VAT accounting. Your sector rate is ${(effectiveFlatRate * 100).toFixed(1)}%.`;
  } else if (isLimitedCostTrader) {
    recommendation = 'Standard VAT accounting recommended';
    recommendationReason = `You are likely a limited cost trader (goods cost less than 2% of VAT-inclusive turnover or less than £1,000/year). The limited cost trader rate of 16.5% applies to the Flat Rate Scheme, making standard accounting more favourable.`;
  } else if (inputs.paymentTiming === 'slow') {
    recommendation = 'Consider Cash Accounting Scheme';
    recommendationReason = 'Since your customers pay slowly, the Cash Accounting Scheme lets you pay VAT only when you receive payment — improving cash flow.';
  } else {
    recommendation = 'Standard VAT accounting';
    recommendationReason = 'Based on your inputs, standard VAT accounting is likely the most straightforward option.';
  }

  return {
    mustRegister,
    registrationReason,
    standardVAT,
    flatRateVAT,
    flatRatePercent: effectiveFlatRate,
    isLimitedCostTrader,
    cashAccountingBenefit,
    recommendation,
    recommendationReason,
    standardNetCost,
    flatRateNetCost,
    annualDifference,
  };
}

const SECTOR_OPTIONS = Object.entries(VAT_FLAT_RATES)
  .map(([key, rate]) => ({
    value: key,
    label: key.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    rate,
  }))
  .sort((a, b) => a.label.localeCompare(b.label));

function fmtCurrency(n: number): string {
  return '£' + Math.round(n).toLocaleString('en-GB');
}

export default function VATSchemeClient() {
  const [inputs, setInputs] = useState<Inputs>({
    rollingTurnover: '95000',
    next30DaysTurnover: '8000',
    sector: 'management-consultancy',
    vatableCosts: '20000',
    goodsSharePct: '10',
    customersVatRegistered: 'yes',
    paymentTiming: 'normal',
  });
  const [started, setStarted] = useState(false);

  const handleChange = useCallback((field: keyof Inputs, value: string) => {
    if (!started) {
      setStarted(true);
      trackToolStarted('vat-scheme-calculator');
    }
    setInputs(prev => ({ ...prev, [field]: value }));
  }, [started]);

  const results = calcVAT(inputs);
  if (results && started && !results.mustRegister === false) {
    trackToolCompleted('vat-scheme-calculator');
  }

  const toolUrl = 'https://reckonwell.com/toolkit/vat-scheme-calculator';
  const shareText = 'Free VAT scheme calculator — compares flat rate vs standard accounting for 2026/27:';

  return (
    <div className="max-w-3xl">
      <ShareBar toolSlug="vat-scheme-calculator" toolUrl={toolUrl} shareText={shareText} />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div>
          <h2 className="font-display text-xl mb-4" style={{ color: 'var(--foreground)' }}>Your VAT figures</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>Rolling 12-month taxable turnover (£)</label>
              <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>VAT-exclusive. Registration threshold: £{VAT.registrationThreshold.toLocaleString('en-GB')}</p>
              <input type="number" min="0" value={inputs.rollingTurnover} onChange={e => handleChange('rollingTurnover', e.target.value)} className="w-full px-3 py-2 rounded border text-sm" style={{ borderColor: 'var(--border)', background: 'var(--background)', color: 'var(--foreground)', outline: 'none' }} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>Expected turnover in next 30 days (£)</label>
              <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>If this alone exceeds £{VAT.registrationThreshold.toLocaleString('en-GB')}, you must register immediately</p>
              <input type="number" min="0" value={inputs.next30DaysTurnover} onChange={e => handleChange('next30DaysTurnover', e.target.value)} className="w-full px-3 py-2 rounded border text-sm" style={{ borderColor: 'var(--border)', background: 'var(--background)', color: 'var(--foreground)', outline: 'none' }} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>Business sector</label>
              <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>Used to determine your Flat Rate Scheme percentage</p>
              <select value={inputs.sector} onChange={e => handleChange('sector', e.target.value)} className="w-full px-3 py-2 rounded border text-sm" style={{ borderColor: 'var(--border)', background: 'var(--background)', color: 'var(--foreground)', outline: 'none' }}>
                {SECTOR_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label} ({(opt.rate * 100).toFixed(1)}%)</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>Annual VAT-able costs (£)</label>
              <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>Purchases and expenses with VAT on them (VAT-exclusive)</p>
              <input type="number" min="0" value={inputs.vatableCosts} onChange={e => handleChange('vatableCosts', e.target.value)} className="w-full px-3 py-2 rounded border text-sm" style={{ borderColor: 'var(--border)', background: 'var(--background)', color: 'var(--foreground)', outline: 'none' }} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>Share of costs that are goods (%)</label>
              <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>Used to check the limited cost trader test (goods &lt; 2% of turnover)</p>
              <input type="number" min="0" max="100" value={inputs.goodsSharePct} onChange={e => handleChange('goodsSharePct', e.target.value)} className="w-full px-3 py-2 rounded border text-sm" style={{ borderColor: 'var(--border)', background: 'var(--background)', color: 'var(--foreground)', outline: 'none' }} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>Are your customers mainly VAT-registered?</label>
              <div className="flex gap-3">
                {[{ value: 'yes', label: 'Yes (B2B)' }, { value: 'no', label: 'No (consumers)' }].map(opt => (
                  <button key={opt.value} onClick={() => handleChange('customersVatRegistered', opt.value)} className="px-4 py-2 rounded text-sm font-medium transition-all" style={{ border: `1px solid ${inputs.customersVatRegistered === opt.value ? 'var(--primary)' : 'var(--border)'}`, background: inputs.customersVatRegistered === opt.value ? 'var(--primary)' : 'transparent', color: inputs.customersVatRegistered === opt.value ? 'var(--primary-foreground)' : 'var(--muted)', cursor: 'pointer' }}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>How quickly do customers pay?</label>
              <div className="flex gap-3">
                {[{ value: 'fast', label: 'Quickly (≤30 days)' }, { value: 'normal', label: 'Normal (30–60 days)' }, { value: 'slow', label: 'Slowly (60+ days)' }].map(opt => (
                  <button key={opt.value} onClick={() => handleChange('paymentTiming', opt.value)} className="px-3 py-2 rounded text-xs font-medium transition-all" style={{ border: `1px solid ${inputs.paymentTiming === opt.value ? 'var(--primary)' : 'var(--border)'}`, background: inputs.paymentTiming === opt.value ? 'var(--primary)' : 'transparent', color: inputs.paymentTiming === opt.value ? 'var(--primary-foreground)' : 'var(--muted)', cursor: 'pointer' }}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          <h2 className="font-display text-xl mb-4" style={{ color: 'var(--foreground)' }}>Results</h2>
          {results ? (
            <div className="space-y-4">
              {/* Registration status */}
              <div className="p-4 rounded-lg border" style={{ borderColor: results.mustRegister ? '#b43232' : '#2D6A4F', background: results.mustRegister ? '#b432320a' : '#2D6A4F0a' }}>
                <p className="font-semibold text-sm mb-1" style={{ color: results.mustRegister ? '#b43232' : '#2D6A4F' }}>
                  {results.mustRegister ? '⚠️ VAT registration required' : '✓ VAT registration not yet required'}
                </p>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>{results.registrationReason}</p>
              </div>

              {/* Scheme comparison */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border)' }}>
                      <th className="text-left py-2 pr-3 font-semibold text-xs" style={{ color: 'var(--foreground)' }}>Scheme</th>
                      <th className="text-right py-2 pr-3 font-semibold text-xs" style={{ color: 'var(--foreground)' }}>Annual VAT</th>
                      <th className="text-right py-2 font-semibold text-xs" style={{ color: 'var(--foreground)' }}>Difference</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      <td className="py-2 pr-3" style={{ color: 'var(--foreground)' }}>Standard accounting</td>
                      <td className="py-2 pr-3 text-right font-medium" style={{ color: 'var(--foreground)' }}>{fmtCurrency(results.standardVAT)}</td>
                      <td className="py-2 text-right" style={{ color: 'var(--muted)' }}>—</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      <td className="py-2 pr-3" style={{ color: 'var(--foreground)' }}>
                        Flat Rate Scheme
                        <span className="ml-1 text-xs" style={{ color: 'var(--muted)' }}>({(results.flatRatePercent * 100).toFixed(1)}%{results.isLimitedCostTrader ? ' — limited cost trader' : ''})</span>
                      </td>
                      <td className="py-2 pr-3 text-right font-medium" style={{ color: 'var(--foreground)' }}>{fmtCurrency(results.flatRateVAT)}</td>
                      <td className="py-2 text-right font-semibold" style={{ color: results.annualDifference > 0 ? '#2D6A4F' : '#b43232' }}>
                        {results.annualDifference > 0 ? `Save ${fmtCurrency(results.annualDifference)}` : `Cost ${fmtCurrency(-results.annualDifference)} more`}
                      </td>
                    </tr>
                    {results.cashAccountingBenefit > 0 && (
                      <tr>
                        <td className="py-2 pr-3" style={{ color: 'var(--foreground)' }}>Cash Accounting (cash flow benefit)</td>
                        <td className="py-2 pr-3 text-right font-medium" style={{ color: '#2D6A4F' }}>~{fmtCurrency(results.cashAccountingBenefit)}/yr</td>
                        <td className="py-2 text-right text-xs" style={{ color: 'var(--muted)' }}>cash flow</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Recommendation */}
              <div className="p-4 rounded-lg border" style={{ borderColor: 'var(--primary)', background: 'rgba(var(--primary-rgb, 24,33,62),0.04)' }}>
                <p className="font-ui text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--primary)', letterSpacing: '1.5px' }}>Recommendation</p>
                <p className="font-semibold text-sm mb-1" style={{ color: 'var(--foreground)' }}>{results.recommendation}</p>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>{results.recommendationReason}</p>
              </div>

              {/* Key thresholds */}
              <div className="p-4 rounded-lg border text-xs space-y-1" style={{ borderColor: 'var(--border)', background: 'var(--surface, var(--background))' }}>
                <p className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Key VAT thresholds 2026/27</p>
                <p style={{ color: 'var(--muted)' }}>Registration threshold: <strong style={{ color: 'var(--foreground)' }}>£{VAT.registrationThreshold.toLocaleString('en-GB')}</strong></p>
                <p style={{ color: 'var(--muted)' }}>Deregistration threshold: <strong style={{ color: 'var(--foreground)' }}>£{VAT.deregistrationThreshold.toLocaleString('en-GB')}</strong></p>
                <p style={{ color: 'var(--muted)' }}>Flat Rate Scheme entry: <strong style={{ color: 'var(--foreground)' }}>£{VAT.flatRateSchemeThreshold.toLocaleString('en-GB')}</strong></p>
                <p style={{ color: 'var(--muted)' }}>Cash Accounting Scheme entry: <strong style={{ color: 'var(--foreground)' }}>£{VAT.cashAccountingThreshold.toLocaleString('en-GB')}</strong></p>
              </div>
            </div>
          ) : (
            <p className="text-sm" style={{ color: 'var(--muted)' }}>Enter your turnover to see results.</p>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-10 p-6 rounded-lg text-center" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}>
        <h3 className="font-display text-lg mb-2">Not sure which VAT scheme is right for you?</h3>
        <p className="text-sm mb-4 opacity-90">VAT scheme choice can save hundreds or thousands per year. Book a free call to review your specific situation.</p>
        <a href="/book" className="inline-block px-6 py-3 rounded font-semibold text-sm" style={{ background: 'var(--primary-foreground)', color: 'var(--primary)', textDecoration: 'none' }}>
          Book a free call →
        </a>
      </div>
    </div>
  );
}
