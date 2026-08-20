/**
 * Fonte única das publicações do blog.
 *
 * CONTEÚDO PROVISÓRIO — os sete posts são exemplos, não conteúdo real da
 * paróquia. Aqui vive só o que não se traduz (ordem, slug, imagem); os
 * títulos, categorias e datas estão no namespace `blog` das mensagens, por
 * número.
 *
 * Quando houver CMS é este ficheiro que desaparece: a listagem e o detalhe
 * passam a receber os mesmos campos de uma consulta, e as páginas ficam como
 * estão. Os slugs são fixos e em português por serem o endereço público —
 * traduzi-los partiria as ligações já partilhadas.
 */
export type Post = {
  /** número que liga às chaves de mensagens: post1Titulo, post1Cat, ... */
  n: number
  slug: string
  src: string
}

export const POSTS: Post[] = [
  { n: 1, slug: 'solenidade-sagrado-coracao',   src: '/images/figma-liturgy.jpg' },
  { n: 2, slug: 'inscricoes-catequese',         src: '/images/figma-icon-priest2.jpg' },
  { n: 3, slug: 'recolha-alimentos-verao',      src: '/images/destaque-celebracao.jpg' },
  { n: 4, slug: 'pompeu-batoni-altar-mor',      src: '/images/figma-fresco.jpg' },
  { n: 5, slug: 'convento-antes-da-basilica',   src: '/images/figma-nave-aerial.jpg' },
  { n: 6, slug: 'presepio-machado-de-castro',   src: '/images/figma-statue-mary.jpg' },
  { n: 7, slug: 'devocao-coracao-de-jesus',     src: '/images/figma-icon-chalice.jpg' },
]

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug)
}

/**
 * As duas publicações seguintes, em ciclo — para o fim do artigo nunca ficar
 * sem continuação, mesmo no último post da lista.
 */
export function getRelacionados(slug: string, quantos = 2): Post[] {
  const i = POSTS.findIndex((p) => p.slug === slug)
  if (i === -1) return POSTS.slice(0, quantos)
  return Array.from({ length: quantos }, (_, k) => POSTS[(i + k + 1) % POSTS.length])
}

/** Palavras por minuto usadas para estimar o tempo de leitura. */
const PPM = 200

/** Estimativa a partir do texto real do artigo — não um número inventado. */
export function tempoDeLeitura(...blocos: string[]): number {
  const palavras = blocos.join(' ').trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(palavras / PPM))
}
