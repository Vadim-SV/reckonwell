/**
 * Reckonwell Toolkit — Data Files
 * Tool metadata, tax reliefs, professions, expenses, decision tree config
 */

import { TAX_YEAR } from './tax-config';

// ─── Tool Registry ────────────────────────────────────────────────────────────
export interface ToolMeta {
  slug: string;
  title: string;
  question: string;
  description: string;
  icon: string;
  primaryKeyword: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  shareText: string;
  relatedTools: string[];
}

export const TOOLS: ToolMeta[] = [
  {
    slug: 'salary-vs-dividend-calculator',
    title: 'Salary vs Dividend Calculator',
    question: "What's the most tax-efficient way to pay myself from my company?",
    description: 'Find the optimal salary and dividend split to maximise your take-home pay as a director.',
    icon: '💷',
    primaryKeyword: 'salary vs dividend calculator',
    metaTitle: `Salary vs Dividend Calculator ${TAX_YEAR} | Reckonwell`,
    metaDescription: `Free salary vs dividend calculator for UK directors. Find the optimal pay split for ${TAX_YEAR}. No sign-up. Instant results.`,
    h1: `Salary vs Dividend Calculator ${TAX_YEAR}`,
    shareText: `Found a free calculator that shows the best salary/dividend split for ${TAX_YEAR} — worth checking:`,
    relatedTools: ['sole-trader-vs-limited-company', 'corporation-tax-calculator', 'tax-relief-finder'],
  },
  {
    slug: 'sole-trader-vs-limited-company',
    title: 'Sole Trader vs Limited Company',
    question: 'Should I be a sole trader or set up a limited company?',
    description: 'Decision tree + calculator comparing take-home pay and tax as a sole trader vs limited company.',
    icon: '⚖️',
    primaryKeyword: 'sole trader vs limited company',
    metaTitle: `Sole Trader vs Limited Company Calculator ${TAX_YEAR} | Reckonwell`,
    metaDescription: `Free sole trader vs limited company calculator. Compare take-home pay and tax for ${TAX_YEAR}. No sign-up required.`,
    h1: `Sole Trader vs Limited Company: Which Is Right for You? (${TAX_YEAR})`,
    shareText: `Free tool that compares sole trader vs limited company take-home pay for ${TAX_YEAR}:`,
    relatedTools: ['salary-vs-dividend-calculator', 'corporation-tax-calculator', 'allowable-expenses-finder'],
  },
  {
    slug: 'corporation-tax-calculator',
    title: 'Corporation Tax Calculator',
    question: 'How much corporation tax will my company pay?',
    description: 'Calculate your corporation tax including marginal relief, payment deadlines and filing dates.',
    icon: '🏢',
    primaryKeyword: 'corporation tax calculator',
    metaTitle: `Corporation Tax Calculator ${TAX_YEAR} | Reckonwell`,
    metaDescription: `Free corporation tax calculator with marginal relief for ${TAX_YEAR}. Includes payment deadlines and associated companies. No sign-up.`,
    h1: `Corporation Tax Calculator ${TAX_YEAR}`,
    shareText: `Free corporation tax calculator with marginal relief for ${TAX_YEAR}:`,
    relatedTools: ['salary-vs-dividend-calculator', 'sole-trader-vs-limited-company', 'vat-scheme-calculator'],
  },
  {
    slug: 'working-capital-calculator',
    title: 'Working Capital Calculator',
    question: 'How much cash is tied up in my business, and how do I free it?',
    description: 'Calculate working capital, cash conversion cycle, and see how to free up cash with what-if sliders.',
    icon: '💰',
    primaryKeyword: 'working capital calculator',
    metaTitle: `Working Capital Calculator UK | Reckonwell`,
    metaDescription: `Free working capital calculator. Calculate debtor days, stock days, cash conversion cycle and see how to free up cash. No sign-up.`,
    h1: `Working Capital Calculator: Free Up Cash in Your Business`,
    shareText: `Free working capital calculator — shows how much cash is tied up in your business and how to free it:`,
    relatedTools: ['corporation-tax-calculator', 'vat-scheme-calculator', 'salary-vs-dividend-calculator'],
  },
  {
    slug: 'uk-tax-residence-checker',
    title: 'UK Tax Residence Checker',
    question: "I'm moving to or leaving the UK — what's my tax position?",
    description: 'Check your UK tax residence status under the Statutory Residence Test and FIG regime eligibility.',
    icon: '🌍',
    primaryKeyword: 'statutory residence test calculator',
    metaTitle: `UK Tax Residence Checker ${TAX_YEAR} | Reckonwell`,
    metaDescription: `Free UK tax residence checker. Statutory Residence Test, FIG regime, IHT tail for leavers. ${TAX_YEAR}. No sign-up.`,
    h1: `UK Tax Residence Checker: Statutory Residence Test (${TAX_YEAR})`,
    shareText: `Free UK tax residence checker — covers the Statutory Residence Test and FIG regime for ${TAX_YEAR}:`,
    relatedTools: ['salary-vs-dividend-calculator', 'tax-relief-finder', 'corporation-tax-calculator'],
  },
  {
    slug: 'tax-relief-finder',
    title: 'Tax Relief Finder',
    question: 'Which tax reliefs can my business claim?',
    description: 'Answer a few questions and discover every tax relief your business could be eligible for.',
    icon: '🔍',
    primaryKeyword: 'tax relief checker',
    metaTitle: `Tax Relief Finder ${TAX_YEAR} | Reckonwell`,
    metaDescription: `Free tax relief finder for UK businesses. Discover R&D, SEIS/EIS, AIA, Employment Allowance and more for ${TAX_YEAR}. No sign-up.`,
    h1: `Tax Relief Finder: Which Reliefs Can Your Business Claim? (${TAX_YEAR})`,
    shareText: `Free tool that finds every tax relief your business could claim for ${TAX_YEAR}:`,
    relatedTools: ['allowable-expenses-finder', 'corporation-tax-calculator', 'salary-vs-dividend-calculator'],
  },
  {
    slug: 'allowable-expenses-finder',
    title: 'Allowable Expenses Finder',
    question: 'What can I claim as a business expense in my line of work?',
    description: 'Get a tailored checklist of claimable expenses for your profession and business structure.',
    icon: '📋',
    primaryKeyword: 'allowable expenses checker',
    metaTitle: `Allowable Expenses Finder UK ${TAX_YEAR} | Reckonwell`,
    metaDescription: `Free allowable expenses checker for sole traders and limited companies. Tailored by profession for ${TAX_YEAR}. No sign-up.`,
    h1: `Allowable Expenses Finder: What Can You Claim? (${TAX_YEAR})`,
    shareText: `Free tool that shows exactly what expenses you can claim for your profession in ${TAX_YEAR}:`,
    relatedTools: ['tax-relief-finder', 'sole-trader-vs-limited-company', 'vat-scheme-calculator'],
  },
  {
    slug: 'vat-scheme-calculator',
    title: 'VAT Scheme Calculator',
    question: 'Do I need to register for VAT, and which VAT scheme saves me most?',
    description: 'Check if you need to register for VAT and compare standard, flat rate and cash accounting schemes.',
    icon: '📊',
    primaryKeyword: 'flat rate VAT calculator',
    metaTitle: `VAT Scheme Calculator ${TAX_YEAR} | Reckonwell`,
    metaDescription: `Free VAT scheme calculator. Compare flat rate vs standard vs cash accounting for ${TAX_YEAR}. No sign-up required.`,
    h1: `VAT Scheme Calculator: Which Scheme Saves You Most? (${TAX_YEAR})`,
    shareText: `Free VAT scheme calculator — compares flat rate vs standard accounting for ${TAX_YEAR}:`,
    relatedTools: ['corporation-tax-calculator', 'allowable-expenses-finder', 'sole-trader-vs-limited-company'],
  },
];

export function getToolBySlug(slug: string): ToolMeta | undefined {
  return TOOLS.find(t => t.slug === slug);
}

// ─── Tax Reliefs Data ─────────────────────────────────────────────────────────
export interface TaxRelief {
  slug: string;
  name: string;
  shortName: string;
  structures: ('sole-trader' | 'limited-company' | 'partnership-llp' | 'landlord')[];
  category: string;
  description: string;
  eligibilityRules: string[];
  rateDescription: string;
  howToClaim: string;
  claimDeadline: string;
  govUkLink: string;
  commonMistakes: string[];
  indicativeSavingMin?: number;
  indicativeSavingMax?: number;
  savingNote?: string;
  faqs: { q: string; a: string }[];
}

export const TAX_RELIEFS: TaxRelief[] = [
  {
    slug: 'annual-investment-allowance',
    name: 'Annual Investment Allowance (AIA)',
    shortName: 'Annual Investment Allowance',
    structures: ['sole-trader', 'limited-company', 'partnership-llp'],
    category: 'Capital Allowances',
    description: 'Deduct the full cost of qualifying plant and machinery (up to £1m) in the year of purchase, rather than spreading it over several years.',
    eligibilityRules: [
      'Must be a business (sole trader, partnership or company)',
      'Asset must be plant or machinery used in the business',
      'Does not apply to cars (use FYA or WDA instead)',
      'Annual limit: £1,000,000',
    ],
    rateDescription: '100% deduction up to £1,000,000 per year',
    howToClaim: 'Claim on your Self Assessment tax return (sole trader/partnership) or CT600 (company). Enter in the capital allowances section.',
    claimDeadline: 'Within the tax return filing deadline (31 Jan for SA; 12 months after accounting period end for CT)',
    govUkLink: 'https://www.gov.uk/capital-allowances/annual-investment-allowance',
    commonMistakes: [
      'Claiming AIA on cars (not eligible)',
      'Forgetting to apportion the limit for short accounting periods',
      'Not claiming on second-hand equipment (AIA applies)',
    ],
    faqs: [
      { q: 'Can I claim AIA on a van?', a: 'Yes. Vans are plant and machinery and qualify for AIA.' },
      { q: 'Does AIA apply to second-hand equipment?', a: 'Yes, AIA applies to both new and second-hand plant and machinery.' },
      { q: 'What if my accounting period is less than 12 months?', a: 'The AIA limit is proportionally reduced for short accounting periods.' },
    ],
  },
  {
    slug: 'employment-allowance',
    name: 'Employment Allowance',
    shortName: 'Employment Allowance',
    structures: ['limited-company', 'sole-trader', 'partnership-llp'],
    category: 'NIC Reliefs',
    description: "Reduce your employer's National Insurance bill by up to £10,500 per year.",
    eligibilityRules: [
      "Your employer's Class 1 NIC liability was less than £100,000 in the previous tax year",
      'You have at least one employee (or director with another employee)',
      'Not available if the only employee is a sole director',
      'Not available to public bodies or businesses that carry out more than 50% of their work in the public sector',
    ],
    rateDescription: 'Up to £10,500 reduction in employer NIC per year',
    howToClaim: 'Claim through your payroll software or PAYE Online. Tick the Employment Allowance box when submitting your Employer Payment Summary.',
    claimDeadline: 'Can be claimed at any point in the tax year. Backdating available for up to 4 years.',
    govUkLink: 'https://www.gov.uk/claim-employment-allowance',
    commonMistakes: [
      'Sole directors not realising they are ineligible',
      'Not claiming when a second employee is added',
      'Forgetting to re-claim each tax year',
    ],
    faqs: [
      { q: 'Can a sole director claim Employment Allowance?', a: 'No. If you are the only employee and a director, you cannot claim. You need at least one other employee.' },
      { q: 'How much can I save?', a: 'Up to £10,500 per year. If your employer NIC bill is less than £10,500, you pay nothing.' },
    ],
  },
  {
    slug: 'rd-tax-relief',
    name: 'R&D Tax Relief (Merged Scheme)',
    shortName: 'R&D Tax Relief',
    structures: ['limited-company'],
    category: 'R&D',
    description: 'Claim a 20% above-the-line tax credit on qualifying R&D expenditure under the merged RDEC-style scheme (from 1 April 2024).',
    eligibilityRules: [
      'Must be a UK limited company subject to corporation tax',
      'Must be carrying out qualifying R&D: seeking to advance science or technology, overcoming scientific or technological uncertainty',
      'Qualifying costs: staff, subcontractors (65% cap for unconnected), software, consumables, cloud computing',
      'R&D-intensive loss-makers (R&D ≥ 30% of total expenditure) may qualify for enhanced 27% ERIS rate',
    ],
    rateDescription: '20% above-the-line credit (net benefit ~15.9p per £1 spent). ERIS: 27% credit for R&D-intensive loss-makers.',
    howToClaim: 'File an R&D claim with your CT600. Must submit an Additional Information Form (AIF) to HMRC before or with the CT600.',
    claimDeadline: 'Within 2 years of the end of the accounting period',
    govUkLink: 'https://www.gov.uk/guidance/corporation-tax-research-and-development-rd-relief',
    commonMistakes: [
      'Not filing the Additional Information Form (AIF) — claim will be rejected',
      'Claiming for routine software development that does not advance technology',
      'Missing the 2-year deadline',
      'Not claiming subcontractor costs (up to 65% of unconnected subcontractor costs)',
    ],
    faqs: [
      { q: 'What changed in April 2024?', a: 'The old SME and RDEC schemes merged into a single scheme. Most companies now get a 20% above-the-line credit.' },
      { q: 'Do I need to be a tech company?', a: 'No. R&D can occur in any sector — manufacturing, food, construction, professional services — as long as you are overcoming scientific or technological uncertainty.' },
    ],
  },
  {
    slug: 'seis',
    name: 'Seed Enterprise Investment Scheme (SEIS)',
    shortName: 'SEIS',
    structures: ['limited-company'],
    category: 'Investment Schemes',
    description: 'Attract investment from individuals who get 50% income tax relief on investments up to £200,000 per year.',
    eligibilityRules: [
      'Company must be UK-based, trading, and less than 3 years old',
      'Fewer than 25 full-time employees',
      'Gross assets ≤ £350,000 before the share issue',
      'Maximum raise: £250,000 lifetime',
      'Must not have previously raised EIS or VCT investment',
    ],
    rateDescription: 'Investors get 50% income tax relief. CGT exemption on gains after 3 years.',
    howToClaim: 'Apply for SEIS advance assurance from HMRC, then issue SEIS3 certificates to investors after shares are issued.',
    claimDeadline: 'Investors must claim within 5 years of 31 January following the tax year of investment',
    govUkLink: 'https://www.gov.uk/guidance/venture-capital-schemes-apply-to-use-the-seed-enterprise-investment-scheme',
    commonMistakes: [
      'Not getting advance assurance before raising',
      'Issuing shares before HMRC approval',
      'Exceeding the £250,000 lifetime limit',
    ],
    faqs: [
      { q: 'Can I raise SEIS and EIS in the same round?', a: 'Yes. You can raise SEIS first, then EIS once the SEIS limit is reached.' },
      { q: 'What do investors get?', a: '50% income tax relief, CGT exemption after 3 years, and loss relief if the company fails.' },
    ],
  },
  {
    slug: 'eis',
    name: 'Enterprise Investment Scheme (EIS)',
    shortName: 'EIS',
    structures: ['limited-company'],
    category: 'Investment Schemes',
    description: 'Attract investment from individuals who get 30% income tax relief on investments up to £1m per year.',
    eligibilityRules: [
      'Company must be UK-based, trading, and less than 7 years old (10 for knowledge-intensive)',
      'Fewer than 250 full-time employees (500 for knowledge-intensive)',
      'Gross assets ≤ £15m before the share issue',
      'Maximum raise: £5m per year, £12m lifetime (£20m for knowledge-intensive)',
    ],
    rateDescription: 'Investors get 30% income tax relief. CGT deferral and exemption after 3 years.',
    howToClaim: 'Apply for EIS advance assurance from HMRC, then issue EIS3 certificates to investors.',
    claimDeadline: 'Investors must claim within 5 years of 31 January following the tax year of investment',
    govUkLink: 'https://www.gov.uk/guidance/venture-capital-schemes-apply-for-the-enterprise-investment-scheme',
    commonMistakes: [
      'Not getting advance assurance',
      'Spending investment on excluded activities',
      'Paying dividends before the 3-year holding period',
    ],
    faqs: [
      { q: 'What is the difference between SEIS and EIS?', a: 'SEIS is for very early-stage companies (up to £250k raise, 50% relief). EIS is for more established companies (up to £5m/year, 30% relief).' },
    ],
  },
  {
    slug: 'emi',
    name: 'Enterprise Management Incentives (EMI)',
    shortName: 'EMI Options',
    structures: ['limited-company'],
    category: 'Employee Incentives',
    description: 'Grant tax-advantaged share options to employees, with significant CGT and income tax advantages.',
    eligibilityRules: [
      'Company must have gross assets ≤ £30m',
      'Fewer than 250 full-time employees',
      'Must be a trading company (not property, finance, legal or accountancy)',
      'Options per employee: up to £250,000',
      'Total options outstanding: up to £3m',
    ],
    rateDescription: 'Employees pay CGT (not income tax) on gains. BADR may apply reducing CGT to 14%.',
    howToClaim: 'Register the EMI scheme with HMRC within 92 days of granting options. File annual EMI return.',
    claimDeadline: 'Register within 92 days of grant',
    govUkLink: 'https://www.gov.uk/tax-employee-share-schemes/enterprise-management-incentives-emis',
    commonMistakes: [
      'Missing the 92-day registration deadline',
      'Granting options to employees who work less than 25 hours/week or 75% of their working time',
      'Not getting a market value agreement from HMRC',
    ],
    faqs: [
      { q: 'Can I grant EMI options to part-time employees?', a: 'Yes, but the employee must work at least 25 hours per week or 75% of their working time for the company.' },
    ],
  },
  {
    slug: 'business-asset-disposal-relief',
    name: 'Business Asset Disposal Relief (BADR)',
    shortName: 'BADR',
    structures: ['sole-trader', 'limited-company', 'partnership-llp'],
    category: 'Capital Gains',
    description: 'Pay a reduced CGT rate of 14% (rising to 18% from April 2026) when you sell your business or shares.',
    eligibilityRules: [
      'Must have owned the business for at least 2 years before disposal',
      'For company shares: must own ≥ 5% of shares and voting rights, and be an employee or officer',
      'Lifetime limit: £1,000,000',
      'Rate: 14% in 2025/26, 18% from 6 April 2026',
    ],
    rateDescription: '14% CGT rate (2025/26), 18% from April 2026. Lifetime limit £1m.',
    howToClaim: 'Claim on your Self Assessment tax return in the year of disposal.',
    claimDeadline: 'By 31 January, 1 year after the end of the tax year of disposal',
    govUkLink: 'https://www.gov.uk/entrepreneurs-relief',
    commonMistakes: [
      'Not meeting the 2-year ownership requirement',
      'Falling below 5% shareholding before sale',
      'Confusing BADR with Investors\' Relief',
    ],
    faqs: [
      { q: 'What is the BADR rate in 2026/27?', a: 'From 6 April 2026, the BADR rate increases to 18% (from 14% in 2025/26).' },
      { q: 'Does BADR apply to property?', a: 'Only to furnished holiday lettings (which lost their special status from April 2025). Residential property disposals do not qualify.' },
    ],
  },
  {
    slug: 'patent-box',
    name: 'Patent Box',
    shortName: 'Patent Box',
    structures: ['limited-company'],
    category: 'IP',
    description: 'Pay a reduced 10% corporation tax rate on profits attributable to patented inventions.',
    eligibilityRules: [
      'Must be a UK company subject to corporation tax',
      'Must own or exclusively license qualifying patents (UK, European, or certain other patents)',
      'Must have been involved in developing the patent or a product incorporating it',
      'Must make an election to use Patent Box',
    ],
    rateDescription: '10% effective corporation tax rate on qualifying IP profits',
    howToClaim: 'Make an election in your CT600 within 2 years of the end of the accounting period.',
    claimDeadline: 'Election within 2 years of accounting period end',
    govUkLink: 'https://www.gov.uk/guidance/patent-box',
    commonMistakes: [
      'Not making the election in time',
      'Claiming on profits from non-patented products',
      'Not tracking IP income separately',
    ],
    faqs: [
      { q: 'Do I need a UK patent?', a: 'No. European patents and patents from certain other countries also qualify.' },
    ],
  },
  {
    slug: 'trading-loss-relief',
    name: 'Trading Loss Relief',
    shortName: 'Loss Relief',
    structures: ['sole-trader', 'limited-company', 'partnership-llp'],
    category: 'Losses',
    description: 'Use trading losses to reduce your tax bill — carry them back, forward, or offset against other income.',
    eligibilityRules: [
      'Must have a genuine trading loss',
      'Sole traders: can offset against other income in same or previous year, or carry forward',
      'Companies: can carry back 1 year (3 years in first 3 years of trading), carry forward indefinitely',
      'Terminal loss relief available when ceasing to trade',
    ],
    rateDescription: 'Reduces taxable income/profit by the amount of the loss',
    howToClaim: 'Claim on Self Assessment (sole trader) or CT600 (company). Specify the type of relief claimed.',
    claimDeadline: 'Carry-back claims: within 1 year of 31 January following the loss year (SA) or 2 years of accounting period end (CT)',
    govUkLink: 'https://www.gov.uk/guidance/corporation-tax-trading-and-non-trading',
    commonMistakes: [
      'Missing the carry-back deadline',
      'Not claiming terminal loss relief when closing a business',
      'Forgetting to carry forward losses when there is no current year income to offset',
    ],
    faqs: [
      { q: 'Can I carry back a loss to get a tax refund?', a: 'Yes. Sole traders can carry back losses to the previous tax year. Companies can carry back 1 year (or 3 years in the first 3 years of trading).' },
    ],
  },
  {
    slug: 'structures-and-buildings-allowance',
    name: 'Structures and Buildings Allowance (SBA)',
    shortName: 'SBA',
    structures: ['sole-trader', 'limited-company', 'partnership-llp'],
    category: 'Capital Allowances',
    description: 'Claim 3% per year on the cost of constructing or renovating commercial buildings.',
    eligibilityRules: [
      'Building must be used for qualifying business activity',
      'Must be a new structure or renovation of an existing one',
      'Does not apply to residential property',
      'Allowance runs for 33⅓ years (3% per year)',
    ],
    rateDescription: '3% per year straight-line on qualifying expenditure',
    howToClaim: 'Claim on Self Assessment or CT600. Keep an allowance statement.',
    claimDeadline: 'Within the tax return filing deadline',
    govUkLink: 'https://www.gov.uk/guidance/structures-and-buildings-allowance',
    commonMistakes: [
      'Claiming on residential property',
      'Not keeping an allowance statement (required for future owners)',
      'Claiming on land costs (not eligible)',
    ],
    faqs: [
      { q: 'Does SBA apply to office fit-out?', a: 'Fit-out costs may qualify as plant and machinery (AIA) rather than SBA. SBA applies to the structure itself.' },
    ],
  },
  {
    slug: 'full-expensing',
    name: 'Full Expensing',
    shortName: 'Full Expensing',
    structures: ['limited-company'],
    category: 'Capital Allowances',
    description: 'Deduct 100% of the cost of qualifying main pool plant and machinery in the year of purchase (companies only, permanent from April 2023).',
    eligibilityRules: [
      'Must be a company (not sole trader or partnership)',
      'Asset must be new (not second-hand)',
      'Must be main pool plant and machinery (not cars, not special rate pool)',
      'No monetary limit',
    ],
    rateDescription: '100% first-year allowance on new main pool plant and machinery',
    howToClaim: 'Claim on CT600 in the capital allowances section.',
    claimDeadline: 'Within the CT600 filing deadline',
    govUkLink: 'https://www.gov.uk/guidance/full-expensing',
    commonMistakes: [
      'Claiming on second-hand assets (use AIA instead)',
      'Claiming on special rate pool assets (use 50% FYA instead)',
      'Claiming as a sole trader (not eligible — use AIA)',
    ],
    faqs: [
      { q: 'What is the difference between Full Expensing and AIA?', a: 'Full Expensing is for companies only and applies to new assets with no limit. AIA applies to all businesses (including sole traders) on new or second-hand assets up to £1m.' },
    ],
  },
  {
    slug: 'marginal-relief',
    name: 'Corporation Tax Marginal Relief',
    shortName: 'Marginal Relief',
    structures: ['limited-company'],
    category: 'Corporation Tax',
    description: 'If your company profits are between £50,000 and £250,000, you pay less than the full 25% main rate through marginal relief.',
    eligibilityRules: [
      'Company profits between £50,000 and £250,000 (adjusted for associated companies)',
      'Limits divided by (1 + number of associated companies)',
      'Applies to accounting periods from 1 April 2023',
    ],
    rateDescription: 'Effective rate between 19% and 25% depending on profit level',
    howToClaim: 'Automatically calculated on CT600. Use HMRC\'s marginal relief calculator to check.',
    claimDeadline: 'Within CT600 filing deadline',
    govUkLink: 'https://www.gov.uk/guidance/corporation-tax-marginal-relief',
    commonMistakes: [
      'Not accounting for associated companies (which reduce the thresholds)',
      'Forgetting to apportion limits for short accounting periods',
    ],
    faqs: [
      { q: 'What counts as an associated company?', a: 'A company under common control — typically another company owned by the same person or group.' },
    ],
  },
];

// ─── Professions for Expenses Finder ─────────────────────────────────────────
export interface Profession {
  value: string;
  label: string;
  commonExpenses: string[];
  missedExpenses: string[];
  notAllowed: string[];
}

export const PROFESSIONS: Profession[] = [
  {
    value: 'consultant',
    label: 'Consultant / Business Advisor',
    commonExpenses: ['home-office', 'phone', 'broadband', 'laptop', 'software-subscriptions', 'professional-development', 'accountant-fees', 'travel', 'client-entertainment', 'professional-memberships', 'pension'],
    missedExpenses: ['professional-indemnity-insurance', 'co-working-space', 'research-subscriptions', 'linkedin-premium'],
    notAllowed: ['gym', 'personal-clothing', 'commuting'],
  },
  {
    value: 'developer',
    label: 'Software Developer / Engineer',
    commonExpenses: ['home-office', 'laptop', 'monitors', 'software-subscriptions', 'cloud-hosting', 'phone', 'broadband', 'professional-development', 'accountant-fees', 'pension'],
    missedExpenses: ['domain-names', 'github-subscription', 'technical-books', 'ergonomic-equipment'],
    notAllowed: ['gym', 'personal-clothing', 'commuting'],
  },
  {
    value: 'designer',
    label: 'Graphic / UX Designer',
    commonExpenses: ['home-office', 'laptop', 'design-software', 'phone', 'broadband', 'professional-development', 'accountant-fees', 'travel', 'pension', 'stock-images'],
    missedExpenses: ['drawing-tablet', 'colour-calibration-equipment', 'portfolio-hosting', 'font-licences'],
    notAllowed: ['gym', 'personal-clothing', 'commuting'],
  },
  {
    value: 'photographer',
    label: 'Photographer / Videographer',
    commonExpenses: ['camera-equipment', 'editing-software', 'home-office', 'travel', 'phone', 'broadband', 'professional-development', 'accountant-fees', 'pension', 'insurance'],
    missedExpenses: ['memory-cards-batteries', 'studio-hire', 'props', 'website-hosting'],
    notAllowed: ['gym', 'personal-clothing-not-uniform', 'commuting'],
  },
  {
    value: 'tradesperson',
    label: 'Tradesperson (Plumber, Electrician, Builder)',
    commonExpenses: ['tools-equipment', 'van-vehicle', 'fuel', 'materials', 'phone', 'professional-development', 'accountant-fees', 'insurance', 'pension', 'workwear'],
    missedExpenses: ['tool-insurance', 'vehicle-insurance', 'trade-memberships', 'health-and-safety-training'],
    notAllowed: ['gym', 'personal-clothing', 'commuting-to-regular-workplace'],
  },
  {
    value: 'cleaner',
    label: 'Cleaner / Domestic Services',
    commonExpenses: ['cleaning-supplies', 'vehicle', 'fuel', 'phone', 'workwear', 'accountant-fees', 'insurance', 'pension'],
    missedExpenses: ['equipment-replacement', 'professional-cleaning-training', 'public-liability-insurance'],
    notAllowed: ['gym', 'personal-clothing', 'commuting-to-regular-workplace'],
  },
  {
    value: 'beauty-therapist',
    label: 'Beauty Therapist / Nail Technician',
    commonExpenses: ['professional-supplies', 'equipment', 'workwear', 'phone', 'professional-development', 'accountant-fees', 'insurance', 'pension', 'home-office'],
    missedExpenses: ['professional-indemnity-insurance', 'cpd-courses', 'product-samples'],
    notAllowed: ['gym', 'personal-clothing', 'personal-beauty-treatments'],
  },
  {
    value: 'personal-trainer',
    label: 'Personal Trainer / Fitness Coach',
    commonExpenses: ['gym-membership-professional', 'equipment', 'workwear', 'phone', 'professional-development', 'accountant-fees', 'insurance', 'travel', 'pension'],
    missedExpenses: ['cpd-courses', 'first-aid-training', 'professional-memberships', 'fitness-software'],
    notAllowed: ['personal-gym-membership', 'personal-clothing', 'commuting'],
  },
  {
    value: 'music-teacher',
    label: 'Music / Drama Teacher',
    commonExpenses: ['instruments-equipment', 'sheet-music', 'home-office', 'phone', 'professional-development', 'accountant-fees', 'travel', 'pension', 'insurance'],
    missedExpenses: ['music-software', 'instrument-insurance', 'professional-memberships', 'dbs-check'],
    notAllowed: ['personal-instruments', 'personal-clothing', 'commuting'],
  },
  {
    value: 'driver',
    label: 'Driver (Taxi, Courier, Delivery)',
    commonExpenses: ['vehicle', 'fuel', 'vehicle-insurance', 'phone', 'accountant-fees', 'pension', 'vehicle-maintenance', 'licensing-fees'],
    missedExpenses: ['dashcam', 'vehicle-cleaning', 'parking-fees', 'road-tolls'],
    notAllowed: ['personal-clothing', 'personal-vehicle-use', 'fines'],
  },
  {
    value: 'landlord',
    label: 'Landlord / Property Investor',
    commonExpenses: ['mortgage-interest', 'letting-agent-fees', 'repairs-maintenance', 'insurance', 'accountant-fees', 'travel-to-property', 'phone', 'professional-development'],
    missedExpenses: ['ground-rent', 'service-charges', 'legal-fees', 'advertising-costs'],
    notAllowed: ['capital-improvements', 'personal-use-portion', 'mortgage-capital-repayment'],
  },
  {
    value: 'content-creator',
    label: 'Content Creator / Influencer',
    commonExpenses: ['camera-equipment', 'editing-software', 'home-office', 'phone', 'broadband', 'professional-development', 'accountant-fees', 'pension', 'travel'],
    missedExpenses: ['props-and-costumes-for-content', 'platform-subscriptions', 'music-licences', 'website-hosting'],
    notAllowed: ['personal-clothing', 'personal-meals', 'gym-for-personal-use'],
  },
  {
    value: 'accountant',
    label: 'Accountant / Bookkeeper',
    commonExpenses: ['home-office', 'phone', 'broadband', 'laptop', 'accounting-software', 'professional-development', 'professional-memberships', 'accountant-fees', 'pension', 'insurance'],
    missedExpenses: ['cpd-courses', 'technical-books', 'professional-indemnity-insurance', 'client-gifts'],
    notAllowed: ['gym', 'personal-clothing', 'commuting'],
  },
  {
    value: 'marketing',
    label: 'Marketing / PR Professional',
    commonExpenses: ['home-office', 'phone', 'broadband', 'laptop', 'software-subscriptions', 'professional-development', 'accountant-fees', 'travel', 'client-entertainment', 'pension'],
    missedExpenses: ['market-research-tools', 'social-media-tools', 'press-release-distribution', 'industry-events'],
    notAllowed: ['gym', 'personal-clothing', 'commuting'],
  },
  {
    value: 'lawyer',
    label: 'Lawyer / Legal Professional',
    commonExpenses: ['home-office', 'phone', 'broadband', 'laptop', 'legal-software', 'professional-development', 'professional-memberships', 'accountant-fees', 'pension', 'insurance'],
    missedExpenses: ['law-reports-subscriptions', 'court-fees-recharged', 'professional-indemnity-insurance', 'cpd-courses'],
    notAllowed: ['gym', 'personal-clothing', 'commuting'],
  },
  {
    value: 'architect',
    label: 'Architect / Surveyor',
    commonExpenses: ['home-office', 'phone', 'broadband', 'laptop', 'cad-software', 'professional-development', 'professional-memberships', 'accountant-fees', 'travel', 'pension'],
    missedExpenses: ['site-visit-costs', 'professional-indemnity-insurance', 'drawing-equipment', 'technical-books'],
    notAllowed: ['gym', 'personal-clothing', 'commuting'],
  },
  {
    value: 'healthcare',
    label: 'Healthcare Professional (Locum, Therapist)',
    commonExpenses: ['home-office', 'phone', 'broadband', 'professional-development', 'professional-memberships', 'accountant-fees', 'insurance', 'travel', 'pension', 'workwear'],
    missedExpenses: ['dbs-check', 'cpd-courses', 'professional-indemnity-insurance', 'medical-equipment'],
    notAllowed: ['gym', 'personal-clothing', 'commuting'],
  },
  {
    value: 'writer',
    label: 'Writer / Journalist / Editor',
    commonExpenses: ['home-office', 'phone', 'broadband', 'laptop', 'software-subscriptions', 'professional-development', 'accountant-fees', 'travel', 'research-materials', 'pension'],
    missedExpenses: ['research-subscriptions', 'professional-memberships', 'book-purchases-for-research', 'writing-software'],
    notAllowed: ['gym', 'personal-clothing', 'commuting'],
  },
  {
    value: 'recruiter',
    label: 'Recruiter / HR Consultant',
    commonExpenses: ['home-office', 'phone', 'broadband', 'laptop', 'software-subscriptions', 'professional-development', 'accountant-fees', 'travel', 'client-entertainment', 'pension'],
    missedExpenses: ['linkedin-recruiter', 'job-board-subscriptions', 'professional-memberships', 'background-check-services'],
    notAllowed: ['gym', 'personal-clothing', 'commuting'],
  },
  {
    value: 'financial-advisor',
    label: 'Financial Adviser / IFA',
    commonExpenses: ['home-office', 'phone', 'broadband', 'laptop', 'software-subscriptions', 'professional-development', 'professional-memberships', 'accountant-fees', 'pension', 'insurance'],
    missedExpenses: ['fca-fees', 'cpd-courses', 'professional-indemnity-insurance', 'research-tools'],
    notAllowed: ['gym', 'personal-clothing', 'commuting'],
  },
  {
    value: 'event-planner',
    label: 'Event Planner / Coordinator',
    commonExpenses: ['home-office', 'phone', 'broadband', 'laptop', 'travel', 'professional-development', 'accountant-fees', 'insurance', 'pension', 'marketing'],
    missedExpenses: ['event-software', 'sample-products', 'professional-memberships', 'venue-inspection-costs'],
    notAllowed: ['gym', 'personal-clothing', 'personal-entertainment'],
  },
  {
    value: 'it-support',
    label: 'IT Support / Systems Administrator',
    commonExpenses: ['home-office', 'laptop', 'tools-equipment', 'phone', 'broadband', 'software-subscriptions', 'professional-development', 'accountant-fees', 'pension', 'travel'],
    missedExpenses: ['test-equipment', 'technical-certifications', 'professional-memberships', 'cloud-tools'],
    notAllowed: ['gym', 'personal-clothing', 'commuting'],
  },
  {
    value: 'social-worker',
    label: 'Social Worker / Care Professional',
    commonExpenses: ['travel', 'phone', 'professional-development', 'professional-memberships', 'accountant-fees', 'insurance', 'pension', 'workwear'],
    missedExpenses: ['dbs-check', 'cpd-courses', 'professional-indemnity-insurance', 'supervision-costs'],
    notAllowed: ['gym', 'personal-clothing', 'commuting'],
  },
  {
    value: 'chef',
    label: 'Chef / Caterer',
    commonExpenses: ['tools-equipment', 'workwear', 'travel', 'phone', 'professional-development', 'accountant-fees', 'insurance', 'pension', 'ingredients-for-testing'],
    missedExpenses: ['food-hygiene-training', 'professional-memberships', 'knife-insurance', 'recipe-development-costs'],
    notAllowed: ['personal-meals', 'personal-clothing', 'commuting'],
  },
  {
    value: 'other',
    label: 'Other / Not Listed',
    commonExpenses: ['home-office', 'phone', 'broadband', 'laptop', 'professional-development', 'accountant-fees', 'pension', 'travel', 'insurance'],
    missedExpenses: ['professional-memberships', 'software-subscriptions', 'client-entertainment'],
    notAllowed: ['personal-clothing', 'commuting', 'gym-for-personal-use'],
  },
];

// ─── Can-I-Claim Items ────────────────────────────────────────────────────────
export interface ClaimItem {
  slug: string;
  name: string;
  shortAnswer: 'yes' | 'no' | 'partly';
  soleTraderAnswer: string;
  limitedCompanyAnswer: string;
  bikNote?: string;
  examples: string[];
  commonMistakes: string[];
  faqs: { q: string; a: string }[];
}

export const CLAIM_ITEMS: ClaimItem[] = [
  {
    slug: 'phone',
    name: 'Mobile Phone',
    shortAnswer: 'partly',
    soleTraderAnswer: 'You can claim the business proportion of your phone bill. If 60% of your usage is business, claim 60% of the cost.',
    limitedCompanyAnswer: 'If the company pays for one mobile phone contract for you, the full cost is deductible and there is no benefit-in-kind. A second phone would be a BIK.',
    bikNote: 'One mobile phone per employee: no BIK. Additional phones: BIK applies.',
    examples: ['Monthly contract cost', 'Business calls on pay-as-you-go', 'Phone purchased for business use'],
    commonMistakes: ['Claiming 100% when the phone is also used personally', 'Forgetting to claim the handset cost'],
    faqs: [
      { q: 'Can I claim my whole phone bill?', a: 'Only the business proportion. Keep a log of business vs personal calls for a month to establish the ratio.' },
      { q: 'What about a second phone just for work?', a: 'If it is genuinely only for business, you can claim 100%.' },
    ],
  },
  {
    slug: 'broadband',
    name: 'Home Broadband',
    shortAnswer: 'partly',
    soleTraderAnswer: 'Claim the business proportion of your broadband bill. If you work from home 50% of the time, claim 50%.',
    limitedCompanyAnswer: 'The company can pay for broadband at your home. The business proportion is deductible. The personal element is a benefit-in-kind unless it is a dedicated business line.',
    bikNote: 'Mixed-use broadband: BIK on personal element. Dedicated business line: no BIK.',
    examples: ['Monthly broadband subscription', 'Business-only broadband line'],
    commonMistakes: ['Claiming 100% of a mixed-use connection', 'Not claiming anything when working from home'],
    faqs: [
      { q: 'Can I claim broadband if I work from home?', a: 'Yes, the business proportion. If broadband is essential for your work, a higher proportion may be justified.' },
    ],
  },
  {
    slug: 'laptop',
    name: 'Laptop / Computer',
    shortAnswer: 'yes',
    soleTraderAnswer: 'You can claim the full cost if the laptop is used wholly or mainly for business. If there is significant personal use, claim only the business proportion.',
    limitedCompanyAnswer: 'The company can buy a laptop and provide it to you. If it is used mainly for business, there is no benefit-in-kind. The full cost is deductible.',
    bikNote: 'One laptop provided for business use: no BIK. Additional laptops with significant personal use: BIK may apply.',
    examples: ['MacBook or Windows laptop', 'Tablet used for business', 'Desktop computer'],
    commonMistakes: ['Forgetting to claim the full cost in year of purchase (use AIA)', 'Not claiming on second-hand equipment'],
    faqs: [
      { q: 'Can I claim a laptop I bought before starting my business?', a: 'Yes, if you started using it for business. Claim the market value at the time you started using it for business.' },
    ],
  },
  {
    slug: 'home-office',
    name: 'Home Office / Working from Home',
    shortAnswer: 'yes',
    soleTraderAnswer: 'Use simplified expenses (£10–£26/month depending on hours) or calculate actual costs (proportion of rent/mortgage interest, utilities, council tax).',
    limitedCompanyAnswer: 'The company can pay you a £6/week (£312/year) home working allowance tax-free. Alternatively, the company can rent a room from you under a formal licence agreement.',
    bikNote: '£6/week HMRC allowance: no BIK. Formal room rental: must be at arm\'s length and properly documented.',
    examples: ['Proportion of heating and electricity', 'Proportion of broadband', 'Dedicated office furniture'],
    commonMistakes: ['Claiming mortgage capital repayments (not allowable)', 'Not claiming anything when working from home', 'Overclaiming and risking CGT on home sale'],
    faqs: [
      { q: 'Will claiming home office affect my CGT when I sell my house?', a: 'Only if you designate a room exclusively for business. Using a room for both work and personal use does not affect CGT.' },
    ],
  },
  {
    slug: 'gym',
    name: 'Gym Membership',
    shortAnswer: 'no',
    soleTraderAnswer: 'Generally not allowable. HMRC considers gym membership a personal expense unless you are a personal trainer or fitness professional who needs it to maintain professional competence.',
    limitedCompanyAnswer: 'If the company pays for a gym membership for you, it is a benefit-in-kind. You pay income tax on the value and the company pays employer NIC. The company can deduct the cost.',
    bikNote: 'Gym membership paid by company: BIK. Employee pays income tax on the value.',
    examples: ['Personal trainer using gym to train clients (may qualify)', 'Fitness instructor maintaining professional skills'],
    commonMistakes: ['Claiming gym membership as a general business expense', 'Not reporting it as a BIK if the company pays'],
    faqs: [
      { q: 'I am a personal trainer — can I claim my gym membership?', a: 'Yes, if you use the gym to train clients or maintain professional skills required for your work.' },
    ],
  },
  {
    slug: 'clothing',
    name: 'Clothing / Uniform',
    shortAnswer: 'partly',
    soleTraderAnswer: 'Ordinary clothing is not allowable even if worn only for work. Protective clothing, uniforms with a logo, and specialist workwear (e.g. chef whites, hi-vis) are allowable.',
    limitedCompanyAnswer: 'Same rules apply. Branded uniforms and protective clothing are deductible. Ordinary clothing provided by the company is a benefit-in-kind.',
    bikNote: 'Branded uniform or protective clothing: no BIK. Ordinary clothing: BIK applies.',
    examples: ['Hi-vis vest', 'Chef whites', 'Branded polo shirt with company logo', 'Safety boots'],
    commonMistakes: ['Claiming a suit or smart clothes worn for client meetings', 'Forgetting to claim protective clothing'],
    faqs: [
      { q: 'Can I claim a suit I only wear for work?', a: 'No. HMRC does not allow ordinary clothing even if worn exclusively for work. The test is whether it can be worn outside work.' },
    ],
  },
  {
    slug: 'meals',
    name: 'Meals / Food',
    shortAnswer: 'partly',
    soleTraderAnswer: 'Meals while travelling away from your normal place of work on business are allowable. Everyday meals are not. Client entertainment is not deductible.',
    limitedCompanyAnswer: 'Same rules for travel meals. Staff entertaining (including yourself as a director) up to £150/head per year is exempt from BIK. Client entertainment is not deductible.',
    bikNote: 'Annual staff party up to £150/head: no BIK. Other staff entertaining: BIK may apply.',
    examples: ['Lunch while working away from home overnight', 'Meal during a business trip', 'Staff Christmas party (up to £150/head)'],
    commonMistakes: ['Claiming everyday lunch', 'Claiming client meals as a deductible expense (not deductible for CT/IT, but may be BIK-exempt for staff)'],
    faqs: [
      { q: 'Can I claim lunch every day?', a: 'No. Only meals while travelling away from your normal place of work on business.' },
    ],
  },
  {
    slug: 'travel',
    name: 'Travel (Train, Flights, Hotels)',
    shortAnswer: 'yes',
    soleTraderAnswer: 'Business travel is allowable: trains, flights, hotels, taxis for business purposes. Commuting to a regular workplace is not allowable.',
    limitedCompanyAnswer: 'Same rules. The company can pay for business travel tax-free. Commuting to a permanent workplace is a BIK.',
    bikNote: 'Business travel: no BIK. Commuting to permanent workplace: BIK applies.',
    examples: ['Train to client meeting', 'Hotel for overnight business trip', 'Flight to conference'],
    commonMistakes: ['Claiming commuting costs', 'Not keeping receipts for travel'],
    faqs: [
      { q: 'Is travel to my accountant\'s office deductible?', a: 'Yes, if it is for a business purpose.' },
    ],
  },
  {
    slug: 'mileage',
    name: 'Mileage / Car Costs',
    shortAnswer: 'yes',
    soleTraderAnswer: 'Use HMRC mileage rates (45p/mile for first 10,000 miles, 25p thereafter) or claim actual costs. Cannot switch method once chosen for a vehicle.',
    limitedCompanyAnswer: 'The company can reimburse you at HMRC rates tax-free. Or the company can own the car — but there will be a company car BIK based on CO2 emissions and list price.',
    bikNote: 'Company car: BIK based on CO2 and list price. Mileage reimbursement at HMRC rates: no BIK.',
    examples: ['Driving to client sites', 'Business errands', 'Attending training courses'],
    commonMistakes: ['Claiming commuting miles', 'Not keeping a mileage log', 'Switching between mileage and actual costs'],
    faqs: [
      { q: 'What is the mileage rate for 2026/27?', a: '45p per mile for the first 10,000 business miles, 25p thereafter. Motorcycles: 24p. Bicycles: 20p.' },
    ],
  },
  {
    slug: 'training',
    name: 'Training / Courses',
    shortAnswer: 'yes',
    soleTraderAnswer: 'Training to update or improve existing skills for your current trade is allowable. Training to learn a new trade or profession is not.',
    limitedCompanyAnswer: 'Same rules. The company can pay for training related to the current role tax-free. Training for a new role may be a BIK.',
    bikNote: 'Work-related training: no BIK. Training for a new career: BIK may apply.',
    examples: ['CPD courses', 'Software training', 'Industry conferences', 'Professional qualifications in your field'],
    commonMistakes: ['Claiming a degree or qualification for a new career', 'Not claiming CPD courses'],
    faqs: [
      { q: 'Can I claim an MBA?', a: 'Only if it directly relates to your current trade and updates existing skills. A general MBA is unlikely to qualify.' },
    ],
  },
  {
    slug: 'subscriptions',
    name: 'Subscriptions / Software',
    shortAnswer: 'yes',
    soleTraderAnswer: 'Business software subscriptions, trade journals, and professional publications are allowable. Personal subscriptions (Netflix, Spotify) are not.',
    limitedCompanyAnswer: 'Same rules. Business subscriptions paid by the company are deductible with no BIK.',
    examples: ['Accounting software', 'Project management tools', 'Industry publications', 'LinkedIn Premium for business development'],
    commonMistakes: ['Claiming personal streaming services', 'Forgetting to claim professional memberships'],
    faqs: [
      { q: 'Can I claim Netflix?', a: 'No, unless you are a content creator who genuinely uses it for research.' },
    ],
  },
  {
    slug: 'accountant-fees',
    name: 'Accountant / Professional Fees',
    shortAnswer: 'yes',
    soleTraderAnswer: 'Accountancy, bookkeeping, and legal fees for business purposes are fully allowable.',
    limitedCompanyAnswer: 'Same. Company accountancy fees are fully deductible.',
    examples: ['Annual accounts preparation', 'Tax return preparation', 'Bookkeeping services', 'Legal advice on contracts'],
    commonMistakes: ['Not claiming accountancy fees', 'Confusing personal legal fees (not allowable) with business legal fees'],
    faqs: [
      { q: 'Can I claim legal fees for a dispute with a customer?', a: 'Yes, if the dispute relates to your business.' },
    ],
  },
  {
    slug: 'pension',
    name: 'Pension Contributions',
    shortAnswer: 'yes',
    soleTraderAnswer: 'Personal pension contributions get tax relief at your marginal rate. They are not a business expense but reduce your tax bill.',
    limitedCompanyAnswer: 'Employer pension contributions paid by the company are a deductible business expense and are not a BIK for the employee.',
    bikNote: 'Employer pension contributions: no BIK. Fully deductible for the company.',
    examples: ['Monthly employer pension contribution', 'One-off company pension contribution'],
    commonMistakes: ['Not making employer contributions through the company (more tax-efficient than personal contributions)', 'Exceeding the annual allowance (£60,000)'],
    faqs: [
      { q: 'Is it better to contribute personally or through my company?', a: 'Usually through the company. Employer contributions save corporation tax and employer NIC, making them more efficient than personal contributions.' },
    ],
  },
  {
    slug: 'client-entertainment',
    name: 'Client Entertainment',
    shortAnswer: 'no',
    soleTraderAnswer: 'Client entertaining (meals, events, gifts over £50) is not deductible for income tax purposes.',
    limitedCompanyAnswer: 'Client entertaining is not deductible for corporation tax. It is also a BIK if the company pays. Staff entertaining up to £150/head per year is exempt.',
    bikNote: 'Client entertainment paid by company: not deductible and may be a BIK.',
    examples: ['Taking a client to dinner', 'Corporate hospitality tickets', 'Client gifts over £50'],
    commonMistakes: ['Claiming client meals as a business expense', 'Confusing staff entertaining (partly allowable) with client entertaining (not allowable)'],
    faqs: [
      { q: 'Can I claim a gift to a client?', a: 'Only if it costs less than £50, carries a conspicuous advertisement for your business, and is not food, drink, tobacco or a voucher.' },
    ],
  },
  {
    slug: 'gifts',
    name: 'Business Gifts',
    shortAnswer: 'partly',
    soleTraderAnswer: 'Gifts to clients: allowable only if under £50, carry a business advertisement, and are not food, drink, tobacco or vouchers. Staff gifts: allowable up to £50 (trivial benefits).',
    limitedCompanyAnswer: 'Same rules for client gifts. Staff trivial benefits up to £50 per occasion (max £300/year for directors) are exempt from BIK.',
    bikNote: 'Trivial benefits up to £50: no BIK. Over £50 or cash: BIK applies.',
    examples: ['Branded pen or notebook under £50', 'Staff birthday gift under £50', 'Christmas gift to employee under £50'],
    commonMistakes: ['Giving cash gifts (always taxable)', 'Exceeding the £50 trivial benefit limit'],
    faqs: [
      { q: 'Can I give my employees a Christmas gift?', a: 'Yes, up to £50 per occasion as a trivial benefit. It must not be cash or a cash voucher.' },
    ],
  },
];

// ─── Sole Trader vs Ltd Decision Tree ────────────────────────────────────────
export interface DecisionNode {
  id: string;
  question: string;
  hint?: string;
  options: {
    label: string;
    value: string;
    nextId?: string;
    score?: { ltd: number; soleTrader: number };
  }[];
}

export const DECISION_TREE: DecisionNode[] = [
  {
    id: 'profit',
    question: 'What is your expected annual profit (after expenses, before tax)?',
    hint: 'This is the single biggest factor in the decision.',
    options: [
      { label: 'Under £20,000', value: 'under-20k', nextId: 'drawn', score: { ltd: 0, soleTrader: 3 } },
      { label: '£20,000–£40,000', value: '20k-40k', nextId: 'drawn', score: { ltd: 1, soleTrader: 2 } },
      { label: '£40,000–£60,000', value: '40k-60k', nextId: 'drawn', score: { ltd: 2, soleTrader: 1 } },
      { label: 'Over £60,000', value: 'over-60k', nextId: 'drawn', score: { ltd: 3, soleTrader: 0 } },
    ],
  },
  {
    id: 'drawn',
    question: 'How much of your profit do you plan to draw out of the business each year?',
    hint: 'If you leave money in the company, it can be more tax-efficient.',
    options: [
      { label: 'All of it — I need the income', value: 'all', nextId: 'liability', score: { ltd: 0, soleTrader: 2 } },
      { label: 'Most of it (75%+)', value: 'most', nextId: 'liability', score: { ltd: 1, soleTrader: 1 } },
      { label: 'About half', value: 'half', nextId: 'liability', score: { ltd: 2, soleTrader: 0 } },
      { label: 'I want to retain and reinvest most of it', value: 'retain', nextId: 'liability', score: { ltd: 3, soleTrader: 0 } },
    ],
  },
  {
    id: 'liability',
    question: 'How concerned are you about personal liability?',
    hint: 'A limited company separates your personal assets from business debts.',
    options: [
      { label: 'Not concerned — low-risk work', value: 'low', nextId: 'investment', score: { ltd: 0, soleTrader: 1 } },
      { label: 'Somewhat concerned', value: 'medium', nextId: 'investment', score: { ltd: 1, soleTrader: 0 } },
      { label: 'Very concerned — high-risk contracts or significant assets', value: 'high', nextId: 'investment', score: { ltd: 3, soleTrader: 0 } },
    ],
  },
  {
    id: 'investment',
    question: 'Do you plan to raise investment from external investors?',
    hint: 'SEIS and EIS investment is only available to limited companies.',
    options: [
      { label: 'No plans to raise investment', value: 'no', nextId: 'clients', score: { ltd: 0, soleTrader: 0 } },
      { label: 'Possibly in the future', value: 'maybe', nextId: 'clients', score: { ltd: 1, soleTrader: 0 } },
      { label: 'Yes — actively planning to raise', value: 'yes', nextId: 'clients', score: { ltd: 3, soleTrader: -2 } },
    ],
  },
  {
    id: 'clients',
    question: 'Do your clients or contracts require you to operate as a limited company?',
    options: [
      { label: 'No requirement', value: 'no', nextId: 'admin', score: { ltd: 0, soleTrader: 0 } },
      { label: 'Some clients prefer it', value: 'prefer', nextId: 'admin', score: { ltd: 1, soleTrader: 0 } },
      { label: 'Yes — required by contracts', value: 'required', nextId: 'admin', score: { ltd: 3, soleTrader: -3 } },
    ],
  },
  {
    id: 'admin',
    question: 'How do you feel about the extra administration of running a limited company?',
    hint: 'Companies House filings, payroll, annual accounts, CT600 — typically £1,800–£4,500/year in accountancy fees.',
    options: [
      { label: 'I want to keep things simple', value: 'simple', nextId: 'ir35', score: { ltd: -1, soleTrader: 2 } },
      { label: 'I am happy to deal with it', value: 'happy', nextId: 'ir35', score: { ltd: 1, soleTrader: 0 } },
      { label: 'I already have an accountant to handle it', value: 'accountant', nextId: 'ir35', score: { ltd: 2, soleTrader: 0 } },
    ],
  },
  {
    id: 'ir35',
    question: 'Do you work through contracts that could be caught by IR35 (off-payroll working rules)?',
    hint: 'If your contracts are inside IR35, a limited company offers little tax advantage.',
    options: [
      { label: 'No — I have multiple clients or am clearly self-employed', value: 'no', nextId: 'mortgage', score: { ltd: 1, soleTrader: 0 } },
      { label: 'Possibly — some contracts could be inside IR35', value: 'maybe', nextId: 'mortgage', score: { ltd: 0, soleTrader: 1 } },
      { label: 'Yes — most of my work is inside IR35', value: 'yes', nextId: 'mortgage', score: { ltd: -2, soleTrader: 2 } },
    ],
  },
  {
    id: 'mortgage',
    question: 'Are you planning to apply for a mortgage in the next 2 years?',
    hint: 'Lenders typically use 2–3 years of accounts. A new limited company can make mortgage applications harder.',
    options: [
      { label: 'No plans for a mortgage', value: 'no', nextId: null, score: { ltd: 0, soleTrader: 0 } },
      { label: 'Possibly', value: 'maybe', nextId: null, score: { ltd: -1, soleTrader: 1 } },
      { label: 'Yes — within the next 2 years', value: 'yes', nextId: null, score: { ltd: -2, soleTrader: 2 } },
    ],
  },
];
