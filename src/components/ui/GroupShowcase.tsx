'use client'

import Image from 'next/image'
import { useState } from 'react'

export type ShowcaseItem = {
  n: string
  title: string
  desc: string
  src: string
  alt: string
}

/**
 * Editorial index with a sticky companion image: the group names read as a
 * typographic list, and pointing at one brings its photograph up in the
 * sticky column. The list is the content; the image is the echo.
 *
 * Below `lg` the sticky column can't work, so each item carries its own
 * inline photograph instead — same content, no interaction required. The
 * hover state is enrichment only: every name is a real focusable link, and
 * keyboard focus drives the same image change as the pointer.
 */
export default function GroupShowcase({ items }: { items: ShowcaseItem[] }) {
  const [active, setActive] = useState(0)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] lg:gap-20 xl:gap-28 items-start">
      {/* ── Lista ── */}
      <ul className="order-2 lg:order-1 w-full border-t border-[var(--color-border-light)]">
        {items.map((item, i) => {
          const isActive = i === active
          return (
            <li key={item.n} className="border-b border-[var(--color-border-light)]">
              <div
                className="group/item block py-8 md:py-10 cursor-pointer"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                tabIndex={0}
                role="button"
                aria-expanded={isActive}
              >
                <div className="flex items-baseline gap-5 md:gap-8">
                  <span className="label shrink-0 showcase-num" data-active={isActive}>
                    {item.n}
                  </span>
                  <h3
                    className="font-display showcase-title"
                    data-active={isActive}
                    style={{
                      fontSize: 'var(--text-h1b)',
                      lineHeight: 1.05,
                      letterSpacing: 'var(--tracking-heading)',
                    }}
                  >
                    {item.title}
                  </h3>
                </div>

                {/* Imagem inline — só abaixo de lg, onde a coluna sticky não existe */}
                <div className="lg:hidden relative media aspect-[3/2] mt-6 mb-5">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    /* acima de lg este bloco está oculto e a coluna fixa toma o
                       seu lugar — declarar 100vw aí faria o browser ir buscar
                       uma imagem larga para algo que não chega a ser pintado */
                    sizes="(min-width: 1024px) 1px, 100vw"
                    className="object-cover"
                  />
                </div>

                {/* A descrição abre com o item ativo, em vez de estar sempre presente:
                    mantém a lista a ler-se como índice tipográfico. */}
                <div
                  className="overflow-hidden transition-[max-height,opacity] duration-[600ms] ease-[var(--ease-out)] lg:max-h-0 lg:opacity-0"
                  style={{
                    maxHeight: isActive ? '9rem' : undefined,
                    opacity: isActive ? 1 : undefined,
                  }}
                >
                  <p className="text-[var(--color-text-secondary)] leading-relaxed max-w-lg pt-4 pl-0 md:pl-[3.5rem]">
                    {item.desc}
                  </p>
                </div>
              </div>
            </li>
          )
        })}
      </ul>

      {/* ── Coluna sticky ── */}
      <div className="hidden lg:block order-1 lg:order-2 sticky top-32 w-[26rem] xl:w-[30rem]">
        <div className="relative media aspect-[4/5]">
          {items.map((item, i) => (
            <Image
              key={item.src}
              src={item.src}
              alt={item.alt}
              fill
              sizes="30rem"
              className="object-cover transition-[opacity,transform] duration-[900ms] ease-[var(--ease-out)]"
              style={{
                opacity: i === active ? 1 : 0,
                transform: i === active ? 'scale(1)' : 'scale(1.06)',
              }}
            />
          ))}
        </div>
        <div className="flex items-center gap-4 mt-5">
          <span className="label opacity-70">{items[active].n}</span>
          <span aria-hidden="true" className="h-px flex-1 bg-[var(--color-border)]" />
          <span className="label opacity-70">{String(items.length).padStart(2, '0')}</span>
        </div>
      </div>
    </div>
  )
}
