// app/api/register-device/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import Device from '@/models/Device'
import jwt from 'jsonwebtoken'

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

export async function POST(req: NextRequest) {
    if (!verifyToken(req)) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const { token, userId } = await req.json()

        if (!token) {
            return NextResponse.json({ error: 'Missing device token' }, { status: 400 })
        }

        await connectToDatabase()

        const existing = await Device.findOne({ token })
        if (!existing) {
            await Device.create({ token, userId })
        }

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error('❌ Ошибка при регистрации токена:', err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}