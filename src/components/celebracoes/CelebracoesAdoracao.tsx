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
      className="flex h-[calc(900*var(--u))] w-full items-center gap-[calc(22*var(--u))] bg-[var(--azul-escuro)] text-[var(--bege-claro-2)]"
    >
      <div className="relative h-[calc(900*var(--u))] w-[calc(710*var(--u))] shrink-0">
        <Image src="/celebracoes/adoracao.jpg" alt={t('adorAlt')} fill sizes="710px" className="object-cover" />
      </div>

      <div className="flex w-[calc(678*var(--u))] flex-col gap-[calc(90*var(--u))] px-[calc(32*var(--u))]">
        <div className="flex w-[calc(614*var(--u))] flex-col gap-[calc(48*var(--u))]">
          <div className="flex w-full flex-col gap-[calc(12*var(--u))]">
            <Revelar><p className="text-[length:max(11px,calc(12*var(--u)))] leading-[1.4]">{t('adorLabel')}</p></Revelar>
            <Revelar atraso={100}>
              <h2
                className="font-display text-[length:calc(80*var(--u))] leading-none font-normal"
                style={{ textBox: 'trim-both cap alphabetic' } as React.CSSProperties}
              >
                {t('adorTitulo')}
              </h2>
            </Revelar>
          </div>

          <Revelar atraso={200}>
            <div className="flex w-full flex-col gap-[calc(12*var(--u))]">
              <p
                className="w-[calc(451*var(--u))] font-display text-[length:calc(24*var(--u))] leading-[1.2] tracking-[calc(0.96*var(--u))]"
                style={{ textBox: 'trim-both cap alphabetic' } as React.CSSProperties}
              >
                {t('adorCitacao')}
              </p>
              <p className="w-[calc(451*var(--u))] text-[length:max(11px,calc(12*var(--u)))] leading-[1.4] text-[var(--azul-claro)]">{t('adorRef')}</p>
            </div>
          </Revelar>

          <Revelar atraso={300}>
            <p className="w-[calc(451*var(--u))] text-[length:calc(16*var(--u))] leading-[1.4]">{t('adorTexto')}</p>
          </Revelar>
        </div>

        <Revelar atraso={200}>
          <div className="flex w-full items-start gap-[calc(40*var(--u))] border-y border-solid border-[rgba(249,246,243,0.2)] py-[calc(20*var(--u))]">
            <p className="w-[calc(224*var(--u))] shrink-0 text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] font-bold self-center">{t('adorQuando')}</p>
            <div className="flex w-[calc(350*var(--u))] flex-col items-end gap-[calc(4*var(--u))]">
              <p className="w-full text-right text-[length:calc(16*var(--u))] leading-[calc(19*var(--u))] font-bold">{horas}</p>
              <p className="text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] font-bold opacity-60">{h('adoracaoSemDias')}</p>
            </div>
          </div>
        </Revelar>
      </div>
    </section>
  )
}
