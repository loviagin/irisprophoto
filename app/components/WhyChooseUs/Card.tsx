import styles from './WhyChooseUs.module.css'

interface CardProps {
    title: string;
    description: string;
    image: string;
}

const Card = ({ title, description, image }: CardProps) => {
    return (
        <div className={styles.card}>
            <img src={image} alt={title} />
            <div className={styles.content}>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default Card