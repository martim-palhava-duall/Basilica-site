import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'
import Seta from '@/components/home/Seta'

/**
 * Basílica e Convento, Visitas marcadas — design novo (Figma, nó 111:1277), desktop 1440.
 *
 * Fundo bege claro 2, 180 de respiro. Título centrado (label + 80px) e, por
 * baixo, uma fotografia grande à esquerda (794×624) e, à direita (518), outra
 * fotografia com o texto e o botão "Pedir marcação". O destino do botão (o
 * pedido de marcação) ainda não existe.
 */
export default function BasilicaVisitas() {
  const t = useTranslations('basilica')

  return (
    <section id="grupos"
      data-barra="var(--bege-claro-2)"
      className="flex flex-col w-full px-[calc(32*var(--u))] py-[calc(180*var(--u))] bg-[var(--bege-claro-2)] text-[var(--azul-escuro)]"
    >
      <div className="flex flex-col gap-[calc(40*var(--u))] items-center w-full">
        <div className="flex flex-col gap-[calc(12*var(--u))] items-center w-[calc(783*var(--u))] text-center">
          <Revelar><p className="text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] tracking-[calc(-0.064*var(--u))]">{t('visitasLabel')}</p></Revelar>
          <Revelar atraso={100}>
            <h2 className="font-display text-[length:calc(80*var(--u))] leading-[1.2] tracking-[calc(-0.576*var(--u))] font-normal">{t('visitasTitulo')}</h2>
          </Revelar>
        </div>

        <div className="flex items-center justify-between w-full">
          <Revelar atraso={100}>
            <div className="relative h-[calc(624*var(--u))] w-[calc(794*var(--u))] rounded-[calc(4*var(--u))] overflow-hidden">
              <Image src="/home/oque-celebrar.jpg" alt={t('visitasAlt1')} fill sizes="794px" className="object-cover" />
            </div>
          </Revelar>

          <div className="flex flex-col gap-[calc(64*var(--u))] w-[calc(518*var(--u))]">
            <Revelar atraso={200}>
              <div className="relative h-[calc(417*var(--u))] w-full rounded-[calc(4*var(--u))] overflow-hidden">
                <Image src="/home/somos-interior.jpg" alt={t('visitasAlt2')} fill sizes="518px" className="object-cover" />
              </div>
            </Revelar>
            <Revelar atraso={300}>
              <div className="flex flex-col gap-[calc(24*var(--u))] items-start w-full">
                <p className="text-[length:calc(16*var(--u))] leading-[1.5]">{t('visitasTexto')}</p>
                <Link
                  href="/contactos"
                  className="group/btn flex items-center gap-[calc(12.01*var(--u))] px-[calc(29.6*var(--u))] py-[calc(14.4*var(--u))] rounded-[calc(6*var(--u))] border border-solid border-[rgba(27,43,57,0.45)] text-[length:max(11px,calc(12*var(--u)))] leading-[1.4] whitespace-nowrap transition-[background-color,color,border-color] duration-[400ms] ease-[var(--ease-out)]"
                >
                  {t('visitasCta')}
                  <Seta className="group-hover/btn:translate-x-[calc(4*var(--u))]" />
                </Link>
              </div>
            </Revelar>
          </div>
        </div>
      </div>
    </section>
  )
}
