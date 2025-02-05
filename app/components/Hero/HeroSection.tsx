"use client";
import { useEffect, useState } from "react";
import styles from "./HeroSection.module.css";
import HeroButton from "./HeroButton";

export default function HeroSection() {
    const [scrollY, setScrollY] = useState(0);
  
    useEffect(() => {
      const handleScroll = () => {
        setScrollY(window.scrollY);
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  
    const scale = 1 + scrollY * 0.0005; // Увеличение фона
    const rotation = scrollY * 0.02; // Поворот фона
  
    return (
      <section className={styles.hero}>
        {/* Фон, который увеличивается и вращается */}
        <div
          className={styles.heroBackground}
          style={{
            transform: `scale(${scale}) rotate(${rotation}deg)`,
          }}
        ></div>
  
        {/* Контейнер с текстом и кнопкой */}
        <div className={styles.overlay}>
          <h1 className={styles.title}>Order your iris portrait now!</h1>
          <p className={styles.subtitle}>Make your gaze a part of an incredible art object</p>
          <HeroButton text="Place an order" />
        </div>
      </section>
    );
  }