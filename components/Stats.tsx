'use client'

import { useEffect, useRef } from 'react'

const stats: { value: number; suffix: string; label: string }[] = [
  { value: 12_500, suffix: '+', label: 'Putsade fönster' },
  { value: 500, suffix: '+', label: 'Glada kunder' },
  { value: 24, suffix: ' h', label: 'Svarstid' },
]

function formatValue(v: number): string {
  if (Number.isInteger(v)) {
    return v.toLocaleString('sv-SE')
  }
  return v.toFixed(1).replace('.', ',')
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (reduced) {
      stats.forEach((s, i) => {
        const el = valueRefs.current[i]
        if (el) el.textContent = formatValue(s.value)
      })
      return
    }

    let cancelled = false
    let observer: IntersectionObserver | null = null

    import('animejs').then(({ animate }) => {
      if (cancelled) return
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            stats.forEach((s, i) => {
              const el = valueRefs.current[i]
              if (!el) return
              const target = { v: 0 }
              animate(target, {
                v: s.value,
                duration: 1800,
                ease: 'outExpo',
                onUpdate: () => {
                  el.textContent = formatValue(
                    Number.isInteger(s.value)
                      ? Math.round(target.v)
                      : Math.round(target.v * 10) / 10
                  )
                },
              })
            })
            observer?.disconnect()
          }
        },
        { threshold: 0.35 }
      )
      observer.observe(section)
    })

    return () => {
      cancelled = true
      observer?.disconnect()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-label="Putsson i siffror"
      className="bg-cream py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        <dl className="grid gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((s, i) => (
            <div key={s.label} className="border-l-2 border-mint pl-6">
              <dt className="text-xs font-bold uppercase tracking-[0.3em] text-navy/55">
                {s.label}
              </dt>
              <dd className="mt-3 flex items-baseline gap-1 text-[clamp(2.75rem,6vw,5rem)] font-bold leading-none text-navy">
                <span
                  ref={(el) => {
                    valueRefs.current[i] = el
                  }}
                >
                  0
                </span>
                <span className="text-mint">{s.suffix}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
