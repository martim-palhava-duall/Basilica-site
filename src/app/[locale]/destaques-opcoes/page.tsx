import type { Metadata } from 'next'
import { use } from 'react'
import { setRequestLocale } from 'next-intl/server'
import DestaquesOpcoesLista from '@/components/home/DestaquesOpcoesLista'

export const metadata: Metadata = { title: 'Destaques: animações (provisório)', robots: { index: false } }

/** Página provisória: opções de entrada dos Destaques. Apagar depois de escolhida. */
export default function DestaquesOpcoesPage({ params }: { params: Promise<{ locale: string }> }) {
  setRequestLocale(use(params).locale)
  return <DestaquesOpcoesLista />
}
