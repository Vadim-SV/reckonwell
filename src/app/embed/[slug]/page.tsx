import { notFound } from 'next/navigation';
import { TOOLKIT_TOOLS } from '@/lib/toolkit-share';

interface EmbedPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string>>;
}

export async function generateStaticParams() {
  return TOOLKIT_TOOLS.map((tool) => ({ slug: tool.slug }));
}

export default async function EmbedPage({ params, searchParams }: EmbedPageProps) {
  const { slug } = await params;
  const sp = await searchParams;
  const tool = TOOLKIT_TOOLS.find((t) => t.slug === slug);
  if (!tool) notFound();

  const theme = sp.theme === 'dark' ? 'dark' : 'light';
  const toolUrl = `https://reckonwell.com/toolkit/${slug}?utm_source=embed&utm_medium=backlink&utm_campaign=toolkit-embed`;

  const bgColor = theme === 'dark' ? '#18213E' : '#FFF1E0';
  const textColor = theme === 'dark' ? '#FBF1E3' : '#000000';
  const borderColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(18,35,63,0.15)';
  const mutedColor = theme === 'dark' ? 'rgba(251,241,227,0.5)' : '#66605C';
  const linkColor = theme === 'dark' ? '#FBF1E3' : '#12233F';
  const bodyTextColor = theme === 'dark' ? 'rgba(251,241,227,0.75)' : '#333333';

  return (
    <html lang="en" style={{ margin: 0, padding: 0 }}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={`https://reckonwell.com/toolkit/${slug}`} />
        <title>{tool.title} | Reckonwell</title>
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: 'Work Sans', sans-serif; background: ${bgColor}; color: ${textColor}; min-height: 100vh; }
          .embed-header { padding: 16px 20px; border-bottom: 1px solid ${borderColor}; display: flex; align-items: center; justify-content: space-between; }
          .embed-title { font-size: 14px; font-weight: 600; color: ${textColor}; }
          .embed-content { padding: 20px; }
          .embed-footer { padding: 12px 20px; border-top: 1px solid ${borderColor}; text-align: center; font-size: 11px; color: ${mutedColor}; }
          .embed-footer a { color: ${linkColor}; text-decoration: underline; }
        `}</style>
      </head>
      <body>
        <div className="embed-header">
          <span className="embed-title">{tool.title}</span>
          <a href={toolUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: mutedColor, textDecoration: 'none' }}>
            Open full tool ↗
          </a>
        </div>
        <div className="embed-content">
          <p style={{ fontSize: '14px', lineHeight: 1.6, marginBottom: '16px', color: bodyTextColor }}>
            {tool.description}
          </p>
          <a
            href={toolUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-block', padding: '12px 24px', background: '#12233F', color: '#FBF1E3', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none', borderRadius: '2px' }}
          >
            Use free tool →
          </a>
        </div>
        <div className="embed-footer">
          Powered by <a href={toolUrl} target="_blank" rel="noopener noreferrer">Reckonwell</a> · Free founder finance tools · No sign-up
        </div>
      </body>
    </html>
  );
}
