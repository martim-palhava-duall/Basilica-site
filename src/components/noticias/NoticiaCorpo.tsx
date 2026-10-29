import Image from 'next/image'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'

/**
 * Detalhe de Notícia, corpo — design novo (Figma, nó 111:2972), desktop 1440.
 *
 * Coluna de leitura de 678 centrada (381 de cada lado), 120 de respiro em cima
 * e em baixo e 59 entre blocos: subtítulo (64px) e texto, citação em itálico
 * leve (40px), texto, fotografia (500 de altura), texto com lista, outra
 * fotografia e o texto final. Texto de teste do Figma até haver notícias reais.
 */
export default function NoticiaCorpo() {
  const t = useTranslations('noticia')
  const corpo = 'text-[length:var(--t-corpo)] leading-[1.5]'

  return (
    <section data-barra="var(--bege-claro-2)" className="w-full px-[calc(381*var(--u))] py-[calc(120*var(--u))] max-lg:px-[calc(20*var(--u))] max-lg:py-[calc(56*var(--u))] bg-[var(--bege-claro-2)] text-[var(--azul-escuro)]">
      <article className="flex w-full flex-col gap-[calc(59*var(--u))] max-lg:gap-[calc(32*var(--u))]">
        <Revelar>
          <div className="flex w-full flex-col gap-[calc(32*var(--u))] max-lg:gap-[calc(20*var(--u))]">
            <h2 className="font-display text-[length:calc(64*var(--u))] max-lg:text-[length:calc(32*var(--u))] leading-[1.2] font-normal">{t('h2')}</h2>
            <p className={corpo}>{t('p1')}</p>
          </div>
        </Revelar>

        <Revelar>
          <blockquote
            className="text-[length:calc(40*var(--u))] max-lg:text-[length:calc(26*var(--u))] leading-[1.2] italic font-light"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t('citacao')}
          </blockquote>
        </Revelar>

        <Revelar><p className={corpo}>{t('p2')}</p></Revelar>

        <Revelar>
          <div className="relative h-[calc(500*var(--u))] max-lg:h-[calc(260*var(--u))] w-full overflow-hidden rounded-[calc(4*var(--u))]">
            <Image src="/noticias/corpo-1.jpg" alt={t('foto1Alt')} fill sizes="678px" className="object-cover" />
          </div>
        </Revelar>

        <Revelar>
          <div className={`flex w-full flex-col gap-[calc(24*var(--u))] ${corpo}`}>
            <p>{t('p3')}</p>
            <ul className="flex flex-col gap-[calc(24*var(--u))] ps-[calc(24*var(--u))] list-disc">
              <li>{t('li1')}</li>
              <li>{t('li2')}</li>
              <li>{t('li3')}</li>
            </ul>
          </div>
        </Revelar>

        <Revelar>
          <div className="relative h-[calc(500*var(--u))] max-lg:h-[calc(260*var(--u))] w-full overflow-hidden rounded-[calc(4*var(--u))]">
            <Image src="/noticias/corpo-2.jpg" alt={t('foto2Alt')} fill sizes="678px" className="object-cover" />
          </div>
        </Revelar>

        <Revelar><p className={corpo}>{t('p4')}</p></Revelar>
      </article>
    </section>
  )
}
