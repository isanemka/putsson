import type { Metadata, Viewport } from 'next'
import { Montserrat } from 'next/font/google'
import { siteName, siteUrl, siteUrlObj } from '@/lib/site'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['300', '500', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: siteUrlObj,
  title: {
    default: `${siteName} | Fönsterputs i Göteborg`,
    template: `%s | ${siteName}`,
  },
  description:
    'PUTSSON är fönsterputsaren i Göteborg som lämnar dina rutor blanka, ramarna torra och din vardag enklare. Boka fast eller löpande fönsterputs.',
  openGraph: {
    title: `${siteName} | Fönsterputs i Göteborg`,
    description:
      'Pålitlig fönsterputs för villor, lägenheter och företag i Göteborg.',
    url: siteUrl,
    siteName,
    locale: 'sv_SE',
    type: 'website',
  },
  alternates: {
    canonical: siteUrl,
  },
}

export const viewport: Viewport = {
  themeColor: '#18174c',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sv">
      <head>
        {/* Set data-js before first paint so CSS can target JS-enabled state */}
        <script
          dangerouslySetInnerHTML={{
            __html: 'document.documentElement.dataset.js="true"',
          }}
        />
      </head>
      <body
        className={`${montserrat.variable} flex min-h-screen flex-col bg-cream text-navy antialiased`}
      >
        <a className="skip-link" href="#main-content">
          Hoppa till huvudinnehåll
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
