import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'
import Seta from '@/components/home/Seta'

const TRIM = { textBox: 'trim-both cap alphabetic' } as React.CSSProperties
const LEVE = { fontFamily: 'var(--font-body-light)' }

/**
 * Contactos, Acompanhamento espiritual — design novo (Figma, nó 111:3611),
 * desktop 1440, bege claro com 180 de respiro.
 *
 * Label, título de 80px com o botão "Ver todos os horários" à direita, texto
 * leve de 560; por baixo, uma régua e três colunas: confissões, adoração
 * eucarística e situações urgentes. As horas lêem-se de `horarios` (fonte
 * única): confissões de domingos e feriados e adoração de segunda a sábado,
 * como no desenho. A linha das colunas tem 196,57 de altura mínima (as colunas
 * do Figma têm descrições de altura fixa).
 */
export default function ContactosFe() {
  const t = useTranslations('contactar')
  const h = useTranslations('horarios')
  const hora = (k: string) => h(k).replace(/ ÀS /g, ' às ').split(' · ')

  const colunas = [
    { chave: 'confissoes', titulo: t('feConfissoes'), horas: hora('confissoesDomHoras'), dias: h('confissoesDomDias') },
    { chave: 'adoracao', titulo: t('feAdoracao'), horas: hora('adoracaoSemHoras'), dias: h('adoracaoSemDias') },
  ]

  return (
    <section
      id="fe"
      data-barra="var(--bege-claro)"
      className="flex w-full flex-col gap-[calc(80*var(--u))] px-[calc(32*var(--u))] py-[calc(180*var(--u))] bg-[var(--bege-claro)] text-[var(--azul-escuro)]"
    >
      <div className="flex w-full flex-col gap-[calc(24*var(--u))]">
        <div className="flex w-full flex-col gap-[calc(12*var(--u))]">
          <Revelar><p className="text-[length:max(11px,calc(12*var(--u)))] leading-[1.4]">{t('feLabel')}</p></Revelar>
          <div className="flex w-full items-center justify-between">
            <Revelar atraso={100}>
              <h2 className="font-display text-[length:calc(80*var(--u))] leading-[calc(96*var(--u))] tracking-[calc(0.96*var(--u))] font-normal whitespace-nowrap">{t('feTitulo')}</h2>
            </Revelar>
            <Revelar atraso={200}>
              <Link
                href="/celebracoes"
                className="group/btn flex h-[calc(46.8*var(--u))] items-center gap-[calc(11.91*var(--u))] rounded-[calc(4*var(--u))] bg-[var(--azul-escuro)] px-[calc(29.6*var(--u))] text-[length:max(11px,calc(12*var(--u)))] leading-[1.4] whitespace-nowrap text-[var(--bege-claro-2)] transition-colors duration-[400ms] ease-[var(--ease-out)]"
              >
                {t('feCta')}
                <Seta className="group-hover/btn:translate-x-[calc(4*var(--u))]" />
              </Link>
            </Revelar>
          </div>
        </div>
        <Revelar atraso={200}>
          <p className="w-[calc(560*var(--u))] text-[length:calc(20*var(--u))] leading-[1.4]" style={{ ...TRIM, ...LEVE }}>{t('feTexto')}</p>
        </Revelar>
      </div>

      <div className="flex w-full flex-col gap-[calc(42*var(--u))]">
        <div aria-hidden="true" className="h-px w-full bg-[rgba(28,43,57,0.25)]" />
        <Revelar>
          <div className="flex min-h-[calc(196.57*var(--u))] w-full items-start justify-between">
            <div className="flex items-start gap-[calc(40*var(--u))]">
              {colunas.map((c) => (
                <div key={c.chave} className="flex w-[calc(213*var(--u))] flex-col gap-[calc(32*var(--u))]">
                  <p className="text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] font-bold">{c.titulo}</p>
                  <div className="flex flex-col gap-[calc(3.19*var(--u))]">
                    <p className="text-[length:calc(16*var(--u))] leading-[1.4] font-bold whitespace-nowrap">
                      {c.horas.map((l) => (
                        <span key={l} className="block">{l}</span>
                      ))}
                    </p>
                    <p className="text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] whitespace-nowrap">{c.dias}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex w-[calc(445*var(--u))] flex-col gap-[calc(32*var(--u))]">
              <p className="text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] font-bold">{t('feUrgentes')}</p>
              <p className="text-[length:calc(20*var(--u))] leading-[1.4]" style={{ ...TRIM, ...LEVE }}>{t('feUrgenciaTexto')}</p>
            </div>
          </div>
        </Revelar>
      </div>
    </section>
  )
}
