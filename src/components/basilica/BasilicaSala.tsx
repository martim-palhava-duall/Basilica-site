import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'
import Seta from '@/components/home/Seta'

const TRIM = { textBox: 'trim-both cap alphabetic' } as React.CSSProperties

const LINHAS = ['salaQuem', 'salaComo', 'salaHorarios'] as const

/**
 * Basílica e Convento, Reservas na Sala — design novo (Figma, nó 122:2024), desktop 1440.
 *
 * Fundo vermelho, 180 de respiro. À esquerda (562) o label, o título de 64px e
 * o texto; à direita (678) três linhas separadas por réguas (título de 32px à
 * esquerda, texto de 248 à direita) e o botão "Entrar em contacto".
 *
 * O desenho repete, em "Horários", o texto de "Quem pode reservar" (parece
 * texto de teste): fica como está até haver o definitivo.
 */
export default function BasilicaSala() {
  const t = useTranslations('basilica')

  return (
    <section id="reservas"
      data-barra="var(--vermelho)"
      data-barra-tom="escuro"
      className="flex items-start justify-between w-full px-[calc(32*var(--u))] py-[calc(180*var(--u))] bg-[var(--vermelho)] text-[var(--bege-claro-2)]"
    >
      <div className="flex flex-col gap-[calc(48*var(--u))] w-[calc(562*var(--u))]">
        <div className="flex flex-col gap-[calc(24*var(--u))] w-full">
          <Revelar><p className="text-[length:max(11px,calc(12*var(--u)))] leading-[1.4]">{t('salaLabel')}</p></Revelar>
          <Revelar atraso={100}>
            <h2 className="font-display text-[length:calc(64*var(--u))] leading-[1.2] font-normal" style={TRIM}>{t('salaTitulo')}</h2>
          </Revelar>
        </div>
        <Revelar atraso={200}>
          <p className="w-[calc(445*var(--u))] text-[length:calc(16*var(--u))] leading-[1.5]">{t('salaTexto')}</p>
        </Revelar>
      </div>

      <Revelar atraso={150}>
        <div className="flex flex-col gap-[calc(40*var(--u))] w-[calc(678*var(--u))]">
          <div className="flex flex-col gap-[calc(32*var(--u))] w-full">
            {LINHAS.map((k) => (
              <div key={k} className="flex flex-col gap-[calc(32*var(--u))] w-full">
                <div aria-hidden="true" className="h-px w-full border-t border-solid border-[var(--bege-claro-2)] opacity-25" />
                <div className="flex items-center justify-between w-full">
                  <h3
                    className="font-display text-[length:calc(32*var(--u))] leading-[1.2] tracking-[calc(0.96*var(--u))] font-normal whitespace-nowrap"
                    style={TRIM}
                  >
                    {t(`${k}Titulo`)}
                  </h3>
                  <p className="w-[calc(248*var(--u))] text-[length:calc(16*var(--u))] leading-[1.5]">{t(`${k}Texto`)}</p>
                </div>
              </div>
            ))}
            <div aria-hidden="true" className="h-px w-full border-t border-solid border-[var(--bege-claro-2)] opacity-25" />
          </div>

          <Link
            href="/contactos"
            className="group/btn self-start flex items-center gap-[calc(12*var(--u))] px-[calc(29.6*var(--u))] py-[calc(14.4*var(--u))] rounded-[calc(6*var(--u))] border border-solid border-[rgba(247,242,238,0.97)] text-[length:max(11px,calc(12*var(--u)))] leading-[1.4] whitespace-nowrap transition-[background-color,color] duration-[400ms] ease-[var(--ease-out)]"
          >
            {t('salaCta')}
            <Seta className="group-hover/btn:translate-x-[calc(4*var(--u))]" />
          </Link>
        </div>
      </Revelar>
    </section>
  )
}
