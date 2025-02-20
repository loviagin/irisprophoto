import HeroButton from "../Hero/HeroButton";
import styles from "./Contacts.module.css";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

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

                        {/* Социальные сети */}
                        <div className={styles.socialIcons}>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.icon}>
                                <FaFacebookF />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.icon}>
                                <FaInstagram />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.icon}>
                                <FaTwitter />
                            </a>
                        </div>
                    </div>

                    {/* Правая колонка: карта */}
                    <div className={styles.right}>
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