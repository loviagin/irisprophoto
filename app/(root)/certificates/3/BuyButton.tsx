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
                Buy for $295
            </button>

            <PaymentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                amount={295}
            />
        </>
    );
};

export default BuyButton;