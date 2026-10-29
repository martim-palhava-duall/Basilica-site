import Image from 'next/image'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'

/**
 * Basílica e Convento, abertura — design novo (Figma, nó 111:1102), desktop 1440.
 *
 * Label e título (80px, numa linha, caixa trimada às maiúsculas) a 80 do
 * topo, e a fotografia da nave (Figma 201:1301), 1376×600, enquadrada por baixo. Termina na
 * própria fotografia, como a abertura do Sobre nós.
 */
export default function BasilicaCapa() {
  const t = useTranslations('basilica')

  return (
    <section
      data-barra="var(--bege-claro-2)"
      className="w-full px-[calc(32*var(--u))] pt-[calc(80*var(--u))] max-lg:px-[calc(20*var(--u))] max-lg:pt-[calc(40*var(--u))] bg-[var(--bege-claro-2)] text-[var(--azul-escuro)]"
    >
      <div className="flex flex-col gap-[calc(64*var(--u))] max-lg:gap-[calc(32*var(--u))] w-full">
        <div className="flex flex-col gap-[calc(24*var(--u))] w-full">
          <Revelar><p className="text-[length:var(--t-etiqueta)] leading-[1.17]">{t('label')}</p></Revelar>
          <Revelar atraso={100}>
            <h1
              className="font-display text-[length:calc(80*var(--u))] max-lg:text-[length:calc(40*var(--u))] leading-[1.2] font-normal whitespace-nowrap max-lg:whitespace-normal"
              style={{ textBox: 'trim-both cap alphabetic' } as React.CSSProperties}
            >
              {t('titulo')}
            </h1>
          </Revelar>
        </div>
        <Revelar atraso={200} className="w-full">
          <div className="relative h-[calc(600*var(--u))] max-lg:h-[calc(320*var(--u))] w-full rounded-[calc(4*var(--u))] overflow-hidden">
            <Image src="/basilica/capa.jpg" alt={t('capaAlt')} fill priority sizes="1376px" className="object-cover object-bottom" />
          </div>
        </Revelar>
      </div>
    </section>
  )
}
