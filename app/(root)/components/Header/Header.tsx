"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./Header.module.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BookingModal from "../BookingModal/BookingModal";
import AuthModal from "../AuthModal/AuthModal";
import firebase from "@/app/firebase/firebase";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const auth = getAuth(firebase);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

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

  const handleAccountClick = () => {
    if (user) {
      router.push('/account');
    } else {
      setIsAuthModalOpen(true);
    }
    setIsDropdownOpen(false);
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
              {/* <li>
                <Link href='/#whychooseus' className={styles.navLink}>
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link href='/#gallery' className={styles.navLink}>
                  Gallery
                </Link>
              </li>
              <li>
                <Link href='/#process' className={styles.navLink}>
                  Process
                </Link>
              </li> */}
              <li>
                <Link href='/gallery' className={styles.navLink}>
                  Gallery
                </Link>
              </li>
              <li>
                <Link href='/certificates' className={styles.navLink}>
                  Certificates
                </Link>
              </li>
              <li>
                <Link href='/#contacts' className={styles.navLink}>
                  Contacts
                </Link>
              </li>
              <li>
                <div className={styles.dropdownContainer} ref={dropdownRef}>
                  <div className={styles.ctaButtonWrapper}>
                    <button
                      className={styles.ctaButton}
                      onClick={() => setIsModalOpen(true)}
                    >
                      Order a photo shoot
                    </button>
                    {/* <button
                      className={styles.dropdownToggle}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsDropdownOpen(!isDropdownOpen);
                      }}
                      aria-label="Open menu"
                    >
                      <FaChevronDown
                        className={styles.chevronIcon}
                        style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }}
                      />
                    </button> */}
                  </div>
                  {/* <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        className={styles.dropdownMenu}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <button
                          className={styles.dropdownItem}
                          onClick={handleAccountClick}
                        >
                          <FaUser className={styles.menuItemIcon} />
                          {user ? 'Account' : 'Sign in'}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence> */}
                </div>
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
                  {/* <motion.li variants={itemVariants}>
                    <Link href='/#whychooseus' className={styles.navLink}>
                      Why Choose Us
                    </Link>
                  </motion.li>
                  <motion.li variants={itemVariants}>
                    <Link href='/#gallery' className={styles.navLink}>
                      Gallery
                    </Link>
                  </motion.li>
                  <motion.li variants={itemVariants}>
                    <Link href='/#process' className={styles.navLink}>
                      Process
                    </Link>
                  </motion.li> */}
                  <motion.li variants={itemVariants}>
                    <Link href='/gallery' className={styles.navLink}>
                      Gallery
                    </Link>
                  </motion.li>
                  <motion.li variants={itemVariants}>
                    <Link href='/certificates' className={styles.navLink}>
                      Certificates
                    </Link>
                  </motion.li>
                  <motion.li variants={itemVariants}>
                    <Link href='/#contacts' className={styles.navLink}>
                      Contacts
                    </Link>
                  </motion.li>
                  {/* <motion.li variants={itemVariants}>
                    <button
                      className={styles.navLink}
                      onClick={handleAccountClick}
                    >
                      <FaUser className={styles.menuItemIcon} />
                      {user ? 'Account' : 'Sign in'}
                    </button>
                  </motion.li> */}
                  <motion.li variants={itemVariants}>
                    <div className={styles.ctaButtonWrapper}>
                      <button
                        className={styles.ctaButton}
                        onClick={() => {
                          setIsModalOpen(true);
                          setIsMenuOpen(false);
                        }}
                      >
                        Order a photo shoot
                      </button>
                    </div>
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

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}