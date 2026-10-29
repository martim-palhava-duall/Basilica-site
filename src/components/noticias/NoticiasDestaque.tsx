import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'
import Seta from '@/components/home/Seta'

/**
 * Notícias, Em destaque — design novo (Figma, nó 111:2683), desktop 1440.
 *
 * Cartão de 1376×437 em bege escuro 2 que escurece ao passar o rato (bege escuro), com cantos de 8px e 12 de margem
 * interior: a fotografia (847×413) à esquerda e, à direita (453), "Em destaque"
 * em cima e, em baixo, a meta, o título de 32px e o resumo. Texto de teste do
 * Figma até haver notícias reais. O cartão inteiro é uma ligação (provisória:
 * `/blog`); ao passar o rato aparece uma seta no canto de cima, a 32 da direita.
 */
export default function NoticiasDestaque() {
  const t = useTranslations('noticias')

  return (
    <section data-barra="var(--bege-claro-2)" className="w-full px-[calc(32*var(--u))] max-lg:px-[calc(20*var(--u))] bg-[var(--bege-claro-2)] text-[var(--azul-escuro)]">
      <Revelar>
        <Link
          href="/blog/ao-servico-de-quem-mais-precisa"
          className="group/dest relative flex w-full items-center gap-[calc(32*var(--u))] max-lg:flex-col max-lg:items-stretch max-lg:gap-[calc(20*var(--u))] overflow-hidden rounded-[calc(8*var(--u))] bg-[var(--bege-escuro-2)] p-[calc(12*var(--u))] transition-colors duration-[450ms] ease-[var(--ease-out)] hover:bg-[var(--bege-escuro)] focus-visible:bg-[var(--bege-escuro)]"
        >
          <div className="relative h-[calc(413*var(--u))] w-[calc(847*var(--u))] max-lg:h-[calc(240*var(--u))] max-lg:w-full shrink-0 overflow-hidden rounded-[calc(4*var(--u))]">
            <div className="absolute inset-0">
              <Image src="/home/dest-3.jpg" alt="" fill sizes="847px" className="object-cover" />
            </div>
          </div>
          <div className="flex w-[calc(453*var(--u))] max-lg:w-full max-lg:px-[calc(8*var(--u))] max-lg:pb-[calc(8*var(--u))] flex-col gap-[calc(178*var(--u))] max-lg:gap-[calc(24*var(--u))]">
            <p className="text-[length:var(--t-corpo)] leading-[1.5] text-black">{t('destaqueLabel')}</p>
            <div className="flex w-full flex-col gap-[calc(12*var(--u))]">
              <div className="flex w-full flex-col gap-[calc(4*var(--u))]">
                <p className="text-[length:var(--t-etiqueta)] leading-[1.4] text-[rgba(29,35,40,0.6)]">{t('destaqueMeta')}</p>
                <h2 className="font-display text-[length:calc(32*var(--u))] max-lg:text-[length:calc(26*var(--u))] leading-[calc(35.2*var(--u))] max-lg:leading-[calc(30*var(--u))] font-normal">{t('destaqueTitulo')}</h2>
              </div>
              <p className="text-[length:var(--t-corpo)] leading-[1.5] text-[rgba(29,35,40,0.6)]">{t('destaqueTexto')}</p>
            </div>
          </div>
          <Seta className="max-lg:hidden absolute right-[calc(32*var(--u))] top-[calc(55*var(--u))] opacity-0 -translate-x-[calc(8*var(--u))] !transition-[opacity,transform] group-hover/dest:opacity-100 group-hover/dest:translate-x-0 group-focus-visible/dest:opacity-100 group-focus-visible/dest:translate-x-0" />
        </Link>
      </Revelar>
    </section>
  )
}
