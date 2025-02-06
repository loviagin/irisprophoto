import styles from "./Popup.module.css";
import OrderForm from "../OrderForm/OrderForm";
import LoginForm from "../LoginForm/LoginForm";

interface PopupProps {
    onClose: () => void;
}

export default function Popup({ onClose }: PopupProps) {
    return (
        <div className={styles.popupOverlay} onClick={onClose}>
            <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>×</button>

                <div className={styles.content}>
                    {/* Левая часть: Форма заказа */}

                    <div className={styles.left}>
                        <h2>Order Without Registration</h2>
                        <OrderForm onClose={onClose} />
                    </div>

                    {/* Разделитель */}
                    <div className={styles.divider}></div>

                    {/* Правая часть: Вход */}
                    <LoginForm onClose={onClose}/>
                </div>
            </div>
        </div>
    );
}