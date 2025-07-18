"use client";

import { useEffect, useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function ThankYouPage() {
    const [valid, setValid] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const sessionId = urlParams.get("session_id");

        if (sessionId) {
            // Проверяем статус сессии через Stripe
            fetch("/api/verify-stripe-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ session_id: sessionId }),
            })
                .then((res) => res.json())
                .then((data) => {
                    setValid(data.valid);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error verifying payment:", error);
                    setValid(false);
                    setLoading(false);
                });
        } else {
            setValid(false);
            setLoading(false);
        }
    }, []);

    if (loading) return (
        <section className={styles.hero}>
            <div className={styles.gradientBackground} />
            <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>Verifying payment...</h1>
                <p className={styles.heroSubtitle}>Please wait while we confirm your payment.</p>
            </div>
        </section>
    );

    if (valid === false) return (
        <section className={styles.hero}>
            <div className={styles.gradientBackground} />
            <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>Payment verification failed</h1>
                <p className={styles.heroSubtitle}>We couldn't verify your payment. Please contact support if you believe this is an error.</p>
                <Link href="/#contacts" className={styles.button}>
                    Contact support
                </Link>
            </div>
        </section>
    );

    return (
        <main className={styles.container}>
            <section className={styles.hero}>
                <div className={styles.gradientBackground} />
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        Thank you for your purchase!
                    </h1>
                    <p className={styles.heroSubtitle}>
                        We are glad that you chose our services. Your certificate has already been sent to the specified email address.
                    </p>
                </div>
            </section>

            <section className={styles.content}>
                <div className={styles.card}>
                    <div className={styles.decorativeElements}>
                        <div className={styles.circle1} />
                        <div className={styles.circle2} />
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image
                            src="/icons/checkmark.svg"
                            alt="Successful purchase"
                            width={64}
                            height={64}
                            className={styles.icon}
                        />
                    </div>

                    <h2 className={styles.title}>
                        Your order has been successfully placed
                    </h2>

                    <div className={styles.details}>
                        <p>
                            Soon you will receive an email with confirmation of your order and instructions on how to use the certificate.
                        </p>

                        <div className={styles.importantInfo}>
                            <h3>Important information:</h3>
                            <ul>
                                <li>Certificate is valid for 6 months</li>
                                <li>For booking a photo session, use the code from the email</li>
                                <li>If you have any questions, please contact us</li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <Link href="/book" className={styles.button}>
                            Book a photo session
                        </Link>
                        <Link href="/#contacts" className={`${styles.button} ${styles.secondaryButton}`}>
                            Contact us
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
} 