import HeroSection from "../../components/Hero/HeroSection";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <HowItWorks />
      <WhyChooseUs />
      <p className={styles.version}>Version 1.0.6</p>
    </main>
  );
}
