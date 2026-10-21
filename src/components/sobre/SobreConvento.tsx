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
 * Sobre nós, convite final — design novo (Figma, nó 181:427), desktop 1440, 681 de altura.
 *
 * Fotografia a toda a largura com o gradiente do desenho, título grande em
 * duas linhas ("Conheça a Basílica / e o Convento da Estrela", com itálico
 * leve em Basílica e Convento da Estrela) e o botão "Planear visita".
 */
export default function SobreConvento() {
  const t = useTranslations('sobre')

  return (
    <section
      data-barra="var(--bege-claro-2)"
      className="relative w-full h-[calc(681*var(--u))] overflow-hidden bg-[var(--azul-escuro)] text-[var(--bege-claro-2)]"
    >
      <Paralax>
        <div className="absolute inset-x-0 overflow-hidden" style={{ top: '-3.32%', height: '106.64%' }}>
          <Image src="/sobre/convento.jpg" alt="" fill sizes="100vw" className="object-cover" />
        </div>
      </Paralax>

      {/* Gradiente do Figma (nó 181:428) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgba(8,8,10,0.5) 0%, rgba(8,8,10,0.12) 26%, rgba(8,8,10,0.18) 52%, rgba(8,8,10,0.52) 78%, rgba(8,8,10,0.72) 100%)',
        }}
      />

      <div className="absolute left-[calc(336*var(--u))] top-[calc(180*var(--u))] flex flex-col gap-[calc(8.895*var(--u))] w-[calc(768*var(--u))]">
        <Revelar><p className="text-[length:max(11px,calc(12*var(--u)))] leading-[1.4]">{t('convLabel')}</p></Revelar>
        <Revelar atraso={100}>
          <h2 className="font-display text-[length:calc(96*var(--u))] leading-[calc(105.6*var(--u))] tracking-[calc(-0.576*var(--u))] font-normal">
            <span className="block">{t.rich('convL1', { i })}</span>
            <span className="block">{t.rich('convL2', { i })}</span>
          </h2>
        </Revelar>
      </div>

      <div className="absolute left-[calc(917*var(--u))] top-[calc(456*var(--u))]">
        <Revelar atraso={250}>
          <Link
            href="/sobre-a-basilica#visitar"
            className="group/btn flex items-center gap-[calc(11.91*var(--u))] h-[calc(46.8*var(--u))] px-[calc(29.6*var(--u))] rounded-[calc(4*var(--u))] bg-[var(--vermelho)] text-[length:max(11px,calc(12*var(--u)))] leading-[1.4] whitespace-nowrap text-[var(--bege-claro-2)] transition-[background-color,color] duration-[400ms] ease-[var(--ease-out)]"
          >
            {t('convCta')}
            <Seta className="group-hover/btn:translate-x-[calc(4*var(--u))]" />
          </Link>
        </Revelar>
      </div>
    </section>
  )
}
