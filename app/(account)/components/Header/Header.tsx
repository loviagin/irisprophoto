"use client";
import { useState, useEffect } from "react";
import firebase from "@/app/firebase/firebase";
import { useRouter } from "next/navigation";
import { getAuth, User } from "firebase/auth";
import styles from "./Header.module.css";
import { FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";

const Header = () => {
  const auth = getAuth(firebase);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Ошибка при выходе из системы:", error);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/" className={styles.logoLink}>
          IRIS PRO PHOTO
        </Link>
      </div>
      
      <div className={styles.rightSection}>
        <div className={styles.userMenu}>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user?.displayName || 'User'}</span>
            <span className={styles.userEmail}>{user?.email}</span>
          </div>
          
          <div className={styles.actions}>
            <button onClick={handleSignOut} className={styles.actionButton}>
              <FaSignOutAlt className={styles.icon} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;