import { NextResponse } from "next/server";
import admin from "firebase-admin";

// Инициализация firebase-admin (если ещё не инициализирован)
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            // Если privateKey содержит переносы строк, заменяем их корректно
            privateKey: process.env.FIREBASE_PRIVATE_KEY
                ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
                : undefined,
        }),
    });
}

const db = admin.firestore();

async function updateOrderStatus(orderId: string, newStatus: string): Promise<void> {
    const orderRef = db.collection("orders").doc(orderId);
    await orderRef.update({
        status: newStatus,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
}

export async function POST(req: Request) {
    try {
        const update = await req.json();
        const TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
        if (!TOKEN) throw new Error("Telegram bot token is not provided.");

        if (update.callback_query) {
            const chatId = update.callback_query.message.chat.id;
            const messageId = update.callback_query.message.message_id;
            const callbackData: string = update.callback_query.data;
            const callbackQueryId = update.callback_query.id;

            // Если нажата кнопка "Изменить статус заказа" – выводим клавиатуру с вариантами статуса
            if (callbackData === "open_status") {
                const newKeyboard = {
                    inline_keyboard: [
                        [
                            { text: "Новый", callback_data: "status_new" },
                            { text: "В работе", callback_data: "status_inProgress" }
                        ],
                        [
                            { text: "Завершён", callback_data: "status_completed" },
                            { text: "Отменён", callback_data: "status_cancelled" }
                        ]
                    ]
                };

                const editMessageUrl = `https://api.telegram.org/bot${TOKEN}/editMessageReplyMarkup`;
                await fetch(editMessageUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        chat_id: chatId,
                        message_id: messageId,
                        reply_markup: newKeyboard
                    }),
                });

                const answerUrl = `https://api.telegram.org/bot${TOKEN}/answerCallbackQuery`;
                await fetch(answerUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ callback_query_id: callbackQueryId }),
                });
            }
            // Если нажата кнопка со статусом (например, "status_new", "status_in_progress", и т.д.)
            else if (callbackData.startsWith("status_")) {
                const newStatusStr = callbackData.replace("status_", "").toUpperCase();
                console.log("New status:", newStatusStr);

                const oldText: string = update.callback_query.message.text || "";
                console.log("Old text before update:", oldText);

                // Если текст не содержит ожидаемой строки, можно сформировать его заново
                const newText = oldText + "\nOrder status changed to: " + newStatusStr;
                console.log("New text to set:", newText);

                const orderId = String(messageId);
                await updateOrderStatus(orderId, newStatusStr);

                const newKeyboard = {
                    inline_keyboard: [
                        [
                            { text: "Изменить статус заказа", callback_data: "open_status" }
                        ]
                    ]
                };

                const editMessageTextUrl = `https://api.telegram.org/bot${TOKEN}/editMessageText`;
                const editResponse = await fetch(editMessageTextUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        chat_id: chatId,
                        message_id: messageId,
                        text: newText,
                        parse_mode: "Markdown",
                        reply_markup: newKeyboard
                    }),
                });
                const editResult = await editResponse.json();
                console.log("editMessageText result:", editResult);

                const answerUrl = `https://api.telegram.org/bot${TOKEN}/answerCallbackQuery`;
                const answerResponse = await fetch(answerUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ callback_query_id: callbackQueryId }),
                });
                const answerResult = await answerResponse.json();
                console.log("answerCallbackQuery result:", answerResult);
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error in Telegram Webhook:", error);
        return NextResponse.json(
            { success: false, error: (error as Error).message },
            { status: 500 }
        );
    }
}