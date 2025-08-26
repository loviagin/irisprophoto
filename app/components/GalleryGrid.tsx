'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import styles from './GalleryGrid.module.css'
import React from 'react'

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
        ]
      },
      {
        image: '/works/work2.webp',
        title: 'Fire',
        category: '',
        variants: [
          '/works/work2.webp',
        ]
      },
      {
        image: '/works/work3.webp',
        title: 'Halo hard',
        category: '',
        variants: [
          '/works/work3.webp',
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
        ]
      },
      {
        image: '/works/work6.webp',
        title: 'Radiance',
        category: '',
        variants: [
          '/works/work6.webp',
        ]
      },
      {
        image: '/works/Galaxy.webp',
        title: 'Galaxy',
        category: '',
        variants: [
          '/works/Galaxy.webp',
        ]
      }, 
      {
        image: '/works/Halo light.webp',
        title: 'Halo light',
        category: '',
        variants: [
          '/works/Halo light.webp',
        ]
      },
      {
        image: '/works/Hurricane.webp',
        title: 'Hurricane',
        category: '',
        variants: [
          '/works/Hurricane.webp',
        ]
      },
      {
        image: '/works/light beams.webp',
        title: 'Light beams',
        category: '',
        variants: [
          '/works/light beams.webp',
        ]
      },
      {
        image: '/works/send.webp',
        title: 'Send',
        category: '',
        variants: [
          '/works/send.webp',
        ]
      },
      {
        image: '/works/Sparks.webp',
        title: 'Sparks',
        category: '',
        variants: [
          '/works/Sparks.webp',
        ]
      },
      {
        image: '/works/water.webp',
        title: 'Water',
        category: '',
        variants: [
          '/works/water.webp',
        ]
      }
    ]
  },
  {
    title: 'Couple eyes',
    items: [
      {
        image: '/works/work10.webp',
        title: 'Yin & Yan Meteor',
        category: '',
        variants: [
          '/works/work10.webp',
          '/works/work10-2.webp',
          '/works/work10-3.webp',
        ]
      },
      {
        image: '/works/Meteor.webp',
        title: 'Meteor',
        category: '',
        variants: [
          '/works/Meteor.webp',
        ]
      },
      {
        image: '/works/water2.webp',
        title: 'Water',
        category: '',
        variants: [
          '/works/water2.webp',
        ]
      },
      {
        image: '/works/work11.webp',
        title: 'Supernova Collision',
        category: '',
        variants: [
          '/works/work11.webp',
        ]
      },
      {
        image: '/works/work13.webp',
        title: 'Water Collison',
        category: '',
        variants: [
          '/works/work13.webp',
        ]
      },
      {
        image: '/works/work14.webp',
        title: 'Collison',
        category: '',
        variants: [
          '/works/work14.webp',
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
          '/works/water3-2.webp',
        ]
      },
      {
        image: '/works/work12.webp',
        title: 'Three-way Collison',
        category: '',
        variants: [
          '/works/work12.webp',
        ]
      },
    ]
  },
  {
    title: 'Four eyes',
    items: [
      {
        image: '/works/four-eyes/work1.webp',
        title: 'Water',
        category: '',
        variants: [
          '/works/four-eyes/work1.webp',
        ]
      },
    ]
  }
]

export default function GalleryGrid() {
  const [openSection, setOpenSection] = useState(0)
  const [selectedImages, setSelectedImages] = useState<{[key: string]: string}>({})
  const [variantIndices, setVariantIndices] = useState<{[key: string]: number}>({})

  // Инициализируем selectedImages с первым вариантом каждого элемента
  React.useEffect(() => {
    const initialSelectedImages: {[key: string]: string} = {}
    gallerySections.forEach((section, sectionIndex) => {
      section.items.forEach((item, itemIndex) => {
        const itemKey = getItemKey(sectionIndex, itemIndex)
        if (item.variants && item.variants.length > 0) {
          initialSelectedImages[itemKey] = item.variants[0]
        }
      })
    })
    setSelectedImages(initialSelectedImages)
  }, [])

  const handleVariantClick = (itemKey: string, variantImage: string) => {
    setSelectedImages(prev => ({
      ...prev,
      [itemKey]: variantImage
    }))
    
    // Update variant index when clicking on a specific variant
    const item = gallerySections.flatMap(section => section.items).find(item => {
      const [sectionIndex, itemIndex] = itemKey.split('-').map(Number)
      return gallerySections[sectionIndex]?.items[itemIndex] === item
    })
    
    if (item && item.variants) {
      const variantIndex = item.variants.indexOf(variantImage)
      if (variantIndex !== -1) {
        setVariantIndices(prev => ({
          ...prev,
          [itemKey]: variantIndex
        }))
      }
    }
  }

  const handleVariantNavigation = (itemKey: string, direction: 'prev' | 'next') => {
    setVariantIndices(prev => {
      const currentIndex = prev[itemKey] || 0
      
      // Find the item by parsing the itemKey
      const [sectionIndex, itemIndex] = itemKey.split('-').map(Number)
      const item = gallerySections[sectionIndex]?.items[itemIndex]
      
      if (!item || !item.variants) return prev
      
      let newIndex
      if (direction === 'prev') {
        newIndex = currentIndex > 0 ? currentIndex - 1 : item.variants.length - 1
      } else {
        newIndex = currentIndex < item.variants.length - 1 ? currentIndex + 1 : 0
      }
      
      // Update selected image when navigating
      setSelectedImages(prev => ({
        ...prev,
        [itemKey]: item.variants[newIndex]
      }))
      
      return {
        ...prev,
        [itemKey]: newIndex
      }
    })
  }

  const getItemKey = (sectionIndex: number, itemIndex: number) => {
    return `${sectionIndex}-${itemIndex}`
  }

  return (
    <>
      <motion.div
        className={styles.galleryHeader}
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
                      
                      return (
                        <motion.div
                          key={index}
                          className={styles.item}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
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
                          
                          {/* Variants section */}
                          {item.variants && (
                            <div className={styles.variantsContainer}>
                              {/* Navigation arrows */}
                              {/* <button
                                className={`${styles.navArrow} ${styles.navArrowLeft}`}
                                onClick={() => handleVariantNavigation(itemKey, 'prev')}
                              >
                                ←
                              </button>
                              
                              <button
                                className={`${styles.navArrow} ${styles.navArrowRight}`}
                                onClick={() => handleVariantNavigation(itemKey, 'next')}
                              >
                                →
                              </button> */}
                              
                              <div className={styles.variantsGrid}>
                                {item.variants.map((variant, variantIndex) => {
                                  const isActive = selectedImages[itemKey] === variant
                                  return (
                                    <motion.div
                                      key={variantIndex}
                                      className={`${styles.variantThumbnail} ${isActive ? styles.active : ''}`}
                                      onClick={() => handleVariantClick(itemKey, variant)}
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      <img 
                                        src={variant} 
                                        alt={`${item.title} variant ${variantIndex + 1}`}
                                        className={styles.variantImage}
                                        onError={(e) => {
                                          console.error(`Failed to load image: ${variant}`);
                                          e.currentTarget.style.display = 'none';
                                        }}
                                      />
                                    </motion.div>
                                  )
                                })}
                              </div>
                            </div>
                          )}
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