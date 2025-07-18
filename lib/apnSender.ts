import apn from 'apn'
import fs from 'fs'
import path from 'path'
import { connectToDatabase } from './db'
import Device from '@/models/Device'

// Путь к .p8 ключу
const keyPath = path.resolve('./AuthKey_5SA8A55MT8.p8')

// Создание провайдера APNs
const apnProvider = new apn.Provider({
  token: {
    key: fs.readFileSync(keyPath),
    keyId: process.env.APN_KEY_ID!,
    teamId: process.env.APN_TEAM_ID!,
  },
  production: true, 
})

export async function sendApnPush(deviceToken: string, title: string, body: string) {
  const notification = new apn.Notification()

  notification.topic = process.env.APN_BUNDLE_ID! // Bundle ID приложения
  notification.alert = { title, body }
  notification.sound = 'default'
  notification.payload = { type: 'new_order' }

  try {
    const result = await apnProvider.send(notification, deviceToken)
    console.log('✅ APNs отправлено:', result.sent.length, '📦 Ошибок:', result.failed.length)

    if (result.failed.length > 0) {
      console.warn('❌ Ошибки отправки:', result.failed)
      // Удаляем невалидные токены из базы
      await connectToDatabase()
      for (const fail of result.failed) {
        if (fail.device && fail.error) {
          // Удаляем токен устройства
          await Device.deleteOne({ token: fail.device })
          console.log(`Удалён невалидный токен устройства: ${fail.device}`)
        }
      }
    }
  } catch (err) {
    console.error('❌ Ошибка при отправке APNs:', err)
  }
}