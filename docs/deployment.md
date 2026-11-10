# Deployment Guide

## Platform: Vercel

The site is hosted on Vercel. Every push to `main` deploys to production, and every pull request gets a preview deployment.

## Prerequisites

- Access to the GitHub repository
- Access to the Vercel project (`putsson`)
- An AWS account with SES set up for `putsson.se` (used by the contact form)
- Access to DNS for `putsson.se`

## Initial Setup

### 1. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New Project"
4. Import the repository
5. Vercel auto-detects the Next.js settings
6. Add the environment variables below
7. Click "Deploy"

### 2. Environment Variables

These are the names the code reads. Set them in Vercel under **Settings → Environment Variables** for both Production and Preview.

| Variable                | Required | Used for                                                                              |
| ----------------------- | -------- | ------------------------------------------------------------------------------------- |
| `AWS_ACCESS_KEY_ID`     | Yes      | AWS credentials for sending email via SES                                             |
| `AWS_SECRET_ACCESS_KEY` | Yes      | AWS credentials for sending email via SES                                             |
| `AWS_SES_REGION`        | No       | SES region. Defaults to `eu-north-1`                                                  |
| `FROM_EMAIL`            | Yes      | Sender address for contact form email. Must be verified in SES                        |
| `CONTACT_EMAIL`         | Yes      | Where contact form submissions are delivered                                          |
| `NEXT_PUBLIC_SITE_URL`  | No       | Canonical site URL for metadata, sitemap and robots. Defaults to `https://putsson.se` |

If `FROM_EMAIL` or `CONTACT_EMAIL` is missing, the contact form returns an error and logs `Missing FROM_EMAIL or CONTACT_EMAIL environment variables`.

The AWS SDK picks up `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` automatically. There is no separate config file.

For local development, put the same variables in a `.env.local` file. It is ignored by git and must never be committed.

### 3. AWS SES Setup

1. Verify the domain `putsson.se` (or the `FROM_EMAIL` address) in SES, in the region you set in `AWS_SES_REGION`. This adds DKIM records to DNS.
2. If the SES account is still in sandbox mode, also verify the `CONTACT_EMAIL` address, or request production access.
3. Create an IAM user (or access key) that is only allowed `ses:SendEmail` and `ses:SendRawEmail`.
4. Add the key to Vercel as `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.
5. Redeploy and send a test message through the contact form.

## Domains

The Vercel project has these domains:

- `www.putsson.se`: the main domain
- `putsson.se`: redirects to `www.putsson.se`
- `putsson.vercel.app`: Vercel's default domain

DNS for `putsson.se` must point to Vercel. Vercel shows the exact records under **Settings → Domains**. SSL certificates are issued automatically.

## Third-Party Services

- **Vercel Analytics:** cookieless analytics. It only loads after the visitor accepts the cookie banner (`components/AnalyticsLoader.tsx`).
- **Reco:** customer reviews embedded from reco.se (`components/Reco.tsx`). The iframe only loads when the visitor clicks to show it, because Reco may set its own cookies.

No error tracking service (such as Sentry) is set up.

## Post-Deployment

- [ ] Test all pages and functionality on the production URL
- [ ] Verify mobile responsiveness (test on real devices)
- [ ] Test on Chrome, Edge, and Safari (desktop + mobile)
- [ ] Verify layout works at 320px width (narrow mobile)
- [ ] Check SEO metadata with view-source
- [ ] Test the contact form end to end (send a real email)
- [ ] Submit the sitemap to Google Search Console
- [ ] Test the SSL certificate
- [ ] Run a Lighthouse audit (aim for 90+ scores)
- [ ] Test landscape and portrait orientations on mobile

## Continuous Deployment Workflow

1. Create a feature branch: `git checkout -b feature/new-feature`
2. Make changes and commit
3. Push the branch: `git push origin feature/new-feature`
4. Create a pull request on GitHub
5. Vercel creates a preview deployment automatically
6. Review the preview URL
7. Merge the PR → automatic production deployment

## Monitoring

- **Vercel Dashboard:** deployment status, runtime logs (including contact form errors) and analytics
- **Google Search Console:** SEO performance
