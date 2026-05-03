'use client'

import { useEffect, useRef } from 'react'

type Tile = {
  label: string
  bg: 'mint' | 'blue' | 'coral' | 'navy' | 'mist'
  emoji?: string
  caption?: string
}

const tiles: Tile[] = [
  { label: 'Villor & radhus', bg: 'mint', caption: 'Fönsterputs ute & inne' },
  { label: 'Lägenheter', bg: 'coral', caption: 'Smidigt & snabbt' },
  { label: 'Företag', bg: 'blue', caption: 'Återkommande avtal' },
  { label: 'Butiker', bg: 'navy', caption: 'Skyltfönster i toppskick' },
  { label: 'Balkonginglasning', bg: 'mist', caption: 'Glas, ramar, kanaler' },
  { label: 'Solpaneler', bg: 'mint', caption: 'Mer ljus, mer effekt' },
  { label: 'Takfönster', bg: 'coral', caption: 'Säkert & varsamt' },
  { label: 'Flyttputs', bg: 'blue', caption: 'In- och utflytt' },
]

const bgClass: Record<Tile['bg'], string> = {
  mint: 'bg-mint text-navy',
  blue: 'bg-blue text-cream',
  coral: 'bg-coral text-navy',
  navy: 'bg-navy text-cream',
  mist: 'bg-mist text-navy',
}

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (reduced) return

    let raf = 0
    let lastY = window.scrollY
    let velocityBoost = 1

    const onScroll = () => {
      const y = window.scrollY
      const delta = y - lastY
      lastY = y
      velocityBoost = Math.min(3, 1 + Math.abs(delta) * 0.06)
      track.style.animationDuration = `${Math.max(20, 60 / velocityBoost)}s`
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        velocityBoost = 1
        track.style.animationDuration = '60s'
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  const repeated = [...tiles, ...tiles]

  return (
    <section
      id="galleri"
      aria-label="Vad vi putsar"
      className="marquee relative overflow-hidden border-y border-navy/10 bg-cream py-10"
    >
      <div
        ref={trackRef}
        className="marquee-track flex w-max gap-5 will-change-transform"
      >
        {repeated.map((t, i) => (
          <article
            key={`${t.label}-${i}`}
            className={`flex h-56 w-72 flex-col justify-between rounded-3xl px-7 py-6 shadow-[0_18px_40px_-30px_rgba(24,23,76,0.6)] sm:h-64 sm:w-80 ${bgClass[t.bg]}`}
          >
            <div>
              <h3 className="text-2xl font-bold leading-tight">{t.label}</h3>
              {t.caption ? (
                <p className="mt-2 text-sm font-medium opacity-85">
                  {t.caption}
                </p>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function SqueegeeIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 21l7-7M16 10l3-3m-1 0l3 3-7 7-3-3 7-7z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="22" cy="6" r="2" fill="currentColor" />
    </svg>
  )
}
