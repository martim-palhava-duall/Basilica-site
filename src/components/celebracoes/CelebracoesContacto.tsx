import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'
import Seta from '@/components/home/Seta'
import Paralax from '@/components/home/Paralax'

const i = (chunks: ReactNode) => (
  <span className="italic font-light" style={{ fontFamily: "var(--font-display)" }}>{chunks}</span>
)

/**
 * Celebrações, convite final — design novo (Figma, nó 111:1792), desktop 1440, 825 de altura.
 *
 * O mesmo desenho do convite da página Basílica e Convento, com outro texto:
 * fotografia a toda a largura (enquadramento do Figma, 30% de preto e o
 * gradiente), "Precisa de marcar alguma celebração?" em duas linhas, o texto do
 * secretariado e o botão "Entrar em contacto".
 */
export default function CelebracoesContacto() {
  const t = useTranslations('celebrar')

  return (
    <section
      data-barra="var(--bege-claro-2)"
      className="relative h-[calc(825*var(--u))] w-full overflow-hidden bg-[var(--azul-escuro)] text-[var(--bege-claro-2)]"
    >
      <Paralax>
        <div className="absolute" style={{ left: '-2.55%', top: '-26.48%', width: '112.5%', height: '130.88%' }}>
          <Image src="/basilica/duvida.jpg" alt="" fill sizes="100vw" className="object-cover" />
        </div>
      </Paralax>
      <div aria-hidden="true" className="absolute inset-0 bg-[rgba(0,0,0,0.3)]" />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgba(8,8,10,0.5) 0%, rgba(8,8,10,0.12) 19.52%, rgba(8,8,10,0.18) 35.17%, rgba(8,8,10,0.52) 65.127%, rgba(8,8,10,0.72) 100%)',
        }}
      />

      <div className="absolute left-[calc(265*var(--u))] top-[calc(222*var(--u))] flex w-[calc(768*var(--u))] flex-col gap-[calc(8.895*var(--u))]">
        <Revelar><p className="text-[length:max(11px,calc(12*var(--u)))] leading-[1.4]">{t('ctaLabel')}</p></Revelar>
        <Revelar atraso={100}>
          <h2 className="font-display text-[length:calc(96*var(--u))] leading-[calc(105.6*var(--u))] tracking-[calc(-0.576*var(--u))] font-normal">
            {t.rich('ctaTitulo', { i, br: () => <br /> })}
          </h2>
        </Revelar>
      </div>

      <div className="absolute left-[calc(850*var(--u))] top-[calc(391.9*var(--u))] w-[calc(325*var(--u))]">
        <Revelar atraso={250}>
          <div className="flex w-full flex-col items-start gap-[calc(40*var(--u))]">
            <p className="font-[family-name:var(--font-body-light)] text-[length:calc(20*var(--u))] leading-[1.4]">{t('ctaTexto')}</p>
            <Link
              href="/contactos"
              className="group/btn flex items-center gap-[calc(12*var(--u))] rounded-[calc(6*var(--u))] bg-[var(--bege-escuro-2)] px-[calc(29.6*var(--u))] py-[calc(14.4*var(--u))] text-[length:max(11px,calc(12*var(--u)))] leading-[1.4] whitespace-nowrap text-[var(--azul-escuro)] transition-[background-color] duration-[400ms] ease-[var(--ease-out)]"
            >
              {t('ctaCta')}
              <Seta className="group-hover/btn:translate-x-[calc(4*var(--u))]" />
            </Link>
          </div>
        </Revelar>
      </div>
    </section>
  )
}
