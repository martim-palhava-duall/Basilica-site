import type { ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import ListaPainel, { type FotoGaleria } from '@/components/ui/ListaPainel'

const i = (chunks: ReactNode) => (
  <span className="italic font-light" style={{ fontFamily: "'forevs-light', var(--font-display)" }}>{chunks}</span>
)
const min = (s: string) => s.replace(/ ÀS /g, ' às ')

/** Galeria do painel: a mesma dos Sacramentos e dos Grupos Culturais, até haver fotografias próprias */
const GALERIA: FotoGaleria[] = [
  { src: '/celebracoes/galeria-1.jpg', largura: 375 },
  { src: '/celebracoes/galeria-2.jpg', largura: 217 },
  { src: '/celebracoes/sacramento.jpg', largura: 391 },
]

/**
 * Celebrações, Devoções — pedido do cliente: "algo parecido aos sacramentos mas
 * com devoções". Substitui as antigas secções das Primeiras Sextas-Feiras (Figma
 * 111:1710) e dos Primeiros Sábados (111:1742) e acrescenta as duas novenas.
 *
 * Barras com o desenho dos Grupos Culturais da Vida da Paróquia (ListaPainel):
 * ao passar, enchem-se de azul com a fotografia ao centro. Ao clicar abrem o
 * painel com o desenho do dos Sacramentos (Figma 140:1514): introdução, "Quando"
 * (destaques a 32px), "O que é preciso", a galeria e "Pedir informações".
 *
 * Os textos das Sextas e dos Sábados são os das secções antigas; as horas das
 * Sextas vêm do namespace `horarios` (fonte única). Os textos das duas novenas
 * e os de "O que é preciso" são provisórios, para o cliente rever.
 */
export default function CelebracoesDevocoes() {
  const t = useTranslations('celebrar')
  const c = useTranslations('celebracoes')
  const h = useTranslations('horarios')

  // Os horários da fonte única estão em maiúsculas; no painel lêem-se em texto corrente
  const adoracaoTarde = min(h('adoracaoSemHoras').split(' · ')[1] ?? '').toLowerCase()
  const missaTarde = (h('missasSemHoras').split(' · ').pop() ?? '').toLowerCase()

  return (
    <ListaPainel
      id="devocoes"
      label={t('devLabel')}
      titulo={t.rich('devTitulo', { i })}
      cta={{ texto: t('devCta'), href: '/contactos' }}
      saibaMais={t('devSaibaMais')}
      itens={[
        {
          n: '01',
          titulo: t('dev1Titulo'),
          texto: t('dev1Texto'),
          foto: '/celebracoes/sextas.jpg',
          intro: t('sextasCitacao'),
          intro2: t('sextasTexto'),
          quando: [
            { destaque: adoracaoTarde, texto: t('dev1Adoracao') },
            { destaque: missaTarde, texto: t('dev1Missa') },
          ],
          preciso: t('dev1Preciso'),
        },
        {
          n: '02',
          titulo: t('dev2Titulo'),
          texto: t('dev2Texto'),
          foto: '/home/oque-celebrar.jpg',
          intro: t('dev2Intro'),
          intro2: t('sabTexto'),
          // A hora é a da antiga Agenda Paroquial (a do desenho), por confirmar com a paróquia
          quando: [{ destaque: t('agSabadosHora').toLowerCase(), texto: t('dev2QuandoT') }],
          preciso: t('dev2Preciso'),
        },
        {
          n: '03',
          titulo: t('dev3Titulo'),
          texto: t('dev3Texto'),
          foto: '/celebracoes/adoracao.jpg',
          intro: t('dev3Intro'),
          intro2: t('dev3Intro2'),
          quando: [{ destaque: t('dev3QuandoD'), texto: t('dev3QuandoT') }],
          preciso: t('dev3Preciso'),
        },
        {
          n: '04',
          titulo: t('dev4Titulo'),
          texto: t('dev4Texto'),
          foto: '/home/somos-interior.jpg',
          intro: t('dev4Intro'),
          intro2: t('dev4Intro2'),
          quando: [{ destaque: t('dev4QuandoD'), texto: t('dev4QuandoT') }],
          preciso: t('dev4Preciso'),
        },
      ]}
      galeria={GALERIA}
      painelCta={{ texto: t('devPainelCta'), href: '/contactos' }}
      rotulos={{
        fechar: t('devFechar'),
        galeria: t('devGaleria'),
        anterior: t('devAnterior'),
        seguinte: t('devSeguinte'),
        quando: c('painelQuandoHead'),
        preciso: c('painelPrecisoHead'),
      }}
    />
  )
}
