import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'
import Seta from '@/components/home/Seta'

/**
 * Celebrações, Entronização do Sagrado Coração de Jesus — sem desenho próprio
 * (pedido do cliente): o mesmo desenho das Intenções de Missa (Figma, nó
 * 148:825), em azul escuro (as Intenções, duas secções acima, já são vermelhas).
 * Fotografia de 710×561 à esquerda e, à direita, o label, o título de 80px, dois textos curtos lado a lado, a linha com o modo
 * de pedir e o botão para os contactos. A fotografia (São José com o Menino,
 * padroeiro das famílias) é provisória.
 */
export default function CelebracoesEntronizacao() {
  const t = useTranslations('celebrar')

  return (
    <section
      id="entronizacao"
      data-barra="var(--azul-escuro)"
      data-barra-tom="escuro"
      className="flex h-[calc(561*var(--u))] w-full items-center gap-[calc(20*var(--u))] bg-[var(--azul-escuro)] text-[var(--bege-claro-2)]"
    >
      <div className="relative h-[calc(561*var(--u))] w-[calc(710*var(--u))] shrink-0">
        <Image src="/celebracoes/sextas.jpg" alt={t('entAlt')} fill sizes="710px" className="object-cover object-[50%_30%]" />
      </div>

      <div className="flex w-[calc(678*var(--u))] flex-col gap-[calc(80*var(--u))] px-[calc(32*var(--u))]">
        <div className="flex w-[calc(614*var(--u))] flex-col gap-[calc(40*var(--u))]">
          <div className="flex w-full flex-col gap-[calc(12*var(--u))]">
            <Revelar><p className="text-[length:max(11px,calc(12*var(--u)))] leading-[1.4]">{t('entLabel')}</p></Revelar>
            <Revelar atraso={100}>
              <h2
                className="font-display text-[length:calc(80*var(--u))] leading-none tracking-[calc(0.96*var(--u))] font-normal"
                style={{ textBox: 'trim-both cap alphabetic' } as React.CSSProperties}
              >
                {t('entTitulo')}
              </h2>
            </Revelar>
          </div>
          <Revelar atraso={200}>
            <div className="flex w-full items-start gap-[calc(24*var(--u))] text-[length:max(11px,calc(12*var(--u)))] leading-[1.4]">
              <p className="w-[calc(296*var(--u))] shrink-0">{t('entTexto1')}</p>
              <p className="w-[calc(294*var(--u))] shrink-0">{t('entTexto2')}</p>
            </div>
          </Revelar>
        </div>

        <Revelar atraso={200}>
          <div className="flex w-full flex-col gap-[calc(24*var(--u))]">
            <div className="flex w-full items-start gap-[calc(40*var(--u))] border-y border-solid border-[rgba(249,246,243,0.2)] py-[calc(20*var(--u))]">
              <p className="w-[calc(224*var(--u))] shrink-0 self-center text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] font-bold whitespace-nowrap">{t('entQuandoLabel')}</p>
              <div className="flex w-[calc(350*var(--u))] flex-col items-end gap-[calc(4*var(--u))]">
                <p className="w-full text-right text-[length:calc(16*var(--u))] leading-[calc(19*var(--u))] font-bold">{t('entQuando')}</p>
                <p className="text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] font-bold opacity-60">{t('entQuandoNota')}</p>
              </div>
            </div>
            <Link
              href="/contactos"
              className="group/btn flex h-[calc(46.8*var(--u))] items-center gap-[calc(11.91*var(--u))] self-start px-[calc(29.6*var(--u))] rounded-[calc(4*var(--u))] border border-solid border-[var(--bege-claro-2)] text-[length:max(11px,calc(12*var(--u)))] leading-[1.4] whitespace-nowrap transition-[background-color,color] duration-[400ms] ease-[var(--ease-out)]"
            >
              {t('entCta')}
              <Seta className="group-hover/btn:translate-x-[calc(4*var(--u))]" />
            </Link>
          </div>
        </Revelar>
      </div>
    </section>
  )
}
