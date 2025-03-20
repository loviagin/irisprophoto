import Link from 'next/link';
import styles from './GiftCertificates.module.css';
import { FaGift, FaUserFriends, FaUsers } from 'react-icons/fa';

const certificates = [
  {
    title: 'Certificate for one person',
    description: 'A gift certificate for a professional iris shot for one person. The perfect gift for those who want to preserve the special moments of their lives.',
    price: '$ 25',
    icon: FaGift
  },
  {
    title: 'Certificate for two people',
    description: 'A gift certificate for a professional iris shot for a couple. Create unforgettable memories together. Two iris on one photo.',
    price: '$ 50',
    icon: FaUserFriends
  },
  {
    title: 'Family Photo Certificate',
    description: 'A gift certificate for a professional image of the iris of a family of up to 4 people. Capture the happy moments of family life.',
    price: '$ 100',
    icon: FaUsers
  }
];

const GiftCertificates = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>
            Give unforgettable memories
          </h2>
          <p className={styles.description}>
            A gift certificate for an iris photo shoot is a unique gift
            that will allow your loved ones to keep a piece of themselves forever. Choose the perfect option for your loved ones.
          </p>

          <div className={styles.certificatesGrid}>
            {certificates.map((certificate, index) => {
              const Icon = certificate.icon;
              return (
                <div key={index} className={styles.certificateCard}>
                  <div className={styles.iconWrapper}>
                    <Icon className={styles.icon} />
                  </div>
                  <Link href={`/certificates/${index + 1}`}><h3 className={styles.certificateTitle}>{certificate.title}</h3></Link>
                  <p className={styles.certificateDescription}>{certificate.description}</p>
                  <div className={styles.certificatePrice}>{certificate.price}</div>
                </div>
              );
            })}
          </div>

          <div className={styles.buttonContainer}>
            <Link
              href="/certificates"
              className={styles.primaryButton}
            >
              Buy a certificate
            </Link>
            <Link
              href="/#contacts"
              className={styles.secondaryButton}
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiftCertificates; 