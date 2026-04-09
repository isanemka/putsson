import Link from 'next/link'
import { siteName } from '@/lib/site'

// TODO: Update navigation links to match your site structure.
const navLinks = [
  { href: '/#tjanster', label: 'Tjänster' },
  { href: '/#kontakt', label: 'Kontakt' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-lg">
      <nav
        aria-label="Huvudnavigering"
        className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-10"
      >
        <Link
          href="/"
          className="text-lg font-semibold text-white transition hover:opacity-80"
        >
          {siteName}
        </Link>
        <ul className="flex items-center gap-6" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-slate-300 transition hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
