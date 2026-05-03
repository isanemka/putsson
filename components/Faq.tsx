'use client'

import { useState } from 'react'

const items = [
  {
    q: 'Vad kostar det att putsa fönstren?',
    a: 'Vi sätter alltid fast pris baserat på antal fönster, typ och våningsplan. Hör av dig så återkommer vi inom 24 timmar med en tydlig offert — utan bindning.',
  },
  {
    q: 'Behöver jag vara hemma när ni kommer?',
    a: 'Nej. Många av våra kunder ger oss en kod eller nyckel så vi kan komma och putsa medan de är på jobbet. Allt sköts försäkrat och med största varsamhet.',
  },
  {
    q: 'Får jag använda RUT-avdrag?',
    a: 'Ja. Privatpersoner får dra av 50 % av arbetskostnaden direkt på fakturan. Vi sköter administrationen mot Skatteverket åt dig.',
  },
  {
    q: 'Hur ofta bör fönster putsas?',
    a: 'För villor rekommenderar vi 2–4 gånger per år. För butiker och kontor brukar månadsvis vara lagom. Vi hjälper dig välja rätt intervall — inga onödiga besök.',
  },
  {
    q: 'Putsar ni på vintern?',
    a: 'Ja, vi jobbar året runt. Vi använder rent vatten och teknik som fungerar även i kyla, så länge det inte är riktigt djupminusgrader.',
  },
  {
    q: 'Vilka områden täcker ni?',
    a: 'Vi putsar i hela Göteborg med omnejd — från Hisingen och Lundby till Mölndal och Partille. Är du osäker på om vi tar oss till dig? Hör av dig.',
  },
]

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="scroll-mt-24 bg-mist/40 py-24 sm:py-32">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 sm:px-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue">
            Vanliga frågor
          </p>
          <h2 className="mt-4 text-4xl font-bold text-navy sm:text-5xl">
            Allt du undrat över <br className="hidden sm:block" />
            men aldrig vågat fråga.
          </h2>
          <p className="mt-6 max-w-md text-base text-navy/75">
            Hittar du inte svaret? Skicka ett mejl eller ring oss — vi svarar
            samma dag.
          </p>
        </div>

        <ul className="divide-y divide-navy/10 border-y border-navy/10" role="list">
          {items.map((item, i) => {
            const isOpen = open === i
            return (
              <li key={item.q}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-trigger-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="text-lg font-bold text-navy sm:text-xl">
                    {item.q}
                  </span>
                  <span
                    aria-hidden
                    className={`grid h-10 w-10 flex-none place-items-center rounded-full border border-navy/20 text-navy transition-transform duration-300 ${
                      isOpen ? 'rotate-45 bg-mint border-mint' : ''
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M7 1v12M1 7h12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  hidden={!isOpen}
                  className="pb-7 pr-16 text-base text-navy/75"
                >
                  {item.a}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
