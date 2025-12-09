# SEO Strategy

## Overview

SEO is critical for attracting potential clients searching for construction and civil engineering services. This document outlines the SEO strategy for Utvedabygg.

## Target Keywords

### Primary Keywords (Swedish)

- bygg och anläggning
- byggföretag [city/region]
- byggentreprenör
- anläggningsarbeten
- betongarbeten
- markarbeten

### Long-tail Keywords

- "byggföretag i [city]"
- "anläggningstjänster [region]"
- "renovering och ombyggnad"
- "betonggjutning [area]"

## Technical SEO

### Next.js Metadata API

Use Next.js 13+ metadata API for all pages:

```typescript
// app/page.tsx
export const metadata: Metadata = {
  title: 'Utvedabygg - Bygg och Anläggning i [Region]',
  description: 'Professionella bygg- och anläggningstjänster. Vi utför...',
  openGraph: {
    title: 'Utvedabygg - Bygg och Anläggning',
    description: '...',
    images: ['/og-image.jpg'],
  },
}
```

### Sitemap & Robots.txt

**app/sitemap.ts:**

```typescript
export default function sitemap() {
  return [
    {
      url: 'https://utvedabygg.se',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://utvedabygg.se/tjanster',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // ... more pages
  ]
}
```

**app/robots.ts:**

```typescript
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://utvedabygg.se/sitemap.xml',
  }
}
```

### Structured Data (JSON-LD)

Implement LocalBusiness schema on homepage:

```typescript
{
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "name": "Utvedabygg",
  "description": "Bygg och anläggningstjänster",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "[City]",
    "addressRegion": "[Region]",
    "addressCountry": "SE"
  },
  "telephone": "+46-XXX-XXX-XX",
  "email": "info@utvedabygg.se",
  "url": "https://utvedabygg.se"
}
```

## On-Page SEO

### Content Best Practices

- **Unique content** - No duplicate content across pages
- **Natural language** - Write for humans first, search engines second
- **Word count** - Aim for 300+ words on main pages
- **Keywords** - Use naturally in headings and first paragraph
- **Internal links** - Link related pages together
- **Call-to-actions** - Clear CTAs on every page

### HTML Structure

```html
<main>
  <h1>Main Page Heading (One per page)</h1>

  <section>
    <h2>Service Category</h2>
    <p>Description with natural keywords...</p>
  </section>

  <section>
    <h2>Why Choose Us</h2>
    <ul>
      <li>Benefit with keywords</li>
    </ul>
  </section>
</main>
```

### Image Optimization

- Use next/image for automatic optimization
- Descriptive file names: `betonggjutning-villa.jpg`
- Alt text: "Betonggjutning för villa i [City]"
- WebP format with fallbacks
- Lazy loading for below-the-fold images

## Local SEO

### Google Business Profile

- Claim and optimize Google Business Profile
- Add photos of completed projects
- Collect and respond to reviews
- Keep business hours updated
- Add service areas

### Local Citations

- Ensure NAP (Name, Address, Phone) consistency
- List on Swedish business directories
- Industry-specific directories

### Location Pages

Consider creating location-specific pages if serving multiple areas:

- `/tjanster/[city]`
- Unique content for each location
- Local keywords and references

## Content Strategy

### Service Pages

Each service should have:

- Detailed description (400+ words)
- Benefits and process
- Related project examples
- Clear CTA
- FAQ section (good for featured snippets)

### Project Portfolio

- High-quality before/after images
- Detailed case studies
- Relevant keywords in descriptions
- Link to related services

## Performance SEO

### Core Web Vitals

- **LCP (Largest Contentful Paint):** <2.5s
- **FID (First Input Delay):** <100ms
- **CLS (Cumulative Layout Shift):** <0.1

### Optimization Techniques

- Server-side rendering (Next.js default)
- Image optimization (next/image)
- Code splitting
- Font optimization
- Minimal JavaScript bundle

## Monitoring & Analytics

### Tools to Use

- **Google Search Console** - Track search performance
- **Google Analytics** - User behavior
- **Lighthouse** - Performance and SEO audits
- **PageSpeed Insights** - Core Web Vitals

### Metrics to Track

- Organic search traffic
- Keyword rankings
- Click-through rates
- Bounce rate
- Conversion rate (contact form submissions)
- Page load times

## Ongoing SEO Tasks

### Monthly

- Check Search Console for errors
- Review keyword rankings
- Analyze top-performing pages
- Update outdated content

### Quarterly

- Content audit and updates
- Competitor analysis
- Build quality backlinks
- Review and optimize meta descriptions

### After Launch

1. Submit sitemap to Google Search Console
2. Set up Google Analytics
3. Monitor initial rankings
4. Start collecting reviews
5. Build local citations

## SEO Checklist

### Pre-Launch

- [ ] All pages have unique titles and descriptions
- [ ] Proper heading hierarchy on all pages
- [ ] All images have descriptive alt text
- [ ] Sitemap.xml generated and accessible
- [ ] Robots.txt configured
- [ ] Structured data implemented
- [ ] Mobile responsive design
- [ ] Fast load times (<2s)
- [ ] HTTPS enabled
- [ ] 404 page implemented

### Post-Launch

- [ ] Submit to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Set up Google Business Profile
- [ ] Request initial client reviews
- [ ] Build local citations
- [ ] Monitor Core Web Vitals
