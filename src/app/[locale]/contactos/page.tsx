import { use } from 'react'
import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import PaginaInterior from '@/components/home/PaginaInterior'
import ContactosAbertura from '@/components/contactos/ContactosAbertura'
import ContactosRedes from '@/components/contactos/ContactosRedes'
import ContactosFe from '@/components/contactos/ContactosFe'
import SobreConvento from '@/components/sobre/SobreConvento'

export const metadata: Metadata = { title: 'Contactos' }

/**
 * Contactos — design novo (Figma, nó 111:3490): formulário e dados, redes
 * sociais, acompanhamento espiritual e o convite final (o mesmo do Sobre nós).
 */
export default function ContactosPage({ params }: { params: Promise<{ locale: string }> }) {
  setRequestLocale(use(params).locale)
  const t = useTranslations('ancoras')
  const ancoras = [
    { id: 'contacto', label: t('contacto') },
    { id: 'redes', label: t('redes') },
    { id: 'fe', label: t('fe') },
  ]

  return (
    <PaginaInterior ancoras={ancoras}>
      <ContactosAbertura />
      <ContactosRedes />
      <ContactosFe />
      <SobreConvento />
    </PaginaInterior>
  )
}
