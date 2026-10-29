'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'
import { u } from '@/lib/escala'

const CARTOES = [
  { chave: 'acao1', foto: '/obra/acao-1.jpg', largura: 444 },
  { chave: 'acao2', foto: '/obra/acao-2.jpg', largura: 444 },
  { chave: 'acao3', foto: '/obra/acao-3.jpg', largura: 445 },
  { chave: 'acao4', foto: '/obra/acao-4.jpg', largura: 445 },
] as const

/** Setas do Figma (nó 199:772): o mesmo traço, ligado ao scroll da faixa */
function SetaFaixa({ lado }: { lado: 'esq' | 'dir' }) {
  return (
    <svg width="25" height="13" viewBox="0 0 25 13" fill="none" stroke="currentColor" aria-hidden="true" style={{ width: u(24), height: u(12) }}>
      {lado === 'esq' ? <path d="M24.7348 6.5H.7348M7.19634 12.5L.7348 6.5L7.19634.5" /> : <path d="M.7348 6.5H24.7348M18.27 12.5L24.7348 6.5L18.27.5" />}
    </svg>
  )
}

/**
 * Obra Social, Ação social — design novo (Figma, nó 199:734), desktop 1440.
 *
 * Fundo vermelho, 180 de respiro e 31 de margem. Cabeçalho com o título em duas
 * linhas e o lema à direita; faixa de cartões (fotografia de 541 de altura,
 * título de 40px e frase) que corre na horizontal — o quarto cartão sai do
 * ecrã, como no desenho, e as setas de baixo avançam e recuam um cartão;
 * por baixo, régua e a frase de 20px.
 *
 * Mobile: os cartões ficam empilhados (sem faixa nem setas), a toda a largura.
 */
export default function ObraAcao() {
  const t = useTranslations('obra')
  const faixa = useRef<HTMLUListElement>(null)
  const [pos, setPos] = useState<'inicio' | 'meio' | 'fim'>('inicio')

  const mover = (sentido: 1 | -1) => {
    const el = faixa.current
    if (!el) return
    const cartao = el.querySelector('li')
    const passo = (cartao?.getBoundingClientRect().width ?? 444) + parseFloat(getComputedStyle(el).columnGap || '16')
    el.scrollBy({ left: sentido * passo, behavior: 'smooth' })
  }

  const aoCorrer = () => {
    const el = faixa.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setPos(el.scrollLeft <= 2 ? 'inicio' : el.scrollLeft >= max - 2 ? 'fim' : 'meio')
  }

  return (
    <section
      id="acao"
      data-barra="var(--vermelho)"
      data-barra-tom="escuro"
      className="flex w-full flex-col gap-[calc(80*var(--u))] max-lg:gap-[calc(48*var(--u))] py-[calc(180*var(--u))] max-lg:py-[calc(96*var(--u))] bg-[var(--vermelho)] text-[var(--bege-claro-2)]"
    >
      <Revelar className="px-[calc(31*var(--u))] max-lg:px-[calc(20*var(--u))]">
        <div className="flex w-full items-end justify-between max-lg:flex-col max-lg:items-start max-lg:gap-[calc(16*var(--u))]">
          <h2
            className="font-display text-[length:calc(80*var(--u))] max-lg:text-[length:calc(40*var(--u))] leading-none font-normal whitespace-nowrap max-lg:whitespace-normal"
            style={{ textBox: 'trim-both cap alphabetic' } as React.CSSProperties}
          >
            <span className="block">{t('acaoT1')}</span>
            <span className="block">{t('acaoT2')}</span>
          </h2>
          <p className="text-right max-lg:text-left text-[length:var(--t-etiqueta)] leading-[1.4] whitespace-nowrap max-lg:whitespace-normal">{t('acaoLema')}</p>
        </div>
      </Revelar>

      <Revelar atraso={100}>
        <ul
          ref={faixa}
          onScroll={aoCorrer}
          className="flex gap-[calc(16*var(--u))] overflow-x-auto px-[calc(31*var(--u))] max-lg:flex-col max-lg:gap-[calc(40*var(--u))] md:max-lg:grid md:max-lg:grid-cols-2 md:max-lg:gap-x-[calc(16*var(--u))] md:max-lg:gap-y-[calc(40*var(--u))] max-lg:overflow-visible max-lg:px-[calc(20*var(--u))] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {CARTOES.map((c) => (
            <li key={c.chave} className="shrink-0 self-start max-lg:w-full!" style={{ width: u(c.largura) }}>
              <article className="flex flex-col gap-[calc(20*var(--u))]">
                <div className="relative h-[calc(541*var(--u))] max-lg:h-[calc(300*var(--u))] w-full overflow-hidden rounded-[calc(4*var(--u))]">
                  <Image src={c.foto} alt={t(`${c.chave}Alt`)} fill sizes="445px" className="object-cover" />
                </div>
                <div className="flex w-full flex-col gap-[calc(20*var(--u))]">
                  <h3 className="font-display text-[length:calc(40*var(--u))] max-lg:text-[length:calc(30*var(--u))] leading-[calc(35.2*var(--u))] max-lg:leading-[calc(34*var(--u))] tracking-[calc(-0.192*var(--u))] font-normal whitespace-nowrap max-lg:whitespace-normal">{t(`${c.chave}Titulo`)}</h3>
                  <p className="text-[length:var(--t-corpo)] leading-[1.2] max-lg:leading-[1.5]">{t(`${c.chave}Texto`)}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Revelar>

      <div className="flex w-full flex-col gap-[calc(40*var(--u))] px-[calc(31*var(--u))] max-lg:px-[calc(20*var(--u))]">
        <div aria-hidden="true" className="h-px w-full max-lg:-mx-[calc(20*var(--u))] max-lg:w-[calc(100%+40*var(--u))] bg-[rgba(247,242,238,0.25)]" />
        <Revelar>
          <div className="flex w-full items-center justify-between max-lg:flex-col max-lg:items-start">
            <p
              className="w-[calc(542*var(--u))] max-lg:w-full text-[length:var(--t-lead)] max-lg:text-[length:var(--t-corpo)] leading-[1.6] max-lg:leading-[1.5]"
              style={{ fontFamily: 'var(--font-body-light)', textBox: 'trim-both cap alphabetic' } as React.CSSProperties}
            >
              {t('acaoFrase')}
            </p>
            <div className="flex items-center gap-[calc(32*var(--u))] max-lg:hidden">
              <button
                type="button"
                aria-label={t('anterior')}
                disabled={pos === 'inicio'}
                onClick={() => mover(-1)}
                className="transition-opacity duration-[400ms] ease-[var(--ease-out)] opacity-100 disabled:opacity-25"
              >
                <SetaFaixa lado="esq" />
              </button>
              <button
                type="button"
                aria-label={t('seguinte')}
                disabled={pos === 'fim'}
                onClick={() => mover(1)}
                className="transition-opacity duration-[400ms] ease-[var(--ease-out)] opacity-100 disabled:opacity-25"
              >
                <SetaFaixa lado="dir" />
              </button>
            </div>
          </div>
        </Revelar>
      </div>
    </section>
  )
}
