'use client';
import { useEffect, useState } from 'react';

export default function CheckoutPage() {
  const [payments, setPayments] = useState<any>(null);
  const [card, setCard] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadSquare = async () => {
      const paymentsSdk = await (window as any).Square.payments(
        process.env.NEXT_PUBLIC_SQUARE_APP_ID,
        process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID
      );

      const card = await paymentsSdk.card();
      await card.attach('#card-container');
      setPayments(paymentsSdk);
      setCard(card);
    };

    const script = document.createElement('script');
    script.src = 'https://sandbox.web.squarecdn.com/v1/square.js';
    script.onload = loadSquare;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    setLoading(true);
    const result = await card.tokenize();
    if (result.status === 'OK') {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        body: JSON.stringify({
          sourceId: result.token,
        }),
      });

      const data = await res.json();
      if (data.payment) {
        setMessage('Оплата прошла успешно!');
      } else {
        setMessage('Ошибка оплаты');
      }
    } else {
      setMessage('Ошибка при получении токена');
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Оплатить заказ</h1>
      <div id="card-container" style={{ marginBottom: 20 }}></div>
      <button disabled={loading} onClick={handlePayment}>
        {loading ? 'Оплата...' : 'Оплатить'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}