import { NextResponse } from "next/server";
// Импортируйте или реализуйте свою функцию обновления Firestore
// Например, import { updateOrderStatus } from "@/app/firebase/updateOrderStatus";

async function updateOrderStatus(orderId: string, newStatus: string): Promise<void> {
    // Реализуйте здесь обновление заказа в Firestore.
    // Например, используя firebase-admin или другой подход.
    console.log(`Обновление заказа ${orderId} новым статусом: ${newStatus}`);
    // Пример:
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

            // Если нажата кнопка "Изменить статус заказа" — показываем клавиатуру с вариантами статуса
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

                // Редактируем клавиатуру сообщения
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

                // Отвечаем на callback-запрос, чтобы убрать индикатор загрузки
                const answerUrl = `https://api.telegram.org/bot${TOKEN}/answerCallbackQuery`;
                await fetch(answerUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ callback_query_id: callbackQueryId }),
                });
            }
            // Если нажата кнопка со статусом (начинается с "status_")
            else if (callbackData.startsWith("status_")) {
                const newStatus = callbackData;
                const orderId = String(messageId); // пример, замените на ваш способ идентификации заказа

                // Выполняем обновление данных в Firestore
                await updateOrderStatus(orderId, newStatus);

                // Формируем новый текст сообщения с указанием нового статуса
                const newText = `Заказ обновлён. Новый статус: *${newStatus.replace("status_", "").toUpperCase()}*`;

                // Редактируем текст сообщения через Telegram API
                const editMessageTextUrl = `https://api.telegram.org/bot${TOKEN}/editMessageText`;
                await fetch(editMessageTextUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        chat_id: chatId,
                        message_id: messageId,
                        text: newText,
                        parse_mode: "Markdown"
                    }),
                });

                // Отвечаем на callback-запрос, чтобы Telegram убрал индикатор загрузки
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