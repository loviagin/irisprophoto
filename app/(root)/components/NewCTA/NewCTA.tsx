"use client";
import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaCamera, FaHeart, FaImages } from 'react-icons/fa';
import styles from './NewCTA.module.css';
import BookingModal from '../BookingModal/BookingModal';

const features = [
  {
    icon: <FaCamera />,
    text: 'Professional photography'
  },
  {
    icon: <FaHeart />,
    text: 'Individual approach'
  },
  {
    icon: <FaImages />,
    text: 'Fast processing'
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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
            Are you ready to capture your special moments?
          </motion.h2>

          <motion.p variants={itemVariants}>
            Let's create unforgettable photos together that will delight you for many years to come.
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
            <button className={styles.primaryButton} onClick={() => setIsModalOpen(true)}>
              Sign up for a shoot
            </button>
            <Link href="#gallery" className={styles.secondaryButton}>
              View the portfolio
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default NewCTA; 