import styles from './page.module.css';
import Link from 'next/link';

const BuyButton = () => {
    return (
        <>
            <Link
                className={styles.buyButton}
                href="https://buy.stripe.com/6oUdRa16Vd8T9Cidjx5Vu04"
                target='_blank'
            >
                Buy for $295
            </Link>
        </>
    );
};

export default BuyButton;