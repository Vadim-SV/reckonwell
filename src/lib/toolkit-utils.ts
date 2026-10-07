/**
 * Reckonwell Toolkit — Utility Functions
 * URL state, sharing, UTM, analytics
 */

import { trackEvent } from './analytics';

// ─── URL State ────────────────────────────────────────────────────────────────
export function encodeToolState(params: Record<string, string | number | boolean>): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, String(value));
    }
  });
  return searchParams.toString();
}

export function decodeToolState(search: string): Record<string, string> {
  const params: Record<string, string> = {};
  const searchParams = new URLSearchParams(search);
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
}

// ─── UTM Builder ──────────────────────────────────────────────────────────────
export interface UTMParams {
  source: string;
  medium: string;
  campaign?: string;
  content?: string;
}

export function buildUTMUrl(baseUrl: string, utm: UTMParams): string {
  const url = new URL(baseUrl.startsWith('http') ? baseUrl : `https://reckonwell.com${baseUrl}`);
  url.searchParams.set('utm_source', utm.source);
  url.searchParams.set('utm_medium', utm.medium);
  if (utm.campaign) url.searchParams.set('utm_campaign', utm.campaign);
  if (utm.content) url.searchParams.set('utm_content', utm.content);
  return url.toString();
}

// ─── Share URL Builders ───────────────────────────────────────────────────────
export function buildShareUrls(toolUrl: string, shareText: string) {
  const encodedUrl = encodeURIComponent(buildUTMUrl(toolUrl, { source: 'share', medium: 'social', campaign: 'toolkit' }));
  const encodedText = encodeURIComponent(shareText);
  const fullUrl = buildUTMUrl(toolUrl, { source: 'share', medium: 'social', campaign: 'toolkit' });

  return {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    email: `mailto:?subject=${encodeURIComponent('Free finance tool from Reckonwell')}&body=${encodedText}%0A%0A${encodedUrl}`,
    copyUrl: fullUrl,
  };
}

// ─── Analytics Events ─────────────────────────────────────────────────────────
export function trackToolStarted(toolSlug: string) {
  trackEvent('tool_started', { tool_slug: toolSlug, tool_name: toolSlug.replace(/-/g, ' ') });
}

export function trackToolCompleted(toolSlug: string, params?: Record<string, unknown>) {
  trackEvent('tool_completed', { tool_slug: toolSlug, ...params });
}

export function trackResultShared(toolSlug: string, channel: string) {
  trackEvent('result_shared', { tool_slug: toolSlug, channel });
}

export function trackPdfDownloaded(toolSlug: string) {
  trackEvent('pdf_downloaded', { tool_slug: toolSlug });
}

export function trackEmbedCodeCopied(toolSlug: string) {
  trackEvent('embed_code_copied', { tool_slug: toolSlug });
}

export function trackCtaClicked(toolSlug: string, ctaLabel: string) {
  trackEvent('cta_clicked', { tool_slug: toolSlug, cta_label: ctaLabel });
}

// ─── Number Formatting ────────────────────────────────────────────────────────
export function formatCurrency(amount: number, decimals = 0): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}

export function formatPercent(rate: number, decimals = 1): string {
  return `${(rate * 100).toFixed(decimals)}%`;
}

export function formatNumber(n: number, decimals = 0): string {
  return new Intl.NumberFormat('en-GB', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
}

// ─── PDF Generation (client-side print) ──────────────────────────────────────
export function triggerPdfDownload(toolName: string) {
  if (typeof window !== 'undefined') {
    window.print();
    trackPdfDownloaded(toolName);
  }
}

// ─── Embed Code Builder ───────────────────────────────────────────────────────
export function buildEmbedCode(toolSlug: string, options: { theme?: 'light' | 'dark'; width?: string } = {}): string {
  const theme = options.theme || 'light';
  const width = options.width || '100%';
  const src = buildUTMUrl(`https://reckonwell.com/embed/${toolSlug}`, {
    source: 'embed',
    medium: 'iframe',
    campaign: 'toolkit',
  });
  return `<iframe
  src="${src}&theme=${theme}"
  width="${width}"
  height="700"
  frameborder="0"
  style="border:none;border-radius:8px;"
  title="Reckonwell ${toolSlug.replace(/-/g, ' ')} — Free Finance Tool"
  loading="lazy"
></iframe>
<p style="font-size:12px;color:#666;margin-top:4px;">
  Powered by <a href="https://reckonwell.com/toolkit?utm_source=embed&utm_medium=backlink&utm_campaign=toolkit" target="_blank" rel="noopener">Reckonwell</a>
</p>`;
}

// ─── Salary vs Dividend Calculations ─────────────────────────────────────────
import {
  INCOME_TAX,
  DIVIDEND_TAX,
  EMPLOYEE_NIC,
  EMPLOYER_NIC,
  CORPORATION_TAX,
  STUDENT_LOAN,
  getCorpTax,
} from './tax-config';

export interface SalaryDividendInputs {
  companyProfit: number;
  otherIncome: number;
  numDirectors: number;
  employmentAllowance: boolean;
  studentLoanPlan?: 'none' | 'plan1' | 'plan2' | 'plan4' | 'plan5' | 'postgrad';
}

export interface SalaryDividendResult {
  salary: number;
  dividend: number;
  takeHome: number;
  incomeTax: number;
  employeeNIC: number;
  employerNIC: number;
  corporationTax: number;
  dividendTax: number;
  studentLoanRepayment: number;
  totalTax: number;
  effectiveRate: number;
}

function calcIncomeTax(taxableIncome: number): number {
  const it = INCOME_TAX;
  if (taxableIncome <= 0) return 0;
  const paReduction = taxableIncome > it.paReducedAbove
    ? Math.min(it.personalAllowance, Math.floor((taxableIncome - it.paReducedAbove) * it.paTaperRate))
    : 0;
  const effectivePA = it.personalAllowance - paReduction;
  const taxable = Math.max(0, taxableIncome - effectivePA);
  let tax = 0;
  const basicBand = Math.min(taxable, it.basicRateThreshold - effectivePA);
  tax += Math.max(0, basicBand) * it.basicRate;
  if (taxable > it.basicRateThreshold - effectivePA) {
    const higherBand = Math.min(taxable - (it.basicRateThreshold - effectivePA), it.higherRateThreshold - it.basicRateThreshold);
    tax += Math.max(0, higherBand) * it.higherRate;
  }
  if (taxable > it.higherRateThreshold - effectivePA) {
    tax += (taxable - (it.higherRateThreshold - effectivePA)) * it.additionalRate;
  }
  return Math.max(0, tax);
}

function calcEmployeeNIC(salary: number): number {
  const nic = EMPLOYEE_NIC;
  if (salary <= nic.primaryThreshold) return 0;
  const main = Math.min(salary - nic.primaryThreshold, nic.upperEarningsLimit - nic.primaryThreshold) * nic.mainRate;
  const additional = salary > nic.upperEarningsLimit ? (salary - nic.upperEarningsLimit) * nic.additionalRate : 0;
  return main + additional;
}

function calcEmployerNIC(salary: number, employmentAllowance: boolean, numDirectors: number): number {
  const nic = EMPLOYER_NIC;
  if (salary <= nic.secondaryThreshold) return 0;
  const grossNIC = (salary - nic.secondaryThreshold) * nic.rate;
  const ea = employmentAllowance && numDirectors > 1 ? nic.employmentAllowance : 0;
  return Math.max(0, grossNIC - ea);
}

function calcDividendTax(dividendIncome: number, otherIncome: number): number {
  const dt = DIVIDEND_TAX;
  const it = INCOME_TAX;
  const taxableDiv = Math.max(0, dividendIncome - dt.allowance);
  if (taxableDiv <= 0) return 0;
  // Dividends sit on top of other income
  const totalIncome = otherIncome + dividendIncome;
  const basicBandRemaining = Math.max(0, it.basicRateThreshold - Math.max(it.personalAllowance, otherIncome));
  const higherBandRemaining = Math.max(0, it.higherRateThreshold - Math.max(it.basicRateThreshold, otherIncome));
  const divInBasic = Math.min(taxableDiv, basicBandRemaining);
  const divInHigher = Math.min(Math.max(0, taxableDiv - divInBasic), higherBandRemaining);
  const divInAdditional = Math.max(0, taxableDiv - divInBasic - divInHigher);
  return divInBasic * dt.basicRate + divInHigher * dt.higherRate + divInAdditional * dt.additionalRate;
}

function calcStudentLoan(salary: number, plan: string): number {
  if (plan === 'none' || !plan) return 0;
  const planData = STUDENT_LOAN[plan as keyof typeof STUDENT_LOAN];
  if (!planData) return 0;
  return Math.max(0, salary - planData.threshold) * planData.rate;
}

export function calcSalaryDividend(inputs: SalaryDividendInputs, salary: number): SalaryDividendResult {
  const { companyProfit, otherIncome, numDirectors, employmentAllowance, studentLoanPlan = 'none' } = inputs;
  const employerNIC = calcEmployerNIC(salary, employmentAllowance, numDirectors);
  const profitAfterSalaryAndNIC = companyProfit - salary - employerNIC;
  const ctResult = getCorpTax(Math.max(0, profitAfterSalaryAndNIC));
  const availableForDividend = Math.max(0, profitAfterSalaryAndNIC - ctResult.tax);
  const dividend = availableForDividend;
  const employeeNIC = calcEmployeeNIC(salary);
  const totalPersonalIncome = salary + dividend + otherIncome;
  const incomeTaxOnSalary = calcIncomeTax(salary + otherIncome) - calcIncomeTax(otherIncome);
  const dividendTax = calcDividendTax(dividend, salary + otherIncome);
  const studentLoanRepayment = calcStudentLoan(salary, studentLoanPlan);
  const incomeTax = Math.max(0, incomeTaxOnSalary);
  const totalTax = incomeTax + employeeNIC + employerNIC + ctResult.tax + dividendTax + studentLoanRepayment;
  const takeHome = salary + dividend - incomeTax - employeeNIC - dividendTax - studentLoanRepayment;
  return {
    salary,
    dividend,
    takeHome,
    incomeTax,
    employeeNIC,
    employerNIC,
    corporationTax: ctResult.tax,
    dividendTax,
    studentLoanRepayment,
    totalTax,
    effectiveRate: companyProfit > 0 ? totalTax / companyProfit : 0,
  };
}

export function findOptimalSalary(inputs: SalaryDividendInputs): { optimal: SalaryDividendResult; allSalary: SalaryDividendResult; minSalary: SalaryDividendResult } {
  // Test salary points: £0, secondary threshold, primary threshold, basic rate threshold
  const testPoints = [0, EMPLOYER_NIC.secondaryThreshold, EMPLOYEE_NIC.primaryThreshold, 12570, 50270];
  let best = calcSalaryDividend(inputs, EMPLOYEE_NIC.primaryThreshold);
  for (const salary of testPoints) {
    const result = calcSalaryDividend(inputs, salary);
    if (result.takeHome > best.takeHome) best = result;
  }
  // Fine-tune around the best point
  for (let s = Math.max(0, best.salary - 2000); s <= Math.min(inputs.companyProfit, best.salary + 2000); s += 100) {
    const result = calcSalaryDividend(inputs, s);
    if (result.takeHome > best.takeHome) best = result;
  }
  const allSalary = calcSalaryDividend(inputs, Math.min(inputs.companyProfit, INCOME_TAX.basicRateThreshold));
  const minSalary = calcSalaryDividend(inputs, EMPLOYER_NIC.secondaryThreshold);
  return { optimal: best, allSalary, minSalary };
}

// ─── Corporation Tax Calculations ─────────────────────────────────────────────
export interface CorpTaxInputs {
  taxableProfit: number;
  periodStart: string; // ISO date
  periodEnd: string; // ISO date
  associatedCompanies: number;
}

export interface CorpTaxResult {
  tax: number;
  effectiveRate: number;
  marginalRelief: number;
  rateDescription: string;
  paymentDeadline: string;
  filingDeadline: string;
  quarterlyInstalmentsRequired: boolean;
  periodDays: number;
  adjustedLowerLimit: number;
  adjustedUpperLimit: number;
}

export function calcCorpTax(inputs: CorpTaxInputs): CorpTaxResult {
  const { taxableProfit, periodStart, periodEnd, associatedCompanies } = inputs;
  const start = new Date(periodStart);
  const end = new Date(periodEnd);
  const periodDays = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const divisor = 1 + associatedCompanies;
  const adjustedLowerLimit = Math.round((CORPORATION_TAX.lowerLimit / divisor) * (periodDays / 365));
  const adjustedUpperLimit = Math.round((CORPORATION_TAX.upperLimit / divisor) * (periodDays / 365));

  let tax = 0;
  let marginalRelief = 0;
  let rateDescription = '';

  if (taxableProfit <= 0) {
    rateDescription = 'No tax payable (loss or zero profit)';
  } else if (taxableProfit <= adjustedLowerLimit) {
    tax = taxableProfit * CORPORATION_TAX.smallProfitsRate;
    rateDescription = '19% small profits rate';
  } else if (taxableProfit >= adjustedUpperLimit) {
    tax = taxableProfit * CORPORATION_TAX.mainRate;
    rateDescription = '25% main rate';
  } else {
    const grossTax = taxableProfit * CORPORATION_TAX.mainRate;
    marginalRelief = (adjustedUpperLimit - taxableProfit) * CORPORATION_TAX.marginalReliefFraction;
    tax = grossTax - marginalRelief;
    rateDescription = `Marginal relief applies (effective rate ${((tax / taxableProfit) * 100).toFixed(1)}%)`;
  }

  // Payment deadline: 9 months and 1 day after period end
  const paymentDate = new Date(end);
  paymentDate.setMonth(paymentDate.getMonth() + 9);
  paymentDate.setDate(paymentDate.getDate() + 1);

  // Filing deadline: 12 months after period end
  const filingDate = new Date(end);
  filingDate.setFullYear(filingDate.getFullYear() + 1);

  // Quarterly instalments: profits > £1.5m (adjusted)
  const quarterlyThreshold = 1500000 / divisor;
  const quarterlyInstalmentsRequired = taxableProfit > quarterlyThreshold;

  return {
    tax,
    effectiveRate: taxableProfit > 0 ? tax / taxableProfit : 0,
    marginalRelief,
    rateDescription,
    paymentDeadline: paymentDate.toISOString().split('T')[0],
    filingDeadline: filingDate.toISOString().split('T')[0],
    quarterlyInstalmentsRequired,
    periodDays,
    adjustedLowerLimit,
    adjustedUpperLimit,
  };
}

// ─── Working Capital Calculations ─────────────────────────────────────────────
export interface WorkingCapitalInputs {
  annualRevenue: number;
  costOfSales: number;
  tradeDebtors: number;
  stock: number;
  tradeCreditors: number;
  cash: number;
  otherCurrentAssets?: number;
  otherCurrentLiabilities?: number;
}

export interface WorkingCapitalResult {
  netWorkingCapital: number;
  currentRatio: number;
  quickRatio: number;
  debtorDays: number;
  stockDays: number;
  creditorDays: number;
  cashConversionCycle: number;
  interpretation: string;
}

export function calcWorkingCapital(inputs: WorkingCapitalInputs): WorkingCapitalResult {
  const { annualRevenue, costOfSales, tradeDebtors, stock, tradeCreditors, cash, otherCurrentAssets = 0, otherCurrentLiabilities = 0 } = inputs;
  const currentAssets = tradeDebtors + stock + cash + otherCurrentAssets;
  const currentLiabilities = tradeCreditors + otherCurrentLiabilities;
  const netWorkingCapital = currentAssets - currentLiabilities;
  const currentRatio = currentLiabilities > 0 ? currentAssets / currentLiabilities : 0;
  const quickRatio = currentLiabilities > 0 ? (currentAssets - stock) / currentLiabilities : 0;
  const debtorDays = annualRevenue > 0 ? (tradeDebtors / annualRevenue) * 365 : 0;
  const stockDays = costOfSales > 0 ? (stock / costOfSales) * 365 : 0;
  const creditorDays = costOfSales > 0 ? (tradeCreditors / costOfSales) * 365 : 0;
  const cashConversionCycle = debtorDays + stockDays - creditorDays;

  let interpretation = '';
  if (currentRatio < 1) interpretation = 'Warning: current liabilities exceed current assets. You may struggle to meet short-term obligations.';
  else if (currentRatio < 1.5) interpretation = 'Your liquidity is tight. Consider reducing debtor days or increasing your credit facility.';
  else if (currentRatio > 3) interpretation = 'You have strong liquidity, but excess cash tied up in working capital could be deployed more productively.';
  else interpretation = 'Your working capital position looks healthy.';

  return { netWorkingCapital, currentRatio, quickRatio, debtorDays, stockDays, creditorDays, cashConversionCycle, interpretation };
}

// ─── VAT Calculations ─────────────────────────────────────────────────────────
import { VAT, VAT_FLAT_RATES } from './tax-config';

export interface VATInputs {
  rollingTurnover: number;
  next30DaysTurnover: number;
  sector: string;
  vatableCosts: number;
  goodsShareOfCosts: number; // 0–1
  customersAreVATRegistered: boolean;
  paymentTimingDays: number;
}

export interface VATResult {
  mustRegister: boolean;
  registrationReason: string;
  standardVAT: number;
  flatRateVAT: number;
  flatRatePercent: number;
  isLimitedCostTrader: boolean;
  cashFlowBenefit: number;
  recommendation: string;
  annualSavingFlatRate: number;
}

export function calcVAT(inputs: VATInputs): VATResult {
  const { rollingTurnover, next30DaysTurnover, sector, vatableCosts, goodsShareOfCosts, customersAreVATRegistered, paymentTimingDays } = inputs;
  const mustRegister = rollingTurnover > VAT.registrationThreshold || (rollingTurnover + next30DaysTurnover) > VAT.registrationThreshold;
  const registrationReason = rollingTurnover > VAT.registrationThreshold
    ? `Your rolling 12-month taxable turnover (£${rollingTurnover.toLocaleString()}) exceeds the £${VAT.registrationThreshold.toLocaleString()} threshold.`
    : next30DaysTurnover > VAT.registrationThreshold
    ? `Your expected turnover in the next 30 days (£${next30DaysTurnover.toLocaleString()}) exceeds the threshold.`
    : `Your turnover is below the £${VAT.registrationThreshold.toLocaleString()} threshold. Registration is optional (voluntary registration may benefit you if your customers are VAT-registered).`;

  const standardVAT = rollingTurnover * VAT.standardRate - vatableCosts * VAT.standardRate;
  const flatRatePercent = VAT_FLAT_RATES[sector] || 0.12;
  // Limited cost trader test: goods < 2% of turnover or < £1,000
  const goodsCost = vatableCosts * goodsShareOfCosts;
  const isLimitedCostTrader = goodsCost < rollingTurnover * 0.02 || goodsCost < 1000;
  const effectiveFlatRate = isLimitedCostTrader ? VAT.limitedCostTraderRate : flatRatePercent;
  const flatRateVAT = rollingTurnover * 1.2 * effectiveFlatRate; // applied to VAT-inclusive turnover
  const annualSavingFlatRate = standardVAT - flatRateVAT;
  const cashFlowBenefit = customersAreVATRegistered ? 0 : (rollingTurnover * VAT.standardRate * paymentTimingDays) / 365;

  let recommendation = '';
  if (!mustRegister && !customersAreVATRegistered) {
    recommendation = 'You do not need to register. If your customers are consumers, registering would increase your prices by 20% — not recommended.';
  } else if (!mustRegister && customersAreVATRegistered) {
    recommendation = 'Voluntary registration could benefit you — you can reclaim VAT on costs. Consider registering.';
  } else if (annualSavingFlatRate > 500) {
    recommendation = `The Flat Rate Scheme could save you approximately £${Math.round(annualSavingFlatRate).toLocaleString()} per year vs standard accounting.`;
  } else if (annualSavingFlatRate < -200) {
    recommendation = 'Standard VAT accounting is likely better for you — the Flat Rate Scheme would cost more.';
  } else {
    recommendation = 'Standard VAT accounting is recommended. The Flat Rate Scheme offers minimal benefit at your cost level.';
  }

  return { mustRegister, registrationReason, standardVAT, flatRateVAT, flatRatePercent: effectiveFlatRate, isLimitedCostTrader, cashFlowBenefit, recommendation, annualSavingFlatRate };
}

function getSoleTraderTax(...args: any[]): any {
  // eslint-disable-next-line no-console
  console.warn('Placeholder: getSoleTraderTax is not implemented yet.', args);
  return null;
}

export { getSoleTraderTax };