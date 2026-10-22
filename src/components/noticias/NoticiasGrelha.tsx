import { useTranslations } from 'next-intl'
import NoticiasFiltroGrelha, { type Cartao } from '@/components/noticias/NoticiasFiltroGrelha'
import { NOTICIAS_GRELHA } from '@/lib/noticias'

/** Os nove cartões e as categorias vêm da fonte única das notícias (lib/noticias) */
const CARTOES: Cartao[] = NOTICIAS_GRELHA.map(({ slug, foto, categoria, recorte }) => ({ slug, foto, categoria: categoria!, recorte }))

/**
 * Notícias, grelha — design novo (Figma, nó 111:2695), desktop 1440.
 *
 * Fundo bege claro 2, 120 de respiro. Nove cartões em três colunas (21 de
 * intervalo, 48 entre filas): fotografia de 296 de altura, "Categoria · data" e
 * título de 32px, tudo texto de teste. Em baixo, o botão "Ver mais". Acima da
 * grelha, no espaço de 120, ficam os filtros por tipo de notícia (ver
 * NoticiasFiltroGrelha). Ao passar o rato num cartão aparece uma seta junto ao
 * título (sem zoom na fotografia).
 */
export default function NoticiasGrelha() {
  const t = useTranslations('noticias')

  const filtros = [
    { chave: 'todos', label: t('fTodos') },
    { chave: 'noticias', label: t('fNoticias') },
    { chave: 'eventos', label: t('fEventos') },
    { chave: 'jovens', label: t('fJovens') },
    { chave: 'visitas', label: t('fVisitas') },
    { chave: 'obra', label: t('fObra') },
    { chave: 'celebracoes', label: t('fCelebracoes') },
  ]
  const categorias = {
    noticias: t('cNoticias'),
    eventos: t('cEventos'),
    jovens: t('cJovens'),
    visitas: t('cVisitas'),
    obra: t('cObra'),
    celebracoes: t('cCelebracoes'),
  }

  return (
    <section
      id="noticias"
      data-barra="var(--bege-claro-2)"
      className="relative flex w-full flex-col items-center gap-[calc(80*var(--u))] px-[calc(32*var(--u))] py-[calc(120*var(--u))] bg-[var(--bege-claro-2)] text-[var(--azul-escuro)]"
    >
      <NoticiasFiltroGrelha
        cartoes={CARTOES}
        filtros={filtros}
        categorias={categorias}
        tituloCartao={t('tituloCartao')}
        meta="{categoria} · {data}"
        data={t('data')}
        verMais={t('verMais')}
        filtrosAria={t('filtrosAria')}
      />
    </section>
  )
}
