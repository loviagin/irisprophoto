import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://irisprophoto.me',
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1,
      images: ['https://irisprophoto.me/images/favicon.webp'],
    },
    {
      url: 'https://irisprophoto.me/certificates',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      images: ['https://irisprophoto.me/images/favicon.webp'],
    },
    {
      url: 'https://irisprophoto.me/certificates/1',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      images: ['https://irisprophoto.me/images/favicon.webp'],
    },
    {
      url: 'https://irisprophoto.me/certificates/2',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      images: ['https://irisprophoto.me/images/favicon.webp'],
    },
    {
      url: 'https://irisprophoto.me/certificates/3',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      images: ['https://irisprophoto.me/images/favicon.webp'],
    },
    {
      url: 'https://irisprophoto.me/gallery',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      images: ['https://irisprophoto.me/images/favicon.webp'],
    },
    {
      url: 'https://irisprophoto.me/privacypolicy',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      images: ['https://irisprophoto.me/images/favicon.webp'],
    },
    {
      url: 'https://irisprophoto.me/terms',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      images: ['https://irisprophoto.me/images/favicon.webp'],
    },
  ]
}