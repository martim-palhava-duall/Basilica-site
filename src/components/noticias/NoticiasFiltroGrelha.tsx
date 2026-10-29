'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Seta from '@/components/home/Seta'
import { u } from '@/lib/escala'

export type Cartao = {
  /** troço do endereço da notícia: /blog/<slug> */
  slug: string
  foto: string
  recorte?: { left: number; top: number; width: number; height: number }
  /** chave do filtro a que pertence */
  categoria: string
}

export type Filtro = { chave: string; label: string }

/**
 * Filtros e grelha de notícias (Figma 111:2695; os filtros não estão no
 * desenho). A fila de filtros fica no espaço de 120 entre o destaque e a
 * grelha, sem mexer nas distâncias do Figma: só o filtro escolhido tem caixa (cheia,
 * em azul escuro); os outros são texto, sem contorno. "Todos" vem ativo, e escolher um
 * tipo mostra só os cartões dessa categoria (entram com um pequeno fade).
 */
export default function NoticiasFiltroGrelha({
  cartoes,
  filtros,
  categorias,
  tituloCartao,
  meta,
  data,
  verMais,
  filtrosAria,
}: {
  cartoes: Cartao[]
  filtros: Filtro[]
  /** chave → nome (singular) para a linha "Categoria · data" */
  categorias: Record<string, string>
  tituloCartao: string
  meta: string
  data: string
  verMais: string
  filtrosAria: string
}) {
  const [ativo, setAtivo] = useState('todos')
  const visiveis = cartoes.filter((c) => ativo === 'todos' || c.categoria === ativo)

  return (
    <>
      {/* ── Filtros: centrados no espaço de 120 acima da grelha ── */}
      <div role="group" aria-label={filtrosAria} className="absolute left-[calc(32*var(--u))] top-[calc(44*var(--u))] flex flex-wrap items-center gap-[calc(4*var(--u))] max-lg:static max-lg:w-[calc(100%+40*var(--u))] max-lg:-mx-[calc(20*var(--u))] max-lg:flex-nowrap max-lg:overflow-x-auto max-lg:px-[calc(20*var(--u))] max-lg:[scrollbar-width:none] max-lg:[&::-webkit-scrollbar]:hidden">
        {filtros.map((f) => {
          const on = f.chave === ativo
          return (
            <button
              key={f.chave}
              type="button"
              aria-pressed={on}
              onClick={() => setAtivo(f.chave)}
              className={`flex h-[calc(32*var(--u))] items-center whitespace-nowrap rounded-[calc(6*var(--u))] px-[calc(12*var(--u))] text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] outline-none transition-[background-color,color,opacity] duration-[400ms] ease-[var(--ease-out)] focus-visible:ring-1 focus-visible:ring-[var(--azul-escuro)] ${
                on ? 'bg-[var(--azul-escuro)] text-[var(--bege-claro-2)]' : 'text-[var(--azul-escuro)] opacity-50 hover:opacity-100'
              }`}
            >
              {f.label}
            </button>
          )
        })}
      </div>

      <div className="grid w-full grid-cols-3 max-lg:grid-cols-2 md:max-lg:grid-cols-3 gap-x-[calc(21*var(--u))] max-lg:gap-x-[calc(16*var(--u))] gap-y-[calc(48*var(--u))] max-lg:gap-y-[calc(32*var(--u))]">
        {visiveis.map((c) => (
          <Link key={`${ativo}-${c.slug}`} href={`/blog/${c.slug}`} className="cartao-entra group/card flex w-full flex-col gap-[calc(12*var(--u))]">
            <div className="relative h-[calc(295.98*var(--u))] max-lg:h-[calc(160*var(--u))] w-full overflow-hidden rounded-[calc(4*var(--u))]">
              {c.recorte ? (
                <div className="absolute" style={{ left: u(c.recorte.left), top: u(c.recorte.top), width: u(c.recorte.width), height: u(c.recorte.height) }}>
                  <Image src={c.foto} alt="" fill sizes="522px" className="object-cover" />
                </div>
              ) : (
                <Image src={c.foto} alt="" fill sizes="445px" className="object-cover" />
              )}
            </div>
            <p className="pt-[calc(8*var(--u))] max-lg:pt-0 text-[length:max(11px,calc(12*var(--u)))] leading-[1.4] text-[rgba(29,35,40,0.6)]">
              {meta.replace('{categoria}', categorias[c.categoria] ?? '').replace('{data}', data)}
            </p>
            <div className="flex w-full items-center justify-between gap-[calc(16*var(--u))] max-lg:gap-[calc(8*var(--u))]">
              <h3 className="font-display text-[length:calc(32*var(--u))] max-lg:text-[length:calc(21*var(--u))] leading-[calc(35.2*var(--u))] max-lg:leading-[calc(25*var(--u))] font-normal">{tituloCartao}</h3>
              <Seta className="shrink-0 opacity-0 -translate-x-[calc(8*var(--u))] !transition-[opacity,transform] group-hover/card:opacity-100 group-hover/card:translate-x-0 group-focus-visible/card:opacity-100 group-focus-visible/card:translate-x-0" />
            </div>
          </Link>
        ))}
      </div>

      <Link
        href="/blog"
        className="btn-luz flex h-[calc(32*var(--u))] items-center justify-center rounded-[calc(6*var(--u))] border border-solid border-[var(--azul-escuro)] px-[calc(20*var(--u))] text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] opacity-85 transition-[background-color,color,opacity] duration-[400ms] ease-[var(--ease-out)] hover:opacity-100"
      >
        {verMais}
      </Link>
    </>
  )
}
