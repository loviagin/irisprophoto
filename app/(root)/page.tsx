import LikeThis from "@/app/components/LikeThis-old/LikeThis";
import HeroSection from "@/app/components/Hero/HeroSection";
import HowItWorks from "@/app/components/HowItWorks/HowItWorks";
import WhyChooseUs from "@/app/components/WhyChooseUs/WhyChooseUs";
import Portfolio from "@/app/components/Portfoilio-old/Portfolio";
import ContactUs from "@/app/components/Contacts-old/Contacts";

export const metadata = {
  title: "Iris PRO Photo",
  description: "Order professional photo irises",
};

export default function Home() {
  return (
    <main>
      <HeroSection />
      <HowItWorks />
      <WhyChooseUs />
      <LikeThis />
      <Portfolio />
      <ContactUs />
    </main>
  );
}
