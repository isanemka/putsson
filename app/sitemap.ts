import type { MetadataRoute } from 'next'

// TODO: Set NEXT_PUBLIC_SITE_URL for production, or replace the fallback URL.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.se'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/integritetspolicy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${siteUrl}/cookies`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
