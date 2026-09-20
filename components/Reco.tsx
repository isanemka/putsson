import Reveal from '@/components/Reveal'

const RECO_WIDGET_SRC =
  'https://widget.reco.se/v2/venues/6089819/horizontal/xlarge?inverted=false&border=true&lang=sv'

export default function Reco() {
  return (
    <section
      aria-label="Kundomdömen från Reco"
      className="bg-cream py-12 sm:py-16"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        <Reveal>
          <iframe
            src={RECO_WIDGET_SRC}
            title="Putsson AB - Omdömen på Reco"
            height={225}
            loading="lazy"
            className="block w-full overflow-hidden border-0"
          />
        </Reveal>
      </div>
    </section>
  )
}
