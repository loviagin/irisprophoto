import styles from './page.module.css';
import Image from 'next/image';
import { FaClock, FaCalendarAlt } from 'react-icons/fa';
import { Metadata } from 'next';
import BuyButton from './BuyButton';

export const metadata: Metadata = {
    title: "Gift Certificate for Two persons | Iris Pro Photo",
    description: "Give the gift of professional iris photography with our exclusive certificate for two. Includes 20-minute photoshoot, expert processing, and high-quality prints. Valid for 6 months.",
    keywords: "iris photography, gift certificate, professional photography, photo session for two, iris photo shoot",
    openGraph: {
        title: "Gift Certificate for Two persons | Iris Pro Photo",
        description: "Give the gift of professional iris photography with our exclusive certificate for two. Includes 20-minute photoshoot, expert processing, and high-quality prints.",
        images: [
            {
                url: '/certificates/certificate.jpeg',
                width: 600,
                height: 500,
                alt: 'Iris Pro Photo Gift Certificate'
            }
        ],
        type: 'website',
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
                        <h1 className={styles.title}>Certificate for two people</h1>
                        <div className={styles.price}>$ 185</div>
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
                            <span>20 minutes of photo shoot</span>
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