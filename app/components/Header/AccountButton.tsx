"use client";
import firebase from "@/app/firebase/firebase";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import Link from "next/link";
import HeroButton from "../Hero/HeroButton";
import { FaRegUserCircle } from "react-icons/fa";

const AccountButton = () => {
    const auth = getAuth(firebase);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
        });
    }, []);

    return (
        user === null ?
            <HeroButton text="Sign in" /> :
            <Link className={styles.account} href="/account"><p><FaRegUserCircle /> Account</p></Link>

    )
}

export default AccountButton