import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  siteEmail,
  siteName,
  sitePhone,
  sitePhoneE164,
  sitePhoneHref,
  siteUrl,
} from '@/lib/site'
import { areas, getAreaBySlug } from '@/lib/areas'
import Reveal from '@/components/Reveal'
import ContactForm from '@/components/ContactForm'

type Props = {
  params: Promise<{ ort: string }>
}

export function generateStaticParams() {
  return areas.map((area) => ({ ort: area.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ort } = await params
  const area = getAreaBySlug(ort)
  if (!area) return {}

  const title = `Fönsterputs i ${area.name}`
  return {
    title,
    description: area.metaDescription,
    openGraph: {
      title: `${siteName} | ${title}`,
      description: area.metaDescription,
      url: `${siteUrl}/fonsterputs/${area.slug}`,
    },
    alternates: {
      canonical: `${siteUrl}/fonsterputs/${area.slug}`,
    },
  }
}

const steps = [
  {
    number: '01',
    title: 'Hör av dig',
    text: 'Fyll i formuläret eller ring oss. Vi svarar snabbt med ett fast pris utan dolda avgifter.',
  },
  {
    number: '02',
    title: 'Välj tid',
    text: 'Du väljer ett datum som passar. Vi är flexibla med tider — tidigt på morgonen eller efter jobbet.',
  },
  {
    number: '03',
    title: 'Vi putsar',
    text: 'Våra putsare kommer till dig, utför jobbet och lämnar skinande rena fönster. Klart.',
  },
]

export default async function OrtPage({ params }: Props) {
  const { ort } = await params
  const area = getAreaBySlug(ort)
  if (!area) notFound()

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: siteName,
    url: `${siteUrl}/fonsterputs/${area.slug}`,
    email: siteEmail,
    telephone: sitePhoneE164,
    description: area.metaDescription,
    areaServed: {
      '@type': 'City',
      name: area.name,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: area.name,
      addressRegion: 'Västra Götaland',
      addressCountry: 'SE',
    },
  }

  return (
    <main id="main-content" className="bg-cream text-navy">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy py-24 sm:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-mint/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-blue/20 blur-3xl"
        />
        <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-10">
          <nav aria-label="Brödsmula" className="mb-8">
            <ol className="flex items-center gap-2 text-xs text-cream/50">
              <li>
                <Link href="/" className="hover:text-cream">
                  Hem
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-cream/80">{area.name}</li>
            </ol>
          </nav>

          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-mint/80">
              Fönsterputs i {area.name}
            </p>
            <h1 className="mt-4 text-5xl font-bold text-cream sm:text-7xl">
              Skinande rena fönster i{' '}
              <span className="text-mint">{area.name}.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-cream/75">
              PUTSSON erbjuder professionell fönsterputsning för villor,
              lägenheter och företag i {area.name} och kringliggande områden som{' '}
              {area.nearby.slice(0, 3).join(', ')}.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#kontakt"
                className="inline-flex items-center gap-2 rounded-full bg-mint px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-navy shadow-[0_18px_40px_-20px_rgba(24,23,76,0.5)] transition hover:-translate-y-0.5"
              >
                Få fast pris
              </a>
              <a
                href={sitePhoneHref}
                className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-cream transition hover:border-cream/50"
              >
                {sitePhone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* USP strip */}
      <section
        aria-label="Fördelar"
        className="border-y border-navy/10 bg-cream py-10"
      >
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
          <ul className="grid gap-6 sm:grid-cols-3">
            {[
              {
                label: 'Fast pris',
                detail: 'Inga dolda avgifter eller timkostnader.',
              },
              {
                label: 'Lokalt i ' + area.name,
                detail: 'Putsare som känner till ditt område.',
              },
              {
                label: 'Snabb återkoppling',
                detail: 'Svar inom 24 timmar, alltid.',
              },
            ].map((usp) => (
              <li key={usp.label} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mint text-xs font-bold text-navy"
                >
                  ✓
                </span>
                <div>
                  <p className="text-sm font-bold">{usp.label}</p>
                  <p className="text-sm text-navy/60">{usp.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-cream py-24 sm:py-32">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
          <Reveal>
            <div className="max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue">
                Så funkar det
              </p>
              <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
                Tre steg till rena fönster.
              </h2>
            </div>
          </Reveal>

          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal key={step.number} delay={i * 100} className="h-full">
                <li className="h-full rounded-3xl border border-navy/10 bg-white p-8">
                  <span className="text-4xl font-bold text-navy/10">
                    {step.number}
                  </span>
                  <h3 className="mt-4 text-xl font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm text-navy/65">{step.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Contact */}
      <section
        id="kontakt"
        aria-labelledby="kontakt-heading"
        className="scroll-mt-24 bg-cream py-24 sm:py-32"
      >
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
                <div className="flex flex-col gap-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-navy/70">
                      Kontakt
                    </p>
                    <h2
                      id="kontakt-heading"
                      className="mt-4 text-4xl font-bold text-navy sm:text-5xl"
                    >
                      Få ett fast pris i {area.name}.
                    </h2>
                    <p className="mt-5 max-w-xl text-base text-navy/80">
                      Fyll i formuläret så återkommer vi snabbt med ett fast
                      pris och förslag på tid i {area.name}.
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

                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Other areas */}
      <section className="bg-cream pb-24 sm:pb-32">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
          <p className="mb-6 text-sm font-bold text-navy/50">
            Andra orter vi servar
          </p>
          <ul className="flex flex-wrap gap-3">
            {areas
              .filter((a) => a.slug !== area.slug)
              .map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/fonsterputs/${a.slug}`}
                    className="rounded-full border border-navy/15 px-4 py-2 text-sm text-navy/70 transition hover:border-navy/40 hover:text-navy"
                  >
                    {a.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
    </main>
  )
}
