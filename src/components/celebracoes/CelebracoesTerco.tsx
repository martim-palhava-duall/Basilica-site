import Image from 'next/image'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'

const TRIM = { textBox: 'trim-both cap alphabetic' } as React.CSSProperties

/**
 * Celebrações, Terço das Famílias — design novo (Figma, nó 111:1761), desktop 1440, 1235 de altura.
 *
 * Fundo bege escuro. Em cima à esquerda o label e a citação a 64px (três
 * linhas, com as quebras do desenho); em baixo à esquerda o texto e a tabela "Quando / Onde"; em baixo à
 * direita duas fotografias (329×394 e 445×519) alinhadas pela base, a 180 do
 * fundo. Posições absolutas, como no desenho.
 *
 * O dia vem das mensagens e a hora e o local lêem-se de `celebracoes` e
 * `horarios` (fonte única): "DIA 13 DE CADA MÊS · 20H00" dá a hora, e a Igreja
 * da Lapa vem de `horarios.lapaTitle`.
 */
export default function CelebracoesTerco() {
  const t = useTranslations('celebrar')
  const c = useTranslations('celebracoes')
  const h = useTranslations('horarios')
  const hora = c('tercoQuando').split(' · ')[1] ?? ''

  return (
    <section
      id="terco"
      data-barra="var(--bege-escuro)"
      className="relative h-[calc(1235*var(--u))] w-full max-lg:flex max-lg:h-auto max-lg:flex-col max-lg:gap-[calc(40*var(--u))] max-lg:px-[calc(20*var(--u))] max-lg:py-[calc(96*var(--u))] bg-[var(--bege-escuro)] text-[var(--azul-escuro)]"
    >
      <div className="absolute left-[calc(32*var(--u))] top-[calc(180*var(--u))] max-lg:static max-lg:order-1 flex w-[calc(1027*var(--u))] max-lg:w-full flex-col gap-[calc(12*var(--u))]">
        <Revelar><p className="text-[length:var(--t-etiqueta)] leading-[1.17] tracking-[calc(-0.064*var(--u))]">{t('tercoLabel')}</p></Revelar>
        <Revelar atraso={100}>
          <h2 className="font-display text-[length:calc(64*var(--u))] max-lg:text-[length:calc(28*var(--u))] leading-[1.2] font-normal" style={TRIM}>{t.rich('tercoCitacao', { br: () => <>{' '}<br className="max-lg:hidden" /></> })}</h2>
        </Revelar>
      </div>

      <div className="absolute bottom-[calc(180*var(--u))] left-[calc(614*var(--u))] max-lg:static max-lg:order-2 max-lg:w-full flex items-end gap-[calc(20*var(--u))]">
        <Revelar atraso={150}>
          <div className="relative h-[calc(394*var(--u))] w-[calc(329*var(--u))] max-lg:h-[calc(200*var(--u))] max-lg:w-[calc(150*var(--u))] overflow-hidden rounded-[calc(4*var(--u))]">
            <Image src="/basilica/duvida.jpg" alt={t('tercoAlt1')} fill sizes="329px" className="object-cover" />
          </div>
        </Revelar>
        <Revelar atraso={250}>
          <div className="relative h-[calc(519*var(--u))] w-[calc(445*var(--u))] max-lg:h-[calc(260*var(--u))] max-lg:w-[calc(180*var(--u))] overflow-hidden rounded-[calc(4*var(--u))]">
            <Image src="/celebracoes/adoracao.jpg" alt={t('tercoAlt2')} fill sizes="445px" className="object-cover" />
          </div>
        </Revelar>
      </div>

      <div className="absolute left-[calc(32*var(--u))] top-[calc(811*var(--u))] max-lg:static max-lg:order-3 flex w-[calc(329*var(--u))] max-lg:w-full flex-col gap-[calc(40*var(--u))]">
        <Revelar atraso={200}>
          <div className="flex w-full flex-col gap-[calc(40*var(--u))]">
            <p className="text-[length:var(--t-corpo)] leading-[1.5]">{t('tercoTexto')}</p>
            <div className="flex w-full flex-col">
              <div className="flex w-full items-start gap-[calc(40*var(--u))] max-lg:gap-[calc(20*var(--u))] border-y border-solid border-[rgba(28,43,57,0.25)] py-[calc(20*var(--u))]">
                <p className="w-[calc(117*var(--u))] shrink-0 self-center text-[length:var(--t-etiqueta)] leading-[1.17] font-bold">{t('tercoQuandoLabel')}</p>
                <div className="flex w-[calc(172*var(--u))] max-lg:w-auto max-lg:min-w-px max-lg:flex-1 flex-col items-end gap-[calc(4*var(--u))] text-right text-[length:var(--t-corpo)] leading-[1.19] font-bold">
                  <p className="w-full">{t('tercoDia')}</p>
                  <p className="opacity-60">{hora}</p>
                </div>
              </div>
              <div className="flex w-full items-start gap-[calc(40*var(--u))] max-lg:gap-[calc(20*var(--u))] border-b border-solid border-[rgba(28,43,57,0.25)] py-[calc(20*var(--u))]">
                <p className="w-[calc(117*var(--u))] shrink-0 self-center text-[length:var(--t-etiqueta)] leading-[1.17] font-bold">{t('tercoOndeLabel')}</p>
                <p className="w-[calc(172*var(--u))] max-lg:w-auto max-lg:min-w-px max-lg:flex-1 text-right text-[length:var(--t-corpo)] leading-[1.19] font-bold">{h('lapaTitle')}</p>
              </div>
            </div>
          </div>
        </Revelar>
      </div>
    </section>
  )
}
