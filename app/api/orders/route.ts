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

    const id = req.nextUrl.searchParams.get('id')

    if (id) {
        try {
            const page = await notion.pages.retrieve({ page_id: id })

            if (!page || (page as any).object === 'error') {
                return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 })
            }

            const order: Order = {
                id: page.id,
                order: (page as any).properties['Order'].title?.[0]?.plain_text || '',
                status: (page as any).properties['Status'].status?.name || '',
                date: (page as any).properties['Date'].date?.start || '',
                address: (page as any).properties['Address'].rich_text?.[0]?.plain_text || '',
                comment: (page as any).properties['Comment'].rich_text?.[0]?.plain_text || '',
                companies: (page as any).properties['Companies'].select?.name || '',
                decor: (page as any).properties['Decor'].select?.name || '',
                email: (page as any).properties['Email'].email || '',
                frame: (page as any).properties['Frame #'].rich_text?.[0]?.plain_text || '',
                material: (page as any).properties['Material'].select?.name || '',
                name: (page as any).properties['Name'].rich_text?.[0]?.plain_text || '',
                phone: (page as any).properties['Phone number'].rich_text?.[0]?.plain_text || '',
                position: (page as any).properties['Position'].select?.name || '',
                size: (page as any).properties['Size'].select?.name || '',
                track1: (page as any).properties['Track #'].rich_text?.[0]?.plain_text || '',
                track2: (page as any).properties['Track # 1'].rich_text?.[0]?.plain_text || '',
                typeOfDelivery: (page as any).properties['Type of delivery'].select?.name || '',
                effect: (page as any).properties['effect'].select?.name || '',
                deliveryDate: (page as any).properties['Delivery Date'].date?.start || '',
                createdAt: (page as any).properties['createdAt'].date?.start || '',
                icon: (page as any).icon?.type === 'emoji'
                    ? (page as any).icon.emoji
                    : (page as any).icon?.type === 'external'
                        ? (page as any).icon.external.url
                        : null,
            }

            return NextResponse.json(order, {
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
            })
        } catch (err) {
            return NextResponse.json({ success: false, error: 'Invalid ID' }, { status: 400 })
        }
    }

    let allResults: any[] = []
    let hasMore = true
    let startCursor: string | undefined = undefined

    while (hasMore) {
        const response = await notion.databases.query({
            database_id: process.env.NOTION_DATABASE_ID!,
            start_cursor: startCursor,
        })

        allResults = allResults.concat(response.results)
        hasMore = response.has_more
        startCursor = response.next_cursor || undefined
    }

    const orders: Order[] = allResults.map((item: any) => {
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
            deliveryDate: item.properties['Delivery Date'].date?.start || '',
            createdAt: item.properties['createdAt'].date?.start || '',
            icon: item.icon?.type === 'emoji'
                ? item.icon.emoji
                : item.icon?.type === 'external'
                    ? item.icon.external.url
                    : null,
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
    console.log(data)

    try {
        const response = await notion.pages.create({
            parent: {
                database_id: process.env.NOTION_DATABASE_ID!,
            },
            icon: {
                type: 'external',
                external: {
                    url: data.order === "New order from site" ? "https://www.notion.so/icons/globe_purple.svg" : "https://www.notion.so/icons/compose_purple.svg"
                }
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
                    email: data.email || null,
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
                        name: data.material || 'None',
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
                    rich_text: data.phone ? [
                        {
                            text: {
                                content: data.phone,
                            },
                        },
                    ] : [],
                },
                'Position': {
                    select: {
                        name: data.position || 'None',
                    },
                },
                'Size': {
                    select: {
                        name: data.size || 'None',
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
                        name: data.typeOfDelivery || 'None',
                    },
                },
                'effect': {
                    select: {
                        name: data.effect || 'None',
                    },
                },
                'Delivery Date': data.deliveryDate
                    ? {
                        date: {
                            start: data.deliveryDate,
                        },
                    }
                    : { date: null },
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

        console.log(response.id)
        return NextResponse.json({ success: true, id: response.id })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}