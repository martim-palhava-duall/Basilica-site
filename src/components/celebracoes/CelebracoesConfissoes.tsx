import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'

/** "11H00 ÀS 12H00 · 18H00 ÀS 19H00" (fonte única) → "11H00 às 12H00 · 18H00 às 19H00" */
const horas = (s: string) => s.replace(/ ÀS /g, ' às ')

/**
 * Celebrações, Confissões — design novo (Figma, nó 111:1661), desktop 1440, 500 de altura.
 *
 * Faixa vermelha com duas metades, centradas na vertical: à esquerda o label,
 * o título de 80px (duas linhas) e o texto; à direita as horas de confissão em
 * duas linhas com réguas (rótulo à esquerda, horas à direita). As horas lêem-se
 * do namespace `horarios` (fonte única).
 */
export default function CelebracoesConfissoes() {
  const t = useTranslations('celebrar')
  const h = useTranslations('horarios')

  const linhas = [
    { dias: h('confissoesDomDias'), horas: horas(h('confissoesDomHoras')) },
    { dias: h('confissoesSemDias'), horas: horas(h('confissoesSemHoras')) },
  ]

  return (
    <section
      id="confissoes"
      data-barra="var(--vermelho)"
      data-barra-tom="escuro"
      className="flex h-[calc(500*var(--u))] max-lg:h-auto w-full items-center max-lg:px-[calc(20*var(--u))] max-lg:py-[calc(72*var(--u))] bg-[var(--vermelho)] text-[var(--bege-claro-2)]"
    >
      <div className="flex w-full items-center gap-[calc(81*var(--u))] max-lg:flex-col max-lg:items-stretch max-lg:gap-[calc(40*var(--u))] px-[calc(32*var(--u))] max-lg:px-0">
        <div className="flex min-w-px flex-1 flex-col gap-[calc(24*var(--u))]">
          <Revelar><p className="text-[length:max(11px,calc(12*var(--u)))] leading-[1.4]">{t('confLabel')}</p></Revelar>
          <Revelar atraso={100}>
            <h2
              className="font-display text-[length:calc(80*var(--u))] max-lg:text-[length:calc(44*var(--u))] leading-none font-normal"
              style={{ textBox: 'trim-both cap alphabetic' } as React.CSSProperties}
            >
              {t('confTitulo')}
            </h2>
          </Revelar>
          <Revelar atraso={200}>
            <p className="w-[calc(451*var(--u))] max-lg:w-full text-[length:max(11px,calc(12*var(--u)))] max-lg:text-[length:calc(14*var(--u))] leading-[1.4] max-lg:leading-[1.5]">{t('confTexto')}</p>
          </Revelar>
        </div>

        <Revelar atraso={150} className="min-w-px flex-1">
          <div className="flex w-full flex-col">
            {linhas.map((l, i) => (
              <div
                key={l.dias}
                className={`flex items-start gap-[calc(40*var(--u))] max-lg:gap-[calc(20*var(--u))] w-full py-[calc(20*var(--u))] border-b border-solid border-[rgba(249,246,243,0.2)] ${i === 0 ? 'border-t' : ''}`}
              >
                <p className="w-[calc(224*var(--u))] max-lg:w-[calc(130*var(--u))] shrink-0 self-center text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] font-bold max-lg:whitespace-normal">{l.dias}</p>
                <p className="min-w-px flex-1 text-right text-[length:calc(16*var(--u))] leading-[calc(19*var(--u))] font-bold">{l.horas}</p>
              </div>
            ))}
          </div>
        </Revelar>
      </div>
    </section>
  )
}
