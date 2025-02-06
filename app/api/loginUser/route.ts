import { NextResponse } from "next/server";
import firebase from "@/app/firebase/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


export async function POST(req: Request) {
    try {
        const auth = getAuth(firebase);
        const { email, password } = await req.json();

        // Дожидаемся завершения авторизации
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Принудительно обновляем состояние авторизации
        await auth.updateCurrentUser(user);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}