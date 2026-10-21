import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'
import Seta from '@/components/home/Seta'
import { u } from '@/lib/escala'

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
 * e o botão "Planear visita".
 */
export default function SobreCulto() {
  const t = useTranslations('sobre')

  return (
    <section id="culto"
      data-barra="var(--azul-escuro)"
      data-barra-tom="escuro"
      className="flex flex-col w-full px-[calc(31*var(--u))] py-[calc(180*var(--u))] bg-[var(--azul-escuro)] text-[var(--bege-claro-2)]"
    >
      <div className="flex flex-col gap-[calc(80*var(--u))] w-full">
        <Revelar>
          <div className="flex items-center justify-between w-full text-[length:max(11px,calc(12*var(--u)))] leading-[1.4] whitespace-nowrap">
            <p>{t('cultoLabel')}</p>
            <p className="text-right">{t('cultoLema')}</p>
          </div>
        </Revelar>

        <div className="flex items-start gap-[calc(22*var(--u))] w-full">
          {ESPACOS.map((e, i) => (
            <Revelar key={e.chave} atraso={100 + i * 120}>
              <div className="flex flex-col gap-[calc(20*var(--u))]" style={{ width: u(e.largura) }}>
                <div className="relative h-[calc(541*var(--u))] w-full rounded-[calc(4*var(--u))] overflow-hidden">
                  <Image src={FOTO} alt="" fill sizes="445px" className="object-cover" />
                </div>
                <div className="flex flex-col gap-[calc(20*var(--u))] w-full">
                  <h3 className="font-display text-[length:calc(40*var(--u))] leading-[calc(35.2*var(--u))] tracking-[calc(-0.192*var(--u))] font-normal whitespace-nowrap text-[var(--bege-escuro-2)]">
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
            <div aria-hidden="true" className="h-px w-full border-t border-solid border-[var(--bege-claro-2)] opacity-25" />
            <div className="flex items-center justify-between w-full">
              <p
                className="w-[calc(542*var(--u))] font-[family-name:var(--font-body-light)] text-[length:calc(20*var(--u))] leading-[calc(32*var(--u))]"
                style={{ textBox: 'trim-both cap alphabetic' } as React.CSSProperties}
              >
                {t('cultoRodape')}
              </p>
              <Link
                href="/sobre-a-basilica#visitar"
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
