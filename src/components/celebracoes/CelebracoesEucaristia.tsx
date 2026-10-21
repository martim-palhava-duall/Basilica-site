import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'
import Seta from '@/components/home/Seta'
import { u } from '@/lib/escala'

const TRIM = { textBox: 'trim-both cap alphabetic' } as React.CSSProperties
const LEVE = 'font-[family-name:var(--font-body-light)]'

type Entrada = { horas: string; dias: string }

/**
 * Horas de uma entrada. Intervalos ("11H00 ÀS 12H00 · 18H00 ÀS 19H00") ficam um
 * por linha, com o "às" em minúsculas como no desenho; listas simples de horas
 * ("12H00 · 19H00") ficam numa linha, em maiúsculas.
 */
function Horas({ horas }: { horas: string }) {
  if (horas.includes('ÀS') && horas.includes(' · ')) {
    return (
      <div className="text-[length:calc(16*var(--u))] leading-[1.4] font-bold whitespace-nowrap">
        {horas.split(' · ').map((l) => (
          <p key={l}>{l.replace(' ÀS ', ' às ')}</p>
        ))}
      </div>
    )
  }
  return (
    <p className={`text-[length:calc(16*var(--u))] leading-[calc(19*var(--u))] font-bold whitespace-nowrap ${horas.includes('ÀS') ? '' : 'uppercase'}`}>
      {horas.replace(' ÀS ', ' às ')}
    </p>
  )
}

/**
 * Celebrações, Eucaristia todos os dias — design novo (Figma, nó 111:1598), desktop 1440.
 *
 * Fundo bege claro 2, 180 de respiro. Cabeçalho (label, título de 80px, texto e
 * botão "Ver todos os horários"), régua e, por baixo, duas colunas de horários
 * (Missas e Adoração Eucarística) à esquerda e as intenções de Missa à direita.
 * As horas lêem-se do namespace `horarios` (fonte única).
 */
export default function CelebracoesEucaristia() {
  const t = useTranslations('celebrar')
  const h = useTranslations('horarios')

  const colunas: { titulo: string; entradas: Entrada[] }[] = [
    {
      titulo: h('missasHead'),
      entradas: [
        { horas: h('missasSemHoras'), dias: h('missasSemDias') },
        { horas: h('missasDomHoras'), dias: h('missasDomDias') },
      ],
    },
    {
      titulo: h('adoracaoHead'),
      entradas: [{ horas: h('adoracaoSemHoras'), dias: h('adoracaoSemDias') }],
    },
  ]

  return (
    <section
      id="eucaristia"
      data-barra="var(--bege-claro-2)"
      className="flex flex-col gap-[calc(80*var(--u))] w-full px-[calc(32*var(--u))] py-[calc(180*var(--u))] bg-[var(--bege-claro-2)] text-[var(--azul-escuro)]"
    >
      {/* ── Cabeçalho ── */}
      <div className="flex flex-col gap-[calc(24*var(--u))] w-full">
        <div className="flex flex-col gap-[calc(12*var(--u))] w-full">
          <Revelar><p className="text-[length:max(11px,calc(12*var(--u)))] leading-[1.4]">{t('eucLabel')}</p></Revelar>
          <div className="flex items-center justify-between w-full">
            <Revelar atraso={100}>
              <h2 className="font-display text-[length:calc(80*var(--u))] leading-[calc(96*var(--u))] tracking-[calc(0.96*var(--u))] font-normal whitespace-nowrap">{t('eucTitulo')}</h2>
            </Revelar>
            <Link
              href="/horarios"
              className="group/btn flex items-center gap-[calc(11.91*var(--u))] h-[calc(46.8*var(--u))] px-[calc(29.6*var(--u))] rounded-[calc(4*var(--u))] bg-[var(--azul-escuro)] text-[length:max(11px,calc(12*var(--u)))] leading-[1.4] whitespace-nowrap text-[var(--bege-claro-2)] transition-[background-color] duration-[400ms] ease-[var(--ease-out)]"
            >
              {t('eucCta')}
              <Seta className="group-hover/btn:translate-x-[calc(4*var(--u))]" />
            </Link>
          </div>
        </div>
        <Revelar atraso={200}>
          <p className={`${LEVE} w-[calc(444*var(--u))] text-[length:calc(20*var(--u))] leading-[calc(32*var(--u))]`} style={TRIM}>{t('eucTexto')}</p>
        </Revelar>
      </div>

      {/* ── Horários e intenções ── */}
      <div className="flex flex-col gap-[calc(42*var(--u))] w-full">
        <div aria-hidden="true" className="h-px w-full border-t border-solid border-[var(--azul-escuro)] opacity-25" />
        <Revelar>
          <div className="flex items-start justify-between w-full">
            <div className="flex gap-[calc(40*var(--u))] items-start">
              {colunas.map((c) => (
                <div key={c.titulo} className="flex flex-col gap-[calc(32*var(--u))] w-[calc(213*var(--u))]">
                  <p className="text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] font-bold">{c.titulo}</p>
                  <div className="flex flex-col gap-[calc(24*var(--u))]">
                    {c.entradas.map((e) => (
                      <div key={e.horas} className="flex flex-col gap-[calc(3.19*var(--u))]">
                        <Horas horas={e.horas} />
                        <p className="text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] whitespace-nowrap">{e.dias}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-[calc(40*var(--u))] w-[calc(445*var(--u))]">
              <div className="flex flex-col gap-[calc(32*var(--u))] w-full">
                <p className="text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] font-bold">{t('eucIntencoesLabel')}</p>
                <div className="flex flex-col gap-[calc(24*var(--u))] w-full">
                  <p className="font-display text-[length:calc(40*var(--u))] leading-[calc(35.2*var(--u))] tracking-[calc(-0.192*var(--u))]">{t('eucIntencoesTitulo')}</p>
                  <p className={`${LEVE} text-[length:calc(20*var(--u))] leading-[1.4]`} style={TRIM}>{t('eucIntencoesTexto')}</p>
                </div>
              </div>
              <Link href="/horarios" className="group/cta self-start flex items-center gap-[calc(12*var(--u))] text-[length:calc(16*var(--u))] leading-[1.5] whitespace-nowrap">
                {t('eucIntencoesCta')}
                <span className="relative block w-[calc(13*var(--u))] h-[calc(7*var(--u))] overflow-visible">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/home/seta-conhecer.svg" alt="" width={13} height={7} className="block transition-transform duration-[400ms] ease-[var(--ease-out)] group-hover/cta:translate-x-[calc(4*var(--u))]" style={{ width: u(13), height: u(7) }} />
                </span>
              </Link>
            </div>
          </div>
        </Revelar>
      </div>
    </section>
  )
}
