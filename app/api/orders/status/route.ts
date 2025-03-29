import { NextResponse, NextRequest } from 'next/server'
import { Client } from '@notionhq/client'
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

export async function POST(req: NextRequest) {
    if (!verifyToken(req)) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { orderId, field, data }: { orderId: string; field: string; data: string } = await req.json();

    try {
        const response = await notion.pages.update({
            page_id: orderId,
            properties: {
                [field]: {
                    status: {
                        name: data || 'None',
                    },
                },
            },
        });

        return NextResponse.json({ success: true, id: response.id })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}