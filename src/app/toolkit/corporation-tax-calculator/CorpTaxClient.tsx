'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { CORPORATION_TAX, TOOLKIT_META, TAX_YEAR } from '@/lib/tax-config';
import { formatCurrency, formatPercent, trackToolStarted, trackToolCompleted, trackCtaClicked, buildShareUrl } from '@/lib/toolkit-share';
import ShareBar from '../components/ShareBar';

interface CTInputs {
  profit: number;
  periodStart: string;
  periodEnd: string;
  associatedCompanies: number;
}

interface CTResult {
  tax: number;
  effectiveRate: number;
  smallProfitsThreshold: number;
  mainRateThreshold: number;
  marginalRelief: number;
  paymentDeadline: string;
  filingDeadline: string;
  quarterlyInstalments: boolean;
  adjustedProfit: number;
  periodDays: number;
}

function addMonthsPlusOneDay(dateStr: string, months: number): string {
  const d = new Date(dateStr);
  d.setMonth(d.getMonth() + months);
  d.setDate(d.getDate() + 1);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function calcPeriodDays(start: string, end: string): number {
  const s = new Date(start);
  const e = new Date(end);
  return Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1;
}

function calcCT(inputs: CTInputs): CTResult {
  const { profit, periodStart, periodEnd, associatedCompanies } = inputs;
  const days = calcPeriodDays(periodStart, periodEnd);
  const adjustmentFactor = days / 365;
  const divisor = associatedCompanies + 1;
  const adjustedSmall = CORPORATION_TAX.lowerLimit * adjustmentFactor / divisor;
  const adjustedMain = CORPORATION_TAX.upperLimit * adjustmentFactor / divisor;

  let tax = 0;
  let marginalRelief = 0;

  if (profit > 0) {
    if (profit <= adjustedSmall) {
      tax = profit * CORPORATION_TAX.smallProfitsRate;
    } else if (profit >= adjustedMain) {
      tax = profit * CORPORATION_TAX.mainRate;
    } else {
      const grossTax = profit * CORPORATION_TAX.mainRate;
      marginalRelief = ((adjustedMain - profit) / (adjustedMain - adjustedSmall)) * profit * (CORPORATION_TAX.mainRate - CORPORATION_TAX.smallProfitsRate);
      tax = grossTax - marginalRelief;
    }
  }

  const effectiveRate = profit > 0 ? tax / profit : 0;
  const paymentDeadline = addMonthsPlusOneDay(periodEnd, 9);
  const filingDeadline = addMonthsPlusOneDay(periodEnd, 12);
  const quarterlyInstalments = profit > 1500000 * adjustmentFactor / divisor;

  return {
    tax: Math.max(0, tax),
    effectiveRate,
    smallProfitsThreshold: adjustedSmall,
    mainRateThreshold: adjustedMain,
    marginalRelief,
    paymentDeadline,
    filingDeadline,
    quarterlyInstalments,
    adjustedProfit: profit,
    periodDays: days,
  };
}

export default function CorpTaxClient() {
  const [inputs, setInputs] = useState<CTInputs>({
    profit: 75000,
    periodStart: '2026-04-01',
    periodEnd: '2027-03-31',
    associatedCompanies: 0,
  });
  const [result, setResult] = useState<CTResult | null>(null);
  const [shareUrl, setShareUrl] = useState('');

  const calculate = useCallback(() => {
    const r = calcCT(inputs);
    setResult(r);
    trackToolCompleted('corporation-tax-calculator');
    const url = buildShareUrl('corporation-tax-calculator', {
      p: inputs.profit,
      ps: inputs.periodStart,
      pe: inputs.periodEnd,
      ac: inputs.associatedCompanies,
    });
    setShareUrl(url);
  }, [inputs]);

  const handleCalculate = () => {
    trackToolStarted('corporation-tax-calculator');
    calculate();
  };

  return (
    <div>
      {/* Inputs */}
      <div className="p-6 md:p-8 mb-6" style={{ border: '1px solid var(--border)', borderRadius: '2px', background: 'var(--surface)' }}>
        <h2 className="font-display text-xl mb-6" style={{ fontWeight: 400, color: 'var(--foreground)' }}>Enter your figures</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="font-ui text-xs uppercase tracking-widest block mb-2" style={{ color: 'var(--muted)', fontSize: '10px', letterSpacing: '2px' }}>
              Taxable profit (£)
            </label>
            <input
              type="number"
              value={inputs.profit}
              onChange={(e) => setInputs(p => ({ ...p, profit: Math.max(0, Number(e.target.value)) }))}
              className="w-full font-ui text-base px-4 py-3"
              style={{ border: '1px solid var(--border)', borderRadius: '2px', background: 'var(--card)', color: 'var(--foreground)', outline: 'none' }}
              min={0}
              step={1000}
              aria-label="Taxable profit"
            />
          </div>

          <div>
            <label className="font-ui text-xs uppercase tracking-widest block mb-2" style={{ color: 'var(--muted)', fontSize: '10px', letterSpacing: '2px' }}>
              Associated companies (excluding this one)
            </label>
            <input
              type="number"
              value={inputs.associatedCompanies}
              onChange={(e) => setInputs(p => ({ ...p, associatedCompanies: Math.max(0, Number(e.target.value)) }))}
              className="w-full font-ui text-base px-4 py-3"
              style={{ border: '1px solid var(--border)', borderRadius: '2px', background: 'var(--card)', color: 'var(--foreground)', outline: 'none' }}
              min={0}
              step={1}
              aria-label="Number of associated companies"
            />
          </div>

          <div>
            <label className="font-ui text-xs uppercase tracking-widest block mb-2" style={{ color: 'var(--muted)', fontSize: '10px', letterSpacing: '2px' }}>
              Accounting period start
            </label>
            <input
              type="date"
              value={inputs.periodStart}
              onChange={(e) => setInputs(p => ({ ...p, periodStart: e.target.value }))}
              className="w-full font-ui text-base px-4 py-3"
              style={{ border: '1px solid var(--border)', borderRadius: '2px', background: 'var(--card)', color: 'var(--foreground)', outline: 'none' }}
              aria-label="Accounting period start date"
            />
          </div>

          <div>
            <label className="font-ui text-xs uppercase tracking-widest block mb-2" style={{ color: 'var(--muted)', fontSize: '10px', letterSpacing: '2px' }}>
              Accounting period end
            </label>
            <input
              type="date"
              value={inputs.periodEnd}
              onChange={(e) => setInputs(p => ({ ...p, periodEnd: e.target.value }))}
              className="w-full font-ui text-base px-4 py-3"
              style={{ border: '1px solid var(--border)', borderRadius: '2px', background: 'var(--card)', color: 'var(--foreground)', outline: 'none' }}
              aria-label="Accounting period end date"
            />
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="mt-6 font-ui text-xs uppercase tracking-widest px-8 py-3 transition-all duration-200"
          style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', borderRadius: '2px', fontSize: '11px', letterSpacing: '2px', fontWeight: 600, minHeight: '48px', border: 'none', cursor: 'pointer' }}
        >
          Calculate →
        </button>
      </div>

      {/* Results */}
      {result && (
        <div>
          <div className="p-6 md:p-8 mb-6" style={{ background: 'var(--primary)', borderRadius: '2px' }}>
            <p className="font-ui text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(251,241,227,0.6)', fontSize: '10px', letterSpacing: '3px' }}>
              Corporation tax due
            </p>
            <p className="font-display text-3xl md:text-4xl mb-1" style={{ color: 'var(--primary-foreground)', fontWeight: 400 }}>
              {formatCurrency(result.tax)}
            </p>
            <p className="font-ui text-sm" style={{ color: 'rgba(251,241,227,0.75)' }}>
              Effective rate: {formatPercent(result.effectiveRate)} · Period: {result.periodDays} days
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              { label: 'Taxable profit', value: formatCurrency(result.adjustedProfit) },
              { label: 'Corporation tax', value: formatCurrency(result.tax), highlight: true },
              { label: 'Effective rate', value: formatPercent(result.effectiveRate) },
              { label: 'Marginal relief', value: result.marginalRelief > 0 ? formatCurrency(result.marginalRelief) : 'N/A' },
              { label: 'Small profits threshold', value: formatCurrency(result.smallProfitsThreshold) },
              { label: 'Main rate threshold', value: formatCurrency(result.mainRateThreshold) },
            ].map((item) => (
              <div key={item.label} className="p-4" style={{ background: item.highlight ? 'var(--primary-dim)' : 'var(--surface)', border: '1px solid var(--border)', borderRadius: '2px' }}>
                <p className="font-ui text-xs mb-1" style={{ color: 'var(--muted)', fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase' }}>{item.label}</p>
                <p className="font-display text-xl" style={{ color: 'var(--foreground)', fontWeight: item.highlight ? 600 : 400 }}>{item.value}</p>
              </div>
            ))}
          </div>

          <div className="p-6 mb-6" style={{ border: '1px solid var(--border)', borderRadius: '2px', background: 'var(--surface)' }}>
            <h3 className="font-display text-lg mb-4" style={{ fontWeight: 400, color: 'var(--foreground)' }}>Key deadlines</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span style={{ color: 'var(--primary)', fontSize: '16px', flexShrink: 0 }}>📅</span>
                <div>
                  <p className="font-ui text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--muted)', fontSize: '10px', letterSpacing: '1px' }}>CT payment deadline</p>
                  <p className="font-ui text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{result.paymentDeadline}</p>
                  <p className="font-ui text-xs" style={{ color: 'var(--muted)', fontSize: '11px' }}>9 months and 1 day after the end of your accounting period</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span style={{ color: 'var(--primary)', fontSize: '16px', flexShrink: 0 }}>📋</span>
                <div>
                  <p className="font-ui text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--muted)', fontSize: '10px', letterSpacing: '1px' }}>CT600 filing deadline</p>
                  <p className="font-ui text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{result.filingDeadline}</p>
                  <p className="font-ui text-xs" style={{ color: 'var(--muted)', fontSize: '11px' }}>12 months after the end of your accounting period</p>
                </div>
              </div>
              {result.quarterlyInstalments && (
                <div className="flex items-start gap-3 p-3" style={{ background: 'rgba(140,61,43,0.08)', borderRadius: '2px', border: '1px solid rgba(140,61,43,0.2)' }}>
                  <span style={{ color: '#8C3D2B', fontSize: '16px', flexShrink: 0 }}>⚠️</span>
                  <div>
                    <p className="font-ui text-xs font-semibold mb-1" style={{ color: '#8C3D2B' }}>Quarterly instalment payments may apply</p>
                    <p className="font-ui text-xs" style={{ color: 'var(--body-text)', fontSize: '11px' }}>
                      Companies with profits over £1,500,000 (adjusted for associated companies) must pay CT in quarterly instalments.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {result.marginalRelief > 0 && (
            <div className="p-5 mb-6" style={{ background: 'var(--primary-dim)', border: '1px solid var(--border)', borderRadius: '2px', borderLeft: '3px solid var(--primary)' }}>
              <p className="font-ui text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--primary)', fontSize: '10px', letterSpacing: '2px' }}>Marginal relief applies</p>
              <p className="font-ui text-sm" style={{ color: 'var(--body-text)', lineHeight: 1.7 }}>
                Your profit of {formatCurrency(result.adjustedProfit)} falls between the small profits threshold ({formatCurrency(result.smallProfitsThreshold)}) and the main rate threshold ({formatCurrency(result.mainRateThreshold)}). Marginal relief of {formatCurrency(result.marginalRelief)} reduces your tax bill, giving an effective rate of {formatPercent(result.effectiveRate)}.
              </p>
            </div>
          )}

          <div className="p-6 mb-6" style={{ border: '1px solid var(--border)', borderRadius: '2px', background: 'var(--surface)' }}>
            <p className="font-display text-lg mb-2" style={{ fontWeight: 400, color: 'var(--foreground)' }}>
              Want to reduce your corporation tax bill?
            </p>
            <p className="font-ui text-sm mb-4" style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
              R&D relief, capital allowances, pension contributions, and timing of expenditure can all reduce your CT liability. Book a free call to explore your options.
            </p>
            <Link
              href="/book"
              className="font-ui text-xs uppercase tracking-widest px-6 py-3 inline-flex items-center transition-all duration-200"
              style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', borderRadius: '2px', fontSize: '11px', letterSpacing: '2px', fontWeight: 600, minHeight: '44px' }}
              onClick={() => trackCtaClicked('corporation-tax-calculator', 'Book a free call')}
            >
              Book a free call →
            </Link>
          </div>

          <ShareBar
            toolSlug="corporation-tax-calculator"
            shareText="Free UK corporation tax calculator with marginal relief for 2026/27:"
            currentUrl={shareUrl}
          />
        </div>
      )}
    </div>
  );
}
