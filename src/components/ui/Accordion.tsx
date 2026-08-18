'use client'

import { useId, useState } from 'react'

export type AccordionItem = {
  n: string
  title: string
  desc: string
}

/**
 * Numbered disclosure list. Used for the seven sacraments, where the titles
 * are the content people scan for and the descriptions are secondary — so the
 * closed state stays a clean typographic index and only the opened row carries
 * prose.
 *
 * One row is open at a time (the first by default), which keeps the section's
 * height stable enough not to shift what the reader is looking at. Rows are
 * real <button>s inside the heading, so the list is navigable by keyboard and
 * announced as a set of expandable sections.
 */
export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState(0)
  const baseId = useId()

  return (
    <div className="border-t border-[var(--color-border-light)]">
      {items.map((item, i) => {
        const isOpen = i === open
        const panelId = `${baseId}-panel-${i}`
        const buttonId = `${baseId}-button-${i}`

        return (
          <div key={item.n} className="border-b border-[var(--color-border-light)]">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="group/acc w-full flex items-center gap-5 md:gap-8 py-6 md:py-7 text-left"
              >
                <span className="label shrink-0 opacity-50">{item.n}</span>

                <span
                  className="font-display flex-1 transition-opacity duration-500"
                  style={{
                    fontSize: 'var(--text-h3b)',
                    lineHeight: 1.15,
                    letterSpacing: '-0.005em',
                    opacity: isOpen ? 1 : 0.72,
                  }}
                >
                  {item.title}
                </span>

                {/* cruz que roda para menos — sem texto, por isso fica oculta aos leitores
                    de ecrã: o aria-expanded do botão já diz o estado */}
                <span
                  aria-hidden="true"
                  className="relative shrink-0 w-3.5 h-3.5 transition-transform duration-[600ms] ease-[var(--ease-out)]"
                  style={{ transform: isOpen ? 'rotate(135deg)' : 'rotate(0deg)' }}
                >
                  <span className="absolute left-0 top-1/2 w-full h-px bg-current -translate-y-1/2" />
                  <span className="absolute top-0 left-1/2 h-full w-px bg-current -translate-x-1/2" />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-7 md:pb-8 pl-0 md:pl-[3.5rem] pr-8"
            >
              <p className="text-[var(--color-text-secondary)] leading-relaxed max-w-xl">
                {item.desc}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
