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
 * Mesmo desenho dos Grupos Culturais da Vida da Paróquia (ListaPainel), com o
 * hover da lista dos Sacramentos: a barra sob o rato fica a cheio, as outras
 * recuam para 30% e a fotografia aparece ao centro; ao clicar, abrem o painel com a introdução, "Quando" (e "Programa" nas
 * Primeiras Sextas), a galeria e "Pedir informações".
 *
 * Os textos das Sextas e dos Sábados são os das secções antigas; as horas do
 * programa das Sextas vêm do namespace `horarios` (fonte única). Os textos das
 * duas novenas são provisórios, para o cliente rever.
 */
export default function CelebracoesDevocoes() {
  const t = useTranslations('celebrar')
  const h = useTranslations('horarios')

  const adoracaoTarde = min(h('adoracaoSemHoras').split(' · ')[1] ?? '')
  const missaTarde = h('missasSemHoras').split(' · ').pop() ?? ''
  const quando = t('sextasQuandoLabel')

  return (
    <ListaPainel
      id="devocoes"
      hover="realce"
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
          blocos: [
            { titulo: quando, texto: t('sextasQuando') },
            { titulo: t('sextasProgramaLabel'), texto: `${t('sextasPrograma')}, ${adoracaoTarde}. Santa Missa às ${missaTarde}.` },
          ],
        },
        {
          n: '02',
          titulo: t('dev2Titulo'),
          texto: t('dev2Texto'),
          foto: '/home/oque-celebrar.jpg',
          intro: t('dev2Intro'),
          intro2: t('sabTexto'),
          blocos: [{ titulo: quando, texto: t('sabQuando') }],
        },
        {
          n: '03',
          titulo: t('dev3Titulo'),
          texto: t('dev3Texto'),
          foto: '/celebracoes/adoracao.jpg',
          intro: t('dev3Intro'),
          intro2: t('dev3Intro2'),
          blocos: [{ titulo: quando, texto: t('dev3Quando') }],
        },
        {
          n: '04',
          titulo: t('dev4Titulo'),
          texto: t('dev4Texto'),
          foto: '/home/somos-interior.jpg',
          intro: t('dev4Intro'),
          intro2: t('dev4Intro2'),
          blocos: [{ titulo: quando, texto: t('dev4Quando') }],
        },
      ]}
      galeria={GALERIA}
      painelCta={{ texto: t('devPainelCta'), href: '/contactos' }}
      rotulos={{ fechar: t('devFechar'), galeria: t('devGaleria'), anterior: t('devAnterior'), seguinte: t('devSeguinte') }}
    />
  )
}
