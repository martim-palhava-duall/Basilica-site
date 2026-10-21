import type { ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import NoticiasBloco from '@/components/home/NoticiasBloco'

const i = (chunks: ReactNode) => (
  <span className="italic font-light" style={{ fontFamily: "'forevs-light', var(--font-display)" }}>{chunks}</span>
)

/**
 * Detalhe de Notícia, mais notícias — design novo (Figma, nó 111:2982): o
 * bloco dos Destaques da homepage em bege claro 2, com 174 de respiro
 * (900 de altura) e os três cartões com o título de teste do desenho.
 */
export default function NoticiaMais() {
  const t = useTranslations('inicio')
  return (
    <NoticiasBloco
      fundo="var(--bege-claro-2)"
      respiro={174}
      label={t('destLabel')}
      titulo={t.rich('destTitulo', { i })}
      cta={t('destCta')}
      meta={t('destMeta')}
      titulos={[t('dest1Titulo'), t('dest1Titulo'), t('dest1Titulo')]}
    />
  )
}
