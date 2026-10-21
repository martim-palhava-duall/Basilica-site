import { use } from 'react'
import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import PaginaInterior from '@/components/home/PaginaInterior'
import SobreGaleria from '@/components/sobre/SobreGaleria'
import NoticiasGrelha from '@/components/noticias/NoticiasGrelha'
import NoticiasDestaque from '@/components/noticias/NoticiasDestaque'
import NoticiasAbertura from '@/components/noticias/NoticiasAbertura'

export const metadata: Metadata = { title: 'Notícias' }

/**
 * Notícias — design novo (Figma, nó 111:2634). Em construção, secção a secção.
 * Usa a estrutura comum das páginas interiores; as âncoras entram à medida que
 * as secções são feitas.
 */
export default function NoticiasPage({ params }: { params: Promise<{ locale: string }> }) {
  setRequestLocale(use(params).locale)
  return (
    <PaginaInterior ancoras={[]}>
      <NoticiasAbertura />
      <NoticiasDestaque />
      <NoticiasGrelha />
      <SobreGaleria fundo="var(--bege-claro)" />
    </PaginaInterior>
  )
}
