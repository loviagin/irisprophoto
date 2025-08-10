import { NextResponse, NextRequest } from 'next/server'
import { Client } from '@notionhq/client'
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
        // Получаем сегодняшнюю дату в формате YYYY-MM-DD
        const today = new Date()
        const todayString = today.toISOString().split('T')[0]

        console.log(`📅 Поиск заказов с deliveryDate: ${todayString}`)

        // Получаем заказы с deliveryDate равной сегодня
        const notionResponse = await notion.databases.query({
            database_id: databaseId,
            filter: {
                property: 'Delivery Date',
                date: {
                    equals: todayString
                }
            },
            sorts: [
                {
                    property: 'Delivery Date',
                    direction: 'ascending'
                }
            ]
        })

        const todaysDeliveries = notionResponse.results.map((item: any) => ({
            id: item.id,
            order: item.properties['Order'].title?.[0]?.plain_text || '',
            status: item.properties['Status'].status?.name || '',
            date: item.properties['Date'].date?.start || '',
            address: item.properties['Address'].rich_text?.[0]?.plain_text || '',
            comment: item.properties['Comment'].rich_text?.[0]?.plain_text || '',
            companies: item.properties['Companies'].select?.name || '',
            decor: item.properties['Decor'].select?.name || '',
            email: item.properties['Email'].email || '',
            frame: item.properties['Frame #'].rich_text?.[0]?.plain_text || '',
            material: item.properties['Material'].select?.name || '',
            name: item.properties['Name'].rich_text?.[0]?.plain_text || '',
            phone: item.properties['Phone number'].rich_text?.[0]?.plain_text || '',
            position: item.properties['Position'].select?.name || '',
            size: item.properties['Size'].select?.name || '',
            track1: item.properties['Track #'].rich_text?.[0]?.plain_text || '',
            track2: item.properties['Track # 1'].rich_text?.[0]?.plain_text || '',
            typeOfDelivery: item.properties['Type of delivery'].select?.name || '',
            effect: item.properties['effect'].select?.name || '',
            deliveryDate: item.properties['Delivery Date'].date?.start || '',
            createdAt: item.properties['createdAt'].date?.start || '',
            icon: item.icon?.type === 'emoji'
                ? item.icon.emoji
                : item.icon?.type === 'external'
                    ? item.icon.external.url
                    : null,
        }))

        console.log(`✅ Найдено заказов на доставку сегодня: ${todaysDeliveries.length}`)

        return NextResponse.json({ 
            success: true, 
            todaysDeliveries,
            count: todaysDeliveries.length,
            date: todayString
        })
    } catch (error: any) {
        console.error('❌ Ошибка при получении заказов на доставку:', error)
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}
