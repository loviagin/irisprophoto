"use client";
import styles from "./HeroSection.module.css";
import HeroButton from "./HeroButton";
import { motion, useSpring, useTransform, useScroll } from "framer-motion";

export default function HeroSection() {
    const { scrollY } = useScroll();
    
    const springConfig = {
        stiffness: 100,
        damping: 30,
        mass: 0.5
    };

    const scale = useSpring(
        useTransform(scrollY, [0, 1000], [1, 1.3]),
        springConfig
    );

    const rotate = useSpring(
        useTransform(scrollY, [0, 1000], [0, 15]),
        springConfig
    );

    const translateX = useSpring(
        useTransform(scrollY, [0, 1000], [0, 30]),
        springConfig
    );

    const translateY = useSpring(
        useTransform(scrollY, [0, 1000], [0, -20]),
        springConfig
    );

    return (
      <section className={styles.hero}>
        <motion.div
          className={styles.heroBackground}
          style={{
            scale,
            rotate,
            x: translateX,
            y: translateY,
          }}
        />

        <motion.div 
          className={styles.overlay}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Order your iris portrait now!
          </motion.h1>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Make your gaze a part of an incredible art object
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <HeroButton text="Place an order" />
          </motion.div>
        </motion.div>
      </section>
    );
}