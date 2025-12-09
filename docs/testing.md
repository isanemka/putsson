# Testing Strategy

## Overview

This is a production website for paying clients. Comprehensive testing ensures quality and prevents regressions.

## Testing Tools

### Vitest (Unit & Integration Tests)

- **Purpose:** Test individual components, utilities, and logic
- **Location:** Test files alongside source code (e.g., `Component.test.tsx`)
- **Run:** `npm test`
- **Coverage:** `npm run test:coverage`

### Playwright (End-to-End Tests)

- **Purpose:** Test complete user flows and interactions
- **Location:** `/tests/e2e/` directory
- **Run:** `npm run test:e2e`
- **UI Mode:** `npm run test:e2e:ui`

## What to Test

### Unit Tests (Vitest)

**Required:**

- All utility functions in `/lib` and `/utils`
- Form validation logic
- Server Actions (contact form submission)
- Complex component logic

**Example:**

```typescript
// lib/validation.test.ts
import { validateEmail } from './validation'

describe('validateEmail', () => {
  it('should accept valid email addresses', () => {
    expect(validateEmail('test@example.com')).toBe(true)
  })

  it('should reject invalid email addresses', () => {
    expect(validateEmail('invalid')).toBe(false)
  })
})
```

### E2E Tests (Playwright)

**Critical Flows:**

1. Contact form submission (happy path)
2. Contact form validation errors
3. Navigation between pages
4. Mobile responsiveness
5. Cross-browser compatibility

**Responsive Testing:**

```typescript
// Test on multiple viewports
const viewports = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
]

for (const viewport of viewports) {
  test(`contact form works on ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.goto('/kontakt')
    // ... test form
  })
}
```

**Cross-browser Testing:**

```typescript
// playwright.config.ts - Test on multiple browsers
export default defineConfig({
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 13'] } },
  ],
})
```

**Example:**

```typescript
// tests/e2e/contact-form.spec.ts
test('should submit contact form successfully', async ({ page }) => {
  await page.goto('/kontakt')
  await page.fill('[name="name"]', 'Test User')
  await page.fill('[name="email"]', 'test@example.com')
  await page.fill('[name="message"]', 'Test message')
  await page.click('button[type="submit"]')
  await expect(page.getByText('Tack för ditt meddelande')).toBeVisible()
})
```

## Best Practices

### General

- Write tests alongside feature implementation (same commit)
- Use descriptive test names that explain the scenario
- Follow AAA pattern: Arrange, Act, Assert
- Keep tests independent and isolated
- Avoid testing implementation details

### Vitest

- Group related tests with `describe()`
- Use `beforeEach()` for common setup
- Mock external dependencies (API calls, AWS SES)
- Test edge cases and error handling

### Playwright

- Use data-testid attributes for stable selectors when needed
- Test on multiple viewports (mobile, tablet, desktop)
- Take screenshots on failures for debugging
- Test keyboard navigation for accessibility

## Running Tests

### Local Development

```bash
# Run unit tests in watch mode
npm test

# Run E2E tests
npm run test:e2e

# Run E2E tests in UI mode (interactive)
npm run test:e2e:ui
```

### CI/CD

Tests should run automatically on:

- Every pull request
- Before deployment to production

## Coverage Goals

- **Critical paths:** 100% (contact form, email sending)
- **Components:** 80%+
- **Utilities:** 90%+
- **Overall:** 70%+

## Test Environments

### Unit Tests

- Run in Node.js environment
- Mock external services (AWS SES)
- Fast execution (<1 second per test)

### E2E Tests

- Run against local development server
- Use test environment variables
- Mock email sending in tests
- Longer execution time acceptable
- **Test on desktop browsers (Chrome, Safari) and mobile browsers (Safari Mobile, Chrome Mobile)**
- **Verify responsive design at the 320px, 768px, and 1440px viewports**

## Continuous Improvement

- Review and update tests when requirements change
- Add tests when bugs are discovered
- Refactor tests to improve maintainability
- Monitor test execution time and optimize slow tests
