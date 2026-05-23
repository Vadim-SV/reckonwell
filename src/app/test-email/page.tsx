'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface TestResult {
  status: 'idle' | 'loading' | 'success' | 'error';
  httpStatus?: number;
  body?: Record<string, unknown>;
  timestamp?: string;
  durationMs?: number;
}

const DEFAULT_FORM = {
  firstName: 'Test',
  lastName: 'Partner',
  email: '',
  phone: '+44 7700 900000',
  role: 'Business Consultant',
  network: 'Testing Brevo email templates end-to-end',
};

export default function TestEmailPage() {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [result, setResult] = useState<TestResult>({ status: 'idle' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const runTest = async () => {
    if (!form.email) {
      alert('Please enter a recipient email address to receive the confirmation email.');
      return;
    }

    setResult({ status: 'loading' });
    const start = Date.now();

    try {
      const res = await fetch('/api/referral-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const duration = Date.now() - start;
      const body = await res.json();

      setResult({
        status: res.ok ? 'success' : 'error',
        httpStatus: res.status,
        body,
        timestamp: new Date().toISOString(),
        durationMs: duration,
      });
    } catch (err: unknown) {
      const duration = Date.now() - start;
      setResult({
        status: 'error',
        body: { error: err instanceof Error ? err.message : 'Network error' },
        timestamp: new Date().toISOString(),
        durationMs: duration,
      });
    }
  };

  const statusColor = {
    idle: '#888',
    loading: '#c9a84c',
    success: '#4caf50',
    error: '#e07070',
  }[result.status];

  const statusLabel = {
    idle: '— Awaiting test',
    loading: '⏳ Sending…',
    success: `✅ Success (HTTP ${result.httpStatus})`,
    error: `❌ Failed (HTTP ${result.httpStatus ?? 'N/A'})`,
  }[result.status];

  return (
    <div style={{ backgroundColor: '#080808', minHeight: '100vh', fontFamily: 'Arial, sans-serif', color: '#f0ede4', padding: '40px 24px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <Link href="/" style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', textDecoration: 'none' }}>
            ← Back to Home
          </Link>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '32px', fontWeight: 400, color: '#f0ede4', margin: '20px 0 8px' }}>
            RECKON<span style={{ color: '#c9a84c' }}>WELL</span>
          </h1>
          <p style={{ fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: '#c9a84c', margin: '0 0 4px' }}>
            Email Template Test Console
          </p>
          <p style={{ fontSize: '13px', color: 'rgba(245,242,236,0.45)', margin: 0, lineHeight: 1.6 }}>
            Submits the partner application API and triggers both Brevo emails in real time.
            Enter your own email below to receive the confirmation email.
          </p>
        </div>

        {/* Gold divider */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)', marginBottom: '40px' }} />

        {/* What gets sent */}
        <div style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.2)', borderLeft: '3px solid #c9a84c', padding: '20px 24px', marginBottom: '32px' }}>
          <p style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#c9a84c', margin: '0 0 12px' }}>What this test triggers</p>
          <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: '13px', color: 'rgba(245,242,236,0.7)', lineHeight: 2 }}>
            <li><strong style={{ color: '#f0ede4' }}>Confirmation email</strong> → sent to the email address you enter below</li>
            <li><strong style={{ color: '#f0ede4' }}>Internal notification</strong> → sent to vadim.s@reckonwell.com</li>
            <li><strong style={{ color: '#f0ede4' }}>Brevo contact</strong> → applicant added / updated in Brevo CRM</li>
          </ul>
        </div>

        {/* Form */}
        <div style={{ background: '#0d0d0d', border: '1px solid rgba(201,168,76,0.2)', padding: '32px', marginBottom: '32px' }}>
          <p style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#c9a84c', margin: '0 0 24px' }}>Test Payload</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            {([['firstName', 'First Name'], ['lastName', 'Last Name']] as const).map(([field, label]) => (
              <div key={field}>
                <label style={{ display: 'block', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)', marginBottom: '6px' }}>{label}</label>
                <input
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.2)', color: '#f0ede4', padding: '10px 12px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            ))}
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#c9a84c', marginBottom: '6px' }}>
              Recipient Email <span style={{ color: '#e07070' }}>*</span> <span style={{ color: 'rgba(245,242,236,0.35)', textTransform: 'none', letterSpacing: 0 }}>(confirmation email sent here)</span>
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.35)', color: '#f0ede4', padding: '10px 12px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            {([['phone', 'Phone (optional)'], ['role', 'Role / Type']] as const).map(([field, label]) => (
              <div key={field}>
                <label style={{ display: 'block', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)', marginBottom: '6px' }}>{label}</label>
                <input
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.2)', color: '#f0ede4', padding: '10px 12px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            ))}
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)', marginBottom: '6px' }}>Network / Notes</label>
            <input
              name="network"
              value={form.network}
              onChange={handleChange}
              style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.2)', color: '#f0ede4', padding: '10px 12px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <button
            onClick={runTest}
            disabled={result.status === 'loading'}
            style={{
              width: '100%',
              background: result.status === 'loading' ? 'rgba(201,168,76,0.4)' : '#c9a84c',
              color: '#080808',
              border: 'none',
              padding: '16px',
              fontSize: '11px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              fontWeight: 700,
              cursor: result.status === 'loading' ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
            }}
          >
            {result.status === 'loading' ? 'Sending Emails…' : 'Send Test Emails →'}
          </button>
        </div>

        {/* Result panel */}
        <div style={{ background: '#0d0d0d', border: `1px solid ${statusColor}40`, padding: '28px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <p style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#c9a84c', margin: 0 }}>API Response</p>
            <span style={{ fontSize: '12px', color: statusColor, fontWeight: 600 }}>{statusLabel}</span>
          </div>

          {result.status === 'idle' && (
            <p style={{ fontSize: '13px', color: 'rgba(245,242,236,0.3)', margin: 0, fontStyle: 'italic' }}>
              Response will appear here after you send the test.
            </p>
          )}

          {result.status !== 'idle' && result.body && (
            <>
              <pre style={{
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.06)',
                padding: '16px',
                fontSize: '12px',
                color: result.status === 'success' ? '#a8d8a8' : '#e07070',
                overflowX: 'auto',
                margin: '0 0 16px',
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}>
                {JSON.stringify(result.body, null, 2)}
              </pre>

              <div style={{ display: 'flex', gap: '24px', fontSize: '11px', color: 'rgba(245,242,236,0.35)' }}>
                {result.timestamp && <span>Sent at: {new Date(result.timestamp).toLocaleTimeString()}</span>}
                {result.durationMs !== undefined && <span>Duration: {result.durationMs}ms</span>}
              </div>
            </>
          )}

          {result.status === 'success' && (
            <div style={{ marginTop: '20px', background: 'rgba(76,175,80,0.08)', border: '1px solid rgba(76,175,80,0.25)', borderLeft: '3px solid #4caf50', padding: '16px 20px' }}>
              <p style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#4caf50', margin: '0 0 8px' }}>Next Steps</p>
              <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: '13px', color: 'rgba(245,242,236,0.6)', lineHeight: 2 }}>
                <li>Check <strong style={{ color: '#f0ede4' }}>{form.email}</strong> inbox for the confirmation email</li>
                <li>Check <strong style={{ color: '#f0ede4' }}>vadim.s@reckonwell.com</strong> inbox for the internal notification</li>
                <li>Check spam/junk folders if emails don&apos;t appear within 2 minutes</li>
                <li>Verify the Brevo contact was created at <a href="https://app.brevo.com/contact/list" target="_blank" rel="noopener noreferrer" style={{ color: '#c9a84c' }}>app.brevo.com/contact/list</a></li>
              </ul>
            </div>
          )}

          {result.status === 'error' && result.body && (
            <div style={{ marginTop: '20px', background: 'rgba(224,112,112,0.08)', border: '1px solid rgba(224,112,112,0.25)', borderLeft: '3px solid #e07070', padding: '16px 20px' }}>
              <p style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#e07070', margin: '0 0 8px' }}>Troubleshooting</p>
              <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: '13px', color: 'rgba(245,242,236,0.6)', lineHeight: 2 }}>
                <li>Confirm <strong style={{ color: '#f0ede4' }}>BREVO_API_KEY</strong> is set in environment variables</li>
                <li>Verify the sender domain <strong style={{ color: '#f0ede4' }}>reckonwell.com</strong> is authenticated in Brevo</li>
                <li>Check <a href="https://app.brevo.com/security/authorised_ips" target="_blank" rel="noopener noreferrer" style={{ color: '#c9a84c' }}>Brevo IP allowlist</a> if you see an IP error</li>
                <li>Review the error message above for specific Brevo API details</li>
              </ul>
            </div>
          )}
        </div>

        {/* Footer note */}
        <p style={{ fontSize: '11px', color: 'rgba(245,242,236,0.2)', textAlign: 'center', marginTop: '32px', lineHeight: 1.6 }}>
          This page is for internal testing only. Remove or restrict access before going to production.
        </p>
      </div>
    </div>
  );
}
