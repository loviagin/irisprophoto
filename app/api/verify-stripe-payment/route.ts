import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export async function POST(request: Request) {
  try {
    const { session_id } = await request.json();

    if (!session_id) {
      return NextResponse.json({ valid: false, error: 'Session ID is required' }, { status: 400 });
    }

    // Получаем информацию о сессии из Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);

    // Проверяем статус платежа
    if (session.payment_status === 'paid' && session.status === 'complete') {
      return NextResponse.json({ valid: true, session });
    } else {
      return NextResponse.json({ valid: false, session });
    }

  } catch (error) {
    console.error('Error verifying Stripe payment:', error);
    return NextResponse.json({ valid: false, error: 'Payment verification failed' }, { status: 500 });
  }
} 