import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'
import Seta from '@/components/home/Seta'

const TRIM = { textBox: 'trim-both cap alphabetic' } as React.CSSProperties

const TIPOS = ['tipo1', 'tipo2', 'tipo3'] as const

/** "09H30 ÀS 19H00" (fonte única dos horários) → "09H30 às 19H00", como no desenho */
const horas = (s: string) => s.replace(' ÀS ', ' às ')

/**
 * Basílica e Convento, Quando visitar — design novo (Figma, nó 111:1187), desktop 1440.
 *
 * Fundo vermelho. Cabeçalho (Horários e Acesso, título, texto e botão
 * "Comprar bilhete"), régua, três colunas (horário, como chegar, onde) e, por
 * baixo, "Tipos de visita" com três cartões em contorno. Ao passar num cartão,
 * enche-se de bege e mostra a seta (é o cartão da "Opção 3" do desenho).
 *
 * A altura (1417) é a do desenho: 182 em cima e 245 em baixo.
 * O horário de visita lê-se do namespace `horarios` (fonte única), que tem as
 * mesmas horas de acolhimento. O destino do botão (plataforma externa de
 * bilhetes) ainda não existe.
 */
export default function BasilicaQuando() {
  const t = useTranslations('basilica')
  const h = useTranslations('horarios')

  const colunas = [
    {
      titulo: t('quandoHorario'),
      entradas: [
        { termo: horas(h('acolhimentoSemHoras')), detalhe: h('acolhimentoSemDias') },
        { termo: horas(h('acolhimentoFdsHoras')), detalhe: h('acolhimentoFdsDias') },
      ],
    },
    {
      titulo: t('quandoChegar'),
      entradas: [
        { termo: t('autocarro'), detalhe: t('autocarroLinhas') },
        { termo: t('eletrico'), detalhe: t('eletricoLinhas') },
      ],
    },
    { titulo: t('quandoOnde'), entradas: [{ termo: t('morada'), detalhe: t('moradaTexto') }] },
  ]

  return (
    <section id="horarios"
      data-barra="var(--vermelho)"
      data-barra-tom="escuro"
      className="flex flex-col gap-[calc(80*var(--u))] w-full px-[calc(32*var(--u))] pt-[calc(182*var(--u))] pb-[calc(245*var(--u))] bg-[var(--vermelho)] text-[var(--bege-claro-2)]"
    >
      {/* ── Cabeçalho ── */}
      <div className="flex flex-col gap-[calc(24*var(--u))] w-full">
        <div className="flex flex-col gap-[calc(12*var(--u))] w-full">
          <Revelar><p className="text-[length:max(11px,calc(12*var(--u)))] leading-[1.4]">{t('quandoLabel')}</p></Revelar>
          <div className="flex items-center justify-between w-full">
            <Revelar atraso={100}>
              <h2 className="font-display text-[length:calc(80*var(--u))] leading-[calc(96*var(--u))] tracking-[calc(0.96*var(--u))] font-normal whitespace-nowrap">{t('quandoTitulo')}</h2>
            </Revelar>
            <Link
              href="#"
              className="group/btn flex items-center gap-[calc(11.91*var(--u))] h-[calc(46.8*var(--u))] px-[calc(29.6*var(--u))] rounded-[calc(4*var(--u))] border border-solid border-[var(--bege-claro-2)] text-[length:max(11px,calc(12*var(--u)))] leading-[1.4] whitespace-nowrap text-[var(--bege-claro-2)] transition-[background-color,color] duration-[400ms] ease-[var(--ease-out)] hover:bg-[var(--bege-claro-2)] hover:text-[var(--vermelho)]"
            >
              {t('quandoCta')}
              <Seta className="group-hover/btn:translate-x-[calc(4*var(--u))]" />
            </Link>
          </div>
        </div>
        <Revelar atraso={200}>
          <p className="w-[calc(444*var(--u))] font-[family-name:var(--font-body-light)] text-[length:calc(20*var(--u))] leading-[calc(32*var(--u))]" style={TRIM}>{t('quandoTexto')}</p>
        </Revelar>
      </div>

      {/* ── Horário, como chegar, onde ── */}
      <div className="flex flex-col gap-[calc(42*var(--u))] w-full">
        <div aria-hidden="true" className="h-px w-full border-t border-solid border-[var(--bege-claro-2)] opacity-25" />
        <Revelar>
          <div className="flex gap-[calc(40*var(--u))] items-start min-h-[calc(197*var(--u))]">
            {colunas.map((c) => (
              <div key={c.titulo} className="flex flex-col gap-[calc(32*var(--u))] w-[calc(213*var(--u))]">
                <p className="text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] font-bold">{c.titulo}</p>
                <div className="flex flex-col gap-[calc(24*var(--u))]">
                  {c.entradas.map((e) => (
                    <div key={e.termo} className="flex flex-col gap-[calc(3.19*var(--u))]">
                      <p className="text-[length:calc(16*var(--u))] leading-[calc(19*var(--u))] font-bold whitespace-nowrap">{e.termo}</p>
                      <p className="text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] whitespace-nowrap">{e.detalhe}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Revelar>
      </div>

      {/* ── Tipos de visita ── */}
      <div className="flex flex-col gap-[calc(32*var(--u))] w-full pt-[calc(30*var(--u))] border-t border-solid border-[rgba(247,242,238,0.25)]">
        <Revelar><h2 className="font-display text-[length:calc(80*var(--u))] leading-[calc(96*var(--u))] tracking-[calc(0.96*var(--u))] font-normal">{t('tiposTitulo')}</h2></Revelar>
        <div className="flex gap-[calc(20*var(--u))] items-stretch w-full">
          {TIPOS.map((k, i) => (
            <Revelar key={k} atraso={100 + i * 120} className="flex">
              <div
                tabIndex={0}
                className="group/tipo flex flex-col justify-between gap-[calc(32*var(--u))] w-[calc(445*var(--u))] p-[calc(20*var(--u))] rounded-[calc(4*var(--u))] border border-solid border-[var(--bege-claro-2)] outline-none transition-[background-color,color] duration-[450ms] ease-[var(--ease-out)] hover:bg-[var(--bege-claro-2)] hover:text-[var(--vermelho)] focus-visible:bg-[var(--bege-claro-2)] focus-visible:text-[var(--vermelho)]"
              >
                <div className="flex flex-col gap-[calc(6*var(--u))] w-full">
                  <div className="flex items-center justify-between w-full">
                    <p className="text-[length:max(11px,calc(12*var(--u)))] leading-[1.4]">{t(`${k}Opcao`)}</p>
                    <Seta className="opacity-0 -translate-x-[calc(8*var(--u))] group-hover/tipo:opacity-100 group-hover/tipo:translate-x-0 group-focus-visible/tipo:opacity-100 group-focus-visible/tipo:translate-x-0 !duration-[450ms]" />
                  </div>
                  <p className="font-display text-[length:calc(32*var(--u))] leading-[calc(35.2*var(--u))]">{t(`${k}Nome`)}</p>
                </div>
                <div className="flex flex-col gap-[calc(12*var(--u))] w-full">
                  <p className="text-[length:calc(16*var(--u))] leading-[calc(19*var(--u))] font-bold">{t(`${k}Duracao`)}</p>
                  <p className="text-[length:calc(16*var(--u))] leading-[calc(19*var(--u))]">{t(`${k}Texto`)}</p>
                </div>
              </div>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  )
}
