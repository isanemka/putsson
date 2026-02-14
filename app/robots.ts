import type { MetadataRoute } from 'next'

// TODO: Set NEXT_PUBLIC_SITE_URL for production, or replace the fallback URL.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.se'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
