'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { TaxRelief } from '@/lib/toolkit-data';
import ShareBar from '@/components/toolkit/ShareBar';
import { trackToolStarted, trackToolCompleted } from '@/lib/toolkit-utils';

interface Props {
  reliefs: TaxRelief[];
}

type Structure = 'sole-trader' | 'limited-company' | 'partnership-llp' | 'landlord';

const QUESTIONS = [
  {
    id: 'structure',
    question: 'What is your business structure?',
    options: [
      { label: 'Sole trader', value: 'sole-trader' },
      { label: 'Limited company', value: 'limited-company' },
      { label: 'Partnership or LLP', value: 'partnership-llp' },
      { label: 'Landlord (property income)', value: 'landlord' },
    ],
  },
  {
    id: 'rd',
    question: 'Does your business carry out R&D activity?',
    hint: 'R&D means seeking to advance science or technology and overcoming scientific or technological uncertainty.',
    options: [
      { label: 'Yes — we actively develop new products, processes or software', value: 'yes' },
      { label: 'Possibly — we do some technical development', value: 'maybe' },
      { label: 'No', value: 'no' },
    ],
    showIf: (answers: Record<string, string>) => answers.structure === 'limited-company',
  },
  {
    id: 'equipment',
    question: 'Have you purchased or are you planning to purchase equipment, machinery or vehicles?',
    options: [
      { label: 'Yes — significant purchases (over £5,000)', value: 'significant' },
      { label: 'Yes — smaller purchases', value: 'small' },
      { label: 'No', value: 'no' },
    ],
  },
  {
    id: 'employees',
    question: 'Do you have employees (other than yourself as a sole director)?',
    options: [
      { label: 'Yes — I have employees', value: 'yes' },
      { label: 'No — I am the only person', value: 'no' },
    ],
    showIf: (answers: Record<string, string>) => answers.structure !== 'landlord',
  },
  {
    id: 'investment',
    question: 'Are you looking to raise investment from individual investors?',
    options: [
      { label: 'Yes — actively planning to raise', value: 'yes' },
      { label: 'Possibly in the future', value: 'maybe' },
      { label: 'No', value: 'no' },
    ],
    showIf: (answers: Record<string, string>) => answers.structure === 'limited-company',
  },
  {
    id: 'wfh',
    question: 'Do you work from home?',
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ],
  },
  {
    id: 'losses',
    question: 'Has your business made a loss in the current or recent tax years?',
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ],
  },
];

function getEligibleReliefs(answers: Record<string, string>, reliefs: TaxRelief[]): { likely: TaxRelief[]; possible: TaxRelief[] } {
  const structure = answers.structure as Structure;
  const likely: TaxRelief[] = [];
  const possible: TaxRelief[] = [];

  for (const relief of reliefs) {
    if (!relief.structures.includes(structure)) continue;

    let score = 0;
    if (relief.slug === 'annual-investment-allowance' && (answers.equipment === 'significant' || answers.equipment === 'small')) score += 2;
    if (relief.slug === 'full-expensing' && answers.equipment === 'significant' && structure === 'limited-company') score += 2;
    if (relief.slug === 'employment-allowance' && answers.employees === 'yes') score += 2;
    if (relief.slug === 'rd-tax-relief' && answers.rd === 'yes') score += 3;
    if (relief.slug === 'rd-tax-relief' && answers.rd === 'maybe') score += 1;
    if (relief.slug === 'seis' && answers.investment === 'yes') score += 2;
    if (relief.slug === 'eis' && answers.investment === 'yes') score += 2;
    if (relief.slug === 'trading-loss-relief' && answers.losses === 'yes') score += 2;
    if (relief.slug === 'marginal-relief' && structure === 'limited-company') score += 1;
    if (relief.slug === 'business-asset-disposal-relief') score += 1;
    if (relief.slug === 'structures-and-buildings-allowance' && answers.equipment === 'significant') score += 1;
    if (relief.slug === 'emi' && answers.employees === 'yes' && structure === 'limited-company') score += 1;
    if (relief.slug === 'patent-box' && structure === 'limited-company') score += 0.5;

    if (score >= 2) likely.push(relief);
    else if (score >= 0.5) possible.push(relief);
  }

  return { likely, possible };
}

export default function TaxReliefClient({ reliefs }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [started, setStarted] = useState(false);

  const visibleQuestions = QUESTIONS.filter(q => !q.showIf || q.showIf(answers));
  const currentQuestion = visibleQuestions[step];

  const handleAnswer = (value: string) => {
    if (!started) {
      trackToolStarted('tax-relief-finder');
      setStarted(true);
    }
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);
    if (step < visibleQuestions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResults(true);
      trackToolCompleted('tax-relief-finder', { structure: newAnswers.structure });
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({});
    setShowResults(false);
  };

  const { likely, possible } = showResults ? getEligibleReliefs(answers, reliefs) : { likely: [], possible: [] };

  if (showResults) {
    return (
      <div className="max-w-2xl">
        <div className="rounded-lg p-5 mb-6" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}>
          <p className="font-ui text-xs uppercase tracking-widest mb-1 opacity-80" style={{ letterSpacing: '1.5px' }}>Your results</p>
          <p className="font-display text-2xl font-semibold">
            You could be eligible for {likely.length + possible.length} tax reliefs
          </p>
          <p className="text-sm opacity-80 mt-1">{likely.length} likely · {possible.length} possible</p>
        </div>

        {likely.length > 0 && (
          <div className="mb-6">
            <h3 className="font-display text-lg mb-3" style={{ color: 'var(--foreground)' }}>Likely eligible ({likely.length})</h3>
            <div className="space-y-3">
              {likely.map((relief) => (
                <ReliefCard key={relief.slug} relief={relief} />
              ))}
            </div>
          </div>
        )}

        {possible.length > 0 && (
          <div className="mb-6">
            <h3 className="font-display text-lg mb-3" style={{ color: 'var(--foreground)' }}>Possibly eligible ({possible.length})</h3>
            <div className="space-y-3">
              {possible.map((relief) => (
                <ReliefCard key={relief.slug} relief={relief} />
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleReset}
          className="px-4 py-2 rounded font-ui text-xs uppercase tracking-widest mb-6"
          style={{ border: '1px solid var(--border)', color: 'var(--muted)', background: 'transparent', letterSpacing: '1.5px' }}
        >
          Start again
        </button>

        <ShareBar
          toolSlug="tax-relief-finder"
          toolUrl="/toolkit/tax-relief-finder"
          shareText="Free tool that finds every tax relief your business could claim for 2026/27:"
        />
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="rounded-lg border p-6" style={{ borderColor: 'var(--border)' }}>
        {/* Progress */}
        <div className="w-full h-1 rounded-full mb-6" style={{ background: 'var(--border)' }}>
          <div className="h-1 rounded-full transition-all" style={{ width: `${(step / visibleQuestions.length) * 100}%`, background: 'var(--primary)' }} />
        </div>

        <p className="font-ui text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--muted)', letterSpacing: '1.5px' }}>
          Question {step + 1} of {visibleQuestions.length}
        </p>
        <h3 className="font-display text-xl mb-2" style={{ color: 'var(--foreground)' }}>{currentQuestion?.question}</h3>
        {currentQuestion?.hint && (
          <p className="text-sm mb-5" style={{ color: 'var(--muted)' }}>{currentQuestion.hint}</p>
        )}
        <div className="space-y-3">
          {currentQuestion?.options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleAnswer(opt.value)}
              className="w-full text-left px-4 py-3 rounded border text-sm transition-all"
              style={{ borderColor: 'var(--border)', color: 'var(--foreground)', background: 'transparent' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--primary)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'; }}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            className="mt-4 text-xs font-ui"
            style={{ color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}

function ReliefCard({ relief }: { relief: TaxRelief }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-lg border p-4" style={{ borderColor: 'var(--border)' }}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-sm" style={{ color: 'var(--foreground)' }}>{relief.name}</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{relief.category}</p>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs font-ui flex-shrink-0"
          style={{ color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {expanded ? 'Less' : 'More'}
        </button>
      </div>
      <p className="text-sm mt-2" style={{ color: 'var(--muted)' }}>{relief.description}</p>
      {expanded && (
        <div className="mt-3 space-y-2">
          <p className="text-xs font-semibold" style={{ color: 'var(--foreground)' }}>Rate: <span className="font-normal" style={{ color: 'var(--muted)' }}>{relief.rateDescription}</span></p>
          <p className="text-xs font-semibold" style={{ color: 'var(--foreground)' }}>How to claim: <span className="font-normal" style={{ color: 'var(--muted)' }}>{relief.howToClaim}</span></p>
          <p className="text-xs font-semibold" style={{ color: 'var(--foreground)' }}>Deadline: <span className="font-normal" style={{ color: 'var(--muted)' }}>{relief.claimDeadline}</span></p>
          <a href={relief.govUkLink} target="_blank" rel="noopener noreferrer" className="text-xs" style={{ color: 'var(--primary)' }}>
            GOV.UK guidance →
          </a>
          <div className="mt-2">
            <Link href={`/toolkit/tax-reliefs/${relief.slug}`} className="text-xs font-semibold" style={{ color: 'var(--primary)' }}>
              Full eligibility guide →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
