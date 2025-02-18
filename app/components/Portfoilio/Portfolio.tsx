// "use client";
import styles from "./Portfolio.module.css";

/* Можно описать массив карточек заранее */
const portfolioItems = [
  {
    id: 1,
    title: "Our work #1",
    imgSrc: "/images/portfolio-icon1.png",
  },
  {
    id: 2,
    title: "Our work #2",
    imgSrc: "/images/portfolio-icon2.png",
  },
  {
    id: 3,
    title: "Our work #3",
    imgSrc: "/images/portfolio-icon3.png",
  },
  {
    id: 4,
    title: "Our work #4",
    imgSrc: "/images/portfolio-icon4.png",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className={styles.portfolio}>
      <div className={styles.container}>
        <h2 className={styles.title}>Our portfolio</h2>
        <p className={styles.subtitle}>Just a few of our works</p>

        <div className={styles.cards}>
          {portfolioItems.map((item) => (
            <div key={item.id} className={styles.card}>
              {/* Изображение/иконка */}
              <img
                src={item.imgSrc}
                alt={`Portfolio item ${item.id}`}
                className={styles.cardImage}
              />
              {/* Подпись */}
              <p className={styles.cardTitle}>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}