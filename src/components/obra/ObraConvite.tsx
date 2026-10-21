import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'
import Seta from '@/components/home/Seta'
import Paralax from '@/components/home/Paralax'

const i = (chunks: ReactNode) => (
  <span className="italic font-light" style={{ fontFamily: "'forevs-light', var(--font-display)" }}>{chunks}</span>
)

/**
 * Obra Social, convite final — design novo (Figma, nó 199:529), desktop 1440, 825 de altura.
 *
 * Mesmo desenho do convite da Vida da Paróquia (mesma fotografia, véu e
 * gradiente): "Também quer ajudar?" à esquerda, com itálico leve em "Também quer",
 * e à direita o texto e o botão "Entrar em contacto".
 */
export default function ObraConvite() {
  const t = useTranslations('obra')

  return (
    <section
      data-barra="var(--bege-claro-2)"
      className="relative h-[calc(825*var(--u))] w-full overflow-hidden bg-[var(--azul-escuro)] text-[var(--bege-claro-2)]"
    >
      <Paralax>
        <div className="absolute" style={{ width: '112.5%', height: '130.88%', left: '-2.55%', top: '-26.48%' }}>
          <Image src="/vida/convite.jpg" alt="" fill sizes="100vw" className="object-cover" />
        </div>
      </Paralax>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[rgba(0,0,0,0.3)]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgba(8,8,10,0.5) 0%, rgba(8,8,10,0.12) 19.52%, rgba(8,8,10,0.18) 35.17%, rgba(8,8,10,0.52) 65.127%, rgba(8,8,10,0.72) 100%)',
        }}
      />

      <div className="absolute left-[calc(265*var(--u))] top-[calc(222*var(--u))] flex w-[calc(768*var(--u))] flex-col gap-[calc(8.895*var(--u))]">
        <Revelar><p className="text-[length:max(11px,calc(12*var(--u)))] leading-[1.4]">{t('convLabel')}</p></Revelar>
        <Revelar atraso={100}>
          <h2 className="font-display text-[length:calc(96*var(--u))] leading-[calc(105.6*var(--u))] tracking-[calc(-0.576*var(--u))] font-normal">
            {t.rich('convL1', { i })}
          </h2>
        </Revelar>
      </div>

      <div className="absolute left-[calc(850*var(--u))] top-[calc(391.9*var(--u))] flex w-[calc(325*var(--u))] flex-col gap-[calc(40*var(--u))]">
        <Revelar atraso={200}>
          <p className="text-[length:calc(20*var(--u))] leading-[1.4]" style={{ fontFamily: 'var(--font-body-light)' }}>{t('convTexto')}</p>
        </Revelar>
        <Revelar atraso={300}>
          <Link
            href="/contactos"
            className="group/btn flex items-center gap-[calc(12*var(--u))] self-start rounded-[calc(6*var(--u))] bg-[var(--bege-escuro-2)] px-[calc(29.6*var(--u))] py-[calc(14.4*var(--u))] text-[length:max(11px,calc(12*var(--u)))] leading-[1.4] whitespace-nowrap text-[var(--azul-escuro)] transition-[background-color,color] duration-[400ms] ease-[var(--ease-out)]"
          >
            {t('convCta')}
            <Seta className="group-hover/btn:translate-x-[calc(4*var(--u))]" />
          </Link>
        </Revelar>
      </div>
    </section>
  )
}
