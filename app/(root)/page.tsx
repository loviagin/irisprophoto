import HeroSection from "../components/Hero/HeroSection";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <div className={styles.test}>
      </div>
    </main>
  );
}
