'use client'

import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/next'

const STORAGE_KEY = 'cookie_consent'

// Renders Vercel Analytics only after the user has explicitly accepted cookies.
// Listens for the custom 'consent-change' event dispatched by CookieBanner.
export default function AnalyticsLoader() {
  const [consent, setConsent] = useState<string | null>(() =>
    typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
  )

  useEffect(() => {
    function onConsentChange() {
      setConsent(localStorage.getItem(STORAGE_KEY))
    }

    window.addEventListener('consent-change', onConsentChange)
    return () => window.removeEventListener('consent-change', onConsentChange)
  }, [])

  if (consent !== 'accepted') return null
  return <Analytics />
}
