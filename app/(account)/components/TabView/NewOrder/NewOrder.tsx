'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { FaCamera, FaCalendarAlt, FaEnvelope } from "react-icons/fa"
import styles from './NewOrder.module.css'

export default function NewOrder() {
  const workStartTime = '10:00'
  const workEndTime = '18:00'
  const bookingInterval = 40
  const bookedSlots: Array<{
    dateTime: Date
  }> = []

  const getCurrentDate = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
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

  return (
    <AnimatePresence>
      <div className={styles.modalContent}>
        {/* <h2>Make an appointment</h2>
        <p>Leave your details and we will contact you to discuss the details.</p> */}

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
              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleInputChange}

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
    </AnimatePresence>
  )
} 