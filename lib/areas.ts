export type Area = {
  /** URL-safe slug, used in /fonsterputs/[slug] */
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
  {
    slug: 'molndal',
    name: 'Mölndal',
    description: 'Mölndals villaområden och bostadsrätter',
    metaDescription:
      'Fönsterputs i Mölndal – PUTSSON erbjuder professionell fönsterputsning för villor, lägenheter och företag i Mölndal med omnejd. Boka fast pris idag.',
    nearby: ['Kållered', 'Fässberg', 'Lindome', 'Krokslätt'],
  },
  {
    slug: 'partille',
    name: 'Partille',
    description: 'Partille och Sävedalen',
    metaDescription:
      'Fönsterputs i Partille – professionell fönsterputsning för villor och företag i Partille, Sävedalen och Jonsered. Fast pris, inga bindningstider.',
    nearby: ['Sävedalen', 'Jonsered', 'Furulund', 'Öjersjö'],
  },
  {
    slug: 'kungsbacka',
    name: 'Kungsbacka',
    description: 'Kungsbacka och Askim',
    metaDescription:
      'Fönsterputs i Kungsbacka – PUTSSON putsar fönster för villor, lägenheter och bostadsrättsföreningar i Kungsbacka. Snabb återkoppling och fast pris.',
    nearby: ['Onsala', 'Vallda', 'Kullavik', 'Åsa'],
  },
  {
    slug: 'lerum',
    name: 'Lerum',
    description: 'Lerum, Stenkullen och Gråbo',
    metaDescription:
      'Fönsterputs i Lerum – professionell och pålitlig fönsterputsning för hem och företag i Lerum, Stenkullen och Gråbo. Boka fast pris online.',
    nearby: ['Stenkullen', 'Gråbo', 'Floda', 'Tollered'],
  },
  {
    slug: 'harryda',
    name: 'Härryda',
    description: 'Mölnlycke och Landvetter',
    metaDescription:
      'Fönsterputs i Härryda – PUTSSON erbjuder fönsterputsning i Mölnlycke, Landvetter och hela Härryda kommun. Fast pris och pålitliga rutiner.',
    nearby: ['Mölnlycke', 'Landvetter', 'Rävlanda', 'Hindås'],
  },
  {
    slug: 'molnlycke',
    name: 'Mölnlycke',
    description: 'Mölnlycke centrum och villaområden',
    metaDescription:
      'Fönsterputs i Mölnlycke – professionell fönsterputsning för villor, lägenheter och företag i Mölnlycke. Snabb återkoppling och fast pris.',
    nearby: ['Råda', 'Landvetter', 'Rävlanda', 'Härryda'],
  },
  {
    slug: 'kungalv',
    name: 'Kungälv',
    description: 'Kungälv och Ytterby',
    metaDescription:
      'Fönsterputs i Kungälv – PUTSSON putsar fönster för villor, lägenheter och bostadsrättsföreningar i Kungälv och Ytterby. Boka fast pris idag.',
    nearby: ['Ytterby', 'Marstrand', 'Diseröd', 'Kode'],
  },
  {
    slug: 'ale',
    name: 'Ale',
    description: 'Nödinge, Älvängen och Skepplanda',
    metaDescription:
      'Fönsterputs i Ale – professionell fönsterputsning för hem och företag i Nödinge, Älvängen och Skepplanda. Fast pris och flexibla tider.',
    nearby: ['Nödinge', 'Älvängen', 'Skepplanda', 'Surte'],
  },
  {
    slug: 'stenungsund',
    name: 'Stenungsund',
    description: 'Stenungsund och Ljungskile',
    metaDescription:
      'Fönsterputs i Stenungsund – PUTSSON erbjuder fönsterputsning för villor och företag i Stenungsund och Ljungskile. Snabb återkoppling och fast pris.',
    nearby: ['Ljungskile', 'Ucklum', 'Spekeröd', 'Jörlanda'],
  },
  {
    slug: 'ockero',
    name: 'Öckerö',
    description: 'Öckerö, Hönö och Björkö',
    metaDescription:
      'Fönsterputs i Öckerö – professionell fönsterputsning på öarna i Öckerö kommun. Hönö, Björkö, Fotö och mer. Fast pris och pålitlig service.',
    nearby: ['Hönö', 'Björkö', 'Fotö', 'Kalvsund'],
  },
  {
    slug: 'askim',
    name: 'Askim',
    description: 'Askim och Frölunda',
    metaDescription:
      'Fönsterputs i Askim – PUTSSON putsar fönster för villor, lägenheter och bostadsrätter i Askim och södra Göteborg. Fast pris, inga bindningstider.',
    nearby: ['Frölunda', 'Hovås', 'Billdal', 'Västra Frölunda'],
  },
  {
    slug: 'torslanda',
    name: 'Torslanda',
    description: 'Torslanda och Hisingen väst',
    metaDescription:
      'Fönsterputs i Torslanda – professionell fönsterputsning för villor och lägenheter i Torslanda och västra Hisingen. Boka fast pris idag.',
    nearby: ['Öckerö', 'Björlanda', 'Säve', 'Hisings Kärra'],
  },
  {
    slug: 'hisingen',
    name: 'Hisingen',
    description: 'Backa, Lundby och Eriksberg',
    metaDescription:
      'Fönsterputs i Hisingen – PUTSSON erbjuder fönsterputsning för villor, lägenheter och företag på Hisingen. Backa, Lundby och Eriksberg.',
    nearby: ['Backa', 'Lundby', 'Eriksberg', 'Biskopsgården'],
  },
  {
    slug: 'lindome',
    name: 'Lindome',
    description: 'Lindome och södra Mölndal',
    metaDescription:
      'Fönsterputs i Lindome – professionell fönsterputsning för hem och företag i Lindome och södra Mölndal. Fast pris och snabb återkoppling.',
    nearby: ['Kållered', 'Mölndal', 'Annedal', 'Hällesåker'],
  },
  {
    slug: 'majorna',
    name: 'Majorna',
    description: 'Majorna, Linné och Masthugget',
    metaDescription:
      'Fönsterputs i Majorna – PUTSSON putsar fönster för lägenheter, bostadsrätter och företag i Majorna, Linné och Masthugget. Boka fast pris idag.',
    nearby: ['Linné', 'Masthugget', 'Stigberget', 'Kungsladugård'],
  },
]

/** Look up an area by slug, returns undefined if not found */
export function getAreaBySlug(slug: string): Area | undefined {
  return areas.find((a) => a.slug === slug)
}
