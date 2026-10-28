import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'
import Seta from '@/components/home/Seta'

const TRIM = { textBox: 'trim-both cap alphabetic' } as React.CSSProperties
const LINHA = 'h-px w-full bg-[rgba(29,35,40,0.25)]'

/**
 * Vida da Paróquia, Reserva de Salas — design novo (Figma, nó 111:2146), desktop 1440, 796 de altura.
 *
 * Bege claro, 180 de respiro. À esquerda (562) label, título de 64px e texto;
 * à direita (678) três linhas separadas por réguas — quem pode reservar, como
 * reservar e horários — e o botão "Entrar em contacto". É o desenho da secção
 * de reservas de Basílica e Convento, aqui com as horas no lugar do texto da
 * terceira linha.
 *
 * As horas (12H00 · 19H00, segunda a sábado) são as do Figma, que coincidem
 * com as das missas de semana e podem ser texto de teste: confirmar.
 */
export default function VidaSalas() {
  const t = useTranslations('vida')

  return (
    <section
      id="salas"
      data-barra="var(--bege-claro)"
      className="flex w-full items-start justify-between max-lg:flex-col max-lg:gap-[calc(48*var(--u))] px-[calc(32*var(--u))] py-[calc(180*var(--u))] max-lg:px-[calc(20*var(--u))] max-lg:py-[calc(96*var(--u))] bg-[var(--bege-claro)] text-[var(--azul-escuro)]"
    >
      <div className="flex w-[calc(562*var(--u))] max-lg:w-full flex-col gap-[calc(48*var(--u))] max-lg:gap-[calc(28*var(--u))]">
        <div className="flex w-full flex-col gap-[calc(24*var(--u))]">
          <Revelar><p className="text-[length:max(11px,calc(12*var(--u)))] leading-[1.4] text-[#1d2328]">{t('salaLabel')}</p></Revelar>
          <Revelar atraso={100}>
            <h2 className="font-display text-[length:calc(64*var(--u))] max-lg:text-[length:calc(36*var(--u))] leading-[1.2] font-normal" style={TRIM}>{t('salaTitulo')}</h2>
          </Revelar>
        </div>
        <Revelar atraso={200}><p className="w-[calc(445*var(--u))] max-lg:w-full text-[length:calc(16*var(--u))] leading-[1.5] text-[#1d2328]">{t('salaTexto')}</p></Revelar>
      </div>

      <Revelar atraso={150} className="w-[calc(678*var(--u))] max-lg:w-full">
        <div className="flex w-full flex-col gap-[calc(40*var(--u))] text-[#1d2328]">
          <div className="flex w-full flex-col gap-[calc(32*var(--u))]">
            {(['salaQuem', 'salaComo'] as const).map((k) => (
              <div key={k} className="flex w-full flex-col gap-[calc(32*var(--u))]">
                <div aria-hidden="true" className={LINHA} />
                <div className="flex w-full items-center justify-between max-lg:flex-col max-lg:items-start max-lg:gap-[calc(12*var(--u))]">
                  <h3 className="font-display text-[length:calc(32*var(--u))] max-lg:text-[length:calc(28*var(--u))] leading-[1.2] tracking-[calc(0.96*var(--u))] max-lg:tracking-normal font-normal whitespace-nowrap" style={TRIM}>{t(`${k}Titulo`)}</h3>
                  <p className="w-[calc(248*var(--u))] max-lg:w-full text-[length:calc(16*var(--u))] leading-[1.5]">{t(`${k}Texto`)}</p>
                </div>
              </div>
            ))}

            <div className="flex w-full flex-col gap-[calc(32*var(--u))]">
              <div aria-hidden="true" className={LINHA} />
              <div className="flex w-full items-center gap-[calc(330*var(--u))] max-lg:flex-col max-lg:items-start max-lg:gap-[calc(12*var(--u))]">
                <h3 className="font-display text-[length:calc(32*var(--u))] max-lg:text-[length:calc(28*var(--u))] leading-[1.2] tracking-[calc(0.96*var(--u))] max-lg:tracking-normal font-normal whitespace-nowrap" style={TRIM}>{t('salaHorariosTitulo')}</h3>
                <div className="flex flex-col gap-[calc(3.19*var(--u))] text-[var(--azul-escuro)]">
                  <p className="text-[length:calc(16*var(--u))] leading-[calc(17*var(--u))] font-bold whitespace-nowrap">{t('salaHoras')}</p>
                  <p className="text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] whitespace-nowrap">{t('salaDias')}</p>
                </div>
              </div>
              <div aria-hidden="true" className={LINHA} />
            </div>
          </div>

          <Link
            href="/contactos"
            className="group/btn flex h-[calc(45.8*var(--u))] items-center gap-[calc(12*var(--u))] self-start rounded-[calc(6*var(--u))] border border-solid border-[rgba(28,43,57,0.45)] px-[calc(29.6*var(--u))] py-[calc(14.4*var(--u))] text-[length:max(11px,calc(12*var(--u)))] leading-[1.4] whitespace-nowrap text-[var(--azul-escuro)] transition-[background-color,color,border-color] duration-[400ms] ease-[var(--ease-out)]"
          >
            {t('salaCta')}
            <Seta className="group-hover/btn:translate-x-[calc(4*var(--u))]" />
          </Link>
        </div>
      </Revelar>
    </section>
  )
}
