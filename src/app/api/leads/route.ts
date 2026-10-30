import { NextResponse } from 'next/server';
import { GYM_INFO } from '@/data/gymData';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, plan, message, webhookUrl } = body;

    // Basic validation
    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Full name must be at least 2 characters.' },
        { status: 400 }
      );
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanPhone = phone ? phone.toString().trim().replace(/\D/g, '').slice(-10) : '';
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid 10-digit Indian mobile number.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const targetWebhook = (webhookUrl && webhookUrl.trim().length > 0)
      ? webhookUrl.trim()
      : GYM_INFO.defaultWebhookUrl;

    let cloudSynced = false;
    let cloudResponse = null;

    try {
      // Send as URL encoded form or JSON to Google Apps Script Webhook
      const formData = new URLSearchParams();
      formData.append('timestamp', timestamp);
      formData.append('name', name.trim());
      formData.append('phone', cleanPhone);
      formData.append('email', email.trim());
      formData.append('plan', plan || 'Quarterly Pro');
      formData.append('message', message ? message.trim() : 'Website Direct Inquiry');
      formData.append('source', 'VST Fitness Next.js Website');

      const response = await fetch(targetWebhook, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
        cache: 'no-store',
      });

      if (response.ok) {
        cloudSynced = true;
        try {
          cloudResponse = await response.json();
        } catch {
          cloudResponse = { status: 'success' };
        }
      }
    } catch (webhookErr) {
      console.warn('Webhook sync error (saved locally):', webhookErr);
      cloudSynced = false;
    }

    return NextResponse.json({
      success: true,
      cloudSynced,
      lead: {
        timestamp,
        name: name.trim(),
        phone: cleanPhone,
        email: email.trim(),
        plan: plan || 'Quarterly Pro',
        message: message ? message.trim() : '',
        status: cloudSynced ? 'Synced' : 'Saved to Vault',
      },
      googleSheetUrl: GYM_INFO.googleSpreadsheetUrl,
      cloudResponse,
    });
  } catch (err: any) {
    console.error('Lead submission failure:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Internal server error processing lead' },
      { status: 500 }
    );
  }
}

