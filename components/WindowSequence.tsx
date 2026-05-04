'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const FRAMES = [
  '/cleaning/01.jpg',
  '/cleaning/02.jpg',
  '/cleaning/03.jpg',
  '/cleaning/04.jpg',
  '/cleaning/05.jpg',
  '/cleaning/06.jpg',
  '/cleaning/07.jpg',
  '/cleaning/08.jpg',
]

export default function WindowSequence() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    let raf = 0
    const update = () => {
      raf = 0
      if (reduced) {
        setProgress(1)
        return
      }
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const total = rect.height - vh
      const scrolled = Math.min(Math.max(-rect.top, 0), total)
      setProgress(total > 0 ? scrolled / total : 0)
    }
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(update)
    }
    raf = requestAnimationFrame(update)
    if (!reduced) {
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll)
    }
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  // Map progress (0..1) to a floating frame index for crossfade
  const exact = progress * (FRAMES.length - 1)
  const activeIndex = Math.floor(exact)
  const blend = exact - activeIndex

  return (
    <section
      aria-label="Så ser det ut när vi putsar"
      className="relative bg-navy text-cream"
    >
      <div ref={containerRef} className="relative h-[400vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-mint">
                Hantverket
              </p>
              <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
                Scrolla — så putsar vi rent.
              </h2>
              <p className="mt-5 max-w-md text-base text-cream/75">
                Varje rörelse räknas. Såpa, skrapa, torka — tills rutan är
                osynlig och utsikten talar för sig själv.
              </p>
              <div className="mt-8 h-1 w-full max-w-xs overflow-hidden rounded-full bg-cream/15">
                <div
                  className="h-full rounded-full bg-mint transition-[width] duration-150"
                  style={{ width: `${Math.round(progress * 100)}%` }}
                />
              </div>
              <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.3em] text-cream/50">
                Steg {Math.min(activeIndex + 1, FRAMES.length)} /{' '}
                {FRAMES.length}
              </p>
            </div>

            <div className="relative mx-auto aspect-[9/16] w-full max-w-sm overflow-hidden rounded-[32px] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] ring-1 ring-cream/10 lg:max-w-md">
              {FRAMES.map((src, i) => {
                let opacity = 0
                if (i === activeIndex) opacity = 1 - blend
                else if (i === activeIndex + 1) opacity = blend
                else if (
                  activeIndex >= FRAMES.length - 1 &&
                  i === FRAMES.length - 1
                )
                  opacity = 1
                return (
                  <Image
                    key={src}
                    src={src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 28rem, 90vw"
                    priority={i < 2}
                    className="object-cover"
                    style={{
                      opacity,
                      transition: 'opacity 120ms linear',
                    }}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
