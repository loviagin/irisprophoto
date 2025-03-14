import Contacts from "@/app/components/Contacts/Contacts";
import Hero from "@/app/components/Hero-2/Hero";
import HowItWorks from "@/app/components/HowItWorks-2/HowItWorks";
import LikeThis from "@/app/components/LikeThis/LikeThis";
import Portfolio from "@/app/components/Portfoilio/Portfolio";

export const metadata = {
    title: "Iris PRO Photo",
    description: "Order professional photo irises",
};

export default function Home() {
    return (
        <main>
            <Hero />
            <HowItWorks />
            <LikeThis />
            <Portfolio />
            <Contacts />
        </main>
    );
}
