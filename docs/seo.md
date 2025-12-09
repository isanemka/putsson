# SEO Strategy

## Overview

SEO is critical for attracting potential clients through search engines. This document outlines the SEO strategy and best practices for company websites.

## Target Keywords

### Keyword Research

Research and identify keywords relevant to your industry:

- **Primary keywords:** Main services/products your company offers
- **Location-based keywords:** "[service] in [city/region]"
- **Long-tail keywords:** More specific phrases potential clients search for
- **Industry-specific terms:** Technical terms relevant to your sector

### Example Keywords (customize for your business)

- [your service] [city/region]
- [your industry] företag
- [specific service offering]
- [product/service category]

## Technical SEO

### Next.js Metadata API

Use Next.js 13+ metadata API for all pages:

```typescript
// app/page.tsx
export const metadata: Metadata = {
  title: 'Your Company Name - [Your Main Service/Product]',
  description: 'Professional [your services]. We provide...',
  openGraph: {
    title: 'Your Company Name - [Your Main Service]',
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
      url: 'https://yourcompany.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://yourcompany.com/tjanster',
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
    sitemap: 'https://yourcompany.com/sitemap.xml',
  }
}
```

### Structured Data (JSON-LD)

Implement LocalBusiness schema on homepage:

```typescript
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness", // or specific type like "ProfessionalService", "Store", etc.
  "name": "Your Company Name",
  "description": "Your business description",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "[City]",
    "addressRegion": "[Region]",
    "addressCountry": "SE"
  },
  "telephone": "+46-XXX-XXX-XX",
  "email": "info@yourcompany.com",
  "url": "https://yourcompany.com"
}
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
- Descriptive file names: `product-name-feature.jpg`
- Alt text: "[Descriptive text about image content and context]"
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
