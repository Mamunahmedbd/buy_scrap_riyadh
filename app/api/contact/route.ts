import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

// Basic HTML Sanitizer to prevent script/HTML injection
function sanitize(val: string): string {
  if (typeof val !== 'string') return '';
  return val.replace(/<[^>]*>/g, '').trim();
}

// Validate Email Format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate Phone Number Format (allows digits, spaces, dashes, parentheses, leading plus)
function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[+\d\s().-]{5,30}$/;
  return phoneRegex.test(phone);
}

export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid or malformed JSON payload' },
        { status: 400 }
      );
    }

    const name = sanitize(body.name || '');
    const phone = sanitize(body.phone || '');
    const email = sanitize(body.email || '');
    const scrapType = sanitize(body.scrapType || '');
    const location = sanitize(body.location || '');
    const description = sanitize(body.description || '');
    const locale = sanitize(body.locale || 'en');

    // Validation checks
    const errors: Record<string, string> = {};

    if (!name) {
      errors.name = 'Name is required';
    } else if (name.length < 2 || name.length > 100) {
      errors.name = 'Name must be between 2 and 100 characters';
    }

    if (!phone) {
      errors.phone = 'Phone number is required';
    } else if (!isValidPhone(phone)) {
      errors.phone = 'Invalid phone number format';
    }

    if (email && (email.length > 100 || !isValidEmail(email))) {
      errors.email = 'Invalid email address format';
    }

    if (scrapType && scrapType.length > 100) {
      errors.scrapType = 'Scrap type selection is invalid';
    }

    if (location && location.length > 200) {
      errors.location = 'Location detail is too long';
    }

    if (description && description.length > 1000) {
      errors.description = 'Description is too long (max 1000 characters)';
    }

    if (Object.keys(errors).length > 0) {
      const clientIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown';
      console.warn(`[Contact API] Validation failed for payload from IP: ${clientIp}. Errors:`, errors);
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    // Generate submission metadata
    const submissionId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const createdAt = new Date().toLocaleString('en-US', { timeZone: 'Asia/Riyadh' }) + ' (Riyadh Time)';

    // Retrieve environment variables
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpFrom = process.env.SMTP_FROM || '"Riyadh Scrap Buyer Leads" <leads@riyadhscrapbuyer.com>';
    const smtpTo = process.env.SMTP_TO || 'owner@riyadhscrapbuyer.com';

    // HTML Email Template matching the corporate brand style (navy & gold)
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Scrap Buyer Lead</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f5f8;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            background-color: #ffffff;
            margin: 0 auto;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0,0,0,0.05);
            border-top: 5px solid #f5b731; /* Gold border accent */
          }
          .header {
            background-color: #1a1f71; /* Deep Navy brand color */
            color: #ffffff;
            padding: 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 800;
            letter-spacing: 0.5px;
          }
          .content {
            padding: 30px;
          }
          .section-title {
            font-size: 16px;
            font-weight: 800;
            color: #1a1f71;
            border-bottom: 2px solid #f0f1f5;
            padding-bottom: 8px;
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .data-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 25px;
          }
          .data-table th, .data-table td {
            text-align: left;
            padding: 12px 10px;
            border-bottom: 1px solid #f0f1f5;
          }
          .data-table th {
            width: 35%;
            color: #666666;
            font-size: 13px;
            font-weight: bold;
            text-transform: uppercase;
          }
          .data-table td {
            color: #222222;
            font-size: 15px;
          }
          .data-table td a {
            color: #1a1f71;
            text-decoration: none;
            font-weight: bold;
          }
          .message-box {
            background-color: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            padding: 15px;
            color: #222222;
            font-size: 14px;
            line-height: 1.5;
            white-space: pre-wrap;
          }
          .footer {
            background-color: #f9fafb;
            padding: 20px;
            text-align: center;
            font-size: 11px;
            color: #999999;
            border-top: 1px solid #e5e7eb;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>NEW SCRAP BUYER LEAD</h1>
          </div>
          <div class="content">
            <h2 class="section-title">Lead Information</h2>
            <table class="data-table">
              <tr>
                <th>Lead ID</th>
                <td><code>${submissionId}</code></td>
              </tr>
              <tr>
                <th>Submitted At</th>
                <td>${createdAt}</td>
              </tr>
              <tr>
                <th>Language</th>
                <td>${locale.toUpperCase()}</td>
              </tr>
              <tr>
                <th>Seller Name</th>
                <td style="font-weight: bold;">${name}</td>
              </tr>
              <tr>
                <th>Phone Number</th>
                <td><a href="tel:${phone.replace(/[^\d+]/g, '')}">${phone}</a></td>
              </tr>
              <tr>
                <th>Email Address</th>
                <td>${email ? `<a href="mailto:${email}">${email}</a>` : '<span style="color: #999999; font-style: italic;">Not provided</span>'}</td>
              </tr>
              <tr>
                <th>Type of Scrap</th>
                <td>${scrapType || '<span style="color: #999999; font-style: italic;">Not selected</span>'}</td>
              </tr>
              <tr>
                <th>Location</th>
                <td>${location || '<span style="color: #999999; font-style: italic;">Not specified</span>'}</td>
              </tr>
            </table>

            <h2 class="section-title">Scrap Details / Message</h2>
            <div class="message-box">${description || 'No additional details provided.'}</div>
          </div>
          <div class="footer">
            This email was automatically generated by the Riyadh Scrap Buyer Contact Form.<br>
            IP Info / User Agent: ${request.headers.get('user-agent') || 'Unknown'}
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email using SMTP if configured, otherwise fallback to console logging
    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(smtpPort || '465'),
        secure: smtpPort === '465', // SSL connection
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: smtpFrom,
        to: smtpTo,
        subject: `🚨 [New Scrap Lead] ${name} - ${scrapType || 'General'}`,
        text: `New Lead Details:\n\nID: ${submissionId}\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nScrap: ${scrapType}\nLocation: ${location}\nDescription: ${description}`,
        html: emailHtml,
      });

      console.info(`[Contact API] Email sent successfully via SMTP. ID: ${submissionId}`);
    } else {
      console.warn('[Contact API] SMTP credentials not set in environment variables. Logging lead submission directly to stdout:');
      console.dir({
        id: submissionId,
        createdAt,
        name,
        phone,
        email,
        scrapType,
        location,
        description,
        locale,
      }, { depth: null });
    }

    return NextResponse.json(
      { success: true, id: submissionId },
      { status: 201 }
    );
  } catch (error) {
    console.error('[Contact API] Unhandled server error processing submission:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected internal server error occurred' },
      { status: 500 }
    );
  }
}
