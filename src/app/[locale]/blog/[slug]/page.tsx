import { use } from 'react'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import PaginaInterior from '@/components/home/PaginaInterior'
import NoticiaAbertura from '@/components/noticias/NoticiaAbertura'
import NoticiaCorpo from '@/components/noticias/NoticiaCorpo'
import NoticiaMais from '@/components/noticias/NoticiaMais'
import SobreConvento from '@/components/sobre/SobreConvento'
import { NOTICIAS, chaveCategoria, getNoticia } from '@/lib/noticias'

/** Todas as notícias de exemplo (lib/noticias), pré-geradas para a navegação ser instantânea. */
export function generateStaticParams() {
  return NOTICIAS.map(({ slug }) => ({ slug }))
}

export const metadata: Metadata = { title: 'Notícia' }

/**
 * Detalhe de Notícia — design novo (Figma, nó 111:2920). Ainda não há notícias
 * reais: cada uma abre com a fotografia, a categoria e o título do seu cartão
 * (lib/noticias), e o corpo é texto de teste (lorem ipsum). Sem âncoras (é um artigo).
 */
export default function NoticiaPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = use(params)
  setRequestLocale(locale)
  const noticia = getNoticia(slug)
  if (!noticia) notFound()

  const t = use(getTranslations())
  const titulo = noticia.titulo ? t(`${noticia.titulo[0]}.${noticia.titulo[1]}`) : t('noticias.tituloCartao')
  const etiqueta = noticia.etiqueta
    ? t(`${noticia.etiqueta[0]}.${noticia.etiqueta[1]}`)
    : t(`noticias.${chaveCategoria(noticia.categoria!)}`)

  return (
    <PaginaInterior ancoras={[]}>
      <NoticiaAbertura etiqueta={etiqueta} titulo={titulo} foto={noticia.foto} fotoPosicao={noticia.capaPosicao} />
      <NoticiaCorpo />
      <NoticiaMais />
      <SobreConvento />
    </PaginaInterior>
  )
}
