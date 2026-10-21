'use client'

import { useState } from 'react'
import { u } from '@/lib/escala'

export type Forma = { n: string; titulo: string; texto: string }

/**
 * Lista de formas de contribuir, em acordeão (Figma, nó 111:2426): cada linha
 * mostra o número e o título; ao abrir, a descrição desliza por baixo e o "+"
 * roda 45° e passa a "×". Só uma está aberta de cada vez (a primeira, de início).
 * O "+" e o "×" são o mesmo par de traços do desenho, rodado.
 */
export default function ComoContribuirLista({ formas, abrir, fechar }: { formas: Forma[]; abrir: string; fechar: string }) {
  const [aberta, setAberta] = useState<number | null>(0)

  return (
    <ul className="flex w-[calc(677.63*var(--u))] flex-col">
      {formas.map((f, i) => {
        const estaAberta = aberta === i
        return (
          <li key={f.n} className="border-t border-solid border-[rgba(28,43,57,0.2)]">
            <button
              type="button"
              aria-expanded={estaAberta}
              aria-controls={`forma-${f.n}`}
              aria-label={`${estaAberta ? fechar : abrir}: ${f.titulo}`}
              onClick={() => setAberta(estaAberta ? null : i)}
              className="group flex w-full items-start justify-between gap-[calc(167*var(--u))] py-[calc(32*var(--u))] text-left"
            >
              <span className="flex items-start gap-[calc(24*var(--u))]">
                <span className="w-[calc(80*var(--u))] shrink-0 py-[calc(6*var(--u))] text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] tracking-[calc(-0.064*var(--u))] opacity-60">{f.n}</span>
                <span className="flex w-[calc(384*var(--u))] flex-col">
                  <span className="font-display text-[length:calc(40*var(--u))] leading-[calc(35.2*var(--u))] tracking-[calc(-0.192*var(--u))] whitespace-nowrap">{f.titulo}</span>
                  <span
                    id={`forma-${f.n}`}
                    role="region"
                    className="grid transition-[grid-template-rows] duration-[500ms] ease-[var(--ease-out)]"
                    style={{ gridTemplateRows: estaAberta ? '1fr' : '0fr' }}
                  >
                    <span className="overflow-hidden">
                      <span
                        className="block pt-[calc(24*var(--u))] text-[length:calc(16*var(--u))] leading-[calc(19*var(--u))] transition-opacity duration-[400ms] ease-[var(--ease-out)]"
                        style={{ opacity: estaAberta ? 1 : 0 }}
                      >
                        {f.texto}
                      </span>
                    </span>
                  </span>
                </span>
              </span>

              {/* + que roda para × */}
              <span
                aria-hidden="true"
                className="relative mt-[calc(6*var(--u))] size-[calc(22.63*var(--u))] shrink-0 transition-transform duration-[500ms] ease-[var(--ease-out)]"
                style={{ transform: estaAberta ? 'rotate(45deg)' : 'rotate(0deg)' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/celebracoes/fechar-1.svg" alt="" width={17} height={1} className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" style={{ width: u(17), height: u(1) }} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/celebracoes/fechar-1.svg" alt="" width={17} height={1} className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 rotate-90" style={{ width: u(17), height: u(1) }} />
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
