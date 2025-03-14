'use client'
import { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import styles from './NewContacts.module.css';

const center = {
  lat: 29.894722, // Координаты Saint Augustine
  lng: -81.314444
};

const mapContainerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '20px'
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    {
      featureType: "all",
      elementType: "labels.text.fill",
      stylers: [{ color: "#636c81" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#e9e9e9" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#ffffff" }],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ color: "#e5e5e5" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#f5f5f5" }],
    },
  ],
};

export default function NewContacts() {
  const [map, setMap] = useState(null);

  const onLoad = useCallback((map: any) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return (
    <section id="contacts" className={styles.contacts}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.info}>
            <h2>Свяжитесь со мной</h2>
            <p className={styles.description}>
              Готовы запечатлеть ваши особенные моменты? Свяжитесь со мной любым удобным способом, и мы обсудим все детали вашей фотосессии.
            </p>

            <div className={styles.contactItems}>
              <div className={styles.contactItem}>
                <div className={styles.iconWrapper}>
                  <FaPhone />
                </div>
                <div className={styles.contactInfo}>
                  <h3>Телефон</h3>
                  <a href="tel:+19048359485">+1 (904) 835-94-85</a>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.iconWrapper}>
                  <FaEnvelope />
                </div>
                <div className={styles.contactInfo}>
                  <h3>Email</h3>
                  <a href="mailto:info@irisprophoto.com">info@irisprophoto.com</a>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.iconWrapper}>
                  <FaMapMarkerAlt />
                </div>
                <div className={styles.contactInfo}>
                  <h3>Адрес</h3>
                  <p>123 St George St</p>
                  <p>Saint Augustine, FL</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.mapWrapper}>
            <LoadScript googleMapsApiKey="AIzaSyACsBlJ-whOzXIk9iTNxfPCtLbNP2Jh3pk">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={15}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={options}
              >
                <Marker 
                  position={center}
                  title="123 St George St, Saint Augustine"
                />
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
    </section>
  );
} 