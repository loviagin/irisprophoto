import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Order } from '@/app/models/Order';

export async function GET() {
  try {
    await connectToDatabase();
    
    const orders = await Order.find({}, {
      bookingDateTime: 1,
      _id: 0
    });

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    const { name, contact, notionId, bookingDateTime } = body;

    const order = await Order.create({
      name,
      contact,
      notionId,
      bookingDateTime: new Date(bookingDateTime)
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create booking' },
      { status: 500 }
    );
  }
} 