import { use } from 'react'
import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import PaginaInterior from '@/components/home/PaginaInterior'
import SobreCapa from '@/components/sobre/SobreCapa'
import SobreConvento from '@/components/sobre/SobreConvento'
import SobreAcontecer from '@/components/sobre/SobreAcontecer'
import SobreGaleria from '@/components/sobre/SobreGaleria'
import SobreCulto from '@/components/sobre/SobreCulto'
import SobreHistoria from '@/components/sobre/SobreHistoria'
import SobreVisitar from '@/components/sobre/SobreVisitar'
import SobreParoquia from '@/components/sobre/SobreParoquia'

export const metadata: Metadata = { title: 'Sobre nós' }

/**
 * Sobre nós — design novo (Figma, nó 170:3074). Em construção, secção a secção.
 * A barra de topo está sempre visível (não há hero); o espaço de 88px por cima
 * é o do cabeçalho do desenho, que mantém as distâncias do Figma.
 */
export default function SobreNosPage({ params }: { params: Promise<{ locale: string }> }) {
  setRequestLocale(use(params).locale)
  const t = useTranslations('ancoras')
  const ancoras = [{ id: 'paroquia', label: t('paroquia') }, { id: 'historia', label: t('historia') }, { id: 'visitar', label: t('visitar') }, { id: 'culto', label: t('culto') }, { id: 'imagens', label: t('imagens') }, { id: 'acontecer', label: t('acontecer') }]

  return (
    <PaginaInterior ancoras={ancoras}>
      <SobreCapa />
      <SobreParoquia />
      <SobreHistoria />
      <SobreVisitar />
      <SobreCulto />
      <SobreGaleria />
      <SobreAcontecer />
      <SobreConvento />
    </PaginaInterior>
  )
}
