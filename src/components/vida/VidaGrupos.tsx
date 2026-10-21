'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'
import Seta from '@/components/home/Seta'
import { getLenis } from '@/lib/lenis'
import { u } from '@/lib/escala'

const TRIM = { textBox: 'trim-both cap alphabetic' } as React.CSSProperties

const i = (chunks: ReactNode) => (
  <span className="italic font-light" style={{ fontFamily: "'forevs-light', var(--font-display)" }}>{chunks}</span>
)

/**
 * Fotografia de cada grupo. O Figma só traz a dos escuteiros (Crianças); as
 * outras duas ficam com ela até haver fotografias próprias: basta trocar o `foto`.
 */
const GRUPOS = [
  { n: '01', chave: 'gc1', foto: '/vida/grupos.jpg', subs: 3 },
  { n: '02', chave: 'gc2', foto: '/vida/grupos.jpg', subs: 2 },
  { n: '03', chave: 'gc3', foto: '/vida/grupos.jpg', subs: 3 },
] as const

/** Galeria do painel: as três fotografias do desenho (iguais nos três grupos até haver as próprias) */
const GALERIA = [
  { src: '/celebracoes/galeria-1.jpg', largura: 375 },
  { src: '/celebracoes/galeria-2.jpg', largura: 217 },
  { src: '/celebracoes/sacramento.jpg', largura: 391 },
]
const FOLGA_GALERIA = 12
const DESLOCAMENTOS = GALERIA.map((_, i) => GALERIA.slice(0, i).reduce((acc, g) => acc + g.largura + FOLGA_GALERIA, 0))

/**
 * Vida da Paróquia, Grupos Culturais — design novo (Figma, nó 111:1995), desktop 1440.
 *
 * Fundo bege escuro 2, 180 de respiro; cabeçalho com "Encontre o seu lugar"
 * (itálico leve em "o seu lugar") e o botão "Entre em contacto"; por baixo
 * três barras de 1440 com régua. É o mesmo desenho de barras da Obra Social da
 * homepage: ao passar, o fundo azul escuro sobe de baixo (600ms, curva quint),
 * o texto passa a bege e a fotografia do grupo aparece, parada no centro, só com fade.
 *
 * Clicar numa barra abre o painel do grupo (Figma 170:1983, 170:2081, 170:2179):
 * mesmo desenho do painel dos Sacramentos, um diálogo de 1000px que desliza pela
 * direita com o título, a introdução, os subgrupos, a galeria e o botão
 * "Marcar ou pedir informações"; o resto do ecrã fica coberto por um véu que o
 * fecha. Prende o scroll, fecha com Escape e devolve o foco à barra.
 */
export default function VidaGrupos() {
  const t = useTranslations('vida')
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
  const g = GRUPOS[ultimo.current]

  // Com o painel aberto a página por trás não pode correr (o Lenis precisa de ser parado à parte)
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
      aria-label={t(`${g.chave}Titulo`)}
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
          aria-label={t('gpFechar')}
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
          <h2 className="font-display text-[length:calc(80*var(--u))] leading-[calc(96*var(--u))] tracking-[calc(0.96*var(--u))] font-normal" style={TRIM}>{t(`${g.chave}Titulo`)}</h2>

          <div className="flex w-full flex-col gap-[calc(80*var(--u))]">
            <div className="flex w-[calc(872*var(--u))] max-w-full flex-col gap-[calc(32*var(--u))]">
              <p className="font-display text-[length:calc(32*var(--u))] leading-[1.2] tracking-[calc(0.96*var(--u))]" style={TRIM}>{t(`${g.chave}Intro`)}</p>
              <p className="text-[length:calc(16*var(--u))] leading-[1.5]">{t(`${g.chave}Intro2`)}</p>
            </div>

            {Array.from({ length: g.subs }, (_, k) => (
              <div key={k} className="flex w-[calc(872*var(--u))] max-w-full flex-col gap-[calc(12*var(--u))]">
                <p className="font-display text-[length:calc(32*var(--u))] leading-[1.2] tracking-[calc(0.96*var(--u))]" style={TRIM}>{t(`${g.chave}S${k + 1}T`)}</p>
                <p className="text-[length:calc(16*var(--u))] leading-[1.5]">{t(`${g.chave}S${k + 1}X`)}</p>
              </div>
            ))}

            {/* Galeria: faixa que desliza com as setas, e o botão */}
            <div className="flex w-full flex-col gap-[calc(24*var(--u))]">
              <div className="flex w-[calc(872*var(--u))] max-w-full flex-col">
                <div className="relative h-[calc(24*var(--u))] w-full">
                  <p className="absolute left-0 top-0 text-[length:calc(16*var(--u))] leading-[calc(24*var(--u))]">{t('gpGaleria')}</p>
                  {([
                    { rotulo: t('gpAnterior'), left: 788, img: 3.5, d: -1 },
                    { rotulo: t('gpSeguinte'), left: 844, img: -52.5, d: 1 },
                  ] as const).map((b) => (
                    <button
                      key={b.d}
                      type="button"
                      aria-label={b.rotulo}
                      disabled={foto + b.d < 0 || foto + b.d >= GALERIA.length}
                      onClick={() => setFoto((f) => Math.min(Math.max(f + b.d, 0), GALERIA.length - 1))}
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
                    {GALERIA.map((f, k) => (
                      <div key={k} className="relative h-[calc(400*var(--u))] shrink-0 overflow-hidden rounded-[calc(4*var(--u))]" style={{ width: u(f.largura) }}>
                        <Image src={f.src} alt="" fill sizes="391px" className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                href="/contactos"
                className="group/btn flex h-[calc(46.8*var(--u))] items-center gap-[calc(11.91*var(--u))] self-start rounded-[calc(4*var(--u))] bg-[var(--azul-escuro)] px-[calc(29.6*var(--u))] text-[length:max(11px,calc(12*var(--u)))] leading-[1.4] whitespace-nowrap text-[var(--bege-claro-2)] transition-[background-color] duration-[400ms] ease-[var(--ease-out)]"
              >
                {t('gpCta')}
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
      id="grupos"
      data-barra="var(--bege-escuro-2)"
      className="flex w-full flex-col items-center gap-[calc(80*var(--u))] px-0 py-[calc(180*var(--u))] bg-[var(--bege-escuro-2)] text-[var(--azul-escuro)]"
    >
      {/* ── Cabeçalho ── */}
      <div className="flex h-[calc(123*var(--u))] w-full flex-col gap-[calc(24*var(--u))] px-[calc(32*var(--u))]">
        <Revelar><p className="text-[length:max(11px,calc(12*var(--u)))] leading-[1.4]">{t('gcLabel')}</p></Revelar>
        <div className="flex h-[calc(72*var(--u))] w-full items-start justify-between">
          <Revelar atraso={100} className="h-[calc(72*var(--u))] w-[calc(672*var(--u))]">
            <div className="relative h-[calc(72*var(--u))] w-full">
              <h2
                className="absolute left-0 top-[calc(32.45*var(--u))] -translate-y-1/2 font-display text-[length:calc(80*var(--u))] leading-[calc(105.6*var(--u))] font-normal whitespace-nowrap"
                style={TRIM}
              >
                {t.rich('gcTitulo', { i })}
              </h2>
            </div>
          </Revelar>
          <Link
            href="/contactos"
            className="group/btn flex items-center gap-[calc(12*var(--u))] rounded-[calc(6*var(--u))] border border-solid border-[rgba(27,43,57,0.45)] px-[calc(29.6*var(--u))] py-[calc(14.4*var(--u))] text-[length:max(11px,calc(12*var(--u)))] leading-[1.4] whitespace-nowrap transition-[background-color,color,border-color] duration-[400ms] ease-[var(--ease-out)]"
          >
            {t('gcCta')}
            <Seta className="group-hover/btn:translate-x-[calc(4*var(--u))]" />
          </Link>
        </div>
      </div>

      {/* ── Barras ── */}
      <Revelar atraso={150} className="w-full">
        <div className="w-full">
          {GRUPOS.map((gr, k) => (
            <button
              key={gr.n}
              type="button"
              aria-haspopup="dialog"
              onClick={(e) => {
                origemRef.current = e.currentTarget
                setAberto(k)
              }}
              className={`group/grupo relative z-0 flex w-full cursor-pointer items-center justify-between border-t border-solid text-left border-[rgba(28,43,57,0.3)] py-[calc(40*var(--u))] outline-none transition-colors duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:z-10 hover:text-[var(--bege-claro-2)] focus-visible:text-[var(--bege-claro-2)] border-x-0 ${k === GRUPOS.length - 1 ? 'border-b' : 'border-b-0'}`}
            >
              {/* Enchimento: sobe de baixo (scaleY, só compositor), por trás do texto */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -inset-y-px -z-10 origin-bottom scale-y-0 bg-[var(--azul-escuro)] transition-transform duration-[600ms] ease-[var(--quint)] group-hover/grupo:scale-y-100 group-focus-visible/grupo:scale-y-100"
              />

              <span className="flex items-center gap-[calc(24*var(--u))] px-[calc(32*var(--u))]">
                <span className="w-[calc(80*var(--u))] text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] tracking-[calc(-0.064*var(--u))]">{gr.n}</span>
                <span className="w-[calc(352*var(--u))] font-display text-[length:calc(40*var(--u))] leading-[calc(35.2*var(--u))] tracking-[calc(-0.192*var(--u))] whitespace-nowrap">
                  {t(`${gr.chave}Titulo`)}
                </span>
              </span>

              <span className="flex w-[calc(384*var(--u))] flex-col gap-[calc(24*var(--u))]">
                <span className="block max-w-[calc(448*var(--u))] pr-[calc(32*var(--u))] text-[length:calc(16*var(--u))] leading-[calc(22*var(--u))]">{t(`${gr.chave}Texto`)}</span>
                <span className="flex items-center gap-[calc(12*var(--u))] text-[length:calc(16*var(--u))] leading-[1.5]">
                  <span className="underline decoration-from-font underline-offset-[from-font]">{t('gcSaibaMais')}</span>
                  <Seta className="group-hover/grupo:translate-x-[calc(4*var(--u))]" />
                </span>
              </span>

              {/* Fotografia: parada no centro da barra, só aparece (fade) */}
              <span
                aria-hidden="true"
                className="obra-foto pointer-events-none absolute left-1/2 top-1/2 block h-[calc(282*var(--u))] w-[calc(246*var(--u))] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[calc(4*var(--u))] opacity-0 will-change-[opacity] group-hover/grupo:opacity-100 group-focus-visible/grupo:opacity-100"
              >
                <Image src={gr.foto} alt="" fill sizes="492px" loading="eager" className="object-cover" />
              </span>
            </button>
          ))}
        </div>
      </Revelar>

      {montado && createPortal(painel, document.body)}
    </section>
  )
}
