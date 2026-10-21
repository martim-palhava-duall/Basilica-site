import type { ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import NoticiasBloco from '@/components/home/NoticiasBloco'

/** Itálico leve dentro do título (<i> nas mensagens) */
const i = (chunks: ReactNode) => (
  <span className="italic font-light" style={{ fontFamily: "'forevs-light', var(--font-display)" }}>{chunks}</span>
)

/** Destaques — design novo (Figma, nó 115:363). O desenho está em NoticiasBloco. */
export default function HomeDestaques({ entrada }: { entrada?: number }) {
  const t = useTranslations('inicio')
  return (
    <NoticiasBloco
      fundo="var(--bege-claro-2)"
      respiro={180}
      label={t('destLabel')}
      titulo={t.rich('destTitulo', { i })}
      cta={t('destCta')}
      meta={t('destMeta')}
      titulos={[t('dest1Titulo'), t('dest2Titulo'), t('dest3Titulo')]}
      entrada={entrada}
    />
  )
}
