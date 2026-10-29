import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'
import Seta from '@/components/home/Seta'
import { u } from '@/lib/escala'
import { BILHETEIRA, externo } from '@/lib/links'

/** Fotografia provisória: o desenho usa a mesma nos três espaços. */
const FOTO = '/sobre/culto.jpg'

const ESPACOS = [
  { chave: 'culto1', largura: 444 },
  { chave: 'culto2', largura: 444 },
  { chave: 'culto3', largura: 445 },
] as const

/**
 * Sobre nós, Espaços de Culto — design novo (Figma, nó 170:3246), desktop 1440.
 *
 * Fundo azul escuro, com 31 de margem lateral e 180 de respiro. Rótulo e lema
 * nos extremos, três cartões (444/444/445, 22 entre eles) com fotografia de
 * 541 de altura, título e descrição, e por baixo uma régua com o texto final
 * e o botão "Planear visita". A régua ocupa a largura toda do ecrã (desktop e mobile).
 */
export default function SobreCulto() {
  const t = useTranslations('sobre')

  return (
    <section id="culto"
      data-barra="var(--azul-escuro)"
      data-barra-tom="escuro"
      className="flex flex-col w-full px-[calc(31*var(--u))] py-[calc(180*var(--u))] max-lg:px-[calc(20*var(--u))] max-lg:py-[calc(96*var(--u))] bg-[var(--azul-escuro)] text-[var(--bege-claro-2)]"
    >
      <div className="flex flex-col gap-[calc(80*var(--u))] max-lg:gap-[calc(48*var(--u))] w-full">
        <Revelar>
          <div className="flex items-center justify-between w-full max-lg:flex-col max-lg:items-start max-lg:gap-[calc(8*var(--u))] text-[length:max(11px,calc(12*var(--u)))] leading-[1.4] whitespace-nowrap">
            <p>{t('cultoLabel')}</p>
            <p className="text-right">{t('cultoLema')}</p>
          </div>
        </Revelar>

        <div className="flex items-start gap-[calc(22*var(--u))] max-lg:flex-col max-lg:gap-[calc(40*var(--u))] md:max-lg:flex-row md:max-lg:gap-[calc(16*var(--u))] w-full">
          {ESPACOS.map((e, i) => (
            <Revelar key={e.chave} atraso={100 + i * 120} className="max-lg:w-full md:max-lg:w-auto md:max-lg:min-w-0 md:max-lg:flex-1">
              <div className="flex flex-col gap-[calc(20*var(--u))] max-lg:w-full!" style={{ width: u(e.largura) }}>
                <div className="relative h-[calc(541*var(--u))] max-lg:h-[calc(300*var(--u))] md:max-lg:h-[calc(240*var(--u))] w-full rounded-[calc(4*var(--u))] overflow-hidden">
                  <Image src={FOTO} alt="" fill sizes="445px" className="object-cover" />
                </div>
                <div className="flex flex-col gap-[calc(20*var(--u))] w-full">
                  <h3 className="font-display text-[length:calc(40*var(--u))] leading-[calc(35.2*var(--u))] tracking-[calc(-0.192*var(--u))] font-normal whitespace-nowrap max-lg:whitespace-normal md:max-lg:text-[length:calc(26*var(--u))] md:max-lg:leading-[calc(30*var(--u))] text-[var(--bege-escuro-2)]">
                    {t(`${e.chave}Titulo`)}
                  </h3>
                  <p className="text-[length:calc(16*var(--u))] leading-[calc(19*var(--u))] opacity-60">{t(`${e.chave}Texto`)}</p>
                </div>
              </div>
            </Revelar>
          ))}
        </div>

        <Revelar>
          <div className="flex flex-col gap-[calc(40*var(--u))] w-full">
            <div aria-hidden="true" className="h-px -mx-[calc(31*var(--u))] w-[calc(100%+62*var(--u))] max-lg:-mx-[calc(20*var(--u))] max-lg:w-[calc(100%+40*var(--u))] border-t border-solid border-[var(--bege-claro-2)] opacity-25" />
            <div className="flex items-center justify-between w-full max-lg:flex-col max-lg:items-start max-lg:gap-[calc(28*var(--u))]">
              <p
                className="w-[calc(542*var(--u))] max-lg:w-full font-[family-name:var(--font-body-light)] text-[length:calc(20*var(--u))] max-lg:text-[length:calc(16*var(--u))] leading-[calc(32*var(--u))] max-lg:leading-[1.5]"
                style={{ textBox: 'trim-both cap alphabetic' } as React.CSSProperties}
              >
                {t('cultoRodape')}
              </p>
              <Link
                href={BILHETEIRA}
                {...externo(BILHETEIRA)}
                className="group/btn flex items-center gap-[calc(12.01*var(--u))] px-[calc(29.6*var(--u))] py-[calc(14.4*var(--u))] rounded-[calc(4*var(--u))] border border-solid border-[var(--bege-claro-2)] text-[length:max(11px,calc(12*var(--u)))] leading-[1.4] whitespace-nowrap transition-[background-color,color] duration-[400ms] ease-[var(--ease-out)]"
              >
                {t('cultoCta')}
                <Seta className="group-hover/btn:translate-x-[calc(4*var(--u))]" />
              </Link>
            </div>
          </div>
        </Revelar>
      </div>
    </section>
  )
}
