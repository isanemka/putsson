import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookiepolicy',
  description:
    'Information om vilka cookies vi använder och hur du kan hantera dem.',
}

export default function CookiePolicyPage() {
  return (
    <main
      id="main-content"
      className="mx-auto w-full max-w-3xl px-6 pb-20 pt-16 sm:px-10"
    >
      <header className="space-y-3">
        {/* TODO: Update headings and intro text to match the customer's cookie usage. */}
        <p className="text-sm uppercase tracking-[0.3em] text-blue font-bold">
          Cookies
        </p>
        <h1 className="text-3xl font-semibold text-navy">Cookiepolicy</h1>
        <p className="text-base text-navy/75">
          Vi använder cookies för att förbättra webbplatsens funktion och
          användarupplevelse.
        </p>
      </header>

      <section className="mt-10 space-y-6 text-sm text-navy/75">
        {/* TODO: Update cookie details to match the customer's analytics setup. */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-navy">
            Vad är cookies?
          </h2>
          <p>
            Cookies är små textfiler som sparas i din webbläsare. De hjälper
            webbplatsen att komma ihåg dina inställningar och förbättra
            användarupplevelsen.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-navy">
            Vilka cookies använder vi?
          </h2>
          {/* TODO: List the exact cookies (names, purpose, duration) when known. */}
          <p>
            I dagsläget använder vi endast nödvändiga cookies som krävs för att
            webbplatsen ska fungera. Om vi aktiverar analysverktyg kommer du
            alltid att få lämna samtycke i en cookie-banner.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-navy">
            Hantera dina inställningar
          </h2>
          <p>
            Du kan när som helst radera eller blockera cookies via inställningar
            i din webbläsare. Observera att vissa funktioner kan sluta fungera
            om du blockerar cookies.
          </p>
        </div>
      </section>
    </main>
  )
}
