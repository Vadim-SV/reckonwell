'use server';

import { NextRequest, NextResponse } from 'next/server';
import {
  callbackConfirmationEmail,
  callbackNotificationEmail,
} from '@/lib/emailTemplates';

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
  const { type, fields } = body;

  if (!type || !fields) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Brevo API key not configured' }, { status: 503 });
  }

  try {
    if (type === 'callback') {
      const data = {
        name: fields.name || 'there',
        email: fields.email || '',
        phone: fields.phone || '',
        message: fields.message || '',
      };

      const emailsToSend: Promise<void>[] = [
        // Internal notification to Vadim — always sent
        sendEmail(apiKey, {
          sender: { email: SENDER_EMAIL, name: SENDER_NAME },
          to: [{ email: OWNER_EMAIL, name: 'Reckonwell' }],
          subject: `New Callback Request — ${data.name}`,
          htmlContent: callbackNotificationEmail(data),
        }),
      ];

      // Confirmation to the enquirer — only if they provided an email
      if (data.email) {
        emailsToSend.push(
          sendEmail(apiKey, {
            sender: { email: SENDER_EMAIL, name: SENDER_NAME },
            to: [{ email: data.email, name: data.name }],
            subject: 'We\'ve received your callback request — Reckonwell',
            htmlContent: callbackConfirmationEmail(data),
          })
        );
      }

      await Promise.all(emailsToSend);
      return NextResponse.json({ success: true });
    }

    if (type === 'booking') {
      // Booking notification — internal only (calendar invite handles user confirmation)
      const subject = `New Discovery Call Booking — ${fields.name || 'Unknown'}`;
      const htmlContent = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0d0d0d;color:#f5f2ec;border:1px solid rgba(201,168,76,0.3);">
          <h2 style="color:#c9a84c;font-size:18px;margin-bottom:24px;letter-spacing:2px;text-transform:uppercase;">New Discovery Call Booking</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr style="border-bottom:1px solid rgba(201,168,76,0.15);">
              <td style="padding:10px 0;color:rgba(245,242,236,0.5);font-size:12px;width:140px;text-transform:uppercase;letter-spacing:1px;">Full Name</td>
              <td style="padding:10px 0;color:#f5f2ec;font-size:14px;">${fields.name || '—'}</td>
            </tr>
            <tr style="border-bottom:1px solid rgba(201,168,76,0.15);">
              <td style="padding:10px 0;color:rgba(245,242,236,0.5);font-size:12px;text-transform:uppercase;letter-spacing:1px;">Email</td>
              <td style="padding:10px 0;color:#f5f2ec;font-size:14px;">${fields.email || '—'}</td>
            </tr>
            <tr style="border-bottom:1px solid rgba(201,168,76,0.15);">
              <td style="padding:10px 0;color:rgba(245,242,236,0.5);font-size:12px;text-transform:uppercase;letter-spacing:1px;">Phone</td>
              <td style="padding:10px 0;color:#f5f2ec;font-size:14px;">${fields.phone || '—'}</td>
            </tr>
            <tr style="border-bottom:1px solid rgba(201,168,76,0.15);">
              <td style="padding:10px 0;color:rgba(245,242,236,0.5);font-size:12px;text-transform:uppercase;letter-spacing:1px;">Requested Time</td>
              <td style="padding:10px 0;color:#c9a84c;font-size:14px;font-weight:bold;">${fields.slot || '—'}</td>
            </tr>
            <tr style="border-bottom:1px solid rgba(201,168,76,0.15);">
              <td style="padding:10px 0;color:rgba(245,242,236,0.5);font-size:12px;text-transform:uppercase;letter-spacing:1px;">Timezone</td>
              <td style="padding:10px 0;color:#f5f2ec;font-size:14px;">${fields.timezone || '—'}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:rgba(245,242,236,0.5);font-size:12px;text-transform:uppercase;letter-spacing:1px;vertical-align:top;">Message</td>
              <td style="padding:10px 0;color:#f5f2ec;font-size:14px;line-height:1.6;">${fields.message || '—'}</td>
            </tr>
          </table>
          <p style="margin-top:24px;font-size:11px;color:rgba(245,242,236,0.3);">Submitted via Reckonwell.com — Book a Discovery Call</p>
        </div>
      `;

      await sendEmail(apiKey, {
        sender: { email: SENDER_EMAIL, name: SENDER_NAME },
        to: [{ email: OWNER_EMAIL, name: 'Reckonwell' }],
        subject,
        htmlContent,
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Unknown notification type' }, { status: 400 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
