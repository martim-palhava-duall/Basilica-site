import type { Metadata } from 'next'
import { use } from 'react'
import { setRequestLocale } from 'next-intl/server'
import RodapeOpcoesLista from '@/components/home/RodapeOpcoesLista'

export const metadata: Metadata = { title: 'Rodapé: animações (provisório)', robots: { index: false } }

/** Página provisória: opções de entrada do nome no rodapé. Apagar depois de escolhida. */
export default function RodapeOpcoesPage({ params }: { params: Promise<{ locale: string }> }) {
  setRequestLocale(use(params).locale)
  return <RodapeOpcoesLista />
}
