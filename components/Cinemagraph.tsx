import Image from 'next/image'
import { siteCity } from '@/lib/site'

const FRAMES = ['/cleaning/01.jpeg', '/cleaning/02.jpeg', '/cleaning/03.jpeg']

export default function Cinemagraph() {
  return (
    <section
      aria-label="Putsrörelse i loop"
      className="relative isolate overflow-hidden bg-navy text-cream"
    >
      <div className="absolute inset-0">
        {FRAMES.map((src, i) => (
          <div
            key={src}
            className="cinemagraph-frame absolute inset-0"
            style={{ animationDelay: `${i * 1.2}s` }}
          >
            <Image
              src={src}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/60 to-navy/30"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-navy/40"
        />
      </div>

      <div className="relative mx-auto grid min-h-[80vh] w-full max-w-7xl items-center px-6 py-24 sm:px-10 sm:py-32">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-mint">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
            </span>
            Live från en putsning
          </p>
          <h2 className="mt-5 text-4xl font-bold leading-[0.95] sm:text-6xl">
            Såpa.
            <br />
            Skrapa.
            <br />
            <span className="text-mint">Klart.</span>
          </h2>
          <p className="mt-6 max-w-md text-base text-cream/80 sm:text-lg">
            Tre rörelser, ett rent fönster. Så här ser det ut när vi är hos våra
            kunder i {siteCity}.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#kontakt"
              className="group inline-flex items-center gap-2 rounded-full bg-mint px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-navy shadow-[0_18px_40px_-20px_rgba(80,209,193,0.7)] transition hover:-translate-y-0.5 hover:bg-cream"
            >
              Boka putsning
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </a>
            <a
              href="#tjanster"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.15em] text-cream underline decoration-coral decoration-[3px] underline-offset-[6px] transition hover:decoration-mint"
            >
              Se våra tjänster
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
