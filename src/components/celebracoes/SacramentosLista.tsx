'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { getLenis } from '@/lib/lenis'
import Seta from '@/components/home/Seta'
import { u } from '@/lib/escala'

export type Sacramento = {
  n: string
  titulo: string
  desc: string
  /** só no painel: a entrada, o corpo, as linhas de "quando" e "o que é preciso" */
  longo: string
  longo2: string
  quando: { horas: string; dias: string }[]
  preciso: string
}

export type Textos = {
  saibaMais: string
  fechar: string
  quando: string
  preciso: string
  galeria: string
  cta: string
  anterior: string
  seguinte: string
}

const TRIM = { textBox: 'trim-both cap alphabetic' } as React.CSSProperties
const FOTO = '/celebracoes/sacramento.jpg'
/** Fotografias do painel: as três do desenho, iguais em todos até haver as próprias */
const GALERIA = [
  { src: '/celebracoes/galeria-1.jpg', largura: 375 },
  { src: '/celebracoes/galeria-2.jpg', largura: 217 },
  { src: FOTO, largura: 391 },
]
const FOLGA_GALERIA = 12
const DESLOCAMENTOS = GALERIA.map((_, i) => GALERIA.slice(0, i).reduce((s, g) => s + g.largura + FOLGA_GALERIA, 0))

/**
 * Sacramentos, lista e painel — design novo (Figma, nós 111:1534 e 140:1514).
 *
 * Fotografia fixa à esquerda e, à direita, os oito sacramentos: o ativo está a
 * cheio e os outros a 30% (ativa-se o que passa da linha a 45% do ecrã, ou o
 * que está sob o rato). "Saiba mais" abre um painel de 1000px que desliza pela
 * direita, com a descrição, quando, o que é preciso, a galeria e o botão para
 * marcar; o resto do ecrã fica coberto por um véu a 20% que o fecha ao clicar.
 * É um diálogo modal: prende o scroll, fecha com Escape e devolve o foco ao
 * botão que o abriu.
 */
export default function SacramentosLista({ items, textos }: { items: Sacramento[]; textos: Textos }) {
  const [ativo, setAtivo] = useState(0)
  const [aberto, setAberto] = useState<number | null>(null)
  const [foto, setFoto] = useState(0)
  const itens = useRef<(HTMLElement | null)[]>([])
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
  const s = items[ultimo.current]

  // Ativo = o último ponto cujo topo já passou da linha a 45% do ecrã
  useEffect(() => {
    let pendente = false
    const atualizar = () => {
      pendente = false
      const linha = window.innerHeight * 0.45
      let i = 0
      itens.current.forEach((el, k) => {
        if (el && el.getBoundingClientRect().top <= linha) i = k
      })
      setAtivo(i)
    }
    const aoRolar = () => {
      if (!pendente) {
        pendente = true
        requestAnimationFrame(atualizar)
      }
    }
    atualizar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    window.addEventListener('resize', aoRolar)
    return () => {
      window.removeEventListener('scroll', aoRolar)
      window.removeEventListener('resize', aoRolar)
    }
  }, [])

  // Com o painel aberto a página por trás não pode correr (o Lenis precisa de
  // ser parado à parte). O painel volta ao topo e à primeira fotografia.
  useEffect(() => {
    if (!estaAberto) return
    const lenis = getLenis()
    lenis?.stop()
    document.body.style.overflow = 'hidden'
    fecharRef.current?.focus({ preventScroll: true })
    const tecla = (e: KeyboardEvent) => e.key === 'Escape' && setAberto(null)
    window.addEventListener('keydown', tecla)
    return () => {
      window.removeEventListener('keydown', tecla)
      lenis?.start()
      document.body.style.overflow = ''
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
      aria-label={s.titulo}
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
        // O Lenis, parado, descarta o scroll de roda em toda a página; este atributo
        // deixa o painel rolar por si.
        data-lenis-prevent
        className="absolute right-0 top-0 h-full w-[calc(1000*var(--u))] max-w-full overflow-y-auto overflow-x-hidden bg-[var(--bege-claro-2)] text-[var(--azul-escuro)]"
        style={{
          transform: estaAberto ? 'translateX(0)' : 'translateX(100%)',
          transition: `transform ${estaAberto ? 700 : 500}ms var(--ease-inout)`,
        }}
      >
        {/* Fechar: duas linhas cruzadas (o traço do Figma) */}
        <button
          ref={fecharRef}
          type="button"
          aria-label={textos.fechar}
          onClick={() => setAberto(null)}
          className="absolute right-[calc(24*var(--u))] top-[calc(24*var(--u))] z-10 flex h-[calc(40*var(--u))] w-[calc(40*var(--u))] items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-[400ms]"
        >
          <span className="relative block size-[calc(22.627*var(--u))]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/celebracoes/fechar-1.svg" alt="" width={32} height={1} className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 rotate-45" style={{ width: u(32), height: u(1) }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/celebracoes/fechar-2.svg" alt="" width={32} height={1} className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 -rotate-45" style={{ width: u(32), height: u(1) }} />
          </span>
        </button>

        <div className="flex flex-col gap-[calc(64*var(--u))] px-[calc(64*var(--u))] pt-[calc(80*var(--u))] pb-[calc(80*var(--u))]">
          <h2 className="font-display text-[length:calc(80*var(--u))] leading-[calc(96*var(--u))] tracking-[calc(0.96*var(--u))] font-normal" style={TRIM}>{s.titulo}</h2>

          <div className="flex flex-col gap-[calc(80*var(--u))] w-full">
            <div className="flex flex-col gap-[calc(80*var(--u))] w-[calc(872*var(--u))] max-w-full">
              <div className="flex flex-col gap-[calc(32*var(--u))] w-full">
                <p className="font-display text-[length:calc(32*var(--u))] leading-[1.2] tracking-[calc(0.96*var(--u))]" style={TRIM}>{s.longo}</p>
                <p className="text-[length:calc(16*var(--u))] leading-[1.5]">{s.longo2}</p>
              </div>

              <div className="flex gap-[calc(20*var(--u))] items-start w-full">
                <div className="flex flex-col gap-[calc(20*var(--u))] w-[calc(426*var(--u))]">
                  <p className="text-[length:calc(16*var(--u))] leading-[1.5] opacity-40">{textos.quando}</p>
                  <div className="flex flex-col gap-[calc(12*var(--u))] w-full">
                    {s.quando.map((q) => (
                      <div key={q.horas} className="flex flex-col gap-[calc(12*var(--u))]">
                        <p className="font-display text-[length:calc(32*var(--u))] leading-[1.2] tracking-[calc(0.96*var(--u))]">{q.horas}</p>
                        <p className="text-[length:calc(16*var(--u))] leading-[1.5]">{q.dias}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-[calc(20*var(--u))] w-[calc(426*var(--u))] text-[length:calc(16*var(--u))] leading-[1.5]">
                  <p className="opacity-40">{textos.preciso}</p>
                  <p>{s.preciso}</p>
                </div>
              </div>
            </div>

            {/* Galeria: faixa que desliza com as setas */}
            <div className="flex flex-col gap-[calc(24*var(--u))] w-full">
              <div className="flex flex-col gap-[calc(0*var(--u))] w-[calc(872*var(--u))] max-w-full">
                <div className="relative h-[calc(24*var(--u))] w-full">
                  <p className="absolute left-0 top-0 text-[length:calc(16*var(--u))] leading-[calc(24*var(--u))]">{textos.galeria}</p>
                  {([
                    { rotulo: textos.anterior, left: 788, img: 3.5, d: -1 },
                    { rotulo: textos.seguinte, left: 844, img: -52.5, d: 1 },
                  ] as const).map((b) => (
                    <button
                      key={b.d}
                      type="button"
                      aria-label={b.rotulo}
                      disabled={foto + b.d < 0 || foto + b.d >= GALERIA.length}
                      onClick={() => setFoto((f) => Math.min(Math.max(f + b.d, 0), GALERIA.length - 1))}
                      className="absolute top-[calc(2*var(--u))] h-[calc(20*var(--u))] w-[calc(32*var(--u))] overflow-hidden opacity-70 hover:opacity-100 disabled:opacity-30 disabled:cursor-default transition-opacity duration-[400ms]"
                      style={{ left: u(b.left) }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/sobre/galeria-setas.svg" alt="" width={81} height={13} className="absolute max-w-none" style={{ width: u(81), height: u(13), left: u(b.img), top: u(3.5) }} />
                    </button>
                  ))}
                </div>
                <div className="mt-[calc(24*var(--u))] -mr-[calc(64*var(--u))] overflow-hidden">
                  <div
                    className="flex gap-[calc(12*var(--u))] w-max transition-transform duration-[1100ms] ease-[var(--ease-out)]"
                    style={{ transform: `translateX(calc(${-DESLOCAMENTOS[foto]} * var(--u)))` }}
                  >
                    {GALERIA.map((g, i) => (
                      <div key={i} className="relative h-[calc(400*var(--u))] shrink-0 rounded-[calc(4*var(--u))] overflow-hidden" style={{ width: u(g.largura) }}>
                        <Image src={g.src} alt="" fill sizes="391px" className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                href="/contactos"
                className="group/btn self-start flex items-center gap-[calc(11.91*var(--u))] h-[calc(46.8*var(--u))] px-[calc(29.6*var(--u))] rounded-[calc(4*var(--u))] bg-[var(--azul-escuro)] text-[length:max(11px,calc(12*var(--u)))] leading-[1.4] whitespace-nowrap text-[var(--bege-claro-2)] transition-[background-color] duration-[400ms] ease-[var(--ease-out)]"
              >
                {textos.cta}
                <Seta className="group-hover/btn:translate-x-[calc(4*var(--u))]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <div className="flex items-start justify-between w-full">
        {/* Fotografia fixa */}
        <div className="sticky top-[calc(120*var(--u))] h-[calc(629*var(--u))] w-[calc(678*var(--u))] shrink-0 rounded-[calc(4*var(--u))] overflow-hidden">
          <Image src={FOTO} alt="" fill sizes="678px" className="object-cover" />
        </div>

        {/* Lista */}
        <div className="flex flex-col gap-[calc(48*var(--u))] w-[calc(562*var(--u))]">
          {items.map((it, i) => (
            <article
              key={it.n}
              ref={(el) => {
                itens.current[i] = el
              }}
              onMouseEnter={() => setAtivo(i)}
              className="flex flex-col gap-[calc(24*var(--u))] pb-[calc(24*var(--u))] border-b border-solid border-[rgba(28,43,57,0.3)] transition-opacity duration-[500ms] ease-[var(--ease-out)]"
              style={{ opacity: i === ativo ? 1 : 0.3 }}
            >
              <div className="flex flex-col gap-[calc(16*var(--u))] w-full">
                <span className="text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] tracking-[calc(-0.064*var(--u))]">{it.n}</span>
                <h3 className="font-display text-[length:calc(48*var(--u))] leading-[calc(96*var(--u))] tracking-[calc(0.96*var(--u))] font-normal" style={TRIM}>{it.titulo}</h3>
              </div>
              <p className="text-[length:calc(16*var(--u))] leading-[1.5]">{it.desc}</p>
              <button
                type="button"
                aria-haspopup="dialog"
                onClick={(e) => {
                  origemRef.current = e.currentTarget
                  setAberto(i)
                }}
                className="group/mais self-start flex items-center gap-[calc(12*var(--u))] text-[length:calc(16*var(--u))] leading-[1.5]"
              >
                <span className="underline decoration-from-font underline-offset-[from-font]">{textos.saibaMais}</span>
                <Seta className="group-hover/mais:translate-x-[calc(4*var(--u))]" />
              </button>
            </article>
          ))}
        </div>
      </div>

      {montado && createPortal(painel, document.body)}
    </>
  )
}
