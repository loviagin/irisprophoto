"use client";
import React from 'react';
import { motion } from 'framer-motion';
import styles from './NewProcess.module.css';
import Image from 'next/image';

const processSteps = [
  {
    image: '/images/how/img1.webp',
    title: 'Image Capture',
    description: 'High-detail macro photography of the iris.'
  },
  {
    image: '/images/how/img2.webp',
    title: 'Digital Processing',
    description: 'Color enhancement, retouching, and artistic effects.'
  },
  {
    image: '/images/how/img3.webp',
    title: 'Printing',
    description: 'Canon printing with Lucia Pro 2 inks, lasting 100 years.'
  },
  {
    image: '/images/how/img4.webp',
    title: 'Final Product',
    description: '100+ framing options: canvas, acrylic, photo paper.'
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
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

const NewProcess = () => {
  return (
    <section className={styles.process} id='process'>
      <div className={styles.background}></div>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>How do we operate?</span>
          <h2>The process of creating your perfect photos</h2>
          <p>From the first meeting to the finished result, every step is carefully thought out for your comfort.</p>
        </div>

        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {processSteps.map((step, index) => (
            <motion.div 
              key={index}
              className={styles.step}
              variants={itemVariants}
            >
              <div className={styles.iconWrapper}>
                <Image
                  src={step.image}
                  alt={step.title}
                  width={200}
                  height={150}
                  className={styles.processImage}
                />
              </div>
              <div className={styles.stepNumber}>0{index + 1}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default NewProcess; 