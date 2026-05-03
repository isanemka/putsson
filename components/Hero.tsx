'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { siteCity } from '@/lib/site'

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement | null>(null)
  const subRef = useRef<HTMLParagraphElement | null>(null)
  const ctaRef = useRef<HTMLDivElement | null>(null)
  const eyebrowRef = useRef<HTMLDivElement | null>(null)
  const visualRef = useRef<HTMLDivElement | null>(null)
  const orbRef = useRef<HTMLDivElement | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    let cancelled = false
    import('animejs').then(({ animate }) => {
      if (cancelled) return

      if (reduced) {
        ;[
          headlineRef.current,
          subRef.current,
          ctaRef.current,
          eyebrowRef.current,
          visualRef.current,
          scrollRef.current,
        ].forEach((el) => {
          if (el) {
            el.style.opacity = '1'
            el.style.transform = 'none'
          }
        })
        headlineRef.current
          ?.querySelectorAll<HTMLElement>('[data-word]')
          .forEach((w) => {
            w.style.opacity = '1'
            w.style.transform = 'none'
          })
        return
      }

      if (eyebrowRef.current) {
        animate(eyebrowRef.current, {
          opacity: [0, 1],
          translateY: [12, 0],
          duration: 700,
          ease: 'outQuart',
        })
      }

      if (headlineRef.current) {
        const words =
          headlineRef.current.querySelectorAll<HTMLElement>('[data-word]')
        words.forEach((w) => {
          w.style.opacity = '0'
          w.style.transform = 'translateY(120%) rotate(2deg)'
          w.style.display = 'inline-block'
        })
        animate(words, {
          opacity: [0, 1],
          translateY: ['120%', '0%'],
          rotate: [2, 0],
          duration: 1100,
          delay: (_: unknown, i: number) => 120 + i * 90,
          ease: 'outExpo',
        })
      }

      if (subRef.current) {
        animate(subRef.current, {
          opacity: [0, 1],
          translateY: [16, 0],
          duration: 900,
          delay: 600,
          ease: 'outQuart',
        })
      }
      if (ctaRef.current) {
        animate(ctaRef.current, {
          opacity: [0, 1],
          translateY: [16, 0],
          duration: 900,
          delay: 800,
          ease: 'outQuart',
        })
      }
      if (visualRef.current) {
        animate(visualRef.current, {
          opacity: [0, 1],
          scale: [0.9, 1],
          duration: 1200,
          delay: 300,
          ease: 'outExpo',
        })
      }
      if (scrollRef.current) {
        animate(scrollRef.current, {
          opacity: [0, 1],
          translateY: [10, 0],
          duration: 800,
          delay: 1300,
          ease: 'outQuart',
        })
      }

      if (orbRef.current) {
        animate(orbRef.current, {
          translateY: [0, -14],
          duration: 4200,
          alternate: true,
          loop: true,
          ease: 'inOutSine',
        })
      }
    })

    return () => {
      cancelled = true
    }
  }, [])

  const headline = ['Glasklart', 'putsat', 'i', siteCity + '.']

  return (
    <section className="relative isolate overflow-hidden bg-cream pt-12 pb-20 sm:pt-20 sm:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-32 h-[560px] w-[560px] rounded-full bg-mint/45 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-72 -left-48 h-[420px] w-[420px] rounded-full bg-coral/30 blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-6 sm:px-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
        <div>
          <div
            ref={eyebrowRef}
            className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.3em] text-navy/70"
            style={{ opacity: 0 }}
          >
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
            </span>
            Bokar nya kunder i {siteCity}
          </div>

          <h1
            ref={headlineRef}
            className="mt-7 text-[clamp(3rem,9vw,7.5rem)] font-bold leading-[0.92] tracking-[-0.02em] text-navy"
          >
            {headline.map((word, i) => (
              <span
                key={`${word}-${i}`}
                className="mr-3 inline-block overflow-hidden align-bottom"
              >
                <span data-word className="inline-block">
                  {i === 0 ? <span className="text-mint">{word}</span> : word}
                </span>
              </span>
            ))}
          </h1>

          <p
            ref={subRef}
            className="mt-8 max-w-xl text-lg text-navy/75 sm:text-xl"
            style={{ opacity: 0 }}
          >
            PUTSSON är fönsterputsaren som gör vardagen ljusare. Villor,
            lägenheter och företag med torra ramar, blanka rutor och ett leende
            på köpet.
          </p>

          <div
            ref={ctaRef}
            className="mt-10 flex flex-wrap items-center gap-4"
            style={{ opacity: 0 }}
          >
            <a
              href="#kontakt"
              className="group inline-flex items-center gap-2 rounded-full bg-navy px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-cream shadow-[0_18px_40px_-20px_rgba(24,23,76,0.7)] transition hover:-translate-y-0.5 hover:bg-blue"
            >
              Få fast pris
              <span
                aria-hidden
                className="text-base transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </a>
            <a
              href="#tjanster"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.15em] text-navy underline decoration-mint decoration-[3px] underline-offset-[6px] transition hover:decoration-coral"
            >
              Våra tjänster
            </a>
          </div>
        </div>

        <div ref={visualRef} className="relative" style={{ opacity: 0 }}>
          <div
            ref={orbRef}
            className="relative mx-auto aspect-square w-full max-w-md"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-mint to-blue" />
            <div
              aria-hidden
              className="absolute inset-0 rounded-full ring-1 ring-inset ring-navy/10"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/logo_man_blue.png"
                alt="PUTSSON-figuren med skrapa och hink"
                width={420}
                height={420}
                priority
                className="h-[92%] w-[92%] object-contain drop-shadow-[0_20px_30px_rgba(24,23,76,0.25)]"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="relative mx-auto mt-16 flex w-full max-w-7xl items-center justify-between gap-6 px-6 text-[11px] font-bold uppercase tracking-[0.3em] text-navy/55 sm:px-10"
        style={{ opacity: 0 }}
        aria-hidden
      >
        <span className="hidden sm:inline">
          Försäkrat · F-skatt · RUT-avdrag
        </span>
      </div>
    </section>
  )
}
