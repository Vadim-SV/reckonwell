'use client';

import React from 'react';
import Link from 'next/link';

interface ToolMeta {
  slug: string;
  icon: string;
  question: string;
  title: string;
  description: string;
}

interface Props {
  tools: ToolMeta[];
}

export default function ToolkitToolGrid({ tools }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {tools.map((tool) => (
        <Link
          key={tool.slug}
          href={`/toolkit/${tool.slug}`}
          className="group block p-6 transition-all duration-300"
          style={{ border: '1px solid var(--border)', borderRadius: '2px', background: 'var(--surface)' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--primary)'; (e.currentTarget as HTMLAnchorElement).style.background = 'var(--card)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLAnchorElement).style.background = 'var(--surface)'; }}
        >
          <div className="flex items-start gap-4">
            <span style={{ fontSize: '28px', lineHeight: 1, flexShrink: 0 }} aria-hidden="true">{tool.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="font-ui text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--muted)', fontSize: '10px', letterSpacing: '2px' }}>
                {tool.question}
              </p>
              <h3 className="font-display text-xl mb-2" style={{ fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.2 }}>
                {tool.title}
              </h3>
              <p className="font-ui text-sm mb-4" style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
                {tool.description}
              </p>
              <span
                className="font-ui text-xs uppercase tracking-widest"
                style={{ color: 'var(--primary)', fontSize: '10px', letterSpacing: '2px', fontWeight: 600 }}
              >
                Use free tool →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
