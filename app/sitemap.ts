import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://irisprophoto.me',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      images: ['https://irisprophoto.me/images/favicon.webp'],
    },
    {
      url: 'https://acme.com/account',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}