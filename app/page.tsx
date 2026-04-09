import type { Metadata } from 'next'
import { siteName, siteUrl } from '@/lib/site'

// TODO: Update page metadata to your real value proposition.
export const metadata: Metadata = {
  title: 'Startsida',
  description: 'TODO: Kort beskrivning av startsidans erbjudande.',
  openGraph: {
    title: `${siteName} | Startsida`,
    description: 'TODO: Kort beskrivning för Open Graph.',
    url: siteUrl,
  },
}

// TODO: Replace schema fields with real company details.
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: siteName,
  url: siteUrl,
  email: 'info@foretagsnamn.se',
  telephone: '+46-70-1234567',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Stockholm',
    addressRegion: 'Stockholms län',
    addressCountry: 'SE',
  },
}

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_circle_at_12%_12%,#0ea5e9,transparent_55%),radial-gradient(900px_circle_at_85%_-10%,#f59e0b,transparent_45%)] opacity-35" />
      <main
        id="main-content"
        className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-16 px-6 pb-24 pt-20 sm:px-10"
      >
        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            {/* TODO: Replace hero label, headline, and intro with your real copy. */}
            <p className="text-sm uppercase tracking-[0.3em] text-slate-300">
              TODO: Kort etikett
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
              TODO: Huvudrubrik som beskriver ert erbjudande
            </h1>
            <p className="max-w-xl text-lg text-slate-200">
              TODO: Kort introduktion av vad ni gör och var ni skapar värde
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-200"
                href="#tjanster"
              >
                TODO: Primär knapp
              </a>
              <a
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white"
                href="#kontakt"
              >
                TODO: Sekundär knapp
              </a>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/40">
            {/* TODO: Replace these example KPIs with real metrics or remove the card. */}
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm text-slate-300">TODO: KPI-rubrik</p>
                <p className="text-3xl font-semibold text-white">
                  TODO: Primärt KPI-värde
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-900/70 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                    TODO: KPI etikett
                  </p>
                  <p className="text-2xl font-semibold text-white">TODO</p>
                </div>
                <div className="rounded-2xl bg-slate-900/70 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                    TODO: KPI etikett
                  </p>
                  <p className="text-2xl font-semibold text-white">TODO</p>
                </div>
              </div>
              <p className="text-sm text-slate-300">
                TODO: Kort förklaring av resultaten eller metod.
              </p>
            </div>
          </div>
        </section>

        <section id="tjanster" className="scroll-mt-20 space-y-8">
          {/* TODO: Replace service cards with your real offerings. */}
          <div className="flex flex-col gap-3">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-300">
              TODO: Sektionstext
            </p>
            <h2 className="text-3xl font-semibold text-white">
              TODO: Sektionens huvudrubrik
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'TODO: Tjänst 1',
                text: 'TODO: Kort beskrivning av tjänst 1.',
              },
              {
                title: 'TODO: Tjänst 2',
                text: 'TODO: Kort beskrivning av tjänst 2.',
              },
              {
                title: 'TODO: Tjänst 3',
                text: 'TODO: Kort beskrivning av tjänst 3.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-slate-200">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 rounded-3xl border border-white/10 bg-linear-to-br from-white/10 to-white/5 p-8 md:grid-cols-[1.2fr_0.8fr]">
          {/* TODO: Update platform bullets to reflect your stack and timeline. */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">
              TODO: Plattformens rubrik
            </h2>
            <p className="text-sm text-slate-200">
              TODO: Kort text om teknik, kvalitet eller leverans.
            </p>
          </div>
          <div className="space-y-3 text-sm text-slate-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span>TODO: Punkt 1</span>
              <span>TODO</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span>TODO: Punkt 2</span>
              <span>TODO</span>
            </div>
            <div className="flex items-center justify-between">
              <span>TODO: Punkt 3</span>
              <span>TODO</span>
            </div>
          </div>
        </section>

        <section
          id="kontakt"
          className="scroll-mt-20 space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8"
        >
          {/* TODO: Replace email/phone with real contact details. */}
          <h2 className="text-2xl font-semibold text-white">
            TODO: Kontaktsektionens rubrik
          </h2>
          <p className="max-w-2xl text-sm text-slate-200">
            TODO: Kort text som beskriver nästa steg eller kontakt.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-slate-200">
            <a
              className="font-semibold text-white"
              href="mailto:info@foretagsnamn.se"
            >
              info@foretagsnamn.se
            </a>
            <span className="text-slate-400">|</span>
            <a className="font-semibold text-white" href="tel:+46701234567">
              +46 70 123 45 67
            </a>
          </div>
        </section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </main>
    </div>
  )
}
