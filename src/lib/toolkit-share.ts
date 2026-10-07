/**
 * Toolkit sharing and analytics utilities
 */

import { trackEvent } from './analytics';

export const TOOLKIT_TOOLS = [
  {
    slug: 'salary-vs-dividend-calculator',
    title: 'Salary vs Dividend Calculator',
    question: "What\'s the most tax-efficient way to pay myself?",
    description: 'Find the optimal salary/dividend split for 2026/27 and see your exact take-home pay.',
    icon: '💷',
    shortUrl: '/salary-dividend',
    shareText: 'Found a free calculator that shows the best salary/dividend split for 2026/27 — worth checking:',
  },
  {
    slug: 'sole-trader-vs-limited-company',
    title: 'Sole Trader vs Limited Company',
    question: 'Should I be a sole trader or set up a limited company?',
    description: 'Decision tree + calculator comparing take-home pay and tax under both structures.',
    icon: '🏢',
    shortUrl: '/sole-trader-vs-ltd',
    shareText: 'Free tool that helps you decide: sole trader or limited company? Includes a decision tree and tax comparison:',
  },
  {
    slug: 'corporation-tax-calculator',
    title: 'Corporation Tax Calculator',
    question: 'How much corporation tax will my company pay?',
    description: 'Calculate CT with marginal relief, payment deadlines, and associated company rules.',
    icon: '📊',
    shortUrl: '/corp-tax',
    shareText: 'Free UK corporation tax calculator with marginal relief for 2026/27:',
  },
  {
    slug: 'working-capital-calculator',
    title: 'Working Capital Calculator',
    question: 'How much cash is tied up in my business?',
    description: 'Calculate working capital, cash conversion cycle, and see how to free up cash.',
    icon: '💰',
    shortUrl: '/working-capital',
    shareText: 'Free working capital calculator — shows how much cash is tied up in your business and how to free it:',
  },
  {
    slug: 'uk-tax-residence-checker',
    title: 'UK Tax Residence Checker',
    question: "Moving to or leaving the UK — what\'s my tax position?",
    description: 'Statutory Residence Test, FIG regime eligibility, IHT tail, and key dates.',
    icon: '🌍',
    shortUrl: '/uk-tax-residence',
    shareText: 'Free UK tax residence checker — covers the Statutory Residence Test and FIG regime for 2026/27:',
  },
  {
    slug: 'tax-relief-finder',
    title: 'Tax Relief Finder',
    question: 'Which tax reliefs can my business claim?',
    description: 'Questionnaire matching your business to all available UK tax reliefs for 2026/27.',
    icon: '🔍',
    shortUrl: '/tax-reliefs',
    shareText: 'Free UK tax relief finder — tells you every relief your business could claim:',
  },
  {
    slug: 'allowable-expenses-finder',
    title: 'Allowable Expenses Finder',
    question: 'What can I claim as a business expense?',
    description: 'Tailored expense checklist for your profession and structure, with tax saving estimates.',
    icon: '🧾',
    shortUrl: '/can-i-claim',
    shareText: 'Free UK allowable expenses checker — tailored to your profession and business structure:',
  },
  {
    slug: 'vat-scheme-calculator',
    title: 'VAT Scheme Calculator',
    question: 'Do I need to register for VAT, and which scheme saves most?',
    description: 'Compare standard, flat rate, and cash accounting VAT schemes for your business.',
    icon: '📋',
    shortUrl: '/vat',
    shareText: 'Free VAT scheme calculator — compares flat rate vs standard VAT for your business:',
  },
];

// ─── URL State Encoding ───────────────────────────────────────────────────────

export function encodeToolState(params: Record<string, string | number | boolean>): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    searchParams.set(key, String(value));
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

export function buildShareUrl(toolSlug: string, params: Record<string, string | number | boolean>, utmSource?: string): string {
  const base = `https://reckonwell.com/toolkit/${toolSlug}`;
  const toolParams = encodeToolState(params);
  const utmParams = utmSource ? `utm_source=${utmSource}&utm_medium=share&utm_campaign=toolkit` : '';
  const allParams = [toolParams, utmParams].filter(Boolean).join('&');
  return allParams ? `${base}?${allParams}` : base;
}

// ─── UTM Parameters ───────────────────────────────────────────────────────────

export function addUTM(url: string, source: string, medium: string = 'share', campaign: string = 'toolkit'): string {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}utm_source=${source}&utm_medium=${medium}&utm_campaign=${campaign}`;
}

// ─── Share Actions ────────────────────────────────────────────────────────────

export function shareToLinkedIn(url: string, toolSlug: string): void {
  const utmUrl = addUTM(url, 'linkedin');
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(utmUrl)}`, '_blank', 'width=600,height=500');
  trackEvent('result_shared', { channel: 'linkedin', tool: toolSlug });
}

export function shareToX(url: string, text: string, toolSlug: string): void {
  const utmUrl = addUTM(url, 'x-twitter');
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(utmUrl)}`, '_blank', 'width=600,height=400');
  trackEvent('result_shared', { channel: 'x', tool: toolSlug });
}

export function shareToWhatsApp(url: string, text: string, toolSlug: string): void {
  const utmUrl = addUTM(url, 'whatsapp');
  window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + utmUrl)}`, '_blank');
  trackEvent('result_shared', { channel: 'whatsapp', tool: toolSlug });
}

export function shareByEmail(url: string, subject: string, body: string, toolSlug: string): void {
  const utmUrl = addUTM(url, 'email');
  window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body + '\n\n' + utmUrl)}`;
  trackEvent('result_shared', { channel: 'email', tool: toolSlug });
}

export async function copyToClipboard(url: string, toolSlug: string): Promise<boolean> {
  const utmUrl = addUTM(url, 'copy-link');
  try {
    await navigator.clipboard.writeText(utmUrl);
    trackEvent('result_shared', { channel: 'copy-link', tool: toolSlug });
    return true;
  } catch {
    return false;
  }
}

// ─── Embed Code ───────────────────────────────────────────────────────────────

export function getEmbedCode(toolSlug: string, options: { width?: string; height?: string; theme?: 'light' | 'dark' } = {}): string {
  const { width = '100%', height = '700', theme = 'light' } = options;
  const utmUrl = addUTM(`https://reckonwell.com/embed/${toolSlug}`, 'embed', 'embed', 'toolkit-embed');
  return `<iframe
  src="${utmUrl}&theme=${theme}"
  width="${width}"
  height="${height}"
  frameborder="0"
  style="border:none;border-radius:4px;"
  title="${TOOLKIT_TOOLS.find(t => t.slug === toolSlug)?.title ?? 'Reckonwell Calculator'}"
  loading="lazy"
></iframe>
<p style="font-size:12px;color:#666;margin-top:4px;">
  Powered by <a href="https://reckonwell.com/toolkit/${toolSlug}?utm_source=embed&utm_medium=backlink&utm_campaign=toolkit-embed" target="_blank" rel="noopener">Reckonwell</a>
</p>`;
}

// ─── Analytics Events ─────────────────────────────────────────────────────────

export function trackToolStarted(toolSlug: string): void {
  trackEvent('tool_started', { tool: toolSlug });
}

export function trackToolCompleted(toolSlug: string): void {
  trackEvent('tool_completed', { tool: toolSlug });
}

export function trackPdfDownloaded(toolSlug: string): void {
  trackEvent('pdf_downloaded', { tool: toolSlug });
}

export function trackEmbedCodeCopied(toolSlug: string): void {
  trackEvent('embed_code_copied', { tool: toolSlug });
}

export function trackCtaClicked(toolSlug: string, ctaLabel: string): void {
  trackEvent('cta_clicked', { tool: toolSlug, cta_label: ctaLabel });
}

// ─── Formatting helpers ───────────────────────────────────────────────────────

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(amount);
}

export function formatPercent(rate: number, decimals: number = 1): string {
  return `${(rate * 100).toFixed(decimals)}%`;
}
