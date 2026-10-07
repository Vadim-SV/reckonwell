'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ShareBar from '@/components/toolkit/ShareBar';
import { trackToolStarted, trackToolCompleted } from '@/lib/toolkit-utils';
import { SRT, IHT } from '@/lib/tax-config';

type Path = 'arriving' | 'leaving' | null;

interface Answers {
  path: Path;
  ukDaysThisYear: string;
  ukDaysPrevYear1: string;
  ukDaysPrevYear2: string;
  ukDaysPrevYear3: string;
  worksFullTimeOverseas: string;
  worksFullTimeUK: string;
  onlyHomeInUK: string;
  familyTie: string;
  accommodationTie: string;
  workTie: string;
  ninetyDayTie: string;
  countryTie: string;
  yearsNonResident: string;
  ukYearsLast20: string;
}

interface SRTResult {
  status: 'uk-resident' | 'non-resident' | 'uncertain';
  reason: string;
  figEligible: boolean;
  figYearsRemaining: number;
  ihtLongTermResident: boolean;
  ihtTailYears: number;
  splitYear: boolean;
  temporaryNonResident: boolean;
  trf: boolean;
  reliefs: string[];
  keyDates: string[];
  documents: string[];
}

function calcSRT(answers: Answers): SRTResult | null {
  const days = parseInt(answers.ukDaysThisYear) || 0;
  const prevDays = [
    parseInt(answers.ukDaysPrevYear1) || 0,
    parseInt(answers.ukDaysPrevYear2) || 0,
    parseInt(answers.ukDaysPrevYear3) || 0,
  ];
  const prevResidentCount = prevDays.filter(d => d >= 183).length;
  const wasPrevResident = prevResidentCount > 0;
  const yearsNonResident = parseInt(answers.yearsNonResident) || 0;
  const ukYearsLast20 = parseInt(answers.ukYearsLast20) || 0;

  // Automatic Overseas Tests
  if (days === 0 || (!wasPrevResident && days < 46)) {
    const figEligible = yearsNonResident >= SRT.figNonResidenceYears;
    return {
      status: 'non-resident',
      reason: days === 0
        ? 'You spent 0 days in the UK — Automatic Overseas Test 1 applies.'
        : `You spent fewer than 46 days in the UK and were not UK resident in any of the previous 3 tax years — Automatic Overseas Test 2 applies.`,
      figEligible,
      figYearsRemaining: figEligible ? SRT.figYears : 0,
      ihtLongTermResident: ukYearsLast20 >= IHT.longTermResidentYears,
      ihtTailYears: ukYearsLast20 >= IHT.longTermResidentYears ? Math.max(0, IHT.longTermResidentYears - (IHT.longTermResidentLookback - ukYearsLast20)) : 0,
      splitYear: false,
      temporaryNonResident: yearsNonResident < 5,
      trf: answers.path === 'leaving',
      reliefs: figEligible ? ['FIG Regime (Foreign Income and Gains) — 0% UK tax on foreign income/gains for up to 4 years'] : [],
      keyDates: ['6 April — start of UK tax year', '5 April — end of UK tax year'],
      documents: ['Passport with entry/exit stamps', 'Evidence of overseas home', 'Employment contract or business records', 'Bank statements showing overseas activity'],
    };
  }

  // Automatic UK Tests
  if (days >= SRT.aut1Days) {
    return {
      status: 'uk-resident',
      reason: `You spent ${days} days in the UK — Automatic UK Test 1 applies (183+ days = UK resident).`,
      figEligible: false,
      figYearsRemaining: 0,
      ihtLongTermResident: ukYearsLast20 >= IHT.longTermResidentYears,
      ihtTailYears: 0,
      splitYear: answers.path === 'arriving',
      temporaryNonResident: false,
      trf: false,
      reliefs: [],
      keyDates: ['31 January — Self Assessment filing and payment deadline', '5 April — end of UK tax year'],
      documents: ['P60 or employment records', 'Bank statements', 'Evidence of UK address', 'National Insurance number'],
    };
  }

  if (answers.onlyHomeInUK === 'yes') {
    return {
      status: 'uk-resident',
      reason: 'Your only home is in the UK — Automatic UK Test 2 applies.',
      figEligible: false,
      figYearsRemaining: 0,
      ihtLongTermResident: ukYearsLast20 >= IHT.longTermResidentYears,
      ihtTailYears: 0,
      splitYear: answers.path === 'arriving',
      temporaryNonResident: false,
      trf: false,
      reliefs: [],
      keyDates: ['31 January — Self Assessment filing and payment deadline'],
      documents: ['Evidence of UK home ownership or tenancy', 'Utility bills', 'Council tax records'],
    };
  }

  if (answers.worksFullTimeOverseas === 'yes' && days < 91) {
    const figEligible = yearsNonResident >= SRT.figNonResidenceYears;
    return {
      status: 'non-resident',
      reason: `You work full-time overseas and spent fewer than 91 days in the UK — Automatic Overseas Test 3 applies.`,
      figEligible,
      figYearsRemaining: figEligible ? SRT.figYears : 0,
      ihtLongTermResident: ukYearsLast20 >= IHT.longTermResidentYears,
      ihtTailYears: ukYearsLast20 >= IHT.longTermResidentYears ? 3 : 0,
      splitYear: answers.path === 'leaving',
      temporaryNonResident: yearsNonResident < 5,
      trf: answers.path === 'leaving',
      reliefs: figEligible ? ['FIG Regime — 0% UK tax on foreign income/gains for up to 4 years'] : [],
      keyDates: ['6 April — start of UK tax year', '5 April — end of UK tax year'],
      documents: ['Employment contract', 'Payslips showing overseas employer', 'Evidence of overseas home', 'Travel records'],
    };
  }

  // Sufficient Ties Test
  const ties = [
    answers.familyTie === 'yes',
    answers.accommodationTie === 'yes',
    answers.workTie === 'yes',
    answers.ninetyDayTie === 'yes',
    answers.countryTie === 'yes' && wasPrevResident,
  ].filter(Boolean).length;

  const thresholds = wasPrevResident
    ? SRT.sufficientTies.previousResident
    : SRT.sufficientTies.notPreviousResident;

  let ukResident = false;
  for (const [tieCount, dayThreshold] of Object.entries(thresholds)) {
    if (ties >= parseInt(tieCount) && days >= dayThreshold) {
      ukResident = true;
      break;
    }
  }

  if (ukResident) {
    return {
      status: 'uk-resident',
      reason: `Based on the Sufficient Ties Test: you have ${ties} UK tie${ties !== 1 ? 's' : ''} and spent ${days} days in the UK.`,
      figEligible: false,
      figYearsRemaining: 0,
      ihtLongTermResident: ukYearsLast20 >= IHT.longTermResidentYears,
      ihtTailYears: 0,
      splitYear: answers.path === 'arriving',
      temporaryNonResident: false,
      trf: false,
      reliefs: [],
      keyDates: ['31 January — Self Assessment filing deadline', '5 April — end of UK tax year'],
      documents: ['Evidence of UK ties', 'Day count records', 'Employment records'],
    };
  }

  const figEligible = yearsNonResident >= SRT.figNonResidenceYears;
  return {
    status: 'non-resident',
    reason: `Based on the Sufficient Ties Test: you have ${ties} UK tie${ties !== 1 ? 's' : ''} and spent ${days} days in the UK — below the threshold for ${ties} ties.`,
    figEligible,
    figYearsRemaining: figEligible ? SRT.figYears : 0,
    ihtLongTermResident: ukYearsLast20 >= IHT.longTermResidentYears,
    ihtTailYears: ukYearsLast20 >= IHT.longTermResidentYears ? 3 : 0,
    splitYear: answers.path === 'leaving',
    temporaryNonResident: yearsNonResident < 5,
    trf: answers.path === 'leaving',
    reliefs: figEligible ? ['FIG Regime — 0% UK tax on foreign income/gains for up to 4 years'] : [],
    keyDates: ['6 April — start of UK tax year', '5 April — end of UK tax year'],
    documents: ['Passport with entry/exit stamps', 'Evidence of overseas home', 'Day count records'],
  };
}

const STEPS_ARRIVING = [
  'path', 'ukDaysThisYear', 'ukDaysPrevYear1', 'ukDaysPrevYear2', 'ukDaysPrevYear3',
  'onlyHomeInUK', 'worksFullTimeUK', 'familyTie', 'accommodationTie', 'workTie', 'ninetyDayTie',
  'yearsNonResident', 'ukYearsLast20',
];

const STEPS_LEAVING = [
  'path', 'ukDaysThisYear', 'ukDaysPrevYear1', 'ukDaysPrevYear2', 'ukDaysPrevYear3',
  'worksFullTimeOverseas', 'onlyHomeInUK', 'familyTie', 'accommodationTie', 'workTie', 'ninetyDayTie', 'countryTie',
  'yearsNonResident', 'ukYearsLast20',
];

export default function UKTaxResidenceClient() {
  const [answers, setAnswers] = useState<Answers>({
    path: null,
    ukDaysThisYear: '',
    ukDaysPrevYear1: '',
    ukDaysPrevYear2: '',
    ukDaysPrevYear3: '',
    worksFullTimeOverseas: '',
    worksFullTimeUK: '',
    onlyHomeInUK: '',
    familyTie: '',
    accommodationTie: '',
    workTie: '',
    ninetyDayTie: '',
    countryTie: '',
    yearsNonResident: '',
    ukYearsLast20: '',
  });
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const steps = answers.path === 'arriving' ? STEPS_ARRIVING : answers.path === 'leaving' ? STEPS_LEAVING : ['path'];

  const handleAnswer = (field: keyof Answers, value: string) => {
    if (!started) {
      setStarted(true);
      trackToolStarted('uk-tax-residence-checker');
    }
    setAnswers(prev => ({ ...prev, [field]: value }));
    if (step < steps.length - 1) {
      setStep(s => s + 1);
    } else {
      setShowResults(true);
      trackToolCompleted('uk-tax-residence-checker');
    }
  };

  const handleNext = () => {
    if (step < steps.length - 1) setStep(s => s + 1);
    else { setShowResults(true); trackToolCompleted('uk-tax-residence-checker'); }
  };

  const handleBack = () => {
    if (step > 0) setStep(s => s - 1);
    setShowResults(false);
  };

  const handleReset = () => {
    setAnswers({ path: null, ukDaysThisYear: '', ukDaysPrevYear1: '', ukDaysPrevYear2: '', ukDaysPrevYear3: '', worksFullTimeOverseas: '', worksFullTimeUK: '', onlyHomeInUK: '', familyTie: '', accommodationTie: '', workTie: '', ninetyDayTie: '', countryTie: '', yearsNonResident: '', ukYearsLast20: '' });
    setStep(0);
    setShowResults(false);
    setStarted(false);
  };

  const results = showResults ? calcSRT(answers) : null;
  const toolUrl = 'https://reckonwell.com/toolkit/uk-tax-residence-checker';
  const shareText = 'Free UK tax residence checker — covers the Statutory Residence Test and FIG regime:';

  const currentField = steps[step] as keyof Answers;
  const progress = Math.round(((step) / (steps.length - 1)) * 100);

  const renderStep = () => {
    switch (currentField) {
      case 'path':
        return (
          <div>
            <h2 className="font-display text-2xl mb-2" style={{ color: 'var(--foreground)' }}>Are you arriving in or leaving the UK?</h2>
            <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>This determines which Statutory Residence Test path applies to you.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { value: 'arriving', label: '🛬 Arriving in the UK', desc: 'Moving to the UK, or spending more time here' },
                { value: 'leaving', label: '🛫 Leaving the UK', desc: 'Moving abroad, or spending less time in the UK' },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer('path', opt.value)}
                  className="p-5 rounded-lg border text-left transition-all"
                  style={{ borderColor: 'var(--border)', background: 'var(--background)' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                >
                  <p className="font-semibold text-base mb-1" style={{ color: 'var(--foreground)' }}>{opt.label}</p>
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 'ukDaysThisYear':
        return (
          <div>
            <h2 className="font-display text-2xl mb-2" style={{ color: 'var(--foreground)' }}>How many days did you spend in the UK this tax year?</h2>
            <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>Count any day you were in the UK at midnight. The tax year runs 6 April to 5 April.</p>
            <input
              type="number"
              min="0"
              max="366"
              value={answers.ukDaysThisYear}
              onChange={e => setAnswers(prev => ({ ...prev, ukDaysThisYear: e.target.value }))}
              className="w-full max-w-xs px-4 py-3 rounded-lg border text-lg"
              style={{ borderColor: 'var(--border)', background: 'var(--background)', color: 'var(--foreground)', outline: 'none' }}
              placeholder="e.g. 120"
              autoFocus
            />
            <button onClick={handleNext} className="mt-4 px-6 py-3 rounded-lg font-semibold text-sm" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', border: 'none', cursor: 'pointer' }}>
              Next →
            </button>
          </div>
        );

      case 'ukDaysPrevYear1': case'ukDaysPrevYear2': case'ukDaysPrevYear3': {
        const yearNum = currentField === 'ukDaysPrevYear1' ? 1 : currentField === 'ukDaysPrevYear2' ? 2 : 3;
        return (
          <div>
            <h2 className="font-display text-2xl mb-2" style={{ color: 'var(--foreground)' }}>Days in the UK {yearNum} tax year{yearNum > 1 ? 's' : ''} ago?</h2>
            <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>This determines whether you were UK resident in previous years, which affects which automatic tests apply.</p>
            <input
              type="number"
              min="0"
              max="366"
              value={answers[currentField]}
              onChange={e => setAnswers(prev => ({ ...prev, [currentField]: e.target.value }))}
              className="w-full max-w-xs px-4 py-3 rounded-lg border text-lg"
              style={{ borderColor: 'var(--border)', background: 'var(--background)', color: 'var(--foreground)', outline: 'none' }}
              placeholder="e.g. 200"
              autoFocus
            />
            <button onClick={handleNext} className="mt-4 px-6 py-3 rounded-lg font-semibold text-sm" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', border: 'none', cursor: 'pointer' }}>
              Next →
            </button>
          </div>
        );
      }

      case 'worksFullTimeOverseas':
        return (
          <div>
            <h2 className="font-display text-2xl mb-2" style={{ color: 'var(--foreground)' }}>Do you work full-time overseas?</h2>
            <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>Full-time overseas means working at least 35 hours per week overseas with no significant break, and fewer than 31 UK workdays in the tax year.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              {[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }].map(opt => (
                <button key={opt.value} onClick={() => handleAnswer('worksFullTimeOverseas', opt.value)} className="px-8 py-4 rounded-lg border font-semibold text-base transition-all" style={{ borderColor: 'var(--border)', background: 'var(--background)', color: 'var(--foreground)' }} onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--primary)')} onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 'onlyHomeInUK':
        return (
          <div>
            <h2 className="font-display text-2xl mb-2" style={{ color: 'var(--foreground)' }}>Is your only home in the UK?</h2>
            <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>A "home" is a place you regularly live in. If you have a home overseas as well, answer No.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              {[{ value: 'yes', label: 'Yes — only home is in UK' }, { value: 'no', label: 'No — I also have a home overseas' }].map(opt => (
                <button key={opt.value} onClick={() => handleAnswer('onlyHomeInUK', opt.value)} className="px-6 py-4 rounded-lg border font-semibold text-sm transition-all" style={{ borderColor: 'var(--border)', background: 'var(--background)', color: 'var(--foreground)' }} onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--primary)')} onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 'worksFullTimeUK':
        return (
          <div>
            <h2 className="font-display text-2xl mb-2" style={{ color: 'var(--foreground)' }}>Do you work full-time in the UK?</h2>
            <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>Full-time UK work means at least 35 hours per week in the UK for 365 days with no significant break.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              {[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }].map(opt => (
                <button key={opt.value} onClick={() => handleAnswer('worksFullTimeUK', opt.value)} className="px-8 py-4 rounded-lg border font-semibold text-base transition-all" style={{ borderColor: 'var(--border)', background: 'var(--background)', color: 'var(--foreground)' }} onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--primary)')} onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 'familyTie':
        return (
          <div>
            <h2 className="font-display text-2xl mb-2" style={{ color: 'var(--foreground)' }}>Family tie: do you have a spouse, civil partner or minor child living in the UK?</h2>
            <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>This is one of the five UK ties used in the Sufficient Ties Test.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              {[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }].map(opt => (
                <button key={opt.value} onClick={() => handleAnswer('familyTie', opt.value)} className="px-8 py-4 rounded-lg border font-semibold text-base transition-all" style={{ borderColor: 'var(--border)', background: 'var(--background)', color: 'var(--foreground)' }} onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--primary)')} onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 'accommodationTie':
        return (
          <div>
            <h2 className="font-display text-2xl mb-2" style={{ color: 'var(--foreground)' }}>Accommodation tie: do you have accessible UK accommodation you use for at least 1 night?</h2>
            <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>This includes a home you own, rent, or have access to (e.g. a family member's home you stay in).</p>
            <div className="flex flex-col sm:flex-row gap-4">
              {[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }].map(opt => (
                <button key={opt.value} onClick={() => handleAnswer('accommodationTie', opt.value)} className="px-8 py-4 rounded-lg border font-semibold text-base transition-all" style={{ borderColor: 'var(--border)', background: 'var(--background)', color: 'var(--foreground)' }} onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--primary)')} onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 'workTie':
        return (
          <div>
            <h2 className="font-display text-2xl mb-2" style={{ color: 'var(--foreground)' }}>Work tie: did you work in the UK for at least 40 days this tax year?</h2>
            <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>A UK workday means working for more than 3 hours in the UK.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              {[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }].map(opt => (
                <button key={opt.value} onClick={() => handleAnswer('workTie', opt.value)} className="px-8 py-4 rounded-lg border font-semibold text-base transition-all" style={{ borderColor: 'var(--border)', background: 'var(--background)', color: 'var(--foreground)' }} onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--primary)')} onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 'ninetyDayTie':
        return (
          <div>
            <h2 className="font-display text-2xl mb-2" style={{ color: 'var(--foreground)' }}>90-day tie: did you spend more than 90 days in the UK in either of the previous 2 tax years?</h2>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              {[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }].map(opt => (
                <button key={opt.value} onClick={() => handleAnswer('ninetyDayTie', opt.value)} className="px-8 py-4 rounded-lg border font-semibold text-base transition-all" style={{ borderColor: 'var(--border)', background: 'var(--background)', color: 'var(--foreground)' }} onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--primary)')} onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 'countryTie':
        return (
          <div>
            <h2 className="font-display text-2xl mb-2" style={{ color: 'var(--foreground)' }}>Country tie: did you spend more days in the UK than in any other single country this tax year?</h2>
            <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>This tie only applies if you were UK resident in at least one of the previous 3 tax years.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              {[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }].map(opt => (
                <button key={opt.value} onClick={() => handleAnswer('countryTie', opt.value)} className="px-8 py-4 rounded-lg border font-semibold text-base transition-all" style={{ borderColor: 'var(--border)', background: 'var(--background)', color: 'var(--foreground)' }} onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--primary)')} onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 'yearsNonResident':
        return (
          <div>
            <h2 className="font-display text-2xl mb-2" style={{ color: 'var(--foreground)' }}>How many consecutive years have you been non-UK resident?</h2>
            <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>This determines eligibility for the FIG (Foreign Income and Gains) regime. You need 10+ consecutive years of non-residence.</p>
            <input
              type="number"
              min="0"
              max="50"
              value={answers.yearsNonResident}
              onChange={e => setAnswers(prev => ({ ...prev, yearsNonResident: e.target.value }))}
              className="w-full max-w-xs px-4 py-3 rounded-lg border text-lg"
              style={{ borderColor: 'var(--border)', background: 'var(--background)', color: 'var(--foreground)', outline: 'none' }}
              placeholder="e.g. 12"
              autoFocus
            />
            <button onClick={handleNext} className="mt-4 px-6 py-3 rounded-lg font-semibold text-sm" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', border: 'none', cursor: 'pointer' }}>
              Next →
            </button>
          </div>
        );

      case 'ukYearsLast20':
        return (
          <div>
            <h2 className="font-display text-2xl mb-2" style={{ color: 'var(--foreground)' }}>How many of the last 20 tax years have you been UK resident?</h2>
            <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>This determines long-term UK resident status for Inheritance Tax purposes (10 of 20 years = long-term resident).</p>
            <input
              type="number"
              min="0"
              max="20"
              value={answers.ukYearsLast20}
              onChange={e => setAnswers(prev => ({ ...prev, ukYearsLast20: e.target.value }))}
              className="w-full max-w-xs px-4 py-3 rounded-lg border text-lg"
              style={{ borderColor: 'var(--border)', background: 'var(--background)', color: 'var(--foreground)', outline: 'none' }}
              placeholder="e.g. 15"
              autoFocus
            />
            <button onClick={() => { setShowResults(true); trackToolCompleted('uk-tax-residence-checker'); }} className="mt-4 px-6 py-3 rounded-lg font-semibold text-sm" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', border: 'none', cursor: 'pointer' }}>
              See my result →
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  if (showResults && results) {
    return (
      <div className="max-w-3xl">
        {/* Important notice */}
        <div className="p-4 rounded-lg border mb-6 text-sm" style={{ borderColor: '#C9A84C', background: 'rgba(201,168,76,0.08)', color: 'var(--foreground)' }}>
          <strong>⚠️ Indicative only</strong> — Residence and international tax are highly fact-specific. This tool gives a simplified indication only. Get professional advice before acting on these results.
        </div>

        {/* Status */}
        <div className="p-6 rounded-lg border mb-6" style={{ borderColor: results.status === 'uk-resident' ? 'var(--primary)' : '#2D6A4F', background: results.status === 'uk-resident' ? 'rgba(var(--primary-rgb, 24,33,62),0.04)' : 'rgba(45,106,79,0.06)' }}>
          <p className="font-ui text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--muted)', letterSpacing: '1.5px' }}>Indicative status</p>
          <p className="font-display text-2xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
            {results.status === 'uk-resident' ? '🇬🇧 UK Tax Resident' : '🌍 Non-UK Resident'}
          </p>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>{results.reason}</p>
        </div>

        {/* Reliefs and regimes */}
        {results.reliefs.length > 0 && (
          <div className="mb-6">
            <h3 className="font-display text-lg mb-3" style={{ color: 'var(--foreground)' }}>Regimes you may be eligible for</h3>
            <div className="space-y-2">
              {results.reliefs.map((r, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-lg border text-sm" style={{ borderColor: '#2D6A4F40', background: '#2D6A4F10' }}>
                  <span style={{ color: '#2D6A4F', flexShrink: 0 }}>✓</span>
                  <span style={{ color: 'var(--foreground)' }}>{r}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FIG regime detail */}
        {results.figEligible && (
          <div className="p-5 rounded-lg border mb-6" style={{ borderColor: 'var(--border)', background: 'var(--surface, var(--background))' }}>
            <h3 className="font-display text-lg mb-2" style={{ color: 'var(--foreground)' }}>FIG Regime (Foreign Income and Gains)</h3>
            <p className="text-sm mb-2" style={{ color: 'var(--muted)' }}>
              You may be eligible for the FIG regime, which provides 0% UK tax on foreign income and gains for your first 4 tax years of UK residence — provided you have been non-UK resident for at least 10 consecutive years.
            </p>
            <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
              Potential years remaining: up to {results.figYearsRemaining} tax years
            </p>
            <p className="text-xs mt-2" style={{ color: 'var(--muted)' }}>
              Source: <a href="https://www.gov.uk/guidance/foreign-income-and-gains-fig-regime" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>GOV.UK — FIG Regime</a>
            </p>
          </div>
        )}

        {/* IHT */}
        {results.ihtLongTermResident && (
          <div className="p-5 rounded-lg border mb-6" style={{ borderColor: '#b4323240', background: '#b432320a' }}>
            <h3 className="font-display text-lg mb-2" style={{ color: 'var(--foreground)' }}>Inheritance Tax: Long-term UK Resident</h3>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              Based on your answers, you may be a long-term UK resident for IHT purposes (10 of the last 20 tax years). This means your worldwide assets may be subject to UK IHT even after leaving the UK, for a period after departure.
            </p>
            <p className="text-xs mt-2" style={{ color: 'var(--muted)' }}>
              Source: <a href="https://www.gov.uk/guidance/inheritance-tax-and-domicile" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>GOV.UK — IHT and residence</a>
            </p>
          </div>
        )}

        {/* Flags */}
        <div className="mb-6 space-y-2">
          {results.splitYear && (
            <div className="p-3 rounded-lg border text-sm" style={{ borderColor: '#C9A84C40', background: '#C9A84C0a' }}>
              <strong style={{ color: '#C9A84C' }}>Split-year treatment may apply.</strong>
              <span style={{ color: 'var(--muted)' }}> If you arrived or left part-way through the tax year, you may be taxed as UK resident for only part of the year. This must be claimed on your Self Assessment return.</span>
            </div>
          )}
          {results.temporaryNonResident && (
            <div className="p-3 rounded-lg border text-sm" style={{ borderColor: '#C9A84C40', background: '#C9A84C0a' }}>
              <strong style={{ color: '#C9A84C' }}>Temporary non-residence rules may apply.</strong>
              <span style={{ color: 'var(--muted)' }}> If you return to the UK within 5 years, certain income and gains realised while non-resident may be taxed on your return.</span>
            </div>
          )}
          {results.trf && (
            <div className="p-3 rounded-lg border text-sm" style={{ borderColor: '#2D6A4F40', background: '#2D6A4F0a' }}>
              <strong style={{ color: '#2D6A4F' }}>Temporary Repatriation Facility (TRF) available until April 2028.</strong>
              <span style={{ color: 'var(--muted)' }}> Former non-doms can remit pre-April 2025 foreign income and gains at 12% (2025/26–2026/27) or 15% (2027/28). Source: <a href="https://www.gov.uk/guidance/temporary-repatriation-facility" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>GOV.UK — TRF</a></span>
            </div>
          )}
        </div>

        {/* Key dates */}
        <div className="mb-6">
          <h3 className="font-display text-lg mb-3" style={{ color: 'var(--foreground)' }}>Key dates to be aware of</h3>
          <ul className="space-y-1">
            {results.keyDates.map((d, i) => (
              <li key={i} className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                <span style={{ color: 'var(--primary)', flexShrink: 0 }}>→</span>{d}
              </li>
            ))}
          </ul>
        </div>

        {/* Documents */}
        <div className="mb-8">
          <h3 className="font-display text-lg mb-3" style={{ color: 'var(--foreground)' }}>Documents to gather</h3>
          <ul className="space-y-1">
            {results.documents.map((d, i) => (
              <li key={i} className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                <span style={{ color: 'var(--primary)', flexShrink: 0 }}>📄</span>{d}
              </li>
            ))}
          </ul>
        </div>

        <ShareBar toolSlug="uk-tax-residence-checker" toolUrl={toolUrl} shareText={shareText} />

        <div className="mt-6 flex gap-3 flex-wrap">
          <button onClick={handleReset} className="px-4 py-2 rounded font-ui text-xs uppercase tracking-widest" style={{ border: '1px solid var(--border)', color: 'var(--muted)', background: 'transparent', cursor: 'pointer', letterSpacing: '1.5px' }}>
            ← Start again
          </button>
          <Link href="/book" className="px-4 py-2 rounded font-ui text-xs uppercase tracking-widest" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', textDecoration: 'none', letterSpacing: '1.5px' }}>
            Book a consultation →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <ShareBar toolSlug="uk-tax-residence-checker" toolUrl={toolUrl} shareText={shareText} showPdf={false} />

      {/* Important notice */}
      <div className="mt-6 p-4 rounded-lg border mb-6 text-sm" style={{ borderColor: '#C9A84C', background: 'rgba(201,168,76,0.08)', color: 'var(--foreground)' }}>
        <strong>⚠️ Indicative only</strong> — Residence and international tax are highly fact-specific. This tool gives a simplified indication only. Get professional advice before acting on these results.
      </div>

      {/* Progress bar */}
      {answers.path && (
        <div className="mb-6">
          <div className="flex justify-between text-xs mb-1" style={{ color: 'var(--muted)' }}>
            <span>Question {step + 1} of {steps.length}</span>
            <span>{progress}% complete</span>
          </div>
          <div className="w-full h-1 rounded-full" style={{ background: 'var(--border)' }}>
            <div className="h-1 rounded-full transition-all duration-300" style={{ width: `${progress}%`, background: 'var(--primary)' }} />
          </div>
        </div>
      )}

      {/* Step content */}
      <div className="min-h-48">
        {renderStep()}
      </div>

      {/* Back button */}
      {step > 0 && !showResults && (
        <button onClick={handleBack} className="mt-6 text-sm" style={{ color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
          ← Back
        </button>
      )}
    </div>
  );
}
