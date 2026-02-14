# Documentation

This directory contains comprehensive project documentation for the company website boilerplate.

## Contents

- [Architecture](./architecture.md) - Technical decisions and system design
- [Content Structure](./content-structure.md) - Website pages and content organization
- [Accessibility](./accessibility.md) - EU Accessibility Act 2025 / WCAG 2.1 AA compliance
- [SEO Strategy](./seo.md) - Search engine optimization guidelines
- [GDPR & Privacy](./gdpr-privacy.md) - Privacy compliance and legal requirements
- [Testing](./testing.md) - Testing strategy and guidelines
- [Deployment](./deployment.md) - How to deploy the website

## Quick Links

- [Main README](../README.md)
- [Copilot Instructions](../.github/copilot-instructions.md)

## Customer Setup Checklist (TODO)

Use this checklist when adapting the template for a specific customer.

- Update `siteName` and `NEXT_PUBLIC_SITE_URL` in the app layout and pages.
- Replace all TODO copy on the homepage (hero, services, platform, contact).
- Replace JSON-LD schema fields with real company details.
- Update global metadata and page-level metadata descriptions.
- Verify contact details (email/phone) across the site.
- Review privacy policy content (legal basis, retention, contact).
- Review cookie policy content and list actual cookies if analytics is used.
- Confirm sitemap/robots base URL for production.
- Replace KPI placeholders with real metrics or remove the KPI card.

## Customer Handoff (Quick)

Use this mini-checklist when starting a new customer project:

1. Clone repo and install dependencies.
   - `npm install`
   - `npx playwright install` (needed for E2E tests)
2. Set environment variables.
   - `NEXT_PUBLIC_SITE_URL`
3. Replace all TODO copy and placeholders (homepage + policies + JSON-LD).
4. Update metadata (global + page-level).
5. Verify contact details and policy text.
6. Run checks:
   - `npm run lint`
   - `npm run test`
   - `npm run test:e2e`
   - `npm run build`
