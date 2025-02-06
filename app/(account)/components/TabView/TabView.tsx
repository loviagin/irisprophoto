"use client";
import { useState } from "react";
import styles from "./TabView.module.css";

import { FaPlus } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

import OrderForm from "@/app/components/OrderForm/OrderForm";

export default function TabView() {
    const [activeTab, setActiveTab] = useState("home");

    return (
        <div className={styles.container}>
            {/* Вкладки */}
            <div className={styles.tabBar}>
                <button
                    className={activeTab === "home" ? styles.active : ""}
                    onClick={() => setActiveTab("home")}
                >
                    <FaPlus />
                    New Order
                </button>
                <button
                    className={activeTab === "orders" ? styles.active : ""}
                    onClick={() => setActiveTab("orders")}
                >
                    <FaListUl />
                    Orders History
                </button>
                <button
                    className={activeTab === "settings" ? styles.active : ""}
                    onClick={() => setActiveTab("settings")}
                >
                    <IoMdSettings />
                    Settings
                </button>
            </div>

            {/* Контент вкладок */}
            <div className={styles.content}>
                {
                    activeTab === "home" &&
                    <div>
                        <OrderForm onClose={() => console.log("close")}/>
                    </div>
                }
                {activeTab === "orders" && <div>No Orders</div>}
                {activeTab === "settings" && <div>⚙️ Settings are not available now</div>}
            </div>
        </div>
    );
}