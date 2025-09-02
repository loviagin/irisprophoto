import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import mongoose from 'mongoose'

export async function GET() {
  try {
    await connectToDatabase()

    const collection = mongoose.connection.collection('app_settings')
    const doc = await collection.findOne({ key: 'booking_availability' })

    const isAvailable = doc?.isAvailable ?? true
    return NextResponse.json({ success: true, isAvailable })
  } catch (error) {
    console.error('Error fetching availability:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch availability' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase()

    const body = await request.json()
    const { isAvailable } = body as {
      isAvailable: boolean
    }

    if (typeof isAvailable !== 'boolean') {
      return NextResponse.json(
        { success: false, error: 'isAvailable must be boolean' },
        { status: 400 }
      )
    }

    const collection = mongoose.connection.collection('app_settings')
    await collection.updateOne(
      { key: 'booking_availability' },
      {
        $set: {
          key: 'booking_availability',
          isAvailable,
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    )

    return NextResponse.json({ success: true, isAvailable })
  } catch (error) {
    console.error('Error updating availability:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update availability' },
      { status: 500 }
    )
  }
}


