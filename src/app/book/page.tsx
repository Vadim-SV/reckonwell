'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CustomCursor from '@/app/components/CustomCursor';
import Link from 'next/link';

interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}

const DAYS_AHEAD = 14;

function getNextWorkdays(count: number): string[] {
  const days: string[] = [];
  const today = new Date();
  let d = new Date(today);
  d.setDate(d.getDate() + 1); // start from tomorrow

  while (days.length < count) {
    const dow = d.getDay();
    if (dow !== 0 && dow !== 6) {
      days.push(d.toISOString().split('T')[0]);
    }
    d.setDate(d.getDate() + 1);
  }
  return days;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00Z');
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
}

function formatTime(isoStr: string): string {
  const d = new Date(isoStr);
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
}

function formatFullDateTime(start: string, end: string): string {
  const s = new Date(start);
  const e = new Date(end);
  const date = s.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  const startT = s.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
  const endT = e.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
  return `${date} · ${startT}–${endT} UTC`;
}

export default function BookPage() {
  const workdays = getNextWorkdays(DAYS_AHEAD);
  const [selectedDate, setSelectedDate] = useState<string>(workdays[0]);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  // Booking form
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [bookingError, setBookingError] = useState('');

  const fetchSlots = useCallback(async (date: string) => {
    setLoadingSlots(true);
    setSlotsError('');
    setSlots([]);
    setSelectedSlot(null);
    try {
      const res = await fetch(`/api/calendar/slots?date=${date}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load slots');
      setSlots(data.slots || []);
    } catch (err: unknown) {
      setSlotsError(err instanceof Error ? err.message : 'Failed to load availability');
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  useEffect(() => {
    fetchSlots(selectedDate);
  }, [selectedDate, fetchSlots]);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    setBookingStatus('idle');
  };

  const handleSlotSelect = (slot: TimeSlot) => {
    if (!slot.available) return;
    setSelectedSlot(slot);
    setBookingStatus('idle');
    setBookingError('');
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;
    setBookingStatus('submitting');
    setBookingError('');

    try {
      const res = await fetch('/api/calendar/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          start: selectedSlot.start,
          end: selectedSlot.end,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Booking failed');

      // Send email notification via Brevo
      await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'booking',
          fields: {
            name: form.name,
            email: form.email,
            phone: form.phone,
            message: form.message,
            slot: formatFullDateTime(selectedSlot.start, selectedSlot.end),
          },
        }),
      });

      setBookingStatus('success');
    } catch (err: unknown) {
      setBookingStatus('error');
      setBookingError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  const inputBase =
    'w-full bg-transparent border rounded-none px-4 py-3 text-sm font-ui outline-none transition-colors duration-200 placeholder-[var(--muted)] focus:border-[var(--primary)]';
  const inputStyle = {
    borderColor: 'rgba(201,168,76,0.25)',
    color: 'var(--foreground)',
    fontSize: '13px',
    letterSpacing: '0.3px',
  };

  return (
    <main className="relative overflow-x-hidden" style={{ backgroundColor: 'var(--background)' }}>
      <CustomCursor />
      <Header />

      {/* Hero */}
      <section
        className="relative pt-36 pb-16 px-6 md:px-10 overflow-hidden"
        style={{ backgroundColor: 'var(--background)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(201,168,76,0.08) 0%, rgba(201,168,76,0.02) 55%, transparent 100%)',
          }}
        />
        <div className="gold-vertical-line-left" aria-hidden="true" />
        <div className="gold-vertical-line-right" aria-hidden="true" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <p className="section-label mb-6">Book a Discovery Call</p>
          <h1 className="section-h2 mb-5">
            Let&apos;s talk about
            <br />
            <span className="gold-italic">your finances.</span>
          </h1>
          <p
            className="pull-quote mx-auto"
            style={{ maxWidth: '480px', color: 'rgba(245,242,236,0.6)' }}
          >
            Select a time that works for you. We&apos;ll spend 30 minutes understanding your situation and showing you how Reckonwell works.
          </p>
        </div>
      </section>

      {/* Booking UI */}
      <section className="relative py-12 md:py-20 px-6 md:px-10" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-5xl mx-auto">

          {bookingStatus === 'success' ? (
            <div
              className="max-w-xl mx-auto py-12 px-6 md:px-8 text-center"
              style={{ border: '1px solid rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.04)' }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)' }}
              >
                <span style={{ color: 'var(--primary)', fontSize: '20px' }}>✓</span>
              </div>
              <p
                className="font-ui mb-3"
                style={{ color: 'var(--primary)', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase' }}
              >
                Booking Confirmed
              </p>
              <h2 className="section-h2-medium mb-4" style={{ fontSize: '26px' }}>
                See you soon, {form.name.split(' ')[0]}.
              </h2>
              {selectedSlot && (
                <p className="font-ui mb-6" style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: '1.7' }}>
                  {formatFullDateTime(selectedSlot.start, selectedSlot.end)}
                </p>
              )}
              <p className="font-ui mb-8" style={{ color: 'var(--muted)', fontSize: '13px' }}>
                A calendar invite has been sent to <span style={{ color: 'var(--foreground)' }}>{form.email}</span>.
              </p>
              <Link
                href="/"
                className="btn-ghost inline-block"
                style={{ fontSize: '10px', letterSpacing: '2px', padding: '10px 28px' }}
              >
                Back to Home
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

              {/* Left — Date & Time Picker */}
              <div>
                {/* Step label */}
                <p
                  className="font-ui mb-6"
                  style={{ fontSize: '10px', letterSpacing: '3px', color: 'var(--primary)', textTransform: 'uppercase' }}
                >
                  01 — Select a Date
                </p>

                {/* Date strip — scrollable on mobile */}
                <div className="flex flex-wrap gap-2 mb-10">
                  {workdays.map((day) => {
                    const isSelected = day === selectedDate;
                    return (
                      <button
                        key={day}
                        onClick={() => handleDateSelect(day)}
                        className="font-ui transition-all duration-200"
                        style={{
                          padding: '8px 12px',
                          fontSize: '11px',
                          letterSpacing: '1px',
                          border: isSelected
                            ? '1px solid var(--primary)'
                            : '1px solid rgba(201,168,76,0.2)',
                          color: isSelected ? 'var(--primary)' : 'var(--muted)',
                          background: isSelected ? 'rgba(201,168,76,0.08)' : 'transparent',
                          cursor: 'pointer',
                          flexShrink: 0,
                        }}
                      >
                        {formatDate(day)}
                      </button>
                    );
                  })}
                </div>

                {/* Step label */}
                <p
                  className="font-ui mb-5"
                  style={{ fontSize: '10px', letterSpacing: '3px', color: 'var(--primary)', textTransform: 'uppercase' }}
                >
                  02 — Select a Time
                </p>

                {/* Slots */}
                {loadingSlots ? (
                  <div className="flex items-center gap-3 py-6">
                    <div
                      className="w-4 h-4 rounded-full animate-pulse"
                      style={{ background: 'rgba(201,168,76,0.4)' }}
                    />
                    <span className="font-ui" style={{ fontSize: '12px', color: 'var(--muted)', letterSpacing: '1px' }}>
                      Loading availability…
                    </span>
                  </div>
                ) : slotsError ? (
                  <div
                    className="py-5 px-5"
                    style={{ border: '1px solid rgba(201,168,76,0.15)', background: 'rgba(201,168,76,0.03)' }}
                  >
                    <p className="font-ui" style={{ fontSize: '12px', color: '#e57373' }}>
                      {slotsError}
                    </p>
                    <p className="font-ui mt-2" style={{ fontSize: '11px', color: 'var(--muted)' }}>
                      Please add your Google OAuth credentials to the environment variables to enable live availability.
                    </p>
                  </div>
                ) : slots.length === 0 ? (
                  <p className="font-ui" style={{ fontSize: '13px', color: 'var(--muted)' }}>
                    No available slots for this day.
                  </p>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {slots.map((slot) => {
                      const isSelected =
                        selectedSlot?.start === slot.start && selectedSlot?.end === slot.end;
                      return (
                        <button
                          key={slot.start}
                          onClick={() => handleSlotSelect(slot)}
                          disabled={!slot.available}
                          className="font-ui transition-all duration-200"
                          style={{
                            padding: '9px 6px',
                            fontSize: '12px',
                            letterSpacing: '0.5px',
                            border: isSelected
                              ? '1px solid var(--primary)'
                              : slot.available
                              ? '1px solid rgba(201,168,76,0.2)'
                              : '1px solid rgba(255,255,255,0.05)',
                            color: isSelected
                              ? 'var(--primary)'
                              : slot.available
                              ? 'var(--foreground)'
                              : 'rgba(255,255,255,0.2)',
                            background: isSelected
                              ? 'rgba(201,168,76,0.1)'
                              : 'transparent',
                            cursor: slot.available ? 'pointer' : 'not-allowed',
                            textDecoration: !slot.available ? 'line-through' : 'none',
                          }}
                        >
                          {formatTime(slot.start)}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Duration note */}
                <p
                  className="font-ui mt-6"
                  style={{ fontSize: '11px', color: 'var(--muted-foreground)', letterSpacing: '0.5px' }}
                >
                  All times shown in UTC · 30-minute call
                </p>
              </div>

              {/* Right — Booking Form */}
              <div>
                <p
                  className="font-ui mb-6"
                  style={{ fontSize: '10px', letterSpacing: '3px', color: 'var(--primary)', textTransform: 'uppercase' }}
                >
                  03 — Your Details
                </p>

                {!selectedSlot ? (
                  <div
                    className="py-10 px-6 text-center"
                    style={{ border: '1px solid rgba(201,168,76,0.1)', background: 'rgba(201,168,76,0.02)' }}
                  >
                    <p className="font-ui" style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: '1.7' }}>
                      Select a date and time above to continue.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Selected slot summary */}
                    <div
                      className="mb-6 px-5 py-4"
                      style={{ border: '1px solid rgba(201,168,76,0.25)', background: 'rgba(201,168,76,0.05)' }}
                    >
                      <p
                        className="font-ui"
                        style={{ fontSize: '10px', letterSpacing: '2px', color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '4px' }}
                      >
                        Selected Time
                      </p>
                      <p className="font-ui" style={{ fontSize: '13px', color: 'var(--foreground)' }}>
                        {formatFullDateTime(selectedSlot.start, selectedSlot.end)}
                      </p>
                    </div>

                    <form onSubmit={handleBook} className="flex flex-col gap-4">
                      {/* Name */}
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="book-name"
                          className="font-ui"
                          style={{ fontSize: '10px', letterSpacing: '2px', color: 'var(--muted)', textTransform: 'uppercase' }}
                        >
                          Full Name <span style={{ color: 'var(--primary)' }}>*</span>
                        </label>
                        <input
                          id="book-name"
                          name="name"
                          type="text"
                          required
                          placeholder="Your full name"
                          value={form.name}
                          onChange={handleFormChange}
                          className={inputBase}
                          style={inputStyle}
                        />
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="book-email"
                          className="font-ui"
                          style={{ fontSize: '10px', letterSpacing: '2px', color: 'var(--muted)', textTransform: 'uppercase' }}
                        >
                          Email Address <span style={{ color: 'var(--primary)' }}>*</span>
                        </label>
                        <input
                          id="book-email"
                          name="email"
                          type="email"
                          required
                          placeholder="your@email.com"
                          value={form.email}
                          onChange={handleFormChange}
                          className={inputBase}
                          style={inputStyle}
                        />
                      </div>

                      {/* Phone */}
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="book-phone"
                          className="font-ui"
                          style={{ fontSize: '10px', letterSpacing: '2px', color: 'var(--muted)', textTransform: 'uppercase' }}
                        >
                          Phone Number
                        </label>
                        <input
                          id="book-phone"
                          name="phone"
                          type="tel"
                          placeholder="+44 or +1 number"
                          value={form.phone}
                          onChange={handleFormChange}
                          className={inputBase}
                          style={inputStyle}
                        />
                      </div>

                      {/* Message */}
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="book-message"
                          className="font-ui"
                          style={{ fontSize: '10px', letterSpacing: '2px', color: 'var(--muted)', textTransform: 'uppercase' }}
                        >
                          Anything we should know?
                        </label>
                        <textarea
                          id="book-message"
                          name="message"
                          rows={3}
                          placeholder="Brief description of your situation…"
                          value={form.message}
                          onChange={handleFormChange}
                          className={`${inputBase} resize-none`}
                          style={inputStyle}
                        />
                      </div>

                      {bookingStatus === 'error' && (
                        <p className="font-ui" style={{ fontSize: '12px', color: '#e57373' }}>
                          {bookingError}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={bookingStatus === 'submitting'}
                        className="btn-gold mt-2"
                        style={{ opacity: bookingStatus === 'submitting' ? 0.6 : 1 }}
                      >
                        {bookingStatus === 'submitting' ? 'Confirming…' : 'Confirm Booking'}
                      </button>

                      <p
                        className="font-ui text-center"
                        style={{ fontSize: '11px', color: 'var(--muted-foreground)', letterSpacing: '0.3px' }}
                      >
                        A calendar invite will be sent to your email address.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* What to expect */}
      {bookingStatus !== 'success' && (
        <section
          className="py-16 md:py-24 px-6 md:px-10"
          style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}
        >
          <div className="max-w-4xl mx-auto">
            <p className="section-label mb-10 text-center">What to Expect</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  num: '01',
                  title: 'We listen first',
                  body: "Tell us about your business, your current setup, and what's keeping you up at night.",
                },
                {
                  num: '02',
                  title: 'We show you how it works',
                  body: 'A clear walkthrough of how Reckonwell handles your finances — daily, not just at month end.',
                },
                {
                  num: '03',
                  title: 'No pressure, ever',
                  body: "We'll give you a tailored quote. No hard sell. You decide if it's the right fit.",
                },
              ].map((item) => (
                <div
                  key={item.num}
                  className="px-6 py-7"
                  style={{ border: '1px solid rgba(201,168,76,0.12)', background: 'rgba(201,168,76,0.02)' }}
                >
                  <p
                    className="font-ui mb-4"
                    style={{ fontSize: '10px', letterSpacing: '3px', color: 'rgba(201,168,76,0.5)', textTransform: 'uppercase' }}
                  >
                    {item.num}
                  </p>
                  <p
                    className="font-display mb-3"
                    style={{ fontSize: '18px', color: 'var(--foreground)', fontWeight: 400 }}
                  >
                    {item.title}
                  </p>
                  <p className="font-ui" style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: '1.75' }}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
