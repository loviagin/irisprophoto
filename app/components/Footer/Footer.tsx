import Link from 'next/link';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerMain}>
          <div className={styles.footerSection}>
            <h3>IRISPROPHOTO</h3>
            <p>Профессиональная фотография для ваших особенных моментов</p>
            <div className={styles.socialLinks}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <FaWhatsapp />
              </a>
            </div>
          </div>

          <div className={styles.footerSection}>
            <h4>Услуги</h4>
            <ul>
              <li><Link href="/services/wedding">Свадебная съёмка</Link></li>
              <li><Link href="/services/portrait">Портретная съёмка</Link></li>
              <li><Link href="/services/family">Семейная съёмка</Link></li>
              <li><Link href="/services/event">Репортажная съёмка</Link></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4>Информация</h4>
            <ul>
              <li><Link href="/about">О фотографе</Link></li>
              <li><Link href="/portfolio">Портфолио</Link></li>
              <li><Link href="/pricing">Цены</Link></li>
              <li><Link href="/contacts">Контакты</Link></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4>Контакты</h4>
            <ul>
              <li><a href="tel:+1234567890">+1 (234) 567-890</a></li>
              <li><a href="mailto:info@irisprophoto.com">info@irisprophoto.com</a></li>
              <li>Москва, Россия</li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.copyright}>
            © {new Date().getFullYear()} IrisProPhoto. Все права защищены
          </div>
          <div className={styles.legal}>
            <Link href="/privacy">Политика конфиденциальности</Link>
            <Link href="/terms">Условия использования</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}