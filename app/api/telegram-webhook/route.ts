import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const update = req.body;
    const TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
    if (!TOKEN) throw new Error("Telegram bot token is not provided.");

    // Если это callback-запрос и данные равны "open_status"
    if (update.callback_query && update.callback_query.data === "open_status") {
      const chatId = update.callback_query.message.chat.id;
      const messageId = update.callback_query.message.message_id;

      // Новая клавиатура с 4 кнопками для изменения статуса заказа
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

      // Отправляем запрос на редактирование клавиатуры
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

      // Отвечаем на callback-запрос, чтобы убрать индикатор загрузки в Telegram
      const callbackQueryId = update.callback_query.id;
      const answerUrl = `https://api.telegram.org/bot${TOKEN}/answerCallbackQuery`;
      await fetch(answerUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ callback_query_id: callbackQueryId })
      });

      return res.status(200).json({ success: true });
    }

    // Обработка других типов обновлений, если требуется
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: (error as Error).message
    });
  }
}