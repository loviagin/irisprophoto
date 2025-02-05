"use client";
import { useState } from "react";
import styles from "./Popup.module.css";
import firebase from "@/app/firebase/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { on } from "events";

interface PopupProps {
    onClose: () => void;
}

export default function Popup({ onClose }: PopupProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const auth = getAuth(firebase);
    const [formData, setFormData] = useState({ name: "", email: "", details: "" });
    const [isSending, setIsSending] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);

        const response = await fetch("/api/sendOrder", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        setIsSending(false);

        if (result.success) {
            alert("Thanks for your order! We will contact you soon.");
            setFormData({ name: "", email: "", details: "" });
            onClose();
        } else {
            alert("❌ Error: " + result.error);
        }
    };

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const email = (e.currentTarget.elements[0] as HTMLInputElement).value;
        const password = (e.currentTarget.elements[1] as HTMLInputElement).value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setIsLoading(false);
                onClose();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
                setErrorMessage(errorMessage);
                setIsLoading(false);
            });
    };

    return (
        <div className={styles.popupOverlay} onClick={onClose}>
            <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>×</button>

                <div className={styles.content}>
                    {/* Левая часть: Форма заказа */}
                    <div className={styles.left}>
                        <h2>Order Without Registration</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <textarea
                                name="details"
                                placeholder="Your Order Details"
                                value={formData.details}
                                onChange={handleChange}
                                required
                            />
                            <button type="submit" disabled={isSending}>
                                {isSending ? "Sending..." : "Place Order"}
                            </button>
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
                            <button type="submit">{isLoading ? "loading . . ." : "Sign In"}</button>
                        </form>

                        <p className={styles.errorMessage}>{errorMessage}</p>

                        <p>Don't have an account? <a className={styles.signUp} onClick={onClose}>Sign Up</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}