"use client";
import { useState, useEffect } from "react";
import styles from "./HeroSection.module.css";
import Popup from "../Popup/Popup";

interface HeroButtonProps {
  text: string;
}

export default function HeroButton({ text }: HeroButtonProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (isPopupOpen) {
      document.body.classList.add("no-scroll"); // Запрещаем скролл
    } else {
      document.body.classList.remove("no-scroll"); // Разрешаем скролл
    }
    
    return () => document.body.classList.remove("no-scroll"); // Чистим при размонтировании
  }, [isPopupOpen]);

  return (
    <>
      <button className={styles.button} onClick={() => setIsPopupOpen(true)}>
        {text}
      </button>
      {isPopupOpen && <Popup onClose={() => setIsPopupOpen(false)} />}
    </>
  );
}