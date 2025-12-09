# Accessibility (Tillgänglighet)

## Overview

This website must comply with the **EU Accessibility Act 2025** and follow **WCAG 2.1 Level AA** standards to ensure all users, including those with disabilities, can access and use the website.

## Legal Requirements

### EU Accessibility Act 2025

From June 28, 2025, digital services (including websites) must be accessible. This applies to:

- Business websites offering services
- Contact forms and communication channels
- All interactive elements

### WCAG 2.1 Level AA

Web Content Accessibility Guidelines - industry standard for web accessibility.

## Key Principles (POUR)

### 1. Perceivable

Users must be able to perceive the information

**Requirements:**

- **Text alternatives** for images (alt text)
- **Color contrast** minimum 4.5:1 for normal text, 3:1 for large text
- **Resizable text** up to 200% without loss of functionality
- **Video captions** if using video content

### 2. Operable

Users must be able to operate the interface

**Requirements:**

- **Keyboard accessible** - All functionality available via keyboard
- **Focus indicators** - Visible focus states on interactive elements
- **No keyboard traps** - Users can navigate away from any element
- **Skip links** - "Skip to main content" for screen readers
- **Timing** - No time limits on form submission

### 3. Understandable

Users must understand the content and interface

**Requirements:**

- **Clear language** - Simple Swedish, avoid jargon
- **Consistent navigation** - Same menu structure on all pages
- **Error messages** - Clear, helpful form validation messages
- **Labels** - All form inputs have visible labels
- **Predictable** - Components behave consistently

### 4. Robust

Content works with assistive technologies

**Requirements:**

- **Semantic HTML** - Proper use of header, nav, main, footer, etc.
- **Valid HTML** - No parsing errors
- **ARIA labels** - When semantic HTML isn't sufficient
- **Compatible** - Works with screen readers (NVDA, JAWS, VoiceOver)

## Implementation Guidelines

### Semantic HTML

```tsx
// Good ✅
<header>
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="/">Hem</a></li>
    </ul>
  </nav>
</header>

<main>
  <h1>Page Title</h1>
  <section>
    <h2>Section Title</h2>
  </section>
</main>

<footer>
  <p>© 2025 Utvedabygg</p>
</footer>

// Bad ❌
<div class="header">
  <div class="nav">
    <span onclick="navigate()">Hem</span>
  </div>
</div>
```

### Keyboard Navigation

```tsx
// All interactive elements must be keyboard accessible
<button onClick={handleSubmit}>
  Skicka
</button>

// Not this ❌
<div onClick={handleSubmit}>
  Skicka
</div>

// Focus management
const buttonRef = useRef<HTMLButtonElement>(null)

useEffect(() => {
  buttonRef.current?.focus()
}, [])
```

### Color Contrast

```css
/* Minimum contrast ratios (WCAG AA) */
/* Normal text: 4.5:1 */
color: #333333; /* on white background ✅ */

/* Large text (18pt+ or 14pt+ bold): 3:1 */
font-size: 1.5rem;
color: #767676; /* on white background ✅ */

/* Interactive elements (buttons, links) */
/* Must have 3:1 contrast with background */
```

### Form Accessibility

```tsx
// Proper form structure
<form onSubmit={handleSubmit}>
  <div>
    <label htmlFor="name">
      Namn <span aria-label="required">*</span>
    </label>
    <input
      id="name"
      name="name"
      type="text"
      required
      aria-required="true"
      aria-describedby="name-error"
    />
    <span id="name-error" role="alert">
      {errors.name}
    </span>
  </div>

  <button type="submit">Skicka meddelande</button>
</form>
```

### Images

```tsx
// Decorative images
<Image src="/hero.jpg" alt="" aria-hidden="true" />

// Informative images
<Image
  src="/project.jpg"
  alt="Betonggjutning för villa i Göteborg, färdigt projekt 2024"
/>

// Logos
<Image
  src="/logo.svg"
  alt="Utvedabygg logotyp"
/>
```

### Headings Hierarchy

```tsx
// Proper hierarchy ✅
<h1>Utvedabygg - Bygg och Anläggning</h1>
  <h2>Våra Tjänster</h2>
    <h3>Byggentreprenad</h3>
    <h3>Anläggningsarbeten</h3>
  <h2>Om Oss</h2>

// Bad hierarchy ❌
<h1>Title</h1>
<h3>Skipping h2</h3>
<h2>Wrong order</h2>
```

### Skip Links

```tsx
// Add at top of layout
<a href="#main-content" className="skip-link">
  Hoppa till huvudinnehåll
</a>

// CSS
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: white;
  padding: 8px;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

### ARIA Labels

```tsx
// When semantic HTML isn't enough
<button aria-label="Stäng meny">
  <X /> {/* Icon only */}
</button>

<nav aria-label="Huvudnavigation">
  {/* Navigation items */}
</nav>

// Loading states
<div role="status" aria-live="polite">
  {isLoading ? 'Laddar...' : 'Innehåll laddat'}
</div>
```

## Testing Strategy

### Automated Testing

**Tools:**

- **Lighthouse** (built into Chrome DevTools)
- **axe DevTools** (browser extension)
- **WAVE** (browser extension)
- **pa11y** (CI/CD integration)

**Playwright tests:**

```typescript
// tests/e2e/accessibility.spec.ts
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('should not have accessibility violations', async ({ page }) => {
  await page.goto('/')

  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze()

  expect(accessibilityScanResults.violations).toEqual([])
})
```

### Manual Testing

**Keyboard Navigation:**

1. Navigate site using only Tab, Shift+Tab, Enter, Space
2. Verify all interactive elements reachable
3. Check visible focus indicators
4. Test forms can be submitted via keyboard

**Screen Reader Testing:**

- **macOS:** VoiceOver (Cmd+F5)
- **Windows:** NVDA (free) or JAWS
- **Mobile:** TalkBack (Android), VoiceOver (iOS)

**Test checklist:**

- [ ] All images have alt text
- [ ] Forms have proper labels
- [ ] Headings are in logical order
- [ ] Landmarks are announced (header, nav, main, footer)
- [ ] Links are descriptive ("Läs mer om våra tjänster" not "Klicka här")

**Zoom/Resize Testing:**

1. Zoom to 200% (Cmd/Ctrl + +)
2. Verify content is readable
3. No horizontal scrolling
4. All functionality works

**Color Contrast:**

- Use browser DevTools or WebAIM Contrast Checker
- Test all text/background combinations
- Verify button states (hover, focus, disabled)

## Accessibility Checklist

### Before Launch

- [ ] All images have descriptive alt text
- [ ] Color contrast meets WCAG AA (4.5:1 minimum)
- [ ] All interactive elements keyboard accessible
- [ ] Visible focus indicators on all focusable elements
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] Form labels associated with inputs
- [ ] Error messages clear and helpful
- [ ] Skip link implemented
- [ ] Semantic HTML throughout
- [ ] Tested with screen reader
- [ ] Lighthouse accessibility score 90+
- [ ] No automated axe violations

### Contact Form Specific

- [ ] All fields have labels (not just placeholders)
- [ ] Required fields marked with asterisk and aria-required
- [ ] Error messages use role="alert" or aria-live
- [ ] Success message announced to screen readers
- [ ] Can complete and submit using keyboard only
- [ ] Form validation clear and helpful
- [ ] Focus management after submission

## Common Mistakes to Avoid

❌ **Don't:**

- Use `<div>` or `<span>` for buttons
- Rely only on color to convey meaning
- Use placeholder as label
- Create keyboard traps
- Use generic link text ("click here", "read more")
- Hide content with `display: none` when it should be accessible
- Use `tabindex` values other than 0 or -1
- Auto-play videos with sound

✅ **Do:**

- Use semantic HTML elements
- Provide text alternatives for non-text content
- Ensure sufficient color contrast
- Make all functionality keyboard accessible
- Use descriptive link text
- Provide clear error messages
- Test with real assistive technology
- Document accessibility features

## Resources

### Tools

- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

### Guidelines

- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [EU Accessibility Act](https://ec.europa.eu/social/main.jsp?catId=1202)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

### Testing

- [Screen Reader Basics](https://webaim.org/articles/screenreader_testing/)
- [Keyboard Testing](https://webaim.org/articles/keyboard/)

## Continuous Improvement

- Run accessibility audits monthly
- Include accessibility in code reviews
- Test new features with assistive technology
- Keep up with WCAG updates
- Consider user feedback about accessibility
