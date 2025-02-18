import CallToAction from "../components/CallToAction/CallToAction";
import Hero from "../components/Hero-2/Hero";
import HowItWorks from "../components/HowItWorks-2/HowItWorks";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";
// import styles from "./page.module.css";

export default function Home() {
    return (
        <main>
            <Hero />
            <HowItWorks />
            <WhyChooseUs />
            <CallToAction /> 
        </main>
    );
}
