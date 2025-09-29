"use client";

import { useEffect, useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import styles from '../page.module.css';
import { Order } from '@/app/types/Order';

export default function BookingThankYouPage() {
    const [valid, setValid] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);
    const [processingOrder, setProcessingOrder] = useState(false);
    const [bookingDate, setBookingDate] = useState<string | null>(null);

    useEffect(() => {
        const processBooking = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const sessionId = urlParams.get("session_id");

            if (!sessionId) {
                setValid(false);
                setLoading(false);
                return;
            }

            try {
                // Верифицируем платеж
                const verifyResponse = await fetch("/api/verify-stripe-payment", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ session_id: sessionId }),
                });

                const verifyData = await verifyResponse.json();

                if (!verifyData.valid) {
                    setValid(false);
                    setLoading(false);
                    return;
                }

                // Извлекаем данные бронирования из метаданных сессии
                const bookingData = JSON.parse(verifyData.session.metadata.bookingData);
                
                setLoading(false);
                setValid(true);
                setProcessingOrder(true);

                // Создаем заказ
                const notionId = crypto.randomUUID();
                const contact = bookingData.email || bookingData.phone;
                const selectedDateTime = new Date(bookingData.dateTime);

                setBookingDate(selectedDateTime.toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                }));

                const order: Order = {
                    id: notionId,
                    order: 'Paid booking from site',
                    status: 'New',
                    date: selectedDateTime.toISOString(),
                    comment: `Type: ${bookingData.shootingType}. ${bookingData.promocode ? `Promocode: ${bookingData.promocode}. ` : ''}${bookingData.details}. Stripe Session: ${sessionId}`,
                    email: bookingData.email || undefined,
                    name: bookingData.name,
                    phone: bookingData.phone || undefined,
                    createdAt: new Date().toISOString()
                };

                // Создаем заказ в системе
                const orderResponse = await fetch("/api/orders", {
                    method: "POST",
                    headers: { 
                        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`, 
                        "Content-Type": "application/json" 
                    },
                    body: JSON.stringify(order),
                });

                const orderResult = await orderResponse.json();

                if (orderResult.success) {
                    // Создаем бронирование в календаре
                    try {
                        await fetch("/api/bookings", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                name: bookingData.name,
                                contact,
                                notionId,
                                bookingDateTime: selectedDateTime.toISOString()
                            }),
                        });
                    } catch (error) {
                        console.error('Error creating booking:', error);
                    }

                    // Отправляем email подтверждение
                    if (bookingData.email) {
                        try {
                            await fetch('/api/email-order', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
                                },
                                body: JSON.stringify({
                                    name: bookingData.name,
                                    email: bookingData.email,
                                    date: selectedDateTime.toLocaleString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false
                                    }),
                                    orderId: orderResult.id
                                }),
                            });
                        } catch (error) {
                            console.error('Error sending email:', error);
                        }
                    }

                    setProcessingOrder(false);
                } else {
                    console.error('Failed to create order:', orderResult.error);
                    setProcessingOrder(false);
                }

            } catch (error) {
                console.error("Error processing booking:", error);
                setValid(false);
                setLoading(false);
            }
        };

        processBooking();
    }, []);

    if (loading || processingOrder) {
        return (
            <section className={styles.hero}>
                <div className={styles.gradientBackground} />
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        {loading ? 'Verifying payment...' : 'Processing your booking...'}
                    </h1>
                    <p className={styles.heroSubtitle}>
                        {loading 
                            ? 'Please wait while we confirm your payment.' 
                            : 'We are creating your booking. This will only take a moment.'}
                    </p>
                </div>
            </section>
        );
    }

    if (valid === false) {
        return (
            <section className={styles.hero}>
                <div className={styles.gradientBackground} />
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>Payment verification failed</h1>
                    <p className={styles.heroSubtitle}>
                        We couldn't verify your payment. Please contact support if you believe this is an error.
                    </p>
                    <Link href="/#contacts" className={styles.button}>
                        Contact support
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <main className={styles.container}>
            <section className={styles.hero}>
                <div className={styles.gradientBackground} />
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        Thank you for your booking!
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Your photo session has been successfully booked and paid for.
                    </p>
                </div>
            </section>

            <section className={styles.content}>
                <div className={styles.card}>
                    <div className={styles.iconWrapper}>
                        <Image
                            src="/icons/checkmark.svg"
                            alt="Successful booking"
                            width={64}
                            height={64}
                            className={styles.icon}
                        />
                    </div>

                    <h2 className={styles.title}>
                        Your booking has been confirmed
                    </h2>

                    {bookingDate && (
                        <div className={styles.bookingDetails}>
                            <p className={styles.bookingDate}>
                                <strong>Scheduled for:</strong> {bookingDate}
                            </p>
                        </div>
                    )}

                    <div className={styles.details}>
                        <p>
                            You will receive a confirmation email with all the details of your photo session.
                        </p>

                        <div className={styles.importantInfo}>
                            <h3>What's next:</h3>
                            <ul>
                                <li>Please arrive 5-10 minutes before your scheduled time</li>
                                <li>If you need to reschedule, contact us at least 48 hours in advance</li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <Link href="/" className={styles.button}>
                            Back to home
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
