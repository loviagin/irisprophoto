"use client";
import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import AccountButton from "./AccountButton";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.logo}>IRISPROPHOTO</div>
      <div className={styles.menuWrapper}>
        <button className={styles.menuButton} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`}>
          <ul className={styles.navList}>
            <li><a href="#howitworks" onClick={() => setIsMenuOpen(false)}>How It Works</a></li>
            <li><a href="#why-choose-us" onClick={() => setIsMenuOpen(false)}>Why choose Us</a></li>
            <li><a href="#contacts" onClick={() => setIsMenuOpen(false)}>Contacts</a></li>
            <AccountButton />
          </ul>
        </nav>
      </div>
    </header>
  );
}