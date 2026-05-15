import Image from 'next/image'
import Link from 'next/link'
import {
  siteCity,
  siteEmail,
  siteName,
  sitePhone,
  sitePhoneHref,
} from '@/lib/site'

export default function Footer() {
  return (
    <footer className="mt-auto bg-navy text-cream">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 sm:px-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-5 text-center md:text-left">
          <div className="flex justify-center md:justify-start">
            <Image
              src="/White.svg"
              alt={siteName}
              width={720}
              height={216}
              className="h-auto w-[clamp(70px,15vw,90px)]"
            />
          </div>
          <p className="mx-auto max-w-sm text-sm text-cream/70 md:mx-0">
            Vi putsar fönster i {siteCity} med stadig hand. Pålitligt,
            prickfritt och alltid med ett leende.
          </p>
        </div>

        <div className="space-y-3 text-center text-sm md:text-left">
          <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-mint">
            Kontakt
          </h3>
          <p>
            <a
              href={`mailto:${siteEmail}`}
              className="text-cream/85 transition hover:text-mint"
            >
              {siteEmail}
            </a>
          </p>
          <p>
            <a
              href={sitePhoneHref}
              className="text-cream/85 transition hover:text-mint"
            >
              {sitePhone}
            </a>
          </p>
          <p className="text-cream/60">{siteCity}, Sverige</p>
          <div className="flex justify-center gap-4 md:justify-start">
            <a
              href="https://www.instagram.com/putsson.se"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Putsson på Instagram"
              className="text-cream/85 transition hover:text-mint"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/Putsson.se"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Putsson på Facebook"
              className="text-cream/85 transition hover:text-mint"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="space-y-3 text-center text-sm md:text-left">
          <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-mint">
            Mer info
          </h3>
          <ul className="space-y-2" role="list">
            <li>
              <Link
                href="/integritetspolicy"
                className="text-cream/85 transition hover:text-mint"
              >
                Integritetspolicy
              </Link>
            </li>
            <li>
              <Link
                href="/cookies"
                className="text-cream/85 transition hover:text-mint"
              >
                Cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-2 px-6 py-6 text-center text-xs text-cream/60 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-6 sm:px-10 sm:text-left">
          <p>
            &copy; {new Date().getFullYear()} {siteName}. Alla rättigheter
            förbehållna.
          </p>
          <p>Putsat med kärlek i {siteCity}.</p>
          <p>
            Skapad av en{' '}
            <a
              href="https://pixelpioneer.se"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition hover:text-mint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
            >
              PixelPioneer
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
