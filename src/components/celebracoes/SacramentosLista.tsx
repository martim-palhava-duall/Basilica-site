'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { getLenis } from '@/lib/lenis'
import Seta from '@/components/home/Seta'
import { u } from '@/lib/escala'
import { ESTILO_GESTOS, useGaleriaGestos } from '@/lib/useGaleriaGestos'
import { GALERIA_PAINEL } from '@/lib/galeria'

export type Sacramento = {
  n: string
  titulo: string
  desc: string
  /** só no painel: a entrada, o corpo, as linhas de "quando" e "o que é preciso" */
  longo: string
  longo2: string
  quando: { horas: string; dias: string }[]
  preciso: string
  /** fotografia do sacramento: aparece na fotografia fixa quando é o ativo (e em cima do texto no mobile) */
  foto: string
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
/** Fotografias do painel: as das galerias do site (lib/galeria) */
const GALERIA = GALERIA_PAINEL
const FOLGA_GALERIA = 12
const DESLOCAMENTOS = GALERIA.map((_, i) => GALERIA.slice(0, i).reduce((s, g) => s + g.largura, 0))

/**
 * Sacramentos, lista e painel — design novo (Figma, nós 111:1534 e 140:1514).
 *
 * Fotografia fixa à esquerda e, à direita, os oito sacramentos: o ativo está a
 * cheio e os outros a 30% (ou o que está sob o rato). O ativo é o último cujo
 * topo já passou uma linha de leitura que desce sobre a fotografia fixa enquanto
 * a lista passa por ela — como no Conhecer a Basílica: com uma linha parada a
 * meio do ecrã, os últimos só ficavam ativos depois de a fotografia se soltar. "Saiba mais" abre um painel de 1000px que desliza pela
 * direita, com a descrição, quando, o que é preciso, a galeria e o botão para
 * marcar; o resto do ecrã fica coberto por um véu a 20% que o fecha ao clicar.
 * É um diálogo modal: prende o scroll, fecha com Escape e devolve o foco ao
 * botão que o abriu.
 *
 * Cada sacramento tem a sua fotografia: no desktop a fotografia fixa troca (fade de 700ms)
 * consoante o sacramento ativo; no mobile cada um traz a sua por cima do texto, a lista
 * toda a cheio (sem o esbater) e o painel a toda a largura, com a galeria a 62%.
 */
export default function SacramentosLista({ items, textos }: { items: Sacramento[]; textos: Textos }) {
  const [ativo, setAtivo] = useState(0)
  const [aberto, setAberto] = useState<number | null>(null)
  const [foto, setFoto] = useState(0)
  const irFoto = (d: number) => setFoto((f) => Math.min(Math.max(f + d, 0), GALERIA.length - 1))
  // Arrastar e scroll horizontal do trackpad (ver lib/useGaleriaGestos)
  const { ref: pista, arrasto, arrastando } = useGaleriaGestos<HTMLDivElement>({ ir: irFoto, limiar: 60 })
  const itens = useRef<(HTMLElement | null)[]>([])
  const fotoRef = useRef<HTMLDivElement>(null)
  const listaRef = useRef<HTMLDivElement>(null)
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

  // Ativo = o último cujo topo já passou a linha de leitura, que desce sobre a
  // fotografia fixa de cima a baixo enquanto a lista passa por ela
  useEffect(() => {
    let pendente = false
    const atualizar = () => {
      pendente = false
      const foto = fotoRef.current?.getBoundingClientRect()
      const lista = listaRef.current?.getBoundingClientRect()
      if (!foto || !lista) return
      const percurso = Math.max(lista.height - foto.height, 1)
      const p = Math.min(Math.max((foto.top - lista.top) / percurso, 0), 1)
      const linha = foto.top + p * foto.height
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
  // ser parado à parte). O bloqueio vai no <html>, não no <body>: com o <html>
  // já cortado pelo Lenis, um overflow no <body> torna-o num contentor de scroll
  // e a fotografia fixa (sticky) perde a referência e salta para fora do ecrã.
  // O painel volta ao topo e à primeira fotografia.
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
        className="absolute right-0 top-0 h-full w-[calc(1000*var(--u))] max-w-full [--gk:1] max-lg:[--gk:0.62] overflow-y-auto overflow-x-hidden bg-[var(--bege-claro-2)] text-[var(--azul-escuro)]"
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

        <div className="flex flex-col gap-[calc(64*var(--u))] max-lg:gap-[calc(40*var(--u))] px-[calc(64*var(--u))] max-lg:px-[calc(20*var(--u))] pt-[calc(80*var(--u))] max-lg:pt-[calc(72*var(--u))] pb-[calc(80*var(--u))] max-lg:pb-[calc(56*var(--u))]">
          <h2 className="font-display text-[length:calc(80*var(--u))] max-lg:text-[length:calc(44*var(--u))] leading-[calc(96*var(--u))] max-lg:leading-[calc(48*var(--u))] tracking-[calc(0.96*var(--u))] max-lg:tracking-normal font-normal" style={TRIM}>{s.titulo}</h2>

          <div className="flex flex-col gap-[calc(80*var(--u))] max-lg:gap-[calc(40*var(--u))] w-full">
            <div className="flex flex-col gap-[calc(80*var(--u))] max-lg:gap-[calc(32*var(--u))] w-[calc(872*var(--u))] max-w-full">
              <div className="flex flex-col gap-[calc(32*var(--u))] max-lg:gap-[calc(20*var(--u))] w-full">
                <p className="font-display text-[length:calc(32*var(--u))] max-lg:text-[length:calc(24*var(--u))] leading-[1.2] tracking-[calc(0.96*var(--u))] max-lg:tracking-normal" style={TRIM}>{s.longo}</p>
                <p className="text-[length:calc(16*var(--u))] leading-[1.5]">{s.longo2}</p>
              </div>

              <div className="flex gap-[calc(20*var(--u))] items-start max-lg:flex-col max-lg:gap-[calc(32*var(--u))] w-full">
                <div className="flex flex-col gap-[calc(20*var(--u))] w-[calc(426*var(--u))] max-lg:w-full">
                  <p className="text-[length:calc(16*var(--u))] leading-[1.5] opacity-40">{textos.quando}</p>
                  <div className="flex flex-col gap-[calc(12*var(--u))] w-full">
                    {s.quando.map((q) => (
                      <div key={q.horas} className="flex flex-col gap-[calc(12*var(--u))]">
                        <p className="font-display text-[length:calc(32*var(--u))] max-lg:text-[length:calc(24*var(--u))] leading-[1.2] tracking-[calc(0.96*var(--u))] max-lg:tracking-normal">{q.horas}</p>
                        <p className="text-[length:calc(16*var(--u))] leading-[1.5]">{q.dias}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-[calc(20*var(--u))] w-[calc(426*var(--u))] max-lg:w-full text-[length:calc(16*var(--u))] leading-[1.5]">
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
                      onClick={() => irFoto(b.d)}
                      className="absolute left-[var(--sx)] max-lg:left-auto max-lg:right-[var(--sr)] top-[calc(2*var(--u))] h-[calc(20*var(--u))] w-[calc(32*var(--u))] overflow-hidden opacity-70 hover:opacity-100 disabled:opacity-30 disabled:cursor-default transition-opacity duration-[400ms]"
                      style={{ ['--sx' as string]: u(b.left), ['--sr' as string]: u(b.d < 0 ? 40 : 0) }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/sobre/galeria-setas.svg" alt="" width={81} height={13} className="absolute max-w-none" style={{ width: u(81), height: u(13), left: u(b.img), top: u(3.5) }} />
                    </button>
                  ))}
                </div>
                <div ref={pista} className="mt-[calc(24*var(--u))] -mr-[calc(64*var(--u))] max-lg:-mr-[calc(20*var(--u))] overflow-hidden" style={{ ...ESTILO_GESTOS, cursor: arrastando ? 'grabbing' : 'grab' }}>
                  <div
                    className="flex gap-[calc(12*var(--u))] w-max transition-transform duration-[1100ms] ease-[var(--ease-out)]"
                    style={{ transform: `translateX(calc((${-DESLOCAMENTOS[foto]} * var(--gk) - ${FOLGA_GALERIA * foto}) * var(--u) + ${arrasto}px))`, transitionDuration: arrastando ? '0ms' : undefined }}
                  >
                    {GALERIA.map((g, i) => (
                      <div key={i} className="relative h-[calc(400*var(--u))] max-lg:h-[calc(280*var(--u))] shrink-0 rounded-[calc(4*var(--u))] overflow-hidden" style={{ width: `calc(${g.largura} * var(--gk) * var(--u))` }}>
                        <Image src={g.src} alt="" fill sizes="600px" className="object-cover" />
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
      <div className="flex items-start justify-between w-full max-lg:flex-col max-lg:gap-[calc(40*var(--u))]">
        {/* Fotografia fixa (no mobile fica em cima, parada) */}
        <div ref={fotoRef} className="sticky top-[calc(120*var(--u))] max-lg:hidden h-[calc(629*var(--u))] w-[calc(678*var(--u))] shrink-0 rounded-[calc(4*var(--u))] overflow-hidden">
          {items.map((it, i) => (
            <div key={it.n} className="absolute inset-0 transition-opacity duration-[700ms] ease-[var(--ease-out)]" style={{ opacity: i === ativo ? 1 : 0 }}>
              <Image src={it.foto} alt="" fill sizes="678px" className="object-cover" />
            </div>
          ))}
        </div>

        {/* Lista */}
        <div ref={listaRef} className="flex flex-col gap-[calc(48*var(--u))] max-lg:gap-[calc(32*var(--u))] w-[calc(562*var(--u))] max-lg:w-full">
          {items.map((it, i) => (
            <article
              key={it.n}
              ref={(el) => {
                itens.current[i] = el
              }}
              onMouseEnter={() => setAtivo(i)}
              className="flex flex-col gap-[calc(24*var(--u))] max-lg:gap-[calc(16*var(--u))] pb-[calc(24*var(--u))] border-b border-solid border-[rgba(28,43,57,0.3)] transition-opacity duration-[500ms] ease-[var(--ease-out)] max-lg:opacity-100!"
              style={{ opacity: i === ativo ? 1 : 0.3 }}
            >
              {/* Mobile: cada sacramento traz a sua fotografia por cima do texto */}
              <div className="lg:hidden relative h-[calc(220*var(--u))] w-full overflow-hidden rounded-[calc(4*var(--u))]">
                <Image src={it.foto} alt="" fill sizes="350px" className="object-cover" />
              </div>
              <div className="flex flex-col gap-[calc(16*var(--u))] w-full">
                <span className="text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] tracking-[calc(-0.064*var(--u))]">{it.n}</span>
                <h3 className="font-display text-[length:calc(48*var(--u))] max-lg:text-[length:calc(32*var(--u))] leading-[calc(96*var(--u))] max-lg:leading-[calc(36*var(--u))] tracking-[calc(0.96*var(--u))] max-lg:tracking-normal font-normal" style={TRIM}>{it.titulo}</h3>
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
