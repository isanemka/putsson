# GitHub Copilot Instructions

## Project Overview

This is a company website for "Utvedabygg", a construction and civil engineering services company. The website showcases their services, projects, and company information.

Built with:

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4

### Purpose

- Present company services and expertise
- Showcase completed projects and portfolio
- Provide contact information and inquiry forms
- Build trust with potential clients
- **Rank well in search engines for local construction services**

## Code Style & Conventions

### General

- Use TypeScript for all files
- Prefer functional components with hooks
- Use named exports for components
- Keep components small and focused
- Write self-documenting code with clear variable names
- **Use Prettier for code formatting** - Run `npm run format` before committing

### Code Formatting (Prettier)

- Single quotes for strings
- No semicolons
- 2 spaces for indentation
- Trailing commas in ES5-compatible places
- Line width: 80 characters
- Arrow function parentheses: always

### Git Hooks (Husky)

- Pre-commit hook automatically runs on `git commit`
- Formats code with Prettier
- Runs ESLint with auto-fix
- Only processes staged files (via lint-staged)
- Prevents committing poorly formatted or linted code

### Pre-Commit Workflow

- **Always run `npm run build` before committing** to verify the application builds successfully
- Fix any build errors before committing
- Ensures production-ready code is always in the repository

### Language

- All user-facing text, UI labels, and content must be in Swedish
- Code comments and documentation must be in English
- Variable and function names should be in English
- Commit messages should be in English

### File Naming

- Components: PascalCase (e.g., `UserProfile.tsx`)
- Utilities/helpers: camelCase (e.g., `formatDate.ts`)
- Types: PascalCase in `*.types.ts` files
- Use `.tsx` for components, `.ts` for utilities

### TypeScript

- Define proper types for all props and function parameters
- Avoid `any` - use `unknown` or proper types
- Create type files for shared types
- Use interfaces for object shapes, types for unions/intersections

### React & Next.js

- Use Server Components by default
- Add 'use client' only when needed (interactivity, hooks, browser APIs)
- Prefer async Server Components for data fetching
- Use Next.js App Router conventions
- Implement proper loading and error states

### Styling

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Keep consistent spacing scale
- Use semantic color names from Tailwind config
- **Test on Chrome, Edge, and Safari**
- **Ensure responsive down to 320px width (mobile)**

### Code Organization

- Group related files in feature folders
- Keep components in `app/` or `components/`
- Place utilities in `lib/` or `utils/`
- Store types in dedicated `*.types.ts` files

## Documentation

- Keep README.md up to date with setup and deployment instructions
- Use JSDoc comments for complex functions and components
- Document component props with TypeScript interfaces
- Store architectural decisions in `/docs` folder
- Document content structure and page purposes
- Keep inline comments minimal - prefer self-documenting code

## Best Practices

- Always handle loading and error states
- Implement proper accessibility (ARIA labels, semantic HTML)
- Follow EU Accessibility Act 2025 / WCAG 2.1 AA standards
- Optimize images with next/image
- Use Next.js metadata API for SEO
- Write meaningful commit messages
- Add comments for complex logic only
- **Ensure GDPR compliance** - Cookie consent, privacy policy, data handling

## SEO Requirements

- Use semantic HTML (header, nav, main, footer, article, section)
- Implement proper heading hierarchy (h1 → h2 → h3)
- Add descriptive meta tags for every page
- Include Open Graph tags for social sharing
- Generate sitemap.xml and robots.txt
- Use descriptive alt text for all images
- Implement structured data (JSON-LD) for business information
- Ensure fast page load times (<2s)
- Mobile-first and responsive design
- Use Swedish keywords naturally in content

## Testing

### Testing Strategy

This is a production project with paying clients - comprehensive testing is required.

**Unit & Integration Tests (Vitest)**

- Write tests alongside component/function creation
- Test all utility functions and helpers
- Test Server Actions and form validation logic
- Test component logic and state management
- Place test files next to source files: `Component.test.tsx`, `utils.test.ts`

**End-to-End Tests (Playwright)**

- Test critical user flows (contact form submission)
- Test navigation and page interactions
- Test responsive design on different viewports
- Test cross-browser compatibility
- Place E2E tests in `/tests/e2e/` directory

### Test Requirements

- **Always create tests when implementing new features**
- Test files should be created in the same commit as the feature
- Aim for high coverage on critical paths (contact form, navigation)
- Keep tests maintainable and easy to understand
- Use descriptive test names that explain what is being tested

## Performance

- Minimize client-side JavaScript
- Use dynamic imports for heavy components
- Optimize images and fonts
- Implement proper caching strategies
