import styles from "./WhyChooseUs.module.css";

const benefits = [
    { icon: "/icons/benefit1.png", text: "It's a text for the first step. Write something here. Write something here. Write something here." },
    { icon: "/icons/benefit2.png", text: "It's a text for the first step. Write something here. Write something here. Write something here." },
    { icon: "/icons/benefit3.png", text: "It's a text for the first step. Write something here. Write something here. Write something here." },
    { icon: "/icons/benefit4.png", text: "It's a text for the first step. Write something here. Write something here. Write something here." },
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
                            <h3>Title</h3>
                            <p>{benefit.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}