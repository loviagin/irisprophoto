import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const STRIPE_SERVER_KEY = process.env.STRIPE_SECRET_KEY ?? process.env.STRIPE_API_KEY;
const stripe = STRIPE_SERVER_KEY ? new Stripe(STRIPE_SERVER_KEY) : null;

export async function POST(request: Request) {
  try {
    if (!stripe) {
      return NextResponse.json({ 
        error: 'Stripe is not configured' 
      }, { status: 500 });
    }

    const bookingData = await request.json();
    
    // Определяем цену в зависимости от типа съемки
    const priceMap: { [key: string]: number } = {
      'one-two': 50, // цена в долларах для 1-2 человек
      'family': 50,  // цена в долларах для 3-4 человек
    };

    const amount = priceMap[bookingData.shootingType] || 115;

    // Создаем Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: bookingData.shootingType === 'family' 
                ? 'Photo Session Appointment - Family (3-4 persons)' 
                : 'Photo Session Appointment - Individual (1-2 persons)',
              description: `Booking for ${new Date(bookingData.dateTime).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}`,
            },
            unit_amount: amount * 100, // Stripe использует центы
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/thank-you/booking?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/book`,
      customer_email: bookingData.email || undefined,
      metadata: {
        bookingData: JSON.stringify(bookingData), // Сохраняем все данные бронирования
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ 
      error: 'Failed to create checkout session' 
    }, { status: 500 });
  }
}
