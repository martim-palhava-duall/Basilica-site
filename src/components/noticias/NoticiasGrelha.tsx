import { useTranslations } from 'next-intl'
import NoticiasFiltroGrelha, { type Cartao } from '@/components/noticias/NoticiasFiltroGrelha'

/**
 * Fotografias dos nove cartões, na ordem do desenho (provisórias, de teste), e
 * a categoria de cada um para os filtros — a distribuição é de teste até haver
 * notícias reais.
 */
const CARTOES: Cartao[] = [
  { slug: 'noticia-1', foto: '/home/dest-1.jpg', categoria: 'noticias' },
  { slug: 'noticia-2', foto: '/celebracoes/adoracao.jpg', categoria: 'eventos' },
  { slug: 'noticia-3', foto: '/home/donativos.jpg', categoria: 'jovens' },
  // a estátua vem recortada no Figma (522×783, deslocada), como no cartão dos Destaques
  { slug: 'noticia-4', foto: '/home/dest-2.jpg', categoria: 'visitas', recorte: { left: -36, top: -58.31, width: 522, height: 783 } },
  { slug: 'noticia-5', foto: '/home/oque-ajudar.jpg', categoria: 'obra' },
  { slug: 'noticia-6', foto: '/home/missao-thumb.jpg', categoria: 'celebracoes' },
  { slug: 'noticia-7', foto: '/celebracoes/sextas.jpg', categoria: 'noticias' },
  { slug: 'noticia-8', foto: '/home/dest-3.jpg', categoria: 'eventos' },
  { slug: 'noticia-9', foto: '/noticias/fachada.jpg', categoria: 'jovens' },
]

/**
 * Notícias, grelha — design novo (Figma, nó 111:2695), desktop 1440.
 *
 * Fundo bege claro 2, 120 de respiro. Nove cartões em três colunas (21 de
 * intervalo, 48 entre filas): fotografia de 296 de altura, "Categoria · data" e
 * título de 32px, tudo texto de teste. Em baixo, o botão "Ver mais". Acima da
 * grelha, no espaço de 120, ficam os filtros por tipo de notícia (ver
 * NoticiasFiltroGrelha). Ao passar o rato num cartão aparece uma seta junto ao
 * título (sem zoom na fotografia).
 */
export default function NoticiasGrelha() {
  const t = useTranslations('noticias')

  const filtros = [
    { chave: 'todos', label: t('fTodos') },
    { chave: 'noticias', label: t('fNoticias') },
    { chave: 'eventos', label: t('fEventos') },
    { chave: 'jovens', label: t('fJovens') },
    { chave: 'visitas', label: t('fVisitas') },
    { chave: 'obra', label: t('fObra') },
    { chave: 'celebracoes', label: t('fCelebracoes') },
  ]
  const categorias = {
    noticias: t('cNoticias'),
    eventos: t('cEventos'),
    jovens: t('cJovens'),
    visitas: t('cVisitas'),
    obra: t('cObra'),
    celebracoes: t('cCelebracoes'),
  }

  return (
    <section
      id="noticias"
      data-barra="var(--bege-claro-2)"
      className="relative flex w-full flex-col items-center gap-[calc(80*var(--u))] px-[calc(32*var(--u))] py-[calc(120*var(--u))] bg-[var(--bege-claro-2)] text-[var(--azul-escuro)]"
    >
      <NoticiasFiltroGrelha
        cartoes={CARTOES}
        filtros={filtros}
        categorias={categorias}
        tituloCartao={t('tituloCartao')}
        meta="{categoria} · {data}"
        data={t('data')}
        verMais={t('verMais')}
        filtrosAria={t('filtrosAria')}
      />
    </section>
  )
}
