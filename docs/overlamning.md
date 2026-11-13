# Överlämning av putsson.se

Det här dokumentet beskriver hur putsson.se är uppbyggd och hur en ny byrå sätter upp sajten på sina egna konton.

## Översikt

| Del                    | Var den finns                                                  | Ägare idag                             |
| ---------------------- | -------------------------------------------------------------- | -------------------------------------- |
| Källkod                | Zip-fil                                                        | Kunden. Förvaltas idag av PixelPioneer |
| Hosting                | Vercel-projektet `putsson`                                     | PixelPioneer                           |
| Domän `putsson.se`     | Registrerad hos egensajt.se. Flyttas till den nya byrån        | PixelPioneer                           |
| E-post från formuläret | AWS SES (`eu-north-1`). Ersätts av den nya byråns egen lösning | PixelPioneer                           |
| Statistik              | Vercel Analytics (ingår i Vercel-projektet)                    | PixelPioneer                           |
| Kundomdömen            | Reco, venue-id `6089819` (`components/Reco.tsx`)               | Kunden                                 |

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

### 3. E-post från kontaktformuläret

Kontaktformuläret skickar idag e-post via AWS SES på PixelPioneers AWS-konto. Kontot används för andra kunder och följer inte med, så den nya byrån behöver en egen lösning.

Enklast är att sätta upp SES på ett eget AWS-konto, eftersom koden redan är byggd för det:

1. Verifiera domänen `putsson.se` i SES och lägg in de DKIM-poster som SES visar i DNS. Den gamla sajtens formulär fortsätter fungera under tiden, eftersom det skickar från PixelPioneers adress.
2. Om kontot är i sandlåde-läge: verifiera även mottagaradressen, eller ansök om produktionsåtkomst.
3. Skapa en åtkomstnyckel som bara får skicka e-post (`ses:SendEmail` och `ses:SendRawEmail`).
4. Lägg in nyckeln som `AWS_ACCESS_KEY_ID` och `AWS_SECRET_ACCESS_KEY` i Vercel, och `AWS_SES_REGION` om ni använder en annan region än `eu-north-1`. Sätt `FROM_EMAIL` till en adress på `putsson.se`, till exempel `no-reply@putsson.se`. Dagens avsändare `putsson@pixelpioneer.se` hör till PixelPioneers domän och kan inte verifieras på ert konto.
5. Driftsätt igen och skicka ett testmeddelande via formuläret på `.vercel.app`-adressen.

Vill ni använda en annan e-posttjänst behöver utskicket i `app/actions/contact.ts` skrivas om för den tjänsten, och miljövariablerna ändras därefter.

### 4. Domänen

Domänen `putsson.se` är registrerad hos egensajt.se på PixelPioneers konto och flyttas till den nya byrån. PixelPioneer begär en flyttkod (auth-kod) hos egensajt.se och skickar den till den nya byrån.

Steg 3 och 4 kräver att poster läggs in i DNS. Fram till att domänen är flyttad lägger PixelPioneer in de poster som den nya byrån behöver.

1. Lägg till `www.putsson.se` och `putsson.se` i ert Vercel-projekt under **Settings → Domains**, och ställ in att `putsson.se` skickas vidare till `www.putsson.se`.
2. Eftersom domänen redan används i PixelPioneers Vercel-konto ber Vercel om en TXT-post i DNS för att bevisa att ni får använda den. När posten är inlagd flyttas domänen över till ert projekt.
3. Kontrollera att `https://www.putsson.se` visar den nya driftsättningen och att `https://putsson.se` skickas vidare dit.

Om ni flyttar DNS till en ny leverantör i samband med domänflytten: lägg in samma poster där (Vercel, DKIM för SES och eventuella MX-poster för kundens e-post) innan namnservrarna byts.

### 5. Övriga konton

- **Reco:** kontot ägs av kunden. Inget behöver flyttas.
- **Google Search Console:** lägg till den nya byrån som användare, om sajten är registrerad där, och skicka in `https://www.putsson.se/sitemap.xml`.

### 6. Städa upp hos PixelPioneer

När den nya sajten och kontaktformuläret fungerar:

1. Ta bort det gamla Vercel-projektet.
2. Stäng av AWS-nycklarna som används för putsson.se. Om `putsson.se` är verifierad i SES på PixelPioneers konto: ta bort den där och ta bort de gamla DKIM-posterna ur DNS. Varje AWS-konto har egna poster, så ta inte bort den nya byråns.
3. Arkivera det gamla GitHub-repot.

## Miljövariabler

AWS-nycklarna skapar den nya byrån själv, och de ska aldrig skickas via e-post eller ligga i koden.

| Variabel                | Krävs | Används till                                                                                                                                                               |
| ----------------------- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AWS_ACCESS_KEY_ID`     | Ja    | AWS-nyckel för att skicka e-post via SES                                                                                                                                   |
| `AWS_SECRET_ACCESS_KEY` | Ja    | AWS-nyckel för att skicka e-post via SES                                                                                                                                   |
| `AWS_SES_REGION`        | Nej   | SES-region. Standard är `eu-north-1`                                                                                                                                       |
| `FROM_EMAIL`            | Ja    | Avsändare för e-post från formuläret. Måste vara verifierad i SES. Idag `putsson@pixelpioneer.se`, som inte kan användas efter flytten. Byt till en adress på `putsson.se` |
| `CONTACT_EMAIL`         | Ja    | Mottagare av meddelanden från formuläret. Idag `info@putsson.se`                                                                                                           |
| `NEXT_PUBLIC_SITE_URL`  | Nej   | Sajtens adress i metadata, sitemap och robots. Standard är `https://www.putsson.se`                                                                                        |

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
- [ ] Domänen är flyttad från egensajt.se-kontot till den nya byrån
- [ ] Google Search Console är överlämnat
- [ ] Det gamla Vercel-projektet är borttaget, gamla AWS-nycklar avstängda och gamla DKIM-poster borttagna
