import styles from './page.module.css';
import Link from 'next/link';

const BuyButton = () => {
    return (
        <>
            <Link
                className={styles.buyButton}
                href="https://buy.stripe.com/dRm5kEcPD9WH8ye3IX5Vu02"
                target='_blank'
            >
                Buy for $115
            </Link>
        </>
    );
};

export default BuyButton;