import Link from 'next/link'

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="flex flex-1 flex-col items-center justify-center px-6 text-center"
    >
      <p className="text-sm uppercase tracking-[0.3em] text-slate-500">404</p>
      <h1 className="mt-2 text-3xl font-semibold text-slate-900">
        Sidan hittades inte
      </h1>
      <p className="mt-3 max-w-md text-base text-slate-600">
        Sidan du letar efter finns inte eller kan ha flyttats.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
      >
        Tillbaka till startsidan
      </Link>
    </main>
  )
}
