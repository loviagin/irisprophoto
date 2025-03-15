"use client";
import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import BookingModal from "../../(root)/components/BookingModal/BookingModal";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const menuVariants = {
    initial: {
      opacity: 0,
      y: -20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
    exit: { 
      opacity: 0, 
      y: 20,
      transition: {
        duration: 0.2,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.headerContent}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoText}>IRISPROPHOTO</span>
          </Link>

          <button
            className={styles.menuButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <motion.div
              initial={false}
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: [0.6, -0.05, 0.01, 0.99] }}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </motion.div>
          </button>

          <nav className={styles.nav}>
            <ul className={styles.navList}>
              <li>
                <button onClick={() => scrollToSection('whychooseus')} className={styles.navLink}>
                  Why Choose Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('gallery')} className={styles.navLink}>
                  Gallery
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('process')} className={styles.navLink}>
                  Process
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contacts')} className={styles.navLink}>
                  Contacts
                </button>
              </li>
              <li>
                <button
                  className={styles.ctaButton}
                  onClick={() => setIsModalOpen(true)}
                >
                  Order a photo shoot
                </button>
              </li>
            </ul>
          </nav>

          <AnimatePresence mode="wait">
            {isMenuOpen && (
              <motion.nav
                className={styles.mobileNav}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={menuVariants}
              >
                <motion.ul 
                  className={styles.mobileNavList}
                  variants={containerVariants}
                >
                  <motion.li variants={itemVariants}>
                    <button onClick={() => scrollToSection('whychooseus')} className={styles.navLink}>
                      Why Choose Us
                    </button>
                  </motion.li>
                  <motion.li variants={itemVariants}>
                    <button onClick={() => scrollToSection('gallery')} className={styles.navLink}>
                      Gallery
                    </button>
                  </motion.li>
                  <motion.li variants={itemVariants}>
                    <button onClick={() => scrollToSection('process')} className={styles.navLink}>
                      Process
                    </button>
                  </motion.li>
                  <motion.li variants={itemVariants}>
                    <button onClick={() => scrollToSection('contacts')} className={styles.navLink}>
                      Contacts
                    </button>
                  </motion.li>
                  <motion.li variants={itemVariants}>
                    <button
                      className={styles.ctaButton}
                      onClick={() => {
                        setIsModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                    >
                      Order a photo shoot
                    </button>
                  </motion.li>
                </motion.ul>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </header>

      <BookingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}