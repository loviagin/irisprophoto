"use client";
import { useEffect, useState } from "react";
import styles from "./HowItWorks.module.css";

interface CardProps {
  title: string;
  description: string;
  image: string;
}

export default function Card({ title, description, image }: CardProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Запускается только на клиенте
    setVisible(true);
  }, []);

  // Определяем, какие классы применять
  const cardClasses = [
    styles.card, // базовые стили
    visible ? styles.cardVisible : styles.cardHidden, // анимация появления
  ].join(" ");

  return (
    <div className={cardClasses}>
      <img src={image} alt={title} className={styles.image} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}