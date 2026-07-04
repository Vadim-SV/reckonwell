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
        className="relative pt-24 sm:pt-32 md:pt-36 pb-10 md:pb-16 px-5 md:px-10 overflow-hidden"
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
          <p className="section-label mb-4 md:mb-6">Book a Discovery Call</p>
          <h1 className="section-h2 mb-4 md:mb-5">
            Let&apos;s talk about
            <br />
            <span className="gold-italic">your finances.</span>
          </h1>
          <p
            className="pull-quote mx-auto text-sm md:text-base"
            style={{ maxWidth: '480px', color: 'rgba(245,242,236,0.6)' }}
          >
            Pick a date and time that works for you. We&apos;ll spend 30 minutes understanding your situation and showing you how Reckonwell works.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="relative py-8 md:py-20 px-4 sm:px-6 md:px-10" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-5xl mx-auto">

          {bookingStatus === 'success' ? (
            /* ── Success State ── */
            <div
              className="max-w-xl mx-auto py-10 px-5 md:px-8 text-center"
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

                {/* ── Left: Calendar + Time ── */}
                <div>
                  {/* Step label */}
                  <p
                    className="font-ui mb-4 md:mb-6"
                    style={{ fontSize: '10px', letterSpacing: '3px', color: 'var(--primary)', textTransform: 'uppercase' }}
                  >
                    Step 1 of 2
                  </p>

                  {/* Calendar */}
                  <div
                    className="border rounded-none p-6 md:p-8"
                    style={{ borderColor: 'rgba(201,168,76,0.2)', backgroundColor: 'rgba(201,168,76,0.02)' }}
                  >
                    {/* Month/Year Header */}
                    <div className="flex items-center justify-between mb-6">
                      <button
                        type="button"
                        onClick={prevMonth}
                        disabled={!canGoPrev}
                        className="text-sm font-ui transition-opacity"
                        style={{ color: canGoPrev ? 'var(--primary)' : 'var(--muted)', opacity: canGoPrev ? 1 : 0.5, cursor: canGoPrev ? 'pointer' : 'not-allowed' }}
                      >
                        ← Prev
                      </button>
                      <h3 className="font-ui text-sm font-semibold" style={{ color: 'var(--foreground)', letterSpacing: '1px' }}>
                        {MONTH_NAMES[calMonth]} {calYear}
                      </h3>
                      <button
                        type="button"
                        onClick={nextMonth}
                        className="text-sm font-ui transition-colors"
                        style={{ color: 'var(--primary)', cursor: 'pointer' }}
                      >
                        Next →
                      </button>
                    </div>

                    {/* Day labels */}
                    <div className="grid grid-cols-7 gap-2 mb-4">
                      {DAY_LABELS.map((label) => (
                        <div key={label} className="text-center font-ui text-xs" style={{ color: 'var(--muted)', letterSpacing: '0.5px' }}>
                          {label}
                        </div>
                      ))}
                    </div>

                    {/* Calendar grid */}
                    <div className="grid grid-cols-7 gap-2 mb-6">
                      {calendarCells.map((day, idx) => {
                        const isDisabled = day === null || isPast(day);
                        const isSelectedDay = !isDisabled && isSelected(day);
                        const isTodayDay = !isDisabled && isToday(day);

                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => !isDisabled && setSelectedDate({ year: calYear, month: calMonth, day: day! })}
                            disabled={isDisabled}
                            className="aspect-square rounded-none text-xs font-ui transition-all"
                            style={{
                              backgroundColor: isSelectedDay ? 'var(--primary)' : isTodayDay ? 'rgba(201,168,76,0.15)' : 'transparent',
                              color: isSelectedDay ? '#080808' : 'var(--foreground)',
                              border: isTodayDay ? '1px solid var(--primary)' : '1px solid transparent',
                              cursor: isDisabled ? 'not-allowed' : 'pointer',
                              opacity: isDisabled ? 0.3 : 1,
                              fontWeight: isSelectedDay || isTodayDay ? 600 : 400,
                            }}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>

                    {/* Time picker */}
                    {selectedDate && (
                      <div>
                        <p className="font-ui text-xs mb-3" style={{ color: 'var(--muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                          Time
                        </p>
                        <div className="flex gap-2 mb-4">
                          <input
                            type="number"
                            min="0"
                            max="23"
                            value={timeHour}
                            onChange={(e) => setTimeHour(e.target.value.padStart(2, '0'))}
                            className={inputClass}
                            style={inputStyle}
                          />
                          <span style={{ color: 'var(--foreground)', fontSize: '18px', fontWeight: 300 }}>:</span>
                          <input
                            type="number"
                            min="0"
                            max="59"
                            value={timeMinute}
                            onChange={(e) => setTimeMinute(e.target.value.padStart(2, '0'))}
                            className={inputClass}
                            style={inputStyle}
                          />
                        </div>

                        {/* Timezone */}
                        <p className="font-ui text-xs mb-3" style={{ color: 'var(--muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                          Timezone
                        </p>
                        <select
                          value={timezone}
                          onChange={(e) => setTimezone(e.target.value)}
                          className={inputClass}
                          style={inputStyle}
                        >
                          <option value="Europe/London">Europe/London (GMT/BST)</option>
                          <option value="America/New_York">America/New_York (EST/EDT)</option>
                          <option value="America/Chicago">America/Chicago (CST/CDT)</option>
                          <option value="America/Denver">America/Denver (MST/MDT)</option>
                          <option value="America/Los_Angeles">America/Los_Angeles (PST/PDT)</option>
                          <option value="Europe/Paris">Europe/Paris (CET/CEST)</option>
                          <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                          <option value="Australia/Sydney">Australia/Sydney (AEDT/AEST)</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>

                {/* ── Right: Contact Form ── */}
                <div>
                  {/* Step label */}
                  <p
                    className="font-ui mb-4 md:mb-6"
                    style={{ fontSize: '10px', letterSpacing: '3px', color: 'var(--primary)', textTransform: 'uppercase' }}
                  >
                    Step 2 of 2
                  </p>

                  {/* Form fields */}
                  <div className="space-y-4 mb-6">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full name"
                      value={form.name}
                      onChange={handleFormChange}
                      className={inputClass}
                      style={inputStyle}
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      value={form.email}
                      onChange={handleFormChange}
                      className={inputClass}
                      style={inputStyle}
                      required
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone number (optional)"
                      value={form.phone}
                      onChange={handleFormChange}
                      className={inputClass}
                      style={inputStyle}
                    />
                    <textarea
                      name="message"
                      placeholder="Tell us about your business (optional)"
                      value={form.message}
                      onChange={handleFormChange}
                      className={inputClass}
                      style={{ ...inputStyle, minHeight: '120px', resize: 'none' }}
                    />
                  </div>

                  {/* Error message */}
                  {bookingStatus === 'error' && (
                    <div
                      className="mb-4 p-3 rounded-none text-sm"
                      style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)', color: '#dc2626', border: '1px solid rgba(220, 38, 38, 0.3)' }}
                    >
                      {bookingError}
                    </div>
                  )}

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={!selectedDate || bookingStatus === 'submitting'}
                    className="w-full font-ui text-xs font-semibold uppercase tracking-widest transition-all"
                    style={{
                      backgroundColor: selectedDate ? 'var(--primary)' : 'var(--muted)',
                      color: selectedDate ? '#080808' : 'var(--foreground)',
                      padding: '14px 24px',
                      border: 'none',
                      cursor: selectedDate ? 'pointer' : 'not-allowed',
                      opacity: selectedDate ? 1 : 0.5,
                    }}
                    onMouseEnter={(e) => {
                      if (selectedDate) e.currentTarget.style.backgroundColor = '#DDB96A';
                    }}
                    onMouseLeave={(e) => {
                      if (selectedDate) e.currentTarget.style.backgroundColor = 'var(--primary)';
                    }}
                  >
                    {bookingStatus === 'submitting' ? 'Booking...' : 'Confirm Booking'}
                  </button>
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
