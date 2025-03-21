import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { FaClock, FaCalendarAlt } from 'react-icons/fa';
import { Metadata } from 'next';
import BuyButton from './BuyButton';

export const metadata: Metadata = {
    title: "Gift certificate for one person – Iris Pro Photo",
    description: "Give the gift of professional iris photography with our exclusive gift certificate. Includes a 10-minute professional photo session, expert retouching, and high-quality prints. Valid for 6 months.",
    keywords: "iris photography, gift certificate, professional photo session, iris photo studio, eye photography",
    openGraph: {
        title: "Professional Iris Photography Gift Certificate | Iris Pro Photo Studio",
        description: "Give the gift of professional iris photography with our exclusive gift certificate. Includes a 10-minute professional photo session, expert retouching, and high-quality prints.",
        images: [
            {
                url: '/certificates/certificate.jpeg',
                width: 600,
                height: 500,
                alt: 'Professional Iris Photography Gift Certificate',
            },
        ],
    }
};

export default function CertificatePage() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.productLayout}>
                    <div className={styles.imageSection}>
                        <Image
                            src="/certificates/certificate.jpeg"
                            alt="Gift certificate Iris PRO Photo"
                            width={600}
                            height={500}
                            className={styles.certificateImage}
                        />
                    </div>

                    <div className={styles.infoSection}>
                        <h1 className={styles.title}>Certificate for one person</h1>
                        <div className={styles.price}>$ 115</div>
                        <BuyButton />
                    </div>
                </div>

                <div className={styles.descriptionSection}>
                    <p className={styles.description}>
                        Give unforgettable emotions and professional photos to your loved ones.
                        Our photo shoot certificate is the perfect gift for those who appreciate
                        high-quality photos and wants to preserve the special moments of life.
                    </p>

                    <div className={styles.features}>
                        <div className={styles.featureItem}>
                            <FaClock />
                            <span>10 minutes of photo shoot</span>
                        </div>
                        <div className={styles.featureItem}>
                            <FaCalendarAlt />
                            <span>The validity period is 6 months</span>
                        </div>
                    </div>

                    <div className={styles.details}>
                        <h2>What is included in the certificate</h2>
                        <div className={styles.detailsGrid}>
                            <div className={styles.detailItem}>
                                <h3>Photosession</h3>
                                <p>Professional photography</p>
                            </div>
                            <div className={styles.detailItem}>
                                <h3>Processing</h3>
                                <p>Professional photo processing in a single style</p>
                            </div>
                            <div className={styles.detailItem}>
                                <h3>Processing</h3>
                                <p>Professional photo processing in a single style</p>
                            </div>
                            <div className={styles.detailItem}>
                                <h3>Print</h3>
                                <p>Printing finished iris photos</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}