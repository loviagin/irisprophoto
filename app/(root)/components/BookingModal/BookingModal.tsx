'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaCamera, FaCalendarAlt, FaEnvelope, FaPhone, FaClock, FaUser, FaGift } from "react-icons/fa"
import styles from './BookingModal.module.css'
import Portal from '../Portal/Portal'
import { PatternFormat } from 'react-number-format'
import { Order } from '@/app/types/Order'
import { BookingSettings } from '@/app/types/BookingSettings'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import "@/app/styles/datepicker.css"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function BookingModal({
  isOpen,
  onClose
}: BookingModalProps) {
  const [bookingSettings, setBookingSettings] = useState<BookingSettings>({
    workStartTime: '12:00 PM',
    workEndTime: '06:00 PM',
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
  });

  // Форматировать дату в локальном часовом поясе (YYYY-MM-DD)
  const formatLocalDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Получить исключение для конкретной даты
  const getDateOverride = (date: Date) => {
    const dateString = formatLocalDate(date);
    return bookingSettings.dateOverrides?.find(override => override.date === dateString);
  }

  // Функция для фильтрации дат (исключаем нерабочие дни и закрытые даты)
  const filterDate = (date: Date) => {
    const override = getDateOverride(date);
    
    // Если есть исключение типа "closed", день недоступен
    if (override?.type === 'closed') {
      return false;
    }
    
    // Если есть исключение типа "special", день доступен (независимо от дня недели)
    if (override?.type === 'special') {
      return true;
    }
    
    // Иначе проверяем обычный рабочий график
    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayName = dayNames[dayOfWeek] as keyof typeof bookingSettings.workingDays;
    return bookingSettings.workingDays[dayName];
  }

  // Функция для получения следующей доступной даты
  const getNextAvailableDate = (date: Date) => {
    const nextDate = new Date(date);
    nextDate.setHours(0, 0, 0, 0);
    return nextDate;
  }

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    shootingType: 'one-two',
    dateTime: getNextAvailableDate(new Date()), // Инициализируем с первой доступной датой
    details: '',
    promocode: ''
  })

  const [bookedSlots, setBookedSlots] = useState<Array<{ bookingDateTime: string }>>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSettings, setIsLoadingSettings] = useState(true);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    const fetchBookingSettings = async () => {
      setIsLoadingSettings(true);
      try {
        const response = await fetch('/api/booking-settings');
        const data = await response.json();
        if (data.success && data.settings) {
          setBookingSettings(data.settings);
          setIsAvailable(data.settings.isAvailable);
        }
      } catch (error) {
        console.error('Error fetching booking settings:', error);
      } finally {
        setIsLoadingSettings(false);
      }
    };

    const fetchBookedSlots = async () => {
      try {
        const response = await fetch('/api/bookings');
        const data = await response.json();
        if (data.success) {
          setBookedSlots(data.orders);
        }
      } catch (error) {
        console.error('Error fetching booked slots:', error);
      }
    };
    
    if (isOpen) {
      fetchBookingSettings();
      fetchBookedSlots();
      // Prevent body scroll when modal is open
      document.body.classList.add('modal-open');
    } else {
      // Restore body scroll when modal is closed
      document.body.classList.remove('modal-open');
    }

    // Cleanup function to restore body scroll
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  // Обновляем доступные слоты при изменении даты или настроек
  useEffect(() => {
    const slots = generateTimeSlots();
    setAvailableTimeSlots(slots);
  }, [formData.dateTime, bookingSettings, bookedSlots]);

  // Функция для конвертации времени из формата "HH:MM AM/PM" в 24-часовой формат
  const convertTo24Hour = (time12h: string): { hours: number, minutes: number } => {
    const [time, period] = time12h.split(' ');
    const [hoursStr, minutesStr] = time.split(':');
    let hours = parseInt(hoursStr);
    const minutes = parseInt(minutesStr);
    
    if (period.toUpperCase() === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period.toUpperCase() === 'AM' && hours === 12) {
      hours = 0;
    }
    
    return { hours, minutes };
  }

  const generateTimeSlots = () => {
    const slots: string[] = []
    
    // Проверяем, есть ли исключение для выбранной даты
    const override = getDateOverride(new Date(formData.dateTime));
    
    // Если день закрыт, возвращаем пустой массив
    if (override?.type === 'closed') {
      return slots;
    }
    
    // Определяем рабочие часы (из исключения или из обычного графика)
    let workStart = bookingSettings.workStartTime;
    let workEnd = bookingSettings.workEndTime;
    
    if (override?.type === 'special' && override.workStartTime && override.workEndTime) {
      workStart = override.workStartTime;
      workEnd = override.workEndTime;
    }
    
    const { hours: startHour, minutes: startMinute } = convertTo24Hour(workStart);
    const { hours: endHour, minutes: endMinute } = convertTo24Hour(workEnd);

    let currentTime = new Date()
    currentTime.setHours(startHour, startMinute, 0, 0)

    const endTime = new Date()
    endTime.setHours(endHour, endMinute, 0, 0)

    while (currentTime < endTime) {
      const timeString = currentTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })

      // Проверяем, не занято ли это время
      const isBooked = bookedSlots.some(slot => {
        const slotDate = new Date(slot.bookingDateTime)
        const currentDate = new Date(formData.dateTime)
        return slotDate.toDateString() === currentDate.toDateString() &&
          slotDate.getHours() === currentTime.getHours() &&
          slotDate.getMinutes() === currentTime.getMinutes()
      })

      if (!isBooked) {
        slots.push(timeString)
      }

      currentTime.setMinutes(currentTime.getMinutes() + bookingSettings.bookingInterval)
    }

    return slots
  }

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 }
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email && !formData.phone) {
      alert("Please specify email or phone");
      return;
    }

    setIsLoading(true);

    try {
      // Устанавливаем время, если не выбрано
      const selectedDateTime = new Date(formData.dateTime);
      if (selectedDateTime.getHours() === 0 && selectedDateTime.getMinutes() === 0) {
        selectedDateTime.setHours(12, 0, 0, 0); // По умолчанию 12:00
      }

      // Подготавливаем данные для бронирования
      const bookingData = {
        name: formData.name,
        phone: `+1${formData.phone.replace('+', '')}`,
        email: formData.email || null,
        shootingType: formData.shootingType,
        dateTime: selectedDateTime.toISOString(),
        details: formData.details,
        promocode: formData.promocode
      };

      // Создаем Stripe Checkout Session
      const response = await fetch('/api/create-booking-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (result.url) {
        // Редиректим на страницу оплаты Stripe
        window.location.href = result.url;
      } else {
        alert("❌ Error: Unable to create payment session. Please try again.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert("❌ An error occurred. Please try again later.");
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === 'date') {
      const newDateTime = new Date(formData.dateTime)
      newDateTime.setFullYear(parseInt(value.split('-')[0]))
      newDateTime.setMonth(parseInt(value.split('-')[1]) - 1)
      newDateTime.setDate(parseInt(value.split('-')[2]))
      newDateTime.setHours(0, 0, 0, 0)

      // Если выбранная дата - нерабочий день, ищем следующий рабочий день
      while (!filterDate(newDateTime)) {
        newDateTime.setDate(newDateTime.getDate() + 1);
      }

      setFormData(prev => ({
        ...prev,
        dateTime: newDateTime
      }))
    } else if (name === 'time') {
      if (value === '') {
        const newDateTime = new Date(formData.dateTime)
        newDateTime.setHours(0, 0, 0, 0)
        setFormData(prev => ({
          ...prev,
          dateTime: newDateTime
        }))
      } else {
        // Парсим 12-часовой формат (например "02:00 PM")
        const { hours, minutes } = convertTo24Hour(value)
        const newDateTime = new Date(formData.dateTime)
        newDateTime.setHours(hours, minutes, 0, 0)
        setFormData(prev => ({
          ...prev,
          dateTime: newDateTime
        }))
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handlePhoneNumberChange = (values: any) => {
    const { value } = values;
    setFormData(prev => ({
      ...prev,
      phone: value.startsWith('+') ? value : '+' + value
    }));
  };

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className={styles.modal}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={e => e.stopPropagation()}
            >
              <button
                className={styles.modalClose}
                onClick={onClose}
              >
                <FaTimes />
              </button>

              <div className={styles.modalContent}>
                <h2>Book a photo session</h2>
                <p>Leave your data, and we will contact you to discuss the details.</p>
                {isAvailable ? (
                <form onSubmit={handleSubmit} className={styles.bookingForm}>
                  <div className={styles.formGroup}>
                    <FaCamera className={styles.formIcon} />
                    <select
                      name="shootingType"
                      value={formData.shootingType}
                      onChange={handleInputChange}
                      required
                      className={styles.customSelect}
                    >
                      <option value="one-two">One or two person (-s)</option>
                      <option value="family">Three or four persons</option>
                    </select>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <FaUser className={styles.formIcon} />
                      <input
                        type="text"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <FaPhone className={styles.formIcon} />
                      <PatternFormat
                        format="+1 (###) ###-####"
                        value={formData.phone}
                        onValueChange={handlePhoneNumberChange}
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 555-5555"
                        customInput={motion.input}
                        className={styles.phoneInput}
                        allowEmptyFormatting
                        mask="_"
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <FaEnvelope className={styles.formIcon} />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  {isLoadingSettings ? (
                    <div className={styles.formRow}>
                      <div className={styles.loadingContainer}>
                        <div className={styles.spinner}></div>
                        <p>Loading booking schedule...</p>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <FaCalendarAlt className={styles.formIcon} />
                        <DatePicker
                          selected={formData.dateTime}
                          onChange={(date: Date | null) => {
                            if (date) {
                              date.setHours(0, 0, 0, 0);
                              setFormData(prev => ({
                                ...prev,
                                dateTime: date
                              }))
                            }
                          }}
                          filterDate={filterDate}
                          minDate={new Date()}
                          dateFormat="MMMM d, yyyy"
                          className={styles.dateInput}
                          placeholderText="Select date"
                          popperPlacement="bottom"
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <FaClock className={styles.formIcon} />
                        <select
                          name="time"
                          value={formData.dateTime.toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                          })}
                          onChange={handleInputChange}
                          className={styles.timeSelect}
                        >
                          <option value="">Select time</option>
                          {availableTimeSlots.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  <div className={styles.formGroup}>
                    <textarea
                      name="details"
                      placeholder="Your suggestions or questions"
                      value={formData.details}
                      onChange={handleInputChange}
                      rows={4}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <FaGift className={styles.formIcon} />
                    <input
                      type="text"
                      name="promocode"
                      placeholder="Promocode (if you have one)"
                      value={formData.promocode}
                      onChange={handleInputChange}
                    />
                  </div>

                  <button type="submit" className={styles.submitButton} disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Order a photo session — $20'}
                  </button>
                </form>
                ) : (
                  <div className={styles.unavailableBanner}>
                    <div className={styles.unavailableIcon}>
                      <FaCalendarAlt />
                    </div>
                    <div className={styles.unavailableContent}>
                      <h3>Photo session booking is temporarily unavailable</h3>
                      <p>We are currently not accepting bookings. Please check back later or contact us for more information.</p>
                      <div className={styles.unavailableActions}>
                        <a href="mailto:voroninsfamilyllc@gmail.com" className={styles.unavailableButton}>Contact us</a>
                        <button onClick={onClose} className={styles.unavailableSecondary}>Close</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  )
} 