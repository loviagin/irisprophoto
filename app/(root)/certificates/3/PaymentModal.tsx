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
                <h2 className={styles.modalTitle}>Payment for certificate ${amount}</h2>
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
                        console.log("1. Received token:", token);
                        if (!token.token) {
                            console.error("No token received");
                            return;
                        }
                        console.log("2. Submitting payment with amount:", amount * 100);
                        const result = await submitPayment({ 
                            amount: amount * 100,
                            sourceId: token.token
                        });
                        console.log("3. Payment submission result:", JSON.stringify(result, null, 2));

                        if (result?.order?.state === 'COMPLETED') {
                            console.log("4. Payment completed, sending email to:", email);
                            const res = await fetch('/api/send-email', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
                                },
                                body: JSON.stringify({ orderId: result.order.id, email: email, type: 'Family Photo Certificate' }),
                            });

                            if (res.ok) {
                                const responseData = await res.json();
                                console.log("5. Email sent successfully:", responseData);
                                alert("✅ Payment successful! Check your email for the certificate.");
                                onClose();
                            } else {
                                const errorText = await res.text();
                                console.error("5. Email sending failed:", {
                                    status: res.status,
                                    statusText: res.statusText,
                                    error: errorText
                                });
                                alert("❌ Payment successful, but email not sent. Please contact support.");
                            }
                        } else {
                            console.error("4. Order not completed:", {
                                orderState: result?.order?.state,
                                orderId: result?.order?.id,
                                fullResult: JSON.stringify(result, null, 2)
                            });
                            alert(`❌ Payment failed. State: ${result?.order?.state || 'unknown'}. Please try again.`);
                        }
                    }}
                >
                    <CreditCard />
                    {/* <ApplePay /> */}
                </PaymentForm>
            </div>
        </div>
    );
};

export default PaymentModal; 