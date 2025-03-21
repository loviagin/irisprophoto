'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaCamera, FaCalendarAlt, FaEnvelope, FaPhone } from "react-icons/fa"
import styles from './BookingModal.module.css'
import Portal from '../Portal/Portal'
import { PatternFormat } from 'react-number-format'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  workStartTime: string // формат "HH:mm"
  workEndTime: string // формат "HH:mm"
  bookingInterval: number // в минутах
  bookedSlots?: Array<{
    dateTime: Date
  }>
}

export default function BookingModal({ 
  isOpen, 
  onClose, 
  workStartTime, 
  workEndTime, 
  bookingInterval,
  bookedSlots = []
}: BookingModalProps) {
  const getCurrentDate = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const generateTimeSlots = () => {
    const slots: string[] = []
    const [startHour, startMinute] = workStartTime.split(':').map(Number)
    const [endHour, endMinute] = workEndTime.split(':').map(Number)
    
    let currentTime = new Date()
    currentTime.setHours(startHour, startMinute, 0, 0)
    
    const endTime = new Date()
    endTime.setHours(endHour, endMinute, 0, 0)
    
    while (currentTime < endTime) {
      const timeString = currentTime.toLocaleTimeString('ru-RU', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      })

      // Проверяем, не занято ли это время
      const isBooked = bookedSlots.some(slot => {
        const slotDate = new Date(slot.dateTime)
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

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    shootingType: 'one-two',
    dateTime: new Date(),
    details: ''
  })

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
    e.preventDefault()

    if (!formData.email && !formData.phone) {
      alert("Please provide either an email or phone number");
      return;
    }

    // Форматируем дату и время для отправки
    const formDataToSend = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      shootingType: formData.shootingType,
      date: formData.dateTime.toISOString(), // Отправляем полную дату и время в ISO формате
      details: formData.details
    };

    const response = await fetch("https://irisprophoto.me/api/sendOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataToSend),
    });

    const result = await response.json();

    if (result.success) {
      alert("Thanks for your order! We will contact you soon.");
      onClose();
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
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === 'date' || name === 'time') {
      const newDateTime = new Date(formData.dateTime)
      if (name === 'date') {
        newDateTime.setFullYear(parseInt(value.split('-')[0]))
        newDateTime.setMonth(parseInt(value.split('-')[1]) - 1)
        newDateTime.setDate(parseInt(value.split('-')[2]))
      } else {
        const [hours, minutes] = value.split(':').map(Number)
        newDateTime.setHours(hours, minutes, 0, 0)
      }
      setFormData(prev => ({
        ...prev,
        dateTime: newDateTime
      }))
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

  // Функция для форматирования даты и времени для отображения
  const formatDateTime = (date: Date) => {
    return date.toLocaleString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }

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
                <h2>Make an appointment</h2>
                <p>Leave your details and we will contact you to discuss the details.</p>

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

                  <div className={styles.formGroup}>
                    <FaCalendarAlt className={styles.formIcon} />
                    <input
                      type="date"
                      name="date"
                      value={formData.dateTime.toISOString().split('T')[0]}
                      onChange={handleInputChange}
                      required
                      className={styles.dateInput}
                      placeholder="Select date"
                      min={getCurrentDate()}
                    />
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