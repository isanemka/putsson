# Architecture

## Technology Choices

### Next.js 16 (App Router)

- **Why:** Modern React framework with excellent performance and SEO capabilities
- **Benefits:** Server-side rendering, static generation, built-in routing
- **Considerations:** Uses App Router for better performance and developer experience

### React 19

- **Why:** Latest stable version with improved performance
- **Benefits:** Better concurrent rendering, automatic batching

### TypeScript

- **Why:** Type safety and better developer experience
- **Benefits:** Catch errors early, better IDE support, self-documenting code

### Tailwind CSS v4

- **Why:** Utility-first CSS framework for rapid development
- **Benefits:** Consistent design system, minimal CSS bundle size, mobile-first approach

### Vitest

- **Why:** Fast unit testing framework for Vite/Next.js projects
- **Benefits:** Fast execution, TypeScript support, compatible with Jest APIs
- **Use case:** Unit and integration tests for components, utilities, and Server Actions

### Playwright

- **Why:** Reliable end-to-end testing framework
- **Benefits:** Cross-browser testing, mobile emulation, screenshot/video capture
- **Use case:** E2E tests for critical user flows (contact form, navigation)

### AWS SES (Simple Email Service)

- **Why:** Reliable and cost-effective email service for contact form
- **Benefits:** Nearly free for low volumes, high deliverability, integrates with Next.js Server Actions
- **Use case:** Sending contact form submissions via email

### Sentry

- **Why:** Production error tracking and monitoring
- **Benefits:** Real-time error notifications, stack traces, user context, free tier available
- **Use case:** Monitor runtime errors, track contact form failures, ensure production stability

## Project Structure

```
/app            - Next.js App Router pages and layouts
/components     - Reusable React components
/lib            - Utility functions and shared code
/public         - Static assets (images, fonts)
/docs           - Project documentation
```

## Component Architecture

- **Server Components by default** - Better performance, smaller client bundles
- **Client Components only when needed** - For interactivity and browser APIs
- **Separation of concerns** - Keep components focused and reusable

## Contact Form Implementation

- **Email Service:** AWS SES
- **Implementation:** Next.js Server Actions
- **Required:** AWS SES credentials as environment variables
- **Flow:** Form submission → Server Action → AWS SES → Email delivery

## Accessibility

- **Standard:** EU Accessibility Act 2025 / WCAG 2.1 Level AA
- **Focus:** Keyboard navigation, screen readers, color contrast, semantic HTML
- **Testing:** Automated (Lighthouse, axe) + manual testing
- **Goal:** Ensure all users can access content and use contact form

## Browser & Device Support

### Supported Browsers

- **Chrome** (latest 2 versions)
- **Edge** (latest 2 versions)
- **Safari** (latest 2 versions)
- **Mobile Safari** (iOS 14+)
- **Chrome Mobile** (Android)

### Responsive Design

- **Mobile-first approach** - Design for mobile, scale up
- **Breakpoints:** 320px (mobile), 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- **Minimum width:** 320px (iPhone SE)
- **Maximum width:** 1920px (desktop)
- **Testing viewports:** Mobile (375px), Tablet (768px), Desktop (1440px)

## Future Considerations

- Google Search Console integration
- Local SEO optimization (Google Business Profile)
- Analytics integration (Google Analytics, Plausible, etc.)
- Performance monitoring and optimization
- Schema.org structured data for better search results
- Blog/news section for content marketing (if needed)
