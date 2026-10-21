import { use } from 'react'
import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import PaginaInterior from '@/components/home/PaginaInterior'
import HomeObraSocial from '@/components/home/HomeObraSocial'
import ObraCapa from '@/components/obra/ObraCapa'
import ObraIntro from '@/components/obra/ObraIntro'
import ObraAcao from '@/components/obra/ObraAcao'
import ObraComoContribuir from '@/components/obra/ObraComoContribuir'
import ObraConvite from '@/components/obra/ObraConvite'

export const metadata: Metadata = { title: 'Obra Social' }

/**
 * Obra Social — design novo (Figma, nó 199:369): abertura, introdução, ação
 * social, como contribuir, as obras da paróquia (a mesma secção da homepage)
 * e o convite final.
 */
export default function ObraSocialPage({ params }: { params: Promise<{ locale: string }> }) {
  setRequestLocale(use(params).locale)
  const t = useTranslations('ancoras')
  const ancoras = [
    { id: 'acao', label: t('obraAcao') },
    { id: 'contribuir', label: t('obraContribuir') },
    { id: 'obras', label: t('obraObras') },
  ]

  return (
    <PaginaInterior ancoras={ancoras}>
      <ObraCapa />
      <ObraIntro />
      <ObraAcao />
      <ObraComoContribuir />
      <HomeObraSocial />
      <ObraConvite />
    </PaginaInterior>
  )
}
