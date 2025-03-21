'use client';
import { Resend } from 'resend';
import Email from '../../email/email';
import styles from './page.module.css';

const BuyButton = () => {

    const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

    const handleSubmit = async () => {
        await resend.emails.send({
            from: 'noreply@irisprophoto.me',
            to: 'ilia.loviagin@gmail.com',
            subject: 'New certificate purchase',
            react: <Email url="https://irisprophoto.me" />,
        });
    };

    return (
        <button className={styles.buyButton} onClick={handleSubmit}>
            You can buy a certificate in our office
        </button>
    )
}

export default BuyButton