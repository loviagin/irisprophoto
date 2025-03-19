import { Resend } from 'resend';

if (!process.env.NEXT_PUBLIC_RESEND_API_KEY) {
  throw new Error('Missing RESEND_API_KEY environment variable');
}

export const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export const sendCertificateEmail = async ({
  email,
  certificateCode,
  certificateType,
  price
}: {
  email: string;
  certificateCode: string;
  certificateType: string;
  price: string;
}) => {
  try {
    const data = await resend.emails.send({
      from: 'Iris Pro Photo <noreply@irisprophoto.me>',
      to: email,
      subject: 'Ваш подарочный сертификат Iris Pro Photo',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2c3e50; text-align: center;">Спасибо за покупку!</h1>
          <p>Уважаемый клиент,</p>
          <p>Спасибо за приобретение подарочного сертификата Iris Pro Photo. Ваш заказ успешно оформлен.</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h2 style="color: #2c3e50; margin-top: 0;">Детали сертификата:</h2>
            <p><strong>Тип сертификата:</strong> ${certificateType}</p>
            <p><strong>Стоимость:</strong> ${price}€</p>
            <p><strong>Код сертификата:</strong> <span style="background: #e9ecef; padding: 5px 10px; border-radius: 5px;">${certificateCode}</span></p>
          </div>

          <h3 style="color: #2c3e50;">Как использовать сертификат:</h3>
          <ol>
            <li>При бронировании фотосессии на сайте введите код сертификата в специальное поле</li>
            <li>Или предъявите код администратору в фотостудии</li>
            <li>Сертификат действителен в течение 6 месяцев</li>
            <li>Один сертификат можно использовать только один раз</li>
          </ol>

          <p>Если у вас возникнут вопросы, пожалуйста, свяжитесь с нами:</p>
          <ul>
            <li>Email: contact@irisprophoto.com</li>
            <li>Телефон: +XXX XXX XXX</li>
          </ul>

          <p style="margin-top: 30px; text-align: center; color: #6c757d;">
            С наилучшими пожеланиями,<br>
            Команда Iris Pro Photo
          </p>
        </div>
      `
    });

    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}; 