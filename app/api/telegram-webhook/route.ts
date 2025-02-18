import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const update = await req.json();
    const TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
    if (!TOKEN) throw new Error("Telegram bot token is not provided.");

    // Проверяем, что это callback_query с нужными данными
    if (update.callback_query && update.callback_query.data === "open_status") {
      const chatId = update.callback_query.message.chat.id;
      const messageId = update.callback_query.message.message_id;

      // Новая клавиатура
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

      // Редактируем клавиатуру
      const editMessageUrl = `https://api.telegram.org/bot${TOKEN}/editMessageReplyMarkup`;
      await fetch(editMessageUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          message_id: messageId,
          reply_markup: newKeyboard
        })
      });

      // Ответ на callback (убирает «часики» в Телеграме)
      const callbackQueryId = update.callback_query.id;
      const answerUrl = `https://api.telegram.org/bot${TOKEN}/answerCallbackQuery`;
      await fetch(answerUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ callback_query_id: callbackQueryId })
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}