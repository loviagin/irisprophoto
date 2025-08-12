import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Gift Certificates | Iris Pro Photo",
  description: "Give the unique gift of professional iris photography. Choose from individual, couple, or family sessions. High-quality prints on Pro Satin Paper, flexible booking, and instant digital delivery. Perfect for special occasions.",
  keywords: "iris photography, gift certificates, professional photography, unique gifts, family photos, couple photography, eye photography",
  openGraph: {
    title: "Gift Certificates | Iris Pro Photo",
    description: "Give the unique gift of professional iris photography. Choose from individual, couple, or family sessions. High-quality prints on Pro Satin Paper.",
    type: "website",
    images: [
      {
        url: "/certificates/certificate.jpeg",
        width: 1200,
        height: 630,
        alt: "Iris Photography Gift Certificate"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Iris Photography Gift Certificates",
    description: "Give the unique gift of professional iris photography. High-quality prints and flexible booking.",
    images: ["/certificates/certificate.jpeg"]
  }
};

const certificates = [
  {
    id: 1,
    title: 'Certificate for one person',
    description: 'A gift certificate for a professional iris shot for one person. The perfect gift for those who want to preserve the special moments of their lives.',
    price: '115',
    image: '/certificates/certificate.jpeg',
    features: ['Size 12x12 inches', 'Pro Satin Paper', '10 minutes of photo shoot']
  },
  {
    id: 2,
    title: 'Certificate for two people',
    description: 'A gift certificate for a professional iris shot for a couple. Create unforgettable memories together. Two iris on one photo.',
    price: '185',
    image: '/certificates/certificate.jpeg',
    features: ['Size 18x24 inches', 'Pro Satin Paper', '20 minutes of photo shoot']
  },
  {
    id: 3,
    title: 'Family Photo Certificate',
    description: 'A gift certificate for a professional image of the iris of a family of up to 4 people. Capture the happy moments of family life.',
    price: '295',
    image: '/certificates/certificate.jpeg',
    features: ['Size 24x48 inches', 'Pro Satin Paper', '20 - 40 minutes of photo shoot']
  },
];

const infoCards = [
  {
    title: 'Advantages of gift certificates',
    content: (
      <ul>
        <li>The perfect gift for loved ones</li>
        <li>Long-term validity</li>
        <li>The ability to choose a convenient date</li>
        <li>Professional photo shoot</li>
        <li>Processing of all photos</li>
        <li>The result is immediate</li>
      </ul>
    )
  },
  {
    title: 'How to use the gift certificate',
    content: (
      <ul>
        <li>After payment, you will receive a unique code by email.</li>
        <li>When booking a photo shoot on the website, enter the code in the special field</li>
        <li>Or give the code to the administrator in the photo studio.</li>
        <li>The certificate is valid for 6 months.</li>
        <li>One certificate can only be used once.</li>
      </ul>
    )
  },
  {
    title: 'Payment methods',
    content: (
      <ul>
        <li>By bank card (Visa, Mastercard, Maestro)</li>
        <li>Apple Pay & Google Pay</li>
        <li>PayPal</li>
        <li>Pay later (by PayPal)</li>
        <li>In cash at the photo studio</li>
      </ul>
    )
  },
  {
    title: 'After payment',
    content: (
      <p>
        Immediately after successful payment, an email with a unique certificate code and instructions on how to use it will be sent to the specified email address.
        Save this email until you use the certificate. If necessary, you can always request that the email be resent. You can also contact our photo studio personally and get a paper version of the certificate.
      </p>
    )
  }
];

export default function CertificatesPage() {
  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.gradientBackground} />
        <div className={styles.decorativeElements}>
          <div className={styles.circle1} />
          <div className={styles.circle2} />
        </div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Gift certificates
          </h1>
          <p className={styles.heroSubtitle}>
            Give unforgettable memories to your loved ones. Each certificate includes a professional photo session and photo editing.
          </p>
        </div>
      </section>

      <section className={styles.certificatesSection}>
        <div className={styles.content}>
          <div className={styles.grid}>
            {certificates.map((certificate) => (
              <div
                key={certificate.id}
                className={styles.card}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={certificate.image}
                    alt={certificate.title}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>
                    {certificate.title}
                  </h2>
                  <p className={styles.description}>{certificate.description}</p>
                  <ul className={styles.features}>
                    {certificate.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                  <div className={styles.cardFooter}>
                    <span className={styles.price}>
                      {certificate.price}
                    </span>
                    <Link href={`/certificates/${certificate.id}`} className={styles.button}>
                      <span>Go to product page</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.infoSection}>
        <div className={styles.infoGrid}>
          {infoCards.map((card, index) => (
            <div key={index} className={styles.infoCard}>
              <h3>{card.title}</h3>
              {card.content}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
} 