'use client';
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import styles from './page.module.css';
import { submitPayment } from '@/lib/submitPayment';
import { useState } from "react";

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    amount: number;
}

const PaymentModal = ({ isOpen, onClose, amount }: PaymentModalProps) => {
    const appId = process.env.NEXT_PUBLIC_SQUARE_APP_ID!;
    const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!;
    const [email, setEmail] = useState('');

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                <h2 className={styles.modalTitle}>Оплата сертификата</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Введите ваш email"
                    className={styles.emailInput}
                    required
                />
                <PaymentForm
                    applicationId={appId}
                    locationId={locationId}
                    cardTokenizeResponseReceived={async (token) => {
                        const result = await submitPayment({ amount: amount * 100 });
                        console.log(result);

                        if (result?.order?.id) {
                            console.log("✅ Успешная оплата. ID заказа:", result.order.id);
                            const res = await fetch('/api/send-email', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
                                },
                                body: JSON.stringify({ orderId: result.order.id, email: email, type: 'Certificate for one person' }),
                            });

                            if (res.ok) {
                                console.log("✅ Email отправлен.");
                                onClose();
                            } else {
                                console.warn("⚠️ Email не отправлен.");
                            }
                        } else {
                            console.warn("⚠️ Заказ не создан.");
                        }
                    }}
                >
                    <CreditCard />
                </PaymentForm>
            </div>
        </div>
    );
};

export default PaymentModal; 