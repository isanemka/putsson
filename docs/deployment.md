# Deployment Guide

## Platform: Vercel

Vercel is the recommended and chosen platform for this project, created by the Next.js team.

## Prerequisites

- GitHub repository
- Vercel account (free tier available)
- Domain name (optional, Vercel provides free .vercel.app subdomain)
- AWS SES credentials
- Sentry account (optional but recommended)

## Initial Setup

### 1. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New Project"
4. Import the `utvedabygg` repository
5. Vercel auto-detects Next.js settings ✅
6. Configure environment variables (see below)
7. Click "Deploy"

### 2. Environment Variables

### Required for Production

```bash
# AWS SES Configuration
AWS_REGION=eu-north-1  # or your preferred region
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
AWS_SES_FROM_EMAIL=info@utvedabygg.se  # verified sender email
CONTACT_FORM_TO_EMAIL=recipient@example.com  # where to receive form submissions
```

### Setup Instructions

**AWS SES:**

1. Verify your sender email address in AWS SES
2. If in SES sandbox mode, also verify recipient email
3. Add environment variables to your deployment platform
4. For local development, create `.env.local` file (not committed to git)

**Sentry (Recommended):**

1. Create free account at sentry.io
2. Create new Next.js project in Sentry
3. Copy DSN and add to environment variables
4. Sentry will automatically track errors in production

## Vercel Features

### Automatic Deployments

- Every push to `main` → Production deployment
- Every pull request → Preview deployment with unique URL
- Rollback to previous deployment in one click

### Performance

- Automatic edge caching
- Image optimization
- Global CDN
- Zero configuration

### Built-in Features

- SSL/HTTPS automatic
- Analytics available (paid)
- Web Vitals monitoring
- Deployment logs and monitoring

## Custom Domain

1. Add domain in deployment platform settings
2. Configure DNS records:
   - A record or CNAME pointing to deployment platform
3. Enable SSL (automatic on most platforms)

## Post-Deployment

- [ ] Test all pages and functionality on production URL
- [ ] Verify mobile responsiveness (test on real devices)
- [ ] Test on Chrome, Edge, and Safari (desktop + mobile)
- [ ] Verify layout works at 320px width (narrow mobile)
- [ ] Check SEO metadata with view-source
- [ ] Test contact form end-to-end (send real email)
- [ ] Verify Sentry error tracking is working
- [ ] Set up error notifications in Sentry
- [ ] Submit sitemap to Google Search Console
- [ ] Configure custom domain (if applicable)
- [ ] Test SSL certificate
- [ ] Run Lighthouse audit (aim for 90+ scores)
- [ ] Test landscape and portrait orientations on mobile

## Continuous Deployment Workflow

1. Create feature branch: `git checkout -b feature/new-feature`
2. Make changes and commit
3. Push branch: `git push origin feature/new-feature`
4. Create pull request on GitHub
5. Vercel creates preview deployment automatically
6. Review preview URL
7. Merge PR → Automatic production deployment

## Monitoring

- **Vercel Dashboard:** Deployment status, logs, analytics
- **Sentry:** Error tracking and monitoring
- **Google Search Console:** SEO performance
- **Google Analytics:** User behavior (if implemented)

_This guide will be updated as deployment requirements are finalized._
