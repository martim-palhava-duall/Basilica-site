import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'
import Seta from '@/components/home/Seta'

const TRIM = { textBox: 'trim-both cap alphabetic' } as React.CSSProperties
const LEVE = 'font-[family-name:var(--font-body-light)]'

type Entrada = { horas: string; dias: string }

/**
 * Horas de uma entrada. Intervalos ("11H00 ÀS 12H00 · 18H00 ÀS 19H00") ficam um
 * por linha, com o "às" em minúsculas como no desenho; listas simples de horas
 * ("12H00 · 19H00") ficam numa linha, em maiúsculas.
 */
export function Horas({ horas }: { horas: string }) {
  if (horas.includes('ÀS') && horas.includes(' · ')) {
    return (
      <div className="text-[length:var(--t-corpo)] max-lg:text-[length:var(--t-pequeno)] leading-[1.4] font-bold whitespace-nowrap">
        {horas.split(' · ').map((l) => (
          <p key={l}>{l.replace(' ÀS ', ' às ')}</p>
        ))}
      </div>
    )
  }
  return (
    <p className={`text-[length:var(--t-corpo)] max-lg:text-[length:var(--t-pequeno)] leading-[1.19] max-lg:leading-[1.21] font-bold whitespace-nowrap ${horas.includes('ÀS') ? '' : 'uppercase'}`}>
      {horas.replace(' ÀS ', ' às ')}
    </p>
  )
}

/**
 * Celebrações, Eucaristia todos os dias — design novo (Figma, nó 111:1598), desktop 1440.
 *
 * Fundo bege claro 2, 180 de respiro. Cabeçalho (label, título de 80px, texto e
 * botão "Ver todos os horários"), régua e, por baixo, as colunas de horários:
 * Missas, Confissões, Adoração Eucarística e as Missas noutras igrejas da
 * paróquia (Lapa, Clarissas, Navegantes). O desenho tinha à direita "Rezar por
 * alguém", que repetia a secção das Intenções de Missa e saiu a pedido.
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
      titulo: h('confissoesHead'),
      entradas: [
        { horas: h('confissoesSemHoras'), dias: h('confissoesSemDias') },
        { horas: h('confissoesDomHoras'), dias: h('confissoesDomDias') },
      ],
    },
    {
      titulo: h('adoracaoHead'),
      entradas: [{ horas: h('adoracaoSemHoras'), dias: h('adoracaoSemDias') }],
    },
    {
      titulo: t('eucOutrasIgrejas'),
      entradas: [
        { horas: h('lapaSabHoras'), dias: `${h('lapaTitle')} · ${h('lapaSabDias')}` },
        { horas: h('lapaDomHoras'), dias: `${h('lapaTitle')} · ${h('lapaDomDias')}` },
        { horas: h('clarissasHoras'), dias: `${h('clarissasTitle')} · ${h('clarissasDias')}` },
        { horas: h('navegantesHoras'), dias: `${h('navegantesTitle')} · ${h('navegantesDias')}` },
      ],
    },
  ]

  return (
    <section
      id="eucaristia"
      data-barra="var(--bege-claro-2)"
      className="flex flex-col gap-[calc(80*var(--u))] max-lg:gap-[calc(48*var(--u))] w-full px-[calc(32*var(--u))] py-[calc(180*var(--u))] max-lg:px-[calc(20*var(--u))] max-lg:py-[calc(96*var(--u))] bg-[var(--bege-claro-2)] text-[var(--azul-escuro)]"
    >
      {/* ── Cabeçalho ── */}
      <div className="flex flex-col gap-[calc(24*var(--u))] w-full">
        <div className="flex flex-col gap-[calc(12*var(--u))] w-full">
          <Revelar><p className="text-[length:var(--t-etiqueta)] leading-[1.4]">{t('eucLabel')}</p></Revelar>
          <div className="flex items-center justify-between w-full max-lg:flex-col max-lg:items-start max-lg:gap-[calc(24*var(--u))]">
            <Revelar atraso={100}>
              <h2 className="font-display text-[length:calc(80*var(--u))] max-lg:text-[length:calc(40*var(--u))] leading-[calc(96*var(--u))] max-lg:leading-[calc(46*var(--u))] tracking-[calc(0.96*var(--u))] max-lg:tracking-normal font-normal whitespace-nowrap max-lg:whitespace-normal">{t('eucTitulo')}</h2>
            </Revelar>
            <Link
              href="/horarios"
              className="group/btn flex items-center gap-[calc(11.91*var(--u))] h-[calc(46.8*var(--u))] px-[calc(29.6*var(--u))] rounded-[calc(4*var(--u))] bg-[var(--azul-escuro)] text-[length:var(--t-etiqueta)] leading-[1.4] whitespace-nowrap text-[var(--bege-claro-2)] transition-[background-color] duration-[400ms] ease-[var(--ease-out)]"
            >
              {t('eucCta')}
              <Seta className="group-hover/btn:translate-x-[calc(4*var(--u))]" />
            </Link>
          </div>
        </div>
        <Revelar atraso={200}>
          <p className={`${LEVE} w-[calc(444*var(--u))] max-lg:w-full text-[length:var(--t-corpo)] leading-[1.5]`} style={TRIM}>{t('eucTexto')}</p>
        </Revelar>
      </div>

      {/* ── Horários e intenções ── */}
      <div className="flex flex-col gap-[calc(42*var(--u))] max-lg:gap-[calc(32*var(--u))] w-full">
        <div aria-hidden="true" className="h-px w-full max-lg:-mx-[calc(20*var(--u))] max-lg:w-[calc(100%+40*var(--u))] border-t border-solid border-[var(--azul-escuro)] opacity-25" />
        <Revelar>
          <div className="flex items-start justify-between w-full">
            <div className="flex gap-[calc(40*var(--u))] items-start max-lg:grid max-lg:w-full max-lg:grid-cols-2 max-lg:gap-x-[calc(20*var(--u))] max-lg:gap-y-[calc(40*var(--u))]">
              {colunas.map((c) => (
                <div key={c.titulo} className="flex flex-col gap-[calc(32*var(--u))] max-lg:gap-[calc(20*var(--u))] w-[calc(213*var(--u))] max-lg:w-auto">
                  <p className="text-[length:var(--t-etiqueta)] leading-[1.17] font-bold">{c.titulo}</p>
                  <div className="flex flex-col gap-[calc(24*var(--u))]">
                    {c.entradas.map((e) => (
                      <div key={e.horas + e.dias} className="flex flex-col gap-[calc(3.19*var(--u))]">
                        <Horas horas={e.horas} />
                        <p className="text-[length:var(--t-etiqueta)] leading-[1.17]">{e.dias}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </Revelar>
      </div>
    </section>
  )
}
