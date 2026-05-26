'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { trackEvent } from '@/lib/analytics';

/* ─── Scroll-reveal hook ─── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {if (entry.isIntersecting) {setVisible(true);obs.disconnect();}},
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0, className = '' }: {children: React.ReactNode;delay?: number;className?: string;}) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`
      }}>

      {children}
    </div>);

}

/* ─── FAQ data ─── */
const faqs = [
{
  q: 'How exactly is the 10% calculated?',
  a: 'The commission is 10% of the net monthly fee that Reckonwell invoices the referred client. If their monthly plan is £3,000, you receive £300 — every month for as long as they remain a client.'
},
{
  q: 'Is there a minimum number of referrals I need to make?',
  a: 'No. One successful referral already makes you a partner and begins your commission stream. There are no quotas, no annual targets, and no penalties for inactivity.'
},
{
  q: 'What happens if the client upgrades or expands their plan?',
  a: 'Your commission grows with them. If a client you referred starts at £2,000/month and later scales to £6,000/month, your monthly payment increases accordingly — automatically.'
},
{
  q: 'How and when do I get paid?',
  a: 'Commissions are calculated at month-end and transferred to your nominated bank account within 5 business days. You receive a detailed statement showing each client and the corresponding payment.'
},
{
  q: "What if my referral doesn't convert straight away?",
  a: 'Your referral is permanently linked to your partner account from the moment of introduction. If the company signs up six months later, you still receive full commission — there is no expiry on attribution.'
},
{
  q: 'Do I need to be a UK resident or have a UK business?',
  a: 'Partners can be based anywhere, but referred clients must be UK-registered businesses as Reckonwell operates under UK accountancy regulations. International partners are paid via bank transfer or a payment platform of mutual agreement.'
}];


/* ─── Earnings rows ─── */
const earningsRows = [
{ fee: '£1,500/mo', cut: '£150', annual: '£1,800', threeYear: '£5,400' },
{ fee: '£3,000/mo', cut: '£300', annual: '£3,600', threeYear: '£10,800' },
{ fee: '£5,000/mo', cut: '£500', annual: '£6,000', threeYear: '£18,000' },
{ fee: '£10,000/mo', cut: '£1,000', annual: '£12,000', threeYear: '£36,000' }];


/* ─── Who-it's-for cards ─── */
const partnerCards = [
{ emoji: '💼', title: 'Business Consultants & Advisors', body: 'You work inside businesses every day. When finance is broken, you feel it. Now you can fix it — and get paid a recurring fee for the introduction.' },
{ emoji: '🏦', title: 'Finance Brokers & IFAs', body: 'Your clients trust you with their money. Extending that trust to their back-office accounting is a natural step — and a new income stream that requires zero ongoing effort.' },
{ emoji: '⚖️', title: 'Solicitors & Legal Professionals', body: 'Corporate clients, restructurings, acquisitions — you regularly see businesses that need a better finance function. Refer them and earn for years.' },
{ emoji: '🚀', title: 'Startup Ecosystem Players', body: 'Accelerators, angel investors, co-working spaces, startup coaches — your portfolio companies need solid accounting. Become the partner who delivers it.' },
{ emoji: '🤝', title: 'HR & Payroll Specialists', body: 'You already manage the people side of the payroll. Connect us with your clients and let Reckonwell own the finance side — everybody wins.' },
{ emoji: '🌐', title: 'Anyone with the Right Network', body: 'If you regularly talk to business owners and they trust your word, you already have everything you need to become a Reckonwell partner.' }];


/* ─── Main Page ─── */
export default function ReferralsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', role: '', network: '' });
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  /* ─── Section view tracking ─── */
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const trackedSections = useRef<Set<string>>(new Set());

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const sections = [
    { id: 'hero', label: 'Hero' },
    { id: 'reward', label: 'Reward Callout' },
    { id: 'how-works', label: 'How It Works' },
    { id: 'who-its-for', label: 'Who Its For' },
    { id: 'earnings', label: 'Earnings Table' },
    { id: 'apply', label: 'Application Form' },
    { id: 'faq', label: 'FAQ' }];


    sections.forEach(({ id, label }) => {
      const el = id === 'hero' || id === 'reward' || id === 'who-its-for' ?
      sectionRefs.current[id] :
      document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !trackedSections.current.has(id)) {
            trackedSections.current.add(id);
            trackEvent('referral_section_viewed', {
              section_id: id,
              section_name: label,
              page: 'referrals'
            });
            obs.disconnect();
          }
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    trackEvent('partner_form_submit_attempt', {
      role: form.role,
      page: 'referrals'
    });

    try {
      const res = await fetch('/api/referral-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Submission failed. Please try again.');
      }

      trackEvent('partner_form_submitted', {
        role: form.role,
        page: 'referrals'
      });

      setSubmitted(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      trackEvent('partner_form_error', {
        error: message,
        page: 'referrals'
      });
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: '#111008',
    border: '1px solid rgba(201,168,76,0.2)',
    color: '#F0EDE4',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    padding: '14px 16px',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box'
  };

  return (
    <div style={{ backgroundColor: '#080808', minHeight: '100vh', fontFamily: "'Montserrat', sans-serif", overflowX: 'hidden' }}>
      {/* Shared Header — same as homepage */}
      <Header />

      {/* ── SECTION 1: HERO ── */}
      <section ref={(el) => {sectionRefs.current['hero'] = el;}} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', backgroundColor: '#080808', overflow: 'hidden' }}>
        {/* Radial glow */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.09) 0%, transparent 70%)', pointerEvents: 'none' }} />
        {/* Vertical gold lines — hidden on mobile */}
        <div className="hidden md:block" style={{ position: 'absolute', left: '40px', top: '15%', bottom: '15%', width: '1px', background: 'linear-gradient(180deg, transparent, rgba(201,168,76,0.25) 30%, rgba(201,168,76,0.25) 70%, transparent)', pointerEvents: 'none' }} />
        <div className="hidden md:block" style={{ position: 'absolute', right: '40px', top: '15%', bottom: '15%', width: '1px', background: 'linear-gradient(180deg, transparent, rgba(201,168,76,0.25) 30%, rgba(201,168,76,0.25) 70%, transparent)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '860px', margin: '0 auto', padding: '120px 24px 60px', textAlign: 'center' }}>
          {/* Label */}
          <Reveal delay={0.1}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '32px' }}>
              <span style={{ display: 'inline-block', width: '24px', height: '1px', backgroundColor: '#C9A84C', opacity: 0.6 }} />
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A84C', fontWeight: 400 }}>Partner Program</span>
              <span style={{ display: 'inline-block', width: '24px', height: '1px', backgroundColor: '#C9A84C', opacity: 0.6 }} />
            </div>
          </Reveal>

          {/* H1 */}
          <Reveal delay={0.2}>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 8vw, 90px)', fontWeight: 400, lineHeight: 1.05, color: '#F0EDE4', marginBottom: '24px', letterSpacing: '-0.02em' }}>
              Refer once.<br />
              <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>Earn forever.</em>
            </h1>
          </Reveal>

          {/* Subheading */}
          <Reveal delay={0.3}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(17px, 2.5vw, 28px)', color: '#ffffff', lineHeight: 1.6, marginBottom: '36px', maxWidth: '720px', margin: '0 auto 36px' }}>
              Know a company still drowning in spreadsheets or overpaying a slow accounting firm? Send them our way — and collect 10% of their monthly bill for as long as they stay with us.
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={0.4}>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center" style={{ marginBottom: '40px' }}>
              <button
                onClick={() => {
                  trackEvent('referral_cta_click', { cta: 'become_a_partner', location: 'hero', page: 'referrals' });
                  document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto"
                style={{ backgroundColor: '#C9A84C', color: '#080808', border: 'none', fontFamily: "'Montserrat', sans-serif", fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 600, padding: '16px 28px', cursor: 'pointer', transition: 'background 0.2s', minHeight: '48px' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#DDB96A'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#C9A84C'}>
                Become a Partner</button>
              <button
                onClick={() => {
                  trackEvent('referral_cta_click', { cta: 'see_how_it_works', location: 'hero', page: 'referrals' });
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto"
                style={{ backgroundColor: 'transparent', color: '#C9A84C', border: '1px solid #C9A84C', fontFamily: "'Montserrat', sans-serif", fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 600, padding: '16px 28px', cursor: 'pointer', transition: 'all 0.2s', minHeight: '48px' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#C9A84C'; e.currentTarget.style.color = '#080808'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#C9A84C'; }}>
                See How It Works</button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 2: REWARD CALLOUT ── */}
      <section ref={(el) => {sectionRefs.current['reward'] = el;}} className="py-20 md:py-28 px-6" style={{ backgroundColor: '#1C1A15', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px', background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '200px', background: 'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Reveal>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(64px, 14vw, 160px)', fontWeight: 700, color: '#C9A84C', opacity: 0.9, lineHeight: 1 }}>10%</div>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginTop: '12px', marginBottom: '24px' }}>
              of every monthly bill · for the lifetime of the client
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(16px, 3vw, 28px)', color: '#D4CFC4', maxWidth: '560px', margin: '0 auto', lineHeight: 1.6 }}>
              One successful introduction. One client that stays. A revenue stream that never stops.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 3: HOW IT WORKS ── */}
      <section id="how-it-works" className="py-20 md:py-32 px-6 md:px-16" style={{ backgroundColor: '#111008' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Reveal>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '20px' }}>The Process</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 5vw, 56px)', fontWeight: 400, color: '#F0EDE4', marginBottom: '20px', lineHeight: 1.1 }}>
              How the partnership <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>works</em>
            </h2>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '15px', fontWeight: 300, color: '#D4CFC4', lineHeight: 1.75, marginBottom: '48px', maxWidth: '640px' }}>
              No cold calling. No contracts to manage. You simply connect us with a business that needs better accounting — and we take it from there.
            </p>
          </Reveal>

          {/* Steps */}
          <div style={{ border: '1px solid rgba(201,168,76,0.18)', borderRadius: '2px' }}>
            {[
            {
              num: '01', title: 'Apply to become a partner',
              body: "Fill in the short form below. We review every application personally and confirm your partner status within 48 hours. There's no approval threshold or minimum referral commitment.",
              detail: null
            },
            {
              num: '02', title: 'Identify a company we can help',
              body: 'Think about the businesses in your network: founder-led companies, agencies, consultancies, e-commerce operators — anyone who complains about books, taxes, or their current accountant.',
              detail: 'We work best with SMEs billing £5k – £50k/month who want a dedicated finance partner, not just a filing service.'
            },
            {
              num: '03', title: 'Make the introduction',
              body: "A warm email or a WhatsApp message is all it takes. We'll do the discovery call, close the deal, and handle onboarding completely — you don't need to sell anything.",
              detail: 'Your referral is tagged to your partner account permanently. Even if the introduction takes a few months to convert, your commission is protected.'
            },
            {
              num: '04', title: 'Earn 10% — every single month',
              body: 'From the moment the client pays their first invoice, you start earning. Commissions are calculated automatically and transferred to you at the end of each month, with a clear statement showing every client and amount.',
              detail: 'There is no expiry, no ceiling, and no clawback. If the client stays with us for five years, you earn for five years.'
            }].
            map((step, i, arr) =>
            <Reveal key={step.num} delay={i * 0.1}>
                <div style={{ display: 'flex', borderBottom: i < arr.length - 1 ? '1px solid rgba(201,168,76,0.18)' : 'none' }}>
                  {/* Step number */}
                  <div style={{ width: '52px', flexShrink: 0, borderRight: '1px solid rgba(201,168,76,0.18)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '24px' }}>
                    <span className="text-[42px]" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, color: 'rgba(201,168,76,0.22)', lineHeight: 1 }}>{step.num}</span>
                  </div>
                  {/* Content */}
                  <div style={{ padding: '24px 16px', flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(15px, 2.5vw, 20px)', fontWeight: 400, color: '#F0EDE4', marginBottom: '12px' }}>{step.title}</h3>
                    <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '14px', fontWeight: 300, color: '#D4CFC4', lineHeight: 1.75, marginBottom: step.detail ? '16px' : 0 }}>{step.body}</p>
                    {step.detail &&
                  <div style={{ borderLeft: '2px solid #C9A84C', background: 'rgba(201,168,76,0.04)', padding: '12px 16px' }}>
                        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '13px', color: '#D4CFC4', lineHeight: 1.7, margin: 0 }}>{step.detail}</p>
                      </div>
                  }
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: WHO IT'S FOR ── */}
      <section ref={(el) => {sectionRefs.current['who-its-for'] = el;}} className="py-20 md:py-32 px-6 md:px-16" style={{ backgroundColor: '#EDE8DF' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Reveal>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: '#8A6820', marginBottom: '20px' }}>Perfect For</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 5vw, 56px)', fontWeight: 400, color: '#16140F', marginBottom: '20px', lineHeight: 1.1 }}>
              Partners who <em style={{ color: '#8A6820', fontStyle: 'italic' }}>already know</em> the right people
            </h2>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '15px', fontWeight: 300, color: '#3D3A32', lineHeight: 1.75, marginBottom: '48px', maxWidth: '600px' }}>
              You don&apos;t need to be an accountant. You need a network of business owners who trust your judgment.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {partnerCards.map((card, i) =>
            <Reveal key={i} delay={i * 0.08}>
                <div
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ backgroundColor: hoveredCard === i ? '#F7F3EC' : '#FFFFFF', padding: '28px 20px', borderTop: hoveredCard === i ? '2px solid #C9A84C' : '2px solid transparent', transition: 'all 0.3s ease', cursor: 'default', height: '100%' }}>

                  <div style={{ fontSize: '26px', marginBottom: '14px' }}>{card.emoji}</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(15px, 2.5vw, 20px)', fontWeight: 400, color: '#16140F', marginBottom: '10px', lineHeight: 1.3 }}>{card.title}</h3>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '14px', fontWeight: 300, color: '#3D3A32', lineHeight: 1.75, margin: 0 }}>{card.body}</p>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: EARNINGS TABLE ── */}
      <section id="earnings" className="py-20 md:py-32 px-6 md:px-16" style={{ backgroundColor: '#111008' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Reveal>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '20px' }}>Earnings Potential</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 5vw, 56px)', fontWeight: 400, color: '#F0EDE4', marginBottom: '20px', lineHeight: 1.1 }}>
              What your referrals <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>actually pay</em>
            </h2>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '15px', fontWeight: 300, color: '#D4CFC4', lineHeight: 1.75, marginBottom: '40px', maxWidth: '600px' }}>
              Our clients stay long-term because we deliver results. That loyalty translates directly into recurring income for you.
            </p>
          </Reveal>

          {/* Table — responsive: 2 cols on mobile, 4 on desktop */}
          <Reveal>
            <div style={{ border: '1px solid rgba(201,168,76,0.18)', borderRadius: '2px', overflow: 'hidden' }}>
              {/* Header */}
              <div className="grid grid-cols-2 md:grid-cols-4" style={{ background: 'rgba(201,168,76,0.08)', borderBottom: '1px solid rgba(201,168,76,0.18)' }}>
                {['Client Fee', 'Monthly Cut', 'Annual', '3 Years'].map((h, idx) =>
                <div key={h} className={idx >= 2 ? 'hidden md:block' : ''} style={{ padding: '14px 12px', fontFamily: "'Montserrat', sans-serif", fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#C9A84C', fontWeight: 400 }}>{h}</div>
                )}
              </div>
              {/* Rows */}
              {earningsRows.map((row, i) =>
              <div
                key={i}
                onMouseEnter={() => setHoveredRow(i)}
                onMouseLeave={() => setHoveredRow(null)}
                className="grid grid-cols-2 md:grid-cols-4"
                style={{ borderBottom: i < earningsRows.length - 1 ? '1px solid rgba(201,168,76,0.1)' : 'none', background: hoveredRow === i ? '#1E1B14' : 'transparent', transition: 'background 0.2s' }}>

                  <div style={{ padding: '16px 12px', fontFamily: "'Montserrat', sans-serif", fontSize: '13px', color: '#D4CFC4' }}>{row.fee}</div>
                  <div style={{ padding: '16px 12px', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(15px, 3vw, 22px)', fontWeight: 700, color: '#C9A84C' }}>{row.cut}</div>
                  <div className="hidden md:block" style={{ padding: '16px 12px', fontFamily: "'Montserrat', sans-serif", fontSize: '13px', color: '#D4CFC4' }}>{row.annual}</div>
                  <div className="hidden md:block" style={{ padding: '16px 12px', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(14px, 2.5vw, 20px)', fontWeight: 600, color: '#F0EDE4' }}>{row.threeYear}</div>
                </div>
              )}
            </div>
            {/* Mobile note */}
            <p className="md:hidden" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '11px', color: '#7A7468', marginTop: '12px', textAlign: 'center', letterSpacing: '0.5px' }}>
              Annual &amp; 3-year totals visible on larger screens
            </p>
          </Reveal>

          {/* Stat blocks — 2 cols on mobile, 4 on desktop */}
          <Reveal delay={0.2}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6" style={{ marginTop: '48px', borderTop: '1px solid rgba(201,168,76,0.18)', paddingTop: '40px' }}>
              {[['10%', 'Commission Rate'], ['∞', 'No Earning Cap'], ['Monthly', 'Payment Frequency'], ['Lifetime', 'Commission Duration']].map(([val, label]) =>
              <div key={label} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 4vw, 48px)', fontWeight: 700, color: '#C9A84C', lineHeight: 1 }}>{val}</div>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#7A7468', marginTop: '10px' }}>{label}</div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 6: APPLICATION FORM ── */}
      <section id="apply" className="py-20 md:py-32 px-6" style={{ backgroundColor: '#080808' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', marginBottom: '48px' }}>
          <Reveal>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '20px' }}>Apply Now</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 5vw, 52px)', fontWeight: 400, color: '#F0EDE4', marginBottom: '16px', lineHeight: 1.1 }}>
              Join the <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>partner programme</em>
            </h2>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '15px', fontWeight: 300, color: '#D4CFC4', lineHeight: 1.75 }}>
              Tell us a little about yourself. We&apos;ll confirm your partner status and send your unique referral link within 48 hours.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div style={{ maxWidth: '640px', margin: '0 auto', backgroundColor: '#1E1B14', padding: '32px 20px', position: 'relative' }} className="md:p-14">
            {/* Gold top border */}
            <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: '2px', background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />

            {submitted ?
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid #C9A84C', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', fontSize: '28px', color: '#C9A84C' }}>✓</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: 400, color: '#F0EDE4', marginBottom: '16px' }}>Thank you.</h3>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '15px', color: '#D4CFC4', lineHeight: 1.75 }}>We&apos;ll confirm your partner status within 48 hours.</p>
              </div> :

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Name row — stacked on mobile, side-by-side on sm+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[['firstName', 'First Name'], ['lastName', 'Last Name']].map(([field, label]) =>
                <div key={field}>
                      <label style={{ display: 'block', fontFamily: "'Montserrat', sans-serif", fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '8px' }}>{label}</label>
                      <input
                    type="text" required
                    value={form[field as keyof typeof form]}
                    onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                    style={inputStyle}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#C9A84C'}
                    onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'} />

                    </div>
                )}
                </div>

                {/* Email */}
                <div>
                  <label style={{ display: 'block', fontFamily: "'Montserrat', sans-serif", fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '8px' }}>Email Address</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                style={inputStyle}
                onFocus={(e) => e.currentTarget.style.borderColor = '#C9A84C'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'} />

                </div>

                {/* Phone */}
                <div>
                  <label style={{ display: 'block', fontFamily: "'Montserrat', sans-serif", fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '8px' }}>Phone Number</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                style={inputStyle}
                onFocus={(e) => e.currentTarget.style.borderColor = '#C9A84C'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'} />

                </div>

                {/* Role */}
                <div>
                  <label style={{ display: 'block', fontFamily: "'Montserrat', sans-serif", fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '8px' }}>Role / Profession</label>
                  <select required value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                style={{ ...inputStyle, color: form.role ? '#F0EDE4' : '#7A7468', appearance: 'none', cursor: 'pointer' }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#C9A84C'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'}>

                    <option value="" disabled>Select your role…</option>
                    {['Business Consultant / Advisor', 'Finance Broker / IFA', 'Solicitor / Legal Professional', 'Startup / Investor Ecosystem', 'HR / Payroll Specialist', 'Entrepreneur / Business Owner', 'Other'].map((o) => <option key={o} value={o} style={{ backgroundColor: '#1E1B14' }}>{o}</option>)}
                  </select>
                </div>

                {/* Network */}
                <div>
                  <label style={{ display: 'block', fontFamily: "'Montserrat', sans-serif", fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '8px' }}>Tell us about your network</label>
                  <textarea rows={4} value={form.network} onChange={(e) => setForm((f) => ({ ...f, network: e.target.value }))}
                placeholder="Briefly describe the types of businesses you work with and how you plan to refer clients to Reckonwell…"
                style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#C9A84C'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'} />

                </div>

                {/* Submit */}
                <button type="submit" disabled={submitting}
              style={{ width: '100%', backgroundColor: submitting ? 'rgba(201,168,76,0.5)' : '#C9A84C', color: '#080808', border: 'none', fontFamily: "'Montserrat', sans-serif", fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 600, padding: '18px', cursor: submitting ? 'not-allowed' : 'pointer', transition: 'background 0.2s', marginTop: '4px', minHeight: '52px' }}
              onMouseEnter={(e) => {if (!submitting) e.currentTarget.style.backgroundColor = '#DDB96A';}}
              onMouseLeave={(e) => {if (!submitting) e.currentTarget.style.backgroundColor = '#C9A84C';}}>
                {submitting ? 'Submitting…' : 'Submit Application'}</button>

                {submitError &&
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '13px', color: '#e07070', textAlign: 'center', lineHeight: 1.6, margin: 0, padding: '8px 0' }}>
                    {submitError}
                  </p>
              }

                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '12px', color: '#7A7468', textAlign: 'center', lineHeight: 1.6, margin: 0 }}>
                  We review every application within 48 hours. No spam, no commitments — just a confirmation email and your unique referral link.
                </p>
              </form>
            }
          </div>
        </Reveal>
      </section>

      {/* ── SECTION 7: FAQ ── */}
      <section id="faq" className="py-20 md:py-32 px-6 md:px-16" style={{ backgroundColor: '#1C1A15' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Reveal>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '20px' }}>Questions</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 4vw, 48px)', fontWeight: 400, color: '#F0EDE4', marginBottom: '40px', lineHeight: 1.1 }}>
              Frequently asked <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>questions</em>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ border: '1px solid rgba(201,168,76,0.18)', borderRadius: '2px' }}>
              {faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={i} style={{ borderBottom: i < faqs.length - 1 ? '1px solid rgba(201,168,76,0.18)' : 'none' }}>
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 16px', background: isOpen ? 'rgba(201,168,76,0.04)' : 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'background 0.2s', minHeight: '56px' }}
                      onMouseEnter={(e) => {if (!isOpen) e.currentTarget.style.background = 'rgba(255,255,255,0.02)';}}
                      onMouseLeave={(e) => {if (!isOpen) e.currentTarget.style.background = 'transparent';}}>

                      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(13px, 2vw, 16px)', fontWeight: 400, color: '#F0EDE4', lineHeight: 1.5, paddingRight: '16px' }}>{faq.q}</span>
                      <span style={{ color: '#C9A84C', fontSize: '22px', fontWeight: 300, flexShrink: 0, transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease', display: 'inline-block', width: '22px', textAlign: 'center' }}>+</span>
                    </button>
                    <div style={{ maxHeight: isOpen ? '400px' : '0', overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                      <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '14px', lineHeight: 1.9, color: '#D4CFC4', padding: '0 16px 18px', margin: 0 }}>{faq.a}</p>
                    </div>
                  </div>);

              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 px-6" style={{ backgroundColor: '#111008', borderTop: '1px solid rgba(201,168,76,0.18)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }} className="flex flex-col md:grid md:grid-cols-3 items-center gap-6 text-center md:text-left">
          {/* Logo */}
          <div>
            <Link href="/">
              <img
                src="/assets/images/Reckonwell-1779490857835.png"
                alt="Reckonwell"
                style={{ height: '32px', width: 'auto', objectFit: 'contain' }} />

            </Link>
          </div>
          {/* Nav */}
          <nav style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[['How It Works', 'how-it-works'], ['Your Earnings', 'earnings'], ['Become a Partner', 'apply']].map(([label, id]) =>
            <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
            style={{ background: 'none', border: 'none', fontFamily: "'Montserrat', sans-serif", fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#7A7468', cursor: 'pointer', transition: 'color 0.2s', minHeight: '44px' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#C9A84C'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#7A7468'}>
              {label}</button>
            )}
            <Link href="/" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#7A7468', transition: 'color 0.2s', display: 'flex', alignItems: 'center', minHeight: '44px' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#C9A84C'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#7A7468'}>
              Contact</Link>
          </nav>
          {/* Copyright */}
          <div className="md:text-right">
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '11px', color: '#7A7468' }}>© 2025 Reckonwell.</p>
          </div>
        </div>
      </footer>
    </div>);

}