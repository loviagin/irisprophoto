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
  production: false, // Изменено на false для тестирования
})

export async function sendApnPush(deviceToken: string, title: string, body: string, orderId: string) {
  const notification = new apn.Notification()

  notification.topic = process.env.APN_BUNDLE_ID! // Bundle ID приложения
  notification.alert = { title, body }
  notification.sound = 'default'
  
  // Структура как в OneSignal для работы с onOpenURL
  notification.payload = {
    aps: {
      alert: {
        title: title,
        body: body
      },
      sound: 'default'
    },
    data: {
      orderId: orderId,
      deepLink: `irisproadmin://open=${orderId}`,
      testData: "test_value",
      timestamp: new Date().toISOString()
    }
  }

  console.log('🔧 APN настройки:', {
    bundleId: process.env.APN_BUNDLE_ID,
    keyId: process.env.APN_KEY_ID,
    teamId: process.env.APN_TEAM_ID,
    production: false,
    payload: notification.payload
  });

  try {
    const result = await apnProvider.send(notification, deviceToken)
    console.log('✅ APNs отправлено:', result.sent.length, '📦 Ошибок:', result.failed.length)

    if (result.failed.length > 0) {
      console.warn('❌ Ошибки отправки:', JSON.stringify(result.failed, null, 2))
      await connectToDatabase();
      for (const fail of result.failed) {
        // Попробуем разные варианты названия поля
        console.log(fail)
        const token =
          fail.device ||
          fail['device'] 
        if (token) {
          await Device.deleteOne({ token });
          console.log(`Удалён невалидный токен устройства: ${token}`);
        } else {
          console.warn('Не удалось определить токен устройства для удаления:', fail);
        }
      }
    }
  } catch (err) {
    console.error('❌ Ошибка при отправке APNs:', err)
  }
}