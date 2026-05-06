import Image from 'next/image'
import Reveal from './Reveal'

const steps = [
  {
    n: '01',
    title: 'Hör av dig',
    text: 'Berätta om dina fönster - antal, typ och hur ofta du vill ha besök.',
  },
  {
    n: '02',
    title: 'Få fast pris',
    text: 'Vi återkommer inom 24 timmar med ett tydligt och fast pris.',
  },
  {
    n: '03',
    title: 'Vi putsar',
    text: 'Du behöver inte vara hemma. När vi gått är rutorna rena och blecken blanka.',
  },
]

export default function About() {
  return (
    <section
      id="omoss"
      aria-labelledby="omoss-heading"
      className="relative isolate scroll-mt-24 overflow-hidden bg-navy text-cream"
    >
      <div className="absolute inset-0">
        <Image
          src="/img/03.jpeg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-r from-navy/90 via-navy/60 to-navy/50"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-navy/70 via-transparent to-navy/40"
        />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl gap-14 px-6 py-24 sm:px-10 sm:py-32 md:grid-cols-[1fr_1fr] md:items-center">
        <Reveal>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-mint">
              Om PUTSSON
            </p>
            <h2
              id="omoss-heading"
              className="mt-4 text-4xl font-bold sm:text-5xl"
            >
              Vi gillar fönster lika mycket som du gillar utsikten.
            </h2>
            <p className="mt-5 text-base text-cream/80">
              PUTSSON startades i Göteborg av människor som brinner för rena
              fönster och blanka fönsterbleck. Vi är ett litet team som kan vårt
              hantverk: rena verktyg, kontrollerat vatten, ordning och reda.
              Inga genvägar, inget halvdant.
            </p>
            <p className="mt-4 text-base text-cream/80">
              Vi är försäkrade, har F-skatt och pratar gärna med dig
              personligen. Du når oss på telefon, oftast direkt.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {['RUT-avdrag', 'F-skatt', 'Försäkrat', 'Miljövänligt'].map(
                (t) => (
                  <span
                    key={t}
                    className="rounded-full border border-cream/20 px-4 py-2 text-xs font-medium uppercase tracking-[0.25em]"
                  >
                    {t}
                  </span>
                )
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="grid gap-4">
            {steps.map((s) => (
              <div
                key={s.n}
                className="flex items-start gap-5 rounded-3xl border border-cream/10 bg-navy/60 p-6 backdrop-blur-md"
              >
                <span className="text-3xl font-bold text-mint">{s.n}</span>
                <div>
                  <h3 className="text-lg font-bold text-cream">{s.title}</h3>
                  <p className="mt-1 text-sm text-cream/75">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
