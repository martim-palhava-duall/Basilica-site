import Image from 'next/image'
import type { ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'

const i = (chunks: ReactNode) => (
  <span className="italic font-light" style={{ fontFamily: "'forevs-light', var(--font-display)" }}>{chunks}</span>
)

/**
 * Celebrações, Primeiros Sábados — design novo (Figma, nó 111:1742), desktop 1440.
 *
 * Fundo bege claro 2, 180 de respiro. Título centrado (label + 80px, com
 * "de reparação" em itálico leve) e, por baixo, uma fotografia grande à
 * esquerda (794×637) e à direita (518) outra fotografia, o texto e a linha
 * "Quando", entre duas réguas.
 */
export default function CelebracoesSabados() {
  const t = useTranslations('celebrar')

  return (
    <section
      id="sabados"
      data-barra="var(--bege-claro-2)"
      className="flex w-full flex-col px-[calc(32*var(--u))] py-[calc(180*var(--u))] bg-[var(--bege-claro-2)] text-[var(--azul-escuro)]"
    >
      <div className="flex w-full flex-col items-center gap-[calc(40*var(--u))]">
        <div className="flex w-[calc(783*var(--u))] flex-col items-center gap-[calc(12*var(--u))] text-center">
          <Revelar><p className="text-[length:max(11px,calc(12*var(--u)))] leading-[1.4]">{t('sabLabel')}</p></Revelar>
          <Revelar atraso={100}>
            <h2 className="font-display text-[length:calc(80*var(--u))] leading-[1.2] tracking-[calc(-0.576*var(--u))] font-normal">{t.rich('sabTitulo', { i })}</h2>
          </Revelar>
        </div>

        <div className="flex w-full items-center justify-between">
          <Revelar atraso={100}>
            <div className="relative h-[calc(637*var(--u))] w-[calc(794*var(--u))] overflow-hidden rounded-[calc(4*var(--u))]">
              <Image src="/home/oque-celebrar.jpg" alt={t('sabAlt1')} fill sizes="794px" className="object-cover" />
            </div>
          </Revelar>

          <div className="flex w-[calc(518*var(--u))] flex-col gap-[calc(48*var(--u))]">
            <Revelar atraso={200}>
              <div className="relative h-[calc(417*var(--u))] w-full overflow-hidden rounded-[calc(4*var(--u))]">
                <Image src="/home/somos-interior.jpg" alt={t('sabAlt2')} fill sizes="518px" className="object-cover" />
              </div>
            </Revelar>
            <Revelar atraso={300}>
              <div className="flex w-full flex-col gap-[calc(40*var(--u))]">
                <p className="text-[length:calc(16*var(--u))] leading-[1.5]">{t('sabTexto')}</p>
                <div className="flex w-[calc(518*var(--u))] items-start gap-[calc(40*var(--u))] border-y border-solid border-[rgba(28,43,57,0.25)] py-[calc(20*var(--u))]">
                  <p className="w-[calc(224*var(--u))] shrink-0 self-center text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] font-bold">{t('sabQuandoLabel')}</p>
                  <p className="w-[calc(254*var(--u))] text-right text-[length:calc(16*var(--u))] leading-[calc(19*var(--u))] font-bold">{t('sabQuando')}</p>
                </div>
              </div>
            </Revelar>
          </div>
        </div>
      </div>
    </section>
  )
}
