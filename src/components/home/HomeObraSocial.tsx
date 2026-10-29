'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useTranslations } from 'next-intl'
import Seta from '@/components/home/Seta'

const ENTRADA = 'var(--ease-entrada)'

const TRIM = { textBox: 'trim-both cap alphabetic' } as React.CSSProperties

/** As três obras: cada barra inteira é um link para o site próprio da obra. */
const OBRAS = [
  { n: '01', chave: 'obra1', href: 'https://recolhimentolapa.pt', foto: '/home/obra-recolhimento.jpg' },
  { n: '02', chave: 'obra2', href: 'https://ocfl.webnode.pt', foto: '/home/obra-criancas.jpg' },
  { n: '03', chave: 'obra3', href: 'https://patronato9.webnode.pt', foto: '/home/obra-patronato.jpg' },
] as const

/**
 * Obra Social — design novo (Figma, nó 170:2523; fotos 179:283), desktop 1440.
 *
 * Fundo bege claro, 180 de respiro, cabeçalho com título em duas linhas e o
 * botão "Conhecer os projetos" (página da obra social, ainda por fazer). Por
 * baixo, três barras de 1440 com régua entre elas. Ao passar numa barra, ela
 * enche-se de azul escuro (texto em bege) e aparece, parada no centro e por
 * cima das barras vizinhas, a fotografia dessa obra.
 *
 * Animação (como a da lista da equipa em oralmente-ui): ao passar, o fundo azul
 * escuro sobe de baixo para cima (600ms, curva quint) e o texto muda de cor (400ms);
 * a fotografia só faz fade, sem se mexer: 800ms numa curva muito suave ao
 * entrar, 450ms ao sair. As três fotografias carregam quando a secção se
 * aproxima do ecrã (lazy, à medida de 246px), já prontas antes de o rato chegar.
 *
 * Entrada ("sequência calma", escolhida entre seis opções): quando a secção
 * chega a 75% do ecrã, o cabeçalho aparece com uma subida curta e depois cada
 * barra, uma a uma, com uma subida lenta (curva expo, 1,6 a 1,7s). Só
 * `transform` e `opacity`; com movimento reduzido tudo aparece já no lugar.
 *
 * Mobile: ao tocar numa barra ela enche-se de azul (`active:`), como o hover no desktop.
 */

export default function HomeObraSocial() {
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

  const surge = (atraso: number, dy = 12, dur = 1600): CSSProperties | undefined =>
    estado === 'espera'
      ? { opacity: 0, transform: `translate3d(0, ${dy}px, 0)` }
      : estado === 'entrou'
        ? { opacity: 1, transform: 'none', transition: `opacity ${dur - 400}ms var(--ease-suave) ${atraso}ms, transform ${dur}ms ${ENTRADA} ${atraso}ms` }
        : undefined

  return (
    <section
      ref={secRef}
      id="obras"
      data-barra="var(--bege-claro)"
      className="flex flex-col gap-[calc(80*var(--u))] items-center w-full py-[calc(180*var(--u))] max-lg:gap-[calc(48*var(--u))] max-lg:py-[calc(96*var(--u))] bg-[var(--bege-claro)] text-[var(--texto-escuro)]"
    >
      {/* ── Cabeçalho ── */}
      <div className="flex flex-col gap-[calc(24*var(--u))] items-start w-full px-[calc(32*var(--u))] max-lg:px-[calc(20*var(--u))]">
        <p className="text-[length:var(--t-etiqueta)] leading-[1.1]" style={surge(0)}>{t('obraLabel')}</p>
        <div className="flex items-start justify-between w-full max-lg:flex-col max-lg:gap-[calc(32*var(--u))]">
          <h2 className="font-display text-[length:calc(80*var(--u))] leading-none font-normal w-[calc(418*var(--u))] max-lg:w-auto max-lg:text-[length:calc(44*var(--u))]" style={TRIM}>
            <span className="block" style={surge(100)}>{t('obraT1')}</span>
            <span className="block italic font-light" style={{ fontFamily: "var(--font-display)", ...surge(180) }}>
              {t('obraT2')}
            </span>
          </h2>
          <div style={surge(250)}>
            <Link
              href="/obra-social"
              className="group/btn flex items-center gap-[calc(12*var(--u))] px-[calc(29.6*var(--u))] py-[calc(14.4*var(--u))] rounded-[calc(4*var(--u))] border border-solid border-[rgba(27,43,57,0.45)] text-[length:var(--t-etiqueta)] leading-[1.4] whitespace-nowrap transition-[background-color,color,border-color] duration-[400ms] ease-[var(--ease-out)]"
            >
              {t('obraCta')}
              <Seta className="group-hover/btn:translate-x-[calc(4*var(--u))]" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Barras ── */}
      <div className="w-full">
        {OBRAS.map((o, i) => (
          <a
            key={o.n}
            href={o.href}
            target="_blank"
            rel="noopener noreferrer"
            style={surge(500 + i * 220, 14, 1700)}
            className={`group/obra relative z-0 hover:z-10 flex items-center justify-between w-full py-[calc(40*var(--u))] max-lg:flex-col max-lg:items-start max-lg:gap-[calc(16*var(--u))] max-lg:py-[calc(28*var(--u))] border-t border-solid border-[rgba(28,43,57,0.3)] ${i === OBRAS.length - 1 ? 'border-b' : ''} hover:text-[var(--bege-claro-2)] focus-visible:text-[var(--bege-claro-2)] active:text-[var(--bege-claro-2)] outline-none transition-colors duration-[400ms] ease-[var(--quint)]`}
          >
            {/* Enchimento: sobe de baixo (scaleY, só compositor), por trás do texto */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 -inset-y-px -z-10 origin-bottom scale-y-0 bg-[var(--texto-escuro)] transition-transform duration-[600ms] ease-[var(--quint)] group-hover/obra:scale-y-100 group-focus-visible/obra:scale-y-100 group-active/obra:scale-y-100"
            />

            <div className="flex items-center gap-[calc(24*var(--u))] px-[calc(32*var(--u))] max-lg:px-[calc(20*var(--u))] max-lg:gap-[calc(16*var(--u))]">
              <span className="w-[calc(80*var(--u))] max-lg:w-[calc(24*var(--u))] text-[length:var(--t-etiqueta)] leading-[1.17] tracking-[calc(-0.064*var(--u))]">{o.n}</span>
              <span className="flex w-[calc(352*var(--u))] max-lg:w-auto items-center gap-[calc(14*var(--u))] font-display text-[length:calc(40*var(--u))] leading-[calc(35.2*var(--u))] max-lg:text-[length:calc(30*var(--u))] max-lg:leading-[calc(32*var(--u))] tracking-[calc(-0.192*var(--u))] whitespace-nowrap">
                {t(`${o.chave}Titulo`)}
                {/* ↗ de ligação exterior: aparece ao passar (Figma 201:4508) */}
                <span
                  aria-hidden="true"
                  className="seta-externa-grande max-lg:hidden opacity-0 -translate-x-[calc(6*var(--u))] translate-y-[calc(6*var(--u))] transition-[opacity,transform] duration-[500ms] ease-[var(--ease-out)] group-hover/obra:opacity-100 group-hover/obra:translate-x-0 group-hover/obra:translate-y-0 group-focus-visible/obra:opacity-100 group-focus-visible/obra:translate-x-0 group-focus-visible/obra:translate-y-0"
                />
              </span>
            </div>

            <div className="flex flex-col gap-[calc(24*var(--u))] w-[calc(384*var(--u))] max-lg:w-full max-lg:gap-[calc(14*var(--u))] max-lg:pl-[calc(60*var(--u))] max-lg:pr-[calc(20*var(--u))]">
              <p className="max-w-[calc(448*var(--u))] pr-[calc(32*var(--u))] max-lg:pr-0 text-[length:var(--t-corpo)] leading-[1.4]">{t(`${o.chave}Texto`)}</p>
              <span className="flex items-center gap-[calc(4*var(--u))] text-[length:var(--t-corpo)] leading-[1.5]">
                <span className="underline decoration-from-font underline-offset-[calc(5*var(--u))]">{t('obraSaibaMais')}</span>
                <span aria-hidden="true" className="seta-externa transition-transform duration-[400ms] ease-[var(--ease-out)] group-hover/obra:translate-x-[calc(2*var(--u))] group-hover/obra:-translate-y-[calc(2*var(--u))]" />
              </span>
            </div>

            {/* Fotografia: parada no centro da barra, só aparece — fade longo e suave a entrar, mais curto a sair */}
            <div
              aria-hidden="true"
              className="obra-foto max-lg:hidden pointer-events-none absolute left-1/2 top-1/2 h-[calc(282*var(--u))] w-[calc(246*var(--u))] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[calc(4*var(--u))] opacity-0 will-change-[opacity] group-hover/obra:opacity-100 group-focus-visible/obra:opacity-100"
            >
              <Image src={o.foto} alt="" fill sizes="246px" className="object-cover" />
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
