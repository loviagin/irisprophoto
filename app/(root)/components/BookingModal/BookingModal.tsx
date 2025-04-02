'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaCamera, FaCalendarAlt, FaEnvelope, FaPhone, FaClock, FaUser } from "react-icons/fa"
import styles from './BookingModal.module.css'
import Portal from '../Portal/Portal'
import { PatternFormat } from 'react-number-format'
import { Order } from '@/app/types/Order'
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
  const workStartTime = '12:00';
  const workEndTime = '18:00';
  const bookingInterval = 60;

  // Функция для проверки, является ли дата воскресеньем
  const isSunday = (date: Date) => {
    return date.getDay() === 0;
  }

  // Функция для фильтрации дат (исключаем воскресенья)
  const filterDate = (date: Date) => {
    return !isSunday(date);
  }

  // Функция для получения следующей доступной даты
  const getNextAvailableDate = (date: Date) => {
    const nextDate = new Date(date);
    while (isSunday(nextDate)) {
      nextDate.setDate(nextDate.getDate() + 1);
    }
    nextDate.setHours(0, 0, 0, 0);
    return nextDate;
  }

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    shootingType: 'one-two',
    dateTime: getNextAvailableDate(new Date()), // Инициализируем с первой доступной датой
    details: ''
  })

  const [bookedSlots, setBookedSlots] = useState<Array<{ bookingDateTime: string }>>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);

  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const response = await fetch('/api/bookings');
        const data = await response.json();
        if (data.success) {
          setBookedSlots(data.orders);
          // Генерируем доступные слоты при получении занятых
          const slots = generateTimeSlots();
          setAvailableTimeSlots(slots);
        }
      } catch (error) {
        console.error('Error fetching booked slots:', error);
      }
    };

    if (isOpen) {
      fetchBookedSlots();
    }
  }, [isOpen]);

  // Обновляем доступные слоты при изменении даты
  useEffect(() => {
    const slots = generateTimeSlots();
    setAvailableTimeSlots(slots);
  }, [formData.dateTime]);

  const generateTimeSlots = () => {
    const slots: string[] = []
    const [startHour, startMinute] = workStartTime.split(':').map(Number)
    const [endHour, endMinute] = workEndTime.split(':').map(Number)

    let currentTime = new Date()
    currentTime.setHours(startHour, startMinute, 0, 0)

    const endTime = new Date()
    endTime.setHours(endHour, endMinute, 0, 0)

    while (currentTime < endTime) {
      const timeString = currentTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
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

      currentTime.setMinutes(currentTime.getMinutes() + bookingInterval)
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

    const formDataToSend = {
      name: formData.name,
      phone: `+1${formData.phone.replace('+', '')}`,
      email: formData.email || null,
      shootingType: formData.shootingType,
      date: formData.dateTime.toISOString(), // Отправляем полную дату и время в ISO формате
      details: formData.details
    };

    const notionId = crypto.randomUUID();
    const contact = formData.email || `+1${formData.phone.replace('+', '')}`;

    // Устанавливаем время 01:00 по умолчанию, если время не выбрано
    const selectedDateTime = new Date(formData.dateTime);
    if (selectedDateTime.getHours() === 0 && selectedDateTime.getMinutes() === 0) {
      selectedDateTime.setHours(0, 0, 0, 0);
    }

    const order: Order = {
      id: notionId,
      order: 'New order from site',
      status: 'New',
      date: selectedDateTime.toISOString(),
      comment: formDataToSend.shootingType + ' ' + formDataToSend.details,
      email: formDataToSend.email || undefined,
      name: formDataToSend.name,
      phone: formDataToSend.phone || undefined,
      createdAt: new Date().toISOString()
    }

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    const result = await response.json();

    if (result.success) {

      if (formDataToSend.email) {
        const res = await fetch('/api/email-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
          },
          body: JSON.stringify({
            name: formDataToSend.name,
            email: formDataToSend.email,
            date: selectedDateTime.toISOString()
          }),
        });

        const result = await res.json();
      }

      try {
        const response = await fetch("/api/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            contact,
            notionId,
            bookingDateTime: selectedDateTime.toISOString()
          }),
        });

        const result = await response.json();
      } catch (error) {
        console.error('Error creating booking:', error);
        alert("An error occurred while creating an order. Please try again later.");
      }

      console.log(JSON.stringify(order))

      alert("Thanks for your order! We will contact you soon.");

      setFormData({
        name: "",
        email: "",
        phone: "",
        shootingType: "wedding",
        dateTime: new Date(),
        details: ""
      });
    } else {
      alert("❌ Error: " + result.error);
    }

    onClose()
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === 'date') {
      const newDateTime = new Date(formData.dateTime)
      newDateTime.setFullYear(parseInt(value.split('-')[0]))
      newDateTime.setMonth(parseInt(value.split('-')[1]) - 1)
      newDateTime.setDate(parseInt(value.split('-')[2]))
      newDateTime.setHours(0, 0, 0, 0)

      // Если выбранная дата - воскресенье, переносим на следующий день
      if (isSunday(newDateTime)) {
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
        const [hours, minutes] = value.split(':').map(Number)
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
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <FaClock className={styles.formIcon} />
                      <select
                        name="time"
                        value={formData.dateTime.toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false
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

                  <div className={styles.formGroup}>
                    <textarea
                      name="details"
                      placeholder="Your suggestions or questions"
                      value={formData.details}
                      onChange={handleInputChange}
                      rows={4}
                    />
                  </div>

                  <button type="submit" className={styles.submitButton}>
                    Order a photo shoot
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  )
} 