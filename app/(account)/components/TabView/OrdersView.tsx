"use client";
import { useEffect, useState } from "react";
import firebase from "@/app/firebase/firebase";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import styles from "./OrdersView.module.css";

interface Order {
    createdAt: Timestamp;
    details: string;
    email: string;
    name: string;
    phone?: string;
    status?: string;
    updatedAt?: Timestamp;
}

const OrdersView = () => {
    const auth = getAuth(firebase);
    const [userId, setUserId] = useState<string | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);

    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && user.email) {
                setUserId(user.email);
                console.log("User ID:", user.email);
            }
        });

        // if (auth.currentUser) {
        //     updateProfile(auth.currentUser, {
        //         displayName: "Elia"
        //     }).then(() => {
        //         // Profile updated!
        //         // ...
        //     }).catch((error) => {
        //         // An error occurred
        //         // ...
        //     });
        // }

        return () => unsubscribe();
    }, [auth]);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!userId) return;
            const response = await fetch(`/api/getOrders?userId=${encodeURIComponent(userId)}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            setOrders(data);
            console.log("API response:", data);
        };

        fetchOrders();
    }, [userId]);

    return (
        <div className={styles.container}>
            {orders.length === 0 ? (
                <p className={styles.noOrders}>No orders found.</p>
            ) : (
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.createdAt.seconds}>
                                    <td className={styles.iconCell}>🛒</td>
                                    <td>
                                        <p>
                                            <span className={styles.label}>Details:</span> {order.details}
                                        </p>
                                        {order.phone && (
                                            <p>
                                                <span className={styles.label}>Phone:</span> {order.phone}
                                            </p>
                                        )}
                                    </td>
                                    <td>
                                        <p>
                                            <span className={styles.label}>Created:</span>{" "}
                                            {new Date(order.createdAt.seconds * 1000).toLocaleString()}
                                        </p>
                                    </td>
                                    <td>
                                        <p>
                                            <span className={styles.label}>Status:</span>{" "}
                                            {order.status || "NEW"}
                                        </p>
                                    </td>
                                    <td>
                                        <p>
                                            <span className={styles.label}>Updated:</span>{" "}
                                            {order.updatedAt
                                                ? new Date(order.updatedAt.seconds * 1000).toLocaleString()
                                                : "-"}
                                        </p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OrdersView;