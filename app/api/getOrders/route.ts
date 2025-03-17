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
  // const q = query(ordersRef, where("email", "==", userId));
  const q = query(ordersRef, orderBy("createdAt", "desc"));
  // console.log("UserID:", userId);

  const querySnapshot = await getDocs(q);
  const orders: Order[] = [];
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    orders.push(doc.data() as Order);
  });

  return NextResponse.json(orders);
}
