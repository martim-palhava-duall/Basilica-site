import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'
import ComoContribuirLista from '@/components/donativos/ComoContribuirLista'

/**
 * Obra Social, Como contribuir — design novo (Figma, nó 199:444), desktop 1440.
 *
 * É o mesmo desenho do "Como contribuir" dos Donativos (mesma lista em
 * acordeão): à esquerda o label, o título de 80px e o texto; à direita as
 * formas numeradas 01, 02 e 04 (como no Figma). O desenho só traz o texto da primeira.
 */
export default function ObraComoContribuir() {
  const t = useTranslations('obra')
  const d = useTranslations('donar')

  const formas = [
    { n: '01', titulo: t('forma1Titulo'), texto: t('forma1Texto') },
    { n: '02', titulo: t('forma2Titulo'), texto: '' },
    { n: '04', titulo: t('forma4Titulo'), texto: '' },
  ]

  return (
    <section
      id="contribuir"
      data-barra="var(--bege-claro-2)"
      className="flex w-full items-start justify-between px-[calc(32*var(--u))] py-[calc(180*var(--u))] bg-[var(--bege-claro-2)] text-[var(--azul-escuro)]"
    >
      <div className="flex w-[calc(445*var(--u))] flex-col gap-[calc(64*var(--u))]">
        <div className="flex w-full flex-col gap-[calc(12*var(--u))]">
          <Revelar><p className="text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] tracking-[calc(-0.064*var(--u))]">{t('comoLabel')}</p></Revelar>
          <Revelar atraso={100}>
            <h2
              className="font-display text-[length:calc(80*var(--u))] leading-none font-normal"
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

      <Revelar atraso={150}>
        <ComoContribuirLista formas={formas} abrir={d('comoAbrir')} fechar={d('comoFechar')} />
      </Revelar>
    </section>
  )
}
