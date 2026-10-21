import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'
import { u } from '@/lib/escala'

const TRIM = { textBox: 'trim-both cap alphabetic' } as React.CSSProperties

/**
 * Celebrações, Agenda Paroquial — design novo (Figma, nó 148:850), desktop 1440, 692 de altura.
 *
 * Fundo bege claro 2, 180 de respiro. À esquerda (562) o label, o título de
 * 64px e o texto; à direita (678) três linhas separadas por réguas (título de
 * 32px e a hora ou o dia) e o link "Conhecer as devoções".
 *
 * O dia e a hora do Terço lêem-se de `celebracoes`; as horas das Primeiras
 * Sextas e Sábados são as do desenho (20H00), que não batem com o programa das
 * Primeiras Sextas (adoração às 18H00, Missa às 19H00): a confirmar.
 */
export default function CelebracoesAgenda() {
  const t = useTranslations('celebrar')
  const c = useTranslations('celebracoes')
  const horaTerco = c('tercoQuando').split(' · ')[1] ?? ''

  const linhas = [
    { titulo: t('agSextas'), valor: t('agSextasHora') },
    { titulo: t('agTerco'), valor: `${t('tercoDia')} às ${horaTerco}` },
    { titulo: t('agSabados'), valor: t('agSabadosHora') },
  ]

  return (
    <section
      id="agenda"
      data-barra="var(--bege-claro-2)"
      className="flex w-full items-start justify-between px-[calc(32*var(--u))] py-[calc(180*var(--u))] bg-[var(--bege-claro-2)] text-[var(--azul-escuro)]"
    >
      <div className="flex w-[calc(562*var(--u))] flex-col gap-[calc(48*var(--u))]">
        <div className="flex w-full flex-col gap-[calc(24*var(--u))]">
          <Revelar><p className="text-[length:max(11px,calc(12*var(--u)))] leading-[1.4]">{t('agLabel')}</p></Revelar>
          <Revelar atraso={100}>
            <h2 className="font-display text-[length:calc(64*var(--u))] leading-[calc(96*var(--u))] tracking-[calc(0.96*var(--u))] font-normal" style={TRIM}>{t('agTitulo')}</h2>
          </Revelar>
        </div>
        <Revelar atraso={200}>
          <p className="w-[calc(445*var(--u))] text-[length:calc(16*var(--u))] leading-[1.5]">{t('agTexto')}</p>
        </Revelar>
      </div>

      <Revelar atraso={150}>
        <div className="flex w-[calc(678*var(--u))] flex-col gap-[calc(40*var(--u))]">
          <div className="flex w-full flex-col gap-[calc(32*var(--u))]">
            {linhas.map((l) => (
              <div key={l.titulo} className="flex w-full flex-col gap-[calc(32*var(--u))]">
                <div aria-hidden="true" className="h-px w-full border-t border-solid border-[var(--azul-escuro)] opacity-25" />
                <div className="flex w-full items-center justify-between">
                  <h3 className="font-display text-[length:calc(32*var(--u))] leading-[1.2] tracking-[calc(0.96*var(--u))] font-normal whitespace-nowrap" style={TRIM}>{l.titulo}</h3>
                  <p className="text-[length:calc(16*var(--u))] leading-[1.5] whitespace-nowrap">{l.valor}</p>
                </div>
              </div>
            ))}
            <div aria-hidden="true" className="h-px w-full border-t border-solid border-[var(--azul-escuro)] opacity-25" />
          </div>

          <Link href="/celebracoes#sextas" className="group/cta self-start flex items-center gap-[calc(12*var(--u))] text-[length:calc(16*var(--u))] leading-[1.5] whitespace-nowrap">
            {t('agCta')}
            <span className="relative block h-[calc(7*var(--u))] w-[calc(13*var(--u))] overflow-visible">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/home/seta-conhecer.svg" alt="" width={13} height={7} className="block transition-transform duration-[400ms] ease-[var(--ease-out)] group-hover/cta:translate-x-[calc(4*var(--u))]" style={{ width: u(13), height: u(7) }} />
            </span>
          </Link>
        </div>
      </Revelar>
    </section>
  )
}
