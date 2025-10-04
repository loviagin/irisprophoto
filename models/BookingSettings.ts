import mongoose from 'mongoose'

export interface IDateOverride {
  date: string // формат "YYYY-MM-DD"
  type: 'closed' | 'special' // закрыто или специальный режим
  workStartTime?: string // только для type: 'special'
  workEndTime?: string // только для type: 'special'
  reason?: string // опционально: причина (например, "Праздник", "Сокращенный день")
}

export interface IBookingSettings {
  workStartTime: string // формат "HH:MM" например "09:00"
  workEndTime: string // формат "HH:MM" например "18:00"
  workingDays: {
    monday: boolean
    tuesday: boolean
    wednesday: boolean
    thursday: boolean
    friday: boolean
    saturday: boolean
    sunday: boolean
  }
  bookingInterval: number // интервал в минутах
  isAvailable: boolean // общая доступность бронирования
  dateOverrides: IDateOverride[] // исключения для конкретных дат
  updatedAt?: Date
}

const DateOverrideSchema = new mongoose.Schema<IDateOverride>({
  date: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['closed', 'special'],
    required: true 
  },
  workStartTime: { 
    type: String, 
    required: false 
  },
  workEndTime: { 
    type: String, 
    required: false 
  },
  reason: { 
    type: String, 
    required: false 
  }
}, { _id: false })

const BookingSettingsSchema = new mongoose.Schema<IBookingSettings>({
  workStartTime: { 
    type: String, 
    required: true, 
    default: '12:00' 
  },
  workEndTime: { 
    type: String, 
    required: true, 
    default: '18:00' 
  },
  workingDays: {
    monday: { type: Boolean, default: true },
    tuesday: { type: Boolean, default: true },
    wednesday: { type: Boolean, default: true },
    thursday: { type: Boolean, default: true },
    friday: { type: Boolean, default: true },
    saturday: { type: Boolean, default: true },
    sunday: { type: Boolean, default: false }
  },
  bookingInterval: { 
    type: Number, 
    required: true, 
    default: 60 
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  dateOverrides: {
    type: [DateOverrideSchema],
    default: []
  }
}, { timestamps: true })

export default mongoose.models.BookingSettings || mongoose.model<IBookingSettings>('BookingSettings', BookingSettingsSchema)

