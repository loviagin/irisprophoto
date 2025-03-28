import { NextResponse, NextRequest } from 'next/server'
import { Client } from '@notionhq/client'
import { connectToDatabase } from '@/lib/db'
import Device from '@/models/Device'
import Meta from '@/models/Meta'
import { sendApnPush } from '@/lib/apnSender'
import jwt from 'jsonwebtoken'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const databaseId = process.env.NOTION_DATABASE_ID!
const JWT_SECRET = process.env.JWT_SECRET!

function verifyToken(req: NextRequest): boolean {
    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) return false

    const token = authHeader.split(' ')[1]
    try {
        jwt.verify(token, JWT_SECRET)
        return true
    } catch {
        return false
    }
}

export async function GET(req: NextRequest) {
    if (!verifyToken(req)) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    try {
        // Подключение к MongoDB
        await connectToDatabase()

        // Получение последнего известного ID из БД
        const meta = await Meta.findById('last_order_id')
        const savedLastId = meta?.value || null

        // Получение самого нового заказа из Notion
        const response = await notion.databases.query({
            database_id: databaseId,
            sorts: [{ property: 'Date', direction: 'descending' }],
            page_size: 1,
        })

        const first = response.results[0]
        if (!first) {
            return NextResponse.json({ success: true, message: 'No entries found' })
        }

        // Проверка: новый ли это заказ
        if (first.id !== savedLastId) {
            if (savedLastId !== null) {
                console.log('📢 Найден новый заказ в Notion:', first.id)

                const tokens: string[] = await Device.find().distinct('token')
                console.log(`📬 Отправляем уведомления на ${tokens.length} устройств`)

                for (const token of tokens) {
                    await sendApnPush(token, 'Новый заказ!', 'Открой в приложении')
                }
            }

            // Сохраняем ID нового заказа
            await Meta.findByIdAndUpdate(
                'last_order_id',
                { value: first.id },
                { upsert: true }
            )
        }

        return NextResponse.json({ success: true, lastId: first.id })
    } catch (error: any) {
        console.error('❌ Ошибка:', error)
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}