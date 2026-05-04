'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const SOAPY = '/cleaning/01.jpeg'
const CLEAN = '/cleaning/08.jpeg'

export default function InteractiveWindow() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const soapyImgRef = useRef<HTMLImageElement | null>(null)
  const lastPoint = useRef<{ x: number; y: number } | null>(null)
  const [revealed, setRevealed] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false)

  const paint = useCallback(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    const img = soapyImgRef.current
    if (!canvas || !wrap || !img) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = wrap.clientWidth
    const h = wrap.clientHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.globalCompositeOperation = 'source-over'
    const ir = img.width / img.height
    const cr = w / h
    let dw = w
    let dh = h
    let dx = 0
    let dy = 0
    if (ir > cr) {
      dh = h
      dw = h * ir
      dx = (w - dw) / 2
    } else {
      dw = w
      dh = w / ir
      dy = (h - dh) / 2
    }
    ctx.drawImage(img, dx, dy, dw, dh)
    setRevealed(0)
  }, [])

  useEffect(() => {
    const img = new window.Image()
    img.src = SOAPY
    img.onload = () => {
      soapyImgRef.current = img
      paint()
    }

    const ro = new ResizeObserver(() => paint())
    if (wrapRef.current) ro.observe(wrapRef.current)
    return () => ro.disconnect()
  }, [paint])

  const erase = (x: number, y: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.globalCompositeOperation = 'destination-out'
    const radius = Math.max(40, canvas.clientWidth * 0.08)
    const prev = lastPoint.current
    if (prev) {
      // draw a thick line from prev to current for smooth wiping
      ctx.lineWidth = radius * 2
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.beginPath()
      ctx.moveTo(prev.x, prev.y)
      ctx.lineTo(x, y)
      ctx.stroke()
    }
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
    lastPoint.current = { x, y }
  }

  // Throttled progress sampling — checks alpha across a downsampled grid.
  const sampleRevealed = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const step = 20
    const w = canvas.width
    const h = canvas.height
    const data = ctx.getImageData(0, 0, w, h).data
    let cleared = 0
    let total = 0
    for (let y = 0; y < h; y += step) {
      for (let x = 0; x < w; x += step) {
        const a = data[(y * w + x) * 4 + 3]
        if (a < 32) cleared++
        total++
      }
    }
    setRevealed(cleared / total)
  }

  const handleMove = (clientX: number, clientY: number) => {
    const wrap = wrapRef.current
    if (!wrap) return
    const rect = wrap.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    erase(x, y)
    if (!hasInteracted) setHasInteracted(true)
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    lastPoint.current = null
    handleMove(e.clientX, e.clientY)
  }
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.buttons === 0 && e.pointerType === 'mouse') {
      // hover wiping for mouse, even without click
      handleMove(e.clientX, e.clientY)
      return
    }
    if (e.buttons > 0 || e.pointerType !== 'mouse') {
      handleMove(e.clientX, e.clientY)
    }
  }
  const handlePointerUp = () => {
    lastPoint.current = null
    sampleRevealed()
  }

  return (
    <section
      id="putsa-sjalv"
      className="scroll-mt-24 bg-cream py-24 sm:py-32"
      aria-label="Interaktiv fönsterputs"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue">
            Prova själv
          </p>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
            Putsa rutan ren.
          </h2>
          <p className="mt-5 max-w-md text-lg text-navy/75">
            Dra fingret eller musen över glaset. Såpan försvinner — utsikten
            kommer fram. Ungefär så känns det när vi varit hos dig.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <div className="h-1 w-48 overflow-hidden rounded-full bg-navy/10">
              <div
                className="h-full rounded-full bg-mint transition-[width] duration-200"
                style={{ width: `${Math.round(revealed * 100)}%` }}
              />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-navy/55">
              {Math.round(revealed * 100)}% rent
            </span>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 rounded-full bg-navy px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-cream shadow-[0_18px_40px_-20px_rgba(24,23,76,0.7)] transition hover:-translate-y-0.5 hover:bg-blue"
            >
              Boka putsning
              <span aria-hidden>→</span>
            </a>
            <button
              type="button"
              onClick={paint}
              className="text-sm font-bold uppercase tracking-[0.15em] text-navy/70 underline decoration-coral decoration-[3px] underline-offset-[6px] transition hover:text-navy"
            >
              Såpa om
            </button>
          </div>
        </div>

        <div
          ref={wrapRef}
          className="relative mx-auto aspect-[9/16] w-full max-w-sm overflow-hidden rounded-[32px] bg-navy shadow-[0_30px_80px_-30px_rgba(24,23,76,0.45)] ring-1 ring-navy/10 lg:max-w-md"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={CLEAN}
            alt="Putsat fönster med utsikt mot trädgården"
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="absolute inset-0 h-full w-full touch-none cursor-crosshair select-none"
            aria-label="Dra för att putsa fönstret rent"
          />
          {!hasInteracted && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center"
            >
              <span className="rounded-full bg-navy/80 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.3em] text-cream backdrop-blur-sm">
                Dra för att putsa →
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
