# GDPR & Privacy Compliance

## Overview

The website must be fully GDPR (General Data Protection Regulation) compliant as it operates in Sweden/EU and collects personal data through the contact form.

## Legal Requirements

### Privacy Policy (Integritetspolicy)

Required page at `/integritetspolicy` that explains:

**What data we collect:**

- Contact form: name, email, phone (optional), message
- Technical data: IP address (via server logs), browser info
- Cookies (if using analytics)

**Why we collect it:**

- Contact form: To respond to inquiries
- Technical data: Website functionality and security
- Analytics: Improve user experience (if implemented)

**How long we store it:**

- Contact form data: Until inquiry is resolved + reasonable retention period
- Server logs: As required by hosting provider
- Analytics: According to analytics provider's policy

**User rights:**

- Access their data
- Request deletion
- Data portability
- Withdraw consent
- Lodge a complaint with IMY (Swedish Data Protection Authority)

**Legal basis:**

- Contact form: Legitimate interest (responding to inquiries)
- Analytics: Consent (via cookie banner)

### Cookie Consent Banner

Required if using:

- Google Analytics
- Any tracking cookies
- Third-party scripts

**Not required for:**

- Strictly necessary cookies (session, security)
- First-party analytics without tracking

**Implementation:**

```typescript
// Cookie consent should:
- Appear on first visit
- Allow accept/reject
- Remember user choice
- Block tracking until consent given
- Provide link to cookie policy
```

## Contact Form GDPR Compliance

### Data Minimization

Only collect necessary fields:

```typescript
interface ContactFormData {
  name: string // Required
  email: string // Required
  phone?: string // Optional
  message: string // Required
  consent: boolean // Required - explicit consent checkbox
}
```

### Explicit Consent

Add checkbox to contact form:

```
☐ Jag samtycker till att Utvedabygg behandlar mina personuppgifter
  för att hantera min förfrågan enligt integritetspolicyn.
```

### Email Handling via AWS SES

- Data in transit: Encrypted (TLS)
- Data at rest: Not stored by us (only in email)
- AWS SES: GDPR-compliant processor
- Consider: Data Processing Agreement with AWS if needed

### Implementation Checklist

- [ ] Explicit consent checkbox (required)
- [ ] Link to privacy policy near form
- [ ] Secure transmission (HTTPS)
- [ ] Don't store form data in database (send via email only)
- [ ] Include GDPR notice in confirmation email

## Cookie Management

### If NOT using analytics/tracking:

No cookie banner needed! Just document in privacy policy:

- "Vi använder inga spårningskakor på denna webbplats"
- May use session cookies for form functionality (strictly necessary)

### If using analytics (Google Analytics, etc.):

Must implement cookie consent:

**Recommended solution:**

- **Cookie Consent by Osano** (free tier available)
- **CookieYes** (free for small sites)
- **Custom React component** with localStorage

**Must comply with:**

- No tracking before consent
- Easy to reject
- Granular choices (if multiple types)
- Remember choice for 12 months max

## Privacy Policy Template Structure

```markdown
# Integritetspolicy

## 1. Introduktion

Utvedabygg värnar om din integritet...

## 2. Personuppgiftsansvarig

Företagsnamn: Utvedabygg
Kontakt: [email/phone]

## 3. Vilka personuppgifter samlar vi in?

- Kontaktformulär: namn, e-post, telefon, meddelande
- Teknisk data: IP-adress, webbläsare

## 4. Varför samlar vi in dina uppgifter?

- För att svara på dina förfrågningar
- Förbättra webbplatsen

## 5. Rättslig grund

- Berättigat intresse (kontaktformulär)
- Samtycke (cookies/analys)

## 6. Hur länge sparar vi dina uppgifter?

- Kontaktuppgifter: Tills ärendet är avslutat + X månader
- Loggar: Enligt värdleverantörens policy

## 7. Vem delar vi dina uppgifter med?

- AWS SES (e-postleverans)
- Vercel/Netlify (webbhotell)
- [Analytics provider om tillämpligt]

## 8. Dina rättigheter

- Rätt till tillgång
- Rätt till rättelse
- Rätt till radering
- Rätt att återkalla samtycke
- Rätt att lämna klagomål till IMY

## 9. Säkerhet

Vi använder HTTPS, krypterad e-post...

## 10. Kontakta oss

E-post: info@utvedabygg.se
```

## Implementation Plan

### Phase 1 - Before Launch

1. Create privacy policy page (`/integritetspolicy`)
2. Add consent checkbox to contact form
3. Ensure HTTPS enabled
4. Decide on analytics (yes/no)

### Phase 2 - If Using Analytics

1. Choose cookie consent solution
2. Implement cookie banner
3. Block analytics until consent
4. Create cookie policy page

### Phase 3 - Post Launch

1. Add privacy policy link to footer
2. Test contact form consent flow
3. Document data handling procedures internally
4. Set up data deletion process

## Tools & Resources

### Cookie Consent Solutions

- **react-cookie-consent** (NPM package)
- **CookieYes** (hosted solution)
- **Cookiebot** (enterprise)

### Privacy Policy Generators

- **IMY's guide** (Swedish DPA)
- **GDPR.eu template**
- Consider legal review for production

### Testing

- Verify consent checkbox is required
- Test without accepting cookies (analytics blocked)
- Check privacy policy is accessible
- Ensure HTTPS throughout site

## Important Notes

**For contact form only (no analytics):**

- Simple consent checkbox sufficient
- Basic privacy policy needed
- No cookie banner required
- Low complexity

**If adding Google Analytics later:**

- Must add cookie consent banner
- Update privacy policy
- Block GA until consent given
- More complex implementation

## Legal Disclaimer

This documentation provides guidelines but is not legal advice. Consider consulting with a privacy lawyer or GDPR specialist for:

- Final privacy policy review
- Data Processing Agreements
- Specific compliance questions
- Industry-specific requirements
