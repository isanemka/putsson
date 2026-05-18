'use client'

import dynamic from 'next/dynamic'

// ssr: false prevents hydration mismatches since CookieBanner reads localStorage
const CookieBanner = dynamic(() => import('./CookieBanner'), { ssr: false })

export default CookieBanner
