import React from 'react';

const rows = [
  {
    feature: 'How often your books are updated',
    diy: 'Whenever you find time',
    traditional: 'Once a year, at filing deadline',
    reckonwell: 'Daily',
  },
  {
    feature: 'When you find out about a problem',
    diy: 'Usually too late',
    traditional: 'Months after it happened',
    reckonwell: 'Within days',
  },
  {
    feature: 'Who does the work',
    diy: 'You',
    traditional: 'An accountant you speak to once a year',
    reckonwell: 'A dedicated finance team member who knows your business',
  },
  {
    feature: 'Software',
    diy: 'Whatever you can figure out',
    traditional: 'Varies by firm',
    reckonwell: 'Xero / QuickBooks, set up properly from day one',
  },
  {
    feature: 'HMRC & compliance',
    diy: 'You handle it, or scramble each deadline',
    traditional: 'Filed on time, little else',
    reckonwell: 'Filed on time, plus daily bookkeeping so nothing is ever a surprise',
  },
  {
    feature: 'What it costs you',
    diy: 'Your time (the real cost)',
    traditional: 'Often unpredictable, scope creep',
    reckonwell: 'Transparent pricing — see your exact price in 2 minutes',
  },
];

export default function TheDifferenceSection() {
  return (
    <section
      className="px-6 md:px-10 py-16 md:py-20"
      style={{ borderBottom: '1px solid var(--gold-border)', backgroundColor: 'var(--background)' }}
    >
      <div className="max-w-5xl mx-auto">
        <p className="section-label mb-4">The Difference</p>
        <h2
          className="font-display mb-6"
          style={{
            fontSize: 'clamp(26px,3.5vw,48px)',
            fontWeight: 400,
            color: 'var(--foreground)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          Most accounting falls into two camps.{' '}
          <em style={{ color: 'var(--primary)' }}>We built a third.</em>
        </h2>
        <p
          className="font-serif mb-12 max-w-2xl"
          style={{
            fontStyle: 'italic',
            fontSize: 'clamp(16px,2vw,20px)',
            color: 'var(--muted)',
            lineHeight: 1.7,
          }}
        >
          Neither DIY spreadsheets nor a once-a-year accountant give founders what they actually need — timely numbers they can act on.
        </p>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th
                  className="font-ui text-left py-4 pr-6"
                  style={{
                    fontSize: '11px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                    borderBottom: '1px solid var(--gold-border)',
                    width: '22%',
                  }}
                >
                  &nbsp;
                </th>
                <th
                  className="font-ui text-left py-4 px-4"
                  style={{
                    fontSize: '11px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                    borderBottom: '1px solid var(--gold-border)',
                    width: '26%',
                  }}
                >
                  DIY / Spreadsheets
                </th>
                <th
                  className="font-ui text-left py-4 px-4"
                  style={{
                    fontSize: '11px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                    borderBottom: '1px solid var(--gold-border)',
                    width: '26%',
                  }}
                >
                  Traditional Accountant
                </th>
                <th
                  className="font-ui text-left py-4 px-4"
                  style={{
                    fontSize: '11px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: 'var(--primary)',
                    borderBottom: '2px solid var(--primary)',
                    width: '26%',
                    backgroundColor: 'rgba(201,168,76,0.04)',
                  }}
                >
                  Reckonwell
                </th>
              </tr>
            </thead>
            <tbody>
              {rows?.map((row, i) => (
                <tr key={i}>
                  <td
                    className="font-ui py-5 pr-6"
                    style={{
                      fontSize: '13px',
                      color: 'var(--foreground)',
                      fontWeight: 500,
                      borderBottom: '1px solid var(--gold-border)',
                      verticalAlign: 'top',
                    }}
                  >
                    {row?.feature}
                  </td>
                  <td
                    className="font-ui py-5 px-4"
                    style={{
                      fontSize: '13px',
                      color: 'var(--muted)',
                      borderBottom: '1px solid var(--gold-border)',
                      verticalAlign: 'top',
                      lineHeight: 1.6,
                    }}
                  >
                    {row?.diy}
                  </td>
                  <td
                    className="font-ui py-5 px-4"
                    style={{
                      fontSize: '13px',
                      color: 'var(--muted)',
                      borderBottom: '1px solid var(--gold-border)',
                      verticalAlign: 'top',
                      lineHeight: 1.6,
                    }}
                  >
                    {row?.traditional}
                  </td>
                  <td
                    className="font-ui py-5 px-4"
                    style={{
                      fontSize: '13px',
                      color: 'var(--foreground)',
                      borderBottom: '1px solid var(--gold-border)',
                      verticalAlign: 'top',
                      lineHeight: 1.6,
                      backgroundColor: 'rgba(201,168,76,0.04)',
                      fontWeight: 500,
                    }}
                  >
                    <span style={{ color: 'var(--primary)', marginRight: '6px' }}>✓</span>
                    {row?.reckonwell}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-6">
          {rows?.map((row, i) => (
            <div key={i} style={{ border: '1px solid var(--gold-border)' }}>
              <div
                className="font-ui px-4 py-3"
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--foreground)',
                  borderBottom: '1px solid var(--gold-border)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                {row?.feature}
              </div>
              <div className="grid grid-cols-3" style={{ borderBottom: '1px solid var(--gold-border)' }}>
                <div
                  className="font-ui px-3 py-2 text-center"
                  style={{
                    fontSize: '9px',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                    borderRight: '1px solid var(--gold-border)',
                  }}
                >
                  DIY
                </div>
                <div
                  className="font-ui px-3 py-2 text-center"
                  style={{
                    fontSize: '9px',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                    borderRight: '1px solid var(--gold-border)',
                  }}
                >
                  Traditional
                </div>
                <div
                  className="font-ui px-3 py-2 text-center"
                  style={{
                    fontSize: '9px',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: 'var(--primary)',
                    backgroundColor: 'rgba(201,168,76,0.06)',
                  }}
                >
                  Reckonwell
                </div>
              </div>
              <div className="grid grid-cols-3">
                <div
                  className="font-ui px-3 py-4"
                  style={{
                    fontSize: '12px',
                    color: 'var(--muted)',
                    lineHeight: 1.5,
                    borderRight: '1px solid var(--gold-border)',
                  }}
                >
                  {row?.diy}
                </div>
                <div
                  className="font-ui px-3 py-4"
                  style={{
                    fontSize: '12px',
                    color: 'var(--muted)',
                    lineHeight: 1.5,
                    borderRight: '1px solid var(--gold-border)',
                  }}
                >
                  {row?.traditional}
                </div>
                <div
                  className="font-ui px-3 py-4"
                  style={{
                    fontSize: '12px',
                    color: 'var(--foreground)',
                    lineHeight: 1.5,
                    fontWeight: 500,
                    backgroundColor: 'rgba(201,168,76,0.04)',
                  }}
                >
                  {row?.reckonwell}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p
          className="font-serif mt-10"
          style={{
            fontStyle: 'italic',
            fontSize: 'clamp(15px,1.8vw,18px)',
            color: 'var(--muted)',
            lineHeight: 1.7,
            borderLeft: '3px solid var(--primary)',
            paddingLeft: '20px',
          }}
        >
          We&apos;re not just another compliance box-tick. We&apos;re the finance function most founders wish they had.
        </p>
      </div>
    </section>
  );
}
