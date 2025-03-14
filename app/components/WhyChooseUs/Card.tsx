import styles from './WhyChooseUs.module.css'
import { motion } from 'framer-motion'

interface CardProps {
    title: string;
    description: string;
    image: string;
}

const Card = ({ title, description, image }: CardProps) => {
    return (
        <motion.div 
            className={styles.card}
            whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
        >
            <motion.img 
                src={image} 
                alt={title}
                whileHover={{ 
                    scale: 1.1,
                    transition: { duration: 0.2 }
                }}
            />
            <motion.div 
                className={styles.content}
                style={{
                    backgroundColor: '#ffffff',
                    background: '#ffffff'
                }}
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
            >
                <h3>{title}</h3>
                <p>{description}</p>
            </motion.div>
        </motion.div>
    )
}

export default Card