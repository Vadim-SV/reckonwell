'use client';

import React, { useState } from 'react';

export default function CopyButtonClient({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="mt-3 flex items-center gap-2 px-4 py-2 rounded font-ui text-xs font-semibold uppercase tracking-widest transition-all"
      style={{ background: 'rgba(201,168,76,0.15)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.4)', letterSpacing: '1.5px' }}
    >
      {copied ? '✓ Copied!' : label}
    </button>
  );
}
