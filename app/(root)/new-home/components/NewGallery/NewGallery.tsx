'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import styles from './NewGallery.module.css'

const galleryItems = [
  {
    image: '/images/gallery/iris1.webp',
    title: 'Azure Dreams',
    category: 'Color Enhanced'
  },
  {
    image: '/images/gallery/iris2.webp',
    title: 'Golden Hour',
    category: 'Natural Light'
  },
  {
    image: '/images/gallery/iris3.webp',
    title: 'Mystic Pattern',
    category: 'Black & White'
  },
  {
    image: '/images/gallery/iris4.webp',
    title: 'Ocean Depths',
    category: 'Color Enhanced'
  },
  {
    image: '/images/gallery/iris5.webp',
    title: 'Emerald Vision',
    category: 'Natural Light'
  },
  {
    image: '/images/gallery/iris6.webp',
    title: 'Crystal Clear',
    category: 'Macro'
  }
]

export default function NewGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <section className={styles.gallery} ref={containerRef} id='GALLERY'>
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
          <button className={styles.button}>View Full Gallery</button>
        </motion.div>
      </div>
    </section>
  )
} 