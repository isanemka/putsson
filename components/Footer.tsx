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
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <Image
              src="/logo_round_white.png"
              alt=""
              width={48}
              height={48}
              className="h-12 w-12 rounded-full"
            />
            <span className="text-2xl font-bold tracking-tight">
              {siteName}
            </span>
          </div>
          <p className="max-w-sm text-sm text-cream/70">
            Vi putsar fönster i {siteCity} med stadig hand. Pålitligt,
            prickfritt och alltid med ett leende.
          </p>
        </div>

        <div className="space-y-3 text-sm">
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
        </div>

        <div className="space-y-3 text-sm">
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
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <p>
            &copy; {new Date().getFullYear()} {siteName}. Alla rättigheter
            förbehållna.
          </p>
          <p>Putsat med kärlek i {siteCity}.</p>
        </div>
      </div>
    </footer>
  )
}
