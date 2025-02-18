import WhyChooseUs from "../WhyChooseUs-2/WhyChooseUs";
import styles from "./HowItWorks.module.css";

const steps = [
    { id: 1, icon: "/images/calender-dynamic-gradient.png", title: "Book Your Session", text: "Fill out the online form or give us a call to schedule a convenient time for your photo session" },
    { id: 2, icon: "/images/step2.png", title: "Iris Photography Session", text: "Using professional-grade equipment, we capture the exquisite details of your iris in just a few minutes" },
    { id: 3, icon: "/images/step3.png", title: "Artistic Enhancement", text: "After your session, we process your image into a work of art that highlights the uniqueness of your gaze" },
    { id: 4, icon: "/images/step4.png", title: "Receive Your Masterpiece", text: "You’ll receive your high-quality image in a variety of formats — digital and print" },
];

export default function HowItWorks() {
    return (
        <section id="howitworks" className={styles.howItWorks}>
            <div className={styles.background}>
                <div className={styles.container}>
                    <h2 className={styles.title}>How it works</h2>
                    <p className={styles.description}>Here is a step-by-step guide on how to use our service:</p>
                    <div className={styles.steps}>
                        {steps.map((step, index) => (
                            <div key={step.id} className={styles.step}>
                                <div className={styles.stepTop}>
                                    <div className={styles.number}>{step.id}</div>
                                    <div className={styles.circle}>
                                        <img src={step.icon} alt={`Step ${step.id}`} />
                                    </div>
                                    {index < steps.length - 1 && <div className={styles.arrow}>→</div>}
                                </div>
                                <div className={styles.textBox}>
                                    <h3 className={styles.stepTitle}>{step.title}</h3>
                                    <p className={styles.stepText}>{step.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* <WhyChooseUs /> */}
                </div>
            </div>
        </section>
    );
}