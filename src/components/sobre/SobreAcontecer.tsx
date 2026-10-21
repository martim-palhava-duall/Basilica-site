import type { ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import NoticiasBloco from '@/components/home/NoticiasBloco'

const i = (chunks: ReactNode) => (
  <span className="italic font-light" style={{ fontFamily: "'forevs-light', var(--font-display)" }}>{chunks}</span>
)

/**
 * Sobre nós, O que vai acontecer — design novo (Figma, nó 170:3296). É o bloco
 * de notícias dos Destaques da homepage, em bege claro, com 120 de respiro e
 * o título "O que vai acontecer" (itálico leve em "O que vai").
 */
export default function SobreAcontecer() {
  const t = useTranslations('sobre')
  const h = useTranslations('inicio')
  return (
    <NoticiasBloco
      id="acontecer"
      fundo="var(--bege-claro)"
      respiro={120}
      label={t('acLabel')}
      titulo={t.rich('acTitulo', { i })}
      cta={h('destCta')}
      meta={h('destMeta')}
      titulos={[h('dest1Titulo'), h('dest1Titulo'), h('dest1Titulo')]}
    />
  )
}
