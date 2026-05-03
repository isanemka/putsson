'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { siteName, sitePhone, sitePhoneHref } from '@/lib/site'

const navLinks = [
  { href: '/#tjanster', label: 'Tjänster' },
  { href: '/#omoss', label: 'Om oss' },
  { href: '/#galleri', label: 'Galleri' },
  { href: '/#kontakt', label: 'Kontakt' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream/85 shadow-[0_1px_0_0_rgba(24,23,76,0.06)] backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <nav
        aria-label="Huvudnavigering"
        className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 sm:px-10"
      >
        <Link
          href="/"
          aria-label={`${siteName} startsida`}
          className="flex items-center gap-3 text-navy transition hover:opacity-80"
        >
          <Image
            src="/logo_round_green.png"
            alt=""
            width={44}
            height={44}
            priority
            className="h-11 w-11 rounded-full"
          />
          <span className="text-xl font-bold tracking-tight">{siteName}</span>
        </Link>

        <ul
          className="hidden items-center gap-8 md:flex"
          role="list"
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-navy/75 transition hover:text-navy"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={sitePhoneHref}
              className="rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-cream transition hover:-translate-y-0.5 hover:bg-blue"
            >
              {sitePhone}
            </a>
          </li>
        </ul>

        <button
          type="button"
          aria-label={open ? 'Stäng meny' : 'Öppna meny'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-navy text-cream md:hidden"
        >
          <span className="sr-only">Meny</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            {open ? (
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M3 6h14M3 10h14M3 14h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </nav>

      {open ? (
        <div className="border-t border-navy/10 bg-cream/95 backdrop-blur md:hidden">
          <ul
            className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-6 py-4 sm:px-10"
            role="list"
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-base font-medium text-navy hover:bg-mist/40"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <a
                href={sitePhoneHref}
                className="block rounded-full bg-navy px-5 py-3 text-center text-sm font-medium text-cream"
              >
                Ring {sitePhone}
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  )
}
