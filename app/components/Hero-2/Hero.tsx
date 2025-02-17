// components/Hero.tsx
import HeroButton from "../Hero/HeroButton";
import styles from "./Hero.module.css";

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.background}>
                <div className={styles.content}>
                    <h1>Order your iris pro portrait!</h1>
                    <div className={styles.effects}>
                        <span className={styles.effect}>Explosion</span>
                        <span className={styles.dot}>•</span>
                        <span className={styles.effect}>Fire</span>
                        <span className={styles.dot}>•</span>
                        <span className={styles.effect}>Galaxy</span>
                        <span className={styles.dot}>•</span>
                        <span className={styles.effect}>Halo Hard</span>
                        <span className={styles.dot}>•</span>
                        <span className={styles.effect}>Hurricane</span>
                        <span className={styles.dot}>•</span>
                        <span className={styles.more}>and more</span>
                    </div>
                    <p>
                        Make your gaze a part of an incredible art object and give your loved
                        one an unforgettable gift
                    </p>
                    <HeroButton text="Place an order" />
                </div>
                <div className={styles.images}>
                    <img src="/images/Group 15.png" alt="Iris effect" className={styles.image1} />
                    {/* <img src="/images/Hurricane.webp" alt="Iris effect" className={styles.image2} />
                <img src="/images/Sparks.webp" alt="Iris effect" className={styles.image3} /> */}
                </div>
            </div>
        </section>
    );
};

export default Hero;