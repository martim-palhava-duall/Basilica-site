import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'

/**
 * Sobre nós, introdução — design novo (Figma, nó 170:3124), desktop 1440.
 *
 * Frase de abertura a 40px (caixa trimada às maiúsculas, 911 de largura) e,
 * por baixo, o rótulo "Sobre a Paróquia" à esquerda e quatro parágrafos em
 * duas colunas de 329 à direita, com 60% de opacidade.
 */
export default function SobreParoquia() {
  const t = useTranslations('sobre')

  return (
    <section id="paroquia"
      data-barra="var(--bege-claro-2)"
      className="flex flex-col gap-[calc(64*var(--u))] w-full px-[calc(32*var(--u))] py-[calc(120*var(--u))] max-lg:gap-[calc(40*var(--u))] max-lg:px-[calc(20*var(--u))] max-lg:py-[calc(72*var(--u))] bg-[var(--bege-claro-2)] text-[var(--azul-escuro)]"
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
        <div className="flex items-start justify-between w-full max-lg:flex-col max-lg:gap-[calc(24*var(--u))] text-[length:calc(16*var(--u))] leading-[1.5] text-[rgba(29,35,40,0.6)]">
          <p className="w-[calc(329*var(--u))] max-lg:w-full">{t('paroquiaLabel')}</p>
          <div className="flex gap-[calc(20*var(--u))] items-center max-lg:flex-col max-lg:items-start">
            <div className="flex flex-col gap-[calc(20*var(--u))] w-[calc(329*var(--u))] max-lg:w-full">
              <p>{t('paroquia1')}</p>
              <p>{t('paroquia2')}</p>
            </div>
            <div className="flex flex-col gap-[calc(20*var(--u))] w-[calc(329*var(--u))] max-lg:w-full">
              <p>{t('paroquia3')}</p>
              <p>{t('paroquia4')}</p>
            </div>
          </div>
        </div>
      </Revelar>
    </section>
  )
}
