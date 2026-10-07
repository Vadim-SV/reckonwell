'use client';

import React, { useState } from 'react';
import type { ToolMeta } from '@/lib/toolkit-data';

interface Props {
  tools: ToolMeta[];
}

const shareDescription = (tools: ToolMeta[]) =>
  `Free Founder Finance Toolkit by Reckonwell — ${tools.length} free calculators for UK founders:\n` +
  tools.map(t => `• ${t.title}`).join('\n') +
  `\n\nNo sign-up. No email gate. Free forever.\nhttps://reckonwell.com/toolkit`;

export default function ToolkitHubClient({ tools }: Props) {
  const [copied, setCopied] = useState(false);

  const desc = shareDescription(tools);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(desc);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <section className="px-5 md:px-10 py-16" style={{ background: '#0d1b2e' }}>
      <div className="max-w-4xl mx-auto">
        <p className="font-ui text-xs uppercase tracking-widest mb-3" style={{ color: '#C9A84C', letterSpacing: '2px' }}>
          Share the toolkit
        </p>
        <h2 className="font-display text-3xl md:text-4xl mb-4" style={{ color: '#FBF1E3' }}>
          Know a founder who could use this?
        </h2>
        <p className="text-base mb-8 leading-relaxed" style={{ color: '#C4C9D8' }}>
          Send them the toolkit, post it in a community, or embed any tool on your website. Every share carries Reckonwell branding and a link back — no email gate, no friction.
        </p>

        {/* Copyable description */}
        <div className="rounded-lg p-5 mb-6" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,168,76,0.3)' }}>
          <p className="font-ui text-xs uppercase tracking-widest mb-3" style={{ color: '#C9A84C', letterSpacing: '1.5px' }}>
            Copy and paste (for emails, forums, communities)
          </p>
          <pre className="text-sm whitespace-pre-wrap leading-relaxed" style={{ color: '#FBF1E3', fontFamily: 'inherit' }}>
            {desc}
          </pre>
          <button
            onClick={handleCopy}
            className="mt-3 flex items-center gap-2 px-4 py-2 rounded font-ui text-xs font-semibold uppercase tracking-widest transition-all"
            style={{ background: 'rgba(201,168,76,0.15)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.4)', letterSpacing: '1.5px' }}
          >
            {copied ? '✓ Copied!' : 'Copy description'}
          </button>
        </div>

        {/* Share buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://reckonwell.com/toolkit?utm_source=linkedin&utm_medium=share&utm_campaign=toolkit')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded font-ui text-xs font-semibold uppercase tracking-widest"
            style={{ background: '#0A66C2', color: '#fff', textDecoration: 'none', letterSpacing: '1.5px' }}
          >
            Share on LinkedIn
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent('Free Founder Finance Toolkit by Reckonwell — 8 free calculators, no sign-up: https://reckonwell.com/toolkit?utm_source=whatsapp&utm_medium=share&utm_campaign=toolkit')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded font-ui text-xs font-semibold uppercase tracking-widest"
            style={{ background: '#25D366', color: '#fff', textDecoration: 'none', letterSpacing: '1.5px' }}
          >
            Share on WhatsApp
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('Free Founder Finance Toolkit — 8 free calculators for UK founders, no sign-up:')}&url=${encodeURIComponent('https://reckonwell.com/toolkit?utm_source=twitter&utm_medium=share&utm_campaign=toolkit')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded font-ui text-xs font-semibold uppercase tracking-widest"
            style={{ background: '#000', color: '#fff', textDecoration: 'none', letterSpacing: '1.5px' }}
          >
            Share on X
          </a>
        </div>

        {/* Tool links list */}
        <div className="rounded-lg p-5" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,168,76,0.3)' }}>
          <p className="font-ui text-xs uppercase tracking-widest mb-4" style={{ color: '#C9A84C', letterSpacing: '1.5px' }}>
            Individual tool links
          </p>
          <ul className="space-y-2">
            {tools.map((tool) => (
              <li key={tool.slug} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <span className="text-sm" style={{ color: '#FBF1E3' }}>
                  {tool.icon} {tool.title}
                </span>
                <span className="text-xs font-ui" style={{ color: '#C4C9D8' }}>
                  reckonwell.com/toolkit/{tool.slug}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
