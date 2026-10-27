import type { Metadata } from 'next'
import { use } from 'react'
import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import PaginaInterior from '@/components/home/PaginaInterior'
import VidaCapa from '@/components/vida/VidaCapa'
import VidaConvite from '@/components/vida/VidaConvite'
import VidaCti from '@/components/vida/VidaCti'
import VidaEquipa from '@/components/vida/VidaEquipa'
import VidaGrupos from '@/components/vida/VidaGrupos'
import VidaHorarios from '@/components/vida/VidaHorarios'
import VidaIntro from '@/components/vida/VidaIntro'
import VidaMovimentos from '@/components/vida/VidaMovimentos'
import VidaSalas from '@/components/vida/VidaSalas'

export const metadata: Metadata = { title: 'Vida da Paróquia' }

/**
 * Vida da Paróquia — design novo (Figma, nó 111:1936): abertura, introdução,
 * grupos culturais (com painéis), equipa pastoral, movimentos, horários, CTI Juvenil, reserva de salas e
 * o convite final.
 */
export default function VidaParoquiaPage({ params }: { params: Promise<{ locale: string }> }) {
  setRequestLocale(use(params).locale)
  const t = useTranslations('ancoras')
  const ancoras = [
    { id: 'grupos', label: t('vidaGrupos') },
    { id: 'equipa', label: t('vidaEquipa') },
    { id: 'movimentos', label: t('vidaMovimentos') },
    { id: 'horarios', label: t('vidaHorarios') },
    { id: 'doze', label: t('vidaCti') },
    { id: 'salas', label: t('vidaSalas') },
  ]

  return (
    <PaginaInterior ancoras={ancoras}>
      <VidaCapa />
      <VidaIntro />
      <VidaGrupos />
      <VidaEquipa />
      <VidaMovimentos />
      <VidaHorarios />
      <VidaCti />
      <VidaSalas />
      <VidaConvite />
    </PaginaInterior>
  )
}
