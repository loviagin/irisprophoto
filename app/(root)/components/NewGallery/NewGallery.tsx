'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import styles from './NewGallery.module.css'
import BookingModal from '../BookingModal/BookingModal'
import Link from 'next/link'

const galleryItems = [
  {
    image: '/works/work1.webp',
    title: 'Explosin',
    category: ''
  },
  {
    image: '/works/work2.webp',
    title: 'Fire',
    category: ''
  },
  {
    image: '/works/SuperNova.webp',
    title: 'SuperNova',
    category: ''
  },
  {
    image: '/works/water.webp',
    title: 'Water',
    category: ''
  },
  {
    image: '/works/work5.webp',
    title: 'Meteor',
    category: ''
  },
  {
    image: '/works/work6.webp',
    title: 'Radiance',
    category: ''
  }
]

export default function NewGallery() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <section className={styles.gallery} ref={containerRef} id='gallery'>
      <motion.div
        className={styles.background}
        style={{ y }}
      />

      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.subtitle}>Our Gallery</span>
          <h2>Stunning Iris Portraits</h2>
          <p>Explore our collection of unique iris portraits, each telling its own story through intricate patterns and vibrant colors.</p>
        </motion.div>

        <div className={styles.grid}>
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              className={styles.item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className={styles.imageWrapper}>
                <img src={item.image} alt={item.title} />
                <motion.div
                  className={styles.overlay}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3>{item.title}</h3>
                  <span>{item.category}</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className={styles.buttonGroup}>
            <button className={styles.button} onClick={() => setIsModalOpen(true)}>Make an order</button>
            <Link href="/gallery" className={styles.button}>
              View Full Gallery
            </Link>
          </div>
        </motion.div>
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  )
} 