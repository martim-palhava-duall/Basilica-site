import { use } from 'react'
import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import PaginaLegal from '@/components/legal/PaginaLegal'
import { TERMOS } from '@/lib/legal/termos'

export const metadata: Metadata = {
  title: 'Termos e Condições',
  description: 'As regras de utilização do site da Basílica da Estrela.',
}

/** Termos e Condições — conteúdo em lib/legal/termos, desenho em components/legal/PaginaLegal */
export default function TermosPage({ params }: { params: Promise<{ locale: string }> }) {
  setRequestLocale(use(params).locale)
  return <PaginaLegal documento={TERMOS} />
}
