import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  siteCity,
  siteEmail,
  siteName,
  sitePhone,
  sitePhoneE164,
  sitePhoneHref,
  siteUrl,
} from '@/lib/site'
import Hero from '@/components/Hero'
import Reveal from '@/components/Reveal'
import Stats from '@/components/Stats'
import Faq from '@/components/Faq'
import About from '@/components/About'
import ContactForm from '@/components/ContactForm'
import { areas } from '@/lib/areas'

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
    title: 'Villa & radhus',
    text: 'Återkommande fönsterputs som passar dig, varannan månad, fyra gånger om året eller bara inför kalaset.',
    color: 'mint' as const,
  },
  {
    title: 'Lägenhet',
    text: 'Bor du i bostadsrätt eller hyresrätt? Vi putsar dina fönster inifrån och utifrån och lämnar dem skinande rena.',
    color: 'navy' as const,
  },
  {
    title: 'Balkonginglasning',
    text: 'Vi tar hand om glas, ramar och kanaler i din balkonginglasning. Professionellt utfört och snabbt klart.',
    color: 'blue' as const,
  },
  {
    title: 'Butiker',
    text: 'Skyltfönster som lockar kunder. Vi putsar när det passar er verksamhet, gärna tidigt på morgonen.',
    color: 'coral' as const,
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
  telephone: sitePhoneE164,
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

      <About />

      <Stats />

      {/* Service areas */}
      <section className="bg-navy py-24 sm:py-32">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-mint/80">
                Serviceområde
              </p>
              <h2 className="mt-4 text-4xl font-bold text-cream sm:text-5xl">
                Vi putsar i hela Göteborgsregionen.
              </h2>
              <p className="mt-5 text-base text-cream/70">
                Från Kungsbacka i söder till Stenungsund i norr! Vi täcker 15
                kommuner och orter kring Göteborg.
              </p>
            </div>
          </Reveal>

          <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {areas.map((area, i) => (
              <Reveal as="li" key={area.slug} delay={i * 40} className="h-full">
                <Link
                  href={`/fonsterputs/${area.slug}`}
                  className="group flex h-full flex-col gap-1 rounded-2xl border border-cream/10 bg-cream/5 px-5 py-4 transition hover:border-mint/40 hover:bg-cream/10"
                >
                  <span className="text-sm font-bold text-cream group-hover:text-mint">
                    {area.name}
                  </span>
                  <span className="text-xs text-cream/50">
                    {area.description}
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

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
              <Reveal key={s.title} delay={i * 90} className="h-full">
                <article
                  className={`group relative h-full overflow-hidden rounded-[28px] p-8 ${colorMap[s.color]}`}
                >
                  <div
                    aria-hidden
                    className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/15 transition-transform duration-500 group-hover:scale-125"
                  />
                  <h3 className="relative text-2xl font-bold">{s.title}</h3>
                  <p className="relative mt-3 max-w-md text-sm opacity-90">
                    {s.text}
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

              <div className="relative grid gap-12 lg:grid-cols-2 lg:items-start">
                {/* Left: heading + contact links */}
                <div className="flex flex-col gap-8">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-navy/70">
                      Kontakt
                    </p>
                    <h2 className="mt-4 text-4xl font-bold text-navy sm:text-5xl">
                      Få ett fast pris idag.
                    </h2>
                    <p className="mt-5 max-w-xl text-base text-navy/80">
                      Fyll i formuläret så återkommer vi snabbt med ett fast
                      pris och förslag på tid. Inga konstigheter.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <a
                      href={sitePhoneHref}
                      className="group flex items-center justify-between rounded-2xl bg-navy px-6 py-5 text-cream transition hover:bg-blue"
                    >
                      <div className="min-w-0">
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
                      <div className="min-w-0">
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

                  <div className="flex items-center gap-4 border-t border-navy/15 pt-6">
                    <Image
                      src="/logo_round_white.png"
                      alt=""
                      width={56}
                      height={56}
                      className="h-14 w-14 rounded-full"
                    />
                    <p className="text-sm text-navy/80">
                      Vi putsar i hela {siteCity} med omnejd. Berätta var du
                      bor, vi anpassar oss.
                    </p>
                  </div>
                </div>

                {/* Right: contact form */}
                <ContactForm />
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
