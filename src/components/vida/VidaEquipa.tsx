import Image from 'next/image'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'

/** Fotografia provisória: o desenho usa a mesma em todos até haver os retratos. */
const FOTO = '/sobre/equipa-paroco.jpg'

const VIGARIOS = [
  { chave: 'eq1Papel', nome: 'Pe. Miguel Teixeira Duarte' },
  { chave: 'eq2Papel', nome: 'Pe. Paulino Mulamba' },
  { chave: 'eq3Papel', nome: 'Pe. Miguel Vasconcelos' },
  { chave: 'eq4Papel', nome: 'Pe. Ramiro da Cruz Ferreira' },
  { chave: 'eq5Papel', nome: 'Pe. Bernardo Magalhães' },
] as const

/**
 * Vida da Paróquia, Equipa Pastoral — design novo (Figma, nó 224:67), desktop 1440.
 * Passou da página Sobre nós para esta; os textos continuam no namespace `sobre`.
 *
 * Título centrado com subtítulo; o pároco com retrato (562×535) e a biografia
 * em duas colunas de 329; uma régua; e a grelha de três colunas dos vigários e
 * colaboradores (retrato de 321 de altura, função e nome).
 */
export default function VidaEquipa() {
  const t = useTranslations('sobre')

  return (
    <section id="equipa"
      data-barra="var(--bege-claro-2)"
      className="flex flex-col gap-[calc(80*var(--u))] max-lg:gap-[calc(48*var(--u))] w-full px-[calc(32*var(--u))] py-[calc(180*var(--u))] max-lg:px-[calc(20*var(--u))] max-lg:py-[calc(96*var(--u))] bg-[var(--bege-claro-2)] text-[var(--azul-escuro)]"
    >
      {/* ── Cabeçalho ── */}
      <div className="flex flex-col gap-[calc(24*var(--u))] max-lg:gap-[calc(16*var(--u))] items-center w-full text-center">
        <Revelar>
          <h2 className="font-display text-[length:calc(80*var(--u))] max-lg:text-[length:calc(40*var(--u))] leading-[calc(96*var(--u))] max-lg:leading-[calc(44*var(--u))] tracking-[calc(0.96*var(--u))] max-lg:tracking-normal font-normal">{t('eqTitulo')}</h2>
        </Revelar>
        <Revelar atraso={100}>
          <p className="w-[calc(510*var(--u))] max-lg:w-full font-[family-name:var(--font-body-light)] text-[length:calc(20*var(--u))] max-lg:text-[length:calc(16*var(--u))] leading-[1.4]">{t('eqSub')}</p>
        </Revelar>
      </div>

      <div className="flex flex-col gap-[calc(64*var(--u))] max-lg:gap-[calc(40*var(--u))] w-full">
        {/* ── Pároco ── */}
        <div className="flex items-center gap-[calc(64*var(--u))] max-lg:flex-col max-lg:items-stretch max-lg:gap-[calc(28*var(--u))] w-full">
          <Revelar>
            <div className="relative h-[calc(535*var(--u))] w-[calc(562*var(--u))] max-lg:h-[calc(380*var(--u))] max-lg:w-full shrink-0 rounded-[calc(4*var(--u))] overflow-hidden">
              <Image src={FOTO} alt="Monsenhor Duarte da Cunha" fill sizes="562px" className="object-cover" />
            </div>
          </Revelar>
          <Revelar atraso={150}>
            <div className="flex flex-col gap-[calc(40*var(--u))] max-lg:gap-[calc(24*var(--u))] w-[calc(678*var(--u))] max-lg:w-full">
              <div className="flex flex-col gap-[calc(20*var(--u))] w-full">
                <p className="text-[length:calc(16*var(--u))] leading-[calc(19*var(--u))]">{t('eqParocoPapel')}</p>
                <h3 className="font-display text-[length:calc(40*var(--u))] max-lg:text-[length:calc(32*var(--u))] leading-[calc(35.2*var(--u))] max-lg:leading-[calc(36*var(--u))] tracking-[calc(-0.192*var(--u))] font-normal whitespace-nowrap max-lg:whitespace-normal">
                  Monsenhor Duarte da Cunha
                </h3>
              </div>
              <div className="flex gap-[calc(20*var(--u))] max-lg:flex-col w-full text-[length:calc(16*var(--u))] leading-[1.5] text-[rgba(29,35,40,0.6)]">
                <div className="flex flex-col gap-[calc(20*var(--u))] w-[calc(329*var(--u))] max-lg:w-full">
                  <p>{t('eqBio1')}</p>
                  <p>{t('eqBio2')}</p>
                </div>
                <div className="flex flex-col gap-[calc(20*var(--u))] w-[calc(329*var(--u))] max-lg:w-full">
                  <p>{t('eqBio3')}</p>
                  <p>{t('eqBio4')}</p>
                </div>
              </div>
            </div>
          </Revelar>
        </div>

        {/* ── Vigários e colaboradores ── */}
        <div className="flex flex-col gap-[calc(80*var(--u))] max-lg:gap-[calc(40*var(--u))] w-full">
          <div aria-hidden="true" className="h-px w-full max-lg:-mx-[calc(20*var(--u))] max-lg:w-[calc(100%+40*var(--u))] bg-[rgba(27,43,57,0.07)]" />
          <div className="flex flex-col gap-[calc(20*var(--u))] w-full">
            <Revelar><h3 className="font-display text-[length:calc(24*var(--u))] leading-[calc(35.2*var(--u))] tracking-[calc(-0.192*var(--u))] font-normal">{t('eqVigarios')}</h3></Revelar>
            <div className="grid grid-cols-3 max-lg:grid-cols-2 gap-x-[calc(20*var(--u))] max-lg:gap-x-[calc(16*var(--u))] gap-y-[calc(64*var(--u))] max-lg:gap-y-[calc(32*var(--u))] w-full">
              {VIGARIOS.map((v, i) => (
                <Revelar key={v.chave} atraso={(i % 3) * 120}>
                  <div className="flex flex-col gap-[calc(20*var(--u))] w-full">
                    <div className="relative h-[calc(321*var(--u))] max-lg:h-[calc(200*var(--u))] w-full rounded-[calc(4*var(--u))] overflow-hidden">
                      <Image src={FOTO} alt={v.nome} fill sizes="445px" className="object-cover" />
                    </div>
                    <div className="flex flex-col gap-[calc(12*var(--u))] max-lg:gap-[calc(6*var(--u))] w-full">
                      <p className="text-[length:calc(16*var(--u))] max-lg:text-[length:calc(13*var(--u))] leading-[calc(19*var(--u))] max-lg:leading-[calc(16*var(--u))] max-lg:opacity-60">{t(v.chave)}</p>
                      <h4 className="font-display text-[length:calc(40*var(--u))] max-lg:text-[length:calc(22*var(--u))] leading-[calc(35.2*var(--u))] max-lg:leading-[calc(26*var(--u))] tracking-[calc(-0.192*var(--u))] font-normal whitespace-nowrap max-lg:whitespace-normal">{v.nome}</h4>
                    </div>
                  </div>
                </Revelar>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
