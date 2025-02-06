"use client";
import { useState, useEffect } from "react";
import firebase from "@/app/firebase/firebase";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import styles from "./Welcome.module.css";

const Welcome = () => {
  const auth = getAuth(firebase);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <div>
      <h1 className={styles.welcome}>{user !== null ? `Hi, ${user.displayName}` : "Welcome to your account"}</h1>
    </div>
  )
}

export default Welcome