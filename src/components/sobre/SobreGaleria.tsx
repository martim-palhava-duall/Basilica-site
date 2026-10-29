'use client'

import Image from 'next/image'
import { useState, type ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'
import { u } from '@/lib/escala'
import { FOTOS_GALERIA } from '@/lib/galeria'
import { ESTILO_GESTOS, useGaleriaGestos } from '@/lib/useGaleriaGestos'

/** Fotografias da galeria (lib/galeria): as sete da frame "Galeria" do Figma */
const FOTOS = FOTOS_GALERIA.map((src, k) => ({ src, alt: `galAlt${k + 1}` }))

/* Largura da fotografia (--gal-l) e passo (--gal-p = largura + 40 de espaço): 794 e 834 no
   desktop, 300 e 312 no mobile; definidos como variáveis CSS na secção */

const mod = (n: number, m: number) => ((n % m) + m) % m

const i = (chunks: ReactNode) => (
  <span className="italic font-light" style={{ fontFamily: "var(--font-display)" }}>{chunks}</span>
)

/**
 * Sobre nós, Partilhas de Imagens — design novo (Figma, nó 170:3282), desktop 1440.
 *
 * Galeria em carrossel contínuo: a fotografia ativa fica centrada (794×624) e
 * as vizinhas espreitam dos dois lados, a 40 de distância. Ao avançar, a pista
 * desliza um passo; são montados cinco lugares à volta da ativa (dois de
 * cada lado, a repetir as imagens quando dá a volta) para o movimento nunca ter saltos.
 * Também se anda a arrastar com o rato ou o dedo e com o scroll horizontal do
 * trackpad (lib/useGaleriaGestos).
 * Em baixo, a barra de progresso à esquerda (enche-se até à fotografia atual)
 * e as setas à direita.
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

  // Arrastar e scroll horizontal do trackpad (ver lib/useGaleriaGestos)
  const { ref: pista, arrasto, arrastando } = useGaleriaGestos<HTMLDivElement>({ ir, limiar: 80 })

  return (
    <section id="imagens"
      data-barra={fundo}
      className="flex [--gal-l:calc(794*var(--u))] [--gal-p:calc(834*var(--u))] max-lg:[--gal-l:calc(300*var(--u))] max-lg:[--gal-p:calc(312*var(--u))] min-h-[calc(100svh_-_112*var(--u))] max-lg:min-h-0 max-lg:py-[calc(72*var(--u))] max-lg:gap-[calc(28*var(--u))] scroll-mt-[calc(112*var(--u))] flex-col items-center justify-center gap-[calc(40*var(--u))] w-full py-[calc(40*var(--u))] text-[var(--azul-escuro)]"
      style={{
        backgroundColor: fundo,
        ['--gal-h' as string]: 'clamp(calc(480 * var(--u)), calc(100svh - 330 * var(--u)), calc(624 * var(--u)))',
      }}
    >
      <div className="flex flex-col gap-[calc(12*var(--u))] items-center w-[calc(783*var(--u))] max-lg:w-full max-lg:px-[calc(20*var(--u))] text-center">
        <Revelar><p className="text-[length:var(--t-etiqueta)] leading-[1.17] tracking-[calc(-0.064*var(--u))]">{t('galLabel')}</p></Revelar>
        <Revelar atraso={100}>
          <h2 className="flex h-[calc(71*var(--u))] max-lg:h-auto items-center justify-center font-display text-[length:calc(80*var(--u))] max-lg:text-[length:calc(36*var(--u))] leading-[1.2] tracking-[calc(-0.576*var(--u))] max-lg:tracking-normal font-normal whitespace-nowrap max-lg:whitespace-normal">
            {t.rich('galTitulo', { i })}
          </h2>
        </Revelar>
      </div>

      {/* ── Pista ── */}
      <Revelar atraso={200} className="w-full">
        <div
          ref={pista}
          className="relative h-[var(--gal-h)] max-lg:h-[calc(380*var(--u))] w-full overflow-hidden"
          style={{ ...ESTILO_GESTOS, cursor: arrastando ? 'grabbing' : 'grab' }}
          aria-roledescription="carousel"
        >
          {lugares.map((k) => {
            const foto = FOTOS[mod(k, N)]
            const d = k - ativa
            return (
              <div
                key={k}
                aria-hidden={d !== 0}
                className="absolute left-1/2 top-0 h-[var(--gal-h)] max-lg:h-[calc(380*var(--u))] rounded-[calc(4*var(--u))] overflow-hidden transition-transform duration-[1100ms] ease-[var(--ease-out)]"
                style={{
                  width: 'var(--gal-l)',
                  transform: `translateX(calc(var(--gal-l) * -0.5 + ${d} * var(--gal-p) + ${arrasto}px))`,
                  transitionDuration: arrastando ? '0ms' : undefined,
                }}
              >
                <Image src={foto.src} alt={d === 0 ? t(foto.alt) : ''} fill sizes="(max-width: 767px) 300px, (max-width: 1023px) 420px, 794px" className="object-cover" />
              </div>
            )
          })}
        </div>
      </Revelar>

      {/* ── Progresso e setas ── */}
      <div className="relative h-[calc(32*var(--u))] max-lg:h-[calc(44*var(--u))] w-[calc(1376*var(--u))] max-lg:w-full max-lg:px-[calc(20*var(--u))] overflow-hidden">
        <div className="absolute left-0 max-lg:left-[calc(20*var(--u))] top-1/2 h-[calc(2*var(--u))] w-[calc(166*var(--u))] max-lg:w-[calc(120*var(--u))] -translate-y-1/2 bg-[rgba(28,43,57,0.1)]">
          {/* Enche-se da esquerda até à fotografia atual (1/N, 2/N… N/N); só `transform` */}
          <div
            className="h-[calc(2*var(--u))] w-full origin-left bg-[var(--azul-escuro)] transition-transform duration-[1100ms] ease-[var(--ease-out)]"
            style={{ transform: `scaleX(${(atual + 1) / N})` }}
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
            className="absolute left-[var(--seta-x)] max-lg:left-auto max-lg:right-[var(--seta-d)] top-[calc(6*var(--u))] h-[calc(20*var(--u))] w-[calc(32*var(--u))] max-lg:top-0 max-lg:h-full max-lg:w-[calc(44*var(--u))] flex items-center justify-end opacity-70 hover:opacity-100 transition-opacity duration-[400ms] ease-[var(--ease-out)]"
            style={{ ['--seta-x' as string]: u(b.left), ['--seta-d' as string]: u(b.d < 0 ? 72 : 20) }}
          >
            <span className="relative block h-[calc(20*var(--u))] w-[calc(32*var(--u))] shrink-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/sobre/galeria-setas.svg" alt="" width={81} height={13} className="absolute max-w-none" style={{ width: u(81), height: u(13), left: u(b.img), top: u(3.5) }} />
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
