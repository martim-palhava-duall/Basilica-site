import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'
import Seta from '@/components/home/Seta'
import { BILHETEIRA, externo } from '@/lib/links'

const TRIM = { textBox: 'trim-both cap alphabetic' } as React.CSSProperties
const LINHA = 'whitespace-nowrap font-display text-[length:calc(96*var(--u))] max-lg:text-[length:calc(26*var(--u))] md:max-lg:text-[length:calc(42*var(--u))] leading-[calc(100.8*var(--u))] max-lg:leading-[calc(30*var(--u))] md:max-lg:leading-[calc(48*var(--u))] tracking-[calc(-0.576*var(--u))] max-lg:tracking-normal'
const ITALICO = { fontFamily: "var(--font-display)" }

/** Miniatura 112×74,66 com 4px de raio, como no "O que procura?" da homepage */
function Thumb({ children }: { children: React.ReactNode }) {
  return <div className="relative h-[calc(74.66*var(--u))] w-[calc(112*var(--u))] max-lg:h-[calc(37.33*var(--u))] max-lg:w-[calc(56*var(--u))] md:max-lg:h-[calc(56*var(--u))] md:max-lg:w-[calc(84*var(--u))] shrink-0 overflow-hidden rounded-[calc(4*var(--u))]">{children}</div>
}

/**
 * Sobre nós, Visitar — design novo (Figma, nó 170:3135), 900 de altura.
 *
 * Três frases grandes desencontradas, cada uma com uma miniatura, em posições
 * absolutas como no desenho (x a partir da esquerda). Na primeira palavra(s)
 * de cada frase o Forevs normal, na restante o itálico leve (trocado a pedido do Martim). Em baixo, o local
 * à esquerda e o texto com o botão "Planear visita" à direita.
 *
 * Mobile e tablet: o mesmo tratamento do "O que procura?" da homepage (que tem o mesmo
 * desenho no desktop): cada frase numa linha (26), com a miniatura de 56×37 ao lado, em
 * mesma margem: as três juntas e alinhadas, cada uma com a miniatura antes da frase
 * (no desktop continuam desencontradas). No fim, o local (apagado), o texto e o botão.
 *
 * É o destino de "Visitar" no menu (#visitar).
 */
export default function SobreVisitar() {
  const t = useTranslations('sobre')

  return (
    <section
      id="visitar"
      data-barra="var(--bege-escuro-2)"
      className="relative w-full h-[calc(900*var(--u))] max-lg:h-auto max-lg:flex max-lg:flex-col max-lg:px-[calc(20*var(--u))] max-lg:py-[calc(120*var(--u))] scroll-mt-[calc(64*var(--u))] bg-[var(--bege-escuro-2)] text-[var(--azul-escuro)]"
    >
      <Revelar className="absolute left-[calc(32*var(--u))] top-[calc(140*var(--u))] max-lg:static max-lg:pb-[calc(56*var(--u))]">
        <p className="text-[length:var(--t-etiqueta)] leading-[1.4]">{t('visitarLabel')}</p>
      </Revelar>

      {/* 1 — miniatura à esquerda, texto à direita */}
      <div className="absolute left-[calc(279*var(--u))] top-[calc(282*var(--u))] max-lg:static max-lg:py-[calc(6*var(--u))]">
        <Revelar atraso={150}>
          <div className="flex items-center gap-[calc(32*var(--u))] max-lg:gap-[calc(12*var(--u))] md:max-lg:gap-[calc(18*var(--u))]">
            <Thumb>
              <div className="absolute left-0 w-full" style={{ top: '-50.32%', height: '200.64%' }}>
                <Image src="/home/oque-rezar-fundo.jpg" alt="" fill sizes="112px" className="object-cover" />
              </div>
              <div className="absolute left-1/2 top-1/2 h-[calc(78*var(--u))] w-[calc(117*var(--u))] max-lg:h-[calc(39*var(--u))] max-lg:w-[calc(58.5*var(--u))] md:max-lg:h-[calc(58*var(--u))] md:max-lg:w-[calc(87*var(--u))] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[calc(4*var(--u))]">
                <Image src="/sobre/visitar-cupula.jpg" alt="" fill sizes="117px" className="object-cover" />
              </div>
            </Thumb>
            <p className={LINHA} style={TRIM}>
              <span>{t('visitarL1a')} </span>
              <span className="italic font-light" style={ITALICO}>{t('visitarL1b')}</span>
            </p>
          </div>
        </Revelar>
      </div>

      {/* 2 — texto à esquerda, miniatura à direita */}
      <div className="absolute left-[calc(144*var(--u))] top-[calc(388.66*var(--u))] max-lg:static max-lg:py-[calc(6*var(--u))]">
        <Revelar atraso={270}>
          <div className="flex items-center gap-[calc(32*var(--u))] max-lg:flex-row-reverse max-lg:justify-end max-lg:gap-[calc(12*var(--u))] md:max-lg:gap-[calc(18*var(--u))]">
            <p className={LINHA} style={TRIM}>
              <span>{t('visitarL2a')}</span>
              {' '}<span className="italic font-light" style={ITALICO}>{t('visitarL2b')}</span>
            </p>
            <Thumb>
              <Image src="/home/dest-3.jpg" alt="" fill sizes="112px" className="object-cover" />
            </Thumb>
          </div>
        </Revelar>
      </div>

      {/* 3 — miniatura à esquerda, texto à direita */}
      <div className="absolute left-[calc(279*var(--u))] top-[calc(495.32*var(--u))] max-lg:static max-lg:py-[calc(6*var(--u))]">
        <Revelar atraso={390}>
          <div className="flex items-center gap-[calc(32*var(--u))] max-lg:gap-[calc(12*var(--u))] md:max-lg:gap-[calc(18*var(--u))]">
            <Thumb>
              <Image src="/home/oque-rezar.jpg" alt="" fill sizes="112px" className="object-cover" />
            </Thumb>
            <p className={LINHA} style={TRIM}>
              <span>{t('visitarL3a')} </span>
              <span className="italic font-light" style={ITALICO}>{t('visitarL3b')}</span>
            </p>
          </div>
        </Revelar>
      </div>

      <Revelar className="absolute left-[calc(32*var(--u))] top-[calc(745*var(--u))] max-lg:static max-lg:mt-[calc(72*var(--u))] max-lg:mb-[calc(16*var(--u))]">
        <p className="text-[length:var(--t-etiqueta)] leading-[1.4] whitespace-nowrap max-lg:opacity-60">{t('visitarLocal')}</p>
      </Revelar>

      <div className="absolute left-[calc(900*var(--u))] right-[calc(32*var(--u))] top-[calc(712*var(--u))] max-lg:static">
        <Revelar atraso={300}>
          <div className="flex flex-wrap items-start gap-x-[calc(32*var(--u))] gap-y-[calc(24*var(--u))] max-lg:flex-col max-lg:gap-[calc(32*var(--u))]">
            <p className="font-[family-name:var(--font-body-light)] text-[length:var(--t-lead)] max-lg:text-[length:var(--t-etiqueta)] leading-[1.6] max-lg:leading-[1.4] whitespace-nowrap max-lg:whitespace-normal max-lg:max-w-[calc(330*var(--u))]" style={TRIM}>
              {t('visitarTexto1')}{' '}
              <br className="max-lg:hidden" />
              {t('visitarTexto2')}
            </p>
            <Link
              href={BILHETEIRA}
              {...externo(BILHETEIRA)}
              className="group/btn flex items-center gap-[calc(12.01*var(--u))] px-[calc(29.6*var(--u))] py-[calc(14.4*var(--u))] rounded-[calc(4*var(--u))] border border-solid border-[var(--azul-escuro)] text-[length:var(--t-etiqueta)] leading-[1.4] whitespace-nowrap transition-[background-color,color] duration-[400ms] ease-[var(--ease-out)]"
            >
              {t('visitarCta')}
              <Seta className="group-hover/btn:translate-x-[calc(4*var(--u))]" />
            </Link>
          </div>
        </Revelar>
      </div>
    </section>
  )
}
