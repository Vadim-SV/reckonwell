import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { TOOLS } from '@/lib/toolkit-data';

// Embed pages are noindexed and have canonical to the full tool page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = TOOLS.find(t => t.slug === slug);
  if (!tool) return {};
  return {
    robots: { index: false, follow: false },
    alternates: { canonical: `https://reckonwell.com/toolkit/${slug}` },
    title: `${tool.title} — Reckonwell`,
  };
}

export async function generateStaticParams() {
  return TOOLS.map(t => ({ slug: t.slug }));
}

// Embed layout — lightweight, no site nav
export default async function EmbedPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = TOOLS.find(t => t.slug === slug);
  if (!tool) notFound();

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', background: '#fff', color: '#18213E', minHeight: '100vh', padding: '16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb' }}>
        <span style={{ fontSize: '16px', fontWeight: 600, color: '#18213E' }}>
          {tool.icon} {tool.title}
        </span>
        <span style={{ fontSize: '11px', color: '#888' }}>
          Powered by{' '}
          <a
            href={`https://reckonwell.com/toolkit/${slug}?utm_source=embed&utm_medium=backlink&utm_campaign=toolkit`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#18213E', fontWeight: 600, textDecoration: 'none' }}
          >
            Reckonwell
          </a>
        </span>
      </div>

      {/* Question */}
      <p style={{ fontSize: '14px', color: '#555', marginBottom: '20px', lineHeight: 1.5 }}>
        {tool.question}
      </p>

      {/* CTA */}
      <Link
        href={`https://reckonwell.com/toolkit/${slug}?utm_source=embed&utm_medium=iframe&utm_campaign=toolkit`}
        style={{
          display: 'block',
          textAlign: 'center',
          padding: '12px 24px',
          background: '#18213E',
          color: '#FBF1E3',
          borderRadius: '4px',
          textDecoration: 'none',
          fontSize: '13px',
          fontWeight: 600,
          letterSpacing: '1px',
          textTransform: 'uppercase',
          marginBottom: '12px',
        }}
      >
        Open free calculator →
      </Link>

      <p style={{ fontSize: '10px', color: '#999', textAlign: 'center' }}>
        Free tool by{' '}
        <a
          href="https://reckonwell.com/toolkit?utm_source=embed&utm_medium=backlink&utm_campaign=toolkit"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#18213E', textDecoration: 'none' }}
        >
          Reckonwell
        </a>
        {' '}— no sign-up required
      </p>
    </div>
  );
}
