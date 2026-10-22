import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'
import Seta from '@/components/home/Seta'

/**
 * Celebrações, Bênção da Casa — sem desenho próprio (pedido do cliente): o
 * mesmo desenho das Confissões (Figma, nó 111:1661), em bege claro com texto
 * azul. Duas metades centradas na vertical: à esquerda o label, o título de
 * 80px, o texto e o botão para os contactos; à direita três linhas com réguas
 * (rótulo à esquerda, resposta à direita).
 */
export default function CelebracoesBencao() {
  const t = useTranslations('celebrar')

  const linhas = [
    { rotulo: t('benQuandoLabel'), texto: t('benQuando') },
    { rotulo: t('benComoLabel'), texto: t('benComo') },
    { rotulo: t('benDuracaoLabel'), texto: t('benDuracao') },
  ]

  return (
    <section
      id="bencao"
      data-barra="var(--bege-claro-2)"
      className="flex h-[calc(500*var(--u))] w-full items-center bg-[var(--bege-claro-2)] text-[var(--azul-escuro)]"
    >
      <div className="flex w-full items-center gap-[calc(81*var(--u))] px-[calc(32*var(--u))]">
        <div className="flex min-w-px flex-1 flex-col gap-[calc(24*var(--u))]">
          <Revelar><p className="text-[length:max(11px,calc(12*var(--u)))] leading-[1.4]">{t('benLabel')}</p></Revelar>
          <Revelar atraso={100}>
            <h2
              className="font-display text-[length:calc(80*var(--u))] leading-none font-normal"
              style={{ textBox: 'trim-both cap alphabetic' } as React.CSSProperties}
            >
              {t('benTitulo')}
            </h2>
          </Revelar>
          <Revelar atraso={200}>
            <p className="w-[calc(451*var(--u))] text-[length:max(11px,calc(12*var(--u)))] leading-[1.4]">{t('benTexto')}</p>
          </Revelar>
          <Revelar atraso={250}>
            <Link
              href="/contactos"
              className="group/btn mt-[calc(16*var(--u))] flex h-[calc(46.8*var(--u))] w-max items-center gap-[calc(11.91*var(--u))] px-[calc(29.6*var(--u))] rounded-[calc(4*var(--u))] bg-[var(--azul-escuro)] text-[length:max(11px,calc(12*var(--u)))] leading-[1.4] whitespace-nowrap text-[var(--bege-claro-2)] transition-[background-color] duration-[400ms] ease-[var(--ease-out)]"
            >
              {t('benCta')}
              <Seta className="group-hover/btn:translate-x-[calc(4*var(--u))]" />
            </Link>
          </Revelar>
        </div>

        <Revelar atraso={150} className="min-w-px flex-1">
          <div className="flex w-full flex-col">
            {linhas.map((l, i) => (
              <div
                key={l.rotulo}
                className={`flex items-start gap-[calc(40*var(--u))] w-full py-[calc(20*var(--u))] border-b border-solid border-[rgba(28,43,57,0.25)] ${i === 0 ? 'border-t' : ''}`}
              >
                <p className="w-[calc(224*var(--u))] shrink-0 self-center text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] font-bold whitespace-nowrap">{l.rotulo}</p>
                <p className="min-w-px flex-1 text-right text-[length:calc(16*var(--u))] leading-[calc(19*var(--u))] font-bold">{l.texto}</p>
              </div>
            ))}
          </div>
        </Revelar>
      </div>
    </section>
  )
}
