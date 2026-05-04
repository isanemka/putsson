import Image from 'next/image'
import Reveal from './Reveal'

const photos: { src: string; alt: string }[] = [
  {
    src: '/img/IMG_5661.jpeg',
    alt: 'Fönsterputsning med professionell utrustning',
  },
  {
    src: '/img/IMG_5662.jpeg',
    alt: 'PUTSSON-medarbetare putsar fönster utifrån',
  },
  {
    src: '/img/IMG_5663.jpeg',
    alt: 'Blanka fönsterrutor efter professionell puts',
  },
  {
    src: '/img/IMG_5666.jpeg',
    alt: 'Fönsterputs på villa i Göteborg',
  },
  {
    src: '/img/IMG_5678.jpeg',
    alt: 'Detalj av skrapa mot fönsterglas',
  },
  {
    src: '/img/IMG_5683.jpeg',
    alt: 'PUTSSON-medarbetare i arbete med skrapa',
  },
  {
    src: '/img/IMG_5702.jpeg',
    alt: 'Fönsterputsning – glasklart resultat',
  },
]

export default function Gallery() {
  return (
    <section
      aria-label="Galleri – vårt arbete"
      className="bg-cream py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue">
              Galleri
            </p>
            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              Resultaten talar för sig själva.
            </h2>
          </div>
        </Reveal>

        <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
          {photos.map((photo, i) => (
            <Reveal key={photo.src} delay={i * 60}>
              <div className="mb-4 break-inside-avoid overflow-hidden rounded-2xl">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={600}
                  height={800}
                  className="w-full object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
