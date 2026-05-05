'use client'

import React, { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'article' | 'header' | 'footer' | 'li'
}

export default function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: Props) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (reduced) {
      el.style.opacity = '1'
      el.style.transform = 'none'
      return
    }

    // Hide the element now that JS is running and we're about to animate
    el.style.opacity = '0'
    el.style.transform = 'translateY(28px)'

    const revealFallback = () => {
      el.style.opacity = '1'
      el.style.transform = 'none'
    }

    if (!('IntersectionObserver' in window)) {
      revealFallback()
      return
    }

    let cancelled = false
    let observer: IntersectionObserver | null = null

    import('animejs')
      .then(({ animate }) => {
        if (cancelled) return
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && entry.target === el) {
                animate(el, {
                  opacity: [0, 1],
                  translateY: [28, 0],
                  duration: 900,
                  delay,
                  ease: 'outQuart',
                })
                observer?.disconnect()
              }
            })
          },
          { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
        )
        observer.observe(el)
      })
      .catch(revealFallback)

    return () => {
      cancelled = true
      observer?.disconnect()
    }
  }, [delay])

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={`reveal ${className}`.trim()}>
      {children}
    </Tag>
  )
}
