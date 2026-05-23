'use server';

import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_EVENTS_URL = 'https://www.googleapis.com/calendar/v3/calendars';

async function getAccessToken(): Promise<string> {
  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: process.env.GOOGLE_OAUTH_CLIENT_ID || '',
    client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || '',
    refresh_token: process.env.GOOGLE_OAUTH_REFRESH_TOKEN || '',
  });

  const res = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
    cache: 'no-store',
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to get access token: ${err}`);
  }

  const data = await res.json();
  return data.access_token;
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, phone, start, end, message } = body;

  if (!name || !email || !start || !end) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  if (!process.env.GOOGLE_OAUTH_CLIENT_ID || !process.env.GOOGLE_OAUTH_CLIENT_SECRET || !process.env.GOOGLE_OAUTH_REFRESH_TOKEN) {
    return NextResponse.json({ error: 'Google Calendar not configured. Please add OAuth credentials to your environment variables.' }, { status: 503 });
  }

  try {
    const accessToken = await getAccessToken();
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';

    const event = {
      summary: `Discovery Call — ${name}`,
      description: [
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : '',
        message ? `\nMessage: ${message}` : '',
        '\nBooked via Reckonwell.com',
      ]
        .filter(Boolean)
        .join('\n'),
      start: {
        dateTime: start,
        timeZone: 'UTC',
      },
      end: {
        dateTime: end,
        timeZone: 'UTC',
      },
      attendees: [{ email }],
      sendUpdates: 'all',
    };

    const createRes = await fetch(`${GOOGLE_EVENTS_URL}/${encodeURIComponent(calendarId)}/events?sendUpdates=all`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(event),
      cache: 'no-store',
    });

    if (!createRes.ok) {
      const err = await createRes.text();
      throw new Error(`Failed to create event: ${err}`);
    }

    const eventData = await createRes.json();
    return NextResponse.json({ success: true, eventId: eventData.id, htmlLink: eventData.htmlLink });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
