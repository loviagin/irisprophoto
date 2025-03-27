import { NextRequest, NextResponse } from "next/server";

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID!;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET!;
const PAYPAL_URL = "https://api-m.paypal.com"; // Используйте sandbox.paypal.com для тестирования

// Функция для получения OAuth-токена
async function getPayPalAccessToken() {
  const authResponse = await fetch(`${PAYPAL_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!authResponse.ok) {
    throw new Error("Ошибка при получении токена PayPal");
  }

  const { access_token } = await authResponse.json();
  return access_token;
}

// Функция для проверки транзакции
async function verifyTransaction(tx: string, accessToken: string) {
  const response = await fetch(`${PAYPAL_URL}/v2/checkout/orders/${tx}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data.status === "COMPLETED" ? data : null;
}

// Обработчик запроса
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tx } = body;

    if (!tx) {
      return NextResponse.json({ error: "Transaction ID is required" }, { status: 400 });
    }

    const accessToken = await getPayPalAccessToken();
    const transaction = await verifyTransaction(tx, accessToken);

    if (transaction) {
      return NextResponse.json({ valid: true, transaction });
    } else {
      return NextResponse.json({ valid: false }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}