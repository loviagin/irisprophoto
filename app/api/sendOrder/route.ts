import { NextResponse } from "next/server";
import admin from "firebase-admin";

if (!admin.apps.length) {
    const serviceAccount = {
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY
            ? process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n').replace(/\n/g, '\n')
            : undefined,
    };

    if (!serviceAccount.projectId) {
        throw new Error("FIREBASE_PROJECT_ID is not defined in environment variables");
    }

    if (!serviceAccount.privateKey) {
        throw new Error("FIREBASE_PRIVATE_KEY is not defined in environment variables");
    }

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
}

const db = admin.firestore();

interface OrderData {
    name: string;
    phone: string;
    email: string;
    shootingType: string;
    date: Date;
    details: string;
}

export async function POST(request: Request) {
    try {
        const rawData = await request.json();
        
        // Преобразуем строку даты в объект Date
        const data: OrderData = {
            ...rawData,
            date: new Date(rawData.date)
        };

        if (!data.name || !data.date) {
            return NextResponse.json(
                { success: false, error: "Missing required fields" },
                { status: 400 }
            );
        }

        const TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
        const CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

        const formattedDate = data.date.toLocaleString('ru-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        const message = `📩 *New Order Without Registration* 📩\n\n` +
            `⚡️ *Order status:* NEW\n` +
            `👤 *Name:* ${data.name}\n` +
            `📧 *Email:* ${data.email}\n` +
            `📞 *Phone:* ${data.phone}\n` +
            `📸 *Shooting type:* ${data.shootingType}\n` +
            `📅 *Date:* ${formattedDate}\n` +
            `📝 *Details:*\n${data.details}`;

        const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

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
        if (!result.ok) throw new Error(result.description);

        const messageId = result.result.message_id;

        // Сохраняем в Firestore с объектом Date
        await db.collection("orders").doc(messageId.toString()).set({
            name: data.name,
            email: data.email,
            phone: data.phone,
            shootingType: data.shootingType,
            date: data.date, // Теперь это объект Date
            details: data.details,
            status: "NEW",
            createdAt: new Date(),
        });

        return NextResponse.json({ success: true, messageId });
    } catch (error) {
        console.error("Error in sendOrder:", error);
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}