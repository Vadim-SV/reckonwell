'use client';

import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CustomCursor from '@/app/components/CustomCursor';
import Link from 'next/link';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  // 0=Sun … 6=Sat → shift so Mon=0
  let d = new Date(year, month, 1).getDay();
  return (d + 6) % 7;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function padTwo(n: number): string {
  return n.toString().padStart(2, '0');
}

function formatDisplayDate(year: number, month: number, day: number): string {
  let d = new Date(year, month, day);
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function BookPage() {
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDay = today.getDate();

  // Calendar navigation state
  const [calYear, setCalYear] = useState(todayYear);
  const [calMonth, setCalMonth] = useState(todayMonth);

  // Selected date
  const [selectedDate, setSelectedDate] = useState<{ year: number; month: number; day: number } | null>(null);

  // Time picker
  const [timeHour, setTimeHour] = useState('10');
  const [timeMinute, setTimeMinute] = useState('00');

  // Timezone
  const [timezone, setTimezone] = useState('Europe/London');

  // Form fields
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [bookingError, setBookingError] = useState('');

  // ── Calendar grid ──────────────────────────────────────────────────────────

  const daysInMonth = useMemo(() => getDaysInMonth(calYear, calMonth), [calYear, calMonth]);
  const firstDay = useMemo(() => getFirstDayOfMonth(calYear, calMonth), [calYear, calMonth]);

  const calendarCells: (number | null)[] = useMemo(() => {
    const cells: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    // pad to complete last row
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [daysInMonth, firstDay]);

  const isPast = (day: number) => {
    if (calYear < todayYear) return true;
    if (calYear === todayYear && calMonth < todayMonth) return true;
    if (calYear === todayYear && calMonth === todayMonth && day < todayDay) return true;
    return false;
  };

  const isToday = (day: number) =>
    calYear === todayYear && calMonth === todayMonth && day === todayDay;

  const isSelected = (day: number) =>
    selectedDate?.year === calYear &&
    selectedDate?.month === calMonth &&
    selectedDate?.day === day;

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
    else setCalMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
    else setCalMonth(m => m + 1);
  };

  // Prevent navigating before current month
  const canGoPrev = calYear > todayYear || (calYear === todayYear && calMonth > todayMonth);

  // ── Form ───────────────────────────────────────────────────────────────────

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const formattedSlot = selectedDate
    ? `${formatDisplayDate(selectedDate.year, selectedDate.month, selectedDate.day)} at ${padTwo(Number(timeHour))}:${padTwo(Number(timeMinute))} (${timezone})`
    : '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) return;
    setBookingStatus('submitting');
    setBookingError('');

    try {
      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'booking',
          fields: {
            name: form.name,
            email: form.email,
            phone: form.phone,
            message: form.message,
            slot: formattedSlot,
            timezone,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send booking');

      setBookingStatus('success');
    } catch (err: unknown) {
      setBookingStatus('error');
      setBookingError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  // ── Styles ─────────────────────────────────────────────────────────────────

  const inputStyle: React.CSSProperties = {
    borderColor: 'rgba(201,168,76,0.25)',
    color: 'var(--foreground)',
    fontSize: '13px',
    letterSpacing: '0.3px',
    backgroundColor: 'transparent',
  };

  const inputClass =
    'w-full border rounded-none px-4 py-3 text-sm outline-none transition-colors duration-200 placeholder-[var(--muted)] focus:border-[var(--primary)]';

  // ── Render ─────────────────────────────────────────────────────────────────

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
            Pick a date and time that works for you. We&apos;ll spend 30 minutes understanding your situation and showing you how Reckonwell works.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="relative py-12 md:py-20 px-6 md:px-10" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-5xl mx-auto">

          {bookingStatus === 'success' ? (
            /* ── Success State ── */
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
                Request Received
              </p>
              <h2 className="section-h2-medium mb-4" style={{ fontSize: '26px' }}>
                Thank you, {form.name.split(' ')[0]}.
              </h2>
              <p className="font-ui mb-4" style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: '1.7' }}>
                Your preferred time: <span style={{ color: 'var(--foreground)' }}>{formattedSlot}</span>
              </p>
              <p className="font-ui mb-8" style={{ color: 'var(--muted)', fontSize: '13px' }}>
                We&apos;ll be in touch at <span style={{ color: 'var(--foreground)' }}>{form.email}</span> to confirm.
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
            /* ── Form ── */
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

                {/* ── Left: Calendar + Time ── */}
                <div>
                  {/* Step label */}
                  <p
                    className="font-ui mb-6"
                    style={{ fontSize: '10px', letterSpacing: '3px', color: 'var(--primary)', textTransform: 'uppercase' }}
                  >
                    01 — Select a Date &amp; Time
                  </p>

                  {/* Calendar */}
                  <div
                    style={{
                      border: '1px solid rgba(201,168,76,0.2)',
                      background: 'rgba(201,168,76,0.02)',
                      padding: '24px',
                    }}
                  >
                    {/* Month navigation */}
                    <div className="flex items-center justify-between mb-5">
                      <button
                        type="button"
                        onClick={prevMonth}
                        disabled={!canGoPrev}
                        aria-label="Previous month"
                        style={{
                          color: canGoPrev ? 'var(--primary)' : 'rgba(201,168,76,0.2)',
                          background: 'none',
                          border: 'none',
                          cursor: canGoPrev ? 'pointer' : 'default',
                          fontSize: '18px',
                          lineHeight: 1,
                          padding: '4px 8px',
                        }}
                      >
                        ‹
                      </button>

                      <p
                        className="font-ui"
                        style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--foreground)' }}
                      >
                        {MONTH_NAMES[calMonth]} {calYear}
                      </p>

                      <button
                        type="button"
                        onClick={nextMonth}
                        aria-label="Next month"
                        style={{
                          color: 'var(--primary)',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '18px',
                          lineHeight: 1,
                          padding: '4px 8px',
                        }}
                      >
                        ›
                      </button>
                    </div>

                    {/* Day-of-week headers */}
                    <div className="grid grid-cols-7 mb-2">
                      {DAY_LABELS.map(d => (
                        <div
                          key={d}
                          className="text-center font-ui"
                          style={{ fontSize: '9px', letterSpacing: '1.5px', color: 'rgba(245,242,236,0.3)', padding: '4px 0', textTransform: 'uppercase' }}
                        >
                          {d}
                        </div>
                      ))}
                    </div>

                    {/* Calendar cells */}
                    <div className="grid grid-cols-7 gap-y-1">
                      {calendarCells.map((day, idx) => {
                        if (day === null) {
                          return <div key={`empty-${idx}`} />;
                        }

                        const past = isPast(day);
                        const today_ = isToday(day);
                        const sel = isSelected(day);

                        return (
                          <button
                            key={`day-${day}`}
                            type="button"
                            disabled={past}
                            onClick={() => !past && setSelectedDate({ year: calYear, month: calMonth, day })}
                            style={{
                              background: sel
                                ? 'rgba(201,168,76,0.18)'
                                : 'transparent',
                              border: sel
                                ? '1px solid rgba(201,168,76,0.6)'
                                : today_
                                ? '1px solid rgba(201,168,76,0.3)'
                                : '1px solid transparent',
                              color: past
                                ? 'rgba(245,242,236,0.15)'
                                : sel
                                ? '#c9a84c'
                                : today_
                                ? 'var(--foreground)'
                                : 'rgba(245,242,236,0.75)',
                              cursor: past ? 'default' : 'pointer',
                              fontSize: '13px',
                              fontFamily: 'var(--font-ui, Arial, sans-serif)',
                              padding: '7px 0',
                              textAlign: 'center',
                              transition: 'all 0.15s',
                              width: '100%',
                            }}
                            onMouseEnter={e => {
                              if (!past && !sel) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(201,168,76,0.07)';
                            }}
                            onMouseLeave={e => {
                              if (!sel) (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                            }}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Picker */}
                  <div className="mt-6">
                    <p
                      className="font-ui mb-3"
                      style={{ fontSize: '10px', letterSpacing: '2px', color: 'rgba(245,242,236,0.5)', textTransform: 'uppercase' }}
                    >
                      Preferred Time
                    </p>
                    <div className="flex items-center gap-3">
                      {/* Hour */}
                      <div style={{ flex: 1 }}>
                        <select
                          value={timeHour}
                          onChange={e => setTimeHour(e.target.value)}
                          style={{
                            ...inputStyle,
                            width: '100%',
                            padding: '12px 16px',
                            border: '1px solid rgba(201,168,76,0.25)',
                            appearance: 'none',
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23c9a84c' opacity='0.6'/%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 12px center',
                            paddingRight: '32px',
                            cursor: 'pointer',
                          }}
                          aria-label="Hour"
                        >
                          {Array.from({ length: 24 }, (_, i) => (
                            <option key={i} value={padTwo(i)} style={{ background: '#0d0d0d' }}>
                              {padTwo(i)}
                            </option>
                          ))}
                        </select>
                      </div>

                      <span style={{ color: 'var(--primary)', fontSize: '18px', fontWeight: 300 }}>:</span>

                      {/* Minute */}
                      <div style={{ flex: 1 }}>
                        <select
                          value={timeMinute}
                          onChange={e => setTimeMinute(e.target.value)}
                          style={{
                            ...inputStyle,
                            width: '100%',
                            padding: '12px 16px',
                            border: '1px solid rgba(201,168,76,0.25)',
                            appearance: 'none',
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23c9a84c' opacity='0.6'/%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 12px center',
                            paddingRight: '32px',
                            cursor: 'pointer',
                          }}
                          aria-label="Minute"
                        >
                          {['00', '15', '30', '45'].map(m => (
                            <option key={m} value={m} style={{ background: '#0d0d0d' }}>
                              {m}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Timezone Selector */}
                    <div className="mt-4">
                      <p
                        className="font-ui mb-2"
                        style={{ fontSize: '10px', letterSpacing: '2px', color: 'rgba(245,242,236,0.5)', textTransform: 'uppercase' }}
                      >
                        Your Timezone
                      </p>
                      <select
                        value={timezone}
                        onChange={e => setTimezone(e.target.value)}
                        aria-label="Timezone"
                        style={{
                          ...inputStyle,
                          width: '100%',
                          padding: '12px 16px',
                          border: '1px solid rgba(201,168,76,0.25)',
                          appearance: 'none',
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23c9a84c' opacity='0.6'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 12px center',
                          paddingRight: '32px',
                          cursor: 'pointer',
                        }}
                      >
                        <optgroup label="Europe" style={{ background: '#0d0d0d' }}>
                          <option value="Europe/London" style={{ background: '#0d0d0d' }}>London (GMT/BST)</option>
                          <option value="Europe/Dublin" style={{ background: '#0d0d0d' }}>Dublin (GMT/IST)</option>
                          <option value="Europe/Paris" style={{ background: '#0d0d0d' }}>Paris / Berlin (CET/CEST)</option>
                          <option value="Europe/Amsterdam" style={{ background: '#0d0d0d' }}>Amsterdam (CET/CEST)</option>
                          <option value="Europe/Madrid" style={{ background: '#0d0d0d' }}>Madrid (CET/CEST)</option>
                          <option value="Europe/Rome" style={{ background: '#0d0d0d' }}>Rome (CET/CEST)</option>
                          <option value="Europe/Warsaw" style={{ background: '#0d0d0d' }}>Warsaw (CET/CEST)</option>
                          <option value="Europe/Kyiv" style={{ background: '#0d0d0d' }}>Kyiv (EET/EEST)</option>
                          <option value="Europe/Moscow" style={{ background: '#0d0d0d' }}>Moscow (MSK)</option>
                          <option value="Europe/Istanbul" style={{ background: '#0d0d0d' }}>Istanbul (TRT)</option>
                        </optgroup>
                        <optgroup label="Americas" style={{ background: '#0d0d0d' }}>
                          <option value="America/New_York" style={{ background: '#0d0d0d' }}>New York (ET)</option>
                          <option value="America/Chicago" style={{ background: '#0d0d0d' }}>Chicago (CT)</option>
                          <option value="America/Denver" style={{ background: '#0d0d0d' }}>Denver (MT)</option>
                          <option value="America/Los_Angeles" style={{ background: '#0d0d0d' }}>Los Angeles (PT)</option>
                          <option value="America/Toronto" style={{ background: '#0d0d0d' }}>Toronto (ET)</option>
                          <option value="America/Vancouver" style={{ background: '#0d0d0d' }}>Vancouver (PT)</option>
                          <option value="America/Sao_Paulo" style={{ background: '#0d0d0d' }}>São Paulo (BRT)</option>
                          <option value="America/Mexico_City" style={{ background: '#0d0d0d' }}>Mexico City (CST)</option>
                        </optgroup>
                        <optgroup label="Asia / Pacific" style={{ background: '#0d0d0d' }}>
                          <option value="Asia/Dubai" style={{ background: '#0d0d0d' }}>Dubai (GST)</option>
                          <option value="Asia/Kolkata" style={{ background: '#0d0d0d' }}>India (IST)</option>
                          <option value="Asia/Singapore" style={{ background: '#0d0d0d' }}>Singapore (SGT)</option>
                          <option value="Asia/Tokyo" style={{ background: '#0d0d0d' }}>Tokyo (JST)</option>
                          <option value="Asia/Shanghai" style={{ background: '#0d0d0d' }}>Shanghai / Beijing (CST)</option>
                          <option value="Asia/Hong_Kong" style={{ background: '#0d0d0d' }}>Hong Kong (HKT)</option>
                          <option value="Australia/Sydney" style={{ background: '#0d0d0d' }}>Sydney (AEST/AEDT)</option>
                          <option value="Pacific/Auckland" style={{ background: '#0d0d0d' }}>Auckland (NZST/NZDT)</option>
                        </optgroup>
                        <optgroup label="Africa / Middle East" style={{ background: '#0d0d0d' }}>
                          <option value="Africa/Johannesburg" style={{ background: '#0d0d0d' }}>Johannesburg (SAST)</option>
                          <option value="Africa/Cairo" style={{ background: '#0d0d0d' }}>Cairo (EET)</option>
                          <option value="Asia/Riyadh" style={{ background: '#0d0d0d' }}>Riyadh (AST)</option>
                        </optgroup>
                      </select>
                    </div>

                    {/* Selected summary */}
                    {selectedDate && (
                      <div
                        className="mt-4 px-4 py-3"
                        style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)' }}
                      >
                        <p className="font-ui" style={{ fontSize: '11px', color: 'var(--primary)', letterSpacing: '0.5px' }}>
                          {formattedSlot}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* ── Right: Contact Details ── */}
                <div>
                  <p
                    className="font-ui mb-6"
                    style={{ fontSize: '10px', letterSpacing: '3px', color: 'var(--primary)', textTransform: 'uppercase' }}
                  >
                    02 — Your Details
                  </p>

                  <div className="flex flex-col gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="font-ui block mb-2"
                        style={{ fontSize: '10px', letterSpacing: '2px', color: 'rgba(245,242,236,0.5)', textTransform: 'uppercase' }}
                      >
                        Full Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your full name"
                        value={form.name}
                        onChange={handleFormChange}
                        className={inputClass}
                        style={inputStyle}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="font-ui block mb-2"
                        style={{ fontSize: '10px', letterSpacing: '2px', color: 'rgba(245,242,236,0.5)', textTransform: 'uppercase' }}
                      >
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={handleFormChange}
                        className={inputClass}
                        style={inputStyle}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="font-ui block mb-2"
                        style={{ fontSize: '10px', letterSpacing: '2px', color: 'rgba(245,242,236,0.5)', textTransform: 'uppercase' }}
                      >
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+44 7700 000000"
                        value={form.phone}
                        onChange={handleFormChange}
                        className={inputClass}
                        style={inputStyle}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="font-ui block mb-2"
                        style={{ fontSize: '10px', letterSpacing: '2px', color: 'rgba(245,242,236,0.5)', textTransform: 'uppercase' }}
                      >
                        Anything you&apos;d like us to know?
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        placeholder="Tell us a bit about your business or what you'd like to discuss…"
                        value={form.message}
                        onChange={handleFormChange}
                        className={inputClass}
                        style={{ ...inputStyle, resize: 'none' }}
                      />
                    </div>

                    {/* Error */}
                    {bookingStatus === 'error' && (
                      <p
                        className="font-ui"
                        style={{ fontSize: '12px', color: '#e05c5c', letterSpacing: '0.3px' }}
                      >
                        {bookingError}
                      </p>
                    )}

                    {/* Validation hint */}
                    {!selectedDate && (
                      <p
                        className="font-ui"
                        style={{ fontSize: '11px', color: 'rgba(245,242,236,0.3)', letterSpacing: '0.3px' }}
                      >
                        Please select a date on the calendar to continue.
                      </p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={bookingStatus === 'submitting' || !selectedDate}
                      className="btn-primary w-full mt-2"
                      style={{
                        opacity: !selectedDate || bookingStatus === 'submitting' ? 0.5 : 1,
                        cursor: !selectedDate || bookingStatus === 'submitting' ? 'not-allowed' : 'pointer',
                        fontSize: '11px',
                        letterSpacing: '3px',
                        padding: '14px 32px',
                      }}
                    >
                      {bookingStatus === 'submitting' ? 'Sending…' : 'Request This Time'}
                    </button>

                    <p
                      className="font-ui text-center"
                      style={{ fontSize: '11px', color: 'rgba(245,242,236,0.25)', letterSpacing: '0.3px' }}
                    >
                      We&apos;ll confirm your booking by email within one business day.
                    </p>
                  </div>
                </div>

              </div>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
