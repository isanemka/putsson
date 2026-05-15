import Link from 'next/link'
import Reveal from '@/components/Reveal'

const checkItems = [
  'Upp till 30 vanliga fönster',
  'Eller 20 fönster med spröjs',
  'Endast bottenvåning',
]

export default function Offer() {
  return (
    <section
      aria-labelledby="offer-heading"
      className="relative overflow-hidden bg-coral py-24 sm:py-32"
    >
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-white/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-navy/15 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Left: intro */}
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-navy/70">
              Erbjudande
            </p>
            <h2
              id="offer-heading"
              className="mt-4 text-4xl font-bold text-navy sm:text-5xl"
            >
              Fönsterputs för <span className="text-navy">299&nbsp;kr</span>
            </h2>
            <p className="mt-6 max-w-lg text-base text-navy/70">
              Rena fönster utan krångel. Noggrant, prisvärt, snabbt och alltid
              med ett skinande resultat för både hem och företag.
            </p>

            <Link
              href="#kontakt"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-bold text-cream transition hover:bg-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
            >
              Boka nu
              <span aria-hidden>→</span>
            </Link>
          </Reveal>

          {/* Right: offer card */}
          <Reveal delay={120}>
            <div className="rounded-[28px] border border-navy/15 bg-white/30 p-8 sm:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-navy/70">
                Vad ingår
              </p>
              <p className="mt-3 text-lg font-bold text-navy">
                Fönster på bottenvåningen putsade utvändigt för 299&nbsp;kr
                efter RUT-avdrag. Fönsterbleck ingår.
              </p>
              <p className="mt-2 text-sm text-navy/60">
                Gäller vid första putsningen när du startar ett abonnemang.
              </p>

              <ul className="mt-6 space-y-3" role="list">
                {checkItems.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-navy">
                    <span
                      aria-hidden
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy/15 text-navy"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-3 w-3"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 space-y-3 border-t border-navy/15 pt-6 text-sm text-navy/60">
                <p>
                  Vill du lägga till t.ex. uterum eller ovanvåning?{' '}
                  <Link
                    href="#kontakt"
                    className="text-navy underline underline-offset-4 transition hover:text-navy/70"
                  >
                    Kontakta oss för pris.
                  </Link>
                </p>
                <p>
                  Erbjudandet gäller en gång per hushåll och enligt våra
                  villkor.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
