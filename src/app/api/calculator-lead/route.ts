'use server';

import { NextRequest, NextResponse } from 'next/server';

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
const OWNER_EMAIL = 'vadim.s@reckonwell.com';
const SENDER_EMAIL = 'vadim.s@reckonwell.com';
const SENDER_NAME = 'Reckonwell';

interface BreakdownItem {
  label: string;
  amount: number;
}

async function sendEmail(apiKey: string, payload: object): Promise<void> {
  const res = await fetch(BREVO_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Brevo send email error: ${err}`);
  }
}

function fmt(n: number) {
  return `£${n.toLocaleString('en-GB')}`;
}

function breakdownRows(items: BreakdownItem[], totalLabel: string, total: number): string {
  if (items.length === 0) return '';
  const rows = items
    .map(
      item =>
        `<tr><td style="padding:8px 0;color:#f5f2ec;font-size:14px;border-bottom:1px solid rgba(201,168,76,0.1);">${item.label}</td><td style="padding:8px 0;color:#c9a84c;font-size:14px;text-align:right;border-bottom:1px solid rgba(201,168,76,0.1);">${fmt(item.amount)}</td></tr>`
    )
    .join('');
  const totalRow = `<tr><td style="padding:10px 0 4px;color:#f5f2ec;font-size:14px;font-weight:bold;">${totalLabel}</td><td style="padding:10px 0 4px;color:#c9a84c;font-size:16px;font-weight:bold;text-align:right;">${fmt(total)}</td></tr>`;
  return rows + totalRow;
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const {
    business_type,
    industry,
    is_group,
    group_company_count,
    monthly_total,
    monthly_breakdown,
    oneoff_total,
    oneoff_breakdown,
    quote_valid_until,
    quote_reference,
    name,
    email,
  } = body as {
    business_type: 'sole-trader' | 'limited-company';
    industry: string;
    is_group: boolean;
    group_company_count: number;
    monthly_total: number;
    monthly_breakdown: BreakdownItem[];
    oneoff_total: number;
    oneoff_breakdown: BreakdownItem[];
    quote_valid_until: string;
    quote_reference: string;
    name: string;
    email: string;
  };

  if (!name || !email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Brevo API key not configured' }, { status: 503 });
  }

  const validUntilFormatted = new Date(quote_valid_until).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const businessTypeLabel = business_type === 'sole-trader' ? 'Sole Trader' : 'Limited Company';
  const groupNote = is_group ? ` (Group of ${group_company_count} companies)` : '';

  // ── Internal notification email ──────────────────────────────────────────

  const internalHtml = `
    <div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;padding:28px;background:#0d0d0d;color:#f5f2ec;border:1px solid rgba(201,168,76,0.3);">
      <h2 style="color:#c9a84c;font-size:18px;margin-bottom:6px;letter-spacing:2px;text-transform:uppercase;">New Quotation Lead</h2>
      <p style="color:rgba(245,242,236,0.5);font-size:12px;margin-bottom:24px;letter-spacing:1px;">Ref: ${quote_reference}</p>

      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tr style="border-bottom:1px solid rgba(201,168,76,0.15);">
          <td style="padding:8px 0;color:rgba(245,242,236,0.5);font-size:12px;text-transform:uppercase;letter-spacing:1px;width:180px;">Name</td>
          <td style="padding:8px 0;color:#f5f2ec;font-size:14px;">${name}</td>
        </tr>
        <tr style="border-bottom:1px solid rgba(201,168,76,0.15);">
          <td style="padding:8px 0;color:rgba(245,242,236,0.5);font-size:12px;text-transform:uppercase;letter-spacing:1px;">Email</td>
          <td style="padding:8px 0;color:#c9a84c;font-size:14px;">${email}</td>
        </tr>
        <tr style="border-bottom:1px solid rgba(201,168,76,0.15);">
          <td style="padding:8px 0;color:rgba(245,242,236,0.5);font-size:12px;text-transform:uppercase;letter-spacing:1px;">Business Type</td>
          <td style="padding:8px 0;color:#f5f2ec;font-size:14px;">${businessTypeLabel}${groupNote}</td>
        </tr>
        <tr style="border-bottom:1px solid rgba(201,168,76,0.15);">
          <td style="padding:8px 0;color:rgba(245,242,236,0.5);font-size:12px;text-transform:uppercase;letter-spacing:1px;">Industry</td>
          <td style="padding:8px 0;color:#f5f2ec;font-size:14px;">${industry || '—'}</td>
        </tr>
        <tr style="border-bottom:1px solid rgba(201,168,76,0.15);">
          <td style="padding:8px 0;color:rgba(245,242,236,0.5);font-size:12px;text-transform:uppercase;letter-spacing:1px;">Monthly Total</td>
          <td style="padding:8px 0;color:#c9a84c;font-size:16px;font-weight:bold;">${fmt(monthly_total)}/month</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:rgba(245,242,236,0.5);font-size:12px;text-transform:uppercase;letter-spacing:1px;">One-Off Total</td>
          <td style="padding:8px 0;color:#c9a84c;font-size:16px;font-weight:bold;">${fmt(oneoff_total)}</td>
        </tr>
      </table>

      ${monthly_breakdown.length > 0 ? `
      <h3 style="color:#c9a84c;font-size:13px;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">Monthly Breakdown</h3>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        ${breakdownRows(monthly_breakdown, 'Monthly Total', monthly_total)}
      </table>` : ''}

      ${oneoff_breakdown.length > 0 ? `
      <h3 style="color:#c9a84c;font-size:13px;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">One-Off Breakdown</h3>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        ${breakdownRows(oneoff_breakdown, 'One-Off Total', oneoff_total)}
      </table>` : ''}

      <p style="margin-top:16px;font-size:11px;color:rgba(245,242,236,0.3);">Quote valid until: ${validUntilFormatted} · Submitted via reckonwell.com</p>
    </div>
  `;

  // ── Customer confirmation email ───────────────────────────────────────────

  const customerMonthlyRows = monthly_breakdown
    .map(
      item =>
        `<tr><td style="padding:8px 0;color:#e8e4dc;font-size:14px;border-bottom:1px solid rgba(201,168,76,0.1);">${item.label}</td><td style="padding:8px 0;color:#c9a84c;font-size:14px;text-align:right;border-bottom:1px solid rgba(201,168,76,0.1);">${fmt(item.amount)}</td></tr>`
    )
    .join('');

  const customerOneoffRows = oneoff_breakdown
    .map(
      item =>
        `<tr><td style="padding:8px 0;color:#e8e4dc;font-size:14px;border-bottom:1px solid rgba(201,168,76,0.1);">${item.label}</td><td style="padding:8px 0;color:#e8e4dc;font-size:14px;text-align:right;border-bottom:1px solid rgba(201,168,76,0.1);">${fmt(item.amount)}</td></tr>`
    )
    .join('');

  const confirmationHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:28px;background:#0d0d0d;color:#f5f2ec;border:1px solid rgba(201,168,76,0.3);">
      <h2 style="color:#c9a84c;font-size:18px;margin-bottom:6px;letter-spacing:2px;text-transform:uppercase;">Your Quotation — Reckonwell</h2>
      <p style="color:rgba(245,242,236,0.4);font-size:12px;margin-bottom:24px;">Ref: ${quote_reference}</p>

      <p style="color:#f5f2ec;font-size:15px;line-height:1.7;margin-bottom:8px;">Hi ${name},</p>
      <p style="color:#e8e4dc;font-size:14px;line-height:1.7;margin-bottom:24px;">
        Thank you for using our quotation calculator. Here is a summary of your personalised quote.
        <strong style="color:#c9a84c;">This quotation is valid for 7 days, until ${validUntilFormatted}.</strong>
        If you have any questions, please quote reference <strong style="color:#c9a84c;">${quote_reference}</strong> when you get in touch.
      </p>

      <!-- Totals summary -->
      <div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.3);padding:20px;margin-bottom:24px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:6px 0;color:rgba(245,242,236,0.5);font-size:12px;text-transform:uppercase;letter-spacing:1px;">Business Type</td>
            <td style="padding:6px 0;color:#f5f2ec;font-size:14px;text-align:right;">${businessTypeLabel}${groupNote}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:rgba(245,242,236,0.5);font-size:12px;text-transform:uppercase;letter-spacing:1px;">Monthly Total</td>
            <td style="padding:6px 0;color:#c9a84c;font-size:20px;font-weight:bold;text-align:right;">${fmt(monthly_total)}/month</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:rgba(245,242,236,0.5);font-size:12px;text-transform:uppercase;letter-spacing:1px;">One-Off Total</td>
            <td style="padding:6px 0;color:#f5f2ec;font-size:20px;font-weight:bold;text-align:right;">${fmt(oneoff_total)}</td>
          </tr>
        </table>
      </div>

      ${monthly_breakdown.length > 0 ? `
      <h3 style="color:#c9a84c;font-size:13px;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">Monthly Services</h3>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        ${customerMonthlyRows}
        <tr>
          <td style="padding:10px 0 4px;color:#f5f2ec;font-size:14px;font-weight:bold;">Monthly Total</td>
          <td style="padding:10px 0 4px;color:#c9a84c;font-size:16px;font-weight:bold;text-align:right;">${fmt(monthly_total)}/month</td>
        </tr>
      </table>` : ''}

      ${oneoff_breakdown.length > 0 ? `
      <h3 style="color:#c9a84c;font-size:13px;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">One-Off Services</h3>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        ${customerOneoffRows}
        <tr>
          <td style="padding:10px 0 4px;color:#f5f2ec;font-size:14px;font-weight:bold;">One-Off Total</td>
          <td style="padding:10px 0 4px;color:#f5f2ec;font-size:16px;font-weight:bold;text-align:right;">${fmt(oneoff_total)}</td>
        </tr>
      </table>` : ''}

      <p style="color:#e8e4dc;font-size:14px;line-height:1.7;margin-bottom:24px;">
        Ready to get started? Book a free discovery call and we&apos;ll walk you through the next steps.
      </p>
      <a href="https://reckonwell.com/book" style="display:inline-block;background:#c9a84c;color:#080808;padding:14px 28px;text-decoration:none;font-weight:bold;font-size:14px;letter-spacing:1px;text-transform:uppercase;">
        Book a Discovery Call
      </a>

      <p style="margin-top:32px;font-size:11px;color:rgba(245,242,236,0.3);">
        Reckonwell — 124 City Road, London EC1V 2NX<br/>
        This quotation was generated on ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} and is valid until ${validUntilFormatted}.
      </p>
    </div>
  `;

  try {
    await Promise.all([
      sendEmail(apiKey, {
        sender: { email: SENDER_EMAIL, name: SENDER_NAME },
        to: [{ email: OWNER_EMAIL, name: 'Reckonwell' }],
        subject: `New Quotation Lead — ${businessTypeLabel} — ${name} — ${quote_reference}`,
        htmlContent: internalHtml,
      }),
      sendEmail(apiKey, {
        sender: { email: SENDER_EMAIL, name: SENDER_NAME },
        to: [{ email, name }],
        subject: `Your Reckonwell Quotation — ${quote_reference}`,
        htmlContent: confirmationHtml,
      }),
    ]);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
