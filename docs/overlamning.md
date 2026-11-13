# Överlämning av putsson.se

Det här dokumentet beskriver hur putsson.se är uppbyggd och hur en ny byrå sätter upp sajten på sina egna konton.

Fält markerade med **[fyll i]** fylls i av den som lämnar över.

## Översikt

| Del                    | Var den finns                                       | Ägare idag  |
| ---------------------- | --------------------------------------------------- | ----------- |
| Källkod                | Zip-fil (finns idag på GitHub: `isanemka/putsson`)  | [fyll i]    |
| Hosting                | Vercel-projektet `putsson`                          | [fyll i]    |
| Domän `putsson.se`     | Registrerad hos [fyll i], DNS hos [fyll i]          | [fyll i]    |
| E-post från formuläret | AWS SES, region `eu-north-1` om inget annat är satt | [fyll i]    |
| Statistik              | Vercel Analytics (ingår i Vercel-projektet)         | Som hosting |
| Kundomdömen            | Reco, venue-id `6089819` (`components/Reco.tsx`)    | [fyll i]    |

## Teknik

- Next.js 16 (App Router), React 19, TypeScript och Tailwind CSS v4
- Kontaktformuläret skickar e-post via AWS SES från en Server Action (`app/actions/contact.ts`)
- Tester: Vitest (enhetstester) och Playwright (end-to-end)
- Node.js 20 eller senare

Mer detaljer finns i [architecture.md](./architecture.md) och [deployment.md](./deployment.md).

## Så flyttas sajten

Koden lämnas över som en zip-fil. Den nya byrån sätter upp hosting och e-post på sina egna konton. Den gamla sajten är uppe tills domänen flyttas i steg 4. Då kan det bli ett kort avbrott.

### 1. Koden

Zip-filen innehåller all kod och dokumentation, men inga lösenord, nycklar eller andra värden från Vercel.

1. Skapa ett eget repo på GitHub (eller annan git-tjänst) och lägg upp koden där.
2. Kör `npm install` och `npm run build` för att kontrollera att allt bygger.

### 2. Hostingen (Vercel)

1. Skapa ett nytt projekt i ert Vercel-team och importera repot. Vercel känner igen Next.js automatiskt.
2. Lägg in miljövariablerna (se tabellen nedan) för både Production och Preview.
3. Driftsätt och kontrollera sajten på projektets `.vercel.app`-adress innan domänen flyttas.
4. Om ni vill behålla besöksstatistiken: aktivera Vercel Analytics i projektet. Historiken från det gamla projektet följer inte med.

### 3. E-post från kontaktformuläret (AWS SES)

Om AWS-kontot används bara för putsson.se kan det i stället flyttas till kunden eller den nya byrån, se [AWS guide för att överföra ett konto](https://repost.aws/knowledge-center/transfer-aws-account). Då behövs bara steg 3–5 nedan, med nya nycklar.

Annars sätter den nya byrån upp SES på sitt eget AWS-konto:

1. Verifiera domänen `putsson.se` i SES och lägg in de DKIM-poster som SES visar hos den som hanterar DNS. Domänen kan vara verifierad i båda AWS-kontona samtidigt, så formuläret fungerar under hela bytet.
2. Om kontot är i sandlåde-läge: verifiera även mottagaradressen, eller ansök om produktionsåtkomst.
3. Skapa en åtkomstnyckel som bara får skicka e-post (`ses:SendEmail` och `ses:SendRawEmail`).
4. Lägg in nyckeln som `AWS_ACCESS_KEY_ID` och `AWS_SECRET_ACCESS_KEY` i Vercel, och `AWS_SES_REGION` om ni använder en annan region än `eu-north-1`.
5. Driftsätt igen och skicka ett testmeddelande via formuläret på `.vercel.app`-adressen.

### 4. Domänen

1. Lägg till `www.putsson.se` och `putsson.se` i ert Vercel-projekt under **Settings → Domains**, och ställ in att `putsson.se` skickas vidare till `www.putsson.se`.
2. Eftersom domänen redan används i den gamla byråns Vercel-konto ber Vercel om en TXT-post i DNS för att bevisa att ni får använda den. När posten är inlagd flyttas domänen över till ert projekt.
3. Kontrollera att `https://www.putsson.se` visar den nya driftsättningen och att `https://putsson.se` skickas vidare dit.

Om domänen är registrerad på den gamla byråns konto hos en registrar flyttas den till kunden eller till den nya byrån med en flyttkod (auth-kod) från registraren.

### 5. Övriga konton

- **Reco:** lämna över inloggningen till Reco-kontot om det inte redan ägs av kunden.
- **Google Search Console:** lägg till den nya byrån som användare, om sajten är registrerad där, och skicka in `https://www.putsson.se/sitemap.xml`.

### 6. Städa upp hos den gamla byrån

När den nya sajten och kontaktformuläret fungerar:

1. Ta bort det gamla Vercel-projektet.
2. Stäng av de gamla AWS-nycklarna och ta bort domänen ur SES i det gamla AWS-kontot. Ta sedan bort de gamla DKIM-posterna ur DNS. Varje AWS-konto har egna poster, så ta inte bort den nya byråns.
3. Arkivera det gamla GitHub-repot.

## Miljövariabler

AWS-nycklarna skapar den nya byrån själv, och de ska aldrig skickas via e-post eller ligga i koden. Övriga värden skickas med av den gamla byrån.

| Variabel                | Krävs | Används till                                                                        |
| ----------------------- | ----- | ----------------------------------------------------------------------------------- |
| `AWS_ACCESS_KEY_ID`     | Ja    | AWS-nyckel för att skicka e-post via SES                                            |
| `AWS_SECRET_ACCESS_KEY` | Ja    | AWS-nyckel för att skicka e-post via SES                                            |
| `AWS_SES_REGION`        | Nej   | SES-region. Standard är `eu-north-1`                                                |
| `FROM_EMAIL`            | Ja    | Avsändare för e-post från formuläret. Måste vara verifierad i SES. Idag: [fyll i]   |
| `CONTACT_EMAIL`         | Ja    | Mottagare av meddelanden från formuläret. Idag: [fyll i]                            |
| `NEXT_PUBLIC_SITE_URL`  | Nej   | Sajtens adress i metadata, sitemap och robots. Standard är `https://www.putsson.se` |

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
- **Huvudadress:** sajten använder `https://www.putsson.se`. Vercel skickar `putsson.se` vidare dit, och metadata, sitemap och robots använder samma adress. Sätt inte `NEXT_PUBLIC_SITE_URL` till adressen utan `www`, då pekar sidorna på en adress som skickas vidare.
- **Felövervakning:** det finns ingen felövervakning (till exempel Sentry). Fel syns i Vercels runtime-loggar.

## Checklista

- [ ] Koden ligger i den nya byråns repo och bygger
- [ ] Nytt Vercel-projekt är uppsatt med alla miljövariabler
- [ ] SES är uppsatt och nycklarna ligger i Vercel
- [ ] Ett testmeddelande från kontaktformuläret har kommit fram
- [ ] Domänerna är flyttade till det nya Vercel-projektet och `putsson.se` skickas vidare till `www`
- [ ] Domänregistreringen ligger hos kunden eller den nya byrån
- [ ] Reco och Google Search Console är överlämnade
- [ ] Det gamla Vercel-projektet är borttaget, gamla AWS-nycklar avstängda och gamla DKIM-poster borttagna
