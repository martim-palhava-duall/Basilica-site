import { use } from 'react'
import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import CelebracoesAdoracao from '@/components/celebracoes/CelebracoesAdoracao'
import CelebracoesCapa from '@/components/celebracoes/CelebracoesCapa'
import CelebracoesIntro from '@/components/celebracoes/CelebracoesIntro'
import CelebracoesConfissoes from '@/components/celebracoes/CelebracoesConfissoes'
import CelebracoesEucaristia from '@/components/celebracoes/CelebracoesEucaristia'
import CelebracoesDevocoes from '@/components/celebracoes/CelebracoesDevocoes'
import CelebracoesEntronizacao from '@/components/celebracoes/CelebracoesEntronizacao'
import CelebracoesBencao from '@/components/celebracoes/CelebracoesBencao'
import CelebracoesIntencoes from '@/components/celebracoes/CelebracoesIntencoes'
import CelebracoesTerco from '@/components/celebracoes/CelebracoesTerco'
import CelebracoesContacto from '@/components/celebracoes/CelebracoesContacto'
import CelebracoesSacramentos from '@/components/celebracoes/CelebracoesSacramentos'
import PaginaInterior from '@/components/home/PaginaInterior'

export const metadata: Metadata = { title: 'Celebrações' }

/**
 * Celebrações — design novo (Figma, nó 111:1475). Em construção, secção a
 * secção. A barra de topo está sempre visível; os 88px por cima são o
 * cabeçalho do desenho, que mantém as distâncias do Figma.
 */
export default function CelebracoesPage({ params }: { params: Promise<{ locale: string }> }) {
  setRequestLocale(use(params).locale)
  const t = useTranslations('ancoras')
  const ancoras = [{ id: 'sacramentos', label: t('sacramentos') }, { id: 'eucaristia', label: t('eucaristia') }, { id: 'confissoes', label: t('confissoes') }, { id: 'adoracao', label: t('adoracao') }, { id: 'devocoes', label: t('devocoes') }, { id: 'intencoes', label: t('intencoes') }, { id: 'entronizacao', label: t('entronizacao') }, { id: 'bencao', label: t('bencao') }, { id: 'terco', label: t('terco') }]

  return (
    <PaginaInterior ancoras={ancoras}>
      <CelebracoesCapa />
      <CelebracoesIntro />
      <CelebracoesSacramentos />
      <CelebracoesEucaristia />
      <CelebracoesConfissoes />
      <CelebracoesAdoracao />
      <CelebracoesDevocoes />
      <CelebracoesIntencoes />
      <CelebracoesEntronizacao />
      <CelebracoesBencao />
      <CelebracoesTerco />
      <CelebracoesContacto />
    </PaginaInterior>
  )
}
