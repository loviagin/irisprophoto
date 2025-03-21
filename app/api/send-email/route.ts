import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import Email from '@/app/email/email';
import { render } from '@react-email/render';
import * as React from 'react';

export async function POST() {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const html = await render(React.createElement(Email, { url: 'https://irisprophoto.me' }));

  try {
    const data = await resend.emails.send({
      from: 'noreply@irisprophoto.me',
      to: 'ilia.loviagin@gmail.com',
      subject: 'New certificate purchase',
      html,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}