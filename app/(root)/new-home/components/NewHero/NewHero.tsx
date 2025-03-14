'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './NewHero.module.css'
import { FaTimes, FaCamera, FaCalendarAlt, FaEnvelope } from "react-icons/fa";
import Link from 'next/link';

export default function NewHero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    shootingType: 'wedding',
    date: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки формы
    console.log(formData);
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
  };

  return (
    <section className={styles.hero}>
      {/* Фоновый градиент */}
      <div className={styles.gradientBackground} />

      {/* Фоновые декоративные элементы */}
      <div className={styles.decorativeElements}>
        <motion.div
          className={styles.circle1}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className={styles.circle2}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Основной контент */}
      <div className={styles.content}>
        <motion.div
          className={styles.textContent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Discover the Art in Your Eyes</h1>
          <p>Transform your iris into a stunning piece of art that captures your unique essence</p>

          <motion.div
            className={styles.ctaButtons}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <button
              className={styles.primaryButton}
              onClick={() => console.log('Create Your Portrait')}
            >
              Create Your Portrait
            </button>
            <Link href={'#GALLERY'} className={styles.secondaryButton}>View Gallery</Link>
          </motion.div>
        </motion.div>

        {isModalOpen && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
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
                onClick={() => setIsModalOpen(false)}
              >
                <FaTimes />
              </button>

              <div className={styles.modalContent}>
                <h2>Запись на фотосессию</h2>
                <p>Оставьте ваши данные, и я свяжусь с вами для обсуждения деталей</p>

                <form onSubmit={handleSubmit} className={styles.bookingForm}>
                  <div className={styles.formGroup}>
                    <FaCamera className={styles.formIcon} />
                    <select
                      name="shootingType"
                      value={formData.shootingType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="wedding">Свадебная съёмка</option>
                      <option value="portrait">Портретная съёмка</option>
                      <option value="family">Семейная съёмка</option>
                      <option value="event">Репортажная съёмка</option>
                    </select>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <input
                        type="text"
                        name="name"
                        placeholder="Ваше имя"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Телефон"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
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
                      required
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
                      name="message"
                      placeholder="Ваши пожелания или вопросы"
                      value={formData.message}
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

        <motion.div
          className={styles.imageContent}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className={styles.irisPreview}>
            <img src="/images/iris-preview.webp" alt="Iris Art Preview" />
            <div className={styles.previewOverlay}>
              <motion.div
                className={styles.scanLine}
                animate={{
                  y: [0, 100, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Статистика */}
      <motion.div
        className={styles.stats}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div className={styles.statItem}>
          <span className={styles.statNumber}>5000+</span>
          <span className={styles.statLabel}>Portraits Created</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>98%</span>
          <span className={styles.statLabel}>Satisfied Clients</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>4.9</span>
          <span className={styles.statLabel}>Average Rating</span>
        </div>
      </motion.div>
    </section>
  )
} 