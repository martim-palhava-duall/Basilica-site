'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import Revelar from '@/components/home/Revelar'
import Seta from '@/components/home/Seta'
import { u } from '@/lib/escala'

const ENTRADA = 'var(--ease-entrada)'
const SUAVE = 'var(--ease-suave)'
const INOUT = 'var(--ease-inout)'

/**
 * Notícias de exemplo — o desenho tem três cartões com títulos de teste.
 * A fotografia do 2.º vem recortada no Figma (522×783, deslocada), por isso
 * leva um enquadramento próprio; as outras duas preenchem o cartão.
 */
const NOTICIAS = [
  { slug: 'noticia-1', foto: '/home/dest-1.jpg' },
  { slug: 'noticia-4', foto: '/home/dest-2.jpg', recorte: { left: -36, top: -58.31, width: 522, height: 783 } },
  { slug: 'noticia-8', foto: '/home/dest-3.jpg' },
] as const

const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1)
const suave = (t: number) => t * t * (3 - 2 * t)

/** PROVISÓRIO: opções de entrada (página /destaques-opcoes). Sem `entrada`, fica a atual. */
export const ENTRADAS_NOTICIAS = [
  { n: 1, nome: 'Sequência calma', texto: 'Como na Obra Social: o cabeçalho e depois os três cartões, um a um, com uma subida curta e lenta.' },
  { n: 2, nome: 'Máscara e cortinas', texto: 'Como no Quem Somos: o título sobe dentro da sua janela e cada fotografia é descoberta por uma cortina bege que sobe, com um zoom que assenta.' },
  { n: 3, nome: 'Suave no scroll', texto: 'Como no "O que procura?": os cartões acendem e sobem um pouco, cada um no seu momento, ligados ao scroll.' },
  { n: 4, nome: 'Fotografias que acendem', texto: 'Só opacidade: as fotografias acendem devagar, uma a uma, e o texto de cada cartão aparece a seguir.' },
  { n: 5, nome: 'Chegada da direita', texto: 'Os cartões chegam da direita, uns píxeis, desencontrados, como um carrossel a pousar.' },
  { n: 6, nome: 'Janelas que abrem', texto: 'Cada fotografia começa numa janela um pouco mais pequena e abre-se até ao tamanho do cartão, sem se deformar.' },
  { n: 7, nome: 'Página que se abre', texto: 'Cada fotografia descobre-se da esquerda para a direita, como uma página a virar; o texto segue-a.' },
  { n: 8, nome: 'Do centro para os lados', texto: 'O cartão do meio aparece primeiro e os dois dos lados a seguir, em simetria (como um retábulo).' },
  { n: 9, nome: 'Fotografia que assenta', texto: 'A moldura fica parada e a fotografia, dentro dela, desce devagar até ao lugar enquanto acende.' },
  { n: 10, nome: 'Profundidade', texto: 'Os cartões começam um pouco mais pequenos e atrás, e avançam para o lugar, um a um, numa curva longa.' },
  { n: 11, nome: 'Deriva no scroll', texto: 'Ligada ao scroll: os três cartões deslizam na horizontal a velocidades diferentes e encontram o alinhamento a meio da secção.' },
  { n: 12, nome: 'Título palavra a palavra', texto: 'As palavras do título sobem uma a uma dentro das suas janelas; os cartões acendem a seguir, só com opacidade.' },
] as const

/**
 * Bloco de notícias — Destaques da homepage (Figma 115:363) e "O que vai
 * acontecer" do Sobre nós (Figma 170:3296): o mesmo desenho, com outro fundo,
 * respiro vertical e título.
 *
 * Cabeçalho com título e ligação "Ver todas as notícias"; por baixo, três
 * cartões de 445 com 21 entre eles. Ainda não há notícias: o hover (a
 * fotografia aproxima-se devagar) fica pronto para quando os cartões forem
 * links reais. Os textos chegam já traduzidos, por quem usa o bloco.
 *
 * Mobile: cabeçalho em coluna (título a 34px) e os cartões numa faixa que corre
 * na horizontal, 300 de largura cada, com o cartão seguinte a espreitar.
 */
export default function NoticiasBloco({
  id,
  fundo,
  respiro,
  label,
  titulo,
  cta,
  meta,
  titulos,
  entrada,
}: {
  /** âncora da secção (para o menu de âncoras da página) */
  id?: string
  /** cor de fundo (e da barra de topo) */
  fundo: string
  /** respiro vertical da secção, em px (180 nos Destaques, 120 no Sobre nós) */
  respiro: number
  label: string
  titulo: ReactNode
  cta: string
  meta: string
  titulos: [string, string, string]
  /** PROVISÓRIO: opção de entrada (ver ENTRADAS_NOTICIAS) */
  entrada?: number
}) {
  const secRef = useRef<HTMLElement>(null)
  const [visto, setVisto] = useState(false)
  const [p, setP] = useState(0)
  const porScroll = entrada === 3 || entrada === 11

  useEffect(() => {
    if (!entrada) return
    const el = secRef.current
    if (!el) return
    if (porScroll) {
      let pend = false
      const aplicar = () => {
        pend = false
        const r = el.getBoundingClientRect()
        setP(clamp01((window.innerHeight - r.top) / window.innerHeight))
      }
      const rolar = () => {
        if (!pend) {
          pend = true
          requestAnimationFrame(aplicar)
        }
      }
      aplicar()
      window.addEventListener('scroll', rolar, { passive: true })
      return () => window.removeEventListener('scroll', rolar)
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisto(true)
          obs.disconnect()
        }
      },
      { rootMargin: '0px 0px -25% 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [entrada, porScroll])

  const surge = (atraso: number, dy = 12, dur = 1600, dx = 0): CSSProperties =>
    visto
      ? { opacity: 1, transform: 'none', transition: `opacity ${dur - 200}ms ${ENTRADA} ${atraso}ms, transform ${dur}ms ${ENTRADA} ${atraso}ms` }
      : { opacity: 0, transform: `translate3d(${dx}px, ${dy}px, 0)` }
  const noScroll = (inicio: number): CSSProperties => {
    const o = suave(clamp01((p - inicio) / 0.35))
    return { opacity: o, transform: `translate3d(0, ${(18 * (1 - o)).toFixed(1)}px, 0)` }
  }
  /** 'label' | 'titulo' | 'cta' | cartão k: 'cartao' | 'moldura' | 'imagem' | 'cortina' | 'texto' */
  const est = (peca: string, k = 0): CSSProperties | undefined => {
    switch (entrada) {
      case 1:
        if (peca === 'label') return surge(0)
        if (peca === 'titulo') return surge(100)
        if (peca === 'cta') return surge(200)
        if (peca === 'cartao') return surge(450 + k * 220, 14, 1700)
        return undefined
      case 2:
        if (peca === 'label') return surge(0)
        if (peca === 'tituloMascara') return visto ? { transform: 'none', transition: `transform 1300ms ${ENTRADA} 100ms` } : { transform: 'translate3d(0, 115%, 0)' }
        if (peca === 'cta') return surge(300)
        if (peca === 'imagem') return visto ? { transform: 'scale(1)', transition: `transform 1900ms ${SUAVE} ${350 + k * 200}ms` } : { transform: 'scale(1.12)' }
        if (peca === 'cortina') return visto ? { transform: 'translate3d(0, -100%, 0)', transition: `transform 1300ms ${INOUT} ${350 + k * 200}ms` } : { transform: 'none' }
        if (peca === 'texto') return surge(1000 + k * 200)
        return undefined
      case 3:
        if (peca === 'label') return noScroll(0.08)
        if (peca === 'titulo') return noScroll(0.11)
        if (peca === 'cta') return noScroll(0.14)
        if (peca === 'cartao') return noScroll(0.24 + k * 0.08)
        return undefined
      case 4:
        if (peca === 'label' || peca === 'titulo' || peca === 'cta') return surge(peca === 'label' ? 0 : peca === 'titulo' ? 150 : 250, 0, 1800)
        if (peca === 'moldura') return visto ? { opacity: 1, transition: `opacity 1800ms cubic-bezier(0.37, 0, 0.63, 1) ${400 + k * 250}ms` } : { opacity: 0 }
        if (peca === 'texto') return surge(900 + k * 250, 8, 1500)
        return undefined
      case 5:
        if (peca === 'label') return surge(0)
        if (peca === 'titulo') return surge(100)
        if (peca === 'cta') return surge(200)
        if (peca === 'cartao') return surge(400 + k * 180, 0, 1800, 48)
        return undefined
      case 6: {
        if (peca === 'label') return surge(0)
        if (peca === 'titulo') return surge(100)
        if (peca === 'cta') return surge(200)
        const sx = 0.86
        const sy = 0.88
        if (peca === 'moldura')
          return visto
            ? { opacity: 1, transform: 'none', transition: `opacity 900ms ${ENTRADA} ${350 + k * 200}ms, transform 1800ms ${ENTRADA} ${350 + k * 200}ms` }
            : { opacity: 0, transform: `scale(${sx}, ${sy})` }
        if (peca === 'imagem')
          return visto
            ? { transform: 'none', transition: `transform 1800ms ${ENTRADA} ${350 + k * 200}ms` }
            : { transform: `scale(${(1.06 / sx).toFixed(4)}, ${(1.06 / sy).toFixed(4)})` }
        if (peca === 'texto') return surge(900 + k * 200)
        return undefined
      }
      case 7:
        if (peca === 'label') return surge(0)
        if (peca === 'titulo') return surge(100)
        if (peca === 'cta') return surge(200)
        if (peca === 'cortinaH')
          return visto ? { transform: 'translate3d(101%, 0, 0)', transition: `transform 1500ms ${INOUT} ${350 + k * 220}ms` } : { transform: 'none' }
        if (peca === 'imagem') return visto ? { transform: 'none', transition: `transform 1900ms ${SUAVE} ${350 + k * 220}ms` } : { transform: 'translate3d(-4%, 0, 0) scale(1.06)' }
        if (peca === 'texto') return surge(950 + k * 220, 0, 1500, -12)
        return undefined
      case 8: {
        const ordem = [1, 0, 1][k] // o do meio primeiro
        if (peca === 'label') return surge(0)
        if (peca === 'titulo') return surge(100)
        if (peca === 'cta') return surge(200)
        if (peca === 'cartao') return surge(450 + ordem * 300, 16, 1800)
        return undefined
      }
      case 9:
        if (peca === 'label') return surge(0)
        if (peca === 'titulo') return surge(100)
        if (peca === 'cta') return surge(200)
        if (peca === 'imagem')
          return visto
            ? { opacity: 1, transform: 'none', transition: `opacity 1400ms ${ENTRADA} ${350 + k * 200}ms, transform 2200ms ${ENTRADA} ${350 + k * 200}ms` }
            : { opacity: 0, transform: 'translate3d(0, -6%, 0) scale(1.14)' }
        if (peca === 'texto') return surge(800 + k * 200, 8, 1500)
        return undefined
      case 10:
        if (peca === 'label') return surge(0)
        if (peca === 'titulo') return surge(100)
        if (peca === 'cta') return surge(200)
        if (peca === 'cartao')
          return visto
            ? { opacity: 1, transform: 'none', transition: `opacity 1400ms ${ENTRADA} ${400 + k * 200}ms, transform 2000ms ${ENTRADA} ${400 + k * 200}ms` }
            : { opacity: 0, transform: 'translate3d(0, 24px, 0) scale(0.95)' }
        return undefined
      case 11: {
        if (peca === 'label') return noScroll(0.06)
        if (peca === 'titulo') return noScroll(0.09)
        if (peca === 'cta') return noScroll(0.12)
        if (peca === 'cartao') {
          const o = suave(clamp01((p - 0.1) / 0.5))
          const dx = [-70, 0, 70][k] * (1 - o)
          return { opacity: 0.25 + 0.75 * o, transform: `translate3d(${dx.toFixed(1)}px, 0, 0)` }
        }
        return undefined
      }
      case 12:
        if (peca === 'label') return surge(0, 0, 1200)
        if (peca === 'palavra') return visto ? { transform: 'none', transition: `transform 1300ms ${ENTRADA} ${100 + k * 110}ms` } : { transform: 'translate3d(0, 160%, 0)' }
        if (peca === 'cta') return surge(500, 0)
        if (peca === 'cartao') return visto ? { opacity: 1, transition: `opacity 1800ms cubic-bezier(0.37, 0, 0.63, 1) ${700 + k * 220}ms` } : { opacity: 0 }
        return undefined
      default:
        return undefined
    }
  }
  /** Opção 12: o título palavra a palavra, cada uma na sua janela (os destaques em itálico mantêm-se) */
  const palavras = (no: ReactNode): ReactNode => {
    let k = 0
    const partir = (n: ReactNode): ReactNode => {
      if (typeof n === 'string') {
        return n.split(/(\s+)/).map((w, i) =>
          /^\s+$/.test(w) || w === '' ? (
            w
          ) : (
            <span key={`${k}-${i}`} className="inline-block align-bottom" style={{ clipPath: 'inset(calc(-20 * var(--u)) calc(-12 * var(--u)) calc(-22 * var(--u)) calc(-12 * var(--u)))' }}>
              <span className="inline-block" style={est('palavra', k++)}>{w}</span>
            </span>
          )
        )
      }
      if (Array.isArray(n)) return n.map((c, i) => <span key={i}>{partir(c)}</span>)
      if (n && typeof n === 'object' && 'props' in (n as object)) {
        const el = n as React.ReactElement<{ children?: ReactNode }>
        return { ...el, props: { ...el.props, children: partir(el.props.children) } } as React.ReactElement
      }
      return n
    }
    return partir(no)
  }

  return (
    <section id={id} ref={secRef}
      data-barra={fundo}
      className="flex w-full px-[calc(31*var(--u))] max-lg:px-[calc(20*var(--u))] max-lg:py-[calc(96*var(--u))]! text-[var(--azul-escuro)]"
      style={{ backgroundColor: fundo, paddingBlock: u(respiro) }}
    >
      <div className="flex flex-col gap-[calc(80*var(--u))] max-lg:gap-[calc(40*var(--u))] items-start w-full">
        <div className="flex items-end justify-between w-full h-[calc(91.6*var(--u))] max-lg:h-auto max-lg:flex-col max-lg:items-start max-lg:gap-[calc(20*var(--u))]">
          <div className="flex flex-col gap-[calc(8*var(--u))] w-[calc(480.5*var(--u))] max-lg:w-full">
            {entrada ? (
              <>
                <p className="text-[length:max(11px,calc(12*var(--u)))] leading-[1.4] text-[rgba(29,35,40,0.6)]" style={est('label')}>{label}</p>
                {entrada === 12 ? (
                  <h2 className="font-display text-[length:calc(56*var(--u))] leading-[normal] tracking-[calc(-0.336*var(--u))] max-lg:text-[length:calc(34*var(--u))] max-lg:leading-[1.1] max-lg:tracking-normal max-lg:whitespace-normal font-normal whitespace-nowrap">{palavras(titulo)}</h2>
                ) : entrada === 2 ? (
                  <div style={{ clipPath: 'inset(calc(-20 * var(--u)) calc(-30 * var(--u)) calc(-30 * var(--u)) calc(-30 * var(--u)))' }}>
                    <div style={est('tituloMascara')}>
                      <h2 className="font-display text-[length:calc(56*var(--u))] leading-[normal] tracking-[calc(-0.336*var(--u))] max-lg:text-[length:calc(34*var(--u))] max-lg:leading-[1.1] max-lg:tracking-normal max-lg:whitespace-normal font-normal whitespace-nowrap">{titulo}</h2>
                    </div>
                  </div>
                ) : (
                  <h2 className="font-display text-[length:calc(56*var(--u))] leading-[normal] tracking-[calc(-0.336*var(--u))] max-lg:text-[length:calc(34*var(--u))] max-lg:leading-[1.1] max-lg:tracking-normal max-lg:whitespace-normal font-normal whitespace-nowrap" style={est('titulo')}>
                    {titulo}
                  </h2>
                )}
              </>
            ) : (
              <>
                <Revelar><p className="text-[length:max(11px,calc(12*var(--u)))] leading-[1.4] text-[rgba(29,35,40,0.6)]">{label}</p></Revelar>
                <Revelar atraso={100}>
                  <h2 className="font-display text-[length:calc(56*var(--u))] leading-[normal] tracking-[calc(-0.336*var(--u))] max-lg:text-[length:calc(34*var(--u))] max-lg:leading-[1.1] max-lg:tracking-normal max-lg:whitespace-normal font-normal whitespace-nowrap">
                    {titulo}
                  </h2>
                </Revelar>
              </>
            )}
          </div>
          <Link
            href="/blog"
            style={est('cta')}
            className="group/cta flex items-center gap-[calc(9.59*var(--u))] text-[length:max(11px,calc(12*var(--u)))] leading-[1.4] whitespace-nowrap"
          >
            {cta}
            <Seta className="group-hover/cta:translate-x-[calc(4*var(--u))]" />
          </Link>
        </div>

        <div className="flex items-center gap-[calc(21*var(--u))] w-full max-lg:items-start max-lg:gap-[calc(14*var(--u))] max-lg:overflow-x-auto max-lg:snap-x max-lg:snap-mandatory max-lg:-mx-[calc(20*var(--u))] max-lg:w-[calc(100%+40*var(--u))] max-lg:px-[calc(20*var(--u))] max-lg:scroll-px-[calc(20*var(--u))] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {NOTICIAS.map((n, k) => {
            const cartao = (
              <Link href={`/blog/${n.slug}`} className="group/card flex flex-col gap-[calc(12*var(--u))] w-[calc(445*var(--u))] max-lg:w-full">
                <div className="relative h-[calc(295.98*var(--u))] max-lg:h-[calc(200*var(--u))] w-full overflow-hidden rounded-[calc(4*var(--u))]" style={est('moldura', k)}>
                  <div className="absolute inset-0" style={est('imagem', k)}>
                    {'recorte' in n ? (
                      <div className="absolute" style={{ left: u(n.recorte.left), top: u(n.recorte.top), width: u(n.recorte.width), height: u(n.recorte.height) }}>
                        <Image src={n.foto} alt="" fill sizes="522px" className="object-cover" />
                      </div>
                    ) : (
                      <Image src={n.foto} alt="" fill sizes="445px" className="object-cover" />
                    )}
                  </div>
                  {entrada === 2 && <div aria-hidden="true" className="absolute inset-0" style={{ background: fundo, ...est('cortina', k) }} />}
                  {entrada === 7 && <div aria-hidden="true" className="absolute inset-0" style={{ background: fundo, ...est('cortinaH', k) }} />}
                </div>
                <div className="flex flex-col gap-[calc(12*var(--u))]" style={est('texto', k)}>
                  <p className="pt-[calc(8*var(--u))] text-[length:max(11px,calc(12*var(--u)))] leading-[1.4] text-[rgba(29,35,40,0.6)]">{meta}</p>
                  <div className="flex w-full items-center justify-between gap-[calc(16*var(--u))]">
                    <p className="font-display text-[length:calc(32*var(--u))] leading-[calc(35.2*var(--u))] max-lg:text-[length:calc(24*var(--u))] max-lg:leading-[calc(28*var(--u))]">{titulos[k]}</p>
                    <Seta className="shrink-0 opacity-0 -translate-x-[calc(8*var(--u))] !transition-[opacity,transform] group-hover/card:opacity-100 group-hover/card:translate-x-0 group-focus-visible/card:opacity-100 group-focus-visible/card:translate-x-0" />
                  </div>
                </div>
              </Link>
            )
            return entrada ? (
              <div key={n.foto} className="w-[calc(445*var(--u))] max-lg:w-[calc(300*var(--u))] max-lg:shrink-0 max-lg:snap-start" style={est('cartao', k)}>
                {cartao}
              </div>
            ) : (
              <Revelar key={n.foto} atraso={100 + k * 120} className="w-[calc(445*var(--u))] max-lg:w-[calc(300*var(--u))] max-lg:shrink-0 max-lg:snap-start">
                {cartao}
              </Revelar>
            )
          })}
        </div>
      </div>
    </section>
  )
}
