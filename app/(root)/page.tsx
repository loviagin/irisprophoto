import HeroSection from "../components/Hero/HeroSection";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <HowItWorks />
      <div className={styles.test}>
      </div>
      <p className={styles.version}>Version 1.0.5</p>
    </main>
  );
}
