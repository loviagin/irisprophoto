import NewHero from './components/NewHero/NewHero';
import NewFeatures from './components/NewFeatures/NewFeatures';
import NewGallery from './components/NewGallery/NewGallery';
import GiftCertificates from './components/GiftCertificates/GiftCertificates';
import NewProcess from './components/NewProcess/NewProcess';
import NewTestimonials from './components/NewTestimonials/NewTestimonials';
import NewCTA from './components/NewCTA/NewCTA';
import NewContacts from './components/NewContacts/NewContacts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Iris Pro Photo | Professional Iris Photography",
  description: "Professional high-resolution iris photography capturing the unique beauty of your eyes forever. Expert photographers, state-of-the-art equipment, and gift certificates available.",
  keywords: "iris photography, eye photography, professional photographer, gift certificates, unique portraits, eye photos",
  authors: [{ name: "Iris Pro Photo" }],
  openGraph: {
    title: "Iris Pro Photo | Professional Iris Photography",
    description: "Professional high-resolution iris photography capturing the unique beauty of your eyes forever. Expert photographers and gift certificates available.",
    type: "website",
    locale: "en_US",
    siteName: "Iris Pro Photo"
  },
  robots: {
    index: true,
    follow: true
  },
  themeColor: "#2563EB",
  viewport: "width=device-width, initial-scale=1",
  alternates: {
    canonical: "https://irisprophoto.com"
  }
};

export default function NewHome() {
  return (
    <main>
      <NewHero />
      <NewFeatures />
      <NewGallery />
      <GiftCertificates />
      <NewProcess />
      <NewTestimonials />
      <NewCTA />
      <NewContacts />
    </main>
  );
} 