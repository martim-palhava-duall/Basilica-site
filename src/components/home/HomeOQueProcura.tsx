'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { seguirScroll } from '@/lib/lenis'
import { useTranslations } from 'next-intl'
import { u } from '@/lib/escala'

type Linha = {
  chave: string
  /** página de destino */
  href: string
  /** posição no Figma, a partir do centro do ecrã (x = left - 720) e do topo da secção */
  x: number
  y: number
  /** a imagem fica antes ou depois do texto */
  imagem: 'antes' | 'depois'
  /** miniatura (e, se houver, a que aparece ao passar o rato) */
  foto: string
  fotoHover?: string
  /** a miniatura do "rezar" é composta: fundo + fotografia que dá um pequeno zoom */
  fundo?: string
}

const LINHAS: Linha[] = [
  { chave: 'oqueRezar',    href: '/celebracoes',              x: -214, y: 282,    imagem: 'antes',  foto: '/home/oque-rezar.jpg', fundo: '/home/oque-rezar-fundo.jpg' },
  { chave: 'oqueCelebrar', href: '/celebracoes#sacramentos',  x: -349, y: 388.66, imagem: 'depois', foto: '/home/oque-celebrar.jpg', fotoHover: '/home/oque-celebrar-hover.jpg' },
  { chave: 'oqueVisitar',  href: '/basilica-e-convento',      x: -214, y: 495.32, imagem: 'antes',  foto: '/home/oque-visitar.jpg' },
  { chave: 'oqueAjudar',   href: '/obra-social',              x: -349, y: 602,    imagem: 'depois', foto: '/home/oque-ajudar.jpg' },
]

/**
 * "O que procura?" — design novo (Figma, nó 115:223; hover 173:3746), 900 de altura.
 *
 * Funciona como um menu (à maneira do de bestsportsagency.com): quatro entradas
 * grandes, cada uma com uma miniatura e um link para a página respetiva. Ao
 * passar numa entrada, o texto passa de Forevs Light Italic a Forevs Regular, na
 * cor bege claro, ganha a fotografia do hover e uma seta que entra a deslizar
 * no fim da linha; as outras recuam para 35%, para a escolhida se destacar.
 * Rápido mas sem solavancos: tudo em --ease-suave (cubic-out, responde logo mas
 * sem o arranque seco de uma expo/quart) e entre 450 e 550ms — a troca de letra
 * em 450, o recuo das outras e a seta (só 12px) em 500, a miniatura em 550, o
 * zoom do "rezar" em 700. Ao sair, tudo regressa pelo mesmo caminho.
 *
 * Mobile: sem posições fixas — uma coluna com as quatro entradas a 34px, a
 * miniatura a 60 × 40 e a seta sempre visível (não há hover em ecrãs de toque).
 *
 * O texto tem duas versões sobrepostas (itálico e normal) que se fundem. Como a
 * normal é mais larga, a miniatura que vem depois do texto desliza (`translateX`)
 * em vez de saltar. Só se animam `transform` e `opacity`.
 */
const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1)
const suave = (t: number) => t * t * (3 - 2 * t)

/**
 * Entrada ("suave no scroll", escolhida entre doze opções): ligada ao scroll,
 * cada frase acende e sobe 18px no seu momento (desencontradas 7% do percurso),
 * e o "O que procura?" acende antes delas. O progresso vai de 0, quando o topo
 * da secção chega ao fundo do ecrã, a 1, quando chega ao topo; curva smoothstep.
 * Só `transform` e `opacity`. Com movimento reduzido fica tudo visível.
 */
export default function HomeOQueProcura() {
  const t = useTranslations('inicio')
  const [ativa, setAtiva] = useState<string | null>(null)
  const secRef = useRef<HTMLElement>(null)
  const rotuloRef = useRef<HTMLParagraphElement>(null)
  const frasesRef = useRef<(HTMLDivElement | null)[]>([])

  // Ligado ao scroll, ao ritmo do scroll suave (seguirScroll). Os estilos escrevem-se
  // direto nos elementos, sem passar pelo React: nada se volta a desenhar a cada passo.
  // Sem efeito (servidor, antes de hidratar, movimento reduzido) fica tudo visível.
  useEffect(() => {
    const el = secRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    return seguirScroll(() => {
      const r = el.getBoundingClientRect()
      const p = clamp01((window.innerHeight - r.top) / window.innerHeight)
      if (rotuloRef.current) rotuloRef.current.style.opacity = suave(clamp01((p - 0.05) / 0.35)).toFixed(3)
      frasesRef.current.forEach((f, i) => {
        if (!f) return
        const o = suave(clamp01((p - 0.12 - i * 0.07) / 0.4))
        f.style.opacity = o.toFixed(3)
        f.style.transform = `translate3d(0, ${(18 * (1 - o)).toFixed(2)}px, 0)`
      })
    })
  }, [])

  return (
    <section ref={secRef} data-barra="var(--vermelho)" data-barra-tom="escuro" className="relative w-full h-[calc(900*var(--u))] max-lg:h-auto max-lg:px-[calc(20*var(--u))] max-lg:py-[calc(96*var(--u))] bg-[var(--vermelho)] text-[var(--bege-claro-2)]">
      <p
        className="absolute left-0 top-[calc(140*var(--u))] max-lg:static max-lg:mb-[calc(48*var(--u))] w-full text-[length:max(11px,calc(12*var(--u)))] leading-[1.4] text-center"
        ref={rotuloRef}
      >
        {t('oqueLabel')}
      </p>

      <div role="list" className="max-lg:flex max-lg:flex-col max-lg:gap-[calc(28*var(--u))]">
        {LINHAS.map((l, i) => (
          <div key={l.chave} role="listitem" className="absolute max-lg:static" style={{ left: `calc(50% + ${l.x} * var(--u))`, top: u(l.y) }}>
            <div ref={(el) => { frasesRef.current[i] = el }}>
              <Entrada
                linha={l}
                texto={t(l.chave)}
                ativa={ativa === l.chave}
                recuada={ativa !== null && ativa !== l.chave}
                onEntrar={() => setAtiva(l.chave)}
                onSair={() => setAtiva((a) => (a === l.chave ? null : a))}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

const TRIM = { textBox: 'trim-both cap alphabetic' } as React.CSSProperties
const BASE = 'col-start-1 row-start-1 whitespace-nowrap text-[length:calc(96*var(--u))] leading-[calc(100.8*var(--u))] tracking-[calc(-0.576*var(--u))] max-lg:text-[length:calc(34*var(--u))] max-lg:leading-[calc(38*var(--u))] max-lg:tracking-normal transition-opacity duration-[450ms] ease-[var(--ease-suave)]'
/** Seta do hover: a do botão (seta.svg), à escala do texto de 96px */
const SETA_L = 42
const SETA_A = 28

function Entrada({
  linha, texto, ativa, recuada, onEntrar, onSair,
}: {
  linha: Linha
  texto: string
  ativa: boolean
  recuada: boolean
  onEntrar: () => void
  onSair: () => void
}) {
  const itRef = useRef<HTMLSpanElement>(null)
  const rgRef = useRef<HTMLSpanElement>(null)
  const [larguras, setLarguras] = useState<[number, number] | null>(null)

  // Mede as duas versões do texto; o ResizeObserver volta a medir quando as
  // fontes acabam de chegar e mudam a largura.
  useEffect(() => {
    const it = itRef.current
    const rg = rgRef.current
    if (!it || !rg) return
    const medir = () => setLarguras([it.offsetWidth, rg.offsetWidth])
    medir()
    const obs = new ResizeObserver(medir)
    obs.observe(it)
    obs.observe(rg)
    return () => obs.disconnect()
  }, [])

  // O texto normal é mais largo que o itálico. Em vez de animar a largura (que
  // obriga a recalcular o layout), a caixa mantém a largura do itálico e a
  // miniatura que vem depois do texto desliza com `translateX` (só compositor).
  const folga = larguras ? Math.max(0, larguras[1] - larguras[0]) : 0
  const desliza = linha.imagem === 'depois' && ativa ? folga : 0

  const thumb = (
    <div
      className="relative h-[calc(74.66*var(--u))] w-[calc(112*var(--u))] max-lg:h-[calc(40*var(--u))] max-lg:w-[calc(60*var(--u))] shrink-0 overflow-hidden rounded-[calc(4*var(--u))] transition-transform duration-[550ms] ease-[var(--ease-suave)]"
      style={{ transform: `translate3d(${desliza}px, 0, 0)` }}
    >
      {linha.fundo && (
        <div className="absolute left-0 w-full" style={{ top: '-50.32%', height: '200.64%' }}>
          <Image src={linha.fundo} alt="" fill sizes="(max-width: 1023px) 60px, 112px" className="object-cover" />
        </div>
      )}
      {/* 136×90 fixos; o zoom do "rezar" (136→117) é uma escala, não uma mudança de tamanho */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-[700ms] ease-[var(--ease-suave)]"
        style={linha.fundo ? { width: u(136), height: u(90), scale: ativa ? 0.9 : 1 } : { width: '100%', height: '100%' }}
      >
        <Image src={linha.foto} alt="" fill sizes="(max-width: 1023px) 72px, 136px" className="object-cover" />
      </div>
      {linha.fotoHover && (
        <Image
          src={linha.fotoHover}
          alt=""
          fill
          sizes="(max-width: 1023px) 60px, 112px"
          className="object-cover transition-opacity duration-[500ms] ease-[var(--ease-suave)]"
          style={{ opacity: ativa ? 1 : 0 }}
        />
      )}
    </div>
  )

  const textoEl = (
    <span
      className="relative grid items-center overflow-visible"
      style={larguras ? { width: larguras[0] } : undefined}
    >
      <span
        ref={itRef}
        className={`${BASE} justify-self-start italic`}
        style={{ ...TRIM, fontFamily: "'forevs-light', var(--font-display)", fontWeight: 300, opacity: ativa ? 0 : 1 }}
      >
        {texto}
      </span>
      <span
        ref={rgRef}
        aria-hidden="true"
        className={`${BASE} justify-self-start font-display text-[var(--bege-claro)]`}
        style={{ ...TRIM, fontWeight: 400, opacity: ativa ? 1 : 0 }}
      >
        {texto}
      </span>
    </span>
  )

  // Seta no fim da linha: entra da esquerda e acende; acompanha a folga do texto
  // normal (como a miniatura), para ficar sempre à mesma distância do que a precede.
  const seta = (
    <span
      aria-hidden="true"
      className="seta shrink-0 text-[var(--bege-claro)] transition-[opacity,transform] duration-[500ms] ease-[var(--ease-suave)] max-lg:ml-auto max-lg:w-[calc(21*var(--u))]! max-lg:h-[calc(14*var(--u))]! max-lg:opacity-100! max-lg:transform-none!"
      style={{
        width: u(SETA_L),
        height: u(SETA_A),
        opacity: ativa ? 1 : 0,
        transform: `translate3d(calc(${folga && ativa ? folga : 0}px + ${ativa ? 0 : -12} * var(--u)), 0, 0)`,
      }}
    />
  )

  return (
    <Link
      href={linha.href}
      onMouseEnter={onEntrar}
      onMouseLeave={onSair}
      onFocus={onEntrar}
      onBlur={onSair}
      className="flex items-center gap-[calc(32*var(--u))] max-lg:gap-[calc(14*var(--u))] outline-none transition-opacity duration-[500ms] ease-[var(--ease-suave)]"
      style={{ opacity: recuada ? 0.35 : 1 }}
    >
      {linha.imagem === 'antes' ? <>{thumb}{textoEl}</> : <>{textoEl}{thumb}</>}
      {seta}
    </Link>
  )
}
