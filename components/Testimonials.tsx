import Reveal from './Reveal'

type Review = {
  quote: string
  name: string
  role: string
  color: 'mint' | 'coral' | 'mist' | 'cream'
}

const reviews: Review[] = [
  {
    quote:
      'Otroligt prickfritt jobb. Rutorna såg ut som att de inte ens fanns där efteråt.',
    name: 'Anna L.',
    role: 'Villaägare, Hisingen',
    color: 'mint',
  },
  {
    quote:
      'Vårt skyltfönster lyfter hela butiken nu. Vi har bokat dem som löpande avtal.',
    name: 'Markus B.',
    role: 'Butikschef, Linnégatan',
    color: 'coral',
  },
  {
    quote:
      'Snabb återkoppling, fast pris och proffsigt utfört. Rekommenderas varmt till BRF:er.',
    name: 'Eva H.',
    role: 'Styrelseordförande, BRF Olskroken',
    color: 'cream',
  },
  {
    quote:
      'Kom när det passade oss, lämnade ingen blöt fönsterbänk. Tack PUTSSON!',
    name: 'Johan S.',
    role: 'Lägenhet, Majorna',
    color: 'mist',
  },
  {
    quote:
      'Sjukt nöjd. De putsade både ute och inne på en eftermiddag — och var hur trevliga som helst.',
    name: 'Sara T.',
    role: 'Villa, Örgryte',
    color: 'mint',
  },
  {
    quote:
      'Bästa fönsterputsen vi haft. Period. Avtalet rullar på i bakgrunden, vi behöver inte tänka på det.',
    name: 'Linus K.',
    role: 'Kontorschef, Lindholmen',
    color: 'coral',
  },
]

const tone: Record<Review['color'], string> = {
  mint: 'bg-mint text-navy',
  coral: 'bg-coral text-navy',
  mist: 'bg-mist text-navy',
  cream: 'bg-cream text-navy ring-1 ring-inset ring-navy/10',
}

function Stars() {
  return (
    <div className="flex gap-1" aria-label="5 av 5 stjärnor">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <path
            d="M8 1.5l1.92 4.13 4.58.46-3.42 3.06.92 4.45L8 11.4l-4 2.2.92-4.45L1.5 6.09l4.58-.46L8 1.5z"
            fill="currentColor"
          />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section
      id="recensioner"
      className="scroll-mt-24 bg-cream py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        <Reveal>
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-coral">
                Recensioner
              </p>
              <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
                Folk i Göteborg pratar gärna om sina fönster.
              </h2>
            </div>
            <div className="flex items-center gap-3 rounded-full bg-navy px-5 py-3 text-cream">
              <span className="text-mint">
                <Stars />
              </span>
              <span className="text-sm font-bold">4,9 / 5</span>
              <span className="text-xs text-cream/70">· 200+ omdömen</span>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 70}>
              <article
                className={`flex h-full flex-col justify-between rounded-3xl p-7 ${tone[r.color]}`}
              >
                <Stars />
                <p className="mt-5 text-lg font-medium leading-snug">
                  &ldquo;{r.quote}&rdquo;
                </p>
                <footer className="mt-8 border-t border-current/10 pt-4">
                  <p className="text-sm font-bold">{r.name}</p>
                  <p className="text-xs opacity-70">{r.role}</p>
                </footer>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
