import { NextResponse } from "next/server";

// Пример функции обновления заказа в Firestore
async function updateOrderStatus(orderId: string, newStatus: string): Promise<void> {
    console.log(`Обновление заказа ${orderId} новым статусом: ${newStatus}`);
    // Здесь реализуйте обновление заказа в Firestore, например:
    // const db = getFirestore();
    // const orderRef = doc(db, "orders", orderId);
    // await updateDoc(orderRef, { status: newStatus });
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
                            { text: "В работе", callback_data: "status_in_progress" }
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
                // Получаем новый статус в виде строки, убираем префикс и приводим к верхнему регистру
                const newStatusStr = callbackData.replace("status_", "").toUpperCase();

                // Получаем оригинальный текст сообщения
                const oldText: string = update.callback_query.message.text || "";
                // Обновляем только часть, где указан статус.
                // Предполагаем, что в оригинальном сообщении строка со статусом имеет вид:
                // "👤 *Order status:* <OLD_STATUS>"
                const newText = oldText.replace(
                    /(👤 \*Order status:\*\s*)[^\n]*/,
                    `$1${newStatusStr}`
                );

                // Используем messageId как идентификатор заказа (или другой способ, в зависимости от логики)
                const orderId = String(messageId);

                // Обновляем статус заказа в Firestore
                await updateOrderStatus(orderId, newStatusStr);

                // Формируем объект клавиатуры, чтобы после обновления статус можно менять повторно
                const newKeyboard = {
                    inline_keyboard: [
                        [
                            { text: "Новый", callback_data: "status_new" },
                            { text: "В работе", callback_data: "status_in_progress" }
                        ],
                        [
                            { text: "Завершён", callback_data: "status_completed" },
                            { text: "Отменён", callback_data: "status_cancelled" }
                        ]
                    ]
                };

                // Редактируем текст сообщения с обновлённым статусом и оставляем клавиатуру
                const editMessageTextUrl = `https://api.telegram.org/bot${TOKEN}/editMessageText`;
                await fetch(editMessageTextUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        chat_id: chatId,
                        message_id: messageId,
                        text: newText,
                        parse_mode: "Markdown",
                        reply_markup: newKeyboard // Передаём клавиатуру, чтобы она осталась
                    }),
                });

                // Отвечаем на callback-запрос, чтобы убрать индикатор загрузки в Telegram
                const answerUrl = `https://api.telegram.org/bot${TOKEN}/answerCallbackQuery`;
                await fetch(answerUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ callback_query_id: callbackQueryId }),
                });
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