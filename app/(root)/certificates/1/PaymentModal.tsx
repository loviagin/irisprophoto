'use client';
import { ApplePay, CreditCard, PaymentForm } from "react-square-web-payments-sdk";
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
                <h2 className={styles.modalTitle}>Payment for certificate</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className={styles.emailInput}
                    required
                />
                <PaymentForm
                    applicationId={appId}
                    locationId={locationId}
                    createPaymentRequest={() => ({
                        countryCode: "US",
                        currencyCode: "USD",
                        total: {
                            label: "Certificate Payment",
                            amount: (amount).toString(),
                        },
                    })}
                    cardTokenizeResponseReceived={async (token) => {
                        console.log("Received token:", token);
                        if (!token.token) {
                            console.error("No token received");
                            return;
                        }
                        const result = await submitPayment({ 
                            amount: amount * 100,
                            sourceId: token.token
                        });
                        console.log("Payment submission result:", result);

                        if (result?.order?.state === 'COMPLETED') {
                            console.log("✅ Successful payment. Order ID:", result.order.id);
                            const res = await fetch('/api/send-email', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
                                },
                                body: JSON.stringify({ orderId: result.order.id, email: email, type: 'Certificate for one person' }),
                            });

                            if (res.ok) {
                                console.log("✅ Email sent.");
                                onClose();
                            } else {
                                alert("❌ Email sending failed: " +
                                    res.status +
                                    res.statusText +
                                    await res.text()
                                );
                                alert("Email not sent. Please try again.");
                            }
                        } else {
                            console.error("❌ Order creation failed:", {
                                orderState: result?.order?.state,
                                orderId: result?.order?.id
                            });
                            alert(`Order not created. State: ${result?.order?.state || 'unknown'}. Please try again.`);
                        }
                    }}
                >
                    <CreditCard />
                    <ApplePay />
                </PaymentForm>
            </div>
        </div>
    );
};

export default PaymentModal; 