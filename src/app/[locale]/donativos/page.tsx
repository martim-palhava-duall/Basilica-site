import { use } from 'react'
import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import DonativosAbertura from '@/components/donativos/DonativosAbertura'
import DonativosComoContribuir from '@/components/donativos/DonativosComoContribuir'
import DonativosFazer from '@/components/donativos/DonativosFazer'
import DonativosSustentar from '@/components/donativos/DonativosSustentar'
import PaginaInterior from '@/components/home/PaginaInterior'

export const metadata: Metadata = { title: 'Donativos' }

/**
 * Donativos — design novo (Figma, nó 111:2322). Em construção, secção a secção.
 * Usa a estrutura comum das páginas interiores; as âncoras entram à medida que
 * as secções são feitas.
 */
export default function DonativosPage({ params }: { params: Promise<{ locale: string }> }) {
  setRequestLocale(use(params).locale)
  const t = useTranslations('ancoras')
  const ancoras = [{ id: 'sustentar', label: t('sustentar') }, { id: 'donativo', label: t('donativo') }, { id: 'contribuir', label: t('contribuir') }]

  return (
    <PaginaInterior ancoras={ancoras}>
      <DonativosAbertura />
      <DonativosSustentar />
      <DonativosFazer />
      <DonativosComoContribuir />
    </PaginaInterior>
  )
}
