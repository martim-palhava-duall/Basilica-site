'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import Seta from '@/components/home/Seta'

const ENTRADA = 'var(--ease-entrada)'
const SUAVE = 'var(--ease-suave)'
const INOUT = 'var(--ease-inout)'

/** Palavras em itálico leve dentro do título (<i> nas mensagens) */
const i = (chunks: ReactNode) => (
  <span className="italic font-light" style={{ fontFamily: "var(--font-display)", lineHeight: 0 }}>{chunks}</span>
)

/**
 * Quem Somos — design novo (Figma, nó 115:309), desktop 1440.
 *
 * Fundo bege claro 2, 180px de respiro, título centrado em 783 de largura que
 * quebra sozinho em duas linhas, e por baixo duas fotografias (Figma 201:598) —
 * uma celebração no altar-mor à esquerda (794×600) e, à direita (518), a nave
 * vista de cima (a mesma do "Interior" do Conhecer a Basílica), com o texto e o botão.
 *
 * Mobile: título a 40px; as duas fotografias empilham-se a toda a largura
 * (fachada 280 de altura, interior 220), com o texto e o botão no fim.
 *
 * Entrada ("máscara e cortinas", escolhida entre seis opções): quando a secção
 * chega a 75% do ecrã, o título sobe dentro da sua janela (como no hero e na
 * Missão); as duas fotografias são descobertas por cortinas bege que sobem,
 * desencontradas, com um zoom que assenta; por fim o texto e o botão. Só
 * `transform` e `opacity`; com movimento reduzido tudo aparece já no lugar.
 */
export default function HomeQuemSomos() {
  const t = useTranslations('inicio')
  const secRef = useRef<HTMLElement>(null)
  // 'parado': sem animação (servidor, antes de hidratar, movimento reduzido ou já passou) → tudo visível
  const [estado, setEstado] = useState<'parado' | 'espera' | 'entrou'>('parado')

  useEffect(() => {
    const el = secRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
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
  const entrou = estado === 'entrou'
  const surge = (atraso: number): CSSProperties | undefined =>
    espera
      ? { opacity: 0, transform: 'translate3d(0, 12px, 0)' }
      : entrou
        ? { opacity: 1, transform: 'none', transition: `opacity 1100ms ${SUAVE} ${atraso}ms, transform 1600ms ${ENTRADA} ${atraso}ms` }
        : undefined
  const zoom = (k: number): CSSProperties | undefined =>
    espera ? { transform: 'scale(1.12)' } : entrou ? { transform: 'scale(1)', transition: `transform 2200ms ${SUAVE} ${250 + k * 200}ms` } : undefined

  const foto = (k: number, src: string, alt: string, cls: string, sizes: string) => (
    <div className={`relative ${cls} rounded-[calc(4*var(--u))] overflow-hidden`}>
      <div className="absolute inset-0" style={zoom(k)}>
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
      {estado !== 'parado' && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[var(--bege-claro-2)]"
          style={entrou ? { transform: 'translate3d(0, -100%, 0)', transition: `transform 1500ms ${INOUT} ${250 + k * 200}ms` } : undefined}
        />
      )}
    </div>
  )

  return (
    <section
      ref={secRef}
      data-barra="var(--bege-claro-2)"
      className="flex flex-col items-start w-full px-[calc(32*var(--u))] py-[calc(180*var(--u))] max-lg:px-[calc(20*var(--u))] max-lg:py-[calc(96*var(--u))] bg-[var(--bege-claro-2)] text-[var(--texto-escuro)]"
    >
      <div className="flex flex-col gap-[calc(40*var(--u))] items-center w-full">
        <div className="flex flex-col gap-[calc(12*var(--u))] items-center w-[calc(783*var(--u))] max-lg:w-full text-center">
          <p className="text-[length:max(11px,calc(12*var(--u)))] leading-[1.4]" style={surge(0)}>{t('somosLabel')}</p>
          {/* Janela do título: corta com folga para acentos e descendentes */}
          <div style={{ clipPath: 'inset(calc(-20 * var(--u)) calc(-40 * var(--u)) calc(-30 * var(--u)) calc(-40 * var(--u)))' }}>
            <div
              style={
                espera ? { transform: 'translate3d(0, 110%, 0)' } : entrou ? { transform: 'none', transition: `transform 1300ms ${ENTRADA} 100ms` } : undefined
              }
            >
              <h2 className="font-display text-[length:calc(80*var(--u))] leading-[1.2] tracking-[calc(-0.576*var(--u))] max-lg:text-[length:calc(40*var(--u))] max-lg:leading-[1.15] max-lg:tracking-normal font-normal">{t.rich('somosTitulo', { i, br: () => <br /> })}</h2>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between w-full max-lg:flex-col max-lg:gap-[calc(16*var(--u))]">
          {foto(0, '/home/somos-celebracao.jpg', t('somosAlt1'), 'h-[calc(600*var(--u))] w-[calc(794*var(--u))] max-lg:h-[calc(280*var(--u))] max-lg:w-full', '(max-width: 1023px) 100vw, 794px')}

          <div className="flex flex-col gap-[calc(64*var(--u))] items-start w-[calc(518*var(--u))] max-lg:w-full max-lg:gap-[calc(32*var(--u))]">
            {foto(1, '/basilica/conhecer-interior.jpg', t('somosAlt2'), 'h-[calc(417*var(--u))] w-full max-lg:h-[calc(220*var(--u))]', '(max-width: 1023px) 100vw, 518px')}
            <div className="flex flex-col gap-[calc(24*var(--u))] items-start w-full" style={surge(900)}>
              <p className="text-[length:calc(16*var(--u))] leading-[1.5]">{t('somosTexto')}</p>
              <Link
                href="/vida-paroquia"
                className="group/btn flex items-center gap-[calc(12*var(--u))] px-[calc(29.6*var(--u))] py-[calc(14.4*var(--u))] rounded-[calc(6*var(--u))] border border-solid border-[rgba(27,43,57,0.45)] text-[length:max(11px,calc(12*var(--u)))] leading-[1.4] whitespace-nowrap transition-[background-color,color,border-color] duration-[400ms] ease-[var(--ease-out)]"
              >
                {t('somosCta')}
                <Seta className="group-hover/btn:translate-x-[calc(4*var(--u))]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
