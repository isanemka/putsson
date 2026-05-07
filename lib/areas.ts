export type Area = {
  /** URL-safe slug, used in /fonsterputs/[ort] */
  slug: string
  /** Display name shown to users */
  name: string
  /** Short description of the area for the service areas grid */
  description: string
  /** SEO-friendly description used in page metadata */
  metaDescription: string
  /** Nearby areas/neighborhoods referenced in content */
  nearby: string[]
}

export const areas: Area[] = [
  // 10 municipalities
  {
    slug: 'ale',
    name: 'Ale',
    description: 'Bohus, Nödinge, Surte och Älvängen',
    metaDescription:
      'Fönsterputs i Ale – PUTSSON erbjuder professionell fönsterputsning för villor och företag i Bohus, Nödinge, Nol, Surte och Älvängen. Boka fast pris idag.',
    nearby: ['Bohus', 'Nödinge', 'Nol', 'Surte', 'Älvängen', 'Skepplanda'],
  },
  {
    slug: 'alingsas',
    name: 'Alingsås',
    description: 'Alingsås, Ingared och Sollebrunn',
    metaDescription:
      'Fönsterputs i Alingsås – professionell fönsterputsning för villor och företag i Alingsås, Ingared och Sollebrunn. Fast pris och pålitlig service.',
    nearby: ['Ingared', 'Sollebrunn', 'Västra Bodarna', 'Norsesund'],
  },
  {
    slug: 'boras',
    name: 'Borås',
    description: 'Borås, Fristad och Sandared',
    metaDescription:
      'Fönsterputs i Borås – PUTSSON erbjuder fönsterputsning för villor, lägenheter och företag i Borås, Fristad, Sandared och Sjömarken. Boka fast pris idag.',
    nearby: ['Dalsjöfors', 'Fristad', 'Sandared', 'Sjömarken', 'Viskafors'],
  },
  {
    slug: 'goteborg',
    name: 'Göteborg',
    description: 'Hela Göteborgs kommun',
    metaDescription:
      'Fönsterputs i Göteborg – PUTSSON putsar fönster för villor, lägenheter och företag i hela Göteborg. Från Askim till Hisingen och Majorna. Boka fast pris idag.',
    nearby: ['Centrum', 'Hisingen', 'Majorna', 'Frölunda', 'Angered'],
  },
  {
    slug: 'harryda',
    name: 'Härryda',
    description: 'Mölnlycke, Landvetter och Hindås',
    metaDescription:
      'Fönsterputs i Härryda – PUTSSON erbjuder fönsterputsning i Mölnlycke, Landvetter, Hindås och hela Härryda kommun. Fast pris och pålitliga rutiner.',
    nearby: ['Mölnlycke', 'Landvetter', 'Rävlanda', 'Hindås', 'Hällingsjö'],
  },
  {
    slug: 'kungsbacka',
    name: 'Kungsbacka',
    description: 'Kungsbacka, Onsala och Särö',
    metaDescription:
      'Fönsterputs i Kungsbacka – PUTSSON putsar fönster för villor, lägenheter och bostadsrättsföreningar i Kungsbacka, Onsala och Särö. Snabb återkoppling och fast pris.',
    nearby: ['Onsala', 'Fjärås', 'Särö', 'Åsa', 'Vallda'],
  },
  {
    slug: 'kungalv',
    name: 'Kungälv',
    description: 'Kungälv, Ytterby och Marstrand',
    metaDescription:
      'Fönsterputs i Kungälv – PUTSSON putsar fönster för villor, lägenheter och bostadsrättsföreningar i Kungälv, Ytterby och Marstrand. Boka fast pris idag.',
    nearby: ['Ytterby', 'Marstrand', 'Diseröd', 'Kode', 'Kärna'],
  },
  {
    slug: 'lerum',
    name: 'Lerum',
    description: 'Lerum, Stenkullen och Gråbo',
    metaDescription:
      'Fönsterputs i Lerum – professionell och pålitlig fönsterputsning för hem och företag i Lerum, Gråbo, Floda och Stenkullen. Boka fast pris online.',
    nearby: ['Stenkullen', 'Gråbo', 'Floda', 'Tollered', 'Sjövik'],
  },
  {
    slug: 'molndal',
    name: 'Mölndal',
    description: 'Mölndal, Lindome och Kållered',
    metaDescription:
      'Fönsterputs i Mölndal – PUTSSON erbjuder professionell fönsterputsning för villor, lägenheter och företag i Mölndal, Lindome och Kållered. Boka fast pris idag.',
    nearby: ['Kållered', 'Lindome', 'Fässberg', 'Krokslätt'],
  },
  {
    slug: 'partille',
    name: 'Partille',
    description: 'Partille, Sävedalen och Jonsered',
    metaDescription:
      'Fönsterputs i Partille – professionell fönsterputsning för villor och företag i Partille, Sävedalen, Jonsered och Öjersjö. Fast pris, inga bindningstider.',
    nearby: ['Sävedalen', 'Jonsered', 'Öjersjö', 'Furulund'],
  },
  // 5 orter
  {
    slug: 'olofstorp',
    name: 'Olofstorp',
    description: 'Olofstorp med omnejd',
    metaDescription:
      'Fönsterputs i Olofstorp – PUTSSON erbjuder fönsterputsning för villor och bostadsrätter i Olofstorp. Fast pris och pålitlig service.',
    nearby: ['Angered', 'Bergsjön', 'Kortedala', 'Kärralund'],
  },
  {
    slug: 'grabo',
    name: 'Gråbo',
    description: 'Gråbo med omnejd',
    metaDescription:
      'Fönsterputs i Gråbo – professionell fönsterputsning för hem och företag i Gråbo med omnejd. Fast pris och snabb återkoppling.',
    nearby: ['Lerum', 'Stenkullen', 'Tollered', 'Floda'],
  },
  {
    slug: 'floda',
    name: 'Floda',
    description: 'Floda med omnejd',
    metaDescription:
      'Fönsterputs i Floda – PUTSSON putsar fönster för villor och bostadsrätter i Floda med omnejd. Fast pris och pålitlig service.',
    nearby: ['Lerum', 'Gråbo', 'Stenkullen', 'Tollered'],
  },
  {
    slug: 'jonsered',
    name: 'Jonsered',
    description: 'Jonsered med omnejd',
    metaDescription:
      'Fönsterputs i Jonsered – professionell fönsterputsning för villor och lägenheter i Jonsered med omnejd. Fast pris och snabb återkoppling.',
    nearby: ['Partille', 'Sävedalen', 'Öjersjö', 'Furulund'],
  },
  {
    slug: 'savedalen',
    name: 'Sävedalen',
    description: 'Sävedalen med omnejd',
    metaDescription:
      'Fönsterputs i Sävedalen – PUTSSON erbjuder fönsterputsning för villor och bostadsrätter i Sävedalen. Fast pris och pålitlig service.',
    nearby: ['Partille', 'Jonsered', 'Öjersjö', 'Furulund'],
  },
]

/** Look up an area by slug, returns undefined if not found */
export function getAreaBySlug(slug: string): Area | undefined {
  return areas.find((a) => a.slug === slug)
}
