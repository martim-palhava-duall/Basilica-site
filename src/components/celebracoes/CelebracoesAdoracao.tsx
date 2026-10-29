import Image from 'next/image'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'

/**
 * Celebrações, Adoração Eucarística — design novo (Figma, nó 111:1684), desktop 1440, 900 de altura.
 *
 * Fundo azul escuro: fotografia de 710 de largura a toda a altura, à esquerda,
 * e à direita (678, centrado na vertical) o label, o título de 80px, a
 * citação com a referência, o texto e uma linha com as horas ("Quando").
 * As horas lêem-se do namespace `horarios` (fonte única).
 */
export default function CelebracoesAdoracao() {
  const t = useTranslations('celebrar')
  const h = useTranslations('horarios')
  const horas = h('adoracaoSemHoras').replace(/ ÀS /g, ' às ')

  return (
    <section
      id="adoracao"
      data-barra="var(--azul-escuro)"
      data-barra-tom="escuro"
      className="flex h-[calc(900*var(--u))] max-lg:h-auto max-lg:flex-col max-lg:items-stretch max-lg:gap-[calc(40*var(--u))] w-full items-center gap-[calc(22*var(--u))] max-lg:pb-[calc(72*var(--u))] bg-[var(--azul-escuro)] text-[var(--bege-claro-2)]"
    >
      <div className="relative h-[calc(900*var(--u))] w-[calc(710*var(--u))] max-lg:h-[calc(320*var(--u))] max-lg:w-full shrink-0">
        <Image src="/celebracoes/adoracao.jpg" alt={t('adorAlt')} fill sizes="710px" className="object-cover" />
      </div>

      <div className="flex w-[calc(678*var(--u))] max-lg:w-full flex-col gap-[calc(90*var(--u))] max-lg:gap-[calc(40*var(--u))] px-[calc(32*var(--u))] max-lg:px-[calc(20*var(--u))]">
        <div className="flex w-[calc(614*var(--u))] max-lg:w-full flex-col gap-[calc(48*var(--u))] max-lg:gap-[calc(32*var(--u))]">
          <div className="flex w-full flex-col gap-[calc(12*var(--u))]">
            <Revelar><p className="text-[length:var(--t-etiqueta)] leading-[1.4]">{t('adorLabel')}</p></Revelar>
            <Revelar atraso={100}>
              <h2
                className="font-display text-[length:calc(80*var(--u))] max-lg:text-[length:calc(44*var(--u))] leading-none font-normal"
                style={{ textBox: 'trim-both cap alphabetic' } as React.CSSProperties}
              >
                {t('adorTitulo')}
              </h2>
            </Revelar>
          </div>

          <Revelar atraso={200}>
            <div className="flex w-full flex-col gap-[calc(12*var(--u))]">
              <p
                className="w-[calc(451*var(--u))] max-lg:w-full font-display text-[length:calc(24*var(--u))] max-lg:text-[length:calc(22*var(--u))] leading-[1.2] tracking-[calc(0.96*var(--u))] max-lg:tracking-normal"
                style={{ textBox: 'trim-both cap alphabetic' } as React.CSSProperties}
              >
                {t('adorCitacao')}
              </p>
              <p className="w-[calc(451*var(--u))] max-lg:w-full text-[length:var(--t-etiqueta)] leading-[1.4] text-[var(--azul-claro)]">{t('adorRef')}</p>
            </div>
          </Revelar>

          <Revelar atraso={300}>
            <p className="w-[calc(451*var(--u))] max-lg:w-full text-[length:var(--t-corpo)] leading-[1.4] max-lg:leading-[1.5]">{t('adorTexto')}</p>
          </Revelar>
        </div>

        <Revelar atraso={200}>
          <div className="flex w-full items-start gap-[calc(40*var(--u))] max-lg:gap-[calc(20*var(--u))] border-y border-solid border-[rgba(249,246,243,0.2)] py-[calc(20*var(--u))]">
            <p className="w-[calc(224*var(--u))] max-lg:w-[calc(100*var(--u))] shrink-0 text-[length:var(--t-etiqueta)] leading-[1.17] font-bold self-center">{t('adorQuando')}</p>
            <div className="flex w-[calc(350*var(--u))] max-lg:w-auto max-lg:min-w-px max-lg:flex-1 flex-col items-end gap-[calc(4*var(--u))]">
              <p className="w-full text-right text-[length:var(--t-corpo)] leading-[1.19] font-bold">{horas}</p>
              <p className="text-[length:var(--t-etiqueta)] leading-[1.17] font-bold opacity-60">{h('adoracaoSemDias')}</p>
            </div>
          </div>
        </Revelar>
      </div>
    </section>
  )
}
