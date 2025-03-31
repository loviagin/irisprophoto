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
                Оплатить $115
            </button>
            {/* <PaymentModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                amount={115}
            /> */}
        </>
    );
};

export default BuyButton;