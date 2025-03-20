"use client";
import { useState } from "react";
import styles from "./AuthModal.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import firebase from "@/app/firebase/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const auth = getAuth(firebase);

  const handleLogin = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      await auth.updateCurrentUser(user);
      onClose();
      router.push("/account");
    } catch (error: any) {
      let errorMessage = "An error occurred during sign in";
      if (error.code === "auth/user-not-found") {
        errorMessage = "User not found";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Wrong password";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email";
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      // Здесь будет логика регистрации
      console.log("Register data:", data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.modalContent}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={onClose}>
              <FaTimes />
            </button>

            <div className={styles.tabs}>
              <button
                className={`${styles.tab} ${isLogin ? styles.activeTab : ""}`}
                onClick={() => setIsLogin(true)}
                disabled={isLoading}
              >
                Sign in
              </button>
              <button
                className={`${styles.tab} ${!isLogin ? styles.activeTab : ""}`}
                onClick={() => setIsLogin(false)}
                disabled={isLoading}
              >
                Sign up
              </button>
            </div>

            {error && <div className={styles.errorMessage}>{error}</div>}

            <AnimatePresence mode="wait">
              {isLogin ? (
                <LoginForm key="login" onSubmit={handleLogin} isLoading={isLoading} />
              ) : (
                <RegisterForm key="register" onSubmit={handleRegister} isLoading={isLoading} />
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 