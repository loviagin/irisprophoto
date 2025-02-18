// "use client";
import styles from "./Portfolio.module.css";

/* Можно описать массив карточек заранее */
const portfolioItems = [
  {
    id: 1,
    title: "Explosin",
    imgSrc: "/works/work1.webp",
  },
  {
    id: 2,
    title: "Fire",
    imgSrc: "/works/work2.webp",
  },
  {
    id: 3,
    title: "Halo hard",
    imgSrc: "/works/work3.webp",
  },
  {
    id: 4,
    title: "Light beams hard",
    imgSrc: "/works/work4.webp",
  },
  {
    id: 5,
    title: "Meteor",
    imgSrc: "/works/work5.webp",
  },
  {
    id: 6,
    title: "Radiance",
    imgSrc: "/works/work6.webp",
  },
  {
    id: 7,
    title: "Sand",
    imgSrc: "/works/work7.webp",
  },
  {
    id: 8,
    title: "Water",
    imgSrc: "/works/work8.webp",
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