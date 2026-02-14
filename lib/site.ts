// TODO: Replace with your real company name.
export const siteName = 'Företagsnamn'

// TODO: Set NEXT_PUBLIC_SITE_URL for production, or replace the fallback URL.
const fallbackSiteUrl = 'https://example.se'

const resolveSiteUrl = (value?: string) => {
  if (!value) {
    return fallbackSiteUrl
  }

  try {
    return new URL(value).toString()
  } catch {
    return fallbackSiteUrl
  }
}

export const siteUrl = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL)
export const siteUrlObj = new URL(siteUrl)
