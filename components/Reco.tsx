'use client'

import { useState, useSyncExternalStore } from 'react'
import { CONSENT_CHANGE_EVENT, getConsentValue } from '@/lib/consent'

const RECO_WIDGET_SRC =
  'https://widget.reco.se/v2/venues/6089819/horizontal/xlarge?inverted=false&border=true&lang=sv'

function subscribe(onChange: () => void) {
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange)
  return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange)
}

// The widget is a third-party embed, so it stays unloaded until the visitor
// accepts cookies site-wide or opts in to this one embed.
export default function Reco() {
  const consent = useSyncExternalStore(subscribe, getConsentValue, () => null)
  const [optedIn, setOptedIn] = useState(false)

  const showWidget = consent === 'accepted' || optedIn

  return (
    <section
      aria-label="Kundomdömen från Reco"
      className="bg-cream py-12 sm:py-16"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        {showWidget ? (
          <iframe
            src={RECO_WIDGET_SRC}
            title="Putsson AB - Omdömen på Reco"
            height={225}
            loading="lazy"
            className="block w-full overflow-hidden border-0"
          />
        ) : (
          <div className="flex min-h-[225px] flex-col items-center justify-center gap-4 rounded-3xl border border-navy/15 px-6 py-10 text-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue">
                Omdömen
              </p>
              <h2 className="mt-3 text-2xl font-bold text-navy">
                Se vad våra kunder säger
              </h2>
              <p className="mx-auto mt-3 max-w-md text-base text-navy/75">
                Omdömena hämtas från reco.se, som kan lagra kakor i din
                webbläsare.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOptedIn(true)}
              className="rounded-full bg-navy px-6 py-3 text-sm font-bold text-cream transition hover:bg-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
            >
              Visa omdömen
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
