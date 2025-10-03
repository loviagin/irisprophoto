import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import BookingSettings from '@/models/BookingSettings'

export async function GET() {
  try {
    await connectToDatabase()

    let settings = await BookingSettings.findOne()
    
    if (!settings) {
      // Создаем настройки по умолчанию
      settings = await BookingSettings.create({
        workStartTime: '12:00',
        workEndTime: '18:00',
        workingDays: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: true,
          sunday: false
        },
        bookingInterval: 60,
        isAvailable: true
      })
    }

    const isAvailable = settings.isAvailable ?? true
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

    let settings = await BookingSettings.findOne()
    
    if (!settings) {
      settings = await BookingSettings.create({ isAvailable })
    } else {
      settings.isAvailable = isAvailable
      await settings.save()
    }

    return NextResponse.json({ success: true, isAvailable })
  } catch (error) {
    console.error('Error updating availability:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update availability' },
      { status: 500 }
    )
  }
}


