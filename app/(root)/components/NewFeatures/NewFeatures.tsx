'use client'
import { motion } from 'framer-motion'
import styles from './NewFeatures.module.css'

const features = [
  {
    icon: '🎨',
    title: 'Artistic Excellence',
    description: 'Each iris portrait is crafted with meticulous attention to detail, transforming your unique patterns into stunning artwork.'
  },
  {
    icon: '🔬',
    title: 'Advanced Technology',
    description: 'Using cutting-edge imaging technology to capture every intricate detail of your iris with exceptional clarity.'
  },
  {
    icon: '✨',
    title: 'Personalized Experience',
    description: 'Your iris is as unique as your fingerprint. We ensure each portrait reflects your individual story.'
  }
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

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
}

export default function NewFeatures() {
  return (
    <section className={styles.features} id='whychooseus'>
      <motion.div 
        className={styles.container}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div 
          className={styles.header}
          variants={itemVariants}
        >
          <span className={styles.subtitle}>Why Choose Us</span>
          <h2>Experience the Art of Iris Photography</h2>
          <p>Discover what makes our iris portraits unique and why thousands choose us for their special memories.</p>
        </motion.div>

        <motion.div 
          className={styles.grid}
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className={styles.feature}
              variants={itemVariants}
            >
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>{feature.icon}</span>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
} 