import { NextRequest, NextResponse } from 'next/server';
const { SquareClient, SquareEnvironment, SquareError } = require("square");

require('dotenv').config()

const client = new SquareClient({
    token: process.env.SQUARE_ACCESS_TOKEN,
    environment: SquareEnvironment.Sandbox,
  });

export async function POST(req: NextRequest) {
    const body = await req.json();
    const idempotencyKey = crypto.randomUUID();

    try {
        const response = await client.paymentsApi.createPayment({
            sourceId: body.sourceId,
            idempotencyKey,
            locationId: process.env.SQUARE_LOCATION_ID!,
            amountMoney: {
                amount: body.amount,
                currency: body.currency,
            },
            note: 'Оплата подарочного сертификата',
        });

        // Отправка email с сертификатом
        await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                paymentId: response.result.payment.id,
                amount: body.amount / 100, // Конвертируем центы в доллары
            }),
        });

        return NextResponse.json({ payment: response.result.payment });
    } catch (error: any) {
        console.error('Payment error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}