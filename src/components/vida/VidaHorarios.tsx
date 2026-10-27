import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Horas } from '@/components/celebracoes/CelebracoesEucaristia'
import Revelar from '@/components/home/Revelar'
import Seta from '@/components/home/Seta'

const TRIM = { textBox: 'trim-both cap alphabetic' } as React.CSSProperties
const LEVE = 'font-[family-name:var(--font-body-light)]'

/**
 * Vida da Paróquia, Horários das Celebrações — design novo (Figma, nó 224:130), desktop 1440.
 *
 * Fundo bege escuro 2. Cabeçalho (label, "Santa Missa todos os dias" a 80px, botão
 * "Ver todos os horários" e texto), as cinco colunas de horas e, por baixo, o
 * "Acolhimento". O desenho repete o mesmo horário nas colunas (texto de
 * enchimento): aqui lêem-se as horas reais do namespace `horarios` (fonte única).
 */
export default function VidaHorarios() {
  const t = useTranslations('vida')
  const h = useTranslations('horarios')

  const colunas: { titulo: string; entradas: { horas: string; dias: string }[] }[] = [
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
    { titulo: h('adoracaoHead'), entradas: [{ horas: h('adoracaoSemHoras'), dias: h('adoracaoSemDias') }] },
    {
      titulo: t('horAbertura'),
      entradas: [
        { horas: h('acolhimentoSemHoras'), dias: h('acolhimentoSemDias') },
        { horas: h('acolhimentoFdsHoras'), dias: h('acolhimentoFdsDias') },
      ],
    },
    { titulo: h('cartorioHead'), entradas: [{ horas: h('cartorioHoras'), dias: h('cartorioDias') }] },
  ]

  return (
    <section
      id="horarios"
      data-barra="var(--bege-escuro-2)"
      className="flex w-full scroll-mt-[calc(64*var(--u))] flex-col gap-[calc(80*var(--u))] px-[calc(32*var(--u))] py-[calc(180*var(--u))] bg-[var(--bege-escuro-2)] text-[var(--azul-escuro)]"
    >
      {/* ── Cabeçalho ── */}
      <div className="flex w-full flex-col gap-[calc(24*var(--u))]">
        <div className="flex w-full flex-col gap-[calc(12*var(--u))]">
          <Revelar><p className="text-[length:max(11px,calc(12*var(--u)))] leading-[1.4]">{t('horLabel')}</p></Revelar>
          <div className="flex w-full items-center justify-between">
            <Revelar atraso={100}>
              <h2 className="font-display text-[length:calc(80*var(--u))] leading-[calc(96*var(--u))] tracking-[calc(0.96*var(--u))] font-normal whitespace-nowrap">{t('horTitulo')}</h2>
            </Revelar>
            <Link
              href="/celebracoes"
              className="group/btn flex h-[calc(46.8*var(--u))] items-center gap-[calc(11.91*var(--u))] rounded-[calc(4*var(--u))] bg-[var(--azul-escuro)] px-[calc(29.6*var(--u))] text-[length:max(11px,calc(12*var(--u)))] leading-[1.4] whitespace-nowrap text-[var(--bege-claro-2)] transition-[background-color] duration-[400ms] ease-[var(--ease-out)]"
            >
              {t('horCta')}
              <Seta className="group-hover/btn:translate-x-[calc(4*var(--u))]" />
            </Link>
          </div>
        </div>
        <Revelar atraso={200}>
          <p className={`${LEVE} w-[calc(444*var(--u))] text-[length:calc(20*var(--u))] leading-[calc(32*var(--u))]`} style={TRIM}>{t('horTexto')}</p>
        </Revelar>
      </div>

      {/* ── Colunas de horas ── */}
      <Revelar>
        <div className="flex min-h-[calc(196.57*var(--u))] items-start gap-[calc(40*var(--u))]">
          {colunas.map((c) => (
            <div key={c.titulo} className="flex w-[calc(213*var(--u))] flex-col gap-[calc(32*var(--u))]">
              <p className="text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] font-bold">{c.titulo}</p>
              <div className="flex flex-col gap-[calc(24*var(--u))]">
                {c.entradas.map((e) => (
                  <div key={e.horas + e.dias} className="flex flex-col gap-[calc(3.19*var(--u))]">
                    <Horas horas={e.horas} />
                    <p className="text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))]">{e.dias}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Revelar>

      {/* ── Acolhimento ── */}
      <div className="flex w-[calc(563*var(--u))] flex-col gap-[calc(40*var(--u))]">
        <div className="flex w-full flex-col gap-[calc(16*var(--u))]">
          <Revelar><p className="text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] font-bold">{t('acolhLabel')}</p></Revelar>
          <div className="flex w-full flex-col gap-[calc(24*var(--u))]">
            <Revelar atraso={100}>
              <h3 className="font-display text-[length:calc(40*var(--u))] leading-[calc(35.2*var(--u))] tracking-[calc(-0.192*var(--u))] font-normal">{t('acolhTitulo')}</h3>
            </Revelar>
            <Revelar atraso={200}>
              <p className={`${LEVE} text-[length:calc(20*var(--u))] leading-[1.4]`} style={TRIM}>{t('acolhTexto')}</p>
            </Revelar>
          </div>
        </div>
        <Revelar atraso={250}>
          <Link
            href="/basilica-e-convento"
            className="group/btn sem-luz flex items-center gap-[calc(12*var(--u))] self-start text-[length:calc(16*var(--u))] leading-[1.5] whitespace-nowrap"
          >
            {t('acolhCta')}
            <Seta className="group-hover/btn:translate-x-[calc(4*var(--u))]" />
          </Link>
        </Revelar>
      </div>
    </section>
  )
}
