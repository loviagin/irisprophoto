import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>IRISPROPHOTO</div>
      <nav>
        <ul className={styles.navList}>
          <li><a href="#about">About Us</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="#contacts">Contacts</a></li>
        </ul>
      </nav>
    </header>
  );
}