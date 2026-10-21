import { use } from 'react'
import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import BasilicaCapa from '@/components/basilica/BasilicaCapa'
import BasilicaDuvida from '@/components/basilica/BasilicaDuvida'
import BasilicaSala from '@/components/basilica/BasilicaSala'
import BasilicaExperiencias from '@/components/basilica/BasilicaExperiencias'
import BasilicaVisitas from '@/components/basilica/BasilicaVisitas'
import BasilicaQuando from '@/components/basilica/BasilicaQuando'
import BasilicaPontos from '@/components/basilica/BasilicaPontos'
import BasilicaHistoria from '@/components/basilica/BasilicaHistoria'
import SobreGaleria from '@/components/sobre/SobreGaleria'
import PaginaInterior from '@/components/home/PaginaInterior'

export const metadata: Metadata = { title: 'Basílica e Convento da Estrela' }

/**
 * Basílica e Convento da Estrela (Visitar) — design novo (Figma, nó 111:1058).
 * Em construção, secção a secção. A barra de topo está sempre visível; os 88px
 * por cima são o cabeçalho do desenho, que mantém as distâncias do Figma.
 */
export default function BasilicaEConventoPage({ params }: { params: Promise<{ locale: string }> }) {
  setRequestLocale(use(params).locale)
  const t = useTranslations('ancoras')
  const ancoras = [{ id: 'conhecer', label: t('conhecer') }, { id: 'imagens', label: t('imagens') }, { id: 'horarios', label: t('horarios') }, { id: 'grupos', label: t('grupos') }, { id: 'experiencias', label: t('experiencias') }, { id: 'reservas', label: t('reservas') }]

  return (
    <PaginaInterior ancoras={ancoras}>
      <BasilicaCapa />
      <BasilicaHistoria />
      <BasilicaPontos />
      <SobreGaleria />
      <BasilicaQuando />
      <BasilicaVisitas />
      <BasilicaExperiencias />
      <BasilicaSala />
      <BasilicaDuvida />
    </PaginaInterior>
  )
}
