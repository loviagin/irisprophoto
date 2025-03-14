'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';
import styles from './NewTestimonials.module.css';

const testimonials = [
  {
    id: 1,
    name: 'Анна Петрова',
    role: 'Свадебная фотосессия',
    image: '/images/testimonials/anna.webp',
    quote: 'Отзыв вау',
    rating: 5
  },
  {
    id: 2,
    name: 'Михаил Соколов',
    role: 'Семейная фотосессия',
    image: '/images/testimonials/mikhail.webp',
    quote: 'Отзыв 2',
    rating: 5
  },
  {
    id: 3,
    name: 'Екатерина Волкова',
    role: 'Портретная съёмка',
    image: '/images/testimonials/ekaterina.webp',
    quote: 'Это была моя первая профессиональная фотосессия',
    rating: 5
  }
];

const AUTO_SCROLL_INTERVAL = 5000;

const NewTestimonials = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isHovered, setIsHovered] = useState(false);

  const testimonialIndex = Math.abs(page % testimonials.length);

  const paginate = useCallback((newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  }, [page]);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      paginate(1);
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(interval);
  }, [paginate, isHovered]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
      position: 'absolute'
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      position: 'relative',
      transition: {
        duration: 0.4,
        ease: [0.4, 0.0, 0.2, 1]
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
      position: 'absolute',
      transition: {
        duration: 0.4,
        ease: [0.4, 0.0, 0.2, 1]
      }
    })
  };

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.4,
        ease: [0.4, 0.0, 0.2, 1]
      }
    })
  };

  return (
    <section className={styles.testimonials} id='Testimonials'>
      <div className={styles.background}></div>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>Отзывы</span>
          <h2>Что говорят наши клиенты</h2>
          <p>Узнайте, что думают о нашей работе те, кто уже доверил нам свои важные моменты</p>
        </div>

        <div 
          className={styles.carousel}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className={styles.carouselWrapper}>
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                initial="enter"
                animate="center"
                exit="exit"
                className={styles.testimonial}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(_, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) * velocity.x;
                  if (swipe < -10000) {
                    paginate(1);
                  } else if (swipe > 10000) {
                    paginate(-1);
                  }
                }}
              >
                <div className={styles.content}>
                  <motion.div 
                    variants={contentVariants}
                    initial="initial"
                    animate="animate"
                    custom={0}
                    className={styles.quoteIcon}
                  >
                    <FaQuoteLeft />
                  </motion.div>
                  
                  <motion.p 
                    variants={contentVariants}
                    initial="initial"
                    animate="animate"
                    custom={1}
                    className={styles.quote}
                  >
                    {testimonials[testimonialIndex].quote}
                  </motion.p>

                  <motion.div 
                    variants={contentVariants}
                    initial="initial"
                    animate="animate"
                    custom={2}
                    className={styles.rating}
                  >
                    {[...Array(testimonials[testimonialIndex].rating)].map((_, i) => (
                      <FaStar key={i} className={styles.star} />
                    ))}
                  </motion.div>

                  <motion.div 
                    variants={contentVariants}
                    initial="initial"
                    animate="animate"
                    custom={3}
                    className={styles.author}
                  >
                    <img 
                      src={testimonials[testimonialIndex].image} 
                      alt={testimonials[testimonialIndex].name}
                      className={styles.avatar}
                    />
                    <div className={styles.info}>
                      <h4>{testimonials[testimonialIndex].name}</h4>
                      <span>{testimonials[testimonialIndex].role}</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button 
            className={`${styles.navButton} ${styles.prev}`}
            onClick={() => paginate(-1)}
            aria-label="Предыдущий отзыв"
          >
            <FaChevronLeft />
          </button>
          <button 
            className={`${styles.navButton} ${styles.next}`}
            onClick={() => paginate(1)}
            aria-label="Следующий отзыв"
          >
            <FaChevronRight />
          </button>

          <div className={styles.dots}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === testimonialIndex ? styles.active : ''}`}
                onClick={() => {
                  const newDirection = index > testimonialIndex ? 1 : -1;
                  setPage([index, newDirection]);
                }}
                aria-label={`Перейти к отзыву ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewTestimonials;
