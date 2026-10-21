import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'
import Seta from '@/components/home/Seta'
import { u } from '@/lib/escala'

const TRIM = { textBox: 'trim-both cap alphabetic' } as React.CSSProperties

const EXPERIENCIAS = [
  { chave: 'exp1', largura: 444, foto: '/basilica/experiencia-cupula.jpg' },
  { chave: 'exp2', largura: 444, foto: '/home/dest-2.jpg' },
  { chave: 'exp3', largura: 445, foto: '/home/dest-3.jpg' },
] as const

/**
 * Basílica e Convento, Experiências — design novo (Figma, nó 111:1293), desktop 1440.
 *
 * (O cabeçalho tem 96 de altura mínima: o desenho leva uma linha em branco no
 * fim do texto da direita.)
 * Fundo bege escuro 2, 31 de margem lateral e 180 de respiro. Cabeçalho (label,
 * título de 80px e texto à direita), três cartões (444/444/445, 22 entre eles)
 * com fotografia de 541, título e descrição, e uma régua com o aviso e o botão
 * "Ver mais e reservar". O destino do botão é a plataforma de reservas, que o
 * desenho ainda não nomeia ("xxx").
 */
export default function BasilicaExperiencias() {
  const t = useTranslations('basilica')

  return (
    <section id="experiencias"
      data-barra="var(--bege-escuro-2)"
      className="flex flex-col w-full px-[calc(31*var(--u))] py-[calc(180*var(--u))] bg-[var(--bege-escuro-2)] text-[var(--azul-escuro)]"
    >
      <div className="flex flex-col gap-[calc(80*var(--u))] w-full">
        <div className="flex flex-col gap-[calc(33*var(--u))] w-full">
          <Revelar><p className="text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] tracking-[calc(-0.064*var(--u))]">{t('expLabel')}</p></Revelar>
          <div className="flex items-start justify-between w-full min-h-[calc(96*var(--u))]">
            <Revelar atraso={100}>
              <h2 className="font-display text-[length:calc(80*var(--u))] leading-[1.2] tracking-[calc(-0.576*var(--u))] font-normal w-[calc(783*var(--u))]" style={TRIM}>
                {t('expTitulo')}
              </h2>
            </Revelar>
            <Revelar atraso={200}>
              <p className="w-[calc(329*var(--u))] text-[length:calc(16*var(--u))] leading-[1.5]">{t('expSub')}</p>
            </Revelar>
          </div>
        </div>

        <div className="flex items-start gap-[calc(22*var(--u))] w-full">
          {EXPERIENCIAS.map((e, i) => (
            <Revelar key={e.chave} atraso={100 + i * 120}>
              <div className="flex flex-col gap-[calc(20*var(--u))]" style={{ width: u(e.largura) }}>
                <div className="relative h-[calc(541*var(--u))] w-full rounded-[calc(4*var(--u))] overflow-hidden">
                  <Image src={e.foto} alt="" fill sizes="445px" className="object-cover" />
                </div>
                <div className="flex flex-col gap-[calc(20*var(--u))] w-full">
                  <h3 className="font-display text-[length:calc(40*var(--u))] leading-[calc(35.2*var(--u))] tracking-[calc(-0.192*var(--u))] font-normal whitespace-nowrap">
                    {t(`${e.chave}Titulo`)}
                  </h3>
                  <p className="text-[length:calc(16*var(--u))] leading-[calc(19*var(--u))]">{t(`${e.chave}Texto`)}</p>
                </div>
              </div>
            </Revelar>
          ))}
        </div>

        <Revelar>
          <div className="flex flex-col gap-[calc(40*var(--u))] w-full">
            <div aria-hidden="true" className="h-px w-full border-t border-solid border-[var(--azul-escuro)] opacity-25" />
            <div className="flex items-center justify-between w-full">
              <p className="w-[calc(542*var(--u))] font-[family-name:var(--font-body-light)] text-[length:calc(20*var(--u))] leading-[calc(32*var(--u))]" style={TRIM}>
                {t('expRodape1')}
                <br />
                {t('expRodape2')}
              </p>
              <Link
                href="#"
                className="group/btn flex items-center gap-[calc(12.01*var(--u))] px-[calc(29.6*var(--u))] py-[calc(14.4*var(--u))] rounded-[calc(4*var(--u))] bg-[var(--azul-escuro)] text-[length:max(11px,calc(12*var(--u)))] leading-[1.4] whitespace-nowrap text-[var(--bege-claro-2)] transition-[background-color] duration-[400ms] ease-[var(--ease-out)]"
              >
                {t('expCta')}
                <Seta className="group-hover/btn:translate-x-[calc(4*var(--u))]" />
              </Link>
            </div>
          </div>
        </Revelar>
      </div>
    </section>
  )
}
