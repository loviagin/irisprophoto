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
    if (!verifyToken(req)) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { orderId, email, type } = await req.json();
    const resend = new Resend(process.env.RESEND_API_KEY);
    const promocode = `IRIS_${randomUUID().slice(0, 8)}`;
    const html = await render(React.createElement(Email, { type, orderId, promocode }));

    try {
        console.log("Sending email with values:", {
            from: 'noreply@irisprophoto.me',
            to: email,
            subject: 'New certificate purchase',
            html,
        });

        const data = await resend.emails.send({
            from: 'noreply@irisprophoto.me',
            to: email,
            cc: 'voroninsfamily@irisprophoto.org',
            subject: 'New certificate purchase on Iris Pro Photo',
            html,
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Email error:', error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}