'use client'
import { useRouter } from "next/navigation";
import BookingModal from "../components/BookingModal/BookingModal";

export default function BookPage() {
    const router = useRouter();

    const handleClose = () => {
        router.push('/');
    }
  return <main>
    <BookingModal isOpen={true} onClose={handleClose} />
  </main>;
}