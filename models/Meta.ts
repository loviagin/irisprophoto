import mongoose, { Schema, model, models } from 'mongoose'

const metaSchema = new Schema({
  _id: { type: String, required: true }, // например: 'last_order_id'
  value: { type: String, required: true },
})

const Meta = models.Meta || model('Meta', metaSchema)

export default Meta