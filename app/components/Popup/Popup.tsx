"use client";
import styles from "./Popup.module.css";
import firebase from "@/app/firebase/firebase";

interface PopupProps {
    onClose: () => void;
}

export default function Popup({ onClose }: PopupProps) {

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = (e.currentTarget.elements[0] as HTMLInputElement).value;
        const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
        console.log(`Logging in with email: ${email} and password: ${password}`);
    };

    return (
        <div className={styles.popupOverlay} onClick={onClose}>
            <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>×</button>

                <div className={styles.content}>
                    {/* Левая часть: Форма заказа */}
                    <div className={styles.left}>
                        <h2>Order Without Registration</h2>
                        <form>
                            <input type="text" placeholder="Your Name" required />
                            <input type="email" placeholder="Your Email" required />
                            <textarea placeholder="Your Order Details" required />
                            <button type="submit">Place Order</button>
                        </form>
                    </div>

                    {/* Разделитель */}
                    <div className={styles.divider}></div>

                    {/* Правая часть: Вход */}
                    <div className={styles.right}>
                        <h2>Login</h2>
                        <form onSubmit={handleLogin}>
                            <input type="email" placeholder="Email" required />
                            <input type="password" placeholder="Password" required />
                            <button type="submit">Sign In</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}