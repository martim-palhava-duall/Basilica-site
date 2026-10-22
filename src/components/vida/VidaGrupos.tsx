import type { ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import ListaPainel, { type FotoGaleria } from '@/components/ui/ListaPainel'
import { GALERIA_PAINEL } from '@/lib/galeria'

const i = (chunks: ReactNode) => (
  <span className="italic font-light" style={{ fontFamily: "'forevs-light', var(--font-display)" }}>{chunks}</span>
)

/**
 * Fotografia de cada grupo. O Figma só traz a dos escuteiros (Crianças); as
 * outras duas ficam com ela até haver fotografias próprias: basta trocar o `foto`.
 */
const GRUPOS = [
  { n: '01', chave: 'gc1', foto: '/vida/grupos.jpg', subs: 3 },
  { n: '02', chave: 'gc2', foto: '/vida/grupos.jpg', subs: 2 },
  { n: '03', chave: 'gc3', foto: '/vida/grupos.jpg', subs: 3 },
] as const

/** Galeria do painel: as fotografias das galerias do site (lib/galeria) */
const GALERIA: FotoGaleria[] = GALERIA_PAINEL

/**
 * Vida da Paróquia, Grupos Culturais — design novo (Figma, nó 111:1995), desktop 1440.
 *
 * Cabeçalho com "Encontre o seu lugar" (itálico leve em "o seu lugar") e o botão
 * "Entre em contacto"; três barras que abrem o painel de cada grupo, com a
 * introdução, os subgrupos, a galeria e "Marcar ou pedir informações". O desenho
 * e o comportamento estão em ListaPainel (partilhado com as Devoções das Celebrações).
 */
export default function VidaGrupos() {
  const t = useTranslations('vida')

  return (
    <ListaPainel
      id="grupos"
      label={t('gcLabel')}
      titulo={t.rich('gcTitulo', { i })}
      cta={{ texto: t('gcCta'), href: '/contactos' }}
      saibaMais={t('gcSaibaMais')}
      itens={GRUPOS.map((g) => ({
        n: g.n,
        titulo: t(`${g.chave}Titulo`),
        texto: t(`${g.chave}Texto`),
        foto: g.foto,
        intro: t(`${g.chave}Intro`),
        intro2: t(`${g.chave}Intro2`),
        blocos: Array.from({ length: g.subs }, (_, k) => ({ titulo: t(`${g.chave}S${k + 1}T`), texto: t(`${g.chave}S${k + 1}X`) })),
      }))}
      galeria={GALERIA}
      painelCta={{ texto: t('gpCta'), href: '/contactos' }}
      rotulos={{ fechar: t('gpFechar'), galeria: t('gpGaleria'), anterior: t('gpAnterior'), seguinte: t('gpSeguinte') }}
    />
  )
}
