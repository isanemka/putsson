import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sidan hittades inte',
  description: 'Den här sidan kunde tyvärr inte hittas.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center"
    >
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue">
        404
      </p>
      <h1 className="mt-3 text-5xl font-bold text-navy">Sidan hittades inte</h1>
      <p className="mt-4 max-w-md text-lg text-navy/90">
        Den här sidan har vi tyvärr inte putsat fram. Den kan ha flyttats eller
        aldrig funnits.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-navy px-7 py-4 text-sm font-medium text-cream transition hover:-translate-y-0.5 hover:bg-blue"
      >
        Tillbaka till startsidan
      </Link>
    </main>
  )
}
