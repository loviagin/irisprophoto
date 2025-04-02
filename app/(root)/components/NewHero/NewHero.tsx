'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './NewHero.module.css'
import Link from 'next/link';
import BookingModal from '../BookingModal/BookingModal';

export default function NewHero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
              onClick={() => setIsModalOpen(true)}
            >
              Create Your Portrait
            </button>
            <Link href={'#gallery'} className={styles.secondaryButton}>View Gallery</Link>
          </motion.div>
        </motion.div>

        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

        <motion.div
          className={styles.imageContent}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className={styles.irisPreview}>
            <img src="/images/Galaxy.webp" alt="Iris Art Preview" />
            <div className={styles.previewOverlay}>
              <motion.div
                className={styles.scanLine}
                animate={{
                  top: ["0%", "100%"]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
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