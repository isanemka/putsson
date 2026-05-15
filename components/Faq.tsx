'use client'

import { useState } from 'react'
import { faqItems as items } from '@/lib/faq'

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="scroll-mt-24 bg-mist/40 py-24 sm:py-32">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 sm:px-10 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue">
            Vanliga frågor
          </p>
          <h2 className="mt-4 text-4xl font-bold text-navy sm:text-5xl">
            Allt du undrat över <br className="hidden sm:block" />
            men aldrig vågat fråga.
          </h2>
          <p className="mt-6 max-w-md text-lg text-navy/90">
            Hittar du inte svaret? Skicka ett mejl eller ring oss, vi svarar
            samma dag.
          </p>
        </div>

        <ul
          className="divide-y divide-navy/10 border-y border-navy/10"
          role="list"
        >
          {items.map((item, i) => {
            const isOpen = open === i
            return (
              <li key={item.q}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-trigger-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left sm:gap-6"
                >
                  <span className="text-lg font-bold text-navy sm:text-xl">
                    {item.q}
                  </span>
                  <span
                    aria-hidden
                    className={`grid h-10 w-10 flex-none place-items-center rounded-full border border-navy/20 text-navy transition-transform duration-300 ${
                      isOpen ? 'rotate-45 bg-mint border-mint' : ''
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M7 1v12M1 7h12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  hidden={!isOpen}
                  className="pb-7 pr-4 sm:pr-16 text-lg text-navy/90"
                >
                  {item.a}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
