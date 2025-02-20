import Contacts from "../components/Contacts/Contacts";
import Hero from "../components/Hero-2/Hero";
import HowItWorks from "../components/HowItWorks-2/HowItWorks";
import LikeThis from "../components/LikeThis/LikeThis";
import Portfolio from "../components/Portfoilio/Portfolio";

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
