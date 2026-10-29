import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'
import Seta from '@/components/home/Seta'
import { u } from '@/lib/escala'

const MOVIMENTOS = [
  { chave: 'mov1', foto: '/vida/mov-1.jpg', largura: 444 },
  { chave: 'mov2', foto: '/vida/mov-2.jpg', largura: 444 },
  { chave: 'mov3', foto: '/vida/mov-3.jpg', largura: 445 },
] as const

/**
 * Vida da Paróquia, Movimentos — design novo (Figma, nó 111:2061), desktop 1440, 1281 de altura.
 *
 * Fundo vermelho, 180 de respiro e 31 de margem. Linha com a etiqueta
 * "Movimentos" (12px) e o lema à direita; três cartões (444, 444 e 445, com 22 entre eles) de
 * fotografia de 541 de altura, título de 40px e frase; por baixo, uma régua,
 * a frase de 20px e o botão "Entre em contacto". O desenho não traz hover nem
 * ligações nos cartões.
 */
export default function VidaMovimentos() {
  const t = useTranslations('vida')

  return (
    <section
      id="movimentos"
      data-barra="var(--vermelho)"
      data-barra-tom="escuro"
      className="flex w-full flex-col gap-[calc(80*var(--u))] max-lg:gap-[calc(48*var(--u))] px-[calc(31*var(--u))] py-[calc(180*var(--u))] max-lg:px-[calc(20*var(--u))] max-lg:py-[calc(96*var(--u))] bg-[var(--vermelho)] text-[var(--bege-claro-2)]"
    >
      <Revelar>
        <div className="flex w-full items-center justify-between max-lg:flex-col max-lg:items-start max-lg:gap-[calc(8*var(--u))] whitespace-nowrap text-[length:var(--t-etiqueta)] leading-[1.4]">
          <p>{t('movLabel')}</p>
          <p className="text-right">{t('movLema')}</p>
        </div>
      </Revelar>

      <div className="flex w-full items-start gap-[calc(22*var(--u))] max-lg:flex-col max-lg:gap-[calc(40*var(--u))] md:max-lg:flex-row md:max-lg:gap-[calc(16*var(--u))]">
        {MOVIMENTOS.map((m, k) => (
          <Revelar key={m.chave} atraso={100 + k * 120} className="shrink-0 max-lg:w-full md:max-lg:w-auto md:max-lg:min-w-0 md:max-lg:flex-1">
            <article className="flex flex-col gap-[calc(20*var(--u))] max-lg:w-full!" style={{ width: u(m.largura) }}>
              <div className="relative h-[calc(541*var(--u))] max-lg:h-[calc(300*var(--u))] md:max-lg:h-[calc(240*var(--u))] w-full overflow-hidden rounded-[calc(4*var(--u))]">
                <Image src={m.foto} alt={t(`${m.chave}Alt`)} fill sizes="445px" className="object-cover" />
              </div>
              <div className="flex w-full flex-col gap-[calc(20*var(--u))]">
                <h3 className="font-display text-[length:calc(40*var(--u))] max-lg:text-[length:calc(32*var(--u))] md:max-lg:text-[length:calc(26*var(--u))] leading-[calc(35.2*var(--u))] max-lg:leading-[calc(36*var(--u))] md:max-lg:leading-[calc(30*var(--u))] tracking-[calc(-0.192*var(--u))] font-normal whitespace-nowrap max-lg:whitespace-normal">{t(`${m.chave}Titulo`)}</h3>
                <p className="text-[length:var(--t-corpo)] leading-[1.19]">{t(`${m.chave}Texto`)}</p>
              </div>
            </article>
          </Revelar>
        ))}
      </div>

      <div className="flex w-full flex-col gap-[calc(40*var(--u))]">
        <div aria-hidden="true" className="h-px w-full max-lg:-mx-[calc(20*var(--u))] max-lg:w-[calc(100%+40*var(--u))] bg-[rgba(247,242,238,0.25)]" />
        <Revelar>
          <div className="flex w-full items-center justify-between max-lg:flex-col max-lg:items-start max-lg:gap-[calc(28*var(--u))]">
            <p
              className="w-[calc(542*var(--u))] max-lg:w-full text-[length:var(--t-lead)] max-lg:text-[length:var(--t-corpo)] leading-[1.6] max-lg:leading-[1.5]"
              style={{ fontFamily: 'var(--font-body-light)', textBox: 'trim-both cap alphabetic' } as React.CSSProperties}
            >
              {t('movFrase')}
            </p>
            <Link
              href="/contactos"
              className="group/btn flex items-center gap-[calc(12*var(--u))] rounded-[calc(4*var(--u))] border border-solid border-[rgba(247,242,238,0.45)] px-[calc(29.6*var(--u))] py-[calc(14.4*var(--u))] text-[length:var(--t-etiqueta)] leading-[1.4] whitespace-nowrap transition-[background-color,color,border-color] duration-[400ms] ease-[var(--ease-out)]"
            >
              {t('movCta')}
              <Seta className="group-hover/btn:translate-x-[calc(4*var(--u))]" />
            </Link>
          </div>
        </Revelar>
      </div>
    </section>
  )
}
