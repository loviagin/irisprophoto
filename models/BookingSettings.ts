import mongoose from 'mongoose'

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
  updatedAt?: Date
}

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
  }
}, { timestamps: true })

export default mongoose.models.BookingSettings || mongoose.model<IBookingSettings>('BookingSettings', BookingSettingsSchema)

