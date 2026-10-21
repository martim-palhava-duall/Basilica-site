import Image from 'next/image'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'

/**
 * Vida da Paróquia, CTI Juvenil — design novo (Figma, nó 111:2138), desktop 1440, 1235 de altura.
 *
 * Label e frase grande (64px, 1027 de largura) a 180 do topo; em baixo, a
 * 180 do fim e alinhadas pela base, duas fotografias (329×394 e 445×519, 20
 * entre elas) que terminam na margem direita.
 */
export default function VidaCti() {
  const t = useTranslations('vida')

  return (
    <section
      id="cti"
      data-barra="var(--bege-claro-2)"
      className="relative h-[calc(1235*var(--u))] w-full bg-[var(--bege-claro-2)] text-[var(--azul-escuro)]"
    >
      <div className="absolute left-[calc(32*var(--u))] top-[calc(180*var(--u))] flex w-[calc(1027*var(--u))] flex-col gap-[calc(12*var(--u))]">
        <Revelar><p className="text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] tracking-[calc(-0.064*var(--u))]">{t('ctiLabel')}</p></Revelar>
        <Revelar atraso={100}>
          <p
            className="font-display text-[length:calc(64*var(--u))] leading-[1.2] font-normal"
            style={{ textBox: 'trim-both cap alphabetic' } as React.CSSProperties}
          >
            {t('ctiFrase')}
          </p>
        </Revelar>
      </div>

      <div className="absolute bottom-[calc(180*var(--u))] left-[calc(614*var(--u))] flex items-end gap-[calc(20*var(--u))]">
        <Revelar atraso={150}>
          <div className="relative h-[calc(394*var(--u))] w-[calc(329*var(--u))] overflow-hidden rounded-[calc(4*var(--u))]">
            <Image src="/vida/cti-1.jpg" alt={t('ctiAlt1')} fill sizes="329px" className="object-cover" />
          </div>
        </Revelar>
        <Revelar atraso={270}>
          <div className="relative h-[calc(519*var(--u))] w-[calc(445*var(--u))] overflow-hidden rounded-[calc(4*var(--u))]">
            <Image src="/vida/cti-2.jpg" alt={t('ctiAlt2')} fill sizes="445px" className="object-cover" />
          </div>
        </Revelar>
      </div>
    </section>
  )
}
