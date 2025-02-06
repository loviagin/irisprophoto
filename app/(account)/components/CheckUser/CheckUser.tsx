"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import firebase from "@/app/firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const CheckUser = () => {
    const auth = getAuth(firebase);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push("/");
            }
        });

        return () => unsubscribe();
    }, [auth, router]);

    return (
        <div></div>
    )
}

export default CheckUser