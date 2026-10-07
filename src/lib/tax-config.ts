/**
 * Reckonwell Tax Configuration — 2026/27 Tax Year
 * All values sourced from GOV.UK. See inline comments for links.
 * Last reviewed: 2026-10-07
 */

export const TAX_YEAR = '2026/27';
export const TAX_YEAR_REVIEWED = '2026-10-07';

// ─── Income Tax (England, Wales, Northern Ireland) ───────────────────────────
// Source: https://www.gov.uk/income-tax-rates
export const INCOME_TAX = {
  personalAllowance: 12570, // frozen until April 2028
  basicRateThreshold: 50270, // frozen until April 2028
  higherRateThreshold: 125140, // personal allowance tapers to zero at £125,140
  additionalRateThreshold: 125140,
  basicRate: 0.20,
  higherRate: 0.40,
  additionalRate: 0.45,
  // Personal allowance taper: £1 reduction per £2 over £100,000
  paReducedAbove: 100000,
  paTaperRate: 0.5,
} as const;

// ─── Scottish Income Tax ──────────────────────────────────────────────────────
// Source: https://www.gov.uk/scottish-income-tax
export const SCOTTISH_INCOME_TAX = {
  personalAllowance: 12570,
  starterRate: 0.19, // £12,571–£15,397
  starterThreshold: 15397,
  basicRate: 0.20, // £15,398–£27,491
  basicThreshold: 27491,
  intermediateRate: 0.21, // £27,492–£43,662
  intermediateThreshold: 43662,
  higherRate: 0.42, // £43,663–£75,000
  higherThreshold: 75000,
  advancedRate: 0.45, // £75,001–£125,140
  advancedThreshold: 125140,
  topRate: 0.48, // over £125,140
} as const;

// ─── Dividend Tax ─────────────────────────────────────────────────────────────
// Source: https://www.gov.uk/tax-on-dividends
export const DIVIDEND_TAX = {
  allowance: 500, // £500 for 2026/27 (reduced from £1,000 in 2023/24)
  basicRate: 0.0875,
  higherRate: 0.3375,
  additionalRate: 0.3935,
} as const;

// ─── National Insurance (Employee) ───────────────────────────────────────────
// Source: https://www.gov.uk/national-insurance/how-much-you-pay
export const EMPLOYEE_NIC = {
  primaryThreshold: 12570, // aligned with personal allowance
  upperEarningsLimit: 50270,
  mainRate: 0.08, // 8% between PT and UEL (reduced from 10% in Jan 2024, 12% previously)
  additionalRate: 0.02, // 2% above UEL
} as const;

// ─── National Insurance (Employer) ───────────────────────────────────────────
// Source: https://www.gov.uk/employers-national-insurance
export const EMPLOYER_NIC = {
  secondaryThreshold: 5000, // reduced from £9,100 from April 2025
  rate: 0.15, // increased from 13.8% from April 2025
  employmentAllowance: 10500, // increased from £5,000 from April 2025
  // Employment Allowance: not available if sole director with no other employees
  // Source: https://www.gov.uk/claim-employment-allowance
} as const;

// ─── Corporation Tax ──────────────────────────────────────────────────────────
// Source: https://www.gov.uk/corporation-tax-rates
export const CORPORATION_TAX = {
  smallProfitsRate: 0.19, // profits up to lower limit
  mainRate: 0.25, // profits above upper limit
  lowerLimit: 50000, // divided by (1 + number of associated companies)
  upperLimit: 250000, // divided by (1 + number of associated companies)
  marginalReliefFraction: 3 / 200, // (U - P) × N/A × 3/200
  // Marginal relief formula: CT = P × 25% - (U - P) × N/A × 3/200
  // where U = upper limit, P = augmented profits, N = taxable total profits, A = augmented profits
  // Source: https://www.gov.uk/guidance/corporation-tax-marginal-relief
} as const;

// ─── VAT ──────────────────────────────────────────────────────────────────────
// Source: https://www.gov.uk/vat-registration/when-to-register
export const VAT = {
  registrationThreshold: 90000, // rolling 12-month taxable turnover
  deregistrationThreshold: 88000,
  standardRate: 0.20,
  reducedRate: 0.05,
  zeroRate: 0.00,
  // Flat Rate Scheme: available if taxable turnover ≤ £150,000
  flatRateSchemeThreshold: 150000,
  // Limited cost trader: if goods cost < 2% of turnover or < £1,000/year
  limitedCostTraderRate: 0.165,
  // Annual Accounting Scheme threshold
  annualAccountingThreshold: 1350000,
  // Cash Accounting Scheme threshold
  cashAccountingThreshold: 1350000,
} as const;

// ─── VAT Flat Rates by Sector ─────────────────────────────────────────────────
// Source: https://www.gov.uk/vat-flat-rate-scheme/how-much-you-pay
export const VAT_FLAT_RATES: Record<string, number> = {
  'accountancy-or-bookkeeping': 0.145,
  'advertising': 0.11,
  'agricultural-services': 0.11,
  'any-other-activity-not-listed': 0.12,
  'architect-civil-and-structural-engineer-or-surveyor': 0.145,
  'boarding-or-care-of-animals': 0.12,
  'business-services-not-listed': 0.12,
  'catering-services-including-restaurants-and-takeaways': 0.125,
  'cleaning-or-maintenance-services': 0.10,
  'computer-and-it-consultancy-or-data-processing': 0.145,
  'computer-repair-services': 0.105,
  'entertainment-or-journalism': 0.125,
  'estate-agency-or-property-management-services': 0.12,
  'farming-or-agriculture-not-listed': 0.065,
  'film-radio-television-or-video-production': 0.13,
  'financial-services': 0.135,
  'forestry-or-fishing': 0.105,
  'general-building-or-construction-services': 0.095,
  'hairdressing-or-other-beauty-treatment-services': 0.135,
  'hiring-or-renting-goods': 0.10,
  'hotel-or-accommodation': 0.105,
  'investigation-or-security': 0.12,
  'labour-only-building-or-construction-services': 0.145,
  'laundry-or-dry-cleaning-services': 0.12,
  'lawyer-or-legal-services': 0.145,
  'library-archive-museum-or-other-cultural-activity': 0.095,
  'management-consultancy': 0.14,
  'manufacturing-fabrication-or-engineering': 0.105,
  'membership-organisation': 0.08,
  'mining-or-quarrying': 0.10,
  'packaging': 0.09,
  'photography': 0.11,
  'post-offices': 0.05,
  'printing': 0.085,
  'publishing': 0.11,
  'pubs': 0.065,
  'real-estate-activity-not-listed': 0.14,
  'repairing-personal-or-household-goods': 0.10,
  'repairing-vehicles': 0.085,
  'retailing-food-confectionery-tobacco-newspapers-or-children-s-clothing': 0.04,
  'retailing-pharmaceuticals-medical-goods-cosmetics-or-toiletries': 0.08,
  'retailing-not-listed': 0.075,
  'retailing-vehicles-or-fuel': 0.065,
  'secretarial-services': 0.13,
  'social-work': 0.11,
  'sport-or-recreation': 0.085,
  'transport-or-storage-including-couriers-freight-removals-and-taxis': 0.10,
  'travel-agency': 0.105,
  'veterinary-medicine': 0.115,
  'wholesaling-agricultural-products': 0.08,
  'wholesaling-food': 0.075,
  'wholesaling-not-listed': 0.085,
} as const;

// ─── Capital Gains Tax ────────────────────────────────────────────────────────
// Source: https://www.gov.uk/capital-gains-tax/rates
export const CGT = {
  annualExemption: 3000, // reduced from £6,000 in 2024/25
  basicRate: 0.18, // residential property
  higherRate: 0.24, // residential property
  basicRateOther: 0.18, // other assets (increased from 10% in Oct 2024 Budget)
  higherRateOther: 0.24, // other assets (increased from 20% in Oct 2024 Budget)
  // Business Asset Disposal Relief (formerly Entrepreneurs' Relief)
  // Source: https://www.gov.uk/entrepreneurs-relief
  badrRate: 0.14, // 14% from 6 April 2025, 18% from 6 April 2026
  badrRateFrom2026: 0.18, // from 6 April 2026
  badrLifetimeLimit: 1000000,
  // Investors' Relief
  investorsReliefRate: 0.14, // 14% from 6 April 2025
  investorsReliefLifetimeLimit: 1000000, // reduced from £10m from 6 April 2025
} as const;

// ─── Inheritance Tax ──────────────────────────────────────────────────────────
// Source: https://www.gov.uk/inheritance-tax
export const IHT = {
  nilRateBand: 325000,
  residenceNilRateBand: 175000,
  rate: 0.40,
  reducedRate: 0.36, // if 10%+ left to charity
  // Long-term UK resident for IHT: 10 of previous 20 tax years
  // Non-dom abolition: from 6 April 2025, domicile replaced by long-term residence test
  // Source: https://www.gov.uk/guidance/inheritance-tax-and-domicile
  longTermResidentYears: 10,
  longTermResidentLookback: 20,
} as const;

// ─── Self-Assessment ──────────────────────────────────────────────────────────
// Source: https://www.gov.uk/self-assessment-tax-returns
export const SELF_ASSESSMENT = {
  tradingAllowance: 1000, // Source: https://www.gov.uk/guidance/tax-free-allowances-on-property-and-trading-income
  propertyAllowance: 1000,
  // Class 2 NIC abolished from 6 April 2024
  // Class 4 NIC
  class4LowerProfitsLimit: 12570,
  class4UpperProfitsLimit: 50270,
  class4MainRate: 0.06, // reduced from 9% in 2024/25 Budget
  class4AdditionalRate: 0.02,
  // Payments on account: required if SA bill > £1,000 and < 80% collected at source
  paymentsOnAccountThreshold: 1000,
} as const;

// ─── Capital Allowances ───────────────────────────────────────────────────────
// Source: https://www.gov.uk/capital-allowances
export const CAPITAL_ALLOWANCES = {
  // Annual Investment Allowance
  // Source: https://www.gov.uk/capital-allowances/annual-investment-allowance
  aia: 1000000, // permanent £1m from April 2023
  // Full Expensing (companies only, main pool)
  // Source: https://www.gov.uk/guidance/full-expensing
  fullExpensing: 1.00, // 100% first year allowance for main pool
  // 50% First Year Allowance (special rate pool)
  fiftyPercentFYA: 0.50,
  // 100% FYA for zero-emission cars
  // Source: https://www.gov.uk/capital-allowances/first-year-allowances
  zeroEmissionCarFYA: 1.00,
  // 100% FYA for electric vehicle charge points
  evChargePointFYA: 1.00,
  // Structures and Buildings Allowance
  // Source: https://www.gov.uk/guidance/structures-and-buildings-allowance
  sba: 0.03, // 3% per year straight-line
  // Writing Down Allowance
  wdaMainPool: 0.18,
  wdaSpecialPool: 0.06,
} as const;

// ─── R&D Tax Relief ───────────────────────────────────────────────────────────
// Source: https://www.gov.uk/guidance/corporation-tax-research-and-development-rd-relief
// Merged R&D scheme from 1 April 2024
export const RD_RELIEF = {
  // Merged scheme (RDEC-style for most companies)
  mergedSchemeRate: 0.20, // 20% above-the-line credit
  mergedSchemeNetBenefit: 0.159, // net benefit after 25% CT (approx 15.9p per £1 spent)
  // Enhanced R&D Intensive Support (ERIS) for loss-making R&D-intensive SMEs
  // R&D intensity: R&D spend ≥ 30% of total expenditure
  erisIntensityThreshold: 0.30,
  erisRate: 0.27, // 27% credit rate
  erisNetBenefit: 0.216, // net benefit for loss-makers
  // Qualifying expenditure: staff costs, subcontractors (65% cap for unconnected), software, consumables
  subcontractorCap: 0.65,
} as const;

// ─── Creative Industry Tax Reliefs ───────────────────────────────────────────
// Source: https://www.gov.uk/guidance/creative-industry-tax-reliefs-for-corporation-tax
// Expenditure Credits from 1 January 2024 (replacing old reliefs)
export const CREATIVE_RELIEFS = {
  // Film Tax Credit (IFTC) — replaces Film Tax Relief
  filmCredit: 0.34, // 34% on qualifying UK expenditure
  // High-end TV Credit (HETVC)
  highEndTVCredit: 0.34,
  highEndTVMinCost: 1000000, // £1m per hour minimum
  // Animation Tax Credit (ATC)
  animationCredit: 0.39, // 39%
  // Children's TV Credit (CTC)
  childrensTVCredit: 0.39,
  // Video Games Expenditure Credit (VGEC)
  videoGamesCredit: 0.34,
  // Theatre Tax Credit (TTC) — still relief not credit
  theatreCredit: 0.40, // 40% touring, 45% non-touring (enhanced until April 2026)
  theatreCreditStandard: 0.25, // 25% touring, 30% non-touring from April 2026
  // Orchestra Tax Credit (OTC)
  orchestraCredit: 0.45, // enhanced until April 2026
  orchestraCreditStandard: 0.25,
  // Museums and Galleries Exhibition Tax Credit (MGETC)
  museumsCredit: 0.45, // enhanced until April 2026
  museumsCreditStandard: 0.25,
} as const;

// ─── Patent Box ───────────────────────────────────────────────────────────────
// Source: https://www.gov.uk/guidance/patent-box
export const PATENT_BOX = {
  rate: 0.10, // 10% effective CT rate on qualifying IP profits
} as const;

// ─── SEIS / EIS ───────────────────────────────────────────────────────────────
// Source: https://www.gov.uk/guidance/venture-capital-schemes-apply-for-the-enterprise-investment-scheme
export const INVESTMENT_SCHEMES = {
  // SEIS — Seed Enterprise Investment Scheme
  seisIncomeTaxRelief: 0.50, // 50% income tax relief
  seisMaxInvestmentPerYear: 200000, // investor limit
  seisMaxCompanyRaise: 250000, // company limit (lifetime)
  seisCGTExemption: true,
  // EIS — Enterprise Investment Scheme
  eisIncomeTaxRelief: 0.30, // 30% income tax relief
  eisMaxInvestmentPerYear: 1000000, // investor limit (£2m if knowledge-intensive)
  eisCGTDeferral: true,
  eisCGTExemption: true, // after 3 years
  // EMI — Enterprise Management Incentives
  // Source: https://www.gov.uk/tax-employee-share-schemes/enterprise-management-incentives-emis
  emiMaxOptionsPerEmployee: 250000,
  emiMaxCompanyOptions: 3000000,
} as const;

// ─── Business Rates ───────────────────────────────────────────────────────────
// Source: https://www.gov.uk/introduction-to-business-rates
export const BUSINESS_RATES = {
  // England — from April 2026 revaluation
  englandMultiplier: 0.499, // standard multiplier 2026/27 (subject to confirmation)
  englandSmallMultiplier: 0.499, // small business multiplier
  // Small Business Rate Relief (England)
  sbrRelief100Threshold: 12000, // 100% relief if RV ≤ £12,000
  sbrReliefTaperThreshold: 15000, // tapers from 100% to 0% between £12k–£15k
  // Retail, Hospitality and Leisure Relief (England) — from April 2026
  rhlReliefRate: 0.40, // 40% relief (reduced from 75% in 2025/26)
  rhlReliefCap: 110000, // £110,000 per business
  // Scotland — Source: https://www.mygov.scot/business-rates
  scotlandSmallBusinessBonusThreshold: 15000, // 100% relief if RV ≤ £15,000
  // Wales — Source: https://www.gov.wales/business-rates-relief
  walesSmallBusinessRelief: 100, // 100% for RV ≤ £6,000
  // Northern Ireland — Source: https://www.nibusinessinfo.co.uk/content/business-rates
  niSmallBusinessRelief: true,
} as const;

// ─── Pension ──────────────────────────────────────────────────────────────────
// Source: https://www.gov.uk/tax-on-your-private-pension/pension-tax-relief
export const PENSION = {
  annualAllowance: 60000, // £60,000 from 2023/24
  moneyPurchaseAnnualAllowance: 10000, // if flexibly accessed
  lifetimeAllowance: null, // abolished from April 2024
  basicRateRelief: 0.20, // added at source for basic rate taxpayers
} as const;

// ─── Statutory Residence Test ─────────────────────────────────────────────────
// Source: https://www.gov.uk/guidance/statutory-residence-test-srt
// Note: Domicile removed from UK tax law from 6 April 2025
// Source: https://www.gov.uk/guidance/changes-to-the-taxation-of-non-uk-domiciled-individuals
export const SRT = {
  // Automatic Overseas Tests (if any met → non-resident)
  aot1Days: 0, // not in UK at all in tax year (or ≤ 15 days if not UK resident in any of previous 3 years)
  aot1DaysPrevResident: 15, // ≤ 15 days if UK resident in 1+ of previous 3 years
  aot2Days: 46, // < 46 days in UK AND not UK resident in any of previous 3 years
  aot3Days: 91, // < 91 days AND works full-time overseas (< 31 UK workdays)
  // Automatic UK Tests (if any met → UK resident)
  aut1Days: 183, // ≥ 183 days in UK in tax year
  aut2: 'only-home-in-uk', // only home in UK (or no home and ≥ 30 nights in UK accommodation)
  aut3Days: 365, // works full-time in UK for ≥ 365 days with no significant break
  // Sufficient Ties Test — day counts by number of ties
  // Ties: family, accommodation, work, 90-day, country
  sufficientTies: {
    previousResident: {
      1: 183, // 1 tie: ≥ 183 days
      2: 121, // 2 ties: ≥ 121 days
      3: 91,  // 3 ties: ≥ 91 days
      4: 46,  // 4 ties: ≥ 46 days
      5: 16,  // 5 ties: ≥ 16 days
    },
    notPreviousResident: {
      2: 183, // 2 ties: ≥ 183 days
      3: 121, // 3 ties: ≥ 121 days
      4: 91,  // 4 ties: ≥ 91 days
      5: 46,  // 5 ties: ≥ 46 days
    },
  },
  // FIG Regime (Foreign Income and Gains)
  // Source: https://www.gov.uk/guidance/foreign-income-and-gains-fig-regime
  figYears: 4, // first 4 tax years of UK residence after 10+ years non-residence
  figNonResidenceYears: 10, // must have been non-resident for 10 consecutive years
  figRate: 0, // 0% UK tax on foreign income and gains during FIG period
  // Temporary Repatriation Facility (TRF)
  // Source: https://www.gov.uk/guidance/temporary-repatriation-facility
  trfAvailableUntil: '2027-04-05', // available for 3 years from April 2025
  trfRate2025: 0.12, // 12% in 2025/26
  trfRate2026: 0.12, // 12% in 2026/27
  trfRate2027: 0.15, // 15% in 2027/28
} as const;

// ─── Working Capital Benchmarks ───────────────────────────────────────────────
export const WORKING_CAPITAL_BENCHMARKS = {
  currentRatioHealthy: { min: 1.5, max: 3.0 },
  quickRatioHealthy: { min: 1.0, max: 2.0 },
  debtorDaysBenchmark: 30, // target ≤ 30 days
  creditorDaysBenchmark: 45, // target ≥ 45 days
  stockDaysBenchmark: 30, // target ≤ 30 days
} as const;

// ─── Company Running Costs (estimates) ───────────────────────────────────────
export const COMPANY_RUNNING_COSTS = {
  accountancyMin: 1200, // annual accountancy fees
  accountancyMax: 3000,
  companiesHouseFiling: 34, // annual confirmation statement
  registeredOffice: 0, // if using own address
  payrollSoftware: 120, // annual
  bankingFees: 120, // annual
  insuranceExtra: 300, // extra vs sole trader
  totalEstimateMin: 1800,
  totalEstimateMax: 4500,
} as const;

// ─── Student Loan Repayments ──────────────────────────────────────────────────
// Source: https://www.gov.uk/repaying-your-student-loan/what-you-pay
export const STUDENT_LOAN = {
  plan1: { threshold: 24990, rate: 0.09 },
  plan2: { threshold: 27295, rate: 0.09 },
  plan4: { threshold: 31395, rate: 0.09 }, // Scotland
  plan5: { threshold: 25000, rate: 0.09 }, // new undergrad from 2023
  postgrad: { threshold: 21000, rate: 0.06 },
} as const;

// ─── Simplified Expenses ──────────────────────────────────────────────────────
// Source: https://www.gov.uk/simpler-income-tax-simplified-expenses
export const SIMPLIFIED_EXPENSES = {
  // Mileage rates
  carFirst10000: 0.45, // 45p per mile for first 10,000 miles
  carOver10000: 0.25, // 25p per mile over 10,000 miles
  motorcycle: 0.24,
  bicycle: 0.20,
  // Working from home (hours per month)
  wfhUpTo25Hours: 10, // £10/month
  wfhUpTo50Hours: 18, // £18/month
  wfhOver50Hours: 26, // £26/month
  // Living at business premises
  livingAtPremises1Person: 350, // deduct per month
  livingAtPremises2People: 500,
  livingAtPremises3PlusPeople: 650,
} as const;

// ─── Pre-Trading Expenditure ──────────────────────────────────────────────────
// Source: https://www.gov.uk/expenses-if-youre-self-employed/pre-trading-expenses
export const PRE_TRADING = {
  lookbackYears: 7, // can claim expenses up to 7 years before trading started
} as const;

// ─── Sole Trader vs Ltd comparison helper ────────────────────────────────────
export function getSoleTraderTax(profit: number, nation: 'england' | 'scotland' = 'england'): {
  incomeTax: number;
  class4NIC: number;
  totalTax: number;
  takeHome: number;
  effectiveRate: number;
} {
  const it = INCOME_TAX;
  const nic = SELF_ASSESSMENT;
  let incomeTax = 0;
  const taxableIncome = Math.max(0, profit - it.personalAllowance);
  const paReduction = profit > it.paReducedAbove
    ? Math.min(it.personalAllowance, Math.floor((profit - it.paReducedAbove) * it.paTaperRate))
    : 0;
  const effectivePA = it.personalAllowance - paReduction;
  const taxableAfterPA = Math.max(0, profit - effectivePA);

  if (taxableAfterPA > 0) {
    const basicBand = Math.min(taxableAfterPA, it.basicRateThreshold - effectivePA);
    incomeTax += Math.max(0, basicBand) * it.basicRate;
    if (taxableAfterPA > it.basicRateThreshold - effectivePA) {
      const higherBand = Math.min(taxableAfterPA - (it.basicRateThreshold - effectivePA), it.higherRateThreshold - it.basicRateThreshold);
      incomeTax += Math.max(0, higherBand) * it.higherRate;
    }
    if (taxableAfterPA > it.higherRateThreshold - effectivePA) {
      incomeTax += (taxableAfterPA - (it.higherRateThreshold - effectivePA)) * it.additionalRate;
    }
  }

  // Class 4 NIC
  let class4NIC = 0;
  if (profit > nic.class4LowerProfitsLimit) {
    const mainBand = Math.min(profit - nic.class4LowerProfitsLimit, nic.class4UpperProfitsLimit - nic.class4LowerProfitsLimit);
    class4NIC += mainBand * nic.class4MainRate;
    if (profit > nic.class4UpperProfitsLimit) {
      class4NIC += (profit - nic.class4UpperProfitsLimit) * nic.class4AdditionalRate;
    }
  }

  const totalTax = incomeTax + class4NIC;
  return {
    incomeTax,
    class4NIC,
    totalTax,
    takeHome: profit - totalTax,
    effectiveRate: profit > 0 ? totalTax / profit : 0,
  };
}

export function getCorpTax(taxableProfit: number, associatedCompanies: number = 0): {
  tax: number;
  effectiveRate: number;
  marginalRelief: number;
  rate: string;
} {
  const ct = CORPORATION_TAX;
  const divisor = 1 + associatedCompanies;
  const lowerLimit = ct.lowerLimit / divisor;
  const upperLimit = ct.upperLimit / divisor;

  if (taxableProfit <= 0) return { tax: 0, effectiveRate: 0, marginalRelief: 0, rate: 'small' };

  if (taxableProfit <= lowerLimit) {
    return { tax: taxableProfit * ct.smallProfitsRate, effectiveRate: ct.smallProfitsRate, marginalRelief: 0, rate: 'small' };
  }

  if (taxableProfit >= upperLimit) {
    return { tax: taxableProfit * ct.mainRate, effectiveRate: ct.mainRate, marginalRelief: 0, rate: 'main' };
  }

  // Marginal relief
  const grossTax = taxableProfit * ct.mainRate;
  const marginalRelief = (upperLimit - taxableProfit) * ct.marginalReliefFraction;
  let tax = grossTax - marginalRelief;
  return { tax, effectiveRate: tax / taxableProfit, marginalRelief, rate: 'marginal' };
}

export default {
  TAX_YEAR,
  TAX_YEAR_REVIEWED,
  INCOME_TAX,
  SCOTTISH_INCOME_TAX,
  DIVIDEND_TAX,
  EMPLOYEE_NIC,
  EMPLOYER_NIC,
  CORPORATION_TAX,
  VAT,
  VAT_FLAT_RATES,
  CGT,
  IHT,
  SELF_ASSESSMENT,
  CAPITAL_ALLOWANCES,
  RD_RELIEF,
  CREATIVE_RELIEFS,
  PATENT_BOX,
  INVESTMENT_SCHEMES,
  BUSINESS_RATES,
  PENSION,
  SRT,
  WORKING_CAPITAL_BENCHMARKS,
  COMPANY_RUNNING_COSTS,
  STUDENT_LOAN,
  SIMPLIFIED_EXPENSES,
  PRE_TRADING,
  getSoleTraderTax,
  getCorpTax,
};

// ─── Toolkit metadata ─────────────────────────────────────────────────────────
export const TOOLKIT_META = {
  author: 'Vadim Siubaev, FIAB, MSc',
  authorTitle: 'Founder, Reckonwell',
  authorUrl: '/about',
  bookingUrl: '/book',
  disclaimer: 'Estimates for guidance only — not tax advice. Always consult a qualified accountant before making financial decisions.',
  taxYear: TAX_YEAR,
  lastReviewed: TAX_YEAR_REVIEWED,
  siteUrl: 'https://reckonwell.com',
};

// ─── Named exports for calculator components ──────────────────────────────────

export const NATIONAL_INSURANCE = {
  employeePrimaryThreshold: 12570,
  employeeUpperEarningsLimit: 50270,
  employeeRate: 0.08,
  employeeRateAboveUEL: 0.02,
  employerSecondaryThreshold: 5000,
  employerRate: 0.15,
  class4LowerProfitsLimit: 12570,
  class4UpperProfitsLimit: 50270,
  class4Rate: 0.06,
  class4RateAboveUPL: 0.02,
};

export const EMPLOYMENT_ALLOWANCE = {
  amount: 10500,
};

export function calcIncomeTax(income: number): number {
  const pa = income > 100000 ? Math.max(0, 12570 - Math.floor((income - 100000) / 2)) : 12570;
  const taxable = Math.max(0, income - pa);
  if (taxable <= 0) return 0;
  const basicBand = 50270 - pa;
  const higherBand = 125140 - 50270;
  if (taxable <= basicBand) return taxable * 0.20;
  if (taxable <= basicBand + higherBand) return basicBand * 0.20 + (taxable - basicBand) * 0.40;
  return basicBand * 0.20 + higherBand * 0.40 + (taxable - basicBand - higherBand) * 0.45;
}

export function calcEmployeeNIC(salary: number): number {
  if (salary <= 12570) return 0;
  const band = Math.min(salary, 50270) - 12570;
  const above = Math.max(0, salary - 50270);
  return band * 0.08 + above * 0.02;
}

export function calcEmployerNIC(salary: number, employmentAllowanceApplies: boolean = false): number {
  if (salary <= 5000) return 0;
  const nic = (salary - 5000) * 0.15;
  return employmentAllowanceApplies ? Math.max(0, nic - 10500) : nic;
}

export function calcCorporationTax(profit: number, associatedCompanies: number = 0): {
  tax: number;
  effectiveRate: number;
  smallProfitsThreshold: number;
  mainRateThreshold: number;
  marginalRelief: number;
} {
  const divisor = associatedCompanies + 1;
  const small = 50000 / divisor;
  const main = 250000 / divisor;
  if (profit <= 0) return { tax: 0, effectiveRate: 0, smallProfitsThreshold: small, mainRateThreshold: main, marginalRelief: 0 };
  if (profit <= small) return { tax: profit * 0.19, effectiveRate: 0.19, smallProfitsThreshold: small, mainRateThreshold: main, marginalRelief: 0 };
  if (profit >= main) return { tax: profit * 0.25, effectiveRate: 0.25, smallProfitsThreshold: small, mainRateThreshold: main, marginalRelief: 0 };
  const mr = ((main - profit) / (main - small)) * profit * (0.25 - 0.19);
  let tax = profit * 0.25 - mr;
  return { tax, effectiveRate: tax / profit, smallProfitsThreshold: small, mainRateThreshold: main, marginalRelief: mr };
}

export function calcDividendTax(dividends: number, otherIncome: number): number {
  const allowance = 500;
  const taxable = Math.max(0, dividends - allowance);
  if (taxable <= 0) return 0;
  const pa = 12570;
  const taxableOther = Math.max(0, otherIncome - pa);
  const remainingBasic = Math.max(0, 50270 - pa - taxableOther);
  const remainingHigher = Math.max(0, 125140 - 50270 - Math.max(0, taxableOther - (50270 - pa)));
  let tax = 0;
  let rem = taxable;
  const basic = Math.min(rem, remainingBasic);
  tax += basic * 0.0875; rem -= basic;
  const higher = Math.min(rem, remainingHigher);
  tax += higher * 0.3375; rem -= higher;
  tax += rem * 0.3938;
  return Math.max(0, tax);
}

export function calcSoleTraderTax(profit: number): {
  incomeTax: number;
  class4NIC: number;
  totalTax: number;
  takeHome: number;
  effectiveRate: number;
} {
  let incomeTax = calcIncomeTax(profit);
  let class4NIC = 0;
  if (profit > 12570) {
    const band = Math.min(profit, 50270) - 12570;
    const above = Math.max(0, profit - 50270);
    class4NIC = band * 0.06 + above * 0.02;
  }
  const totalTax = incomeTax + class4NIC;
  return { incomeTax, class4NIC, totalTax, takeHome: profit - totalTax, effectiveRate: profit > 0 ? totalTax / profit : 0 };
}