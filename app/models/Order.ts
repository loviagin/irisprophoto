import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
    // Может быть email или телефон
  },
  notionId: {
    type: String,
    required: true,
    unique: true,
  },
  bookingDateTime: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema); 