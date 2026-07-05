'use client';

import React from 'react';
import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const allItems = [{ label: 'Home', href: '/' }, ...items];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `https://reckonwell.com${item.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className="px-6 md:px-10 py-2"
        style={{ borderBottom: '1px solid var(--gold-border)', backgroundColor: 'rgba(201,168,76,0.03)' }}
      >
        <div className="max-w-5xl mx-auto">
          <ol
            className="flex flex-wrap items-center gap-1"
            style={{ listStyle: 'none', margin: 0, padding: 0 }}
          >
            {allItems.map((item, index) => {
              const isLast = index === allItems.length - 1;
              return (
                <li
                  key={item.href}
                  className="flex items-center gap-1"
                  style={{ fontSize: '11px', letterSpacing: '0.5px', fontFamily: 'var(--font-ui, sans-serif)' }}
                >
                  {isLast ? (
                    <span
                      aria-current="page"
                      style={{ color: 'var(--primary)', textTransform: 'uppercase' }}
                    >
                      {item.label}
                    </span>
                  ) : (
                    <>
                      <Link
                        href={item.href}
                        style={{
                          color: 'var(--muted)',
                          textDecoration: 'none',
                          textTransform: 'uppercase',
                          transition: 'color 0.2s',
                        }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--primary)')}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--muted)')}
                      >
                        {item.label}
                      </Link>
                      <span style={{ color: 'var(--muted)', opacity: 0.5, marginLeft: '2px', marginRight: '2px' }}>/</span>
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
}
