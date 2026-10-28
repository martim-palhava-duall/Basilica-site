import Image from 'next/image'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'

/**
 * Vida da Paróquia, abertura — design novo (Figma, nó 111:1980), desktop 1440, 877 de altura.
 *
 * Label e título (80px, 678 de largura) a 120 do topo do desenho e a
 * fotografia de 1376×600 (a procissão de entrada, 2048×1365, centrada como no
 * Figma).
 */
export default function VidaCapa() {
  const t = useTranslations('vida')

  return (
    <section data-barra="var(--bege-claro-2)" className="w-full px-[calc(32*var(--u))] pt-[calc(120*var(--u))] max-lg:px-[calc(20*var(--u))] max-lg:pt-[calc(40*var(--u))] bg-[var(--bege-claro-2)] text-[var(--azul-escuro)]">
      <div className="flex w-full flex-col gap-[calc(64*var(--u))] max-lg:gap-[calc(32*var(--u))]">
        <div className="flex w-full flex-col gap-[calc(24*var(--u))]">
          <Revelar><p className="text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))]">{t('label')}</p></Revelar>
          <Revelar atraso={100}>
            <h1
              className="w-[calc(678*var(--u))] max-lg:w-full font-display text-[length:calc(80*var(--u))] max-lg:text-[length:calc(40*var(--u))] leading-[1.2] font-normal"
              style={{ textBox: 'trim-both cap alphabetic' } as React.CSSProperties}
            >
              {t('titulo')}
            </h1>
          </Revelar>
        </div>
        <Revelar atraso={200} className="w-full">
          <div className="relative h-[calc(600*var(--u))] max-lg:h-[calc(320*var(--u))] w-full overflow-hidden rounded-[calc(4*var(--u))]">
            <Image src="/vida/capa.jpg" alt={t('capaAlt')} fill priority sizes="1376px" className="object-cover" />
          </div>
        </Revelar>
      </div>
    </section>
  )
}
