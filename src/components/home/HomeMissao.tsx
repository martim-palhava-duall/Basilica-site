'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { useTranslations } from 'next-intl'

const ENTRADA = 'var(--ease-entrada)'
const SUAVE = 'var(--ease-suave)'
const INOUT = 'var(--ease-inout)'

/** Destaque a vermelho dentro do título (<v> nas mensagens) */
const v = (chunks: ReactNode) => <span className="text-[var(--vermelho)]">{chunks}</span>

/**
 * Missão — design novo (Figma, nó 115:199), desktop 1440, 900 de altura.
 *
 * Metade esquerda em bege (flex: 1, fica com os 730 que sobram) e a fotografia
 * à direita, 710 de largura. O título tem quebras de linha fixas, como no
 * desenho, com as duas últimas recuadas 56px. As imagens são compostas em
 * duas camadas, tal como no Figma: um fundo por baixo e a fotografia
 * recortada por cima.
 *
 * Mobile: empilha — texto (título a 30px, corrido, sem as quebras do desenho) e, por baixo,
 * a fotografia a toda a largura, 480 de altura.
 *
 * Entrada ("linhas em máscara", escolhida entre seis opções): quando a secção
 * chega a 75% do ecrã, as quatro linhas do título sobem de dentro de si próprias,
 * uma a uma (como no hero); a fotografia é revelada por uma cortina bege que sobe,
 * com um zoom que assenta; por fim a miniatura e a legenda. Só `transform` e
 * `opacity`; corre uma vez. Com movimento reduzido, tudo aparece já no lugar.
 */
export default function HomeMissao() {
  const t = useTranslations('inicio')
  const ref = useRef<HTMLElement>(null)
  // 'parado': ainda não se sabe (servidor / antes de hidratar) → tudo visível
  const [estado, setEstado] = useState<'parado' | 'espera' | 'entrou'>('parado')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Se a secção já passou do ecrã (voltar atrás, âncora), fica como está
    if (el.getBoundingClientRect().top < window.innerHeight * 0.75) return
    setEstado('espera')
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setEstado('entrou')
          obs.disconnect()
        }
      },
      { rootMargin: '0px 0px -25% 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const espera = estado === 'espera'
  const anima = estado === 'entrou'
  const linha = (k: number): CSSProperties =>
    espera
      ? { transform: 'translate3d(0, 115%, 0)' }
      : anima
        ? { transform: 'translate3d(0, 0, 0)', transition: `transform 1400ms ${ENTRADA} ${200 + k * 110}ms` }
        : {}
  const aparece = (atraso: number): CSSProperties =>
    espera
      ? { opacity: 0, transform: 'translate3d(0, 20px, 0)' }
      : anima
        ? { opacity: 1, transform: 'none', transition: `opacity 1000ms ${SUAVE} ${atraso}ms, transform 1400ms ${ENTRADA} ${atraso}ms` }
        : {}
  const zoom: CSSProperties = espera ? { transform: 'scale(1.12)' } : anima ? { transform: 'scale(1)', transition: `transform 2200ms ${SUAVE}` } : {}

  const linhas: { conteudo: ReactNode; recuo: boolean }[] = [
    { conteudo: t('missaoL1'), recuo: false },
    { conteudo: t.rich('missaoL2', { v }), recuo: false },
    { conteudo: t('missaoL3'), recuo: true },
    { conteudo: t.rich('missaoL4', { v }), recuo: true },
  ]

  return (
    <section ref={ref} data-barra="var(--bege-claro)" className="flex items-start justify-center w-full h-[calc(900*var(--u))] max-lg:h-auto max-lg:flex-col">
      {/* ── Texto ── */}
      <div className="flex flex-1 flex-col justify-between h-[calc(900*var(--u))] min-w-px pl-[calc(32*var(--u))] pr-[calc(72*var(--u))] py-[calc(140*var(--u))] max-lg:h-auto max-lg:w-full max-lg:px-[calc(20*var(--u))] max-lg:pt-[calc(96*var(--u))] max-lg:pb-[calc(56*var(--u))] bg-[var(--bege-claro)] text-[var(--texto-escuro)]">
        <div className="flex flex-col gap-[calc(23*var(--u))] w-full">
          <p className="text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] opacity-75" style={aparece(0)}>
            {t('missaoLabel')}
          </p>

          <h2 className="flex flex-col gap-[calc(4*var(--u))] font-display text-[length:calc(40*var(--u))] leading-[calc(46.8*var(--u))] max-lg:text-[length:calc(30*var(--u))] max-lg:leading-[calc(38*var(--u))] max-lg:block font-normal tracking-normal">
            {linhas.map((l, k) => (
              // Janela da linha: corta com folga para acentos e descendentes
              // No mobile as quebras do desenho caem: o título corre como um parágrafo (inline, sem a janela)
              <span key={k} className={`block pb-[calc(1*var(--u))] max-lg:inline max-lg:p-0 max-lg:[clip-path:none]! ${l.recuo ? 'pl-[calc(56*var(--u))]' : ''}`} style={{ clipPath: 'inset(-0.2em -0.2em -0.3em -0.2em)' }}>
                <span className="block max-lg:inline" style={linha(k)}>
                  {l.conteudo}
                </span>{' '}
              </span>
            ))}
          </h2>
        </div>

        <div className="flex items-center gap-[calc(16*var(--u))] w-full pt-[calc(48*var(--u))]" style={aparece(800)}>
          <div className="relative size-[calc(72*var(--u))] shrink-0 overflow-hidden rounded-[calc(4*var(--u))]">
            <div className="absolute h-full top-0 overflow-hidden" style={{ left: '-38.95%', width: '177.9%' }}>
              <Image src="/home/missao-thumb-fundo.jpg" alt="" fill sizes="128px" className="object-cover" />
            </div>
            <div className="absolute w-[calc(152*var(--u))] h-[calc(101*var(--u))]" style={{ left: '50%', top: 'calc(50% + 0.5px)', transform: 'translate(-50%, -50%)' }}>
              <Image src="/home/missao-thumb.jpg" alt="" fill sizes="152px" className="object-cover" />
            </div>
          </div>
          <p className="max-w-[calc(224*var(--u))] pr-[calc(32.25*var(--u))] text-[length:max(11px,calc(12*var(--u)))] leading-[calc(19.2*var(--u))] opacity-85 whitespace-nowrap">
            {t('missaoLegenda1')}
            <br />
            {t('missaoLegenda2')}
          </p>
        </div>
      </div>

      {/* ── Fotografia: 710 × 900, duas camadas como no Figma ── */}
      <div className="relative h-[calc(900*var(--u))] w-[calc(710*var(--u))] max-lg:h-[calc(480*var(--u))] max-lg:w-full shrink-0 overflow-hidden bg-[var(--bege-claro)]">
        <div className="absolute inset-0" style={zoom}>
          <Image src="/home/missao-foto-fundo.jpg" alt="" fill sizes="(max-width: 1023px) 100vw, 710px" className="object-cover" />
          <div className="absolute left-0 w-full" style={{ top: '-2.83%', height: '118.28%' }}>
            <Image src="/home/missao-foto.jpg" alt="Cúpula da Basílica da Estrela" fill sizes="(max-width: 1023px) 100vw, 710px" className="object-cover" />
          </div>
        </div>
        {/* Cortina bege que sobe e revela a fotografia */}
        {estado !== 'parado' && (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[var(--bege-claro)]"
            style={{
              transform: anima ? 'translate3d(0, -100%, 0)' : 'translate3d(0, 0, 0)',
              transition: anima ? `transform 1500ms ${INOUT} 100ms` : 'none',
            }}
          />
        )}
      </div>
    </section>
  )
}
