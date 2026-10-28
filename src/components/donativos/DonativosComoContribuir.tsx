import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'
import ComoContribuirLista from '@/components/donativos/ComoContribuirLista'

/**
 * Donativos, Como contribuir — design novo (Figma, nó 111:2426), desktop 1440.
 *
 * À esquerda (445) o label, o título de 80px e o texto; à direita (678) as
 * formas de ajudar em acordeão: as três do desenho (01, 02 e 04, debaixo do
 * título "Cinco formas"). As descrições de 02 e 04, que o desenho não mostra,
 * são as que já estavam escritas e só aparecem ao abrir.
 */
export default function DonativosComoContribuir() {
  const t = useTranslations('donar')
  const d = useTranslations('donativos')

  // Como no Figma: três linhas, numeradas 01, 02 e 04 (o desenho salta o 03)
  const formas = [
    { n: '01', titulo: t('comoPontual'), texto: d('unicaDesc') },
    { n: '02', titulo: d('periodicoTitle'), texto: d('periodicoDesc') },
    { n: '04', titulo: d('obrasTitle'), texto: d('obrasDesc') },
  ]

  return (
    <section
      id="contribuir"
      data-barra="var(--bege-claro-2)"
      className="flex w-full items-start justify-between max-lg:flex-col max-lg:gap-[calc(48*var(--u))] px-[calc(32*var(--u))] py-[calc(180*var(--u))] max-lg:px-[calc(20*var(--u))] max-lg:py-[calc(96*var(--u))] bg-[var(--bege-claro-2)] text-[var(--azul-escuro)]"
    >
      <div className="flex w-[calc(445*var(--u))] max-lg:w-full flex-col gap-[calc(64*var(--u))] max-lg:gap-[calc(28*var(--u))]">
        <div className="flex w-full flex-col gap-[calc(12*var(--u))]">
          <Revelar><p className="text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] tracking-[calc(-0.064*var(--u))]">{t('comoLabel')}</p></Revelar>
          <Revelar atraso={100}>
            <h2
              className="font-display text-[length:calc(80*var(--u))] max-lg:text-[length:calc(40*var(--u))] leading-none font-normal"
              style={{ textBox: 'trim-both cap alphabetic' } as React.CSSProperties}
            >
              {t('comoTitulo')}
            </h2>
          </Revelar>
        </div>
        <Revelar atraso={200}>
          <p className="text-[length:calc(16*var(--u))] leading-[1.5] opacity-80">{t('comoTexto')}</p>
        </Revelar>
      </div>

      <Revelar atraso={150} className="max-lg:w-full">
        <ComoContribuirLista formas={formas} abrir={t('comoAbrir')} fechar={t('comoFechar')} />
      </Revelar>
    </section>
  )
}
