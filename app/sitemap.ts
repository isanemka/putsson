import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site'
import { areas } from '@/lib/areas'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...areas.map((area) => ({
      url: `${siteUrl}/fonsterputs/${area.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    {
      url: `${siteUrl}/integritetspolicy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${siteUrl}/cookies`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
