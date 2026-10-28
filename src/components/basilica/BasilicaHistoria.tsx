import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'

/** Linha da ficha (rótulo + valor), com réguas por cima e por baixo. No desenho a
 *  de Sagração não tem a folga de 40 entre rótulo e valor (o valor precisa dela). */
function Ficha({ rotulo, valor, maiusculas = false, folga = 40 }: { rotulo: string; valor: string; maiusculas?: boolean; folga?: number }) {
  return (
    <div style={{ columnGap: folga }} className="flex items-start w-full py-[calc(12*var(--u))] border-b border-solid border-[rgba(28,43,57,0.3)] first:border-t text-[rgba(28,43,57,0.3)] font-bold">
      <span className="w-[calc(110*var(--u))] shrink-0 text-[length:calc(16*var(--u))] leading-[calc(19*var(--u))] self-center">{rotulo}</span>
      <span className={`flex-1 text-right text-[length:calc(16*var(--u))] leading-[calc(19*var(--u))] ${maiusculas ? 'uppercase' : ''}`}>{valor}</span>
    </div>
  )
}

/**
 * Basílica e Convento, história — design novo (Figma, nó 111:1108), desktop 1440, 619 de altura.
 *
 * Frase de abertura (40px, 911 de largura, com as quebras do desenho) e, à
 * direita, a ficha Construção/Sagração; por baixo, o rótulo "História da
 * Basílica" e dois parágrafos em duas colunas de 329, a 60% de opacidade.
 *
 * O desenho escreve "Contrução"; aqui está "Construção".
 */
export default function BasilicaHistoria() {
  const t = useTranslations('basilica')

  return (
    <section
      data-barra="var(--bege-claro-2)"
      className="flex flex-col gap-[calc(64*var(--u))] max-lg:gap-[calc(40*var(--u))] w-full px-[calc(32*var(--u))] py-[calc(120*var(--u))] max-lg:px-[calc(20*var(--u))] max-lg:py-[calc(72*var(--u))] bg-[var(--bege-claro-2)] text-[var(--azul-escuro)]"
    >
      <div className="flex items-start justify-between w-full max-lg:flex-col max-lg:gap-[calc(32*var(--u))]">
        <Revelar>
          <p
            className="font-display text-[length:calc(40*var(--u))] max-lg:text-[length:calc(26*var(--u))] leading-[1.2] w-[calc(911*var(--u))] max-lg:w-full"
            style={{ textBox: 'trim-both cap alphabetic' } as React.CSSProperties}
          >
            {t.rich('intro', { br: () => <>{' '}<br className="max-lg:hidden" /></> })}
          </p>
        </Revelar>
        <Revelar atraso={150} className="max-lg:w-full">
          <div className="flex flex-col w-[calc(329*var(--u))] max-lg:w-full">
            <Ficha rotulo={t('construcaoLabel')} valor={t('construcaoValor')} maiusculas />
            <Ficha rotulo={t('sagracaoLabel')} valor={t('sagracaoValor')} folga={0} />
          </div>
        </Revelar>
      </div>

      <Revelar atraso={100}>
        <div className="flex items-start justify-between w-full max-lg:flex-col max-lg:gap-[calc(24*var(--u))] text-[length:calc(16*var(--u))] leading-[1.5] text-[rgba(29,35,40,0.6)]">
          <p className="w-[calc(445*var(--u))] max-lg:w-full">{t('historiaLabel')}</p>
          <div className="flex gap-[calc(20*var(--u))] items-start max-lg:flex-col max-lg:w-full">
            <p className="w-[calc(329*var(--u))] max-lg:w-full">{t('historia1')}</p>
            <p className="w-[calc(329*var(--u))] max-lg:w-full">{t('historia2')}</p>
          </div>
        </div>
      </Revelar>
    </section>
  )
}
