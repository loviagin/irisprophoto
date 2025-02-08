import Card from './Card'
import styles from './WhyChooseUs.module.css'

const WhyChooseUs = () => {
    return (
        <section className={styles.section} id="why-choose-us">
            <div className={styles.left}>
                <h2>Why Choose Us?</h2>
                <h6>Our Goal — Show You the World Through Your Eyes</h6>
            </div>
            <div className={styles.right}>
                <ul>
                    <li><Card title='Personalized Experience' description='Every eye is unique, and our mission is to capture that uniqueness in stunning, artistic detail' image='/images/personalized.webp' /></li>
                    <li><Card title='Cutting-Edge Technology' description='We use state-of-the-art equipment and techniques to capture every detail of your iris, delivering images of exceptional quality' image='/images/virtual-reality.webp' /></li>
                    <li><Card title='Art in Every Shot' description='Our photos are not just scientific images — they are artistic masterpieces that captivate and inspire' image='/images/fire.webp' /></li>
                    <li><Card title='A Lifetime of Memories' description=' Each iris photograph is a moment preserved forever. Give yourself or your loved ones a one-of-a-kind image that will continue to inspire and delight' image='/images/picture.webp' /></li>
                </ul>
            </div>
        </section>
    )
}

export default WhyChooseUs