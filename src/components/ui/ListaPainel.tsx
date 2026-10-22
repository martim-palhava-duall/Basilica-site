'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import Revelar from '@/components/home/Revelar'
import Seta from '@/components/home/Seta'
import { getLenis } from '@/lib/lenis'
import { u } from '@/lib/escala'

const TRIM = { textBox: 'trim-both cap alphabetic' } as React.CSSProperties

export type ItemPainel = {
  n: string
  titulo: string
  /** frase curta da barra */
  texto: string
  /** fotografia que aparece ao passar na barra */
  foto: string
  /** conteúdo do painel lateral */
  intro: string
  intro2?: string
  /** blocos de título e texto (Grupos Culturais) */
  blocos?: { titulo: string; texto: string }[]
  /**
   * Em alternativa aos blocos, as duas colunas do painel dos Sacramentos
   * (Figma 140:1514): "Quando", com destaques a 32px e uma linha por baixo, e
   * "O que é preciso" (Devoções)
   */
  quando?: { destaque: string; texto: string }[]
  preciso?: string
}

export type FotoGaleria = { src: string; largura: number }

const FOLGA_GALERIA = 12

/**
 * Barras com painel lateral — o desenho dos Grupos Culturais da Vida da Paróquia
 * (Figma, nó 111:1995; painéis 170:1983, 170:2081, 170:2179), usado também nas
 * Devoções das Celebrações. Desktop 1440.
 *
 * Fundo da secção (por omissão bege escuro 2), 180 de respiro; cabeçalho com o
 * label, o título (80px) e um botão; por baixo, barras de 1440 com régua. É o
 * mesmo desenho de barras da Obra Social da homepage: ao passar, o fundo azul
 * escuro sobe de baixo (600ms, curva quint), o texto passa a bege e a fotografia
 * do item aparece, parada no centro, só com fade.
 *
 * Clicar numa barra abre o painel do item: mesmo desenho do painel dos
 * Sacramentos, um diálogo de 1000px que desliza pela direita com o título, a
 * introdução, os blocos de texto (ou as colunas "Quando" e "O que é preciso",
 * como nos Sacramentos), a galeria e o botão; o resto do ecrã fica
 * coberto por um véu que o fecha. Prende o scroll, fecha com Escape e devolve o
 * foco à barra. Os textos chegam já traduzidos, por quem usa o componente.
 */
export default function ListaPainel({
  id,
  fundo = 'var(--bege-escuro-2)',
  label,
  titulo,
  cta,
  saibaMais,
  itens,
  galeria,
  painelCta,
  rotulos,
}: {
  id: string
  fundo?: string
  label: string
  titulo: ReactNode
  /** botão do cabeçalho */
  cta: { texto: string; href: string }
  /** texto do link de cada barra ("Saiba mais") */
  saibaMais: string
  itens: ItemPainel[]
  /** fotografias da galeria do painel (as mesmas em todos os itens) */
  galeria: FotoGaleria[]
  /** botão no fim do painel */
  painelCta: { texto: string; href: string }
  rotulos: { fechar: string; galeria: string; anterior: string; seguinte: string; quando?: string; preciso?: string }
}) {
  const DESLOCAMENTOS = galeria.map((_, k) => galeria.slice(0, k).reduce((acc, g) => acc + g.largura + FOLGA_GALERIA, 0))
  const [aberto, setAberto] = useState<number | null>(null)
  const [foto, setFoto] = useState(0)
  const fecharRef = useRef<HTMLButtonElement>(null)
  const origemRef = useRef<HTMLButtonElement | null>(null)
  const painelRef = useRef<HTMLDivElement>(null)

  // O painel é `fixed`: monta-se no <body> para nenhum antepassado com transform
  // (as animações de entrada) o prender dentro da secção.
  const [montado, setMontado] = useState(false)
  useEffect(() => setMontado(true), [])

  const estaAberto = aberto !== null
  const ultimo = useRef(0)
  if (aberto !== null) ultimo.current = aberto
  const g = itens[ultimo.current]

  // Com o painel aberto a página por trás não pode correr (o Lenis precisa de ser parado à parte)
  useEffect(() => {
    if (!estaAberto) return
    const lenis = getLenis()
    lenis?.stop()
    document.documentElement.style.overflow = 'hidden'
    fecharRef.current?.focus({ preventScroll: true })
    const tecla = (e: KeyboardEvent) => e.key === 'Escape' && setAberto(null)
    window.addEventListener('keydown', tecla)
    return () => {
      window.removeEventListener('keydown', tecla)
      lenis?.start()
      document.documentElement.style.overflow = ''
      origemRef.current?.focus({ preventScroll: true })
    }
  }, [estaAberto])

  useLayoutEffect(() => {
    if (estaAberto) {
      setFoto(0)
      painelRef.current?.scrollTo({ top: 0 })
    }
  }, [estaAberto, aberto])

  const painel = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={g.titulo}
      inert={!estaAberto}
      className="fixed inset-0 z-[70]"
      style={{ visibility: estaAberto ? 'visible' : 'hidden', transition: `visibility 0s linear ${estaAberto ? '0s' : '0.7s'}` }}
    >
      {/* Véu: fecha ao clicar */}
      <div
        aria-hidden="true"
        onClick={() => setAberto(null)}
        className="absolute inset-0 transition-opacity duration-500"
        style={{ background: 'rgba(28,43,57,0.2)', opacity: estaAberto ? 1 : 0 }}
      />

      <div
        ref={painelRef}
        // O Lenis, parado, descarta o scroll de roda em toda a página; este atributo deixa o painel rolar por si.
        data-lenis-prevent
        className="absolute right-0 top-0 h-full w-[calc(1000*var(--u))] max-w-full overflow-y-auto overflow-x-hidden bg-[var(--bege-claro-2)] text-[var(--azul-escuro)]"
        style={{
          transform: estaAberto ? 'translateX(0)' : 'translateX(100%)',
          transition: `transform ${estaAberto ? 700 : 500}ms var(--ease-inout)`,
        }}
      >
        <button
          ref={fecharRef}
          type="button"
          aria-label={rotulos.fechar}
          onClick={() => setAberto(null)}
          className="absolute right-[calc(24*var(--u))] top-[calc(24*var(--u))] z-10 flex h-[calc(40*var(--u))] w-[calc(40*var(--u))] items-center justify-center opacity-80 transition-opacity duration-[400ms] hover:opacity-100"
        >
          <span className="relative block size-[calc(22.627*var(--u))]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/celebracoes/fechar-1.svg" alt="" width={32} height={1} className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 rotate-45" style={{ width: u(32), height: u(1) }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/celebracoes/fechar-2.svg" alt="" width={32} height={1} className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 -rotate-45" style={{ width: u(32), height: u(1) }} />
          </span>
        </button>

        <div className="flex flex-col gap-[calc(64*var(--u))] px-[calc(64*var(--u))] pb-[calc(76*var(--u))] pt-[calc(80*var(--u))]">
          <h2 className="font-display text-[length:calc(80*var(--u))] leading-[calc(96*var(--u))] tracking-[calc(0.96*var(--u))] font-normal" style={TRIM}>{g.titulo}</h2>

          <div className="flex w-full flex-col gap-[calc(80*var(--u))]">
            <div className="flex w-[calc(872*var(--u))] max-w-full flex-col gap-[calc(32*var(--u))]">
              <p className="font-display text-[length:calc(32*var(--u))] leading-[1.2] tracking-[calc(0.96*var(--u))]" style={TRIM}>{g.intro}</p>
              {g.intro2 && <p className="text-[length:calc(16*var(--u))] leading-[1.5]">{g.intro2}</p>}
            </div>

            {g.quando && (
              <div className="flex w-[calc(872*var(--u))] max-w-full items-start gap-[calc(20*var(--u))]">
                <div className="flex w-[calc(426*var(--u))] flex-col gap-[calc(20*var(--u))]">
                  <p className="text-[length:calc(16*var(--u))] leading-[1.5] opacity-40">{rotulos.quando}</p>
                  <div className="flex w-full flex-col gap-[calc(12*var(--u))]">
                    {g.quando.map((q) => (
                      <div key={q.destaque} className="flex flex-col gap-[calc(12*var(--u))]">
                        <p className="font-display text-[length:calc(32*var(--u))] leading-[1.2] tracking-[calc(0.96*var(--u))]">{q.destaque}</p>
                        <p className="text-[length:calc(16*var(--u))] leading-[1.5]">{q.texto}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {g.preciso && (
                  <div className="flex w-[calc(426*var(--u))] flex-col gap-[calc(20*var(--u))] text-[length:calc(16*var(--u))] leading-[1.5]">
                    <p className="opacity-40">{rotulos.preciso}</p>
                    <p>{g.preciso}</p>
                  </div>
                )}
              </div>
            )}

            {g.blocos?.map((b) => (
              <div key={b.titulo} className="flex w-[calc(872*var(--u))] max-w-full flex-col gap-[calc(12*var(--u))]">
                <p className="font-display text-[length:calc(32*var(--u))] leading-[1.2] tracking-[calc(0.96*var(--u))]" style={TRIM}>{b.titulo}</p>
                <p className="text-[length:calc(16*var(--u))] leading-[1.5]">{b.texto}</p>
              </div>
            ))}

            {/* Galeria: faixa que desliza com as setas, e o botão */}
            <div className="flex w-full flex-col gap-[calc(24*var(--u))]">
              <div className="flex w-[calc(872*var(--u))] max-w-full flex-col">
                <div className="relative h-[calc(24*var(--u))] w-full">
                  <p className="absolute left-0 top-0 text-[length:calc(16*var(--u))] leading-[calc(24*var(--u))]">{rotulos.galeria}</p>
                  {([
                    { rotulo: rotulos.anterior, left: 788, img: 3.5, d: -1 },
                    { rotulo: rotulos.seguinte, left: 844, img: -52.5, d: 1 },
                  ] as const).map((b) => (
                    <button
                      key={b.d}
                      type="button"
                      aria-label={b.rotulo}
                      disabled={foto + b.d < 0 || foto + b.d >= galeria.length}
                      onClick={() => setFoto((f) => Math.min(Math.max(f + b.d, 0), galeria.length - 1))}
                      className="absolute top-[calc(2*var(--u))] h-[calc(20*var(--u))] w-[calc(32*var(--u))] overflow-hidden opacity-70 transition-opacity duration-[400ms] hover:opacity-100 disabled:cursor-default disabled:opacity-30"
                      style={{ left: u(b.left) }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/sobre/galeria-setas.svg" alt="" width={81} height={13} className="absolute max-w-none" style={{ width: u(81), height: u(13), left: u(b.img), top: u(3.5) }} />
                    </button>
                  ))}
                </div>
                <div className="-mr-[calc(64*var(--u))] mt-[calc(24*var(--u))] overflow-hidden">
                  <div
                    className="flex w-max gap-[calc(12*var(--u))] transition-transform duration-[1100ms] ease-[var(--ease-out)]"
                    style={{ transform: `translateX(calc(${-DESLOCAMENTOS[foto]} * var(--u)))` }}
                  >
                    {galeria.map((f, k) => (
                      <div key={k} className="relative h-[calc(400*var(--u))] shrink-0 overflow-hidden rounded-[calc(4*var(--u))]" style={{ width: u(f.largura) }}>
                        <Image src={f.src} alt="" fill sizes="600px" className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                href={painelCta.href}
                className="group/btn flex h-[calc(46.8*var(--u))] items-center gap-[calc(11.91*var(--u))] self-start rounded-[calc(4*var(--u))] bg-[var(--azul-escuro)] px-[calc(29.6*var(--u))] text-[length:max(11px,calc(12*var(--u)))] leading-[1.4] whitespace-nowrap text-[var(--bege-claro-2)] transition-[background-color] duration-[400ms] ease-[var(--ease-out)]"
              >
                {painelCta.texto}
                <Seta className="group-hover/btn:translate-x-[calc(4*var(--u))]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <section
      id={id}
      data-barra={fundo}
      className="flex w-full flex-col items-center gap-[calc(80*var(--u))] px-0 py-[calc(180*var(--u))] text-[var(--azul-escuro)]"
      style={{ backgroundColor: fundo }}
    >
      {/* ── Cabeçalho ── */}
      <div className="flex h-[calc(123*var(--u))] w-full flex-col gap-[calc(24*var(--u))] px-[calc(32*var(--u))]">
        <Revelar><p className="text-[length:max(11px,calc(12*var(--u)))] leading-[1.4]">{label}</p></Revelar>
        <div className="flex h-[calc(72*var(--u))] w-full items-start justify-between">
          <Revelar atraso={100} className="h-[calc(72*var(--u))] w-[calc(672*var(--u))]">
            <div className="relative h-[calc(72*var(--u))] w-full">
              <h2
                className="absolute left-0 top-[calc(32.45*var(--u))] -translate-y-1/2 font-display text-[length:calc(80*var(--u))] leading-[calc(105.6*var(--u))] font-normal whitespace-nowrap"
                style={TRIM}
              >
                {titulo}
              </h2>
            </div>
          </Revelar>
          <Link
            href={cta.href}
            className="group/btn flex items-center gap-[calc(12*var(--u))] rounded-[calc(6*var(--u))] border border-solid border-[rgba(27,43,57,0.45)] px-[calc(29.6*var(--u))] py-[calc(14.4*var(--u))] text-[length:max(11px,calc(12*var(--u)))] leading-[1.4] whitespace-nowrap transition-[background-color,color,border-color] duration-[400ms] ease-[var(--ease-out)]"
          >
            {cta.texto}
            <Seta className="group-hover/btn:translate-x-[calc(4*var(--u))]" />
          </Link>
        </div>
      </div>

      {/* ── Barras ── */}
      <Revelar atraso={150} className="w-full">
        <div className="w-full">
          {itens.map((gr, k) => (
            <button
              key={gr.n}
              type="button"
              aria-haspopup="dialog"
              onClick={(e) => {
                origemRef.current = e.currentTarget
                setAberto(k)
              }}
              className={`group/grupo relative z-0 flex w-full cursor-pointer items-center justify-between border-t border-solid text-left border-[rgba(28,43,57,0.3)] py-[calc(40*var(--u))] outline-none transition-colors duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:z-10 hover:text-[var(--bege-claro-2)] focus-visible:text-[var(--bege-claro-2)] border-x-0 ${k === itens.length - 1 ? 'border-b' : 'border-b-0'}`}
            >
              {/* Enchimento: sobe de baixo (scaleY, só compositor), por trás do texto */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -inset-y-px -z-10 origin-bottom scale-y-0 bg-[var(--azul-escuro)] transition-transform duration-[600ms] ease-[var(--quint)] group-hover/grupo:scale-y-100 group-focus-visible/grupo:scale-y-100"
              />

              <span className="flex items-center gap-[calc(24*var(--u))] px-[calc(32*var(--u))]">
                <span className="w-[calc(80*var(--u))] text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] tracking-[calc(-0.064*var(--u))]">{gr.n}</span>
                <span className="w-[calc(352*var(--u))] font-display text-[length:calc(40*var(--u))] leading-[calc(35.2*var(--u))] tracking-[calc(-0.192*var(--u))] whitespace-nowrap">
                  {gr.titulo}
                </span>
              </span>

              <span className="flex w-[calc(384*var(--u))] flex-col gap-[calc(24*var(--u))]">
                <span className="block max-w-[calc(448*var(--u))] pr-[calc(32*var(--u))] text-[length:calc(16*var(--u))] leading-[calc(22*var(--u))]">{gr.texto}</span>
                <span className="flex items-center gap-[calc(12*var(--u))] text-[length:calc(16*var(--u))] leading-[1.5]">
                  <span className="underline decoration-from-font underline-offset-[from-font]">{saibaMais}</span>
                  <Seta className="group-hover/grupo:translate-x-[calc(4*var(--u))]" />
                </span>
              </span>

              {/* Fotografia: parada no centro da barra, só aparece (fade) */}
              <span
                aria-hidden="true"
                className="obra-foto pointer-events-none absolute left-1/2 top-1/2 block h-[calc(282*var(--u))] w-[calc(246*var(--u))] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[calc(4*var(--u))] opacity-0 will-change-[opacity] group-hover/grupo:opacity-100 group-focus-visible/grupo:opacity-100"
              >
                <Image src={gr.foto} alt="" fill sizes="246px" className="object-cover" />
              </span>
            </button>
          ))}
        </div>
      </Revelar>

      {montado && createPortal(painel, document.body)}
    </section>
  )
}
