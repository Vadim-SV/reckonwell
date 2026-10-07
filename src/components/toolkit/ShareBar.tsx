'use client';

import React, { useState } from 'react';
import { buildShareUrls, trackResultShared, trackEmbedCodeCopied, buildEmbedCode } from '@/lib/toolkit-utils';

interface ShareBarProps {
  toolSlug: string;
  toolUrl: string;
  shareText: string;
  showEmbed?: boolean;
  showPdf?: boolean;
  onPdfDownload?: () => void;
}

export default function ShareBar({ toolSlug, toolUrl, shareText, showEmbed = true, showPdf = true, onPdfDownload }: ShareBarProps) {
  const [copied, setCopied] = useState(false);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [embedTheme, setEmbedTheme] = useState<'light' | 'dark'>('light');
  const [embedCopied, setEmbedCopied] = useState(false);

  const urls = buildShareUrls(toolUrl, shareText);
  const embedCode = buildEmbedCode(toolSlug, { theme: embedTheme });

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(urls.copyUrl);
      setCopied(true);
      trackResultShared(toolSlug, 'copy-link');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleShare = (channel: string) => {
    trackResultShared(toolSlug, channel);
  };

  const handleCopyEmbed = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setEmbedCopied(true);
      trackEmbedCodeCopied(toolSlug);
      setTimeout(() => setEmbedCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 py-4 border-t border-b" style={{ borderColor: 'var(--border)' }}>
        <span className="font-ui text-xs uppercase tracking-widest" style={{ color: 'var(--muted)', letterSpacing: '2px', fontSize: '10px' }}>
          Share
        </span>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-ui transition-all"
          style={{ border: '1px solid var(--border)', color: 'var(--foreground)', background: 'transparent', fontSize: '11px' }}
          aria-label="Copy link"
        >
          {copied ? (
            <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Copied!</>
          ) : (
            <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg> Copy link</>
          )}
        </button>

        {/* LinkedIn */}
        <a
          href={urls.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleShare('linkedin')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-ui transition-all"
          style={{ border: '1px solid var(--border)', color: 'var(--foreground)', background: 'transparent', fontSize: '11px', textDecoration: 'none' }}
          aria-label="Share on LinkedIn"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          LinkedIn
        </a>

        {/* WhatsApp */}
        <a
          href={urls.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleShare('whatsapp')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-ui transition-all"
          style={{ border: '1px solid var(--border)', color: 'var(--foreground)', background: 'transparent', fontSize: '11px', textDecoration: 'none' }}
          aria-label="Share on WhatsApp"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
          WhatsApp
        </a>

        {/* X / Twitter */}
        <a
          href={urls.twitter}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleShare('twitter')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-ui transition-all"
          style={{ border: '1px solid var(--border)', color: 'var(--foreground)', background: 'transparent', fontSize: '11px', textDecoration: 'none' }}
          aria-label="Share on X"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          X
        </a>

        {/* Email */}
        <a
          href={urls.email}
          onClick={() => handleShare('email')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-ui transition-all"
          style={{ border: '1px solid var(--border)', color: 'var(--foreground)', background: 'transparent', fontSize: '11px', textDecoration: 'none' }}
          aria-label="Share via email"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          Email
        </a>

        {showPdf && onPdfDownload && (
          <button
            onClick={onPdfDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-ui transition-all"
            style={{ border: '1px solid var(--border)', color: 'var(--foreground)', background: 'transparent', fontSize: '11px' }}
            aria-label="Download results as PDF"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download PDF
          </button>
        )}

        {showEmbed && (
          <button
            onClick={() => setShowEmbedModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-ui transition-all"
            style={{ border: '1px solid var(--border)', color: 'var(--foreground)', background: 'transparent', fontSize: '11px' }}
            aria-label="Embed this calculator"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            Embed
          </button>
        )}
      </div>

      {/* Embed Modal */}
      {showEmbedModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowEmbedModal(false); }}
        >
          <div className="w-full max-w-lg rounded-lg p-6" style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg" style={{ color: 'var(--foreground)' }}>Embed this calculator</h3>
              <button onClick={() => setShowEmbedModal(false)} aria-label="Close" style={{ color: 'var(--muted)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
              Paste this code into your website. The embed shows "Powered by Reckonwell" with a link back to the full tool.
            </p>
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setEmbedTheme('light')}
                className="px-3 py-1 text-xs rounded font-ui"
                style={{ background: embedTheme === 'light' ? 'var(--primary)' : 'transparent', color: embedTheme === 'light' ? 'var(--primary-foreground)' : 'var(--muted)', border: '1px solid var(--border)' }}
              >Light</button>
              <button
                onClick={() => setEmbedTheme('dark')}
                className="px-3 py-1 text-xs rounded font-ui"
                style={{ background: embedTheme === 'dark' ? 'var(--primary)' : 'transparent', color: embedTheme === 'dark' ? 'var(--primary-foreground)' : 'var(--muted)', border: '1px solid var(--border)' }}
              >Dark</button>
            </div>
            <pre className="text-xs p-3 rounded overflow-x-auto mb-4" style={{ background: 'var(--muted-background, #f5f5f5)', color: 'var(--foreground)', whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontSize: '10px' }}>
              {embedCode}
            </pre>
            <button
              onClick={handleCopyEmbed}
              className="w-full py-2 rounded font-ui text-sm font-semibold transition-all"
              style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', border: 'none' }}
            >
              {embedCopied ? '✓ Copied!' : 'Copy embed code'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
