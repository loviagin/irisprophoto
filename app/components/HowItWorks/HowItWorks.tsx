import Card from "./Card";
import styles from './HowItWorks.module.css';

export default function HowItWorks() {
    return (
        <section className={styles.section} id="howitworks">
            <h2>How It Works</h2>
            <h6>Here is a step-by-step guide on how to use our service:</h6>
            <ol className={styles.list}>
                <li><Card title="Book Your Session" description="Fill out the online form or give us a call to schedule a convenient time for your photo session" image="/images/booking.webp" /></li>
                <li><Card title="Iris Photography Session" description="Using professional-grade equipment, we capture the exquisite details of your iris in just a few minutes" image="/images/photographer.webp" /></li>
                <li><Card title="Artistic Enhancement" description="After your session, we process your image into a work of art that highlights the uniqueness of your gaze" image="/images/magic-wand.webp" /></li>
                <li><Card title="Receive Your Masterpiece" description="You’ll receive your high-quality image in a variety of formats — digital and print" image="/images/photo-gallery.webp" /></li>
            </ol>
        </section>
    );
}