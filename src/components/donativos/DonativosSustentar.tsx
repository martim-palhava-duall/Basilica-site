import Image from 'next/image'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'

/**
 * Donativos, Sustentar — design novo (Figma, nó 111:2371), desktop 1440, 900 de altura.
 *
 * À esquerda a fotografia da nave (710×900), composta como no Figma: um fundo
 * e, por cima, a imagem maior, deslocada. À direita, num painel vermelho, o
 * texto a 40px, a citação em itálico leve, e em baixo uma miniatura com a
 * legenda (a mesma da Missão da homepage). Posições absolutas, como no desenho.
 */
export default function DonativosSustentar() {
  const t = useTranslations('donar')

  return (
    <section id="sustentar" data-barra="var(--vermelho)" data-barra-tom="escuro" className="flex h-[calc(900*var(--u))] w-full items-start">
      {/* ── Fotografia ── */}
      <div className="relative h-[calc(900*var(--u))] w-[calc(710*var(--u))] shrink-0 overflow-hidden">
        <Image src="/home/oque-rezar-fundo.jpg" alt="" fill sizes="710px" className="object-cover" />
        <div className="absolute -bottom-[calc(15*var(--u))] -left-[calc(20*var(--u))] h-[calc(1118*var(--u))] w-[calc(745*var(--u))] overflow-hidden rounded-[calc(4*var(--u))]">
          <Image src="/home/somos-interior.jpg" alt={t('susFotoAlt')} fill sizes="745px" className="object-cover" />
        </div>
      </div>

      {/* ── Painel ── */}
      <div className="relative h-[calc(900*var(--u))] min-w-px flex-1 bg-[var(--vermelho)] text-[var(--bege-claro-2)]">
        <div className="absolute left-[calc(32*var(--u))] top-[calc(140*var(--u))] flex w-[calc(626*var(--u))] flex-col gap-[calc(12*var(--u))] px-[calc(32*var(--u))]">
          <Revelar><p className="text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] opacity-75">{t('susLabel')}</p></Revelar>
          <Revelar atraso={100}>
            <p className="w-[calc(517*var(--u))] pb-[calc(0.8*var(--u))] font-display text-[length:calc(40*var(--u))] leading-[1.2]">{t('susTexto')}</p>
          </Revelar>
        </div>

        <div className="absolute left-[calc(339*var(--u))] right-[calc(64*var(--u))] top-[calc(406.8*var(--u))]">
          <Revelar atraso={250}>
            <p
              className="pb-[calc(0.8*var(--u))] italic text-[length:calc(40*var(--u))] leading-[1.2] text-[var(--bege-escuro-2)]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
            >
              {t('susCitacao')}
            </p>
          </Revelar>
        </div>

        <div className="absolute left-[calc(32*var(--u))] right-[calc(72*var(--u))] top-[calc(640*var(--u))] pr-[calc(32*var(--u))] pt-[calc(48*var(--u))]">
          <Revelar atraso={350}>
            <div className="flex w-full items-center gap-[calc(16*var(--u))] px-[calc(32*var(--u))]">
              <div className="relative size-[calc(72*var(--u))] shrink-0 overflow-hidden rounded-[calc(4*var(--u))]">
                <div className="absolute top-0 h-full overflow-hidden" style={{ left: '-38.95%', width: '177.9%' }}>
                  <Image src="/home/missao-thumb-fundo.jpg" alt="" fill sizes="128px" className="object-cover" />
                </div>
                <div className="absolute h-[calc(101*var(--u))] w-[calc(152*var(--u))]" style={{ left: '50%', top: 'calc(50% + 0.5px)', transform: 'translate(-50%, -50%)' }}>
                  <Image src="/home/missao-thumb.jpg" alt="" fill sizes="152px" className="object-cover" />
                </div>
              </div>
              <p className="max-w-[calc(224*var(--u))] whitespace-nowrap pr-[calc(32.25*var(--u))] text-[length:max(11px,calc(12*var(--u)))] leading-[calc(19.2*var(--u))] opacity-85">
                {t('susLegenda1')}
                <br />
                {t('susLegenda2')}
              </p>
            </div>
          </Revelar>
        </div>
      </div>
    </section>
  )
}
