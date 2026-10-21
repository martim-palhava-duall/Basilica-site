import Image from 'next/image'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'

/**
 * Basílica e Convento, abertura — design novo (Figma, nó 111:1102), desktop 1440.
 *
 * Label e título (80px, numa linha, caixa trimada às maiúsculas) a 80 do
 * topo, e a fotografia da fachada, 1376×600, enquadrada pelo topo. Termina na
 * própria fotografia, como a abertura do Sobre nós.
 */
export default function BasilicaCapa() {
  const t = useTranslations('basilica')

  return (
    <section
      data-barra="var(--bege-claro-2)"
      className="w-full px-[calc(32*var(--u))] pt-[calc(80*var(--u))] bg-[var(--bege-claro-2)] text-[var(--azul-escuro)]"
    >
      <div className="flex flex-col gap-[calc(64*var(--u))] w-full">
        <div className="flex flex-col gap-[calc(24*var(--u))] w-full">
          <Revelar><p className="text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))]">{t('label')}</p></Revelar>
          <Revelar atraso={100}>
            <h1
              className="font-display text-[length:calc(80*var(--u))] leading-[1.2] font-normal whitespace-nowrap"
              style={{ textBox: 'trim-both cap alphabetic' } as React.CSSProperties}
            >
              {t('titulo')}
            </h1>
          </Revelar>
        </div>
        <Revelar atraso={200} className="w-full">
          <div className="relative h-[calc(600*var(--u))] w-full rounded-[calc(4*var(--u))] overflow-hidden">
            <Image src="/home/somos-fachada.jpg" alt={t('capaAlt')} fill priority sizes="1376px" className="object-cover object-top" />
          </div>
        </Revelar>
      </div>
    </section>
  )
}
