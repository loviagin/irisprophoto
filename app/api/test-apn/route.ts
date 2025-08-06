import { NextResponse } from 'next/server';
import { sendApnPush } from '@/lib/apnSender';

export async function GET() {
  try {
    // Замените на ваш новый валидный токен из приложения
    
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: String(error) 
    }, { status: 500 });
  }
}
