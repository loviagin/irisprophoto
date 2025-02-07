import styles from './HowItWorks.module.css';

interface CardProps {
    title: string;
    description: string;
    image: string;
}

export default function Card({ title, description, image }: CardProps) {
    return (
        <div className={styles.card}>
            <img src={image} alt={title} className={styles.image} />
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}