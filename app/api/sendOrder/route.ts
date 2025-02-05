import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { name, email, details } = await req.json();

        const TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN; // Храним токен в .env
        const CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID; // Храним chat_id в .env

        const message = `📩 *New Order Without Registration* 📩\n\n` +
                        `👤 *Name:* ${name}\n` +
                        `📧 *Email:* ${email}\n` +
                        `📝 *Details:*\n${details}`;

        const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: "Markdown",
            }),
        });

        const result = await response.json();
        if (!result.ok) throw new Error(result.description);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}