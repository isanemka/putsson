'use client'

import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/next'
import { CONSENT_CHANGE_EVENT, getConsentValue } from '@/lib/consent'

// Renders Vercel Analytics only after the user has explicitly accepted cookies.
// Listens for the custom CONSENT_CHANGE_EVENT dispatched by CookieBanner.
export default function AnalyticsLoader() {
  const [consent, setConsent] = useState<string | null>(() =>
    typeof window !== 'undefined' ? getConsentValue() : null
  )

  useEffect(() => {
    function onConsentChange() {
      setConsent(getConsentValue())
    }

    window.addEventListener(CONSENT_CHANGE_EVENT, onConsentChange)
    return () =>
      window.removeEventListener(CONSENT_CHANGE_EVENT, onConsentChange)
  }, [])

  if (consent !== 'accepted') return null
  return <Analytics />
}
