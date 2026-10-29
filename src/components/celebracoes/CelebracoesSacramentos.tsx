import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'
import SacramentosLista, { type Sacramento } from '@/components/celebracoes/SacramentosLista'

/**
 * Celebrações, Sacramentos — design novo (Figma, nó 111:1534; painel 140:1514), desktop 1440.
 *
 * Fundo bege claro, 180 de respiro. Título e lema, régua e, por baixo, a lista
 * dos oito sacramentos com a fotografia fixa e o painel de "Saiba mais" (ver
 * SacramentosLista). Os textos do painel vêm das mensagens já escritas para
 * cada sacramento; os horários lêem-se do namespace `horarios` (fonte única).
 */
export default function CelebracoesSacramentos() {
  const t = useTranslations('celebrar')
  const c = useTranslations('celebracoes')
  const h = useTranslations('horarios')

  // Os horários da fonte única estão em maiúsculas; no painel lêem-se em texto
  // corrente, por isso passam a minúsculas só aqui.
  const min = (x: string) => x.toLowerCase()
  const noCartorio = [{
    horas: c('porMarcacao'),
    dias: `${h('cartorioHead')} · ${min(h('cartorioDias'))}, ${min(h('cartorioHoras'))}`,
  }]
  const quando: Record<number, { horas: string; dias: string }[]> = {
    2: [{ horas: min(h('adoracaoSemHoras')), dias: h('adoracaoSemDias') }],
    4: [
      { horas: min(h('confissoesDomHoras')), dias: h('confissoesDomDias') },
      { horas: min(h('confissoesSemHoras')), dias: h('confissoesSemDias') },
    ],
    5: [{ horas: c('sac5Quando'), dias: c('sac5QuandoDesc') }],
    8: [{ horas: c('sac8Quando'), dias: c('sac8QuandoDesc') }],
  }

  // Fotografias provisórias, uma por sacramento, escolhidas entre as do site: trocar por
  // as da paróquia quando as houver (basta mudar o caminho aqui)
  const FOTOS = [
    '/celebracoes/sacramento.jpg', // Batismo
    '/images/destaque-celebracao.jpg', // Adoração
    '/images/figma-liturgy.jpg', // Confirmação
    '/basilica/conhecer-sacristia.jpg', // Confissão
    '/home/obra-recolhimento.jpg', // Unção dos Doentes
    '/sobre/partilha-7.jpg', // Matrimónio
    '/basilica/duvida.jpg', // Ordem
    '/celebracoes/adoracao.jpg', // Funerais
  ]
  const items: Sacramento[] = Array.from({ length: 8 }, (_, i) => ({
    n: String(i + 1).padStart(2, '0'),
    titulo: c(`sac${i + 1}Title`),
    desc: c(`sac${i + 1}Desc`),
    longo: c(`sac${i + 1}Longo`),
    longo2: c(`sac${i + 1}Longo2`),
    preciso: c(`sac${i + 1}Preciso`),
    quando: quando[i + 1] ?? noCartorio,
    foto: FOTOS[i],
  }))

  return (
    <section id="sacramentos"
      data-barra="var(--bege-claro)"
      className="flex w-full px-[calc(32*var(--u))] py-[calc(180*var(--u))] max-lg:px-[calc(20*var(--u))] max-lg:py-[calc(96*var(--u))] bg-[var(--bege-claro)] text-[var(--azul-escuro)]"
    >
      <div className="flex flex-col gap-[calc(64*var(--u))] max-lg:gap-[calc(32*var(--u))] w-full">
        <div className="flex flex-col gap-[calc(35*var(--u))] max-lg:gap-[calc(24*var(--u))] w-full">
          <div className="flex items-start justify-between max-lg:flex-col max-lg:gap-[calc(16*var(--u))] w-full">
            <Revelar>
              <h2
                className="font-display text-[length:calc(80*var(--u))] max-lg:text-[length:calc(40*var(--u))] leading-[calc(96*var(--u))] max-lg:leading-[calc(44*var(--u))] tracking-[calc(0.96*var(--u))] max-lg:tracking-normal font-normal whitespace-nowrap"
                style={{ textBox: 'trim-both cap alphabetic' } as React.CSSProperties}
              >
                {t('sacTitulo')}
              </h2>
            </Revelar>
            <p className="w-[calc(256*var(--u))] max-lg:w-full text-[length:var(--t-corpo)] leading-[1.4] opacity-40">{t('sacLema')}</p>
          </div>
          <div aria-hidden="true" className="h-px w-full max-lg:-mx-[calc(20*var(--u))] max-lg:w-[calc(100%+40*var(--u))] border-t border-solid border-[var(--azul-escuro)] opacity-25" />
        </div>

        <SacramentosLista
          items={items}
          textos={{
            saibaMais: c('sacSaibaMais'),
            fechar: c('painelFechar'),
            quando: c('painelQuandoHead'),
            preciso: c('painelPrecisoHead'),
            galeria: c('painelGaleriaHead'),
            cta: c('painelCta'),
            anterior: 'Fotografia anterior',
            seguinte: 'Fotografia seguinte',
          }}
        />
      </div>
    </section>
  )
}
