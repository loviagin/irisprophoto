"use client";
import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { FaBars, FaTimes, FaCamera, FaCalendarAlt, FaEnvelope } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    shootingType: 'wedding',
    date: '',
    message: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 }
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки формы
    console.log(formData);
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerOffset = 80;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
        <div className={styles.headerContent}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoText}>IRISPROPHOTO</span>
          </Link>

          <div className={styles.menuWrapper}>
            <button
              className={styles.menuButton}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            <nav className={styles.nav}>
              <ul className={styles.navList}>
                <li>
                  <button onClick={() => scrollToSection('WHYCHOOSEUS')} className={styles.navLink}>
                    Why Choose Us
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('GALLERY')} className={styles.navLink}>
                    Gallery
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('Process')} className={styles.navLink}>
                    Process
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('Contacts')} className={styles.navLink}>
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

            <AnimatePresence>
              {isMenuOpen && (
                <motion.nav
                  className={styles.mobileNav}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={menuVariants}
                >
                  <motion.ul className={styles.mobileNavList}>
                    <motion.li variants={itemVariants}>
                      <button onClick={() => scrollToSection('portfolio')} className={styles.navLink}>
                        Портфолио
                      </button>
                    </motion.li>
                    <motion.li variants={itemVariants}>
                      <button onClick={() => scrollToSection('services')} className={styles.navLink}>
                        Услуги
                      </button>
                    </motion.li>
                    <motion.li variants={itemVariants}>
                      <button onClick={() => scrollToSection('about')} className={styles.navLink}>
                        Обо мне
                      </button>
                    </motion.li>
                    <motion.li variants={itemVariants}>
                      <button onClick={() => scrollToSection('contacts')} className={styles.navLink}>
                        Контакты
                      </button>
                    </motion.li>
                    <motion.li variants={itemVariants}>
                      <button
                        className={styles.ctaButton}
                        onClick={() => setIsModalOpen(true)}
                      >
                        Order a photo shoot
                      </button>
                    </motion.li>
                  </motion.ul>
                </motion.nav>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className={styles.modal}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={e => e.stopPropagation()}
            >
              <button
                className={styles.modalClose}
                onClick={() => setIsModalOpen(false)}
              >
                <FaTimes />
              </button>

              <div className={styles.modalContent}>
                <h2>Запись на фотосессию</h2>
                <p>Оставьте ваши данные, и я свяжусь с вами для обсуждения деталей</p>

                <form onSubmit={handleSubmit} className={styles.bookingForm}>
                  <div className={styles.formGroup}>
                    <FaCamera className={styles.formIcon} />
                    <select
                      name="shootingType"
                      value={formData.shootingType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="wedding">Свадебная съёмка</option>
                      <option value="portrait">Портретная съёмка</option>
                      <option value="family">Семейная съёмка</option>
                      <option value="event">Репортажная съёмка</option>
                    </select>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <input
                        type="text"
                        name="name"
                        placeholder="Ваше имя"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Телефон"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <FaEnvelope className={styles.formIcon} />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <FaCalendarAlt className={styles.formIcon} />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <textarea
                      name="message"
                      placeholder="Ваши пожелания или вопросы"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                    />
                  </div>

                  <button type="submit" className={styles.submitButton}>
                    Order a photo shoot
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}