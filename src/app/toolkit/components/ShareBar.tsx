'use client';

import React, { useState } from 'react';
import { shareToLinkedIn, shareToX, shareToWhatsApp, shareByEmail, copyToClipboard, getEmbedCode, trackEmbedCodeCopied,  } from '@/lib/toolkit-share';


interface ShareBarProps {
  toolSlug: string;
  shareText: string;
  currentUrl?: string;
  showEmbed?: boolean;
  showPdf?: boolean;
  onPdfDownload?: () => void;
}

export default function ShareBar({ toolSlug, shareText, currentUrl, showEmbed = true, showPdf = true, onPdfDownload }: ShareBarProps) {
  const [copied, setCopied] = useState(false);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [embedCopied, setEmbedCopied] = useState(false);
  const [embedTheme, setEmbedTheme] = useState<'light' | 'dark'>('light');

  const url = currentUrl ?? (typeof window !== 'undefined' ? window.location.href : `https://reckonwell.com/toolkit/${toolSlug}`);
  const cleanUrl = `https://reckonwell.com/toolkit/${toolSlug}`;

  const handleCopy = async () => {
    const ok = await copyToClipboard(url, toolSlug);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleEmbedCopy = async () => {
    const code = getEmbedCode(toolSlug, { theme: embedTheme });
    await navigator.clipboard.writeText(code);
    setEmbedCopied(true);
    trackEmbedCodeCopied(toolSlug);
    setTimeout(() => setEmbedCopied(false), 2000);
  };

  return (
    <>
      <div
        className="flex flex-wrap items-center gap-2 py-4"
        style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
      >
        <span className="font-ui text-xs uppercase tracking-widest" style={{ color: 'var(--muted)', letterSpacing: '2px', fontSize: '10px' }}>
          Share
        </span>

        {/* Copy Link */}
        <button
          onClick={handleCopy}
          className="font-ui text-xs px-3 py-2 transition-all duration-200"
          style={{
            border: '1px solid var(--border)',
            borderRadius: '2px',
            color: copied ? 'var(--primary)' : 'var(--muted)',
            background: 'transparent',
            fontSize: '11px',
            letterSpacing: '1px',
            minHeight: '36px',
          }}
          aria-label="Copy link to clipboard"
        >
          {copied ? '✓ Copied' : '🔗 Copy link'}
        </button>

        {/* LinkedIn */}
        <button
          onClick={() => shareToLinkedIn(cleanUrl, toolSlug)}
          className="font-ui text-xs px-3 py-2 transition-all duration-200"
          style={{ border: '1px solid var(--border)', borderRadius: '2px', color: 'var(--muted)', background: 'transparent', fontSize: '11px', minHeight: '36px' }}
          aria-label="Share on LinkedIn"
        >
          LinkedIn
        </button>

        {/* WhatsApp */}
        <button
          onClick={() => shareToWhatsApp(cleanUrl, shareText, toolSlug)}
          className="font-ui text-xs px-3 py-2 transition-all duration-200"
          style={{ border: '1px solid var(--border)', borderRadius: '2px', color: 'var(--muted)', background: 'transparent', fontSize: '11px', minHeight: '36px' }}
          aria-label="Share on WhatsApp"
        >
          WhatsApp
        </button>

        {/* X */}
        <button
          onClick={() => shareToX(cleanUrl, shareText, toolSlug)}
          className="font-ui text-xs px-3 py-2 transition-all duration-200"
          style={{ border: '1px solid var(--border)', borderRadius: '2px', color: 'var(--muted)', background: 'transparent', fontSize: '11px', minHeight: '36px' }}
          aria-label="Share on X (Twitter)"
        >
          X
        </button>

        {/* Email */}
        <button
          onClick={() => shareByEmail(cleanUrl, `Free tool: ${toolSlug.replace(/-/g, ' ')}`, shareText, toolSlug)}
          className="font-ui text-xs px-3 py-2 transition-all duration-200"
          style={{ border: '1px solid var(--border)', borderRadius: '2px', color: 'var(--muted)', background: 'transparent', fontSize: '11px', minHeight: '36px' }}
          aria-label="Share by email"
        >
          Email
        </button>

        {/* Embed */}
        {showEmbed && (
          <button
            onClick={() => setShowEmbedModal(true)}
            className="font-ui text-xs px-3 py-2 transition-all duration-200"
            style={{ border: '1px solid var(--border)', borderRadius: '2px', color: 'var(--muted)', background: 'transparent', fontSize: '11px', minHeight: '36px' }}
            aria-label="Get embed code"
          >
            {'</> Embed'}
          </button>
        )}

        {/* PDF */}
        {showPdf && onPdfDownload && (
          <button
            onClick={onPdfDownload}
            className="font-ui text-xs px-3 py-2 transition-all duration-200"
            style={{ border: '1px solid var(--border)', borderRadius: '2px', color: 'var(--muted)', background: 'transparent', fontSize: '11px', minHeight: '36px' }}
            aria-label="Download results as PDF"
          >
            ↓ PDF
          </button>
        )}
      </div>

      {/* Embed Modal */}
      {showEmbedModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
          onClick={() => setShowEmbedModal(false)}
        >
          <div
            className="w-full max-w-lg p-6"
            style={{ background: 'var(--background)', border: '1px solid var(--border)', borderRadius: '4px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg" style={{ color: 'var(--foreground)' }}>Embed this calculator</h3>
              <button onClick={() => setShowEmbedModal(false)} style={{ color: 'var(--muted)', fontSize: '20px', background: 'none', border: 'none', cursor: 'pointer' }} aria-label="Close">✕</button>
            </div>
            <p className="font-ui text-sm mb-4" style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
              Add this free calculator to your website. It will show "Powered by Reckonwell" with a link back.
            </p>
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setEmbedTheme('light')}
                className="font-ui text-xs px-3 py-1"
                style={{ border: `1px solid ${embedTheme === 'light' ? 'var(--primary)' : 'var(--border)'}`, borderRadius: '2px', background: embedTheme === 'light' ? 'var(--primary)' : 'transparent', color: embedTheme === 'light' ? 'var(--primary-foreground)' : 'var(--muted)', fontSize: '11px' }}
              >
                Light
              </button>
              <button
                onClick={() => setEmbedTheme('dark')}
                className="font-ui text-xs px-3 py-1"
                style={{ border: `1px solid ${embedTheme === 'dark' ? 'var(--primary)' : 'var(--border)'}`, borderRadius: '2px', background: embedTheme === 'dark' ? 'var(--primary)' : 'transparent', color: embedTheme === 'dark' ? 'var(--primary-foreground)' : 'var(--muted)', fontSize: '11px' }}
              >
                Dark
              </button>
            </div>
            <pre
              className="text-xs p-3 overflow-x-auto mb-4"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '2px', color: 'var(--body-text)', lineHeight: 1.5, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}
            >
              {getEmbedCode(toolSlug, { theme: embedTheme })}
            </pre>
            <button
              onClick={handleEmbedCopy}
              className="font-ui text-xs px-4 py-2 w-full transition-all duration-200"
              style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', border: 'none', borderRadius: '2px', fontSize: '11px', letterSpacing: '1px', minHeight: '40px', cursor: 'pointer' }}
            >
              {embedCopied ? '✓ Copied!' : 'Copy embed code'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
