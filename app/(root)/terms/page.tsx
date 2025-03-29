import styles from './styles.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Terms of Service – Iris Pro Photo",
    description: "We are a team of professional photographers and we are offering our services of iris photography for you. We are capturing the moments for a long time."
};

export default function PrivacyPolicyPage() {
    const lastUpdated = "February 28, 2025";

    return (
        <main className={styles.container}>
            <h1 className={styles.title}>Terms of Service</h1>
            <p className={styles.date}>Last updated: {lastUpdated}</p>

            <p className={styles.paragraph}>
                This Terms of Service Agreement (“Agreement”) governs the relationship between the owner of the website <a href='https://irisprophoto.me'>irisprophoto.me</a> (“Administration”) and any individual using the website (“User”).
            </p>

            <h2 className={styles.subtitle}>1. General Provisions</h2>
            <ul>
                <li>By using the website, the User agrees to this Agreement.</li>
                <li>If the User does not agree with the terms, they must stop using the website immediately.</li>
                <li>The website provides digital and informational services, including iris photography, image processing, and the ability to order physical products.</li>
            </ul>

            <h2 className={styles.subtitle}>2. Rights and Obligations of the Parties</h2>

            <p className={styles.paragraph}>2.1. The User agrees to:</p>
            <ul>
                <li>provide accurate and truthful information when placing orders;</li>
                <li>comply with applicable laws when using the website;</li>
                <li>refrain from any actions that may disrupt the website’s operation.</li>
            </ul>

            <p className={styles.paragraph}>2.2. The Administration reserves the right to:</p>
            <ul>
                <li>modify the content of the website, suspend or terminate its operation without prior notice;</li>
                <li>deny services to any User who violates the terms of this Agreement;</li>
                <li>use uploaded images strictly within the scope of fulfilling the User’s order and never share them with third parties.</li>
            </ul>

            <h2 className={styles.subtitle}>3. Personal Data</h2>
            <ul>
                <li>The User agrees to the processing of their personal data in accordance with the website’s Privacy Policy.</li>
                <li>The Administration shall take reasonable measures to protect personal data in accordance with applicable laws.</li>
            </ul>

            <h2 className={styles.subtitle}>4. Orders and Payment</h2>
            <ul>
                <li>Orders are placed through the website interface.</li>
                <li>The prices of services are listed on the corresponding pages and may be changed unilaterally.</li>
                <li>Payments are made online via available payment methods. Refunds are provided in cases stipulated by law and the Refund Policy.</li>
            </ul>

            <h2 className={styles.subtitle}>5. Limitation of Liability</h2>
            <ul>
                <li>The website is provided “as is.” The Administration is not liable for temporary technical issues or interruptions in the website’s operation.</li>
                <li>The Administration is not responsible for the actions of third parties, including payment providers.</li>
                <li>Neither party is liable for failure to fulfill obligations due to force majeure circumstances.</li>
            </ul>

            <h2 className={styles.subtitle}>6. Developer Information</h2>
            <ul>
                <li>The website was developed by UK IT-Developer company <a href='https://lovigin.com'>LOVIGIN LTD</a>.</li>
                <li>All technical questions or proposals regarding the website functionality may be sent to the following email: <a href='mailto:support@lovigin.com'>support@lovigin.com</a>.</li>
                <li>The developer is not responsible for business decisions, order fulfillment, or content management of the website unless explicitly stated.</li>
            </ul>

            <h2 className={styles.subtitle}>7. Final Provisions</h2>
            <ul>
                <li>This Agreement may be amended by the Administration at any time. Changes take effect upon publication.</li>
                <li>Continued use of the website after amendments constitutes acceptance of the new terms.</li>
                <li>All disputes shall be resolved in accordance with the laws of the country where the Administration is registered.</li>
            </ul>
        </main>
    );
}