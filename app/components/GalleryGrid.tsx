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
        category: '',
        variants: [
          '/works/work1.webp',
          '/works/work2.webp',
          '/works/work3.webp'
        ]
      },
      {
        image: '/works/work2.webp',
        title: 'Fire',
        category: '',
        variants: [
          '/works/work2.webp',
          '/works/work1.webp',
          '/works/work5.webp'
        ]
      },
      {
        image: '/works/work3.webp',
        title: 'Halo hard',
        category: '',
        variants: [
          '/works/work3.webp',
          '/works/work5.webp',
          '/works/work6.webp'
        ]
      },
      {
        image: '/works/SuperNova.webp',
        title: 'SuperNova',
        category: '',
        variants: [
          '/works/SuperNova.webp'
        ]
      },
      {
        image: '/works/work5.webp',
        title: 'Meteor',
        category: '',
        variants: [
          '/works/work5.webp',
          '/works/Meteor.webp'
        ]
      },
      {
        image: '/works/work6.webp',
        title: 'Radiance',
        category: '',
        variants: [
          '/works/work6.webp',
          '/works/work3.webp'
        ]
      },
      {
        image: '/works/Galaxy.webp',
        title: 'Galaxy',
        category: '',
        variants: [
          '/works/Galaxy.webp',
          '/works/work1.webp'
        ]
      }, 
      {
        image: '/works/Halo light.webp',
        title: 'Halo light',
        category: '',
        variants: [
          '/works/Halo light.webp',
          '/works/work3.webp'
        ]
      },
      {
        image: '/works/Hurricane.webp',
        title: 'Hurricane',
        category: '',
        variants: [
          '/works/Hurricane.webp',
          '/works/work2.webp'
        ]
      },
      {
        image: '/works/light beams.webp',
        title: 'Light beams',
        category: '',
        variants: [
          '/works/light beams.webp',
          '/works/work6.webp'
        ]
      },
      {
        image: '/works/send.webp',
        title: 'Send',
        category: '',
        variants: [
          '/works/send.webp',
          '/works/work5.webp'
        ]
      },
      {
        image: '/works/Sparks.webp',
        title: 'Sparks',
        category: '',
        variants: [
          '/works/Sparks.webp',
          '/works/work1.webp'
        ]
      },
      {
        image: '/works/water.webp',
        title: 'Water',
        category: '',
        variants: [
          '/works/water.webp',
          '/works/water2.webp',
          '/works/water3.webp'
        ]
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
        image: '/works/work10.webp',
        title: 'Yin & Yan Meteor',
        category: '',
        variants: [
          '/works/work10.webp',
          '/works/yin yang.webp'
        ]
      },
      {
        image: '/works/Meteor.webp',
        title: 'Meteor',
        category: '',
        variants: [
          '/works/Meteor.webp',
          '/works/work5.webp'
        ]
      },
      {
        image: '/works/water2.webp',
        title: 'Water',
        category: '',
        variants: [
          '/works/water2.webp',
          '/works/water.webp',
          '/works/water3.webp'
        ]
      }
    ]
  },
  {
    title: 'Triple eyes',
    items: [
      {
        image: '/works/water3.webp',
        title: 'Water',
        category: '',
        variants: [
          '/works/water3.webp',
          '/works/water.webp',
          '/works/water2.webp'
        ]
      },
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
  const [selectedImages, setSelectedImages] = useState<{[key: string]: string}>({})

  // Debug: log gallery data
  console.log('Gallery sections:', gallerySections)

  const handleVariantClick = (itemKey: string, variantImage: string) => {
    setSelectedImages(prev => ({
      ...prev,
      [itemKey]: variantImage
    }))
  }

  const getItemKey = (sectionIndex: number, itemIndex: number) => {
    return `${sectionIndex}-${itemIndex}`
  }

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
                    {section.items.map((item, index) => {
                      const itemKey = getItemKey(sectionIndex, index)
                      const currentImage = selectedImages[itemKey] || item.image
                      
                      // Debug: log each item
                      console.log(`Item ${index}:`, {
                        title: item.title,
                        variants: item.variants,
                        variantsLength: item.variants?.length,
                        uniqueVariants: item.variants ? new Set(item.variants).size : 0,
                        shouldShowVariants: item.variants && item.variants.length > 1 && new Set(item.variants).size > 1
                      })
                      
                      return (
                        <motion.div
                          key={index}
                          className={styles.item}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px'
                          }}
                        >
                          {/* Debug info at top */}
                          <div style={{
                            position: 'absolute', 
                            top: '5px', 
                            left: '5px', 
                            background: 'red', 
                            color: 'white', 
                            padding: '2px 5px', 
                            fontSize: '10px',
                            zIndex: 10
                          }}>
                            {item.variants ? `${item.variants.length} variants` : 'No variants'}
                          </div>
                          
                          {/* Simple debug text */}
                          <div style={{
                            position: 'absolute',
                            top: '30px',
                            left: '5px',
                            background: 'blue',
                            color: 'white',
                            padding: '2px 5px',
                            fontSize: '10px',
                            zIndex: 10
                          }}>
                            DEBUG: {item.title}
                          </div>
                          
                          <div className={styles.imageWrapper}>
                            <img src={currentImage} alt={item.title} />
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
                          
                          {/* Simple variants display */}
                          <div style={{
                            padding: '10px',
                            border: '3px solid red',
                            background: 'rgba(255, 0, 0, 0.3)',
                            fontSize: '12px',
                            color: 'white',
                            textAlign: 'center',
                            borderRadius: '6px'
                          }}>
                            <strong>VARIANTS: {item.variants ? item.variants.length : 0}</strong>
                            <div style={{marginTop: '8px'}}>
                              {item.variants && item.variants.map((variant, variantIndex) => (
                                <span key={variantIndex} style={{
                                  display: 'inline-block',
                                  margin: '3px',
                                  padding: '4px 8px',
                                  border: '2px solid white',
                                  background: 'blue',
                                  borderRadius: '4px',
                                  fontSize: '10px'
                                }}>
                                  {variantIndex + 1}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
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