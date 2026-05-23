'use server';

import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_FREEBUSY_URL = 'https://www.googleapis.com/calendar/v3/freeBusy';

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

// Generate potential 30-min slots for a given date (Mon-Fri, 9am-5pm UK time)
function getPotentialSlots(dateStr: string): { start: string; end: string }[] {
  const slots: { start: string; end: string }[] = [];
  const date = new Date(dateStr + 'T00:00:00Z');
  const dayOfWeek = new Date(dateStr + 'T09:00:00Z').getUTCDay();

  // Skip weekends
  if (dayOfWeek === 0 || dayOfWeek === 6) return slots;

  // 9am - 5pm in UTC (approximating UK business hours)
  for (let hour = 9; hour < 17; hour++) {
    for (const min of [0, 30]) {
      const start = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), hour, min, 0));
      const end = new Date(start.getTime() + 30 * 60 * 1000);
      if (end.getUTCHours() <= 17) {
        slots.push({
          start: start.toISOString(),
          end: end.toISOString(),
        });
      }
    }
  }
  return slots;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const dateStr = searchParams.get('date');

  if (!dateStr) {
    return NextResponse.json({ error: 'date parameter required (YYYY-MM-DD)' }, { status: 400 });
  }

  // Check env vars
  if (!process.env.GOOGLE_OAUTH_CLIENT_ID || !process.env.GOOGLE_OAUTH_CLIENT_SECRET || !process.env.GOOGLE_OAUTH_REFRESH_TOKEN) {
    // Return mock slots if not configured yet
    const mockSlots = getPotentialSlots(dateStr).slice(0, 6).map(s => ({ ...s, available: true }));
    return NextResponse.json({ slots: mockSlots, configured: false });
  }

  try {
    const accessToken = await getAccessToken();

    const date = new Date(dateStr + 'T00:00:00Z');
    const timeMin = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0)).toISOString();
    const timeMax = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 23, 59, 59)).toISOString();

    const freeBusyRes = await fetch(GOOGLE_FREEBUSY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        timeMin,
        timeMax,
        timeZone: 'UTC',
        items: [{ id: process.env.GOOGLE_CALENDAR_ID || 'primary' }],
      }),
      cache: 'no-store',
    });

    if (!freeBusyRes.ok) {
      const err = await freeBusyRes.text();
      throw new Error(`FreeBusy API error: ${err}`);
    }

    const freeBusyData = await freeBusyRes.json();
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';
    const busyPeriods: { start: string; end: string }[] =
      freeBusyData.calendars?.[calendarId]?.busy || [];

    const potentialSlots = getPotentialSlots(dateStr);

    const availableSlots = potentialSlots.map((slot) => {
      const slotStart = new Date(slot.start).getTime();
      const slotEnd = new Date(slot.end).getTime();

      const isBusy = busyPeriods.some((busy) => {
        const busyStart = new Date(busy.start).getTime();
        const busyEnd = new Date(busy.end).getTime();
        return slotStart < busyEnd && slotEnd > busyStart;
      });

      return { ...slot, available: !isBusy };
    });

    return NextResponse.json({ slots: availableSlots, configured: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
