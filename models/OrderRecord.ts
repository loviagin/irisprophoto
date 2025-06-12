// models/OrderRecord.ts
import mongoose from 'mongoose'

const OrderRecordSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
}, { timestamps: true })

export default mongoose.models.OrderRecord || mongoose.model('OrderRecord', OrderRecordSchema)