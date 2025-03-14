"use client"
import { useEffect } from 'react'
import Card from './Card'
import styles from './WhyChooseUs.module.css'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const WhyChooseUs = () => {
    const controls = useAnimation()
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true
    })

    useEffect(() => {
        if (inView) {
            controls.start('visible')
        }
    }, [controls, inView])

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { 
            opacity: 0,
            y: 20
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    }

    return (
        <section className={styles.section} id="why-choose-us">
            <motion.div 
                className={styles.left}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2>Why Choose Us?</h2>
                <h6>Our Goal — Show You the World Through Your Eyes</h6>
            </motion.div>
            <motion.div 
                ref={ref}
                className={styles.right}
                variants={containerVariants}
                initial="hidden"
                animate={controls}
            >
                <motion.ul>
                    <motion.li variants={itemVariants}>
                        <Card 
                            title='Personalized Experience' 
                            description='Every eye is unique, and our mission is to capture that uniqueness in stunning, artistic detail' 
                            image='/images/personalized.webp' 
                        />
                    </motion.li>
                    <motion.li variants={itemVariants}>
                        <Card 
                            title='Cutting-Edge Technology' 
                            description='We use state-of-the-art equipment and techniques to capture every detail of your iris, delivering images of exceptional quality' 
                            image='/images/virtual-reality.webp' 
                        />
                    </motion.li>
                    <motion.li variants={itemVariants}>
                        <Card 
                            title='Art in Every Shot' 
                            description='Our photos are not just scientific images — they are artistic masterpieces that captivate and inspire' 
                            image='/images/fire.webp' 
                        />
                    </motion.li>
                    <motion.li variants={itemVariants}>
                        <Card 
                            title='A Lifetime of Memories' 
                            description='Each iris photograph is a moment preserved forever. Give yourself or your loved ones a one-of-a-kind image that will continue to inspire and delight' 
                            image='/images/picture.webp' 
                        />
                    </motion.li>
                </motion.ul>
            </motion.div>
        </section>
    )
}

export default WhyChooseUs