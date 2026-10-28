import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'

/**
 * Obra Social, introdução — design novo (Figma, nó 199:419), desktop 1440.
 *
 * Frase de 40px (911 de largura) e, por baixo, "A obra" à esquerda e dois
 * parágrafos de 329 à direita, a 60% de opacidade; 120 de respiro em cima e em baixo.
 */
export default function ObraIntro() {
  const t = useTranslations('obra')
  const corpo = 'w-[calc(329*var(--u))] max-lg:w-full text-[length:calc(16*var(--u))] leading-[1.5] text-[rgba(29,35,40,0.6)]'

  return (
    <section data-barra="var(--bege-claro-2)" className="flex w-full flex-col gap-[calc(64*var(--u))] max-lg:gap-[calc(40*var(--u))] px-[calc(32*var(--u))] py-[calc(120*var(--u))] max-lg:px-[calc(20*var(--u))] max-lg:py-[calc(72*var(--u))] bg-[var(--bege-claro-2)] text-[var(--azul-escuro)]">
      <Revelar>
        <p
          className="w-[calc(911*var(--u))] max-lg:w-full font-display text-[length:calc(40*var(--u))] max-lg:text-[length:calc(26*var(--u))] leading-[1.2] font-normal"
          style={{ textBox: 'trim-both cap alphabetic' } as React.CSSProperties}
        >
          {t('intro')}
        </p>
      </Revelar>
      <Revelar atraso={100}>
        <div className="flex w-full items-start justify-between max-lg:flex-col max-lg:gap-[calc(24*var(--u))]">
          <p className={corpo}>{t('obraLabel')}</p>
          <div className="flex items-start gap-[calc(20*var(--u))] max-lg:flex-col max-lg:w-full">
            <p className={corpo}>{t('obra1')}</p>
            <p className={corpo}>{t('obra2')}</p>
          </div>
        </div>
      </Revelar>
    </section>
  )
}
