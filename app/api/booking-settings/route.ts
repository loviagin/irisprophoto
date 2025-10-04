import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import BookingSettings from '@/models/BookingSettings'

// Получение настроек бронирования
export async function GET() {
  try {
    await connectToDatabase()

    // Ищем настройки или создаем дефолтные
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
        isAvailable: true,
        dateOverrides: []
      })
    }

    return NextResponse.json({
      success: true,
      settings
    })
  } catch (error) {
    console.error('Error fetching booking settings:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch booking settings' },
      { status: 500 }
    )
  }
}

// Обновление настроек бронирования
export async function PUT(request: NextRequest) {
  try {
    await connectToDatabase()

    const body = await request.json()

    // Валидация времени
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
    if (body.workStartTime && !timeRegex.test(body.workStartTime)) {
      return NextResponse.json(
        { success: false, error: 'Invalid workStartTime format. Use HH:MM' },
        { status: 400 }
      )
    }
    if (body.workEndTime && !timeRegex.test(body.workEndTime)) {
      return NextResponse.json(
        { success: false, error: 'Invalid workEndTime format. Use HH:MM' },
        { status: 400 }
      )
    }

    // Валидация интервала
    if (body.bookingInterval && (body.bookingInterval < 15 || body.bookingInterval > 240)) {
      return NextResponse.json(
        { success: false, error: 'Booking interval must be between 15 and 240 minutes' },
        { status: 400 }
      )
    }

    // Находим и обновляем или создаем новые настройки
    let settings = await BookingSettings.findOne()
    
    if (!settings) {
      settings = await BookingSettings.create(body)
    } else {
      // Обрабатываем частичное обновление workingDays
      if (body.workingDays) {
        settings.workingDays = {
          ...settings.workingDays.toObject(),
          ...body.workingDays
        }
      }
      
      // Обновляем остальные поля
      if (body.workStartTime !== undefined) settings.workStartTime = body.workStartTime
      if (body.workEndTime !== undefined) settings.workEndTime = body.workEndTime
      if (body.bookingInterval !== undefined) settings.bookingInterval = body.bookingInterval
      if (body.isAvailable !== undefined) settings.isAvailable = body.isAvailable
      if (body.dateOverrides !== undefined) settings.dateOverrides = body.dateOverrides
      
      await settings.save()
    }

    return NextResponse.json({
      success: true,
      settings
    })
  } catch (error) {
    console.error('Error updating booking settings:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update booking settings' },
      { status: 500 }
    )
  }
}

// PATCH для частичного обновления
export async function PATCH(request: NextRequest) {
  return PUT(request)
}

