import Image from 'next/image'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'

/**
 * Vida da Paróquia, o Doze (Centro de Jovens do Sagrado Coração de Jesus) — desenho
 * do CTI Juvenil (Figma, nó 111:2138), desktop 1440, 1235 de altura.
 *
 * Label e frase grande (64px, 1027 de largura) a 180 do topo; em baixo, a
 * 180 do fim e alinhadas pela base, duas fotografias (329×394 e 445×519, 20
 * entre elas) que terminam na margem direita. Em baixo à esquerda, alinhados
 * pela mesma base, o texto e a tabela "Aberto / Para quem / Onde", como no
 * Terço das Famílias. Os factos (porta 12, horário, atividades) vêm da
 * reportagem da Renascença de 17/03/2026 sobre o centro.
 */
export default function VidaCti() {
  const t = useTranslations('vida')
  const linhas = [
    { rotulo: t('ctiAbertoLabel'), texto: t('ctiAberto'), nota: t('ctiAbertoHoras') },
    { rotulo: t('ctiParaLabel'), texto: t('ctiPara') },
    { rotulo: t('ctiOndeLabel'), texto: t('ctiOnde') },
  ]

  return (
    <section
      id="doze"
      data-barra="var(--bege-claro-2)"
      className="relative h-[calc(1235*var(--u))] w-full max-lg:flex max-lg:h-auto max-lg:flex-col max-lg:gap-[calc(40*var(--u))] max-lg:px-[calc(20*var(--u))] max-lg:py-[calc(96*var(--u))] bg-[var(--bege-claro-2)] text-[var(--azul-escuro)]"
    >
      <div className="absolute left-[calc(32*var(--u))] top-[calc(180*var(--u))] max-lg:static max-lg:order-1 flex w-[calc(1027*var(--u))] max-lg:w-full flex-col gap-[calc(12*var(--u))]">
        <Revelar><p className="text-[length:var(--t-etiqueta)] leading-[1.17] tracking-[calc(-0.064*var(--u))]">{t('ctiLabel')}</p></Revelar>
        <Revelar atraso={100}>
          <p
            className="font-display text-[length:calc(64*var(--u))] max-lg:text-[length:calc(28*var(--u))] leading-[1.2] font-normal"
            style={{ textBox: 'trim-both cap alphabetic' } as React.CSSProperties}
          >
            {t('ctiFrase')}
          </p>
        </Revelar>
      </div>

      <div className="absolute bottom-[calc(180*var(--u))] left-[calc(32*var(--u))] max-lg:static max-lg:order-3 w-[calc(451*var(--u))] max-lg:w-full">
        <Revelar atraso={200}>
          <div className="flex w-full flex-col gap-[calc(40*var(--u))]">
            <p className="text-[length:var(--t-corpo)] leading-[1.5]">{t('ctiTexto')}</p>
            <div className="flex w-full flex-col">
              {linhas.map((l, i) => (
                <div
                  key={l.rotulo}
                  className={`flex w-full items-start gap-[calc(40*var(--u))] border-b border-solid border-[rgba(28,43,57,0.25)] py-[calc(20*var(--u))] ${i === 0 ? 'border-t' : ''}`}
                >
                  <p className="w-[calc(117*var(--u))] shrink-0 self-center text-[length:var(--t-etiqueta)] leading-[1.17] font-bold">{l.rotulo}</p>
                  <div className="flex min-w-px flex-1 flex-col items-end gap-[calc(4*var(--u))] text-right text-[length:var(--t-corpo)] leading-[1.19] font-bold">
                    <p className="w-full">{l.texto}</p>
                    {l.nota && <p className="opacity-60">{l.nota}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Revelar>
      </div>

      <div className="absolute bottom-[calc(180*var(--u))] left-[calc(614*var(--u))] max-lg:static max-lg:order-2 max-lg:w-full flex items-end gap-[calc(20*var(--u))]">
        <Revelar atraso={150}>
          <div className="relative h-[calc(394*var(--u))] w-[calc(329*var(--u))] max-lg:h-[calc(200*var(--u))] max-lg:w-[calc(150*var(--u))] overflow-hidden rounded-[calc(4*var(--u))]">
            <Image src="/vida/cti-1.jpg" alt={t('ctiAlt1')} fill sizes="329px" className="object-cover" />
          </div>
        </Revelar>
        <Revelar atraso={270}>
          <div className="relative h-[calc(519*var(--u))] w-[calc(445*var(--u))] max-lg:h-[calc(260*var(--u))] max-lg:w-[calc(180*var(--u))] overflow-hidden rounded-[calc(4*var(--u))]">
            <Image src="/vida/cti-2.jpg" alt={t('ctiAlt2')} fill sizes="445px" className="object-cover" />
          </div>
        </Revelar>
      </div>
    </section>
  )
}
