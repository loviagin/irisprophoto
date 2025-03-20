"use client";
import { useState, useEffect, useRef } from "react";
import firebase from "@/app/firebase/firebase";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import styles from "./Welcome.module.css";
import { FaUserCircle } from "react-icons/fa";

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
    <div className={styles.welcomeContainer}>
      <div className={styles.profileSection}>
        <div className={styles.avatarContainer}>
          <div className={styles.avatar}>
            {user?.photoURL ? (
              <img src={user.photoURL} alt="Profile" />
            ) : (
              <div className={styles.defaultAvatar}>
                <FaUserCircle size={120} />
              </div>
            )}
          </div>
        </div>
        <div className={styles.userInfo}>
          <h1 className={styles.welcome}>
            {user !== null ? `Hello, ${user.displayName || 'User'}` : "Welcome"}
          </h1>
          <p className={styles.email}>{user?.email}</p>
        </div>
      </div>
      {/* <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>0</span>
          <span className={styles.statLabel}>Orders</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>0</span>
          <span className={styles.statLabel}>Photos</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>0</span>
          <span className={styles.statLabel}>Certificates</span>
        </div>
      </div> */}
    </div>
  );
};

export default Welcome;