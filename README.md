# Putsson

Website for Putsson, a window cleaning company in Gothenburg. Live at [www.putsson.se](https://www.putsson.se).

## What's on the Site

- **Home page** (`/`): hero, customer reviews, about, key figures, offer, services, contact form and FAQ
- **Area pages** (`/fonsterputs/[ort]`): one landing page per service area, such as `/fonsterputs/molndal`. The areas are listed in `lib/areas.ts`
- **Contact form:** sends email through AWS SES from a Server Action (`app/actions/contact.ts`)
- **Privacy and cookies:** `/integritetspolicy` and `/cookies`, plus a consent banner. Vercel Analytics only loads after consent, and the Reco review widget only loads when the visitor clicks to show it
- **SEO:** metadata, JSON-LD structured data, `sitemap.xml` and `robots.txt`, all based on `https://www.putsson.se`

All user-facing text is in Swedish.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Email:** AWS SES
- **Analytics:** Vercel Analytics (cookieless, loads after consent)
- **Testing:** Vitest (unit) + Playwright (e2e)
- **Hosting:** Vercel

## Quick Start

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
npm install
```

### Environment Variables

The site runs without any environment variables, but the contact form needs AWS SES credentials to send email. Put them in a `.env.local` file (ignored by git). See the table in [docs/deployment.md](docs/deployment.md#2-environment-variables) for every variable.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
npm start
```

## Editing Content

| What                                  | Where                                    |
| ------------------------------------- | ---------------------------------------- |
| Company name, phone, email, city      | `lib/site.ts`                            |
| Service areas and their landing pages | `lib/areas.ts`                           |
| FAQ                                   | `lib/faq.ts`                             |
| Home page sections                    | `app/page.tsx` and `components/`         |
| Privacy policy and cookie page        | `app/integritetspolicy/`, `app/cookies/` |
| Images and logos                      | `public/`                                |

When adding a service area, the sitemap and area page are generated automatically from `lib/areas.ts`.

## Project Structure

```text
app/          # Pages, layout, sitemap, robots and the contact form Server Action
components/   # React components and their unit tests
lib/          # Site config, service areas, FAQ and consent helpers
public/       # Images, logos and llms.txt
docs/         # Project documentation
tests/e2e/    # Playwright end-to-end tests
```

## Documentation

- [Architecture](docs/architecture.md) - Technical decisions
- [SEO Strategy](docs/seo.md) - Search optimization
- [Accessibility](docs/accessibility.md) - WCAG compliance
- [GDPR & Privacy](docs/gdpr-privacy.md) - Privacy compliance
- [Testing](docs/testing.md) - Testing guidelines
- [Deployment](docs/deployment.md) - Hosting, environment variables, SES and domains
- [Överlämning](docs/overlamning.md) - Handover guide for a new agency (Swedish)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run unit tests with Vitest
- `npm run test:coverage` - Run unit tests with coverage
- `npm run test:e2e` - Run Playwright end-to-end tests
- `npm run test:e2e:ui` - Run Playwright in UI mode
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check formatting without changing files

Before running E2E tests on a fresh clone, install browsers with `npx playwright install`.

A pre-commit hook (Husky + lint-staged) formats and lints staged files automatically.

## License

Copyright © Putsson AB. All rights reserved.

This code is proprietary and owned by Putsson AB. It may not be copied, modified or distributed without written permission from the owner.
