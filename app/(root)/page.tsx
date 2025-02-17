import CallToAction from "../components/CallToAction/CallToAction";
import Hero from "../components/Hero-2/Hero";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";
import styles from "./page.module.css";

export default function Home() {
    return (
        <main>
            <Hero />
            <HowItWorks />
            <WhyChooseUs />
            <CallToAction /> 
            <p className={ styles.version}>Version 1.0.6</p>
        </main>
    );
}
