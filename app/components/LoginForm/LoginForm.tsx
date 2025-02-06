"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import firebase from "@/app/firebase/firebase";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import styles from "./LoginForm.module.css";

interface PopupProps {
    onClose: () => void;
}

export default function LoginForm({ onClose }: PopupProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isRegistration, setIsRegistration] = useState(false);

    const auth = getAuth(firebase);
    const router = useRouter();

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const email = (e.currentTarget.elements[0] as HTMLInputElement).value;
        const password = (e.currentTarget.elements[1] as HTMLInputElement).value;

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                setIsLoading(false);
                onClose();
                router.push("/account");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
                setErrorMessage(errorMessage);
                setIsLoading(false);
            });
    };

    const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const name = (e.currentTarget.elements[0] as HTMLInputElement).value;
        const email = (e.currentTarget.elements[1] as HTMLInputElement).value;
        const password = (e.currentTarget.elements[2] as HTMLInputElement).value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                continueRegistration(user, name);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
                setErrorMessage(errorMessage);
                setIsLoading(false);
            });
    };

    const continueRegistration = (user: any, name: string) => {
        updateProfile(user, {
            displayName: name
        }).then(() => {
            setIsLoading(false);
            onClose();
            router.push("/account");
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
            setErrorMessage(errorMessage);
            setIsLoading(false);
        });
    };

    return (
        <div className={styles.right}>
            {isRegistration ? <h2>Sign Up</h2> : <h2>Login</h2>}

            {isRegistration ?
                <form onSubmit={handleRegistration}>
                    <input type="name" placeholder="Your name" required />
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <button type="submit">{isLoading ? "loading . . ." : "Sign up"}</button>
                </form>
                :
                <form onSubmit={handleLogin}>
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <button type="submit">{isLoading ? "loading . . ." : "Sign In"}</button>
                </form>
            }

            <p className={styles.errorMessage}>{errorMessage}</p>

            {isRegistration ?
                <p>Have an account? <a className={styles.signUp} onClick={() => setIsRegistration(false)}>Sign in</a></p>
                :
                <p>Don't have an account? <a className={styles.signUp} onClick={() => setIsRegistration(true)}>Sign Up</a></p>
            }
        </div>
    );
}