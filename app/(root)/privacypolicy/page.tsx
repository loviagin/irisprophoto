import styles from './styles.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Policy – Iris Pro Photo",
  description: "We are a team of professional photographers and we are offering our services of iris photography for you. We are capturing the moments for a long time."
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "February 28, 2025";
  const contactEmail = "voroninsfamilyllc@gmail.com";

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Privacy Policy</h1>
      <p className={styles.date}>Last updated: {lastUpdated}</p>

      <p className={styles.paragraph}>
        Welcome to <strong>IrisProPhoto</strong>. This Privacy Policy explains
        how we collect, use, and protect your personal information when you use
        our website and services.
      </p>

      <h2 className={styles.subtitle}>1. Information We Collect</h2>
      <p className={styles.paragraph}>
        We may collect various types of information, including your name, email
        address, phone number, and any other information you provide when
        contacting us or using our services.
      </p>

      <h2 className={styles.subtitle}>2. How We Use Your Information</h2>
      <ul>
        <li>To provide, maintain, and improve our services.</li>
        <li>To respond to your inquiries and requests.</li>
        <li>To send you updates or promotional materials (if you opt in).</li>
      </ul>

      <h2 className={styles.subtitle}>3. Cookies</h2>
      <p className={styles.paragraph}>
        We may use cookies and similar tracking technologies to enhance your
        experience. You can choose to disable cookies in your browser settings,
        but this may affect the functionality of our site.
      </p>

      <h2 className={styles.subtitle}>4. Third-Party Services</h2>
      <p className={styles.paragraph}>
        We may use third-party services (e.g., analytics providers) that collect
        and process data on our behalf. These services have their own privacy
        policies.
      </p>

      <h2 className={styles.subtitle}>5. Data Security</h2>
      <p className={styles.paragraph}>
        We implement reasonable measures to protect your information from
        unauthorized access, disclosure, or alteration. However, no method of
        transmission over the Internet is 100% secure.
      </p>

      <h2 className={styles.subtitle}>6. Your Rights</h2>
      <p className={styles.paragraph}>
        You have the right to access, update, or delete your personal
        information. To exercise these rights, please contact us at &nbsp;
        <a href={`mailto:${contactEmail}`} className={styles.link}>
           {contactEmail}
        </a>.
      </p>

      <h2 className={styles.subtitle}>7. Changes to This Policy</h2>
      <p className={styles.paragraph}>
        We may update this Privacy Policy from time to time. Any changes will be
        posted on this page with an updated effective date.
      </p>

      <h2 className={styles.subtitle}>9. Data Retention</h2>
      <p className={styles.paragraph}>
        We retain your personal information only for as long as necessary to fulfill
        the purposes for which it was collected, including legal, accounting, or
        reporting requirements.
      </p>

      <h2 className={styles.subtitle}>10. International Data Transfers</h2>
      <p className={styles.paragraph}>
        Your information may be transferred and processed in countries outside of your
        residence. We ensure appropriate safeguards are in place to protect your data
        in accordance with this policy.
      </p>

      <h2 className={styles.subtitle}>Contact Us</h2>
      <p className={styles.paragraph}>
        If you have any questions about this Privacy Policy, please contact us at{" "}
        <a href={`mailto:${contactEmail}`} className={styles.link}>
          {contactEmail}
        </a>
      </p>
    </main>
  );
}