import type { Metadata } from 'next'
import Image from 'next/image'
import {
  siteCity,
  siteEmail,
  siteName,
  sitePhone,
  sitePhoneHref,
  siteUrl,
} from '@/lib/site'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import Reveal from '@/components/Reveal'
import Stats from '@/components/Stats'
import Faq from '@/components/Faq'
import About from '@/components/About'

export const metadata: Metadata = {
  title: 'Fönsterputs i Göteborg',
  description:
    'PUTSSON putsar fönster åt villor, lägenheter och företag i Göteborg. Boka enstaka tillfälle eller löpande avtal - vi sköter resten.',
  openGraph: {
    title: `${siteName} | Fönsterputs i Göteborg`,
    description:
      'Pålitlig fönsterputs i Göteborg. Boka enstaka tillfälle eller löpande avtal.',
    url: siteUrl,
  },
}

const services = [
  {
    title: 'Hem & villa',
    text: 'Återkommande fönsterputs som passar din takt — varannan månad, fyra gånger om året eller bara inför kalaset.',
    color: 'mint' as const,
  },
  {
    title: 'Företag & butik',
    text: 'Skyltfönster och kontor som ser inbjudande ut. Vi kommer när det passar er — gärna före öppning.',
    color: 'coral' as const,
  },
  {
    title: 'Bostadsrättsförening',
    text: 'Trapphus, entréer och gemensamma fönster. Avtal med fast pris och pålitliga rutiner.',
    color: 'blue' as const,
  },
  {
    title: 'Flyttputs',
    text: 'In- eller utflytt? Vi gör fönstren skinande rena så besiktningen blir det minsta du behöver oroa dig för.',
    color: 'navy' as const,
  },
]

const colorMap = {
  mint: 'bg-mint text-navy',
  coral: 'bg-coral text-navy',
  blue: 'bg-blue text-cream',
  navy: 'bg-navy text-cream',
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: siteName,
  url: siteUrl,
  email: siteEmail,
  telephone: sitePhone,
  description:
    'Fönsterputsare i Göteborg som tar hand om villor, lägenheter, företag och bostadsrättsföreningar.',
  areaServed: {
    '@type': 'City',
    name: siteCity,
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: siteCity,
    addressRegion: 'Västra Götaland',
    addressCountry: 'SE',
  },
}

export default function Home() {
  return (
    <main id="main-content" className="bg-cream text-navy">
      <Hero />

      <Marquee />

      <About />

      <Stats />

      <section id="tjanster" className="scroll-mt-24 bg-cream py-24 sm:py-32">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue">
                Tjänster
              </p>
              <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
                Allt som har <span className="squeegee">glas</span>, putsar vi.
              </h2>
              <p className="mt-5 text-lg text-navy/75">
                Vi anpassar oss efter dig. Engångsuppdrag eller löpande avtal,
                det viktiga är att fönstren blir rätt putsade och att du kan
                tänka på något annat.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 90}>
                <article
                  className={`group relative h-full overflow-hidden rounded-[28px] p-8 transition hover:-translate-y-1 ${colorMap[s.color]}`}
                >
                  <div
                    aria-hidden
                    className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/15 transition-transform duration-500 group-hover:scale-125"
                  />
                  <h3 className="relative text-2xl font-bold">{s.title}</h3>
                  <p className="relative mt-3 max-w-md text-sm opacity-90">
                    {s.text}
                  </p>
                  <p className="relative mt-8 text-xs font-bold uppercase tracking-[0.25em] opacity-80">
                    Läs mer →
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Faq />

      <section id="kontakt" className="scroll-mt-24 bg-cream py-24 sm:py-32">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
          <Reveal>
            <div className="relative overflow-hidden rounded-[36px] bg-mint p-10 sm:p-16">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-coral/60 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-blue/40 blur-3xl"
              />
              <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-navy/70">
                    Kontakt
                  </p>
                  <h2 className="mt-4 text-4xl font-bold text-navy sm:text-6xl">
                    Få ett fast pris idag.
                  </h2>
                  <p className="mt-5 max-w-xl text-base text-navy/80">
                    Skriv eller ring så återkommer vi snabbt med ett fast pris
                    och förslag på tid. Inga konstigheter.
                  </p>
                </div>
                <div className="space-y-3">
                  <a
                    href={sitePhoneHref}
                    className="group flex items-center justify-between rounded-2xl bg-navy px-6 py-5 text-cream transition hover:bg-blue"
                  >
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-mint">
                        Ring oss
                      </p>
                      <p className="mt-1 text-lg font-bold">{sitePhone}</p>
                    </div>
                    <span
                      aria-hidden
                      className="text-xl transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                  <a
                    href={`mailto:${siteEmail}`}
                    className="group flex items-center justify-between rounded-2xl border border-navy/20 bg-cream px-6 py-5 text-navy transition hover:border-navy/50"
                  >
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue">
                        Mejla oss
                      </p>
                      <p className="mt-1 text-lg font-bold">{siteEmail}</p>
                    </div>
                    <span
                      aria-hidden
                      className="text-xl transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                </div>
              </div>

              <div className="relative mt-12 flex items-center gap-4 border-t border-navy/15 pt-8">
                <Image
                  src="/logo_round_white.png"
                  alt=""
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-full"
                />
                <p className="text-sm text-navy/80">
                  Vi putsar i hela {siteCity} med omnejd. Berätta var du bor —
                  vi anpassar oss.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
    </main>
  )
}
