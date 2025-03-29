import Link from 'next/link';
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.footerBottom}>
                    <div className={styles.copyright}>
                        © {new Date().getFullYear()} IrisProPhoto. All rights reserved.
                    </div>
                    <div className={styles.legal}>
                        <Link href="/terms">Terms of Service</Link>
                        <Link href="/privacypolicy">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}