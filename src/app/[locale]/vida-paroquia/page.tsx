import type { Metadata } from 'next'
import { use } from 'react'
import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import PaginaInterior from '@/components/home/PaginaInterior'
import VidaCapa from '@/components/vida/VidaCapa'
import VidaConvite from '@/components/vida/VidaConvite'
import VidaCti from '@/components/vida/VidaCti'
import VidaGrupos from '@/components/vida/VidaGrupos'
import VidaIntro from '@/components/vida/VidaIntro'
import VidaMovimentos from '@/components/vida/VidaMovimentos'
import VidaSalas from '@/components/vida/VidaSalas'

export const metadata: Metadata = { title: 'Vida da Paróquia' }

/**
 * Vida da Paróquia — design novo (Figma, nó 111:1936): abertura, introdução,
 * grupos culturais (com painéis), movimentos, CTI Juvenil, reserva de salas e
 * o convite final.
 */
export default function VidaParoquiaPage({ params }: { params: Promise<{ locale: string }> }) {
  setRequestLocale(use(params).locale)
  const t = useTranslations('ancoras')
  const ancoras = [
    { id: 'grupos', label: t('vidaGrupos') },
    { id: 'movimentos', label: t('vidaMovimentos') },
    { id: 'cti', label: t('vidaCti') },
    { id: 'salas', label: t('vidaSalas') },
  ]

  return (
    <PaginaInterior ancoras={ancoras}>
      <VidaCapa />
      <VidaIntro />
      <VidaGrupos />
      <VidaMovimentos />
      <VidaCti />
      <VidaSalas />
      <VidaConvite />
    </PaginaInterior>
  )
}
