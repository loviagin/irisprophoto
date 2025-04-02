import { NextResponse, NextRequest } from 'next/server';
import { Resend } from 'resend';
import Email from '@/app/email-order/email';
import { render } from '@react-email/render';
import * as React from 'react';
import jwt from 'jsonwebtoken'
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

    const { name, email, date } = await req.json();
    const resend = new Resend(process.env.RESEND_API_KEY);
    const html = await render(React.createElement(Email, { name, date }));

    try {
        // console.log("Sending email with values:", {
        //     from: 'noreply@irisprophoto.me',
        //     to: email,
        //     subject: 'New order from site on Iris Pro Photo',
        //     html,
        // });

        const data = await resend.emails.send({
            from: 'noreply@irisprophoto.me',
            to: email,
            // cc: 'voroninsfamily@irisprophoto.org',
            subject: 'New order from site on Iris Pro Photo',
            html,
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Email error:', error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}