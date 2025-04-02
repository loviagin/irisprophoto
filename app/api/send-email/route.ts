import { NextResponse, NextRequest } from 'next/server';
import { Resend } from 'resend';
import Email from '@/app/email/email';
import { render } from '@react-email/render';
import * as React from 'react';
import jwt from 'jsonwebtoken'
import { randomUUID } from 'crypto';
const JWT_SECRET = process.env.JWT_SECRET!

function verifyToken(req: NextRequest): boolean {
    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) return false

    const token = authHeader.split(' ')[1]
    try {
        jwt.verify(token, JWT_SECRET)
        return true
    } catch {
        return false
    }
}

export async function POST(req: NextRequest) {
    console.log("1. Received email request");
    
    if (!verifyToken(req)) {
        console.error("2. Token verification failed");
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.log("2. Token verified successfully");

    const { orderId, email, type } = await req.json();
    console.log("3. Request data:", { orderId, email, type });

    const resend = new Resend(process.env.RESEND_API_KEY);
    const promocode = `IRIS_${randomUUID().slice(0, 8)}`;
    console.log("4. Generated promocode:", promocode);

    const html = await render(React.createElement(Email, { type, orderId, promocode }));
    console.log("5. Email template rendered");

    try {
        // console.log("6. Attempting to send email with values:", {
        //     from: 'noreply@irisprophoto.me',
        //     to: email,
        //     subject: 'New certificate purchase',
        // });

        const data = await resend.emails.send({
            from: 'noreply@irisprophoto.me',
            to: email,
            cc: 'voroninsfamily@irisprophoto.org',
            subject: 'New certificate purchase on Iris Pro Photo',
            html,
        });

        console.log("7. Email sent successfully:", data);
        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('8. Email error:', error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}