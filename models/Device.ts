import mongoose, { Schema, models } from 'mongoose'

const DeviceSchema = new Schema({
  token: { type: String, required: true, unique: true },
  userId: { type: String }, // если понадобится
  createdAt: { type: Date, default: Date.now },
})

DeviceSchema.index({ token: 1 }, { unique: true }) // 👈 важная строка

export default models.Device || mongoose.model('Device', DeviceSchema)