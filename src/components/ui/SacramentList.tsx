'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { getLenis } from '@/lib/lenis'

export type Sacramento = {
  n: string
  title: string
  desc: string
  /** texto mais desenvolvido, só no painel: a entrada e o corpo */
  longo: string
  longo2: string
  /** linhas de horário: a hora em destaque e a indicação por baixo */
  quando: { horas: string; dias: string }[]
  preciso: string
  galeria: string[]
}

export type SacramentLabels = {
  saibaMais: string
  fechar: string
  quando: string
  preciso: string
  galeria: string
  cta: string
}

const Seta = () => (
  <svg width="15" height="10" viewBox="0 0 15 10" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true" className="shrink-0">
    <path d="M0 5h13M9.5 1.5 13 5l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/**
 * Lista dos sacramentos com painel de detalhe.
 *
 * Na lista, cada entrada mostra número, nome, uma frase e "Saiba mais". A
 * partir de lg a entrada sob o cursor (ou com foco) fica a cor plena e as
 * restantes esbatem; em ecrã pequeno não há cursor para as "acender", por
 * isso ficam todas iguais.
 *
 * "Saiba mais" abre um painel por cima da página, a ocupar a maior parte do
 * ecrã em desktop e o ecrã todo em telemóvel — descrição
 * desenvolvida, quando, o que é preciso, galeria e o contacto para marcar.
 * É um diálogo modal: prende o foco, fecha com Escape ou com um toque fora,
 * e devolve o foco ao botão que o abriu.
 */
export default function SacramentList({ items, labels }: { items: Sacramento[]; labels: SacramentLabels }) {
  const [ativo, setAtivo] = useState(0)
  const [aberto, setAberto] = useState<number | null>(null)
  const fecharRef = useRef<HTMLButtonElement>(null)
  const origemRef = useRef<HTMLButtonElement | null>(null)

  // O painel é montado no <body> por portal: é `fixed`, e qualquer antepassado
  // com `transform` (os <Reveal> animam por GSAP e deixam um) passaria a ser a
  // sua referência, prendendo-o dentro da secção em vez do ecrã.
  const [montado, setMontado] = useState(false)
  useEffect(() => setMontado(true), [])

  const estaAberto = aberto !== null
  // Mantém o último conteúdo durante a animação de saída, para o painel não
  // esvaziar a meio do deslize.
  const ultimo = useRef(0)
  if (aberto !== null) ultimo.current = aberto
  const item = items[ultimo.current]

  // Com o painel aberto a página por trás não pode correr. O Lenis conduz o
  // scroll pelo seu próprio rAF, por isso tem de ser parado explicitamente.
  useEffect(() => {
    if (!estaAberto) return
    const lenis = getLenis()
    lenis?.stop()
    document.body.style.overflow = 'hidden'
    fecharRef.current?.focus()

    const tecla = (e: KeyboardEvent) => e.key === 'Escape' && setAberto(null)
    window.addEventListener('keydown', tecla)
    return () => {
      window.removeEventListener('keydown', tecla)
      lenis?.start()
      document.body.style.overflow = ''
      origemRef.current?.focus()
    }
  }, [estaAberto])

  return (
    <>
      <ul className="border-t border-[var(--color-border)]">
        {items.map((s, i) => (
          <li
            key={s.n}
            data-active={i === ativo}
            onMouseEnter={() => setAtivo(i)}
            onFocus={() => setAtivo(i)}
            className="sacramento-item border-b border-[var(--color-border)] py-9 md:py-11"
          >
            <span className="label block mb-2 tabular-nums">{s.n}</span>
            <h3
              className="font-display mb-4"
              style={{ fontSize: 'var(--text-h3b)', lineHeight: 1.1, letterSpacing: '-0.005em' }}
            >
              {s.title}
            </h3>
            <p className="max-w-xl leading-relaxed mb-6">{s.desc}</p>
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={(e) => {
                origemRef.current = e.currentTarget
                setAberto(i)
              }}
              className="alvo-toque group/mais inline-flex items-center gap-3 text-[0.9rem]"
            >
              <span className="underline underline-offset-[5px] decoration-[0.5px]">{labels.saibaMais}</span>
              <span className="transition-transform duration-300 ease-[var(--ease-out)] group-hover/mais:translate-x-[3px]">
                <Seta />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* ── Painel de detalhe ── */}
      {montado && createPortal(
      <div
        className="fixed inset-0 z-[60]"
        /* Visível de imediato ao abrir — senão o foco não entra no painel,
           porque não se foca nada dentro de um elemento ainda invisível — e
           só invisível depois de o deslize de saída acabar. */
        style={{
          visibility: estaAberto ? 'visible' : 'hidden',
          transition: `visibility 0s linear ${estaAberto ? '0s' : '0.6s'}`,
        }}
        inert={!estaAberto}
      >
        {/* véu — tocar fora fecha */}
        <div
          aria-hidden="true"
          onClick={() => setAberto(null)}
          className="absolute inset-0 bg-[var(--brand-navy)] transition-opacity duration-500"
          style={{ opacity: estaAberto ? 0.55 : 0 }}
        />

        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="sacramento-painel-titulo"
          data-lenis-prevent
          className="absolute right-0 top-0 h-full w-full sm:w-[34rem] lg:w-[78vw] lg:max-w-[76rem] bg-[var(--color-bg-primary)] overflow-y-auto overscroll-contain transition-transform duration-[600ms] ease-[var(--ease-out)]"
          style={{ transform: estaAberto ? 'translateX(0)' : 'translateX(100%)' }}
        >
          <div className="px-7 md:px-12 lg:px-16 pt-7 lg:pt-9 pb-14 lg:pb-20">
            <div className="flex items-center justify-between mb-12">
              <span className="label tabular-nums">{item.n}</span>
              <button
                ref={fecharRef}
                type="button"
                onClick={() => setAberto(null)}
                className="label inline-flex items-center gap-3 !text-[var(--color-text-primary)]"
              >
                {labels.fechar}
                <span aria-hidden="true" className="relative block w-3.5 h-3.5 rotate-45">
                  <span className="absolute left-0 top-1/2 w-full h-px bg-current -translate-y-1/2" />
                  <span className="absolute top-0 left-1/2 h-full w-px bg-current -translate-x-1/2" />
                </span>
              </button>
            </div>

            {/* 1. Descrição, à largura do painel. Os dois parágrafos ficam lado
                a lado a partir de lg — ocupam a horizontal sem que cada linha
                fique comprida demais para se ler. */}
            <h2
              id="sacramento-painel-titulo"
              className="font-display mb-8 lg:mb-10"
              style={{ fontSize: 'var(--text-h1)', lineHeight: 1.02, letterSpacing: 'var(--tracking-heading)' }}
            >
              {item.title}
            </h2>
            <div className="lg:grid lg:grid-cols-2 lg:gap-16 mb-12 lg:mb-16">
              <p className="lead text-[var(--color-text-primary)] mb-6 lg:mb-0">{item.longo}</p>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">{item.longo2}</p>
            </div>

            {/* 2. Quando e o que é preciso, lado a lado. Sem maiúsculas: aqui
                lê-se informação, não um cartaz. */}
            <div className="border-t border-[var(--color-border)] lg:grid lg:grid-cols-2 lg:gap-16">
              <div className="py-8">
                <p className="label mb-4">{labels.quando}</p>
                <div className="flex flex-col gap-4">
                  {item.quando.map((q) => (
                    <div key={q.horas + q.dias}>
                      <p className="font-display" style={{ fontSize: 'var(--text-h3)', lineHeight: 1.2 }}>{q.horas}</p>
                      <p className="text-[var(--color-text-secondary)] text-sm mt-1">{q.dias}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="py-8 border-t lg:border-t-0 border-[var(--color-border)]">
                <p className="label mb-4">{labels.preciso}</p>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">{item.preciso}</p>
              </div>
            </div>

            {/* 3. Galeria */}
            <div className="border-t border-[var(--color-border)] pt-8 pb-10">
              <p className="label mb-5">{labels.galeria}</p>
              <div className="grid grid-cols-3 gap-3 lg:gap-5">
                {item.galeria.map((src) => (
                  <div key={src} className="relative media aspect-[3/4] lg:aspect-[4/3]">
                    <Image src={src} alt="" fill sizes="(min-width: 1024px) 24vw, (min-width: 640px) 12rem, 33vw" className="object-cover" />
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/contactos"
              className="group/btn inline-flex items-stretch overflow-hidden text-[0.85rem] bg-[var(--color-text-primary)] text-[var(--color-text-inverse)] hover:bg-[var(--brand-blue)] transition-colors duration-[350ms] ease-[var(--ease-out)]"
              style={{ borderRadius: 'calc(4 * var(--u))' }}
            >
              <span className="flex items-center px-7 py-3.5 leading-none">{labels.cta}</span>
              <span className="flex items-center px-4 border-l border-current/25">
                <span className="transition-transform duration-[350ms] ease-[var(--ease-out)] group-hover/btn:translate-x-[3px]">
                  <Seta />
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>,
      document.body
      )}
    </>
  )
}
