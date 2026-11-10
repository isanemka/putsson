# Överlämning av putsson.se

Det här dokumentet beskriver hur putsson.se är uppbyggd och vad som behöver flyttas när en ny byrå tar över sajten.

Fält markerade med **[fyll i]** fylls i av den som lämnar över.

## Översikt

| Del                    | Var den finns                                       | Ägare idag    |
| ---------------------- | --------------------------------------------------- | ------------- |
| Källkod                | GitHub: `isanemka/putsson`                          | [fyll i]      |
| Hosting                | Vercel-projektet `putsson`                          | [fyll i]      |
| Domän `putsson.se`     | Registrerad hos [fyll i], DNS hos [fyll i]          | [fyll i]      |
| E-post från formuläret | AWS SES, region `eu-north-1` om inget annat är satt | [fyll i]      |
| Statistik              | Vercel Analytics (ingår i Vercel-projektet)         | Följer Vercel |
| Kundomdömen            | Reco, venue-id `6089819` (`components/Reco.tsx`)    | [fyll i]      |

## Teknik

- Next.js 16 (App Router), React 19, TypeScript och Tailwind CSS v4
- Kontaktformuläret skickar e-post via AWS SES från en Server Action (`app/actions/contact.ts`)
- Tester: Vitest (enhetstester) och Playwright (end-to-end)
- Node.js 20 eller senare

Mer detaljer finns i [architecture.md](./architecture.md) och [deployment.md](./deployment.md).

## Så flyttas sajten

Ordningen nedan gör att sajten är uppe hela tiden.

### 1. Källkoden (GitHub)

1. Den nya byrån skapar en organisation på GitHub, eller anger vilken de vill använda.
2. Gå till repot → **Settings** → **Danger Zone** → **Transfer ownership** och ange deras organisation.
3. Den nya byrån godkänner överföringen.

Hela historiken, alla brancher och pull requests följer med. Gamla länkar till repot vidarebefordras automatiskt.

### 2. Hostingen (Vercel)

1. Den nya byrån skapar ett team på Vercel.
2. Gå till Vercel-projektet → **Settings** → **General** → **Transfer Project** och välj deras team.
3. Den nya byrån godkänner överföringen.
4. Efter flytten kopplar de om projektet till repot under **Settings → Git**, eftersom GitHub-kopplingen hör till kontot som gjorde den.

Domänerna, miljövariablerna och tidigare driftsättningar följer med projektet.

### 3. E-post från kontaktformuläret (AWS SES)

Ett AWS-konto kan inte flyttas mellan byråer, så den nya byrån sätter upp SES på sitt eget konto:

1. Verifiera domänen `putsson.se` i SES och lägg in de DKIM-poster som SES visar i DNS.
2. Om kontot är i sandlåde-läge: verifiera även mottagaradressen, eller ansök om produktionsåtkomst.
3. Skapa en åtkomstnyckel som bara får skicka e-post (`ses:SendEmail` och `ses:SendRawEmail`).
4. Byt ut `AWS_ACCESS_KEY_ID` och `AWS_SECRET_ACCESS_KEY` i Vercel, och `AWS_SES_REGION` om de använder en annan region.
5. Gör en ny driftsättning och skicka ett testmeddelande via formuläret.

När testmeddelandet har kommit fram stänger den gamla byrån av sina nycklar och de gamla SES-posterna tas bort ur DNS.

### 4. Domänen

- Om domänen är registrerad på den gamla byråns konto flyttas den till kunden eller till den nya byrån. Registraren tillhandahåller en flyttkod (auth-kod).
- Om domänen är köpt via Vercel följer den med Vercel-projektet.
- DNS ska fortsätta peka mot Vercel. Rätt poster visas under **Settings → Domains** i Vercel.

### 5. Övriga konton

- **Reco:** lämna över inloggningen till Reco-kontot om det inte redan ägs av kunden.
- **Google Search Console:** lägg till den nya byrån som användare, om sajten är registrerad där.

## Miljövariabler

Värdena finns i Vercel och ska aldrig skickas med i koden eller via e-post. Namnen är:

| Variabel                | Krävs | Används till                                                                    |
| ----------------------- | ----- | ------------------------------------------------------------------------------- |
| `AWS_ACCESS_KEY_ID`     | Ja    | AWS-nyckel för att skicka e-post via SES                                        |
| `AWS_SECRET_ACCESS_KEY` | Ja    | AWS-nyckel för att skicka e-post via SES                                        |
| `AWS_SES_REGION`        | Nej   | SES-region. Standard är `eu-north-1`                                            |
| `FROM_EMAIL`            | Ja    | Avsändare för e-post från formuläret. Måste vara verifierad i SES               |
| `CONTACT_EMAIL`         | Ja    | Mottagare av meddelanden från formuläret                                        |
| `NEXT_PUBLIC_SITE_URL`  | Nej   | Sajtens adress i metadata, sitemap och robots. Standard är `https://putsson.se` |

## Komma igång lokalt

```bash
npm install
npx playwright install
npm run dev
```

Lägg miljövariablerna i en `.env.local` för att testa kontaktformuläret lokalt. Filen ignoreras av git.

Kontroller att köra före en ändring går ut:

```bash
npm run lint
npm run test
npm run test:e2e
npm run build
```

## Bra att veta

- **Cookies och samtycke:** Vercel Analytics laddas först när besökaren godkänner cookiebannern. Reco-omdömena laddas först när besökaren klickar för att visa dem, eftersom Reco kan sätta egna cookies. Ändra inte detta utan att även se över integritets- och cookiesidorna.
- **www eller inte:** Vercel skickar `putsson.se` vidare till `www.putsson.se`, men `NEXT_PUBLIC_SITE_URL` är inte satt, så metadata och sitemap använder `https://putsson.se`. Det fungerar, men det är bättre för sökmotorerna om båda pekar på samma adress.
- **Felövervakning:** det finns ingen felövervakning (till exempel Sentry). Fel syns i Vercels runtime-loggar.

## Checklista

- [ ] GitHub-repot är överfört och godkänt
- [ ] Vercel-projektet är överfört och godkänt
- [ ] Vercel är kopplat till repot på nya kontot (en push till `main` ger en ny driftsättning)
- [ ] SES är uppsatt på nya AWS-kontot och nycklarna är bytta i Vercel
- [ ] Ett testmeddelande från kontaktformuläret har kommit fram
- [ ] Gamla AWS-nycklar är avstängda och gamla SES-poster borttagna ur DNS
- [ ] Domänen är flyttad, eller det är klart vem som äger den
- [ ] Reco och Google Search Console är överlämnade
- [ ] Den gamla byrån har tagits bort från GitHub, Vercel och övriga konton
