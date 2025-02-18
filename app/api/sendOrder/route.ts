import { NextResponse } from "next/server";
import admin from "firebase-admin";

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY
                ? process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
                : undefined,
        }),
    });
}

const db = admin.firestore();

export async function POST(req: Request) {
    try {
        const { name, email, phone, details } = await req.json();

        console.log("Received order:", { name, email, phone, details });

        const TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
        const CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

        console.log("TOKEN:", TOKEN);
        console.log("CHAT_ID:", CHAT_ID);

        const message = `📩 *New Order Without Registration* 📩\n\n` +
            `⚡️ *Order status:* NEW\n` +
            `👤 *Name:* ${name}\n` +
            `📧 *Email:* ${email}\n` +
            `📞 *Phone:* ${phone}\n` +
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

        // Извлекаем message_id из ответа Telegram API
        const messageId = result.result.message_id;
        console.log("Extracted messageId:", messageId);

        // Добавляем документ в коллекцию "orders" Firestore с данными заказа и messageId
        await db.collection("orders").doc(messageId.toString()).set({
            name,
            email,
            details,
            status: "NEW",
            createdAt: new Date(),
        });

        return NextResponse.json({ success: true, messageId });
    } catch (error) {
        console.error("Error in sendOrder:", error);
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}