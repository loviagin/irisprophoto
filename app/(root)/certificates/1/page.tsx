import styles from './page.module.css';
import Image from 'next/image';
import { FaClock, FaImages, FaCalendarAlt, FaMapMarkerAlt, FaCamera, FaEdit, FaCloud, FaPrint } from 'react-icons/fa';

export default function CertificatePage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.productLayout}>
          <div className={styles.imageSection}>
            <Image
              src="/images/certificates/certificate-1.jpg"
              alt="Сертификат Iris PRO Photo"
              width={600}
              height={500}
              className={styles.certificateImage}
            />
          </div>
          
          <div className={styles.infoSection}>
            <h1 className={styles.title}>Сертификат на фотосессию</h1>
            <div className={styles.price}>5000 ₽</div>
            <button className={styles.buyButton}>
              Купить сертификат
            </button>
          </div>
        </div>

        <div className={styles.descriptionSection}>
          <p className={styles.description}>
            Подарите незабываемые эмоции и профессиональные фотографии своим близким. 
            Наш сертификат на фотосессию - это идеальный подарок для тех, кто ценит 
            качественные фотографии и хочет сохранить особенные моменты жизни.
          </p>

          <div className={styles.features}>
            <div className={styles.featureItem}>
              <FaClock />
              <span>2 часа профессиональной фотосессии</span>
            </div>
            <div className={styles.featureItem}>
              <FaImages />
              <span>Обработка 50 фотографий</span>
            </div>
            <div className={styles.featureItem}>
              <FaCalendarAlt />
              <span>Срок действия 6 месяцев</span>
            </div>
            <div className={styles.featureItem}>
              <FaMapMarkerAlt />
              <span>Студия или уличная съемка</span>
            </div>
          </div>

          <div className={styles.details}>
            <h2>Что входит в сертификат</h2>
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <h3>Фотосессия</h3>
                <p>Профессиональная съемка в выбранной локации с опытным фотографом</p>
              </div>
              <div className={styles.detailItem}>
                <h3>Обработка</h3>
                <p>Профессиональная обработка 50 фотографий в едином стиле</p>
              </div>
              <div className={styles.detailItem}>
                <h3>Галерея</h3>
                <p>Онлайн-галерея с возможностью скачивания фотографий</p>
              </div>
              <div className={styles.detailItem}>
                <h3>Печать</h3>
                <p>10 отпечатанных фотографий формата 15x21 см</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}