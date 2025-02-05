import HeroSection from "../components/Hero/HeroSection";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <div className={styles.test}>
      </div>
      <p className={styles.version}>Version 1.0.3</p>
    </main>
  );
}
