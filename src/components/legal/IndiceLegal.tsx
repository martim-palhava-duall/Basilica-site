'use client'

import { useEffect, useState } from 'react'
import { getLenis } from '@/lib/lenis'
import { ALTURA_BARRA } from '@/components/home/MenuContext'
import { escalaUi } from '@/lib/escala'

type Item = { id: string; label: string }

/** Folga entre a barra de topo e o título da secção, ao saltar para ela */
const FOLGA = 40

/**
 * Índice lateral das páginas legais (desktop): fica preso ao lado do texto enquanto
 * se lê. A secção em que se está aparece a cheio, com um ponto; as outras a 35%.
 * Clicar leva suavemente à secção (Lenis), como as âncoras do resto do site.
 * No mobile não aparece: aí é a drop de âncoras (HomeAncoras) que faz de índice.
 */
export default function IndiceLegal({ itens }: { itens: Item[] }) {
  const [ativa, setAtiva] = useState(itens[0]?.id)

  // Ativa a última secção cujo topo já passou um terço do ecrã
  useEffect(() => {
    let pendente = false
    const atualizar = () => {
      pendente = false
      const linha = window.innerHeight / 3
      let id = itens[0]?.id
      for (const it of itens) {
        const el = document.getElementById(it.id)
        if (el && el.getBoundingClientRect().top <= linha) id = it.id
      }
      // No fundo da página a última secção pode não chegar à linha: fica ativa na mesma
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        const ultima = itens.at(-1)?.id
        const el = ultima ? document.getElementById(ultima) : null
        if (ultima && el && el.getBoundingClientRect().top < window.innerHeight) id = ultima
      }
      setAtiva(id)
    }
    const aoRolar = () => {
      if (!pendente) {
        pendente = true
        requestAnimationFrame(atualizar)
      }
    }
    atualizar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    window.addEventListener('resize', aoRolar)
    return () => {
      window.removeEventListener('scroll', aoRolar)
      window.removeEventListener('resize', aoRolar)
    }
  }, [itens])

  const ir = (id: string) => (e: React.MouseEvent) => {
    const el = document.getElementById(id)
    if (!el) return
    e.preventDefault()
    const desvio = -(ALTURA_BARRA + FOLGA) * escalaUi()
    const lenis = getLenis()
    if (lenis) {
      const distancia = Math.abs(el.getBoundingClientRect().top + desvio)
      lenis.scrollTo(el, { offset: desvio, duration: Math.min(1.1, 0.6 + distancia / 6000), easing: (t: number) => 1 - Math.pow(1 - t, 4), force: true })
    } else {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + desvio, behavior: 'smooth' })
    }
    history.replaceState(null, '', `#${id}`)
  }

  return (
    <nav aria-label="Nesta página">
      <ul className="flex flex-col gap-[calc(10*var(--u))]">
        {itens.map((it) => {
          const ativo = it.id === ativa
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                onClick={ir(it.id)}
                aria-current={ativo ? 'location' : undefined}
                className="group/i relative flex items-center ps-[calc(16*var(--u))] text-[length:var(--t-corpo)] leading-[1.45] transition-opacity duration-[350ms] ease-[var(--ease-out)] hover:!opacity-70"
                style={{ opacity: ativo ? 1 : 0.35 }}
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-[calc(50%+0.09em)] h-[calc(5*var(--u))] w-[calc(5*var(--u))] rounded-full bg-current transition-transform duration-[350ms] ease-[var(--ease-out)]"
                  style={{ transform: `translateY(-50%) scale(${ativo ? 1 : 0})` }}
                />
                {it.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
