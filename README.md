# Company Website Boilerplate

A modern, production-ready boilerplate for building company websites. Pre-configured with best practices for SEO, accessibility, testing, and deployment.

## Features

- ✅ Next.js 16 with App Router
- ✅ React 19 & TypeScript
- ✅ Tailwind CSS v4
- ✅ SEO-optimized setup
- ✅ WCAG 2.1 AA accessibility
- ✅ GDPR compliance guidelines
- ✅ Testing setup (Vitest + Playwright)
- ✅ Code formatting (Prettier + ESLint + Husky)
- ✅ Comprehensive documentation

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Testing:** Vitest (unit) + Playwright (e2e)
- **Deployment:** Vercel

## Quick Start

### Prerequisites

- Node.js 20+
- npm, yarn, pnpm, or bun

### Installation

```bash
npm install
```

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

## Customization Guide

1. **Update company info:**
   - Edit `app/layout.tsx` metadata
   - Update site title and description

2. **Customize styling:**
   - Modify Tailwind config for brand colors
   - Update `app/globals.css` for global styles

3. **Add content:**
   - Create pages in `app/` directory
   - Add components to `components/` directory

4. **Configure SEO:**
   - See `docs/seo.md` for guidance
   - Update metadata in each page

## Project Structure

```
app/          # Next.js App Router pages and layouts
components/   # Reusable React components
lib/          # Utility functions and helpers
public/       # Static assets (images, fonts, etc.)
docs/         # Project documentation
tests/        # Test files (Vitest + Playwright)
```

## Documentation

See the `/docs` folder for detailed documentation:

- [Architecture](docs/architecture.md) - Technical decisions
- [SEO Strategy](docs/seo.md) - Search optimization
- [Accessibility](docs/accessibility.md) - WCAG compliance
- [GDPR & Privacy](docs/gdpr-privacy.md) - Privacy compliance
- [Testing](docs/testing.md) - Testing guidelines
- [Deployment](docs/deployment.md) - How to deploy

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## License

MIT
