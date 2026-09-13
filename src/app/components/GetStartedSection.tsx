'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { trackEvent } from '@/lib/analytics';


const serviceFitOptions = [
  {
    id: 'daily',
    label: 'Stay ahead of daily finances',
    recommendation: 'Personalised daily oversight keeps your cash, transactions and overdue invoices visible every working day.',
    cta: 'Discuss tailored oversight',
    ctaHref: '#personalised-proactive',
  },
  {
    id: 'function',
    label: 'Build my finance function',
    recommendation: 'We bring bookkeeping, management reporting and FD-level support together under one roof — start with what you need now.',
    cta: 'Explore your finance team',
    ctaHref: '#finance-function',
  },
  {
    id: 'capital',
    label: 'Raise growth capital',
    recommendation: 'We build the model, forecasts and materials behind the raise, and can make relevant introductions through our network.',
    cta: 'Discuss funding support',
    ctaHref: '#fundraising-capital',
  },
];

const complianceServices = [
  {
    label: 'Making Tax Digital',
    description: 'MTD-compliant bookkeeping and VAT filing.',
    href: '/mtd-calculator',
  },
  {
    label: 'Self Assessment',
    description: 'Personal tax returns for directors and sole traders.',
    href: '/self-assessment-calculator',
  },
  {
    label: 'R&D Tax Relief',
    description: 'Identify and claim eligible R&D expenditure.',
    href: '/rd-tax-relief-calculator',
  },
  {
    label: 'Final Accounts & CT600',
    description: 'Year-end accounts and corporation tax filing.',
    href: '/final-accounts-ct600-calculator',
  },
];

export default function GetStartedSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const formRef = useRef<HTMLDivElement>(null);

  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Listen for prefill events from section CTAs
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as string;
      setSelectedService(detail);
      // Scroll to form
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    };
    window.addEventListener('prefill-service', handler);
    return () => window.removeEventListener('prefill-service', handler);
  }, []);

  const handleServiceSelect = (id: string) => {
    setSelectedService(id === selectedService ? null : id);
    const option = serviceFitOptions.find((o) => o.id === id);
    if (option) {
      setForm((prev) => ({
        ...prev,
        message: prev.message || `I am interested in: ${option.label}`,
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    trackEvent('homepage_contact_form_submit_attempt', { page: 'home' });

    try {
      const fields: Record<string, string> = {
        'a1b2c3d4-0002-4000-8000-000000000002': form.name,
        'a1b2c3d4-0003-4000-8000-000000000003': form.phone,
        'a1b2c3d4-0004-4000-8000-000000000004': form.email,
        'a1b2c3d4-0005-4000-8000-000000000005': form.message,
      };

      const payload = {
        formId: 'eqYAj0',
        fields: Object.entries(fields).map(([key, value]) => ({ uuid: key, value })),
      };

      const res = await fetch('https://api.tally.so/forms/eqYAj0/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TALLY_API_KEY}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Submission failed (${res.status})`);

      await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'callback',
          fields: { name: form.name, phone: form.phone, email: form.email, message: form.message },
        }),
      });

      trackEvent('homepage_contact_form_submitted', { page: 'home' });
      setStatus('success');
      setForm({ name: '', phone: '', email: '', message: '' });
      setSelectedService(null);
    } catch (err: unknown) {
      setStatus('error');
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      trackEvent('homepage_contact_form_error', { error: msg, page: 'home' });
      setErrorMsg(msg);
    }
  };

  const inputBase =
    'w-full bg-transparent border rounded-none px-4 py-3 text-sm font-ui outline-none transition-colors duration-200 placeholder-[var(--muted)]';
  const inputStyle = {
    borderColor: 'var(--border)',
    color: 'var(--foreground)',
    fontSize: '13px',
    letterSpacing: '0.3px',
  };
  const inputFocusClass = 'focus:border-[var(--primary)]';

  const selectedOption = serviceFitOptions.find((o) => o.id === selectedService);

  return null;
}
