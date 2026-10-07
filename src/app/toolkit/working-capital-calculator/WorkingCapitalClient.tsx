'use client';

import React, { useState, useCallback } from 'react';
import ShareBar from '@/components/toolkit/ShareBar';
import { trackToolStarted } from '@/lib/toolkit-utils';


interface Inputs {
  annualRevenue: string;
  costOfSales: string;
  tradeDebtors: string;
  stock: string;
  tradeCreditors: string;
  cash: string;
  otherCurrentAssets: string;
  otherCurrentLiabilities: string;
}

interface Results {
  netWorkingCapital: number;
  currentRatio: number;
  quickRatio: number;
  debtorDays: number;
  stockDays: number;
  creditorDays: number;
  cashConversionCycle: number;
  currentAssets: number;
  currentLiabilities: number;
}

function fmt(n: number, decimals = 0): string {
  return n.toLocaleString('en-GB', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function fmtCurrency(n: number): string {
  return '£' + fmt(Math.round(n));
}

function calcResults(inputs: Inputs, debtorDaysAdj: number, stockDaysAdj: number, creditorDaysAdj: number): Results | null {
  const revenue = parseFloat(inputs.annualRevenue) || 0;
  const cos = parseFloat(inputs.costOfSales) || 0;
  const debtors = parseFloat(inputs.tradeDebtors) || 0;
  const stock = parseFloat(inputs.stock) || 0;
  const creditors = parseFloat(inputs.tradeCreditors) || 0;
  const cash = parseFloat(inputs.cash) || 0;
  const otherCA = parseFloat(inputs.otherCurrentAssets) || 0;
  const otherCL = parseFloat(inputs.otherCurrentLiabilities) || 0;

  if (revenue <= 0) return null;

  const currentAssets = debtors + stock + cash + otherCA;
  const currentLiabilities = creditors + otherCL;
  const netWorkingCapital = currentAssets - currentLiabilities;
  const currentRatio = currentLiabilities > 0 ? currentAssets / currentLiabilities : 0;
  const quickRatio = currentLiabilities > 0 ? (currentAssets - stock) / currentLiabilities : 0;
  const debtorDays = revenue > 0 ? (debtors / revenue) * 365 : 0;
  const stockDays = cos > 0 ? (stock / cos) * 365 : 0;
  const creditorDays = cos > 0 ? (creditors / cos) * 365 : 0;
  const cashConversionCycle = debtorDays + stockDays - creditorDays;

  return {
    netWorkingCapital,
    currentRatio,
    quickRatio,
    debtorDays: debtorDaysAdj,
    stockDays: stockDaysAdj,
    creditorDays: creditorDaysAdj,
    cashConversionCycle: debtorDaysAdj + stockDaysAdj - creditorDaysAdj,
    currentAssets,
    currentLiabilities,
  };
}

function getInterpretation(results: Results): { label: string; color: string; text: string }[] {
  const items: { label: string; color: string; text: string }[] = [];

  if (results.currentRatio < 1) {
    items.push({ label: 'Current ratio below 1', color: '#b43232', text: 'Your current liabilities exceed current assets. This may indicate short-term liquidity pressure.' });
  } else if (results.currentRatio < 1.5) {
    items.push({ label: 'Current ratio is tight', color: '#C9A84C', text: 'Your current ratio is below the healthy range of 1.5–3.0. Monitor cash flow closely.' });
  } else if (results.currentRatio > 3) {
    items.push({ label: 'Current ratio is high', color: '#C9A84C', text: 'A very high current ratio may indicate excess idle cash or slow-moving stock.' });
  } else {
    items.push({ label: 'Current ratio is healthy', color: '#2D6A4F', text: `Your current ratio of ${fmt(results.currentRatio, 2)} is within the healthy range of 1.5–3.0.` });
  }

  if (results.debtorDays > 45) {
    items.push({ label: 'Debtor days are high', color: '#b43232', text: `Customers are taking ${fmt(results.debtorDays, 0)} days to pay. Consider tighter payment terms or invoice financing.` });
  } else if (results.debtorDays > 30) {
    items.push({ label: 'Debtor days above target', color: '#C9A84C', text: `Debtor days of ${fmt(results.debtorDays, 0)} are above the 30-day target. Review your credit control process.` });
  } else {
    items.push({ label: 'Debtor days are good', color: '#2D6A4F', text: `Customers are paying in ${fmt(results.debtorDays, 0)} days — within the 30-day target.` });
  }

  if (results.creditorDays < 30) {
    items.push({ label: 'Creditor days are low', color: '#C9A84C', text: `You are paying suppliers in ${fmt(results.creditorDays, 0)} days. Negotiating longer terms (45+ days) could free up cash.` });
  } else {
    items.push({ label: 'Creditor days are good', color: '#2D6A4F', text: `You are taking ${fmt(results.creditorDays, 0)} days to pay suppliers — making good use of trade credit.` });
  }

  if (results.cashConversionCycle > 60) {
    items.push({ label: 'Cash conversion cycle is long', color: '#b43232', text: `It takes ${fmt(results.cashConversionCycle, 0)} days to convert investment into cash. Reducing this is the fastest way to free up working capital.` });
  } else if (results.cashConversionCycle > 30) {
    items.push({ label: 'Cash conversion cycle is moderate', color: '#C9A84C', text: `Your cash conversion cycle of ${fmt(results.cashConversionCycle, 0)} days is moderate. There is room to improve.` });
  } else {
    items.push({ label: 'Cash conversion cycle is efficient', color: '#2D6A4F', text: `Your cash conversion cycle of ${fmt(results.cashConversionCycle, 0)} days is efficient.` });
  }

  return items;
}

export default function WorkingCapitalClient() {
  const [inputs, setInputs] = useState<Inputs>({
    annualRevenue: '1200000',
    costOfSales: '720000',
    tradeDebtors: '120000',
    stock: '60000',
    tradeCreditors: '80000',
    cash: '50000',
    otherCurrentAssets: '',
    otherCurrentLiabilities: '',
  });
  const [started, setStarted] = useState(false);

  const baseRevenue = parseFloat(inputs.annualRevenue) || 0;
  const baseCos = parseFloat(inputs.costOfSales) || 0;
  const baseDebtors = parseFloat(inputs.tradeDebtors) || 0;
  const baseStock = parseFloat(inputs.stock) || 0;
  const baseCreditors = parseFloat(inputs.tradeCreditors) || 0;

  const baseDebtorDays = baseRevenue > 0 ? (baseDebtors / baseRevenue) * 365 : 0;
  const baseStockDays = baseCos > 0 ? (baseStock / baseCos) * 365 : 0;
  const baseCreditorDays = baseCos > 0 ? (baseCreditors / baseCos) * 365 : 0;

  const [debtorDaysAdj, setDebtorDaysAdj] = useState<number>(Math.round(baseDebtorDays));
  const [stockDaysAdj, setStockDaysAdj] = useState<number>(Math.round(baseStockDays));
  const [creditorDaysAdj, setCreditorDaysAdj] = useState<number>(Math.round(baseCreditorDays));

  const handleChange = useCallback((field: keyof Inputs, value: string) => {
    if (!started) {
      setStarted(true);
      trackToolStarted('working-capital-calculator');
    }
    setInputs(prev => {
      const next = { ...prev, [field]: value };
      // Reset sliders to base values when inputs change
      const rev = parseFloat(next.annualRevenue) || 0;
      const cos = parseFloat(next.costOfSales) || 0;
      const deb = parseFloat(next.tradeDebtors) || 0;
      const stk = parseFloat(next.stock) || 0;
      const cred = parseFloat(next.tradeCreditors) || 0;
      setDebtorDaysAdj(Math.round(rev > 0 ? (deb / rev) * 365 : 0));
      setStockDaysAdj(Math.round(cos > 0 ? (stk / cos) * 365 : 0));
      setCreditorDaysAdj(Math.round(cos > 0 ? (cred / cos) * 365 : 0));
      return next;
    });
  }, [started]);

  const results = calcResults(inputs, debtorDaysAdj, stockDaysAdj, creditorDaysAdj);
  const baseResults = calcResults(inputs, Math.round(baseDebtorDays), Math.round(baseStockDays), Math.round(baseCreditorDays));

  const cashReleased = baseResults && results
    ? (baseResults.netWorkingCapital - results.netWorkingCapital) * -1
    : 0;

  const toolUrl = 'https://reckonwell.com/toolkit/working-capital-calculator';
  const shareText = 'Free working capital calculator — shows how much cash is tied up in your business and how to free it:';

  const MetricCard = ({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) => (
    <div className="p-4 rounded-lg border" style={{ borderColor: 'var(--border)', background: 'var(--surface, var(--background))' }}>
      <p className="text-xs font-ui uppercase tracking-widest mb-1" style={{ color: 'var(--muted)', fontSize: '10px', letterSpacing: '1.5px' }}>{label}</p>
      <p className="font-display text-2xl font-semibold" style={{ color: color || 'var(--foreground)' }}>{value}</p>
      {sub && <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{sub}</p>}
    </div>
  );

  return (
    <div className="max-w-3xl">
      <ShareBar toolSlug="working-capital-calculator" toolUrl={toolUrl} shareText={shareText} />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div>
          <h2 className="font-display text-xl mb-4" style={{ color: 'var(--foreground)' }}>Your figures</h2>
          <div className="space-y-4">
            {([
              ['annualRevenue', 'Annual revenue (£)', 'Total sales for the year'],
              ['costOfSales', 'Cost of sales (£)', 'Direct costs of goods/services sold'],
              ['tradeDebtors', 'Trade debtors (£)', 'Invoices owed to you by customers'],
              ['stock', 'Stock / inventory (£)', 'Value of stock held (0 if service business)'],
              ['tradeCreditors', 'Trade creditors (£)', 'Invoices you owe to suppliers'],
              ['cash', 'Cash and bank (£)', 'Cash and short-term deposits'],
              ['otherCurrentAssets', 'Other current assets (£)', 'Optional: prepayments, etc.'],
              ['otherCurrentLiabilities', 'Other current liabilities (£)', 'Optional: accruals, tax payable, etc.'],
            ] as [keyof Inputs, string, string][]).map(([field, label, hint]) => (
              <div key={field}>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>{label}</label>
                <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>{hint}</p>
                <input
                  type="number"
                  min="0"
                  value={inputs[field]}
                  onChange={e => handleChange(field, e.target.value)}
                  className="w-full px-3 py-2 rounded border text-sm"
                  style={{ borderColor: 'var(--border)', background: 'var(--background)', color: 'var(--foreground)', outline: 'none' }}
                  placeholder="0"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        <div>
          <h2 className="font-display text-xl mb-4" style={{ color: 'var(--foreground)' }}>Results</h2>
          {results ? (
            <div className="space-y-3">
              <MetricCard
                label="Net working capital"
                value={fmtCurrency(results.netWorkingCapital)}
                sub={results.netWorkingCapital >= 0 ? 'Positive — current assets exceed liabilities' : 'Negative — liabilities exceed current assets'}
                color={results.netWorkingCapital >= 0 ? '#2D6A4F' : '#b43232'}
              />
              <div className="grid grid-cols-2 gap-3">
                <MetricCard
                  label="Current ratio"
                  value={fmt(results.currentRatio, 2)}
                  sub="Target: 1.5–3.0"
                  color={results.currentRatio >= 1.5 && results.currentRatio <= 3 ? '#2D6A4F' : results.currentRatio < 1 ? '#b43232' : '#C9A84C'}
                />
                <MetricCard
                  label="Quick ratio"
                  value={fmt(results.quickRatio, 2)}
                  sub="Target: ≥ 1.0"
                  color={results.quickRatio >= 1 ? '#2D6A4F' : '#b43232'}
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <MetricCard label="Debtor days" value={`${fmt(baseDebtorDays, 0)}d`} sub="Target: ≤ 30" color={baseDebtorDays <= 30 ? '#2D6A4F' : baseDebtorDays <= 45 ? '#C9A84C' : '#b43232'} />
                <MetricCard label="Stock days" value={`${fmt(baseStockDays, 0)}d`} sub="Target: ≤ 30" color={baseStockDays <= 30 ? '#2D6A4F' : '#C9A84C'} />
                <MetricCard label="Creditor days" value={`${fmt(baseCreditorDays, 0)}d`} sub="Target: ≥ 45" color={baseCreditorDays >= 45 ? '#2D6A4F' : '#C9A84C'} />
              </div>
              <MetricCard
                label="Cash conversion cycle"
                value={`${fmt(baseDebtorDays + baseStockDays - baseCreditorDays, 0)} days`}
                sub="Debtor days + stock days − creditor days"
                color={(baseDebtorDays + baseStockDays - baseCreditorDays) <= 30 ? '#2D6A4F' : (baseDebtorDays + baseStockDays - baseCreditorDays) <= 60 ? '#C9A84C' : '#b43232'}
              />

              {/* Interpretation */}
              <div className="mt-4 space-y-2">
                {getInterpretation({ ...results, debtorDays: baseDebtorDays, stockDays: baseStockDays, creditorDays: baseCreditorDays, cashConversionCycle: baseDebtorDays + baseStockDays - baseCreditorDays }).map((item, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 rounded-lg border text-sm" style={{ borderColor: item.color + '40', background: item.color + '10' }}>
                    <span style={{ color: item.color, flexShrink: 0, fontWeight: 700 }}>
                      {item.color === '#2D6A4F' ? '✓' : item.color === '#b43232' ? '✗' : '!'}
                    </span>
                    <div>
                      <p className="font-semibold" style={{ color: item.color }}>{item.label}</p>
                      <p style={{ color: 'var(--muted)' }}>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm" style={{ color: 'var(--muted)' }}>Enter your annual revenue to see results.</p>
          )}
        </div>
      </div>

      {/* What-if sliders */}
      {results && baseRevenue > 0 && (
        <div className="mt-10">
          <h2 className="font-display text-xl mb-2" style={{ color: 'var(--foreground)' }}>What-if analysis: free up cash</h2>
          <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
            Adjust the sliders to see how much cash you could release by improving your working capital cycle.
          </p>

          <div className="space-y-6">
            {/* Debtor days slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>Reduce debtor days</label>
                <span className="text-sm font-semibold" style={{ color: 'var(--primary)' }}>{debtorDaysAdj} days</span>
              </div>
              <input
                type="range"
                min={1}
                max={Math.max(Math.round(baseDebtorDays), 90)}
                value={debtorDaysAdj}
                onChange={e => setDebtorDaysAdj(Number(e.target.value))}
                className="w-full"
                style={{ accentColor: 'var(--primary)' }}
              />
              <div className="flex justify-between text-xs" style={{ color: 'var(--muted)' }}>
                <span>1 day</span>
                <span>Current: {Math.round(baseDebtorDays)}d</span>
                <span>{Math.max(Math.round(baseDebtorDays), 90)}d</span>
              </div>
            </div>

            {/* Stock days slider */}
            {baseCos > 0 && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>Reduce stock days</label>
                  <span className="text-sm font-semibold" style={{ color: 'var(--primary)' }}>{stockDaysAdj} days</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={Math.max(Math.round(baseStockDays), 90)}
                  value={stockDaysAdj}
                  onChange={e => setStockDaysAdj(Number(e.target.value))}
                  className="w-full"
                  style={{ accentColor: 'var(--primary)' }}
                />
                <div className="flex justify-between text-xs" style={{ color: 'var(--muted)' }}>
                  <span>0 days</span>
                  <span>Current: {Math.round(baseStockDays)}d</span>
                  <span>{Math.max(Math.round(baseStockDays), 90)}d</span>
                </div>
              </div>
            )}

            {/* Creditor days slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>Extend creditor days</label>
                <span className="text-sm font-semibold" style={{ color: 'var(--primary)' }}>{creditorDaysAdj} days</span>
              </div>
              <input
                type="range"
                min={Math.max(1, Math.round(baseCreditorDays))}
                max={90}
                value={creditorDaysAdj}
                onChange={e => setCreditorDaysAdj(Number(e.target.value))}
                className="w-full"
                style={{ accentColor: 'var(--primary)' }}
              />
              <div className="flex justify-between text-xs" style={{ color: 'var(--muted)' }}>
                <span>Current: {Math.round(baseCreditorDays)}d</span>
                <span>90d</span>
              </div>
            </div>
          </div>

          {/* Cash released summary */}
          <div className="mt-6 p-5 rounded-lg border" style={{ borderColor: 'var(--primary)', background: 'rgba(var(--primary-rgb, 24,33,62),0.04)' }}>
            <p className="text-xs font-ui uppercase tracking-widest mb-2" style={{ color: 'var(--primary)', letterSpacing: '1.5px' }}>Cash released by these changes</p>
            <p className="font-display text-3xl font-semibold" style={{ color: cashReleased >= 0 ? '#2D6A4F' : '#b43232' }}>
              {cashReleased >= 0 ? '+' : ''}{fmtCurrency(cashReleased)}
            </p>
            <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
              Adjusted cash conversion cycle: <strong>{fmt(debtorDaysAdj + stockDaysAdj - creditorDaysAdj, 0)} days</strong>
              {' '}(was {fmt(baseDebtorDays + baseStockDays - baseCreditorDays, 0)} days)
            </p>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="mt-10 p-6 rounded-lg text-center" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}>
        <h3 className="font-display text-lg mb-2">Want help freeing up cash?</h3>
        <p className="text-sm mb-4 opacity-90">Working capital optimisation is one of the fastest ways to improve cash flow without borrowing. Book a free call to discuss your numbers.</p>
        <a
          href="/book"
          className="inline-block px-6 py-3 rounded font-semibold text-sm"
          style={{ background: 'var(--primary-foreground)', color: 'var(--primary)', textDecoration: 'none' }}
        >
          Book a free call →
        </a>
      </div>
    </div>
  );
}
