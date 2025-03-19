import styles from './page.module.css';
import Image from 'next/image';
import { FaClock, FaCalendarAlt } from 'react-icons/fa';
import Script from 'next/script';

export default function CertificatePage() {
    return (
        <div className={styles.container}>
            <Script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID&currency=USD" strategy="afterInteractive" />
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
                        <div className={styles.price}>$ 100</div>
                        <div dangerouslySetInnerHTML={{ __html: '<paypal-add-to-cart-button data-id="BCBKSJFD2DCQE"></paypal-add-to-cart-button>' }} />
                        <Script id="paypal-cart" strategy="afterInteractive">
                            {`cartPaypal.AddToCart({ id: "BCBKSJFD2DCQE" })`}
                        </Script>
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
                            <span>30 minutes of photo shoot</span>
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