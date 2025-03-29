import { NextResponse, NextRequest } from 'next/server'
import { Client } from '@notionhq/client'
import type { Order } from '@/app/types/Order'
import jwt from 'jsonwebtoken'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const JWT_SECRET = process.env.JWT_SECRET!

function verifyToken(req: NextRequest): boolean {
    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) return false

    const token = authHeader.split(' ')[1]
    try {
        jwt.verify(token, JWT_SECRET)
        return true
    } catch (err) {
        return false
    }
}

export async function GET(req: NextRequest) {
    if (!verifyToken(req)) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const response = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID!,
    })

    //   console.log(JSON.stringify(response.results[0], null, 2))

    const orders: Order[] = response.results.map((item: any) => {
        return {
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
            createdAt: item.properties['createdAt'].date?.start || ''
        }
    })

    return NextResponse.json(orders, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
    })
}

export async function POST(req: NextRequest) {
    if (!verifyToken(req)) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const data: Partial<Order> = await req.json()

    try {
        const response = await notion.pages.create({
            parent: {
                database_id: process.env.NOTION_DATABASE_ID!,
            },
            properties: {
                'Order': {
                    title: [
                        {
                            text: {
                                content: data.order || 'Без названия',
                            },
                        },
                    ],
                },
                'Status': {
                    status: {
                        name: data.status || 'None',
                    },
                },
                'Date': data.date
                    ? {
                        date: {
                            start: data.date,
                        },
                    }
                    : { date: null },
                'Address': {
                    rich_text: [
                        {
                            text: {
                                content: data.address || '',
                            },
                        },
                    ],
                },
                'Comment': {
                    rich_text: [
                        {
                            text: {
                                content: data.comment || '',
                            },
                        },
                    ],
                },
                'Decor': {
                    status: {
                        name: data.decor || 'None',
                    },
                },
                'Email': {
                    email: data.email || '',
                },
                'Frame #': {
                    rich_text: [
                        {
                            text: {
                                content: data.frame || '',
                            },
                        },
                    ],
                },
                'Material': {
                    select: {
                        name: data.material || 'Acrilic',
                    },
                },
                'Name': {
                    rich_text: [
                        {
                            text: {
                                content: data.name || '',
                            },
                        },
                    ],
                },
                'Phone number': {
                    rich_text: [
                        {
                            text: {
                                content: data.phone || '',
                            },
                        },
                    ],
                },
                'Position': {
                    select: {
                        name: data.position || 'Circle',
                    },
                },
                'Size': {
                    select: {
                        name: data.size || '20x36',
                    },
                },
                'Track #': {
                    rich_text: [
                        {
                            text: {
                                content: data.track1 || '',
                            },
                        },
                    ],
                },
                'Track # 1': {
                    rich_text: [
                        {
                            text: {
                                content: data.track2 || '',
                            },
                        },
                    ],
                },
                'Type of delivery': {
                    select: {
                        name: data.typeOfDelivery || 'Pick up',
                    },
                },
                'effect': {
                    select: {
                        name: data.effect || 'Radiance',
                    },
                },
                'createdAt': {
                    date: {
                        start: data.createdAt || new Date().toISOString(),
                    },
                },
                ...(data.companies
                    ? {
                        'Companies': {
                            select: {
                                name: data.companies,
                            },
                        },
                    }
                    : {}),
            },
        })

        return NextResponse.json({ success: true, id: response.id })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}