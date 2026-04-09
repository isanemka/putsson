import Link from 'next/link'
import { siteName } from '@/lib/site'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <p className="text-sm text-slate-400">
          &copy; {new Date().getFullYear()} {siteName}. Alla rättigheter
          förbehållna.
        </p>
        <nav aria-label="Sidfot">
          <ul className="flex gap-6 text-sm" role="list">
            <li>
              <Link
                href="/integritetspolicy"
                className="text-slate-400 transition hover:text-white"
              >
                Integritetspolicy
              </Link>
            </li>
            <li>
              <Link
                href="/cookies"
                className="text-slate-400 transition hover:text-white"
              >
                Cookies
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
