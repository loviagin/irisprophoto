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
  try {
    console.log("Запрос получен");

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    console.log("userId:", userId);

    if (!userId) {
      console.error("Ошибка: User ID не указан");
      return NextResponse.json(
        { error: "User ID is not provided" },
        { status: 400 }
      );
    }

    if (userId !== "moinnuHhdn82938ujdsi") {
      console.error("Ошибка: Неверный User ID");
      return NextResponse.json(
        { error: "User ID is not correct" },
        { status: 400 }
      );
    }

    const db = getFirestore(firebase);
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, orderBy("createdAt", "desc"));

    console.log("Запрос к Firestore выполняется...");

    const querySnapshot = await getDocs(q);

    console.log("Запрос выполнен, количество документов:", querySnapshot.size);

    const groupedOrders: Record<string, { date: Date; orders: Order[] }> = {};

    querySnapshot.forEach((doc) => {
      console.log("Обрабатываем документ:", doc.id);

      const order = doc.data() as Order;

      // Проверяем, есть ли createdAt
      if (!order.createdAt) {
        console.error("Ошибка: createdAt отсутствует в документе", doc.id);
        return;
      }

      // Преобразуем Timestamp в объект Date
      const createdAtDate = order.createdAt.toDate();

      // Получаем строку в формате YYYY-MM-DD для группировки
      const createdAtKey = createdAtDate.toISOString().split("T")[0];

      if (!groupedOrders[createdAtKey]) {
        groupedOrders[createdAtKey] = { date: createdAtDate, orders: [] };
      }

      groupedOrders[createdAtKey].orders.push(order);
    });

    console.log("Группировка завершена");

    // Преобразуем объект в массив
    const orderGroups: OrderGroup[] = Object.values(groupedOrders);

    console.log("Возвращаем данные");

    return NextResponse.json(orderGroups);
  } catch (error) {
    console.error("Ошибка сервера:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}