export const siteName = 'PUTSSON'
export const siteTagline = 'Fönsterputs i Göteborg'
export const siteEmail = 'hej@putsson.se'
export const sitePhone = '+46 70 123 45 67'
export const sitePhoneHref = 'tel:+46701234567'
export const siteCity = 'Göteborg'

const fallbackSiteUrl = 'https://putsson.se'

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
