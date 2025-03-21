import { Metadata } from 'next'
import GalleryGrid from '@/app/components/GalleryGrid'
import styles from './GalleryPage.module.css'

export const metadata: Metadata = {
  title: 'Gallery | Iris Pro Photo',
  description: 'Explore our stunning collection of iris photography portraits. Each image captures the unique patterns and intricate details of the human iris.',
  keywords: 'iris photography, eye portraits, unique portraits, iris patterns, eye art',
  openGraph: {
    title: 'Gallery | Iris Pro Photo',
    description: 'Discover unique iris portraits capturing the beauty of human eyes',
    images: [
      {
        url: '/works/work1.webp',
        width: 1200,
        height: 630,
        alt: 'Iris Pro Photo Gallery'
      }
    ]
  }
}

export default function GalleryPage() {
  return (
    <main className={styles.main}>
      <GalleryGrid />
    </main>
  )
} 