import styles from "./Header.module.css";
import { FaArrowLeft } from "react-icons/fa";
import AccountView from "../AccountView/AccountView";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles.header}>
        <Link href={'/'}><FaArrowLeft size={12} /> Back to Home</Link>
        <AccountView />
    </header>
  )
}

export default Header