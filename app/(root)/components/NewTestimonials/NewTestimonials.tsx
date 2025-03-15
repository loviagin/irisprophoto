'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';
import styles from './NewTestimonials.module.css';

const testimonials = [
  {
    id: 1,
    name: 'Jane Doe',
    role: 'Single photo session',
    image: '/images/user.webp',
    quote: 'I had a great experience with this photographer. He made me feel comfortable and relaxed during the photo shoot. The final photos were amazing and I would definitely recommend him to anyone looking for a professional photographer.',
    rating: 5
  },
  {
    id: 2,
    name: 'Michael Smith',
    role: 'Family photo session',
    image: '/images/user.webp',
    quote: 'We had a great time during the photo session. The photographer was very professional and made us feel comfortable. The final photos were amazing and we are very happy with the results. We would definitely recommend him to anyone.',
    rating: 5
  },
  {
    id: 3,
    name: 'John Brown',
    role: 'Friends photo session',
    image: '/images/user.webp',
    quote: 'The photographer was very professional and made us feel comfortable during the photo session. The final photos were amazing and we are very happy with the results. We would definitely recommend him to anyone looking for a photographer.',
    rating: 5
  }
];

const AUTO_SCROLL_INTERVAL = 7000;

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
      x: direction > 0 ? 200 : -200,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const contentVariants = {
    initial: { opacity: 0, y: 10 },
    animate: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.05,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <section className={styles.testimonials} id='Testimonials'>
      <div className={styles.background}></div>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>Reviews</span>
          <h2>What our customers say</h2>
          <p>Find out what those who have already entrusted their important points to us think about our work.</p>
        </div>

        <div 
          className={styles.carousel}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className={styles.carouselWrapper}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
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
