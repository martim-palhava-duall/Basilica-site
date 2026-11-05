import { use } from 'react'
import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import PaginaLegal from '@/components/legal/PaginaLegal'
import { POLITICA_COOKIES } from '@/lib/legal/cookies'

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description: 'Que cookies usa o site da Basílica da Estrela, para que servem e como pode controlá-los.',
}

/** Política de Cookies — conteúdo em lib/legal/cookies, desenho em components/legal/PaginaLegal */
export default function PoliticaCookiesPage({ params }: { params: Promise<{ locale: string }> }) {
  setRequestLocale(use(params).locale)
  return <PaginaLegal documento={POLITICA_COOKIES} />
}
