import mongoose from 'mongoose'

declare global {
  var mongoose: { conn: any; promise: any } | undefined
}

const MONGODB_URI = process.env.MONGODB_URI!

let cached = global.mongoose || { conn: null, promise: null }

export async function connectToDatabase() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}