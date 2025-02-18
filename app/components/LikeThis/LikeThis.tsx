"use client";
import HeroButton from "../Hero/HeroButton";
import styles from "./LikeThis.module.css";

export default function LikeThis() {
    return (
        <section className={styles.likeThisSection}>
            <div className={styles.background}>
                <div className={styles.container}>
                    {/* Заголовок */}
                    <h2 className={styles.title}>Do you want something like this?</h2>

                    {/* Ряд изображений */}
                    <div className={styles.imagesRow}>
                        {/* Четыре картинки — замените пути на ваши реальные изображения */}
                        <div className={styles.imageWrapper}>
                            <img src="/images/Galaxy 1.png" alt="Iris 1" />
                        </div>
                        <div className={styles.imageWrapper}>
                            <img src="/images/pic2.png" alt="Iris 2" />
                        </div>
                        <div className={styles.imageWrapper}>
                            <img src="/images/pic3.png" alt="Iris 3" />
                        </div>
                        <div className={styles.imageWrapper}>
                            <img src="/images/Hurricane 1.png" alt="Iris 4" />
                        </div>
                    </div>

                    {/* Ряд кнопок */}
                    <div className={styles.buttonsRow}>
                        <HeroButton text="Make an order" />
                        <a className={styles.secondaryBtn} href="/#portfolio">See our Works</a>
                    </div>
                </div>
            </div>
        </section>
    );
}