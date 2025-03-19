import { NextResponse } from 'next/server';
import { sendCertificateEmail } from '@/lib/resend';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, certificateCode, certificateType, price } = body;

    if (!email || !certificateCode || !certificateType || !price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await sendCertificateEmail({
      email,
      certificateCode,
      certificateType,
      price
    });

    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in send-certificate route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 