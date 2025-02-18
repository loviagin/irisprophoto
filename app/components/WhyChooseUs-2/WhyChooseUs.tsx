import styles from "./WhyChooseUs.module.css";

const benefits = [
    { icon: "/images/benefit1.png", title: "Personalized Experience", text: "Every eye is unique, and our mission is to capture that uniqueness in stunning, artistic detail" },
    { icon: "/images/benefit2.png", title: 'Cutting-Edge Technology', text: "We use state-of-the-art equipment and techniques to capture every detail of your iris, delivering images of exceptional quality" },
    { icon: "/images/benefit3.png", title: 'Art in Every Shot', text: "Our photos are not just scientific images — they are artistic masterpieces that captivate and inspire" },
    { icon: "/images/benefit4.png", title: 'A Lifetime of Memories', text: "Each iris photograph is a moment preserved forever. Give yourself or your loved ones a one-of-a-kind image that will continue to inspire and delight" },
];

export default function WhyChooseUs() {
    return (
        <section className={styles.whyChooseUs}>
            <div className={styles.left}>
                <h2>Why choose Us</h2>
                <p>Our Goal — Show You the World Through Your Eyes</p>
            </div>
            <div className={styles.right}>
                {benefits.map((benefit, index) => (
                    <div key={index} className={styles.benefit}>
                        <div className={styles.icon}>
                            <img src={benefit.icon} alt="Benefit Icon" />
                        </div>
                        <div className={styles.textBox}>
                            <h3>{benefit.title}</h3>
                            <p>{benefit.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}