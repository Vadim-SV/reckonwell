'use server';

import { NextRequest, NextResponse } from 'next/server';
import {
  referralConfirmationEmail,
  referralNotificationEmail,
} from '@/lib/emailTemplates';

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
const BREVO_CONTACTS_URL = 'https://api.brevo.com/v3/contacts';
const OWNER_EMAIL = 'vadim.s@reckonwell.com';
const SENDER_EMAIL = 'vadim.s@reckonwell.com';
const SENDER_NAME = 'Reckonwell';

interface ApplicationFields {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: string;
  network?: string;
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

async function addBrevoContact(apiKey: string, fields: ApplicationFields): Promise<void> {
  const res = await fetch(BREVO_CONTACTS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify({
      email: fields.email,
      attributes: {
        FIRSTNAME: fields.firstName,
        LASTNAME: fields.lastName,
        SMS: fields.phone || '',
      },
      updateEnabled: true,
    }),
    cache: 'no-store',
  });

  // 204 = already exists and updated, 201 = created — both are fine
  if (!res.ok && res.status !== 204) {
    const err = await res.text();
    // Non-fatal: log but don't throw — email sending is the priority
    console.warn(`Brevo add contact warning (${res.status}): ${err}`);
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { firstName, lastName, email, phone, role, network } = body as ApplicationFields;

  if (!firstName || !lastName || !email || !role) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Brevo API key not configured' }, { status: 503 });
  }

  const fullName = `${firstName} ${lastName}`;

  // ── 1. Add / update contact in Brevo CRM ──
  await addBrevoContact(apiKey, { firstName, lastName, email, phone, role, network });

  // ── 2. Confirmation email to applicant ──
  const confirmationHtml = referralConfirmationEmail({ firstName, fullName, email, phone, role, network });

  // ── 3. Internal notification email to Vadim ──
  const notificationHtml = referralNotificationEmail({ firstName, fullName, email, phone, role, network });

  try {
    // Send both emails in parallel
    await Promise.all([
      sendEmail(apiKey, {
        sender: { email: SENDER_EMAIL, name: SENDER_NAME },
        to: [{ email, name: fullName }],
        replyTo: { email: OWNER_EMAIL, name: SENDER_NAME },
        subject: 'Your Reckonwell Partner Application — Received',
        htmlContent: confirmationHtml,
      }),
      sendEmail(apiKey, {
        sender: { email: SENDER_EMAIL, name: SENDER_NAME },
        to: [{ email: OWNER_EMAIL, name: 'Reckonwell' }],
        replyTo: { email, name: fullName },
        subject: `New Partner Application — ${fullName} (${role})`,
        htmlContent: notificationHtml,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
