"use client";
import { useState, useEffect, useRef, use } from "react";
import { useRouter } from "next/navigation";
import firebase from "@/app/firebase/firebase";
import { getAuth, signOut, User, onAuthStateChanged } from "firebase/auth";

import styles from "./AccountView.module.css";
import Image from "next/image";
import { CiLogout } from "react-icons/ci";

const AccountView = () => {
    const auth = getAuth(firebase);
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
        });

        return () => unsubscribe();
    }, [auth]);

    // Закрытие меню при клике вне него
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        signOut(auth).then(() => {
            router.push("/");
        }).catch((error) => {
            alert(error.message);
        });
    };

    return (
        <div className={styles.account} onClick={() => setMenuOpen(!menuOpen)} ref={menuRef}>
            <Image src="/images/user.webp" alt="Avatar" width={40} height={40} />
            <h4>{user !== null ? user?.displayName : "Account"}</h4>

            {/* Мини-меню, которое отображается только при menuOpen === true */}
            {menuOpen && (
                <div className={styles.dropdownMenu}>
                    <ul>
                        <li className={styles.logout} onClick={handleLogout}><CiLogout /> Logout</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AccountView;