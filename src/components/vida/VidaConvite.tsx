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
 * Vida da Paróquia, convite final — design novo (Figma, nó 111:2178), desktop 1440, 825 de altura.
 *
 * Fotografia a toda a largura (recorte do Figma: 112,5% de largura, 130,9% de
 * altura, deslocada −2,55% e −26,5%), véu preto a 30% e o gradiente do
 * desenho. Título em duas linhas ("Há sempre um lugar / para si", itálico leve
 * em "Há sempre"), à esquerda; à direita o texto e o botão "Entrar em contacto".
 */
export default function VidaConvite() {
  const t = useTranslations('vida')

  return (
    <section
      data-barra="var(--bege-claro-2)"
      className="relative h-[calc(825*var(--u))] w-full max-lg:flex max-lg:h-auto max-lg:min-h-[calc(600*var(--u))] max-lg:flex-col max-lg:justify-center max-lg:gap-[calc(40*var(--u))] max-lg:px-[calc(20*var(--u))] max-lg:py-[calc(72*var(--u))] overflow-hidden bg-[var(--azul-escuro)] text-[var(--bege-claro-2)]"
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

      <div className="absolute left-[calc(265*var(--u))] top-[calc(222*var(--u))] max-lg:relative max-lg:left-auto max-lg:top-auto max-lg:w-full flex w-[calc(768*var(--u))] flex-col gap-[calc(8.895*var(--u))]">
        <Revelar><p className="text-[length:var(--t-etiqueta)] leading-[1.4]">{t('convLabel')}</p></Revelar>
        <Revelar atraso={100}>
          <h2 className="font-display text-[length:calc(96*var(--u))] max-lg:text-[length:calc(44*var(--u))] leading-[calc(105.6*var(--u))] max-lg:leading-[calc(48*var(--u))] tracking-[calc(-0.576*var(--u))] max-lg:tracking-normal font-normal">
            <span className="block">{t.rich('convL1', { i })}</span>
            <span className="block">{t('convL2')}</span>
          </h2>
        </Revelar>
      </div>

      <div className="absolute left-[calc(850*var(--u))] top-[calc(391.9*var(--u))] max-lg:relative max-lg:left-auto max-lg:top-auto max-lg:w-full flex w-[calc(325*var(--u))] flex-col gap-[calc(40*var(--u))] max-lg:gap-[calc(28*var(--u))]">
        <Revelar atraso={200}>
          <p className="text-[length:var(--t-lead)] max-lg:text-[length:var(--t-corpo)] leading-[1.4]" style={{ fontFamily: 'var(--font-body-light)' }}>{t('convTexto')}</p>
        </Revelar>
        <Revelar atraso={300}>
          <Link
            href="/contactos"
            className="group/btn flex w-fit items-center gap-[calc(12*var(--u))] self-start rounded-[calc(4*var(--u))] bg-[var(--bege-escuro-2)] px-[calc(29.6*var(--u))] py-[calc(14.4*var(--u))] text-[length:var(--t-etiqueta)] leading-[1.4] whitespace-nowrap text-[var(--azul-escuro)] transition-[background-color,color] duration-[400ms] ease-[var(--ease-out)]"
          >
            {t('convCta')}
            <Seta className="group-hover/btn:translate-x-[calc(4*var(--u))]" />
          </Link>
        </Revelar>
      </div>
    </section>
  )
}
