'use client'

import Image from 'next/image'
import { useState, type ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'
import { u } from '@/lib/escala'
import { FOTOS_GALERIA } from '@/lib/galeria'

/** Fotografias da galeria (lib/galeria): as sete da frame "Galeria" do Figma */
const FOTOS = FOTOS_GALERIA.map((src, k) => ({ src, alt: `galAlt${k + 1}` }))

const LARGURA = 794
const ESPACO = 40
const PASSO = LARGURA + ESPACO

const mod = (n: number, m: number) => ((n % m) + m) % m

const i = (chunks: ReactNode) => (
  <span className="italic font-light" style={{ fontFamily: "'forevs-light', var(--font-display)" }}>{chunks}</span>
)

/**
 * Sobre nós, Partilhas de Imagens — design novo (Figma, nó 170:3282), desktop 1440.
 *
 * Galeria em carrossel contínuo: a fotografia ativa fica centrada (794×624) e
 * as vizinhas espreitam dos dois lados, a 40 de distância. Ao avançar, a pista
 * desliza um passo; são montados cinco lugares à volta da ativa (dois de
 * cada lado, a repetir as imagens quando dá a volta) para o movimento nunca ter saltos.
 * Em baixo, a barra de progresso à esquerda e as setas à direita.
 * A altura das fotografias acompanha o ecrã (ecrã menos 330px), entre 480 e os 624
 * do desenho: num ecrã de 900 de altura ficam com 570. A secção já não cabe
 * inteira num ecrã baixo, para as fotografias não ficarem curtas.
 * `fundo`: cor da secção (bege claro 2 por omissão; as Notícias usam bege claro).
 */
export default function SobreGaleria({ fundo = 'var(--bege-claro-2)' }: { fundo?: string }) {
  const t = useTranslations('sobre')
  const [ativa, setAtiva] = useState(0)
  const N = FOTOS.length
  const ir = (d: number) => setAtiva((a) => a + d)
  const atual = mod(ativa, N)

  // Lugares montados: dois para cada lado da ativa. A chave é o índice virtual,
  // por isso cada fotografia mantém a identidade ao deslizar.
  const lugares = [-2, -1, 0, 1, 2].map((d) => ativa + d)

  return (
    <section id="imagens"
      data-barra={fundo}
      className="flex min-h-[calc(100svh_-_112*var(--u))] scroll-mt-[calc(112*var(--u))] flex-col items-center justify-center gap-[calc(40*var(--u))] w-full py-[calc(40*var(--u))] text-[var(--azul-escuro)]"
      style={{ backgroundColor: fundo, ['--gal-h' as string]: 'clamp(calc(480 * var(--u)), calc(100svh - 330 * var(--u)), calc(624 * var(--u)))' }}
    >
      <div className="flex flex-col gap-[calc(12*var(--u))] items-center w-[calc(783*var(--u))] text-center">
        <Revelar><p className="text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] tracking-[calc(-0.064*var(--u))]">{t('galLabel')}</p></Revelar>
        <Revelar atraso={100}>
          <h2 className="flex h-[calc(71*var(--u))] items-center justify-center font-display text-[length:calc(80*var(--u))] leading-[1.2] tracking-[calc(-0.576*var(--u))] font-normal whitespace-nowrap">
            {t.rich('galTitulo', { i })}
          </h2>
        </Revelar>
      </div>

      {/* ── Pista ── */}
      <Revelar atraso={200} className="w-full">
        <div className="relative h-[var(--gal-h)] w-full overflow-hidden" aria-roledescription="carousel">
          {lugares.map((k) => {
            const foto = FOTOS[mod(k, N)]
            const d = k - ativa
            return (
              <div
                key={k}
                aria-hidden={d !== 0}
                className="absolute left-1/2 top-0 h-[var(--gal-h)] rounded-[calc(4*var(--u))] overflow-hidden transition-transform duration-[1100ms] ease-[var(--ease-out)]"
                style={{ width: u(LARGURA), transform: `translateX(calc(${-LARGURA / 2 + d * PASSO} * var(--u)))` }}
              >
                <Image src={foto.src} alt={d === 0 ? t(foto.alt) : ''} fill sizes="794px" className="object-cover" />
              </div>
            )
          })}
        </div>
      </Revelar>

      {/* ── Progresso e setas ── */}
      <div className="relative h-[calc(32*var(--u))] w-[calc(1376*var(--u))] overflow-hidden">
        <div className="absolute left-0 top-1/2 h-[calc(2*var(--u))] w-[calc(166*var(--u))] -translate-y-1/2 bg-[rgba(28,43,57,0.1)]">
          <div
            className="h-[calc(2*var(--u))] bg-[var(--azul-escuro)] transition-transform duration-[1100ms] ease-[var(--ease-out)]"
            style={{ width: u(166 / N), transform: `translateX(calc(${atual * (166 / N)} * var(--u)))` }}
          />
        </div>

        {/* O SVG do Figma tem as duas setas; cada botão mostra uma metade */}
        {([
          { rotulo: 'galAnterior', left: 1292, img: 3.5, d: -1 },
          { rotulo: 'galSeguinte', left: 1348, img: -52.5, d: 1 },
        ] as const).map((b) => (
          <button
            key={b.rotulo}
            type="button"
            aria-label={t(b.rotulo)}
            onClick={() => ir(b.d)}
            className="absolute top-[calc(6*var(--u))] h-[calc(20*var(--u))] w-[calc(32*var(--u))] overflow-hidden opacity-70 hover:opacity-100 transition-opacity duration-[400ms] ease-[var(--ease-out)]"
            style={{ left: u(b.left) }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/sobre/galeria-setas.svg" alt="" width={81} height={13} className="absolute max-w-none" style={{ width: u(81), height: u(13), left: u(b.img), top: u(3.5) }} />
          </button>
        ))}
      </div>
    </section>
  )
}
