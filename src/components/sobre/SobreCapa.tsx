import Image from 'next/image'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'

/**
 * Sobre nós, abertura — design novo (Figma, nó 170:3118), desktop 1440.
 *
 * Label e título (80px, caixa trimada às maiúsculas) a 120 do topo da secção,
 * e a fotografia de 1376×600, sem deformar (cobre a caixa e corta por cima e por baixo). A secção termina na própria
 * fotografia: o respiro seguinte vem do topo da secção que lhe segue.
 */
export default function SobreCapa() {
  const t = useTranslations('sobre')

  return (
    <section
      data-barra="var(--bege-claro-2)"
      className="w-full px-[calc(32*var(--u))] pt-[calc(120*var(--u))] bg-[var(--bege-claro-2)] text-[var(--azul-escuro)]"
    >
      <div className="flex flex-col gap-[calc(64*var(--u))] w-full">
        <div className="flex flex-col gap-[calc(24*var(--u))] w-full">
          <Revelar><p className="text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))]">{t('label')}</p></Revelar>
          <Revelar atraso={100}>
            <h1
              className="font-display text-[length:calc(80*var(--u))] leading-none font-normal w-[calc(678*var(--u))]"
              style={{ textBox: 'trim-both cap alphabetic' } as React.CSSProperties}
            >
              {t.rich('titulo', { br: () => <br /> })}
            </h1>
          </Revelar>
        </div>
        <Revelar atraso={200} className="w-full">
          <div className="relative h-[calc(600*var(--u))] w-full rounded-[calc(4*var(--u))] overflow-hidden">
            <Image src="/sobre/capa.jpg" alt={t('capaAlt')} fill priority sizes="1376px" className="object-cover object-[50%_65%]" />
          </div>
        </Revelar>
      </div>
    </section>
  )
}
