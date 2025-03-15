'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaCamera, FaCalendarAlt, FaEnvelope } from "react-icons/fa"
import styles from './BookingModal.module.css'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    shootingType: 'one-two',
    date: '',
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

    const response = await fetch("https://irisprophoto.me/api/sendOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result.success) {
      alert("Thanks for your order! We will contact you soon.");
      onClose();
      setFormData({ name: "", email: "", phone: "", shootingType: "wedding", date: "", details: "" });
    } else {
      alert("❌ Error: " + result.error);
    }

    onClose()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
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
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <textarea
                    name="details"
                    placeholder="Ваши пожелания или вопросы"
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
  )
} 