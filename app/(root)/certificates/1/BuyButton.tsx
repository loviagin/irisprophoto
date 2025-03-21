'use client';
import { Resend } from 'resend';
import styles from './page.module.css';

const BuyButton = () => {

    const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

    const handleClick = async () => {
        const res = await fetch('/api/send-email', {
          method: 'POST',
        });
    
        const result = await res.json();
        if (result.success) {
          alert('Email sent!');
        } else {
          alert('Failed to send email: ' + result.error);
        }
      };

    return (
        <button className={styles.buyButton} onClick={handleClick}>
            You can buy a certificate in our office
        </button>
    )
}

export default BuyButton