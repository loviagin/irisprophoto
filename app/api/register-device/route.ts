// app/api/register-device/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import Device from '@/models/Device'

export async function POST(req: NextRequest) {
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