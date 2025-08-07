import { NextResponse, NextRequest } from 'next/server'
import { Client } from '@notionhq/client'
import { connectToDatabase } from '@/lib/db'
import Device from '@/models/Device'
import { sendApnPush } from '@/lib/apnSender'
import jwt from 'jsonwebtoken'
import OrderRecord from '@/models/OrderRecord'

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
        await connectToDatabase()

        const notionResponse = await notion.databases.query({
            database_id: databaseId,
            sorts: [{ property: 'Date', direction: 'descending' }]
        })

        const newOrders: string[] = []

        for (const result of notionResponse.results) {
            const orderId = result.id

            const alreadyExists = await OrderRecord.exists({ id: orderId })
            if (!alreadyExists) {
                newOrders.push(orderId)
                await OrderRecord.create({ id: orderId })
            }
        }

        if (newOrders.length > 0) {
            console.log('📢 Найдены новые заказы:', newOrders)

            const tokens: string[] = await Device.find().distinct('token')
            for (const token of tokens) {
                await sendApnPush(token, '📷 Новый заказ!', 'Проверь в приложении', "")
            }
        }

        return NextResponse.json({ success: true, newOrders })
    } catch (error: any) {
        console.error('❌ Ошибка при получении заказов:', error)
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    if (!verifyToken(req)) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    try {
        // await connectToDatabase()

        // Получаем сегодняшнюю дату в формате YYYY-MM-DD
        const today = new Date()
        const todayString = today.toISOString().split('T')[0]

        // Получаем заказы на сегодня
        const notionResponse = await notion.databases.query({
            database_id: databaseId,
            filter: {
                property: 'Date',
                date: {
                    equals: todayString
                }
            }
        })

        const todaysOrders = notionResponse.results
        const orderCount = todaysOrders.length

        if (orderCount > 0) {
            console.log(`📅 Найдено заказов на сегодня (${todayString}):`, orderCount)

            // Получаем все токены устройств
            // const devices = await Device.find()
            
            // if (devices.length > 0) {
            //     // Отправляем уведомление на все устройства
            //     for (const device of devices) {
            //         await sendApnPush(
            //             device.token, 
            //             `📅 Заказы на сегодня`, 
            //             `У вас ${orderCount} заказ(ов) на сегодня`, 
            //             "today-orders"
            //         )
            //     }
                
            //     console.log(`✅ Уведомления отправлены на ${devices.length} устройств`)
            // } else {
            //     console.log('⚠️ Нет зарегистрированных устройств для отправки уведомлений')
            // }
        } else {
            console.log(`📅 На сегодня (${todayString}) заказов нет`)
        }

        return NextResponse.json({ 
            success: true, 
            todaysOrders: orderCount,
            date: todayString
        })
    } catch (error: any) {
        console.error('❌ Ошибка при получении заказов на сегодня:', error)
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}
