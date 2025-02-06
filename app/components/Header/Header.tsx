"use client";
import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import AccountButton from "./AccountButton";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Фон станет черным после 50px прокрутки
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.logo}>IRISPROPHOTO</div>
      <nav>
        <ul className={styles.navList}>
          <li><a href="#about">About Us</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="#contacts">Contacts</a></li>
          <AccountButton />
        </ul>
      </nav>
    </header>
  );
}