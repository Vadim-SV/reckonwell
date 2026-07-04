'use server';

import { NextRequest, NextResponse } from 'next/server';

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
const OWNER_EMAIL = 'vadim.s@reckonwell.com';
const SENDER_EMAIL = 'vadim.s@reckonwell.com';
const SENDER_NAME = 'Reckonwell';

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

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { calculator_type, name, email, company, phone, recommended_tier, recommended_price, company_details, calculated_savings } = body;

  if (!name || !email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Brevo API key not configured' }, { status: 503 });
  }

  const detailsHtml = Object.entries(company_details || {})
    .map(([k, v]) => `<tr><td style="padding:8px 0;color:rgba(245,242,236,0.5);font-size:12px;text-transform:uppercase;letter-spacing:1px;width:180px;">${k.replace(/_/g, ' ')}</td><td style="padding:8px 0;color:#f5f2ec;font-size:14px;">${v}</td></tr>`)
    .join('');

  const internalHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0d0d0d;color:#f5f2ec;border:1px solid rgba(201,168,76,0.3);">
      <h2 style="color:#c9a84c;font-size:18px;margin-bottom:24px;letter-spacing:2px;text-transform:uppercase;">New Calculator Lead — ${calculator_type}</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr style="border-bottom:1px solid rgba(201,168,76,0.15);"><td style="padding:8px 0;color:rgba(245,242,236,0.5);font-size:12px;text-transform:uppercase;letter-spacing:1px;width:180px;">Name</td><td style="padding:8px 0;color:#f5f2ec;font-size:14px;">${name}</td></tr>
        <tr style="border-bottom:1px solid rgba(201,168,76,0.15);"><td style="padding:8px 0;color:rgba(245,242,236,0.5);font-size:12px;text-transform:uppercase;letter-spacing:1px;">Email</td><td style="padding:8px 0;color:#c9a84c;font-size:14px;">${email}</td></tr>
        <tr style="border-bottom:1px solid rgba(201,168,76,0.15);"><td style="padding:8px 0;color:rgba(245,242,236,0.5);font-size:12px;text-transform:uppercase;letter-spacing:1px;">Company</td><td style="padding:8px 0;color:#f5f2ec;font-size:14px;">${company || '—'}</td></tr>
        <tr style="border-bottom:1px solid rgba(201,168,76,0.15);"><td style="padding:8px 0;color:rgba(245,242,236,0.5);font-size:12px;text-transform:uppercase;letter-spacing:1px;">Phone</td><td style="padding:8px 0;color:#f5f2ec;font-size:14px;">${phone || '—'}</td></tr>
        <tr style="border-bottom:1px solid rgba(201,168,76,0.15);"><td style="padding:8px 0;color:rgba(245,242,236,0.5);font-size:12px;text-transform:uppercase;letter-spacing:1px;">Recommended Tier</td><td style="padding:8px 0;color:#c9a84c;font-size:14px;font-weight:bold;">${recommended_tier || '—'}</td></tr>
        <tr style="border-bottom:1px solid rgba(201,168,76,0.15);"><td style="padding:8px 0;color:rgba(245,242,236,0.5);font-size:12px;text-transform:uppercase;letter-spacing:1px;">Recommended Price</td><td style="padding:8px 0;color:#c9a84c;font-size:14px;font-weight:bold;">${recommended_price ? `£${recommended_price}/month` : '—'}</td></tr>
        ${calculated_savings ? `<tr style="border-bottom:1px solid rgba(201,168,76,0.15);"><td style="padding:8px 0;color:rgba(245,242,236,0.5);font-size:12px;text-transform:uppercase;letter-spacing:1px;">Calculated Savings</td><td style="padding:8px 0;color:#c9a84c;font-size:16px;font-weight:bold;">£${calculated_savings.toLocaleString()}</td></tr>` : ''}
        ${detailsHtml}
      </table>
      <p style="margin-top:24px;font-size:11px;color:rgba(245,242,236,0.3);">Submitted via Reckonwell.com — ${calculator_type} Calculator</p>
    </div>
  `;

  const confirmationHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0d0d0d;color:#f5f2ec;border:1px solid rgba(201,168,76,0.3);">
      <h2 style="color:#c9a84c;font-size:18px;margin-bottom:16px;letter-spacing:2px;text-transform:uppercase;">Your Savings Report</h2>
      <p style="color:#f5f2ec;font-size:15px;line-height:1.7;margin-bottom:16px;">Hi ${name},</p>
      <p style="color:#e8e4dc;font-size:14px;line-height:1.7;margin-bottom:16px;">Thank you for using our ${calculator_type} calculator. Here's a summary of your results:</p>
      ${recommended_tier ? `<div style="background:rgba(201,168,76,0.1);border:1px solid rgba(201,168,76,0.3);padding:20px;margin:20px 0;border-radius:4px;"><p style="color:#c9a84c;font-size:12px;letter-spacing:3px;text-transform:uppercase;margin-bottom:8px;">Recommended Plan</p><p style="color:#f5f2ec;font-size:24px;font-weight:bold;margin-bottom:4px;">${recommended_tier}</p>${recommended_price ? `<p style="color:#c9a84c;font-size:18px;">£${recommended_price}/month</p>` : ''}</div>` : ''}
      ${calculated_savings ? `<div style="background:rgba(37,99,235,0.1);border:1px solid rgba(37,99,235,0.3);padding:20px;margin:20px 0;border-radius:4px;"><p style="color:#93c5fd;font-size:12px;letter-spacing:3px;text-transform:uppercase;margin-bottom:8px;">Potential Annual Savings</p><p style="color:#f5f2ec;font-size:32px;font-weight:bold;">£${calculated_savings.toLocaleString()}</p></div>` : ''}
      <p style="color:#e8e4dc;font-size:14px;line-height:1.7;margin-bottom:24px;">Our team will review your details and send you a full breakdown with next steps within 2 hours.</p>
      <a href="https://reckonwell.com/book" style="display:inline-block;background:#c9a84c;color:#080808;padding:14px 28px;text-decoration:none;font-weight:bold;font-size:14px;letter-spacing:1px;text-transform:uppercase;border-radius:2px;">Book a Discovery Call</a>
      <p style="margin-top:32px;font-size:11px;color:rgba(245,242,236,0.3);">Reckonwell — 124 City Road, London EC1V 2NX</p>
    </div>
  `;

  try {
    await Promise.all([
      sendEmail(apiKey, {
        sender: { email: SENDER_EMAIL, name: SENDER_NAME },
        to: [{ email: OWNER_EMAIL, name: 'Reckonwell' }],
        subject: `New Calculator Lead — ${calculator_type} — ${name}`,
        htmlContent: internalHtml,
      }),
      sendEmail(apiKey, {
        sender: { email: SENDER_EMAIL, name: SENDER_NAME },
        to: [{ email, name }],
        subject: `Your ${calculator_type} Savings Report — Reckonwell`,
        htmlContent: confirmationHtml,
      }),
    ]);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
