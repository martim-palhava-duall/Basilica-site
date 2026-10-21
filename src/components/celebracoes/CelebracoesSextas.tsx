import Image from 'next/image'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'

const TRIM = { textBox: 'trim-both cap alphabetic' } as React.CSSProperties
const min = (s: string) => s.replace(/ ÀS /g, ' às ')

/**
 * Celebrações, Primeiras Sextas-Feiras — design novo (Figma, nó 111:1710), desktop 1440, 900 de altura.
 *
 * Fundo bege escuro 2. À esquerda (614, centrado na vertical) o label, o
 * título de 80px, a citação, o texto e uma tabela "Quando / Programa"; à
 * direita a fotografia (677×836, a 32 das margens). O programa lê as horas do
 * namespace `horarios` (fonte única): o fim da adoração e a hora da Missa da
 * tarde, sem escrever nenhuma hora aqui.
 */
export default function CelebracoesSextas() {
  const t = useTranslations('celebrar')
  const h = useTranslations('horarios')

  const adoracaoTarde = min(h('adoracaoSemHoras').split(' · ')[1] ?? '')
  const missaTarde = h('missasSemHoras').split(' · ').pop() ?? ''

  return (
    <section
      id="sextas"
      data-barra="var(--bege-escuro-2)"
      className="relative flex h-[calc(900*var(--u))] w-full items-center bg-[var(--bege-escuro-2)] px-[calc(32*var(--u))] text-[var(--azul-escuro)]"
    >
      <div className="flex w-[calc(614*var(--u))] flex-col gap-[calc(90*var(--u))]">
        <div className="flex w-full flex-col gap-[calc(48*var(--u))]">
          <div className="flex w-full flex-col gap-[calc(12*var(--u))]">
            <Revelar><p className="text-[length:max(11px,calc(12*var(--u)))] leading-[1.4]">{t('sextasLabel')}</p></Revelar>
            <Revelar atraso={100}>
              <h2 className="font-display text-[length:calc(80*var(--u))] leading-none font-normal" style={TRIM}>{t('sextasTitulo')}</h2>
            </Revelar>
          </div>
          <Revelar atraso={200}>
            <p className="w-[calc(451*var(--u))] font-display text-[length:calc(24*var(--u))] leading-[1.2] tracking-[calc(0.96*var(--u))]" style={TRIM}>{t('sextasCitacao')}</p>
          </Revelar>
          <Revelar atraso={300}>
            <p className="w-[calc(451*var(--u))] text-[length:calc(16*var(--u))] leading-[1.4]">{t('sextasTexto')}</p>
          </Revelar>
        </div>

        <Revelar atraso={200}>
          <div className="flex w-full flex-col">
            <div className="flex w-full items-start gap-[calc(40*var(--u))] border-y border-solid border-[rgba(28,43,57,0.25)] py-[calc(20*var(--u))]">
              <p className="w-[calc(224*var(--u))] shrink-0 self-center text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] font-bold">{t('sextasQuandoLabel')}</p>
              <p className="w-[calc(350*var(--u))] text-right text-[length:calc(16*var(--u))] leading-[calc(19*var(--u))] font-bold">{t('sextasQuando')}</p>
            </div>
            <div className="flex w-full items-start gap-[calc(40*var(--u))] border-b border-solid border-[rgba(28,43,57,0.25)] py-[calc(20*var(--u))]">
              <p className="w-[calc(224*var(--u))] shrink-0 self-center text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] font-bold">{t('sextasProgramaLabel')}</p>
              <div className="flex w-[calc(350*var(--u))] flex-col items-end gap-[calc(4*var(--u))]">
                <p className="w-full text-right text-[length:calc(16*var(--u))] leading-[calc(19*var(--u))] font-bold">{t('sextasPrograma')}</p>
                <p className="text-right text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] font-bold opacity-60">
                  {adoracaoTarde}
                  <br />
                  {t('sextasSantaMissa')} · {missaTarde}
                </p>
              </div>
            </div>
          </div>
        </Revelar>
      </div>

      <div className="absolute right-[calc(32*var(--u))] top-[calc(32*var(--u))] h-[calc(836*var(--u))] w-[calc(677*var(--u))] overflow-hidden rounded-[calc(4*var(--u))]">
        <Image src="/celebracoes/sextas.jpg" alt={t('sextasAlt')} fill sizes="677px" className="object-cover" />
      </div>
    </section>
  )
}
