"use client";
import { useState, useEffect } from "react";
import firebase from "@/app/firebase/firebase";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import styles from "./OrderForm.module.css";
import { getAnalytics, logEvent } from "firebase/analytics";

interface PopupProps {
    onClose: () => void;
}

export default function OrderForm({ onClose }: PopupProps) {
    const [formData, setFormData] = useState({ name: "", email: "", details: "" });
    const [isSending, setIsSending] = useState(false);
    const auth = getAuth(firebase);
    const [user, setUser] = useState<User | null>(null);
    const analytics = getAnalytics(firebase);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setFormData({ name: user.displayName || "", email: user.email || "", details: "" });
            }
        });

        logEvent(analytics, 'order_form_opened');

        return () => unsubscribe();
    }, [auth]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);

        const response = await fetch(user !== null ? "api/userOrder" : "/api/sendOrder", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        setIsSending(false);

        if (result.success) {
            alert("Thanks for your order! We will contact you soon.");
            setFormData({ name: "", email: "", details: "" });
        } else {
            alert("❌ Error: " + result.error);
        }
    };

    return (
        <div className={styles.left}>
            <form onSubmit={handleSubmit}>
                {user === null &&
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                }

                {user === null &&
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                }

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
    );
}