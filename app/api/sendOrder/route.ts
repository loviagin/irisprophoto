import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { name, email, details } = await req.json();

        console.log("Received order:", { name, email, details });

        const TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN; 
        const CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

        console.log("TOKEN:", TOKEN);
        console.log("CHAT_ID:", CHAT_ID);
        console.log("Received order:", { name, email, details });

        const message = `📩 *New Order Without Registration* 📩\n\n` +
                        `👤 *Name:* ${name}\n` +
                        `📧 *Email:* ${email}\n` +
                        `📝 *Details:*\n${details}`;

        const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
        console.log("Request URL:", url);

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: "Markdown",
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: "Изменить статус заказа",
                                callback_data: "open_status"
                            }
                        ]
                    ]
                },
            }),
        });

        const result = await response.json();
        console.log("Telegram API response:", result);
        if (!result.ok) throw new Error(result.description);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error in sendOrder:", error);
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}