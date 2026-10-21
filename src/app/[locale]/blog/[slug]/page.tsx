import { use } from 'react'
import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import PaginaInterior from '@/components/home/PaginaInterior'
import NoticiaAbertura from '@/components/noticias/NoticiaAbertura'
import NoticiaCorpo from '@/components/noticias/NoticiaCorpo'
import NoticiaMais from '@/components/noticias/NoticiaMais'
import SobreConvento from '@/components/sobre/SobreConvento'

/** Notícias de exemplo (ver NoticiasGrelha / NoticiasDestaque); pré-geradas para a navegação ser instantânea. */
export function generateStaticParams() {
  return [...Array.from({ length: 9 }, (_, i) => `noticia-${i + 1}`), 'ao-servico-de-quem-mais-precisa', 'celebracao-da-missa-do-galo'].map((slug) => ({ slug }))
}

export const metadata: Metadata = { title: 'Notícia' }

/**
 * Detalhe de Notícia — design novo (Figma, nó 111:2920). Em construção, secção
 * a secção. Ainda não há notícias reais: qualquer `slug` mostra o texto de
 * teste do desenho. Sem âncoras (é um artigo).
 */
export default function NoticiaPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  setRequestLocale(use(params).locale)
  return (
    <PaginaInterior ancoras={[]}>
      <NoticiaAbertura />
      <NoticiaCorpo />
      <NoticiaMais />
      <SobreConvento />
    </PaginaInterior>
  )
}
