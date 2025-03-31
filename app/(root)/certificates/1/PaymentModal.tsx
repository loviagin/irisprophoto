'use client';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    amount: number;
}

const PaymentModal = ({ isOpen, onClose, amount }: PaymentModalProps) => {
    const [payments, setPayments] = useState<any>(null);
    const [card, setCard] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (isOpen) {
            const loadSquare = async () => {
                const paymentsSdk = await (window as any).Square.payments(
                    process.env.NEXT_PUBLIC_SQUARE_APP_ID,
                    process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID
                );

                const card = await paymentsSdk.card();
                await card.attach('#card-container');
                setPayments(paymentsSdk);
                setCard(card);
            };

            const script = document.createElement('script');
            script.src = 'https://sandbox.web.squarecdn.com/v1/square.js';
            script.onload = loadSquare;
            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        }
    }, [isOpen]);

    const handlePayment = async () => {
        setLoading(true);
        try {
            const result = await card.tokenize();
            if (result.status === 'OK') {
                const res = await fetch('/api/checkout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        sourceId: result.token,
                        amount: amount * 100, // Конвертируем доллары в центы
                        currency: 'USD',
                    }),
                });

                const data = await res.json();
                if (data.payment) {
                    setMessage('Оплата прошла успешно!');
                    setTimeout(() => {
                        window.location.href = '/thank-you';
                    }, 1500);
                } else {
                    setMessage('Ошибка оплаты');
                }
            } else {
                setMessage('Ошибка при получении токена');
            }
        } catch (error) {
            setMessage('Произошла ошибка при обработке платежа');
        }
        setLoading(false);
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                <h2 className={styles.modalTitle}>Оплата сертификата</h2>
                <div id="card-container" className={styles.cardContainer}></div>
                <button 
                    className={styles.buyButton} 
                    onClick={handlePayment}
                    disabled={loading}
                >
                    {loading ? 'Обработка...' : `Оплатить $${amount}`}
                </button>
                {message && <p className={styles.message}>{message}</p>}
            </div>
        </div>
    );
};

export default PaymentModal; 