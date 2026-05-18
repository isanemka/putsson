import type { Metadata } from 'next'
import { siteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Integritetspolicy',
  description:
    'Information om hur vi hanterar personuppgifter och skyddar din integritet.',
  alternates: {
    canonical: `${siteUrl}/integritetspolicy`,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPolicyPage() {
  return (
    <main
      id="main-content"
      className="mx-auto w-full max-w-3xl px-6 pb-20 pt-16 sm:px-10"
    >
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-blue font-bold">
          Integritet
        </p>
        <h1 className="text-3xl font-semibold text-navy">Integritetspolicy</h1>
        <p className="text-lg text-navy/90">
          Här beskriver vi hur vi samlar in, använder och skyddar dina
          personuppgifter.
        </p>
      </header>

      <section className="mt-10 space-y-6 text-base text-navy/90">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-navy">
            Personuppgiftsansvarig
          </h2>
          <p>
            PUTSSON ansvarar för behandlingen av personuppgifter. Kontakta oss
            på info@putsson.se om du har frågor.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-navy">
            Vilka uppgifter samlar vi in?
          </h2>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              Kontaktformulär: namn, e-post, telefon (valfritt), meddelande.
            </li>
            <li>Teknisk data: IP-adress och webbläsarinformation.</li>
            <li>Cookies: endast nödvändiga cookies om inget annat anges.</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-navy">
            Varför behandlar vi uppgifterna?
          </h2>
          <p>
            Uppgifterna används för att kunna svara på förfrågningar, förbättra
            webbplatsens funktion och säkerhet samt leverera begärda tjänster.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-navy">Rättslig grund</h2>
          <p>
            Behandlingen sker med stöd av berättigat intresse när du kontaktar
            oss. Om vi använder analysverktyg krävs samtycke via cookie-banner.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-navy">
            Hur länge sparas uppgifterna?
          </h2>
          <p>
            Kontaktuppgifter sparas tills ärendet är avslutat och därefter i
            högst 12 månader. Loggar sparas enligt webbhotellens rutiner.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-navy">Dina rättigheter</h2>
          <p>
            Du har rätt att begära tillgång till dina uppgifter, rättelse,
            radering, begränsning och dataportabilitet. Du kan också lämna
            klagomål till IMY.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-navy">Kontakt</h2>
          <p>Vid frågor om personuppgifter, skriv till info@putsson.se.</p>
        </div>
      </section>
    </main>
  )
}
