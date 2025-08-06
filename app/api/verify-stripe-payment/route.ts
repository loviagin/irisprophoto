import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe client only if the secret key is available
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-06-30.basil',
    })
  : null;

export async function POST(request: Request) {
  try {
    // Check if Stripe is properly configured
    if (!stripe) {
      return NextResponse.json({ 
        valid: false, 
        error: 'Stripe is not configured' 
      }, { status: 500 });
    }

    const { session_id } = await request.json();

    if (!session_id) {
      return NextResponse.json({ valid: false, error: 'Session ID is required' }, { status: 400 });
    }

    // Получаем информацию о сессии из Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);

    // Получаем email покупателя
    let email = session.customer_email;
    if (!email && session.customer_details && session.customer_details.email) {
      email = session.customer_details.email;
    }

    // Получаем номер заказа из metadata
    let orderNumber = undefined;
    if (session.metadata && session.metadata.order_id) {
      orderNumber = session.metadata.order_id;
    }

    // Проверяем статус платежа
    if (session.payment_status === 'paid' && session.status === 'complete') {
      return NextResponse.json({ valid: true, email, orderNumber, session });
    } else {
      return NextResponse.json({ valid: false, session });
    }

  } catch (error) {
    console.error('Error verifying Stripe payment:', error);
    return NextResponse.json({ valid: false, error: 'Payment verification failed' }, { status: 500 });
  }
} 