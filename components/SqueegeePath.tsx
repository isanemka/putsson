'use client'

import { useEffect, useRef } from 'react'

const PATH_D = 'M 20 70 C 160 -10, 280 150, 440 70 S 720 -10, 860 70'

export default function SqueegeePath() {
  const motionRef = useRef<SVGPathElement | null>(null)
  const trailRef = useRef<SVGPathElement | null>(null)
  const squeegeeRef = useRef<SVGGElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const motionPath = motionRef.current
    const trail = trailRef.current
    const squeegee = squeegeeRef.current
    const container = containerRef.current
    if (!motionPath || !trail || !squeegee || !container) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    let cancelled = false
    let cleanup: (() => void) | null = null

    import('animejs').then(({ animate, svg }) => {
      if (cancelled) return

      const motion = svg.createMotionPath(motionPath)
      const [drawable] = svg.createDrawable(trail)

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue

            animate(squeegee, {
              ...motion,
              duration: 4500,
              ease: 'inOutSine',
              loop: true,
              alternate: true,
            })

            animate(drawable, {
              draw: ['0 0', '0 1', '1 1'],
              duration: 4500,
              ease: 'inOutSine',
              loop: true,
              alternate: true,
            })

            observer.disconnect()
          }
        },
        { threshold: 0.25 }
      )

      observer.observe(container)
      cleanup = () => observer.disconnect()
    })

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="relative mx-auto w-full max-w-6xl px-6 sm:px-10"
    >
      <svg
        viewBox="0 0 880 140"
        className="h-24 w-full sm:h-32"
        role="presentation"
      >
        {/* Faint guide line for the S-curve */}
        <path
          ref={motionRef}
          d={PATH_D}
          fill="none"
          stroke="rgba(24,23,76,0.08)"
          strokeWidth="1"
          strokeLinecap="round"
        />
        {/* Mint "putsad" trail drawn behind the squeegee */}
        <path
          ref={trailRef}
          d={PATH_D}
          fill="none"
          stroke="var(--color-mint)"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.85"
        />
        {/* Squeegee that rides the path */}
        <g ref={squeegeeRef} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
          <g transform="translate(-26 -22)">
            {/* Rubber blade */}
            <rect
              x="0"
              y="32"
              width="52"
              height="8"
              rx="3"
              fill="var(--color-navy)"
            />
            {/* Metal channel */}
            <rect
              x="4"
              y="22"
              width="44"
              height="12"
              rx="3"
              fill="var(--color-mist)"
            />
            {/* Handle */}
            <rect
              x="20"
              y="2"
              width="12"
              height="22"
              rx="3"
              fill="var(--color-coral)"
            />
            {/* Highlight */}
            <rect
              x="22"
              y="4"
              width="3"
              height="18"
              rx="1.5"
              fill="rgba(255,255,255,0.5)"
            />
          </g>
        </g>
      </svg>
    </div>
  )
}
