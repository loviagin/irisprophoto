"use client";
import React from 'react';
import { motion } from 'framer-motion';
import styles from './NewProcess.module.css';
import { FaRegComments, FaRegLightbulb, FaCameraRetro, FaRegImages } from 'react-icons/fa';

const processSteps = [
  {
    icon: <FaRegComments size={32} />,
    title: 'Consultation',
    description: 'We will discuss your ideas and wishes, determine the shooting format and location.'
  },
  {
    icon: <FaRegLightbulb size={32} />,
    title: 'Планирование',
    description: 'Разработаем концепцию съемки, подберем образы и реквизит'
  },
  {
    icon: <FaCameraRetro size={32} />,
    title: 'Фотосессия',
    description: 'Проведем съемку в выбранной локации, создадим атмосферные кадры'
  },
  {
    icon: <FaRegImages size={32} />,
    title: 'Обработка',
    description: 'Отберем лучшие фотографии и выполним профессиональную ретушь'
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
    <section className={styles.process} id='Process'>
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
                {step.icon}
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