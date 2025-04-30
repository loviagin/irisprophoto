'use client'
import { motion } from 'framer-motion'
import styles from '../(root)/gallery/GalleryPage.module.css'

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
    image: '/works/work3.webp',
    title: 'Halo hard',
    category: ''
  },
  {
    image: '/works/SuperNova.webp',
    title: 'SuperNova',
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
  },
  {
    image: '/works/Galaxy.webp',
    title: 'Galaxy',
    category: ''
  },
  {
    image: '/works/Halo light.webp',
    title: 'Halo light',
    category: ''
  },
  {
    image: '/works/Hurricane.webp',
    title: 'Hurricane',
    category: ''
  },
  {
    image: '/works/light beams.webp',
    title: 'Light beams',
    category: ''
  },
  {
    image: '/works/send.webp',
    title: 'Send',
    category: ''
  },
  {
    image: '/works/Sparks.webp',
    title: 'Sparks',
    category: ''
  },
  {
    image: '/works/water.webp',
    title: 'Water',
    category: ''
  },
  {
    image: '/works/yin yang.webp',
    title: 'Yin Yang',
    category: ''
  }
]

export default function GalleryGrid() {
  return (
    <>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Our Gallery</h1>
        <p>Explore our collection of unique iris portraits, each telling its own story through intricate patterns and vibrant colors.</p>
      </motion.div>

      <div className={styles.grid}>
        {galleryItems.map((item, index) => (
          <motion.div
            key={index}
            className={styles.item}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
    </>
  )
} 