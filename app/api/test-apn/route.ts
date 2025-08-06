import { NextResponse } from 'next/server';
import { sendApnPush } from '@/lib/apnSender';

export async function GET() {
  try {
    // Замените на ваш новый валидный токен из приложения
    const token = '9d728b9cbd3b2f5c0d2ba739802c96106f8e5852f9f759cf999e6a49a893253d';
    const title = 'Тестовое уведомление';
    const body = 'Это тестовое push-уведомление через APNs';
    const orderId = '2b3a8219-8227-41a4-9bf6-f34bf0722275';
    
    await sendApnPush(token, title, body, orderId);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Push sent to device', 
      token 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: String(error) 
    }, { status: 500 });
  }
}
