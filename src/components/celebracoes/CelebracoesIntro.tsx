import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'

/**
 * Celebrações, introdução — design novo (Figma, nó 111:1525), desktop 1440.
 *
 * Frase de abertura a 40px (911 de largura, com as quebras do desenho) e,
 * por baixo, o rótulo "Ao longo do ano" à esquerda e dois parágrafos em duas
 * colunas de 329 à direita, a 60% de opacidade.
 */
export default function CelebracoesIntro() {
  const t = useTranslations('celebrar')

  return (
    <section
      data-barra="var(--bege-claro-2)"
      className="flex flex-col gap-[calc(64*var(--u))] max-lg:gap-[calc(40*var(--u))] w-full px-[calc(32*var(--u))] py-[calc(120*var(--u))] max-lg:px-[calc(20*var(--u))] max-lg:py-[calc(72*var(--u))] bg-[var(--bege-claro-2)] text-[var(--azul-escuro)]"
    >
      <Revelar>
        <p
          className="font-display text-[length:calc(40*var(--u))] leading-[1.2] w-[calc(911*var(--u))] max-lg:w-full max-lg:text-[length:calc(26*var(--u))]"
          style={{ textBox: 'trim-both cap alphabetic' } as React.CSSProperties}
        >
          {t.rich('intro', { br: () => <>{' '}<br className="max-lg:hidden" /></> })}
        </p>
      </Revelar>

      <Revelar atraso={150}>
        <div className="flex items-start justify-between max-lg:flex-col max-lg:gap-[calc(24*var(--u))] w-full text-[length:calc(16*var(--u))] leading-[1.5] text-[rgba(29,35,40,0.6)]">
          <p className="w-[calc(329*var(--u))] max-lg:w-full">{t('anoLabel')}</p>
          <div className="flex gap-[calc(20*var(--u))] items-start max-lg:flex-col max-lg:w-full">
            <p className="w-[calc(329*var(--u))] max-lg:w-full">{t('ano1')}</p>
            <p className="w-[calc(329*var(--u))] max-lg:w-full">{t('ano2')}</p>
          </div>
        </div>
      </Revelar>
    </section>
  )
}
