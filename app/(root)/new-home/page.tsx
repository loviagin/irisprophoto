import NewHero from './components/NewHero/NewHero';
import NewFeatures from './components/NewFeatures/NewFeatures';
import NewGallery from './components/NewGallery/NewGallery';
import NewProcess from './components/NewProcess/NewProcess';
import NewTestimonials from './components/NewTestimonials/NewTestimonials';
import NewCTA from './components/NewCTA/NewCTA';
import NewContacts from './components/NewContacts/NewConacts';

export default function NewHome() {
  return (
    <main>
      <NewHero />
      <NewFeatures />
      <NewGallery />
      <NewProcess />
      <NewTestimonials />
      <NewCTA />
      <NewContacts />
    </main>
  );
} 