import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Integritetspolicy',
  description:
    'Information om hur vi hanterar personuppgifter och skyddar din integritet.',
}

export default function PrivacyPolicyPage() {
  return (
    <main
      id="main-content"
      className="mx-auto w-full max-w-3xl px-6 pb-20 pt-16 sm:px-10"
    >
      <header className="space-y-3">
        {/* TODO: Update headings and intro text to match the customer's policy. */}
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Integritet
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">
          Integritetspolicy
        </h1>
        <p className="text-base text-slate-600">
          Här beskriver vi hur vi samlar in, använder och skyddar dina
          personuppgifter.
        </p>
      </header>

      <section className="mt-10 space-y-6 text-sm text-slate-600">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">
            Personuppgiftsansvarig
          </h2>
          {/* TODO: Replace company name and contact email. */}
          <p>
            Företagsnamn ansvarar för behandlingen av personuppgifter. Kontakta
            oss på info@foretagsnamn.se om du har frågor.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">
            Vilka uppgifter samlar vi in?
          </h2>
          {/* TODO: Confirm which data fields you actually collect. */}
          <ul className="list-disc space-y-1 pl-6">
            <li>
              Kontaktformulär: namn, e-post, telefon (valfritt), meddelande.
            </li>
            <li>Teknisk data: IP-adress och webbläsarinformation.</li>
            <li>Cookies: endast nödvändiga cookies om inget annat anges.</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">
            Varför behandlar vi uppgifterna?
          </h2>
          <p>
            Uppgifterna används för att kunna svara på förfrågningar, förbättra
            webbplatsens funktion och säkerhet samt leverera begärda tjänster.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">
            Rättslig grund
          </h2>
          {/* TODO: Confirm legal basis per customer (e.g. consent vs legitimate interest). */}
          <p>
            Behandlingen sker med stöd av berättigat intresse när du kontaktar
            oss. Om vi använder analysverktyg krävs samtycke via cookie-banner.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">
            Hur länge sparas uppgifterna?
          </h2>
          {/* TODO: Update retention periods to match your policy. */}
          <p>
            Kontaktuppgifter sparas tills ärendet är avslutat och därefter i
            högst 12 månader. Loggar sparas enligt webbhotellens rutiner.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">
            Dina rättigheter
          </h2>
          {/* TODO: Verify rights text against the customer's data handling process. */}
          <p>
            Du har rätt att begära tillgång till dina uppgifter, rättelse,
            radering, begränsning och dataportabilitet. Du kan också lämna
            klagomål till IMY.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">Kontakt</h2>
          {/* TODO: Replace with your official contact address. */}
          <p>Vid frågor om personuppgifter, skriv till info@foretagsnamn.se.</p>
        </div>
      </section>
    </main>
  )
}
