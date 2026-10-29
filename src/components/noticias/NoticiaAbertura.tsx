import Image from 'next/image'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'

/**
 * Detalhe de Notícia, abertura — design novo (Figma, nó 111:2964), desktop 1440.
 *
 * Tipo, título (80px) e resumo (20px leve, 676 de largura) centrados, a 120 do
 * topo do desenho; por baixo, a fotografia de capa (1376×600, cantos de 4px).
 * A etiqueta, o título e a fotografia são os da notícia (os mesmos do cartão em
 * que se clicou); o resumo é texto de teste.
 */
export default function NoticiaAbertura({ etiqueta, titulo, foto, fotoPosicao }: { etiqueta: string; titulo: string; foto: string; fotoPosicao?: string }) {
  const t = useTranslations('noticia')

  return (
    <section data-barra="var(--bege-claro-2)" className="w-full px-[calc(32*var(--u))] pt-[calc(120*var(--u))] max-lg:px-[calc(20*var(--u))] max-lg:pt-[calc(48*var(--u))] bg-[var(--bege-claro-2)] text-[var(--azul-escuro)]">
      <div className="flex w-full flex-col items-center gap-[calc(64*var(--u))] max-lg:gap-[calc(32*var(--u))]">
        <div className="flex w-full flex-col items-center gap-[calc(24*var(--u))] text-center">
          <div className="flex w-full flex-col items-center gap-[calc(4*var(--u))]">
            <Revelar><p className="text-[length:var(--t-etiqueta)] leading-[1.17]">{etiqueta}</p></Revelar>
            <Revelar atraso={100}>
              <h1 className="w-full font-display text-[length:calc(80*var(--u))] max-lg:text-[length:calc(36*var(--u))] leading-[1.2] max-lg:leading-[1.1] font-normal">{titulo}</h1>
            </Revelar>
          </div>
          <Revelar atraso={200}>
            <p className="w-[calc(676*var(--u))] max-lg:w-full text-[length:var(--t-lead)] max-lg:text-[length:var(--t-corpo)] leading-[1.4] max-lg:leading-[1.5]" style={{ fontFamily: 'var(--font-body-light)' }}>{t('resumo')}</p>
          </Revelar>
        </div>
        <Revelar atraso={250} className="w-full">
          <div className="relative h-[calc(600*var(--u))] max-lg:h-[calc(280*var(--u))] w-full overflow-hidden rounded-[calc(4*var(--u))]">
            <Image src={foto} alt="" fill priority sizes="1376px" className="object-cover" style={fotoPosicao ? { objectPosition: fotoPosicao } : undefined} />
          </div>
        </Revelar>
      </div>
    </section>
  )
}
