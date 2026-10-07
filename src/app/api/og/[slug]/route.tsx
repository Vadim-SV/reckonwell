import { ImageResponse } from 'next/og';
import { TOOLS } from '@/lib/toolkit-data';
import { TAX_YEAR } from '@/lib/tax-config';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug') || 'toolkit';

  const tool = TOOLS.find(t => t.slug === slug);
  const title = tool ? tool.title : 'Free Founder Finance Toolkit';
  const question = tool ? tool.question : 'Free finance tools for UK founder-led businesses';
  const icon = tool ? tool.icon : '🧮';

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#18213E',
          padding: '60px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top: Reckonwell branding */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: '#C9A84C', width: '8px', height: '8px', borderRadius: '50%' }} />
          <span style={{ color: '#C9A84C', fontSize: '14px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 600 }}>
            Reckonwell · Free Founder Finance Toolkit
          </span>
        </div>

        {/* Middle: Tool info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: '64px' }}>{icon}</div>
          <div style={{ color: '#FBF1E3', fontSize: '48px', fontWeight: 700, lineHeight: 1.1, maxWidth: '900px' }}>
            {title}
          </div>
          <div style={{ color: '#C4C9D8', fontSize: '24px', maxWidth: '800px', lineHeight: 1.4 }}>
            {question}
          </div>
        </div>

        {/* Bottom: badges */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {['Free', 'No sign-up', TAX_YEAR, 'reckonwell.com/toolkit'].map(badge => (
            <div
              key={badge}
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: '#FBF1E3',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '14px',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
