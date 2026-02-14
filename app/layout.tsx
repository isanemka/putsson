import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// TODO: Replace with your real company name.
const siteName = 'Företagsnamn'
// TODO: Set NEXT_PUBLIC_SITE_URL for production, or replace the fallback URL.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.se'

// TODO: Update metadata text to match your brand and offerings.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Beskrivning kommer här`,
    template: `%s | ${siteName}`,
  },
  description: 'TODO: Kort beskrivning av företaget och erbjudandet.',
  openGraph: {
    title: `${siteName} | Beskrivning kommer här`,
    description: 'TODO: Kort beskrivning för Open Graph.',
    url: siteUrl,
    siteName,
    locale: 'sv_SE',
    type: 'website',
  },
  alternates: {
    canonical: siteUrl,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sv">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a className="skip-link" href="#main-content">
          Hoppa till huvudinnehåll
        </a>
        {children}
      </body>
    </html>
  )
}
