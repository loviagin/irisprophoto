import styles from "./HeroSection.module.css";

interface HeroButtonProps {
  text: string;
}

export default function HeroButton({ text }: HeroButtonProps) {
  return <button className={styles.button}>{text}</button>;
}