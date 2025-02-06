"use client";
import { useState, useEffect, use } from "react";
import styles from "./HeroSection.module.css";
import Popup from "../Popup/Popup";
import firebase from "@/app/firebase/firebase";
import { getAuth, onAuthStateChanged, User, signOut } from "firebase/auth";

interface HeroButtonProps {
  text: string;
}

export default function HeroButton({ text }: HeroButtonProps) {
  const auth = getAuth(firebase);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });

    // signOut(auth).then(() => {
    //   // Sign-out successful.
    // }).catch((error) => {
    //   // An error happened.
    // });
  }, []);

  useEffect(() => {
    if (isPopupOpen) {
      document.body.classList.add("no-scroll"); // Запрещаем скролл
    } else {
      document.body.classList.remove("no-scroll"); // Разрешаем скролл
    }

    return () => document.body.classList.remove("no-scroll"); // Чистим при размонтировании
  }, [isPopupOpen]);

  return (
    <>
      <button className={styles.button} onClick={() => user !== null ? setIsPopupOpen(false) : setIsPopupOpen(true)}>
        {text}
      </button>
      {isPopupOpen && <Popup onClose={() => setIsPopupOpen(false)} />}
    </>
  );
}