import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { FaClock, FaCalendarAlt } from 'react-icons/fa';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Family Photo Session Gift Certificate | Professional Photography | Iris Pro Photo",
    description: "Give the perfect gift of memories with our professional family photo session certificate. Includes 20-40 minute shoot, expert photo processing, and high-quality prints. Valid for 6 months. Book your session with Iris Pro Photo today."
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
                        <h1 className={styles.title}>Family Photo Certificate</h1>
                        <div className={styles.price}>$ 295</div>
                        <Link href={'#'} className={styles.buyButton} target='_blank'>
                            You can buy a certificate in our office
                        </Link>
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
                            <span>20 – 40 minutes of photo shoot</span>
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