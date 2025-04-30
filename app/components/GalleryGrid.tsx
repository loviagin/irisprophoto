'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import styles from '../(root)/gallery/GalleryPage.module.css'

const gallerySections = [
  {
    title: 'Single eye',
    items: [
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
      }
    ]
  },
  {
    title: 'Couple eyes',
    items: [
      // {
      //   image: '/works/Collision.webp',
      //   title: 'Collision',
      //   category: ''
      // },
      {
        image: '/works/Yin & Yan Meteor.webp',
        title: 'Yin & Yan Meteor',
        category: ''
      },
      {
        image: '/works/Meteor.webp',
        title: 'Meteor',
        category: ''
      },
      {
        image: '/works/water2.webp',
        title: 'Water',
        category: ''
      }
    ]
  },
  {
    title: 'Triple eyes',
    items: [
      // {
      //   image: '/works/Explosin.webp',
      //   title: 'Explosion',
      //   category: ''
      // },
      // {
      //   image: '/works/light beams.webp',
      //   title: 'Light beams',
      //   category: ''
      // },
      // {
      //   image: '/works/Radiance.webp',
      //   title: 'Radiance',
      //   category: ''
      // },
      // {
      //   image: '/works/Sparks.webp',
      //   title: 'Sparks',
      //   category: ''
      // },
      // {
      //   image: '/works/send.webp',
      //   title: 'Send',
      //   category: ''
      // },
      // {
      //   image: '/works/yin yang.webp',
      //   title: 'Yin Yang',
      //   category: ''
      // }
    ]
  }
]

export default function GalleryGrid() {
  const [openSection, setOpenSection] = useState(0)

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

      <div className={styles.accordion}>
        {gallerySections.map((section, sectionIndex) => (
          <div key={sectionIndex} className={styles.accordionItem}>
            <motion.div
              className={styles.accordionHeader}
              onClick={() => setOpenSection(sectionIndex === openSection ? -1 : sectionIndex)}
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2>{section.title}</h2>
              <motion.div
                className={styles.arrow}
                animate={{ rotate: sectionIndex === openSection ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                →
              </motion.div>
            </motion.div>
            
            <AnimatePresence>
              {sectionIndex === openSection && (
                <motion.div
                  className={styles.accordionContent}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.grid}>
                    {section.items.map((item, index) => (
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </>
  )
} 