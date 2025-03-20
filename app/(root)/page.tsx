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
  title: "Iris Pro Photo – capturing the moments for a long time",
  description: "We are a team of professional photographers and we are offering our services of iris photography for you. We are capturing the moments for a long time."
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