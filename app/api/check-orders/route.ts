import { NextResponse } from 'next/server'
import { Client } from '@notionhq/client'
import { connectToDatabase } from '@/lib/db'
import Device from '@/models/Device'
import { sendApnPush } from '@/lib/apnSender'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const databaseId = process.env.NOTION_DATABASE_ID!

let lastKnownId: string | null = null

export async function GET() {
  try {
    // Запрашиваем последние записи из Notion
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        { property: 'Created At', direction: 'descending' }
      ],
      page_size: 1,
    })

    const first = response.results[0]
    if (!first) return NextResponse.json({ success: true, message: 'No entries found' })

    // Проверка: если это новая запись — отправляем уведомления
    if (first.id !== lastKnownId) {
      await connectToDatabase()

      if (lastKnownId !== null) {
        console.log('📢 Найдена новая запись в Notion:', first.id)

        const tokens: string[] = await Device.find().distinct('token')
        console.log(`📬 Отправляем уведомления на ${tokens.length} устройств`)

        for (const token of tokens) {
          await sendApnPush(token, 'Новый заказ!', 'Открыть в приложении')
        }
      }

      lastKnownId = first.id
    }

    return NextResponse.json({ success: true, lastId: lastKnownId })
  } catch (error: any) {
    console.error('❌ Ошибка:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}