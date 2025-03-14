"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaCamera, FaHeart, FaImages } from 'react-icons/fa';
import styles from './NewCTA.module.css';

const features = [
  {
    icon: <FaCamera />,
    text: 'Профессиональная съемка'
  },
  {
    icon: <FaHeart />,
    text: 'Индивидуальный подход'
  },
  {
    icon: <FaImages />,
    text: 'Быстрая обработка'
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const NewCTA = () => {
  return (
    <section className={styles.cta}>
      <div className={styles.background}>
        <div className={styles.overlay}></div>
      </div>
      
      <div className={styles.container}>
        <motion.div 
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 variants={itemVariants}>
            Готовы запечатлеть ваши особенные моменты?
          </motion.h2>
          
          <motion.p variants={itemVariants}>
            Давайте создадим вместе незабываемые фотографии, которые будут радовать вас долгие годы
          </motion.p>

          <motion.div 
            className={styles.features}
            variants={containerVariants}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className={styles.feature}
                variants={itemVariants}
              >
                <span className={styles.icon}>{feature.icon}</span>
                <span className={styles.text}>{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className={styles.buttons}
            variants={itemVariants}
          >
            <Link href="/contact" className={styles.primaryButton}>
              Записаться на съемку
            </Link>
            <Link href="/portfolio" className={styles.secondaryButton}>
              Посмотреть портфолио
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewCTA; 