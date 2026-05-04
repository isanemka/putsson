import Image from 'next/image'
import Reveal from './Reveal'

export default function BeforeAfter() {
  return (
    <section
      aria-label="Före och efter på samma fönster"
      className="bg-cream py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue">
              Före & efter
            </p>
            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              Skillnaden syns <span className="squeegee">på samma ruta</span>.
            </h2>
            <p className="mt-5 text-lg text-navy/75">
              Vänster ruta är klar — utsikten talar för sig själv. Höger ruta är
              mitt i jobbet. Samma fönster, samma ljus, ett par minuters
              skillnad.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <figure className="relative mt-14 overflow-hidden rounded-[36px] bg-navy shadow-[0_40px_100px_-40px_rgba(24,23,76,0.5)] ring-1 ring-navy/10">
            <Image
              src="/cleaning/04.jpeg"
              alt="Fönster där vänstra rutan är nyputsad och klar medan högra rutan fortfarande har såpa och putsas"
              width={1600}
              height={2133}
              sizes="(min-width: 1024px) 1200px, 100vw"
              className="h-auto w-full object-cover"
              priority={false}
            />

            <span
              aria-hidden
              className="pointer-events-none absolute left-[6%] top-[18%] hidden items-center gap-2 rounded-full bg-mint px-4 py-2 text-[11px] font-bold uppercase tracking-[0.3em] text-navy shadow-lg sm:inline-flex"
            >
              <span className="h-2 w-2 rounded-full bg-navy" />
              Klart
            </span>
            <span
              aria-hidden
              className="pointer-events-none absolute right-[6%] top-[18%] hidden items-center gap-2 rounded-full bg-coral px-4 py-2 text-[11px] font-bold uppercase tracking-[0.3em] text-navy shadow-lg sm:inline-flex"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-navy opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-navy" />
              </span>
              Pågår
            </span>

            <figcaption className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 bg-gradient-to-t from-navy/85 via-navy/55 to-transparent p-6 text-cream sm:p-10">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-mint">
                  Riktigt jobb, riktigt fönster
                </p>
                <p className="mt-2 max-w-md text-sm text-cream/85 sm:text-base">
                  Inga stockfoton. Det här är en av våra rutiner i Göteborg —
                  fångad mitt i rörelsen.
                </p>
              </div>
              <a
                href="#kontakt"
                className="group inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-navy transition hover:-translate-y-0.5 hover:bg-mint"
              >
                Boka oss
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
