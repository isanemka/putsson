'use client'

import Link from 'next/link'
import { useState } from 'react'

const STORAGE_KEY = 'cookie_consent'

export default function CookieBanner() {
  // ssr: false guarantees this only runs on the client, so localStorage is always available
  const [visible, setVisible] = useState(
    () => !localStorage.getItem(STORAGE_KEY)
  )

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    window.dispatchEvent(new Event('consent-change'))
    setVisible(false)
  }

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, 'dismissed')
    window.dispatchEvent(new Event('consent-change'))
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookieinformation"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-navy/10 bg-cream px-6 py-5 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] sm:px-10"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-navy/80">
          Vi använder nödvändiga cookies för att webbplatsen ska fungera
          korrekt. Vi använder även Vercel Analytics – ett cookielöst verktyg
          utan personspårning – för att förstå hur webbplatsen används.{' '}
          <Link
            href="/cookies"
            className="font-medium text-navy underline underline-offset-2 hover:text-mint"
          >
            Läs mer i vår cookiepolicy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={dismiss}
            className="rounded-xl border border-navy/20 bg-transparent px-4 py-2 text-sm font-medium text-navy transition hover:bg-navy/5"
          >
            Avvisa
          </button>
          <button
            onClick={accept}
            className="rounded-xl bg-mint px-4 py-2 text-sm font-medium text-navy transition hover:bg-mint/80"
          >
            Godkänn
          </button>
        </div>
      </div>
    </div>
  )
}
