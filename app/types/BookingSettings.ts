export interface DateOverride {
  date: string // формат "YYYY-MM-DD"
  type: 'closed' | 'special' // закрыто или специальный режим
  workStartTime?: string // только для type: 'special'
  workEndTime?: string // только для type: 'special'
  reason?: string // опционально: причина (например, "Праздник", "Сокращенный день")
}

export interface BookingSettings {
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
  bookingInterval: number // интервал в минутах (например, 60)
  isAvailable: boolean // общая доступность бронирования
  dateOverrides: DateOverride[] // исключения для конкретных дат
  _id?: string
  createdAt?: string
  updatedAt?: string
}

