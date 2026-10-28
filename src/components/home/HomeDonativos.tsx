import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'
import Seta from '@/components/home/Seta'
import Paralax from '@/components/home/Paralax'

/**
 * Donativos — design novo (Figma, nó 179:294), desktop 1440, 900 de altura.
 *
 * Fotografia a toda a largura com o gradiente do desenho por cima, título
 * grande em duas linhas (a segunda em itálico leve) e, mais abaixo à direita,
 * o texto e o botão "Fazer um donativo". As posições são as do desenho, em px
 * a partir do canto superior esquerdo da secção.
 *
 * Mobile: 640 de altura, título (48px), texto e botão em coluna, encostados ao fundo.
 */
export default function HomeDonativos() {
  const t = useTranslations('inicio')

  return (
    <section data-barra="var(--bege-claro-2)" className="relative w-full h-[calc(900*var(--u))] max-lg:h-auto max-lg:min-h-[calc(640*var(--u))] max-lg:flex max-lg:flex-col max-lg:justify-end max-lg:gap-[calc(32*var(--u))] max-lg:px-[calc(20*var(--u))] max-lg:py-[calc(72*var(--u))] overflow-hidden bg-[var(--azul-escuro)] text-[var(--bege-claro-2)]">
      <Paralax>
        <Image src="/home/donativos.jpg" alt="" fill sizes="100vw" className="object-cover" />
      </Paralax>

      {/* Gradiente do Figma (nó 179:295) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgba(8,8,10,0.25) 0%, rgba(8,8,10,0.06) 26%, rgba(8,8,10,0.09) 52%, rgba(8,8,10,0.26) 78%, rgba(8,8,10,0.36) 100%)',
        }}
      />

      <div className="absolute left-[calc(265*var(--u))] top-[calc(222*var(--u))] max-lg:relative max-lg:left-auto max-lg:top-auto max-lg:w-full flex flex-col gap-[calc(8.895*var(--u))] w-[calc(768*var(--u))]">
        <Revelar><p className="text-[length:max(11px,calc(12*var(--u)))] leading-[1.4]">{t('donLabel')}</p></Revelar>
        <Revelar atraso={100}>
          <h2 className="font-display text-[length:calc(96*var(--u))] leading-[calc(105.6*var(--u))] tracking-[calc(-0.576*var(--u))] max-lg:text-[length:calc(48*var(--u))] max-lg:leading-[calc(52*var(--u))] max-lg:tracking-normal font-normal">
            <span className="block">{t('donT1')}</span>
            <span className="block italic font-light" style={{ fontFamily: "var(--font-display)" }}>
              {t('donT2')}
            </span>
          </h2>
        </Revelar>
      </div>

      <div className="absolute left-[calc(850*var(--u))] top-[calc(497.9*var(--u))] max-lg:relative max-lg:left-auto max-lg:top-auto w-[calc(325*var(--u))] max-lg:w-full">
        <Revelar atraso={250}>
          <div className="flex flex-col gap-[calc(40*var(--u))] items-start w-full">
            <p className="font-[family-name:var(--font-body-light)] text-[length:calc(20*var(--u))] leading-[1.4] max-lg:text-[length:calc(18*var(--u))]">
              {t('donTexto1')}
              <br />
              {t('donTexto2')}
            </p>
            <Link
              href="/donativos"
              className="group/btn flex items-center gap-[calc(12*var(--u))] px-[calc(29.6*var(--u))] py-[calc(14.4*var(--u))] rounded-[calc(6*var(--u))] bg-[var(--azul-claro)] text-[length:max(11px,calc(12*var(--u)))] leading-[1.4] whitespace-nowrap text-[var(--azul-escuro)] transition-[background-color] duration-[400ms] ease-[var(--ease-out)]"
            >
              {t('donCta')}
              <Seta className="group-hover/btn:translate-x-[calc(4*var(--u))]" />
            </Link>
          </div>
        </Revelar>
      </div>
    </section>
  )
}
