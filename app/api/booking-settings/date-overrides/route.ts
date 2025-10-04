import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import BookingSettings from '@/models/BookingSettings'

// Добавить исключение для даты
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase()

    const body = await request.json()
    const { date, type, workStartTime, workEndTime, reason } = body

    // Валидация даты (формат YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!date || !dateRegex.test(date)) {
      return NextResponse.json(
        { success: false, error: 'Invalid date format. Use YYYY-MM-DD' },
        { status: 400 }
      )
    }

    // Валидация типа
    if (!type || !['closed', 'special'].includes(type)) {
      return NextResponse.json(
        { success: false, error: 'Type must be "closed" or "special"' },
        { status: 400 }
      )
    }

    // Валидация времени для специального режима (12-часовой формат с AM/PM)
    const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i
    if (type === 'special') {
      if (!workStartTime || !timeRegex.test(workStartTime)) {
        return NextResponse.json(
          { success: false, error: 'workStartTime is required for special type and must be in HH:MM AM/PM format' },
          { status: 400 }
        )
      }
      if (!workEndTime || !timeRegex.test(workEndTime)) {
        return NextResponse.json(
          { success: false, error: 'workEndTime is required for special type and must be in HH:MM AM/PM format' },
          { status: 400 }
      )
      }
    }

    let settings = await BookingSettings.findOne()
    
    if (!settings) {
      return NextResponse.json(
        { success: false, error: 'Settings not found. Please initialize settings first.' },
        { status: 404 }
      )
    }

    // Проверяем, не существует ли уже исключение для этой даты
    const existingOverrideIndex = settings.dateOverrides.findIndex(
      (override: any) => override.date === date
    )

    if (existingOverrideIndex !== -1) {
      // Обновляем существующее исключение
      settings.dateOverrides[existingOverrideIndex] = {
        date,
        type,
        workStartTime: type === 'special' ? workStartTime : undefined,
        workEndTime: type === 'special' ? workEndTime : undefined,
        reason
      }
    } else {
      // Добавляем новое исключение
      settings.dateOverrides.push({
        date,
        type,
        workStartTime: type === 'special' ? workStartTime : undefined,
        workEndTime: type === 'special' ? workEndTime : undefined,
        reason
      })
    }

    await settings.save()

    return NextResponse.json({
      success: true,
      settings
    })
  } catch (error) {
    console.error('Error adding date override:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to add date override' },
      { status: 500 }
    )
  }
}

// Удалить исключение для даты
export async function DELETE(request: NextRequest) {
  try {
    await connectToDatabase()

    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')

    if (!date) {
      return NextResponse.json(
        { success: false, error: 'Date parameter is required' },
        { status: 400 }
      )
    }

    let settings = await BookingSettings.findOne()
    
    if (!settings) {
      return NextResponse.json(
        { success: false, error: 'Settings not found' },
        { status: 404 }
      )
    }

    // Удаляем исключение для указанной даты
    settings.dateOverrides = settings.dateOverrides.filter(
      (override: any) => override.date !== date
    )

    await settings.save()

    return NextResponse.json({
      success: true,
      settings
    })
  } catch (error) {
    console.error('Error deleting date override:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete date override' },
      { status: 500 }
    )
  }
}

// Получить исключение для конкретной даты
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()

    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')

    let settings = await BookingSettings.findOne()
    
    if (!settings) {
      return NextResponse.json(
        { success: false, error: 'Settings not found' },
        { status: 404 }
      )
    }

    if (date) {
      // Получить исключение для конкретной даты
      const override = settings.dateOverrides.find(
        (override: any) => override.date === date
      )
      
      return NextResponse.json({
        success: true,
        override: override || null
      })
    } else {
      // Получить все исключения
      return NextResponse.json({
        success: true,
        dateOverrides: settings.dateOverrides
      })
    }
  } catch (error) {
    console.error('Error fetching date overrides:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch date overrides' },
      { status: 500 }
    )
  }
}

