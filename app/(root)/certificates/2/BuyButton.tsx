'use client';
import Link from 'next/link';
import styles from './page.module.css';

const BuyButton = () => {
    return (
        <>
             <Link
                className={styles.buyButton}
                href="https://buy.stripe.com/28EcN602Rgl501IenB5Vu03"
                target='_blank'
            >
                Buy for $185
            </Link>
        </>
    );
};

export default BuyButton;