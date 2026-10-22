/**
 * Fonte única das notícias de exemplo — CONTEÚDO PROVISÓRIO até haver notícias
 * reais (ou um CMS, que substitui este ficheiro).
 *
 * Cada notícia liga o cartão ao seu detalhe (/blog/<slug>): a mesma fotografia
 * e a mesma categoria aparecem nos dois. As nove primeiras são as da grelha
 * das Notícias (e as 1, 4 e 8 também as dos Destaques); as duas últimas são o
 * "Em destaque" das Notícias e o cartão do evento no hero da homepage.
 *
 * Os textos ficam nas mensagens: `titulo` e `etiqueta` são chaves (namespace
 * indicado em `ns`); sem `titulo`, a notícia usa o título de teste dos cartões.
 */
export type Noticia = {
  slug: string
  foto: string
  /** chave do filtro das Notícias a que pertence (só as da grelha) */
  categoria?: 'noticias' | 'eventos' | 'jovens' | 'visitas' | 'obra' | 'celebracoes'
  /** recorte da fotografia no cartão da grelha (vem assim do Figma) */
  recorte?: { left: number; top: number; width: number; height: number }
  /** enquadramento da fotografia na capa do detalhe (object-position) */
  capaPosicao?: string
  /** título e etiqueta próprios: [namespace, chave] */
  titulo?: [string, string]
  etiqueta?: [string, string]
}

export const NOTICIAS: Noticia[] = [
  { slug: 'noticia-1', foto: '/home/dest-1.jpg', categoria: 'noticias' },
  { slug: 'noticia-2', foto: '/celebracoes/adoracao.jpg', categoria: 'eventos' },
  { slug: 'noticia-3', foto: '/home/donativos.jpg', categoria: 'jovens' },
  // a estátua vem recortada no Figma (522×783, deslocada), como no cartão dos Destaques
  { slug: 'noticia-4', foto: '/home/dest-2.jpg', categoria: 'visitas', recorte: { left: -36, top: -58.31, width: 522, height: 783 }, capaPosicao: '50% 25%' },
  { slug: 'noticia-5', foto: '/home/oque-ajudar.jpg', categoria: 'obra' },
  { slug: 'noticia-6', foto: '/home/missao-thumb.jpg', categoria: 'celebracoes' },
  { slug: 'noticia-7', foto: '/celebracoes/sextas.jpg', categoria: 'noticias' },
  { slug: 'noticia-8', foto: '/home/dest-3.jpg', categoria: 'eventos' },
  { slug: 'noticia-9', foto: '/noticias/fachada.jpg', categoria: 'jovens' },
  { slug: 'ao-servico-de-quem-mais-precisa', foto: '/home/dest-3.jpg', titulo: ['noticias', 'destaqueTitulo'], etiqueta: ['noticias', 'cNoticias'] },
  { slug: 'celebracao-da-missa-do-galo', foto: '/home/hero-evento.jpg', titulo: ['noticia', 'titulo'], etiqueta: ['noticia', 'label'] },
]

/** As da grelha das Notícias, pela ordem do desenho */
export const NOTICIAS_GRELHA = NOTICIAS.filter((n) => n.categoria)

export function getNoticia(slug: string): Noticia | undefined {
  return NOTICIAS.find((n) => n.slug === slug)
}

/** Chave da categoria (filtro) na etiqueta do cartão: noticias → cNoticias */
export const chaveCategoria = (c: NonNullable<Noticia['categoria']>) => `c${c[0].toUpperCase()}${c.slice(1)}`
