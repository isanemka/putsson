import type { Metadata, Viewport } from 'next'
import { Montserrat } from 'next/font/google'
import { siteName, siteUrl, siteUrlObj } from '@/lib/site'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieBannerLoader from '@/components/CookieBannerLoader'
import './globals.css'

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: siteUrlObj,
  title: {
    default: `${siteName} | Fönsterputs i Göteborg`,
    template: `%s | ${siteName}`,
  },
  description:
    'PUTSSON är fönsterputsaren i Göteborg som lämnar dina rutor blanka, blecken rena och din vardag enklare. Boka fast eller löpande fönsterputs.',
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: 'Fönsterputs',
  keywords: [
    'fönsterputs',
    'fönsterputs Göteborg',
    'fönsterputsare',
    'fönsterputsare Göteborg',
    'putsa fönster',
    'fönsterputsning',
    'fönsterputs villa',
    'fönsterputs företag',
    'fönsterputs lägenhet',
    'PUTSSON',
  ],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: `${siteName} | Fönsterputs i Göteborg`,
    description:
      'Pålitlig fönsterputs för villor, lägenheter och företag i Göteborg.',
    url: siteUrl,
    siteName,
    locale: 'sv_SE',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${siteName} – Fönsterputs i Göteborg`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} | Fönsterputs i Göteborg`,
    description:
      'Pålitlig fönsterputs för villor, lägenheter och företag i Göteborg.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
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
      <body
        className={`${montserrat.variable} flex min-h-dvh flex-col bg-cream text-navy antialiased`}
      >
        <a className="skip-link" href="#main-content">
          Hoppa till huvudinnehåll
        </a>
        <Header />
        {children}
        <Footer />
        <CookieBannerLoader />
      </body>
    </html>
  )
}
