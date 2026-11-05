import { use } from 'react'
import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import PaginaLegal from '@/components/legal/PaginaLegal'
import { POLITICA_PRIVACIDADE } from '@/lib/legal/privacidade'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Que dados pessoais trata o site da Basílica da Estrela, para que os usa e que direitos tem sobre eles.',
}

/** Política de Privacidade — conteúdo em lib/legal/privacidade, desenho em components/legal/PaginaLegal */
export default function PoliticaPrivacidadePage({ params }: { params: Promise<{ locale: string }> }) {
  setRequestLocale(use(params).locale)
  return <PaginaLegal documento={POLITICA_PRIVACIDADE} />
}
