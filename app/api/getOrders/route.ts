import firebase from "@/app/firebase/firebase";
import { getFirestore } from "firebase/firestore";
import { NextResponse } from "next/server";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { Timestamp } from "firebase/firestore"; // используем из firebase/firestore

interface Order {
  createdAt: Timestamp;
  details: string;
  email: string;
  name: string;
  phone: string;
  shootingType: string,
  date: string,
  status: string;
  updatedAt?: Timestamp;
}

interface OrderGroup {
  date: Date,
  orders: Order[] 
}

export async function GET(req: Request) {
  // Получаем параметры запроса из URL
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "User ID is not provided" },
      { status: 400 }
    );
  }

  if (userId !== 'moinnuHhdn82938ujdsi') {
    return NextResponse.json(
      { error: "User ID is not correct" },
      { status: 400 }
    );
  }

  const db = getFirestore(firebase);
  const ordersRef = collection(db, "orders");
  const q = query(ordersRef, orderBy("createdAt", "desc"));

  const querySnapshot = await getDocs(q);
  const groupedOrders: Record<string, { date: Date; orders: Order[] }> = {};

  querySnapshot.forEach((doc) => {
    const order = doc.data() as Order;

    // Преобразуем Timestamp в объект Date
    const createdAtDate = order.createdAt.toDate();

    // Получаем строку в формате YYYY-MM-DD для группировки
    const createdAtKey = createdAtDate.toISOString().split("T")[0];

    if (!groupedOrders[createdAtKey]) {
      groupedOrders[createdAtKey] = { date: createdAtDate, orders: [] };
    }

    groupedOrders[createdAtKey].orders.push(order);
  });

  // Преобразуем объект в массив
  const orderGroups: OrderGroup[] = Object.values(groupedOrders);

  return NextResponse.json(orderGroups);
}