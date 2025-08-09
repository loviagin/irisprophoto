import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe client using either STRIPE_SECRET_KEY or STRIPE_API_KEY
// Do not force apiVersion to avoid invalid/future version errors in test/sandbox
const STRIPE_SERVER_KEY = process.env.STRIPE_SECRET_KEY ?? process.env.STRIPE_API_KEY;
const stripe = STRIPE_SERVER_KEY ? new Stripe(STRIPE_SERVER_KEY) : null;

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
    // Достаточно проверить, что payment_status === 'paid'.
    // Некоторые сессии могут иметь отличные статусы выполнения в зависимости от версии API/типа Checkout.
    if (session.payment_status === 'paid') {
      return NextResponse.json({ valid: true, email, orderNumber, session });
    }

    return NextResponse.json({ valid: false, session });

  } catch (error) {
    console.error('Error verifying Stripe payment:', error);
    return NextResponse.json({ valid: false, error: 'Payment verification failed' }, { status: 500 });
  }
} 