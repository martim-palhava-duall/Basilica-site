import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'
import Seta from '@/components/home/Seta'
import { BILHETEIRA, externo } from '@/lib/links'

/**
 * Celebrações, Intenções de Missa — design novo (Figma, nó 148:825), desktop 1440, 561 de altura.
 *
 * Faixa vermelha: fotografia de 710×561 à esquerda e, à direita (678, centrado
 * na vertical), o label, o título de 80px, dois textos curtos lado a lado, a
 * linha com as horas de atendimento e o botão "Planear visita".
 *
 * O pedido faz-se no cartório, por isso as horas lêem-se de `horarios`
 * (cartório). O desenho repete aqui as horas da adoração (11H00 às 12H00 · 18H00
 * às 19H00), que parecem texto de teste: a fonte única manda.
 */
export default function CelebracoesIntencoes() {
  const t = useTranslations('celebrar')
  const h = useTranslations('horarios')

  return (
    <section
      id="intencoes"
      data-barra="var(--vermelho)"
      data-barra-tom="escuro"
      className="flex h-[calc(561*var(--u))] max-lg:h-auto max-lg:flex-col max-lg:items-stretch max-lg:gap-[calc(40*var(--u))] w-full items-center gap-[calc(20*var(--u))] max-lg:pb-[calc(72*var(--u))] bg-[var(--vermelho)] text-[var(--bege-claro-2)]"
    >
      <div className="relative h-[calc(561*var(--u))] w-[calc(710*var(--u))] max-lg:h-[calc(320*var(--u))] max-lg:w-full shrink-0">
        <Image src="/celebracoes/adoracao.jpg" alt={t('intAlt')} fill sizes="710px" className="object-cover" />
      </div>

      <div className="flex w-[calc(678*var(--u))] max-lg:w-full flex-col gap-[calc(80*var(--u))] max-lg:gap-[calc(32*var(--u))] px-[calc(32*var(--u))] max-lg:px-[calc(20*var(--u))]">
        <div className="flex w-[calc(614*var(--u))] max-lg:w-full flex-col gap-[calc(40*var(--u))] max-lg:gap-[calc(28*var(--u))]">
          <div className="flex w-full flex-col gap-[calc(12*var(--u))]">
            <Revelar><p className="text-[length:var(--t-etiqueta)] leading-[1.4]">{t('intLabel')}</p></Revelar>
            <Revelar atraso={100}>
              <h2
                className="font-display text-[length:calc(80*var(--u))] max-lg:text-[length:calc(44*var(--u))] leading-none tracking-[calc(0.96*var(--u))] max-lg:tracking-normal font-normal"
                style={{ textBox: 'trim-both cap alphabetic' } as React.CSSProperties}
              >
                {t('intTitulo')}
              </h2>
            </Revelar>
          </div>
          <Revelar atraso={200}>
            <div className="flex w-full items-start max-lg:flex-col max-lg:gap-[calc(12*var(--u))] text-[length:var(--t-etiqueta)] max-lg:text-[length:var(--t-pequeno)] leading-[1.4] max-lg:leading-[1.5]">
              <p className="w-[calc(320*var(--u))] max-lg:w-full shrink-0">{t('intTexto1')}</p>
              <p className="w-[calc(294*var(--u))] max-lg:w-full shrink-0">{t('intTexto2')}</p>
            </div>
          </Revelar>
        </div>

        <Revelar atraso={200}>
          <div className="flex w-full flex-col gap-[calc(24*var(--u))]">
            <div className="flex w-full items-start gap-[calc(40*var(--u))] max-lg:gap-[calc(20*var(--u))] border-y border-solid border-[rgba(249,246,243,0.2)] py-[calc(20*var(--u))]">
              <p className="w-[calc(224*var(--u))] max-lg:w-[calc(130*var(--u))] shrink-0 self-center text-[length:var(--t-etiqueta)] leading-[1.17] font-bold whitespace-nowrap">{h('cartorioDias')}</p>
              <p className="w-[calc(350*var(--u))] max-lg:w-auto max-lg:min-w-px max-lg:flex-1 text-right text-[length:var(--t-corpo)] leading-[1.19] font-bold">{h('cartorioHoras').replace(/ ÀS /g, ' às ')}</p>
            </div>
            <Link
              href={BILHETEIRA}
              {...externo(BILHETEIRA)}
              className="group/btn flex h-[calc(46.8*var(--u))] items-center gap-[calc(11.91*var(--u))] self-start px-[calc(29.6*var(--u))] rounded-[calc(4*var(--u))] border border-solid border-[var(--bege-claro-2)] text-[length:var(--t-etiqueta)] leading-[1.4] whitespace-nowrap transition-[background-color,color] duration-[400ms] ease-[var(--ease-out)]"
            >
              {t('intCta')}
              <Seta className="group-hover/btn:translate-x-[calc(4*var(--u))]" />
            </Link>
          </div>
        </Revelar>
      </div>
    </section>
  )
}
