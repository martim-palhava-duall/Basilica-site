'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useTranslations } from 'next-intl'
import Seta from '@/components/home/Seta'
import { u } from '@/lib/escala'

const ENTRADA = 'var(--ease-entrada)'

type Entrada = { horas: string; dias: string }
type Coluna = { titulo: string; entradas: Entrada[] }

const TRIM = { textBox: 'trim-both cap alphabetic' } as React.CSSProperties
const LEVE = 'font-[family-name:var(--font-body-light)]'

/**
 * Horários — design novo (Figma, nó 148:471), desktop 1440.
 *
 * Fundo bege escuro 2, 180px de respiro em cima e em baixo, e 80 entre os três
 * blocos: cabeçalho com botão, colunas de horários, acolhimento.
 *
 * As horas não estão escritas aqui: vêm do namespace `horarios`, a fonte única
 * dos horários da paróquia (a mesma que o menu usa). O desenho repete a mesma
 * linha de teste nas últimas colunas; aqui entram os dados reais. A coluna
 * "Abertura e encerramento" do desenho corresponde às horas de acolhimento.
 *
 * Mobile: cabeçalho em coluna (título a 40px, botão por baixo), horários numa
 * grelha de duas colunas (horas a 14px, para "10H00 · 12H00 · 19H00" caber na
 * coluna de 165) e o acolhimento a toda a largura.
 *
 * Entrada ("horas que acendem", escolhida entre seis opções): quando a secção
 * chega a 75% do ecrã, o cabeçalho aparece com uma subida curta, depois os nomes
 * das colunas e por fim as horas acendem de cima para baixo, como quem lê o
 * horário; o acolhimento fecha. Curva expo, 1,4 a 1,6s. Só `transform` e
 * `opacity`; com movimento reduzido tudo aparece já no lugar.
 */
export default function HomeHorarios() {
  const t = useTranslations('inicio')
  const h = useTranslations('horarios')
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

  /** Aparecer: opacidade + subida de `dy`px, com `dur` e `atraso` */
  const surge = (atraso: number, dy = 12, dur = 1600): CSSProperties | undefined =>
    estado === 'espera'
      ? { opacity: 0, transform: dy ? `translate3d(0, ${dy}px, 0)` : 'none' }
      : estado === 'entrou'
        ? { opacity: 1, transform: 'none', transition: `opacity ${dur - 400}ms var(--ease-suave) ${atraso}ms, transform ${dur}ms ${ENTRADA} ${atraso}ms` }
        : undefined

  const colunas: Coluna[] = [
    {
      titulo: h('missasHead'),
      entradas: [
        { horas: h('missasSemHoras'), dias: h('missasSemDias') },
        { horas: h('missasDomHoras'), dias: h('missasDomDias') },
      ],
    },
    {
      titulo: h('confissoesHead'),
      entradas: [
        { horas: h('confissoesSemHoras'), dias: h('confissoesSemDias') },
        { horas: h('confissoesDomHoras'), dias: h('confissoesDomDias') },
      ],
    },
    {
      titulo: h('adoracaoHead'),
      entradas: [{ horas: h('adoracaoSemHoras'), dias: h('adoracaoSemDias') }],
    },
    {
      titulo: t('horAbertura'),
      entradas: [
        { horas: h('acolhimentoSemHoras'), dias: h('acolhimentoSemDias') },
        { horas: h('acolhimentoFdsHoras'), dias: h('acolhimentoFdsDias') },
      ],
    },
    {
      titulo: h('cartorioHead'),
      entradas: [{ horas: h('cartorioHoras'), dias: h('cartorioDias') }],
    },
  ]

  return (
    <section
      ref={secRef}
      data-barra="var(--bege-escuro-2)"
      className="flex flex-col gap-[calc(80*var(--u))] w-full px-[calc(32*var(--u))] py-[calc(180*var(--u))] max-lg:gap-[calc(56*var(--u))] max-lg:px-[calc(20*var(--u))] max-lg:py-[calc(96*var(--u))] bg-[var(--bege-escuro-2)] text-[var(--texto-escuro)]"
    >
      {/* ── Cabeçalho ── */}
      <div className="flex flex-col gap-[calc(24*var(--u))] w-full">
        <div className="flex flex-col gap-[calc(12*var(--u))] w-full">
          <p className="text-[length:max(11px,calc(12*var(--u)))] leading-[1.4]" style={surge(0)}>{t('horLabel')}</p>
          <div className="flex items-center justify-between w-full max-lg:flex-col max-lg:items-start max-lg:gap-[calc(24*var(--u))]">
            <h2 className="font-display text-[length:calc(80*var(--u))] leading-[calc(96*var(--u))] tracking-[calc(0.96*var(--u))] max-lg:text-[length:calc(40*var(--u))] max-lg:leading-[calc(46*var(--u))] max-lg:tracking-normal font-normal whitespace-nowrap" style={surge(100)}>
              {t('horTitulo')}
            </h2>
            <div style={surge(200)}>
              <Link
                href="/horarios"
                className="group/btn flex items-center gap-[calc(11.91*var(--u))] h-[calc(46.8*var(--u))] px-[calc(29.6*var(--u))] rounded-[calc(4*var(--u))] bg-[var(--texto-escuro)] text-[length:max(11px,calc(12*var(--u)))] leading-[1.4] whitespace-nowrap text-[var(--bege-claro-2)] transition-[background-color] duration-[400ms] ease-[var(--ease-out)]"
              >
                {t('horCta')}
                <Seta className="group-hover/btn:translate-x-[calc(4*var(--u))]" />
              </Link>
            </div>
          </div>
        </div>
        <div style={surge(250)}>
          <p className={`${LEVE} w-[calc(444*var(--u))] max-lg:w-full text-[length:calc(16*var(--u))] leading-[1.5]`} style={TRIM}>{t('horTexto')}</p>
        </div>
      </div>

      {/* ── Colunas de horários: os nomes primeiro, depois as horas de cima para baixo ── */}
      <div className="flex gap-[calc(40*var(--u))] items-start max-lg:grid max-lg:grid-cols-2 max-lg:gap-x-[calc(20*var(--u))] max-lg:gap-y-[calc(48*var(--u))]">
        {colunas.map((c, k) => (
          <div key={c.titulo} className="flex flex-col gap-[calc(32*var(--u))] w-[calc(213*var(--u))] max-lg:w-auto max-lg:gap-[calc(20*var(--u))]">
            <p className="text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] font-bold" style={surge(450 + k * 80, 0)}>{c.titulo}</p>
            <div className="flex flex-col gap-[calc(24*var(--u))]">
              {c.entradas.map((e, j) => (
                <div key={e.horas} className="flex flex-col gap-[calc(3.19*var(--u))]" style={surge(800 + j * 260 + k * 60, 8, 1400)}>
                  <HorasEntrada horas={e.horas} />
                  <p className="text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] whitespace-nowrap max-lg:whitespace-normal">{e.dias}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Acolhimento: o CTA leva aos horários de abertura e ao acesso, na página Visitar ── */}
      <div className="flex flex-col gap-[calc(40*var(--u))] w-[calc(563*var(--u))] max-lg:w-full max-lg:gap-[calc(32*var(--u))]" style={surge(1500)}>
        <div className="flex flex-col gap-[calc(16*var(--u))] w-full">
          <p className="text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] font-bold">{t('horAcolhLabel')}</p>
          <div className="flex flex-col gap-[calc(24*var(--u))] w-[calc(562*var(--u))] max-lg:w-full">
            <p className="font-display text-[length:calc(40*var(--u))] leading-[calc(35.2*var(--u))] tracking-[calc(-0.192*var(--u))] max-lg:text-[length:calc(30*var(--u))] max-lg:leading-[calc(32*var(--u))]">{t('horAcolhTitulo')}</p>
            <p className={`${LEVE} text-[length:calc(16*var(--u))] leading-[1.5]`} style={TRIM}>{t('horAcolhTexto')}</p>
          </div>
        </div>
        <Link href="/basilica-e-convento#horarios" className="group/cta self-start flex items-center gap-[calc(12*var(--u))] text-[length:calc(16*var(--u))] leading-[1.5] whitespace-nowrap">
          {t('horAcolhCta')}
          <span className="relative block w-[calc(13*var(--u))] h-[calc(7*var(--u))] overflow-visible">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/home/seta-conhecer.svg" alt="" width={13} height={7} className="block transition-transform duration-[400ms] ease-[var(--ease-out)] group-hover/cta:translate-x-[calc(4*var(--u))]" style={{ width: u(13), height: u(7) }} />
          </span>
        </Link>
      </div>
    </section>
  )
}

/**
 * Horas de uma entrada. Intervalos ("11H00 ÀS 12H00 · 18H00 ÀS 19H00") ficam um
 * por linha, com o "às" em minúsculas como no desenho; listas simples de horas
 * ("12H00 · 19H00") ficam numa linha, em maiúsculas.
 */
function HorasEntrada({ horas }: { horas: string }) {
  const intervalos = horas.includes('ÀS') && horas.includes(' · ')
  if (intervalos) {
    return (
      <div className="text-[length:calc(16*var(--u))] max-lg:text-[length:calc(14*var(--u))] leading-[1.4] font-bold whitespace-nowrap">
        {horas.split(' · ').map((l) => (
          <p key={l}>{l.replace(' ÀS ', ' às ')}</p>
        ))}
      </div>
    )
  }
  const unico = horas.includes('ÀS')
  return (
    <p className={`text-[length:calc(16*var(--u))] max-lg:text-[length:calc(14*var(--u))] leading-[calc(19*var(--u))] max-lg:leading-[calc(17*var(--u))] font-bold whitespace-nowrap ${unico ? '' : 'uppercase'}`}>
      {horas.replace(' ÀS ', ' às ')}
    </p>
  )
}
