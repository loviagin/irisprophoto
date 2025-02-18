import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        IrisProPhoto. All rights reserved 2025 ©
      </div>
      <div className={styles.right}>
        <a href="/privacypolicy">Privacy Policy</a>
      </div>
    </footer>
  );
}