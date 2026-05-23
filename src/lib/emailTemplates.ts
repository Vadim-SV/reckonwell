/**
 * Reckonwell Email Templates
 * Gold / dark luxury design system — used for all Brevo transactional emails.
 */

const SITE_URL = 'https://reckonwell9518.builtwithrocket.new';

// ─── Shared layout helpers ────────────────────────────────────────────────────

function emailWrapper(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <!--[if mso]><noscript><xml>&lt;o:OfficeDocumentSettings&gt;&lt;o:PixelsPerInch&gt;96&lt;/o:PixelsPerInch&gt;&lt;/o:OfficeDocumentSettings&gt;</xml></noscript><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#080808;font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#080808;min-height:100vh;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;width:100%;">
          ${content}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function emailHeader(subtitle: string): string {
  return `
  <!-- Header -->
  <tr>
    <td style="background-color:#0d0d0d;border:1px solid rgba(201,168,76,0.25);border-bottom:none;padding:36px 40px 28px;text-align:center;">
      <!-- Logo wordmark -->
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td align="center">
            <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:24px;letter-spacing:4px;text-transform:uppercase;color:#f0ede4;line-height:1;">
              RECKON<span style="color:#c9a84c;">WELL</span>
            </p>
            <p style="margin:10px 0 0;font-family:Arial,sans-serif;font-size:9px;letter-spacing:5px;text-transform:uppercase;color:#c9a84c;line-height:1;">${subtitle}</p>
          </td>
        </tr>
      </table>
      <!-- Gold divider -->
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-top:24px;">
        <tr>
          <td style="height:1px;background:linear-gradient(90deg,transparent,#c9a84c,transparent);opacity:0.5;font-size:0;line-height:0;">&nbsp;</td>
        </tr>
      </table>
    </td>
  </tr>`;
}

function emailFooter(note: string): string {
  return `
  <!-- Footer -->
  <tr>
    <td style="background-color:#0a0a0a;border:1px solid rgba(201,168,76,0.25);border-top:none;padding:24px 40px;text-align:center;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td style="height:1px;background:linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent);font-size:0;line-height:0;margin-bottom:20px;">&nbsp;</td>
        </tr>
      </table>
      <p style="margin:16px 0 6px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(245,242,236,0.25);">${note}</p>
      <p style="margin:0;font-family:Arial,sans-serif;font-size:10px;color:rgba(245,242,236,0.2);">
        &copy; 2025 Reckonwell &nbsp;&middot;&nbsp;
        <a href="${SITE_URL}/privacy-policy" style="color:rgba(201,168,76,0.4);text-decoration:none;">Privacy Policy</a>
        &nbsp;&middot;&nbsp;
        <a href="${SITE_URL}/terms-of-service" style="color:rgba(201,168,76,0.4);text-decoration:none;">Terms of Service</a>
      </p>
    </td>
  </tr>`;
}

function dataRow(label: string, value: string, isLast = false, isGold = false): string {
  const borderStyle = isLast ? 'none' : '1px solid rgba(201,168,76,0.1)';
  const valueColor = isGold ? '#c9a84c' : '#f0ede4';
  return `
  <tr>
    <td style="padding:10px 0;border-bottom:${borderStyle};vertical-align:top;width:130px;">
      <span style="font-family:Arial,sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(245,242,236,0.4);">${label}</span>
    </td>
    <td style="padding:10px 0 10px 16px;border-bottom:${borderStyle};vertical-align:top;">
      <span style="font-family:Arial,sans-serif;font-size:14px;color:${valueColor};line-height:1.6;">${value}</span>
    </td>
  </tr>`;
}

// ─── 1. Referral Partner — Confirmation to Applicant ─────────────────────────

export interface ReferralApplicantData {
  firstName: string;
  fullName: string;
  email: string;
  phone?: string;
  role: string;
  network?: string;
}

export function referralConfirmationEmail(data: ReferralApplicantData): string {
  const { firstName, fullName, email, phone, role } = data;

  const body = `
  <!-- Body -->
  <tr>
    <td style="background-color:#0d0d0d;border-left:1px solid rgba(201,168,76,0.25);border-right:1px solid rgba(201,168,76,0.25);padding:40px 40px 36px;">

      <!-- Greeting -->
      <p style="margin:0 0 4px;font-family:Georgia,'Times New Roman',serif;font-size:28px;font-weight:400;color:#f0ede4;line-height:1.2;">Thank you, ${firstName}.</p>
      <p style="margin:0 0 32px;font-family:Georgia,'Times New Roman',serif;font-size:15px;font-style:italic;color:#c9a84c;">Your application has been received.</p>

      <!-- Body copy -->
      <p style="margin:0 0 20px;font-family:Arial,sans-serif;font-size:15px;line-height:1.8;color:#c8c3b8;">
        We've received your application to join the <strong style="color:#f0ede4;">Reckonwell Partner Programme</strong> and we're reviewing it personally.
        You'll hear back from us within <strong style="color:#f0ede4;">48 hours</strong> with confirmation of your partner status and your unique referral link.
      </p>

      <!-- Gold accent box — what to expect -->
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:28px 0;">
        <tr>
          <td style="background:rgba(201,168,76,0.05);border:1px solid rgba(201,168,76,0.2);border-left:3px solid #c9a84c;padding:20px 24px;">
            <p style="margin:0 0 12px;font-family:Arial,sans-serif;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#c9a84c;">What happens next</p>
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="padding:6px 0;vertical-align:top;width:20px;">
                  <span style="font-family:Arial,sans-serif;font-size:12px;color:#c9a84c;">&#8250;</span>
                </td>
                <td style="padding:6px 0 6px 8px;">
                  <span style="font-family:Arial,sans-serif;font-size:13px;color:#c8c3b8;line-height:1.6;">We review your application and confirm your partner status</span>
                </td>
              </tr>
              <tr>
                <td style="padding:6px 0;vertical-align:top;width:20px;">
                  <span style="font-family:Arial,sans-serif;font-size:12px;color:#c9a84c;">&#8250;</span>
                </td>
                <td style="padding:6px 0 6px 8px;">
                  <span style="font-family:Arial,sans-serif;font-size:13px;color:#c8c3b8;line-height:1.6;">You receive your unique referral link and partner welcome pack</span>
                </td>
              </tr>
              <tr>
                <td style="padding:6px 0;vertical-align:top;width:20px;">
                  <span style="font-family:Arial,sans-serif;font-size:12px;color:#c9a84c;">&#8250;</span>
                </td>
                <td style="padding:6px 0 6px 8px;">
                  <span style="font-family:Arial,sans-serif;font-size:13px;color:#c8c3b8;line-height:1.6;">Start referring and earn <strong style="color:#c9a84c;">10% of every client's monthly fee</strong> — for life</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <!-- Application summary -->
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:28px 0;">
        <tr>
          <td style="background:rgba(201,168,76,0.03);border:1px solid rgba(201,168,76,0.15);padding:20px 24px;">
            <p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#c9a84c;">Your Application Summary</p>
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
              ${dataRow('Name', fullName)}
              ${dataRow('Email', email)}
              ${phone ? dataRow('Phone', phone) : ''}
              ${dataRow('Role', role, true)}
            </table>
          </td>
        </tr>
      </table>

      <!-- Closing -->
      <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:15px;line-height:1.8;color:#c8c3b8;">
        If you have any questions in the meantime, simply reply to this email and we'll get back to you promptly.
      </p>
      <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:14px;font-style:italic;color:rgba(245,242,236,0.5);">— The Reckonwell Team</p>

    </td>
  </tr>`;

  return emailWrapper(`
    ${emailHeader('Partner Programme')}
    ${body}
    ${emailFooter('Reckonwell · Partner Programme')}
  `);
}

// ─── 2. Referral Partner — Internal Notification to Vadim ────────────────────

export function referralNotificationEmail(data: ReferralApplicantData): string {
  const { fullName, email, phone, role, network } = data;

  const body = `
  <!-- Body -->
  <tr>
    <td style="background-color:#0d0d0d;border-left:1px solid rgba(201,168,76,0.25);border-right:1px solid rgba(201,168,76,0.25);padding:32px 40px 36px;">

      <!-- Alert badge -->
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
        <tr>
          <td style="background:rgba(201,168,76,0.12);border:1px solid rgba(201,168,76,0.35);padding:6px 16px;">
            <span style="font-family:Arial,sans-serif;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#c9a84c;">New Partner Application</span>
          </td>
        </tr>
      </table>

      <p style="margin:0 0 28px;font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:400;color:#f0ede4;line-height:1.3;">
        ${fullName} wants to join the Partner Programme.
      </p>

      <!-- Data table -->
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border:1px solid rgba(201,168,76,0.15);margin-bottom:28px;">
        <tr>
          <td style="padding:0 24px;">
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
              ${dataRow('Full Name', fullName)}
              ${dataRow('Email', `<a href="mailto:${email}" style="color:#c9a84c;text-decoration:none;">${email}</a>`, false, false)}
              ${phone ? dataRow('Phone', `<a href="tel:${phone}" style="color:#c9a84c;text-decoration:none;">${phone}</a>`, false, false) : ''}
              ${dataRow('Role / Type', role)}
              ${network ? dataRow('Network / Notes', network, true) : dataRow('Network / Notes', '—', true)}
            </table>
          </td>
        </tr>
      </table>

      <!-- CTA -->
      <table role="presentation" cellpadding="0" cellspacing="0">
        <tr>
          <td style="background:transparent;border:1px solid #c9a84c;padding:12px 28px;">
            <a href="mailto:${email}?subject=Your%20Reckonwell%20Partner%20Application%20%E2%80%94%20Approved" style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c9a84c;text-decoration:none;">Reply to Applicant &rarr;</a>
          </td>
        </tr>
      </table>

    </td>
  </tr>`;

  return emailWrapper(`
    ${emailHeader('Internal — Partner Applications')}
    ${body}
    ${emailFooter('Reckonwell · Internal Notification')}
  `);
}

// ─── 3. Callback Request — Confirmation to Enquirer ──────────────────────────

export interface CallbackRequestData {
  name: string;
  email?: string;
  phone?: string;
  message?: string;
}

export function callbackConfirmationEmail(data: CallbackRequestData): string {
  const { name, email, phone, message } = data;
  const firstName = name.split(' ')[0] || name;

  const body = `
  <!-- Body -->
  <tr>
    <td style="background-color:#0d0d0d;border-left:1px solid rgba(201,168,76,0.25);border-right:1px solid rgba(201,168,76,0.25);padding:40px 40px 36px;">

      <!-- Greeting -->
      <p style="margin:0 0 4px;font-family:Georgia,'Times New Roman',serif;font-size:28px;font-weight:400;color:#f0ede4;line-height:1.2;">We'll be in touch, ${firstName}.</p>
      <p style="margin:0 0 32px;font-family:Georgia,'Times New Roman',serif;font-size:15px;font-style:italic;color:#c9a84c;">Your callback request has been received.</p>

      <!-- Body copy -->
      <p style="margin:0 0 20px;font-family:Arial,sans-serif;font-size:15px;line-height:1.8;color:#c8c3b8;">
        Thank you for reaching out to <strong style="color:#f0ede4;">Reckonwell</strong>. We've received your request and one of our team will call you back within <strong style="color:#f0ede4;">one business day</strong>.
      </p>

      <!-- Gold accent box -->
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:28px 0;">
        <tr>
          <td style="background:rgba(201,168,76,0.05);border:1px solid rgba(201,168,76,0.2);border-left:3px solid #c9a84c;padding:20px 24px;">
            <p style="margin:0 0 10px;font-family:Arial,sans-serif;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#c9a84c;">What to expect</p>
            <p style="margin:0;font-family:Arial,sans-serif;font-size:13px;line-height:1.8;color:#c8c3b8;">
              A member of the Reckonwell team will call you on the number you provided. If we can't reach you, we'll leave a brief message and follow up by email.
              Our calls are relaxed, no-pressure conversations — we simply want to understand your situation and see if we can help.
            </p>
          </td>
        </tr>
      </table>

      <!-- Request summary -->
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:28px 0;">
        <tr>
          <td style="background:rgba(201,168,76,0.03);border:1px solid rgba(201,168,76,0.15);padding:20px 24px;">
            <p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#c9a84c;">Your Request Summary</p>
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
              ${dataRow('Name', name)}
              ${phone ? dataRow('Phone', phone) : ''}
              ${email ? dataRow('Email', email) : ''}
              ${message ? dataRow('Enquiry', message, true) : ''}
            </table>
          </td>
        </tr>
      </table>

      <!-- Closing -->
      <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:15px;line-height:1.8;color:#c8c3b8;">
        If you'd prefer to reach us directly in the meantime, you can reply to this email and we'll respond promptly.
      </p>
      <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:14px;font-style:italic;color:rgba(245,242,236,0.5);">— The Reckonwell Team</p>

    </td>
  </tr>`;

  return emailWrapper(`
    ${emailHeader('Financial Clarity for Ambitious Businesses')}
    ${body}
    ${emailFooter('Reckonwell · Callback Request')}
  `);
}

// ─── 4. Callback Request — Internal Notification to Vadim ────────────────────

export function callbackNotificationEmail(data: CallbackRequestData): string {
  const { name, email, phone, message } = data;

  const body = `
  <!-- Body -->
  <tr>
    <td style="background-color:#0d0d0d;border-left:1px solid rgba(201,168,76,0.25);border-right:1px solid rgba(201,168,76,0.25);padding:32px 40px 36px;">

      <!-- Alert badge -->
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
        <tr>
          <td style="background:rgba(201,168,76,0.12);border:1px solid rgba(201,168,76,0.35);padding:6px 16px;">
            <span style="font-family:Arial,sans-serif;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#c9a84c;">New Callback Request</span>
          </td>
        </tr>
      </table>

      <p style="margin:0 0 28px;font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:400;color:#f0ede4;line-height:1.3;">
        ${name} is requesting a callback.
      </p>

      <!-- Data table -->
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border:1px solid rgba(201,168,76,0.15);margin-bottom:28px;">
        <tr>
          <td style="padding:0 24px;">
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
              ${dataRow('Full Name', name)}
              ${phone ? dataRow('Phone', `<a href="tel:${phone}" style="color:#c9a84c;text-decoration:none;">${phone}</a>`, false, false) : ''}
              ${email ? dataRow('Email', `<a href="mailto:${email}" style="color:#c9a84c;text-decoration:none;">${email}</a>`, false, false) : ''}
              ${message ? dataRow('Enquiry', message, true) : dataRow('Enquiry', '—', true)}
            </table>
          </td>
        </tr>
      </table>

      <!-- CTA buttons -->
      <table role="presentation" cellpadding="0" cellspacing="0">
        <tr>
          ${phone ? `<td style="padding-right:12px;">
            <table role="presentation" cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#c9a84c;padding:12px 28px;">
                  <a href="tel:${phone}" style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#080808;text-decoration:none;font-weight:bold;">Call Now &rarr;</a>
                </td>
              </tr>
            </table>
          </td>` : ''}
          ${email ? `<td>
            <table role="presentation" cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:transparent;border:1px solid #c9a84c;padding:12px 28px;">
                  <a href="mailto:${email}" style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c9a84c;text-decoration:none;">Email Instead &rarr;</a>
                </td>
              </tr>
            </table>
          </td>` : ''}
        </tr>
      </table>

    </td>
  </tr>`;

  return emailWrapper(`
    ${emailHeader('Internal — Callback Requests')}
    ${body}
    ${emailFooter('Reckonwell · Internal Notification')}
  `);
}
