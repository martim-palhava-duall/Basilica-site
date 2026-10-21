import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'

/**
 * Vida da Paróquia, introdução — design novo (Figma, nó 111:1986), desktop 1440, 571 de altura.
 *
 * Frase de 40px (911 de largura) e, por baixo, "Todos os dias" à esquerda e
 * dois textos de 329 à direita, a 60% de opacidade; 120 de respiro em cima e em baixo.
 */
export default function VidaIntro() {
  const t = useTranslations('vida')
  const corpo = 'w-[calc(329*var(--u))] text-[length:calc(16*var(--u))] leading-[1.5] text-[rgba(29,35,40,0.6)]'

  return (
    <section data-barra="var(--bege-claro-2)" className="flex w-full flex-col gap-[calc(64*var(--u))] px-[calc(32*var(--u))] py-[calc(120*var(--u))] bg-[var(--bege-claro-2)] text-[var(--azul-escuro)]">
      <Revelar>
        <p
          className="w-[calc(911*var(--u))] font-display text-[length:calc(40*var(--u))] leading-[1.2] font-normal"
          style={{ textBox: 'trim-both cap alphabetic' } as React.CSSProperties}
        >
          {t('introFrase')}
        </p>
      </Revelar>
      <Revelar atraso={100}>
        <div className="flex w-full items-start justify-between">
          <p className={corpo}>{t('introTag')}</p>
          <div className="flex items-start gap-[calc(20*var(--u))]">
            <p className={corpo}>{t('introTexto1')}</p>
            <p className={corpo}>{t('introTexto2')}</p>
          </div>
        </div>
      </Revelar>
    </section>
  )
}
