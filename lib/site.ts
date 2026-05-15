export const siteName = 'PUTSSON'
export const siteTagline = 'Fönsterputs i Göteborg'
export const siteEmail = 'info@putsson.se'
export const sitePhone = '0700 600 780'
export const sitePhoneE164 = '+46700600780'
export const sitePhoneHref = 'tel:+46700600780'
export const siteCity = 'Göteborg'

const fallbackSiteUrl = 'https://putsson.se'

const resolveSiteUrl = (value?: string) => {
  if (!value) {
    return fallbackSiteUrl
  }

  try {
    return new URL(value).toString().replace(/\/$/, '')
  } catch {
    return fallbackSiteUrl
  }
}

export const siteUrl = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL)
export const siteUrlObj = new URL(siteUrl)
