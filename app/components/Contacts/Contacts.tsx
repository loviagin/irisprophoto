"use client";
import HeroButton from "../Hero/HeroButton";
import styles from "./Contacts.module.css";

export default function ContactUs() {
    return (
        <section id="contacts" className={styles.contactUs}>
            <div className={styles.background}>
                <div className={styles.container}>
                    {/* Левая колонка: заголовок, контактная инфо, форма */}
                    <div className={styles.left}>
                        <div>
                            <h2 className={styles.title}>Contact Us</h2>
                            <p className={styles.subtitle}>We're here to help you</p>
                        </div>

                        <ul className={styles.contactInfo}>
                            <li>+1 000 000 00 00</li>
                            <li>emailcompany@example.com</li>
                            <li>Address line 1</li>
                            <li>Work hours 8 AM - 6 PM SUN - FRI</li>
                        </ul>

                        <div className={styles.form}>
                            <HeroButton text="Get in touch" />
                        </div>

                        {/* <form className={styles.form}>
                        <div className={styles.inputField}>
                            <label htmlFor="name">Your Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="For Example, John"
                            />
                        </div>
                        <div className={styles.inputField}>
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="+1 ..."
                            />
                        </div>
                        <div className={styles.inputField}>
                            <label htmlFor="question">Have a question?</label>
                            <textarea
                                id="question"
                                name="question"
                                rows={4}
                                placeholder="Your message here..."
                            />
                        </div>
                        <p className={styles.privacyNote}>
                            By sending this form I'm agree with Privacy Policy
                        </p>
                        <button type="submit" className={styles.sendButton}>
                            Send a message
                        </button>
                    </form> */}
                    </div>

                    {/* Правая колонка: карта */}
                    <div className={styles.right}>
                        {/* Вставьте iframe Google Maps или картинку */}
                        <iframe
                            className={styles.map}
                            src="https://www.google.com/maps/d/u/0/embed?mid=1V10vRtN08NvIZegpQxXtcEuhDYfn2pA&ehbc=2E312F&noprof=1"
                            loading="lazy"
                            title="Google Map"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}