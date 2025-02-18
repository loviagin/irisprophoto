import Hero from "../components/Hero-2/Hero";
import HowItWorks from "../components/HowItWorks-2/HowItWorks";
import LikeThis from "../components/LikeThis/LikeThis";
import Portfolio from "../components/Portfoilio/Portfolio";
import WhyChooseUs from "../components/WhyChooseUs-2/WhyChooseUs";
// import styles from "./page.module.css";

export default function Home() {
    return (
        <main>
            <Hero />
            <HowItWorks />
            {/* <WhyChooseUs /> */}
            <LikeThis />
            <Portfolio />
        </main>
    );
}
