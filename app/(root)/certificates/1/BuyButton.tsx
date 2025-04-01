'use client';
import { useState } from 'react';
import styles from './page.module.css';
import PaymentModal from './PaymentModal';

const BuyButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button
                className={styles.buyButton}
                onClick={() => setIsModalOpen(true)}
            >
                Buy for $115
            </button>

            <PaymentModal
                isOpen={isModalOpen}
                onClose={async () => {
                    const res = await fetch('/api/send-email', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
                        },
                        body: JSON.stringify({ orderId: "result.order.id", email: "ilia.loviagin@gmail.com", type: 'Certificate for one person' }),
                    });
                }}
                amount={1}
            />
        </>
    );
};

export default BuyButton;