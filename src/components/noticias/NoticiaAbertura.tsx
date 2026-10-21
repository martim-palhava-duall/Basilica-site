import Image from 'next/image'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'

/**
 * Detalhe de Notícia, abertura — design novo (Figma, nó 111:2964), desktop 1440.
 *
 * Tipo, título (80px) e resumo (20px leve, 676 de largura) centrados, a 120 do
 * topo do desenho; por baixo, a fotografia de capa (1376×600, cantos de 4px).
 */
export default function NoticiaAbertura() {
  const t = useTranslations('noticia')

  return (
    <section data-barra="var(--bege-claro-2)" className="w-full px-[calc(32*var(--u))] pt-[calc(120*var(--u))] bg-[var(--bege-claro-2)] text-[var(--azul-escuro)]">
      <div className="flex w-full flex-col items-center gap-[calc(64*var(--u))]">
        <div className="flex w-full flex-col items-center gap-[calc(24*var(--u))] text-center">
          <div className="flex w-full flex-col items-center gap-[calc(4*var(--u))]">
            <Revelar><p className="text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))]">{t('label')}</p></Revelar>
            <Revelar atraso={100}>
              <h1 className="w-full font-display text-[length:calc(80*var(--u))] leading-[1.2] font-normal">{t('titulo')}</h1>
            </Revelar>
          </div>
          <Revelar atraso={200}>
            <p className="w-[calc(676*var(--u))] text-[length:calc(20*var(--u))] leading-[1.4]" style={{ fontFamily: 'var(--font-body-light)' }}>{t('resumo')}</p>
          </Revelar>
        </div>
        <Revelar atraso={250} className="w-full">
          <div className="relative h-[calc(600*var(--u))] w-full overflow-hidden rounded-[calc(4*var(--u))]">
            <Image src="/noticias/capa.jpg" alt={t('capaAlt')} fill priority sizes="1376px" className="object-cover" />
          </div>
        </Revelar>
      </div>
    </section>
  )
}
